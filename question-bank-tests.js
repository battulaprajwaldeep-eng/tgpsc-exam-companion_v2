// Run with: node question-bank-tests.js
// Dependency-free integrity and selection regression tests.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const bank = JSON.parse(fs.readFileSync("question-bank.json", "utf8"));
const ids = bank.questions.map(q => q.id);
assert.equal(new Set(ids).size, ids.length, "question IDs must be unique");
for (const q of bank.questions) {
  assert.ok(q.id && [1, 2].includes(q.paper) && q.topicId && q.topic && q.subtopic, "required identity and syllabus fields");
  assert.ok(["standard", "moderate", "advanced"].includes(q.difficulty), "difficulty must be classified");
  assert.ok(typeof q.stem === "string" && q.stem.trim(), "question stem required");
  assert.equal(q.options.length, 4, "exactly four options");
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, "answer index must be valid");
  assert.equal(q.explanations.length, 4, "one explanation per option");
  assert.ok(q.explanations.every(x => typeof x === "string" && x.trim()), "all option explanations required");
}
function shuffled(items) { const a=[...items]; for(let n=a.length-1;n>0;n--){const j=Math.floor(Math.random()*(n+1));[a[n],a[j]]=[a[j],a[n]];} return a; }
function selectBalanced(pool,count) {
  const candidates=shuffled(pool),chosen=[],topicCounts=new Map();
  while(chosen.length<count&&candidates.length){
    let best=-1,bestScore=-Infinity;
    for(let n=0;n<candidates.length;n++){
      const q=candidates[n],topic=String(q.topicId||q.topic||"unknown"),difficulty=q.difficulty||"moderate";
      const score=-(topicCounts.get(topic)||0)*100+(difficulty==="advanced"?2:difficulty==="moderate"?1:0)+Math.random();
      if(score>bestScore){bestScore=score;best=n;}
    }
    const q=candidates.splice(best,1)[0];chosen.push(q);
    const topic=String(q.topicId||q.topic||"unknown");topicCounts.set(topic,(topicCounts.get(topic)||0)+1);
  }
  return chosen;
}
function nextSession(questions, attemptedIds) {
  const attempted=new Set(attemptedIds),seen=new Set();
  const unused=questions.filter(q=>!attempted.has(q.id)&&!seen.has(q.id)&&seen.add(q.id));
  const p2=selectBalanced(unused.filter(q=>q.paper===2),5),p1=selectBalanced(unused.filter(q=>q.paper===1),5);
  return p2.length<5||p1.length<5?null:[...p2,...p1];
}
const sample=nextSession(bank.questions,[]);
if(bank.questions.filter(q=>q.paper===2).length>=5&&bank.questions.filter(q=>q.paper===1).length>=5){
  assert.equal(sample.length,10);assert.equal(sample.filter(q=>q.paper===2).length,5);assert.equal(sample.filter(q=>q.paper===1).length,5);
  assert.equal(new Set(sample.map(q=>q.id)).size,10);
}
const large=Array.from({length:3500},(_,i)=>({id:"T"+i,paper:i%2?1:2,topicId:"topic-"+(i%16),difficulty:["standard","moderate","advanced"][i%3]}));
// Make an exactly balanced synthetic bank to verify hundreds of full sessions.
const synthetic=Array.from({length:3500},(_,i)=>({id:"S"+i,paper:i<1750?2:1,topicId:"topic-"+(i%16),difficulty:["standard","moderate","advanced"][i%3]}));
const attempted=[];let sessions=0;
while(true){const batch=nextSession(synthetic,attempted);if(!batch)break;assert.equal(new Set(batch.map(q=>q.id)).size,10);for(const q of batch){assert.ok(!attempted.includes(q.id));attempted.push(q.id);}sessions++;}
assert.equal(sessions,350,"3,500 balanced synthetic questions should yield 350 non-repeating 5+5 sessions");
assert.equal(new Set(attempted).size,3500);
assert.equal(nextSession(synthetic,attempted),null,"exhausted bank must not repeat");
assert.ok(large.length===3500);
console.log("PASS: current bank schema, unique IDs, answer/explanation shape, balanced 5+5 selection, 175 sessions from 3,500 synthetic questions, and clean exhaustion.");
