/* Evidence-based syllabus and study-time tracker.
   Loads after index.html so it can use the app's existing local state and question bank. */
s.schemaVersion=3;
s.studiedTopics=s.studiedTopics||[];
s.studyLogs=s.studyLogs||[];

function trackerTopicId(paper,index){return (paper===2?"p2-":"p1-")+String(index+1).padStart(2,"0")}
function trackerTopics(){return [...cse.map((title,i)=>({id:trackerTopicId(2,i),title,paper:2})),...gs.map((title,i)=>({id:trackerTopicId(1,i),title,paper:1}))]}
function trackerEscape(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]))}

/* Always replace legacy labels with the canonical question-bank metadata.
   Unmatched IDs are counted, never guessed or fuzzy-mapped. */
function migrateHistoryMetadata(){
  let changed=false,mapped=0,unmapped=0;
  (s.history||[]).forEach(record=>(record.review||[]).forEach(attempt=>{
    const source=bank.find(q=>q.id===attempt.id);
    if(!source){unmapped++;return}
    mapped++;
    ["topicId","topic","subtopic"].forEach(key=>{
      const canonical=source[key]||"";
      if((attempt[key]||"")!==canonical){attempt[key]=canonical;changed=true}
    });
  }));
  const previous=s.metadataMigration||{};
  s.metadataMigration={version:3,at:new Date().toISOString(),mapped,unmapped};
  if(changed||previous.version!==3)save();
  return s.metadataMigration;
}

function trackerDelayedRevisionSuccess(topicId){
  const firstMiss=new Map();
  (s.history||[]).filter(r=>r.mode!=="revision").forEach(r=>(r.review||[]).forEach(q=>{
    if(q.topicId===topicId&&q.selected!==q.answer)firstMiss.set(q.id,new Date(r.date).getTime());
  }));
  return (s.history||[]).filter(r=>r.mode==="revision").some(r=>(r.review||[]).some(q=>
    q.topicId===topicId&&q.selected===q.answer&&firstMiss.has(q.id)&&
    new Date(r.date).getTime()-firstMiss.get(q.id)>=86400000
  ));
}
function trackerTopicEvidence(id){
  const rows=performanceRows().filter(q=>q.topicId===id);
  const distinct=new Set(rows.map(q=>q.id)).size;
  const correct=rows.filter(q=>q.selected===q.answer).length;
  const accuracy=rows.length?Math.round(correct/rows.length*100):null;
  let label="Not started";
  if(distinct>=15&&accuracy>=80&&trackerDelayedRevisionSuccess(id))label="Mastered";
  else if(distinct>=15&&accuracy>=80)label="Mastery check due";
  else if(distinct>=5&&accuracy<60)label="Needs revision";
  else if(distinct>=5)label="Practising";
  else if(distinct>0||s.studyLogs.some(x=>x.topicId===id))label="Learning";
  return {label,distinct,accuracy};
}

function syllabusView(){
  $("syllabusList").innerHTML=cse.map((title,i)=>trackerTopicRow(trackerTopicId(2,i),title)).join("");
  $("paper1List").innerHTML=gs.map((title,i)=>trackerTopicRow(trackerTopicId(1,i),title)).join("");
  populateStudyLog();
  renderStudyLog();
}
function trackerTopicRow(id,title){
  const e=trackerTopicEvidence(id);
  const checked=s.studiedTopics.includes(id);
  return '<div style="padding:10px 0;border-bottom:1px solid var(--line)"><label style="display:flex;gap:10px;align-items:flex-start"><input style="width:auto;margin-top:7px" type="checkbox" '+(checked?"checked":"")+' onchange="toggleStudiedTopic(\''+id+'\',this.checked)"><span><b>'+trackerEscape(title)+'</b><br><span class="small muted">Content studied · '+e.label+' · '+e.distinct+' distinct questions · '+(e.accuracy===null?"no score":e.accuracy+"% accuracy")+'</span></span></label></div>';
}
function toggleStudiedTopic(id,checked){
  s.studiedTopics=s.studiedTopics.filter(x=>x!==id);
  if(checked)s.studiedTopics.push(id);
  save();syllabusView();
}

