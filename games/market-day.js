/* VidyaVerse University (v2) - game: Market Day (market-day). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="market-day";
var CSS=".vv-market-day-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-market-day-root *,.vv-market-day-root *::before,.vv-market-day-root *::after{box-sizing:border-box}.vv-market-day-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-market-day-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-market-day-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-market-day-ttx{min-width:0}.vv-market-day-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-market-day-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-market-day-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-market-day-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-market-day-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-market-day-seg .vv-market-day-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-market-day-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-market-day-btn:hover{background:rgba(255,255,255,.13)}.vv-market-day-btn:active{transform:scale(.95)}.vv-market-day-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-market-day-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-market-day-btn[aria-pressed=true],.vv-market-day-seg .vv-market-day-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-market-day-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-market-day-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-market-day-ghost{background:rgba(255,255,255,.04)}.vv-market-day-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-market-day-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-market-day-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-market-day-how[hidden]{display:none}.vv-market-day-how p{margin:0 0 6px}.vv-market-day-how ol{margin:4px 0 4px 20px;padding:0}.vv-market-day-how li{margin:3px 0}.vv-market-day-note{color:var(--mu);font-size:13px}.vv-market-day-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-market-day-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-market-day-chip b{color:var(--a2);font-weight:750}.vv-market-day-stage{position:relative;min-height:280px}.vv-market-day-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-market-day-fb.vv-market-day-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-market-day-fb.vv-market-day-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-market-day-fb.vv-market-day-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-market-day-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-market-day-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-market-day-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-market-day-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-market-day-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-market-day-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-market-day-card h4{margin:0 0 8px;font-size:22px}.vv-market-day-card p{margin:6px 0}@keyframes vv-market-day-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-market-day-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-market-day-shake{animation:vv-market-day-shake .35s}.vv-market-day-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-market-day-big{font-size:30px;font-weight:800}.vv-market-day-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-market-day-grid{display:grid;gap:10px}.vv-market-day-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-market-day-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-market-day-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-market-day-mu{color:var(--mu)}.vv-market-day-tiny .vv-market-day-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-market-day-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-market-day-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-market-day-root{border-radius:16px;font-size:15px}.vv-market-day-btn{padding:8px 10px}.vv-market-day-goal{font-size:13px}.vv-market-day-seg .vv-market-day-btn{padding:6px 9px}}@media (min-width:1800px){.vv-market-day-root{font-size:19px}.vv-market-day-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-market-day-root *{animation:none!important;transition:none!important}}.vv-market-day-rm *{animation:none!important;transition:none!important}.vv-market-day-root{--a:#22c55e;--a2:#facc15;--g1:rgba(34,197,94,.28);--g2:rgba(250,204,21,.22);--bg1:#071c12;--bg2:#1a2a0c}.vv-market-day-lay{display:grid;gap:14px}@media (min-width:860px){.vv-market-day-lay{grid-template-columns:minmax(0,1fr) minmax(0,1.1fr)}}.vv-market-day-q{font-size:clamp(17px,2.3vw,21px);font-weight:700;margin:0 0 10px}.vv-market-day-big2{font-size:clamp(26px,4vw,36px);font-weight:900;color:#fde047;font-variant-numeric:tabular-nums}.vv-market-day-den{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.vv-market-day-den .vv-market-day-btn{min-width:64px;font-variant-numeric:tabular-nums}.vv-market-day-coin{border-radius:999px;background:radial-gradient(circle at 35% 30%,#fff,#cbd5e1 45%,#94a3b8);color:#1e293b;border:0}.vv-market-day-bill{background:linear-gradient(135deg,var(--nc),rgba(255,255,255,.35));color:#111;border:0}.vv-market-day-sl label{display:flex;justify-content:space-between;font-weight:600;font-size:14px;margin-top:6px}.vv-market-day-sl output{font-variant-numeric:tabular-nums;color:#fde047}.vv-market-day-tbl{width:100%;border-collapse:collapse;margin-top:10px;font-variant-numeric:tabular-nums;font-size:14px}.vv-market-day-tbl td{padding:5px 8px;border-bottom:1px solid var(--ln)}.vv-market-day-tbl td:last-child{text-align:right;font-weight:700}.vv-market-day-opts2{display:grid;gap:8px;margin-top:8px}.vv-market-day-opts2 .vv-market-day-btn{text-align:left;justify-content:flex-start}.vv-market-day-tipb{margin-top:10px;color:var(--mu);min-height:1.4em}";
var DATA={"change":[["🍌","bananas",7,10],["📓","a notebook",32,50],["🧃","juice",65,100],["🍚","rice",137,200],["🧺","groceries",268,500]],"den":[1,2,5,10,20,50,100,200],"med":[{"k":"slider","m":{"a":120,"b":4,"c":6,"F":0,"cap":0},"q":"Set a price that earns at least ₹400 profit today.","test":"p400","tip":"Profit = (price − cost per glass) × glasses sold. Too cheap: tiny profit per glass. Too dear: few customers."},{"k":"slider","m":{"a":120,"b":4,"c":6,"F":0,"cap":0},"q":"Find the price that gives the MOST profit (within ₹1).","test":"opt","tip":"Watch the profit curve: the best price is at the top of the hill."},{"k":"mcq","m":{"a":120,"b":4,"c":6,"F":0,"cap":0},"q":"At ₹6 a glass your profit is ₹0, even though people buy lots. Why?","opts":["The price equals the cost of making each glass, so each sale earns nothing","Nobody buys at ₹6","Revenue is zero at ₹6","The stall rent uses up the money"],"tip":"Profit per glass = price − cost = ₹6 − ₹6 = ₹0."},{"k":"slider","m":{"a":160,"b":4,"c":6,"F":0,"cap":0},"q":"Hot day! More people want a drink at every price. Find the best price now (within ₹1).","test":"opt","tip":"Higher demand pushes the best price up."},{"k":"slider","m":{"a":160,"b":4,"c":6,"F":0,"cap":50},"q":"You only have lemons for 50 glasses. What is the best price now (within ₹1)?","test":"opt","tip":"If you will sell out anyway, raise the price until demand just equals your stock."}],"hard":[{"k":"num","m":{"a":120,"b":4,"c":6,"F":300,"cap":0},"q":"Stall rent is ₹300 a day. At ₹15 a glass (cost ₹6), how many glasses must you sell to break even?","ans":34,"tip":"Each glass earns ₹15 − ₹6 = ₹9 towards rent. 300 ÷ 9 = 33.3, so you need 34 glasses."},{"k":"slider","m":{"a":120,"b":4,"c":6,"F":300,"cap":0},"q":"With ₹300 rent, find the price that maximises profit (within ₹1).","test":"opt","tip":"A fixed cost lowers profit by the same amount at every price, so the best price does not change!"},{"k":"slider","m":{"a":120,"b":4,"c":6,"F":300,"cap":0},"q":"Now find the price that maximises REVENUE (sales money), not profit (within ₹1).","test":"rev","tip":"Revenue peaks where elasticity = −1 (here ₹15). The profit peak is higher because each glass costs ₹6."},{"k":"mcq","m":{"a":120,"b":4,"c":6,"F":0,"cap":0},"q":"Cost ₹6, price ₹24. What are the markup and the margin?","opts":["Markup 300%, margin 75%","Markup 75%, margin 300%","Both are 75%","Markup 400%, margin 25%"],"tip":"Markup = profit ÷ cost = 18 ÷ 6 = 300%. Margin = profit ÷ price = 18 ÷ 24 = 75%."},{"k":"slider","m":{"a":160,"b":4,"c":6,"F":300,"cap":50},"q":"Hot day, ₹300 rent, only 50 glasses of stock. Find the best price (within ₹1).","test":"opt","tip":"Stock limit → sell exactly 50: price = (160 − 50) ÷ 4 = ₹27.50."}]};
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
title:"Market Day",
icon:"🛒",
faculty:"life",
bands:["primary","middle","secondary","senior"],
summary:"Run a nimbu-pani stall: give correct change in rupees, then set prices using a live demand and profit graph — learn revenue, cost, profit, break-even, margin vs markup and why limited stock changes the best price.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},left,tbl,R='₹';
function rs(x){var v=Math.round(x*100)/100;return(v<0?'−':'')+R+Math.abs(v).toLocaleString('en-IN',{maximumFractionDigits:2});}
function Q(m,p){var q=Math.max(0,m.a-m.b*p);return m.cap?Math.min(q,m.cap):q;}
function prof(m,p){return(p-m.c)*Q(m,p)-m.F;}
function rev(m,p){return p*Q(m,p);}
function best(m,f){var bp=0,bv=-1e9;for(var p=0;p<=m.a/m.b;p+=0.25){var v=f(m,p);if(v>bv){bv=v;bp=p;}}return bp;}
function greedy(n){var c=0,d=DATA.den.slice().reverse();d.forEach(function(x){while(n>=x){n-=x;c++;}});return c;}
var NC={10:'#a47148',20:'#c5d86d',50:'#4fc3f7',100:'#b39ddb',200:'#ffca28',500:'#b0b0b0'};
function drawChange(o){
var g=o.x,w=o.w,h=o.h;
var wood=g.createLinearGradient(0,0,0,h);wood.addColorStop(0,'#5b3a1e');wood.addColorStop(1,'#3b2412');g.fillStyle=wood;g.fillRect(0,0,w,h);
g.fillStyle='rgba(255,255,255,.06)';for(var i=0;i<h;i+=18)g.fillRect(0,i,w,1);
g.fillStyle='#fde68a';g.font='700 14px system-ui, sans-serif';g.textAlign='left';g.fillText('Change on the counter: '+rs(st.given.reduce(function(a,b){return a+b;},0)),12,22);
var x=14,y=40,notes=st.given.filter(function(v){return v>=10;}),coins=st.given.filter(function(v){return v<10;});
notes.forEach(function(v,i){var nw=Math.min(110,(w-30)/3.3),nh=nw*0.45,nx=14+(i%3)*(nw+8),ny=40+Math.floor(i/3)*(nh+8);g.fillStyle='rgba(0,0,0,.3)';K.rr(g,nx+3,ny+3,nw,nh,6);g.fill();g.fillStyle=NC[v];K.rr(g,nx,ny,nw,nh,6);g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.strokeRect(nx+5,ny+5,nw-10,nh-10);g.fillStyle='#1f2937';g.font='800 '+Math.round(nh*0.4)+'px system-ui, sans-serif';g.textAlign='center';g.fillText(R+v,nx+nw/2,ny+nh*0.64);y=ny+nh+14;});
coins.forEach(function(v,i){var r=18+v*1.5,cx=30+(i%8)*Math.min(48,(w-40)/8),cy=Math.max(y,40)+r+Math.floor(i/8)*46;var cg=g.createRadialGradient(cx-6,cy-6,2,cx,cy,r);cg.addColorStop(0,'#fff');cg.addColorStop(0.5,v===5?'#e6c35c':'#cbd5e1');cg.addColorStop(1,v===5?'#a1802a':'#64748b');g.fillStyle=cg;g.beginPath();g.arc(cx,cy,r,0,6.283);g.fill();g.fillStyle='#1f2937';g.font='800 13px system-ui, sans-serif';g.textAlign='center';g.fillText(R+v,cx,cy+5);});
if(st.solved){g.fillStyle='#86efac';g.textAlign='right';g.font='700 13px system-ui, sans-serif';g.fillText('Fewest pieces possible: '+greedy(st.need),w-12,h-12);}
}
function drawGraph(o){
var g=o.x,w=o.w,h=o.h,m=st.m;
g.fillStyle='#0b1a10';g.fillRect(0,0,w,h);
var pm=m.a/m.b,L=52,Rr=w-14,T=26,B=h-34,lo=Math.min(0,-m.F)-50,hi=50;
for(var p=0;p<=pm;p+=0.5){hi=Math.max(hi,rev(m,p),prof(m,p));}
hi*=1.1;
function X(p){return L+(Rr-L)*p/pm;}function Y(v){return B-(B-T)*(v-lo)/(hi-lo);}
g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=1;g.font='11px system-ui, sans-serif';g.fillStyle='rgba(255,255,255,.6)';g.textAlign='right';
var stp=Math.pow(10,Math.floor(Math.log(hi-lo)/Math.LN10));if((hi-lo)/stp<4)stp/=2;
for(var v=Math.ceil(lo/stp)*stp;v<=hi;v+=stp){g.beginPath();g.moveTo(L,Y(v));g.lineTo(Rr,Y(v));g.stroke();g.fillText(rs(v),L-4,Y(v)+4);}
g.textAlign='center';for(var px=0;px<=pm;px+=pm>30?10:5)g.fillText(R+px,X(px),B+16);
g.fillText('Price per glass',(L+Rr)/2,h-4);
g.strokeStyle='rgba(255,255,255,.5)';g.beginPath();g.moveTo(L,Y(0));g.lineTo(Rr,Y(0));g.stroke();
function curve(f,col,dash){g.strokeStyle=col;g.lineWidth=3;g.setLineDash(dash||[]);g.beginPath();for(var q=0;q<=pm+0.001;q+=pm/120){var yy=Y(f(m,q));if(q===0)g.moveTo(X(q),yy);else g.lineTo(X(q),yy);}g.stroke();g.setLineDash([]);}
curve(rev,'rgba(96,165,250,.9)',[6,5]);curve(prof,'#4ade80');
var cp=st.p,cy=Y(prof(m,cp));
g.strokeStyle='rgba(250,204,21,.6)';g.setLineDash([3,4]);g.beginPath();g.moveTo(X(cp),T);g.lineTo(X(cp),B);g.stroke();g.setLineDash([]);
g.fillStyle='#facc15';g.beginPath();g.arc(X(cp),cy,7,0,6.283);g.fill();g.strokeStyle='#111';g.lineWidth=2;g.stroke();
if(st.showBest){var bp=best(m,st.task&&st.task.test==='rev'?rev:prof),by=Y((st.task&&st.task.test==='rev'?rev:prof)(m,bp));g.fillStyle='#f472b6';g.beginPath();g.arc(X(bp),by,6,0,6.283);g.fill();g.fillText('best',X(bp),by-10);}
g.textAlign='left';g.font='700 12px system-ui, sans-serif';g.fillStyle='#4ade80';g.fillText('— profit',L+6,T-8);g.fillStyle='#60a5fa';g.fillText('- - revenue',L+70,T-8);
}
function draw(o){o.x.clearRect(0,0,o.w,o.h);if(st.kind==='change')drawChange(o);else if(st.m)drawGraph(o);}
function table(){
if(!tbl)return;var m=st.m,p=st.p,q=Q(m,p),r=rev(m,p),c=m.c*q,pr=r-c-m.F;
var rows=[['Price per glass',rs(p)],['Glasses sold  (demand '+m.a+' − '+m.b+' × price'+(m.cap?', max '+m.cap:'')+')',Math.round(q*10)/10],['Revenue  (price × glasses)',rs(r)],['Ingredient cost  (₹'+m.c+' × glasses)',rs(c)]];
if(m.F)rows.push(['Stall rent (fixed)',rs(m.F)]);
rows.push(['Profit',rs(pr)]);
if(p>0&&q>0){rows.push(['Margin  (profit per glass ÷ price)',Math.round(100*(p-m.c)/p)+'%']);rows.push(['Markup  (profit per glass ÷ cost)',Math.round(100*(p-m.c)/m.c)+'%']);if(S.diff===2&&(!m.cap||m.a-m.b*p<m.cap))rows.push(['Price elasticity of demand',(-m.b*p/Math.max(0.01,m.a-m.b*p)).toFixed(2)]);}
tbl.textContent='';
rows.forEach(function(rw){tbl.appendChild(K.h('tr',null,[K.h('td',null,rw[0]),K.h('td',null,String(rw[1]))]));});
}
function slider(label,min,max,step,val,fmt,on){
var out=K.h('output',null,fmt(val)),inp=K.h('input',{type:'range',c:'range',min:min,max:max,step:step,value:val,'aria-label':label});
K.on(inp,'input',function(){var v=parseFloat(inp.value);out.textContent=fmt(v);on(v);});
return K.h('div',{c:'sl'},[K.h('label',null,[K.h('span',null,label),out]),inp]);
}
function changeTask(){
st.kind='change';left.textContent='';
var t=S.mode==='guided'?DATA.change[st.i]:(function(){var paid=K.pick([10,20,50,100,200,500]),price=K.ri(Math.max(1,Math.round(paid*0.3)),paid-1);return[K.pick(['🍅','🥕','🍪','🥛','🧴','🎁']),'some shopping',price,paid];})();
st.need=t[3]-t[2];st.given=[];st.solved=false;st.t=t;
left.appendChild(K.h('p',{c:'q'},t[0]+' A customer buys '+t[1]+' for '+R+t[2]+' and pays with a '+R+t[3]+' note.'));
left.appendChild(K.h('p',null,'Give the correct change. Tap coins and notes; tap the counter list to take one back.'));
var den=K.h('div',{c:'den'});
DATA.den.forEach(function(v){if(v>=t[3])return;var b=K.btn(R+v,v<10?'coin':'bill',function(){if(st.solved)return;st.given.push(v);st.given.sort(function(a,c){return c-a;});K.sound(v<10?'tick':'tap');upd();},{'aria-label':'Give '+v+' rupees'});if(v>=10)b.style.setProperty('--nc',NC[v]);den.appendChild(b);});
var given=K.h('div',{c:'den','aria-live':'polite'});
function upd(){given.textContent='';st.given.forEach(function(v,i){given.appendChild(K.btn('✕ '+R+v,'ghost',function(){if(st.solved)return;st.given.splice(i,1);upd();},{'aria-label':'Take back '+v+' rupees'}));});cv.draw(cv);}
left.appendChild(den);left.appendChild(K.h('strong',null,'On the counter:'));left.appendChild(given);
var tip=K.h('div',{c:'tipb','aria-live':'polite'});
left.appendChild(K.h('div',{c:'row'},[K.btn('💡 Hint','ghost',function(){var a=t[2],s='Count up from '+R+a+': ',parts=[];[10,50,100,500].forEach(function(b){var nx=Math.ceil((a+1)/b)*b;if(nx<=t[3]&&nx>a){parts.push(R+nx+' (+'+(nx-a)+')');a=nx;}});if(a<t[3])parts.push(R+t[3]+' (+'+(t[3]-a)+')');tip.textContent=s+parts.join(' → ')+'. Add up the jumps!';K.sound('tap');}),K.btn('🗑 Clear','ghost',function(){if(!st.solved){st.given=[];upd();}}),K.btn('✓ Give change','pri',function(){
if(st.solved)return;var sum=st.given.reduce(function(a,b){return a+b;},0);
if(sum===st.need){st.solved=true;var mn=greedy(st.need),sc=st.given.length<=mn?1:0.8;st.score+=sc;K.sound('good');K.burst(K.root.clientWidth/2,160,30);S.fb('✓ Correct: '+R+t[3]+' − '+R+t[2]+' = '+R+st.need+'.'+(sc<1?' Could you use fewer pieces? The fewest is '+mn+'.':' And with the fewest pieces!'),'good');cv.draw(cv);nextStep();}
else{st.tries++;K.sound('bad');S.fb(sum>st.need?'Too much! You gave '+R+sum+'. Take some back.':'Not enough yet: '+R+sum+' given. Keep counting up.','bad');}
})]));
left.appendChild(tip);upd();hud();
}
function priceTask(){
st.kind='price';left.textContent='';tbl=null;st.showBest=false;
var t=S.mode==='guided'?(S.diff===1?DATA.med:DATA.hard)[st.i]:null;
st.task=t;st.m=JSON.parse(JSON.stringify(t?t.m:{a:120,b:4,c:6,F:0,cap:0}));st.p=t?10:12;
var pm=st.m.a/st.m.b;
if(t)left.appendChild(K.h('p',{c:'q'},'🍋 '+t.q));
else left.appendChild(K.h('p',{c:'q'},'🍋 Sandbox: change the market and see how the best price moves.'));
var tip=K.h('div',{c:'tipb','aria-live':'polite'});
if(!t||t.k==='slider'){
var bigP=K.h('div',{c:'big2'},rs(st.p));
left.appendChild(bigP);
left.appendChild(slider('Your price',0,pm,0.5,st.p,rs,function(v){st.p=v;bigP.textContent=rs(v);table();cv.draw(cv);}));
if(!t){
[['Customers at ₹0 (demand)','a',40,240,10],['Customers lost per ₹1','b',1,10,1],['Cost per glass','c',1,20,1],['Stall rent (fixed)','F',0,600,50],['Stock limit (0 = none)','cap',0,150,10]].forEach(function(s){
left.appendChild(slider(s[0],s[2],s[3],s[4],st.m[s[1]],function(v){return s[1]==='c'||s[1]==='F'?rs(v):String(v);},function(v){st.m[s[1]]=v;st.p=Math.min(st.p,st.m.a/st.m.b);table();cv.draw(cv);}));
});
left.appendChild(K.btn('🎯 Show best price','ghost',function(){st.showBest=!st.showBest;cv.draw(cv);var bp=best(st.m,prof);tip.textContent='Best price ≈ '+rs(bp)+' for profit '+rs(prof(st.m,bp))+'. Formula (no stock limit): (a ÷ b + cost) ÷ 2.';}));
}else{
left.appendChild(K.h('div',{c:'row'},[K.btn('✓ Lock in price','pri',function(){
if(st.solved)return;var m=st.m,ok=false,bp=best(m,t.test==='rev'?rev:prof);
if(t.test==='p400')ok=prof(m,st.p)>=400;else ok=Math.abs(st.p-bp)<=1.01;
if(ok){win(t);tip.textContent='💡 '+t.tip+' (Best: '+rs(bp)+')';st.showBest=true;cv.draw(cv);}
else{st.tries++;K.sound('bad');var d=t.test==='p400'?'':st.p<bp?' Try a higher price.':' Try a lower price.';S.fb('Not yet: profit '+rs(prof(m,st.p))+(t.test==='rev'?', revenue '+rs(rev(m,st.p)):'')+'.'+d,'bad');if(st.tries>=2)tip.textContent='💡 '+t.tip;}
})]));
}
}else if(t.k==='mcq'){
var box=K.h('div',{c:'opts2'}),order=K.shuffle([0,1,2,3]);
order.forEach(function(oi){var b=K.btn(t.opts[oi],'',function(){if(st.solved)return;if(oi===0){b.classList.add(K.P+'-good-b');win(t);tip.textContent='💡 '+t.tip;}else{st.tries++;b.classList.add(K.P+'-bad-b');K.sound('bad');S.fb('Not quite — check the table on the right.','bad');}});box.appendChild(b);});
left.appendChild(box);st.p=t.q.indexOf('24')>=0?18:6;
}else if(t.k==='num'){
var inp=K.h('input',{c:'in',type:'number',inputmode:'numeric',min:0,'aria-label':'Number of glasses',placeholder:'glasses'});
st.p=15;
left.appendChild(K.h('div',{c:'row'},[inp,K.btn('✓ Check','pri',function(){if(st.solved)return;var v=parseFloat(inp.value);if(v===t.ans){win(t);tip.textContent='💡 '+t.tip;}else{st.tries++;K.sound('bad');S.fb('Not quite. Each glass sold at ₹15 earns ₹15 − ₹6 towards the ₹300 rent. '+(st.tries>=2?t.tip:''),'bad');}})]));
K.on(inp,'keydown',function(e){if(e.key==='Enter'){e.preventDefault();inp.nextSibling.click();}});
}
left.appendChild(tip);
tbl=K.h('table',{c:'tbl','aria-label':'Stall results'});left.appendChild(tbl);
table();cv.draw(cv);hud();
}
function win(t){st.solved=true;st.score+=st.tries===0?1:st.tries===1?0.7:0.4;K.sound('good');K.burst(K.root.clientWidth/2,160,30);S.fb('✓ Great business sense!','good');nextStep();}
function nextStep(){
if(S.mode==='free'){K.award(2,'Market Day practice');left.appendChild(K.h('div',{c:'row'},[K.btn('Next customer ▶','pri',function(){load();})]));return;}
K.award(4+2*S.diff,'Market Day task '+(st.i+1));
left.appendChild(K.h('div',{c:'row'},[K.btn(st.i+1>=5?'Finish 🏁':'Next ▶','pri',function(){st.i++;if(st.i>=5)S.finish(100*st.score/5,['Profit = revenue − costs. The best price balances profit per item against how many you sell.'],guided,free);else load();})]));
}
function load(){st.tries=0;st.solved=false;if(S.diff===0)changeTask();else priceTask();}
function hud(){S.clearChips();if(S.mode==='guided')S.chip('t','Task',(st.i+1)+'/5');S.chip('s','Score',Math.round(st.score*10)/10);}
function guided(){S.setMode('guided');st={i:0,score:0,given:[]};load();}
function free(){S.setMode('free');st={i:0,score:0,given:[]};load();}
S=K.shell({title:'Market Day',icon:'🛒',goal:'Run a nimbu-pani stall: give the right change, then choose prices that make the most profit.',
diffs:['Giving change','Pricing','Business maths'],
how:['Giving change: work out price → paid, then tap rupee coins and notes. Fewest pieces earns full marks.','Pricing: move the price slider. The graph shows profit (green) and revenue (blue) at every price; the yellow dot is you.','Business maths: break-even, fixed costs, revenue vs profit, margin vs markup and stock limits.','Free play: random customers or a sandbox where you change demand, costs, rent and stock.'],
note:'Simplified model: demand falls in a straight line as price rises (glasses = a − b × price), every customer is alike, no taxes or waste, one day only. Indian coins ₹1, ₹2, ₹5 and notes ₹10–₹200 are used (₹10 and ₹20 also exist as coins).',
onChange:function(){if(S.mode==='free')free();else guided();}});
var lay=K.h('div',{c:'lay'}),right=K.h('div');
left=K.h('div',{c:'panel'});
lay.appendChild(left);lay.appendChild(right);S.stage.appendChild(lay);
st={given:[],kind:'change'};
cv=K.canvas(right,0.72,draw,260,460);
cv.c.setAttribute('role','img');cv.c.setAttribute('aria-label','Counter or price graph; values are also in the table');
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
