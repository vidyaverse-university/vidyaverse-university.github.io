/* VidyaVerse University (v2) - game: Word Builder (word-builder). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="word-builder";
var CSS=".vv-word-builder-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-word-builder-root *,.vv-word-builder-root *::before,.vv-word-builder-root *::after{box-sizing:border-box}.vv-word-builder-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-word-builder-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-word-builder-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-word-builder-ttx{min-width:0}.vv-word-builder-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-word-builder-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-word-builder-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-word-builder-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-word-builder-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-word-builder-seg .vv-word-builder-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-word-builder-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-word-builder-btn:hover{background:rgba(255,255,255,.13)}.vv-word-builder-btn:active{transform:scale(.95)}.vv-word-builder-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-word-builder-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-word-builder-btn[aria-pressed=true],.vv-word-builder-seg .vv-word-builder-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-word-builder-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-word-builder-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-word-builder-ghost{background:rgba(255,255,255,.04)}.vv-word-builder-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-word-builder-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-word-builder-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-word-builder-how[hidden]{display:none}.vv-word-builder-how p{margin:0 0 6px}.vv-word-builder-how ol{margin:4px 0 4px 20px;padding:0}.vv-word-builder-how li{margin:3px 0}.vv-word-builder-note{color:var(--mu);font-size:13px}.vv-word-builder-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-word-builder-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-word-builder-chip b{color:var(--a2);font-weight:750}.vv-word-builder-stage{position:relative;min-height:280px}.vv-word-builder-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-word-builder-fb.vv-word-builder-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-word-builder-fb.vv-word-builder-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-word-builder-fb.vv-word-builder-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-word-builder-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-word-builder-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-word-builder-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-word-builder-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-word-builder-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-word-builder-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-word-builder-card h4{margin:0 0 8px;font-size:22px}.vv-word-builder-card p{margin:6px 0}@keyframes vv-word-builder-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-word-builder-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-word-builder-shake{animation:vv-word-builder-shake .35s}.vv-word-builder-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-word-builder-big{font-size:30px;font-weight:800}.vv-word-builder-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-word-builder-grid{display:grid;gap:10px}.vv-word-builder-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-word-builder-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-word-builder-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-word-builder-mu{color:var(--mu)}.vv-word-builder-tiny .vv-word-builder-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-word-builder-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-word-builder-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-word-builder-root{border-radius:16px;font-size:15px}.vv-word-builder-btn{padding:8px 10px}.vv-word-builder-goal{font-size:13px}.vv-word-builder-seg .vv-word-builder-btn{padding:6px 9px}}@media (min-width:1800px){.vv-word-builder-root{font-size:19px}.vv-word-builder-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-word-builder-root *{animation:none!important;transition:none!important}}.vv-word-builder-rm *{animation:none!important;transition:none!important}.vv-word-builder-root{--a:#f472b6;--a2:#a78bfa;--g1:rgba(244,114,182,.28);--g2:rgba(167,139,250,.28);--bg1:#1a0b2a;--bg2:#2a0f3d}.vv-word-builder-lay{display:grid;gap:14px}@media (min-width:800px){.vv-word-builder-lay{grid-template-columns:minmax(0,1.2fr) minmax(240px,.8fr)}}.vv-word-builder-clue{display:flex;align-items:center;gap:14px;min-height:70px}.vv-word-builder-pic{font-size:clamp(48px,10vw,84px);line-height:1;filter:drop-shadow(0 8px 18px rgba(0,0,0,.5))}.vv-word-builder-mean{font-size:clamp(17px,2.4vw,22px);font-weight:700}.vv-word-builder-slots{display:flex;flex-wrap:wrap;gap:6px;min-height:58px;margin:12px 0;padding:8px;border-radius:16px;background:rgba(0,0,0,.3);border:1px dashed var(--ln);align-items:center}.vv-word-builder-slot{min-width:40px;height:44px;padding:0 10px;border-radius:10px;background:linear-gradient(180deg,#fff,#fbcfe8);color:#3b0a2a;font-weight:900;font-size:22px;display:inline-flex;align-items:center;justify-content:center;animation:vv-word-builder-pop .3s}.vv-word-builder-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.vv-word-builder-tile{font-size:clamp(20px,4vw,28px);font-weight:900;min-width:52px;min-height:56px;background:linear-gradient(180deg,#fdf2f8,#f9a8d4);color:#3b0a2a;border:0;box-shadow:0 5px 0 #be185d,0 10px 18px -8px rgba(0,0,0,.6);text-transform:lowercase}.vv-word-builder-tile:active{transform:translateY(3px);box-shadow:0 2px 0 #be185d}.vv-word-builder-tile[disabled]{opacity:.25}.vv-word-builder-ctl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-word-builder-found{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.vv-word-builder-fw{padding:4px 10px;border-radius:999px;background:rgba(52,211,153,.2);border:1px solid rgba(52,211,153,.6);font-weight:700}.vv-word-builder-note2{margin-top:10px;color:var(--mu);min-height:1.4em}";
var DATA={"cvc":[["🐱","cat"],["🐶","dog"],["🐷","pig"],["🚌","bus"],["☀️","sun"],["🎩","hat"],["🦇","bat"],["🖊️","pen"],["🛏️","bed"],["☕","cup"],["🦊","fox"],["🐔","hen"],["🗺️","map"],["📦","box"],["🐛","bug"],["🚐","van"],["🥅","net"],["🐜","ant"],["🥚","egg"],["🍎","apple"]],"sets":[["PLANET",["planet","plant","plane","plan","pant","lane","lean","leap","plea","tape","peat","pale","neat","late","plate","petal","panel","pleat","net","pen","ant","tan","pat","tap","nap","pan","pal","lap","ten","ape","eat","tea","ate"],"planet"],["GARDEN",["garden","danger","range","anger","grand","grade","dear","read","dare","near","earn","rage","gear","drag","darn","dean","red","den","end","and","ran","rag","age","ear","nag"],"garden"],["STREAM",["stream","master","steam","smart","team","meat","mate","tame","rate","tear","star","rest","mast","east","seat","sea","tea","art","rat","mat","set","arm","ram","are","ear","eat"],"stream"],["FRIEND",["friend","fried","fire","fine","find","fend","ride","dine","diner","fined","fern","nerd","end","den","red","fin","fir","rid","din"],"friend"],["TEACHER",["teacher","teach","cheat","reach","cheer","heart","earth","there","three","chart","crate","trace","cater","react","each","heat","hate","chat","care","race","tear","rate","arch","art","hat","tea","eat","ate","ear"],"teacher"],["ORANGE",["orange","organ","groan","range","anger","rage","near","gone","gear","earn","ogre","oar","ore","ear","era","ago","nag","rag","ran","one"],"orange"]],"morph":[["the state of not being happy",["un","happy","ness"],"unhappiness","un- = not, -ness = the state of. Spelling rule: y changes to i before most suffixes: happy → happiness."],["not able to be seen",["in","vis","ible"],"invisible","in- = not, vis = see (Latin videre), -ible = able to be."],["to write again",["re","write"],"rewrite","re- = again (redo, replay, rebuild)."],["the study of life",["bio","logy"],"biology","bio = life (Greek bios), -logy = study of (geology, zoology)."],["an instrument for looking at very small things",["micro","scope"],"microscope","micro = small, scope = look at (telescope, periscope)."],["a device that carries sound from far away",["tele","phone"],"telephone","tele = far, phone = sound (television, microphone)."],["to carry across from one place to another",["trans","port"],"transport","trans = across, port = carry (export, import)."],["without fear",["fear","less"],"fearless","-less = without (careless, homeless)."],["the act of disagreeing",["dis","agree","ment"],"disagreement","dis- = not / opposite, -ment = the act or result of."],["able to be read",["read","able"],"readable","-able = can be done (washable, breakable)."],["to see in advance",["pre","view"],"preview","pre- = before (prefix, predict)."],["in a careful way",["care","ful","ly"],"carefully","-ful = full of, -ly = in a … way. Note the double l."],["a person who teaches",["teach","er"],"teacher","-er = a person who does something (player, writer)."],["not possible",["im","possible"],"impossible","in- becomes im- before p, b and m: impossible, imbalance, immature."],["the quality of being kind",["kind","ness"],"kindness","-ness turns an adjective into a noun."],["to place something in the wrong spot",["mis","place"],"misplace","mis- = wrongly (misspell, misunderstand)."]],"distract":["un","re","dis","pre","mis","ness","ful","less","able","ment","er","ly","in","im","tion","ing"]};
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
title:"Word Builder",
icon:"🔤",
faculty:"languages",
bands:["prek","primary","middle","secondary"],
summary:"Build words three ways: sound out picture words letter by letter, find hidden words in a set of letters, and assemble prefixes, roots and suffixes to make words that match a meaning.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},clueEl,slotsEl,trayEl,foundEl,noteEl,blocks=[],anim=null;
var COLS=['#f472b6','#a78bfa','#60a5fa','#34d399','#fbbf24','#fb7185'];
function drop(text){
blocks.push({t:text,y:-40,vy:0,c:COLS[blocks.length%COLS.length]});
if(blocks.length>9)blocks.shift();
if(K.rm){blocks.forEach(function(b){b.y=null;});cv.draw(cv);return;}
if(!anim)anim=K.loop(function(dt){
var moving=false;
blocks.forEach(function(b,i){var ty=tyOf(i);if(b.y===null)return;b.vy+=1800*dt;b.y+=b.vy*dt;if(b.y>=ty){b.y=ty;b.vy=-b.vy*0.25;if(Math.abs(b.vy)<40){b.y=null;}}moving=moving||b.y!==null;});
cv.draw(cv);
if(!moving){anim.stop();anim=null;}
});
}
function tyOf(i){return cv.h-16-(i+1)*34;}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var sky=g.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#2e1065');sky.addColorStop(1,'#4a044e');g.fillStyle=sky;g.fillRect(0,0,w,h);
g.fillStyle='#1e1b4b';g.fillRect(0,h-16,w,16);
g.fillStyle='rgba(255,255,255,.8)';g.font='700 13px system-ui, sans-serif';g.textAlign='left';g.fillText('Word tower: '+st.total+' built',10,20);
blocks.forEach(function(b,i){
var y=b.y===null?tyOf(i):b.y;g.font='800 16px system-ui, sans-serif';
var bw=Math.min(w-20,g.measureText(b.t).width+30),x=(w-bw)/2+(i%2?10:-10);
var gr=g.createLinearGradient(0,y,0,y+32);gr.addColorStop(0,'#fff');gr.addColorStop(0.15,b.c);gr.addColorStop(1,'rgba(0,0,0,.35)');
g.fillStyle='rgba(0,0,0,.35)';K.rr(g,x+3,y+4,bw,32,8);g.fill();
g.fillStyle=b.c;K.rr(g,x,y,bw,32,8);g.fill();g.fillStyle=gr;g.globalAlpha=0.5;K.rr(g,x,y,bw,32,8);g.fill();g.globalAlpha=1;
g.fillStyle='#1a0b2a';g.textAlign='center';g.fillText(b.t,x+bw/2,y+22);
});
}
function hud(){
S.clearChips();
if(S.mode==='guided')S.chip('l','Level',(st.li+1)+'/5');
if(S.diff===1)S.chip('f','Found',st.found.length+(S.mode==='guided'?'/'+st.need:''));
S.chip('s','Score',st.score);
}
function tiles(arr){
st.tiles=arr.map(function(t){return{t:t,used:false};});st.built=[];
trayEl.textContent='';renderTray();renderSlots();
}
function renderTray(){
if(trayEl.children.length===st.tiles.length){
st.tiles.forEach(function(tl,i){var b=trayEl.children[i];b.textContent=tl.t;b.disabled=tl.used;b.setAttribute('aria-label','Tile '+tl.t);});
var ae=document.activeElement;
if(ae&&ae.disabled&&trayEl.contains(ae)){try{S.root.focus({preventScroll:true});}catch(e){}}
return;
}
trayEl.textContent='';
st.tiles.forEach(function(tl,i){var b=K.btn(tl.t,'tile',function(){tap(i);},{'aria-label':'Tile '+tl.t});b.disabled=tl.used;trayEl.appendChild(b);});
}
function renderSlots(){
slotsEl.textContent='';
if(!st.built.length)slotsEl.appendChild(K.h('span',{c:'mu'},S.diff===2?'Tap word parts in order…':'Tap letters to build a word…'));
st.built.forEach(function(i){slotsEl.appendChild(K.h('span',{c:'slot'},st.tiles[i].t));});
slotsEl.setAttribute('aria-label','Built so far: '+cur());
}
function cur(){return st.built.map(function(i){return st.tiles[i].t;}).join(S.diff===2?'+':'');}
function tap(i){
if(st.lock||st.tiles[i].used)return;
st.tiles[i].used=true;st.built.push(i);K.sound('pop');
if(S.diff!==2)K.say(st.tiles[i].t);
renderTray();renderSlots();
if(S.diff===0&&st.built.length===st.word.length)check();
}
function undo(){if(st.lock||!st.built.length)return;var i=st.built.pop();st.tiles[i].used=false;renderTray();renderSlots();K.sound('tap');}
function clearB(){if(st.lock)return;st.built.forEach(function(i){st.tiles[i].used=false;});st.built=[];renderTray();renderSlots();}
function shuffleT(){if(st.lock)return;clearB();st.tiles=K.shuffle(st.tiles);renderTray();K.sound('whoosh');}
function good(text,pts,msg){
st.score+=pts;st.total++;drop(text);K.sound('good');
var p=K.rel(slotsEl);K.burst(p.x,p.y,18);S.fb(msg,'good');hud();
}
function check(){
if(st.lock)return;
var w=cur();
if(S.diff===0){
if(w===st.word){
st.lock=true;good(w,2,'✓ '+st.word.toUpperCase()+'! '+st.word.split('').join(' – ')+' → '+st.word);
K.say(st.word);noteEl.textContent='Sound it out: '+st.word.split('').map(function(c){return'/'+c+'/';}).join(' ')+' → '+st.word;
K.after(1200,levelStep);
}else{
st.err++;K.sound('bad');S.fb('Not quite — listen to each sound and try again.','bad');K.say(st.word);
noteEl.textContent='Hint: it starts with “'+st.word[0]+'”.';K.after(500,clearB);
}
}else if(S.diff===1){
if(w.length<3){S.fb('Use at least 3 letters.','info');return;}
if(st.found.indexOf(w)>=0){S.fb('You already found “'+w+'”.','info');clearB();return;}
if(st.set[1].indexOf(w)>=0){
st.found.push(w);foundEl.appendChild(K.h('span',{c:'fw'},w));
var big=w===st.set[2];
good(w,w.length-2+(big?5:0),big?'🌟 You found the big word “'+w+'” using every letter! Bonus!':'✓ “'+w+'” — '+w.length+' letters.');
clearB();
if(S.mode==='guided'&&st.found.length>=st.need){st.lock=true;K.after(700,levelStep);}
}else{K.sound('bad');S.fb('“'+w+'” is not in this puzzle\u2019s word list. (Real word? It may just be missing — try another.)','bad');clearB();}
}else{
var ok=w===st.task[1].join('+');
if(ok){st.lock=true;good(st.task[2],4,'✓ '+st.task[1].join(' + ')+' = '+st.task[2]);noteEl.textContent='💡 '+st.task[3];K.say(st.task[2]);K.after(1800,levelStep);}
else{st.miss++;st.err++;K.sound('bad');S.fb('Not that one. Think: which part means what? ('+st.task[1].length+' parts)','bad');if(st.miss>=2)noteEl.textContent='Hint: start with “'+st.task[1][0]+'”.';K.after(400,clearB);}
}
}
function setup(){
st.lock=false;st.miss=0;noteEl.textContent='';foundEl.textContent='';clueEl.textContent='';
if(S.diff===0){
var p=st.queue.pop();if(!p){st.queue=K.shuffle(DATA.cvc);p=st.queue.pop();}
st.word=p[1];
clueEl.appendChild(K.h('span',{c:'pic','aria-hidden':'true'},p[0]));
clueEl.appendChild(K.h('span',{c:'mean'},'Spell the picture ('+p[1].length+' letters)'));
var abc='abcdefghijklmnoprstuw',extra=K.tiny?[]:[abc[K.ri(0,abc.length-1)]];
tiles(K.shuffle(p[1].split('').concat(extra)));
K.say(p[1]);
}else if(S.diff===1){
var s=st.queue.pop();if(!s){st.queue=K.shuffle(DATA.sets);s=st.queue.pop();}
st.set=s;st.found=[];st.need=S.mode==='guided'?3+Math.min(2,st.li):999;
clueEl.appendChild(K.h('span',{c:'mean'},'Make words from these letters. '+(S.mode==='guided'?'Find '+st.need+'.':'Find as many as you can!')+' One word uses all '+s[0].length+'!'));
tiles(K.shuffle(s[0].toLowerCase().split('')));
}else{
var t=st.queue.pop();if(!t){st.queue=K.shuffle(DATA.morph);t=st.queue.pop();}
st.task=t;
clueEl.appendChild(K.h('span',{c:'mean'},'Build a word meaning: “'+t[0]+'”'));
var ds=K.shuffle(DATA.distract.filter(function(d){return t[1].indexOf(d)<0;})).slice(0,3);
tiles(K.shuffle(t[1].concat(ds)));
}
hud();
}
function levelStep(){
if(S.mode==='free'){setup();return;}
K.award(4+2*S.diff,'Word Builder level '+(st.li+1));
st.li++;
if(st.li>=5){var pct=S.diff===1?100:Math.max(40,100-st.err*8);S.finish(pct,['Words built: '+st.total,S.diff===2?'Prefix + root + suffix: knowing parts unlocks thousands of words.':'Great building!'],guided,free);return;}
setup();
}
function start(mode){
S.setMode(mode);st={li:0,score:0,total:0,err:0,queue:[]};
st.queue=K.shuffle(S.diff===0?DATA.cvc:S.diff===1?DATA.sets:DATA.morph);
blocks=[];setup();cv.draw(cv);
try{S.root.focus({preventScroll:true});}catch(e){}
S.fb(['Tap the letters in order to spell the picture.','Tap letters, then ✓ Check. Every word needs 3+ letters.','Tap word parts in order, then ✓ Check.'][S.diff],'info');
}
function guided(){start('guided');}
function free(){start('free');}
S=K.shell({title:'Word Builder',icon:'🔤',goal:'Build real words from letters or word parts.',
diffs:['Picture words','Hidden words','Word parts'],
how:['Picture words: tap letters in order to spell what you see — listen to each sound.','Hidden words: make as many words as you can from the letters; one uses them all.','Word parts: join a prefix, root and suffix to match the meaning.','Keyboard: type letters to tap tiles, Backspace to undo, Enter to check.'],
onChange:function(){if(S.mode==='free')free();else guided();}});
var lay=K.h('div',{c:'lay'}),panel=K.h('div',{c:'panel'}),right=K.h('div');
clueEl=K.h('div',{c:'clue','aria-live':'polite'});slotsEl=K.h('div',{c:'slots'});trayEl=K.h('div',{c:'tray'});
var ctl=K.h('div',{c:'ctl'},[K.btn('⌫ Undo','ghost',undo),K.btn('Clear','ghost',clearB),K.btn('🔀 Shuffle','ghost',shuffleT),K.btn('✓ Check','pri',check)]);
foundEl=K.h('div',{c:'found','aria-label':'Words found'});noteEl=K.h('div',{c:'note2','aria-live':'polite'});
[clueEl,slotsEl,trayEl,ctl,foundEl,noteEl].forEach(function(n){panel.appendChild(n);});
lay.appendChild(panel);lay.appendChild(right);S.stage.appendChild(lay);
st={total:0};
cv=K.canvas(right,1.1,draw,260,400);
K.on(S.root,'keydown',function(e){
if(e.ctrlKey||e.metaKey||e.altKey)return;
if(e.key==='Backspace'){e.preventDefault();undo();return;}
if(e.key==='Enter'&&e.target===S.root){e.preventDefault();check();return;}
if(e.key&&e.key.length===1&&st.tiles){
var ch=e.key.toLowerCase();
for(var i=0;i<st.tiles.length;i++)if(!st.tiles[i].used&&st.tiles[i].t.charAt(0)===ch){e.preventDefault();tap(i);return;}
}
});
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
