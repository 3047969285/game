import type { WeatherKind } from './weather';
/** Player-facing weather/time control; render diagnostics live only in tools/. */
export function attachWeatherPanel(host:HTMLElement,weather:(kind:WeatherKind)=>void,time:(hour:number)=>void):()=>void {
  const root=document.createElement('div');root.style.cssText='position:absolute;left:14px;top:54px;z-index:8;color:#e6f1fa;font:12px system-ui';
  const toggle=document.createElement('button');toggle.textContent='天气';toggle.setAttribute('aria-expanded','false');toggle.style.cssText='background:#182b3ce8;color:inherit;border:1px solid #688298;border-radius:8px;padding:7px 12px';
  const panel=document.createElement('div');panel.hidden=true;panel.style.cssText='margin-top:6px;padding:10px;background:#142535ed;border:1px solid #688298;border-radius:8px;display:none;gap:8px;width:165px';
  const label=document.createElement('label');label.textContent='天气 ';const select=document.createElement('select');select.setAttribute('aria-label','世界天气');
  for(const [value,text]of [['clear','晴'],['overcast','多云'],['lightRain','小雨'],['heavyRain','大雨'],['drizzleMist','雾'],['snow','雪'],['dusk','黄昏'],['night','夜晚']]){const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o);}
  select.onchange=()=>weather(select.value as WeatherKind);label.append(select);
  const hours=document.createElement('input');hours.type='range';hours.min='0';hours.max='24';hours.step='.25';hours.value='14';hours.setAttribute('aria-label','太阳时刻');hours.style.width='140px';
  const output=document.createElement('label');output.textContent='太阳时刻 14:00';hours.oninput=()=>{const h=+hours.value;output.textContent=`太阳时刻 ${Math.floor(h).toString().padStart(2,'0')}:${Math.round((h%1)*60).toString().padStart(2,'0')}`;time(h);};
  panel.append(label,output,hours);toggle.onclick=()=>{panel.hidden=!panel.hidden;panel.style.display=panel.hidden?'none':'grid';toggle.setAttribute('aria-expanded',String(!panel.hidden));};
  root.append(toggle,panel);host.append(root);return()=>root.remove();
}
