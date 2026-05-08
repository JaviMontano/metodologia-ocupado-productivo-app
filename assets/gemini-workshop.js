(function(){
  if(!document.body || !document.body.matches('[data-workshop-root]')) return;

  const SESSION_KEY='metodologia.gemini.apiToken.session';
  const LOCAL_KEY='metodologia.gemini.apiToken.local';
  const repoFiles=[
    'README.md',
    'documento-funcional.html',
    'documento-tecnico.html',
    'docs/bmad-workshop-help.md',
    'bmap/prd.md',
    'bmap/architecture-brief.md',
    'specs/01-functional-spec.md',
    'specs/02-technical-spec.md',
    'quality/test-plan.md',
    'specs/08-traceability.md'
  ];
  const state={files:[],repoContext:'',repoLoaded:[],transcript:[],toolTraces:[]};
  const $=s=>document.querySelector(s);
  const $$=s=>Array.from(document.querySelectorAll(s));
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const functionDeclarations=[
    {
      name:'get_diagnostic_snapshot',
      description:'Returns the current local diagnostic state for the De Ocupado a Productivo app. It never returns API tokens or secrets.',
      parameters:{type:'OBJECT',properties:{include_questions:{type:'BOOLEAN',description:'Whether to include socratic questions.'}}}
    },
    {
      name:'classify_uploaded_annexes',
      description:'Returns metadata and capability classification for files uploaded in the workshop. It does not return full file contents.',
      parameters:{type:'OBJECT',properties:{include_counts:{type:'BOOLEAN',description:'Whether to include summary counts by capability.'}}}
    },
    {
      name:'build_bmad_handoff',
      description:'Builds the local BMAD/BMAP workshop handoff from transcript, repo context status, file metadata and app state. Excludes secrets.',
      parameters:{type:'OBJECT',properties:{format:{type:'STRING',enum:['markdown','json','both'],description:'Preferred handoff format.'}}}
    },
    {
      name:'summarize_workshop_context',
      description:'Summarizes the loaded local repository context and lists which documents are available or degraded.',
      parameters:{type:'OBJECT',properties:{max_items:{type:'NUMBER',description:'Maximum number of loaded repo documents to list.'}}}
    },
    {
      name:'clear_gemini_token',
      description:'Clears the Gemini API token from sessionStorage and localStorage when the user requests a reset.',
      parameters:{type:'OBJECT',properties:{confirm:{type:'BOOLEAN',description:'Must be true to clear the token.'}},required:['confirm']}
    }
  ];

  function storedToken(){
    return sessionStorage.getItem(SESSION_KEY)||localStorage.getItem(LOCAL_KEY)||'';
  }

  function tokenLocation(){
    if(sessionStorage.getItem(SESSION_KEY)) return 'session';
    if(localStorage.getItem(LOCAL_KEY)) return 'local';
    return 'none';
  }

  function saveToken(){
    const value=($('[data-gemini-token]')?.value||'').trim();
    const remember=!!$('[data-remember-token]')?.checked;
    if(!value){
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(LOCAL_KEY);
      renderTokenStatus();
      return '';
    }
    if(remember){
      localStorage.setItem(LOCAL_KEY,value);
      sessionStorage.removeItem(SESSION_KEY);
    }else{
      sessionStorage.setItem(SESSION_KEY,value);
      localStorage.removeItem(LOCAL_KEY);
    }
    renderTokenStatus();
    return value;
  }

  function clearToken(){
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LOCAL_KEY);
    const input=$('[data-gemini-token]');
    const remember=$('[data-remember-token]');
    if(input) input.value='';
    if(remember) remember.checked=false;
    renderTokenStatus();
    append('assistant','Token Gemini borrado del navegador. La app base y el taller local siguen disponibles.');
  }

  function renderTokenStatus(){
    const location=tokenLocation();
    const active=location!=='none';
    $$('[data-token-status]').forEach(el=>{
      el.classList.toggle('ok',active);
      el.classList.toggle('warn',!active);
      el.textContent=active?(location==='local'?'Gemini activo · recordado':'Gemini activo · sesion'):'Gemini bloqueado';
    });
    $$('[data-token-status-copy]').forEach(el=>{
      el.textContent=active?'El asistente puede llamar Gemini cuando envies una pregunta.':'Pega un token para activar chat, imagenes, anexos y function calling.';
    });
    setCapability('token',active,'Token activo','Bloqueado hasta pegar API token.');
  }

  function setCapability(name,ready,readyText,blockedText){
    $$('[data-capability-card="'+name+'"]').forEach(el=>{
      el.classList.toggle('ready',ready);
      el.classList.toggle('blocked',!ready);
      const span=el.querySelector('span');
      if(span) span.textContent=ready?readyText:blockedText;
    });
  }

  function append(role,text){
    state.transcript.push({role,text,at:new Date().toISOString()});
    const log=$('[data-chat-log]');
    if(log){
      const div=document.createElement('div');
      div.className='chat-msg '+role;
      div.innerHTML=esc(text).replace(/\n/g,'<br>');
      log.appendChild(div);
      log.scrollTop=log.scrollHeight;
    }
  }

  function addToolTrace(name,result){
    const trace={name,at:new Date().toISOString(),result};
    state.toolTraces.push(trace);
    renderToolLog();
    return trace;
  }

  function renderToolLog(){
    const log=$('[data-tool-log]');
    if(!log) return;
    if(!state.toolTraces.length){
      log.innerHTML='<div>Sin function calls ejecutadas.</div>';
      return;
    }
    log.innerHTML=state.toolTraces.slice(-8).map(t=>'<div><strong>'+esc(t.name)+'</strong><br>'+esc(JSON.stringify(t.result).slice(0,300))+'</div>').join('');
  }

  function mimeFor(file){
    const lower=file.name.toLowerCase();
    if(file.type) return file.type;
    if(lower.endsWith('.md')) return 'text/markdown';
    if(lower.endsWith('.json')) return 'application/json';
    if(lower.endsWith('.html')) return 'text/html';
    if(lower.endsWith('.txt')) return 'text/plain';
    if(lower.endsWith('.pdf')) return 'application/pdf';
    if(lower.endsWith('.png')) return 'image/png';
    if(lower.endsWith('.jpg')||lower.endsWith('.jpeg')) return 'image/jpeg';
    if(lower.endsWith('.webp')) return 'image/webp';
    return 'application/octet-stream';
  }

  function isText(mime,name){
    return mime.startsWith('text/')||mime==='application/json'||name.toLowerCase().endsWith('.md');
  }

  function classifyMime(mime){
    if(isText(mime,'')) return {capability:'text',kind:'text',supported:true};
    if(mime==='application/pdf') return {capability:'document',kind:'inline',supported:true};
    if(['image/png','image/jpeg','image/webp'].includes(mime)) return {capability:'image',kind:'inline',supported:true};
    return {capability:'unsupported',kind:'unsupported',supported:false};
  }

  function readFile(file){
    const mime=mimeFor(file);
    const classification=classifyMime(mime);
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onerror=()=>reject(reader.error);
      reader.onload=()=>{
        const result=String(reader.result||'');
        if(classification.kind==='text'){
          resolve({name:file.name,mime,size:file.size,kind:'text',capability:classification.capability,supported:true,text:result});
        }else if(classification.kind==='inline'){
          resolve({name:file.name,mime,size:file.size,kind:'inline',capability:classification.capability,supported:true,data:result.split(',')[1]||''});
        }else{
          resolve({name:file.name,mime,size:file.size,kind:'unsupported',capability:'unsupported',supported:false});
        }
      };
      if(classification.kind==='text') reader.readAsText(file);
      else if(classification.kind==='inline') reader.readAsDataURL(file);
      else reader.readAsArrayBuffer(file);
    });
  }

  function renderFiles(){
    const list=$('[data-file-list]');
    if(!list) return;
    if(!state.files.length){
      list.innerHTML='<p>No hay archivos cargados.</p>';
      setCapability('files',false,'Anexos listos para Gemini.','Carga texto, PDF o imagenes.');
      return;
    }
    list.innerHTML=state.files.map(f=>{
      const label=f.supported?f.capability:'no soportado';
      return '<div class="file-pill"><span>'+esc(f.name)+'</span><span>'+esc(label)+' · '+esc(f.mime)+' · '+Math.round(f.size/1024)+'KB</span></div>';
    }).join('');
    setCapability('files',state.files.some(f=>f.supported),'Anexos listos para Gemini.','Carga texto, PDF o imagenes.');
  }

  function selectedMode(){
    return $('[data-gemini-mode]:checked')?.value||'facilitator';
  }

  function modeInstruction(mode){
    const common='Actua como facilitador senior de MetodologIA y guia BMAD. Responde en espanol, con pasos concretos, criterios de terminado y advertencias de privacidad cuando aplique. No pidas tokens ni secretos.';
    if(mode==='image') return common+' Modo imagen: describe solo contenido visible, texto legible, objetos, diagramas, tablas, contexto de taller y relacion con diagnostico de productividad. No identifiques personas, no infieras atributos sensibles y no hagas diagnosticos medicos, legales ni laborales.';
    if(mode==='annex') return common+' Modo anexo: resume estructura del documento, hallazgos, requisitos, riesgos, decisiones, criterios de aceptacion y como convertirlo en insumo BMAD/BMAP.';
    if(mode==='tools') return common+' Modo tools: usa function calling cuando necesites diagnostico local, clasificacion de anexos, resumen del repo, handoff BMAD o limpiar token. Explica cada tool usada.';
    return common+' Modo facilitador: ayuda a materializar la mini app con BMAD BMM+BMB+TEA, Antigravity y Codex usando el contenido del repo y los anexos cargados.';
  }

  function repoSummary(){
    return state.repoContext?state.repoContext.slice(0,60000):'Contexto del repo no cargado desde la UI. Usa los archivos locales y los documentos enlazados como referencia si el usuario los cargo manualmente.';
  }

  function buildParts(question,mode){
    const transcript=state.transcript.slice(-8).map(m=>m.role.toUpperCase()+': '+m.text).join('\n');
    const fileSummary=state.files.map(({name,mime,size,kind,capability,supported})=>({name,mime,size,kind,capability,supported}));
    const parts=[{text:modeInstruction(mode)+'\n\nCONTEXTO_REPO:\n'+repoSummary()+'\n\nARCHIVOS_CARGADOS_METADATA:\n'+JSON.stringify(fileSummary,null,2)+'\n\nTRANSCRIPCION_RECIENTE:\n'+transcript+'\n\nPREGUNTA_USUARIO:\n'+question}];
    for(const f of state.files){
      if(!f.supported) continue;
      if(f.kind==='text') parts.push({text:'\nARCHIVO '+f.name+' ('+f.mime+'):\n'+(f.text||'').slice(0,35000)});
      if(f.kind==='inline') parts.push({inline_data:{mime_type:f.mime,data:f.data}});
    }
    return parts;
  }

  function buildPayload(question,options={}){
    const model=options.model||($('[data-gemini-model]')?.value.trim()||'gemini-2.5-flash');
    const mode=options.mode||selectedMode();
    const parts=buildParts(question,mode);
    return {
      model,
      body:{
        contents:[{role:'user',parts}],
        generationConfig:{temperature:0.35},
        tools:[{functionDeclarations}],
        toolConfig:{functionCallingConfig:{mode:mode==='tools'?'AUTO':'AUTO'}}
      }
    };
  }

  function extractText(json){
    return (json.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').filter(Boolean).join('\n').trim();
  }

  function extractFunctionCalls(json){
    const parts=json.candidates?.[0]?.content?.parts||[];
    return parts.map(p=>p.functionCall||p.function_call).filter(Boolean);
  }

  function currentDiagnosticSnapshot(includeQuestions){
    const data=window.MOPStorage?window.MOPStorage.read():{};
    const diagnostic=window.MOPDiagnostic?window.MOPDiagnostic.diagnose(data.activities||[]):{};
    if(!includeQuestions && diagnostic.questions) diagnostic.questionsCount=diagnostic.questions.length;
    if(!includeQuestions && diagnostic.questions) delete diagnostic.questions;
    return {data,diagnostic};
  }

  function classifyFiles(includeCounts){
    const files=state.files.map(({name,mime,size,kind,capability,supported})=>({name,mime,size,kind,capability,supported}));
    const counts=files.reduce((acc,f)=>{acc[f.capability]=(acc[f.capability]||0)+1;return acc;},{});
    return includeCounts?{files,counts}:{files};
  }

  function workshopContextSummary(maxItems){
    const loaded=state.repoLoaded.slice(0,Number(maxItems)||repoFiles.length);
    return {
      loaded,
      expected:repoFiles,
      degraded:repoFiles.filter(f=>!state.repoLoaded.includes(f)),
      chars:state.repoContext.length
    };
  }

  function executeToolCall(call){
    const name=call.name;
    const args=call.args||{};
    let result;
    if(name==='get_diagnostic_snapshot') result=currentDiagnosticSnapshot(!!args.include_questions);
    else if(name==='classify_uploaded_annexes') result=classifyFiles(!!args.include_counts);
    else if(name==='build_bmad_handoff'){
      const out=handoff();
      result=args.format==='markdown'?{markdown:out.md}:args.format==='json'?{json:JSON.parse(out.json)}:{markdown:out.md,json:JSON.parse(out.json)};
    }else if(name==='summarize_workshop_context') result=workshopContextSummary(args.max_items);
    else if(name==='clear_gemini_token'){
      if(!args.confirm) throw new Error('clear_gemini_token requiere confirm=true');
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(LOCAL_KEY);
      result={cleared:true};
      renderTokenStatus();
    }else{
      throw new Error('Tool no permitida: '+name);
    }
    addToolTrace(name,result);
    return result;
  }

  async function callGemini(apiKey,payload){
    const endpoint='https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(payload.model)+':generateContent?key='+encodeURIComponent(apiKey);
    const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload.body)});
    const raw=await res.text();
    if(!res.ok) throw new Error(raw.slice(0,900));
    return JSON.parse(raw);
  }

  async function send(questionOverride,modeOverride){
    const input=$('[data-chat-input]');
    const question=(questionOverride||(input?.value||'')).trim();
    if(!question) return;
    saveToken();
    const apiKey=storedToken();
    append('user',question);
    if(input && !questionOverride) input.value='';
    if(!apiKey){
      append('error','Pega tu API token de Google AI Studio para activar Gemini. Sin token, el workshop sigue funcionando en modo local.');
      return;
    }
    const payload=buildPayload(question,{mode:modeOverride||selectedMode()});
    try{
      const first=await callGemini(apiKey,payload);
      const calls=extractFunctionCalls(first);
      if(calls.length){
        const responses=calls.map(call=>{
          const result=executeToolCall(call);
          const functionResponse={name:call.name,response:{result}};
          if(call.id) functionResponse.id=call.id;
          return {functionResponse};
        });
        const modelContent=first.candidates?.[0]?.content;
        const followupBody=Object.assign({},payload.body,{
          contents:[
            ...payload.body.contents,
            modelContent,
            {role:'user',parts:responses}
          ].filter(Boolean)
        });
        const final=await callGemini(apiKey,{model:payload.model,body:followupBody});
        append('assistant',extractText(final)||'Gemini ejecuto tools, pero respondio sin texto final.');
      }else{
        append('assistant',extractText(first)||'Gemini respondio sin texto.');
      }
    }catch(err){
      append('error','Error al llamar Gemini: '+(err.message||err));
    }
  }

  async function loadRepoContext(){
    const status=$('[data-repo-context-status]');
    const list=$('[data-repo-context-list]');
    if(status) status.textContent='Cargando documentos locales del repo...';
    const loaded=[];
    const chunks=[];
    for(const file of repoFiles){
      try{
        const res=await fetch(file,{cache:'no-store'});
        if(!res.ok) throw new Error(String(res.status));
        const text=await res.text();
        loaded.push(file);
        chunks.push('\n--- '+file+' ---\n'+text.slice(0,28000));
      }catch(err){
        chunks.push('\n--- '+file+' ---\nNo disponible en este contexto de navegador: '+err.message);
      }
    }
    state.repoLoaded=loaded;
    state.repoContext=chunks.join('\n');
    if(status) status.textContent='Contexto cargado: '+loaded.length+' de '+repoFiles.length+' documentos.';
    if(list) list.innerHTML=repoFiles.map(f=>'<div class="file-pill"><span>'+esc(f)+'</span><span>'+ (loaded.includes(f)?'cargado':'degradado') +'</span></div>').join('');
  }

  function handoff(){
    const appState=window.MOPStorage?window.MOPStorage.read():{};
    const payload={
      generatedAt:new Date().toISOString(),
      source:'workshop-bmad.html',
      bmad:{
        modules:['bmm','bmb','tea'],
        tools:['antigravity','codex'],
        nextCommands:['bmad-help','bmad-create-prd','bmad-create-architecture','bmad-create-epics-and-stories','bmad-check-implementation-readiness','bmad-sprint-planning']
      },
      gemini:{
        model:$('[data-gemini-model]')?.value.trim()||'gemini-2.5-flash',
        tokenState:tokenLocation()==='none'?'absent':'provided-not-exported',
        modes:['facilitator','image','annex','tools'],
        functionDeclarations:functionDeclarations.map(f=>f.name)
      },
      repoContextLoaded:state.repoLoaded,
      files:state.files.map(({name,mime,size,kind,capability,supported})=>({name,mime,size,kind,capability,supported})),
      transcript:state.transcript,
      toolTraces:state.toolTraces,
      appState
    };
    const md='# Workshop BMAD Handoff\n\n## Siguiente accion\n\nEjecutar bmad-help en Antigravity desde la raiz del repo y usar este handoff como contexto.\n\n## Comandos\n\n'+payload.bmad.nextCommands.map(c=>'- '+c).join('\n')+'\n\n## Gemini\n\n- Modelo: '+payload.gemini.model+'\n- Token: '+payload.gemini.tokenState+'\n- Tools: '+payload.gemini.functionDeclarations.join(', ')+'\n\n## Archivos cargados\n\n'+(payload.files.map(f=>'- '+f.name+' | '+f.mime+' | '+f.capability+' | '+f.kind).join('\n')||'Sin archivos cargados')+'\n\n## Tool traces\n\n'+(state.toolTraces.map(t=>'- '+t.name+' @ '+t.at).join('\n')||'Sin function calls')+'\n\n## Conversacion\n\n'+(state.transcript.map(m=>'### '+m.role+'\n'+m.text).join('\n\n')||'Sin conversacion')+'\n';
    const json=JSON.stringify(payload,null,2);
    const mdEl=$('[data-workshop-handoff-md]');
    const jsonEl=$('[data-workshop-handoff-json]');
    if(mdEl) mdEl.value=md;
    if(jsonEl) jsonEl.value=json;
    return {md,json};
  }

  function download(name,text,type){
    const blob=new Blob([text],{type});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  document.addEventListener('click',e=>{
    const step=e.target.closest('[data-step-target]');
    if(step){
      const id=step.dataset.stepTarget;
      $$('[data-step-target]').forEach(b=>b.classList.toggle('active',b===step));
      $$('[data-step-pane]').forEach(p=>p.classList.toggle('active',p.dataset.stepPane===id));
    }
    if(e.target.closest('[data-save-gemini-token]')) saveToken();
    if(e.target.closest('[data-clear-gemini-token]')) clearToken();
    if(e.target.closest('[data-send-chat]')) send();
    if(e.target.closest('[data-analyze-image]')){
      $$('[data-gemini-mode]').forEach(r=>{r.checked=r.value==='image';});
      send('Analiza las imagenes cargadas: describe contenido visible, texto legible, elementos de interfaz o diagramas, y como se relacionan con el diagnostico De Ocupado a Productivo. No identifiques personas ni infieras atributos sensibles.','image');
    }
    if(e.target.closest('[data-analyze-annex]')){
      $$('[data-gemini-mode]').forEach(r=>{r.checked=r.value==='annex';});
      send('Analiza los anexos cargados: resume estructura, hallazgos, requisitos, riesgos, criterios de aceptacion y como usarlos como insumo BMAD/BMAP.','annex');
    }
    if(e.target.closest('[data-clear-chat]')){
      state.transcript=[];
      state.toolTraces=[];
      const log=$('[data-chat-log]');
      if(log) log.innerHTML='<div class="chat-msg assistant">Chat limpio. Carga contexto o formula una nueva pregunta.</div>';
      renderToolLog();
    }
    if(e.target.closest('[data-load-repo-context]')) loadRepoContext();
    if(e.target.closest('[data-generate-workshop-handoff]')) handoff();
    if(e.target.closest('[data-download-workshop-md]')){const out=handoff();download('workshop-bmad-handoff.md',out.md,'text/markdown');}
    if(e.target.closest('[data-download-workshop-json]')){const out=handoff();download('workshop-bmad-handoff.json',out.json,'application/json');}
  });

  document.addEventListener('input',e=>{
    if(e.target.matches('[data-gemini-token]')) saveToken();
  });

  document.addEventListener('change',async e=>{
    if(e.target.matches('[data-workshop-files]')){
      const files=Array.from(e.target.files||[]);
      state.files=[];
      for(const f of files) state.files.push(await readFile(f));
      renderFiles();
    }
    if(e.target.matches('[data-remember-token]')) saveToken();
  });

  const saved=storedToken();
  if(saved&&$('[data-gemini-token]')) $('[data-gemini-token]').value=saved;
  if(localStorage.getItem(LOCAL_KEY)&&$('[data-remember-token]')) $('[data-remember-token]').checked=true;
  renderTokenStatus();
  renderFiles();
  renderToolLog();

  window.MOPGeminiWorkshop={
    buildPayload,
    buildParts,
    classifyFiles,
    executeToolCall,
    extractFunctionCalls,
    clearToken,
    loadRepoContext,
    handoff,
    state,
    functionDeclarations
  };
})();
