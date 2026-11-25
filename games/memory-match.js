/* VidyaVerse University (v2) - game: Memory Match (memory-match). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="memory-match";
var CSS=".vv-memory-match-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-memory-match-root *,.vv-memory-match-root *::before,.vv-memory-match-root *::after{box-sizing:border-box}.vv-memory-match-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-memory-match-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-memory-match-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-memory-match-ttx{min-width:0}.vv-memory-match-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-memory-match-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-memory-match-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-memory-match-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-memory-match-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-memory-match-seg .vv-memory-match-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-memory-match-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-memory-match-btn:hover{background:rgba(255,255,255,.13)}.vv-memory-match-btn:active{transform:scale(.95)}.vv-memory-match-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-memory-match-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-memory-match-btn[aria-pressed=true],.vv-memory-match-seg .vv-memory-match-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-memory-match-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-memory-match-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-memory-match-ghost{background:rgba(255,255,255,.04)}.vv-memory-match-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-memory-match-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-memory-match-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-memory-match-how[hidden]{display:none}.vv-memory-match-how p{margin:0 0 6px}.vv-memory-match-how ol{margin:4px 0 4px 20px;padding:0}.vv-memory-match-how li{margin:3px 0}.vv-memory-match-note{color:var(--mu);font-size:13px}.vv-memory-match-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-memory-match-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-memory-match-chip b{color:var(--a2);font-weight:750}.vv-memory-match-stage{position:relative;min-height:280px}.vv-memory-match-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-memory-match-fb.vv-memory-match-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-memory-match-fb.vv-memory-match-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-memory-match-fb.vv-memory-match-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-memory-match-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-memory-match-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-memory-match-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-memory-match-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-memory-match-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-memory-match-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-memory-match-card h4{margin:0 0 8px;font-size:22px}.vv-memory-match-card p{margin:6px 0}@keyframes vv-memory-match-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-memory-match-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-memory-match-shake{animation:vv-memory-match-shake .35s}.vv-memory-match-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-memory-match-big{font-size:30px;font-weight:800}.vv-memory-match-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-memory-match-grid{display:grid;gap:10px}.vv-memory-match-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-memory-match-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-memory-match-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-memory-match-mu{color:var(--mu)}.vv-memory-match-tiny .vv-memory-match-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-memory-match-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-memory-match-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-memory-match-root{border-radius:16px;font-size:15px}.vv-memory-match-btn{padding:8px 10px}.vv-memory-match-goal{font-size:13px}.vv-memory-match-seg .vv-memory-match-btn{padding:6px 9px}}@media (min-width:1800px){.vv-memory-match-root{font-size:19px}.vv-memory-match-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-memory-match-root *{animation:none!important;transition:none!important}}.vv-memory-match-rm *{animation:none!important;transition:none!important}.vv-memory-match-root{--a:#34d399;--a2:#60a5fa;--g1:rgba(52,211,153,.28);--g2:rgba(96,165,250,.28);--bg1:#06202a;--bg2:#10294a}.vv-memory-match-board{display:grid;gap:clamp(6px,1.6vw,12px);margin:0 auto;max-width:720px}.vv-memory-match-card2{position:relative;aspect-ratio:3/4;min-height:72px;border:0;padding:0;background:transparent;cursor:pointer;perspective:800px;border-radius:16px;-webkit-tap-highlight-color:transparent;touch-action:manipulation;font:inherit;color:inherit}.vv-memory-match-card2:focus-visible{outline:3px solid var(--a2);outline-offset:3px}.vv-memory-match-in2{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.3,1.3,.5,1)}.vv-memory-match-card2.vv-memory-match-up .vv-memory-match-in2,.vv-memory-match-card2.vv-memory-match-got .vv-memory-match-in2{transform:rotateY(180deg)}.vv-memory-match-face{position:absolute;inset:0;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid var(--ln);box-shadow:0 10px 22px -12px rgba(0,0,0,.8)}.vv-memory-match-back{background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.35),transparent 40%),linear-gradient(135deg,#0ea5e9,#8b5cf6);font-size:clamp(22px,5vw,34px)}.vv-memory-match-front{transform:rotateY(180deg);background:linear-gradient(160deg,#fff,#e0f2fe);color:#0f172a}.vv-memory-match-front .vv-memory-match-e{font-size:clamp(26px,6.5vw,48px);line-height:1}.vv-memory-match-front .vv-memory-match-w{font-size:clamp(11px,2.2vw,16px);font-weight:800;text-align:center;padding:0 4px}.vv-memory-match-front .vv-memory-match-sym{font-size:clamp(28px,7vw,52px);font-weight:900;color:#0e7490;font-family:Georgia,\"Times New Roman\",serif}.vv-memory-match-card2.vv-memory-match-got .vv-memory-match-front{background:linear-gradient(160deg,#dcfce7,#86efac);animation:vv-memory-match-pop .5s}.vv-memory-match-tiny .vv-memory-match-front .vv-memory-match-w{font-size:18px}.vv-memory-match-rm .vv-memory-match-card2.vv-memory-match-up .vv-memory-match-in2,.vv-memory-match-rm .vv-memory-match-card2.vv-memory-match-got .vv-memory-match-in2{transform:none}.vv-memory-match-rm .vv-memory-match-card2.vv-memory-match-up .vv-memory-match-back,.vv-memory-match-rm .vv-memory-match-card2.vv-memory-match-got .vv-memory-match-back{display:none}.vv-memory-match-rm .vv-memory-match-front{transform:none;display:none}.vv-memory-match-rm .vv-memory-match-card2.vv-memory-match-up .vv-memory-match-front,.vv-memory-match-rm .vv-memory-match-card2.vv-memory-match-got .vv-memory-match-front{display:flex}.vv-memory-match-info{margin-top:12px;text-align:center;font-weight:600;min-height:1.5em}";
var DATA={"sets":[[["🍎","Apple"],["🍌","Banana"],["🐘","Elephant"],["🐟","Fish"],["🚗","Car"],["⭐","Star"],["🌸","Flower"],["🐱","Cat"],["🥭","Mango"],["🦜","Parrot"],["☀️","Sun"],["🌙","Moon"]],[[["🐄","Cow"],["🐮","Calf"],"A baby cow is a calf."],[["🐕","Dog"],["🐶","Puppy"],"A baby dog is a puppy."],[["🐈","Cat"],["🐱","Kitten"],"A baby cat is a kitten."],[["🐔","Hen"],["🐥","Chick"],"A baby hen is a chick."],[["🐑","Sheep"],["🍼","Lamb"],"A baby sheep is a lamb."],[["🐎","Horse"],["🍼","Foal"],"A baby horse is a foal."],[["🐸","Frog"],["💧","Tadpole"],"A frog starts life as a tadpole in water."],[["🦋","Butterfly"],["🐛","Caterpillar"],"A caterpillar turns into a butterfly (metamorphosis)."],[["🦆","Duck"],["🐣","Duckling"],"A baby duck is a duckling."],[["🐐","Goat"],["🍼","Kid"],"A baby goat is called a kid."],[["🦁","Lion"],["🍼","Cub"],"A baby lion is a cub."],[["🦘","Kangaroo"],["👝","Joey"],"A baby kangaroo is a joey and grows in its mother's pouch."]],[[["🥇","Gold"],["Au",""],"Au — from Latin aurum."],[["🥈","Silver"],["Ag",""],"Ag — from Latin argentum."],[["🔩","Iron"],["Fe",""],"Fe — from Latin ferrum."],[["🧂","Sodium"],["Na",""],"Na — from Latin natrium."],[["🍌","Potassium"],["K",""],"K — from Latin kalium. Bananas are rich in it."],[["⚓","Lead"],["Pb",""],"Pb — from Latin plumbum (that is why we say \"plumber\")."],[["🟠","Copper"],["Cu",""],"Cu — from Latin cuprum."],[["🌡️","Mercury"],["Hg",""],"Hg — from Greek/Latin hydrargyrum, \"liquid silver\"."],[["🥫","Tin"],["Sn",""],"Sn — from Latin stannum."],[["🎈","Helium"],["He",""],"He — from Greek helios, the Sun, where it was first detected."],[["🦴","Calcium"],["Ca",""],"Ca — calcium makes bones and teeth strong."],[["💨","Oxygen"],["O",""],"O — about 21% of the air we breathe."]]],"levels":[3,4,6,8],"tinyLevels":[2,3,4,4]};
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
title:"Memory Match",
icon:"🧠",
faculty:"early",
bands:["toddler","play","prek","primary","middle","secondary"],
summary:"Flip cards to find matching pairs — same pictures for little ones, animals and their babies for kids, and chemical elements with their symbols for older learners.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},board,info,cards=[],hist=[];
function deck(n){
var set=DATA.sets[S.diff],pick=K.shuffle(set).slice(0,n),out=[];
pick.forEach(function(p,i){
if(S.diff===0){out.push({id:i,e:p[0],w:p[1],say:p[1],fact:p[1]+'!'});out.push({id:i,e:p[0],w:p[1],say:p[1],fact:p[1]+'!'});}
else{out.push({id:i,e:p[0][0],w:p[0][1],say:p[0][1],fact:p[2]});out.push({id:i,e:p[1][1]?p[1][0]:'',w:p[1][1]||'',sym:p[1][1]?'':p[1][0],say:p[1][1]||p[1][0].split('').join(' '),fact:p[2]});}
});
return K.shuffle(out);
}
function cols(n){return n<=4?2:n<=6?3:(n>12&&board.clientWidth>=640)?8:4;}
function deal(n){
st.pairs=n;st.found=0;st.moves=0;st.open=[];st.lock=false;st.t0=performance.now();
board.textContent='';cards=deck(n);
var c=cols(n*2);board.style.gridTemplateColumns='repeat('+c+', minmax(0, 1fr))';
board.style.maxWidth=Math.min(900,c*(K.tiny?170:150))+'px';
cards.forEach(function(cd,i){
var front=K.h('span',{c:'face front'},cd.sym?[K.h('span',{c:'sym'},cd.sym)]:[K.h('span',{c:'e','aria-hidden':'true'},cd.e),K.h('span',{c:'w'},cd.w)]);
var b=K.h('button',{type:'button',c:'card2','aria-label':'Card '+(i+1)+', face down','data-i':i},[K.h('span',{c:'in2'},[K.h('span',{c:'face back','aria-hidden':'true'},'❓'),front])]);
b.addEventListener('click',function(){flip(i);});
cd.el=b;board.appendChild(b);
});
info.textContent=S.diff===2?'Match each element to its chemical symbol.':S.diff===1?'Match each animal to its baby.':'Find two cards that are the same.';
hud();cv.draw(cv);
}
function flip(i){
var cd=cards[i];
if(st.lock||cd.got||st.open.indexOf(i)>=0)return;
cd.el.classList.add(K.P+'-up');cd.el.setAttribute('aria-label',(cd.w||cd.sym)+(cd.sym?' (symbol)':''));
K.sound('tap');K.say(cd.say);
st.open.push(i);
if(st.open.length<2)return;
st.moves++;hud();
var a=cards[st.open[0]],b=cards[st.open[1]];
if(a.id===b.id){
a.got=b.got=true;st.found++;
[a,b].forEach(function(x){x.el.classList.add(K.P+'-got');x.el.setAttribute('aria-label',(x.w||x.sym)+', matched');});
st.open=[];K.sound('good');
var p=K.rel(b.el);K.burst(p.x,p.y,18);
info.textContent='✓ '+a.fact;S.fb('A pair! '+st.found+' of '+st.pairs+' found.','good');
if(st.found===st.pairs)K.after(650,won);
}else{
st.lock=true;S.fb('Not a pair — remember where they are!','info');
K.after(K.tiny?1400:950,function(){
[a,b].forEach(function(x){x.el.classList.remove(K.P+'-up');x.el.setAttribute('aria-label','Card face down');});
st.open=[];st.lock=false;
});
}
hud();
}
function score(){return Math.min(1,st.pairs*1.5/Math.max(1,st.moves));}
function won(){
var sc=score(),secs=Math.round((performance.now()-st.t0)/1000);
hist.push({m:st.moves,p:st.pairs});if(hist.length>8)hist.shift();cv.draw(cv);
K.sound('win');K.say('Well done!');
if(S.mode==='free'){K.award(4+st.pairs,'Memory Match free play');S.card('All pairs found! 🎉',[st.moves+' moves · '+secs+' s','Perfect memory would need '+st.pairs+' moves.'],[['↺ New board',function(){deal(st.pairs);}]]);return;}
st.scores.push(sc);K.award(5+2*st.li+3*S.diff,'Memory Match level '+(st.li+1));
var lv=K.tiny?DATA.tinyLevels:DATA.levels;
if(st.li+1>=lv.length){var pct=100*st.scores.reduce(function(s,v){return s+v;},0)/st.scores.length;S.finish(pct,[st.moves+' moves on the last board.','Memory trick: say each card aloud and remember its row and column.'],guided,free);return;}
S.card('Level '+(st.li+1)+' done! '+K.stars(sc*100),[st.moves+' moves · '+secs+' s'],[['Next ▶',function(){st.li++;startLevel();}]]);
}
function startLevel(){var lv=K.tiny?DATA.tinyLevels:DATA.levels;deal(lv[st.li]);S.fb('Level '+(st.li+1)+': find '+lv[st.li]+' pairs.','info');}
function hud(){
S.clearChips();
if(S.mode==='guided')S.chip('l','Level',(st.li+1)+'/'+(K.tiny?DATA.tinyLevels:DATA.levels).length);
S.chip('p','Pairs',st.found+'/'+st.pairs);S.chip('m','Moves',st.moves);
}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
g.fillStyle='rgba(255,255,255,.75)';g.font='600 12px system-ui, sans-serif';g.textAlign='left';
g.fillText('Your moves (bars) vs perfect memory (line) — fewer is better',10,16);
if(!hist.length){g.fillStyle='rgba(255,255,255,.45)';g.fillText('Finish a board to see your memory graph.',10,h/2+6);return;}
var mx=Math.max.apply(null,hist.map(function(x){return x.m;}))+2,n=hist.length,bw=Math.min(70,(w-20)/n),base=h-20,gh=h-46;
hist.forEach(function(x,i){
var bx=10+i*bw+6,bh=gh*x.m/mx,ph=gh*x.p/mx;
var gr=g.createLinearGradient(0,base-bh,0,base);gr.addColorStop(0,'#60a5fa');gr.addColorStop(1,'#34d399');
g.fillStyle=gr;K.rr(g,bx,base-bh,bw-12,bh,6);g.fill();
g.strokeStyle='#fde68a';g.lineWidth=3;g.beginPath();g.moveTo(bx-3,base-ph);g.lineTo(bx+bw-9,base-ph);g.stroke();
g.fillStyle='#fff';g.textAlign='center';g.font='700 12px system-ui, sans-serif';g.fillText(String(x.m),bx+(bw-12)/2,base-bh-4);
});
}
function guided(){S.setMode('guided');st={li:0,scores:[]};startLevel();}
function free(){S.setMode('free');st={li:0};deal(K.tiny?4:[6,6,8][S.diff]);S.fb('Free play: a fresh shuffled board. Try to beat your move count!','info');}
S=K.shell({title:'Memory Match',icon:'🧠',goal:'Turn over two cards at a time and find all the matching pairs in as few moves as you can.',
diffs:['Same pictures','Animal babies','Element symbols'],
how:['Tap a card to turn it over (or use Tab/arrow keys and Enter).','Turn over a second card. If they match, they stay up!','If not, they turn back — remember where each one was.','Guided: 4 levels with more pairs each time. Fewer moves = more stars.'],
note:'Grown-ups: for babies and toddlers, choose "Same pictures" and name each picture together.',
onChange:function(){if(S.mode==='free')free();else guided();}});
board=K.h('div',{c:'board',role:'group','aria-label':'Memory cards'});
info=K.h('div',{c:'info','aria-live':'polite'});
S.stage.appendChild(board);S.stage.appendChild(info);
cv=K.canvas(S.stage,0.22,draw,120,170);
cv.wrap.style.marginTop='12px';
K.on(board,'keydown',function(e){
var t=e.target,i=t&&t.getAttribute?parseInt(t.getAttribute('data-i'),10):NaN;if(isNaN(i))return;
var c=cols(cards.length),d={ArrowRight:1,ArrowLeft:-1,ArrowDown:c,ArrowUp:-c}[e.key];
if(d){e.preventDefault();var j=K.clamp(i+d,0,cards.length-1);cards[j].el.focus();}
});
if(K.tiny)S.setDiff(0);
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
