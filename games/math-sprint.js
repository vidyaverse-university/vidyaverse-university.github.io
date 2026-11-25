/* VidyaVerse University (v2) - game: Math Sprint (math-sprint). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="math-sprint";
var CSS=".vv-math-sprint-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-math-sprint-root *,.vv-math-sprint-root *::before,.vv-math-sprint-root *::after{box-sizing:border-box}.vv-math-sprint-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-math-sprint-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-math-sprint-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-math-sprint-ttx{min-width:0}.vv-math-sprint-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-math-sprint-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-math-sprint-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-math-sprint-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-math-sprint-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-math-sprint-seg .vv-math-sprint-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-math-sprint-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-math-sprint-btn:hover{background:rgba(255,255,255,.13)}.vv-math-sprint-btn:active{transform:scale(.95)}.vv-math-sprint-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-math-sprint-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-math-sprint-btn[aria-pressed=true],.vv-math-sprint-seg .vv-math-sprint-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-math-sprint-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-math-sprint-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-math-sprint-ghost{background:rgba(255,255,255,.04)}.vv-math-sprint-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-math-sprint-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-math-sprint-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-math-sprint-how[hidden]{display:none}.vv-math-sprint-how p{margin:0 0 6px}.vv-math-sprint-how ol{margin:4px 0 4px 20px;padding:0}.vv-math-sprint-how li{margin:3px 0}.vv-math-sprint-note{color:var(--mu);font-size:13px}.vv-math-sprint-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-math-sprint-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-math-sprint-chip b{color:var(--a2);font-weight:750}.vv-math-sprint-stage{position:relative;min-height:280px}.vv-math-sprint-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-math-sprint-fb.vv-math-sprint-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-math-sprint-fb.vv-math-sprint-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-math-sprint-fb.vv-math-sprint-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-math-sprint-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-math-sprint-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-math-sprint-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-math-sprint-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-math-sprint-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-math-sprint-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-math-sprint-card h4{margin:0 0 8px;font-size:22px}.vv-math-sprint-card p{margin:6px 0}@keyframes vv-math-sprint-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-math-sprint-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-math-sprint-shake{animation:vv-math-sprint-shake .35s}.vv-math-sprint-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-math-sprint-big{font-size:30px;font-weight:800}.vv-math-sprint-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-math-sprint-grid{display:grid;gap:10px}.vv-math-sprint-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-math-sprint-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-math-sprint-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-math-sprint-mu{color:var(--mu)}.vv-math-sprint-tiny .vv-math-sprint-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-math-sprint-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-math-sprint-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-math-sprint-root{border-radius:16px;font-size:15px}.vv-math-sprint-btn{padding:8px 10px}.vv-math-sprint-goal{font-size:13px}.vv-math-sprint-seg .vv-math-sprint-btn{padding:6px 9px}}@media (min-width:1800px){.vv-math-sprint-root{font-size:19px}.vv-math-sprint-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-math-sprint-root *{animation:none!important;transition:none!important}}.vv-math-sprint-rm *{animation:none!important;transition:none!important}.vv-math-sprint-root{--a:#ffb703;--a2:#ff5d8f;--g1:rgba(255,183,3,.30);--g2:rgba(255,93,143,.25);--bg1:#120d2b;--bg2:#2a1240}.vv-math-sprint-lay{display:grid;gap:14px;grid-template-columns:1fr}@media (min-width:760px){.vv-math-sprint-lay{grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr)}}.vv-math-sprint-q{font-size:clamp(34px,7vw,64px);font-weight:800;text-align:center;letter-spacing:1px;font-variant-numeric:tabular-nums;margin:6px 0 2px;text-shadow:0 6px 30px rgba(255,183,3,.35)}.vv-math-sprint-ans{min-height:64px;margin:6px auto 10px;max-width:280px;border-radius:16px;border:2px dashed var(--ln);display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;font-variant-numeric:tabular-nums;background:rgba(0,0,0,.25)}.vv-math-sprint-ans.vv-math-sprint-ok{border-color:var(--ok);background:rgba(34,197,94,.18)}.vv-math-sprint-ans.vv-math-sprint-no{border-color:var(--bad);background:rgba(244,63,94,.18)}.vv-math-sprint-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:320px;margin:0 auto}.vv-math-sprint-pad .vv-math-sprint-btn{font-size:24px;min-height:56px}.vv-math-sprint-pad .vv-math-sprint-go{grid-column:1/-1}.vv-math-sprint-tip{font-size:14px;color:var(--mu);margin-top:10px;min-height:2.6em;text-align:center}.vv-math-sprint-lvl{font-size:13px;color:var(--mu);text-align:center;text-transform:uppercase;letter-spacing:1.5px}";
var DATA={"levels":[[{"n":"Count on (sums to 10)","k":"add10","need":5,"time":60},{"n":"Make 10 (sums to 20)","k":"add20","need":6,"time":60},{"n":"Take away within 20","k":"sub20","need":6,"time":60},{"n":"Missing number","k":"miss","need":6,"time":60},{"n":"Mixed sprint","k":"mixE","need":8,"time":60}],[{"n":"×2, ×5, ×10","k":"tab1","need":6,"time":50},{"n":"×3, ×4, ×6","k":"tab2","need":6,"time":50},{"n":"×7, ×8, ×9, ×11, ×12","k":"tab3","need":6,"time":55},{"n":"Division facts","k":"div","need":6,"time":55},{"n":"Mixed sprint","k":"mixM","need":8,"time":55}],[{"n":"2-digit × 1-digit","k":"m2x1","need":5,"time":60},{"n":"Percentages","k":"pct","need":5,"time":60},{"n":"Squares 11–20","k":"sq","need":5,"time":60},{"n":"Negative numbers","k":"neg","need":6,"time":55},{"n":"BODMAS mix","k":"mixH","need":7,"time":60}]]};
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
title:"Math Sprint",
icon:"⚡",
faculty:"school",
bands:["primary","middle","secondary"],
summary:"Race the clock with mental maths — from counting on and times tables to percentages, squares, negatives and BODMAS — with a strategy tip after every answer.",
mount:function(el,api){
var K=mk(el,api);
var LV=DATA.levels,S,cv,st={},tick=null;
var M='\u2212',X='\u00d7',D='\u00f7';
function q(text,a,tip){return{q:text,a:a,tip:tip};}
function neg(n){return n<0?'('+M+Math.abs(n)+')':String(n);}
function gen(k){
var a,b,c,t,r=K.ri;
if(k==='mixE')k=K.pick(['add10','add20','sub20','miss']);
if(k==='mixM')k=K.pick(['tab1','tab2','tab3','div','add20']);
if(k==='mixH')k=K.pick(['m2x1','pct','sq','neg','bod','bod']);
if(k==='add10'){a=r(1,9);b=r(0,10-a);t=Math.max(a,b);return q(a+' + '+b,a+b,'Start at the bigger number ('+t+') and count on '+Math.min(a,b)+'.');}
if(k==='add20'){a=r(3,9);b=r(11-a,9);c=10-a;return q(a+' + '+b,a+b,'Make 10: '+a+' + '+c+' = 10, then 10 + '+(b-c)+' = '+(a+b)+'.');}
if(k==='sub20'){a=r(11,19);b=r(a-9,9);if(b<2)b=2;c=a-10;return q(a+' '+M+' '+b,a-b,'Go back to 10 first: '+a+' '+M+' '+Math.min(c,b)+' = '+(a-Math.min(c,b))+(b>c?', then '+M+' '+(b-c)+' more = '+(a-b):'')+'. Or count up from '+b+' to '+a+'.');}
if(k==='miss'){a=r(2,12);b=r(2,8);return q('? + '+b+' = '+(a+b),a,'Subtraction undoes addition: '+(a+b)+' '+M+' '+b+' = '+a+'.');}
if(k==='tab1'){a=K.pick([2,5,10]);b=r(2,12);return q(a+' '+X+' '+b,a*b,a===5?'×5 is half of ×10: '+b+' × 10 = '+b*10+', half is '+b*5+'.':a===2?'×2 is doubling: '+b+' + '+b+'.':'×10: the digits move one place left (add a zero).');}
if(k==='tab2'){a=K.pick([3,4,6]);b=r(2,12);return q(b+' '+X+' '+a,a*b,a===4?'×4 = double, then double again: '+b*2+' → '+b*4+'.':a===6?'×6 = ×3 doubled: '+b*3+' × 2 = '+b*6+'.':'×3 = double plus one more: '+b*2+' + '+b+'.');}
if(k==='tab3'){a=K.pick([7,8,9,11,12]);b=r(2,12);t=a===9?'×9 = ×10 minus one lot: '+b*10+' '+M+' '+b+' = '+b*9+'.':a===12?'×12 = ×10 + ×2: '+b*10+' + '+b*2+'.':a===11?'×11 = ×10 + ×1: '+b*10+' + '+b+'.':a===8?'×8 = double three times: '+b*2+', '+b*4+', '+b*8+'.':'×7 = ×5 + ×2: '+b*5+' + '+b*2+'.';return q(b+' '+X+' '+a,a*b,t);}
if(k==='div'){a=r(2,12);b=r(2,12);return q(a*b+' '+D+' '+a,b,'Division is the inverse of multiplication: '+a+' × ? = '+a*b+' → '+b+'.');}
if(k==='m2x1'){a=r(12,99);b=r(2,9);return q(a+' '+X+' '+b,a*b,'Split the tens: '+(a-a%10)+' × '+b+' = '+(a-a%10)*b+', '+a%10+' × '+b+' = '+(a%10)*b+', total '+a*b+'.');}
if(k==='pct'){var ps=[[10,10],[20,5],[25,4],[50,2],[5,20],[75,4],[15,20]];var p=K.pick(ps);a=p[1]*r(2,20);if(p[0]===15)a=20*r(2,15);var v=a*p[0]/100;return q(p[0]+'% of '+a,v,p[0]===10?'10% = divide by 10.':p[0]===5?'5% = half of 10%: '+a/10+' ÷ 2.':p[0]===15?'15% = 10% + 5%: '+a/10+' + '+a/20+'.':p[0]===75?'75% = 3 quarters: '+a/4+' × 3.':p[0]+'% = 1/'+p[1]+' → '+a+' ÷ '+p[1]+'.');}
if(k==='sq'){a=r(11,20);c=a-10;return q(a+'²',a*a,a+'² = ('+a+' '+M+' '+c+')('+a+' + '+c+') + '+c+'² = 10 × '+(a+c)+' + '+c*c+' = '+a*a+'.');}
if(k==='neg'){a=r(-12,12);b=r(-12,12);if(!a)a=-3;if(!b)b=4;c=K.pick(['+',M,X]);var v2=c==='+'?a+b:c===M?a-b:a*b;return q(neg(a)+' '+c+' '+neg(b),v2,c===X?'Same signs give +, different signs give '+M+'.':c===M?'Subtracting a number = adding its opposite: '+neg(a)+' + '+neg(-b)+'.':'Think of a number line: start at '+a+', move '+(b<0?'left ':'right ')+Math.abs(b)+'.');}
if(k==='bod'){a=r(2,9);b=r(2,9);c=r(2,9);t=r(0,2);if(t===0)return q(a+' + '+b+' '+X+' '+c,a+b*c,'Multiply first (BODMAS): '+b+' × '+c+' = '+b*c+', then + '+a+'.');if(t===1)return q('('+a+' + '+b+') '+X+' '+c,(a+b)*c,'Brackets first: '+(a+b)+', then × '+c+'.');return q(a*b+' '+M+' '+c+' '+X+' '+b,a*b-c*b,'Multiply first: '+c+' × '+b+' = '+c*b+', then '+a*b+' '+M+' '+c*b+'.');}
return q('1 + 1',2,'');
}
var qEl,ansEl,tipEl,lvlEl;
function draw(o){
var g=o.x,w=o.w,h=o.h;
g.clearRect(0,0,w,h);
var bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#2b1650');bg.addColorStop(1,'#130b29');g.fillStyle=bg;g.fillRect(0,0,w,h);
var ty=h*0.18,th=h*0.36,x0=18,x1=w-34;
g.fillStyle='#c2410c';K.rr(g,x0-8,ty,x1-x0+26,th,14);g.fill();
g.strokeStyle='rgba(255,255,255,.55)';g.setLineDash([10,10]);g.lineWidth=2;
for(var i=1;i<3;i++){g.beginPath();g.moveTo(x0,ty+th*i/3);g.lineTo(x1+10,ty+th*i/3);g.stroke();}
g.setLineDash([]);
for(var j=0;j<8;j++){g.fillStyle=(j%2)?'#fff':'#111';g.fillRect(x1,ty+j*th/8,8,th/8);g.fillStyle=(j%2)?'#111':'#fff';g.fillRect(x1+8,ty+j*th/8,8,th/8);}
var need=S.mode==='free'?30:(st.need||1),prog=Math.min(1,(st.shown||0)/need);
var rx=x0+(x1-x0-20)*prog,ry=ty+th/2;
g.save();g.translate(rx+14,ry);g.scale(-1,1);g.font=Math.round(th*0.62)+'px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🏃',0,2);g.restore();
g.fillStyle='#fff';g.font='600 13px system-ui, sans-serif';g.textAlign='left';g.textBaseline='alphabetic';
g.fillText(S.mode==='free'?(st.correct||0)+' correct':(st.correct||0)+' / '+need+' correct',x0,ty-8);
var tf=st.time?Math.max(0,st.left/st.time):1;
g.fillStyle='rgba(255,255,255,.12)';K.rr(g,x0,8,x1-x0+16,8,4);g.fill();
g.fillStyle=tf>0.3?'#ffd166':'#ff5d8f';K.rr(g,x0,8,(x1-x0+16)*tf,8,4);g.fill();
var gy=ty+th+26,gh=h-gy-22,ts=st.times||[];
g.fillStyle='rgba(255,255,255,.75)';g.font='600 12px system-ui, sans-serif';
g.fillText('Seconds per question',x0,gy-6);
var n=Math.max(10,ts.length),bw=(x1-x0+16)/n,mx=10;
for(var k=0;k<ts.length;k++){
var v=Math.min(mx,ts[k].t),bh=gh*v/mx;
g.fillStyle=ts[k].ok?'#34d399':'#fb7185';
K.rr(g,x0+k*bw+2,gy+gh-bh,Math.max(2,bw-4),bh,3);g.fill();
}
if(ts.length){
var av=ts.reduce(function(s,e){return s+e.t;},0)/ts.length,ay=gy+gh-gh*Math.min(mx,av)/mx;
g.strokeStyle='#ffd166';g.setLineDash([4,4]);g.beginPath();g.moveTo(x0,ay);g.lineTo(x1+16,ay);g.stroke();g.setLineDash([]);
g.fillStyle='#ffd166';g.textAlign='right';g.fillText('avg '+av.toFixed(1)+' s',x1+16,ay-4);
}
g.strokeStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(x0,gy+gh+0.5);g.lineTo(x1+16,gy+gh+0.5);g.stroke();
}
function hud(){
S.clearChips();
if(S.mode==='guided')S.chip('l','Level',(st.li+1)+'/'+LV[S.diff].length);
S.chip('t','⏱',Math.ceil(Math.max(0,st.left))+' s');
S.chip('s','Streak',st.streak||0);
var att=st.correct+st.wrong;
S.chip('a','Accuracy',att?Math.round(100*st.correct/att)+'%':'–');
}
function next(){
st.cur=gen(st.kind);st.input='';st.t0=performance.now();
qEl.textContent=st.cur.q+' = ?';ansEl.textContent='';ansEl.className=K.c('ans');
}
function press(k){
if(!st.running)return;
if(k==='back')st.input=st.input.slice(0,-1);
else if(k==='-')st.input=st.input.charAt(0)==='-'?st.input.slice(1):'-'+st.input;
else if(k==='go')return submit();
else if(st.input.replace('-','').length<6)st.input+=k;
ansEl.textContent=st.input.replace('-',M);
K.sound('tick');
}
function submit(){
if(!st.running||st.input===''||st.input==='-')return;
var v=parseInt(st.input,10),ok=v===st.cur.a,t=(performance.now()-st.t0)/1000;
st.times.push({t:t,ok:ok});if(st.times.length>30)st.times.shift();
if(ok){
st.correct++;st.streak++;K.sound('good');
ansEl.className=K.c('ans ok');
tipEl.textContent=st.streak>=3?'🔥 '+st.streak+' in a row! '+(t<3?'Lightning fast.':''):'✓ '+st.cur.tip;
var p=K.rel(ansEl);K.burst(p.x,p.y,12);
}else{
st.wrong++;st.streak=0;K.sound('bad');
ansEl.className=K.c('ans no');
tipEl.textContent='✗ '+st.cur.q+' = '+String(st.cur.a).replace('-',M)+'. '+st.cur.tip;
S.fb('Not quite — read the tip, then keep going.','bad');
}
hud();cv.draw(cv);
if(S.mode==='guided'&&st.correct>=st.need)return endLevel(true);
K.after(ok?260:700,function(){if(st.running)next();});
}
function startTimer(){
if(tick)K.clear(tick);
var last=performance.now();
tick=K.every(100,function(){
var now=performance.now();st.left-=(now-last)/1000;last=now;
if(st.shown<st.correct)st.shown=K.rm?st.correct:Math.min(st.correct,st.shown+0.12);
if(Math.ceil(st.left)!==st.lastSec){st.lastSec=Math.ceil(st.left);hud();if(st.left<=5&&st.left>0)K.sound('tick');}
cv.draw(cv);
if(st.left<=0){st.left=0;endLevel(false);}
});
}
function begin(kind,need,time){
st.kind=kind;st.need=need;st.time=time;st.left=time;st.correct=0;st.wrong=0;st.streak=0;st.times=[];st.shown=0;st.running=true;
hud();next();startTimer();cv.draw(cv);
try{S.root.focus({preventScroll:true});}catch(e){}
}
function stop(){st.running=false;if(tick){K.clear(tick);tick=null;}}
function endLevel(pass){
stop();st.shown=st.correct;cv.draw(cv);
var att=st.correct+st.wrong,acc=att?st.correct/att:0;
var avg=st.times.length?st.times.reduce(function(s,e){return s+e.t;},0)/st.times.length:0;
var info='Accuracy '+Math.round(acc*100)+'% · average '+avg.toFixed(1)+' s per answer';
if(S.mode==='free'){
K.award(Math.min(30,st.correct*2),'Math Sprint free run');
K.sound('win');
S.card('Time! ⏱',[st.correct+' correct in '+st.time+' s',info,'Beat your own score — accuracy first, speed follows.'],[['↺ Again',function(){begin(st.kind,999,60);}]]);
return;
}
var L=LV[S.diff][st.li];
if(pass){
st.scores[st.li]=acc;K.award(10+5*S.diff,'Math Sprint: '+L.n);
K.sound('win');S.fb('Level passed! '+info,'good');
if(st.li+1>=LV[S.diff].length){
var pct=100*st.scores.reduce(function(s,v){return s+(v||0);},0)/LV[S.diff].length;
S.finish(pct,[info,'You mastered all '+LV[S.diff].length+' levels. Try the next difficulty!'],guided,free);
return;
}
S.card('Level '+(st.li+1)+' cleared! ⚡',[info],[['Next level ▶',function(){st.li++;intro();}]]);
}else{
st.scores[st.li]=Math.max(st.scores[st.li]||0,acc*0.4);
S.fb('Time ran out. '+info,'bad');
S.card('Time\u2019s up ⏱',['You got '+st.correct+' of '+st.need+'. '+info,'Tip: say the strategy in your head — it gets faster with practice.'],[['↺ Retry level',function(){intro();}],['Skip ▶',function(){if(st.li+1<LV[S.diff].length){st.li++;intro();}else S.finish(100*st.scores.reduce(function(s,v){return s+(v||0);},0)/LV[S.diff].length,[],guided,free);},'ghost']]);
}
}
function intro(){
var L=LV[S.diff][st.li];stop();
lvlEl.textContent='Level '+(st.li+1)+' · '+L.n;
st.need=L.need;st.time=L.time;st.left=L.time;st.correct=0;st.wrong=0;st.times=[];st.shown=0;hud();cv.draw(cv);
var ex=gen(L.k);
qEl.textContent='Ready?';ansEl.textContent='';tipEl.textContent='';
S.card('Level '+(st.li+1)+': '+L.n,['Get '+L.need+' correct in '+L.time+' seconds.','Example: '+ex.q+' = '+String(ex.a).replace('-',M),'Strategy: '+ex.tip],[['▶ Go!',function(){K.say('Go!');begin(L.k,L.need,L.time);}]]);
}
function guided(){S.setMode('guided');st.li=0;st.scores=[];intro();}
function free(){
S.setMode('free');stop();
lvlEl.textContent='Free sprint · '+['Easy','Medium','Hard'][S.diff]+' mix · 60 s';
S.fb('Free play: answer as many as you can in 60 seconds.','info');
S.card('60-second sprint',['Mixed '+['Easy','Medium','Hard'][S.diff].toLowerCase()+' questions. Type with the keypad or your keyboard, Enter to check.'],[['▶ Start',function(){begin(['mixE','mixM','mixH'][S.diff],999,60);}]]);
}
S=K.shell({title:'Math Sprint',icon:'⚡',goal:'Answer mental-maths questions quickly and accurately before the timer runs out.',
how:['Pick Guided (5 levels) or Free play, and a difficulty.','Type the answer with the keypad or keyboard (digits, − for minus, Backspace) and press ✓ or Enter.','After each answer you see a strategy tip — use it on the next question.','Guided: reach the target number of correct answers before time runs out to pass a level.'],
note:'Accuracy matters more than speed: a wrong answer does not cost time, but it breaks your streak.',
hello:'Choose a difficulty, then press Go!',
onChange:function(s,why){stop();if(why==='mode'){if(s.mode==='free')free();else guided();}else{if(S.mode==='free')free();else guided();}}});
var lay=K.h('div',{c:'lay'}),left=K.h('div',{c:'panel'}),right=K.h('div');
lvlEl=K.h('div',{c:'lvl'});qEl=K.h('div',{c:'q','aria-live':'polite'},'Ready?');ansEl=K.h('div',{c:'ans','aria-label':'Your answer'});
var pad=K.h('div',{c:'pad'});
['7','8','9','4','5','6','1','2','3','-','0','back'].forEach(function(k){
pad.appendChild(K.btn(k==='back'?'⌫':k==='-'?'±':k,'',function(){press(k);},{'aria-label':k==='back'?'Delete':k==='-'?'Make negative':k}));
});
pad.appendChild(K.btn('✓ Check','pri go',function(){press('go');}));
tipEl=K.h('div',{c:'tip','aria-live':'polite'});
left.appendChild(lvlEl);left.appendChild(qEl);left.appendChild(ansEl);left.appendChild(pad);left.appendChild(tipEl);
lay.appendChild(left);lay.appendChild(right);S.stage.appendChild(lay);
cv=K.canvas(right,0.75,draw,240,420);
K.on(S.root,'keydown',function(e){
if(e.target&&e.target.tagName==='INPUT')return;
var k=e.key;
if(k>='0'&&k<='9'){press(k);e.preventDefault();}
else if(k==='-'||k==='Subtract'){press('-');e.preventDefault();}
else if(k==='Backspace'){press('back');e.preventDefault();}
else if(k==='Enter'&&st.running){press('go');e.preventDefault();}
});
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
