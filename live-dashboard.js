/* Live dashboard for the TGPSC preparation companion.
   All learner records stay in the existing browser localStorage key. */
(function(){
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const el=id=>document.getElementById(id);
  const pct=(a,b)=>b?Math.round(a/b*100):0;
  let topicCatalog=[];

  function firstAttemptRows(){
    const firstById=new Map();
    (s.history||[]).filter(r=>r.mode!=="revision").slice().sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(r=>{
      (r.review||[]).forEach(q=>{if(q.id&&!firstById.has(q.id))firstById.set(q.id,q)});
    });
    return [...firstById.values()];
  }
  function collectTopicStats(){
    const rows=firstAttemptRows(),map=new Map();
    topicCatalog.forEach(t=>map.set(t.id,{...t,attempts:0,correct:0,accuracy:null,distinct:new Set()}));
    rows.forEach(q=>{
      const id=q.topicId||"";
      if(!map.has(id))map.set(id,{id,title:q.topic||"Unmapped topic",paper:q.paper,attempts:0,correct:0,accuracy:null,distinct:new Set()});
      const t=map.get(id);t.distinct.add(q.id);t.attempts++;if(q.selected===q.answer)t.correct++;
    });
    return {rows,topics:[...map.values()].map(t=>({...t,attempts:t.distinct.size,accuracy:t.distinct.size?pct(t.correct,t.distinct.size):null}))};
  }
  function badgeStatus(t){
    if(!t.attempts)return "Not started";
    if(t.attempts>=10&&t.accuracy>=80)return "Strong";
    if(t.attempts>=5&&t.accuracy<60)return "Weak";
    if(t.attempts>=5)return "Developing";
    return "Low sample";
  }
  function paperStats(rows,paper){
    const list=rows.filter(q=>q.paper===paper),right=list.filter(q=>q.selected===q.answer).length;
    return {attempts:list.length,right,accuracy:list.length?pct(right,list.length):null};
  }
  function renderTopicList(items,empty){
    if(!items.length)return '<p class="muted small">'+empty+'</p>';
    return '<ul style="padding-left:20px;margin:8px 0">'+items.map(t=>'<li style="margin:7px 0"><b>'+esc(t.title)+'</b><br><span class="muted small">'+t.correct+'/'+t.attempts+' correct · '+t.accuracy+'% · '+t.attempts+' distinct questions</span></li>').join("")+'</ul>';
  }
  function renderCoverage(topics){
    const covered=topics.filter(t=>t.attempts>0).length,total=topicCatalog.length||topics.length;
    const done=topicCatalog.filter(t=>s.studiedTopics?.includes(t.id)).length;
    const untouched=topics.filter(t=>!t.attempts);
    return '<div class="notice"><b>'+covered+'/'+total+' syllabus topics practised ('+pct(covered,total)+'%)</b><br><span class="small">Content marked studied: '+done+'/'+total+'. Studied is not the same as mastered.</span></div>'+
      '<div style="height:10px;background:var(--line);border-radius:99px;overflow:hidden;margin:10px 0"><div style="height:100%;width:'+pct(covered,total)+'%;background:var(--accent);border-radius:99px"></div></div>'+
      '<p class="small"><b>Not yet practised ('+untouched.length+'):</b> '+(untouched.length?untouched.map(t=>esc(t.title)).join(" · "):"All syllabus topics have at least one first-attempt question.")+'</p>';
  }
  function recentActivity(){
    const recent=(s.history||[]).slice(0,5);
    const active=Array.isArray(s.activeSession)&&s.activeSession.length?'<p><b>Session in progress:</b> '+Object.keys(s.answers||{}).filter(id=>s.activeSession.includes(id)).length+'/'+s.activeSession.length+' answered. Your score is added after submission.</p>':"";
    return active+(recent.length?recent.map(r=>'<p>'+new Date(r.date).toLocaleString()+' · '+(r.mode==="revision"?"Revision":"Practice")+' · '+r.right+'/'+r.total+' correct · '+r.marks+'/'+r.maxMarks+' weighted marks</p>').join(""):'<p>No completed practice sessions yet.</p>');
  }
  function render(){
    if(!el("liveKpis"))return;
    const {rows,topics}=collectTopicStats();
    const right=rows.filter(q=>q.selected===q.answer).length;
    const bankTotal=Array.isArray(bank)?bank.length:0;
    const p2=paperStats(rows,2),p1=paperStats(rows,1);
    const strong=topics.filter(t=>t.attempts>=10&&t.accuracy>=80).sort((a,b)=>b.accuracy-a.accuracy).slice(0,5);
    const weak=topics.filter(t=>t.attempts>=5&&t.accuracy<60).sort((a,b)=>a.accuracy-b.accuracy).slice(0,5);
    const covered=topics.filter(t=>t.attempts>0).length,total=topicCatalog.length||topics.length;
    const sessions=(s.history||[]).filter(r=>r.mode!=="revision").length;
    const kpis=[
      ["Questions attempted",rows.length+(s.activeSession||[]).filter(id=>s.answers?.[id]!==undefined).length],
      ["First-attempt accuracy",rows.length?pct(right,rows.length)+"%":"—"],
      ["Question-bank coverage",bankTotal?pct(new Set(rows.map(q=>q.id)).size,bankTotal)+"%":"—"],
      ["Syllabus topics practised",covered+"/"+total]
    ];
    el("liveKpis").innerHTML=kpis.map(([label,value])=>'<div class="card stat"><span class="muted small">'+label+'</span><strong>'+value+'</strong></div>').join("");
    el("liveStrong").innerHTML=renderTopicList(strong,"No strong area confirmed yet. Build a sample of at least 10 distinct first-attempt questions and reach 80%.");
    el("liveWeak").innerHTML=renderTopicList(weak,"No weak area meets the minimum 5-question evidence threshold yet.");
    el("livePapers").innerHTML='<p><b>Paper II · CSE/IT</b><br>'+(p2.accuracy===null?"No attempts yet":p2.accuracy+"% · "+p2.right+"/"+p2.attempts+" correct")+'</p><p><b>Paper I · General Studies</b><br>'+(p1.accuracy===null?"No attempts yet":p1.accuracy+"% · "+p1.right+"/"+p1.attempts+" correct")+'</p><p class="small muted">Question accuracy, not a pass prediction. Paper II carries twice the marks per question.</p>';
    el("liveCoverage").innerHTML=renderCoverage(topics);
    el("liveRecent").innerHTML=recentActivity();
    const mirror=el("liveProgressMirror");
    if(mirror)mirror.innerHTML='<div class="stats">'+kpis.map(([label,value])=>'<div class="card stat"><span class="muted small">'+label+'</span><strong>'+value+'</strong></div>').join("")+'</div><div class="grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px"><div><h3>Strong areas</h3>'+renderTopicList(strong,"Not enough evidence yet.")+'</div><div><h3>Weak areas</h3>'+renderTopicList(weak,"No evidence-qualified weak area yet.")+'</div></div>'+renderCoverage(topics);
    if(document.getElementById("progress")?.classList.contains("active")){
      if(typeof historyView==="function")historyView();
      if(typeof topicMasteryView==="function")topicMasteryView();
    }
  }
  async function initialise(){
    try{
      if(typeof loadBank==="function")await loadBank();
      if((!Array.isArray(cse)||!cse.length)&&typeof fetch==="function"){
        const response=await fetch("./study-data.json");
        if(response.ok){const d=await response.json();cse=(d.syllabus.paper2||[]).map(x=>x.title);gs=(d.syllabus.paper1||[]).map(x=>x.title);}
      }
      topicCatalog=[...(cse||[]).map((title,i)=>({id:"p2-"+String(i+1).padStart(2,"0"),title,paper:2})),...(gs||[]).map((title,i)=>({id:"p1-"+String(i+1).padStart(2,"0"),title,paper:1}))];
      if(typeof migrateHistoryMetadata==="function")migrateHistoryMetadata();
      render();
    }catch(error){console.warn("Live dashboard initialisation:",error)}
  }
  /* Wrap the existing save function. Every app action already calls save(),
     so the dashboard refreshes without separate manual refresh controls. */
  const originalSave=window.save;
  if(typeof originalSave==="function"){
    window.save=function(){const result=originalSave.apply(this,arguments);render();return result};
  }
  const originalShow=window.show;
  if(typeof originalShow==="function"){
    window.show=function(view){const result=originalShow.apply(this,arguments);if(view==="home"||view==="progress")render();return result};
  }
  window.addEventListener("storage",event=>{
    if(event.key==="tgpscState"&&event.newValue){
      try{s=JSON.parse(event.newValue);render()}catch(error){console.warn("Could not refresh dashboard from another tab",error)}
    }
  });
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)render()});
  initialise();
})();
