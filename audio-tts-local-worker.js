// Local-only browser TTS worker. No speech text or audio is sent to a generation API.
import { predict } from "https://esm.sh/@the-vedantic-coder/piper-tts-web@1.0.10?bundle";
self.onmessage=async(event)=>{
  const data=event.data||{};
  try{
    if(data.type!=="generate")return;
    const blob=await predict({text:data.text,voiceId:data.voiceId},(p)=>{
      const total=Number(p&&p.total)||0,loaded=Number(p&&p.loaded)||0;
      const message=total?"Downloading voice model: "+Math.round(loaded/total*100)+"%":"Downloading voice model…";
      self.postMessage({type:"progress",message});
    });
    self.postMessage({type:"audio",blob,index:data.index,total:data.total});
  }catch(error){self.postMessage({type:"error",message:error&&error.message?error.message:String(error)});}
};
