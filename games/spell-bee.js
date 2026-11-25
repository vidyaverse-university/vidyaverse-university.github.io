/* VidyaVerse University (v2) - game: Spell Bee (spell-bee). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="spell-bee";
var CSS=".vv-spell-bee-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-spell-bee-root *,.vv-spell-bee-root *::before,.vv-spell-bee-root *::after{box-sizing:border-box}.vv-spell-bee-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-spell-bee-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-spell-bee-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-spell-bee-ttx{min-width:0}.vv-spell-bee-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-spell-bee-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-spell-bee-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-spell-bee-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-spell-bee-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-spell-bee-seg .vv-spell-bee-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-spell-bee-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-spell-bee-btn:hover{background:rgba(255,255,255,.13)}.vv-spell-bee-btn:active{transform:scale(.95)}.vv-spell-bee-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-spell-bee-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-spell-bee-btn[aria-pressed=true],.vv-spell-bee-seg .vv-spell-bee-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-spell-bee-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-spell-bee-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-spell-bee-ghost{background:rgba(255,255,255,.04)}.vv-spell-bee-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-spell-bee-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-spell-bee-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-spell-bee-how[hidden]{display:none}.vv-spell-bee-how p{margin:0 0 6px}.vv-spell-bee-how ol{margin:4px 0 4px 20px;padding:0}.vv-spell-bee-how li{margin:3px 0}.vv-spell-bee-note{color:var(--mu);font-size:13px}.vv-spell-bee-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-spell-bee-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-spell-bee-chip b{color:var(--a2);font-weight:750}.vv-spell-bee-stage{position:relative;min-height:280px}.vv-spell-bee-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-spell-bee-fb.vv-spell-bee-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-spell-bee-fb.vv-spell-bee-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-spell-bee-fb.vv-spell-bee-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-spell-bee-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-spell-bee-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-spell-bee-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-spell-bee-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-spell-bee-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-spell-bee-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-spell-bee-card h4{margin:0 0 8px;font-size:22px}.vv-spell-bee-card p{margin:6px 0}@keyframes vv-spell-bee-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-spell-bee-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-spell-bee-shake{animation:vv-spell-bee-shake .35s}.vv-spell-bee-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-spell-bee-big{font-size:30px;font-weight:800}.vv-spell-bee-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-spell-bee-grid{display:grid;gap:10px}.vv-spell-bee-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-spell-bee-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-spell-bee-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-spell-bee-mu{color:var(--mu)}.vv-spell-bee-tiny .vv-spell-bee-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-spell-bee-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-spell-bee-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-spell-bee-root{border-radius:16px;font-size:15px}.vv-spell-bee-btn{padding:8px 10px}.vv-spell-bee-goal{font-size:13px}.vv-spell-bee-seg .vv-spell-bee-btn{padding:6px 9px}}@media (min-width:1800px){.vv-spell-bee-root{font-size:19px}.vv-spell-bee-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-spell-bee-root *{animation:none!important;transition:none!important}}.vv-spell-bee-rm *{animation:none!important;transition:none!important}.vv-spell-bee-root{--a:#fbbf24;--a2:#f59e0b;--g1:rgba(251,191,36,.28);--g2:rgba(16,185,129,.2);--bg1:#1a1405;--bg2:#2d2209}.vv-spell-bee-lay{display:grid;gap:14px}@media (min-width:780px){.vv-spell-bee-lay{grid-template-columns:minmax(0,1.15fr) minmax(260px,.85fr)}}.vv-spell-bee-def{font-size:clamp(18px,2.4vw,22px);font-weight:650;margin:0 0 6px}.vv-spell-bee-sen{font-style:italic;color:#fde68a;margin:0 0 12px}.vv-spell-bee-tiles{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 12px}.vv-spell-bee-tile{width:clamp(26px,6vw,38px);height:clamp(34px,7vw,46px);border-radius:9px;background:rgba(0,0,0,.32);border:1px solid var(--ln);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:clamp(16px,3vw,22px);text-transform:lowercase}.vv-spell-bee-tile.vv-spell-bee-ok{background:rgba(34,197,94,.35);border-color:#22c55e}.vv-spell-bee-tile.vv-spell-bee-no{background:rgba(244,63,94,.35);border-color:#f43f5e}.vv-spell-bee-tile.vv-spell-bee-hint{background:rgba(251,191,36,.3);border-color:#fbbf24}.vv-spell-bee-peek{font-size:clamp(28px,6vw,46px);font-weight:800;letter-spacing:3px;text-align:center;color:#fde68a;min-height:1.3em}.vv-spell-bee-form{display:flex;gap:8px;flex-wrap:wrap}.vv-spell-bee-form .vv-spell-bee-in{flex:1 1 200px;letter-spacing:2px;text-transform:lowercase}.vv-spell-bee-tools{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.vv-spell-bee-rule{margin-top:10px;font-size:15px;color:var(--mu);min-height:1.5em}";
var DATA={"words":[[["friend","a person you like and trust","My best ___ shares her lunch with me.","A fr-I-END is there to the END."],["because","for the reason that","I wore a raincoat ___ it was raining.","Big Elephants Can Always Understand Small Elephants."],["school","a place where children learn","We walk to ___ every morning.","Here \"ch\" sounds like /k/: s-ch-ool."],["water","the clear liquid we drink","Drink a glass of ___ after playing.","The a sounds like \"aw\": w-a-t-e-r."],["people","men, women and children","Many ___ came to the fair.","Hidden o: pe-O-ple."],["little","small","The ___ kitten slept in a box.","Double t, then -le: li-tt-le."],["happy","feeling glad","She was ___ to see her grandmother.","Double p: ha-pp-y."],["garden","a place where plants are grown","We planted tomatoes in the ___.","Two small words: gar + den."],["animal","a living creature that moves and feeds","The cow is a farm ___.","Clap three beats: an-i-mal."],["family","a group of people related to each other","My ___ eats dinner together.","Do not forget the middle i: fam-i-ly."],["yellow","the colour of a ripe banana","The sunflower is bright ___.","Double l, then -ow."],["window","an opening in a wall, usually with glass","Open the ___ to let in fresh air.","Two parts: win + dow."],["answer","a reply to a question","Raise your hand to give the ___.","Silent w: ans-W-er."],["busy","having a lot to do","Mum is ___ cooking dinner.","Sounds like \"bizzy\" but is spelt b-u-s-y."]],[["necessary","needed; essential","Water is ___ for life.","One Collar, two Sleeves: one c, double s."],["separate","to divide or keep apart","___ the red beads from the blue ones.","There is \"a rat\" in sep-A-RAT-e."],["beautiful","very pleasing to look at","The sunset was ___.","Starts with \"beau\" (French for fine): b-e-a-u-ti-ful."],["library","a place where books are kept to read or borrow","I borrowed two books from the ___.","Say both r sounds: li-BRAR-y."],["believe","to think something is true","I ___ you can do it.","i before e (except after c): bel-IE-ve."],["receive","to get something that is given to you","Did you ___ my letter?","After c, e comes before i: rec-EI-ve."],["calendar","a chart showing the days, weeks and months","Mark the holiday on the ___.","It ends in -ar, not -er."],["government","the group of people who run a country or state","The ___ built a new hospital.","govern + ment: keep the n!"],["environment","the natural world around us","Plastic waste harms the ___.","environ + ment: the n before -ment is easy to forget."],["tomorrow","the day after today","We have a test ___.","One m, double r."],["different","not the same","The twins wear ___ shirts.","Double f, three beats: dif-fer-ent."],["knowledge","facts and understanding that you have learnt","Reading builds ___.","\"know\" is inside it: KNOW-ledge."],["rhythm","a regular, repeated pattern of sounds or movements","Clap to the ___ of the song.","Rhythm Helps Your Two Hips Move."],["island","a piece of land surrounded by water","Sri Lanka is an ___ nation.","Silent s: is-land."],["scissors","a cutting tool with two blades","Cut the paper with ___.","sc at the start, double s in the middle."],["embarrass","to make someone feel awkward or ashamed","Do not ___ your friend in front of others.","Two r and two s: you go Really Red and Smile Shyly."]],[["accommodate","to provide room or space for","The hall can ___ 300 people.","Double c and double m: there is room for both."],["conscientious","careful, thorough and hard-working","A ___ student checks her work twice.","con + science + -tious."],["mischievous","playfully causing small trouble","The ___ monkey stole a banana.","Only three beats: mis-chie-vous (no \"-ious\")."],["onomatopoeia","a word that imitates a sound, like \"buzz\"","\"Sizzle\" is an example of ___.","ono-mato-poeia: from Greek, \"making a name\"."],["occurrence","something that happens","Power cuts are a rare ___ here.","Double c, double r, ends in -ence."],["millennium","a period of one thousand years","The year 2000 began a new ___.","Double l, double n: Latin mille (thousand) + annus (year)."],["liaison","communication and cooperation between groups","She acts as the ___ between the two teams.","Two i letters: l-I-a-I-son."],["entrepreneur","a person who starts and runs a business","The young ___ opened a bakery.","From French: entre + pren + eur."],["bureaucracy","a system run by officials and many rules","Too much ___ slows decisions.","bureau + cracy (rule)."],["questionnaire","a set of written questions for a survey","Please fill in the ___.","Double n, then -aire."],["pronunciation","the way a word is said","Check the ___ in a dictionary.","pro-NUN-ciation: no \"noun\" in it!"],["hierarchy","a system ranked from top to bottom","The army has a strict ___.","hier + archy (rule)."],["silhouette","a dark shape seen against a lighter background","We saw the ___ of a tree at sunset.","Silent h: sil-H-ou-ette."],["manoeuvre|maneuver","a skilful or careful movement","The pilot made a sharp ___.","Indian & British: manoeuvre. US: maneuver. Both accepted."],["privilege","a special right or advantage","Voting is a ___ and a duty.","No d in it: privi-lege."],["definitely","without any doubt","I will ___ come to your party.","\"finite\" is inside: de-FINITE-ly."]]]};
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
title:"Spell Bee",
icon:"🐝",
faculty:"languages",
bands:["primary","middle","secondary","senior"],
summary:"Hear a word, read its meaning and an example sentence, then spell it — with memory tricks and spelling rules for every word.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},inp,defEl,senEl,tilesEl,peekEl,ruleEl,beeT=0,beeLoop=null;
function alts(w){return w.split('|');}
function main(w){return alts(w)[0];}
function setTiles(word,marks,show){
tilesEl.textContent='';
for(var i=0;i<word.length;i++){
var m=marks?marks[i]:'';
tilesEl.appendChild(K.h('span',{c:'tile'+(m?' '+m:'')},show&&show[i]?show[i]:''));
}
tilesEl.setAttribute('aria-label',word.length+' letters');
}
function hex(g,x,y,r){g.beginPath();for(var i=0;i<6;i++){var a=Math.PI/3*i+Math.PI/6;g.lineTo(x+r*Math.cos(a),y+r*Math.sin(a));}g.closePath();}
function cells(o){
var n=st.cells.length||5,cols=Math.min(n,o.w<360?4:6),rows=Math.ceil(n/cols);
var r=Math.min((o.w-30)/(cols*1.75+0.9),(o.h-70)/(rows*1.55+0.5)),out=[];
for(var i=0;i<n;i++){var c=i%cols,rw=Math.floor(i/cols);out.push({x:20+r*0.9+c*r*1.75+(rw%2?r*0.87:0),y:50+r+rw*r*1.52,r:r});}
return out;
}
function draw(o){
var g=o.x;g.clearRect(0,0,o.w,o.h);
var bg=g.createLinearGradient(0,0,0,o.h);bg.addColorStop(0,'#3b2a05');bg.addColorStop(1,'#1b1303');g.fillStyle=bg;g.fillRect(0,0,o.w,o.h);
g.fillStyle='#fde68a';g.font='700 14px system-ui, sans-serif';g.textAlign='left';
g.fillText(S.mode==='guided'?'Honeycomb: word '+Math.min(st.i+1,st.cells.length)+' of '+st.cells.length:'Points: '+st.pts,14,24);
var cs=cells(o);
cs.forEach(function(c,i){
var s=st.cells[i]||0;
hex(g,c.x,c.y,c.r*0.95);
var gr=g.createRadialGradient(c.x-c.r*0.3,c.y-c.r*0.3,2,c.x,c.y,c.r);
if(s===1){gr.addColorStop(0,'#fff3b0');gr.addColorStop(1,'#f59e0b');}
else if(s===2){gr.addColorStop(0,'#fde68a');gr.addColorStop(1,'#b45309');}
else if(s===3){gr.addColorStop(0,'#fca5a5');gr.addColorStop(1,'#7f1d1d');}
else{gr.addColorStop(0,'rgba(255,255,255,.12)');gr.addColorStop(1,'rgba(255,255,255,.03)');}
g.fillStyle=gr;g.fill();g.strokeStyle=i===st.i&&st.active?'#fff':'rgba(251,191,36,.6)';g.lineWidth=i===st.i&&st.active?3:1.5;g.stroke();
if(st.labels[i]){g.fillStyle=s===3?'#fff':'#3b2a05';g.font='700 '+Math.max(9,Math.min(14,c.r*0.32))+'px system-ui, sans-serif';g.textAlign='center';g.fillText(st.labels[i].length>9?st.labels[i].slice(0,8)+'…':st.labels[i],c.x,c.y+4);}
});
var tc=cs[Math.min(st.i,cs.length-1)];
if(tc){
var bx=tc.x+tc.r*0.6,by=tc.y-tc.r*0.8;
if(!K.rm){bx+=Math.sin(beeT*3)*8;by+=Math.cos(beeT*5)*5;}
g.font=Math.round(Math.max(20,tc.r*0.7))+'px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif';g.textAlign='center';g.fillText('🐝',bx,by);
}
}
function hud(){S.clearChips();if(S.mode==='guided')S.chip('w','Word',Math.min(st.i+1,st.n)+'/'+st.n);S.chip('p','Points',st.pts);S.chip('s','Streak',st.streak);}
function speak(){K.say(main(st.w[0])+'. '+st.w[2].replace('___',main(st.w[0]))+'. '+main(st.w[0])+'.');}
function newWord(){
if(S.mode==='guided'&&st.i>=st.n)return finish();
if(!st.pool.length)st.pool=K.shuffle(DATA.words[S.diff]);
st.w=st.pool.pop();st.tries=0;st.cost=0;st.hint=0;st.active=true;
if(S.mode==='free'){if(st.cells.length>=12){st.cells.shift();st.labels.shift();}st.cells.push(0);st.labels.push('');st.i=st.cells.length-1;}
defEl.textContent='📖 '+st.w[1].charAt(0).toUpperCase()+st.w[1].slice(1)+'.';
senEl.textContent='“'+st.w[2]+'”';ruleEl.textContent='';peekEl.textContent='';
setTiles(main(st.w[0]));
inp.value='';inp.disabled=false;
try{inp.focus({preventScroll:true});}catch(e){}
hud();cv.draw(cv);speak();
S.fb('Spell the word that fits: '+main(st.w[0]).length+' letters. Tap 🔊 to hear it.','info');
}
function check(){
if(!st.active)return;
var guess=inp.value.trim().toLowerCase();
if(!guess){S.fb('Type your spelling first.','info');return;}
var ok=alts(st.w[0]).indexOf(guess)>=0,word=main(st.w[0]);
if(!ok&&alts(st.w[0]).length>1){var a2=alts(st.w[0]);for(var j=0;j<a2.length;j++)if(a2[j].length===guess.length)word=a2[j];}
st.tries++;
if(ok){
var pts=Math.max(1,(st.tries===1?3:1)-st.cost);
st.pts+=pts;st.streak++;st.got+=pts;st.active=false;
st.cells[st.i]=st.tries===1&&!st.cost?1:2;st.labels[st.i]=guess;
setTiles(guess,guess.split('').map(function(){return'ok';}),guess.split(''));
K.sound('good');var p=K.rel(tilesEl);K.burst(p.x,p.y,20,['#fde68a','#f59e0b','#fff']);
S.fb('✓ Correct! +'+pts+' point'+(pts>1?'s':'')+'.','good');
ruleEl.textContent='💡 '+st.w[3];
K.award(S.diff+2,'Spelled "'+guess+'"');
advance();
}else{
K.sound('bad');st.streak=0;
var marks=[],show=[];
for(var i=0;i<word.length;i++){show.push(guess[i]||'');marks.push(guess[i]===word[i]?'ok':'no');}
setTiles(word,marks,show);
tilesEl.classList.remove(K.P+'-shake');void tilesEl.offsetWidth;tilesEl.classList.add(K.P+'-shake');
if(st.tries<2){
S.fb('Not quite. Green letters are in the right place'+(guess.length!==word.length?'; the word has '+word.length+' letters':'')+'. One more try!','bad');
ruleEl.textContent='💡 Hint: '+st.w[3];
inp.select();
}else{
st.active=false;st.cells[st.i]=3;st.labels[st.i]=word;
setTiles(word,word.split('').map(function(){return'hint';}),word.split(''));
S.fb('The spelling is “'+word+'”. Say it letter by letter: '+word.split('').join('-')+'.','bad');
ruleEl.textContent='💡 '+st.w[3];
K.say(word+'. '+word.split('').join(', '));
advance();
}
}
hud();cv.draw(cv);
}
function advance(){
inp.disabled=true;
st.i+=S.mode==='guided'?1:0;
hud();cv.draw(cv);
nextB.hidden=false;
try{nextB.focus({preventScroll:true});}catch(e){}
}
function hint(){
if(!st.active)return;
var word=main(st.w[0]);
if(st.hint>=word.length-1){S.fb('No more hints — you can do it!','info');return;}
st.hint++;st.cost++;
var show=word.slice(0,st.hint).split('');
setTiles(word,show.map(function(){return'hint';}),show);
S.fb('Hint: it starts with “'+word.slice(0,st.hint)+'” (−1 point).','info');K.sound('tap');
}
function peek(){
if(!st.active)return;
st.cost++;peekEl.textContent=main(st.w[0]);K.sound('whoosh');
S.fb('Look, picture it, then cover and spell (−1 point).','info');
K.after(K.tiny?2500:1400,function(){peekEl.textContent='';});
}
function finish(){
st.active=false;
var pct=100*st.got/(st.n*3);
S.finish(pct,[st.got+' of '+st.n*3+' points.','Strategy: Look → Say → Cover → Write → Check.'],guided,free);
}
function reset(mode){
st={pts:0,streak:0,got:0,i:0,n:5,cells:[],labels:[],pool:K.shuffle(DATA.words[S.diff]),active:false};
if(mode==='guided'){st.cells=[0,0,0,0,0];st.labels=['','','','',''];}
nextB.hidden=true;
}
function guided(){S.setMode('guided');reset('guided');newWord();}
function free(){S.setMode('free');reset('free');newWord();}
S=K.shell({title:'Spell Bee',icon:'🐝',goal:'Spell each word correctly using its meaning, an example sentence and the number of letters.',
how:['Read the meaning and the sentence. Tap 🔊 to hear the word (if sound is on).','Type the spelling and press Check (or Enter). You get two tries.','Stuck? 💡 Hint shows the next letter, 👀 Peek flashes the word — each costs a point.','Learn the memory trick shown after every word.'],
note:'Spellings follow Indian/British English (colour, manoeuvre); common US variants are accepted where shown.',
onChange:function(s){if(S.mode==='free')free();else guided();}});
var lay=K.h('div',{c:'lay'}),panel=K.h('div',{c:'panel'}),right=K.h('div');
defEl=K.h('p',{c:'def'});senEl=K.h('p',{c:'sen'});tilesEl=K.h('div',{c:'tiles',role:'img'});peekEl=K.h('div',{c:'peek','aria-live':'polite'});
var tools=K.h('div',{c:'tools'},[K.btn('🔊 Hear','ghost',function(){K.sound('tap');speak();}),K.btn('💡 Hint','ghost',hint),K.btn('👀 Peek','ghost',peek)]);
inp=K.h('input',{c:'in',type:'text',autocomplete:'off',autocapitalize:'off',autocorrect:'off',spellcheck:'false',enterkeyhint:'done','aria-label':'Your spelling',placeholder:'type the word…'});
var nextB=K.btn('Next word ▶','pri',function(){nextB.hidden=true;newWord();});
var form=K.h('div',{c:'form'},[inp,K.btn('✓ Check','pri',check),nextB]);
K.on(inp,'keydown',function(e){if(e.key==='Enter'){e.preventDefault();check();}});
ruleEl=K.h('div',{c:'rule','aria-live':'polite'});
[defEl,senEl,tilesEl,peekEl,tools,form,ruleEl].forEach(function(n){panel.appendChild(n);});
lay.appendChild(panel);lay.appendChild(right);S.stage.appendChild(lay);
st={cells:[],labels:[],i:0,pts:0};
cv=K.canvas(right,0.8,draw,220,380);
if(!K.rm)beeLoop=K.loop(function(dt){beeT+=dt;if(!K.lp||Math.round(beeT*60)%2)cv.draw(cv);});
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
