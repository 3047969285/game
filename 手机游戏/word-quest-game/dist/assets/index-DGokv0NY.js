var Rd=Object.defineProperty;var Pd=(r,e,t)=>e in r?Rd(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var X=(r,e,t)=>Pd(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Id=["college_english_rw3","cet4","cet6"],Ld="college_english_rw3",Dd={college_english_rw3:"读写3",cet4:"四级",cet6:"六级"},To=new Map;async function ns(r){if(To.has(r))return To.get(r);const e=await fetch(r);if(!e.ok)throw new Error(`Failed to load ${r}`);const t=await e.json();return To.set(r,t),t}async function Nd(r){return ns(`./data/templates/${r}.json`)}async function Ud(r){const e=await ns(`./data/vocabulary/${r}.json`);return new Map(e.words.map(t=>[t.id,t]))}async function Fd(r){const e=`./data/content/${r}`,[t,n,i]=await Promise.all([ns(`${e}/listening.json`),ns(`${e}/reading.json`),ns(`${e}/translation.json`)]);return{listening:new Map(t.items.map(s=>[s.id,s])),reading:new Map(n.items.map(s=>[s.id,s])),translation:new Map(i.items.map(s=>[s.id,s]))}}async function Od(){const r=new Map;return await Promise.all(Array.from({length:6},async(e,t)=>{const n=`unit${String(t+1).padStart(2,"0")}`,i=await ns(`./data/content/college_english_rw3/${n}.json`);r.set(n,i)})),r}function Bd(r){const e=r.levels.find(i=>i.id.endsWith("_boss"));if(e!=null&&e.word_ids.length)return[...e.word_ids];const t=r.levels.find(i=>i.id.endsWith("_read"));if(t!=null&&t.word_ids.length)return[...t.word_ids];const n=new Set;for(const i of r.levels)for(const s of i.word_ids)n.add(s);return[...n].sort()}function kd(r){return{id:r.id,title:r.name,word_ids:Bd(r)}}function zd(r,e){var i;if(e.id!=="college_english_rw3")return!1;let t=!1;for(const s of e.zones){if((i=r.levelProgress[s.id])!=null&&i.cleared)continue;s.levels.some(a=>{var c;return(c=r.levelProgress[a.id])==null?void 0:c.cleared})&&(r.levelProgress[s.id]={cleared:!0},t=!0)}const n=r.mapNodeId;if(n&&!/^rw3_unit\d{2}$/.test(n)){const s=e.zones.find(o=>n.startsWith(o.id));s&&s.id!==n&&(r.mapNodeId=s.id,t=!0)}return t}class Gd{constructor(){X(this,"ctx",null)}unlock(){var e;if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}((e=this.ctx)==null?void 0:e.state)==="suspended"&&this.ctx.resume()}play(e){const t=this.ctx;if(!t)return;const n=t.currentTime,i=t.createGain();i.connect(t.destination);const s=(o,a,c,l,h="sine")=>{const u=t.createOscillator(),d=t.createGain();u.type=h,u.frequency.setValueAtTime(o,n+a),d.gain.setValueAtTime(1e-4,n+a),d.gain.exponentialRampToValueAtTime(l,n+a+.01),d.gain.exponentialRampToValueAtTime(1e-4,n+a+c),u.connect(d),d.connect(i),u.start(n+a),u.stop(n+a+c+.02)};switch(e){case"click":i.gain.value=.25,s(880,0,.06,.4,"triangle");break;case"nav":i.gain.value=.2,s(520,0,.08,.35),s(780,.04,.1,.25);break;case"start":i.gain.value=.28,s(440,0,.12,.4),s(660,.08,.15,.35);break;case"win":i.gain.value=.35,[523,659,784,1046].forEach((o,a)=>s(o,a*.1,.22,.4));break}}}const Oe=new Gd;function Cc(){return{courseId:Ld,levelProgress:{},mapNodeId:"",discoveredWords:[],wordMemory:{}}}const du="word_quest_save_v2",Vd="word_quest_save_v1";function Hd(r){const e=Cc();if(!r)return e;const t={};if(r.levelProgress&&typeof r.levelProgress=="object")for(const[i,s]of Object.entries(r.levelProgress))s!=null&&s.cleared&&(t[i]={cleared:!0});const n=r.wordMemory&&typeof r.wordMemory=="object"?r.wordMemory:{};return{courseId:r.courseId??e.courseId,mapNodeId:r.mapNodeId??"",discoveredWords:Array.isArray(r.discoveredWords)?r.discoveredWords:[],levelProgress:t,wordMemory:n}}function Wd(){try{const r=localStorage.getItem(du)??localStorage.getItem(Vd);return Hd(r?JSON.parse(r):null)}catch{return Cc()}}function Xd(r){localStorage.setItem(du,JSON.stringify(r))}function qd(){return{interval:0,ease:2.5,reps:0,dueAt:Date.now(),lastQuality:0}}function $d(r,e,t=Date.now()){let{interval:n,ease:i,reps:s}=r;const o=Math.max(0,Math.min(5,e));o<3?(s=0,n=1):s===0?(n=1,s=1):s===1?(n=6,s=2):(n=Math.max(1,Math.round(n*i)),s+=1),i=i+(.1-(5-o)*(.08+(5-o)*.02)),i<1.3&&(i=1.3);const a=t+n*24*60*60*1e3;return{interval:n,ease:i,reps:s,dueAt:a,lastQuality:o}}function wa(r){return r.reps>0}function bl(r,e=Date.now()){return wa(r)&&r.dueAt<=e}class Rc{constructor(e){X(this,"save");this.save=e??Cc(),this.ensureFields()}static load(){return new Rc(Wd())}persist(){Xd(this.save)}setCourse(e){this.save.courseId=e,this.persist()}ensureFields(){this.save.discoveredWords||(this.save.discoveredWords=[]),this.save.mapNodeId||(this.save.mapNodeId=""),this.save.levelProgress||(this.save.levelProgress={}),this.save.wordMemory||(this.save.wordMemory={})}setMapNode(e){this.save.mapNodeId=e,this.persist()}getMemory(e){return this.save.wordMemory[e]??qd()}gradeWord(e,t){const n=$d(this.getMemory(e),t);this.save.wordMemory[e]=n,t>=3&&!this.save.discoveredWords.includes(e)&&this.save.discoveredWords.push(e),this.persist()}completeLevel(e){var t;(t=this.save.levelProgress[e])!=null&&t.cleared||(this.save.levelProgress[e]={cleared:!0},this.persist())}recordDiscovered(e){this.save.discoveredWords.includes(e)||(this.save.discoveredWords.push(e),this.persist())}isWordDiscovered(e){return this.save.discoveredWords.includes(e)}countDueWords(e,t=Date.now()){return this.getDueWordIds(e,Number.MAX_SAFE_INTEGER,t).length}getDueWordIds(e,t=12,n=Date.now()){const i=[];for(const s of e){const o=this.getMemory(s);if(!bl(o,n))continue;const a=Math.max(0,(n-o.dueAt)/(1440*60*1e3)),c=o.lastQuality<3?2:o.lastQuality<4?1:0;i.push({id:s,score:a*10+c*5+(6-o.ease)})}return i.sort((s,o)=>o.score-s.score),i.slice(0,t).map(s=>s.id)}countDueInSet(e,t=Date.now()){let n=0;for(const i of e)bl(this.getMemory(i),t)&&(n+=1);return n}getLearningStats(e){let t=0,n=0,i=0;for(const s of e){const o=this.getMemory(s);wa(o)&&(t+=1,o.lastQuality>=4&&o.interval>=6&&(n+=1),o.lastQuality<=2&&(i+=1))}return{learned:t,mastered:n,weak:i}}getWeakWordIds(e,t=8,n=new Set){const i=[];for(const s of e){if(n.has(s))continue;const o=this.getMemory(s);!wa(o)||o.lastQuality>2||i.push({id:s,score:(3-o.lastQuality)*10+(6-o.ease)})}return i.sort((s,o)=>o.score-s.score),i.slice(0,t).map(s=>s.id)}}const Vn={width:720,depth:880},Sl={w:216,d:264},fu=-.5,Ct=180,Yd=12,Kd=22,jd=12.5,Zd=6;function Gt(r,e,t){return t(r,e-Ct)+fu}function Tt(r,e){const t=Math.min(1,Math.abs(r)/120),n=t*t*(3-2*t),i=Math.sin(r*.012)*7+Math.cos(e*.009)*6+Math.sin((r*.7+e)*.0075)*5,s=Math.sin(r*.05+e*.028)*1.7+Math.cos(r*.037-e*.045)*1.3,o=Math.sin(r*.19+e*.12)*.4+Math.cos(r*.16-e*.2)*.28;return i*n+s*(.4+.6*n)+o}function Kn(r){let e=r%2147483647;return e<=0&&(e+=2147483646),()=>(e=e*16807%2147483647,(e-1)/2147483646)}function Xr(r){r.traverse(e=>{var n,i;const t=e;(n=t.geometry)==null||n.dispose(),Array.isArray(t.material)?t.material.forEach(s=>s.dispose()):(i=t.material)==null||i.dispose()})}function qt(r,e){e&&(r.remove(e),Xr(e))}function Jd(r){r.traverse(e=>{const t=e;if(!t.isMesh||!t.material)return;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n){i.transparent=!0;const s=i;s.opacity>.5&&(s.opacity=.38)}})}const Qd={vocabulary:{icon:"🌲",bg:"forest"},listening:{icon:"🎧",bg:"coast"},reading:{icon:"📖",bg:"library"},translation:{icon:"✍️",bg:"market"},boss:{icon:"🏛",bg:"temple"},unit:{icon:"📘",bg:"library"}};function pu(r){return Qd[r.type]??{icon:"📍",bg:"plains"}}function mu(r,e){return Gt(r,e,Tt)+.2}function ef(r,e){const t=[];for(let n=0;n<r.zones.length;n++){const i=r.zones[n],s=pu(i),o=n*.55,a=Math.sin(o*.85)*28+(n%2===0?-8:8),c=Ct-140+n*72,l=mu(a,c);t.push({id:i.id,zoneName:i.name,name:tf(i.name),icon:s.icon,theme:s.bg,x:a,y:l,z:c,unlocked:n===0||e.has(r.zones[n-1].id),cleared:e.has(i.id)})}return t}function tf(r){const e=r.match(/Unit\s*(\d+):\s*(.+)/i);return e?`Unit ${e[1]} · ${e[2].trim()}`:r}function nf(r,e){if(r.id==="college_english_rw3")return ef(r,e);const t=[];let n=null,i=0;for(let s=0;s<r.zones.length;s++){const o=r.zones[s],a=pu(o),c=Ct-160+s*52;o.levels.filter(h=>h.word_ids.length>0||h.content_refs&&h.content_refs.length>0).forEach((h,u)=>{const d=i+u*.15,f=Math.sin(d*.42)*(18+s*2)+(s%2===0?-6:6),m=c+u*9,_=mu(f,m);t.push({id:h.id,zoneName:o.name,name:sf(h.title),icon:a.icon,theme:a.bg,x:f,y:_,z:m,unlocked:i===0||n!==null&&e.has(n),cleared:e.has(h.id)}),n=h.id,i+=1})}return t}function sf(r){if(r.includes(" · ")){const e=r.split(" · "),t=e[e.length-1];if(/词汇|阅读|听力|单元挑战/.test(t))return t}return r.replace(/^词汇森林\s*/,"").replace(/^第/,"场景 ").replace(/\s*·\s*/," · ")}function rf(r,e){if(!r.length)return null;if(e){const n=r.find(i=>i.id===e);if(n)return n}const t=r.filter(n=>n.unlocked);return t[t.length-1]??r[0]}const gu={unit01:{x:-60,z:Ct-80},unit02:{x:60,z:Ct-80},unit03:{x:-60,z:Ct},unit04:{x:60,z:Ct},unit05:{x:-60,z:Ct+80},unit06:{x:60,z:Ct+80}},_u={x:0,z:Ct},of=85,af=7;function cf(r,e,t){const n=gu[r]??_u,i=r.split("").reduce((c,l)=>c*31+l.charCodeAt(0),7),s=Kn(i),o=[],a=[];for(const c of e){let l=0,h=0,u=0;do{const f=s()*Math.PI*2,m=10+s()*of;if(h=n.x+Math.cos(f)*m,u=n.z+Math.sin(f)*m,l++,l>60)break}while(a.some(f=>Math.hypot(h-f.x,u-f.z)<af));a.push({x:h,z:u});const d=Gt(h,u,Tt)+1.6;o.push({id:c.id,word:c.word,meaning:c.meaning,x:h,y:d,z:u,collected:!1})}return o}function lf(r){return gu[r]??_u}function hf(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Eo(r){const e=[...r];for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}function vu(r){const e=r.map(t=>t.meaning);return Eo(r.map(t=>{const n=t.contextLine.replace(new RegExp(`\\b(${hf(t.word)})\\b`,"i"),"_____"),i=e.filter(o=>o!==t.meaning),s=Eo(i).slice(0,3);for(;s.length<3;)s.push("（干扰项）");return{wordId:t.id,word:t.word,sentence:n,choices:Eo([t.meaning,...s.slice(0,3)]),answer:t.meaning}}))}function xu(r){return r!=null&&r.length?r.map(e=>({question:e.question,options:e.options,answer:e.answer,explanation:e.explanation})):[]}function uf(r){var e;return xu((e=r==null?void 0:r.sections.reading)==null?void 0:e.questions)}function df(r){var e;return xu((e=r==null?void 0:r.sections.listening)==null?void 0:e.questions)}const wl=[{en:"The fog does not erase language — it erases the moment when a word once meant something to you.",zh:"雾并没有抹掉语言，它抹掉的是某个词曾经对你产生意义的那一刻。"},{en:"To learn a word is not to store it, but to meet it again in a sentence that changes you.",zh:"学一个词，不是把它存进脑子，而是在改变你的句子里与它重逢。"},{en:"Meaning is never born in isolation. It waits at the crossroads of context.",zh:"意义从不孤立诞生，它守在语境的十字路口。"},{en:"You are not walking through levels. You are walking through versions of yourself that can finally speak.",zh:"你穿过的不是关卡，而是一个终于能开口说话的、又一版的自己。"},{en:"Time in the mist moves differently: one minute of attention can weigh more than an hour of memorizing.",zh:"雾中的时间另有一套算法：一分钟的专注，可以重于一小时背诵。"},{en:"Every definition is a small philosophy. Every example, a small life.",zh:"每条释义都是一小段哲学，每个例句都是一小段人生。"},{en:"The exam gate is far, but the question it asks is close: who will you become when the words return?",zh:"考场还远，但它要问的问题很近：当词语归来时，你会成为谁？"},{en:"Reading is a way of refusing to let the world become noise.",zh:"阅读，是一种拒绝让世界沦为噪音的方式。"}];function Pc(r,e){const t=(r+e*3)%wl.length;return wl[t]}function yu(r,e,t){const n=e.toLowerCase(),i=[];return n.startsWith("v")?i.push(`Perhaps to ${r} is not an action, but a decision about who you refuse to remain.`,`You cannot ${r} the fog away — only ${r} your way through it, word by word.`,`In the silence before dawn, travelers learn to ${r} what memory once forgot.`,`Chen writes on stone: "Those who ${r} with patience do not chase meaning — they let it arrive."`):n.startsWith("n")?i.push(`The ${r} you seek is not hidden in a dictionary; it is hiding in the life you have not yet described.`,`Every ${r} in this scene is a door — open it, and the sentence remembers you.`,`Kai whispers through static: "Listen for the ${r}. It names what the fog wants you to forget."`,`Lin calls the ${r} "a small universe compressed into four letters."`):n.startsWith("adj")?i.push(`The path ahead feels ${r}, as if the world is asking whether you are ready to be changed.`,`Nothing here is truly ${r} — only your attention has not yet learned how to see.`,`A ${r} light falls on the page: not bright enough to blind, only enough to reveal.`,`The mist makes everything ${r}, and that is why context matters more than speed.`):n.startsWith("adv")?i.push(`She speaks ${r}, as though each syllable were a stone placed on a bridge you must cross.`,`You read ${r}, letting the sentence breathe before you claim to understand it.`,`The sign was written ${r}: not for haste, but for those who still believe in meaning.`,`Time moves ${r} here — fast for the anxious, slow for the attentive.`):i.push(`"${r}" appears like a question mark at the edge of your understanding.`,`Tonight's shard of memory is ${r} — recover it before the fog rewrites you.`,`The word ${r} waits, patient as philosophy itself.`,`Between knowing and forgetting stands a single word: ${r}.`),i[t%i.length]}function Vs(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ir(r,e){var t;return(t=r.example)!=null&&t.trim()?r.example.trim():yu(r.word,r.pos,e)}function _s(r,e){return new RegExp(`\\b${Vs(e)}\\b`,"i").test(r)}function eo(r,e){const t=new RegExp(`\\b(${Vs(e.word)})\\b`,"i"),n=r.match(t);if(!n||n.index===void 0)return[{type:"text",content:r+" "},{type:"word",content:e.word,wordId:e.id},{type:"text",content:". "}];const i=r.slice(0,n.index),s=r.slice(n.index+n[0].length),o=[];return i&&o.push({type:"text",content:i}),o.push({type:"word",content:n[0],wordId:e.id}),s&&o.push({type:"text",content:s+" "}),o}function ff(r,e){const t=[...r].sort((o,a)=>o.id.localeCompare(a.id)),n=Math.max(1,Math.floor(t.length/e)),i=[];for(let o=0;o<t.length&&i.length<e;o+=n)i.push(t[o]);let s=0;for(;i.length<e&&s<t.length;)i.includes(t[s])||i.push(t[s]),s+=1;return i.slice(0,e)}function to(r,e){const n=[...e.filter(c=>_s(r,c.word))].sort((c,l)=>{const h=r.search(new RegExp(`\\b${Vs(c.word)}\\b`,"i")),u=r.search(new RegExp(`\\b${Vs(l.word)}\\b`,"i"));return h-u});let i=r;const s=[],o=new Set;for(const c of n){const l=new RegExp(`(\\b${Vs(c.word)}\\b)`,"i"),h=i.match(l);!h||h.index===void 0||(h.index>0&&s.push({type:"text",content:i.slice(0,h.index)}),s.push({type:"word",content:h[1],wordId:c.id}),i=i.slice(h.index+h[0].length),o.add(c.id))}i.trim()&&s.push({type:"text",content:i});const a=e.filter(c=>!o.has(c.id));if(a.length){s.push({type:"text",content:" "});for(const c of a)s.push(...eo(ir(c,0),c))}return s}function Ta(r,e,t){let n=ir(r,t);if(e){const s=e.split(new RegExp("(?<=[.!?])\\s+")).find(o=>_s(o,r.word));s&&(n=s.trim())}return{id:r.id,word:r.word,pos:r.pos,meaning:r.meaning,contextLine:n}}function Ao(r,e,t){const n=r.filter(s=>_s(e,s.word));return(n.length?n:t).map((s,o)=>Ta(s,e,o))}function Co(r,e,t){const n=[{type:"text",content:`${r}. `}];return e&&n.push(...to(e,t)),n}function pf(r,e,t,n){var v,b,y,A,w,C,x,T,I,P,L,V,H,D,k,B,Z,ee,he,be;const i=[];for(const ce of n){const Ne=e.get(ce);Ne&&i.push(Ne)}if(!i.length||!t)return[];const s=t.sections.vocabulary,o=(s==null?void 0:s.level_count)??4,a=(s==null?void 0:s.words_per_level)??5,c=((b=(v=t.sections.section_a)==null?void 0:v.passage)==null?void 0:b.trim())??((A=(y=t.sections.reading)==null?void 0:y.passage)==null?void 0:A.trim())??"",l=((C=(w=t.sections.section_b)==null?void 0:w.passage)==null?void 0:C.trim())??"",h=((T=(x=t.sections.section_c)==null?void 0:x.passage)==null?void 0:T.trim())??"",u=((P=(I=t.sections.listening)==null?void 0:I.script)==null?void 0:P.trim())??c,d=[];if(c){const ce=Ao(i,c,i);d.push({kind:"section_a",label:"Section A",title:((L=t.sections.section_a)==null?void 0:L.title)??"Section A",segments:Co(((V=t.sections.section_a)==null?void 0:V.title)??"Section A",c,i),words:ce})}if(l){const ce=Ao(i,l,i.slice(0,10));d.push({kind:"section_b",label:"Section B",title:((H=t.sections.section_b)==null?void 0:H.title)??"Section B",segments:Co(((D=t.sections.section_b)==null?void 0:D.title)??"Section B",l,i),words:ce})}if(h){const ce=Ao(i,h,i.slice(10,20));d.push({kind:"section_c",label:"Section C",title:((k=t.sections.section_c)==null?void 0:k.title)??"Stories of China",segments:Co(((B=t.sections.section_c)==null?void 0:B.title)??"Stories of China",h,i),words:ce})}for(let ce=0;ce<o;ce++){const Ne=i.slice(ce*a,(ce+1)*a);Ne.length&&d.push({kind:"vocab",label:`词汇 Lv${ce+1}`,level:ce+1,totalLevels:o,words:Ne.map((Je,Ue)=>Ta(Je,c||u,ce*a+Ue))})}const f=uf(t);f.length&&d.push({kind:"reading_quiz",label:"阅读理解",title:((Z=t.sections.reading)==null?void 0:Z.title)??"Reading Comprehension",questions:f});const m=df(t);if(u){const ce=i.filter(Je=>_s(u,Je.word)),Ne=[{type:"text",content:`${((ee=t.sections.listening)==null?void 0:ee.title)??"Listening"}. `},...ce.length?to(u,ce):[{type:"text",content:u}]];d.push({kind:"listening",label:"听力理解",title:((he=t.sections.listening)==null?void 0:he.title)??"Listening",script:u,segments:Ne,questions:m})}const _=i.map((ce,Ne)=>Ta(ce,c||u,Ne));d.push({kind:"cloze",label:"语境填空",items:vu(_)});const p=(be=t.sections.translation)==null?void 0:be.sentences;p!=null&&p.length&&d.push({kind:"translation",label:"翻译",sentences:p.map(ce=>({zh:ce.zh,enReference:ce.en_reference,keywords:ce.keywords??[]}))});const g=t.sections.writing;return g!=null&&g.prompt&&d.push({kind:"writing",label:"写作",prompt:g.prompt,outline:g.outline??[]}),d}function mf(r,e,t){if(e){const i=e.split(new RegExp("(?<=[.!?])\\s+")).find(s=>_s(s,r.word));if(i)return i.trim()}return ir(r,t)}function gf(r,e,t,n,i=0){var b,y,A,w,C,x,T,I,P,L,V;const s=[];for(const H of n){const D=e.get(H);D&&s.push(D)}if(s.length===0)return null;const o=((y=(b=t==null?void 0:t.sections.reading)==null?void 0:b.passage)==null?void 0:y.trim())??"",a=((w=(A=t==null?void 0:t.sections.listening)==null?void 0:A.script)==null?void 0:w.trim())??"",c=Pc(i,r.order??i),l=(t==null?void 0:t.title_zh)??r.name,h=(t==null?void 0:t.title)??r.name_en,u=(C=t==null?void 0:t.sections.section_a)==null?void 0:C.title,d=(x=t==null?void 0:t.sections.section_b)==null?void 0:x.title,f=(T=t==null?void 0:t.sections.section_c)==null?void 0:T.title,m=[u,d,f].filter(Boolean).join(" · "),_=[{type:"text",content:`Unit ${i+1} — ${h} `},{type:"text",content:`主题：${(t==null?void 0:t.theme)??"reading & writing"}。`}];if(m&&_.push({type:"text",content:` 教材结构：${m}。 `}),_.push({type:"text",content:c.en+" "}),(I=t==null?void 0:t.sections.reading)!=null&&I.title&&_.push({type:"text",content:` Reading: ${t.sections.reading.title}. `}),o)_.push(...to(o,s));else for(const H of s)_.push(...eo(ir(H,i),H));if(a&&a!==o){_.push({type:"text",content:" Listening script: "});const H=s.filter(D=>_s(a,D.word));H.length?_.push(...to(a,H)):_.push({type:"text",content:a.slice(0,280)+(a.length>280?"…":"")})}const p=(L=(P=t==null?void 0:t.sections.reading)==null?void 0:P.questions)==null?void 0:L[0];p!=null&&p.question&&_.push({type:"text",content:` Comprehension focus: ${p.question} `}),(V=t==null?void 0:t.sections.section_c)!=null&&V.title&&_.push({type:"text",content:` Section C — ${t.sections.section_c.title}: Stories of China in context. `}),_.push({type:"text",content:" Tap every highlighted word — one unit, one scene, full recall."});const g=[l,m?`涵盖 ${m}`:"涵盖阅读与写作",`本幕 ${s.length} 词`,p==null?void 0:p.explanation,c.zh].filter(Boolean),v=pf(r,e,t,n);return{levelId:r.id,title:r.name,settingEn:h,chapter:`${l} · 单元全景（${s.length} 词）`,plotZh:g.join("。")+"。",philosophyZh:c.zh,philosophyEn:c.en,segments:_,words:s.map((H,D)=>({id:H.id,word:H.word,pos:H.pos,meaning:H.meaning,contextLine:mf(H,o||a,i+D)})),rw3Phases:v}}const Tl={vocabulary:[{opening:"Dawn breaks over the Vocabulary Forest. The mist does not hide the trees — it hides the reasons you once cared to remember.",openingZh:"清晨，词汇森林苏醒。雾遮住的不是树，而是你曾经在意去记住的理由。",middle:'Lin kneels by a stone carved with questions, not answers. "A word without context," she says, "is a name without a soul."',closing:"You breathe slowly. The passage below is not a test — it is a mirror.",closingZh:"你放慢呼吸。下面的段落不是考卷，而是一面镜子。"},{opening:"Footprints end at a clearing where students used to debate whether language creates reality, or merely reveals it.",openingZh:"脚印止于一片空地——这里曾有人争论：语言创造现实，还是只是揭示现实。",middle:'The wind turns pages no one is holding. Lin smiles: "Read until the sentence feels like a thought you almost had."',closing:"You step into the text, willing to be changed by a few honest words.",closingZh:"你走进文字，甘愿被几个诚恳的词改变。"},{opening:"Fireflies hover between trunks, each flash a syllable the forest forgot to finish.",openingZh:"萤火在树干间明灭，每一次闪烁都是森林忘了说完的音节。",middle:"Your journal trembles. Not from fear — from recognition. Something in you knows these words already.",closing:"The story opens like a question you are finally ready to answer.",closingZh:"故事像一道你终于准备回答的问题那样展开。"}],listening:[{opening:"In the Listening Cavern, sound becomes philosophy: what reaches your ears is not noise, but the world asking to be understood.",openingZh:"听力洞穴里，声音就是哲学——抵达你耳边的不是噪音，而是渴望被理解的世界。",middle:`Kai's radio hums: "Don't memorize voices. Hear the intention behind them."`,closing:"You listen — not to pass a level, but to let meaning arrive.",closingZh:"你倾听——不为过关，只为让意义抵达。"},{opening:"Water drips in the dark, marking time the way patience marks learning — one drop, one attention.",openingZh:"暗处水滴计时，如同耐心记录学习：一滴，一份专注。",middle:'Echoes return your own breathing. Kai says, "Every clip is someone trying to mean something. Meet them halfway."',closing:"The transcript glows. Understanding is a kind of hospitality.",closingZh:"原文浮现。理解，是一种款待。"}],reading:[{opening:"The Reading Ruins stand like a library after history — still insisting that ideas deserve a home.",openingZh:"阅读废墟像一部历史之后的图书馆——仍坚持思想值得被安放。",middle:`Chen's note reads: "We do not read to finish. We read to become someone who can finish."`,closing:"Dust lifts from the page. Today's passage asks what you are willing to notice.",closingZh:"尘土从书页扬起。今天的段落问你：你愿注意到什么。"},{opening:"Stained glass colors the rubble. Beauty survives in ruins because meaning refuses to die quietly.",openingZh:"彩色玻璃为瓦砾上色。美能在废墟里存活，因为意义拒绝无声死去。",middle:"A margin note: Context first. Definition second. Life always third.",closing:"You read on, granting the text the dignity of your attention.",closingZh:"你继续读下去，把专注这份尊严交给文本。"}],translation:[{opening:"The Translation Workshop smells of ink and distance — every bilingual sign is a small treaty between two worlds.",openingZh:"翻译工坊弥漫着墨香与距离——每块双语招牌都是两个世界之间的小条约。",middle:'Chen says, "To translate is to admit that no language owns the truth alone."',closing:"You listen beneath the market noise for sentences that still want to be understood.",closingZh:"你在市集喧嚣底下，打捞仍想被理解的句子。"},{opening:"Postcards spin in the doorway, each sentence a traveler who once crossed an ocean of meaning.",openingZh:"明信片在门口旋转，每句话都是曾渡过意义之海的旅人。",middle:'A student translator asks, "What if the right word is not correct, but true in context?"',closing:"You join the table where language becomes bridge, not border.",closingZh:"你坐到桌前——语言在此是桥，不是界。"}],unit:[{opening:"The seminar room is quiet in the way philosophy prefers — not empty, but full of unspoken questions.",openingZh:"研讨室的安静是哲学偏爱那种：并不空，而是盛满未说出口的问题。",middle:'Chen writes on the board: "A unit is not a list. It is a worldview trying to introduce itself."',closing:"You turn to the passage, ready to let this chapter rename what you see.",closingZh:"你转向段落，准备让这一章重新命名你所见。"},{opening:"Morning light lands on your textbook like an argument for beginning again.",openingZh:"晨光落在课本上，像在为重新开始辩护。",middle:'Lin leaves a note: "Learn the words, but keep the questions."',closing:"The unit opens — not as homework, but as a scene in a larger life.",closingZh:"单元展开——不是作业，而是更大人生中的一幕。"}],boss:[{opening:"The Temple of Return stands at the road's end. Exams measure performance; journeys measure becoming.",openingZh:"归返圣殿立在路尽头。考试衡量表现，旅程衡量蜕变。",middle:'Lin and Chen meet you at the gate. "This is not a battle," Lin says. "It is everything you learned, speaking at once."',closing:"The doors open. The final passage is not an ending — it is a verdict you write yourself.",closingZh:"大门开启。终章不是结局——是你写给自己的裁决。"}]};function _f(r,e){const t=Tl[r.type]??Tl.vocabulary;return t[e%t.length]}function vf(r,e,t,n=0,i=1){const s=[];for(const d of r.word_ids){const f=t.get(d);f&&s.push(f)}if(s.length===0)return null;const o=_f(e,n),a=Pc(n,e.order??n),c=ff(s,Math.min(6,s.length)),l=c.map((d,f)=>ir(d,n+f)),h=[];h.push({type:"text",content:o.opening+" "}),h.push({type:"text",content:o.middle+" "}),h.push({type:"text",content:a.en+" "});const u=Math.ceil(c.length/2);for(let d=0;d<u;d++)h.push(...eo(l[d],c[d]));h.push({type:"text",content:" "});for(let d=u;d<c.length;d++)h.push(...eo(l[d],c[d]));return h.push({type:"text",content:o.closing+" "}),h.push({type:"text",content:" Tap each glowing word — not to collect it, but to understand why it matters here."}),{levelId:r.id,title:r.title,settingEn:e.name_en,chapter:`${e.name} · 第 ${n+1}/${i} 幕`,plotZh:`${o.openingZh} ${a.zh} ${o.closingZh}`,philosophyZh:a.zh,philosophyEn:a.en,segments:h,words:c.map((d,f)=>({id:d.id,word:d.word,pos:d.pos,meaning:d.meaning,contextLine:l[f]}))}}function El(r,e){const t=r.trim().toLowerCase(),n=[],i=[];for(const a of e.keywords)t.includes(a.toLowerCase())?n.push(a):i.push(a);const s=Math.min(2,e.keywords.length);return{ok:n.length>=s&&t.length>=12,matched:n,missing:i}}const xf=[{en:"The Review Shrine gathers words that asked to return — not because you failed, but because memory is a conversation, not a vault.",zh:"复习圣殿收拢那些主动归来的词——不是因为失败，而是因为记忆是一场对话，不是仓库。"},{en:'Lin lights a single candle: "What fades is not the word, but the attention you once lent it."',zh:"林点亮一支蜡烛：「褪色的不是词，而是你曾借给它的那份专注。」"},{en:"Today's queue is small on purpose. Science prefers many short retrievals over one long stare.",zh:"今天的队列故意很短。科学偏爱多次短提取，胜过一次长久盯视。"}];function yf(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Mf(r,e){var t;return(t=r.example)!=null&&t.trim()?r.example.trim():yu(r.word,r.pos,e)}function bf(r,e){const t=new RegExp(`\\b(${yf(e.word)})\\b`,"i"),n=r.match(t);if(!n||n.index===void 0)return[{type:"text",content:r+" "},{type:"word",content:e.word,wordId:e.id},{type:"text",content:". "}];const i=r.slice(0,n.index),s=r.slice(n.index+n[0].length),o=[];return i&&o.push({type:"text",content:i}),o.push({type:"word",content:n[0],wordId:e.id}),s&&o.push({type:"text",content:s+" "}),o}const Sf=[{en:"The Weak Word Forge does not punish mistakes — it keeps the fire small enough that fragile memories can harden.",zh:"薄弱词熔炉不惩罚错误——它只把火生得足够小，让脆弱的记忆慢慢变硬。"},{en:'Chen says: "A word you almost knew is closer to mastery than a word you never met twice."',zh:"陈说：「差一点记住的词，比从未重逢的词更接近掌握。」"}];function Mu(r,e,t,n){const i=[];for(const h of e){const u=t.get(h);if(u&&i.push(u),i.length>=n)break}if(i.length===0)return null;const s=r==="review"?xf:Sf,o=s[i.length%s.length],a=Pc(i.length,r==="review"?2:5),c=i.map((h,u)=>Mf(h,u+(r==="review"?40:80))),l=[{type:"text",content:o.en+" "},{type:"text",content:a.en+" "}];for(let h=0;h<i.length;h++)l.push(...bf(c[h],i[h]));return l.push({type:"text",content:r==="review"?" Recall each glowing word before the answer appears — this is spaced retrieval, not repetition.":" These words stumbled last time. Give them context again before you judge yourself."}),{levelId:r==="review"?"__review__":"__weak__",title:r==="review"?"间隔复习 · 记忆圣殿":"薄弱巩固 · 记忆熔炉",settingEn:r==="review"?"Shrine of Return":"Forge of Return",chapter:r==="review"?`本轮 ${i.length} 词 · SM-2 到期队列`:`本轮 ${i.length} 词 · 上次回忆薄弱`,plotZh:`${o.zh} ${a.zh}`,philosophyZh:a.zh,philosophyEn:a.en,segments:l,words:i.map((h,u)=>({id:h.id,word:h.word,pos:h.pos,meaning:h.meaning,contextLine:c[u]}))}}function wf(r,e,t=12){return Mu("review",r,e,t)}function Tf(r,e,t=8){return Mu("weak",r,e,t)}const Ef=180;class Af{constructor(e){X(this,"canvas");X(this,"ctx");X(this,"bounds",{minX:-40,maxX:40,minZ:0,maxZ:400});X(this,"relief");X(this,"reliefKey","");this.canvas=e,this.ctx=e.getContext("2d")}resize(){const e=Math.min(window.devicePixelRatio,2),t=this.canvas.clientWidth||120,n=this.canvas.clientHeight||120;this.canvas.width=t*e,this.canvas.height=n*e,this.ctx.setTransform(e,0,0,e,0,0)}setNodes(e,t){if(!e.length&&!(t!=null&&t.length))return;let n=1/0,i=-1/0,s=1/0,o=-1/0;for(const l of e)n=Math.min(n,l.x),i=Math.max(i,l.x),s=Math.min(s,l.z),o=Math.max(o,l.z);if(t!=null&&t.length)for(const l of t)n=Math.min(n,l.x),i=Math.max(i,l.x),s=Math.min(s,l.z),o=Math.max(o,l.z);const a=30,c=40;this.bounds={minX:n-a,maxX:i+a,minZ:s-c,maxZ:o+c}}draw(e){var p;this.resize();const t=this.canvas.clientWidth||120,n=this.canvas.clientHeight||120,i=this.ctx,{minX:s,maxX:o,minZ:a,maxZ:c}=this.bounds;i.clearRect(0,0,t,n);const l=this.getRelief(t,n,e.biome);i.save(),Cl(i,0,0,t,n,12),i.clip(),l?i.drawImage(l,0,0,t,n):(i.fillStyle="rgba(8, 14, 28, 0.82)",i.fillRect(0,0,t,n)),i.restore(),i.strokeStyle="rgba(147, 197, 253, 0.4)",i.lineWidth=1,Cl(i,0,0,t,n,12),i.stroke();const h=g=>(g-s)/(o-s)*(t-16)+8,u=g=>n-8-(g-a)/(c-a)*(n-16);if(e.nodes.length>1){const g=e.biome?Cf(e.biome.path,.7):"rgba(91, 141, 239, 0.55)";i.strokeStyle=g,i.lineWidth=2.4,i.shadowColor=g,i.shadowBlur=4,i.beginPath(),e.nodes.forEach((v,b)=>{const y=h(v.x),A=u(v.z);b===0?i.moveTo(y,A):i.lineTo(y,A)}),i.stroke(),i.shadowBlur=0}for(const g of e.nodes){const v=h(g.x),b=u(g.z),y=g.id===e.nearNodeId?5.5:4;i.beginPath(),i.arc(v,b,y,0,Math.PI*2),g.unlocked?g.cleared?i.fillStyle="#34d399":g.id===e.nearNodeId?i.fillStyle="#fbbf24":i.fillStyle="#60a5fa":i.fillStyle="#4b5563",i.fill()}if((p=e.pickups)!=null&&p.length)for(const g of e.pickups){const v=h(g.x),b=u(g.z);g.collected?(i.fillStyle="rgba(100,220,130,0.45)",i.beginPath(),i.arc(v,b,2,0,Math.PI*2),i.fill()):(i.fillStyle="#fbbf24",i.beginPath(),i.moveTo(v,b-4),i.lineTo(v+3,b),i.lineTo(v,b+4),i.lineTo(v-3,b),i.closePath(),i.fill())}const d=h(e.playerX),f=u(e.playerZ),m=e.playerYaw??0,_=Math.atan2(Math.sin(m),-Math.cos(m));i.save(),i.translate(d,f),i.rotate(_),i.fillStyle="#ffffff",i.strokeStyle="#1e3a5f",i.lineWidth=1.2,i.beginPath(),i.moveTo(0,-6),i.lineTo(4.2,5),i.lineTo(0,2.5),i.lineTo(-4.2,5),i.closePath(),i.fill(),i.stroke(),i.restore(),i.fillStyle="rgba(255,255,255,0.7)",i.font="600 10px sans-serif",i.fillText("地图",10,16)}getRelief(e,t,n){const i=(n==null?void 0:n.ground)??1717032,s=(n==null?void 0:n.highland)??4876882,{minX:o,maxX:a,minZ:c,maxZ:l}=this.bounds,h=`${e}x${t}|${o.toFixed(0)},${a.toFixed(0)},${c.toFixed(0)},${l.toFixed(0)}|${i}|${s}`;if(this.relief&&this.reliefKey===h)return this.relief;const u=this.relief??document.createElement("canvas");u.width=e,u.height=t;const d=u.getContext("2d");if(!d)return;const f=Ea(i),m=Ea(s),_=3,p=.6,g=-.5;for(let v=0;v<t;v+=_)for(let b=0;b<e;b+=_){const y=o+(b-8)/(e-16)*(a-o),w=c+(t-8-v)/(t-16)*(l-c)-Ef,C=Tt(y,w),x=Tt(y+2,w),T=Tt(y,w+2),I=(C-x)*p+(C-T)*g,P=Al(.62+I*.16),L=Al((C+6)/18),V=Math.round((f.r+(m.r-f.r)*L)*P),H=Math.round((f.g+(m.g-f.g)*L)*P),D=Math.round((f.b+(m.b-f.b)*L)*P);d.fillStyle=`rgb(${V},${H},${D})`,d.fillRect(b,v,_,_)}return this.relief=u,this.reliefKey=h,u}}function Ea(r){return{r:r>>16&255,g:r>>8&255,b:r&255}}function Cf(r,e=1){const{r:t,g:n,b:i}=Ea(r);return`rgba(${t},${n},${i},${e})`}function Al(r){return r<0?0:r>1?1:r}function Cl(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.lineTo(e+n-s,t),r.quadraticCurveTo(e+n,t,e+n,t+s),r.lineTo(e+n,t+i-s),r.quadraticCurveTo(e+n,t+i,e+n-s,t+i),r.lineTo(e+s,t+i),r.quadraticCurveTo(e,t+i,e,t+i-s),r.lineTo(e,t+s),r.quadraticCurveTo(e,t,e+s,t),r.closePath()}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ic="184",Rf=0,Rl=1,Pf=2,qr=1,bu=2,Bs=3,Jn=0,Xt=1,Lt=2,Fn=0,is=1,no=2,Pl=3,Il=4,If=5,bi=100,Lf=101,Df=102,Nf=103,Uf=104,Ff=200,Of=201,Bf=202,kf=203,Aa=204,Ca=205,zf=206,Gf=207,Vf=208,Hf=209,Wf=210,Xf=211,qf=212,$f=213,Yf=214,Ra=0,Pa=1,Ia=2,os=3,La=4,Da=5,Na=6,Ua=7,Su=0,Kf=1,jf=2,On=0,Lc=1,Dc=2,Nc=3,mo=4,Uc=5,Fc=6,Oc=7,Ll="attached",Zf="detached",wu=300,Ti=301,as=302,Ro=303,Po=304,go=306,Ei=1e3,Ln=1001,io=1002,Dt=1003,Tu=1004,ks=1005,Nt=1006,$r=1007,Dn=1008,an=1009,Eu=1010,Au=1011,js=1012,Bc=1013,Bn=1014,fn=1015,Jt=1016,kc=1017,zc=1018,Zs=1020,Cu=35902,Ru=35899,Pu=1021,Iu=1022,pn=1023,Qn=1026,wi=1027,Gc=1028,Vc=1029,Ai=1030,Hc=1031,Wc=1033,Yr=33776,Kr=33777,jr=33778,Zr=33779,Fa=35840,Oa=35841,Ba=35842,ka=35843,za=36196,Ga=37492,Va=37496,Ha=37488,Wa=37489,so=37490,Xa=37491,qa=37808,$a=37809,Ya=37810,Ka=37811,ja=37812,Za=37813,Ja=37814,Qa=37815,ec=37816,tc=37817,nc=37818,ic=37819,sc=37820,rc=37821,oc=36492,ac=36494,cc=36495,lc=36283,hc=36284,ro=36285,uc=36286,Lu=2200,Jf=2201,Qf=2202,Js=2300,Qs=2301,Io=2302,Dl=2303,Qi=2400,es=2401,oo=2402,Xc=2500,ep=2501,tp=0,Du=1,dc=2,np=3200,fc=0,ip=1,In="",yt="srgb",cn="srgb-linear",ao="linear",et="srgb",Li=7680,Nl=519,sp=512,rp=513,op=514,qc=515,ap=516,cp=517,$c=518,lp=519,pc=35044,Ul="300 es",Nn=2e3,er=2001;function hp(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function up(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function tr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function dp(){const r=tr("canvas");return r.style.display="block",r}const Fl={};function co(...r){const e="THREE."+r.shift();console.log(e,...r)}function Nu(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Se(...r){r=Nu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Re(...r){r=Nu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function mc(...r){const e=r.join(" ");e in Fl||(Fl[e]=!0,Se(...r))}function fp(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const pp={[Ra]:Pa,[Ia]:Na,[La]:Ua,[os]:Da,[Pa]:Ra,[Na]:Ia,[Ua]:La,[Da]:os};class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ol=1234567;const Hs=Math.PI/180,cs=180/Math.PI;function Mn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[r&255]+Ht[r>>8&255]+Ht[r>>16&255]+Ht[r>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function We(r,e,t){return Math.max(e,Math.min(t,r))}function Yc(r,e){return(r%e+e)%e}function mp(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function gp(r,e,t){return r!==e?(t-r)/(e-r):0}function Ws(r,e,t){return(1-t)*r+t*e}function _p(r,e,t,n){return Ws(r,e,1-Math.exp(-t*n))}function vp(r,e=1){return e-Math.abs(Yc(r,e*2)-e)}function xp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function yp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Mp(r,e){return r+Math.floor(Math.random()*(e-r+1))}function bp(r,e){return r+Math.random()*(e-r)}function Sp(r){return r*(.5-Math.random())}function wp(r){r!==void 0&&(Ol=r);let e=Ol+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tp(r){return r*Hs}function Ep(r){return r*cs}function Ap(r){return(r&r-1)===0&&r!==0}function Cp(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Rp(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Pp(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*m,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*m,a*l);break;case"ZYZ":r.set(c*m,c*f,a*h,a*l);break;default:Se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function it(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Xs={DEG2RAD:Hs,RAD2DEG:cs,generateUUID:Mn,clamp:We,euclideanModulo:Yc,mapLinear:mp,inverseLerp:gp,lerp:Ws,damp:_p,pingpong:vp,smoothstep:xp,smootherstep:yp,randInt:Mp,randFloat:bp,randFloatSpread:Sp,seededRandom:wp,degToRad:Tp,radToDeg:Ep,isPowerOfTwo:Ap,ceilPowerOfTwo:Cp,floorPowerOfTwo:Rp,setQuaternionFromProperEuler:Pp,normalize:it,denormalize:yn},ll=class ll{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ll.prototype.isVector2=!0;let ue=ll;class Qt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[o+0],f=s[o+1],m=s[o+2],_=s[o+3];if(u!==_||c!==d||l!==f||h!==m){let p=c*d+l*f+h*m+u*_;p<0&&(d=-d,f=-f,m=-m,_=-_,p=-p);let g=1-a;if(p<.9995){const v=Math.acos(p),b=Math.sin(v);g=Math.sin(g*v)/b,a=Math.sin(a*v)/b,c=c*g+d*a,l=l*g+f*a,h=h*g+m*a,u=u*g+_*a}else{c=c*g+d*a,l=l*g+f*a,h=h*g+m*a,u=u*g+_*a;const v=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=v,l*=v,h*=v,u*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],m=s[o+3];return e[t]=a*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-a*f,e[t+2]=l*m+h*f+a*d-c*u,e[t+3]=h*m-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),m=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Se("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const hl=class hl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lo.copy(this).projectOnVector(e),this.sub(Lo)}reflect(e){return this.sub(Lo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};hl.prototype.isVector3=!0;let R=hl;const Lo=new R,Bl=new Qt,ul=class ul{constructor(e,t,n,i,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l)}set(e,t,n,i,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=i[0],p=i[3],g=i[6],v=i[1],b=i[4],y=i[7],A=i[2],w=i[5],C=i[8];return s[0]=o*_+a*v+c*A,s[3]=o*p+a*b+c*w,s[6]=o*g+a*y+c*C,s[1]=l*_+h*v+u*A,s[4]=l*p+h*b+u*w,s[7]=l*g+h*y+u*C,s[2]=d*_+f*v+m*A,s[5]=d*p+f*b+m*w,s[8]=d*g+f*y+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Do.makeScale(e,t)),this}rotate(e){return this.premultiply(Do.makeRotation(-e)),this}translate(e,t){return this.premultiply(Do.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ul.prototype.isMatrix3=!0;let Be=ul;const Do=new Be,kl=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ip(){const r={enabled:!0,workingColorSpace:cn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===et&&(i.r=Zn(i.r),i.g=Zn(i.g),i.b=Zn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===et&&(i.r=ss(i.r),i.g=ss(i.g),i.b=ss(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===In?ao:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return mc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return mc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[cn]:{primaries:e,whitePoint:n,transfer:ao,toXYZ:kl,fromXYZ:zl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:et,toXYZ:kl,fromXYZ:zl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),r}const Xe=Ip();function Zn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ss(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Di;class Lp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Di===void 0&&(Di=tr("canvas")),Di.width=e.width,Di.height=e.height;const i=Di.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Di}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=tr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Zn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return Se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dp=0;class Kc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=Mn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(No(i[o].image)):s.push(No(i[o]))}else s=No(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function No(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Lp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Se("Texture: Unable to serialize Texture."),{})}let Np=0;const Uo=new R;class Ut extends pi{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Ln,i=Ln,s=Nt,o=Dn,a=pn,c=an,l=Ut.DEFAULT_ANISOTROPY,h=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Mn(),this.name="",this.source=new Kc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uo).x}get height(){return this.source.getSize(Uo).y}get depth(){return this.source.getSize(Uo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Se(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Se(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case Ln:e.x=e.x<0?0:1;break;case io:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case Ln:e.y=e.y<0?0:1;break;case io:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=wu;Ut.DEFAULT_ANISOTROPY=1;const dl=class dl{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],p=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+p)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,y=(f+1)/2,A=(g+1)/2,w=(h+d)/4,C=(u+_)/4,x=(m+p)/4;return b>y&&b>A?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=w/n,s=C/n):y>A?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=w/i,s=x/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=C/s,i=x/s),this.set(n,i,s,t),this}let v=Math.sqrt((p-m)*(p-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};dl.prototype.isVector4=!0;let st=dl;class Up extends pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Ut(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Kc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zt extends Up{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Uu extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fp extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const po=class po{constructor(e,t,n,i,s,o,a,c,l,h,u,d,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l,h,u,d,f,m,_,p)}set(e,t,n,i,s,o,a,c,l,h,u,d,f,m,_,p){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new po().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),o=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d+_*a,t[4]=m*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Op,e,Bp)}lookAt(e,t,n){const i=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ri.crossVectors(n,rn),ri.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ri.crossVectors(n,rn)),ri.normalize(),fr.crossVectors(rn,ri),i[0]=ri.x,i[4]=fr.x,i[8]=rn.x,i[1]=ri.y,i[5]=fr.y,i[9]=rn.y,i[2]=ri.z,i[6]=fr.z,i[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],v=n[3],b=n[7],y=n[11],A=n[15],w=i[0],C=i[4],x=i[8],T=i[12],I=i[1],P=i[5],L=i[9],V=i[13],H=i[2],D=i[6],k=i[10],B=i[14],Z=i[3],ee=i[7],he=i[11],be=i[15];return s[0]=o*w+a*I+c*H+l*Z,s[4]=o*C+a*P+c*D+l*ee,s[8]=o*x+a*L+c*k+l*he,s[12]=o*T+a*V+c*B+l*be,s[1]=h*w+u*I+d*H+f*Z,s[5]=h*C+u*P+d*D+f*ee,s[9]=h*x+u*L+d*k+f*he,s[13]=h*T+u*V+d*B+f*be,s[2]=m*w+_*I+p*H+g*Z,s[6]=m*C+_*P+p*D+g*ee,s[10]=m*x+_*L+p*k+g*he,s[14]=m*T+_*V+p*B+g*be,s[3]=v*w+b*I+y*H+A*Z,s[7]=v*C+b*P+y*D+A*ee,s[11]=v*x+b*L+y*k+A*he,s[15]=v*T+b*V+y*B+A*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],_=e[7],p=e[11],g=e[15],v=c*f-l*d,b=a*f-l*u,y=a*d-c*u,A=o*f-l*h,w=o*d-c*h,C=o*u-a*h;return t*(_*v-p*b+g*y)-n*(m*v-p*A+g*w)+i*(m*b-_*A+g*C)-s*(m*y-_*w+p*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],_=e[13],p=e[14],g=e[15],v=t*a-n*o,b=t*c-i*o,y=t*l-s*o,A=n*c-i*a,w=n*l-s*a,C=i*l-s*c,x=h*_-u*m,T=h*p-d*m,I=h*g-f*m,P=u*p-d*_,L=u*g-f*_,V=d*g-f*p,H=v*V-b*L+y*P+A*I-w*T+C*x;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/H;return e[0]=(a*V-c*L+l*P)*D,e[1]=(i*L-n*V-s*P)*D,e[2]=(_*C-p*w+g*A)*D,e[3]=(d*w-u*C-f*A)*D,e[4]=(c*I-o*V-l*T)*D,e[5]=(t*V-i*I+s*T)*D,e[6]=(p*y-m*C-g*b)*D,e[7]=(h*C-d*y+f*b)*D,e[8]=(o*L-a*I+l*x)*D,e[9]=(n*I-t*L-s*x)*D,e[10]=(m*w-_*y+g*v)*D,e[11]=(u*y-h*w-f*v)*D,e[12]=(a*T-o*P-c*x)*D,e[13]=(t*P-n*T+i*x)*D,e[14]=(_*b-m*A-p*v)*D,e[15]=(h*A-u*b+d*v)*D,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,m=s*u,_=o*h,p=o*u,g=a*u,v=c*l,b=c*h,y=c*u,A=n.x,w=n.y,C=n.z;return i[0]=(1-(_+g))*A,i[1]=(f+y)*A,i[2]=(m-b)*A,i[3]=0,i[4]=(f-y)*w,i[5]=(1-(d+g))*w,i[6]=(p+v)*w,i[7]=0,i[8]=(m+b)*C,i[9]=(p-v)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ni.set(i[0],i[1],i[2]).length();const a=Ni.set(i[4],i[5],i[6]).length(),c=Ni.set(i[8],i[9],i[10]).length();s<0&&(o=-o),_n.copy(this);const l=1/o,h=1/a,u=1/c;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,i,s,o,a=Nn,c=!1){const l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,_;if(c)m=s/(o-s),_=o*s/(o-s);else if(a===Nn)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===er)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Nn,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,_;if(c)m=1/(o-s),_=o/(o-s);else if(a===Nn)m=-2/(o-s),_=-(o+s)/(o-s);else if(a===er)m=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};po.prototype.isMatrix4=!0;let Le=po;const Ni=new R,_n=new Le,Op=new R(0,0,0),Bp=new R(1,1,1),ri=new R,fr=new R,rn=new R,Gl=new Le,Vl=new Qt;class ei{constructor(e=0,t=0,n=0,i=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Se("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class jc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kp=0;const Hl=new R,Ui=new Qt,Hn=new Le,pr=new R,ws=new R,zp=new R,Gp=new Qt,Wl=new R(1,0,0),Xl=new R(0,1,0),ql=new R(0,0,1),$l={type:"added"},Vp={type:"removed"},Fi={type:"childadded",child:null},Fo={type:"childremoved",child:null};class ft extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new R,t=new ei,n=new Qt,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new Be}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(Wl,e)}rotateY(e){return this.rotateOnAxis(Xl,e)}rotateZ(e){return this.rotateOnAxis(ql,e)}translateOnAxis(e,t){return Hl.copy(e).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wl,e)}translateY(e){return this.translateOnAxis(Xl,e)}translateZ(e){return this.translateOnAxis(ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?pr.copy(e):pr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(ws,pr,this.up):Hn.lookAt(pr,ws,this.up),this.quaternion.setFromRotationMatrix(Hn),i&&(Hn.extractRotation(i.matrixWorld),Ui.setFromRotationMatrix(Hn),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Re("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($l),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null):Re("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vp),Fo.child=e,this.dispatchEvent(Fo),Fo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($l),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,e,zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,Gp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ft.DEFAULT_UP=new R(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ht extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hp={type:"move"};class Oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),g=this._getHandJoint(l,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hp)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},mr={h:0,s:0,l:0};function Bo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ae{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Xe.workingColorSpace){if(e=Yc(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Bo(o,s,e+1/3),this.g=Bo(o,s,e),this.b=Bo(o,s,e-1/3)}return Xe.colorSpaceToWorking(this,i),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&Se("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Se("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Se("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=Fu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Se("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=ss(e.r),this.g=ss(e.g),this.b=ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Xe.workingToColorSpace(Wt.copy(this),e),Math.round(We(Wt.r*255,0,255))*65536+Math.round(We(Wt.g*255,0,255))*256+Math.round(We(Wt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(Wt.copy(this),t);const n=Wt.r,i=Wt.g,s=Wt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=yt){Xe.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,i=Wt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(mr);const n=Ws(oi.h,mr.h,t),i=Ws(oi.s,mr.s,t),s=Ws(oi.l,mr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ae;Ae.NAMES=Fu;class lo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ae(e),this.density=t}clone(){return new lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Wp extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const vn=new R,Wn=new R,ko=new R,Xn=new R,Oi=new R,Bi=new R,Yl=new R,zo=new R,Go=new R,Vo=new R,Ho=new st,Wo=new st,Xo=new st;class dn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),vn.subVectors(e,t),i.cross(vn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){vn.subVectors(i,t),Wn.subVectors(n,t),ko.subVectors(e,t);const o=vn.dot(vn),a=vn.dot(Wn),c=vn.dot(ko),l=Wn.dot(Wn),h=Wn.dot(ko),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Xn.x),c.addScaledVector(o,Xn.y),c.addScaledVector(a,Xn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,o){return Ho.setScalar(0),Wo.setScalar(0),Xo.setScalar(0),Ho.fromBufferAttribute(e,t),Wo.fromBufferAttribute(e,n),Xo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Ho,s.x),o.addScaledVector(Wo,s.y),o.addScaledVector(Xo,s.z),o}static isFrontFacing(e,t,n,i){return vn.subVectors(n,t),Wn.subVectors(e,t),vn.cross(Wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),vn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Oi.subVectors(i,n),Bi.subVectors(s,n),zo.subVectors(e,n);const c=Oi.dot(zo),l=Bi.dot(zo);if(c<=0&&l<=0)return t.copy(n);Go.subVectors(e,i);const h=Oi.dot(Go),u=Bi.dot(Go);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Oi,o);Vo.subVectors(e,s);const f=Oi.dot(Vo),m=Bi.dot(Vo);if(m>=0&&f<=m)return t.copy(s);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Bi,a);const p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return Yl.subVectors(s,i),a=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(Yl,a);const g=1/(p+_+d);return o=_*g,a=d*g,t.copy(n).addScaledVector(Oi,o).addScaledVector(Bi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class kn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xn):xn.fromBufferAttribute(s,o),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(e.matrixWorld),this.union(gr)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),_r.subVectors(this.max,Ts),ki.subVectors(e.a,Ts),zi.subVectors(e.b,Ts),Gi.subVectors(e.c,Ts),ai.subVectors(zi,ki),ci.subVectors(Gi,zi),_i.subVectors(ki,Gi);let t=[0,-ai.z,ai.y,0,-ci.z,ci.y,0,-_i.z,_i.y,ai.z,0,-ai.x,ci.z,0,-ci.x,_i.z,0,-_i.x,-ai.y,ai.x,0,-ci.y,ci.x,0,-_i.y,_i.x,0];return!qo(t,ki,zi,Gi,_r)||(t=[1,0,0,0,1,0,0,0,1],!qo(t,ki,zi,Gi,_r))?!1:(vr.crossVectors(ai,ci),t=[vr.x,vr.y,vr.z],qo(t,ki,zi,Gi,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const qn=[new R,new R,new R,new R,new R,new R,new R,new R],xn=new R,gr=new kn,ki=new R,zi=new R,Gi=new R,ai=new R,ci=new R,_i=new R,Ts=new R,_r=new R,vr=new R,vi=new R;function qo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){vi.fromArray(r,s);const a=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),c=e.dot(vi),l=t.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const At=new R,xr=new ue;let Xp=0;class Mt extends pi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xr.fromBufferAttribute(this,t),xr.applyMatrix3(e),this.setXY(t,xr.x,xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ou extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bu extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ye extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const qp=new kn,Es=new R,$o=new R;class zn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qp.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Es.subVectors(e,this.center);const t=Es.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Es,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Es.copy(e.center).add($o)),this.expandByPoint(Es.copy(e.center).sub($o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let $p=0;const hn=new Le,Yo=new ft,Vi=new R,on=new kn,As=new kn,Bt=new R;class mt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hp(e)?Bu:Ou)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Yo.lookAt(e),Yo.updateMatrix(),this.applyMatrix4(Yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ye(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Re("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];on.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Re('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Re("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];As.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(on.min,As.min),on.expandByPoint(Bt),Bt.addVectors(on.max,As.max),on.expandByPoint(Bt)):(on.expandByPoint(As.min),on.expandByPoint(As.max))}on.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Bt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Bt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Bt.fromBufferAttribute(a,l),c&&(Vi.fromBufferAttribute(e,l),Bt.add(Vi)),i=Math.max(i,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Re('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Re("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new R,c[x]=new R;const l=new R,h=new R,u=new R,d=new ue,f=new ue,m=new ue,_=new R,p=new R;function g(x,T,I){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,I),d.fromBufferAttribute(s,x),f.fromBufferAttribute(s,T),m.fromBufferAttribute(s,I),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[x].add(_),a[T].add(_),a[I].add(_),c[x].add(p),c[T].add(p),c[I].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,T=v.length;x<T;++x){const I=v[x],P=I.start,L=I.count;for(let V=P,H=P+L;V<H;V+=3)g(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const b=new R,y=new R,A=new R,w=new R;function C(x){A.fromBufferAttribute(i,x),w.copy(A);const T=a[x];b.copy(T),b.sub(A.multiplyScalar(A.dot(T))).normalize(),y.crossVectors(w,T);const P=y.dot(c[x])<0?-1:1;o.setXYZW(x,b.x,b.y,b.z,P)}for(let x=0,T=v.length;x<T;++x){const I=v[x],P=I.start,L=I.count;for(let V=P,H=P+L;V<H;V+=3)C(e.getX(V+0)),C(e.getX(V+1)),C(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let g=0;g<h;g++)d[m++]=l[f++]}return new Mt(d,h,u)}if(this.index===null)return Se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mt,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ku{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pc,this.updateRanges=[],this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new R;class nr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){co("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new nr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){co("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Yp=0;class bn extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=Mn(),this.name="",this.type="Material",this.blending=is,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ca,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Se(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Se(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==is&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ca&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ts extends bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Hi;const Cs=new R,Wi=new R,Xi=new R,qi=new ue,Rs=new ue,zu=new Le,yr=new R,Ps=new R,Mr=new R,Kl=new ue,Ko=new ue,jl=new ue;class zs extends ft{constructor(e=new ts){if(super(),this.isSprite=!0,this.type="Sprite",Hi===void 0){Hi=new mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ku(t,5);Hi.setIndex([0,1,2,0,2,3]),Hi.setAttribute("position",new nr(n,3,0,!1)),Hi.setAttribute("uv",new nr(n,2,3,!1))}this.geometry=Hi,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Re('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Wi.setFromMatrixScale(this.matrixWorld),zu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Xi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Wi.multiplyScalar(-Xi.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;br(yr.set(-.5,-.5,0),Xi,o,Wi,i,s),br(Ps.set(.5,-.5,0),Xi,o,Wi,i,s),br(Mr.set(.5,.5,0),Xi,o,Wi,i,s),Kl.set(0,0),Ko.set(1,0),jl.set(1,1);let a=e.ray.intersectTriangle(yr,Ps,Mr,!1,Cs);if(a===null&&(br(Ps.set(-.5,.5,0),Xi,o,Wi,i,s),Ko.set(0,1),a=e.ray.intersectTriangle(yr,Mr,Ps,!1,Cs),a===null))return;const c=e.ray.origin.distanceTo(Cs);c<e.near||c>e.far||t.push({distance:c,point:Cs.clone(),uv:dn.getInterpolation(Cs,yr,Ps,Mr,Kl,Ko,jl,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function br(r,e,t,n,i,s){qi.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Rs.x=s*qi.x-i*qi.y,Rs.y=i*qi.x+s*qi.y):Rs.copy(qi),r.copy(e),r.x+=Rs.x,r.y+=Rs.y,r.applyMatrix4(zu)}const $n=new R,jo=new R,Sr=new R,li=new R,Zo=new R,wr=new R,Jo=new R;class sr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){jo.copy(e).add(t).multiplyScalar(.5),Sr.copy(t).sub(e).normalize(),li.copy(this.origin).sub(jo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Sr),a=li.dot(this.direction),c=-li.dot(Sr),l=li.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=s*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(jo).addScaledVector(Sr,d),f}intersectSphere(e,t){$n.subVectors(e.center,this.origin);const n=$n.dot(this.direction),i=$n.dot($n)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,i,s){Zo.subVectors(t,e),wr.subVectors(n,e),Jo.crossVectors(Zo,wr);let o=this.direction.dot(Jo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;li.subVectors(this.origin,e);const c=a*this.direction.dot(wr.crossVectors(li,wr));if(c<0)return null;const l=a*this.direction.dot(Zo.cross(li));if(l<0||c+l>o)return null;const h=-a*li.dot(Jo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt extends bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Su,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zl=new Le,xi=new sr,Tr=new zn,Jl=new R,Er=new R,Ar=new R,Cr=new R,Qo=new R,Rr=new R,Ql=new R,Pr=new R;class se extends ft{constructor(e=new mt,t=new kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Rr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Qo.fromBufferAttribute(u,e),o?Rr.addScaledVector(Qo,h):Rr.addScaledVector(Qo.sub(t),h))}t.add(Rr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(s),xi.copy(e.ray).recast(e.near),!(Tr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(Tr,Jl)===null||xi.origin.distanceToSquared(Jl)>(e.far-e.near)**2))&&(Zl.copy(s).invert(),xi.copy(e.ray).applyMatrix4(Zl),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const p=d[m],g=o[p.materialIndex],v=Math.max(p.start,f.start),b=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let y=v,A=b;y<A;y+=3){const w=a.getX(y),C=a.getX(y+1),x=a.getX(y+2);i=Ir(this,g,e,n,l,h,u,w,C,x),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){const v=a.getX(p),b=a.getX(p+1),y=a.getX(p+2);i=Ir(this,o,e,n,l,h,u,v,b,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const p=d[m],g=o[p.materialIndex],v=Math.max(p.start,f.start),b=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let y=v,A=b;y<A;y+=3){const w=y,C=y+1,x=y+2;i=Ir(this,g,e,n,l,h,u,w,C,x),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){const v=p,b=p+1,y=p+2;i=Ir(this,o,e,n,l,h,u,v,b,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Kp(r,e,t,n,i,s,o,a){let c;if(e.side===Xt?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===Jn,a),c===null)return null;Pr.copy(a),Pr.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Pr);return l<t.near||l>t.far?null:{distance:l,point:Pr.clone(),object:r}}function Ir(r,e,t,n,i,s,o,a,c,l){r.getVertexPosition(a,Er),r.getVertexPosition(c,Ar),r.getVertexPosition(l,Cr);const h=Kp(r,e,t,n,Er,Ar,Cr,Ql);if(h){const u=new R;dn.getBarycoord(Ql,Er,Ar,Cr,u),i&&(h.uv=dn.getInterpolatedAttribute(i,a,c,l,u,new ue)),s&&(h.uv1=dn.getInterpolatedAttribute(s,a,c,l,u,new ue)),o&&(h.normal=dn.getInterpolatedAttribute(o,a,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new R,materialIndex:0};dn.getNormal(Er,Ar,Cr,d.normal),h.face=d,h.barycoord=u}return h}const Is=new st,eh=new st,th=new st,jp=new st,nh=new Le,Lr=new R,ea=new zn,ih=new Le,ta=new sr;class Zp extends se{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ll,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new kn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lr),this.boundingBox.expandByPoint(Lr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new zn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lr),this.boundingSphere.expandByPoint(Lr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ea.copy(this.boundingSphere),ea.applyMatrix4(i),e.ray.intersectsSphere(ea)!==!1&&(ih.copy(i).invert(),ta.copy(e.ray).applyMatrix4(ih),!(this.boundingBox!==null&&ta.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ta)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new st,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ll?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Zf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Se("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;eh.fromBufferAttribute(i.attributes.skinIndex,e),th.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Is.copy(t),t.set(0,0,0,0)):(Is.set(...t,1),t.set(0,0,0)),Is.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const o=th.getComponent(s);if(o!==0){const a=eh.getComponent(s);nh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(jp.copy(Is).applyMatrix4(nh),o)}}return t.isVector4&&(t.w=Is.w),t.applyMatrix4(this.bindMatrixInverse)}}class Gu extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Zc extends Ut{constructor(e=null,t=1,n=1,i,s,o,a,c,l=Dt,h=Dt,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const sh=new Le,Jp=new Le;class Jc{constructor(e=[],t=[]){this.uuid=Mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Se("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Jp;sh.multiplyMatrices(a,t[s]),sh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Zc(t,e,e,pn,fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Se("Skeleton: No bone found with UUID:",s),o=new Gu),this.bones.push(o),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class gc extends Mt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $i=new Le,rh=new Le,Dr=[],oh=new kn,Qp=new Le,Ls=new se,Ds=new zn;class Vu extends se{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Qp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$i),oh.copy(e.boundingBox).applyMatrix4($i),this.boundingBox.union(oh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$i),Ds.copy(e.boundingSphere).applyMatrix4($i),this.boundingSphere.union(Ds)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ls.geometry=this.geometry,Ls.material=this.material,Ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ds.copy(this.boundingSphere),Ds.applyMatrix4(n),e.ray.intersectsSphere(Ds)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,$i),rh.multiplyMatrices(n,$i),Ls.matrixWorld=rh,Ls.raycast(e,Dr);for(let o=0,a=Dr.length;o<a;o++){const c=Dr[o];c.instanceId=s,c.object=this,t.push(c)}Dr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Zc(new Float32Array(i*this.count),i,this.count,Gc,fn));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;return s[c]=a,s.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const na=new R,em=new R,tm=new Be;class di{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=na.subVectors(n,t).cross(em.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(na),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||tm.getNormalMatrix(e),i=this.coplanarPoint(na).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new zn,nm=new ue(.5,.5),Nr=new R;class Qc{constructor(e=new di,t=new di,n=new di,i=new di,s=new di,o=new di){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],_=s[9],p=s[10],g=s[11],v=s[12],b=s[13],y=s[14],A=s[15];if(i[0].setComponents(l-o,f-h,g-m,A-v).normalize(),i[1].setComponents(l+o,f+h,g+m,A+v).normalize(),i[2].setComponents(l+a,f+u,g+_,A+b).normalize(),i[3].setComponents(l-a,f-u,g-_,A-b).normalize(),n)i[4].setComponents(c,d,p,y).normalize(),i[5].setComponents(l-c,f-d,g-p,A-y).normalize();else if(i[4].setComponents(l-c,f-d,g-p,A-y).normalize(),t===Nn)i[5].setComponents(l+c,f+d,g+p,A+y).normalize();else if(t===er)i[5].setComponents(c,d,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){yi.center.set(0,0,0);const t=nm.distanceTo(e.center);return yi.radius=.7071067811865476+t,yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Nr.x=i.normal.x>0?e.max.x:e.min.x,Nr.y=i.normal.y>0?e.max.y:e.min.y,Nr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hu extends bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ho=new R,uo=new R,ah=new Le,Ns=new sr,Ur=new zn,ia=new R,ch=new R;class el extends ft{constructor(e=new mt,t=new Hu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ho.fromBufferAttribute(t,i-1),uo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ho.distanceTo(uo);e.setAttribute("lineDistance",new Ye(n,1))}else Se("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(i),Ur.radius+=s,e.ray.intersectsSphere(Ur)===!1)return;ah.copy(i).invert(),Ns.copy(e.ray).applyMatrix4(ah);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=l){const g=h.getX(_),v=h.getX(_+1),b=Fr(this,e,Ns,c,g,v,_);b&&t.push(b)}if(this.isLineLoop){const _=h.getX(m-1),p=h.getX(f),g=Fr(this,e,Ns,c,_,p,m-1);g&&t.push(g)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=l){const g=Fr(this,e,Ns,c,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){const _=Fr(this,e,Ns,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Fr(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(ho.fromBufferAttribute(a,i),uo.fromBufferAttribute(a,s),t.distanceSqToSegment(ho,uo,ia,ch)>n)return;ia.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(ia);if(!(l<e.near||l>e.far))return{distance:l,point:ch.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const lh=new R,hh=new R;class im extends el{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)lh.fromBufferAttribute(t,i),hh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+lh.distanceTo(hh);e.setAttribute("lineDistance",new Ye(n,1))}else Se("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sm extends el{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class tl extends bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const uh=new Le,_c=new sr,Or=new zn,Br=new R;class Wu extends ft{constructor(e=new mt,t=new tl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(i),Or.radius+=s,e.ray.intersectsSphere(Or)===!1)return;uh.copy(i).invert(),_c.copy(e.ray).applyMatrix4(uh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=d,_=f;m<_;m++){const p=l.getX(m);Br.fromBufferAttribute(u,p),dh(Br,p,c,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)Br.fromBufferAttribute(u,m),dh(Br,m,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function dh(r,e,t,n,i,s,o){const a=_c.distanceSqToPoint(r);if(a<t){const c=new R;_c.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Xu extends Ut{constructor(e=[],t=Ti,n,i,s,o,a,c,l,h){super(e,t,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qs extends Ut{constructor(e,t,n,i,s,o,a,c,l){super(e,t,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ls extends Ut{constructor(e,t,n=Bn,i,s,o,a=Dt,c=Dt,l,h=Qn,u=1){if(h!==Qn&&h!==wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class rm extends ls{constructor(e,t=Bn,n=Ti,i,s,o=Dt,a=Dt,c,l=Qn){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qu extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class It extends mt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,s,0),m("z","y","x",1,-1,n,t,-e,o,s,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ye(l,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(u,2));function m(_,p,g,v,b,y,A,w,C,x,T){const I=y/C,P=A/x,L=y/2,V=A/2,H=w/2,D=C+1,k=x+1;let B=0,Z=0;const ee=new R;for(let he=0;he<k;he++){const be=he*P-V;for(let ce=0;ce<D;ce++){const Ne=ce*I-L;ee[_]=Ne*v,ee[p]=be*b,ee[g]=H,l.push(ee.x,ee.y,ee.z),ee[_]=0,ee[p]=0,ee[g]=w>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(ce/C),u.push(1-he/x),B+=1}}for(let he=0;he<x;he++)for(let be=0;be<C;be++){const ce=d+be+D*he,Ne=d+be+D*(he+1),Je=d+(be+1)+D*(he+1),Ue=d+(be+1)+D*he;c.push(ce,Ne,Ue),c.push(Ne,Je,Ue),Z+=6}a.addGroup(f,Z,T),f+=Z,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ci extends mt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,m=n*2+s,_=i+1,p=new R,g=new R;for(let v=0;v<=m;v++){let b=0,y=0,A=0,w=0;if(v<=n){const T=v/n,I=T*Math.PI/2;y=-h-e*Math.cos(I),A=e*Math.sin(I),w=-e*Math.cos(I),b=T*u}else if(v<=n+s){const T=(v-n)/s;y=-h+T*t,A=e,w=0,b=u+T*d}else{const T=(v-n-s)/n,I=T*Math.PI/2;y=h+e*Math.sin(I),A=e*Math.cos(I),w=e*Math.sin(I),b=u+d+T*u}const C=Math.max(0,Math.min(1,b/f));let x=0;v===0?x=.5/i:v===m&&(x=-.5/i);for(let T=0;T<=i;T++){const I=T/i,P=I*Math.PI*2,L=Math.sin(P),V=Math.cos(P);g.x=-A*V,g.y=y,g.z=A*L,a.push(g.x,g.y,g.z),p.set(-A*V,w,A*L),p.normalize(),c.push(p.x,p.y,p.z),l.push(I+x,C)}if(v>0){const T=(v-1)*_;for(let I=0;I<i;I++){const P=T+I,L=T+I+1,V=v*_+I,H=v*_+I+1;o.push(P,L,V),o.push(L,H,V)}}}this.setIndex(o),this.setAttribute("position",new Ye(a,3)),this.setAttribute("normal",new Ye(c,3)),this.setAttribute("uv",new Ye(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class tn extends mt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const _=[],p=n/2;let g=0;v(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Ye(u,3)),this.setAttribute("normal",new Ye(d,3)),this.setAttribute("uv",new Ye(f,2));function v(){const y=new R,A=new R;let w=0;const C=(t-e)/n;for(let x=0;x<=s;x++){const T=[],I=x/s,P=I*(t-e)+e;for(let L=0;L<=i;L++){const V=L/i,H=V*c+a,D=Math.sin(H),k=Math.cos(H);A.x=P*D,A.y=-I*n+p,A.z=P*k,u.push(A.x,A.y,A.z),y.set(D,C,k).normalize(),d.push(y.x,y.y,y.z),f.push(V,1-I),T.push(m++)}_.push(T)}for(let x=0;x<i;x++)for(let T=0;T<s;T++){const I=_[T][x],P=_[T+1][x],L=_[T+1][x+1],V=_[T][x+1];(e>0||T!==0)&&(h.push(I,P,V),w+=3),(t>0||T!==s-1)&&(h.push(P,L,V),w+=3)}l.addGroup(g,w,0),g+=w}function b(y){const A=m,w=new ue,C=new R;let x=0;const T=y===!0?e:t,I=y===!0?1:-1;for(let L=1;L<=i;L++)u.push(0,p*I,0),d.push(0,I,0),f.push(.5,.5),m++;const P=m;for(let L=0;L<=i;L++){const H=L/i*c+a,D=Math.cos(H),k=Math.sin(H);C.x=T*k,C.y=p*I,C.z=T*D,u.push(C.x,C.y,C.z),d.push(0,I,0),w.x=D*.5+.5,w.y=k*.5*I+.5,f.push(w.x,w.y),m++}for(let L=0;L<i;L++){const V=A+L,H=P+L;y===!0?h.push(H,H+1,V):h.push(H+1,H,V),x+=3}l.addGroup(g,x,y===!0?1:2),g+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rr extends tn{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new rr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class or extends mt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Ye(s,3)),this.setAttribute("normal",new Ye(s.slice(),3)),this.setAttribute("uv",new Ye(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const b=new R,y=new R,A=new R;for(let w=0;w<t.length;w+=3)f(t[w+0],b),f(t[w+1],y),f(t[w+2],A),c(b,y,A,v)}function c(v,b,y,A){const w=A+1,C=[];for(let x=0;x<=w;x++){C[x]=[];const T=v.clone().lerp(y,x/w),I=b.clone().lerp(y,x/w),P=w-x;for(let L=0;L<=P;L++)L===0&&x===w?C[x][L]=T:C[x][L]=T.clone().lerp(I,L/P)}for(let x=0;x<w;x++)for(let T=0;T<2*(w-x)-1;T++){const I=Math.floor(T/2);T%2===0?(d(C[x][I+1]),d(C[x+1][I]),d(C[x][I])):(d(C[x][I+1]),d(C[x+1][I+1]),d(C[x+1][I]))}}function l(v){const b=new R;for(let y=0;y<s.length;y+=3)b.x=s[y+0],b.y=s[y+1],b.z=s[y+2],b.normalize().multiplyScalar(v),s[y+0]=b.x,s[y+1]=b.y,s[y+2]=b.z}function h(){const v=new R;for(let b=0;b<s.length;b+=3){v.x=s[b+0],v.y=s[b+1],v.z=s[b+2];const y=p(v)/2/Math.PI+.5,A=g(v)/Math.PI+.5;o.push(y,1-A)}m(),u()}function u(){for(let v=0;v<o.length;v+=6){const b=o[v+0],y=o[v+2],A=o[v+4],w=Math.max(b,y,A),C=Math.min(b,y,A);w>.9&&C<.1&&(b<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),A<.2&&(o[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,b){const y=v*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function m(){const v=new R,b=new R,y=new R,A=new R,w=new ue,C=new ue,x=new ue;for(let T=0,I=0;T<s.length;T+=9,I+=6){v.set(s[T+0],s[T+1],s[T+2]),b.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),w.set(o[I+0],o[I+1]),C.set(o[I+2],o[I+3]),x.set(o[I+4],o[I+5]),A.copy(v).add(b).add(y).divideScalar(3);const P=p(A);_(w,I+0,v,P),_(C,I+2,b,P),_(x,I+4,y,P)}}function _(v,b,y,A){A<0&&v.x===1&&(o[b]=v.x-1),y.x===0&&y.z===0&&(o[b]=A/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.vertices,e.indices,e.radius,e.detail)}}class _o extends or{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _o(e.radius,e.detail)}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Se("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=t||(o.isVector2?new ue:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],o=[],a=new R,c=new Le;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new R)}s[0]=new R,o[0]=new R;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(We(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(We(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class $u extends ti{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ue){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class om extends $u{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let r=0,e=0,t=0,n=0;function i(s,o,a,c){r=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const fh=new R,ph=new R,sa=new nl,ra=new nl,oa=new nl;class vc extends ti{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(ph.subVectors(i[0],i[1]).add(i[0]),l=ph);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(fh.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=fh),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),sa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,p),ra.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,p),oa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(sa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ra.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),oa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(sa.calc(c),ra.calc(c),oa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function mh(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,c=r*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*r+t}function am(r,e){const t=1-r;return t*t*e}function cm(r,e){return 2*(1-r)*r*e}function lm(r,e){return r*r*e}function $s(r,e,t,n){return am(r,e)+cm(r,t)+lm(r,n)}function hm(r,e){const t=1-r;return t*t*t*e}function um(r,e){const t=1-r;return 3*t*t*r*e}function dm(r,e){return 3*(1-r)*r*r*e}function fm(r,e){return r*r*r*e}function Ys(r,e,t,n,i){return hm(r,e)+um(r,t)+dm(r,n)+fm(r,i)}class pm extends ti{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ys(e,i.x,s.x,o.x,a.x),Ys(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mm extends ti{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ys(e,i.x,s.x,o.x,a.x),Ys(e,i.y,s.y,o.y,a.y),Ys(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class gm extends ti{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _m extends ti{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vm extends ti{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set($s(e,i.x,s.x,o.x),$s(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Yu extends ti{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set($s(e,i.x,s.x,o.x),$s(e,i.y,s.y,o.y),$s(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xm extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(mh(a,c.x,l.x,h.x,u.x),mh(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ue().fromArray(i))}return this}}var ym=Object.freeze({__proto__:null,ArcCurve:om,CatmullRomCurve3:vc,CubicBezierCurve:pm,CubicBezierCurve3:mm,EllipseCurve:$u,LineCurve:gm,LineCurve3:_m,QuadraticBezierCurve:vm,QuadraticBezierCurve3:Yu,SplineCurve:xm});class ar extends or{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ar(e.radius,e.detail)}}class vo extends or{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vo(e.radius,e.detail)}}class Un extends mt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],m=[],_=[],p=[];for(let g=0;g<h;g++){const v=g*d-o;for(let b=0;b<l;b++){const y=b*u-s;m.push(y,-v,0),_.push(0,0,1),p.push(b/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<a;v++){const b=v+l*g,y=v+l*(g+1),A=v+1+l*(g+1),w=v+1+l*g;f.push(b,y,w),f.push(y,A,w)}this.setIndex(f),this.setAttribute("position",new Ye(m,3)),this.setAttribute("normal",new Ye(_,3)),this.setAttribute("uv",new Ye(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ri extends mt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/i,f=new R,m=new ue;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const g=s+p/n*o;f.x=u*Math.cos(g),f.y=u*Math.sin(g),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<i;_++){const p=_*(n+1);for(let g=0;g<n;g++){const v=g+p,b=v,y=v+n+1,A=v+n+2,w=v+1;a.push(b,y,w),a.push(y,A,w)}}this.setIndex(a),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(l,3)),this.setAttribute("uv",new Ye(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class mn extends mt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new R,d=new R,f=[],m=[],_=[],p=[];for(let g=0;g<=n;g++){const v=[],b=g/n;let y=0;g===0&&o===0?y=.5/t:g===n&&c===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const w=A/t;u.x=-e*Math.cos(i+w*s)*Math.sin(o+b*a),u.y=e*Math.cos(o+b*a),u.z=e*Math.sin(i+w*s)*Math.sin(o+b*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(w+y,1-b),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){const b=h[g][v+1],y=h[g][v],A=h[g+1][v],w=h[g+1][v+1];(g!==0||o>0)&&f.push(b,y,w),(g!==n-1||c<Math.PI)&&f.push(y,A,w)}this.setIndex(f),this.setAttribute("position",new Ye(m,3)),this.setAttribute("normal",new Ye(_,3)),this.setAttribute("uv",new Ye(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class mi extends mt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);const c=[],l=[],h=[],u=[],d=new R,f=new R,m=new R;for(let _=0;_<=n;_++){const p=o+_/n*a;for(let g=0;g<=i;g++){const v=g/i*s;f.x=(e+t*Math.cos(p))*Math.cos(v),f.y=(e+t*Math.cos(p))*Math.sin(v),f.z=t*Math.sin(p),l.push(f.x,f.y,f.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),m.subVectors(f,d).normalize(),h.push(m.x,m.y,m.z),u.push(g/i),u.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=i;p++){const g=(i+1)*_+p-1,v=(i+1)*(_-1)+p-1,b=(i+1)*(_-1)+p,y=(i+1)*_+p;c.push(g,v,y),c.push(v,b,y)}this.setIndex(c),this.setAttribute("position",new Ye(l,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class il extends mt{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],c=[],l=[],h=[],u=new R,d=new R,f=new R,m=new R,_=new R,p=new R,g=new R;for(let b=0;b<=n;++b){const y=b/n*s*Math.PI*2;v(y,s,o,e,f),v(y+.01,s,o,e,m),p.subVectors(m,f),g.addVectors(m,f),_.crossVectors(p,g),g.crossVectors(_,p),_.normalize(),g.normalize();for(let A=0;A<=i;++A){const w=A/i*Math.PI*2,C=-t*Math.cos(w),x=t*Math.sin(w);u.x=f.x+(C*g.x+x*_.x),u.y=f.y+(C*g.y+x*_.y),u.z=f.z+(C*g.z+x*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),h.push(b/n),h.push(A/i)}}for(let b=1;b<=n;b++)for(let y=1;y<=i;y++){const A=(i+1)*(b-1)+(y-1),w=(i+1)*b+(y-1),C=(i+1)*b+y,x=(i+1)*(b-1)+y;a.push(A,w,x),a.push(w,C,x)}this.setIndex(a),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(l,3)),this.setAttribute("uv",new Ye(h,2));function v(b,y,A,w,C){const x=Math.cos(b),T=Math.sin(b),I=A/y*b,P=Math.cos(I);C.x=w*(2+P)*.5*x,C.y=w*(2+P)*T*.5,C.z=w*Math.sin(I)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new il(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class fo extends mt{constructor(e=new Yu(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,c=new R,l=new ue;let h=new R;const u=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new Ye(u,3)),this.setAttribute("normal",new Ye(d,3)),this.setAttribute("uv",new Ye(f,2));function _(){for(let b=0;b<t;b++)p(b);p(s===!1?t:0),v(),g()}function p(b){h=e.getPointAt(b/t,h);const y=o.normals[b],A=o.binormals[b];for(let w=0;w<=i;w++){const C=w/i*Math.PI*2,x=Math.sin(C),T=-Math.cos(C);c.x=T*y.x+x*A.x,c.y=T*y.y+x*A.y,c.z=T*y.z+x*A.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function g(){for(let b=1;b<=t;b++)for(let y=1;y<=i;y++){const A=(i+1)*(b-1)+(y-1),w=(i+1)*b+(y-1),C=(i+1)*b+y,x=(i+1)*(b-1)+y;m.push(A,w,x),m.push(w,C,x)}}function v(){for(let b=0;b<=t;b++)for(let y=0;y<=i;y++)l.x=b/t,l.y=y/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new fo(new ym[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function hs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(gh(i))i.isRenderTargetTexture?(Se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(gh(i[0])){const s=[];for(let o=0,a=i.length;o<a;o++)s[o]=i[o].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Kt(r){const e={};for(let t=0;t<r.length;t++){const n=hs(r[t]);for(const i in n)e[i]=n[i]}return e}function gh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Mm(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Ku(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const us={clone:hs,merge:Kt};var bm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zt extends bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bm,this.fragmentShader=Sm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Mm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ju extends zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class nt extends bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gn extends nt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class wm extends bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tm extends bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function kr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Em(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function _h(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function Zu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class vs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Am extends vs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qi,endingEnd:Qi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case es:s=e,a=2*t-n;break;case oo:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case es:o=e,c=2*n-t;break;case oo:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),_=m*m,p=_*m,g=-d*p+2*d*_-d*m,v=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*m+1,b=(-1-f)*p+(1.5+f)*_+.5*m,y=f*p-f*_;for(let A=0;A!==a;++A)s[A]=g*o[h+A]+v*o[l+A]+b*o[c+A]+y*o[u+A];return s}}class Ju extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class Cm extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Rm extends vs{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.settings||this.DefaultSettings_,u=h.inTangents,d=h.outTangents;if(!u||!d){const _=(n-t)/(i-t),p=1-_;for(let g=0;g!==a;++g)s[g]=o[l+g]*p+o[c+g]*_;return s}const f=a*2,m=e-1;for(let _=0;_!==a;++_){const p=o[l+_],g=o[c+_],v=m*f+_*2,b=d[v],y=d[v+1],A=e*f+_*2,w=u[A],C=u[A+1];let x=(n-t)/(i-t),T,I,P,L,V;for(let H=0;H<8;H++){T=x*x,I=T*x,P=1-x,L=P*P,V=L*P;const k=V*t+3*L*x*b+3*P*T*w+I*i-n;if(Math.abs(k)<1e-10)break;const B=3*L*(b-t)+6*P*x*(w-b)+3*T*(i-w);if(Math.abs(B)<1e-10)break;x=x-k/B,x=Math.max(0,Math.min(1,x))}s[_]=V*p+3*L*x*y+3*P*T*C+I*g}return s}}class Sn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=kr(t,this.TimeBufferType),this.values=kr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:kr(e.times,Array),values:kr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Cm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ju(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Am(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Rm(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Js:t=this.InterpolantFactoryMethodDiscrete;break;case Qs:t=this.InterpolantFactoryMethodLinear;break;case Io:t=this.InterpolantFactoryMethodSmooth;break;case Dl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Se("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Js;case this.InterpolantFactoryMethodLinear:return Qs;case this.InterpolantFactoryMethodSmooth:return Io;case this.InterpolantFactoryMethodBezier:return Dl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Re("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Re("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){Re("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Re("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&up(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){Re("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Io,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=t[u+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=Qs;class xs extends Sn{constructor(e,t,n){super(e,t,n)}}xs.prototype.ValueTypeName="bool";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=Js;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;class Qu extends Sn{constructor(e,t,n,i){super(e,t,n,i)}}Qu.prototype.ValueTypeName="color";class ds extends Sn{constructor(e,t,n,i){super(e,t,n,i)}}ds.prototype.ValueTypeName="number";class Pm extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)Qt.slerpFlat(s,0,o,l-a,o,l,c);return s}}class fs extends Sn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Pm(this.times,this.values,this.getValueSize(),e)}}fs.prototype.ValueTypeName="quaternion";fs.prototype.InterpolantFactoryMethodSmooth=void 0;class ys extends Sn{constructor(e,t,n){super(e,t,n)}}ys.prototype.ValueTypeName="string";ys.prototype.ValueBufferType=Array;ys.prototype.DefaultInterpolation=Js;ys.prototype.InterpolantFactoryMethodLinear=void 0;ys.prototype.InterpolantFactoryMethodSmooth=void 0;class ps extends Sn{constructor(e,t,n,i){super(e,t,n,i)}}ps.prototype.ValueTypeName="vector";class xc{constructor(e="",t=-1,n=[],i=Xc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Mn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Lm(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Sn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=Em(c);c=_h(c,1,h),l=_h(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new ds(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(Se("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Re("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const p=[],g=[];Zu(f,p,g,m),p.length!==0&&_.push(new u(d,p,g))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const p=[],g=[];for(let v=0;v!==d[m].morphTargets.length;++v){const b=d[m];p.push(b.time),g.push(b.morphTarget===_?1:0)}i.push(new ds(".morphTargetInfluence["+_+"]",p,g))}c=f.length*o}else{const f=".bones["+t[u].name+"]";n(ps,f+".position",d,"pos",i),n(fs,f+".quaternion",d,"rot",i),n(ps,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Im(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ds;case"vector":case"vector2":case"vector3":case"vector4":return ps;case"color":return Qu;case"quaternion":return fs;case"bool":case"boolean":return xs;case"string":return ys}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Lm(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Im(r.type);if(r.times===void 0){const t=[],n=[];Zu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const jn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(vh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!vh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function vh(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Dm{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Nm=new Dm;class Ms{constructor(e){this.manager=e!==void 0?e:Nm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ms.DEFAULT_MATERIAL_NAME="__DEFAULT";const Yn={};class Um extends Error{constructor(e,t){super(e),this.response=t}}class ed extends Ms{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=jn.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Yn[e]!==void 0){Yn[e].push({onLoad:t,onProgress:n,onError:i});return}Yn[e]=[],Yn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Se("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Yn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const p=new ReadableStream({start(g){v();function v(){u.read().then(({done:b,value:y})=>{if(b)g.close();else{_+=y.byteLength;const A=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let w=0,C=h.length;w<C;w++){const x=h[w];x.onProgress&&x.onProgress(A)}g.enqueue(y),v()}},b=>{g.error(b)})}}});return new Response(p)}else throw new Um(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{jn.add(`file:${e}`,l);const h=Yn[e];delete Yn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Yn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Yn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Yi=new WeakMap;class Fm extends Ms{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=Yi.get(o);u===void 0&&(u=[],Yi.set(o,u)),u.push({onLoad:t,onError:i})}return o}const a=tr("img");function c(){h(),t&&t(this);const u=Yi.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Yi.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),jn.remove(`image:${e}`);const d=Yi.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(u)}Yi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),jn.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class Om extends Ms{constructor(e){super(e)}load(e,t,n,i){const s=new Ut,o=new Fm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class cr extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Bm extends cr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const aa=new Le,xh=new R,yh=new R;class sl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qc,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),aa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(aa,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===er||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(aa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const zr=new R,Gr=new Qt,En=new R;class td extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zr,Gr,En),En.x===1&&En.y===1&&En.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zr,Gr,En.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(zr,Gr,En),En.x===1&&En.y===1&&En.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zr,Gr,En.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const hi=new R,Mh=new ue,bh=new ue;class jt extends td{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,Mh,bh),t.subVectors(bh,Mh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class km extends sl{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=cs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class rl extends cr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new km}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class zm extends sl{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}}class ms extends cr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class lr extends td{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gm extends sl{constructor(){super(new lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yc extends cr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Gm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Vm extends cr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ks{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ca=new WeakMap;class Hm extends Ms{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Se("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Se("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jn.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{ca.has(o)===!0?(i&&i(ca.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){jn.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),ca.set(c,l),jn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});jn.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ki=-90,ji=1;class Wm extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new jt(Ki,ji,e,t);i.layers=this.layers,this.add(i);const s=new jt(Ki,ji,e,t);s.layers=this.layers,this.add(s);const o=new jt(Ki,ji,e,t);o.layers=this.layers,this.add(o);const a=new jt(Ki,ji,e,t);a.layers=this.layers,this.add(a);const c=new jt(Ki,ji,e,t);c.layers=this.layers,this.add(c);const l=new jt(Ki,ji,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===er)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Xm extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class qm{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=$m.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function $m(){this._document.hidden===!1&&this.reset()}class Ym{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Qt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;Qt.multiplyQuaternionsFlat(e,o,e,t,e,n),Qt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const ol="\\[\\]\\.:\\/",Km=new RegExp("["+ol+"]","g"),al="[^"+ol+"]",jm="[^"+ol.replace("\\.","")+"]",Zm=/((?:WC+[\/:])*)/.source.replace("WC",al),Jm=/(WCOD+)?/.source.replace("WCOD",jm),Qm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",al),eg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",al),tg=new RegExp("^"+Zm+Jm+Qm+eg+"$"),ng=["material","materials","bones","map"];class ig{constructor(e,t,n){const i=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class tt{constructor(e,t,n){this.path=t,this.parsedPath=n||tt.parseTrackName(t),this.node=tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new tt.Composite(e,t,n):new tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Km,"")}static parseTrackName(e){const t=tg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);ng.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Se("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Re("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Re("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Re("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Re("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Re("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Re("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Re("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;Re("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Re("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Re("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}tt.Composite=ig;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class sg{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:Qi,endingEnd:Qi};for(let l=0;l!==o;++l){const h=s[l].createInterpolant(null);a[l]=h,h.settings&&Object.assign(c,h.settings),h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Jf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case ep:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case Xc:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===Qf;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Lu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=s,this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=es,i.endingEnd=es):(e?i.endingStart=this.zeroSlopeAtStart?es:Qi:i.endingStart=oo,t?i.endingEnd=this.zeroSlopeAtEnd?es:Qi:i.endingEnd=oo)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const rg=new Float32Array(1);class og extends pi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;m=new Ym(tt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,f),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ju(new Float32Array(2),new Float32Array(2),1,rg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?xc.findByName(i,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Xc),c!==void 0){const u=c.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const h=new sg(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?xc.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Sh=new Le;class ag{constructor(e,t,n=0,i=1/0){this.ray=new sr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new jc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Re("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Sh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sh),this}intersectObject(e,t=!0,n=[]){return Mc(e,this,n,t),n.sort(wh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Mc(e[i],this,n,t);return n.sort(wh),n}}function wh(r,e){return r.distance-e.distance}function Mc(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)Mc(s[o],e,t,!0)}}class cg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Se("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const fl=class fl{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};fl.prototype.isMatrix2=!0;let Th=fl;function Eh(r,e,t,n){const i=lg(n);switch(t){case Pu:return r*e;case Gc:return r*e/i.components*i.byteLength;case Vc:return r*e/i.components*i.byteLength;case Ai:return r*e*2/i.components*i.byteLength;case Hc:return r*e*2/i.components*i.byteLength;case Iu:return r*e*3/i.components*i.byteLength;case pn:return r*e*4/i.components*i.byteLength;case Wc:return r*e*4/i.components*i.byteLength;case Yr:case Kr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case jr:case Zr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Oa:case ka:return Math.max(r,16)*Math.max(e,8)/4;case Fa:case Ba:return Math.max(r,8)*Math.max(e,8)/2;case za:case Ga:case Ha:case Wa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Va:case so:case Xa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case $a:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Za:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case ec:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case tc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case nc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ic:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case sc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case rc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case oc:case ac:case cc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case lc:case hc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ro:case uc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lg(r){switch(r){case an:case Eu:return{byteLength:1,components:1};case js:case Au:case Jt:return{byteLength:2,components:1};case kc:case zc:return{byteLength:2,components:4};case Bn:case Bc:case fn:return{byteLength:4,components:1};case Cu:case Ru:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ic}}));typeof window<"u"&&(window.__THREE__?Se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ic);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nd(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function hg(r){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,a),u.length===0)r.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];r.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(r.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}var ug=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_g=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,yg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Tg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ig=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ng=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ug=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Og=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$g=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,e0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,t0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,i0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,s0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,c0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,l0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,h0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,u0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,d0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,f0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,p0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,m0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,x0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,M0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,S0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,T0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,E0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,A0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,C0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,P0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,I0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,N0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,U0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,F0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,O0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,B0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,k0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,z0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,G0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,V0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,W0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,X0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,q0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Y0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,K0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,j0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Z0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,J0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Q0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,t_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,r_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,o_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,h_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const u_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,d_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,__=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,v_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,x_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,M_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,b_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,E_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,L_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,D_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:ug,alphahash_pars_fragment:dg,alphamap_fragment:fg,alphamap_pars_fragment:pg,alphatest_fragment:mg,alphatest_pars_fragment:gg,aomap_fragment:_g,aomap_pars_fragment:vg,batching_pars_vertex:xg,batching_vertex:yg,begin_vertex:Mg,beginnormal_vertex:bg,bsdfs:Sg,iridescence_fragment:wg,bumpmap_pars_fragment:Tg,clipping_planes_fragment:Eg,clipping_planes_pars_fragment:Ag,clipping_planes_pars_vertex:Cg,clipping_planes_vertex:Rg,color_fragment:Pg,color_pars_fragment:Ig,color_pars_vertex:Lg,color_vertex:Dg,common:Ng,cube_uv_reflection_fragment:Ug,defaultnormal_vertex:Fg,displacementmap_pars_vertex:Og,displacementmap_vertex:Bg,emissivemap_fragment:kg,emissivemap_pars_fragment:zg,colorspace_fragment:Gg,colorspace_pars_fragment:Vg,envmap_fragment:Hg,envmap_common_pars_fragment:Wg,envmap_pars_fragment:Xg,envmap_pars_vertex:qg,envmap_physical_pars_fragment:i0,envmap_vertex:$g,fog_vertex:Yg,fog_pars_vertex:Kg,fog_fragment:jg,fog_pars_fragment:Zg,gradientmap_pars_fragment:Jg,lightmap_pars_fragment:Qg,lights_lambert_fragment:e0,lights_lambert_pars_fragment:t0,lights_pars_begin:n0,lights_toon_fragment:s0,lights_toon_pars_fragment:r0,lights_phong_fragment:o0,lights_phong_pars_fragment:a0,lights_physical_fragment:c0,lights_physical_pars_fragment:l0,lights_fragment_begin:h0,lights_fragment_maps:u0,lights_fragment_end:d0,lightprobes_pars_fragment:f0,logdepthbuf_fragment:p0,logdepthbuf_pars_fragment:m0,logdepthbuf_pars_vertex:g0,logdepthbuf_vertex:_0,map_fragment:v0,map_pars_fragment:x0,map_particle_fragment:y0,map_particle_pars_fragment:M0,metalnessmap_fragment:b0,metalnessmap_pars_fragment:S0,morphinstance_vertex:w0,morphcolor_vertex:T0,morphnormal_vertex:E0,morphtarget_pars_vertex:A0,morphtarget_vertex:C0,normal_fragment_begin:R0,normal_fragment_maps:P0,normal_pars_fragment:I0,normal_pars_vertex:L0,normal_vertex:D0,normalmap_pars_fragment:N0,clearcoat_normal_fragment_begin:U0,clearcoat_normal_fragment_maps:F0,clearcoat_pars_fragment:O0,iridescence_pars_fragment:B0,opaque_fragment:k0,packing:z0,premultiplied_alpha_fragment:G0,project_vertex:V0,dithering_fragment:H0,dithering_pars_fragment:W0,roughnessmap_fragment:X0,roughnessmap_pars_fragment:q0,shadowmap_pars_fragment:$0,shadowmap_pars_vertex:Y0,shadowmap_vertex:K0,shadowmask_pars_fragment:j0,skinbase_vertex:Z0,skinning_pars_vertex:J0,skinning_vertex:Q0,skinnormal_vertex:e_,specularmap_fragment:t_,specularmap_pars_fragment:n_,tonemapping_fragment:i_,tonemapping_pars_fragment:s_,transmission_fragment:r_,transmission_pars_fragment:o_,uv_pars_fragment:a_,uv_pars_vertex:c_,uv_vertex:l_,worldpos_vertex:h_,background_vert:u_,background_frag:d_,backgroundCube_vert:f_,backgroundCube_frag:p_,cube_vert:m_,cube_frag:g_,depth_vert:__,depth_frag:v_,distance_vert:x_,distance_frag:y_,equirect_vert:M_,equirect_frag:b_,linedashed_vert:S_,linedashed_frag:w_,meshbasic_vert:T_,meshbasic_frag:E_,meshlambert_vert:A_,meshlambert_frag:C_,meshmatcap_vert:R_,meshmatcap_frag:P_,meshnormal_vert:I_,meshnormal_frag:L_,meshphong_vert:D_,meshphong_frag:N_,meshphysical_vert:U_,meshphysical_frag:F_,meshtoon_vert:O_,meshtoon_frag:B_,points_vert:k_,points_frag:z_,shadow_vert:G_,shadow_frag:V_,sprite_vert:H_,sprite_frag:W_},fe={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Pn={basic:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Kt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Kt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Ae(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Kt([fe.points,fe.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Kt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Kt([fe.common,fe.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Kt([fe.sprite,fe.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Kt([fe.common,fe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Kt([fe.lights,fe.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Pn.physical={uniforms:Kt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Vr={r:0,b:0,g:0},X_=new Le,id=new Be;id.set(-1,0,0,0,1,0,0,0,1);function q_(r,e,t,n,i,s){const o=new Ae(0);let a=i===!0?0:1,c,l,h=null,u=0,d=null;function f(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){const y=v.backgroundBlurriness>0;b=e.get(b,y)}return b}function m(v){let b=!1;const y=f(v);y===null?p(o,a):y&&y.isColor&&(p(y,1),b=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(v,b){const y=f(b);y&&(y.isCubeTexture||y.mapping===go)?(l===void 0&&(l=new se(new It(1,1,1),new zt({name:"BackgroundCubeMaterial",uniforms:hs(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(X_.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(id),l.material.toneMapped=Xe.getTransfer(y.colorSpace)!==et,(h!==y||u!==y.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new se(new Un(2,2),new zt({name:"BackgroundMaterial",uniforms:hs(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(y.colorSpace)!==et,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,b){v.getRGB(Vr,Ku(r)),t.buffers.color.setClear(Vr.r,Vr.g,Vr.b,b,s)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,b=1){o.set(v),a=b,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,p(o,a)},render:m,addToRenderList:_,dispose:g}}function $_(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(P,L,V,H,D){let k=!1;const B=u(P,H,V,L);s!==B&&(s=B,l(s.object)),k=f(P,H,V,D),k&&m(P,H,V,D),D!==null&&e.update(D,r.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,y(P,L,V,H),D!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function c(){return r.createVertexArray()}function l(P){return r.bindVertexArray(P)}function h(P){return r.deleteVertexArray(P)}function u(P,L,V,H){const D=H.wireframe===!0;let k=n[L.id];k===void 0&&(k={},n[L.id]=k);const B=P.isInstancedMesh===!0?P.id:0;let Z=k[B];Z===void 0&&(Z={},k[B]=Z);let ee=Z[V.id];ee===void 0&&(ee={},Z[V.id]=ee);let he=ee[D];return he===void 0&&(he=d(c()),ee[D]=he),he}function d(P){const L=[],V=[],H=[];for(let D=0;D<t;D++)L[D]=0,V[D]=0,H[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:V,attributeDivisors:H,object:P,attributes:{},index:null}}function f(P,L,V,H){const D=s.attributes,k=L.attributes;let B=0;const Z=V.getAttributes();for(const ee in Z)if(Z[ee].location>=0){const be=D[ee];let ce=k[ee];if(ce===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),be===void 0||be.attribute!==ce||ce&&be.data!==ce.data)return!0;B++}return s.attributesNum!==B||s.index!==H}function m(P,L,V,H){const D={},k=L.attributes;let B=0;const Z=V.getAttributes();for(const ee in Z)if(Z[ee].location>=0){let be=k[ee];be===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(be=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(be=P.instanceColor));const ce={};ce.attribute=be,be&&be.data&&(ce.data=be.data),D[ee]=ce,B++}s.attributes=D,s.attributesNum=B,s.index=H}function _(){const P=s.newAttributes;for(let L=0,V=P.length;L<V;L++)P[L]=0}function p(P){g(P,0)}function g(P,L){const V=s.newAttributes,H=s.enabledAttributes,D=s.attributeDivisors;V[P]=1,H[P]===0&&(r.enableVertexAttribArray(P),H[P]=1),D[P]!==L&&(r.vertexAttribDivisor(P,L),D[P]=L)}function v(){const P=s.newAttributes,L=s.enabledAttributes;for(let V=0,H=L.length;V<H;V++)L[V]!==P[V]&&(r.disableVertexAttribArray(V),L[V]=0)}function b(P,L,V,H,D,k,B){B===!0?r.vertexAttribIPointer(P,L,V,D,k):r.vertexAttribPointer(P,L,V,H,D,k)}function y(P,L,V,H){_();const D=H.attributes,k=V.getAttributes(),B=L.defaultAttributeValues;for(const Z in k){const ee=k[Z];if(ee.location>=0){let he=D[Z];if(he===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(he=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(he=P.instanceColor)),he!==void 0){const be=he.normalized,ce=he.itemSize,Ne=e.get(he);if(Ne===void 0)continue;const Je=Ne.buffer,Ue=Ne.type,j=Ne.bytesPerElement,ge=Ue===r.INT||Ue===r.UNSIGNED_INT||he.gpuType===Bc;if(he.isInterleavedBufferAttribute){const re=he.data,Pe=re.stride,Fe=he.offset;if(re.isInstancedInterleavedBuffer){for(let Ie=0;Ie<ee.locationSize;Ie++)g(ee.location+Ie,re.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ie=0;Ie<ee.locationSize;Ie++)p(ee.location+Ie);r.bindBuffer(r.ARRAY_BUFFER,Je);for(let Ie=0;Ie<ee.locationSize;Ie++)b(ee.location+Ie,ce/ee.locationSize,Ue,be,Pe*j,(Fe+ce/ee.locationSize*Ie)*j,ge)}else{if(he.isInstancedBufferAttribute){for(let re=0;re<ee.locationSize;re++)g(ee.location+re,he.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let re=0;re<ee.locationSize;re++)p(ee.location+re);r.bindBuffer(r.ARRAY_BUFFER,Je);for(let re=0;re<ee.locationSize;re++)b(ee.location+re,ce/ee.locationSize,Ue,be,ce*j,ce/ee.locationSize*re*j,ge)}}else if(B!==void 0){const be=B[Z];if(be!==void 0)switch(be.length){case 2:r.vertexAttrib2fv(ee.location,be);break;case 3:r.vertexAttrib3fv(ee.location,be);break;case 4:r.vertexAttrib4fv(ee.location,be);break;default:r.vertexAttrib1fv(ee.location,be)}}}}v()}function A(){T();for(const P in n){const L=n[P];for(const V in L){const H=L[V];for(const D in H){const k=H[D];for(const B in k)h(k[B].object),delete k[B];delete H[D]}}delete n[P]}}function w(P){if(n[P.id]===void 0)return;const L=n[P.id];for(const V in L){const H=L[V];for(const D in H){const k=H[D];for(const B in k)h(k[B].object),delete k[B];delete H[D]}}delete n[P.id]}function C(P){for(const L in n){const V=n[L];for(const H in V){const D=V[H];if(D[P.id]===void 0)continue;const k=D[P.id];for(const B in k)h(k[B].object),delete k[B];delete D[P.id]}}}function x(P){for(const L in n){const V=n[L],H=P.isInstancedMesh===!0?P.id:0,D=V[H];if(D!==void 0){for(const k in D){const B=D[k];for(const Z in B)h(B[Z].object),delete B[Z];delete D[k]}delete V[H],Object.keys(V).length===0&&delete n[L]}}}function T(){I(),o=!0,s!==i&&(s=i,l(s.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:T,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function Y_(r,e,t){let n;function i(c){n=c}function s(c,l){r.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(r.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function K_(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==pn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const x=C===Jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==an&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==fn&&!x)}function c(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Se("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:y,maxSamples:A,samples:w}}function j_(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new di,a=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,g=r.get(u);if(!i||m===null||m.length===0||s&&!p)s?h(null):l();else{const v=s?0:n,b=v*4;let y=g.clippingState||null;c.value=y,y=h(m,d,b,f);for(let A=0;A!==b;++A)y[A]=t[A];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,m!==!0||p===null){const g=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let b=0,y=f;b!==_;++b,y+=4)o.copy(u[b]).applyMatrix4(v,a),o.normal.toArray(p,y),p[y+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}const fi=4,Ah=[.125,.215,.35,.446,.526,.582],Si=20,Z_=256,Us=new lr,Ch=new Ae;let la=null,ha=0,ua=0,da=!1;const J_=new R;class Rh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=J_}=s;la=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ih(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(la,ha,ua),this._renderer.xr.enabled=da,e.scissorTest=!1,Zi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),la=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Jt,format:pn,colorSpace:cn,depthBuffer:!1},i=Ph(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ph(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Q_(s)),this._blurMaterial=tv(s,e,t),this._ggxMaterial=ev(s,e,t)}return i}_compileMaterial(e){const t=new se(new mt,e);this._renderer.compile(t,Us)}_sceneToCubeUV(e,t,n,i,s){const c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ch),u.toneMapping=On,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new se(new It,new kt({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let g=!1;const v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,g=!0):(p.color.copy(Ch),g=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[b],s.y,s.z)):y===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[b]));const A=this._cubeSize;Zi(i,y*A,b>2?A:0,A,A),u.setRenderTarget(i),g&&u.render(_,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ti||e.mapping===as;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ih());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Zi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Us)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:m}=this,_=this._sizeLods[n],p=3*_*(n>m-fi?n-m+fi:0),g=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,Zi(s,p,g,3*_,2*_),i.setRenderTarget(s),i.render(a,Us),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-n,Zi(e,p,g,3*_,2*_),i.setRenderTarget(e),i.render(a,Us)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Re("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=l;const d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Si-1),_=s/m,p=isFinite(s)?1+Math.floor(h*_):Si;p>Si&&Se(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Si}`);const g=[];let v=0;for(let C=0;C<Si;++C){const x=C/_,T=Math.exp(-x*x/2);g.push(T),C===0?v+=T:C<p&&(v+=2*T)}for(let C=0;C<g.length;C++)g[C]=g[C]/v;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-n;const y=this._sizeLods[i],A=3*y*(i>b-fi?i-b+fi:0),w=4*(this._cubeSize-y);Zi(t,A,w,3*y,2*y),c.setRenderTarget(t),c.render(u,Us)}}function Q_(r){const e=[],t=[],n=[];let i=r;const s=r-fi+1+Ah.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-fi?c=Ah[o-r+fi-1]:o===0&&(c=0),t.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,p=2,g=1,v=new Float32Array(_*m*f),b=new Float32Array(p*m*f),y=new Float32Array(g*m*f);for(let w=0;w<f;w++){const C=w%3*2/3-1,x=w>2?0:-1,T=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];v.set(T,_*m*w),b.set(d,p*m*w);const I=[w,w,w,w,w,w];y.set(I,g*m*w)}const A=new mt;A.setAttribute("position",new Mt(v,_)),A.setAttribute("uv",new Mt(b,p)),A.setAttribute("faceIndex",new Mt(y,g)),n.push(new se(A,null)),i>fi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ph(r,e,t){const n=new Zt(r,e,t);return n.texture.mapping=go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zi(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function ev(r,e,t){return new zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Z_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function tv(r,e,t){const n=new Float32Array(Si),i=new R(0,1,0);return new zt({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Ih(){return new zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Lh(){return new zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function xo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class sd extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Xu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new It(5,5,5),s=new zt({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Fn});s.uniforms.tEquirect.value=t;const o=new se(i,s),a=t.minFilter;return t.minFilter===Dn&&(t.minFilter=Nt),new Wm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function nv(r){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?o(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===Ro||f===Po)if(e.has(d)){const m=e.get(d).texture;return a(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const _=new sd(m.height);return _.fromEquirectangularTexture(r,d),e.set(d,_),d.addEventListener("dispose",l),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const f=d.mapping,m=f===Ro||f===Po,_=f===Ti||f===as;if(m||_){let p=t.get(d);const g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Rh(r)),p=m?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const v=d.image;return m&&v&&v.height>0||_&&v&&c(v)?(n===null&&(n=new Rh(r)),p=m?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function a(d,f){return f===Ro?d.mapping=Ti:f===Po&&(d.mapping=as),d}function c(d){let f=0;const m=6;for(let _=0;_<m;_++)d[_]!==void 0&&f++;return f===m}function l(d){const f=d.target;f.removeEventListener("dispose",l);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function iv(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&mc("WebGLRenderer: "+n+" extension not supported."),i}}}function sv(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(m===void 0)return;if(f!==null){const v=f.array;_=f.version;for(let b=0,y=v.length;b<y;b+=3){const A=v[b+0],w=v[b+1],C=v[b+2];d.push(A,w,w,C,C,A)}}else{const v=m.array;_=m.version;for(let b=0,y=v.length/3-1;b<y;b+=3){const A=b+0,w=b+1,C=b+2;d.push(A,w,w,C,C,A)}}const p=new(m.count>=65535?Bu:Ou)(d,1);p.version=_;const g=s.get(u);g&&e.remove(g),s.set(u,p)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function rv(r,e,t){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function c(u,d){r.drawElements(n,d,s,u*o),t.update(d,n,1)}function l(u,d,f){f!==0&&(r.drawElementsInstanced(n,d,s,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,f);let _=0;for(let p=0;p<f;p++)_+=d[p];t.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ov(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:Re("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function av(r,e,t){const n=new WeakMap,i=new st;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let I=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",I)};var f=I;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let y=0;m===!0&&(y=1),_===!0&&(y=2),p===!0&&(y=3);let A=a.attributes.position.count*y,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const C=new Float32Array(A*w*4*u),x=new Uu(C,A,w,u);x.type=fn,x.needsUpdate=!0;const T=y*4;for(let P=0;P<u;P++){const L=g[P],V=v[P],H=b[P],D=A*w*4*P;for(let k=0;k<L.count;k++){const B=k*T;m===!0&&(i.fromBufferAttribute(L,k),C[D+B+0]=i.x,C[D+B+1]=i.y,C[D+B+2]=i.z,C[D+B+3]=0),_===!0&&(i.fromBufferAttribute(V,k),C[D+B+4]=i.x,C[D+B+5]=i.y,C[D+B+6]=i.z,C[D+B+7]=0),p===!0&&(i.fromBufferAttribute(H,k),C[D+B+8]=i.x,C[D+B+9]=i.y,C[D+B+10]=i.z,C[D+B+11]=H.itemSize===4?i.w:1)}}d={count:u,texture:x,size:new ue(A,w)},n.set(a,d),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let m=0;for(let p=0;p<l.length;p++)m+=l[p];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function cv(r,e,t,n,i){let s=new WeakMap;function o(l){const h=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function a(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}const lv={[Lc]:"LINEAR_TONE_MAPPING",[Dc]:"REINHARD_TONE_MAPPING",[Nc]:"CINEON_TONE_MAPPING",[mo]:"ACES_FILMIC_TONE_MAPPING",[Fc]:"AGX_TONE_MAPPING",[Oc]:"NEUTRAL_TONE_MAPPING",[Uc]:"CUSTOM_TONE_MAPPING"};function hv(r,e,t,n,i){const s=new Zt(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new ls(e,t):void 0}),o=new Zt(e,t,{type:Jt,depthBuffer:!1,stencilBuffer:!1}),a=new mt;a.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ye([0,2,0,0,2,0],2));const c=new ju({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new se(a,c),h=new lr(-1,1,1,-1,0,1);let u=null,d=null,f=!1,m,_=null,p=[],g=!1;this.setSize=function(v,b){s.setSize(v,b),o.setSize(v,b);for(let y=0;y<p.length;y++){const A=p[y];A.setSize&&A.setSize(v,b)}},this.setEffects=function(v){p=v,g=p.length>0&&p[0].isRenderPass===!0;const b=s.width,y=s.height;for(let A=0;A<p.length;A++){const w=p[A];w.setSize&&w.setSize(b,y)}},this.begin=function(v,b){if(f||v.toneMapping===On&&p.length===0)return!1;if(_=b,b!==null){const y=b.width,A=b.height;(s.width!==y||s.height!==A)&&this.setSize(y,A)}return g===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=On,!0},this.hasRenderPass=function(){return g},this.end=function(v,b){v.toneMapping=m,f=!0;let y=s,A=o;for(let w=0;w<p.length;w++){const C=p[w];if(C.enabled!==!1&&(C.render(v,A,y,b),C.needsSwap!==!1)){const x=y;y=A,A=x}}if(u!==v.outputColorSpace||d!==v.toneMapping){u=v.outputColorSpace,d=v.toneMapping,c.defines={},Xe.getTransfer(u)===et&&(c.defines.SRGB_TRANSFER="");const w=lv[d];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(_),v.render(l,h),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),c.dispose()}}const rd=new Ut,bc=new ls(1,1),od=new Uu,ad=new Fp,cd=new Xu,Dh=[],Nh=[],Uh=new Float32Array(16),Fh=new Float32Array(9),Oh=new Float32Array(4);function bs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Dh[i];if(s===void 0&&(s=new Float32Array(i),Dh[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Ft(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ot(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function yo(r,e){let t=Nh[e];t===void 0&&(t=new Int32Array(e),Nh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function uv(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function dv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;r.uniform2fv(this.addr,e),Ot(t,e)}}function fv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;r.uniform3fv(this.addr,e),Ot(t,e)}}function pv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;r.uniform4fv(this.addr,e),Ot(t,e)}}function mv(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Oh.set(n),r.uniformMatrix2fv(this.addr,!1,Oh),Ot(t,n)}}function gv(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Fh.set(n),r.uniformMatrix3fv(this.addr,!1,Fh),Ot(t,n)}}function _v(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Uh.set(n),r.uniformMatrix4fv(this.addr,!1,Uh),Ot(t,n)}}function vv(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function xv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;r.uniform2iv(this.addr,e),Ot(t,e)}}function yv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;r.uniform3iv(this.addr,e),Ot(t,e)}}function Mv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;r.uniform4iv(this.addr,e),Ot(t,e)}}function bv(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Sv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;r.uniform2uiv(this.addr,e),Ot(t,e)}}function wv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;r.uniform3uiv(this.addr,e),Ot(t,e)}}function Tv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;r.uniform4uiv(this.addr,e),Ot(t,e)}}function Ev(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(bc.compareFunction=t.isReversedDepthBuffer()?$c:qc,s=bc):s=rd,t.setTexture2D(e||s,i)}function Av(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ad,i)}function Cv(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||cd,i)}function Rv(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||od,i)}function Pv(r){switch(r){case 5126:return uv;case 35664:return dv;case 35665:return fv;case 35666:return pv;case 35674:return mv;case 35675:return gv;case 35676:return _v;case 5124:case 35670:return vv;case 35667:case 35671:return xv;case 35668:case 35672:return yv;case 35669:case 35673:return Mv;case 5125:return bv;case 36294:return Sv;case 36295:return wv;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return Av;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Rv}}function Iv(r,e){r.uniform1fv(this.addr,e)}function Lv(r,e){const t=bs(e,this.size,2);r.uniform2fv(this.addr,t)}function Dv(r,e){const t=bs(e,this.size,3);r.uniform3fv(this.addr,t)}function Nv(r,e){const t=bs(e,this.size,4);r.uniform4fv(this.addr,t)}function Uv(r,e){const t=bs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Fv(r,e){const t=bs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ov(r,e){const t=bs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Bv(r,e){r.uniform1iv(this.addr,e)}function kv(r,e){r.uniform2iv(this.addr,e)}function zv(r,e){r.uniform3iv(this.addr,e)}function Gv(r,e){r.uniform4iv(this.addr,e)}function Vv(r,e){r.uniform1uiv(this.addr,e)}function Hv(r,e){r.uniform2uiv(this.addr,e)}function Wv(r,e){r.uniform3uiv(this.addr,e)}function Xv(r,e){r.uniform4uiv(this.addr,e)}function qv(r,e,t){const n=this.cache,i=e.length,s=yo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=bc:o=rd;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,s[a])}function $v(r,e,t){const n=this.cache,i=e.length,s=yo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ad,s[o])}function Yv(r,e,t){const n=this.cache,i=e.length,s=yo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||cd,s[o])}function Kv(r,e,t){const n=this.cache,i=e.length,s=yo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||od,s[o])}function jv(r){switch(r){case 5126:return Iv;case 35664:return Lv;case 35665:return Dv;case 35666:return Nv;case 35674:return Uv;case 35675:return Fv;case 35676:return Ov;case 5124:case 35670:return Bv;case 35667:case 35671:return kv;case 35668:case 35672:return zv;case 35669:case 35673:return Gv;case 5125:return Vv;case 36294:return Hv;case 36295:return Wv;case 36296:return Xv;case 35678:case 36198:case 36298:case 36306:case 35682:return qv;case 35679:case 36299:case 36307:return $v;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return Kv}}class Zv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Pv(t.type)}}class Jv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jv(t.type)}}class Qv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const fa=/(\w+)(\])?(\[|\.)?/g;function Bh(r,e){r.seq.push(e),r.map[e.id]=e}function ex(r,e,t){const n=r.name,i=n.length;for(fa.lastIndex=0;;){const s=fa.exec(n),o=fa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Bh(t,l===void 0?new Zv(a,r,e):new Jv(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Qv(a),Bh(t,u)),t=u}}}class Jr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);ex(a,c,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function kh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const tx=37297;let nx=0;function ix(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const zh=new Be;function sx(r){Xe._getMatrix(zh,Xe.workingColorSpace,r);const e=`mat3( ${zh.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(r)){case ao:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Se("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Gh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+ix(r.getShaderSource(e),a)}else return s}function rx(r,e){const t=sx(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ox={[Lc]:"Linear",[Dc]:"Reinhard",[Nc]:"Cineon",[mo]:"ACESFilmic",[Fc]:"AgX",[Oc]:"Neutral",[Uc]:"Custom"};function ax(r,e){const t=ox[e];return t===void 0?(Se("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Hr=new R;function cx(){Xe.getLuminanceCoefficients(Hr);const r=Hr.x.toFixed(4),e=Hr.y.toFixed(4),t=Hr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function hx(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ux(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Gs(r){return r!==""}function Vh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sc(r){return r.replace(dx,px)}const fx=new Map;function px(r,e){let t=Ve[e];if(t===void 0){const n=fx.get(e);if(n!==void 0)t=Ve[n],Se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sc(t)}const mx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wh(r){return r.replace(mx,gx)}function gx(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Xh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const _x={[qr]:"SHADOWMAP_TYPE_PCF",[Bs]:"SHADOWMAP_TYPE_VSM"};function vx(r){return _x[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const xx={[Ti]:"ENVMAP_TYPE_CUBE",[as]:"ENVMAP_TYPE_CUBE",[go]:"ENVMAP_TYPE_CUBE_UV"};function yx(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":xx[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Mx={[as]:"ENVMAP_MODE_REFRACTION"};function bx(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Mx[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Sx={[Su]:"ENVMAP_BLENDING_MULTIPLY",[Kf]:"ENVMAP_BLENDING_MIX",[jf]:"ENVMAP_BLENDING_ADD"};function wx(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Sx[r.combine]||"ENVMAP_BLENDING_NONE"}function Tx(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ex(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=vx(t),l=yx(t),h=bx(t),u=wx(t),d=Tx(t),f=lx(t),m=hx(s),_=i.createProgram();let p,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Gs).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Gs).join(`
`),g.length>0&&(g+=`
`)):(p=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),g=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?Ve.tonemapping_pars_fragment:"",t.toneMapping!==On?ax("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,rx("linearToOutputTexel",t.outputColorSpace),cx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gs).join(`
`)),o=Sc(o),o=Vh(o,t),o=Hh(o,t),a=Sc(a),a=Vh(a,t),a=Hh(a,t),o=Wh(o),a=Wh(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const b=v+p+o,y=v+g+a,A=kh(i,i.VERTEX_SHADER,b),w=kh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,A),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(r.debug.checkShaderErrors){const L=i.getProgramInfoLog(_)||"",V=i.getShaderInfoLog(A)||"",H=i.getShaderInfoLog(w)||"",D=L.trim(),k=V.trim(),B=H.trim();let Z=!0,ee=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,w);else{const he=Gh(i,A,"vertex"),be=Gh(i,w,"fragment");Re("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+D+`
`+he+`
`+be)}else D!==""?Se("WebGLProgram: Program Info Log:",D):(k===""||B==="")&&(ee=!1);ee&&(P.diagnostics={runnable:Z,programLog:D,vertexShader:{log:k,prefix:p},fragmentShader:{log:B,prefix:g}})}i.deleteShader(A),i.deleteShader(w),x=new Jr(i,_),T=ux(i,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(_,tx)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=nx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=w,this}let Ax=0;class Cx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rx(e),t.set(e,n)),n}}class Rx{constructor(e){this.id=Ax++,this.code=e,this.usedTimes=0}}function Px(r){return r===Ai||r===so||r===ro}function Ix(r,e,t,n,i,s){const o=new jc,a=new Cx,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function _(x,T,I,P,L,V){const H=P.fog,D=L.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Z=e.get(x.envMap||k,B),ee=Z&&Z.mapping===go?Z.image.height:null,he=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Se("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const be=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ce=be!==void 0?be.length:0;let Ne=0;D.morphAttributes.position!==void 0&&(Ne=1),D.morphAttributes.normal!==void 0&&(Ne=2),D.morphAttributes.color!==void 0&&(Ne=3);let Je,Ue,j,ge;if(he){const ke=Pn[he];Je=ke.vertexShader,Ue=ke.fragmentShader}else Je=x.vertexShader,Ue=x.fragmentShader,a.update(x),j=a.getVertexShaderID(x),ge=a.getFragmentShaderID(x);const re=r.getRenderTarget(),Pe=r.state.buffers.depth.getReversed(),Fe=L.isInstancedMesh===!0,Ie=L.isBatchedMesh===!0,gt=!!x.map,Ke=!!x.matcap,rt=!!Z,pt=!!x.aoMap,$e=!!x.lightMap,Rt=!!x.bumpMap,_t=!!x.normalMap,nn=!!x.displacementMap,U=!!x.emissiveMap,Pt=!!x.metalnessMap,je=!!x.roughnessMap,ut=x.anisotropy>0,de=x.clearcoat>0,vt=x.dispersion>0,E=x.iridescence>0,M=x.sheen>0,O=x.transmission>0,Y=ut&&!!x.anisotropyMap,Q=de&&!!x.clearcoatMap,te=de&&!!x.clearcoatNormalMap,le=de&&!!x.clearcoatRoughnessMap,q=E&&!!x.iridescenceMap,K=E&&!!x.iridescenceThicknessMap,_e=M&&!!x.sheenColorMap,ye=M&&!!x.sheenRoughnessMap,oe=!!x.specularMap,ne=!!x.specularColorMap,De=!!x.specularIntensityMap,Ge=O&&!!x.transmissionMap,Qe=O&&!!x.thicknessMap,N=!!x.gradientMap,ie=!!x.alphaMap,$=x.alphaTest>0,ve=!!x.alphaHash,ae=!!x.extensions;let J=On;x.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(J=r.toneMapping);const Te={shaderID:he,shaderType:x.type,shaderName:x.name,vertexShader:Je,fragmentShader:Ue,defines:x.defines,customVertexShaderID:j,customFragmentShaderID:ge,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Ie,batchingColor:Ie&&L._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&L.instanceColor!==null,instancingMorph:Fe&&L.morphTexture!==null,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Xe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:gt,matcap:Ke,envMap:rt,envMapMode:rt&&Z.mapping,envMapCubeUVHeight:ee,aoMap:pt,lightMap:$e,bumpMap:Rt,normalMap:_t,displacementMap:nn,emissiveMap:U,normalMapObjectSpace:_t&&x.normalMapType===ip,normalMapTangentSpace:_t&&x.normalMapType===fc,packedNormalMap:_t&&x.normalMapType===fc&&Px(x.normalMap.format),metalnessMap:Pt,roughnessMap:je,anisotropy:ut,anisotropyMap:Y,clearcoat:de,clearcoatMap:Q,clearcoatNormalMap:te,clearcoatRoughnessMap:le,dispersion:vt,iridescence:E,iridescenceMap:q,iridescenceThicknessMap:K,sheen:M,sheenColorMap:_e,sheenRoughnessMap:ye,specularMap:oe,specularColorMap:ne,specularIntensityMap:De,transmission:O,transmissionMap:Ge,thicknessMap:Qe,gradientMap:N,opaque:x.transparent===!1&&x.blending===is&&x.alphaToCoverage===!1,alphaMap:ie,alphaTest:$,alphaHash:ve,combine:x.combine,mapUv:gt&&m(x.map.channel),aoMapUv:pt&&m(x.aoMap.channel),lightMapUv:$e&&m(x.lightMap.channel),bumpMapUv:Rt&&m(x.bumpMap.channel),normalMapUv:_t&&m(x.normalMap.channel),displacementMapUv:nn&&m(x.displacementMap.channel),emissiveMapUv:U&&m(x.emissiveMap.channel),metalnessMapUv:Pt&&m(x.metalnessMap.channel),roughnessMapUv:je&&m(x.roughnessMap.channel),anisotropyMapUv:Y&&m(x.anisotropyMap.channel),clearcoatMapUv:Q&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:te&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:K&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(x.sheenRoughnessMap.channel),specularMapUv:oe&&m(x.specularMap.channel),specularColorMapUv:ne&&m(x.specularColorMap.channel),specularIntensityMapUv:De&&m(x.specularIntensityMap.channel),transmissionMapUv:Ge&&m(x.transmissionMap.channel),thicknessMapUv:Qe&&m(x.thicknessMap.channel),alphaMapUv:ie&&m(x.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(_t||ut),vertexNormals:!!D.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!D.attributes.uv&&(gt||ie),fog:!!H,useFog:x.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||D.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Pe,skinning:L.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:Ne,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:J,decodeVideoTexture:gt&&x.map.isVideoTexture===!0&&Xe.getTransfer(x.map.colorSpace)===et,decodeVideoTextureEmissive:U&&x.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(x.emissiveMap.colorSpace)===et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Lt,flipSided:x.side===Xt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ae&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&x.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function p(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)T.push(I),T.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(g(T,x),v(T,x),T.push(r.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function g(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function v(x,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),x.push(o.mask)}function b(x){const T=f[x.type];let I;if(T){const P=Pn[T];I=us.clone(P.uniforms)}else I=x.uniforms;return I}function y(x,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new Ex(r,T,x,i),l.push(I),h.set(T,I)),I}function A(x){if(--x.usedTimes===0){const T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function C(){a.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:b,acquireProgram:y,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:C}}function Lx(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Dx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function qh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function $h(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,_,p,g){let v=r[e];return v===void 0?(v={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:g},r[e]=v):(v.id=d.id,v.object=d,v.geometry=f,v.material=m,v.materialVariant=o(d),v.groupOrder=_,v.renderOrder=d.renderOrder,v.z=p,v.group=g),e++,v}function c(d,f,m,_,p,g){const v=a(d,f,m,_,p,g);m.transmission>0?n.push(v):m.transparent===!0?i.push(v):t.push(v)}function l(d,f,m,_,p,g){const v=a(d,f,m,_,p,g);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):t.unshift(v)}function h(d,f){t.length>1&&t.sort(d||Dx),n.length>1&&n.sort(f||qh),i.length>1&&i.sort(f||qh)}function u(){for(let d=e,f=r.length;d<f;d++){const m=r[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:c,unshift:l,finish:u,sort:h}}function Nx(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new $h,r.set(n,[o])):i>=s.length?(o=new $h,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Ux(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ae};break;case"SpotLight":t={position:new R,direction:new R,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function Fx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Ox=0;function Bx(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function kx(r){const e=new Ux,t=Fx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const i=new R,s=new Le,o=new Le;function a(l){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,v=0,b=0,y=0,A=0,w=0,C=0;l.sort(Bx);for(let T=0,I=l.length;T<I;T++){const P=l[T],L=P.color,V=P.intensity,H=P.distance;let D=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ai?D=P.shadow.map.texture:D=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=L.r*V,u+=L.g*V,d+=L.b*V;else if(P.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(P.sh.coefficients[k],V);C++}else if(P.isDirectionalLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const B=P.shadow,Z=t.get(P);Z.shadowIntensity=B.intensity,Z.shadowBias=B.bias,Z.shadowNormalBias=B.normalBias,Z.shadowRadius=B.radius,Z.shadowMapSize=B.mapSize,n.directionalShadow[f]=Z,n.directionalShadowMap[f]=D,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=k,f++}else if(P.isSpotLight){const k=e.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(L).multiplyScalar(V),k.distance=H,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,n.spot[_]=k;const B=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,B.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[_]=B.matrix,P.castShadow){const Z=t.get(P);Z.shadowIntensity=B.intensity,Z.shadowBias=B.bias,Z.shadowNormalBias=B.normalBias,Z.shadowRadius=B.radius,Z.shadowMapSize=B.mapSize,n.spotShadow[_]=Z,n.spotShadowMap[_]=D,y++}_++}else if(P.isRectAreaLight){const k=e.get(P);k.color.copy(L).multiplyScalar(V),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=k,p++}else if(P.isPointLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){const B=P.shadow,Z=t.get(P);Z.shadowIntensity=B.intensity,Z.shadowBias=B.bias,Z.shadowNormalBias=B.normalBias,Z.shadowRadius=B.radius,Z.shadowMapSize=B.mapSize,Z.shadowCameraNear=B.camera.near,Z.shadowCameraFar=B.camera.far,n.pointShadow[m]=Z,n.pointShadowMap[m]=D,n.pointShadowMatrix[m]=P.shadow.matrix,b++}n.point[m]=k,m++}else if(P.isHemisphereLight){const k=e.get(P);k.skyColor.copy(P.color).multiplyScalar(V),k.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[g]=k,g++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const x=n.hash;(x.directionalLength!==f||x.pointLength!==m||x.spotLength!==_||x.rectAreaLength!==p||x.hemiLength!==g||x.numDirectionalShadows!==v||x.numPointShadows!==b||x.numSpotShadows!==y||x.numSpotMaps!==A||x.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,x.directionalLength=f,x.pointLength=m,x.spotLength=_,x.rectAreaLength=p,x.hemiLength=g,x.numDirectionalShadows=v,x.numPointShadows=b,x.numSpotShadows=y,x.numSpotMaps=A,x.numLightProbes=C,n.version=Ox++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0;const p=h.matrixWorldInverse;for(let g=0,v=l.length;g<v;g++){const b=l[g];if(b.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(b.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(b.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(b.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function Yh(r){const e=new kx(r),t=[],n=[],i=[];function s(d){u.camera=d,t.length=0,n.length=0,i.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){i.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function zx(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Yh(r),e.set(i,[a])):s>=o.length?(a=new Yh(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Gx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Hx=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Wx=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Kh=new Le,Fs=new R,pa=new R;function Xx(r,e,t){let n=new Qc;const i=new ue,s=new ue,o=new st,a=new wm,c=new Tm,l={},h=t.maxTextureSize,u={[Jn]:Xt,[Xt]:Jn,[Lt]:Lt},d=new zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:Gx,fragmentShader:Vx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new mt;m.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new se(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qr;let g=this.type;this.render=function(w,C,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===bu&&(Se("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=qr);const T=r.getRenderTarget(),I=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Fn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const V=g!==this.type;V&&C.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(D=>D.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,D=w.length;H<D;H++){const k=w[H],B=k.shadow;if(B===void 0){Se("WebGLShadowMap:",k,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);const Z=B.getFrameExtents();i.multiply(Z),s.copy(B.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Z.x),i.x=s.x*Z.x,B.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Z.y),i.y=s.y*Z.y,B.mapSize.y=s.y));const ee=r.state.buffers.depth.getReversed();if(B.camera._reversedDepth=ee,B.map===null||V===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Bs){if(k.isPointLight){Se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Zt(i.x,i.y,{format:Ai,type:Jt,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),B.map.texture.name=k.name+".shadowMap",B.map.depthTexture=new ls(i.x,i.y,fn),B.map.depthTexture.name=k.name+".shadowMapDepth",B.map.depthTexture.format=Qn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Dt,B.map.depthTexture.magFilter=Dt}else k.isPointLight?(B.map=new sd(i.x),B.map.depthTexture=new rm(i.x,Bn)):(B.map=new Zt(i.x,i.y),B.map.depthTexture=new ls(i.x,i.y,Bn)),B.map.depthTexture.name=k.name+".shadowMap",B.map.depthTexture.format=Qn,this.type===qr?(B.map.depthTexture.compareFunction=ee?$c:qc,B.map.depthTexture.minFilter=Nt,B.map.depthTexture.magFilter=Nt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Dt,B.map.depthTexture.magFilter=Dt);B.camera.updateProjectionMatrix()}const he=B.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<he;be++){if(B.map.isWebGLCubeRenderTarget)r.setRenderTarget(B.map,be),r.clear();else{be===0&&(r.setRenderTarget(B.map),r.clear());const ce=B.getViewport(be);o.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),L.viewport(o)}if(k.isPointLight){const ce=B.camera,Ne=B.matrix,Je=k.distance||ce.far;Je!==ce.far&&(ce.far=Je,ce.updateProjectionMatrix()),Fs.setFromMatrixPosition(k.matrixWorld),ce.position.copy(Fs),pa.copy(ce.position),pa.add(Hx[be]),ce.up.copy(Wx[be]),ce.lookAt(pa),ce.updateMatrixWorld(),Ne.makeTranslation(-Fs.x,-Fs.y,-Fs.z),Kh.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Kh,ce.coordinateSystem,ce.reversedDepth)}else B.updateMatrices(k);n=B.getFrustum(),y(C,x,B.camera,k,this.type)}B.isPointLightShadow!==!0&&this.type===Bs&&v(B,x),B.needsUpdate=!1}g=this.type,p.needsUpdate=!1,r.setRenderTarget(T,I,P)};function v(w,C){const x=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Zt(i.x,i.y,{format:Ai,type:Jt})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(C,null,x,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(C,null,x,f,_,null)}function b(w,C,x,T){let I=null;const P=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)I=P;else if(I=x.isPointLight===!0?c:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const L=I.uuid,V=C.uuid;let H=l[L];H===void 0&&(H={},l[L]=H);let D=H[V];D===void 0&&(D=I.clone(),H[V]=D,C.addEventListener("dispose",A)),I=D}if(I.visible=C.visible,I.wireframe=C.wireframe,T===Bs?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:u[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const L=r.properties.get(I);L.light=x}return I}function y(w,C,x,T,I){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===Bs)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const V=e.update(w),H=w.material;if(Array.isArray(H)){const D=V.groups;for(let k=0,B=D.length;k<B;k++){const Z=D[k],ee=H[Z.materialIndex];if(ee&&ee.visible){const he=b(w,ee,T,I);w.onBeforeShadow(r,w,C,x,V,he,Z),r.renderBufferDirect(x,null,V,he,w,Z),w.onAfterShadow(r,w,C,x,V,he,Z)}}}else if(H.visible){const D=b(w,H,T,I);w.onBeforeShadow(r,w,C,x,V,D,null),r.renderBufferDirect(x,null,V,D,w,null),w.onAfterShadow(r,w,C,x,V,D,null)}}const L=w.children;for(let V=0,H=L.length;V<H;V++)y(L[V],C,x,T,I)}function A(w){w.target.removeEventListener("dispose",A);for(const x in l){const T=l[x],I=w.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function qx(r,e){function t(){let N=!1;const ie=new st;let $=null;const ve=new st(0,0,0,0);return{setMask:function(ae){$!==ae&&!N&&(r.colorMask(ae,ae,ae,ae),$=ae)},setLocked:function(ae){N=ae},setClear:function(ae,J,Te,ke,bt){bt===!0&&(ae*=ke,J*=ke,Te*=ke),ie.set(ae,J,Te,ke),ve.equals(ie)===!1&&(r.clearColor(ae,J,Te,ke),ve.copy(ie))},reset:function(){N=!1,$=null,ve.set(-1,0,0,0)}}}function n(){let N=!1,ie=!1,$=null,ve=null,ae=null;return{setReversed:function(J){if(ie!==J){const Te=e.get("EXT_clip_control");J?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),ie=J;const ke=ae;ae=null,this.setClear(ke)}},getReversed:function(){return ie},setTest:function(J){J?re(r.DEPTH_TEST):Pe(r.DEPTH_TEST)},setMask:function(J){$!==J&&!N&&(r.depthMask(J),$=J)},setFunc:function(J){if(ie&&(J=pp[J]),ve!==J){switch(J){case Ra:r.depthFunc(r.NEVER);break;case Pa:r.depthFunc(r.ALWAYS);break;case Ia:r.depthFunc(r.LESS);break;case os:r.depthFunc(r.LEQUAL);break;case La:r.depthFunc(r.EQUAL);break;case Da:r.depthFunc(r.GEQUAL);break;case Na:r.depthFunc(r.GREATER);break;case Ua:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ve=J}},setLocked:function(J){N=J},setClear:function(J){ae!==J&&(ae=J,ie&&(J=1-J),r.clearDepth(J))},reset:function(){N=!1,$=null,ve=null,ae=null,ie=!1}}}function i(){let N=!1,ie=null,$=null,ve=null,ae=null,J=null,Te=null,ke=null,bt=null;return{setTest:function(ot){N||(ot?re(r.STENCIL_TEST):Pe(r.STENCIL_TEST))},setMask:function(ot){ie!==ot&&!N&&(r.stencilMask(ot),ie=ot)},setFunc:function(ot,Gn,wn){($!==ot||ve!==Gn||ae!==wn)&&(r.stencilFunc(ot,Gn,wn),$=ot,ve=Gn,ae=wn)},setOp:function(ot,Gn,wn){(J!==ot||Te!==Gn||ke!==wn)&&(r.stencilOp(ot,Gn,wn),J=ot,Te=Gn,ke=wn)},setLocked:function(ot){N=ot},setClear:function(ot){bt!==ot&&(r.clearStencil(ot),bt=ot)},reset:function(){N=!1,ie=null,$=null,ve=null,ae=null,J=null,Te=null,ke=null,bt=null}}}const s=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d={},f=new WeakMap,m=[],_=null,p=!1,g=null,v=null,b=null,y=null,A=null,w=null,C=null,x=new Ae(0,0,0),T=0,I=!1,P=null,L=null,V=null,H=null,D=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Z=0;const ee=r.getParameter(r.VERSION);ee.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ee)[1]),B=Z>=1):ee.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),B=Z>=2);let he=null,be={};const ce=r.getParameter(r.SCISSOR_BOX),Ne=r.getParameter(r.VIEWPORT),Je=new st().fromArray(ce),Ue=new st().fromArray(Ne);function j(N,ie,$,ve){const ae=new Uint8Array(4),J=r.createTexture();r.bindTexture(N,J),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Te=0;Te<$;Te++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ie,0,r.RGBA,1,1,ve,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(ie+Te,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return J}const ge={};ge[r.TEXTURE_2D]=j(r.TEXTURE_2D,r.TEXTURE_2D,1),ge[r.TEXTURE_CUBE_MAP]=j(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[r.TEXTURE_2D_ARRAY]=j(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ge[r.TEXTURE_3D]=j(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(r.DEPTH_TEST),o.setFunc(os),Rt(!1),_t(Rl),re(r.CULL_FACE),pt(Fn);function re(N){h[N]!==!0&&(r.enable(N),h[N]=!0)}function Pe(N){h[N]!==!1&&(r.disable(N),h[N]=!1)}function Fe(N,ie){return d[N]!==ie?(r.bindFramebuffer(N,ie),d[N]=ie,N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ie),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ie),!0):!1}function Ie(N,ie){let $=m,ve=!1;if(N){$=f.get(ie),$===void 0&&($=[],f.set(ie,$));const ae=N.textures;if($.length!==ae.length||$[0]!==r.COLOR_ATTACHMENT0){for(let J=0,Te=ae.length;J<Te;J++)$[J]=r.COLOR_ATTACHMENT0+J;$.length=ae.length,ve=!0}}else $[0]!==r.BACK&&($[0]=r.BACK,ve=!0);ve&&r.drawBuffers($)}function gt(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const Ke={[bi]:r.FUNC_ADD,[Lf]:r.FUNC_SUBTRACT,[Df]:r.FUNC_REVERSE_SUBTRACT};Ke[Nf]=r.MIN,Ke[Uf]=r.MAX;const rt={[Ff]:r.ZERO,[Of]:r.ONE,[Bf]:r.SRC_COLOR,[Aa]:r.SRC_ALPHA,[Wf]:r.SRC_ALPHA_SATURATE,[Vf]:r.DST_COLOR,[zf]:r.DST_ALPHA,[kf]:r.ONE_MINUS_SRC_COLOR,[Ca]:r.ONE_MINUS_SRC_ALPHA,[Hf]:r.ONE_MINUS_DST_COLOR,[Gf]:r.ONE_MINUS_DST_ALPHA,[Xf]:r.CONSTANT_COLOR,[qf]:r.ONE_MINUS_CONSTANT_COLOR,[$f]:r.CONSTANT_ALPHA,[Yf]:r.ONE_MINUS_CONSTANT_ALPHA};function pt(N,ie,$,ve,ae,J,Te,ke,bt,ot){if(N===Fn){p===!0&&(Pe(r.BLEND),p=!1);return}if(p===!1&&(re(r.BLEND),p=!0),N!==If){if(N!==g||ot!==I){if((v!==bi||A!==bi)&&(r.blendEquation(r.FUNC_ADD),v=bi,A=bi),ot)switch(N){case is:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case no:r.blendFunc(r.ONE,r.ONE);break;case Pl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Il:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Re("WebGLState: Invalid blending: ",N);break}else switch(N){case is:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case no:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Pl:Re("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:Re("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Re("WebGLState: Invalid blending: ",N);break}b=null,y=null,w=null,C=null,x.set(0,0,0),T=0,g=N,I=ot}return}ae=ae||ie,J=J||$,Te=Te||ve,(ie!==v||ae!==A)&&(r.blendEquationSeparate(Ke[ie],Ke[ae]),v=ie,A=ae),($!==b||ve!==y||J!==w||Te!==C)&&(r.blendFuncSeparate(rt[$],rt[ve],rt[J],rt[Te]),b=$,y=ve,w=J,C=Te),(ke.equals(x)===!1||bt!==T)&&(r.blendColor(ke.r,ke.g,ke.b,bt),x.copy(ke),T=bt),g=N,I=!1}function $e(N,ie){N.side===Lt?Pe(r.CULL_FACE):re(r.CULL_FACE);let $=N.side===Xt;ie&&($=!$),Rt($),N.blending===is&&N.transparent===!1?pt(Fn):pt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const ve=N.stencilWrite;a.setTest(ve),ve&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),U(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?re(r.SAMPLE_ALPHA_TO_COVERAGE):Pe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(N){P!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),P=N)}function _t(N){N!==Rf?(re(r.CULL_FACE),N!==L&&(N===Rl?r.cullFace(r.BACK):N===Pf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Pe(r.CULL_FACE),L=N}function nn(N){N!==V&&(B&&r.lineWidth(N),V=N)}function U(N,ie,$){N?(re(r.POLYGON_OFFSET_FILL),(H!==ie||D!==$)&&(H=ie,D=$,o.getReversed()&&(ie=-ie),r.polygonOffset(ie,$))):Pe(r.POLYGON_OFFSET_FILL)}function Pt(N){N?re(r.SCISSOR_TEST):Pe(r.SCISSOR_TEST)}function je(N){N===void 0&&(N=r.TEXTURE0+k-1),he!==N&&(r.activeTexture(N),he=N)}function ut(N,ie,$){$===void 0&&(he===null?$=r.TEXTURE0+k-1:$=he);let ve=be[$];ve===void 0&&(ve={type:void 0,texture:void 0},be[$]=ve),(ve.type!==N||ve.texture!==ie)&&(he!==$&&(r.activeTexture($),he=$),r.bindTexture(N,ie||ge[N]),ve.type=N,ve.texture=ie)}function de(){const N=be[he];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function vt(){try{r.compressedTexImage2D(...arguments)}catch(N){Re("WebGLState:",N)}}function E(){try{r.compressedTexImage3D(...arguments)}catch(N){Re("WebGLState:",N)}}function M(){try{r.texSubImage2D(...arguments)}catch(N){Re("WebGLState:",N)}}function O(){try{r.texSubImage3D(...arguments)}catch(N){Re("WebGLState:",N)}}function Y(){try{r.compressedTexSubImage2D(...arguments)}catch(N){Re("WebGLState:",N)}}function Q(){try{r.compressedTexSubImage3D(...arguments)}catch(N){Re("WebGLState:",N)}}function te(){try{r.texStorage2D(...arguments)}catch(N){Re("WebGLState:",N)}}function le(){try{r.texStorage3D(...arguments)}catch(N){Re("WebGLState:",N)}}function q(){try{r.texImage2D(...arguments)}catch(N){Re("WebGLState:",N)}}function K(){try{r.texImage3D(...arguments)}catch(N){Re("WebGLState:",N)}}function _e(N){return u[N]!==void 0?u[N]:r.getParameter(N)}function ye(N,ie){u[N]!==ie&&(r.pixelStorei(N,ie),u[N]=ie)}function oe(N){Je.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Je.copy(N))}function ne(N){Ue.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Ue.copy(N))}function De(N,ie){let $=l.get(ie);$===void 0&&($=new WeakMap,l.set(ie,$));let ve=$.get(N);ve===void 0&&(ve=r.getUniformBlockIndex(ie,N.name),$.set(N,ve))}function Ge(N,ie){const ve=l.get(ie).get(N);c.get(ie)!==ve&&(r.uniformBlockBinding(ie,ve,N.__bindingPointIndex),c.set(ie,ve))}function Qe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},u={},he=null,be={},d={},f=new WeakMap,m=[],_=null,p=!1,g=null,v=null,b=null,y=null,A=null,w=null,C=null,x=new Ae(0,0,0),T=0,I=!1,P=null,L=null,V=null,H=null,D=null,Je.set(0,0,r.canvas.width,r.canvas.height),Ue.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Pe,bindFramebuffer:Fe,drawBuffers:Ie,useProgram:gt,setBlending:pt,setMaterial:$e,setFlipSided:Rt,setCullFace:_t,setLineWidth:nn,setPolygonOffset:U,setScissorTest:Pt,activeTexture:je,bindTexture:ut,unbindTexture:de,compressedTexImage2D:vt,compressedTexImage3D:E,texImage2D:q,texImage3D:K,pixelStorei:ye,getParameter:_e,updateUBOMapping:De,uniformBlockBinding:Ge,texStorage2D:te,texStorage3D:le,texSubImage2D:M,texSubImage3D:O,compressedTexSubImage2D:Y,compressedTexSubImage3D:Q,scissor:oe,viewport:ne,reset:Qe}}function $x(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,M){return m?new OffscreenCanvas(E,M):tr("canvas")}function p(E,M,O){let Y=1;const Q=vt(E);if((Q.width>O||Q.height>O)&&(Y=O/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const te=Math.floor(Y*Q.width),le=Math.floor(Y*Q.height);d===void 0&&(d=_(te,le));const q=M?_(te,le):d;return q.width=te,q.height=le,q.getContext("2d").drawImage(E,0,0,te,le),Se("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+te+"x"+le+")."),q}else return"data"in E&&Se("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function g(E){return E.generateMipmaps}function v(E){r.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(E,M,O,Y,Q,te=!1){if(E!==null){if(r[E]!==void 0)return r[E];Se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let le;Y&&(le=e.get("EXT_texture_norm16"),le||Se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=M;if(M===r.RED&&(O===r.FLOAT&&(q=r.R32F),O===r.HALF_FLOAT&&(q=r.R16F),O===r.UNSIGNED_BYTE&&(q=r.R8),O===r.UNSIGNED_SHORT&&le&&(q=le.R16_EXT),O===r.SHORT&&le&&(q=le.R16_SNORM_EXT)),M===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.R8UI),O===r.UNSIGNED_SHORT&&(q=r.R16UI),O===r.UNSIGNED_INT&&(q=r.R32UI),O===r.BYTE&&(q=r.R8I),O===r.SHORT&&(q=r.R16I),O===r.INT&&(q=r.R32I)),M===r.RG&&(O===r.FLOAT&&(q=r.RG32F),O===r.HALF_FLOAT&&(q=r.RG16F),O===r.UNSIGNED_BYTE&&(q=r.RG8),O===r.UNSIGNED_SHORT&&le&&(q=le.RG16_EXT),O===r.SHORT&&le&&(q=le.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RG8UI),O===r.UNSIGNED_SHORT&&(q=r.RG16UI),O===r.UNSIGNED_INT&&(q=r.RG32UI),O===r.BYTE&&(q=r.RG8I),O===r.SHORT&&(q=r.RG16I),O===r.INT&&(q=r.RG32I)),M===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RGB8UI),O===r.UNSIGNED_SHORT&&(q=r.RGB16UI),O===r.UNSIGNED_INT&&(q=r.RGB32UI),O===r.BYTE&&(q=r.RGB8I),O===r.SHORT&&(q=r.RGB16I),O===r.INT&&(q=r.RGB32I)),M===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),O===r.UNSIGNED_INT&&(q=r.RGBA32UI),O===r.BYTE&&(q=r.RGBA8I),O===r.SHORT&&(q=r.RGBA16I),O===r.INT&&(q=r.RGBA32I)),M===r.RGB&&(O===r.UNSIGNED_SHORT&&le&&(q=le.RGB16_EXT),O===r.SHORT&&le&&(q=le.RGB16_SNORM_EXT),O===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),O===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),M===r.RGBA){const K=te?ao:Xe.getTransfer(Q);O===r.FLOAT&&(q=r.RGBA32F),O===r.HALF_FLOAT&&(q=r.RGBA16F),O===r.UNSIGNED_BYTE&&(q=K===et?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT&&le&&(q=le.RGBA16_EXT),O===r.SHORT&&le&&(q=le.RGBA16_SNORM_EXT),O===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function A(E,M){let O;return E?M===null||M===Bn||M===Zs?O=r.DEPTH24_STENCIL8:M===fn?O=r.DEPTH32F_STENCIL8:M===js&&(O=r.DEPTH24_STENCIL8,Se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Bn||M===Zs?O=r.DEPTH_COMPONENT24:M===fn?O=r.DEPTH_COMPONENT32F:M===js&&(O=r.DEPTH_COMPONENT16),O}function w(E,M){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==Dt&&E.minFilter!==Nt?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function C(E){const M=E.target;M.removeEventListener("dispose",C),T(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&u.delete(M)}function x(E){const M=E.target;M.removeEventListener("dispose",x),P(M)}function T(E){const M=n.get(E);if(M.__webglInit===void 0)return;const O=E.source,Y=f.get(O);if(Y){const Q=Y[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&I(E),Object.keys(Y).length===0&&f.delete(O)}n.remove(E)}function I(E){const M=n.get(E);r.deleteTexture(M.__webglTexture);const O=E.source,Y=f.get(O);delete Y[M.__cacheKey],o.memory.textures--}function P(E){const M=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let Q=0;Q<M.__webglFramebuffer[Y].length;Q++)r.deleteFramebuffer(M.__webglFramebuffer[Y][Q]);else r.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)r.deleteFramebuffer(M.__webglFramebuffer[Y]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=E.textures;for(let Y=0,Q=O.length;Y<Q;Y++){const te=n.get(O[Y]);te.__webglTexture&&(r.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(O[Y])}n.remove(E)}let L=0;function V(){L=0}function H(){return L}function D(E){L=E}function k(){const E=L;return E>=i.maxTextures&&Se("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),L+=1,E}function B(E){const M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function Z(E,M){const O=n.get(E);if(E.isVideoTexture&&ut(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&O.__version!==E.version){const Y=E.image;if(Y===null)Se("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Se("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(O,E,M);return}}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+M)}function ee(E,M){const O=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){Pe(O,E,M);return}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+M)}function he(E,M){const O=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){Pe(O,E,M);return}t.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+M)}function be(E,M){const O=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&O.__version!==E.version){Fe(O,E,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+M)}const ce={[Ei]:r.REPEAT,[Ln]:r.CLAMP_TO_EDGE,[io]:r.MIRRORED_REPEAT},Ne={[Dt]:r.NEAREST,[Tu]:r.NEAREST_MIPMAP_NEAREST,[ks]:r.NEAREST_MIPMAP_LINEAR,[Nt]:r.LINEAR,[$r]:r.LINEAR_MIPMAP_NEAREST,[Dn]:r.LINEAR_MIPMAP_LINEAR},Je={[sp]:r.NEVER,[lp]:r.ALWAYS,[rp]:r.LESS,[qc]:r.LEQUAL,[op]:r.EQUAL,[$c]:r.GEQUAL,[ap]:r.GREATER,[cp]:r.NOTEQUAL};function Ue(E,M){if(M.type===fn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Nt||M.magFilter===$r||M.magFilter===ks||M.magFilter===Dn||M.minFilter===Nt||M.minFilter===$r||M.minFilter===ks||M.minFilter===Dn)&&Se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,ce[M.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,ce[M.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,ce[M.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,Ne[M.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,Ne[M.minFilter]),M.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,Je[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Dt||M.minFilter!==ks&&M.minFilter!==Dn||M.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function j(E,M){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",C));const Y=M.source;let Q=f.get(Y);Q===void 0&&(Q={},f.set(Y,Q));const te=B(M);if(te!==E.__cacheKey){Q[te]===void 0&&(Q[te]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Q[te].usedTimes++;const le=Q[E.__cacheKey];le!==void 0&&(Q[E.__cacheKey].usedTimes--,le.usedTimes===0&&I(M)),E.__cacheKey=te,E.__webglTexture=Q[te].texture}return O}function ge(E,M,O){return Math.floor(Math.floor(E/O)/M)}function re(E,M,O,Y){const te=E.updateRanges;if(te.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,O,Y,M.data);else{te.sort((ye,oe)=>ye.start-oe.start);let le=0;for(let ye=1;ye<te.length;ye++){const oe=te[le],ne=te[ye],De=oe.start+oe.count,Ge=ge(ne.start,M.width,4),Qe=ge(oe.start,M.width,4);ne.start<=De+1&&Ge===Qe&&ge(ne.start+ne.count-1,M.width,4)===Ge?oe.count=Math.max(oe.count,ne.start+ne.count-oe.start):(++le,te[le]=ne)}te.length=le+1;const q=t.getParameter(r.UNPACK_ROW_LENGTH),K=t.getParameter(r.UNPACK_SKIP_PIXELS),_e=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let ye=0,oe=te.length;ye<oe;ye++){const ne=te[ye],De=Math.floor(ne.start/4),Ge=Math.ceil(ne.count/4),Qe=De%M.width,N=Math.floor(De/M.width),ie=Ge,$=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Qe,N,ie,$,O,Y,M.data)}E.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,q),t.pixelStorei(r.UNPACK_SKIP_PIXELS,K),t.pixelStorei(r.UNPACK_SKIP_ROWS,_e)}}function Pe(E,M,O){let Y=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=r.TEXTURE_3D);const Q=j(E,M),te=M.source;t.bindTexture(Y,E.__webglTexture,r.TEXTURE0+O);const le=n.get(te);if(te.version!==le.__version||Q===!0){if(t.activeTexture(r.TEXTURE0+O),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const $=Xe.getPrimaries(Xe.workingColorSpace),ve=M.colorSpace===In?null:Xe.getPrimaries(M.colorSpace),ae=M.colorSpace===In||$===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae)}t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let K=p(M.image,!1,i.maxTextureSize);K=de(M,K);const _e=s.convert(M.format,M.colorSpace),ye=s.convert(M.type);let oe=y(M.internalFormat,_e,ye,M.normalized,M.colorSpace,M.isVideoTexture);Ue(Y,M);let ne;const De=M.mipmaps,Ge=M.isVideoTexture!==!0,Qe=le.__version===void 0||Q===!0,N=te.dataReady,ie=w(M,K);if(M.isDepthTexture)oe=A(M.format===wi,M.type),Qe&&(Ge?t.texStorage2D(r.TEXTURE_2D,1,oe,K.width,K.height):t.texImage2D(r.TEXTURE_2D,0,oe,K.width,K.height,0,_e,ye,null));else if(M.isDataTexture)if(De.length>0){Ge&&Qe&&t.texStorage2D(r.TEXTURE_2D,ie,oe,De[0].width,De[0].height);for(let $=0,ve=De.length;$<ve;$++)ne=De[$],Ge?N&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,ne.width,ne.height,_e,ye,ne.data):t.texImage2D(r.TEXTURE_2D,$,oe,ne.width,ne.height,0,_e,ye,ne.data);M.generateMipmaps=!1}else Ge?(Qe&&t.texStorage2D(r.TEXTURE_2D,ie,oe,K.width,K.height),N&&re(M,K,_e,ye)):t.texImage2D(r.TEXTURE_2D,0,oe,K.width,K.height,0,_e,ye,K.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ge&&Qe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ie,oe,De[0].width,De[0].height,K.depth);for(let $=0,ve=De.length;$<ve;$++)if(ne=De[$],M.format!==pn)if(_e!==null)if(Ge){if(N)if(M.layerUpdates.size>0){const ae=Eh(ne.width,ne.height,M.format,M.type);for(const J of M.layerUpdates){const Te=ne.data.subarray(J*ae/ne.data.BYTES_PER_ELEMENT,(J+1)*ae/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,J,ne.width,ne.height,1,_e,Te)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,ne.width,ne.height,K.depth,_e,ne.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,$,oe,ne.width,ne.height,K.depth,0,ne.data,0,0);else Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,ne.width,ne.height,K.depth,_e,ye,ne.data):t.texImage3D(r.TEXTURE_2D_ARRAY,$,oe,ne.width,ne.height,K.depth,0,_e,ye,ne.data)}else{Ge&&Qe&&t.texStorage2D(r.TEXTURE_2D,ie,oe,De[0].width,De[0].height);for(let $=0,ve=De.length;$<ve;$++)ne=De[$],M.format!==pn?_e!==null?Ge?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,$,0,0,ne.width,ne.height,_e,ne.data):t.compressedTexImage2D(r.TEXTURE_2D,$,oe,ne.width,ne.height,0,ne.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?N&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,ne.width,ne.height,_e,ye,ne.data):t.texImage2D(r.TEXTURE_2D,$,oe,ne.width,ne.height,0,_e,ye,ne.data)}else if(M.isDataArrayTexture)if(Ge){if(Qe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ie,oe,K.width,K.height,K.depth),N)if(M.layerUpdates.size>0){const $=Eh(K.width,K.height,M.format,M.type);for(const ve of M.layerUpdates){const ae=K.data.subarray(ve*$/K.data.BYTES_PER_ELEMENT,(ve+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ve,K.width,K.height,1,_e,ye,ae)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,_e,ye,K.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,oe,K.width,K.height,K.depth,0,_e,ye,K.data);else if(M.isData3DTexture)Ge?(Qe&&t.texStorage3D(r.TEXTURE_3D,ie,oe,K.width,K.height,K.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,_e,ye,K.data)):t.texImage3D(r.TEXTURE_3D,0,oe,K.width,K.height,K.depth,0,_e,ye,K.data);else if(M.isFramebufferTexture){if(Qe)if(Ge)t.texStorage2D(r.TEXTURE_2D,ie,oe,K.width,K.height);else{let $=K.width,ve=K.height;for(let ae=0;ae<ie;ae++)t.texImage2D(r.TEXTURE_2D,ae,oe,$,ve,0,_e,ye,null),$>>=1,ve>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const $=r.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),u.add(M),$.onpaint=ke=>{const bt=ke.changedElements;for(const ot of u)bt.includes(ot.image)&&(ot.needsUpdate=!0)},$.requestPaint();return}const ve=0,ae=r.RGBA,J=r.RGBA,Te=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,ve,ae,J,Te,K),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(De.length>0){if(Ge&&Qe){const $=vt(De[0]);t.texStorage2D(r.TEXTURE_2D,ie,oe,$.width,$.height)}for(let $=0,ve=De.length;$<ve;$++)ne=De[$],Ge?N&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,_e,ye,ne):t.texImage2D(r.TEXTURE_2D,$,oe,_e,ye,ne);M.generateMipmaps=!1}else if(Ge){if(Qe){const $=vt(K);t.texStorage2D(r.TEXTURE_2D,ie,oe,$.width,$.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,_e,ye,K)}else t.texImage2D(r.TEXTURE_2D,0,oe,_e,ye,K);g(M)&&v(Y),le.__version=te.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function Fe(E,M,O){if(M.image.length!==6)return;const Y=j(E,M),Q=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+O);const te=n.get(Q);if(Q.version!==te.__version||Y===!0){t.activeTexture(r.TEXTURE0+O);const le=Xe.getPrimaries(Xe.workingColorSpace),q=M.colorSpace===In?null:Xe.getPrimaries(M.colorSpace),K=M.colorSpace===In||le===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const _e=M.isCompressedTexture||M.image[0].isCompressedTexture,ye=M.image[0]&&M.image[0].isDataTexture,oe=[];for(let J=0;J<6;J++)!_e&&!ye?oe[J]=p(M.image[J],!0,i.maxCubemapSize):oe[J]=ye?M.image[J].image:M.image[J],oe[J]=de(M,oe[J]);const ne=oe[0],De=s.convert(M.format,M.colorSpace),Ge=s.convert(M.type),Qe=y(M.internalFormat,De,Ge,M.normalized,M.colorSpace),N=M.isVideoTexture!==!0,ie=te.__version===void 0||Y===!0,$=Q.dataReady;let ve=w(M,ne);Ue(r.TEXTURE_CUBE_MAP,M);let ae;if(_e){N&&ie&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ve,Qe,ne.width,ne.height);for(let J=0;J<6;J++){ae=oe[J].mipmaps;for(let Te=0;Te<ae.length;Te++){const ke=ae[Te];M.format!==pn?De!==null?N?$&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,0,0,ke.width,ke.height,De,ke.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,Qe,ke.width,ke.height,0,ke.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?$&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,0,0,ke.width,ke.height,De,Ge,ke.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,Qe,ke.width,ke.height,0,De,Ge,ke.data)}}}else{if(ae=M.mipmaps,N&&ie){ae.length>0&&ve++;const J=vt(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ve,Qe,J.width,J.height)}for(let J=0;J<6;J++)if(ye){N?$&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,oe[J].width,oe[J].height,De,Ge,oe[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qe,oe[J].width,oe[J].height,0,De,Ge,oe[J].data);for(let Te=0;Te<ae.length;Te++){const bt=ae[Te].image[J].image;N?$&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,0,0,bt.width,bt.height,De,Ge,bt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,Qe,bt.width,bt.height,0,De,Ge,bt.data)}}else{N?$&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,De,Ge,oe[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qe,De,Ge,oe[J]);for(let Te=0;Te<ae.length;Te++){const ke=ae[Te];N?$&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,0,0,De,Ge,ke.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,Qe,De,Ge,ke.image[J])}}}g(M)&&v(r.TEXTURE_CUBE_MAP),te.__version=Q.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function Ie(E,M,O,Y,Q,te){const le=s.convert(O.format,O.colorSpace),q=s.convert(O.type),K=y(O.internalFormat,le,q,O.normalized,O.colorSpace),_e=n.get(M),ye=n.get(O);if(ye.__renderTarget=M,!_e.__hasExternalTextures){const oe=Math.max(1,M.width>>te),ne=Math.max(1,M.height>>te);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,te,K,oe,ne,M.depth,0,le,q,null):t.texImage2D(Q,te,K,oe,ne,0,le,q,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),je(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,Q,ye.__webglTexture,0,Pt(M)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,Q,ye.__webglTexture,te),t.bindFramebuffer(r.FRAMEBUFFER,null)}function gt(E,M,O){if(r.bindRenderbuffer(r.RENDERBUFFER,E),M.depthBuffer){const Y=M.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,te=A(M.stencilBuffer,Q),le=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;je(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Pt(M),te,M.width,M.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,Pt(M),te,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,te,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,le,r.RENDERBUFFER,E)}else{const Y=M.textures;for(let Q=0;Q<Y.length;Q++){const te=Y[Q],le=s.convert(te.format,te.colorSpace),q=s.convert(te.type),K=y(te.internalFormat,le,q,te.normalized,te.colorSpace);je(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Pt(M),K,M.width,M.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,Pt(M),K,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,K,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ke(E,M,O){const Y=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(M.depthTexture);if(Q.__renderTarget=M,(!Q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,M.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),Ue(r.TEXTURE_CUBE_MAP,M.depthTexture);const _e=s.convert(M.depthTexture.format),ye=s.convert(M.depthTexture.type);let oe;M.depthTexture.format===Qn?oe=r.DEPTH_COMPONENT24:M.depthTexture.format===wi&&(oe=r.DEPTH24_STENCIL8);for(let ne=0;ne<6;ne++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,oe,M.width,M.height,0,_e,ye,null)}}else Z(M.depthTexture,0);const te=Q.__webglTexture,le=Pt(M),q=Y?r.TEXTURE_CUBE_MAP_POSITIVE_X+O:r.TEXTURE_2D,K=M.depthTexture.format===wi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===Qn)je(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,q,te,0,le):r.framebufferTexture2D(r.FRAMEBUFFER,K,q,te,0);else if(M.depthTexture.format===wi)je(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,q,te,0,le):r.framebufferTexture2D(r.FRAMEBUFFER,K,q,te,0);else throw new Error("Unknown depthTexture format")}function rt(E){const M=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==E.depthTexture){const Y=E.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=Y}if(E.depthTexture&&!M.__autoAllocateDepthBuffer)if(O)for(let Y=0;Y<6;Y++)Ke(M.__webglFramebuffer[Y],E,Y);else{const Y=E.texture.mipmaps;Y&&Y.length>0?Ke(M.__webglFramebuffer[0],E,0):Ke(M.__webglFramebuffer,E,0)}else if(O){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=r.createRenderbuffer(),gt(M.__webglDepthbuffer[Y],E,!1);else{const Q=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=M.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,te)}}else{const Y=E.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),gt(M.__webglDepthbuffer,E,!1);else{const Q=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,te)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(E,M,O){const Y=n.get(E);M!==void 0&&Ie(Y.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&rt(E)}function $e(E){const M=E.texture,O=n.get(E),Y=n.get(M);E.addEventListener("dispose",x);const Q=E.textures,te=E.isWebGLCubeRenderTarget===!0,le=Q.length>1;if(le||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=M.version,o.memory.textures++),te){O.__webglFramebuffer=[];for(let q=0;q<6;q++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[q]=[];for(let K=0;K<M.mipmaps.length;K++)O.__webglFramebuffer[q][K]=r.createFramebuffer()}else O.__webglFramebuffer[q]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let q=0;q<M.mipmaps.length;q++)O.__webglFramebuffer[q]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(le)for(let q=0,K=Q.length;q<K;q++){const _e=n.get(Q[q]);_e.__webglTexture===void 0&&(_e.__webglTexture=r.createTexture(),o.memory.textures++)}if(E.samples>0&&je(E)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let q=0;q<Q.length;q++){const K=Q[q];O.__webglColorRenderbuffer[q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[q]);const _e=s.convert(K.format,K.colorSpace),ye=s.convert(K.type),oe=y(K.internalFormat,_e,ye,K.normalized,K.colorSpace,E.isXRRenderTarget===!0),ne=Pt(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,oe,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,O.__webglColorRenderbuffer[q])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),gt(O.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(te){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),Ue(r.TEXTURE_CUBE_MAP,M);for(let q=0;q<6;q++)if(M.mipmaps&&M.mipmaps.length>0)for(let K=0;K<M.mipmaps.length;K++)Ie(O.__webglFramebuffer[q][K],E,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,K);else Ie(O.__webglFramebuffer[q],E,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);g(M)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let q=0,K=Q.length;q<K;q++){const _e=Q[q],ye=n.get(_e);let oe=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(oe=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(oe,ye.__webglTexture),Ue(oe,_e),Ie(O.__webglFramebuffer,E,_e,r.COLOR_ATTACHMENT0+q,oe,0),g(_e)&&v(oe)}t.unbindTexture()}else{let q=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(q=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(q,Y.__webglTexture),Ue(q,M),M.mipmaps&&M.mipmaps.length>0)for(let K=0;K<M.mipmaps.length;K++)Ie(O.__webglFramebuffer[K],E,M,r.COLOR_ATTACHMENT0,q,K);else Ie(O.__webglFramebuffer,E,M,r.COLOR_ATTACHMENT0,q,0);g(M)&&v(q),t.unbindTexture()}E.depthBuffer&&rt(E)}function Rt(E){const M=E.textures;for(let O=0,Y=M.length;O<Y;O++){const Q=M[O];if(g(Q)){const te=b(E),le=n.get(Q).__webglTexture;t.bindTexture(te,le),v(te),t.unbindTexture()}}}const _t=[],nn=[];function U(E){if(E.samples>0){if(je(E)===!1){const M=E.textures,O=E.width,Y=E.height;let Q=r.COLOR_BUFFER_BIT;const te=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,le=n.get(E),q=M.length>1;if(q)for(let _e=0;_e<M.length;_e++)t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const K=E.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let _e=0;_e<M.length;_e++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,le.__webglColorRenderbuffer[_e]);const ye=n.get(M[_e]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ye,0)}r.blitFramebuffer(0,0,O,Y,0,0,O,Y,Q,r.NEAREST),c===!0&&(_t.length=0,nn.length=0,_t.push(r.COLOR_ATTACHMENT0+_e),E.depthBuffer&&E.resolveDepthBuffer===!1&&(_t.push(te),nn.push(te),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,nn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),q)for(let _e=0;_e<M.length;_e++){t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,le.__webglColorRenderbuffer[_e]);const ye=n.get(M[_e]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,ye,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const M=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function Pt(E){return Math.min(i.maxSamples,E.samples)}function je(E){const M=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ut(E){const M=o.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function de(E,M){const O=E.colorSpace,Y=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==cn&&O!==In&&(Xe.getTransfer(O)===et?(Y!==pn||Q!==an)&&Se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Re("WebGLTextures: Unsupported texture color space:",O)),M}function vt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=V,this.getTextureUnits=H,this.setTextureUnits=D,this.setTexture2D=Z,this.setTexture2DArray=ee,this.setTexture3D=he,this.setTextureCube=be,this.rebindTextures=pt,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Yx(r,e){function t(n,i=In){let s;const o=Xe.getTransfer(i);if(n===an)return r.UNSIGNED_BYTE;if(n===kc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===zc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Cu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ru)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Eu)return r.BYTE;if(n===Au)return r.SHORT;if(n===js)return r.UNSIGNED_SHORT;if(n===Bc)return r.INT;if(n===Bn)return r.UNSIGNED_INT;if(n===fn)return r.FLOAT;if(n===Jt)return r.HALF_FLOAT;if(n===Pu)return r.ALPHA;if(n===Iu)return r.RGB;if(n===pn)return r.RGBA;if(n===Qn)return r.DEPTH_COMPONENT;if(n===wi)return r.DEPTH_STENCIL;if(n===Gc)return r.RED;if(n===Vc)return r.RED_INTEGER;if(n===Ai)return r.RG;if(n===Hc)return r.RG_INTEGER;if(n===Wc)return r.RGBA_INTEGER;if(n===Yr||n===Kr||n===jr||n===Zr)if(o===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Yr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Yr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fa||n===Oa||n===Ba||n===ka)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Fa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ka)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===Ga||n===Va||n===Ha||n===Wa||n===so||n===Xa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===za||n===Ga)return o===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Va)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ha)return s.COMPRESSED_R11_EAC;if(n===Wa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===so)return s.COMPRESSED_RG11_EAC;if(n===Xa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qa||n===$a||n===Ya||n===Ka||n===ja||n===Za||n===Ja||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===qa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$a)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ka)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ja)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ec)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tc)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nc)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ic)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sc)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rc)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oc||n===ac||n===cc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===oc)return o===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ac)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lc||n===hc||n===ro||n===uc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===lc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===hc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ro)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const Kx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Zx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new qu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new zt({vertexShader:Kx,fragmentShader:jx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new se(new Un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jx extends pi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const _=typeof XRWebGLBinding<"u",p=new Zx,g={},v=t.getContextAttributes();let b=null,y=null;const A=[],w=[],C=new ue;let x=null;const T=new jt;T.viewport=new st;const I=new jt;I.viewport=new st;const P=[T,I],L=new Xm;let V=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ge=A[j];return ge===void 0&&(ge=new Oo,A[j]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(j){let ge=A[j];return ge===void 0&&(ge=new Oo,A[j]=ge),ge.getGripSpace()},this.getHand=function(j){let ge=A[j];return ge===void 0&&(ge=new Oo,A[j]=ge),ge.getHandSpace()};function D(j){const ge=w.indexOf(j.inputSource);if(ge===-1)return;const re=A[ge];re!==void 0&&(re.update(j.inputSource,j.frame,l||o),re.dispatchEvent({type:j.type,data:j.inputSource}))}function k(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",B);for(let j=0;j<A.length;j++){const ge=w[j];ge!==null&&(w[j]=null,A[j].disconnect(ge))}V=null,H=null,p.reset();for(const j in g)delete g[j];e.setRenderTarget(b),f=null,d=null,u=null,i=null,y=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&Se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",k),i.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Pe=null,Fe=null;v.depth&&(Fe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=v.stencil?wi:Qn,Pe=v.stencil?Zs:Bn);const Ie={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ie),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Zt(d.textureWidth,d.textureHeight,{format:pn,type:an,depthTexture:new ls(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Zt(f.framebufferWidth,f.framebufferHeight,{format:pn,type:an,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Ue.setContext(i),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function B(j){for(let ge=0;ge<j.removed.length;ge++){const re=j.removed[ge],Pe=w.indexOf(re);Pe>=0&&(w[Pe]=null,A[Pe].disconnect(re))}for(let ge=0;ge<j.added.length;ge++){const re=j.added[ge];let Pe=w.indexOf(re);if(Pe===-1){for(let Ie=0;Ie<A.length;Ie++)if(Ie>=w.length){w.push(re),Pe=Ie;break}else if(w[Ie]===null){w[Ie]=re,Pe=Ie;break}if(Pe===-1)break}const Fe=A[Pe];Fe&&Fe.connect(re)}}const Z=new R,ee=new R;function he(j,ge,re){Z.setFromMatrixPosition(ge.matrixWorld),ee.setFromMatrixPosition(re.matrixWorld);const Pe=Z.distanceTo(ee),Fe=ge.projectionMatrix.elements,Ie=re.projectionMatrix.elements,gt=Fe[14]/(Fe[10]-1),Ke=Fe[14]/(Fe[10]+1),rt=(Fe[9]+1)/Fe[5],pt=(Fe[9]-1)/Fe[5],$e=(Fe[8]-1)/Fe[0],Rt=(Ie[8]+1)/Ie[0],_t=gt*$e,nn=gt*Rt,U=Pe/(-$e+Rt),Pt=U*-$e;if(ge.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Pt),j.translateZ(U),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Fe[10]===-1)j.projectionMatrix.copy(ge.projectionMatrix),j.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{const je=gt+U,ut=Ke+U,de=_t-Pt,vt=nn+(Pe-Pt),E=rt*Ke/ut*je,M=pt*Ke/ut*je;j.projectionMatrix.makePerspective(de,vt,E,M,je,ut),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function be(j,ge){ge===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ge.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let ge=j.near,re=j.far;p.texture!==null&&(p.depthNear>0&&(ge=p.depthNear),p.depthFar>0&&(re=p.depthFar)),L.near=I.near=T.near=ge,L.far=I.far=T.far=re,(V!==L.near||H!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),V=L.near,H=L.far),L.layers.mask=j.layers.mask|6,T.layers.mask=L.layers.mask&-5,I.layers.mask=L.layers.mask&-3;const Pe=j.parent,Fe=L.cameras;be(L,Pe);for(let Ie=0;Ie<Fe.length;Ie++)be(Fe[Ie],Pe);Fe.length===2?he(L,T,I):L.projectionMatrix.copy(T.projectionMatrix),ce(j,L,Pe)};function ce(j,ge,re){re===null?j.matrix.copy(ge.matrixWorld):(j.matrix.copy(re.matrixWorld),j.matrix.invert(),j.matrix.multiply(ge.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ge.projectionMatrix),j.projectionMatrixInverse.copy(ge.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=cs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(j){return g[j]};let Ne=null;function Je(j,ge){if(h=ge.getViewerPose(l||o),m=ge,h!==null){const re=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Pe=!1;re.length!==L.cameras.length&&(L.cameras.length=0,Pe=!0);for(let Ke=0;Ke<re.length;Ke++){const rt=re[Ke];let pt=null;if(f!==null)pt=f.getViewport(rt);else{const Rt=u.getViewSubImage(d,rt);pt=Rt.viewport,Ke===0&&(e.setRenderTargetTextures(y,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(y))}let $e=P[Ke];$e===void 0&&($e=new jt,$e.layers.enable(Ke),$e.viewport=new st,P[Ke]=$e),$e.matrix.fromArray(rt.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(rt.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(pt.x,pt.y,pt.width,pt.height),Ke===0&&(L.matrix.copy($e.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Pe===!0&&L.cameras.push($e)}const Fe=i.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const Ke=u.getDepthInformation(re[0]);Ke&&Ke.isValid&&Ke.texture&&p.init(Ke,i.renderState)}if(Fe&&Fe.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let Ke=0;Ke<re.length;Ke++){const rt=re[Ke].camera;if(rt){let pt=g[rt];pt||(pt=new qu,g[rt]=pt);const $e=u.getCameraImage(rt);pt.sourceTexture=$e}}}}for(let re=0;re<A.length;re++){const Pe=w[re],Fe=A[re];Pe!==null&&Fe!==void 0&&Fe.update(Pe,ge,l||o)}Ne&&Ne(j,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),m=null}const Ue=new nd;Ue.setAnimationLoop(Je),this.setAnimationLoop=function(j){Ne=j},this.dispose=function(){}}}const Qx=new Le,ld=new Be;ld.set(-1,0,0,0,1,0,0,0,1);function ey(r,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Ku(r)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,b,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),u(p,g)):g.isMeshPhongMaterial?(s(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,y)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),_(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,v,b):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Xt&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Xt&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const v=e.get(g),b=v.envMap,y=v.envMapRotation;b&&(p.envMap.value=b,p.envMapRotation.value.setFromMatrix4(Qx.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(ld),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,v,b){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=b*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,v){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Xt&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){const v=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ty(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,b){const y=b.program;n.uniformBlockBinding(v,y)}function l(v,b){let y=i[v.id];y===void 0&&(m(v),y=h(v),i[v.id]=y,v.addEventListener("dispose",p));const A=b.program;n.updateUBOMapping(v,A);const w=e.render.frame;s[v.id]!==w&&(d(v),s[v.id]=w)}function h(v){const b=u();v.__bindingPointIndex=b;const y=r.createBuffer(),A=v.__size,w=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,A,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,y),y}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Re("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const b=i[v.id],y=v.uniforms,A=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let w=0,C=y.length;w<C;w++){const x=Array.isArray(y[w])?y[w]:[y[w]];for(let T=0,I=x.length;T<I;T++){const P=x[T];if(f(P,w,T,A)===!0){const L=P.__offset,V=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let D=0;D<V.length;D++){const k=V[D],B=_(k);typeof k=="number"||typeof k=="boolean"?(P.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,L+H,P.__data)):k.isMatrix3?(P.__data[0]=k.elements[0],P.__data[1]=k.elements[1],P.__data[2]=k.elements[2],P.__data[3]=0,P.__data[4]=k.elements[3],P.__data[5]=k.elements[4],P.__data[6]=k.elements[5],P.__data[7]=0,P.__data[8]=k.elements[6],P.__data[9]=k.elements[7],P.__data[10]=k.elements[8],P.__data[11]=0):ArrayBuffer.isView(k)?P.__data.set(new k.constructor(k.buffer,k.byteOffset,P.__data.length)):(k.toArray(P.__data,H),H+=B.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,b,y,A){const w=v.value,C=b+"_"+y;if(A[C]===void 0)return typeof w=="number"||typeof w=="boolean"?A[C]=w:ArrayBuffer.isView(w)?A[C]=w.slice():A[C]=w.clone(),!0;{const x=A[C];if(typeof w=="number"||typeof w=="boolean"){if(x!==w)return A[C]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(x.equals(w)===!1)return x.copy(w),!0}}return!1}function m(v){const b=v.uniforms;let y=0;const A=16;for(let C=0,x=b.length;C<x;C++){const T=Array.isArray(b[C])?b[C]:[b[C]];for(let I=0,P=T.length;I<P;I++){const L=T[I],V=Array.isArray(L.value)?L.value:[L.value];for(let H=0,D=V.length;H<D;H++){const k=V[H],B=_(k),Z=y%A,ee=Z%B.boundary,he=Z+ee;y+=ee,he!==0&&A-he<B.storage&&(y+=A-he),L.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=B.storage}}}const w=y%A;return w>0&&(y+=A-w),v.__size=y,v.__cache={},this}function _(v){const b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?Se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Se("WebGLRenderer: Unsupported uniform value type.",v),b}function p(v){const b=v.target;b.removeEventListener("dispose",p);const y=o.indexOf(b.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function g(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:c,update:l,dispose:g}}const ny=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function iy(){return An===null&&(An=new Zc(ny,16,16,Ai,Jt),An.name="DFG_LUT",An.minFilter=Nt,An.magFilter=Nt,An.wrapS=Ln,An.wrapT=Ln,An.generateMipmaps=!1,An.needsUpdate=!0),An}class sy{constructor(e={}){const{canvas:t=dp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=an}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const _=f,p=new Set([Wc,Hc,Vc]),g=new Set([an,Bn,js,Zs,kc,zc]),v=new Uint32Array(4),b=new Int32Array(4),y=new R;let A=null,w=null;const C=[],x=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let P=!1,L=null;this._outputColorSpace=yt;let V=0,H=0,D=null,k=-1,B=null;const Z=new st,ee=new st;let he=null;const be=new Ae(0);let ce=0,Ne=t.width,Je=t.height,Ue=1,j=null,ge=null;const re=new st(0,0,Ne,Je),Pe=new st(0,0,Ne,Je);let Fe=!1;const Ie=new Qc;let gt=!1,Ke=!1;const rt=new Le,pt=new R,$e=new st,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function nn(){return D===null?Ue:1}let U=n;function Pt(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ic}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",ke,!1),U===null){const F="webgl2";if(U=Pt(F,S),U===null)throw Pt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Re("WebGLRenderer: "+S.message),S}let je,ut,de,vt,E,M,O,Y,Q,te,le,q,K,_e,ye,oe,ne,De,Ge,Qe,N,ie,$;function ve(){je=new iv(U),je.init(),N=new Yx(U,je),ut=new K_(U,je,e,N),de=new qx(U,je),ut.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),vt=new ov(U),E=new Lx,M=new $x(U,je,de,E,ut,N,vt),O=new nv(I),Y=new hg(U),ie=new $_(U,Y),Q=new sv(U,Y,vt,ie),te=new cv(U,Q,Y,ie,vt),De=new av(U,ut,M),ye=new j_(E),le=new Ix(I,O,je,ut,ie,ye),q=new ey(I,E),K=new Nx,_e=new zx(je),ne=new q_(I,O,de,te,m,c),oe=new Xx(I,te,ut),$=new ty(U,vt,ut,de),Ge=new Y_(U,je,vt),Qe=new rv(U,je,vt),vt.programs=le.programs,I.capabilities=ut,I.extensions=je,I.properties=E,I.renderLists=K,I.shadowMap=oe,I.state=de,I.info=vt}ve(),_!==an&&(T=new hv(_,t.width,t.height,i,s));const ae=new Jx(I,U);this.xr=ae,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Ue},this.setPixelRatio=function(S){S!==void 0&&(Ue=S,this.setSize(Ne,Je,!1))},this.getSize=function(S){return S.set(Ne,Je)},this.setSize=function(S,F,W=!0){if(ae.isPresenting){Se("WebGLRenderer: Can't change size while VR device is presenting.");return}Ne=S,Je=F,t.width=Math.floor(S*Ue),t.height=Math.floor(F*Ue),W===!0&&(t.style.width=S+"px",t.style.height=F+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(Ne*Ue,Je*Ue).floor()},this.setDrawingBufferSize=function(S,F,W){Ne=S,Je=F,Ue=W,t.width=Math.floor(S*W),t.height=Math.floor(F*W),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(_===an){Re("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Se("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Z)},this.getViewport=function(S){return S.copy(re)},this.setViewport=function(S,F,W,z){S.isVector4?re.set(S.x,S.y,S.z,S.w):re.set(S,F,W,z),de.viewport(Z.copy(re).multiplyScalar(Ue).round())},this.getScissor=function(S){return S.copy(Pe)},this.setScissor=function(S,F,W,z){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,F,W,z),de.scissor(ee.copy(Pe).multiplyScalar(Ue).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(S){de.setScissorTest(Fe=S)},this.setOpaqueSort=function(S){j=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,W=!0){let z=0;if(S){let G=!1;if(D!==null){const me=D.texture.format;G=p.has(me)}if(G){const me=D.texture.type,Me=g.has(me),pe=ne.getClearColor(),we=ne.getClearAlpha(),Ee=pe.r,ze=pe.g,He=pe.b;Me?(v[0]=Ee,v[1]=ze,v[2]=He,v[3]=we,U.clearBufferuiv(U.COLOR,0,v)):(b[0]=Ee,b[1]=ze,b[2]=He,b[3]=we,U.clearBufferiv(U.COLOR,0,b))}else z|=U.COLOR_BUFFER_BIT}F&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),L=S},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),ne.dispose(),K.dispose(),_e.dispose(),E.dispose(),O.dispose(),te.dispose(),ie.dispose(),$.dispose(),le.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",pl),ae.removeEventListener("sessionend",ml),gi.stop()};function J(S){S.preventDefault(),co("WebGLRenderer: Context Lost."),P=!0}function Te(){co("WebGLRenderer: Context Restored."),P=!1;const S=vt.autoReset,F=oe.enabled,W=oe.autoUpdate,z=oe.needsUpdate,G=oe.type;ve(),vt.autoReset=S,oe.enabled=F,oe.autoUpdate=W,oe.needsUpdate=z,oe.type=G}function ke(S){Re("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function bt(S){const F=S.target;F.removeEventListener("dispose",bt),ot(F)}function ot(S){Gn(S),E.remove(S)}function Gn(S){const F=E.get(S).programs;F!==void 0&&(F.forEach(function(W){le.releaseProgram(W)}),S.isShaderMaterial&&le.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,W,z,G,me){F===null&&(F=Rt);const Me=G.isMesh&&G.matrixWorld.determinant()<0,pe=Sd(S,F,W,z,G);de.setMaterial(z,Me);let we=W.index,Ee=1;if(z.wireframe===!0){if(we=Q.getWireframeAttribute(W),we===void 0)return;Ee=2}const ze=W.drawRange,He=W.attributes.position;let Ce=ze.start*Ee,at=(ze.start+ze.count)*Ee;me!==null&&(Ce=Math.max(Ce,me.start*Ee),at=Math.min(at,(me.start+me.count)*Ee)),we!==null?(Ce=Math.max(Ce,0),at=Math.min(at,we.count)):He!=null&&(Ce=Math.max(Ce,0),at=Math.min(at,He.count));const St=at-Ce;if(St<0||St===1/0)return;ie.setup(G,z,pe,W,we);let xt,ct=Ge;if(we!==null&&(xt=Y.get(we),ct=Qe,ct.setIndex(xt)),G.isMesh)z.wireframe===!0?(de.setLineWidth(z.wireframeLinewidth*nn()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(G.isLine){let Vt=z.linewidth;Vt===void 0&&(Vt=1),de.setLineWidth(Vt*nn()),G.isLineSegments?ct.setMode(U.LINES):G.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else G.isPoints?ct.setMode(U.POINTS):G.isSprite&&ct.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(je.get("WEBGL_multi_draw"))ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Vt=G._multiDrawStarts,xe=G._multiDrawCounts,sn=G._multiDrawCount,Ze=we?Y.get(we).bytesPerElement:1,ln=E.get(z).currentProgram.getUniforms();for(let Tn=0;Tn<sn;Tn++)ln.setValue(U,"_gl_DrawID",Tn),ct.render(Vt[Tn]/Ze,xe[Tn])}else if(G.isInstancedMesh)ct.renderInstances(Ce,St,G.count);else if(W.isInstancedBufferGeometry){const Vt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,xe=Math.min(W.instanceCount,Vt);ct.renderInstances(Ce,St,xe)}else ct.render(Ce,St)};function wn(S,F,W){S.transparent===!0&&S.side===Lt&&S.forceSinglePass===!1?(S.side=Xt,S.needsUpdate=!0,dr(S,F,W),S.side=Jn,S.needsUpdate=!0,dr(S,F,W),S.side=Lt):dr(S,F,W)}this.compile=function(S,F,W=null){W===null&&(W=S),w=_e.get(W),w.init(F),x.push(w),W.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),S!==W&&S.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),w.setupLights();const z=new Set;return S.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const me=G.material;if(me)if(Array.isArray(me))for(let Me=0;Me<me.length;Me++){const pe=me[Me];wn(pe,W,G),z.add(pe)}else wn(me,W,G),z.add(me)}),w=x.pop(),z},this.compileAsync=function(S,F,W=null){const z=this.compile(S,F,W);return new Promise(G=>{function me(){if(z.forEach(function(Me){E.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){G(S);return}setTimeout(me,10)}je.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let So=null;function Md(S){So&&So(S)}function pl(){gi.stop()}function ml(){gi.start()}const gi=new nd;gi.setAnimationLoop(Md),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(S){So=S,ae.setAnimationLoop(S),S===null?gi.stop():gi.start()},ae.addEventListener("sessionstart",pl),ae.addEventListener("sessionend",ml),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){Re("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(S,F);const W=ae.enabled===!0&&ae.isPresenting===!0,z=T!==null&&(D===null||W)&&T.begin(I,D);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,F,D),w=_e.get(S,x.length),w.init(F),w.state.textureUnits=M.getTextureUnits(),x.push(w),rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ie.setFromProjectionMatrix(rt,Nn,F.reversedDepth),Ke=this.localClippingEnabled,gt=ye.init(this.clippingPlanes,Ke),A=K.get(S,C.length),A.init(),C.push(A),ae.enabled===!0&&ae.isPresenting===!0){const Me=I.xr.getDepthSensingMesh();Me!==null&&wo(Me,F,-1/0,I.sortObjects)}wo(S,F,0,I.sortObjects),A.finish(),I.sortObjects===!0&&A.sort(j,ge),_t=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,_t&&ne.addToRenderList(A,S),this.info.render.frame++,gt===!0&&ye.beginShadows();const G=w.state.shadowsArray;if(oe.render(G,S,F),gt===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&T.hasRenderPass())===!1){const Me=A.opaque,pe=A.transmissive;if(w.setupLights(),F.isArrayCamera){const we=F.cameras;if(pe.length>0)for(let Ee=0,ze=we.length;Ee<ze;Ee++){const He=we[Ee];_l(Me,pe,S,He)}_t&&ne.render(S);for(let Ee=0,ze=we.length;Ee<ze;Ee++){const He=we[Ee];gl(A,S,He,He.viewport)}}else pe.length>0&&_l(Me,pe,S,F),_t&&ne.render(S),gl(A,S,F)}D!==null&&H===0&&(M.updateMultisampleRenderTarget(D),M.updateRenderTargetMipmap(D)),z&&T.end(I),S.isScene===!0&&S.onAfterRender(I,S,F),ie.resetDefaultState(),k=-1,B=null,x.pop(),x.length>0?(w=x[x.length-1],M.setTextureUnits(w.state.textureUnits),gt===!0&&ye.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?A=C[C.length-1]:A=null,L!==null&&L.renderEnd()};function wo(S,F,W,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ie.intersectsSprite(S)){z&&$e.setFromMatrixPosition(S.matrixWorld).applyMatrix4(rt);const Me=te.update(S),pe=S.material;pe.visible&&A.push(S,Me,pe,W,$e.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ie.intersectsObject(S))){const Me=te.update(S),pe=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),$e.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),$e.copy(Me.boundingSphere.center)),$e.applyMatrix4(S.matrixWorld).applyMatrix4(rt)),Array.isArray(pe)){const we=Me.groups;for(let Ee=0,ze=we.length;Ee<ze;Ee++){const He=we[Ee],Ce=pe[He.materialIndex];Ce&&Ce.visible&&A.push(S,Me,Ce,W,$e.z,He)}}else pe.visible&&A.push(S,Me,pe,W,$e.z,null)}}const me=S.children;for(let Me=0,pe=me.length;Me<pe;Me++)wo(me[Me],F,W,z)}function gl(S,F,W,z){const{opaque:G,transmissive:me,transparent:Me}=S;w.setupLightsView(W),gt===!0&&ye.setGlobalState(I.clippingPlanes,W),z&&de.viewport(Z.copy(z)),G.length>0&&ur(G,F,W),me.length>0&&ur(me,F,W),Me.length>0&&ur(Me,F,W),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function _l(S,F,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){const Ce=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new Zt(1,1,{generateMipmaps:!0,type:Ce?Jt:an,minFilter:Dn,samples:Math.max(4,ut.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}const me=w.state.transmissionRenderTarget[z.id],Me=z.viewport||Z;me.setSize(Me.z*I.transmissionResolutionScale,Me.w*I.transmissionResolutionScale);const pe=I.getRenderTarget(),we=I.getActiveCubeFace(),Ee=I.getActiveMipmapLevel();I.setRenderTarget(me),I.getClearColor(be),ce=I.getClearAlpha(),ce<1&&I.setClearColor(16777215,.5),I.clear(),_t&&ne.render(W);const ze=I.toneMapping;I.toneMapping=On;const He=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),gt===!0&&ye.setGlobalState(I.clippingPlanes,z),ur(S,W,z),M.updateMultisampleRenderTarget(me),M.updateRenderTargetMipmap(me),je.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let at=0,St=F.length;at<St;at++){const xt=F[at],{object:ct,geometry:Vt,material:xe,group:sn}=xt;if(xe.side===Lt&&ct.layers.test(z.layers)){const Ze=xe.side;xe.side=Xt,xe.needsUpdate=!0,vl(ct,W,z,Vt,xe,sn),xe.side=Ze,xe.needsUpdate=!0,Ce=!0}}Ce===!0&&(M.updateMultisampleRenderTarget(me),M.updateRenderTargetMipmap(me))}I.setRenderTarget(pe,we,Ee),I.setClearColor(be,ce),He!==void 0&&(z.viewport=He),I.toneMapping=ze}function ur(S,F,W){const z=F.isScene===!0?F.overrideMaterial:null;for(let G=0,me=S.length;G<me;G++){const Me=S[G],{object:pe,geometry:we,group:Ee}=Me;let ze=Me.material;ze.allowOverride===!0&&z!==null&&(ze=z),pe.layers.test(W.layers)&&vl(pe,F,W,we,ze,Ee)}}function vl(S,F,W,z,G,me){S.onBeforeRender(I,F,W,z,G,me),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),G.onBeforeRender(I,F,W,z,S,me),G.transparent===!0&&G.side===Lt&&G.forceSinglePass===!1?(G.side=Xt,G.needsUpdate=!0,I.renderBufferDirect(W,F,z,G,S,me),G.side=Jn,G.needsUpdate=!0,I.renderBufferDirect(W,F,z,G,S,me),G.side=Lt):I.renderBufferDirect(W,F,z,G,S,me),S.onAfterRender(I,F,W,z,G,me)}function dr(S,F,W){F.isScene!==!0&&(F=Rt);const z=E.get(S),G=w.state.lights,me=w.state.shadowsArray,Me=G.state.version,pe=le.getParameters(S,G.state,me,F,W,w.state.lightProbeGridArray),we=le.getProgramCacheKey(pe);let Ee=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const ze=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=O.get(S.envMap||z.environment,ze),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ee===void 0&&(S.addEventListener("dispose",bt),Ee=new Map,z.programs=Ee);let He=Ee.get(we);if(He!==void 0){if(z.currentProgram===He&&z.lightsStateVersion===Me)return yl(S,pe),He}else pe.uniforms=le.getUniforms(S),L!==null&&S.isNodeMaterial&&L.build(S,W,pe),S.onBeforeCompile(pe,I),He=le.acquireProgram(pe,we),Ee.set(we,He),z.uniforms=pe.uniforms;const Ce=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ce.clippingPlanes=ye.uniform),yl(S,pe),z.needsLights=Td(S),z.lightsStateVersion=Me,z.needsLights&&(Ce.ambientLightColor.value=G.state.ambient,Ce.lightProbe.value=G.state.probe,Ce.directionalLights.value=G.state.directional,Ce.directionalLightShadows.value=G.state.directionalShadow,Ce.spotLights.value=G.state.spot,Ce.spotLightShadows.value=G.state.spotShadow,Ce.rectAreaLights.value=G.state.rectArea,Ce.ltc_1.value=G.state.rectAreaLTC1,Ce.ltc_2.value=G.state.rectAreaLTC2,Ce.pointLights.value=G.state.point,Ce.pointLightShadows.value=G.state.pointShadow,Ce.hemisphereLights.value=G.state.hemi,Ce.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ce.spotLightMatrix.value=G.state.spotLightMatrix,Ce.spotLightMap.value=G.state.spotLightMap,Ce.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=w.state.lightProbeGridArray.length>0,z.currentProgram=He,z.uniformsList=null,He}function xl(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=Jr.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function yl(S,F){const W=E.get(S);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function bd(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let W=0,z=S.length;W<z;W++){const G=S[W];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function Sd(S,F,W,z,G){F.isScene!==!0&&(F=Rt),M.resetTextureUnits();const me=F.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,pe=D===null?I.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Xe.workingColorSpace,we=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ee=O.get(z.envMap||Me,we),ze=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,He=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ce=!!W.morphAttributes.position,at=!!W.morphAttributes.normal,St=!!W.morphAttributes.color;let xt=On;z.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(xt=I.toneMapping);const ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Vt=ct!==void 0?ct.length:0,xe=E.get(z),sn=w.state.lights;if(gt===!0&&(Ke===!0||S!==B)){const dt=S===B&&z.id===k;ye.setState(z,S,dt)}let Ze=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==sn.state.version||xe.outputColorSpace!==pe||G.isBatchedMesh&&xe.batching===!1||!G.isBatchedMesh&&xe.batching===!0||G.isBatchedMesh&&xe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&xe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&xe.instancing===!1||!G.isInstancedMesh&&xe.instancing===!0||G.isSkinnedMesh&&xe.skinning===!1||!G.isSkinnedMesh&&xe.skinning===!0||G.isInstancedMesh&&xe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xe.instancingMorph===!1&&G.morphTexture!==null||xe.envMap!==Ee||z.fog===!0&&xe.fog!==me||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==ye.numPlanes||xe.numIntersection!==ye.numIntersection)||xe.vertexAlphas!==ze||xe.vertexTangents!==He||xe.morphTargets!==Ce||xe.morphNormals!==at||xe.morphColors!==St||xe.toneMapping!==xt||xe.morphTargetsCount!==Vt||!!xe.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,xe.__version=z.version);let ln=xe.currentProgram;Ze===!0&&(ln=dr(z,F,G),L&&z.isNodeMaterial&&L.onUpdateProgram(z,ln,xe));let Tn=!1,ni=!1,Pi=!1;const lt=ln.getUniforms(),wt=xe.uniforms;if(de.useProgram(ln.program)&&(Tn=!0,ni=!0,Pi=!0),z.id!==k&&(k=z.id,ni=!0),xe.needsLights){const dt=bd(w.state.lightProbeGridArray,G);xe.lightProbeGrid!==dt&&(xe.lightProbeGrid=dt,ni=!0)}if(Tn||B!==S){de.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),lt.setValue(U,"projectionMatrix",S.projectionMatrix),lt.setValue(U,"viewMatrix",S.matrixWorldInverse);const si=lt.map.cameraPosition;si!==void 0&&si.setValue(U,pt.setFromMatrixPosition(S.matrixWorld)),ut.logarithmicDepthBuffer&&lt.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&lt.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),B!==S&&(B=S,ni=!0,Pi=!0)}if(xe.needsLights&&(sn.state.directionalShadowMap.length>0&&lt.setValue(U,"directionalShadowMap",sn.state.directionalShadowMap,M),sn.state.spotShadowMap.length>0&&lt.setValue(U,"spotShadowMap",sn.state.spotShadowMap,M),sn.state.pointShadowMap.length>0&&lt.setValue(U,"pointShadowMap",sn.state.pointShadowMap,M)),G.isSkinnedMesh){lt.setOptional(U,G,"bindMatrix"),lt.setOptional(U,G,"bindMatrixInverse");const dt=G.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),lt.setValue(U,"boneTexture",dt.boneTexture,M))}G.isBatchedMesh&&(lt.setOptional(U,G,"batchingTexture"),lt.setValue(U,"batchingTexture",G._matricesTexture,M),lt.setOptional(U,G,"batchingIdTexture"),lt.setValue(U,"batchingIdTexture",G._indirectTexture,M),lt.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&lt.setValue(U,"batchingColorTexture",G._colorsTexture,M));const ii=W.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&De.update(G,W,ln),(ni||xe.receiveShadow!==G.receiveShadow)&&(xe.receiveShadow=G.receiveShadow,lt.setValue(U,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(wt.envMapIntensity.value=F.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=iy()),ni){if(lt.setValue(U,"toneMappingExposure",I.toneMappingExposure),xe.needsLights&&wd(wt,Pi),me&&z.fog===!0&&q.refreshFogUniforms(wt,me),q.refreshMaterialUniforms(wt,z,Ue,Je,w.state.transmissionRenderTarget[S.id]),xe.needsLights&&xe.lightProbeGrid){const dt=xe.lightProbeGrid;wt.probesSH.value=dt.texture,wt.probesMin.value.copy(dt.boundingBox.min),wt.probesMax.value.copy(dt.boundingBox.max),wt.probesResolution.value.copy(dt.resolution)}Jr.upload(U,xl(xe),wt,M)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Jr.upload(U,xl(xe),wt,M),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&lt.setValue(U,"center",G.center),lt.setValue(U,"modelViewMatrix",G.modelViewMatrix),lt.setValue(U,"normalMatrix",G.normalMatrix),lt.setValue(U,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const dt=z.uniformsGroups;for(let si=0,Ii=dt.length;si<Ii;si++){const Ml=dt[si];$.update(Ml,ln),$.bind(Ml,ln)}}return ln}function wd(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Td(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(S,F,W){const z=E.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),E.get(S.texture).__webglTexture=F,E.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const W=E.get(S);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0};const Ed=U.createFramebuffer();this.setRenderTarget=function(S,F=0,W=0){D=S,V=F,H=W;let z=null,G=!1,me=!1;if(S){const pe=E.get(S);if(pe.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(U.FRAMEBUFFER,pe.__webglFramebuffer),Z.copy(S.viewport),ee.copy(S.scissor),he=S.scissorTest,de.viewport(Z),de.scissor(ee),de.setScissorTest(he),k=-1;return}else if(pe.__webglFramebuffer===void 0)M.setupRenderTarget(S);else if(pe.__hasExternalTextures)M.rebindTextures(S,E.get(S.texture).__webglTexture,E.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ze=S.depthTexture;if(pe.__boundDepthTexture!==ze){if(ze!==null&&E.has(ze)&&(S.width!==ze.image.width||S.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(S)}}const we=S.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(me=!0);const Ee=E.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ee[F])?z=Ee[F][W]:z=Ee[F],G=!0):S.samples>0&&M.useMultisampledRTT(S)===!1?z=E.get(S).__webglMultisampledFramebuffer:Array.isArray(Ee)?z=Ee[W]:z=Ee,Z.copy(S.viewport),ee.copy(S.scissor),he=S.scissorTest}else Z.copy(re).multiplyScalar(Ue).floor(),ee.copy(Pe).multiplyScalar(Ue).floor(),he=Fe;if(W!==0&&(z=Ed),de.bindFramebuffer(U.FRAMEBUFFER,z)&&de.drawBuffers(S,z),de.viewport(Z),de.scissor(ee),de.setScissorTest(he),G){const pe=E.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,pe.__webglTexture,W)}else if(me){const pe=F;for(let we=0;we<S.textures.length;we++){const Ee=E.get(S.textures[we]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+we,Ee.__webglTexture,W,pe)}}else if(S!==null&&W!==0){const pe=E.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pe.__webglTexture,W)}k=-1},this.readRenderTargetPixels=function(S,F,W,z,G,me,Me,pe=0){if(!(S&&S.isWebGLRenderTarget)){Re("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=E.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we){de.bindFramebuffer(U.FRAMEBUFFER,we);try{const Ee=S.textures[pe],ze=Ee.format,He=Ee.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pe),!ut.textureFormatReadable(ze)){Re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(He)){Re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&W>=0&&W<=S.height-G&&U.readPixels(F,W,z,G,N.convert(ze),N.convert(He),me)}finally{const Ee=D!==null?E.get(D).__webglFramebuffer:null;de.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,F,W,z,G,me,Me,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=E.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we)if(F>=0&&F<=S.width-z&&W>=0&&W<=S.height-G){de.bindFramebuffer(U.FRAMEBUFFER,we);const Ee=S.textures[pe],ze=Ee.format,He=Ee.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pe),!ut.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ce),U.bufferData(U.PIXEL_PACK_BUFFER,me.byteLength,U.STREAM_READ),U.readPixels(F,W,z,G,N.convert(ze),N.convert(He),0);const at=D!==null?E.get(D).__webglFramebuffer:null;de.bindFramebuffer(U.FRAMEBUFFER,at);const St=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await fp(U,St,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ce),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,me),U.deleteBuffer(Ce),U.deleteSync(St),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,W=0){const z=Math.pow(2,-W),G=Math.floor(S.image.width*z),me=Math.floor(S.image.height*z),Me=F!==null?F.x:0,pe=F!==null?F.y:0;M.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,Me,pe,G,me),de.unbindTexture()};const Ad=U.createFramebuffer(),Cd=U.createFramebuffer();this.copyTextureToTexture=function(S,F,W=null,z=null,G=0,me=0){let Me,pe,we,Ee,ze,He,Ce,at,St;const xt=S.isCompressedTexture?S.mipmaps[me]:S.image;if(W!==null)Me=W.max.x-W.min.x,pe=W.max.y-W.min.y,we=W.isBox3?W.max.z-W.min.z:1,Ee=W.min.x,ze=W.min.y,He=W.isBox3?W.min.z:0;else{const wt=Math.pow(2,-G);Me=Math.floor(xt.width*wt),pe=Math.floor(xt.height*wt),S.isDataArrayTexture?we=xt.depth:S.isData3DTexture?we=Math.floor(xt.depth*wt):we=1,Ee=0,ze=0,He=0}z!==null?(Ce=z.x,at=z.y,St=z.z):(Ce=0,at=0,St=0);const ct=N.convert(F.format),Vt=N.convert(F.type);let xe;F.isData3DTexture?(M.setTexture3D(F,0),xe=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(M.setTexture2DArray(F,0),xe=U.TEXTURE_2D_ARRAY):(M.setTexture2D(F,0),xe=U.TEXTURE_2D),de.activeTexture(U.TEXTURE0),de.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),de.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),de.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const sn=de.getParameter(U.UNPACK_ROW_LENGTH),Ze=de.getParameter(U.UNPACK_IMAGE_HEIGHT),ln=de.getParameter(U.UNPACK_SKIP_PIXELS),Tn=de.getParameter(U.UNPACK_SKIP_ROWS),ni=de.getParameter(U.UNPACK_SKIP_IMAGES);de.pixelStorei(U.UNPACK_ROW_LENGTH,xt.width),de.pixelStorei(U.UNPACK_IMAGE_HEIGHT,xt.height),de.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),de.pixelStorei(U.UNPACK_SKIP_ROWS,ze),de.pixelStorei(U.UNPACK_SKIP_IMAGES,He);const Pi=S.isDataArrayTexture||S.isData3DTexture,lt=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const wt=E.get(S),ii=E.get(F),dt=E.get(wt.__renderTarget),si=E.get(ii.__renderTarget);de.bindFramebuffer(U.READ_FRAMEBUFFER,dt.__webglFramebuffer),de.bindFramebuffer(U.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let Ii=0;Ii<we;Ii++)Pi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,E.get(S).__webglTexture,G,He+Ii),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,E.get(F).__webglTexture,me,St+Ii)),U.blitFramebuffer(Ee,ze,Me,pe,Ce,at,Me,pe,U.DEPTH_BUFFER_BIT,U.NEAREST);de.bindFramebuffer(U.READ_FRAMEBUFFER,null),de.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||S.isRenderTargetTexture||E.has(S)){const wt=E.get(S),ii=E.get(F);de.bindFramebuffer(U.READ_FRAMEBUFFER,Ad),de.bindFramebuffer(U.DRAW_FRAMEBUFFER,Cd);for(let dt=0;dt<we;dt++)Pi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.__webglTexture,G,He+dt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,wt.__webglTexture,G),lt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ii.__webglTexture,me,St+dt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ii.__webglTexture,me),G!==0?U.blitFramebuffer(Ee,ze,Me,pe,Ce,at,Me,pe,U.COLOR_BUFFER_BIT,U.NEAREST):lt?U.copyTexSubImage3D(xe,me,Ce,at,St+dt,Ee,ze,Me,pe):U.copyTexSubImage2D(xe,me,Ce,at,Ee,ze,Me,pe);de.bindFramebuffer(U.READ_FRAMEBUFFER,null),de.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else lt?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(xe,me,Ce,at,St,Me,pe,we,ct,Vt,xt.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(xe,me,Ce,at,St,Me,pe,we,ct,xt.data):U.texSubImage3D(xe,me,Ce,at,St,Me,pe,we,ct,Vt,xt):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,me,Ce,at,Me,pe,ct,Vt,xt.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,me,Ce,at,xt.width,xt.height,ct,xt.data):U.texSubImage2D(U.TEXTURE_2D,me,Ce,at,Me,pe,ct,Vt,xt);de.pixelStorei(U.UNPACK_ROW_LENGTH,sn),de.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ze),de.pixelStorei(U.UNPACK_SKIP_PIXELS,ln),de.pixelStorei(U.UNPACK_SKIP_ROWS,Tn),de.pixelStorei(U.UNPACK_SKIP_IMAGES,ni),me===0&&F.generateMipmaps&&U.generateMipmap(xe),de.unbindTexture()},this.initRenderTarget=function(S){E.get(S).__webglFramebuffer===void 0&&M.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?M.setTextureCube(S,0):S.isData3DTexture?M.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?M.setTexture2DArray(S,0):M.setTexture2D(S,0),de.unbindTexture()},this.resetState=function(){V=0,H=0,D=null,de.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}const Qr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ss{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ry=new lr(-1,1,1,-1,0,1);class oy extends mt{constructor(){super(),this.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ye([0,2,0,0,2,0],2))}}const ay=new oy;class cl{constructor(e){this._mesh=new se(ay,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ry)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class cy extends Ss{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof zt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=us.clone(e.uniforms),this.material=new zt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new cl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class jh extends Ss{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class ly extends Ss{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class hy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ue);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cy(Qr),this.copyPass.material.blending=Fn,this.timer=new qm}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}jh!==void 0&&(o instanceof jh?n=!0:o instanceof ly&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class uy extends Ss{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ae}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const dy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ae(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class gs extends Ss{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ue(e.x,e.y):new ue(256,256),this.clearColor=new Ae(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(s,o,{type:Jt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new Zt(s,o,{type:Jt});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new Zt(s,o,{type:Jt});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),o=Math.round(o/2)}const a=dy;this.highPassUniforms=us.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new zt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ue(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=us.clone(Qr.uniforms),this.blendMaterial=new zt({uniforms:this.copyUniforms,vertexShader:Qr.vertexShader,fragmentShader:Qr.fragmentShader,premultipliedAlpha:!0,blending:no,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ae,this._oldClearAlpha=1,this._basic=new kt,this._fsQuad=new cl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ue(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=gs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=gs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new zt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ue(.5,.5)},direction:{value:new ue(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new zt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}gs.BlurDirectionX=new ue(1,0);gs.BlurDirectionY=new ue(0,1);const Wr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class fy extends Ss{constructor(){super(),this.isOutputPass=!0,this.uniforms=us.clone(Wr.uniforms),this.material=new ju({name:Wr.name,uniforms:this.uniforms,vertexShader:Wr.vertexShader,fragmentShader:Wr.fragmentShader}),this._fsQuad=new cl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===et&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Lc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Dc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Nc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===mo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Fc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Oc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Uc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Mo extends se{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const n=this,i=t.color!==void 0?new Ae(t.color):new Ae(8355711),s=t.textureWidth||512,o=t.textureHeight||512,a=t.clipBias||0,c=t.shader||Mo.ReflectorShader,l=t.multisample!==void 0?t.multisample:4,h=new di,u=new R,d=new R,f=new R,m=new Le,_=new R(0,0,-1),p=new st,g=new R,v=new R,b=new st,y=new Le,A=new Zt(s,o,{samples:l,type:Jt}),w=new zt({name:c.name!==void 0?c.name:"unspecified",uniforms:us.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});w.uniforms.tDiffuse.value=A.texture,w.uniforms.color.value=i,w.uniforms.textureMatrix.value=y,this.material=w,this.onBeforeRender=function(C,x,T){const I=this._getReflectionCamera(T);if(d.setFromMatrixPosition(n.matrixWorld),f.setFromMatrixPosition(T.matrixWorld),m.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(m),g.subVectors(d,f),g.dot(u)>0===!0&&this.forceUpdate===!1)return;g.reflect(u).negate(),g.add(d),m.extractRotation(T.matrixWorld),_.set(0,0,-1),_.applyMatrix4(m),_.add(f),v.subVectors(d,_),v.reflect(u).negate(),v.add(d),I.position.copy(g),I.up.set(0,1,0),I.up.applyMatrix4(m),I.up.reflect(u),I.lookAt(v),I.far=T.far,I.updateMatrixWorld(),I.projectionMatrix.copy(T.projectionMatrix),y.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),y.multiply(I.projectionMatrix),y.multiply(I.matrixWorldInverse),y.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,d),h.applyMatrix4(I.matrixWorldInverse),p.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const L=I.projectionMatrix;I.isOrthographicCamera?(b.x=(Math.sign(p.x)+L.elements[8])/L.elements[0],b.y=(Math.sign(p.y)+L.elements[9])/L.elements[5],b.z=-T.far,b.w=1):(b.x=(Math.sign(p.x)+L.elements[8])/L.elements[0],b.y=(Math.sign(p.y)+L.elements[9])/L.elements[5],b.z=-1,b.w=(1+L.elements[10])/L.elements[14]),p.multiplyScalar(2/p.dot(b)),L.elements[2]=p.x,L.elements[6]=p.y,I.isOrthographicCamera?(L.elements[10]=p.z-a,L.elements[14]=p.w-1):(L.elements[10]=p.z+1-a,L.elements[14]=p.w),n.visible=!1;const V=C.getRenderTarget(),H=C.xr.enabled,D=C.shadowMap.autoUpdate;C.xr.enabled=!1,C.shadowMap.autoUpdate=!1,C.setRenderTarget(A),C.state.buffers.depth.setMask(!0),C.autoClear===!1&&C.clear(),C.render(x,I),C.xr.enabled=H,C.shadowMap.autoUpdate=D,C.setRenderTarget(V);const k=T.viewport;k!==void 0&&C.state.viewport(k),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),n.material.dispose()},this._getReflectionCamera=function(C){let x=this._reflectionCameras.get(C);return x===void 0&&(x=C.clone(),this._reflectionCameras.set(C,x)),x}}}Mo.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function Zh(r,e){if(e===tp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===dc||e===Du){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===dc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function py(r){const e=new Map,t=new Map,n=r.clone();return hd(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function hd(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)hd(r.children[n],e.children[n],t)}class my extends Ms{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new yy(t)}),this.register(function(t){return new My(t)}),this.register(function(t){return new Py(t)}),this.register(function(t){return new Iy(t)}),this.register(function(t){return new Ly(t)}),this.register(function(t){return new Sy(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new Ty(t)}),this.register(function(t){return new Ey(t)}),this.register(function(t){return new xy(t)}),this.register(function(t){return new Ay(t)}),this.register(function(t){return new by(t)}),this.register(function(t){return new Ry(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new _y(t)}),this.register(function(t){return new Jh(t,qe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Jh(t,qe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Dy(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Ks.extractUrlBase(e);o=Ks.resolveURL(l,this.path)}else o=Ks.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new ed(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===ud){try{o[qe.KHR_BINARY_GLTF]=new Ny(e)}catch(u){i&&i(u);return}s=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new $y(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:o[u]=new vy;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new Uy(s,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[u]=new Fy;break;case qe.KHR_MESH_QUANTIZATION:o[u]=new Oy;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function gy(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function Et(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class _y{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ae(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],cn);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new yc(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ms(h),l.distance=u;break;case"spot":l=new rl(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Rn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class vy{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return kt}extendParams(e,t,n){const i=[];e.color=new Ae(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],cn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(i)}}class xy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class yy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(s,s)}return Promise.all(i)}}class My{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class by{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Sy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],cn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,yt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class wy{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class Ty{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(s[0],s[1],s[2],cn),Promise.all(i)}}class Ey{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Ay{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(s[0],s[1],s[2],cn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,yt)),Promise.all(i)}}class Cy{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Ry{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Et(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){const n=Et(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Py{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Iy{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class Ly{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class Jh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class Dy{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==un.TRIANGLES&&l.mode!==un.TRIANGLE_STRIP&&l.mode!==un.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const m of u){const _=new Le,p=new R,g=new Qt,v=new R(1,1,1),b=new Vu(m.geometry,m.material,d);for(let y=0;y<d;y++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,y),c.SCALE&&v.fromBufferAttribute(c.SCALE,y),b.setMatrixAt(y,_.compose(p,g,v));for(const y in c)if(y==="_COLOR_0"){const A=c[y];b.instanceColor=new gc(A.array,A.itemSize,A.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,c[y]);ft.prototype.copy.call(b,m),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const ud="glTF",Os=12,Qh={JSON:1313821514,BIN:5130562};class Ny{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Os),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ud)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Os,s=new DataView(e,Os);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===Qh.JSON){const l=new Uint8Array(e,Os+o,a);this.content=n.decode(l)}else if(c===Qh.BIN){const l=Os+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Uy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=wc[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=wc[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=rs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const _=f.attributes[m],p=c[m];p!==void 0&&(_.normalized=p)}u(f)},a,l,cn,d)})})}}class Fy{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Oy{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class dd extends vs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*l,_=m-l,p=-2*f+3*d,g=f-d,v=1-p,b=g-d+u;for(let y=0;y!==a;y++){const A=o[_+y+a],w=o[_+y+c]*h,C=o[m+y+a],x=o[m+y]*h;s[y]=v*A+b*w+p*C+g*x}return s}}const By=new Qt;class ky extends dd{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return By.fromArray(s).normalize().toArray(s),s}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},rs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},eu={9728:Dt,9729:Nt,9984:Tu,9985:$r,9986:ks,9987:Dn},tu={33071:Ln,33648:io,10497:Ei},ma={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},wc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},zy={CUBICSPLINE:void 0,LINEAR:Qs,STEP:Js},ga={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Gy(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new nt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Jn})),r.DefaultMaterial}function Mi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Rn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Vy(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function Hy(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Wy(r){let e;const t=r.extensions&&r.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+_a(t.attributes):e=r.indices+":"+_a(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+_a(r.targets[n]);return e}function _a(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Tc(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Xy(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const qy=new Le;class $y{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Om(this.options.manager):this.textureLoader=new Hm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ed(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Mi(s,a,i),Rn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ks.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ma[i.type],a=rs[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Mt(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=ma[i.type],l=rs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let _,p;if(f&&f!==u){const g=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let b=t.cache.get(v);b||(_=new l(a,g*f,i.count*f/h),b=new ku(_,f/h),t.cache.add(v,b)),p=new nr(b,c,d%f/h,m)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),p=new Mt(_,c,m);if(i.sparse!==void 0){const g=ma.SCALAR,v=rs[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,A=new v(o[1],b,i.sparse.count*g),w=new l(o[2],y,i.sparse.count*c);a!==null&&(p=new Mt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let C=0,x=A.length;C<x;C++){const T=A[C];if(p.setX(T,w[C*c]),c>=2&&p.setY(T,w[C*c+1]),c>=3&&p.setZ(T,w[C*c+2]),c>=4&&p.setW(T,w[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=eu[d.magFilter]||Nt,h.minFilter=eu[d.minFilter]||Dn,h.wrapS=tu[d.wrapS]||Ei,h.wrapT=tu[d.wrapT]||Ei,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Dt&&h.minFilter!==Nt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const p=new Ut(_);p.needsUpdate=!0,d(p)}),t.load(Ks.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Rn(u,o),u.userData.mimeType=o.mimeType||Xy(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new tl,bn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Hu,bn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return nt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){const u=i[qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new Ae(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],cn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,yt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Lt);const h=s.alphaMode||ga.OPAQUE;if(h===ga.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ga.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==kt&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new ue(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==kt&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==kt){const u=s.emissiveFactor;a.emissive=new Ae().setRGB(u[0],u[1],u[2],cn)}return s.emissiveTexture!==void 0&&o!==kt&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,yt)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Rn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Mi(i,u,s),u})}createUniqueName(e){const t=tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return nu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=Wy(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=nu(new mt,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?Gy(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const _=h[f],p=o[f];let g;const v=l[f];if(p.mode===un.TRIANGLES||p.mode===un.TRIANGLE_STRIP||p.mode===un.TRIANGLE_FAN||p.mode===void 0)g=s.isSkinnedMesh===!0?new Zp(_,v):new se(_,v),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),p.mode===un.TRIANGLE_STRIP?g.geometry=Zh(g.geometry,Du):p.mode===un.TRIANGLE_FAN&&(g.geometry=Zh(g.geometry,dc));else if(p.mode===un.LINES)g=new im(_,v);else if(p.mode===un.LINE_STRIP)g=new el(_,v);else if(p.mode===un.LINE_LOOP)g=new sm(_,v);else if(p.mode===un.POINTS)g=new Wu(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&Hy(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),Rn(g,s),p.extensions&&Mi(i,g,p),t.assignFinalMaterial(g),u.push(g)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Mi(i,u[0],s),u[0];const d=new ht;s.extensions&&Mi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(Xs.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new lr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Rn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Le;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Jc(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],_=f.target,p=_.node,g=i.parameters!==void 0?i.parameters[m.input]:m.input,v=i.parameters!==void 0?i.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",v)),l.push(m),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],_=u[3],p=u[4],g=[];for(let b=0,y=d.length;b<y;b++){const A=d[b],w=f[b],C=m[b],x=_[b],T=p[b];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const I=n._createAnimationTracks(A,w,C,x,T);if(I)for(let P=0;P<I.length;P++)g.push(I[P])}const v=new xc(s,void 0,g);return Rn(v,i),v})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,qy)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){const f=h.userData.pivot,m=u[0];h.pivot=new R().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new Gu:l.length>1?h=new ht:l.length===1?h=l[0]:h=new ft,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Rn(h,s),s.extensions&&Mi(n,h,s),s.matrix!==void 0){const u=new Le;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new ht;n.name&&(s.name=i.createUniqueName(n.name)),Rn(s,n),n.extensions&&Mi(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++){const d=c[h];d.parent!==null?s.add(py(d)):s.add(d)}const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof bn||d instanceof Ut)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}ui[s.path]===ui.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(ui[s.path]){case ui.weights:h=ds;break;case ui.rotation:h=fs;break;case ui.translation:case ui.scale:h=ps;break;default:switch(n.itemSize){case 1:h=ds;break;case 2:case 3:default:h=ps;break}break}const u=i.interpolation!==void 0?zy[i.interpolation]:Qs,d=this._getArrayFromAccessor(n);for(let f=0,m=c.length;f<m;f++){const _=new h(c[f]+"."+ui[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Tc(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof fs?ky:dd;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Yy(r,e,t){const n=e.attributes,i=new kn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),a.normalized){const h=Tc(rs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new R,c=new R;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=Tc(rs[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new zn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function nu(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=wc[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Xe.workingColorSpace!==cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),Rn(r,e),Yy(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Vy(r,e.targets,t):r})}const fd=new my,va=new Map;let xa=null;async function pd(){return xa||(xa=fetch("./models/manifest.json").then(r=>r.ok?r.json():null).catch(()=>null)),xa}function md(r){return r.startsWith("http")?r:`./${r.replace(/^\//,"")}`}async function gd(r){try{return(await fetch(r,{method:"HEAD"})).ok}catch{return!1}}function _d(r,e,t=1){const n=new kn().setFromObject(r);if(n.isEmpty())return;const i=n.getSize(new R),s=n.getCenter(new R),o=Math.max(i.x,i.y,i.z,.001),a=e/o*t;r.scale.setScalar(a),r.position.sub(s.multiplyScalar(a)),r.position.y+=i.y*a/2}function Ky(r,e){const t=new Set(e.map(i=>i.toLowerCase()));let n=null;return r.traverse(i=>{var a;if(n)return;const s=i;if(!s.isMesh)return;const o=s.name.toLowerCase();(t.has(o)||t.has(((a=i.parent)==null?void 0:a.name.toLowerCase())??""))&&(n=s)}),n}function vd(r){r.traverse(e=>{const t=e;if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n)i&&"color"in i&&i instanceof nt&&(i.envMapIntensity=1)})}async function jy(r,e,t){var i,s;const n=md(r);if(!await gd(n))return null;try{if(!va.has(n)){const a=(await fd.loadAsync(n)).scene,c=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??6;_d(a,c,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),vd(a),va.set(n,a)}return va.get(n).clone(!0)}catch{return null}}async function Zy(r,e,t){var i,s;const n=md(r);if(!await gd(n))return null;try{const o=await fd.loadAsync(n),a=o.scene,c=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??1.9;return _d(a,c,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),vd(a),{group:a,clips:o.animations??[]}}catch{return null}}function bo(r,e){return new gn({color:r,emissive:r,emissiveIntensity:e,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:Lt})}function en(r,e=.82){return new nt({color:r,roughness:e,metalness:.08})}function Jy(r){return new nt({color:r?7268279:6000111,emissive:r?3462041:3900150,emissiveIntensity:r?.55:.28,roughness:.25,metalness:.35,transparent:!0,opacity:.85})}function Qy(){return new gn({color:1993370,roughness:.08,metalness:.15,transparent:!0,opacity:.72,reflectivity:.9,clearcoat:1,clearcoatRoughness:.12})}function iu(r=1){const e=new ht,t=new se(new tn(.14*r,.26*r,1.7*r,10),en(4863784,.95));t.position.y=.85*r,t.castShadow=!0,e.add(t);const n=[2976335,3504728,2580548,3836514],i=[[0,2.5,0,1.05],[.55,2.25,.2,.72],[-.5,2.3,-.25,.7],[.15,2.95,-.1,.78],[-.2,2.7,.45,.6]];for(const[s,o,a,c]of i){const l=new nt({color:n[Math.floor(Math.random()*n.length)],roughness:.82,metalness:.02,flatShading:!0}),h=new se(new ar(c*r,1),l);h.position.set(s*r,o*r,a*r),h.castShadow=!0,e.add(h)}return e}function su(r=1){const e=new ht,t=new se(new tn(.12*r,.2*r,1.2*r,10),en(4009506,.9));t.position.y=.6*r,t.castShadow=!0;for(let n=0;n<5;n++){const i=new se(new rr((1.15-n*.17)*r,1*r,9),new nt({color:1786674+n*131842,roughness:.72,flatShading:!0}));i.position.y=(1.3+n*.62)*r,i.rotation.y=n*.4,i.castShadow=!0,e.add(i)}return e.add(t),e}function eM(){const r=new Un(.09,.5,1,3);r.translate(0,.25,0);const e=r.clone();e.rotateY(Math.PI/2);const t=tM([r,e]),n=t.attributes.position,i=new Float32Array(n.count*3);for(let s=0;s<n.count;s++){const o=Xs.clamp(n.getY(s)/.5,0,1);i[s*3]=.16+o*.22,i[s*3+1]=.3+o*.4,i[s*3+2]=.14+o*.16}return t.setAttribute("color",new Mt(i,3)),t}function tM(r){const e=new mt;let t=0,n=0;for(const h of r)t+=h.attributes.position.count,n+=h.index?h.index.count:h.attributes.position.count;const i=new Float32Array(t*3),s=new Float32Array(t*3),o=new Float32Array(t*2),a=new Uint32Array(n);let c=0,l=0;for(const h of r){const u=h.attributes.position,d=h.attributes.normal,f=h.attributes.uv;i.set(u.array,c*3),d&&s.set(d.array,c*3),f&&o.set(f.array,c*2);const m=h.index;if(m)for(let _=0;_<m.count;_++)a[l++]=m.getX(_)+c;else for(let _=0;_<u.count;_++)a[l++]=_+c;c+=u.count}return e.setAttribute("position",new Mt(i,3)),e.setAttribute("normal",new Mt(s,3)),e.setAttribute("uv",new Mt(o,2)),e.setIndex(new Mt(a,1)),e}function ya(r=1){const e=new se(new _o(.55*r,1),en(6054768,.88));return e.castShadow=!0,e.receiveShadow=!0,e}function xd(r){const e=new ht,t=new se(new tn(.06,.08,1.4,8),en(3621201,.6));t.position.y=.7;const n=new se(new It(.35,.45,.35),bo(r,.5));n.position.y=1.55;const i=new ms(r,.8,6);return i.position.y=1.55,e.add(t,n,i),e}const ru={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function hr(r){return ru[r]??ru.plains}function yd(r,e,t){const n=new se(new tn(.35,.55,1.6,16),en(6045747,.75));n.position.y=1.1,n.castShadow=!0;const i=new se(new mi(1.1,.14,10,24,Math.PI),en(4876097,.7));i.rotation.z=Math.PI,i.position.y=2.2;const s=new se(new ar(.95,1),t);return s.position.y=3.5,s.castShadow=!0,r.add(n,i,s),s}function nM(r,e,t){const n=new se(new It(2.2,.2,1.4),en(7035466,.65));n.position.set(0,.55,.4);const i=new se(new tn(.45,.6,2.8,16),en(13358561,.45));i.position.y=1.8,i.castShadow=!0;const s=new se(new vo(.75,1),t);s.position.y=3.6;const o=new ms(e.crystal,1.2,10);return o.position.y=3.6,r.add(n,i,s,o),s}function iM(r,e,t){const n=new se(new It(2.6,.5,2.2),en(10265519,.35));n.position.y=.55;const i=new se(new rr(1.8,1.2,4),new nt({color:e.primary,roughness:.4,metalness:.2}));i.position.y=1.4,i.rotation.y=Math.PI/4;const s=new se(new tn(.12,.15,2.2,12),en(13751771,.3));s.position.set(-.9,1.3,0);const o=s.clone();o.position.x=.9;const a=new se(new il(.55,.16,64,12),t);return a.position.y=3.2,r.add(n,i,s,o,a),a}function sM(r,e,t){const n=new se(new It(2.4,.15,1.8),en(9136404,.7));n.position.y=.55;const i=new se(new tn(0,1.6,.9,4),new nt({color:e.secondary,roughness:.55,side:Lt}));i.position.y=1.8,i.rotation.y=Math.PI/4;const s=new se(new _o(.8,0),t);s.position.y=3.1;const o=xd(e.accent);return o.position.set(1.1,0,.6),r.add(n,i,s,o),s}function rM(r,e,t){const n=new se(new It(3,.25,2.4),en(10322313,.55));n.position.y=.5;const i=new se(new tn(.25,.4,3.2,8),en(12887477,.4));i.position.y=2.1,i.castShadow=!0;const s=new se(new mi(1.3,.06,8,40),new nt({color:e.accent,emissive:e.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));s.rotation.x=Math.PI/2,s.position.y=3.8;const o=new se(new vo(.9,2),t);return o.position.y=4.5,r.add(n,i,s,o),o}const oM={forest:yd,coast:nM,library:iM,market:sM,temple:rM};function aM(r,e){const t=hr(r.theme),n=new ht,i=r.unlocked,s=i?1:.45,o=new se(new tn(2.4,2.8,.35,24),new nt({color:t.ground,roughness:.55,metalness:.12,transparent:!i,opacity:s}));o.position.y=.18,o.receiveShadow=!0;const a=new se(new mi(2.1,.08,12,48),new nt({color:t.secondary,emissive:t.accent,emissiveIntensity:i?.35:.08,roughness:.3,metalness:.55,transparent:!i,opacity:s}));a.rotation.x=Math.PI/2,a.position.y=.38,n.add(o,a);const c=bo(i?t.crystal:7041664,r.cleared?.85:i?.55:.12),l=(oM[r.theme]??yd)(n,t,c);if(l.userData.isCrystal=!0,e){const h=new se(new Ri(2.3,2.55,48),new kt({color:16498468,transparent:!0,opacity:.55,side:Lt}));h.rotation.x=-Math.PI/2,h.position.y=.42,h.userData.isPulse=!0,n.add(h);const u=new rl(16774358,i?2.2:.4,18,Math.PI/5,.4);u.position.set(0,8,2),u.target.position.set(0,2,0),n.add(u,u.target)}if(r.cleared){const h=new se(new mn(3.2,24,24),new kt({color:t.accent,transparent:!0,opacity:.07,depthWrite:!1}));h.position.y=2,n.add(h)}if(r.dueCount&&r.dueCount>0&&i){const h=new se(new Ri(2.65,2.9,48),new kt({color:16498468,transparent:!0,opacity:.42,side:Lt}));h.rotation.x=-Math.PI/2,h.position.y=.5,h.userData.isDueRing=!0,n.add(h)}return n}let Ma=null;async function cM(){return Ma||(Ma=await pd()),Ma}function lM(r,e){const t=hr(e.theme),n=e.unlocked,i=n?1:.45,s=new se(new tn(2.4,2.8,.35,24),new nt({color:t.ground,roughness:.55,metalness:.12,transparent:!n,opacity:i}));s.position.y=.18,s.receiveShadow=!0;const o=new se(new mi(2.1,.08,12,48),new nt({color:t.secondary,emissive:t.accent,emissiveIntensity:n?.35:.08,roughness:.3,metalness:.55,transparent:!n,opacity:i}));o.rotation.x=Math.PI/2,o.position.y=.38,r.add(s,o)}function hM(r,e,t,n,i){if(t){const s=new se(new Ri(2.3,2.55,48),new kt({color:16498468,transparent:!0,opacity:.55,side:Lt}));s.rotation.x=-Math.PI/2,s.position.y=.42,s.userData.isPulse=!0,r.add(s);const o=new rl(16774358,n?2.2:.4,18,Math.PI/5,.4);o.position.set(0,8,2),o.target.position.set(0,2,0),r.add(o,o.target)}if(e.cleared){const s=new se(new mn(3.2,24,24),new kt({color:i.accent,transparent:!0,opacity:.07,depthWrite:!1}));s.position.y=2,r.add(s)}if(e.dueCount&&e.dueCount>0&&n){const s=new se(new Ri(2.65,2.9,48),new kt({color:16498468,transparent:!0,opacity:.42,side:Lt}));s.rotation.x=-Math.PI/2,s.position.y=.5,s.userData.isDueRing=!0,r.add(s)}}function ou(r,e){const t=hr(r.theme),n=new se(new ar(.85,1),bo(r.unlocked?t.crystal:7041664,.65));return n.position.y=3.6,n.castShadow=!0,n.userData.isCrystal=!0,e.add(n),n}function uM(r){let e=null;return r.traverse(t=>{var i;if(e)return;const n=t;(i=n.userData)!=null&&i.isCrystal&&(e=n)}),e}async function dM(r,e){var a,c,l;const t=await cM(),n=hr(r.theme),i=t?((a=t.nodes)==null?void 0:a[r.id])??((c=t.themes)==null?void 0:c[r.theme])??null:null;if(t&&i){const h=await jy(i.file,i,t);if(h){const u=new ht;lM(u,r),h.position.y=.35,u.add(h);const d=i.pickMeshNames??((l=t.defaults)==null?void 0:l.pickMeshNames)??["Crystal","PICK"];let f=Ky(h,d);return f?f.userData.isCrystal=!0:f=ou(r,u),hM(u,r,e,r.unlocked,n),{root:u,crystal:f}}}const s=aM(r,e),o=uM(s)??ou(r,s);return{root:s,crystal:o}}function au(r,e,t){const n=new ht,i=.4,s=.38,o=.14,a=.115,c=new se(new Ci(o,i,5,10),r);c.position.y=-.24200000000000002,c.castShadow=!0,n.add(c);const l=new ht;l.position.y=-.42800000000000005,n.add(l);const h=new se(new Ci(a,s,5,10),e);h.position.y=-.2245,h.castShadow=!0,l.add(h);const u=new se(new It(.18,.1,.36),t);return u.position.set(0,-.426,.08),u.castShadow=!0,l.add(u),{hip:n,knee:l}}function cu(r,e,t){const n=new ht,i=new se(new Ci(t.upperR,t.upperLen,5,10),r);i.position.y=-(t.upperLen/2+t.upperR),i.castShadow=!0,n.add(i);const s=-(t.upperLen+t.upperR*2),o=new se(new Ci(t.lowerR,t.lowerLen,5,10),e);o.position.y=s-(t.lowerLen/2+t.lowerR),o.castShadow=!0,n.add(o);const a=s-(t.lowerLen+t.lowerR*2);if(t.footMat){const c=new se(new It(t.lowerR*2.1,.1,.34),t.footMat);c.position.set(0,a+.04,.08),c.castShadow=!0,n.add(c)}else if(t.endMat&&t.endR){const c=new se(new mn(t.endR,12,10),t.endMat);c.position.y=a,c.castShadow=!0,n.add(c)}return n}function fM(){const r=new ht;r.name="Explorer";const e=new nt({color:3100538,roughness:.62,metalness:.08}),t=new nt({color:2765632,roughness:.78,metalness:.04}),n=new nt({color:15713440,roughness:.66,metalness:.02}),i=new nt({color:1713456,roughness:.7,metalness:.06}),s=new nt({color:2759958,roughness:.8,metalness:.02}),o=new nt({color:6000111,roughness:.4,metalness:.3,emissive:1784440,emissiveIntensity:.4}),a=new se(new It(.46,.26,.3),t);a.position.y=.98,a.castShadow=!0,r.add(a);const c=new se(new Ci(.3,.4,6,14),e);c.position.y=1.32,c.scale.set(1.12,1,.78),c.castShadow=!0,r.add(c);const l=new se(new mi(.26,.04,8,20),o);l.position.y=1.52,l.rotation.x=Math.PI/2,l.scale.set(1.05,.7,1),r.add(l);const h=new se(new It(.5,.08,.34),o);h.position.y=1.1,r.add(h);const u=new se(new It(.4,.5,.22),e);u.position.set(0,1.34,-.32),u.castShadow=!0;const d=new se(new It(.42,.12,.24),o);d.position.set(0,1.5,-.32),r.add(u,d);const f=new ht;f.position.y=1.6;const m=new se(new tn(.1,.12,.14,10),n);m.position.y=.04;const _=new se(new mn(.23,22,22),n);_.position.y=.28,_.castShadow=!0;const p=new se(new mn(.245,18,14,0,Math.PI*2,0,Math.PI*.62),s);p.position.y=.31,f.add(m,_,p);const g=new nt({color:1450028,roughness:.3,metalness:.1}),v=new mn(.035,10,10),b=new se(v,g);b.position.set(.085,.3,.205);const y=new se(v,g);y.position.set(-.085,.3,.205);const A=new nt({color:2759958,roughness:.8}),w=new se(new It(.26,.03,.04),A);w.position.set(0,.37,.2);const C=new nt({color:8011824,roughness:.6}),x=new se(new It(.11,.022,.03),C);x.position.set(0,.2,.216),f.add(b,y,w,x),r.add(f);const T=new ht;T.position.set(0,1.52,-.16);const I=new nt({color:3894230,roughness:.6,metalness:.1,side:Lt,emissive:1320798,emissiveIntensity:.25}),P=new se(new Un(.66,.95,1,5),I);P.position.y=-.45,P.castShadow=!0,T.add(P),T.rotation.x=-.18,r.add(T);const L=au(t,t,i);L.hip.position.set(.16,.88,0);const V=au(t,t,i);V.hip.position.set(-.16,.88,0),r.add(L.hip,V.hip);const H=cu(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});H.position.set(.42,1.5,0);const D=cu(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});D.position.set(-.42,1.5,0),r.add(H,D);const k=new se(new mn(.12,14,14),bo(16498468,.9));k.position.set(-.5,1,.12);const B=new ms(16498468,1.2,10);B.position.copy(k.position),r.add(k,B);const Z=new se(new Ri(.55,.74,36),new kt({color:9684477,transparent:!0,opacity:.32,side:Lt}));Z.rotation.x=-Math.PI/2,Z.position.y=.03,Z.userData.isFootRing=!0,r.add(Z);const ee={leftLeg:L,rightLeg:V,leftArm:H,rightArm:D,head:f,cape:T,eyeL:b,eyeR:y,brow:w,mouth:x,mats:{jacket:e,trim:o,cape:I}};return r.userData.rig=ee,r}class pM{constructor(){X(this,"yaw",0);X(this,"pitch",.28);X(this,"targetPos",new R);X(this,"desiredPos",new R);X(this,"isDragging",!1);X(this,"lastX",0);X(this,"downX",0)}addYaw(e){this.yaw+=e}resetBehind(e){this.yaw=e}update(e,t,n,i){this.isDragging||(this.yaw+=(n-this.yaw)*Math.min(1,i*2.5));const s=Math.cos(this.yaw),o=Math.sin(this.yaw),a=jd,c=Zd+Math.sin(this.pitch)*3;return this.desiredPos.set(t.x-o*a,t.y+c,t.z-s*a),e.position.lerp(this.desiredPos,1-Math.exp(-5*i)),this.targetPos.set(t.x,t.y+1.55,t.z),e.lookAt(this.targetPos),this.yaw}bindDrag(e){const t=s=>{this.downX=s.clientX,this.lastX=s.clientX,this.isDragging=!1},n=s=>{const o=s.clientX-this.lastX;this.lastX=s.clientX,!this.isDragging&&Math.abs(s.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-o*.006)},i=()=>{this.isDragging=!1};e.addEventListener("pointerdown",t),e.addEventListener("pointermove",n),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}}const mM=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class gM{constructor(){X(this,"position",new R);X(this,"yaw",0);X(this,"moveTarget",null);X(this,"keys",new Set);X(this,"stick",{x:0,z:0});X(this,"enabled",!0);X(this,"sprint",!1);X(this,"onKeyDown",e=>{if(!this.enabled)return;const t=e.key.toLowerCase();mM.has(t)&&this.keys.add(t),t==="shift"&&(this.sprint=!0)});X(this,"onKeyUp",e=>{const t=e.key.toLowerCase();this.keys.delete(t),t==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(e){this.enabled=e,e||(this.keys.clear(),this.moveTarget=null)}setPosition(e,t,n){this.position.set(e,t,n),this.moveTarget=null}setMoveTarget(e,t){this.moveTarget=new R(e,0,t)}clearMoveTarget(){this.moveTarget=null}setStickInput(e,t){this.stick.x=e,this.stick.z=t,(Math.abs(e)>.12||Math.abs(t)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(e,t){if(!this.enabled)return;let n=0,i=0;if(this.moveTarget){const s=new R().subVectors(this.moveTarget,this.position);s.y=0,s.length()<.45?this.moveTarget=null:(s.normalize(),n=s.x,i=s.z,this.yaw=Math.atan2(n,i))}else{let s=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),o=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(s=this.stick.z,o=this.stick.x),s!==0||o!==0){const a=Math.sin(t),c=Math.cos(t);n=o*c+s*a,i=o*-a+s*c;const l=Math.hypot(n,i)||1;n/=l,i/=l,this.yaw=Math.atan2(n,i)}}if(n!==0||i!==0){const s=Kd*(this.sprint?1.85:1)*e;this.position.x+=n*s,this.position.z+=i*s}this.position.y=Gt(this.position.x,this.position.z,Tt)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function _M(r,e){const t=document.createElement("canvas");t.width=512,t.height=128;const n=t.getContext("2d");n.fillStyle=e?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",lu(n,8,8,496,112,20),n.fill(),n.strokeStyle=e?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",n.lineWidth=3,lu(n,8,8,496,112,20),n.stroke(),n.fillStyle=e?"#f3f4f6":"#9ca3af",n.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const i=r.length>22?r.slice(0,21)+"…":r;n.fillText(i,24,72);const s=new qs(t);s.colorSpace=yt;const o=new ts({map:s,transparent:!0,depthWrite:!1}),a=new zs(o);return a.scale.set(10,2.5,1),a.position.y=7.2,a.userData.isSignpost=!0,a}function lu(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.lineTo(e+n-s,t),r.quadraticCurveTo(e+n,t,e+n,t+s),r.lineTo(e+n,t+i-s),r.quadraticCurveTo(e+n,t+i,e+n-s,t+i),r.lineTo(e+s,t+i),r.quadraticCurveTo(e,t+i,e,t+i-s),r.lineTo(e,t+s),r.quadraticCurveTo(e,t,e+s,t),r.closePath()}const vM={unit01:{id:"unit01",label:"数字时代",skyTop:265758,skyMid:795204,skyBot:529968,fogColor:925752,fogDensity:.003,sunColor:5286655,sunIntensity:1,hemiSky:2121904,hemiGround:530472,ambientColor:1593504,terrainTint:[.04,.14,.28],crystalColor:4237567,orbColor:54527,glowColor:35071,pathColor:1073328,decorStyle:"coast"},unit02:{id:"unit02",label:"传记人物",skyTop:919556,skyMid:3151882,skyBot:1707526,fogColor:2626568,fogDensity:.0028,sunColor:16763984,sunIntensity:1.5,hemiSky:13664304,hemiGround:2627588,ambientColor:8405024,terrainTint:[.22,.12,.04],crystalColor:16755200,orbColor:16765024,glowColor:16758816,pathColor:10510368,decorStyle:"market"},unit03:{id:"unit03",label:"旅行探索",skyTop:398864,skyMid:1194020,skyBot:663576,fogColor:1058840,fogDensity:.0038,sunColor:9502640,sunIntensity:1.2,hemiSky:4243552,hemiGround:531472,ambientColor:1721384,terrainTint:[.06,.22,.1],crystalColor:4251744,orbColor:6356864,glowColor:2150480,pathColor:1732656,decorStyle:"forest"},unit04:{id:"unit04",label:"劳动传统",skyTop:919556,skyMid:2888712,skyBot:1575940,fogColor:2232324,fogDensity:.0032,sunColor:16746544,sunIntensity:1.4,hemiSky:12601368,hemiGround:2100228,ambientColor:6299664,terrainTint:[.28,.12,.04],crystalColor:16738328,orbColor:16748608,glowColor:16732176,pathColor:9453592,decorStyle:"temple"},unit05:{id:"unit05",label:"航天探索",skyTop:131592,skyMid:788512,skyBot:394266,fogColor:525848,fogDensity:.0025,sunColor:12615935,sunIntensity:.8,hemiSky:6297792,hemiGround:1050672,ambientColor:3673184,terrainTint:[.08,.04,.22],crystalColor:12607743,orbColor:14713087,glowColor:9449696,pathColor:5249184,decorStyle:"space"},unit06:{id:"unit06",label:"共享经济",skyTop:1050130,skyMid:2886696,skyBot:1574930,fogColor:2099224,fogDensity:.0035,sunColor:16732336,sunIntensity:1,hemiSky:13641856,hemiGround:2099218,ambientColor:5249088,terrainTint:[.18,.04,.16],crystalColor:16724128,orbColor:16736456,glowColor:14686336,pathColor:8394848,decorStyle:"temple"}},Ec={id:"default",label:"",skyTop:3824266,skyMid:5929642,skyBot:659488,fogColor:1713472,fogDensity:.0042,sunColor:16774368,sunIntensity:1.45,hemiSky:13164799,hemiGround:2373672,ambientColor:10137804,terrainTint:[.09,.2,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest"};function xM(r){return r?vM[r]??Ec:Ec}function ba(r,e=yt,t=1024){const n=document.createElement("canvas");n.width=t,n.height=t,r(n.getContext("2d"),t);const i=new qs(n);return i.wrapS=i.wrapT=Ei,i.colorSpace=e,i.generateMipmaps=!0,i.minFilter=Dn,i}function yM(){const r=Kn(20260616),e=ba((i,s)=>{const o=i.createLinearGradient(0,0,s,s);o.addColorStop(0,"#26412b"),o.addColorStop(.4,"#2f5234"),o.addColorStop(.7,"#274a30"),o.addColorStop(1,"#223d29"),i.fillStyle=o,i.fillRect(0,0,s,s);for(let a=0;a<90;a++){const c=60+r()*160,l=r()*s,h=r()*s,u=r()>.5,d=i.createRadialGradient(l,h,0,l,h,c),f=.06+r()*.1;d.addColorStop(0,u?`rgba(120,150,80,${f})`:`rgba(28,52,34,${f})`),d.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=d,i.beginPath(),i.arc(l,h,c,0,Math.PI*2),i.fill()}for(let a=0;a<28;a++){const c=r()*s,l=r()*s,h=18+r()*46,u=i.createRadialGradient(c,l,0,c,l,h);u.addColorStop(0,`rgba(86,68,44,${.18+r()*.18})`),u.addColorStop(1,"rgba(86,68,44,0)"),i.fillStyle=u,i.beginPath(),i.arc(c,l,h,0,Math.PI*2),i.fill()}for(let a=0;a<26e3;a++){const c=r()>.5,l=40+r()*70;i.fillStyle=c?`rgba(${l-10},${l+30},${l-6},${.05+r()*.1})`:`rgba(${l+50},${l+80},${l+20},${.05+r()*.12})`,i.beginPath(),i.arc(r()*s,r()*s,.5+r()*1.8,0,Math.PI*2),i.fill()}}),t=ba((i,s)=>{i.fillStyle="#9a9a9a",i.fillRect(0,0,s,s);for(let o=0;o<60;o++){const a=r()*s,c=r()*s,l=30+r()*120,h=110+r()*110,u=i.createRadialGradient(a,c,0,a,c,l);u.addColorStop(0,`rgba(${h},${h},${h},0.5)`),u.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=u,i.beginPath(),i.arc(a,c,l,0,Math.PI*2),i.fill()}for(let o=0;o<14e3;o++){const a=120+r()*100;i.fillStyle=`rgba(${a},${a},${a},0.5)`,i.fillRect(r()*s,r()*s,1.5,1.5)}},In),n=ba((i,s)=>{i.fillStyle="#8080ff",i.fillRect(0,0,s,s);for(let o=0;o<12e3;o++){const a=96+r()*64,c=96+r()*64;i.fillStyle=`rgb(${a|0},${c|0},255)`;const l=1.5+r()*2.5;i.fillRect(r()*s,r()*s,l,l)}for(let o=0;o<40;o++){const a=r()*s,c=r()*s,l=24+r()*90,h=i.createRadialGradient(a,c,0,a,c,l);h.addColorStop(0,`rgba(${100+r()*50|0},${100+r()*50|0},255,0.4)`),h.addColorStop(1,"rgba(128,128,255,0)"),i.fillStyle=h,i.beginPath(),i.arc(a,c,l,0,Math.PI*2),i.fill()}},In);return e.repeat.set(14,18),t.repeat.set(14,18),n.repeat.set(14,18),{color:e,roughness:t,normal:n}}const MM=5,bM=new R(0,1,0),SM=new R(1,0,0);class wM{constructor(e,t){X(this,"container");X(this,"renderer");X(this,"scene");X(this,"camera");X(this,"raycaster",new ag);X(this,"pointer",new ue);X(this,"nodeGroups",new Map);X(this,"pickables",[]);X(this,"explorer");X(this,"pathGroup");X(this,"decorGroup");X(this,"waterGroup");X(this,"terrain");X(this,"mountains");X(this,"skyDome");X(this,"grassMesh");X(this,"grassUniforms");X(this,"clouds");X(this,"dustGroup");X(this,"dustPool",[]);X(this,"lastStep",0);X(this,"sunDisc");X(this,"composer");X(this,"bloomPass");X(this,"walkPhase",0);X(this,"avatarYaw",0);X(this,"avatarLean",0);X(this,"expression","neutral");X(this,"blinkTimer",2);X(this,"blink",0);X(this,"usingGlb",!1);X(this,"mixer");X(this,"glbIdle");X(this,"glbWalk");X(this,"glbClips");X(this,"glbEmoting",!1);X(this,"_n",new R);X(this,"_fwd",new R);X(this,"_right",new R);X(this,"_basis",new Le);X(this,"_q",new Qt);X(this,"_leanQ",new Qt);X(this,"sun");X(this,"hemi");X(this,"ambientLight");X(this,"animId",0);X(this,"paused",!0);X(this,"clock",new cg);X(this,"nodes",[]);X(this,"currentId","");X(this,"onNodeClick");X(this,"onProximity");X(this,"onExploreUpdate");X(this,"onPickupNear");X(this,"onPickupCollect");X(this,"waterMeshes",[]);X(this,"reflectors",[]);X(this,"rebuildToken",0);X(this,"player",new gM);X(this,"explorerCam",new pM);X(this,"nearNode",null);X(this,"currentBiome",Ec);X(this,"pickupGroup");X(this,"pickupMeshes",new Map);X(this,"pickupData",[]);X(this,"nearPickup",null);X(this,"onKeyDown",e=>{this.paused||(e.key.toLowerCase()==="e"||e.key==="Enter")&&this.tryInteract()});X(this,"onPointerDown",e=>{var s;if(this.paused)return;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.pickables,!1)[0],i=n==null?void 0:n.object.userData.nodeId;if(i&&((s=this.nearNode)==null?void 0:s.id)===i&&this.nearNode.unlocked){this.onNodeClick(i);return}if(this.terrain){const o=this.raycaster.intersectObject(this.terrain,!1)[0];if(o&&(this.player.setMoveTarget(o.point.x,o.point.z),i)){const a=this.nodes.find(c=>c.id===i);a!=null&&a.unlocked&&this.player.setMoveTarget(a.x+3,a.z+3)}}});X(this,"onResize",()=>{var n;const e=this.container.clientWidth,t=this.container.clientHeight;!e||!t||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),(n=this.composer)==null||n.setSize(e,t))});X(this,"animate",()=>{var i,s;if(this.animId=requestAnimationFrame(this.animate),this.paused)return;const e=Math.min(this.clock.getDelta(),.05),t=this.clock.getElapsedTime();this.mixer&&this.mixer.update(e);const n=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,e);if(this.player.update(e,n),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*e));let o=this.player.yaw-this.avatarYaw;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;this.avatarYaw+=o*Math.min(1,e*12);const a=this.player.isMoving(),c=this.player.isSprinting();if(a){this.walkPhase+=e*(c?15:9.5);const y=Math.floor(this.walkPhase/Math.PI);if(y!==this.lastStep){this.lastStep=y;const A=y%2===0?1:-1,w=Math.cos(this.avatarYaw)*.18*A,C=-Math.sin(this.avatarYaw)*.18*A;this.emitDust(this.player.position.x+w,this.player.position.y,this.player.position.z+C)}}const l=this.explorer.userData.rig;if(l){if(a){const y=c?.95:.6,A=c?1.35:.95,w=Math.sin(this.walkPhase),C=Math.sin(this.walkPhase+Math.PI);l.leftLeg.hip.rotation.x=w*y,l.rightLeg.hip.rotation.x=C*y,l.leftLeg.knee.rotation.x=.12+Math.max(0,-w)*A,l.rightLeg.knee.rotation.x=.12+Math.max(0,-C)*A,l.leftArm.rotation.x=-w*.8,l.rightArm.rotation.x=-C*.8,l.head.rotation.z=0,l.cape.rotation.x=-.18-(.32+Math.abs(Math.sin(this.walkPhase))*.18)*(c?1.3:1),l.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const y=Math.min(1,e*9);l.leftLeg.hip.rotation.x*=1-y,l.rightLeg.hip.rotation.x*=1-y,l.leftLeg.knee.rotation.x+=(.06-l.leftLeg.knee.rotation.x)*y,l.rightLeg.knee.rotation.x+=(.06-l.rightLeg.knee.rotation.x)*y,l.leftArm.rotation.x*=1-y,l.rightArm.rotation.x*=1-y,l.head.rotation.z=Math.sin(t*1.4)*.05,l.cape.rotation.x+=(-.2-l.cape.rotation.x)*y,l.cape.rotation.z+=(Math.sin(t*1.1)*.04-l.cape.rotation.z)*y}this.updateFace(l,e)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const y=this.glbWalk.getEffectiveWeight(),A=y+((a?1:0)-y)*Math.min(1,e*6);this.glbWalk.setEffectiveWeight(A),this.glbIdle.setEffectiveWeight(1-A)}const h=a?c?.14:.05:0;this.avatarLean+=(h-this.avatarLean)*Math.min(1,e*8);const u=this.explorer.position.x,d=this.explorer.position.z,f=1.6,m=Gt(u-f,d,Tt),_=Gt(u+f,d,Tt),p=Gt(u,d-f,Tt),g=Gt(u,d+f,Tt);this._n.set(m-_,2*f,p-g).normalize(),this._n.lerp(bM,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(SM,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*e));const v=a?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(t*1.4)*.01;this.explorer.position.y=this.player.position.y+v;const b=this.explorer.children.find(y=>{var A;return(A=y.userData)==null?void 0:A.isFootRing});if(b){const y=a?1+Math.sin(this.walkPhase)*.08:1;b.scale.set(y,y,y),b.material.opacity=a?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(e),this.tickScene(t),(s=this.onExploreUpdate)==null||s.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(i=this.nearNode)==null?void 0:i.id,pickups:this.pickupData,biome:this.minimapPalette()}),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=e,this.onNodeClick=t.onNodeClick,this.onProximity=t.onProximity,this.onExploreUpdate=t.onExploreUpdate,this.onPickupNear=t.onPickupNear,this.onPickupCollect=t.onPickupCollect;const n=e.clientWidth||360,i=e.clientHeight||420;this.scene=new Wp,this.scene.fog=new lo(1713472,.0042),this.camera=new jt(50,n/i,.2,900),this.camera.position.set(0,8,20),this.renderer=new sy({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(n,i),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=bu,this.renderer.toneMapping=mo,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=yt,e.appendChild(this.renderer.domElement),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.spawnExplorer(),this.setupPostFX(n,i),this.bindEvents(),this.animate()}setupPostFX(e,t){try{const n=new hy(this.renderer);n.addPass(new uy(this.scene,this.camera));const i=new gs(new ue(e,t),.62,.5,.78);n.addPass(i),n.addPass(new fy),n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(e,t),this.composer=n,this.bloomPass=i}catch{this.composer=void 0}}setNodes(e,t){this.nodes=e,this.currentId=t,this.rebuildPath(),this.rebuildDecor(),this.rebuildNodesAsync(),this.teleportToNode(t)}resume(){this.paused=!1,this.player.setEnabled(!0),this.onResize()}pause(){this.paused=!0,this.player.setEnabled(!1)}tryInteract(){var e,t;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):(t=this.nearNode)!=null&&t.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(e,t){this.player.setStickInput(e,t)}setBiome(e){const t=xM(e);this.currentBiome=t,this.applyBiomeToSky(t),this.applyBiomeToLights(t),this.applyOutfitFromBiome(t),this.scene.fog=new lo(t.fogColor,t.fogDensity)}setOutfitAccent(e){var n;const t=(n=this.explorer)==null?void 0:n.userData.rig;if(t){t.mats.trim.color.setHex(e),t.mats.trim.emissive.setHex(e).multiplyScalar(.4),t.mats.cape.color.setHex(e),t.mats.cape.emissive.setHex(e).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(i=>{const s=i,o=s.material;s.isMesh&&o&&"emissive"in o&&o.emissive.setHex(e).multiplyScalar(.45)})}setExpression(e){this.expression=e,this.usingGlb&&this.playGlbEmote(e)}playGlbEmote(e){var o;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const t=e==="happy"?"Wave":e==="surprised"?"Jump":null;if(!t){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const n=this.glbClips.find(a=>a.name===t);if(!n)return;const i=this.mixer.clipAction(n);i.setLoop(Lu,1),i.clampWhenFinished=!1,i.reset().play(),(o=this.glbWalk)==null||o.setEffectiveWeight(0),this.glbIdle.crossFadeTo(i,.2,!1),this.glbEmoting=!0;const s=a=>{var c;a.action===i&&(this.glbEmoting=!1,i.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(c=this.mixer)==null||c.removeEventListener("finished",s))};this.mixer.addEventListener("finished",s)}applyOutfitFromBiome(e){this.setOutfitAccent(e.crystalColor)}minimapPalette(){const e=this.currentBiome,[t,n,i]=e.terrainTint,s=Math.round(t*255)<<16|Math.round(n*255)<<8|Math.round(i*255),o=Math.min(255,Math.round(t*255)+70)<<16|Math.min(255,Math.round(n*255)+80)<<8|Math.min(255,Math.round(i*255)+60);return{ground:s,highland:o,path:e.pathColor}}disposeReflectors(){for(const e of this.reflectors)e.getRenderTarget().dispose(),e.geometry.dispose(),e.material.dispose();this.reflectors=[]}updateFace(e,t){this.blinkTimer-=t,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-t*9);const n=1-this.blink*.85;e.eyeL.scale.y=n,e.eyeR.scale.y=n;const i=this.nearNode||this.nearPickup?"happy":this.expression;let s=.37,o=1,a=1,c=.2;i==="happy"?(s=.39,o=1.5,a=.85,c=.188):i==="surprised"&&(s=.42,o=.7,a=2.4,c=.192);const l=Math.min(1,t*8);e.brow.position.y+=(s-e.brow.position.y)*l,e.mouth.scale.x+=(o-e.mouth.scale.x)*l,e.mouth.scale.y+=(a-e.mouth.scale.y)*l,e.mouth.position.y+=(c-e.mouth.position.y)*l}setPickups(e){this.pickupData=e,this.rebuildPickups()}markPickupCollected(e){var i,s;const t=this.pickupData.find(o=>o.id===e);t&&(t.collected=!0);const n=this.pickupMeshes.get(e);n&&(n.userData.dying=!0,n.userData.dieTimer=0),((i=this.nearPickup)==null?void 0:i.id)===e&&(this.nearPickup=null,(s=this.onPickupNear)==null||s.call(this,null))}tryCollectPickup(){var e;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):!1}dispose(){var e,t,n,i,s,o,a,c;if(cancelAnimationFrame(this.animId),this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),this.player.dispose(),qt(this.scene,this.pathGroup),qt(this.scene,this.decorGroup),qt(this.scene,this.waterGroup),qt(this.scene,this.mountains),qt(this.scene,this.clouds),qt(this.scene,this.explorer),qt(this.scene,this.pickupGroup),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(e=this.sunDisc.material.map)==null||e.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const l=(t=this.dustPool[0])==null?void 0:t.material;(n=l==null?void 0:l.map)==null||n.dispose();for(const h of this.dustPool)h.material.dispose();this.dustPool=[]}this.disposeReflectors(),(i=this.mixer)==null||i.stopAllAction(),(s=this.composer)==null||s.dispose();for(const l of this.nodeGroups.values())Xr(l);for(const l of this.pickupMeshes.values())Xr(l);if(this.terrain){this.terrain.geometry.dispose();const l=this.terrain.material;(o=l.map)==null||o.dispose(),(a=l.roughnessMap)==null||a.dispose(),(c=l.normalMap)==null||c.dispose(),l.dispose()}this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){qt(this.scene,this.explorer),this.explorer=fM(),this.scene.add(this.explorer),this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var e;try{const t=await pd(),n=(e=t==null?void 0:t.world)==null?void 0:e.avatar;if(!t||!n)return;const i=await Zy(n.file,n,t);if(!i)return;if(qt(this.scene,this.explorer),this.explorer=i.group,this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new ei(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,i.clips.length){this.mixer=new og(this.explorer),this.glbClips=i.clips;const s=i.clips.find(a=>/idle|stand|breath/i.test(a.name))??i.clips[0];this.glbIdle=this.mixer.clipAction(s),this.glbIdle.play();const o=i.clips.find(a=>/walk|run|move/i.test(a.name));o&&(this.glbWalk=this.mixer.clipAction(o),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(e){const t=this.nodes.find(i=>i.id===e)??this.nodes[0];if(!t)return;const n=Gt(t.x,t.z,Tt);this.player.setPosition(t.x+4,n,t.z+6),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(t.x+10,n+7,t.z+14),this.camera.lookAt(t.x,n+1.5,t.z)}buildSky(){const e=new zt({side:Xt,depthWrite:!1,uniforms:{topColor:{value:new Ae(3824266)},midColor:{value:new Ae(5929642)},bottomColor:{value:new Ae(659488)},offset:{value:22},exponent:{value:.52}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor, midColor, bottomColor;
        uniform float offset, exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          vec3 col = mix(bottomColor, midColor, smoothstep(-0.15, 0.35, h));
          col = mix(col, topColor, smoothstep(0.25, 0.95, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.skyDome=new se(new mn(560,48,32),e),this.scene.add(this.skyDome);const t=new Float32Array(2e3*3),n=Kn(42);for(let o=0;o<2e3;o++){const a=300+n()*80,c=n()*Math.PI*2,l=n()*Math.PI*.45;t[o*3]=a*Math.sin(l)*Math.cos(c),t[o*3+1]=a*Math.cos(l)+30,t[o*3+2]=a*Math.sin(l)*Math.sin(c)+Ct}const i=new mt;i.setAttribute("position",new Mt(t,3)),this.scene.add(new Wu(i,new tl({color:15265528,size:.42,transparent:!0,opacity:.82,sizeAttenuation:!0})));const s=new ts({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:no,fog:!1});this.sunDisc=new zs(s),this.sunDisc.scale.set(90,90,1),this.scene.add(this.sunDisc)}makeGlowTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),i=n.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.18,"rgba(255,245,210,0.95)"),i.addColorStop(.5,"rgba(255,210,140,0.35)"),i.addColorStop(1,"rgba(255,200,120,0)"),n.fillStyle=i,n.fillRect(0,0,256,256);const s=new qs(t);return s.colorSpace=yt,s}buildDust(){const e=this.makeCloudTexture(),t=new ht;for(let n=0;n<28;n++){const i=new ts({map:e,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),s=new zs(i);s.visible=!1,s.userData={life:0,vx:0,vy:0,vz:0},t.add(s),this.dustPool.push(s)}this.dustGroup=t,this.scene.add(t)}emitDust(e,t,n){let i=0;for(const s of this.dustPool){if(s.userData.life>0)continue;s.position.set(e+(Math.random()-.5)*.2,t+.05,n+(Math.random()-.5)*.2),s.userData.life=1,s.userData.vx=(Math.random()-.5)*.6,s.userData.vy=.3+Math.random()*.45,s.userData.vz=(Math.random()-.5)*.6;const o=.3+Math.random()*.2;if(s.scale.set(o,o,1),s.visible=!0,s.material.opacity=.5,++i>=3)break}}updateDust(e){for(const t of this.dustPool){const n=t.userData.life;if(n<=0)continue;const i=n-e*1.4;if(t.userData.life=i,i<=0){t.visible=!1;continue}t.userData.vy=t.userData.vy-e*.6,t.position.x+=t.userData.vx*e,t.position.y+=t.userData.vy*e,t.position.z+=t.userData.vz*e,t.material.opacity=i*.5;const s=(1.3-i)*.6+.3;t.scale.set(s,s,1)}}buildLights(){this.hemi=new Bm(13164799,2373672,.72),this.scene.add(this.hemi),this.ambientLight=new Vm(10137804,.32),this.scene.add(this.ambientLight),this.sun=new yc(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(4096,4096);const e=this.sun.shadow.camera;e.near=8,e.far=340,e.left=e.bottom=-150,e.right=e.top=150,this.sun.shadow.bias=-35e-5,this.scene.add(this.sun);const t=new yc(9221375,.5);t.position.set(-40,28,-30);const n=new ms(10864895,.55,160);n.position.set(-35,28,Ct),this.scene.add(t,n)}applyBiomeToSky(e){if(!this.skyDome)return;const t=this.skyDome.material;t.uniforms.topColor.value.setHex(e.skyTop),t.uniforms.midColor.value.setHex(e.skyMid),t.uniforms.bottomColor.value.setHex(e.skyBot),t.needsUpdate=!0}applyBiomeToLights(e){this.hemi&&(this.hemi.color.setHex(e.hemiSky),this.hemi.groundColor.setHex(e.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(e.ambientColor),this.sun&&(this.sun.color.setHex(e.sunColor),this.sun.intensity=e.sunIntensity),this.sunDisc&&this.sunDisc.material.color.setHex(e.sunColor),this.bloomPass&&(this.bloomPass.strength=Xs.clamp(.5+(1.5-e.sunIntensity)*.28,.45,1.05))}rebuildPickups(){qt(this.scene,this.pickupGroup),this.pickupMeshes.clear(),this.pickupGroup=new ht;for(const e of this.pickupData){if(e.collected)continue;const t=this.createPickupOrb(e);this.pickupGroup.add(t),this.pickupMeshes.set(e.id,t)}this.scene.add(this.pickupGroup)}createPickupOrb(e){const t=this.currentBiome,n=new ht;n.position.set(e.x,e.y,e.z),n.userData.pickupId=e.id;const i=new nt({color:t.orbColor,emissive:new Ae(t.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),s=new se(new mn(.32,14,10),i);s.userData.isOrbCore=!0,n.add(s);const o=new kt({color:t.glowColor,transparent:!0,opacity:.22,side:Xt,depthWrite:!1}),a=new se(new mn(.58,12,8),o);a.userData.isOrbGlow=!0,n.add(a);const c=new mi(.52,.04,6,24),l=new kt({color:t.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),h=new se(c,l);h.userData.isOrbRing=!0,h.rotation.x=Math.PI/3,n.add(h);const u=new ms(t.glowColor,.6,8);u.userData.isOrbLight=!0,n.add(u);const d=this.createWordSprite(e.word,t.orbColor);return d.position.y=1.1,d.userData.isWordSprite=!0,n.add(d),n.userData.baseY=e.y,n.userData.pickupId=e.id,n}createWordSprite(e,t){var h;const i=`#${new Ae(t).getHexString()}`,s=document.createElement("canvas");s.width=256,s.height=64;const o=s.getContext("2d");o.clearRect(0,0,256,64),o.fillStyle="rgba(0,0,0,0.52)",(h=o.roundRect)==null||h.call(o,4,8,248,48,12),o.fill(),o.font="bold 26px 'Arial', sans-serif",o.fillStyle=i,o.textAlign="center",o.textBaseline="middle",o.shadowColor=i,o.shadowBlur=8,o.fillText(e,128,34);const a=new qs(s),c=new ts({map:a,transparent:!0,depthWrite:!1}),l=new zs(c);return l.scale.set(2.4,.6,1),l}buildTerrain(){const e=new Un(Vn.width,Vn.depth,Sl.w,Sl.d);e.rotateX(-Math.PI/2);const t=e.attributes.position,n=new Float32Array(t.count*3);for(let s=0;s<t.count;s++){const o=t.getX(s),a=t.getZ(s),c=Tt(o,a);t.setY(s,c);const l=.14+Math.abs(c)*.06;n[s*3]=.07+l*.55,n[s*3+1]=l*.95,n[s*3+2]=.09+l*.38}e.setAttribute("color",new Mt(n,3)),e.computeVertexNormals();const i=yM();this.terrain=new se(e,new nt({map:i.color,roughnessMap:i.roughness,normalMap:i.normal,normalScale:new ue(.85,.85),vertexColors:!0,roughness:.82,metalness:.06})),this.terrain.receiveShadow=!0,this.terrain.position.set(0,fu,Ct),this.scene.add(this.terrain)}buildMountains(){qt(this.scene,this.mountains);const e=new ht,t=Kn(7),n=Math.max(Vn.width,Vn.depth)*.5,i=30;for(let s=0;s<i;s++){const o=s/i*Math.PI*2+(t()-.5)*.18,a=n+t()*40,c=Math.cos(o)*a,l=Math.sin(o)*a+Ct,h=42+t()*78,u=32+t()*46,d=3095634+Math.floor(t()*10)*65793,f=new nt({color:d,roughness:1,metalness:0,flatShading:!0}),m=new se(new rr(u,h,5+Math.floor(t()*3),1),f);m.position.set(c,h/2-8,l),m.rotation.y=t()*Math.PI,m.scale.set(1,.8+t()*.5,1),e.add(m)}this.mountains=e,this.scene.add(e)}buildGrass(){const e=eM(),t=new nt({vertexColors:!0,roughness:.9,metalness:0,side:Lt});t.onBeforeCompile=c=>{c.uniforms.uTime={value:0},c.uniforms.uPlayer={value:new R(0,0,0)},this.grassUniforms=c.uniforms,c.vertexShader=`uniform float uTime;
uniform vec3 uPlayer;
`+c.vertexShader,c.vertexShader=c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         float gH = position.y / 0.5;
         vec4 gWp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
         float gPh = gWp.x * 0.12 + gWp.z * 0.12;
         float gSway = sin(uTime * 1.5 + gPh) * 0.16 + sin(uTime * 2.7 + gPh * 1.6) * 0.06;
         transformed.x += gSway * gH;
         transformed.z += gSway * 0.4 * gH;
         // 角色踩踏：附近草向外侧倒伏并压低
         vec2 gToP = gWp.xz - uPlayer.xz;
         float gd = length(gToP);
         float gTramp = smoothstep(2.4, 0.5, gd);
         vec2 gDir = gToP / max(gd, 0.001);
         transformed.xz += gDir * gTramp * gH * 0.55;
         transformed.y -= gTramp * gH * 0.4;`)};const n=7e3,i=new Vu(e,t,n);i.frustumCulled=!1,i.castShadow=!1,i.receiveShadow=!0;const s=Kn(31337),o=new ft;let a=0;for(let c=0;c<n;c++){const l=(s()-.5)*220,h=Ct+(s()-.5)*Vn.depth*.9,u=Gt(l,h,Tt);o.position.set(l,u,h),o.rotation.set(0,s()*Math.PI,0);const d=.7+s()*1.2;o.scale.set(d,.8+s()*1,d),o.updateMatrix(),i.setMatrixAt(a++,o.matrix)}i.count=a,i.instanceMatrix.needsUpdate=!0,this.grassMesh=i,this.scene.add(i)}buildClouds(){qt(this.scene,this.clouds);const e=this.makeCloudTexture(),t=new ht;t.position.z=Ct;const n=Kn(5150);for(let i=0;i<18;i++){const s=new ts({map:e,transparent:!0,opacity:.42+n()*.28,depthWrite:!1,fog:!1}),o=new zs(s),a=n()*Math.PI*2,c=130+n()*260;o.position.set(Math.cos(a)*c,86+n()*70,Math.sin(a)*c);const l=70+n()*140;o.scale.set(l,l*(.42+n()*.2),1),t.add(o)}this.clouds=t,this.scene.add(t)}makeCloudTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.clearRect(0,0,256,256);for(let s=0;s<26;s++){const o=256*(.25+Math.random()*.5),a=256*(.35+Math.random()*.3),c=256*(.08+Math.random()*.18),l=n.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,"rgba(255,255,255,0.5)"),l.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=l,n.beginPath(),n.arc(o,a,c,0,Math.PI*2),n.fill()}const i=new qs(t);return i.colorSpace=yt,i}rebuildPath(){if(qt(this.scene,this.pathGroup),this.pathGroup=new ht,this.nodes.length<2){this.scene.add(this.pathGroup);return}const e=this.nodes.map(i=>new R(i.x,Gt(i.x,i.z,Tt)+.45,i.z)),t=new vc(e,!1,"catmullrom",.35),n=Math.max(e.length*28,80);for(let i=0;i<this.nodes.length-1;i++){const s=this.nodes[i],o=this.nodes[i+1],a=s.cleared&&o.cleared,c=Gt(s.x,s.z,Tt)+.45,l=Gt(o.x,o.z,Tt)+.45,h=new vc([new R(s.x,c,s.z),new R(o.x,l,o.z)],!1,"catmullrom",.4),u=new se(new fo(h,16,.48,12,!1),new nt({color:a?4885618:4016732,roughness:.68,metalness:.1}));u.receiveShadow=!0;const d=new se(new fo(h,16,.26,10,!1),Jy(a));d.position.y=.08,this.pathGroup.add(u,d)}for(let i=0;i<=n;i++){const s=t.getPoint(i/n);s.y=Gt(s.x,s.z,Tt)+.02;const o=new se(new It(.82,.14,.6),en(i%3===0?7041664:9147295,.75));o.position.copy(s),o.rotation.y=i/n*Math.PI*4,o.receiveShadow=!0,this.pathGroup.add(o)}this.scene.add(this.pathGroup)}rebuildDecor(){this.disposeReflectors(),qt(this.scene,this.decorGroup),qt(this.scene,this.waterGroup),this.decorGroup=new ht,this.waterGroup=new ht,this.waterMeshes=[];const e=Kn(2024),t=new Set;for(const c of this.nodes){const l=Kn(c.id.length*997+c.z);for(let h=0;h<34;h++){const u=l()*Math.PI*2,d=6+l()*24,f=c.x+Math.cos(u)*d,m=c.z+Math.sin(u)*d,_=`${Math.round(f)}_${Math.round(m)}`;if(t.has(_))continue;t.add(_);const p=Gt(f,m,Tt),g=.75+l()*1.1;this.addDecorAt(c.theme,f,p,m,g,l)}}const n=Kn(909),i=Vn.width*.46,s=Vn.depth*.46;for(let c=0;c<180;c++){const l=(n()-.5)*2*i,h=Ct+(n()-.5)*2*s;if(Math.abs(l)<14)continue;const u=Gt(l,h,Tt),d=.8+n()*1.5;if(n()>.42){const f=n()>.5?su(d):iu(d);f.position.set(l,u,h),f.rotation.y=n()*Math.PI*2,this.decorGroup.add(f)}else{const f=ya(d*.85);f.position.set(l,u+.2,h),f.rotation.set(n(),n(),n()),this.decorGroup.add(f)}}const o=6;for(let c=0;c<o;c++){const h=(c%2===0?-1:1)*(60+e()*55),u=Ct-s*.8+c*(s*1.5/o)+e()*18,d=48+e()*26,f=30+e()*18,m=Gt(h,u,Tt)-.6,_=new Mo(new Un(d,f),{textureWidth:512,textureHeight:512,color:1918038});_.rotation.x=-Math.PI/2,_.position.set(h,m,u),this.reflectors.push(_),this.waterGroup.add(_);const p=new se(new Un(d,f,18,12),Qy());p.material.opacity=.26,p.rotation.x=-Math.PI/2,p.position.set(h,m+.05,u),p.userData.isWater=!0,this.waterMeshes.push(p),this.waterGroup.add(p)}const a=new se(new Un(Vn.width+40,Vn.depth+40),new kt({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.set(0,5,Ct),this.decorGroup.add(a),this.scene.add(this.decorGroup,this.waterGroup)}addDecorAt(e,t,n,i,s,o){if(e==="forest"||e==="plains"||e==="library"){const a=o()>.4?su(s):iu(s*1.05);a.position.set(t,n,i),a.rotation.y=o()*Math.PI*2,this.decorGroup.add(a);return}if(e==="coast"&&o()>.45){const a=ya(s*.85);a.position.set(t,n+.3,i),a.rotation.set(o(),o(),o()),this.decorGroup.add(a);return}if(o()>.5){const a=ya(s*.65);a.position.set(t,n+.2,i),this.decorGroup.add(a)}if(o()>.65){const a=xd(hr(e).accent);a.position.set(t,n,i),this.decorGroup.add(a)}}async rebuildNodesAsync(){const e=++this.rebuildToken;for(const t of this.nodeGroups.values())this.scene.remove(t),Xr(t);this.nodeGroups.clear(),this.pickables=[];for(const t of this.nodes){if(e!==this.rebuildToken)return;const n=new ht,i=Gt(t.x,t.z,Tt);n.position.set(t.x,i,t.z),n.userData.nodeId=t.id;const{root:s,crystal:o}=await dM(t,t.id===this.currentId);n.add(s),o.userData.nodeId=t.id,this.pickables.push(o);const a=_M(t.name,t.unlocked);n.add(a),t.unlocked||Jd(n),this.nodeGroups.set(t.id,n),this.scene.add(n)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize)}updateProximity(){var n,i;let e=null,t=Yd;for(const s of this.nodes){if(!s.unlocked)continue;const o=this.player.position.x-s.x,a=this.player.position.z-s.z,c=Math.hypot(o,a);c<t&&(t=c,e=s)}(e==null?void 0:e.id)!==((n=this.nearNode)==null?void 0:n.id)&&(this.nearNode=e,(i=this.onProximity)==null||i.call(this,e))}updatePickupProximity(){var n,i;let e=null,t=MM;for(const s of this.pickupData){if(s.collected)continue;const o=this.player.position.x-s.x,a=this.player.position.z-s.z,c=Math.hypot(o,a);c<t&&(t=c,e=s)}(e==null?void 0:e.id)!==((n=this.nearPickup)==null?void 0:n.id)&&(this.nearPickup=e,(i=this.onPickupNear)==null||i.call(this,e))}tickScene(e){var t,n,i;if(this.sun){const s=e*.03,o=Math.sin(s)*72,a=36+Math.cos(s)*46;this.sun.position.set(o,Math.max(5,a),35);const c=Xs.clamp((a+8)/90,.18,1);this.sun.intensity=this.currentBiome.sunIntensity*(.32+c*.68),this.renderer.toneMappingExposure=1.05+c*.3,this.hemi&&(this.hemi.intensity=.38+c*.5),this.sunDisc&&(this.sunDisc.position.set(o*4.2,this.sun.position.y*4.2,this.sun.position.z*4.2+Ct),this.sunDisc.material.opacity=Xs.clamp(c*1.2,0,1))}this.grassUniforms&&(this.grassUniforms.uTime.value=e,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.clouds&&(this.clouds.rotation.y=e*.006);for(const[s,o]of this.pickupMeshes){const a=((t=this.nearPickup)==null?void 0:t.id)===s,c=o.userData.baseY??o.position.y;if(o.userData.dying){o.userData.dieTimer=(o.userData.dieTimer??0)+.04;const l=o.userData.dieTimer;o.scale.setScalar(1-l*.9),o.position.y=c+l*3,o.traverse(h=>{const u=h;u.material&&"opacity"in u.material&&(u.material.opacity*=.85)}),l>=1&&((n=this.pickupGroup)==null||n.remove(o),this.pickupMeshes.delete(s));continue}o.position.y=c+Math.sin(e*1.4+s.length*.5)*.28,o.traverse(l=>{var u,d,f,m,_;const h=l;if((u=h.userData)!=null&&u.isOrbCore){h.rotation.y=e*.8+s.length;const p=a?1+Math.sin(e*4)*.15:1+Math.sin(e*2)*.06;h.scale.setScalar(p);const g=h.material;g.emissiveIntensity=a?3.5+Math.sin(e*5)*.8:1.8+Math.sin(e*2)*.3}if((d=h.userData)!=null&&d.isOrbGlow&&(h.material.opacity=a?.42+Math.sin(e*3)*.15:.18+Math.sin(e*1.5)*.06),(f=h.userData)!=null&&f.isOrbRing&&(h.rotation.z=e*1.2+s.length*.3,h.rotation.x=Math.PI/3+Math.sin(e*.5)*.2,h.material.opacity=a?.8:.45),(m=h.userData)!=null&&m.isOrbLight){const p=h;p.intensity=a?1.4+Math.sin(e*4)*.4:.6+Math.sin(e*2)*.1}if((_=h.userData)!=null&&_.isWordSprite){const p=h;p.material.opacity=a?1:.72+Math.sin(e*1.2)*.12}})}for(const[s,o]of this.nodeGroups){const a=((i=this.nearNode)==null?void 0:i.id)===s;o.traverse(c=>{var h,u,d;const l=c;if((h=l.userData)!=null&&h.isCrystal&&(l.userData.baseY===void 0&&(l.userData.baseY=l.position.y),l.rotation.y=e*.6+s.length*.3,l.position.y=l.userData.baseY+Math.sin(e*1.8+s.length)*(a?.28:.15)),(u=l.userData)!=null&&u.isPulse){const f=1+Math.sin(e*3)*.08;l.scale.set(f,f,f),l.material.opacity=.35+Math.sin(e*3)*.2}(d=l.userData)!=null&&d.isDueRing&&(l.material.opacity=.28+Math.sin(e*2.4+s.length)*.18)})}for(const s of this.waterMeshes){s.userData.baseY===void 0&&(s.userData.baseY=s.position.y),s.position.y=s.userData.baseY+Math.sin(e*.9+s.position.x)*.07,s.material.opacity=.68+Math.sin(e*.7)*.08;const o=s.geometry,a=o.attributes.position;s.userData.flat||(s.userData.flat=Float32Array.from(a.array));const c=s.userData.flat;for(let l=0;l<a.count;l++){const h=c[l*3],u=c[l*3+1],d=Math.sin(h*.22+e*1.7)*.12+Math.cos(u*.27+e*1.25)*.1;a.setZ(l,d)}a.needsUpdate=!0,o.computeVertexNormals()}}}function Cn(r,e,t){const n=document.createElement(r);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Yt(r,e=2200){var n;(n=document.querySelector(".toast"))==null||n.remove();const t=Cn("div","toast",r);document.body.appendChild(t),setTimeout(()=>t.remove(),e)}const hu="word_quest_guide_seen",Ji=5;function Sa(r){if(!("speechSynthesis"in window))return;const e=new SpeechSynthesisUtterance(r);e.lang="en-US",e.rate=.9,window.speechSynthesis.cancel(),window.speechSynthesis.speak(e)}function uu(r){return r==="review"?"间隔复习":r==="weak"?"薄弱巩固":"新词学习"}class TM{constructor(e){X(this,"root");X(this,"state",Rc.load());X(this,"template",null);X(this,"wordMap",new Map);X(this,"mapNodes",[]);X(this,"levelMap",new Map);X(this,"scene",null);X(this,"sceneMode","level");X(this,"phase","input");X(this,"sessionGraded",new Set);X(this,"answerRevealed",!1);X(this,"selectedWordId",null);X(this,"clozeItems",[]);X(this,"clozeIndex",0);X(this,"clozeDone",new Set);X(this,"clozeWrongGraded",new Set);X(this,"rw3PhaseIndex",0);X(this,"rw3QuizIndex",0);X(this,"rw3QuizCorrect",new Set);X(this,"rw3ClozeIndex",0);X(this,"rw3ClozeDone",new Set);X(this,"rw3TranslationIndex",0);X(this,"rw3TranslationDone",!1);X(this,"rw3WritingAck",!1);X(this,"world",null);X(this,"minimap",null);X(this,"renderedCourse",null);X(this,"rw3Units",new Map);X(this,"cetContent",null);X(this,"cetQuizIndex",0);X(this,"cetQuizCorrect",new Set);X(this,"cetTranslationDone",!1);X(this,"unitExplore",null);X(this,"wordCardTimer",null);this.root=e}async start(){await this.loadCourse(this.state.save.courseId),this.mountShell(),this.renderMap(),this.show("map")}async loadCourse(e){if(this.template=await Nd(e),this.wordMap=await Ud(e),this.rw3Units=e==="college_english_rw3"?await Od():new Map,this.cetContent=e==="cet4"||e==="cet6"?await Fd(e):null,this.levelMap.clear(),this.template.id==="college_english_rw3"){zd(this.state.save,this.template)&&this.state.persist();for(const n of this.template.zones)this.levelMap.set(n.id,{level:kd(n),zone:n})}else for(const n of this.template.zones)for(const i of n.levels)this.levelMap.set(i.id,{level:i,zone:n});const t=new Set(Object.entries(this.state.save.levelProgress).filter(([,n])=>n.cleared).map(([n])=>n));this.mapNodes=nf(this.template,t),this.annotateDueCounts(),this.syncMapNode()}annotateDueCounts(){for(const e of this.mapNodes){const t=this.levelMap.get(e.id);e.dueCount=t?this.state.countDueInSet(t.level.word_ids):0}}syncMapNode(){var t;let e=this.mapNodes.find(n=>n.id===this.state.save.mapNodeId);if(!e&&((t=this.template)==null?void 0:t.id)==="college_english_rw3"){const n=this.template.zones.find(i=>this.state.save.mapNodeId.startsWith(i.id));n&&(this.state.setMapNode(n.id),e=this.mapNodes.find(i=>i.id===n.id))}if(!e){const n=this.mapNodes.find(i=>i.unlocked)??this.mapNodes[0];n&&this.state.setMapNode(n.id)}}mountShell(){this.root.innerHTML='<div id="screen-map" class="screen active"></div><div id="screen-scene" class="screen"></div>'}show(e){var n,i;this.root.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));const t=this.root.querySelector(`#screen-${e}`);t==null||t.classList.add("active","screen-enter"),setTimeout(()=>t==null?void 0:t.classList.remove("screen-enter"),450),e==="map"?(n=this.world)==null||n.resume():(i=this.world)==null||i.pause()}renderMap(){var u,d,f,m,_;const e=this.root.querySelector("#screen-map");if(!e||!this.template)return;const t=rf(this.mapNodes,this.state.save.mapNodeId),n=this.mapNodes.filter(p=>p.cleared).length,i=this.state.getDueWordIds(this.wordMap.keys()),s=i.length,o=this.state.getWeakWordIds(this.wordMap.keys(),8,new Set(i)),a=this.state.getLearningStats(this.wordMap.keys());if(this.renderedCourse!==this.state.save.courseId&&((u=this.world)==null||u.dispose(),this.world=null,e.innerHTML="",this.renderedCourse=this.state.save.courseId),!e.querySelector("#world-viewport")){(d=this.world)==null||d.dispose(),e.innerHTML=`
        <div class="card map-header" id="map-header"></div>
        <div class="tabs" id="course-tabs">
          ${Id.map(v=>`<button class="tab ${this.state.save.courseId===v?"active":""}" data-course="${v}">${Dd[v]}</button>`).join("")}
        </div>
        <div class="world-viewport" id="world-viewport">
          <div class="explore-hud">
            <div id="proximity-panel" class="proximity-panel hidden">
              <span id="proximity-label" class="proximity-label"></span>
              <button type="button" class="btn-explore-interact" id="btn-world-interact">进入学习 · E</button>
            </div>
            <div id="pickup-panel" class="pickup-panel hidden">
              <span id="pickup-label" class="pickup-word-hint"></span>
              <button type="button" class="btn-collect" id="btn-collect-pickup">收集 · E</button>
            </div>
            <div id="explore-progress-hud" class="explore-progress-hud hidden">
              <div id="explore-progress-text" class="explore-progress-text"></div>
              <button type="button" class="btn-exit-explore" id="btn-exit-explore">← 返回地图</button>
            </div>
            <canvas id="explore-minimap" class="explore-minimap" width="120" height="120" aria-label="探险小地图"></canvas>
            <button type="button" id="btn-avatar-toggle" class="btn-avatar-toggle" title="换装 / 表情" aria-label="换装与表情">🧑‍🎤</button>
            <div id="avatar-toolbox" class="avatar-toolbox hidden">
              <div class="avatar-tool-title">表情</div>
              <div class="avatar-tool-row">
                <button type="button" class="avatar-chip" data-expr="neutral" title="中性">😐</button>
                <button type="button" class="avatar-chip" data-expr="happy" title="开心">😀</button>
                <button type="button" class="avatar-chip" data-expr="surprised" title="惊讶">😮</button>
              </div>
              <div class="avatar-tool-title">换装</div>
              <div class="avatar-tool-row">
                <button type="button" class="avatar-swatch" data-accent="4237567" style="background:#40a8ff" title="湖蓝"></button>
                <button type="button" class="avatar-swatch" data-accent="16737095" style="background:#ff6347" title="赤红"></button>
                <button type="button" class="avatar-swatch" data-accent="6477941" style="background:#62d875" title="翠绿"></button>
                <button type="button" class="avatar-swatch" data-accent="16764496" style="background:#ffce50" title="琥珀"></button>
                <button type="button" class="avatar-swatch" data-accent="12868860" style="background:#c45cfc" title="紫晶"></button>
              </div>
            </div>
            <div id="move-stick" class="move-stick" aria-label="移动摇杆">
              <div class="move-stick-knob" id="move-stick-knob"></div>
            </div>
          </div>
          <div class="world-hint-bar" id="world-hint-bar">WASD 走动 · Shift 奔跑 · 点地前往 · 走近水晶按 E</div>
          <!-- 快速单词卡弹窗（走近光球时弹出） -->
          <div id="word-pickup-card" class="word-pickup-card hidden"></div>
        </div>
        <div id="map-hint"></div>
      `;const p=e.querySelector("#world-viewport"),g=p.querySelector("#explore-minimap");this.minimap=new Af(g),this.minimap.setNodes(this.mapNodes),this.world=new wM(p,{onNodeClick:v=>this.onNodeClick(v),onProximity:v=>this.updateProximityHud(v),onExploreUpdate:v=>{var b,y;(b=this.minimap)==null||b.setNodes(v.nodes),(y=this.minimap)==null||y.draw(v)},onPickupNear:v=>this.onPickupNear(v),onPickupCollect:v=>this.collectPickup(v)}),this.bindExploreControls(p),e.querySelectorAll("#course-tabs .tab").forEach(v=>{v.addEventListener("click",async()=>{Oe.play("click"),this.state.setCourse(v.dataset.course),await this.loadCourse(this.state.save.courseId),this.renderMap()})})}const c=this.state.save.courseId==="college_english_rw3",l=e.querySelector("#world-hint-bar");l&&(l.textContent=c?"WASD/摇杆走动 · Shift 奔跑 · 走近 Unit 水晶 · E 进入学习":"WASD 走动 · Shift 奔跑 · 点地探路 · 走近站点按 E 进入");const h=e.querySelector("#map-header");h&&(h.innerHTML=`
        <div class="title">${this.template.name}</div>
        <div class="subtitle">${c?"新视野第四版 · Section A/B/C + 词汇4关 + 阅读/听力 + 填空 + 翻译 + 写作":"三维探索 · 科学记忆（语境输入 + 主动回忆 + 间隔重复）"}</div>
        <span class="progress-pill">${c?"单元":"关卡"} ${n}/${this.mapNodes.length}</span>
        ${a.learned>0?`<span class="progress-pill stats-pill">已学 ${a.learned}</span>`:""}
        ${a.mastered>0?`<span class="progress-pill stats-pill mastered-pill">掌握 ${a.mastered}</span>`:""}
        ${s>0?`<span class="progress-pill review-pill">待复习 ${s}</span>`:""}
        ${a.weak>0?`<span class="progress-pill weak-pill">薄弱 ${a.weak}</span>`:""}
      `),this.renderPlayGuide(),this.renderPracticePanel(i,s,o),this.renderMapHint(t),(f=this.minimap)==null||f.setNodes(this.mapNodes),(m=this.world)==null||m.setNodes(this.mapNodes,(t==null?void 0:t.id)??""),(_=this.world)==null||_.resume()}updateProximityHud(e){const t=this.root.querySelector("#proximity-panel"),n=this.root.querySelector("#proximity-label");if(!t||!n)return;if(!e){t.classList.add("hidden");return}t.classList.remove("hidden");const i=e.zoneName?`<span class="proximity-zone">${e.zoneName}</span>`:"";n.innerHTML=`${i}<span class="proximity-name">${e.icon} ${e.name}</span>`}bindExploreControls(e){var h,u,d,f;(h=e.querySelector("#btn-world-interact"))==null||h.addEventListener("click",()=>{var m;Oe.play("click"),(m=this.world)==null||m.tryInteract()}),(u=e.querySelector("#btn-collect-pickup"))==null||u.addEventListener("click",()=>{var m;Oe.play("click"),(m=this.world)==null||m.tryCollectPickup()}),(d=e.querySelector("#btn-exit-explore"))==null||d.addEventListener("click",()=>{Oe.play("click"),this.exitUnitExplore()});const t=e.querySelector("#avatar-toolbox");(f=e.querySelector("#btn-avatar-toggle"))==null||f.addEventListener("click",()=>{Oe.play("click"),t==null||t.classList.toggle("hidden")}),t==null||t.querySelectorAll(".avatar-chip").forEach(m=>{m.addEventListener("click",()=>{var p;Oe.play("click");const _=m.dataset.expr;(p=this.world)==null||p.setExpression(_),t.querySelectorAll(".avatar-chip").forEach(g=>g.classList.remove("active")),m.classList.add("active")})}),t==null||t.querySelectorAll(".avatar-swatch").forEach(m=>{m.addEventListener("click",()=>{var p;Oe.play("click");const _=Number(m.dataset.accent);Number.isNaN(_)||(p=this.world)==null||p.setOutfitAccent(_),t.querySelectorAll(".avatar-swatch").forEach(g=>g.classList.remove("active")),m.classList.add("active")})});const n=e.querySelector("#move-stick"),i=e.querySelector("#move-stick-knob");if(!n||!i)return;let s=!1;const o={x:0,y:0},a=36,c=(m,_)=>{var b;let p=m-o.x,g=_-o.y;const v=Math.hypot(p,g);v>a&&(p=p/v*a,g=g/v*a),i.style.transform=`translate(${p}px, ${g}px)`,(b=this.world)==null||b.setStickInput(p/a,-g/a)},l=()=>{var m;s=!1,i.style.transform="",(m=this.world)==null||m.setStickInput(0,0)};n.addEventListener("pointerdown",m=>{s=!0;const _=n.getBoundingClientRect();o.x=_.left+_.width/2,o.y=_.top+_.height/2,n.setPointerCapture(m.pointerId),c(m.clientX,m.clientY)}),n.addEventListener("pointermove",m=>{s&&c(m.clientX,m.clientY)}),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",l)}renderPlayGuide(){var i,s;if(localStorage.getItem(hu))return;const e=this.root.querySelector("#play-guide");e==null||e.remove();const t=Cn("div","card play-guide");t.id="play-guide",t.innerHTML=`
      <div class="play-guide-head">
        <span class="title" style="font-size:1rem">怎么玩？</span>
        <button class="btn-ghost-sm" id="btn-dismiss-guide" type="button">知道了</button>
      </div>
      <ol class="play-guide-list">
        <li><strong>走动探险</strong>：WASD 或左下摇杆移动，拖拽画面转向，走近水晶按 E</li>
        <li><strong>读写3 路线</strong>：6 个单元 = 6 幕场景，每幕学完本单元 20 词</li>
        <li><strong>读原文</strong>：一幕内包含阅读篇 + 听力稿，高亮词来自课文</li>
        <li><strong>主动回忆</strong>：点高亮词 → 先回忆 → 揭示 → 自评</li>
        <li><strong>语境填空</strong>：按课文句子选释义，答错缩短复习间隔</li>
        <li><strong>间隔复习</strong>：到期词在地图练习卡片，每轮约 12 词</li>
      </ol>
    `;const n=this.root.querySelector("#map-hint");(i=n==null?void 0:n.parentElement)==null||i.insertBefore(t,n),(s=t.querySelector("#btn-dismiss-guide"))==null||s.addEventListener("click",()=>{localStorage.setItem(hu,"1"),t.remove()})}renderPracticePanel(e,t,n){var h,u,d;const i=this.root.querySelector("#practice-panel");if(i==null||i.remove(),t<=0&&n.length===0)return;const s=Math.min(12,e.length),o=n.length,a=Cn("div","card practice-panel");a.id="practice-panel";const c=[];t>0&&c.push(`
        <div class="practice-block">
          <div class="practice-block-head">
            <span class="review-entry-icon">⏳</span>
            <div>
              <div class="title" style="font-size:0.95rem">间隔复习</div>
              <div class="subtitle">${t} 词到期 · 本轮 ${s} 词</div>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-start-review" type="button">开始复习</button>
        </div>
      `),o>0&&c.push(`
        <div class="practice-block">
          <div class="practice-block-head">
            <span class="review-entry-icon">🔥</span>
            <div>
              <div class="title" style="font-size:0.95rem">薄弱巩固</div>
              <div class="subtitle">上次回忆困难 · 本轮 ${o} 词</div>
            </div>
          </div>
          <button class="btn btn-secondary" id="btn-start-weak" type="button">开始巩固</button>
        </div>
      `),a.innerHTML=c.join("");const l=this.root.querySelector("#map-hint");(h=l==null?void 0:l.parentElement)==null||h.insertBefore(a,l),(u=a.querySelector("#btn-start-review"))==null||u.addEventListener("click",()=>this.openReview(e)),(d=a.querySelector("#btn-start-weak"))==null||d.addEventListener("click",()=>this.openWeak(n))}renderMapHint(e){var n;const t=this.root.querySelector("#map-hint");if(t){if(!e){t.innerHTML="";return}t.innerHTML=`
      <div class="card explore-hint">
        <div class="explore-header"><span class="explore-loc">📍 ${e.zoneName}</span></div>
        <div class="title" style="font-size:1rem">${e.icon} ${e.name}</div>
        <div class="subtitle">${e.cleared?"本单元已完成 · 可重温":e.unlocked?this.state.save.courseId==="college_english_rw3"?"完整单元：Section A/B/C → 词汇4关 → 阅读题 → 听力 → 填空 → 翻译 → 写作":"进入后：先读故事 → 回忆释义 → 语境填空":"完成前一单元后解锁"}${e.dueCount?` · <span class="due-inline">${e.dueCount} 词待复习</span>`:""}</div>
        ${e.unlocked?'<button class="btn btn-primary" id="btn-enter-scene">进入学习场景</button>':""}
      </div>
    `,(n=t.querySelector("#btn-enter-scene"))==null||n.addEventListener("click",()=>this.openScene(e.id))}}onNodeClick(e){var n,i;if(this.state.save.courseId==="college_english_rw3"){if(this.unitExplore){Oe.play("click"),this.state.setMapNode(e),(n=this.world)==null||n.pause(),this.openScene(e);return}const s=this.mapNodes.find(o=>o.id===e);if(!(s!=null&&s.unlocked)){Yt("请先完成前一个单元");return}Oe.play("click"),this.state.setMapNode(e),this.enterUnitExplore(e);return}const t=this.mapNodes.find(s=>s.id===e);if(!(t!=null&&t.unlocked)){Yt("请先完成前一个探索点");return}Oe.play("click"),this.state.setMapNode(e),this.renderMapHint(t),(i=this.world)==null||i.setNodes(this.mapNodes,e),this.openScene(e)}enterUnitExplore(e,t){var f,m,_,p,g;const n=this.levelMap.get(e);if(!n)return;const{zone:i}=n,s=i.id.replace("rw3_",""),o=new Set,a=[];for(const v of i.levels)for(const b of v.word_ids){if(o.has(b))continue;o.add(b);const y=this.wordMap.get(b);y&&a.push({id:y.id,word:y.word,meaning:y.meaning})}const c=t??new Set(a.map(v=>v.id).filter(v=>this.state.save.discoveredWords.includes(v))),l=cf(s,a);for(const v of l)c.has(v.id)&&(v.collected=!0);this.unitExplore={unitId:s,unitLabel:i.name,pickups:l,collectedIds:c};const h=lf(s),u={id:i.id,zoneName:i.name,name:"📚 学习圣所",icon:"📚",theme:"library",x:h.x,y:0,z:h.z-12,unlocked:!0,cleared:((f=this.state.save.levelProgress[i.id])==null?void 0:f.cleared)??!1};(m=this.world)==null||m.setBiome(s),(_=this.world)==null||_.setPickups(l.filter(v=>!v.collected)),(p=this.world)==null||p.setNodes([u],i.id),(g=this.minimap)==null||g.setNodes([u],l),this.updateExploreProgressHud(),this.showExploreHud(!0);const d=this.root.querySelector("#world-hint-bar");d&&(d.textContent="走近发光词球按 E 收集词汇 · 前往中央 📚 学习圣所按 E 进入读写场景"),this.showUnitEntryCard(i,a.length,c.size)}showUnitEntryCard(e,t,n){var l,h,u,d;const i=this.rw3Units.get(e.id.replace("rw3_","")),s=(i==null?void 0:i.title)??e.name_en,o=(i==null?void 0:i.theme)??"",a=[];(l=i==null?void 0:i.sections.section_a)!=null&&l.title&&a.push(`Section A: ${i.sections.section_a.title}`),(h=i==null?void 0:i.sections.section_b)!=null&&h.title&&a.push(`Section B: ${i.sections.section_b.title}`),(u=i==null?void 0:i.sections.section_c)!=null&&u.title&&a.push(`Section C: ${i.sections.section_c.title}`);const c=this.root.querySelector("#word-pickup-card");c&&(this.wordCardTimer&&clearTimeout(this.wordCardTimer),c.innerHTML=`
      <div class="wc-inner unit-entry-card">
        <div class="wc-collected-badge">📍 ${e.name}</div>
        <div class="unit-entry-title">${s}</div>
        <div class="unit-entry-theme">${o}</div>
        <div class="unit-entry-sections">${a.map(f=>`<div class="unit-sec-item">${f}</div>`).join("")}</div>
        <div class="unit-entry-stats">
          <span>词汇 ${t} 词</span>
          <span>已收集 ${n}/${t}</span>
          <span>阅读 · 听力 · 翻译 · 写作</span>
        </div>
        <button class="wc-dismiss" id="btn-unit-entry-ok">开始探索 →</button>
      </div>
    `,c.classList.remove("hidden"),c.classList.add("wc-enter"),(d=c.querySelector("#btn-unit-entry-ok"))==null||d.addEventListener("click",()=>this.dismissWordCard()),this.wordCardTimer=setTimeout(()=>this.dismissWordCard(),8e3))}exitUnitExplore(){var t,n,i;this.unitExplore=null,(t=this.world)==null||t.setBiome(void 0),(n=this.world)==null||n.setPickups([]),(i=this.world)==null||i.setNodes(this.mapNodes,this.state.save.mapNodeId),this.showExploreHud(!1),this.hidePickupPanel();const e=this.root.querySelector("#world-hint-bar");e&&(e.textContent="WASD/摇杆走动 · Shift 奔跑 · 走近 Unit 水晶 · E 进入单元地图")}showExploreHud(e){const t=this.root.querySelector("#explore-progress-hud");t&&t.classList.toggle("hidden",!e)}updateExploreProgressHud(){if(!this.unitExplore)return;const e=this.root.querySelector("#explore-progress-text");if(!e)return;const t=this.unitExplore.pickups.length,n=this.unitExplore.collectedIds.size,i=t>0?Math.round(n/t*100):0;e.innerHTML=`
      <span class="explore-unit-label">${this.unitExplore.unitLabel}</span>
      <span class="explore-pickup-count">词汇收集 ${n}/${t}</span>
      <div class="explore-pickup-bar"><div class="explore-pickup-fill" style="width:${i}%"></div></div>
    `}onPickupNear(e){const t=this.root.querySelector("#pickup-panel"),n=this.root.querySelector("#pickup-label");if(t){if(!e){t.classList.add("hidden");return}t.classList.remove("hidden"),n&&(n.textContent=`"${e.word}" — ${e.meaning}`)}}hidePickupPanel(){var e,t;(e=this.root.querySelector("#pickup-panel"))==null||e.classList.add("hidden"),(t=this.root.querySelector("#word-pickup-card"))==null||t.classList.add("hidden")}collectPickup(e){var n;if(!this.unitExplore)return;const t=this.unitExplore.pickups.find(i=>i.id===e);!t||t.collected||(t.collected=!0,this.unitExplore.collectedIds.add(e),this.state.recordDiscovered(e),(n=this.world)==null||n.markPickupCollected(e),this.hidePickupPanel(),this.updateExploreProgressHud(),this.showWordPickupCard(t),Oe.play("win"))}showWordPickupCard(e){var o,a;const t=this.root.querySelector("#word-pickup-card");if(!t)return;this.wordCardTimer&&clearTimeout(this.wordCardTimer);const n=this.wordMap.get(e.id),i=n!=null&&n.pos?`<span class="wc-pos">${n.pos}</span>`:"",s=n!=null&&n.example?`<div class="wc-example">${n.example}</div>`:"";t.innerHTML=`
      <div class="wc-inner">
        <div class="wc-collected-badge">✦ 词汇已收集</div>
        <div class="wc-word">
          ${e.word}
          <button class="btn-tts wc-tts" title="朗读">🔊</button>
        </div>
        ${i}
        <div class="wc-meaning">${e.meaning}</div>
        ${s}
        <button class="wc-dismiss">继续探索 →</button>
      </div>
    `,t.classList.remove("hidden"),t.classList.add("wc-enter"),(o=t.querySelector(".btn-tts"))==null||o.addEventListener("click",()=>Sa(e.word)),(a=t.querySelector(".wc-dismiss"))==null||a.addEventListener("click",()=>this.dismissWordCard()),this.wordCardTimer=setTimeout(()=>this.dismissWordCard(),5e3)}dismissWordCard(){const e=this.root.querySelector("#word-pickup-card");e&&(e.classList.add("hidden"),e.classList.remove("wc-enter"),this.wordCardTimer&&(clearTimeout(this.wordCardTimer),this.wordCardTimer=null))}openScene(e){const t=this.levelMap.get(e);if(!t){Yt("场景加载失败");return}const{level:n,zone:i}=t;if(n.word_ids.length===0&&n.content_refs&&n.content_refs.length>0){if(!this.cetContent){Yt("内容加载中，请稍候");return}this.state.setMapNode(e),Oe.play("start"),this.cetQuizIndex=0,this.cetQuizCorrect=new Set,this.cetTranslationDone=!1,this.renderCetContentScene(n,i),this.show("scene");return}if(n.word_ids.length===0){Yt("场景内容即将更新");return}const s=this.template.zones.findIndex(a=>a.id===i.id),o=this.state.save.courseId==="college_english_rw3"?gf(i,this.wordMap,this.rw3Units.get(i.id.replace("rw3_","")),n.word_ids,s):vf(n,i,this.wordMap,i.levels.findIndex(a=>a.id===n.id),i.levels.length);if(!o){Yt("场景加载失败");return}this.beginScene(o,"level"),this.state.setMapNode(e),Oe.play("start"),this.renderScene(),this.show("scene")}renderCetContentScene(e,t){const n=this.root.querySelector("#screen-scene");if(!n||!this.cetContent)return;const i=(e.content_refs??[])[0]??"",[s]=i.split(":");if(s==="listening"){const o=i.split(":")[1],a=this.cetContent.listening.get(o);if(a){this.renderCetListening(n,e,t,a);return}}if(s==="reading"){const o=i.split(":")[1],a=this.cetContent.reading.get(o);if(a){this.renderCetReading(n,e,t,a);return}}if(s==="translation"){const o=i.split(":")[1],a=this.cetContent.translation.get(o);if(a){this.renderCetTranslation(n,e,t,a);return}}if(s==="mock_exam"){this.renderCetBoss(n,e,t);return}Yt("内容格式错误")}cetQuizHeader(e,t,n,i,s,o){return`
      <div class="card scene-header">
        <span class="progress-pill">${t.name} · ${e.title}</span>
        <div class="title" style="font-size:1.1rem">${n} ${e.title}</div>
        <p class="learn-steps">${i}</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${o?s/o*100:0}%"></div></div>
        <div class="discover-label">题目 <strong>${s}/${o}</strong></div>
      </div>
    `}renderCetListening(e,t,n,i){var c,l;const s=i.questions[this.cetQuizIndex],o=this.cetQuizCorrect.size>=i.questions.length,a=i.script.split(`
`);e.innerHTML=`
      ${this.cetQuizHeader(t,n,"🎧","① 阅读听力稿 ② 完成理解题",this.cetQuizCorrect.size,i.questions.length)}
      <div class="card listen-script" id="listen-body">
        ${a.map(h=>`<p style="margin:0.25rem 0">${h}</p>`).join("")}
      </div>
      ${s?`<div class="card quiz-card" id="quiz-card">
        <p class="quiz-q">${s.question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      </div>`:""}
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${o?"":"disabled"}>完成本关</button>
      </div>
    `,s&&this.bindCetQuizChoices(e,i.questions,"listening",t,n,i),(c=e.querySelector("#btn-back-map"))==null||c.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(l=e.querySelector("#btn-cet-finish"))==null||l.addEventListener("click",()=>{o&&this.finishCetScene(t.id)})}renderCetReading(e,t,n,i){var a,c;const s=i.questions[this.cetQuizIndex],o=this.cetQuizCorrect.size>=i.questions.length;e.innerHTML=`
      ${this.cetQuizHeader(t,n,"📖","① 阅读短文 ② 完成理解题",this.cetQuizCorrect.size,i.questions.length)}
      <div class="card listen-script" id="passage-body">
        <p style="line-height:1.8">${i.passage}</p>
      </div>
      ${s?`<div class="card quiz-card" id="quiz-card">
        <p class="quiz-q">${s.question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      </div>`:""}
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${o?"":"disabled"}>完成本关</button>
      </div>
    `,s&&this.bindCetQuizChoices(e,i.questions,"reading",t,n,i),(a=e.querySelector("#btn-back-map"))==null||a.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(c=e.querySelector("#btn-cet-finish"))==null||c.addEventListener("click",()=>{o&&this.finishCetScene(t.id)})}renderCetTranslation(e,t,n,i){var s,o,a;e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">${n.name} · ${t.title}</span>
        <div class="title" style="font-size:1.1rem">✍️ ${t.title}</div>
        <p class="learn-steps">将中文句子译为英文（需包含关键词）</p>
      </div>
      <div class="card translation-card">
        <p class="translation-zh">${i.zh}</p>
        <p class="translation-hint">关键词：${i.keywords.join("、")}</p>
        <textarea class="translation-input" id="translation-input" rows="4" placeholder="在此输入英文译文…"></textarea>
        <p class="translation-ref hidden" id="translation-ref">参考译文：${i.en_reference}</p>
        <p class="translation-feedback" id="translation-feedback"></p>
        <button class="btn btn-primary" id="btn-check-translation" type="button">提交译文</button>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${this.cetTranslationDone?"":"disabled"}>完成本关</button>
      </div>
    `,(s=e.querySelector("#btn-check-translation"))==null||s.addEventListener("click",()=>{const c=e.querySelector("#translation-input").value,l=El(c,{zh:i.zh,enReference:i.en_reference,keywords:i.keywords}),h=e.querySelector("#translation-feedback"),u=e.querySelector("#translation-ref");if(u==null||u.classList.remove("hidden"),l.ok){this.cetTranslationDone=!0,Oe.play("win"),h&&(h.textContent=`关键词命中：${l.matched.join("、")} ✓`);const d=e.querySelector("#btn-cet-finish");d&&(d.disabled=!1)}else Oe.play("click"),h&&(h.textContent=`请再试试，需包含至少 2 个关键词（${i.keywords.join("、")}）。`)}),(o=e.querySelector("#btn-back-map"))==null||o.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(a=e.querySelector("#btn-cet-finish"))==null||a.addEventListener("click",()=>{this.cetTranslationDone&&this.finishCetScene(t.id)})}renderCetBoss(e,t,n){var u,d;if(!this.cetContent)return;const i=[...this.cetContent.listening.values()],s=[...this.cetContent.reading.values()],o=n.levels.findIndex(f=>f.id===t.id),a=i[o%i.length],c=s[(o+2)%s.length],l=[...((a==null?void 0:a.questions)??[]).slice(0,1),...((c==null?void 0:c.questions)??[]).slice(0,1)],h=this.cetQuizCorrect.size>=l.length;e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">${n.name} · ${t.title} · Boss 挑战</span>
        <div class="title" style="font-size:1.1rem">🏛 ${t.title}</div>
        <p class="learn-steps">听力 + 阅读理解 · 综合挑战</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${l.length?this.cetQuizCorrect.size/l.length*100:0}%"></div></div>
        <div class="discover-label">题目 <strong>${this.cetQuizCorrect.size}/${l.length}</strong></div>
      </div>
      ${a?`<div class="card listen-script"><p class="subtitle" style="margin-bottom:0.5rem">🎧 听力稿</p>${a.script.split(`
`).map(f=>`<p style="margin:0.25rem 0">${f}</p>`).join("")}</div>`:""}
      ${c?`<div class="card listen-script"><p class="subtitle" style="margin-bottom:0.5rem">📖 阅读段落</p><p style="line-height:1.8">${c.passage}</p></div>`:""}
      ${!h&&l[this.cetQuizIndex]?`<div class="card quiz-card" id="quiz-card">
        <p class="quiz-q">${l[this.cetQuizIndex].question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      </div>`:""}
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${h?"":"disabled"}>Boss 攻克！</button>
      </div>
    `,!h&&l[this.cetQuizIndex]&&this.bindCetQuizChoices(e,l,"boss",t,n,null),(u=e.querySelector("#btn-back-map"))==null||u.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(d=e.querySelector("#btn-cet-finish"))==null||d.addEventListener("click",()=>{h&&this.finishCetScene(t.id)})}bindCetQuizChoices(e,t,n,i,s,o){const a=t[this.cetQuizIndex];if(!a)return;const c=e.querySelector("#quiz-choices");a.options.forEach((l,h)=>{const u=Cn("button","quiz-choice");u.type="button",u.textContent=l,u.addEventListener("click",()=>{e.querySelectorAll(".quiz-choice").forEach(f=>{f.disabled=!0});const d=e.querySelector("#quiz-feedback");h===a.answer?(u.classList.add("correct"),this.cetQuizCorrect.add(this.cetQuizIndex),Oe.play("win"),d&&(d.textContent=a.explanation??"正确！"),setTimeout(()=>{this.cetQuizIndex<t.length-1&&this.cetQuizIndex++;const f=this.levelMap.get(this.state.save.mapNodeId);f&&this.renderCetContentScene(f.level,f.zone)},700)):(u.classList.add("wrong"),Oe.play("click"),d&&(d.textContent=`答案：${a.options[a.answer]}。${a.explanation??""}`),setTimeout(()=>{const f=this.levelMap.get(this.state.save.mapNodeId);f&&this.renderCetContentScene(f.level,f.zone)},1100))}),c.appendChild(u)})}finishCetScene(e){var n;const t=!((n=this.state.save.levelProgress[e])!=null&&n.cleared);t&&this.state.completeLevel(e),Yt(t?"本关完成！":"重温完成"),Oe.play("win"),this.loadCourse(this.state.save.courseId).then(()=>{this.renderMap(),this.show("map")})}openReview(e){const t=wf(e,this.wordMap);if(!t){Yt("暂无到期复习词");return}this.beginScene(t,"review"),Oe.play("start"),this.renderScene(),this.show("scene")}openWeak(e){const t=Tf(e,this.wordMap);if(!t){Yt("暂无薄弱词");return}this.beginScene(t,"weak"),Oe.play("start"),this.renderScene(),this.show("scene")}beginScene(e,t){var i;this.scene=e,this.sceneMode=t,this.sessionGraded=new Set,this.answerRevealed=!1,this.selectedWordId=null,this.clozeWrongGraded=new Set,this.rw3PhaseIndex=0,this.rw3QuizIndex=0,this.rw3QuizCorrect=new Set,this.rw3ClozeIndex=0,this.rw3ClozeDone=new Set,this.rw3TranslationIndex=0,this.rw3TranslationDone=!1,this.rw3WritingAck=!1,t==="level"&&this.state.save.courseId==="college_english_rw3"&&(((i=e.rw3Phases)==null?void 0:i.length)??0)>0?(this.phase="rw3",this.clozeItems=[],this.clozeIndex=0,this.clozeDone=new Set):(this.phase="input",this.clozeItems=vu(e.words),this.clozeIndex=0,this.clozeDone=new Set)}renderScene(){this.phase==="rw3"?this.renderRw3Phase():this.phase==="input"?this.renderInputPhase():this.renderClozePhase()}rw3StepperHtml(){var t;return`<div class="rw3-stepper">${(((t=this.scene)==null?void 0:t.rw3Phases)??[]).map((n,i)=>`<span class="rw3-step ${i===this.rw3PhaseIndex?"active":i<this.rw3PhaseIndex?"done":""}" title="${n.label}">${n.label}</span>`).join("")}</div>`}renderRw3Phase(){var s,o;const e=this.root.querySelector("#screen-scene"),t=(o=(s=this.scene)==null?void 0:s.rw3Phases)==null?void 0:o[this.rw3PhaseIndex];if(!e||!this.scene||!t)return;const n=this.scene.rw3Phases.length,i=this.rw3PhaseIndex+1;if(t.kind==="section_a"||t.kind==="section_b"||t.kind==="section_c"||t.kind==="vocab"){this.renderRw3ReadingPhase(e,t,i,n);return}if(t.kind==="reading_quiz"||t.kind==="listening"){this.renderRw3QuizPhase(e,t,i,n);return}if(t.kind==="cloze"){this.renderRw3ClozePhase(e,t,i,n);return}if(t.kind==="translation"){this.renderRw3TranslationPhase(e,t,i,n);return}t.kind==="writing"&&this.renderRw3WritingPhase(e,t,i,n)}renderRw3ReadingPhase(e,t,n,i){var d,f;const s=t.words.filter(m=>this.sessionGraded.has(m.id)).length,o=t.words.length,a=s>=o,c=t.kind==="vocab"?` · 第 ${t.level}/${t.totalLevels} 关（每关 5 词）`:"",l=t.kind==="section_a"?"📖 A":t.kind==="section_b"?"📖 B":t.kind==="section_c"?"🏮 C":"🗝",h=t.kind==="section_c"?"rw3-section-c":t.kind==="vocab"?"rw3-section-vocab":"";e.innerHTML=`
      <div class="card scene-header ${h}">
        <span class="progress-pill">读写3 · ${n}/${i} · ${t.label}</span>
        ${this.rw3StepperHtml()}
        <div class="rw3-section-badge">${l} ${t.kind==="vocab"?"词汇专项练习":t.title}</div>
        <p class="learn-steps">① 阅读段落  ② 点击高亮词  ③ 在心里回忆释义  ④ 自评记忆强度</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${o?s/o*100:0}%"></div></div>
        <div class="discover-label">已回忆 <strong>${s}/${o}</strong> 词${c}</div>
        <div class="word-chips" id="word-chips">
          ${t.words.map(m=>{const _=this.sessionGraded.has(m.id),p=this.selectedWordId===m.id;return`<button type="button" class="word-chip${_?" done":""}${p?" active":""}" data-wid="${m.id}" title="${m.meaning}">${m.word}</button>`}).join("")}
        </div>
      </div>
      <div class="card scene-body rw3-passage-body" id="scene-body"></div>
      <div class="card word-panel" id="word-panel"><p class="subtitle">点击高亮词 → 主动回忆其中文含义 → 再自评记忆强度</p></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${a?"":"disabled"}>${n>=i?"🎉 完成本单元":"下一阶段 →"}</button>
      </div>
    `;const u=e.querySelector("#scene-body");for(const m of t.kind==="vocab"?[]:t.segments){if(m.type==="text"){u.append(m.content);continue}const _=this.sessionGraded.has(m.wordId),p=Cn("button",`ctx-word${_?" discovered":""}${this.selectedWordId===m.wordId?" active":""}`);p.type="button",p.textContent=m.content,p.addEventListener("click",()=>this.onWordSelect(m.wordId)),u.appendChild(p)}t.kind==="vocab"&&(u.innerHTML='<p class="subtitle">本关词汇：请逐一点击下方词卡完成主动回忆（无段落阅读）。</p>'),this.selectedWordId&&this.renderRecallPanel(this.selectedWordId),e.querySelectorAll("#word-chips .word-chip").forEach(m=>{m.addEventListener("click",()=>{const _=m.dataset.wid;_&&this.onWordSelect(_)})}),(d=e.querySelector("#btn-back-map"))==null||d.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(f=e.querySelector("#btn-rw3-next"))==null||f.addEventListener("click",()=>{a&&this.advanceRw3Phase()})}renderRw3QuizPhase(e,t,n,i){var c,l;const s=t.questions,o=s[this.rw3QuizIndex],a=this.rw3QuizCorrect.size>=s.length;if(e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${n}/${i} · ${t.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">${t.title}</div>
        <p class="learn-steps">${t.kind==="listening"?"① 阅读听力稿 ② 完成理解题":"阅读理解选择题"}</p>
        ${t.kind==="listening"?'<div class="card listen-script" id="listen-body"></div>':""}
        <div class="discover-label">题目 <strong>${this.rw3QuizCorrect.size}/${s.length}</strong></div>
      </div>
      <div class="card quiz-card" id="quiz-card"></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${a?"":"disabled"}>下一阶段</button>
      </div>
    `,t.kind==="listening"){const h=e.querySelector("#listen-body");for(const u of t.segments)if(u.type==="text")h.append(u.content);else{const d=Cn("button","ctx-word discovered");d.type="button",d.textContent=u.content,d.disabled=!0,h.appendChild(d)}}if(o){const h=e.querySelector("#quiz-card");h.innerHTML=`
        <p class="quiz-q">${o.question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      `;const u=h.querySelector("#quiz-choices");for(let d=0;d<o.options.length;d++){const f=Cn("button","quiz-choice");f.type="button",f.textContent=o.options[d],f.addEventListener("click",()=>this.onRw3QuizAnswer(t,d,f)),u.appendChild(f)}}(c=e.querySelector("#btn-back-map"))==null||c.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(l=e.querySelector("#btn-rw3-next"))==null||l.addEventListener("click",()=>{a&&this.advanceRw3Phase()})}onRw3QuizAnswer(e,t,n){const i=e.questions[this.rw3QuizIndex],s=this.root.querySelector("#quiz-feedback");if(i)if(this.root.querySelectorAll(".quiz-choice").forEach(o=>{o.disabled=!0}),t===i.answer)n.classList.add("correct"),this.rw3QuizCorrect.add(this.rw3QuizIndex),Oe.play("win"),s&&(s.textContent=i.explanation??"正确！"),setTimeout(()=>{this.rw3QuizIndex<e.questions.length-1?(this.rw3QuizIndex+=1,this.renderScene()):this.renderScene()},700);else{n.classList.add("wrong"),Oe.play("click");const o=i.options[i.answer];s&&(s.textContent=`再想想。参考答案：${o}。${i.explanation??""}`),setTimeout(()=>this.renderScene(),1100)}}renderRw3ClozePhase(e,t,n,i){var u,d;const s=t.items[this.rw3ClozeIndex],o=t.items.length,a=this.rw3ClozeDone.size,c=a>=o,l=Math.ceil(o/Ji),h=Math.floor(this.rw3ClozeIndex/Ji)+1;if(e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${n}/${i} · ${t.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">语境填空 · 提取练习</div>
        <div class="discover-bar"><div class="discover-fill" style="width:${a/o*100}%"></div></div>
        <div class="discover-label">填空 <strong>${a}/${o}</strong> · 第 <strong>${h}/${l}</strong> 组</div>
      </div>
      <div class="card cloze-card" id="cloze-card"></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${c?"":"disabled"}>下一阶段</button>
      </div>
    `,s){const f=e.querySelector("#cloze-card");f.innerHTML=`
        <p class="cloze-word-hint">${s.word}</p>
        <p class="cloze-sentence en-clue">${s.sentence}</p>
        <div class="cloze-choices" id="cloze-choices"></div>
        <p class="cloze-feedback" id="cloze-feedback"></p>
      `;const m=f.querySelector("#cloze-choices");for(const _ of s.choices){const p=Cn("button","cloze-choice");p.type="button",p.textContent=_,p.addEventListener("click",()=>this.onRw3ClozeAnswer(s,_,p)),m.appendChild(p)}}(u=e.querySelector("#btn-back-map"))==null||u.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(d=e.querySelector("#btn-rw3-next"))==null||d.addEventListener("click",()=>{c&&this.advanceRw3Phase()})}onRw3ClozeAnswer(e,t,n){const i=this.root.querySelector("#cloze-feedback"),s=t===e.answer;this.root.querySelectorAll(".cloze-choice").forEach(o=>{o.disabled=!0}),s?(n.classList.add("correct"),this.rw3ClozeDone.add(e.wordId),Oe.play("win"),i&&(i.textContent="正确！"),setTimeout(()=>{var a,c;const o=(c=(a=this.scene)==null?void 0:a.rw3Phases)==null?void 0:c[this.rw3PhaseIndex];(o==null?void 0:o.kind)==="cloze"&&this.rw3ClozeIndex<o.items.length-1&&(this.rw3ClozeIndex+=1),this.renderScene()},650)):(n.classList.add("wrong"),Oe.play("click"),this.clozeWrongGraded.has(e.wordId)||(this.state.gradeWord(e.wordId,2),this.clozeWrongGraded.add(e.wordId)),i&&(i.textContent=`正确释义：${e.answer}`),setTimeout(()=>this.renderScene(),1100))}renderRw3TranslationPhase(e,t,n,i){var l,h,u;const s=t.sentences.length,o=Math.min(this.rw3TranslationIndex,s-1),a=t.sentences[o],c=this.rw3TranslationDone;e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${n}/${i} · ${t.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">英汉互译练习</div>
        <p class="learn-steps">将中文句子译成英文，需包含关键词 · 共 ${s} 句</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${o/s*100}%"></div></div>
        <div class="discover-label">第 <strong>${o+1}/${s}</strong> 句${c?" · 全部完成 ✓":""}</div>
      </div>
      <div class="card translation-card">
        <div class="trans-sentence-no">第 ${o+1} 句</div>
        <p class="translation-zh">${(a==null?void 0:a.zh)??""}</p>
        <div class="trans-keywords">
          ${((a==null?void 0:a.keywords)??[]).map(d=>`<span class="trans-kw-chip">${d}</span>`).join("")}
        </div>
        <textarea class="translation-input" id="translation-input" rows="3" placeholder="在此输入英文译文…"></textarea>
        <p class="translation-ref hidden" id="translation-ref">
          <span class="trans-ref-label">参考译文</span>
          ${(a==null?void 0:a.enReference)??""}
        </p>
        <p class="translation-feedback" id="translation-feedback"></p>
        <button class="btn btn-primary" id="btn-check-translation" type="button">提交 · 检查关键词</button>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${c?"":"disabled"}>下一阶段</button>
      </div>
    `,(l=e.querySelector("#btn-check-translation"))==null||l.addEventListener("click",()=>{if(!a)return;const d=e.querySelector("#translation-input").value.trim();if(!d)return;const f=El(d,{zh:a.zh,enReference:a.enReference,keywords:a.keywords}),m=e.querySelector("#translation-feedback"),_=e.querySelector("#translation-ref");_==null||_.classList.remove("hidden"),f.ok?(Oe.play("win"),m&&(m.innerHTML=`<span class="trans-ok">✓ 关键词命中：${f.matched.join("、")}</span>`),setTimeout(()=>{this.rw3TranslationIndex<s-1?this.rw3TranslationIndex+=1:this.rw3TranslationDone=!0,this.renderScene()},900)):(Oe.play("click"),m&&(m.innerHTML=`<span class="trans-hint">💡 请包含至少 2 个关键词：${a.keywords.join("、")}</span>`))}),(h=e.querySelector("#btn-back-map"))==null||h.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(u=e.querySelector("#btn-rw3-next"))==null||u.addEventListener("click",()=>{c&&this.advanceRw3Phase()})}renderRw3WritingPhase(e,t,n,i){var u,d;e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${n}/${i} · ${t.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">写作练习</div>
        <p class="learn-steps">按提纲完成英文短文 · 目标 120–150 词</p>
      </div>
      <div class="card writing-card">
        <div class="writing-prompt-block">
          <div class="writing-prompt-label">写作题目</div>
          <p class="writing-prompt">${t.prompt}</p>
        </div>
        <details class="writing-outline-details" open>
          <summary class="writing-outline-summary">📋 写作提纲</summary>
          <ol class="writing-outline">${t.outline.map(f=>`<li>${f}</li>`).join("")}</ol>
        </details>
        <div class="writing-area-wrap">
          <textarea class="writing-input" id="writing-input" rows="9" placeholder="Write your essay here…"></textarea>
          <div class="writing-wordcount" id="writing-wordcount">0 / 120 词</div>
        </div>
        <div class="writing-progress-bar"><div class="writing-progress-fill" id="writing-progress-fill" style="width:0%"></div></div>
        <label class="writing-check"><input type="checkbox" id="writing-ack" ${this.rw3WritingAck?"checked":""}/> 我已完成初稿并达到 100 词以上</label>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-finish" type="button" ${this.rw3WritingAck?"":"disabled"}>🎉 完成本单元</button>
      </div>
    `;const s=e.querySelector("#writing-ack"),o=e.querySelector("#writing-input"),a=e.querySelector("#writing-wordcount"),c=e.querySelector("#writing-progress-fill"),l=120,h=()=>{const f=o.value.trim().split(/\s+/).filter(Boolean).length,m=Math.min(f/l*100,100);a.textContent=`${f} / ${l} 词`,a.className=`writing-wordcount ${f>=l?"wc-good":f>=80?"wc-mid":""}`,c.style.width=`${m}%`,c.className=`writing-progress-fill ${f>=l?"wfill-good":f>=80?"wfill-mid":""}`,this.rw3WritingAck=s.checked&&f>=100;const _=e.querySelector("#btn-rw3-finish");_&&(_.disabled=!this.rw3WritingAck)};s==null||s.addEventListener("change",h),o==null||o.addEventListener("input",h),(u=e.querySelector("#btn-back-map"))==null||u.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(d=e.querySelector("#btn-rw3-finish"))==null||d.addEventListener("click",()=>{this.rw3WritingAck&&this.finishScene()})}advanceRw3Phase(){var t;const e=(t=this.scene)==null?void 0:t.rw3Phases;e&&(this.rw3PhaseIndex<e.length-1?(this.rw3PhaseIndex+=1,this.rw3QuizIndex=0,this.rw3QuizCorrect=new Set,this.rw3TranslationIndex=0,this.rw3TranslationDone=!1,this.selectedWordId=null,this.answerRevealed=!1,Oe.play("start"),this.renderScene()):this.finishScene())}renderInputPhase(){var a,c;const e=this.root.querySelector("#screen-scene");if(!e||!this.scene)return;const t=this.scene,n=this.sessionGraded.size,i=t.words.length,s=n>=i;e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">${uu(this.sceneMode)} · 阶段 1/2 · 语境输入</span>
        <div class="title" style="font-size:1.1rem">${t.title}</div>
        <p class="learn-steps">① 阅读故事 ② 点击高亮词 ③ 先回忆再揭示 ④ 自评记忆强度</p>
        <p class="plot-zh">${t.plotZh}</p>
        <blockquote class="philosophy-quote">
          <span class="philosophy-label">哲思</span>
          <p class="philosophy-zh">${t.philosophyZh}</p>
        </blockquote>
        <div class="discover-bar"><div class="discover-fill" style="width:${n/i*100}%"></div></div>
        <div class="discover-label">主动回忆 <strong>${n}/${i}</strong>${i>10?" · 建议分批完成，可随时点下方词卡跳转":""}</div>
        <div class="word-chips" id="word-chips">
          ${t.words.map(l=>{const h=this.sessionGraded.has(l.id),u=this.selectedWordId===l.id;return`<button type="button" class="word-chip${h?" done":""}${u?" active":""}" data-wid="${l.id}">${l.word}</button>`}).join("")}
        </div>
      </div>
      <div class="card scene-body" id="scene-body"></div>
      <div class="card word-panel" id="word-panel"><p class="subtitle">点击高亮词，先在心里回忆释义</p></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-to-cloze" type="button" ${s?"":"disabled"}>进入语境填空</button>
      </div>
    `;const o=e.querySelector("#scene-body");for(const l of t.segments){if(l.type==="text"){o.append(l.content);continue}const h=this.sessionGraded.has(l.wordId),u=Cn("button",`ctx-word${h?" discovered":""}${this.selectedWordId===l.wordId?" active":""}`);u.type="button",u.textContent=l.content,u.addEventListener("click",()=>this.onWordSelect(l.wordId)),o.appendChild(u)}this.selectedWordId&&this.renderRecallPanel(this.selectedWordId),e.querySelectorAll("#word-chips .word-chip").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.wid;h&&this.onWordSelect(h)})}),(a=e.querySelector("#btn-back-map"))==null||a.addEventListener("click",()=>{Oe.play("nav"),this.renderMap(),this.show("map")}),(c=e.querySelector("#btn-to-cloze"))==null||c.addEventListener("click",()=>{s&&(this.phase="cloze",this.clozeIndex=0,Oe.play("start"),this.renderScene())})}renderClozePhase(){var c,l;const e=this.root.querySelector("#screen-scene");if(!e||!this.scene)return;const t=this.clozeItems[this.clozeIndex],n=this.clozeItems.length,i=this.clozeDone.size,s=i>=n,o=Math.ceil(n/Ji),a=Math.floor(this.clozeIndex/Ji)+1;e.innerHTML=`
      <div class="card scene-header">
        <span class="progress-pill">${uu(this.sceneMode)} · 阶段 2/2 · 语境填空</span>
        <div class="title" style="font-size:1.1rem">提取练习 · 检测语境理解</div>
        <p class="learn-steps">根据句子语境选择正确释义（科学研究：提取练习优于重复阅读）</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${i/n*100}%"></div></div>
        <div class="discover-label">填空进度 <strong>${i}/${n}</strong>${n>Ji?` · 第 <strong>${a}/${o}</strong> 组（每组 ${Ji} 题）`:""}</div>
      </div>
      <div class="card cloze-card" id="cloze-card"></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-input" type="button">返回阅读</button>
        <button class="btn btn-primary" id="btn-finish-scene" type="button" ${s?"":"disabled"}>${this.sceneMode==="level"?"完成本幕":"完成本轮"}</button>
      </div>
    `,t&&this.renderClozeItem(t),(c=e.querySelector("#btn-back-input"))==null||c.addEventListener("click",()=>{this.phase="input",this.renderScene()}),(l=e.querySelector("#btn-finish-scene"))==null||l.addEventListener("click",()=>{s&&this.finishScene()})}renderClozeItem(e){const t=this.root.querySelector("#cloze-card");if(!t)return;t.innerHTML=`
      <p class="cloze-word-hint">${e.word}</p>
      <p class="cloze-sentence en-clue">${e.sentence}</p>
      <div class="cloze-choices" id="cloze-choices"></div>
      <p class="cloze-feedback" id="cloze-feedback"></p>
    `;const n=t.querySelector("#cloze-choices");for(const i of e.choices){const s=Cn("button","cloze-choice");s.type="button",s.textContent=i,s.addEventListener("click",()=>this.onClozeAnswer(e,i,s)),n.appendChild(s)}}onClozeAnswer(e,t,n){const i=this.root.querySelector("#cloze-feedback"),s=t===e.answer;this.root.querySelectorAll(".cloze-choice").forEach(o=>{o.disabled=!0}),s?(n.classList.add("correct"),this.clozeDone.add(e.wordId),Oe.play("win"),i&&(i.textContent="正确！语境理解到位。"),setTimeout(()=>{this.clozeIndex<this.clozeItems.length-1?(this.clozeIndex+=1,this.renderScene()):this.renderScene()},650)):(n.classList.add("wrong"),Oe.play("click"),this.clozeWrongGraded.has(e.wordId)||(this.state.gradeWord(e.wordId,2),this.clozeWrongGraded.add(e.wordId)),i&&(i.textContent=`再想想。正确释义：${e.answer}（已缩短复习间隔）`),setTimeout(()=>this.renderScene(),1200))}onWordSelect(e){this.scene&&(Oe.play("click"),this.selectedWordId=e,this.answerRevealed=!1,this.renderScene())}renderRecallPanel(e){var h,u,d,f;const t=this.root.querySelector("#word-panel"),n=(h=this.scene)==null?void 0:h.words.find(m=>m.id===e);if(!t||!n)return;const i=this.wordMap.get(e),s=i!=null&&i.phonetic?`<span class="word-phonetic">${i.phonetic}</span>`:"",o=this.state.getMemory(e),a='<button class="btn-tts" id="btn-tts" type="button" title="朗读单词">🔊</button>';if(!this.answerRevealed){t.innerHTML=`
        <div class="recall-card">
          <div class="word-detail-head">
            <span class="word-detail-en">${n.word}</span>
            ${s}
            <span class="word-detail-pos">${n.pos}</span>
            ${a}
          </div>
          <p class="recall-prompt">先回忆释义，再点开答案（生成效应 + 提取练习）</p>
          <p class="en-clue recall-ctx">${n.contextLine}</p>
          <div class="recall-hidden">释义已隐藏</div>
          <button class="btn btn-primary" id="btn-reveal" type="button">我想好了，显示答案</button>
        </div>
      `,(u=t.querySelector("#btn-reveal"))==null||u.addEventListener("click",()=>{this.answerRevealed=!0,this.renderRecallPanel(e)}),(d=t.querySelector("#btn-tts"))==null||d.addEventListener("click",()=>Sa(n.word));return}const c=i!=null&&i.example_zh?`<p class="word-example-zh">${i.example_zh}</p>`:"",l=i!=null&&i.collocation?`<p class="word-collocation"><span class="colloc-label">常用搭配：</span>${i.collocation}</p>`:"";t.innerHTML=`
      <div class="recall-card">
        <div class="word-detail-head">
          <span class="word-detail-en">${n.word}</span>
          ${s}
          <span class="word-detail-pos">${n.pos}</span>
          ${a}
        </div>
        <div class="word-detail-meaning">${n.meaning}</div>
        <p class="en-clue">${n.contextLine}</p>
        ${c}
        ${l}
        <p class="recall-grade-label">诚实自评（用于间隔重复调度）：</p>
        <div class="grade-grid">
          <button class="grade-btn grade-1" data-q="1" type="button">忘记</button>
          <button class="grade-btn grade-3" data-q="3" type="button">模糊</button>
          <button class="grade-btn grade-4" data-q="4" type="button">记住</button>
          <button class="grade-btn grade-5" data-q="5" type="button">秒懂</button>
        </div>
        ${o.reps>0?`<p class="srs-hint">已复习 ${o.reps} 次 · 下次 ${o.interval} 天后</p>`:""}
      </div>
    `,(f=t.querySelector("#btn-tts"))==null||f.addEventListener("click",()=>Sa(n.word)),t.querySelectorAll(".grade-btn").forEach(m=>{m.addEventListener("click",()=>{const _=Number(m.dataset.q);this.state.gradeWord(e,_),this.sessionGraded.add(e),this.selectedWordId=null,this.answerRevealed=!1,Yt(_>=4?"已纳入间隔复习":"会更快再次出现"),this.renderScene()})})}finishScene(){var e;if(this.scene){if(this.sceneMode==="review"?Yt("本轮复习完成！到期词已重新排期"):this.sceneMode==="weak"?Yt("薄弱词巩固完成！继续探索新关卡吧"):!((e=this.state.save.levelProgress[this.scene.levelId])!=null&&e.cleared)?(this.state.completeLevel(this.scene.levelId),Yt(this.state.save.courseId==="college_english_rw3"?"本单元全部模块完成！20 词已进入间隔复习队列":"本幕完成！词汇已进入间隔复习队列")):Yt("重温完成"),Oe.play("win"),this.unitExplore){const t=this.unitExplore;this.loadCourse(this.state.save.courseId).then(()=>{this.renderMap(),this.show("map"),this.enterUnitExplore(t.unitId,t.collectedIds)});return}this.loadCourse(this.state.save.courseId).then(()=>{this.renderMap(),this.show("map")})}}}document.body.addEventListener("click",()=>Oe.unlock(),{once:!0});const Ac=document.getElementById("app");if(!Ac)throw new Error("#app not found");new TM(Ac).start().catch(r=>{console.error(r),Ac.innerHTML=`<div class="card"><div class="title">加载失败</div><p>${String(r)}</p><p class="subtitle">请运行 npm run dev 启动</p></div>`});