function populateStudyLog(){
  const select=$("logTopic");if(!select)return;
  const previous=select.value;
  select.innerHTML=trackerTopics().map(x=>'<option value="'+x.id+'">'+(x.paper===2?"Paper II · ":"Paper I · ")+trackerEscape(x.title)+'</option>').join("");
  if(trackerTopics().some(x=>x.id===previous))select.value=previous;
}
function logStudyBlock(){
  const topicId=$("logTopic").value,minutes=Number($("logMinutes").value);
  if(!topicId||!Number.isFinite(minutes)||minutes<5||minutes>600){alert("Enter a valid study duration between 5 and 600 minutes.");return}
  const topic=trackerTopics().find(x=>x.id===topicId);
  s.studyLogs.unshift({date:new Date().toISOString(),topicId,topic:topic?.title||topicId,paper:topic?.paper||1,activity:$("logActivity").value,minutes,note:$("logNote").value.trim()});
  save();$("logMinutes").value="";$("logNote").value="";renderStudyLog();
}
function renderStudyLog(){
  const summary=$("studyLogSummary"),history=$("studyLogHistory");if(!summary||!history)return;
  const now=new Date(),start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-((start.getDay()+6)%7));
  const end=new Date(start);end.setDate(end.getDate()+7);
  const week=s.studyLogs.filter(x=>new Date(x.date)>=start&&new Date(x.date)<end);
  const minutes=week.reduce((n,x)=>n+x.minutes,0);
  const p2=week.filter(x=>x.paper===2).reduce((n,x)=>n+x.minutes,0),p1=minutes-p2;
  const total=cse.length+gs.length,studied=s.studiedTopics.length;
  summary.innerHTML="<b>This week:</b> "+(minutes/60).toFixed(1)+" logged hours / 10 weekday target hours.<br><b>Paper II:</b> "+(p2/60).toFixed(1)+" h · <b>Paper I:</b> "+(p1/60).toFixed(1)+" h.<br><b>Content marked studied:</b> "+studied+"/"+total+" syllabus topics. Practice accuracy and mastery are tracked separately.";
  history.innerHTML=week.length?"<p><b>Study blocks this week</b></p>"+week.slice(0,10).map(x=>"<p>"+new Date(x.date).toLocaleDateString()+" · "+trackerEscape(x.topic)+" · "+trackerEscape(x.activity)+" · "+x.minutes+" min"+(x.note?" · "+trackerEscape(x.note):"")+"</p>").join(""):"<p>No study blocks logged this week yet. Log actual time; do not estimate it.</p>";
}

/* Export runs the metadata migration first, so the exported file contains the
   canonical topic IDs and subtopics even if the Progress screen was never opened. */
async function exportData(){
  await loadBank();
  const migration=migrateHistoryMetadata();
  save();
  const blob=new Blob([JSON.stringify(s,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="tgpsc-progress-backup.json";a.click();URL.revokeObjectURL(a.href);
  if(migration.unmapped)alert("Backup exported. "+migration.unmapped+" historical question records could not be matched to the current question bank; they remain unmapped.");
}
async function importData(){
  const file=$("importFile").files[0];if(!file)return alert("Choose a backup file first.");
  const reader=new FileReader();
  reader.onload=async()=>{
    try{
      const imported=JSON.parse(reader.result);
      if(!Array.isArray(imported.history)||!Array.isArray(imported.completed))throw Error("Invalid backup structure.");
      s={...s,...imported,attemptedIds:imported.attemptedIds||[],studiedTopics:imported.studiedTopics||[],studyLogs:imported.studyLogs||[]};
      await loadBank();migrateHistoryMetadata();save();syllabusView();historyView();topicMasteryView();renderStudyLog();
      alert("Backup imported and matched question metadata was normalised.");
    }catch(error){alert(error.message||"Invalid backup file.")}
  };
  reader.readAsText(file);
}
