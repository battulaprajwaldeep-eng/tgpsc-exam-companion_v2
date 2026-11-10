const CACHE="tgpsc-companion-v30";
const FILES=["./","./index.html","./learning-centre.html","./memory-tricks.html","./audio-study.html","./audio-tts-local-worker.js","./study-tracker.js","./live-dashboard.js","./manifest.webmanifest","./study-data.json","./question-bank.json","./government-exams.html","./batch-import.html"];
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