/* VidyaVerse University (v2) - game: Bubble Pop ABC (bubble-pop-abc). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="bubble-pop-abc";
var CSS=".vv-bubble-pop-abc-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-bubble-pop-abc-root *,.vv-bubble-pop-abc-root *::before,.vv-bubble-pop-abc-root *::after{box-sizing:border-box}.vv-bubble-pop-abc-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-bubble-pop-abc-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-bubble-pop-abc-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-bubble-pop-abc-ttx{min-width:0}.vv-bubble-pop-abc-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-bubble-pop-abc-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-bubble-pop-abc-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-bubble-pop-abc-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-bubble-pop-abc-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-bubble-pop-abc-seg .vv-bubble-pop-abc-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-bubble-pop-abc-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-bubble-pop-abc-btn:hover{background:rgba(255,255,255,.13)}.vv-bubble-pop-abc-btn:active{transform:scale(.95)}.vv-bubble-pop-abc-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-bubble-pop-abc-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-bubble-pop-abc-btn[aria-pressed=true],.vv-bubble-pop-abc-seg .vv-bubble-pop-abc-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-bubble-pop-abc-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-bubble-pop-abc-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-bubble-pop-abc-ghost{background:rgba(255,255,255,.04)}.vv-bubble-pop-abc-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-bubble-pop-abc-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-bubble-pop-abc-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-bubble-pop-abc-how[hidden]{display:none}.vv-bubble-pop-abc-how p{margin:0 0 6px}.vv-bubble-pop-abc-how ol{margin:4px 0 4px 20px;padding:0}.vv-bubble-pop-abc-how li{margin:3px 0}.vv-bubble-pop-abc-note{color:var(--mu);font-size:13px}.vv-bubble-pop-abc-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-bubble-pop-abc-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-bubble-pop-abc-chip b{color:var(--a2);font-weight:750}.vv-bubble-pop-abc-stage{position:relative;min-height:280px}.vv-bubble-pop-abc-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-bubble-pop-abc-fb.vv-bubble-pop-abc-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-bubble-pop-abc-fb.vv-bubble-pop-abc-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-bubble-pop-abc-fb.vv-bubble-pop-abc-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-bubble-pop-abc-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-bubble-pop-abc-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-bubble-pop-abc-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-bubble-pop-abc-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-bubble-pop-abc-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-bubble-pop-abc-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-bubble-pop-abc-card h4{margin:0 0 8px;font-size:22px}.vv-bubble-pop-abc-card p{margin:6px 0}@keyframes vv-bubble-pop-abc-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-bubble-pop-abc-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-bubble-pop-abc-shake{animation:vv-bubble-pop-abc-shake .35s}.vv-bubble-pop-abc-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-bubble-pop-abc-big{font-size:30px;font-weight:800}.vv-bubble-pop-abc-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-bubble-pop-abc-grid{display:grid;gap:10px}.vv-bubble-pop-abc-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-bubble-pop-abc-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-bubble-pop-abc-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-bubble-pop-abc-mu{color:var(--mu)}.vv-bubble-pop-abc-tiny .vv-bubble-pop-abc-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-bubble-pop-abc-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-bubble-pop-abc-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-bubble-pop-abc-root{border-radius:16px;font-size:15px}.vv-bubble-pop-abc-btn{padding:8px 10px}.vv-bubble-pop-abc-goal{font-size:13px}.vv-bubble-pop-abc-seg .vv-bubble-pop-abc-btn{padding:6px 9px}}@media (min-width:1800px){.vv-bubble-pop-abc-root{font-size:19px}.vv-bubble-pop-abc-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-bubble-pop-abc-root *{animation:none!important;transition:none!important}}.vv-bubble-pop-abc-rm *{animation:none!important;transition:none!important}.vv-bubble-pop-abc-root{--a:#38bdf8;--a2:#f472b6;--g1:rgba(56,189,248,.35);--g2:rgba(244,114,182,.28);--bg1:#082f49;--bg2:#1e1b4b}.vv-bubble-pop-abc-prompt{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:12px}.vv-bubble-pop-abc-pe{font-size:clamp(44px,9vw,72px);line-height:1;filter:drop-shadow(0 8px 16px rgba(0,0,0,.4))}.vv-bubble-pop-abc-pt{font-size:clamp(20px,3.4vw,32px);font-weight:800;flex:1 1 180px}.vv-bubble-pop-abc-pt b{display:inline-block;min-width:1.2em;text-align:center;padding:0 .2em;border-radius:12px;background:linear-gradient(135deg,var(--a),var(--a2));color:#0b1020}.vv-bubble-pop-abc-cvw{cursor:pointer}";
var DATA={"abc":[["A","apple","🍎"],["B","ball","⚽"],["C","cat","🐱"],["D","dog","🐶"],["E","egg","🥚"],["F","fish","🐟"],["G","grapes","🍇"],["H","hat","🎩"],["I","insect","🐞"],["J","juice","🧃"],["K","kite","🪁"],["L","lion","🦁"],["M","mango","🥭"],["N","nose","👃"],["O","octopus","🐙"],["P","parrot","🦜"],["Q","queen","👸"],["R","rabbit","🐇"],["S","sun","☀️"],["T","tiger","🐯"],["U","umbrella","☂️"],["V","van","🚐"],["W","watch","⌚"],["X","box","📦"],["Y","yo-yo","🪀"],["Z","zebra","🦓"]],"levels":["ABCDEF","GHIJKLM","NOPQRS","TUVWXYZ"]};
function mk(el,api){
api=api||{};
var P='vv-'+ID,K={P:P,api:api};
var L=[],T=[],R=[],O=[],C=[];
var mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):null;
K.rm=!!api.reducedMotion||!!(mq&&mq.matches);
K.lp=!!api.lowPower;
K.mode=api.mode||'kids';
K.tiny=K.mode==='tiny';
if(!document.getElementById(P+'-css')){
var st=document.createElement('style');
st.id=P+'-css';
st.textContent=CSS;
(document.head||document.documentElement).appendChild(st);
}
K.c=function(s){return String(s).split(' ').filter(Boolean).map(function(x){return P+'-'+x;}).join(' ');};
K.on=function(t,e,f,o){t.addEventListener(e,f,o||false);L.push([t,e,f,o||false]);return f;};
K.after=function(ms,f){
var id=setTimeout(function(){var i=T.indexOf(id);if(i>=0)T.splice(i,1);f();},ms);
T.push(id);return id;
};
K.every=function(ms,f){var id=setInterval(f,ms);T.push(id);return id;};
K.clear=function(id){clearTimeout(id);clearInterval(id);var i=T.indexOf(id);if(i>=0)T.splice(i,1);};
K.loop=function(f){
var h={on:true,id:0,last:0};
h.stop=function(){h.on=false;cancelAnimationFrame(h.id);var i=R.indexOf(h);if(i>=0)R.splice(i,1);};
function tick(t){
if(!h.on)return;
var dt=h.last?Math.min(0.05,(t-h.last)/1000):0.016;
h.last=t;f(dt,t);
if(h.on)h.id=requestAnimationFrame(tick);
}
h.id=requestAnimationFrame(tick);R.push(h);return h;
};
K.cleanup=function(f){C.push(f);};
K.h=function(tag,a,kids){
var e=document.createElement(tag),k,v,ev;
if(a)for(k in a){
if(!Object.prototype.hasOwnProperty.call(a,k))continue;
v=a[k];
if(v==null||v===false)continue;
if(k==='c')e.className=K.c(v);
else if(k==='text')e.textContent=v;
else if(k==='on'){for(ev in v){if(K.track===false)e.addEventListener(ev,v[ev]);else K.on(e,ev,v[ev]);}}
else if(k==='style')e.style.cssText=v;
else e.setAttribute(k,v===true?'':String(v));
}
if(kids!=null){
if(!Array.isArray(kids))kids=[kids];
kids.forEach(function(ch){
if(ch==null||ch===false)return;
e.appendChild(typeof ch==='string'||typeof ch==='number'?document.createTextNode(String(ch)):ch);
});
}
return e;
};
K.btn=function(label,cls,fn,attrs){
var a=attrs||{};
a.type='button';a.c='btn'+(cls?' '+cls:'');a.on={click:fn};
return K.h('button',a,label);
};
K.sound=function(n){try{if(api.sound)api.sound(n);}catch(e){}};
K.say=function(s){try{if(api.say)api.say(s);}catch(e){}};
K.award=function(x,r){try{if(api.award)api.award(x,r);}catch(e){}};
K.done=function(p){try{if(api.done)api.done(Math.max(0,Math.min(100,Math.round(p))));}catch(e){}};
K.ri=function(a,b){return a+Math.floor(Math.random()*(b-a+1));};
K.pick=function(a){return a[Math.floor(Math.random()*a.length)];};
K.shuffle=function(a){
a=a.slice();
for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}
return a;
};
K.clamp=function(v,a,b){return v<a?a:v>b?b:v;};
K.rr=function(g,x,y,w,h,r){
r=Math.min(r,w/2,h/2);
g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);
g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);
g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath();
};
K.canvas=function(parent,ratio,draw,minH,maxH){
var wrap=K.h('div',{c:'cvw'}),cv=K.h('canvas');
var o={c:cv,x:cv.getContext('2d'),w:320,h:200,dpr:1,draw:draw,wrap:wrap,lw:-1};
wrap.appendChild(cv);parent.appendChild(wrap);
o.fit=function(force){
var w=wrap.clientWidth||parent.clientWidth||320;
var h=Math.round(w*ratio);
if(minH)h=Math.max(minH,h);
if(maxH)h=Math.min(maxH,h);
var d=Math.min(2,window.devicePixelRatio||1);
if(K.lp)d=Math.min(d,1.5);
if(!force&&w===o.lw&&h===o.h&&d===o.dpr)return;
o.lw=w;
wrap.style.height=h+'px';
cv.width=Math.round(w*d);cv.height=Math.round(h*d);
o.w=w;o.h=h;o.dpr=d;
o.x.setTransform(d,0,0,d,0,0);
if(o.draw)o.draw(o);
};
o.pt=function(e){
var r=cv.getBoundingClientRect();
return{x:(e.clientX-r.left)*(o.w/(r.width||1)),y:(e.clientY-r.top)*(o.h/(r.height||1))};
};
if(window.ResizeObserver){var ro=new ResizeObserver(function(){o.fit();});ro.observe(wrap);O.push(ro);}
else K.on(window,'resize',function(){o.fit();});
o.fit(true);
K.after(30,function(){o.fit();});
return o;
};
var fxc=null,fxp=[],fxl=null,fxw=0,fxh=0,fxd=1;
K.burst=function(x,y,n,cols){
if(K.rm||!K.root)return;
n=Math.round((n||26)*(K.lp?0.35:1));
if(!fxc){fxc=K.h('canvas',{c:'fx','aria-hidden':'true'});K.root.appendChild(fxc);}
fxw=K.root.clientWidth;fxh=K.root.clientHeight;fxd=Math.min(2,window.devicePixelRatio||1);
if(fxc.width!==Math.round(fxw*fxd)||fxc.height!==Math.round(fxh*fxd)){fxc.width=Math.round(fxw*fxd);fxc.height=Math.round(fxh*fxd);}
cols=cols||['#ffd166','#06d6a0','#ef476f','#4cc9f0','#c77dff'];
for(var i=0;i<n;i++){
var a=Math.random()*6.283,s=110+Math.random()*260;
fxp.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-140,life:1,r:2+Math.random()*4,c:cols[i%cols.length],rot:Math.random()*6});
}
if(!fxl)fxl=K.loop(function(dt){
var g=fxc.getContext('2d');
g.setTransform(fxd,0,0,fxd,0,0);g.clearRect(0,0,fxw,fxh);
for(var j=fxp.length-1;j>=0;j--){
var p=fxp[j];
p.life-=dt*0.85;
if(p.life<=0){fxp.splice(j,1);continue;}
p.vy+=540*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=dt*8;
g.globalAlpha=Math.min(1,p.life*1.6);g.fillStyle=p.c;
g.save();g.translate(p.x,p.y);g.rotate(p.rot);g.fillRect(-p.r,-p.r/2,p.r*2,p.r);g.restore();
}
g.globalAlpha=1;
if(!fxp.length){fxl.stop();fxl=null;g.clearRect(0,0,fxw,fxh);}
});
};
K.rel=function(node){
if(!K.root)return{x:0,y:0};
var a=node.getBoundingClientRect(),b=K.root.getBoundingClientRect();
return{x:a.left-b.left+a.width/2,y:a.top-b.top+a.height/2};
};
K.stars=function(p){var n=p>=90?3:p>=60?2:p>0?1:0;return'★★★'.slice(0,n)+'☆☆☆'.slice(0,3-n);};
K.shell=function(o){
var S={mode:'guided',diff:o.diff0||0};
var root=K.h('div',{c:'root'+(K.tiny?' tiny':'')+(K.rm?' rm':'')+(K.lp?' lp':''),tabindex:'-1',role:'region','aria-label':o.title});
K.root=root;
var how=K.h('div',{c:'how',hidden:true},[
K.h('p',null,[K.h('strong',null,'Goal: '),o.goal]),
K.h('ol',null,o.how.map(function(t){return K.h('li',null,t);})),
o.note?K.h('p',{c:'note'},o.note):null
]);
function seg(items,cur,label,fn){
var g=K.h('div',{c:'seg',role:'group','aria-label':label});
var bs=items.map(function(t,i){
var b=K.btn(t,'',function(){
bs.forEach(function(x,j){x.setAttribute('aria-pressed',j===i?'true':'false');});
fn(i);
},{'aria-pressed':i===cur?'true':'false'});
g.appendChild(b);return b;
});
g.bs=bs;return g;
}
var modeSeg=seg(['🎯 Guided','🎮 Free play'],0,'Mode',function(i){S.mode=i?'free':'guided';K.sound('tap');o.onChange(S,'mode');});
var diffSeg=o.noDiff?null:seg(o.diffs||['Easy','Medium','Hard'],S.diff,'Difficulty',function(i){S.diff=i;K.sound('tap');o.onChange(S,'diff');});
var helpB=K.btn('?','ghost',function(){
how.hidden=!how.hidden;helpB.setAttribute('aria-expanded',how.hidden?'false':'true');K.sound('tap');
},{'aria-label':'How to play','aria-expanded':'false',title:'How to play'});
var resetB=K.btn('↺ Reset','ghost',function(){K.sound('whoosh');o.onChange(S,'reset');},{title:'Start again'});
var top=K.h('div',{c:'top'},[
K.h('div',{c:'ttl'},[K.h('span',{c:'ico','aria-hidden':'true'},o.icon),K.h('div',{c:'ttx'},[K.h('h3',null,o.title),K.h('p',{c:'goal'},o.goal)])]),
K.h('div',{c:'bar'},[modeSeg,diffSeg,resetB,helpB])
]);
var hud=K.h('div',{c:'hud'});
var stage=K.h('div',{c:'stage'});
var fb=K.h('div',{c:'fb info','aria-live':'polite',role:'status'},o.hello||'Tap ? for how to play.');
root.appendChild(top);root.appendChild(how);root.appendChild(hud);root.appendChild(stage);root.appendChild(fb);
el.appendChild(root);
S.root=root;S.stage=stage;S.how=how;S.hud=hud;
var chips={};
S.chip=function(k,label,val){
if(!chips[k]){chips[k]=K.h('span',{c:'chip'});hud.appendChild(chips[k]);}
chips[k].textContent='';
chips[k].appendChild(document.createTextNode(label+' '));
chips[k].appendChild(K.h('b',null,String(val)));
};
S.clearChips=function(){hud.textContent='';chips={};};
S.fb=function(t,kind){fb.textContent=t;fb.className=K.c('fb '+(kind||'info'));};
S.setDiff=function(i){S.diff=i;if(diffSeg)diffSeg.bs.forEach(function(x,j){x.setAttribute('aria-pressed',j===i?'true':'false');});};
S.setMode=function(m){S.mode=m;modeSeg.bs.forEach(function(x,j){x.setAttribute('aria-pressed',((j===1)===(m==='free'))?'true':'false');});};
S.clearStage=function(){stage.textContent='';};
S.card=function(title,lines,btns){
var ov=K.h('div',{c:'ov'}),cd=K.h('div',{c:'card',role:'dialog','aria-label':title});
cd.appendChild(K.h('h4',null,title));
(lines||[]).forEach(function(l){cd.appendChild(typeof l==='string'?K.h('p',null,l):l);});
var row=K.h('div',{c:'row'});
(btns||[]).forEach(function(b){row.appendChild(K.btn(b[0],b[2]||'pri',function(){if(ov.parentNode)ov.parentNode.removeChild(ov);b[1]();}));});
cd.appendChild(row);ov.appendChild(cd);stage.appendChild(ov);
var f=row.querySelector('button');
if(f){try{f.focus({preventScroll:true});}catch(e){f.focus();}}
return ov;
};
S.finish=function(pct,lines,again,free){
pct=Math.max(0,Math.min(100,Math.round(pct)));
K.done(pct);
K.sound(pct>=60?'win':'good');
var r=root.getBoundingClientRect();
K.burst(r.width/2,r.height/3,60);
S.card(pct>=60?'Course complete! 🎉':'Good effort! 💪',[K.h('div',{c:'stars','aria-label':'Score '+pct+' percent'},K.stars(pct)),K.h('p',{c:'big'},pct+'%')].concat(lines||[]),
[['↺ Play again',again],['🎮 Free play',free,'ghost']]);
};
return S;
};
K.destroy=function(){
C.forEach(function(f){try{f();}catch(e){}});
R.slice().forEach(function(h){h.stop();});
T.forEach(function(id){clearTimeout(id);clearInterval(id);});
O.forEach(function(ob){try{ob.disconnect();}catch(e){}});
L.forEach(function(l){try{l[0].removeEventListener(l[1],l[2],l[3]);}catch(e){}});
L=[];T=[];R=[];O=[];C=[];fxp=[];
if(K.root&&K.root.parentNode)K.root.parentNode.removeChild(K.root);
K.root=null;
};
return K;
}
var G=window.VVGames=window.VVGames||{list:[],register:function(d){this.list.push(d);}};
G.register({
id:ID,
title:"Bubble Pop ABC",
icon:"🎈",
faculty:"early",
bands:["toddler","play","prek","primary"],
summary:"Pop floating bubbles to learn the alphabet: match big letters, then small letters, then the first sound of a picture word — with gentle, no-fail feedback.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},bub=[],loop=null,peEl,ptEl,T=0,rings=[];
var ABC=DATA.abc;
function info(ch){for(var i=0;i<ABC.length;i++)if(ABC[i][0]===ch.toUpperCase())return ABC[i];return ABC[0];}
function showCh(ch){return S.diff===0?ch.toUpperCase():(S.mode==='free'&&S.diff===2?(Math.random()<0.5?ch.toUpperCase():ch.toLowerCase()):ch.toLowerCase());}
function radius(){var r=K.clamp(cv.w*0.075,30,64);return K.tiny?r*1.25:r;}
function count(){var n=K.tiny?4:[5,6,7][S.diff];if(K.lp)n=Math.max(3,n-2);return n;}
function letterFor(force){
if(S.mode==='guided'&&st.target&&(force||Math.random()<0.34))return st.target;
var pool=S.mode==='guided'?DATA.levels[st.li]:'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if(Math.random()<0.3)pool='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
return pool.charAt(K.ri(0,pool.length-1));
}
function spawn(b,i,initial){
var r=radius(),n=count();
b.r=r*(0.9+Math.random()*0.2);b.ch=letterFor(false);b.pop=0;b.wob=0;b.ph=Math.random()*6.28;
b.vy=(K.tiny?26:[30,42,56][S.diff])*(0.8+Math.random()*0.4);
if(K.rm){var cols=Math.min(n,Math.max(2,Math.floor(cv.w/(r*2.4))));var row=Math.floor(i/cols),col=i%cols;b.x0=(col+0.5)*cv.w/cols;b.y=40+r+row*r*2.5+(col%2)*r*0.4;}
else{b.x0=r+Math.random()*(cv.w-2*r);b.y=initial?cv.h*(0.3+0.8*Math.random())+r:cv.h+r+Math.random()*80;}
b.x=b.x0;b.disp=showCh(b.ch);
return b;
}
function ensureTarget(){
if(S.mode!=='guided'||!st.target)return;
var has=bub.some(function(b){return b.ch===st.target&&!b.pop;});
if(!has){var lowest=bub.slice().sort(function(a,c){return c.y-a.y;})[0];if(lowest){lowest.ch=st.target;lowest.disp=showCh(st.target);}}
}
function fill(){bub=[];for(var i=0;i<count();i++)bub.push(spawn({},i,true));ensureTarget();}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var sea=g.createLinearGradient(0,0,0,h);sea.addColorStop(0,'#0c4a6e');sea.addColorStop(0.6,'#155e75');sea.addColorStop(1,'#134e4a');g.fillStyle=sea;g.fillRect(0,0,w,h);
if(!K.lp){g.globalAlpha=0.08;g.fillStyle='#fff';for(var k=0;k<5;k++){g.beginPath();g.moveTo(w*(0.1+k*0.2)+Math.sin(T*0.5+k)*20,0);g.lineTo(w*(0.18+k*0.2),0);g.lineTo(w*(0.05+k*0.22),h);g.lineTo(w*(k*0.22-0.04),h);g.fill();}g.globalAlpha=1;}
g.fillStyle='rgba(16,185,129,.5)';g.beginPath();g.moveTo(0,h);for(var x=0;x<=w;x+=20)g.lineTo(x,h-14-Math.sin(x*0.03+T)*5);g.lineTo(w,h);g.fill();
bub.forEach(function(b){
if(b.pop)return;
var s=1+Math.sin(b.wob*30)*0.12*b.wob,r=b.r*s;
var gr=g.createRadialGradient(b.x-r*0.35,b.y-r*0.4,r*0.1,b.x,b.y,r);
gr.addColorStop(0,'rgba(255,255,255,.85)');gr.addColorStop(0.25,'rgba(186,230,253,.35)');gr.addColorStop(0.85,'rgba(244,114,182,.25)');gr.addColorStop(1,'rgba(255,255,255,.7)');
g.fillStyle=gr;g.beginPath();g.arc(b.x,b.y,r,0,6.283);g.fill();
g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.stroke();
g.fillStyle='#0b1020';g.font='900 '+Math.round(r*0.95)+'px "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif';g.textAlign='center';g.textBaseline='middle';
g.fillText(b.disp,b.x,b.y+r*0.05);
});
g.textBaseline='alphabetic';
rings.forEach(function(rg){g.strokeStyle='rgba(255,255,255,'+rg.a+')';g.lineWidth=3;g.beginPath();g.arc(rg.x,rg.y,rg.r,0,6.283);g.stroke();if(rg.t){g.globalAlpha=rg.a;g.font='700 '+Math.round(rg.s)+'px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif';g.textAlign='center';g.fillText(rg.t,rg.x,rg.y-rg.r*0.2);g.globalAlpha=1;}});
}
function step(dt){
T+=dt;
bub.forEach(function(b,i){
if(b.wob>0)b.wob=Math.max(0,b.wob-dt*1.5);
if(b.pop){b.pop-=dt;if(b.pop<=0){spawn(b,i,false);if(K.rm)b.pop=0;ensureTarget();}return;}
if(K.rm)return;
b.y-=b.vy*dt;b.x=b.x0+Math.sin(T*1.3+b.ph)*b.r*0.4;
if(b.y<-b.r){spawn(b,i,false);ensureTarget();}
});
rings=rings.filter(function(rg){rg.r+=dt*120;rg.a-=dt*1.2;rg.s=(rg.s||30)+dt*10;return rg.a>0;});
cv.draw(cv);
}
function prompt(){
peEl.textContent='';ptEl.textContent='';
if(S.mode==='free'){peEl.textContent='🎈';ptEl.appendChild(document.createTextNode('Pop any bubble to hear its letter!'));return;}
var inf=info(st.target);
if(S.diff===2){peEl.textContent=inf[2];ptEl.appendChild(document.createTextNode(inf[1]+' — pop its first letter!'));if(st.target==='X')ptEl.textContent='box — pop the letter at the END!';K.say(st.target==='X'?'Box ends with x. Pop x!':inf[1]+'. Which letter does '+inf[1]+' start with?');}
else{peEl.textContent=inf[2];ptEl.appendChild(document.createTextNode('Pop '));ptEl.appendChild(K.h('b',null,S.diff===0?st.target:st.target+' '+st.target.toLowerCase()));ptEl.appendChild(document.createTextNode(S.diff===1?' (small letter)':''));K.say('Pop '+st.target+'! '+st.target+' is for '+inf[1]+'.');}
}
function newTarget(){
var set=DATA.levels[st.li],t;if(S.diff===2)set=set.replace('X','');
do{t=set.charAt(K.ri(0,set.length-1));}while(t===st.target&&set.length>1);
st.target=t;prompt();ensureTarget();
}
function hit(b){
var inf=info(b.ch);
if(S.mode==='free'){
popB(b,inf);K.say(b.ch+'. '+b.ch+' is for '+inf[1]+(b.ch==='X'?'. Box ends with x.':'.'));
S.fb(b.ch+' '+b.ch.toLowerCase()+' — '+inf[2]+' '+inf[1],'good');st.popped++;hud();
if(st.popped%10===0)K.award(2,'Bubble Pop free play');
return;
}
if(b.ch===st.target){
popB(b,info(st.target));st.good++;st.lvGood++;K.sound('good');
S.fb(['Yay! ','Super! ','Well done! ','Pop! '][K.ri(0,3)]+st.target+' '+st.target.toLowerCase()+' — '+info(st.target)[1],'good');
hud();
if(st.lvGood>=5)return levelUp();
K.after(400,newTarget);
}else{
b.wob=1;st.bad++;K.sound('tap');
K.say('That is '+b.ch+'. Find '+st.target+'!');
S.fb('That bubble is '+b.disp+'. Look for '+(S.diff===2?'the letter '+info(st.target)[1]+' starts with':showCh(st.target))+'!','info');
hud();
}
}
function popB(b,inf){
b.pop=K.rm?0.25:0.6;K.sound('pop');
rings.push({x:b.x,y:b.y,r:b.r,a:1,t:inf[2],s:b.r});
var rc=cv.c.getBoundingClientRect(),rr=K.root.getBoundingClientRect();
K.burst(b.x*rc.width/cv.w+rc.left-rr.left,b.y*rc.height/cv.h+rc.top-rr.top,14,['#bae6fd','#f9a8d4','#fff','#fde68a']);
if(K.rm)cv.draw(cv);
}
function levelUp(){
st.sc.push(st.lvGood/Math.max(1,st.lvGood+st.lvBad()));
K.award(5,'Bubble Pop level '+(st.li+1));K.sound('win');
if(st.li+1>=DATA.levels.length){var pct=100*st.sc.reduce(function(a,v){return a+v;},0)/st.sc.length;S.finish(Math.max(pct,50),['You popped '+st.good+' letters!','Sing the ABC song together and point to each letter.'],guided,free);return;}
S.card('Level '+(st.li+1)+' done! 🎉',['Next letters: '+DATA.levels[st.li+1].split('').join(' ')],[['▶ Next',function(){st.li++;st.lvGood=0;st.lvStartBad=st.bad;fill();newTarget();hud();}]]);
}
function hud(){
S.clearChips();
if(S.mode==='guided'){S.chip('l','Level',(st.li+1)+'/'+DATA.levels.length);S.chip('g','Popped',st.lvGood+'/5');}
else S.chip('p','Popped',st.popped);
}
function onDown(e){
var p=cv.pt(e),best=null,bd=1e9;
bub.forEach(function(b){if(b.pop)return;var d=Math.hypot(b.x-p.x,b.y-p.y);if(d<b.r+(K.tiny?24:12)&&d<bd){bd=d;best=b;}});
if(best){e.preventDefault();hit(best);}
}
function start(mode){
S.setMode(mode);st={li:0,good:0,bad:0,lvGood:0,lvStartBad:0,popped:0,sc:[],target:null};
st.lvBad=function(){return st.bad-st.lvStartBad;};
fill();if(mode==='guided')newTarget();else prompt();
hud();cv.draw(cv);
S.fb(mode==='guided'?'Pop 5 matching bubbles to finish each level. Tap 🔊 to hear again.':'Free play: every bubble tells you its letter and a word.','info');
}
function guided(){start('guided');}
function free(){start('free');}
S=K.shell({title:'Bubble Pop ABC',icon:'🎈',goal:'Pop the bubble with the letter you hear and see.',
diffs:['Big letters','Small letters','First sounds'],
how:['Look at the picture and the letter at the top (tap 🔊 to hear it).','Tap or click the bubble with that letter — or press the letter key on a keyboard.','Pop 5 to finish a level. Wrong bubbles just wobble — try again!','Free play: pop any bubble to hear its letter and a word.'],
note:'Grown-ups: say the letter name and its sound together ("B says /b/ as in ball"). Bubbles stay still when reduced motion is on.',
onChange:function(){if(S.mode==='free')free();else guided();}});
var pr=K.h('div',{c:'prompt'});
peEl=K.h('span',{c:'pe','aria-hidden':'true'});ptEl=K.h('span',{c:'pt','aria-live':'polite'});
pr.appendChild(peEl);pr.appendChild(ptEl);pr.appendChild(K.btn('🔊','ghost',function(){K.sound('tap');prompt();},{'aria-label':'Hear again'}));
S.stage.appendChild(pr);
cv=K.canvas(S.stage,0.62,draw,300,600);
cv.c.setAttribute('role','img');cv.c.setAttribute('aria-label','Floating letter bubbles. Type a letter key to pop it.');
K.on(cv.c,'pointerdown',onDown);
K.on(S.root,'keydown',function(e){
if(e.ctrlKey||e.metaKey||e.altKey||!e.key||e.key.length!==1)return;
var ch=e.key.toUpperCase();if(ch<'A'||ch>'Z'){if(e.key===' '){e.preventDefault();prompt();}return;}
var cands=bub.filter(function(b){return!b.pop&&b.ch===ch;});
e.preventDefault();
if(cands.length)hit(cands[0]);else if(S.mode==='guided'){K.sound('tap');S.fb('No '+ch+' bubble right now — wait for one to float up!','info');}
});
st={sc:[]};
start('guided');
loop=K.loop(step);
return{destroy:function(){K.destroy();}};
}
});
})();
