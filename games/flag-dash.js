/* VidyaVerse University (v2) - game: Flag Dash (flag-dash). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="flag-dash";
var CSS=".vv-flag-dash-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-flag-dash-root *,.vv-flag-dash-root *::before,.vv-flag-dash-root *::after{box-sizing:border-box}.vv-flag-dash-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-flag-dash-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-flag-dash-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-flag-dash-ttx{min-width:0}.vv-flag-dash-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-flag-dash-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-flag-dash-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-flag-dash-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-flag-dash-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-flag-dash-seg .vv-flag-dash-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-flag-dash-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-flag-dash-btn:hover{background:rgba(255,255,255,.13)}.vv-flag-dash-btn:active{transform:scale(.95)}.vv-flag-dash-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-flag-dash-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-flag-dash-btn[aria-pressed=true],.vv-flag-dash-seg .vv-flag-dash-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-flag-dash-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-flag-dash-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-flag-dash-ghost{background:rgba(255,255,255,.04)}.vv-flag-dash-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-flag-dash-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-flag-dash-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-flag-dash-how[hidden]{display:none}.vv-flag-dash-how p{margin:0 0 6px}.vv-flag-dash-how ol{margin:4px 0 4px 20px;padding:0}.vv-flag-dash-how li{margin:3px 0}.vv-flag-dash-note{color:var(--mu);font-size:13px}.vv-flag-dash-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-flag-dash-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-flag-dash-chip b{color:var(--a2);font-weight:750}.vv-flag-dash-stage{position:relative;min-height:280px}.vv-flag-dash-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-flag-dash-fb.vv-flag-dash-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-flag-dash-fb.vv-flag-dash-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-flag-dash-fb.vv-flag-dash-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-flag-dash-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-flag-dash-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-flag-dash-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-flag-dash-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-flag-dash-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-flag-dash-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-flag-dash-card h4{margin:0 0 8px;font-size:22px}.vv-flag-dash-card p{margin:6px 0}@keyframes vv-flag-dash-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-flag-dash-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-flag-dash-shake{animation:vv-flag-dash-shake .35s}.vv-flag-dash-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-flag-dash-big{font-size:30px;font-weight:800}.vv-flag-dash-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-flag-dash-grid{display:grid;gap:10px}.vv-flag-dash-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-flag-dash-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-flag-dash-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-flag-dash-mu{color:var(--mu)}.vv-flag-dash-tiny .vv-flag-dash-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-flag-dash-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-flag-dash-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-flag-dash-root{border-radius:16px;font-size:15px}.vv-flag-dash-btn{padding:8px 10px}.vv-flag-dash-goal{font-size:13px}.vv-flag-dash-seg .vv-flag-dash-btn{padding:6px 9px}}@media (min-width:1800px){.vv-flag-dash-root{font-size:19px}.vv-flag-dash-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-flag-dash-root *{animation:none!important;transition:none!important}}.vv-flag-dash-rm *{animation:none!important;transition:none!important}.vv-flag-dash-root{--a:#f97316;--a2:#facc15;--g1:rgba(249,115,22,.28);--g2:rgba(250,204,21,.2);--bg1:#1c1206;--bg2:#2b1a0b}.vv-flag-dash-opts{display:grid;gap:10px;grid-template-columns:1fr;margin-top:12px}@media (min-width:520px){.vv-flag-dash-opts{grid-template-columns:1fr 1fr}}.vv-flag-dash-opt{font-size:18px;justify-content:flex-start;text-align:left;display:flex;gap:10px;align-items:center}.vv-flag-dash-opt .vv-flag-dash-k{display:inline-flex;width:28px;height:28px;border-radius:50%;align-items:center;justify-content:center;background:rgba(250,204,21,.25);font-weight:800;flex:none}.vv-flag-dash-ask{font-size:clamp(17px,2.4vw,22px);font-weight:700;margin:12px 0 0;text-align:center}.vv-flag-dash-fact{margin-top:10px;padding:10px 14px;border-radius:14px;background:rgba(255,255,255,.06);min-height:1.5em}";
var DATA={"flags":[{"n":"India","c":"New Delhi","k":"Asia","r":1.5,"s":["india"],"f":"The Ashoka Chakra in the centre has 24 spokes. The flag was adopted on 22 July 1947.","g":"asia"},{"n":"Japan","c":"Tokyo","k":"Asia","r":1.5,"s":["disc","#ffffff","#bc002d",0.5,0.3],"f":"Called Hinomaru, \"circle of the sun\".","g":"asia"},{"n":"Bangladesh","c":"Dhaka","k":"Asia","r":1.6666666666666667,"s":["disc","#006a4e","#f42a41",0.45,0.333],"f":"The red disc sits a little towards the pole so it looks centred when the flag flies.","g":"asia"},{"n":"Indonesia","c":"Jakarta","k":"Asia","r":1.5,"s":["h","#ce1126","#ffffff"],"f":"Red over white. Monaco's flag uses the same colours; Poland's is the reverse (white over red).","g":"asia"},{"n":"Thailand","c":"Bangkok","k":"Asia","r":1.5,"s":["h","#a51931","#f4f5f8","#2d2a4a","#f4f5f8","#a51931",[1,1,2,1,1]],"f":"The middle blue band is twice as wide as the others.","g":"asia"},{"n":"Laos","c":"Vientiane","k":"Asia","r":1.5,"s":["laos"],"f":"The white disc is often described as the full moon over the Mekong River.","g":"asia"},{"n":"Yemen","c":"Sana'a","k":"Asia","r":1.5,"s":["h","#ce1126","#ffffff","#000000"],"f":"Red, white and black — a pan-Arab colour set.","g":"asia"},{"n":"Armenia","c":"Yerevan","k":"Asia","r":2,"s":["h","#d90012","#0033a0","#f2a800"],"f":"Red, blue and apricot-orange horizontal stripes.","g":"asia"},{"n":"France","c":"Paris","k":"Europe","r":1.5,"s":["v","#0055a4","#ffffff","#ef4135"],"f":"The \"Tricolore\" — blue, white and red.","g":"tri"},{"n":"Italy","c":"Rome","k":"Europe","r":1.5,"s":["v","#009246","#ffffff","#ce2b37"],"f":"Green, white and red. Looks like Ireland's flag but with red instead of orange.","g":"tri"},{"n":"Ireland","c":"Dublin","k":"Europe","r":2,"s":["v","#169b62","#ffffff","#ff883e"],"f":"Green, white, orange. Côte d'Ivoire has the same colours in reverse order.","g":"tri"},{"n":"Belgium","c":"Brussels","k":"Europe","r":1.1538461538461537,"s":["v","#000000","#fae042","#ed2939"],"f":"Black, yellow and red vertical bands — nearly square in shape.","g":"tri"},{"n":"Romania","c":"Bucharest","k":"Europe","r":1.5,"s":["v","#002b7f","#fcd116","#ce1126"],"f":"Almost identical to Chad's flag; Chad's blue is a little darker.","g":"look"},{"n":"Germany","c":"Berlin","k":"Europe","r":1.6666666666666667,"s":["h","#000000","#dd0000","#ffce00"],"f":"Black, red and gold horizontal bands.","g":"tri"},{"n":"Russia","c":"Moscow","k":"Europe","r":1.5,"s":["h","#ffffff","#0039a6","#d52b1e"],"f":"White, blue, red from top. The Netherlands uses red, white, blue.","g":"tri"},{"n":"Netherlands","c":"Amsterdam","k":"Europe","r":1.5,"s":["h","#ae1c28","#ffffff","#21468b"],"f":"One of the oldest tricolours. Amsterdam is the capital; the government sits in The Hague.","g":"tri"},{"n":"Luxembourg","c":"Luxembourg","k":"Europe","r":1.6666666666666667,"s":["h","#ed2939","#ffffff","#00a1de"],"f":"Like the Dutch flag but with a lighter blue and a longer shape.","g":"look"},{"n":"Austria","c":"Vienna","k":"Europe","r":1.5,"s":["h","#ed2939","#ffffff","#ed2939"],"f":"Red-white-red, one of the oldest national flag designs.","g":"tri"},{"n":"Hungary","c":"Budapest","k":"Europe","r":2,"s":["h","#ce2939","#ffffff","#477050"],"f":"Red, white and green horizontal stripes.","g":"tri"},{"n":"Bulgaria","c":"Sofia","k":"Europe","r":1.6666666666666667,"s":["h","#ffffff","#00966e","#d62612"],"f":"White, green and red horizontal stripes.","g":"tri"},{"n":"Estonia","c":"Tallinn","k":"Europe","r":1.5714285714285714,"s":["h","#0072ce","#000000","#ffffff"],"f":"Blue, black and white.","g":"tri"},{"n":"Lithuania","c":"Vilnius","k":"Europe","r":1.6666666666666667,"s":["h","#fdb913","#006a44","#c1272d"],"f":"Yellow, green and red.","g":"tri"},{"n":"Poland","c":"Warsaw","k":"Europe","r":1.6,"s":["h","#ffffff","#dc143c"],"f":"White over red — the reverse of Indonesia.","g":"look"},{"n":"Ukraine","c":"Kyiv","k":"Europe","r":1.5,"s":["h","#0057b7","#ffd700"],"f":"Blue over yellow, often described as blue sky over golden wheat fields.","g":"tri"},{"n":"Greece","c":"Athens","k":"Europe","r":1.5,"s":["greece"],"f":"Nine blue and white stripes, with a white cross in the corner.","g":"nordic"},{"n":"Sweden","c":"Stockholm","k":"Europe","r":1.6,"s":["nordic","#006aa7","#fecc00",0.3125,0.4375,0.4,0.6],"f":"A yellow Nordic cross on blue. The cross is shifted towards the pole.","g":"nordic"},{"n":"Finland","c":"Helsinki","k":"Europe","r":1.6363636363636365,"s":["nordic","#ffffff","#002f6c",0.2778,0.4444,0.3636,0.6364],"f":"A blue Nordic cross on white.","g":"nordic"},{"n":"Denmark","c":"Copenhagen","k":"Europe","r":1.3214285714285714,"s":["nordic","#c8102e","#ffffff",0.3243,0.4324,0.4286,0.5714],"f":"The Dannebrog is often called the oldest national flag still in use.","g":"nordic"},{"n":"Norway","c":"Oslo","k":"Europe","r":1.375,"s":["nordic","#ba0c2f","#ffffff","#00205b",0.2727,0.4545,0.375,0.625,0.3182,0.4091,0.4375,0.5625],"f":"A blue cross with a white border on red.","g":"nordic"},{"n":"Iceland","c":"Reykjavík","k":"Europe","r":1.3888888888888888,"s":["nordic","#02529c","#ffffff","#dc1e35",0.28,0.44,0.3889,0.6111,0.32,0.4,0.4444,0.5556],"f":"A red cross with a white border on blue — Norway's colours swapped.","g":"nordic"},{"n":"Switzerland","c":"Bern","k":"Europe","r":1,"s":["swiss"],"f":"One of only two square national flags (with Vatican City). Bern is the \"federal city\".","g":"nordic"},{"n":"Nigeria","c":"Abuja","k":"Africa","r":2,"s":["v","#008751","#ffffff","#008751"],"f":"Green-white-green; green for the land, white for peace.","g":"afam"},{"n":"Côte d'Ivoire","c":"Yamoussoukro","k":"Africa","r":1.5,"s":["v","#f77f00","#ffffff","#009e60"],"f":"Orange, white, green — Ireland's colours in reverse. Abidjan is the largest city.","g":"look"},{"n":"Chad","c":"N'Djamena","k":"Africa","r":1.5,"s":["v","#002664","#fecb00","#c60c30"],"f":"Blue, gold and red — almost the same as Romania's flag.","g":"look"},{"n":"Mali","c":"Bamako","k":"Africa","r":1.5,"s":["v","#14b53a","#fcd116","#ce1126"],"f":"Green, gold, red — the pan-African colours. Guinea uses them in reverse.","g":"afam"},{"n":"Guinea","c":"Conakry","k":"Africa","r":1.5,"s":["v","#ce1126","#fcd116","#009460"],"f":"Red, gold, green — Mali's colours in reverse order.","g":"look"},{"n":"Gabon","c":"Libreville","k":"Africa","r":1.3333333333333333,"s":["h","#009e60","#fcd116","#3a75c4"],"f":"Green, yellow and blue horizontal stripes.","g":"afam"},{"n":"Sierra Leone","c":"Freetown","k":"Africa","r":1.5,"s":["h","#1eb53a","#ffffff","#0072c6"],"f":"Green, white and blue horizontal stripes.","g":"afam"},{"n":"Botswana","c":"Gaborone","k":"Africa","r":1.5,"s":["h","#6da9d2","#ffffff","#000000","#ffffff","#6da9d2",[9,1,4,1,9]],"f":"Light blue stands for water and rain (\"pula\").","g":"afam"},{"n":"Colombia","c":"Bogotá","k":"South America","r":1.5,"s":["h","#fcd116","#003893","#ce1126",[2,1,1]],"f":"The yellow band takes up the top half of the flag.","g":"afam"},{"n":"Peru","c":"Lima","k":"South America","r":1.5,"s":["v","#d91023","#ffffff","#d91023"],"f":"Red-white-red vertical bands (the civil flag has no coat of arms).","g":"afam"}],"levels":[["asia","Asia"],["tri","European tricolours"],["nordic","Crosses & corners"],["afam","Africa & the Americas"],["look","Look-alike showdown"]]};
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
title:"Flag Dash",
icon:"🏁",
faculty:"school",
bands:["primary","middle","secondary","senior","pro"],
summary:"Race against the clock to name 40+ national flags drawn in true colours, spot look-alikes such as Chad and Romania, and learn capitals and flag facts.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},optB=[],askEl,factEl,off=null,offK='',T=0,loop=null,timer=null,nextB;
var FL=DATA.flags;
function stripes(g,cols,w,h,vert,wts){
wts=wts||cols.map(function(){return 1;});var tot=wts.reduce(function(a,b){return a+b;},0),p=0;
cols.forEach(function(c,i){var s=wts[i]/tot;g.fillStyle=c;if(vert)g.fillRect(Math.floor(p*w),0,Math.ceil(s*w)+1,h);else g.fillRect(0,Math.floor(p*h),w,Math.ceil(s*h)+1);p+=s;});
}
function drawFlag(g,f,w,h){
var s=f.s,t=s[0];
if(t==='h'||t==='v'){var cols=s.slice(1).filter(function(x){return typeof x==='string';}),wts=Array.isArray(s[s.length-1])?s[s.length-1]:null;stripes(g,cols,w,h,t==='v',wts);}
else if(t==='disc'){g.fillStyle=s[1];g.fillRect(0,0,w,h);g.fillStyle=s[2];g.beginPath();g.arc(w*s[3],h/2,h*s[4],0,6.283);g.fill();}
else if(t==='laos'){stripes(g,['#ce1126','#002868','#ce1126'],w,h,false,[1,2,1]);g.fillStyle='#fff';g.beginPath();g.arc(w/2,h/2,h*0.2,0,6.283);g.fill();}
else if(t==='nordic'){
g.fillStyle=s[1];g.fillRect(0,0,w,h);g.fillStyle=s[2];
var o=typeof s[3]==='string'?4:3;
g.fillRect(w*s[o],0,w*(s[o+1]-s[o]),h);g.fillRect(0,h*s[o+2],w,h*(s[o+3]-s[o+2]));
if(o===4){g.fillStyle=s[3];g.fillRect(w*s[o+4],0,w*(s[o+5]-s[o+4]),h);g.fillRect(0,h*s[o+6],w,h*(s[o+7]-s[o+6]));}
}else if(t==='swiss'){g.fillStyle='#da291c';g.fillRect(0,0,w,h);g.fillStyle='#fff';var a=w*6/32,b=w*20/32;g.fillRect((w-a)/2,(h-b)/2,a,b);g.fillRect((w-b)/2,(h-a)/2,b,a);}
else if(t==='greece'){var sh=h/9;for(var i=0;i<9;i++){g.fillStyle=i%2?'#fff':'#0d5eaf';g.fillRect(0,i*sh,w,sh+1);}g.fillStyle='#0d5eaf';g.fillRect(0,0,sh*5,sh*5);g.fillStyle='#fff';g.fillRect(sh*2,0,sh,sh*5);g.fillRect(0,sh*2,sh*5,sh);}
else if(t==='india'){
stripes(g,['#ff9933','#ffffff','#138808'],w,h,false);var cx=w/2,cy=h/2,r=h/3*0.46;
g.strokeStyle='#000080';g.lineWidth=Math.max(1,r*0.09);g.beginPath();g.arc(cx,cy,r,0,6.283);g.stroke();
g.lineWidth=Math.max(0.6,r*0.035);
for(var k=0;k<24;k++){var an=k*Math.PI/12;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(an)*r,cy+Math.sin(an)*r);g.stroke();}
g.fillStyle='#000080';g.beginPath();g.arc(cx,cy,r*0.17,0,6.283);g.fill();
}
}
function makeOff(f,w,h){
var key=f.n+w+'x'+h;if(offK===key)return off;
off=off||document.createElement('canvas');off.width=Math.max(1,Math.round(w));off.height=Math.max(1,Math.round(h));
var g=off.getContext('2d');g.setTransform(1,0,0,1,0,0);drawFlag(g,f,off.width,off.height);offK=key;return off;
}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#3a2410');bg.addColorStop(1,'#140c05');g.fillStyle=bg;g.fillRect(0,0,w,h);
var trackH=44,fhMax=h-trackH-30,f=st.f;
if(f){
var fh=Math.min(fhMax,(w-80)/f.r),fw=fh*f.r,x0=(w-fw)/2+10,y0=14+(fhMax-fh)/2;
var src=makeOff(f,fw*o.dpr,fh*o.dpr),still=K.rm||K.lp,amp=still?0:fh*0.035,step=Math.max(3,Math.round(fw/90));
g.fillStyle='#c9a36a';K.rr(g,x0-10,y0-8,6,h-trackH-y0-6,3);g.fill();
g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x0+6,y0+8,fw,fh);
for(var x=0;x<fw;x+=step){
var sw=Math.min(step,fw-x),ph=x/fw,dy=Math.sin(x*0.035-T*4)*amp*ph;
g.drawImage(src,x*o.dpr,0,sw*o.dpr,fh*o.dpr,x0+x,y0+dy,sw+0.6,fh);
if(!still){var sh=Math.cos(x*0.035-T*4)*ph;g.fillStyle=sh>0?'rgba(255,255,255,'+(sh*0.14)+')':'rgba(0,0,0,'+(-sh*0.22)+')';g.fillRect(x0+x,y0+dy,sw+0.6,fh);}
}
g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1;g.strokeRect(x0+0.5,y0+0.5,fw-1,fh-1);
}
var ty=h-trackH-6;
g.fillStyle='#7c2d12';K.rr(g,10,ty,w-20,trackH,12);g.fill();
g.strokeStyle='rgba(255,255,255,.4)';g.setLineDash([8,8]);g.beginPath();g.moveTo(20,ty+trackH/2);g.lineTo(w-20,ty+trackH/2);g.stroke();g.setLineDash([]);
var goal=S.mode==='guided'?st.total:20,pr=Math.min(1,(st.right||0)/goal);
g.font='28px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif';g.textAlign='center';g.textBaseline='middle';
g.fillText('🏁',w-30,ty+trackH/2);
g.save();g.translate(30+(w-90)*pr,ty+trackH/2);g.scale(-1,1);g.fillText('🏃',0,0);g.restore();
g.textBaseline='alphabetic';
if(st.tmax){var tf=Math.max(0,st.left/st.tmax);g.fillStyle='rgba(255,255,255,.12)';g.fillRect(10,h-4,w-20,4);g.fillStyle=tf>0.3?'#facc15':'#ef4444';g.fillRect(10,h-4,(w-20)*tf,4);}
}
function poolFor(){return S.mode==='guided'?FL.filter(function(f){return f.g===DATA.levels[st.li][0];}):FL;}
function ask(){
var pool=poolFor(),f;
do{f=K.pick(pool);}while(st.seen.indexOf(f.n)>=0&&st.seen.length<pool.length);
st.seen.push(f.n);st.f=f;st.locked=false;
var mode=S.diff===2?(Math.random()<0.6?'c':'k'):'n';
st.qmode=mode;
var n=S.diff===0?3:4,key=mode==='n'?'n':mode==='c'?'c':'k',right=f[key];
var cands=FL.filter(function(x){return x[key]!==right;});
if(S.diff>=1){var same=cands.filter(function(x){return x.g===f.g||x.k===f.k;});cands=K.shuffle(same).concat(K.shuffle(cands));}else cands=K.shuffle(cands);
var opts=[right];
if(mode==='k'){['Asia','Europe','Africa','South America','North America','Oceania'].forEach(function(c){if(opts.length<n&&c!==right&&Math.random()<0.8)opts.push(c);});while(opts.length<n){var c2=K.pick(['North America','Oceania','Asia','Africa']);if(opts.indexOf(c2)<0)opts.push(c2);}}
else for(var i=0;i<cands.length&&opts.length<n;i++)if(opts.indexOf(cands[i][key])<0)opts.push(cands[i][key]);
st.opts=K.shuffle(opts);st.ans=st.opts.indexOf(right);
askEl.textContent=mode==='n'?'Which country does this flag belong to?':mode==='c'?'What is the capital of the country with this flag?':'On which continent is this country?';
optB.forEach(function(b,i){b.hidden=i>=n;b.disabled=false;b.className=K.c('btn opt');if(i<n){b.lastChild.textContent=st.opts[i];b.setAttribute('aria-label',(i+1)+': '+st.opts[i]);}});
factEl.textContent='';nextB.hidden=true;
cv.c.setAttribute('aria-label','A national flag to identify');
st.tmax=K.tiny?0:[15,10,8][S.diff];st.left=st.tmax;
if(timer)K.clear(timer);
var last=performance.now();
if(st.tmax)timer=K.every(100,function(){var now=performance.now();st.left-=(now-last)/1000;last=now;if(!loop)cv.draw(cv);if(st.left<=0&&!st.locked)answer(-1);});
hud();cv.draw(cv);
try{S.root.focus({preventScroll:true});}catch(e){}
}
function answer(i){
if(st.locked)return;st.locked=true;if(timer){K.clear(timer);timer=null;}
var ok=i===st.ans,f=st.f;
optB.forEach(function(b,j){b.disabled=true;if(j===st.ans)b.classList.add(K.P+'-good-b');else if(j===i)b.classList.add(K.P+'-bad-b');});
if(ok){st.right++;st.streak++;st.pts+=10+Math.max(0,Math.ceil(st.left));K.sound('good');var p=K.rel(optB[i]);K.burst(p.x,p.y,16);S.fb('✓ '+f.n+'! '+(st.streak>2?'🔥 '+st.streak+' in a row.':''),'good');}
else{st.streak=0;st.lives--;K.sound('bad');S.fb((i<0?'⏱ Time! ':'✗ ')+'It was '+f.n+'.','bad');}
factEl.textContent='🏳️ '+f.n+' · capital '+f.c+' · '+f.k+'. '+f.f;
K.say(f.n+'. Capital: '+f.c+'.');
st.asked++;hud();cv.draw(cv);
if(S.mode==='free'&&st.lives<=0){K.after(900,function(){K.award(Math.min(25,st.right*2),'Flag Dash free run');S.card('Out of lives',[st.right+' flags right · '+st.pts+' points'],[['↺ Run again',free]]);});return;}
nextB.hidden=false;try{nextB.focus({preventScroll:true});}catch(e){}
}
function next(){
if(S.mode==='guided'&&st.asked>=(st.li+1)*4){
st.lvRight.push(st.right-st.prevRight);st.prevRight=st.right;
K.award(5+2*S.diff,'Flag Dash: '+DATA.levels[st.li][1]);
if(st.li+1>=DATA.levels.length){S.finish(100*st.right/st.total,[st.right+' of '+st.total+' flags · '+st.pts+' points','Look for the details: order of stripes, shades and proportions.'],guided,free);return;}
st.li++;st.seen=[];K.sound('win');
S.card('Stage clear! 🏁',['Next: '+DATA.levels[st.li][1]],[['▶ Go',ask]]);return;
}
ask();
}
function hud(){
S.clearChips();
if(S.mode==='guided')S.chip('l','Stage',(st.li+1)+'/5 · '+DATA.levels[st.li][1]);else S.chip('h','Lives','❤️'.repeat(Math.max(0,st.lives))||'0');
S.chip('r','Right',st.right);S.chip('p','Points',st.pts);
}
function start(mode){
S.setMode(mode);st={li:0,right:0,prevRight:0,lvRight:[],streak:0,pts:0,asked:0,total:20,lives:3,seen:[]};
S.fb(mode==='guided'?'5 stages × 4 flags. Faster answers earn bonus points.':'Endless dash through all flags. 3 lives!','info');ask();
}
function guided(){start('guided');}
function free(){start('free');}
S=K.shell({title:'Flag Dash',icon:'🏁',goal:'Name each flag (or its capital) before the timer runs out.',
how:['Look closely at the flag: stripe direction, order of colours and symbols.','Tap an answer or press 1–4. Easy: 3 choices. Medium: 4 choices with look-alikes. Hard: capitals and continents.','Read the fact after each flag, then press Next.','Guided: 5 themed stages. Free play: endless with 3 lives.'],
note:'Flags are drawn from simplified official proportions and colours; emblems and coats of arms are left out.',
onChange:function(){if(timer){K.clear(timer);timer=null;}if(S.mode==='free')free();else guided();}});
cv=K.canvas(S.stage,0.6,draw,230,440);
cv.c.setAttribute('role','img');
askEl=K.h('p',{c:'ask','aria-live':'polite'});
var opts=K.h('div',{c:'opts'});
for(var i=0;i<4;i++)(function(i){var b=K.btn([K.h('span',{c:'k'},String(i+1)),K.h('span',null,'')],'opt',function(){answer(i);});optB.push(b);opts.appendChild(b);})(i);
factEl=K.h('div',{c:'fact','aria-live':'polite'});
nextB=K.btn('Next flag ▶','pri',next);
S.stage.appendChild(askEl);S.stage.appendChild(opts);S.stage.appendChild(factEl);S.stage.appendChild(K.h('div',{c:'row'},[nextB]));
K.on(S.root,'keydown',function(e){var k=parseInt(e.key,10);if(k>=1&&k<=4&&!st.locked&&optB[k-1]&&!optB[k-1].hidden){e.preventDefault();answer(k-1);}});
st={li:0,seen:[]};
if(!K.rm&&!K.lp)loop=K.loop(function(dt){T+=dt;cv.draw(cv);});
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
