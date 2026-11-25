/* VidyaVerse University (v2) - game: Number Line Jump (number-line-jump). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="number-line-jump";
var CSS=".vv-number-line-jump-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-number-line-jump-root *,.vv-number-line-jump-root *::before,.vv-number-line-jump-root *::after{box-sizing:border-box}.vv-number-line-jump-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-number-line-jump-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-number-line-jump-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-number-line-jump-ttx{min-width:0}.vv-number-line-jump-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-number-line-jump-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-number-line-jump-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-number-line-jump-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-number-line-jump-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-number-line-jump-seg .vv-number-line-jump-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-number-line-jump-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-number-line-jump-btn:hover{background:rgba(255,255,255,.13)}.vv-number-line-jump-btn:active{transform:scale(.95)}.vv-number-line-jump-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-number-line-jump-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-number-line-jump-btn[aria-pressed=true],.vv-number-line-jump-seg .vv-number-line-jump-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-number-line-jump-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-number-line-jump-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-number-line-jump-ghost{background:rgba(255,255,255,.04)}.vv-number-line-jump-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-number-line-jump-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-number-line-jump-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-number-line-jump-how[hidden]{display:none}.vv-number-line-jump-how p{margin:0 0 6px}.vv-number-line-jump-how ol{margin:4px 0 4px 20px;padding:0}.vv-number-line-jump-how li{margin:3px 0}.vv-number-line-jump-note{color:var(--mu);font-size:13px}.vv-number-line-jump-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-number-line-jump-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-number-line-jump-chip b{color:var(--a2);font-weight:750}.vv-number-line-jump-stage{position:relative;min-height:280px}.vv-number-line-jump-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-number-line-jump-fb.vv-number-line-jump-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-number-line-jump-fb.vv-number-line-jump-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-number-line-jump-fb.vv-number-line-jump-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-number-line-jump-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-number-line-jump-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-number-line-jump-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-number-line-jump-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-number-line-jump-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-number-line-jump-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-number-line-jump-card h4{margin:0 0 8px;font-size:22px}.vv-number-line-jump-card p{margin:6px 0}@keyframes vv-number-line-jump-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-number-line-jump-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-number-line-jump-shake{animation:vv-number-line-jump-shake .35s}.vv-number-line-jump-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-number-line-jump-big{font-size:30px;font-weight:800}.vv-number-line-jump-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-number-line-jump-grid{display:grid;gap:10px}.vv-number-line-jump-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-number-line-jump-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-number-line-jump-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-number-line-jump-mu{color:var(--mu)}.vv-number-line-jump-tiny .vv-number-line-jump-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-number-line-jump-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-number-line-jump-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-number-line-jump-root{border-radius:16px;font-size:15px}.vv-number-line-jump-btn{padding:8px 10px}.vv-number-line-jump-goal{font-size:13px}.vv-number-line-jump-seg .vv-number-line-jump-btn{padding:6px 9px}}@media (min-width:1800px){.vv-number-line-jump-root{font-size:19px}.vv-number-line-jump-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-number-line-jump-root *{animation:none!important;transition:none!important}}.vv-number-line-jump-rm *{animation:none!important;transition:none!important}.vv-number-line-jump-root{--a:#4ade80;--a2:#22d3ee;--g1:rgba(74,222,128,.28);--g2:rgba(34,211,238,.25);--bg1:#052e1a;--bg2:#0b3b4a}.vv-number-line-jump-task{font-size:clamp(18px,2.8vw,26px);font-weight:800;margin:0 0 10px;min-height:1.4em}.vv-number-line-jump-ctl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-number-line-jump-ctl .vv-number-line-jump-btn{font-size:20px;min-width:56px}.vv-number-line-jump-read{text-align:center;margin-top:8px;color:var(--mu);font-variant-numeric:tabular-nums}";
var DATA={};
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
title:"Number Line Jump",
icon:"🐸",
faculty:"school",
bands:["primary","middle"],
summary:"Help a frog hop along a number line to place numbers, add and subtract by jumping, cross zero into negatives, and land on fractions and decimals.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},taskEl,readEl,an=null,M='\u2212';
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a||1;}
function fmt(k,den,how){
if(den===1)return(k<0?M:'')+Math.abs(k);
if(how==='dec'){var v=Math.round(k/den*100)/100;return(v<0?M:'')+String(Math.abs(v));}
var s=k<0?M:'',a=Math.abs(k),w=Math.floor(a/den),r=a%den,g=gcd(r,den);
if(!r)return s+w;
return s+(w?w+' ':'')+(r/g)+'/'+(den/g);
}
function L(lo,hi,den,how){return{lo:lo,hi:hi,den:den,how:how||'frac'};}
var TPL=[
[function(){var t=K.ri(2,19);return{line:L(0,20,1),start:0,target:t,type:'place',text:'Hop the frog to '+t+'.',tip:'Count the ticks from 0.'};},
function(){var a=K.ri(1,9),b=K.ri(2,9);return{line:L(0,20,1),start:a,target:a+b,type:'jump',text:'Start at '+a+'. Jump +'+b+'. Where do you land?',tip:'Adding means hopping to the right.'};},
function(){var a=K.ri(9,18),b=K.ri(2,8);return{line:L(0,20,1),start:a,target:a-b,type:'jump',text:a+' '+M+' '+b+' = ?  (start at '+a+')',tip:'Subtracting means hopping to the left.'};},
function(){var a=2*K.ri(0,4),b=a+2*K.ri(2,5);return{line:L(0,20,1),start:0,target:(a+b)/2,type:'place',text:'Which number is exactly halfway between '+a+' and '+b+'?',tip:'Halfway is the same number of hops from each end.'};},
function(){var a=K.ri(5,9),b=K.ri(11-a,9);return{line:L(0,20,1),start:a,target:a+b,type:'jump',text:a+' + '+b+' = ?  Jump to 10 first, then the rest.',tip:'Make 10: '+a+' + '+(10-a)+' = 10, then + '+(a+b-10)+'.'};}],
[function(){var t=-K.ri(1,9);return{line:L(-10,10,1),start:0,target:t,type:'place',text:'Hop the frog to '+fmt(t,1)+'.',tip:'Negative numbers are to the LEFT of zero.'};},
function(){var a=-K.ri(2,7),b=K.ri(3,9);return{line:L(-10,10,1),start:a,target:a+b,type:'jump',text:fmt(a,1)+' + '+b+' = ?  (start at '+fmt(a,1)+')',tip:'Adding a positive number: hop right, even across zero.'};},
function(){var a=K.ri(1,5),b=K.ri(a+1,9);return{line:L(-10,10,1),start:a,target:a-b,type:'jump',text:a+' '+M+' '+b+' = ?',tip:'Hop left past zero into the negatives.'};},
function(){var a=-K.ri(1,4),b=K.ri(2,5);return{line:L(-10,10,1),start:a,target:a-b,type:'jump',text:fmt(a,1)+' '+M+' '+b+' = ?',tip:'Subtracting from a negative makes it even more negative.'};},
function(){var a=K.ri(1,6),b=K.ri(a+2,10);return{line:L(-10,10,1),start:a,target:a-b,type:'jump',text:'It is '+a+' °C in Shimla. The temperature falls by '+b+' °C. What is it now?',tip:'Falling temperature = hop left.'};}],
[function(){var t=K.pick([1,3,5,7]);return{line:L(0,8,4),start:0,target:t,type:'place',text:'Hop the frog to '+fmt(t,4)+'.',tip:'Each whole is split into 4 quarters.'};},
function(){var t=K.ri(1,9);if(t===5)t=6;return{line:L(0,10,10,'dec'),start:0,target:t,type:'place',text:'Hop the frog to '+fmt(t,10,'dec')+'.',tip:'The space from 0 to 1 is split into 10 tenths.'};},
function(){var t=K.pick([6,7,8,9]);return{line:L(0,10,5),start:0,target:t,type:'place',text:'Hop the frog to '+t+'/5 (an improper fraction).',tip:t+'/5 = '+fmt(t,5)+': one whole and a bit more.'};},
function(){var a=K.pick([1,2,3]),b=K.pick([2,3,5]);return{line:L(0,8,4),start:a,target:a+b,type:'jump',text:fmt(a,4)+' + '+fmt(b,4)+' = ?  (start at '+fmt(a,4)+')',tip:'Count quarter-hops: each hop is 1/4.'};},
function(){var a=-K.pick([3,5]),b=K.pick([4,6]);return{line:L(-6,6,2,'dec'),start:a,target:a+b,type:'jump',text:fmt(a,2,'dec')+' + '+fmt(b,2,'dec')+' = ?',tip:'Each hop is 0.5. Crossing zero is fine!'};}]
];
function X(k){var l=st.t.line;return 30+(cv.w-60)*(k-l.lo)/(l.hi-l.lo);}
function lineY(){return cv.h*0.66;}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var sky=g.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#0f3b2e');sky.addColorStop(1,'#0b2a3b');g.fillStyle=sky;g.fillRect(0,0,w,h);
if(!st.t)return;
var l=st.t.line,y=lineY();
g.fillStyle='rgba(34,211,238,.12)';g.fillRect(0,y+6,w,h-y);
g.strokeStyle='#e2e8f0';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(16,y);g.lineTo(w-16,y);g.stroke();
g.fillStyle='#e2e8f0';g.beginPath();g.moveTo(w-8,y);g.lineTo(w-20,y-7);g.lineTo(w-20,y+7);g.fill();g.beginPath();g.moveTo(8,y);g.lineTo(20,y-7);g.lineTo(20,y+7);g.fill();
var span=l.hi-l.lo,every=l.den===1?(w/span<26?2:1):l.den;
g.font='700 '+(w<420?12:14)+'px system-ui, sans-serif';g.textAlign='center';
for(var k=l.lo;k<=l.hi;k++){
var x=X(k),major=l.den===1?true:k%l.den===0,half=l.den>1&&(2*k)%l.den===0&&!major;
g.strokeStyle=major?'#fff':'rgba(255,255,255,.6)';g.lineWidth=major?3:2;var th=major?14:half?10:7;
g.beginPath();g.moveTo(x,y-th);g.lineTo(x,y+th);g.stroke();
if((l.den===1&&(k%every===0||k===0))||(l.den>1&&major)){g.fillStyle=k===0?'#fde68a':'#e2e8f0';g.fillText(fmt(k,l.den),x,y+32);}
}
g.lineWidth=2.5;g.setLineDash([6,5]);
st.hops.forEach(function(hp){
if(hp[0]===hp[1])return;
var a=X(hp[0]),b=X(hp[1]),mid=(a+b)/2,rad=Math.abs(b-a)/2,hh=Math.min(rad,h*0.32);
g.strokeStyle=hp[1]>hp[0]?'#4ade80':'#fb7185';g.beginPath();g.moveTo(a,y-4);g.quadraticCurveTo(mid,y-4-hh*2,b,y-4);g.stroke();
g.setLineDash([]);g.fillStyle=g.strokeStyle;g.font='800 12px system-ui, sans-serif';
var d=hp[1]-hp[0];g.fillText((d>0?'+':M)+fmt(Math.abs(d),l.den,l.how),mid,y-8-hh);g.setLineDash([6,5]);
});
g.setLineDash([]);
if(st.t.type==='jump'){g.fillStyle='#fde68a';g.beginPath();g.arc(X(st.t.start),y,6,0,6.283);g.fill();}
if(st.reveal){var tx=X(st.t.target);g.strokeStyle='#fde68a';g.lineWidth=3;g.beginPath();g.arc(tx,y,14,0,6.283);g.stroke();g.fillStyle='#fde68a';g.fillText('here!',tx,y-22);}
var fx=st.fx===undefined?X(st.pos):st.fx,fy=st.fy===undefined?y-24:st.fy;
g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(fx,y-2,16,5,0,0,6.283);g.fill();
g.font=Math.round(Math.max(30,Math.min(48,w*0.06)))+'px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif';g.textBaseline='middle';g.fillText('🐸',fx,fy);g.textBaseline='alphabetic';
}
function readout(){
var l=st.t.line,s='Frog is at '+fmt(st.pos,l.den,l.how);
if(l.den>1)s+='  (= '+(l.how==='dec'?fmt(st.pos,l.den,'frac'):fmt(st.pos,l.den,'dec'))+')';
readEl.textContent=s;
}
function moveTo(k,record){
var l=st.t.line;k=K.clamp(k,l.lo,l.hi);
if(k===st.pos||st.busy)return;
var from=st.pos;st.pos=k;
if(record!==false){var last=st.hops[st.hops.length-1];if(last&&last[1]===from&&(k-from)*(last[1]-last[0])>0&&Math.abs(k-from)===1&&Math.abs(last[1]-last[0])<1)last[1]=k;else st.hops.push([from,k]);if(st.hops.length>14)st.hops.shift();}
K.sound('tick');readout();
if(K.rm){st.fx=undefined;st.fy=undefined;cv.draw(cv);return;}
var t=0,a=X(from),b=X(k),y=lineY()-24,dur=0.28;
if(an)an.stop();
an=K.loop(function(dt){
t=Math.min(1,t+dt/dur);
st.fx=a+(b-a)*t;st.fy=y-Math.sin(Math.PI*t)*Math.min(60,20+Math.abs(b-a)*0.3);
cv.draw(cv);
if(t>=1){st.fx=undefined;st.fy=undefined;cv.draw(cv);an.stop();an=null;}
});
}
function check(){
if(!st.t||st.done)return;
var l=st.t.line;
if(st.pos===st.t.target){
st.done=true;var sc=st.tries===0?1:st.tries===1?0.6:0.25;st.score+=sc;
K.sound('good');var rc=cv.c.getBoundingClientRect(),rr=K.root.getBoundingClientRect();K.burst(X(st.pos)*rc.width/cv.w+rc.left-rr.left,(lineY()-30)*rc.height/cv.h+rc.top-rr.top,22);
S.fb('✓ Yes! '+fmt(st.t.target,l.den,l.how)+'. '+(st.t.type==='jump'?'You hopped '+fmt(Math.abs(st.t.target-st.t.start),l.den,l.how)+(st.t.target>st.t.start?' to the right.':' to the left.'):''),'good');
K.say('Yes! '+fmt(st.t.target,l.den,l.how).replace(M,'minus '));
nextB.hidden=false;try{nextB.focus({preventScroll:true});}catch(e){}
}else{
st.tries++;K.sound('bad');
var d=st.pos-st.t.target,much=fmt(Math.abs(d),l.den,l.how);
S.fb('Not yet: you are '+much+' too far '+(d>0?'right':'left')+'. '+st.t.tip,'bad');
if(st.tries>=2){st.reveal=true;S.fb('The answer is shown with a circle. Hop there to continue. '+st.t.tip,'info');}
cv.draw(cv);
}
hud();
}
function load(){
var f=S.mode==='guided'?TPL[S.diff][st.i]:K.pick(TPL[S.diff]);
st.t=f();st.pos=st.t.start;st.hops=[];st.tries=0;st.reveal=false;st.done=false;st.fx=undefined;
taskEl.textContent=st.t.text;nextB.hidden=true;
S.fb(st.t.type==='jump'?'Use ◀ ▶ (or arrow keys) to hop one step at a time, or drag the frog. Then ✓ Check.':'Tap the line, drag the frog, or use ◀ ▶. Then ✓ Check.','info');
readout();hud();cv.draw(cv);K.say(st.t.text.replace( /\u2212/g ,' minus '));
}
function next(){
if(S.mode==='guided'){
K.award(3+2*S.diff,'Number Line task '+(st.i+1));
st.i++;
if(st.i>=TPL[S.diff].length){S.finish(100*st.score/TPL[S.diff].length,['A number line turns + and '+M+' into hops right and left.'],guided,free);return;}
}
load();
}
function hud(){S.clearChips();if(S.mode==='guided')S.chip('t','Task',(st.i+1)+'/'+TPL[S.diff].length);S.chip('s','Score',Math.round(st.score*10)/10);}
function guided(){S.setMode('guided');st={i:0,score:0,hops:[]};load();}
function free(){S.setMode('free');st={i:0,score:0,hops:[]};load();}
S=K.shell({title:'Number Line Jump',icon:'🐸',goal:'Hop the frog to the right spot on the number line.',
diffs:['0 to 20','Negatives','Fractions & decimals'],
how:['Read the task. For "jump" tasks the frog starts on the yellow dot.','Move with ◀ ▶ (one step) or ◀◀ ▶▶ (a bigger step), arrow keys, or by dragging/tapping on the line.','Each hop draws an arc: green = adding (right), red = subtracting (left).','Press ✓ Check (or Enter). After two misses the answer is circled.'],
onChange:function(){if(S.mode==='free')free();else guided();}});
taskEl=K.h('p',{c:'task','aria-live':'polite'});
S.stage.appendChild(taskEl);
cv=K.canvas(S.stage,0.42,draw,220,420);
cv.c.setAttribute('role','img');cv.c.setAttribute('aria-label','Number line with a frog. Use arrow keys to move.');
readEl=K.h('div',{c:'read','aria-live':'polite'});
function big(){return st.t.line.den===1?5:st.t.line.den;}
var nextB=K.btn('Next ▶','pri',next);
var ctl=K.h('div',{c:'ctl'},[
K.btn('◀◀','ghost',function(){moveTo(st.pos-big());},{'aria-label':'Big step left'}),
K.btn('◀','ghost',function(){moveTo(st.pos-1);},{'aria-label':'Step left'}),
K.btn('▶','ghost',function(){moveTo(st.pos+1);},{'aria-label':'Step right'}),
K.btn('▶▶','ghost',function(){moveTo(st.pos+big());},{'aria-label':'Big step right'}),
K.btn('↺','ghost',function(){st.pos=st.t.start;st.hops=[];readout();cv.draw(cv);},{'aria-label':'Back to start'}),
K.btn('✓ Check','pri',check),nextB]);
S.stage.appendChild(readEl);S.stage.appendChild(ctl);
var drag=false;
function kAt(e){var p=cv.pt(e),l=st.t.line;return Math.round(l.lo+(p.x-30)/(cv.w-60)*(l.hi-l.lo));}
K.on(cv.c,'pointerdown',function(e){if(!st.t)return;drag=true;try{cv.c.setPointerCapture(e.pointerId);}catch(x){}st.dragFrom=st.pos;var k=kAt(e);if(Math.abs(X(k)-X(st.pos))>4)moveTo(k,true);else st.hops.push([st.pos,st.pos]);e.preventDefault();});
K.on(cv.c,'pointermove',function(e){if(!drag)return;var k=K.clamp(kAt(e),st.t.line.lo,st.t.line.hi);if(k!==st.pos&&!an){var last=st.hops[st.hops.length-1];st.pos=k;if(last)last[1]=k;readout();cv.draw(cv);}});
function endDrag(){drag=false;if(st.hops)st.hops=st.hops.filter(function(hp){return hp[0]!==hp[1];});if(st.t)cv.draw(cv);}
K.on(cv.c,'pointerup',endDrag);
K.on(cv.c,'pointercancel',endDrag);
K.on(S.root,'keydown',function(e){
if(!st.t)return;
if(e.key==='ArrowRight'){e.preventDefault();moveTo(st.pos+(e.shiftKey?big():1));}
else if(e.key==='ArrowLeft'){e.preventDefault();moveTo(st.pos-(e.shiftKey?big():1));}
else if(e.key==='Enter'&&e.target===S.root){e.preventDefault();if(st.done)next();else check();}
});
guided();
try{S.root.focus({preventScroll:true});}catch(e){}
return{destroy:function(){K.destroy();}};
}
});
})();
