/* VidyaVerse University (v2) - game: Code Maze (code-maze). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="code-maze";
var CSS=".vv-code-maze-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-code-maze-root *,.vv-code-maze-root *::before,.vv-code-maze-root *::after{box-sizing:border-box}.vv-code-maze-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-code-maze-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-code-maze-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-code-maze-ttx{min-width:0}.vv-code-maze-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-code-maze-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-code-maze-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-code-maze-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-code-maze-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-code-maze-seg .vv-code-maze-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-code-maze-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-code-maze-btn:hover{background:rgba(255,255,255,.13)}.vv-code-maze-btn:active{transform:scale(.95)}.vv-code-maze-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-code-maze-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-code-maze-btn[aria-pressed=true],.vv-code-maze-seg .vv-code-maze-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-code-maze-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-code-maze-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-code-maze-ghost{background:rgba(255,255,255,.04)}.vv-code-maze-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-code-maze-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-code-maze-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-code-maze-how[hidden]{display:none}.vv-code-maze-how p{margin:0 0 6px}.vv-code-maze-how ol{margin:4px 0 4px 20px;padding:0}.vv-code-maze-how li{margin:3px 0}.vv-code-maze-note{color:var(--mu);font-size:13px}.vv-code-maze-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-code-maze-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-code-maze-chip b{color:var(--a2);font-weight:750}.vv-code-maze-stage{position:relative;min-height:280px}.vv-code-maze-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-code-maze-fb.vv-code-maze-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-code-maze-fb.vv-code-maze-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-code-maze-fb.vv-code-maze-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-code-maze-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-code-maze-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-code-maze-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-code-maze-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-code-maze-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-code-maze-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-code-maze-card h4{margin:0 0 8px;font-size:22px}.vv-code-maze-card p{margin:6px 0}@keyframes vv-code-maze-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-code-maze-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-code-maze-shake{animation:vv-code-maze-shake .35s}.vv-code-maze-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-code-maze-big{font-size:30px;font-weight:800}.vv-code-maze-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-code-maze-grid{display:grid;gap:10px}.vv-code-maze-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-code-maze-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-code-maze-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-code-maze-mu{color:var(--mu)}.vv-code-maze-tiny .vv-code-maze-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-code-maze-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-code-maze-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-code-maze-root{border-radius:16px;font-size:15px}.vv-code-maze-btn{padding:8px 10px}.vv-code-maze-goal{font-size:13px}.vv-code-maze-seg .vv-code-maze-btn{padding:6px 9px}}@media (min-width:1800px){.vv-code-maze-root{font-size:19px}.vv-code-maze-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-code-maze-root *{animation:none!important;transition:none!important}}.vv-code-maze-rm *{animation:none!important;transition:none!important}.vv-code-maze-root{--a:#22d3ee;--a2:#a3e635;--g1:rgba(34,211,238,.28);--g2:rgba(163,230,53,.2);--bg1:#06151f;--bg2:#0d2233}.vv-code-maze-lay{display:grid;gap:14px}@media (min-width:820px){.vv-code-maze-lay{grid-template-columns:minmax(0,1fr) minmax(280px,.9fr)}}.vv-code-maze-pal{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}.vv-code-maze-pal .vv-code-maze-btn{font-size:15px}.vv-code-maze-prog{min-height:120px;max-height:320px;overflow:auto;padding:10px;border-radius:16px;background:rgba(0,0,0,.35);border:1px solid var(--ln);font-family:ui-monospace,\"SFMono-Regular\",Menlo,Consolas,\"Liberation Mono\",monospace}.vv-code-maze-list{display:flex;flex-direction:column;gap:6px}.vv-code-maze-list.vv-code-maze-cur{outline:2px dashed var(--a2);outline-offset:4px;border-radius:10px}.vv-code-maze-blk{display:flex;align-items:center;gap:6px;padding:4px 6px 4px 10px;border-radius:12px;background:linear-gradient(135deg,#0e7490,#155e75);border:1px solid rgba(255,255,255,.18);font-weight:700;min-height:44px;flex-wrap:wrap}.vv-code-maze-blk.vv-code-maze-loop{background:linear-gradient(135deg,#4d7c0f,#3f6212)}.vv-code-maze-blk.vv-code-maze-sense{background:linear-gradient(135deg,#7c3aed,#5b21b6)}.vv-code-maze-blk.vv-code-maze-run{box-shadow:0 0 0 3px #fde047;transform:translateX(4px)}.vv-code-maze-blk .vv-code-maze-lab{flex:1;min-width:0;cursor:pointer}.vv-code-maze-blk .vv-code-maze-btn{min-height:36px;min-width:36px;padding:4px 8px;border-radius:10px;font-size:14px}.vv-code-maze-nest{margin-left:18px;padding-left:10px;border-left:3px solid rgba(163,230,53,.6)}.vv-code-maze-empty{color:var(--mu);font-size:14px;padding:6px}.vv-code-maze-runbar{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.vv-code-maze-lim{margin-top:8px;font-size:14px;color:var(--mu)}";
var DATA={"levels":[[{"n":"First steps","g":["#######","#S...G#","#######"],"d":0,"lim":0,"pal":"basic","tip":"Each ⬆ moves one square forward.","pre":null},{"n":"Turn the corner","g":["######","#S..##","###.##","###.G#","######"],"d":0,"lim":0,"pal":"basic","tip":"Turns spin the robot on the spot — they do not move it.","pre":null},{"n":"Zig-zag","g":["#######","#S.####","##..###","###..##","####.G#","#######"],"d":0,"lim":0,"pal":"basic","tip":"Plan it like a dance: forward, right, forward, left…","pre":null},{"n":"Debug me","g":["########","#S...###","####.###","####...#","######G#","########"],"d":0,"lim":0,"pal":"basic","tip":"This program has ONE bug. Run it, watch where it goes wrong, then fix it.","pre":["F","F","F","R","F","F","L","F","F","L","F"]},{"n":"Spiral","g":["#######","#S....#","#####.#","#G..#.#","###.#.#","###...#","#######"],"d":0,"lim":0,"pal":"basic","tip":"Count the squares on each straight before you turn.","pre":null}],[{"n":"Loop it","g":["############","#S........G#","############"],"d":0,"lim":2,"pal":"loop","tip":"Use 🔁 Repeat so you do not need nine ⬆ blocks.","pre":null},{"n":"Stairs","g":["########","#S.#####","##..####","###..###","####..##","#####.G#","########"],"d":0,"lim":6,"pal":"loop","tip":"Find the pattern that repeats: right, forward, left, forward.","pre":null},{"n":"Square dance","g":["######","#....#","#.##.#","#.##.#","#S##G#","######"],"d":3,"lim":4,"pal":"loop","tip":"A loop inside a loop: repeat (3 forwards, then turn).","pre":null},{"n":"Debug the loop","g":["#########","#S..#####","###...###","#####...#","#######G#","#########"],"d":0,"lim":6,"pal":"loop","tip":"The loop is missing a step. Watch the robot on the first lap.","pre":[["rep",3,["F","R","F","L"]]]},{"n":"Snake","g":["#########","#S......#","#######.#","#.......#","#.#######","#......G#","#########"],"d":0,"lim":14,"pal":"loop","tip":"Use a Repeat for every long straight.","pre":null}],[{"n":"Sensor basics","g":["#########","#S......#","#######.#","#######.#","#######G#","#########"],"d":0,"lim":3,"pal":"sense","tip":"Repeat until 🚩 { if wall ahead → turn right; forward }.","pre":null},{"n":"Clockwise spiral","g":["#######","#S....#","#####.#","#G..#.#","#.###.#","#.....#","#######"],"d":0,"lim":3,"pal":"sense","tip":"The same 3-block program can solve many mazes!","pre":null},{"n":"Anticlockwise","g":["#######","#.....#","#.###.#","#G..#.#","#####.#","#S....#","#######"],"d":0,"lim":3,"pal":"sense","tip":"This time every turn is to the left.","pre":null},{"n":"Debug the snail","g":["#########","#S......#","#######.#","#.....#.#","#.###G#.#","#.#####.#","#.......#","#########"],"d":0,"lim":3,"pal":"sense","tip":"The sensor turns the wrong way. Fix one block.","pre":[["until",["IL","F"]]]},{"n":"Stairs, smarter","g":["########","#S.#####","##..####","###..###","####..##","#####.G#","########"],"d":0,"lim":6,"pal":"sense","tip":"Repeat until 🚩 works with any steps inside — the robot stops the moment it reaches the flag.","pre":null}]]};
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
title:"Code Maze",
icon:"🤖",
faculty:"tech",
bands:["primary","middle","secondary"],
summary:"Program a robot through mazes with blocks — sequences, turns, loops, nested loops, sensors and \"repeat until\" — and learn to debug a broken program.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},palEl,progEl,limEl,play=null,uid=1;
var DX=[1,0,-1,0],DY=[0,1,0,-1];
var LAB={F:'⬆ Forward',L:'↶ Turn left',R:'↷ Turn right',IR:'🔍 If wall ahead → turn right',IL:'🔍 If wall ahead → turn left',rep:'🔁 Repeat',until:'⏳ Repeat until 🚩'};
function blk(t,n){return{t:t,n:n||3,kids:(t==='rep'||t==='until')?[]:null,id:uid++};}
function fromData(a){return a.map(function(x){if(typeof x==='string')return blk(x);var b=blk(x[0],x[0]==='rep'?x[1]:0);b.kids=fromData(x[0]==='rep'?x[2]:x[1]);return b;});}
function count(list){var c=0;list.forEach(function(b){c++;if(b.kids)c+=count(b.kids);});return c;}
function parse(lv){
var g=lv.g,m={w:g[0].length,h:g.length,wall:[],sx:1,sy:1,gx:1,gy:1,d:lv.d};
for(var y=0;y<g.length;y++){m.wall.push([]);for(var x=0;x<g[y].length;x++){var ch=g[y].charAt(x);m.wall[y].push(ch==='#');if(ch==='S'){m.sx=x;m.sy=y;}if(ch==='G'){m.gx=x;m.gy=y;}}}
return m;
}
function isWall(x,y){var m=st.m;return y<0||y>=m.h||x<0||x>=m.w||m.wall[y][x];}
function run(prog){
var m=st.m,s={x:m.sx,y:m.sy,d:m.d},tr=[{x:s.x,y:s.y,d:s.d,id:0}],end=null,steps=0;
function push(id,ev){tr.push({x:s.x,y:s.y,d:s.d,id:id,ev:ev});}
function ex(list){
for(var i=0;i<list.length;i++){
if(end)return;
var b=list[i];
if(steps>400){end='long';return;}
if(b.t==='F'){steps++;var nx=s.x+DX[s.d],ny=s.y+DY[s.d];if(isWall(nx,ny)){push(b.id,'bump');end='bump';return;}s.x=nx;s.y=ny;push(b.id);if(s.x===m.gx&&s.y===m.gy){end='goal';return;}}
else if(b.t==='L'||b.t==='R'){steps++;s.d=(s.d+(b.t==='R'?1:3))%4;push(b.id);}
else if(b.t==='IR'||b.t==='IL'){if(isWall(s.x+DX[s.d],s.y+DY[s.d])){steps++;s.d=(s.d+(b.t==='IR'?1:3))%4;push(b.id,'sense');}else push(b.id,'clear');}
else if(b.t==='rep'){for(var k=0;k<b.n&&!end;k++)ex(b.kids);}
else if(b.t==='until'){var guard=0;while(!end){var s0=steps;ex(b.kids);if(steps===s0||++guard>200){end='stuck';return;}}}
}
}
ex(prog);
return{tr:tr,end:end||'short'};
}
function cell(o){var m=st.m;var c=Math.floor(Math.min((o.w-20)/m.w,(o.h-20)/m.h));return{c:c,ox:(o.w-c*m.w)/2,oy:(o.h-c*m.h)/2};}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var bg=g.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#061b26');bg.addColorStop(1,'#0b2b2a');g.fillStyle=bg;g.fillRect(0,0,w,h);
if(!st.m)return;
var m=st.m,L=cell(o),c=L.c;
for(var y=0;y<m.h;y++)for(var x=0;x<m.w;x++){
var px=L.ox+x*c,py=L.oy+y*c;
if(m.wall[y][x]){g.fillStyle='#0f3a4a';g.fillRect(px,py,c,c);g.fillStyle='#1b5e74';g.fillRect(px+2,py+2,c-4,c*0.72);g.fillStyle='rgba(255,255,255,.08)';g.fillRect(px+2,py+2,c-4,3);}
else{g.fillStyle=(x+y)%2?'#123b3a':'#15453f';g.fillRect(px,py,c,c);}
}
g.fillStyle='rgba(163,230,53,.55)';
(st.trail||[]).forEach(function(p){g.beginPath();g.arc(L.ox+(p[0]+0.5)*c,L.oy+(p[1]+0.5)*c,Math.max(2,c*0.08),0,6.283);g.fill();});
var gx=L.ox+m.gx*c,gy=L.oy+m.gy*c;
g.fillStyle='rgba(253,224,71,.18)';g.fillRect(gx+2,gy+2,c-4,c-4);
g.strokeStyle='#e5e7eb';g.lineWidth=Math.max(2,c*0.06);g.beginPath();g.moveTo(gx+c*0.32,gy+c*0.85);g.lineTo(gx+c*0.32,gy+c*0.15);g.stroke();
g.fillStyle='#ef4444';g.beginPath();g.moveTo(gx+c*0.34,gy+c*0.16);g.lineTo(gx+c*0.8,gy+c*0.3);g.lineTo(gx+c*0.34,gy+c*0.46);g.fill();
var r=st.rob,rx=L.ox+(r.x+0.5)*c,ry=L.oy+(r.y+0.5)*c,s=c*0.36;
g.save();g.translate(rx+(r.shake||0),ry);g.rotate(r.a);
g.fillStyle='rgba(0,0,0,.35)';K.rr(g,-s+3,-s+4,2*s,2*s,s*0.4);g.fill();
var bd=g.createLinearGradient(0,-s,0,s);bd.addColorStop(0,'#a5f3fc');bd.addColorStop(1,'#0891b2');g.fillStyle=bd;K.rr(g,-s,-s,2*s,2*s,s*0.4);g.fill();
g.fillStyle='#0c4a6e';K.rr(g,s*0.05,-s*0.6,s*0.75,s*1.2,s*0.25);g.fill();
g.fillStyle=r.bad?'#f87171':'#a3e635';g.beginPath();g.arc(s*0.48,-s*0.28,s*0.16,0,6.283);g.arc(s*0.48,s*0.28,s*0.16,0,6.283);g.fill();
g.fillStyle='#fde047';g.beginPath();g.moveTo(s*1.05,0);g.lineTo(s*0.8,-s*0.18);g.lineTo(s*0.8,s*0.18);g.fill();
g.restore();
}
function resetRobot(){var m=st.m;st.rob={x:m.sx,y:m.sy,a:m.d*Math.PI/2};st.trail=[];markRun(0);}
function markRun(id){var els=progEl.querySelectorAll('[data-id]');for(var i=0;i<els.length;i++)els[i].classList.toggle(K.P+'-run',+els[i].getAttribute('data-id')===id);}
function curList(){return st.path.length?st.path[st.path.length-1].kids:st.prog;}
function add(t){
if(play)return;
var lim=st.lv&&st.lv.lim;if(lim&&count(st.prog)>=lim){S.fb('Block limit reached ('+lim+'). Can a 🔁 loop do it with fewer blocks?','bad');K.sound('bad');return;}
var b=blk(t);curList().push(b);if(b.kids)st.path.push(b);
K.sound('tap');render();
}
function removeB(list,id){for(var i=0;i<list.length;i++){if(list[i].id===id){list.splice(i,1);return true;}if(list[i].kids&&removeB(list[i].kids,id))return true;}return false;}
function del(id){if(play)return;removeB(st.prog,id);st.path=st.path.filter(function(b){return inProg(st.prog,b.id);});K.sound('pop');render();}
function inProg(list,id){return list.some(function(b){return b.id===id||(b.kids&&inProg(b.kids,id));});}
function render(){
K.track=false;
progEl.textContent='';
function list(arr,owner){
var box=K.h('div',{c:'list'+((owner===null&&!st.path.length)||(owner&&st.path[st.path.length-1]===owner)?' cur':'')});
if(!arr.length)box.appendChild(K.h('div',{c:'empty'},owner?'empty loop — add blocks here':'Tap blocks above to build your program'));
arr.forEach(function(b){
var row=K.h('div',{c:'blk'+(b.t==='rep'||b.t==='until'?' loop':b.t.charAt(0)==='I'?' sense':''),'data-id':b.id});
var lab=K.h('span',{c:'lab',role:b.kids?'button':null,tabindex:b.kids?'0':null,title:b.kids?'Add blocks inside this loop':null},LAB[b.t]+(b.t==='rep'?' × '+b.n:''));
if(b.kids){var sel=function(){var p=[];(function find(l,trail){l.forEach(function(x){if(x===b)p=trail.concat([x]);else if(x.kids)find(x.kids,trail.concat([x]));});})(st.prog,[]);st.path=p;render();};lab.addEventListener('click',sel);lab.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();sel();}});}
row.appendChild(lab);
if(b.t==='rep'){row.appendChild(K.btn('−','ghost',function(){if(b.n>2){b.n--;render();}},{'aria-label':'Fewer repeats'}));row.appendChild(K.btn('+','ghost',function(){if(b.n<12){b.n++;render();}},{'aria-label':'More repeats'}));}
row.appendChild(K.btn('✕','ghost',function(){del(b.id);},{'aria-label':'Delete block'}));
box.appendChild(row);
if(b.kids){var nest=K.h('div',{c:'nest'});nest.appendChild(list(b.kids,b));box.appendChild(nest);}
});
return box;
}
progEl.appendChild(list(st.prog,null));
var n=count(st.prog),lim=st.lv&&st.lv.lim;
K.track=true;
limEl.textContent='Blocks used: '+n+(lim?' / limit '+lim:'')+(st.path.length?' · adding inside a loop (tap ⤴ to close it)':'');
}
function palette(){
palEl.textContent='';
var pal=st.lv?st.lv.pal:(S.diff===0?'loop':'sense');
['F','L','R'].forEach(function(t){palEl.appendChild(K.btn(LAB[t],'',function(){add(t);}));});
if(pal!=='basic')palEl.appendChild(K.btn(LAB.rep,'',function(){add('rep');}));
if(pal==='sense'){palEl.appendChild(K.btn(LAB.until,'',function(){add('until');}));palEl.appendChild(K.btn('🔍 wall → ↷','',function(){add('IR');},{'aria-label':LAB.IR}));palEl.appendChild(K.btn('🔍 wall → ↶','',function(){add('IL');},{'aria-label':LAB.IL}));}
if(pal!=='basic')palEl.appendChild(K.btn('⤴ Close loop','ghost',function(){st.path.pop();render();}));
}
function go(){
if(play)return;
if(!st.prog.length){S.fb('Add some blocks first!','info');return;}
var res=run(st.prog),tr=res.tr,i=0,t=0,dur=st.fast?0.14:0.36;
resetRobot();K.sound('whoosh');st.runs++;
var A=function(p){return p.d*Math.PI/2;};
play=K.loop(function(dt){
t+=dt/dur;
if(t>=1){t=0;i++;if(i>=tr.length){finish(res);return;}var p=tr[i];st.trail.push([p.x,p.y]);markRun(p.id);if(p.ev==='sense')K.sound('tick');}
var a=tr[Math.max(0,i-1)],b=tr[Math.min(i,tr.length-1)],k=K.rm?1:Math.min(1,t*1.6);
var aa=A(a),ab=A(b);if(ab-aa>Math.PI)ab-=2*Math.PI;if(aa-ab>Math.PI)ab+=2*Math.PI;
var bump=b.ev==='bump';
st.rob={x:a.x+(bump?0.25*DX[a.d]*Math.sin(Math.PI*k):(b.x-a.x)*k),y:a.y+(bump?0.25*DY[a.d]*Math.sin(Math.PI*k):(b.y-a.y)*k),a:aa+(ab-aa)*k,bad:bump};
cv.draw(cv);
});
}
function stopPlay(){if(play){play.stop();play=null;}}
function finish(res){
stopPlay();var last=res.tr[res.tr.length-1];st.rob={x:last.x,y:last.y,a:last.d*Math.PI/2,bad:res.end==='bump'};cv.draw(cv);
var n=count(st.prog);
if(res.end==='goal'){
markRun(0);
K.sound('win');var rc=cv.c.getBoundingClientRect(),rr=K.root.getBoundingClientRect();K.burst(rc.left-rr.left+rc.width/2,rc.top-rr.top+rc.height/2,40);
if(S.mode==='free'){K.award(6+2*S.diff,'Code Maze free maze');S.card('Maze solved! 🤖',['Your program used '+n+' blocks.'],[['🎲 New maze',function(){newFree();}]]);return;}
var sc=Math.max(0.4,1-0.15*(st.runs-1));st.scores[st.li]=sc;
K.award(5+3*S.diff,'Code Maze: '+st.lv.n);
if(st.li+1>=DATA.levels[S.diff].length){var pct=100*st.scores.reduce(function(a,v){return a+(v||0);},0)/DATA.levels[S.diff].length;S.finish(pct,['Fewer runs = higher score. Real programmers test, read the result and fix — that is debugging.'],guided,free);return;}
S.card('Level '+(st.li+1)+' solved! '+K.stars(sc*100),['Blocks: '+n+' · runs: '+st.runs],[['Next ▶',function(){st.li++;loadLevel();}]]);
}else{
K.sound('bad');
S.fb(res.end==='bump'?'💥 Bump! The robot hit a wall. The yellow-outlined block was running — check the turn before it.':res.end==='stuck'?'⏳ The loop never moves the robot — add a ⬆ inside it.':res.end==='long'?'That ran for too long — is a loop repeating too many times?':'The program ended before reaching the 🚩. Add more blocks!','bad');
}
}
function loadLevel(){
stopPlay();st.lv=DATA.levels[S.diff][st.li];st.m=parse(st.lv);st.runs=0;st.path=[];
st.prog=st.lv.pre?fromData(st.lv.pre):[];
palette();render();resetRobot();cv.draw(cv);hud();
S.fb('Level '+(st.li+1)+' — '+st.lv.n+': '+st.lv.tip,'info');
}
function maze(cw,ch){
var W=cw*2+1,H=ch*2+1,g=[],x,y;
for(y=0;y<H;y++){g.push([]);for(x=0;x<W;x++)g[y].push('#');}
var stack=[[0,0]],seen={};seen['0,0']=1;g[1][1]='.';
while(stack.length){
var c=stack[stack.length-1],nb=[];
[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var nx=c[0]+d[0],ny=c[1]+d[1];if(nx>=0&&ny>=0&&nx<cw&&ny<ch&&!seen[nx+','+ny])nb.push([nx,ny,d]);});
if(!nb.length){stack.pop();continue;}
var n=K.pick(nb);seen[n[0]+','+n[1]]=1;g[c[1]*2+1+n[2][1]][c[0]*2+1+n[2][0]]='.';g[n[1]*2+1][n[0]*2+1]='.';stack.push([n[0],n[1]]);
}
var dist={},q=[[1,1]],far=[1,1];dist['1,1']=0;
while(q.length){var p=q.shift();[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var nx=p[0]+d[0],ny=p[1]+d[1],k=nx+','+ny;if(g[ny][nx]==='.'&&dist[k]===undefined){dist[k]=dist[p[0]+','+p[1]]+1;q.push([nx,ny]);if(dist[k]>dist[far[0]+','+far[1]])far=[nx,ny];}});}
g[1][1]='S';g[far[1]][far[0]]='G';
return{g:g.map(function(r){return r.join('');}),d:g[1][2]==='.'?0:1,lim:0,pal:S.diff===0?'loop':'sense',n:'Random maze',tip:'Plan the route, then build it.'};
}
function newFree(){stopPlay();var sz=[[4,3],[5,4],[6,5]][S.diff];st.lv=maze(sz[0],sz[1]);st.m=parse(st.lv);st.prog=[];st.path=[];st.runs=0;palette();render();resetRobot();cv.draw(cv);hud();S.fb('Free play: a random maze. Build any program you like.','info');}
function hud(){S.clearChips();if(S.mode==='guided')S.chip('l','Level',(st.li+1)+'/5 · '+st.lv.n);S.chip('r','Runs',st.runs);}
function guided(){S.setMode('guided');st={li:0,scores:[],fast:st.fast};loadLevel();}
function free(){S.setMode('free');st={fast:st.fast};newFree();}
S=K.shell({title:'Code Maze',icon:'🤖',goal:'Write a program of blocks that drives the robot to the 🚩.',
diffs:['Sequences','Loops','Sensors'],
how:['Tap blocks to add them to your program (keyboard: ↑ forward, ← left, → right, Backspace delete, Enter run).','Turns rotate the robot on the spot; ⬆ moves one square in the direction it faces.','🔁 Repeat runs the blocks inside it several times. Tap a loop\u2019s name to add inside it; ⤴ closes it.','🔍 sensor blocks turn only if a wall is ahead. ⏳ Repeat until 🚩 keeps going until the robot arrives.','Press ▶ Run. If the robot bumps, read which block was running and debug!'],
onChange:function(){stopPlay();if(S.mode==='free')free();else guided();}});
var lay=K.h('div',{c:'lay'}),left=K.h('div'),right=K.h('div',{c:'panel'});
palEl=K.h('div',{c:'pal',role:'toolbar','aria-label':'Blocks'});progEl=K.h('div',{c:'prog','aria-label':'Your program'});limEl=K.h('div',{c:'lim','aria-live':'polite'});
var speedB=K.btn('🐢 Normal','ghost',function(){st.fast=!st.fast;speedB.textContent=st.fast?'🐇 Fast':'🐢 Normal';});
var runbar=K.h('div',{c:'runbar'},[K.btn('▶ Run','pri',go),K.btn('⟲ Robot back','ghost',function(){stopPlay();resetRobot();cv.draw(cv);}),K.btn('🗑 Clear','ghost',function(){if(play)return;st.prog=[];st.path=[];render();}),speedB]);
right.appendChild(palEl);right.appendChild(progEl);right.appendChild(limEl);right.appendChild(runbar);
lay.appendChild(left);lay.appendChild(right);S.stage.appendChild(lay);
st={m:null,prog:[],path:[]};
cv=K.canvas(left,0.8,draw,240,520);
cv.c.setAttribute('role','img');cv.c.setAttribute('aria-label','Maze with robot and goal flag');
K.on(S.root,'keydown',function(e){
var tg=e.target&&e.target.tagName;if(tg==='INPUT')return;
if(e.key==='ArrowUp'){e.preventDefault();add('F');}else if(e.key==='ArrowLeft'){e.preventDefault();add('L');}else if(e.key==='ArrowRight'){e.preventDefault();add('R');}
else if(e.key==='Backspace'){e.preventDefault();var l=curList();if(l.length)del(l[l.length-1].id);else if(st.path.length){st.path.pop();render();}}
else if(e.key==='Enter'&&e.target===S.root){e.preventDefault();go();}
});
guided();
try{S.root.focus({preventScroll:true});}catch(e){}
return{destroy:function(){K.destroy();}};
}
});
})();
