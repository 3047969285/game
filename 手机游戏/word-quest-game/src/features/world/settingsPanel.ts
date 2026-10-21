import { getGameSettings,resetGameSettings,subscribeGameSettings,updateGameSettings,type GameSettings } from './gameSettings';
import type { WeatherKind } from './weather';
import type { MusicPlayer } from '../../infra/music';
import type { QualityTier } from './postPipeline';

export function attachGameSettings(host:HTMLElement,opts:{tier:QualityTier;exploration?:boolean;unavailableFeatures?:readonly (keyof GameSettings)[];music?:MusicPlayer;weather?:(kind:WeatherKind)=>void;time?:(hour:number)=>void;onOpen?:(open:boolean)=>void}) {
  const root=document.createElement('div');root.className='world-settings';root.style.setProperty('--world-settings-height',`${host.clientHeight||innerHeight}px`);
  const style=document.createElement('style');style.textContent=`
.world-settings{position:absolute;left:14px;top:54px;z-index:10020;color:#e4eef6;font:13px/1.5 system-ui}.world-settings button,.world-settings select{font:inherit;color:inherit;background:#203245;border:1px solid #657e95;border-radius:8px;padding:7px 12px}.world-settings button{cursor:pointer}.world-settings select{max-width:230px}.world-settings .settings-sheet{position:absolute;left:0;top:42px;width:min(570px,calc(100vw - 64px));box-sizing:border-box;max-height:min(620px,calc(var(--world-settings-height,100dvh) - 114px));overflow:auto;padding:20px;background:#101e2ef5;border:1px solid #637c94;border-radius:16px;box-shadow:0 20px 70px #0008;backdrop-filter:blur(18px)}.world-settings [hidden]{display:none!important}.world-settings h2{margin:0;font-size:20px}.world-settings nav{display:flex;gap:8px;margin:14px 0}.world-settings button[aria-selected=true]{background:#365c81;border-color:#acd5fb}.world-settings .setting-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #a1c0df22}.world-settings input[type=range]{width:160px;accent-color:#9ed5ff}.world-settings input[type=checkbox]{width:18px;height:18px;accent-color:#9ed5ff}.world-settings .settings-info{color:#a8c1d7;font-size:12px;margin:10px 0;white-space:pre-line}.world-settings .settings-head{position:sticky;top:-20px;padding-top:8px;background:#101e2ef5;z-index:1}.world-settings .settings-footer{position:sticky;bottom:-20px;padding:10px 0;background:#101e2ef5;display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}@media(max-width:540px){.world-settings .settings-sheet{padding:14px}.world-settings .setting-row{gap:6px}.world-settings select{max-width:175px}.world-settings input[type=range]{width:120px}}
`;
  const toggle=document.createElement('button');toggle.type='button';toggle.textContent='⚙ 设置';toggle.setAttribute('aria-expanded','false');
  const panel=document.createElement('section');panel.className='settings-sheet';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','游戏设置');
  const heading=document.createElement('h2');heading.textContent='游戏设置';const nav=document.createElement('nav');nav.setAttribute('aria-label','设置分类');
  const panes=new Map<string,HTMLElement>(),tabs=new Map<string,HTMLButtonElement>();
  for(const title of ['画面','环境','声音','操作']){
    const tab=document.createElement('button');tab.type='button';tab.textContent=title;tab.setAttribute('aria-selected',String(title==='画面'));
    const pane=document.createElement('div');pane.hidden=title!=='画面';panes.set(title,pane);tabs.set(title,tab);
    tab.onclick=()=>{for(const [name,p]of panes){p.hidden=name!==title;tabs.get(name)!.setAttribute('aria-selected',String(name===title));}};nav.append(tab);
  }
  const controls=new Map<keyof GameSettings,HTMLInputElement|HTMLSelectElement>();
  function row(pane:string,title:string,input:HTMLElement):void {const label=document.createElement('label');label.className='setting-row';const text=document.createElement('span');text.textContent=title;label.append(text,input);panes.get(pane)!.append(label);}
  function select(key:keyof GameSettings,title:string,options:readonly (readonly [string,string])[],pane='画面'):HTMLSelectElement {
    const input=document.createElement('select');input.setAttribute('aria-label',title);for(const [value,text]of options){const o=document.createElement('option');o.value=value;o.textContent=text;input.append(o);}
    input.value=String(getGameSettings()[key]);input.onchange=()=>updateGameSettings({[key]:key==='fpsLimit'||key==='shadowSize'?+input.value:input.value} as Partial<GameSettings>);controls.set(key,input);row(pane,title,input);return input;
  }
  function check(key:keyof GameSettings,title:string,pane='画面'):void {const input=document.createElement('input');input.type='checkbox';input.setAttribute('aria-label',title);input.checked=!!getGameSettings()[key];input.onchange=()=>updateGameSettings({[key]:input.checked});if(opts.tier==='low'&&['ssr','ao','taa','aerial','bloom'].includes(key))input.disabled=true;
    if(opts.tier!=='high'&&key==='ssr')input.disabled=true;if(opts.unavailableFeatures?.includes(key))input.disabled=true;if(input.disabled)input.title='当前场景不启用此效果';controls.set(key,input);row(pane,title,input);}
  function range(key:'sensitivity'|'exploreFov'|'followDistance'|'hazeStrength'|'sfxVolume',title:string,min:string,max:string,step:string,pane:string):void {
    const input=document.createElement('input');input.type='range';input.min=min;input.max=max;input.step=step;input.value=String(getGameSettings()[key]);input.setAttribute('aria-label',title);input.oninput=()=>updateGameSettings({[key]:+input.value});controls.set(key,input);row(pane,title,input);
  }
  select('resolution','渲染分辨率',[['quality','2K / 1440p · 画质优先'],['1080p','1080p · 固定清晰度'],['balanced','自动分辨率 · 流畅优先']]);
  select('tier','场景细节档位',[['auto','自动匹配设备'],['high','高'],['med','中'],['low','低']]);
  select('fpsLimit','帧率上限',[['0','不限'],['60','60 fps'],['120','120 fps']]);
  select('shadowSize','阴影精度',[['1024','标准 · 1024'],['2048','精细 · 2048']]);
  check('shadows','动态阴影');check('ssr','屏幕空间反射');check('ao','环境遮蔽');check('taa','时间抗锯齿');check('aerial','空气透视');check('bloom','高光泛光');check('showStats','显示帧率与实际分辨率');
  const note=document.createElement('p');note.className='settings-info';note.textContent=`当前场景档位：${{high:'高',med:'中',low:'低'}[opts.tier]}。画面开关即时生效；细节档位在重载后生效。\n自动性能预算可能暂时减少反射、环境遮蔽与阴影更新频率。`;if(opts.unavailableFeatures?.length)note.textContent+='\n回忆显形期间不启用环境遮蔽与屏幕空间反射，避免未重现物件提前产生遮挡。';panes.get('画面')!.append(note);
  const resolution=document.createElement('output');resolution.className='settings-info';resolution.setAttribute('aria-label','实际渲染分辨率');panes.get('画面')!.append(resolution);
  if(opts.exploration)range('hazeStrength','大气雾强度','0','1','.05','环境');
  if(opts.weather){const weather=document.createElement('select');weather.setAttribute('aria-label','世界天气');for(const [value,text]of [['clear','晴'],['overcast','多云'],['lightRain','小雨'],['heavyRain','大雨'],['drizzleMist','雾'],['snow','雪'],['dusk','黄昏'],['night','夜晚']]){const o=document.createElement('option');o.value=value;o.textContent=text;weather.append(o);}weather.onchange=()=>opts.weather!(weather.value as WeatherKind);row('环境','天气',weather);}
  if(opts.time){const time=document.createElement('input');time.type='range';time.min='0';time.max='24';time.step='.25';time.value='14';time.setAttribute('aria-label','太阳时刻');const clock=document.createElement('output');clock.textContent='14:00';time.oninput=()=>{clock.textContent=`${Math.floor(+time.value).toString().padStart(2,'0')}:${Math.round((+time.value%1)*60).toString().padStart(2,'0')}`;opts.time!(+time.value);};row('环境','太阳时刻',time);panes.get('环境')!.append(clock);}
  else {const p=document.createElement('p');p.className='settings-info';p.textContent='回忆中的太阳方向由场景设置与剧情镜头决定。';panes.get('环境')!.append(p);}
  let releaseMusic:(()=>void)|undefined;
  if(opts.music){const volume=document.createElement('input');volume.type='range';volume.min='0';volume.max='1';volume.step='.01';volume.setAttribute('aria-label','背景音乐音量');volume.value=String(opts.music.level);volume.oninput=()=>opts.music!.setVolume(+volume.value);row('声音','背景音乐音量',volume);
    const play=document.createElement('button');play.type='button';play.onclick=()=>opts.music!.toggle();panes.get('声音')!.append(play);releaseMusic=opts.music.subscribe(()=>{volume.value=String(opts.music!.level);play.textContent=opts.music!.playing?'暂停配乐':'播放配乐';});
  }
  range('sfxVolume','界面音效音量','0','1','.05','声音');range('sensitivity','视角灵敏度','.25','2.5','.05','操作');if(!opts.exploration)check('invertY','回忆视角反转 Y 轴','操作');if(opts.exploration){range('exploreFov','探索视野角度','40','75','1','操作');range('followDistance','第三人称跟随距离','2.5','12','.1','操作');}
  const footer=document.createElement('div');footer.className='settings-footer';const reload=document.createElement('button');reload.type='button';reload.textContent='应用细节档位并重载';reload.onclick=()=>window.location.reload();const reset=document.createElement('button');reset.type='button';reset.textContent='恢复默认';reset.onclick=resetGameSettings;const close=document.createElement('button');close.type='button';close.textContent='返回游戏';
  function open(value:boolean):void {panel.hidden=!value;toggle.setAttribute('aria-expanded',String(value));opts.onOpen?.(value);if(value){panel.scrollTop=0;Array.from(tabs.values()).find(tab=>tab.getAttribute('aria-selected')==='true')?.focus({preventScroll:true});}else toggle.focus();}
  toggle.onclick=()=>open(panel.hidden);close.onclick=()=>open(false);panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.stopPropagation();open(false);}if(event.key==='Tab'){const focusable=Array.from(panel.querySelectorAll<HTMLElement>('button,input,select')).filter(el=>!el.closest('[hidden]'));const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}});
  footer.append(reload,reset,close);const head=document.createElement('div');head.className='settings-head';head.append(heading,nav);panel.append(head,...panes.values(),footer);root.append(style,toggle,panel);host.append(root);
  root.addEventListener('pointerdown',event=>event.stopPropagation());root.addEventListener('keydown',event=>{if(panel.hidden)return;if(event.key!=='Escape')event.stopPropagation();});
  const release=subscribeGameSettings(settings=>{for(const [key,input]of controls){if(input instanceof HTMLInputElement&&input.type==='checkbox')input.checked=!!settings[key];else input.value=String(settings[key]);}});
  return Object.assign(()=>{release();releaseMusic?.();root.remove();},{setResolution(w:number,h:number){root.style.setProperty('--world-settings-height',`${host.clientHeight||innerHeight}px`);resolution.textContent=`实际绘制 ${w}×${h} 像素`;}});
}
