/* VidyaVerse University (v2) - game: Rhythm Tap (rhythm-tap). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="rhythm-tap";
var CSS=".vv-rhythm-tap-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-rhythm-tap-root *,.vv-rhythm-tap-root *::before,.vv-rhythm-tap-root *::after{box-sizing:border-box}.vv-rhythm-tap-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-rhythm-tap-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-rhythm-tap-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-rhythm-tap-ttx{min-width:0}.vv-rhythm-tap-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-rhythm-tap-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-rhythm-tap-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-rhythm-tap-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-rhythm-tap-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-rhythm-tap-seg .vv-rhythm-tap-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-rhythm-tap-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-rhythm-tap-btn:hover{background:rgba(255,255,255,.13)}.vv-rhythm-tap-btn:active{transform:scale(.95)}.vv-rhythm-tap-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-rhythm-tap-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-rhythm-tap-btn[aria-pressed=true],.vv-rhythm-tap-seg .vv-rhythm-tap-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-rhythm-tap-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-rhythm-tap-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-rhythm-tap-ghost{background:rgba(255,255,255,.04)}.vv-rhythm-tap-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-rhythm-tap-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-rhythm-tap-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-rhythm-tap-how[hidden]{display:none}.vv-rhythm-tap-how p{margin:0 0 6px}.vv-rhythm-tap-how ol{margin:4px 0 4px 20px;padding:0}.vv-rhythm-tap-how li{margin:3px 0}.vv-rhythm-tap-note{color:var(--mu);font-size:13px}.vv-rhythm-tap-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-rhythm-tap-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-rhythm-tap-chip b{color:var(--a2);font-weight:750}.vv-rhythm-tap-stage{position:relative;min-height:280px}.vv-rhythm-tap-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-rhythm-tap-fb.vv-rhythm-tap-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-rhythm-tap-fb.vv-rhythm-tap-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-rhythm-tap-fb.vv-rhythm-tap-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-rhythm-tap-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-rhythm-tap-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-rhythm-tap-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-rhythm-tap-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-rhythm-tap-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-rhythm-tap-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-rhythm-tap-card h4{margin:0 0 8px;font-size:22px}.vv-rhythm-tap-card p{margin:6px 0}@keyframes vv-rhythm-tap-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-rhythm-tap-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-rhythm-tap-shake{animation:vv-rhythm-tap-shake .35s}.vv-rhythm-tap-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-rhythm-tap-big{font-size:30px;font-weight:800}.vv-rhythm-tap-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-rhythm-tap-grid{display:grid;gap:10px}.vv-rhythm-tap-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-rhythm-tap-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-rhythm-tap-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-rhythm-tap-mu{color:var(--mu)}.vv-rhythm-tap-tiny .vv-rhythm-tap-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-rhythm-tap-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-rhythm-tap-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-rhythm-tap-root{border-radius:16px;font-size:15px}.vv-rhythm-tap-btn{padding:8px 10px}.vv-rhythm-tap-goal{font-size:13px}.vv-rhythm-tap-seg .vv-rhythm-tap-btn{padding:6px 9px}}@media (min-width:1800px){.vv-rhythm-tap-root{font-size:19px}.vv-rhythm-tap-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-rhythm-tap-root *{animation:none!important;transition:none!important}}.vv-rhythm-tap-rm *{animation:none!important;transition:none!important}.vv-rhythm-tap-root{--a:#f43f5e;--a2:#fb923c;--g1:rgba(244,63,94,.3);--g2:rgba(251,146,60,.22);--bg1:#1a0710;--bg2:#2a0c1c}.vv-rhythm-tap-padw{display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;margin:14px 0}.vv-rhythm-tap-pad{width:clamp(120px,30vw,180px);height:clamp(120px,30vw,180px);border-radius:50%;border:0;font:inherit;font-size:24px;font-weight:900;letter-spacing:2px;color:#fff;cursor:pointer;touch-action:none;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;background:radial-gradient(circle at 35% 30%,#fda4af,#f43f5e 45%,#9f1239);box-shadow:0 14px 30px -10px rgba(244,63,94,.8),inset 0 -8px 18px rgba(0,0,0,.35);transition:transform .06s}.vv-rhythm-tap-pad.vv-rhythm-tap-hit{transform:scale(.94);box-shadow:0 0 0 10px rgba(251,146,60,.35),inset 0 -4px 10px rgba(0,0,0,.4)}.vv-rhythm-tap-pad:focus-visible{outline:4px solid #fde047;outline-offset:4px}.vv-rhythm-tap-ctl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.vv-rhythm-tap-sl{max-width:420px;margin:8px auto 0}.vv-rhythm-tap-sl label{display:flex;justify-content:space-between;font-weight:600}.vv-rhythm-tap-lvinfo{text-align:center;margin:8px 0 0;font-weight:600}";
var DATA={"levels":[{"n":"Steady pulse","bpm":80,"beats":4,"sub":1,"pat":"xxxx","cyc":2,"tip":"Tap with every click. Count “1 2 3 4” out loud."},{"n":"Eighth notes","bpm":70,"beats":4,"sub":2,"pat":"xxxxxxxx","cyc":2,"tip":"Two taps per click. Say “1-and 2-and 3-and 4-and”."},{"n":"Rests","bpm":80,"beats":4,"sub":1,"pat":"xx.x","cyc":3,"tip":"A rest is silence that still counts. Keep counting on beat 3, but do not tap."},{"n":"Syncopation","bpm":70,"beats":4,"sub":2,"pat":"x.xx.xx.","cyc":2,"tip":"Tap on 1, 2, 2-and, 3-and, 4. The “3-and” lands between clicks — that off-beat feel is syncopation."},{"n":"Teentaal claps","bpm":90,"beats":16,"sub":1,"pat":"x...x.......x...","cyc":2,"tip":"Teentaal has 16 matras in 4 vibhags (4+4+4+4). Clap on matras 1 (sam, X), 5 (2) and 13 (3); wave your hand on 9 (khali, 0).","bols":["Dha","Dhin","Dhin","Dha","Dha","Dhin","Dhin","Dha","Dha","Tin","Tin","Ta","Ta","Dhin","Dhin","Dha"],"marks":{"0":"X","4":"2","8":"0","12":"3"}}],"win":[150,100,60],"tempo":[0.85,1,1.15]};
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
title:"Rhythm Tap",
icon:"🥁",
faculty:"arts",
bands:["primary","middle","secondary","senior","ug","pro"],
summary:"Tap in time with a precise metronome: steady pulse, eighth notes, rests, syncopation and Teentaal claps — with millisecond timing feedback, an early/late histogram and a tap-tempo steadiness meter.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},ctx=null,master=null,sched=null,loop=null,pad,infoEl,startB,ctlEl,t0p=performance.now();
var AC=window.AudioContext||window.webkitAudioContext;
function audio(){
if(ctx||!AC)return ctx;
try{ctx=new AC();master=ctx.createGain();master.gain.value=st.mute?0:0.6;master.connect(ctx.destination);}catch(e){ctx=null;}
return ctx;
}
K.cleanup(function(){try{if(ctx)ctx.close();}catch(e){}ctx=null;});
function now(){return ctx?ctx.currentTime:(performance.now()-t0p)/1000;}
function lat(){return ctx?(ctx.outputLatency||ctx.baseLatency||0):0;}
function heard(){return now()-lat();}
function click(t,accent,kind){
if(!ctx)return;
var o=ctx.createOscillator(),g=ctx.createGain();
o.type=kind==='note'?'triangle':'square';o.frequency.value=kind==='note'?660:accent?1760:1180;
g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(kind==='note'?0.5:accent?0.35:0.2,t+0.002);g.gain.exponentialRampToValueAtTime(0.0001,t+(kind==='note'?0.12:0.05));
o.connect(g);g.connect(master);o.start(t);o.stop(t+0.15);
}
function W(){return DATA.win[S.diff]/1000;}
function build(lv,demo){
var bpm=lv.bpm*DATA.tempo[S.diff],beat=60/bpm,step=beat/lv.sub,start=now()+0.25+lat(),ev=[],notes=[];
var cin=lv.beats===16?4:lv.beats;
for(var i=0;i<cin;i++)ev.push({t:start+i*beat,k:'tick',acc:i===0,cin:true});
var s0=start+cin*beat;
for(var c=0;c<lv.cyc;c++)for(var j=0;j<lv.pat.length;j++){
var t=s0+(c*lv.pat.length+j)*step;
if(j%lv.sub===0)ev.push({t:t,k:'tick',acc:j===0});
if(lv.pat.charAt(j)==='x'){notes.push({t:t,j:j,c:c,res:null});if(demo)ev.push({t:t+0.0005,k:'note'});}
}
ev.sort(function(a,b){return a.t-b.t;});
return{ev:ev,notes:notes,s0:s0,end:s0+lv.cyc*lv.pat.length*step,step:step,beat:beat,lv:lv,demo:demo,taps:[],errs:[],i:0};
}
function play(demo){
if(!audio()&&AC){S.fb('Audio could not start on this device — you can still play using the visual beat.','info');}
if(ctx&&ctx.state==='suspended'){try{ctx.resume();}catch(e){}}
stop();
var lv=DATA.levels[st.li];
st.run=build(lv,demo);st.playing=true;
sched=K.every(25,function(){
var r=st.run;if(!r)return;
while(r.i<r.ev.length&&r.ev[r.i].t<now()+0.12){var e=r.ev[r.i++];click(e.t,e.acc,e.k);}
if(!r.demo)r.notes.forEach(function(n){if(!n.res&&heard()-st.cal>n.t+2*W()){n.res='miss';}});
if(now()>r.end+0.6){var d=r.demo;stop();if(!d)judge();else S.fb('That was the pattern. Now press ▶ Play and tap along!','info');}
});
if(!loop)loop=K.loop(function(){cv.draw(cv);});
S.fb(demo?'🔊 Listen: the pattern is played on a woodblock.':'Count-in… then tap the pad (or Space) on every note.','info');
try{pad.focus({preventScroll:true});}catch(e){}
}
function stop(){if(sched){K.clear(sched);sched=null;}st.playing=false;if(loop&&!st.freeOn){loop.stop();loop=null;}cv.draw(cv);}
function tap(){
pad.classList.add(K.P+'-hit');K.after(90,function(){pad.classList.remove(K.P+'-hit');});
var t=heard()-st.cal;
if(S.mode==='free')return freeTap(t);
var r=st.run;if(!r||r.demo||!st.playing)return;
var best=null,bd=1e9;
r.notes.forEach(function(n){if(n.res)return;var d=Math.abs(t-n.t);if(d<bd){bd=d;best=n;}});
var w=W(),mark={t:t,k:'extra'};
if(best&&bd<=2*w){
var err=t-best.t;r.errs.push(err);
if(bd<=w){best.res=bd<=w/2?'perfect':'good';best.err=err;mark.k=best.res;}
else{mark.k=err<0?'early':'late';}
}
r.taps.push(mark);
}
function judge(){
var r=st.lastRun=st.run;if(!r)return;
var n=r.notes.length,p=0,g=0,extra=r.taps.filter(function(m){return m.k==='extra'||m.k==='early'||m.k==='late';}).length;
r.notes.forEach(function(x){if(x.res==='perfect')p++;else if(x.res==='good')g++;});
var acc=Math.max(0,(p+0.6*g-0.25*extra)/n),errs=r.errs,mean=errs.length?errs.reduce(function(a,b){return a+b;},0)/errs.length:0;
var sd=errs.length>1?Math.sqrt(errs.reduce(function(a,b){return a+(b-mean)*(b-mean);},0)/(errs.length-1)):0;
var pass=acc>=0.7,lines=['Perfect '+p+' · good '+g+' · missed '+(n-p-g)+' · extra taps '+extra,errs.length?'On average you tapped '+Math.abs(Math.round(mean*1000))+' ms '+(mean>0?'late':'early')+'; spread ±'+Math.round(sd*1000)+' ms.':'No taps were close to the notes.',mean>0.03?'Tip: feel the beat coming and move a little earlier.':mean<-0.03?'Tip: you are rushing — wait for the click.':'Your timing centre is excellent.'];
cv.draw(cv);
if(S.mode!=='guided')return;
st.best[st.li]=Math.max(st.best[st.li]||0,Math.min(1,acc));
if(pass){
K.sound('win');K.award(6+3*S.diff,'Rhythm Tap: '+DATA.levels[st.li].n);
if(st.li+1>=DATA.levels.length){S.finish(100*st.best.reduce(function(a,v){return a+(v||0);},0)/DATA.levels.length,lines,guided,free);return;}
S.card('Level passed! '+K.stars(acc*100),['Accuracy '+Math.round(acc*100)+'%'].concat(lines),[['Next ▶',function(){st.li++;showLevel();}],['↺ Again',function(){play(false);},'ghost']]);
}else{
K.sound('bad');
S.card('Keep practising 🥁',['Accuracy '+Math.round(acc*100)+'% (70% to pass)'].concat(lines),[['↺ Try again',function(){play(false);}],['🔊 Hear it',function(){play(true);},'ghost'],['Skip ▶',function(){if(st.li+1<DATA.levels.length){st.li++;showLevel();}else S.finish(100*st.best.reduce(function(a,v){return a+(v||0);},0)/DATA.levels.length,[],guided,free);},'ghost']]);
}
}
function showLevel(){
stop();st.run=null;st.lastRun=null;
var lv=DATA.levels[st.li];
infoEl.textContent='Level '+(st.li+1)+': '+lv.n+' · '+Math.round(lv.bpm*DATA.tempo[S.diff])+' BPM · '+lv.tip;
hud();cv.draw(cv);
}
function drawLane(g,w,h,r){
var lv=r?r.lv:DATA.levels[st.li],laneY=20,laneH=h*0.5,hitX=Math.max(60,w*0.18),pps=Math.max(160,w*0.35);
g.fillStyle='rgba(255,255,255,.05)';K.rr(g,8,laneY,w-16,laneH,14);g.fill();
var tnow=heard()-st.cal,cy=laneY+laneH/2;
if(r){
if(!K.rm){
for(var b=Math.floor((tnow-r.s0)/r.beat)-2;b<Math.ceil((tnow-r.s0)/r.beat)+12;b++){var bt=r.s0+b*r.beat,bx=hitX+(bt-tnow)*pps;if(bx<8||bx>w-8)continue;g.strokeStyle='rgba(255,255,255,'+(b%lv.beats===0&&lv.beats!==16||(lv.beats===16&&b%4===0)?0.35:0.12)+')';g.lineWidth=2;g.beginPath();g.moveTo(bx,laneY+6);g.lineTo(bx,laneY+laneH-6);g.stroke();}
r.notes.forEach(function(n){var x=hitX+(n.t-tnow)*pps;if(x<-20||x>w+20)return;var col=n.res==='perfect'?'#4ade80':n.res==='good'?'#facc15':n.res==='miss'?'#64748b':'#fb7185';g.fillStyle=col;g.beginPath();g.arc(x,cy,14,0,6.283);g.fill();g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.stroke();if(lv.bols){g.fillStyle='#fff';g.font='700 11px system-ui, sans-serif';g.textAlign='center';g.fillText(lv.bols[n.j],x,cy-20);}});
r.taps.forEach(function(m){var x=hitX+(m.t-tnow)*pps;if(x<0||x>w)return;g.fillStyle=m.k==='perfect'?'#86efac':m.k==='good'?'#fde047':'#fda4af';g.fillRect(x-2,laneY+laneH-22,4,16);});
g.strokeStyle='#fde047';g.lineWidth=3;g.beginPath();g.moveTo(hitX,laneY+4);g.lineTo(hitX,laneY+laneH-4);g.stroke();
}else{
var n=lv.pat.length,cw=(w-40)/n,idx=Math.floor((tnow-r.s0)/r.step);
for(var j=0;j<n;j++){var x=20+j*cw;var on=idx>=0&&idx%n===j;g.fillStyle=on?'rgba(253,224,71,.5)':'rgba(255,255,255,.06)';g.fillRect(x+1,laneY+6,cw-2,laneH-12);if(lv.pat.charAt(j)==='x'){g.fillStyle='#fb7185';g.beginPath();g.arc(x+cw/2,cy,Math.min(12,cw/3),0,6.283);g.fill();}}
}
var cinLeft=Math.ceil((r.s0-tnow)/r.beat);
if(tnow<r.s0&&cinLeft>0){g.fillStyle='#fff';g.font='900 34px system-ui, sans-serif';g.textAlign='center';g.fillText(String(cinLeft),w/2,cy+12);}
}else{
g.fillStyle='rgba(255,255,255,.6)';g.font='600 14px system-ui, sans-serif';g.textAlign='center';
g.fillText(S.mode==='free'?'Tap the pad to measure your tempo and steadiness':'Press ▶ Play (or 🔊 Hear it first)',w/2,cy-8);
var n2=lv.pat.length,cw2=Math.min(40,(w-40)/n2),x0=(w-cw2*n2)/2;
if(S.mode==='guided')for(var k=0;k<n2;k++){g.fillStyle=lv.pat.charAt(k)==='x'?'#fb7185':'rgba(255,255,255,.15)';g.beginPath();g.arc(x0+k*cw2+cw2/2,cy+18,Math.min(9,cw2/3),0,6.283);g.fill();if(lv.marks&&lv.marks[k]!==undefined){g.fillStyle='#fde047';g.font='800 11px system-ui, sans-serif';g.fillText(lv.marks[k],x0+k*cw2+cw2/2,cy+40);}}
}
}
function drawHist(g,w,h,y0,errs){
var hh=h-y0-24,ww=DATA.win[S.diff]*2,bins=15,cnt=[],bw=(w-40)/bins,mx=1;
for(var i=0;i<bins;i++)cnt.push(0);
errs.forEach(function(e){var ms=e*1000,b=Math.floor((ms+ww)/(2*ww)*bins);if(b>=0&&b<bins){cnt[b]++;mx=Math.max(mx,cnt[b]);}});
g.fillStyle='rgba(255,255,255,.7)';g.font='600 12px system-ui, sans-serif';g.textAlign='left';g.fillText('Timing: ← early | on time | late →',20,y0-4);
for(var k=0;k<bins;k++){var bh=hh*cnt[k]/mx,x=20+k*bw,mid=Math.abs(k-(bins-1)/2);g.fillStyle=mid<=1?'#4ade80':mid<=3?'#facc15':'#fb7185';g.globalAlpha=cnt[k]?1:0.15;K.rr(g,x+2,y0+hh-Math.max(3,bh),bw-4,Math.max(3,bh),3);g.fill();}
g.globalAlpha=1;g.strokeStyle='#fff';g.beginPath();g.moveTo(w/2,y0);g.lineTo(w/2,y0+hh+4);g.stroke();
g.textAlign='center';g.fillStyle='rgba(255,255,255,.6)';g.fillText('−'+ww+' ms',30,h-6);g.fillText('0',w/2,h-6);g.fillText('+'+ww+' ms',w-34,h-6);
}
function drawFree(g,w,h){
var iv=st.iv||[],y0=h*0.58;
if(iv.length>1){
var mx=Math.max.apply(null,iv),mn=Math.min.apply(null,iv),pad2=Math.max(0.02,(mx-mn)*0.2);mx+=pad2;mn-=pad2;
g.strokeStyle='#fb923c';g.lineWidth=2.5;g.beginPath();
iv.forEach(function(v,i){var x=20+(w-40)*i/Math.max(1,iv.length-1),y=30+(y0-60)*(1-(v-mn)/(mx-mn));if(i)g.lineTo(x,y);else g.moveTo(x,y);});
g.stroke();
var avg=iv.reduce(function(a,b){return a+b;},0)/iv.length,sd=Math.sqrt(iv.reduce(function(a,b){return a+(b-avg)*(b-avg);},0)/iv.length);
g.fillStyle='#fff';g.font='800 20px system-ui, sans-serif';g.textAlign='left';g.fillText(Math.round(60/avg)+' BPM',20,26);
g.font='600 13px system-ui, sans-serif';g.fillText('Steadiness: ±'+Math.round(sd*1000)+' ms between taps'+(sd<0.02?' — rock solid!':sd<0.04?' — good':' — keep practising'),130,24);
}
}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#2a0c1c');bg.addColorStop(1,'#12060c');g.fillStyle=bg;g.fillRect(0,0,w,h);
if(S.mode==='free'){drawLane(g,w,h,st.free&&st.freeOn?st.free:null);drawFree(g,w,h);drawHist(g,w,h,h*0.62,st.ferr||[]);return;}
var r=st.run||st.lastRun;drawLane(g,w,h,st.playing?r:null);
drawHist(g,w,h,h*0.62,r?r.errs:[]);
}
function freeTap(t){
if(st.lastTap&&t-st.lastTap<2.5){st.iv.push(t-st.lastTap);if(st.iv.length>24)st.iv.shift();}
st.lastTap=t;
if(st.freeOn&&st.free){var b=st.free.beat,ph=(t-st.free.s0)/b,err=(ph-Math.round(ph))*b;if(Math.abs(err)<b/2){st.ferr.push(err);if(st.ferr.length>40)st.ferr.shift();}}
cv.draw(cv);
}
function freeMetro(on){
if(sched){K.clear(sched);sched=null;}
st.freeOn=on;
if(!on){if(loop){loop.stop();loop=null;}cv.draw(cv);return;}
audio();if(ctx&&ctx.state==='suspended'){try{ctx.resume();}catch(e){}}
var beat=60/st.bpm,s0=now()+0.2,k=0;
st.free={s0:s0,beat:beat,step:beat,notes:[],taps:[],errs:[],lv:{pat:'x'.repeat(st.meter),beats:st.meter,sub:1}};
sched=K.every(25,function(){while(s0+k*beat<now()+0.12){click(s0+k*beat,k%st.meter===0);k++;}});
if(!loop)loop=K.loop(function(){cv.draw(cv);});
}
function hud(){S.clearChips();if(S.mode==='guided')S.chip('l','Level',(st.li+1)+'/'+DATA.levels.length);S.chip('w','Window','±'+DATA.win[S.diff]+' ms');if(st.cal)S.chip('c','Calibration',Math.round(st.cal*1000)+' ms');}
function controls(){
ctlEl.textContent='';
if(S.mode==='guided'){
ctlEl.appendChild(K.btn('▶ Play','pri',function(){play(false);}));
ctlEl.appendChild(K.btn('🔊 Hear it','ghost',function(){play(true);}));
ctlEl.appendChild(K.btn('■ Stop','ghost',function(){stop();}));
}else{
var mb=K.btn('▶ Metronome','pri',function(){freeMetro(!st.freeOn);mb.textContent=st.freeOn?'■ Stop metronome':'▶ Metronome';});
ctlEl.appendChild(mb);
[2,3,4].forEach(function(m){ctlEl.appendChild(K.btn(m+'/4','',function(){st.meter=m;if(st.freeOn)freeMetro(true);controls();},{'aria-pressed':st.meter===m?'true':'false'}));});
ctlEl.appendChild(K.btn('🎯 Use offset as calibration','ghost',function(){var e=st.ferr;if(!e||e.length<6){S.fb('Tap along with the metronome at least 6 times first.','info');return;}var m=e.reduce(function(a,b){return a+b;},0)/e.length;st.cal+=m;st.ferr=[];hud();S.fb('Calibration set: taps are shifted by '+Math.round(st.cal*1000)+' ms to correct for your device and headphones.','good');}));
ctlEl.appendChild(K.btn('Reset graph','ghost',function(){st.iv=[];st.ferr=[];st.lastTap=0;cv.draw(cv);}));
var inp=K.h('input',{type:'range',c:'range',min:40,max:200,step:1,value:st.bpm,'aria-label':'Tempo in BPM'}),out=K.h('output',null,st.bpm+' BPM');
K.on(inp,'input',function(){st.bpm=+inp.value;out.textContent=st.bpm+' BPM';if(st.freeOn)freeMetro(true);});
ctlEl.appendChild(K.h('div',{c:'sl',style:'flex-basis:100%'},[K.h('label',null,[K.h('span',null,'Tempo'),out]),inp]));
}
var mu=K.btn(st.mute?'🔇 Visual only':'🔈 Sound on','ghost',function(){st.mute=!st.mute;if(master)master.gain.value=st.mute?0:0.6;mu.textContent=st.mute?'🔇 Visual only':'🔈 Sound on';});
ctlEl.appendChild(mu);
}
function guided(){stop();freeMetro(false);S.setMode('guided');st.li=0;st.best=[];controls();showLevel();S.fb('Press 🔊 Hear it to listen, then ▶ Play and tap along.','info');}
function free(){stop();S.setMode('free');st.iv=[];st.ferr=[];st.lastTap=0;st.free=null;infoEl.textContent='Free play: tap any steady beat to read your tempo, or start the metronome and see if you land early or late.';controls();hud();cv.draw(cv);S.fb('Tip: the best drummers are not fastest — they are steadiest.','info');}
S=K.shell({title:'Rhythm Tap',icon:'🥁',goal:'Tap exactly in time with the beat and the pattern.',
how:['Press 🔊 Hear it to listen to the pattern, then ▶ Play.','After the count-in, tap the big pad (or press Space / Enter) on every note as it reaches the yellow line.','Green = perfect, yellow = good, red = early/late/extra. The histogram shows if you rush or drag.','Pass a level with 70% accuracy. Harder settings use a smaller timing window and faster tempo.'],
note:'Timing is measured against the audio clock and corrected for reported output latency. Bluetooth headphones add delay — use Free play → "Use offset as calibration".',
onChange:function(){if(S.mode==='free')free();else guided();}});
st={li:0,best:[],cal:0,mute:false,bpm:90,meter:4,iv:[],ferr:[]};
infoEl=K.h('p',{c:'lvinfo','aria-live':'polite'});
S.stage.appendChild(infoEl);
cv=K.canvas(S.stage,0.42,draw,230,380);
cv.c.setAttribute('role','img');cv.c.setAttribute('aria-label','Rhythm lane and timing histogram');
pad=K.h('button',{type:'button',c:'pad','aria-label':'Tap pad'},'TAP');
K.on(pad,'pointerdown',function(e){e.preventDefault();audio();tap();});
K.on(pad,'keydown',function(e){if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();tap();}});
K.on(S.root,'keydown',function(e){if(e.target===pad)return;if((e.key===' '||e.key==='j'||e.key==='f')&&!e.repeat&&e.target.tagName!=='BUTTON'&&e.target.tagName!=='INPUT'){e.preventDefault();audio();tap();}});
S.stage.appendChild(K.h('div',{c:'padw'},[pad]));
ctlEl=K.h('div',{c:'ctl'});S.stage.appendChild(ctlEl);
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
