const CACHE="tgpsc-companion-v45";
const CORE_FILES=["./","./index.html","./app-ui.css","./learning-centre.html","./memory-tricks.html","./audio-study.html","./audio-tts-local-worker.js","./study-tracker.js","./live-dashboard.js","./manifest.webmanifest","./study-data.json","./question-bank.json","./government-exams.html","./batch-import.html"];
const TOPIC_IMAGES=["./assets/topic-images/p1-01.svg","./assets/topic-images/p1-02.svg","./assets/topic-images/p1-03.svg","./assets/topic-images/p1-04.svg","./assets/topic-images/p1-05.svg","./assets/topic-images/p1-06.svg","./assets/topic-images/p1-07.svg","./assets/topic-images/p1-08.svg","./assets/topic-images/p1-09.svg","./assets/topic-images/p1-10.svg","./assets/topic-images/p1-11.svg","./assets/topic-images/p1-12.svg","./assets/topic-images/p1-13.svg","./assets/topic-images/p1-14.svg","./assets/topic-images/p1-15.svg","./assets/topic-images/probability-statistics-v2.svg","./assets/topic-images/p2-02.svg","./assets/topic-images/p2-03.svg","./assets/topic-images/p2-04.svg","./assets/topic-images/p2-05.svg","./assets/topic-images/p2-06.svg","./assets/topic-images/p2-07.svg","./assets/topic-images/p2-08.svg","./assets/topic-images/p2-09.svg","./assets/topic-images/p2-10.svg","./assets/topic-images/p2-11.svg","./assets/topic-images/p2-12.svg","./assets/topic-images/p2-13.svg","./assets/topic-images/p2-14.svg","./assets/topic-images/p2-15.svg","./assets/topic-images/p2-16.svg"];
const FILES=[...CORE_FILES,...TOPIC_IMAGES];
self.addEventListener("install",event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(FILES.map(async path=>{
    try{const response=await fetch(path,{cache:"no-store"});if(response.ok)await cache.put(path,response);}catch(_){}
  }));
  await self.skipWaiting();
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    try{
      const response=await fetch(request,{cache:"no-store"});
      if(response&&response.ok){
        const cache=await caches.open(CACHE);
        await cache.put(request,response.clone());
      }
      return response;
    }catch(_){
      const cached=await caches.match(request);
      if(cached)return cached;
      if(request.mode==="navigate")return (await caches.match("./index.html"))||Response.error();
      return Response.error();
    }
  })());
});