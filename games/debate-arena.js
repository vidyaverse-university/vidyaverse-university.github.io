/* VidyaVerse University (v2) - game: Debate Arena (debate-arena). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="debate-arena";
var CSS=".vv-debate-arena-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-debate-arena-root *,.vv-debate-arena-root *::before,.vv-debate-arena-root *::after{box-sizing:border-box}.vv-debate-arena-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-debate-arena-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-debate-arena-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-debate-arena-ttx{min-width:0}.vv-debate-arena-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-debate-arena-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-debate-arena-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-debate-arena-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-debate-arena-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-debate-arena-seg .vv-debate-arena-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-debate-arena-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-debate-arena-btn:hover{background:rgba(255,255,255,.13)}.vv-debate-arena-btn:active{transform:scale(.95)}.vv-debate-arena-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-debate-arena-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-debate-arena-btn[aria-pressed=true],.vv-debate-arena-seg .vv-debate-arena-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-debate-arena-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-debate-arena-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-debate-arena-ghost{background:rgba(255,255,255,.04)}.vv-debate-arena-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-debate-arena-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-debate-arena-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-debate-arena-how[hidden]{display:none}.vv-debate-arena-how p{margin:0 0 6px}.vv-debate-arena-how ol{margin:4px 0 4px 20px;padding:0}.vv-debate-arena-how li{margin:3px 0}.vv-debate-arena-note{color:var(--mu);font-size:13px}.vv-debate-arena-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-debate-arena-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-debate-arena-chip b{color:var(--a2);font-weight:750}.vv-debate-arena-stage{position:relative;min-height:280px}.vv-debate-arena-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-debate-arena-fb.vv-debate-arena-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-debate-arena-fb.vv-debate-arena-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-debate-arena-fb.vv-debate-arena-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-debate-arena-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-debate-arena-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-debate-arena-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-debate-arena-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-debate-arena-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-debate-arena-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-debate-arena-card h4{margin:0 0 8px;font-size:22px}.vv-debate-arena-card p{margin:6px 0}@keyframes vv-debate-arena-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-debate-arena-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-debate-arena-shake{animation:vv-debate-arena-shake .35s}.vv-debate-arena-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-debate-arena-big{font-size:30px;font-weight:800}.vv-debate-arena-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-debate-arena-grid{display:grid;gap:10px}.vv-debate-arena-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-debate-arena-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-debate-arena-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-debate-arena-mu{color:var(--mu)}.vv-debate-arena-tiny .vv-debate-arena-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-debate-arena-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-debate-arena-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-debate-arena-root{border-radius:16px;font-size:15px}.vv-debate-arena-btn{padding:8px 10px}.vv-debate-arena-goal{font-size:13px}.vv-debate-arena-seg .vv-debate-arena-btn{padding:6px 9px}}@media (min-width:1800px){.vv-debate-arena-root{font-size:19px}.vv-debate-arena-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-debate-arena-root *{animation:none!important;transition:none!important}}.vv-debate-arena-rm *{animation:none!important;transition:none!important}.vv-debate-arena-root{--a:#818cf8;--a2:#f472b6;--g1:rgba(129,140,248,.32);--g2:rgba(244,114,182,.24);--bg1:#0c0a24;--bg2:#24103a}.vv-debate-arena-motion{text-align:center;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#c7d2fe;margin:8px 0}.vv-debate-arena-motion b{display:block;font-size:clamp(17px,2.6vw,23px);letter-spacing:0;text-transform:none;color:#fff;margin-top:2px}.vv-debate-arena-bub{position:relative;margin:12px 0;padding:14px 16px;border-radius:18px;background:linear-gradient(135deg,rgba(244,114,182,.2),rgba(129,140,248,.2));border:1px solid rgba(255,255,255,.2);font-size:clamp(16px,2.2vw,19px)}.vv-debate-arena-bub::before{content:\"🗣️ Opponent\";display:block;font-size:12px;font-weight:800;color:#fbcfe8;margin-bottom:4px;letter-spacing:1px}.vv-debate-arena-bub.vv-debate-arena-task::before{content:\"🎯 Your move\"}.vv-debate-arena-ask{font-weight:800;margin:8px 0}.vv-debate-arena-opts{display:grid;gap:8px}@media (min-width:640px){.vv-debate-arena-opts.vv-debate-arena-two{grid-template-columns:1fr 1fr}}.vv-debate-arena-opts .vv-debate-arena-btn{text-align:left;justify-content:flex-start;font-weight:600;line-height:1.35}.vv-debate-arena-exp{margin-top:12px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.06);min-height:1.5em}.vv-debate-arena-exp p{margin:4px 0}.vv-debate-arena-gl{margin-top:12px}.vv-debate-arena-gl dl{display:grid;grid-template-columns:1fr;gap:6px;margin:8px 0 0}@media (min-width:640px){.vv-debate-arena-gl dl{grid-template-columns:1fr 1fr}}.vv-debate-arena-gl dt{font-weight:800;color:#c7d2fe}.vv-debate-arena-gl dd{margin:0 0 6px;color:var(--mu);font-size:14px}.vv-debate-arena-gl[hidden]{display:none}";
var DATA={"gl":{"adhom":["Ad hominem","Attacking the person instead of their argument."],"straw":["Straw man","Twisting someone’s argument into a weaker version that is easier to attack."],"dilemma":["False dilemma","Pretending there are only two options when there are more."],"bandwagon":["Bandwagon","Claiming something is true or good because many people believe or do it."],"slope":["Slippery slope","Claiming one small step will inevitably lead to an extreme result, without evidence."],"hasty":["Hasty generalisation","Drawing a broad conclusion from too few examples."],"authority":["Appeal to (false) authority","Treating someone as proof when they are not an expert on this topic."],"herring":["Red herring","Bringing in an unrelated topic to distract from the real issue."],"posthoc":["False cause (post hoc)","Assuming that because B happened after A, A caused B."],"circular":["Circular reasoning","Using the conclusion as its own proof."],"tuquoque":["Tu quoque (whataboutism)","Dodging criticism by pointing out the critic’s own faults."],"nature":["Appeal to nature","Assuming that \"natural\" automatically means good or safe."],"ignorance":["Appeal to ignorance","Claiming something is true because it has not been proven false."]},"items":[[{"k":"f","m":"School should start at 9 a.m.","t":"Ravi only wants a later start because he is lazy, so we can ignore his argument.","a":"adhom","b":"Answer Ravi’s actual reasons — for example research on teenagers’ sleep — not his character."},{"k":"f","m":"Children under 12 should have smartphones.","t":"Everyone in our class has a phone, so phones must be good for children.","a":"bandwagon","b":"Popularity is not proof. Look at evidence on sleep, attention and online safety."},{"k":"f","m":"Homework should be reduced.","t":"Either we ban all homework or students will burn out. There is no middle way.","a":"dilemma","b":"There are many options: less homework, better-designed homework, homework-free weekends."},{"k":"f","m":"There should be fewer exams.","t":"So you think students should never be tested at all!","a":"straw","b":"Restate the real claim — fewer exams, not none — and argue against that."},{"k":"f","m":"Students should get 10 more minutes of break.","t":"If we allow 10 extra minutes today, soon students will want the whole day off and the school will close.","a":"slope","b":"Discuss the real effect of 10 minutes; ask for evidence before predicting a chain of disasters."},{"k":"f","m":"Our town should welcome more tourists.","t":"I met two rude tourists last summer, so tourists are rude.","a":"hasty","b":"Two people cannot represent thousands of visitors. Look at wider data or many experiences."},{"k":"c","m":"Planting trees around the school will make the playground cooler.","t":"Which is the best EVIDENCE for this claim?","a":"Measurements in many cities show shaded ground under trees is noticeably cooler on summer afternoons than open pavement.","b":"Evidence is a fact or data that supports the claim — not an opinion or a wish.","o":["Trees are beautiful.","Everyone likes trees.","We should plant trees right now."],"w":"Only the first option gives measured facts. The others are opinions or demands.","q":"Choose the best evidence"},{"k":"r","m":"School uniforms should be compulsory.","t":"Opponent: “Uniforms hide differences in family income, which can reduce teasing.” Which is your STRONGEST rebuttal?","a":"Income still shows through shoes, bags and phones, so a direct anti-bullying programme may reduce teasing more than uniforms.","b":"Strong rebuttals accept the goal (less teasing) but show a gap in the argument and offer a better way.","o":["You only say that because you like uniforms.","Uniforms are boring.","Everyone hates uniforms."],"w":"The first option answers the argument with reasoning. The others attack the person, give an opinion or use the bandwagon.","q":"Pick the strongest rebuttal"}],[{"k":"f","m":"This shampoo cures dandruff.","t":"A famous cricketer says this shampoo cures dandruff, so it is medically proven.","a":"authority","b":"A sports star is not a skin expert. Ask for clinical trials or a dermatologist’s view."},{"k":"f","m":"The canteen should sell less junk food.","t":"Why worry about canteen food when the road outside school has potholes?","a":"herring","b":"Potholes may matter too, but they do not answer the question about canteen food."},{"k":"f","m":"Lucky charms help teams win.","t":"I wore my lucky socks and our team won twice, so the socks make us win.","a":"posthoc","b":"Two wins after wearing socks is coincidence until a fair test shows a link."},{"k":"f","m":"Our textbook is always right.","t":"This textbook is reliable because it says it is accurate.","a":"circular","b":"Check it against independent sources instead of trusting it to vouch for itself."},{"k":"c","m":"Reading for 20 minutes a day improves vocabulary.","t":"Evidence: students in the reading club learned more new words this term than students who were not. Which is the REASONING that links the evidence to the claim?","a":"Reading shows you many new words in context, so you gradually learn what they mean.","b":"Claim → Evidence → Reasoning: reasoning explains WHY the evidence supports the claim.","o":["Reading clubs are fun.","Some students do not like reading.","Our school has a big library."],"w":"Only the first explains the link. A sharp opponent could still ask whether club members were already keen readers — a fair challenge.","q":"Find the reasoning"},{"k":"s","m":"Mobile phones should be banned in school.","t":"Opponent: “Phones are useful in emergencies and for looking things up.” Which is the FAIREST summary of their view (a steelman)?","a":"You are saying phones have real benefits — safety and quick information — so a full ban could cost more than it gains.","b":"Steelmanning means stating the other side at its strongest before you reply. It builds trust and sharpens your answer.","o":["You just want to play games in class.","You think school rules do not matter.","You agree phones should be banned."],"w":"The first restates their point fairly. The others twist it (straw man) or get it wrong.","q":"Choose the fairest summary"},{"k":"r","m":"Our city should build more flyovers to end traffic jams.","t":"Opponent: “More flyovers will end traffic jams.” Which is your STRONGEST rebuttal?","a":"Studies of “induced demand” show new road space often fills with extra traffic within a few years; better public transport may cut jams more.","b":"Use evidence and offer an alternative — not insults or opinions.","o":["Flyovers are ugly.","You do not even drive.","Traffic has always existed."],"w":"The first uses evidence and reasoning. The others are opinion, ad hominem, or beside the point.","q":"Pick the strongest rebuttal"},{"k":"f","m":"Exams should be online.","t":"Most of my friends think online exams are easier to cheat in, so they definitely are.","a":"bandwagon","b":"What friends think is not evidence. Look at how online exams are supervised and what studies show."}],[{"k":"f","m":"Reports must be submitted on time.","t":"You criticise my late reports, but you missed a deadline last year.","a":"tuquoque","b":"Your past slip does not make the late reports acceptable. Address the reports and agree a fix."},{"k":"f","m":"This supplement is safe.","t":"This herbal supplement is natural, so it cannot have side effects.","a":"nature","b":"Many natural substances are harmful. Safety needs testing and dosage information."},{"k":"f","m":"The new coffee machine boosted productivity.","t":"Since the new coffee machine arrived, productivity rose 5%, so the machine caused it.","a":"posthoc","b":"Check what else changed then, and compare with a team that did not get a machine."},{"k":"f","m":"Remote work harms our culture.","t":"You cannot prove remote work does not hurt our culture, so it must be hurting it.","a":"ignorance","b":"The person making a claim must support it. Measure culture (surveys, retention) before concluding."},{"k":"f","m":"We should stop hiring from that college.","t":"Our two interns from that college were weak, so we should stop hiring from it.","a":"hasty","b":"Two interns are too small a sample. Look at more hires and the quality of your own onboarding."},{"k":"f","m":"We must buy this tool now.","t":"Either we adopt this vendor’s tool this week, or we fall behind our competitors forever.","a":"dilemma","b":"There are other options: a pilot, a different vendor, or improving current tools."},{"k":"f","m":"We should offer flexible hours.","t":"So you want flexible hours? You want people working whenever they like with no accountability.","a":"straw","b":"Flexible hours can include core hours and clear goals. Argue against the real proposal."},{"k":"r","m":"AI screening should decide who gets interviews.","t":"Opponent: “AI is objective because it is a machine.” Which is your STRONGEST rebuttal?","a":"AI learns from past hiring data; if that data reflects bias, the system can repeat it at scale — so it needs auditing and human review, not blind trust.","b":"Strong rebuttals target the hidden assumption (machines = neutral) with a mechanism.","o":["Machines will take over the world.","You do not understand technology.","Most companies use AI, so it must be fine."],"w":"The first exposes the hidden assumption. The others are a slippery slope, an ad hominem and a bandwagon.","q":"Pick the strongest rebuttal"},{"k":"s","m":"Our company should move to a 4-day week.","t":"Opponent: “Customers need us five days a week.” Which is the FAIREST summary of their concern?","a":"Your concern is that cutting a day could leave customers without service, hurting trust and revenue — so any plan must keep coverage.","b":"A good steelman names the worry and the stakes; then you can propose rotas or staggered days.","o":["You just do not want people to be happy.","You think employees are lazy.","You would prefer a 6-day week."],"w":"Only the first states the concern fairly and completely.","q":"Choose the fairest summary"},{"k":"c","m":"Remote work can raise productivity for focused tasks.","t":"Evidence: “After our team went remote, bug fixes per week rose 12%.” Which is the STRONGEST challenge to this reasoning?","a":"Other things may have changed at the same time (fewer meetings, a new tool), so the rise may not be caused by remote work.","b":"Ask: what else could explain the result? A comparison group makes evidence much stronger.","o":["Bug fixes are boring.","12% is a small number.","Remote workers wear pyjamas."],"w":"The first points to possible confounding factors — the most important question about cause and effect.","q":"Find the best challenge"}]],"keys":[["adhom","straw","dilemma","bandwagon","slope","hasty"],["adhom","straw","dilemma","bandwagon","slope","hasty","authority","herring","posthoc","circular"],["adhom","straw","dilemma","bandwagon","slope","hasty","authority","herring","posthoc","circular","tuquoque","nature","ignorance"]]};
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
title:"Debate Arena",
icon:"🎙️",
faculty:"university",
bands:["middle","secondary","senior","ug","pg","pro"],
summary:"Win the audience with clear thinking: spot 13 logical fallacies, separate claims, evidence and reasoning, steelman the other side and choose the strongest rebuttal — from school debates to workplace meetings.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},motionEl,bubEl,askEl,optsEl,expEl,nextB,glEl,crowd=[],show=0,anim=null,T=0;
var GL=DATA.gl;
function makeCrowd(){crowd=[];var n=K.lp?60:130;for(var i=0;i<n;i++)crowd.push({t:Math.random(),x:Math.random(),y:Math.random(),p:Math.random()*6.28});}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#1e1b4b');bg.addColorStop(1,'#0b0a1f');g.fillStyle=bg;g.fillRect(0,0,w,h);
var spot=g.createRadialGradient(w/2,-20,10,w/2,-20,h*1.2);spot.addColorStop(0,'rgba(255,255,255,.18)');spot.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=spot;g.fillRect(0,0,w,h);
var f=(show+1)/2,top=46,ch=h-top-14;
g.fillStyle='#4338ca';K.rr(g,12,10,80,26,8);g.fill();g.fillStyle='#be185d';K.rr(g,w-112,10,100,26,8);g.fill();
g.fillStyle='#fff';g.font='800 13px system-ui, sans-serif';g.textAlign='center';g.fillText('🙋 You',52,28);g.fillText('🗣️ Opponent',w-62,28);
g.fillStyle='rgba(255,255,255,.12)';K.rr(g,104,18,w-228,10,5);g.fill();
var bar=g.createLinearGradient(104,0,w-124,0);bar.addColorStop(0,'#818cf8');bar.addColorStop(1,'#22d3ee');g.fillStyle=bar;K.rr(g,104,18,Math.max(6,(w-228)*f),10,5);g.fill();
g.font='700 12px system-ui, sans-serif';g.fillStyle='#e0e7ff';g.fillText(Math.round(f*100)+'% of the audience agrees with you',w/2,top-2);
crowd.forEach(function(c){
var mine=c.t<f,x=16+c.x*(w-32),y=top+10+c.y*(ch-16),bob=K.rm?0:Math.sin(T*3+c.p)*(mine?2:1);
g.fillStyle=mine?'#a5b4fc':'#f9a8d4';g.globalAlpha=0.85;g.beginPath();g.arc(x,y+bob,4.2,0,6.283);g.fill();
g.beginPath();g.arc(x,y+bob+8,6,Math.PI,0);g.fill();
});
g.globalAlpha=1;
}
function animate(){
if(K.rm){show=st.meter;cv.draw(cv);return;}
if(anim)return;
anim=K.loop(function(dt){T+=dt;show+=(st.meter-show)*Math.min(1,dt*4);cv.draw(cv);if(Math.abs(st.meter-show)<0.002&&T>0.5){show=st.meter;cv.draw(cv);anim.stop();anim=null;T=0;}});
}
function pool(){return DATA.items[S.diff];}
function round(){
var it=st.queue.pop();if(!it){st.queue=K.shuffle(pool());it=st.queue.pop();}
st.it=it;st.locked=false;expEl.textContent='';nextB.hidden=true;
motionEl.textContent='';motionEl.appendChild(document.createTextNode('Motion'));motionEl.appendChild(K.h('b',null,'“'+it.m+'”'));
var opts,ans;
if(it.k==='f'){
bubEl.className=K.c('bub');bubEl.textContent='“'+it.t+'”';
askEl.textContent='Which fallacy (thinking trap) is the opponent using?';
var keys=K.shuffle(DATA.keys[S.diff].filter(function(k){return k!==it.a;})).slice(0,3).concat([it.a]);
opts=K.shuffle(keys);ans=opts.indexOf(it.a);
st.labels=opts.map(function(k){return GL[k][0];});
st.subs=opts.map(function(k){return GL[k][1];});
}else{
bubEl.className=K.c(it.k==='c'?'bub task':'bub');bubEl.textContent=it.k==='c'?'Claim: “'+it.m+'”. '+it.t:it.t;
askEl.textContent=it.q;
var all=[it.a].concat(it.o),ord=K.shuffle([0,1,2,3]);
st.labels=ord.map(function(i){return all[i];});st.subs=null;ans=ord.indexOf(0);
}
st.ans=ans;
optsEl.textContent='';optsEl.className=K.c('opts'+(it.k==='f'?' two':''));
st.btns=st.labels.map(function(l,i){
var b=K.btn([K.h('span',null,(i+1)+'. '+l)].concat(st.subs&&S.diff===0?[K.h('br'),K.h('small',{c:'mu'},st.subs[i])]:[]),'',function(){answer(i);});
optsEl.appendChild(b);return b;
});
hud();
try{S.root.focus({preventScroll:true});}catch(e){}
}
function answer(i){
if(st.locked)return;st.locked=true;
var it=st.it,ok=i===st.ans;
st.btns.forEach(function(b,j){b.disabled=true;if(j===st.ans)b.classList.add(K.P+'-good-b');else if(j===i)b.classList.add(K.P+'-bad-b');});
st.meter=K.clamp(st.meter+(ok?0.22:-0.16),-1,1);animate();
if(ok){st.right++;K.sound('good');var p=K.rel(st.btns[i]);K.burst(p.x,p.y,20,['#a5b4fc','#f9a8d4','#fde68a']);S.fb('✓ The audience leans your way!','good');}
else{K.sound('bad');S.fb('✗ The opponent wins this exchange — but you just learned their trick.','bad');}
expEl.textContent='';
if(it.k==='f'){expEl.appendChild(K.h('p',null,[K.h('strong',null,GL[it.a][0]+': '),GL[it.a][1]]));}
else if(it.w)expEl.appendChild(K.h('p',null,it.w));
expEl.appendChild(K.h('p',null,[K.h('strong',null,'💡 Better thinking: '),it.b]));
st.done++;hud();
nextB.hidden=false;try{nextB.focus({preventScroll:true});}catch(e){}
}
function next(){
if(S.mode==='guided'){
K.award(4+2*S.diff,'Debate Arena round '+st.done);
if(st.done>=5){
var pct=100*st.right/5;
S.finish(pct,[st.right+' of 5 exchanges won · audience '+Math.round((st.meter+1)*50)+'% with you.','In real debates: be fair to the other side, use evidence, and attack ideas — never people.'],guided,free);
return;
}
}else if(st.done%5===0)K.award(5,'Debate Arena free play');
round();
}
function hud(){S.clearChips();if(S.mode==='guided')S.chip('r','Round',Math.min(st.done+1,5)+'/5');S.chip('w','Won',st.right+'/'+st.done);}
function start(mode){S.setMode(mode);st={queue:K.shuffle(pool()),right:0,done:0,meter:0};show=0;makeCrowd();round();cv.draw(cv);S.fb(mode==='guided'?'Five exchanges. Each good answer swings the audience to your side.':'Free play: endless exchanges. Open 📚 Fallacy guide any time.','info');}
function guided(){start('guided');}
function free(){start('free');}
S=K.shell({title:'Debate Arena',icon:'🎙️',goal:'Win the audience by spotting weak arguments and choosing strong ones.',
diffs:['School debates','Critical thinker','Boardroom'],
how:['Read the motion (the topic) and what your opponent says.','Answer the challenge: name the fallacy, find the evidence or reasoning, choose the fairest summary, or pick the strongest rebuttal.','Tap an option or press 1–4. Read the explanation and the "better thinking" tip.','Every good answer moves the audience meter towards you.'],
note:'Spotting a fallacy does not prove the other person wrong — it shows that this particular argument is weak. Stay respectful.',
onChange:function(){if(S.mode==='free')free();else guided();}});
cv=K.canvas(S.stage,0.26,draw,140,220);
cv.c.setAttribute('role','img');cv.c.setAttribute('aria-label','Audience meter');
motionEl=K.h('div',{c:'motion'});bubEl=K.h('div',{c:'bub','aria-live':'polite'});askEl=K.h('p',{c:'ask'});optsEl=K.h('div',{c:'opts'});expEl=K.h('div',{c:'exp','aria-live':'polite'});
nextB=K.btn('Next exchange ▶','pri',next);
var glB=K.btn('📚 Fallacy guide','ghost',function(){glEl.hidden=!glEl.hidden;glB.setAttribute('aria-expanded',glEl.hidden?'false':'true');},{'aria-expanded':'false'});
var dl=K.h('dl');
Object.keys(GL).forEach(function(k){dl.appendChild(K.h('dt',null,GL[k][0]));dl.appendChild(K.h('dd',null,GL[k][1]));});
glEl=K.h('div',{c:'gl panel',hidden:true},[K.h('strong',null,'Common fallacies (thinking traps)'),dl]);
[motionEl,bubEl,askEl,optsEl,expEl,K.h('div',{c:'row'},[nextB,glB]),glEl].forEach(function(n){S.stage.appendChild(n);});
K.on(S.root,'keydown',function(e){var k=parseInt(e.key,10);if(k>=1&&k<=4&&!st.locked&&st.btns&&st.btns[k-1]){e.preventDefault();answer(k-1);}});
st={meter:0,right:0,done:0};
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
