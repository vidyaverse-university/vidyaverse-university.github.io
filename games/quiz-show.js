/* VidyaVerse University (v2) - game: Quiz Show (quiz-show). Plain script, no dependencies. Registers exactly one game with window.VVGames. */
(function(){
'use strict';
var ID="quiz-show";
var CSS=".vv-quiz-show-root{--a:#7c5cff;--a2:#22d3ee;--g1:rgba(124,92,255,.38);--g2:rgba(34,211,238,.22);--bg1:#0d1030;--bg2:#1a1d4a;--tx:#eef1ff;--mu:#aab1d9;--ok:#22c55e;--bad:#f43f5e;--card:rgba(255,255,255,.07);--ln:rgba(255,255,255,.14);position:relative;box-sizing:border-box;width:100%;max-width:100%;min-height:440px;color:var(--tx);font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,\"Noto Sans\",\"Helvetica Neue\",Arial,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif;background:radial-gradient(900px 520px at 0% 0%,var(--g1),transparent 62%),radial-gradient(760px 520px at 100% 100%,var(--g2),transparent 60%),linear-gradient(160deg,var(--bg1),var(--bg2));border-radius:22px;padding:clamp(10px,2.4vw,24px);overflow:hidden;isolation:isolate;outline:none;-webkit-text-size-adjust:100%;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 50px -24px rgba(0,0,0,.6)}.vv-quiz-show-root *,.vv-quiz-show-root *::before,.vv-quiz-show-root *::after{box-sizing:border-box}.vv-quiz-show-root::before{content:\"\";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);mask-image:linear-gradient(180deg,#000,transparent 70%)}.vv-quiz-show-top{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.vv-quiz-show-ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 230px}.vv-quiz-show-ttx{min-width:0}.vv-quiz-show-ico{font-size:clamp(30px,5vw,44px);line-height:1;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))}.vv-quiz-show-ttl h3{margin:0;font-size:clamp(19px,2.6vw,28px);line-height:1.15;letter-spacing:.2px;background:linear-gradient(90deg,#fff,var(--a2));-webkit-background-clip:text;background-clip:text;color:transparent}.vv-quiz-show-goal{margin:3px 0 0;color:var(--mu);font-size:14px}.vv-quiz-show-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.vv-quiz-show-seg{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.28);border:1px solid var(--ln);border-radius:16px;padding:3px;gap:2px}.vv-quiz-show-seg .vv-quiz-show-btn{border:0;background:transparent;border-radius:13px;padding:6px 12px}.vv-quiz-show-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--ln);background:var(--card);color:var(--tx);font:inherit;font-weight:650;min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s,opacity .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;line-height:1.2}.vv-quiz-show-btn:hover{background:rgba(255,255,255,.13)}.vv-quiz-show-btn:active{transform:scale(.95)}.vv-quiz-show-btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}.vv-quiz-show-btn[disabled]{opacity:.45;cursor:not-allowed}.vv-quiz-show-btn[aria-pressed=true],.vv-quiz-show-seg .vv-quiz-show-btn[aria-pressed=true]{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;box-shadow:0 8px 20px -8px var(--a)}.vv-quiz-show-pri{background:linear-gradient(135deg,var(--a),var(--a2));color:#0a0c22;border:0;box-shadow:0 10px 24px -10px var(--a)}.vv-quiz-show-pri:hover{filter:brightness(1.08);background:linear-gradient(135deg,var(--a),var(--a2))}.vv-quiz-show-ghost{background:rgba(255,255,255,.04)}.vv-quiz-show-good-b{background:rgba(34,197,94,.25)!important;border-color:rgba(34,197,94,.7)!important}.vv-quiz-show-bad-b{background:rgba(244,63,94,.25)!important;border-color:rgba(244,63,94,.7)!important}.vv-quiz-show-how{margin:12px 0 0;padding:12px 16px;border-radius:16px;background:var(--card);border:1px solid var(--ln);font-size:15px}.vv-quiz-show-how[hidden]{display:none}.vv-quiz-show-how p{margin:0 0 6px}.vv-quiz-show-how ol{margin:4px 0 4px 20px;padding:0}.vv-quiz-show-how li{margin:3px 0}.vv-quiz-show-note{color:var(--mu);font-size:13px}.vv-quiz-show-hud{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 10px;min-height:32px}.vv-quiz-show-chip{background:rgba(0,0,0,.3);border:1px solid var(--ln);border-radius:999px;padding:5px 12px;font-size:14px;font-variant-numeric:tabular-nums;white-space:nowrap}.vv-quiz-show-chip b{color:var(--a2);font-weight:750}.vv-quiz-show-stage{position:relative;min-height:280px}.vv-quiz-show-fb{min-height:1.6em;margin-top:12px;padding:9px 14px;border-radius:14px;font-weight:600;transition:background .3s,color .3s}.vv-quiz-show-fb.vv-quiz-show-good{background:rgba(34,197,94,.18);color:#c9fbd9}.vv-quiz-show-fb.vv-quiz-show-bad{background:rgba(244,63,94,.18);color:#ffd5dc}.vv-quiz-show-fb.vv-quiz-show-info{background:rgba(255,255,255,.06);color:var(--tx)}.vv-quiz-show-cvw{position:relative;width:100%;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1px solid var(--ln);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}.vv-quiz-show-cvw canvas{display:block;width:100%;height:100%;touch-action:none}.vv-quiz-show-fx{position:absolute;left:0;top:0;pointer-events:none;z-index:9;width:100%;height:100%}.vv-quiz-show-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,30,.74);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:8;border-radius:18px;padding:14px;overflow:auto}.vv-quiz-show-card{background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid var(--ln);border-radius:22px;padding:20px;max-width:460px;width:100%;text-align:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:vv-quiz-show-pop .5s cubic-bezier(.2,1.4,.4,1)}.vv-quiz-show-card h4{margin:0 0 8px;font-size:22px}.vv-quiz-show-card p{margin:6px 0}@keyframes vv-quiz-show-pop{from{transform:scale(.86);opacity:0}to{transform:none;opacity:1}}@keyframes vv-quiz-show-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.vv-quiz-show-shake{animation:vv-quiz-show-shake .35s}.vv-quiz-show-stars{font-size:40px;letter-spacing:6px;color:#ffd166;text-shadow:0 4px 18px rgba(255,209,102,.5)}.vv-quiz-show-big{font-size:30px;font-weight:800}.vv-quiz-show-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}.vv-quiz-show-grid{display:grid;gap:10px}.vv-quiz-show-panel{background:var(--card);border:1px solid var(--ln);border-radius:18px;padding:14px}.vv-quiz-show-in{font:inherit;font-size:20px;min-height:48px;padding:8px 12px;border-radius:13px;border:1px solid var(--ln);background:rgba(0,0,0,.32);color:var(--tx);width:100%;max-width:100%}.vv-quiz-show-in:focus{outline:3px solid var(--a2);outline-offset:1px}.vv-quiz-show-mu{color:var(--mu)}.vv-quiz-show-tiny .vv-quiz-show-btn{min-height:64px;min-width:64px;font-size:22px;border-radius:20px}.vv-quiz-show-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}input[type=range].vv-quiz-show-range{width:100%;height:44px;accent-color:var(--a2);background:transparent;cursor:pointer}@media (max-width:420px){.vv-quiz-show-root{border-radius:16px;font-size:15px}.vv-quiz-show-btn{padding:8px 10px}.vv-quiz-show-goal{font-size:13px}.vv-quiz-show-seg .vv-quiz-show-btn{padding:6px 9px}}@media (min-width:1800px){.vv-quiz-show-root{font-size:19px}.vv-quiz-show-btn{min-height:52px}}@media (prefers-reduced-motion:reduce){.vv-quiz-show-root *{animation:none!important;transition:none!important}}.vv-quiz-show-rm *{animation:none!important;transition:none!important}.vv-quiz-show-root{--a:#a78bfa;--a2:#38bdf8;--g1:rgba(167,139,250,.35);--g2:rgba(56,189,248,.25);--bg1:#0a0b26;--bg2:#1b1348}.vv-quiz-show-lay{display:grid;gap:14px}@media (min-width:820px){.vv-quiz-show-lay{grid-template-columns:minmax(0,1fr) 230px}}.vv-quiz-show-qbox{position:relative;padding:16px 18px;border-radius:20px;background:linear-gradient(135deg,rgba(56,189,248,.18),rgba(167,139,250,.18));border:1px solid rgba(255,255,255,.2);box-shadow:0 0 0 1px rgba(56,189,248,.25),0 20px 40px -20px rgba(56,189,248,.5)}.vv-quiz-show-cat{font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#bae6fd}.vv-quiz-show-qt{font-size:clamp(18px,2.6vw,25px);font-weight:700;margin:6px 0 0}.vv-quiz-show-opts{display:grid;gap:10px;margin-top:14px;grid-template-columns:1fr}@media (min-width:560px){.vv-quiz-show-opts{grid-template-columns:1fr 1fr}}.vv-quiz-show-opt{justify-content:flex-start;text-align:left;display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:999px;background:linear-gradient(180deg,rgba(30,27,75,.9),rgba(15,14,45,.9));border:1px solid rgba(167,139,250,.5)}.vv-quiz-show-opt .vv-quiz-show-k{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:rgba(56,189,248,.25);color:#e0f2fe;font-weight:800;flex:none}.vv-quiz-show-opt.vv-quiz-show-hide{visibility:hidden}.vv-quiz-show-opt.vv-quiz-show-sel{background:linear-gradient(180deg,#f59e0b,#b45309);color:#fff}.vv-quiz-show-life{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.vv-quiz-show-ladder{list-style:none;margin:0;padding:8px;border-radius:18px;background:rgba(0,0,0,.3);border:1px solid var(--ln);display:flex;flex-direction:column-reverse;gap:3px;font-variant-numeric:tabular-nums}.vv-quiz-show-ladder li{display:flex;justify-content:space-between;padding:4px 10px;border-radius:10px;font-size:14px;color:var(--mu)}.vv-quiz-show-ladder li.vv-quiz-show-safe{color:#fde68a}.vv-quiz-show-ladder li.vv-quiz-show-cur{background:linear-gradient(90deg,var(--a),var(--a2));color:#0a0c22;font-weight:800}.vv-quiz-show-ladder li.vv-quiz-show-won{color:#86efac}.vv-quiz-show-why{margin-top:12px;padding:10px 14px;border-radius:14px;background:rgba(255,255,255,.06);min-height:1.5em}";
var DATA={"q":[[["Science","Which planet is known as the Red Planet?",["Mars","Venus","Jupiter","Saturn"],"Iron oxide (rust) in its soil and dust makes Mars look red."],["Science","How many legs does an insect have?",["6","4","8","10"],"Insects have 6 legs; spiders (8 legs) are arachnids, not insects."],["Science","Which gas do plants take in from the air to make food?",["Carbon dioxide","Oxygen","Nitrogen","Helium"],"In photosynthesis, plants use carbon dioxide, water and sunlight to make glucose and release oxygen."],["India","What is the national animal of India?",["Tiger","Lion","Elephant","Peacock"],"The tiger is the national animal; the peacock is the national bird."],["World","Which is the largest ocean on Earth?",["Pacific Ocean","Atlantic Ocean","Indian Ocean","Arctic Ocean"],"The Pacific covers about a third of Earth's surface."],["Science","At sea level, water boils at…",["100 °C","50 °C","80 °C","150 °C"],"At standard sea-level pressure pure water boils at 100 °C; on high mountains it boils at a lower temperature."],["World","How many continents are usually counted?",["7","5","6","9"],"Asia, Africa, North America, South America, Antarctica, Europe and Australia (Oceania)."],["Maths","What is 12 × 12?",["144","124","122","164"],"12 × 12 = 144, also called a \"gross\"."],["Science","Which organ pumps blood around the body?",["Heart","Lungs","Liver","Brain"],"The heart is a muscular pump with four chambers."],["India","What is the national flower of India?",["Lotus","Rose","Marigold","Jasmine"],"The lotus is India's national flower."],["India","Who wrote India's national anthem \"Jana Gana Mana\"?",["Rabindranath Tagore","Bankim Chandra Chattopadhyay","Sarojini Naidu","Subramania Bharati"],"Tagore wrote it; Bankim Chandra wrote \"Vande Mataram\", the national song."],["Language","What is the opposite of \"ancient\"?",["Modern","Old","Antique","Historic"],"\"Ancient\" means very old; \"modern\" means of the present time."],["Maths","How many sides does a hexagon have?",["6","5","7","8"],"\"Hex\" means six: a honeycomb cell is a hexagon."],["Science","Which star is closest to Earth?",["The Sun","Polaris","Sirius","Proxima Centauri"],"The Sun is a star about 150 million km away; Proxima Centauri is the next closest."],["Science","Which instrument measures temperature?",["Thermometer","Barometer","Speedometer","Microscope"],"A barometer measures air pressure."],["India","What is the capital of India?",["New Delhi","Mumbai","Kolkata","Chennai"],"New Delhi has been the capital since 1931 (announced 1911)."],["Science","Which is the fastest land animal?",["Cheetah","Lion","Horse","Leopard"],"Cheetahs can sprint at around 100 km/h for short distances."],["Science","Which of these is a mammal?",["Whale","Shark","Crocodile","Penguin"],"Whales breathe air and feed their young on milk, like all mammals."],["Maths","How many minutes are there in 2 hours?",["120","100","60","200"],"1 hour = 60 minutes, so 2 hours = 120 minutes."],["India","Which festival is called the festival of lights?",["Diwali","Holi","Pongal","Onam"],"Diwali is celebrated with diyas (lamps); Holi is the festival of colours."]],[["Science","What is the chemical symbol for sodium?",["Na","So","Sd","S"],"Na comes from its Latin name natrium."],["India","Which is the longest river flowing mostly within India?",["Ganga","Godavari","Yamuna","Narmada"],"The Ganga is about 2,500 km long; the Godavari is the longest river of peninsular India."],["India","Who chaired the Drafting Committee of the Indian Constitution?",["B. R. Ambedkar","Jawaharlal Nehru","Rajendra Prasad","Sardar Patel"],"Dr Ambedkar chaired it; Rajendra Prasad was President of the Constituent Assembly."],["Science","About how fast does light travel in a vacuum?",["3 × 10⁸ m/s","3 × 10⁵ m/s","340 m/s","3 × 10⁶ km/s"],"About 300,000 km per second; 340 m/s is roughly the speed of sound in air."],["Maths","What is the smallest prime number?",["2","1","3","0"],"2 is the only even prime; 1 is not prime because it has only one factor."],["Science","Which part of the cell releases energy from food?",["Mitochondria","Nucleus","Ribosome","Cell wall"],"Mitochondria carry out aerobic respiration, making ATP."],["Science","Which gas makes up most of Earth's atmosphere?",["Nitrogen","Oxygen","Carbon dioxide","Argon"],"Nitrogen is about 78%, oxygen about 21%."],["India","In which year did India become independent?",["1947","1950","1942","1857"],"15 August 1947; the Constitution came into force on 26 January 1950."],["Maths","What is π (pi) rounded to two decimal places?",["3.14","3.41","3.12","3.16"],"π ≈ 3.14159…, the ratio of a circle's circumference to its diameter."],["Science","Which is the largest planet in our solar system?",["Jupiter","Saturn","Neptune","Earth"],"Jupiter is more than 300 times as massive as Earth."],["Science","Who described the three laws of motion?",["Isaac Newton","Galileo Galilei","Albert Einstein","Johannes Kepler"],"Newton published them in 1687 in the Principia."],["India","On which date did the Constitution of India come into effect?",["26 January 1950","15 August 1947","26 November 1949","2 October 1950"],"It was adopted on 26 November 1949 and came into effect on 26 January 1950 — Republic Day."],["Maths","What is the square root of 225?",["15","25","14","12.5"],"15 × 15 = 225."],["Science","Which blood cells mainly fight infection?",["White blood cells","Red blood cells","Platelets","Plasma"],"Red cells carry oxygen; platelets help clotting."],["Science","Which is the hardest natural substance?",["Diamond","Iron","Granite","Quartz"],"Diamond is pure carbon in a very strong crystal lattice."],["Language","What is the plural of \"criterion\"?",["criteria","criterions","criterias","criterium"],"Greek-origin: one criterion, many criteria (like phenomenon → phenomena)."],["India","Which Mughal emperor built the Taj Mahal?",["Shah Jahan","Akbar","Aurangzeb","Humayun"],"Built in memory of his wife Mumtaz Mahal, in Agra."],["Maths","The interior angles of any triangle add up to…",["180°","90°","360°","270°"],"In flat (Euclidean) geometry the three angles always sum to 180°."],["Science","Which vitamin does skin make when exposed to sunlight?",["Vitamin D","Vitamin C","Vitamin A","Vitamin K"],"UVB light helps skin make vitamin D, important for bones."],["World","Which is the largest hot desert in the world?",["Sahara","Thar","Gobi","Kalahari"],"The Sahara is the largest hot desert; Antarctica is the largest desert overall (a cold desert)."]],[["Science","The Avogadro constant is approximately…",["6.022 × 10²³ per mole","3.0 × 10⁸ per mole","9.81 per mole","1.6 × 10⁻¹⁹ per mole"],"One mole of any substance contains about 6.022 × 10²³ particles."],["India","Who was the first Indian to win a Nobel Prize?",["Rabindranath Tagore","C. V. Raman","Mother Teresa","Amartya Sen"],"Tagore won the Literature prize in 1913; Raman won Physics in 1930."],["India","Which Article of the Indian Constitution abolishes untouchability?",["Article 17","Article 21","Article 14","Article 32"],"Article 17 abolishes untouchability; Article 21 protects life and personal liberty."],["Maths","What is the derivative of sin x?",["cos x","−cos x","tan x","−sin x"],"d/dx (sin x) = cos x; d/dx (cos x) = −sin x."],["Science","What is the SI unit of electric charge?",["Coulomb","Ampere","Volt","Ohm"],"1 coulomb = 1 ampere flowing for 1 second."],["India","Which Indian mathematician's work on series and number theory was championed by G. H. Hardy?",["Srinivasa Ramanujan","Aryabhata","Brahmagupta","C. R. Rao"],"Ramanujan (1887–1920) produced thousands of results; 22 December is National Mathematics Day."],["Science","Which element has atomic number 26?",["Iron","Copper","Zinc","Nickel"],"Iron (Fe) has 26 protons; copper is 29, zinc 30, nickel 28."],["Science","In DNA, adenine pairs with…",["Thymine","Guanine","Cytosine","Uracil"],"A–T and G–C; in RNA, adenine pairs with uracil."],["Language","\"Ephemeral\" means…",["lasting a very short time","very large","related to the sky","full of energy"],"From Greek ephemeros, \"lasting a day\"."],["World","What is the deepest known point in Earth's oceans?",["Challenger Deep","Java Trench","Puerto Rico Trench","Tonga Trench"],"In the Mariana Trench, about 11 km deep."],["India","Which mission made India the first country to land near the Moon's south pole (August 2023)?",["Chandrayaan-3","Chandrayaan-2","Mangalyaan","Aditya-L1"],"Vikram lander touched down on 23 August 2023, now National Space Day."],["Maths","What is the sum of the whole numbers from 1 to 100?",["5050","5000","10100","4950"],"Pair them: (1+100) + (2+99) + … = 50 pairs × 101 = 5050."],["Science","Who won Nobel Prizes in both Physics and Chemistry?",["Marie Curie","Linus Pauling","Niels Bohr","Dorothy Hodgkin"],"Physics 1903 and Chemistry 1911. Pauling won Chemistry and Peace."],["Science","Which acid is produced in the human stomach?",["Hydrochloric acid","Sulphuric acid","Citric acid","Nitric acid"],"HCl helps digest proteins and kills many microbes."],["Maths","What is log₁₀(1000)?",["3","2","10","100"],"10³ = 1000, so log base 10 of 1000 is 3."],["India","Which Indian physicist discovered the light-scattering effect named after him in 1928?",["C. V. Raman","Homi J. Bhabha","S. N. Bose","Meghnad Saha"],"The Raman effect; 28 February is National Science Day."],["World","Which treaty, signed in 1919, formally ended the First World War with Germany?",["Treaty of Versailles","Treaty of Paris","Treaty of Westphalia","Treaty of Tordesillas"],"It was signed on 28 June 1919."],["Science","What is the pH of pure water at 25 °C?",["7","0","1","14"],"Neutral: equal concentrations of H⁺ and OH⁻ ions."],["India","\"Satyameva Jayate\", India's national motto, comes from which text?",["Mundaka Upanishad","Rigveda","Bhagavad Gita","Arthashastra"],"It means \"Truth alone triumphs\"."],["Science","Which is the largest internal organ (and gland) in the human body?",["Liver","Pancreas","Kidney","Thyroid"],"The liver makes bile, stores glycogen and clears toxins."]]],"prize":[100,200,300,500,1000,2000,4000,8000,16000,32000]};
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
title:"Quiz Show",
icon:"🎤",
faculty:"school",
bands:["primary","middle","secondary","senior","ug","pro"],
summary:"A game-show quiz across science, India, the world, maths and language — climb the prize ladder with 50:50, hint and audience-poll lifelines, and learn why each answer is right.",
mount:function(el,api){
var K=mk(el,api);
var S,cv,st={},optB=[],qtEl,catEl,whyEl,ladEl,lifeB={},timer=null,nextB;
var LET=['A','B','C','D'];
function pool(diff,idx){
if(S.mode==='guided'){var lvl=idx<4?0:idx<7?1:2;lvl=Math.min(2,Math.max(0,lvl+diff-1));if(diff===0)lvl=idx<6?0:1;if(diff===2)lvl=idx<3?1:2;return lvl;}
return diff===0?(idx<6?0:1):diff===1?(idx<3?0:idx<7?1:2):(idx<3?1:2);
}
function pickQ(lvl){
var src=DATA.q[lvl],cand=[];
for(var i=0;i<src.length;i++)if(st.used.indexOf(lvl+':'+i)<0)cand.push(i);
if(!cand.length){st.used=[];cand=src.map(function(x,i){return i;});}
var k=K.pick(cand);st.used.push(lvl+':'+k);
var q=src[k],order=K.shuffle([0,1,2,3]);
return{cat:q[0],q:q[1],opts:order.map(function(o){return q[2][o];}),ans:order.indexOf(0),why:q[3],lvl:lvl};
}
function drawLadder(){
ladEl.textContent='';
DATA.prize.forEach(function(p,i){
var cls=(i===st.idx?'cur':i<st.idx?'won':'')+(S.mode==='free'&&(i===4||i===9)?' safe':'');
ladEl.appendChild(K.h('li',{c:cls},[K.h('span',null,String(i+1)),K.h('span',null,'✦ '+p.toLocaleString('en-IN'))]));
});
}
function draw(o){
var g=o.x,w=o.w,h=o.h;g.clearRect(0,0,w,h);
var cx=Math.min(h/2,w*0.22)+6,cy=h/2,r=Math.min(h/2-10,w*0.2);
var f=st.tmax?Math.max(0,st.left/st.tmax):1;
g.lineWidth=10;g.strokeStyle='rgba(255,255,255,.1)';g.beginPath();g.arc(cx,cy,r,0,6.283);g.stroke();
var gr=g.createLinearGradient(cx-r,0,cx+r,0);gr.addColorStop(0,f>0.3?'#38bdf8':'#f43f5e');gr.addColorStop(1,f>0.3?'#a78bfa':'#fb923c');
g.strokeStyle=gr;g.lineCap='round';g.beginPath();g.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+6.283*f);g.stroke();g.lineCap='butt';
g.fillStyle='#fff';g.font='800 '+Math.round(r*0.7)+'px system-ui, sans-serif';g.textAlign='center';g.textBaseline='middle';
g.fillText(st.tmax?String(Math.ceil(Math.max(0,st.left))):'∞',cx,cy+2);g.textBaseline='alphabetic';
var x0=cx+r+26,x1=w-12,bw=(x1-x0)/4;
g.fillStyle='rgba(255,255,255,.7)';g.font='600 12px system-ui, sans-serif';g.textAlign='left';
g.fillText(st.poll?'Audience poll':'Use 👥 Ask the audience to see a poll',x0,16);
for(var i=0;i<4;i++){
var v=st.poll?st.poll[i]*(st.pollT||1):0,bh=(h-50)*v/100,bx=x0+i*bw+6;
g.fillStyle='rgba(255,255,255,.08)';K.rr(g,bx,26,bw-12,h-50,8);g.fill();
if(bh>0){var bg=g.createLinearGradient(0,h-24-bh,0,h-24);bg.addColorStop(0,'#fbbf24');bg.addColorStop(1,'#f97316');g.fillStyle=bg;K.rr(g,bx,h-24-bh,bw-12,bh,8);g.fill();}
g.fillStyle='#fff';g.textAlign='center';g.font='700 13px system-ui, sans-serif';
g.fillText(LET[i],bx+(bw-12)/2,h-8);
if(st.poll)g.fillText(Math.round(v)+'%',bx+(bw-12)/2,Math.max(40,h-30-bh));
}
}
function hud(){
S.clearChips();
S.chip('q','Question',(st.idx+1)+'/10');
S.chip('s',S.mode==='guided'?'Correct':'Banked',S.mode==='guided'?st.right:'✦ '+st.bank.toLocaleString('en-IN'));
}
function show(){
st.q=pickQ(pool(S.diff,st.idx));st.locked=false;st.poll=null;st.hidden=[];
catEl.textContent=st.q.cat+' · '+['Easy','Medium','Hard'][st.q.lvl]+' · for ✦ '+DATA.prize[st.idx].toLocaleString('en-IN');
qtEl.textContent=st.q.q;whyEl.textContent='';nextB.hidden=true;
optB.forEach(function(b,i){b.className=K.c('btn opt');b.disabled=false;b.lastChild.textContent=st.q.opts[i];b.setAttribute('aria-label',LET[i]+': '+st.q.opts[i]);});
st.tmax=[30,25,20][S.diff];if(K.tiny)st.tmax=0;st.left=st.tmax;
drawLadder();hud();cv.draw(cv);
try{S.root.focus({preventScroll:true});}catch(e){}
K.say(st.q.q);
if(timer)K.clear(timer);
var last=performance.now();
if(st.tmax)timer=K.every(100,function(){
var now=performance.now();st.left-=(now-last)/1000;last=now;
if(st.pollT<1)st.pollT=Math.min(1,st.pollT+0.08);
cv.draw(cv);
if(st.left<=0&&!st.locked)answer(-1);
});
}
function answer(i){
if(st.locked)return;st.locked=true;
if(timer){K.clear(timer);timer=null;}
var ok=i===st.q.ans;
optB.forEach(function(b,j){b.disabled=true;if(j===st.q.ans)b.classList.add(K.P+'-good-b');else if(j===i)b.classList.add(K.P+'-bad-b');});
whyEl.textContent=(ok?'✓ ':'✗ ')+'Answer: '+st.q.opts[st.q.ans]+'. '+st.q.why;
if(ok){
st.right++;K.sound('good');var p=K.rel(optB[i]);K.burst(p.x,p.y,24);
S.fb(i<0?'':'Correct!','good');
if(S.mode==='free')st.bank=DATA.prize[st.idx];
if((st.idx+1)%2===0&&S.mode==='guided')K.award(5+3*S.diff,'Quiz Show stage '+(st.idx+1)/2);
}else{
K.sound('bad');S.fb(i<0?'⏱ Time up!':'Not this time — read why below.','bad');
}
hud();
if(S.mode==='free'&&!ok){
var safe=st.idx>=5?DATA.prize[4]:0;
nextB.hidden=true;
K.after(1200,function(){S.card('Game over',['You leave with ✦ '+safe.toLocaleString('en-IN')+' (safe level).','Reached question '+(st.idx+1)+'.'],[['↺ New game',free]]);K.award(Math.round(st.right*2),'Quiz Show free play');});
return;
}
if(st.idx>=9){
K.after(900,function(){
if(S.mode==='guided')S.finish(st.right*10,[st.right+' of 10 correct.','Read every "why" — that is where the learning sticks.'],guided,free);
else{K.award(30,'Quiz Show champion');K.sound('win');K.burst(K.root.clientWidth/2,120,80);S.card('Champion! 🏆',['All 10 correct — ✦ 32,000!'],[['↺ New game',free]]);}
});
return;
}
nextB.hidden=false;
try{nextB.focus({preventScroll:true});}catch(e){}
}
function life(name){
if(st.locked||st.lifes[name])return;
st.lifes[name]=1;lifeB[name].disabled=true;K.sound('whoosh');
if(name==='fifty'){
var wrong=K.shuffle([0,1,2,3].filter(function(x){return x!==st.q.ans;})).slice(0,2);
wrong.forEach(function(x){optB[x].classList.add(K.P+'-hide');optB[x].disabled=true;});
st.hidden=wrong;S.fb('Two wrong answers removed.','info');
}else if(name==='poll'){
var conf=[0.72,0.55,0.42][st.q.lvl]+Math.random()*0.12,rest=1-conf,p=[0,0,0,0],others=[0,1,2,3].filter(function(x){return x!==st.q.ans&&st.hidden.indexOf(x)<0;});
var ws=others.map(function(){return Math.random()+0.2;}),sum=ws.reduce(function(a,b){return a+b;},0);
p[st.q.ans]=conf*100;others.forEach(function(x,k){p[x]=rest*100*ws[k]/sum;});
st.poll=p;st.pollT=(K.rm||!timer)?1:0;cv.draw(cv);
S.fb('The audience has voted. Crowds are often right on easy questions, less often on hard ones.','info');
}else if(name==='time'){
st.left+=15;st.tmax=Math.max(st.tmax,st.left);S.fb('+15 seconds to think.','info');
}
}
function reset(){st={idx:0,right:0,bank:0,used:[],lifes:{},pollT:1};Object.keys(lifeB).forEach(function(k){lifeB[k].disabled=false;});}
function guided(){S.setMode('guided');reset();S.fb('Guided: 10 questions in 5 stages. A wrong answer does not end the game.','info');show();}
function free(){S.setMode('free');reset();S.fb('Classic: one wrong answer ends the game. Question 5 is a safe level. You can walk away anytime.','info');show();}
S=K.shell({title:'Quiz Show',icon:'🎤',goal:'Answer 10 questions of rising difficulty to climb the prize ladder.',
how:['Read the question and tap A, B, C or D (or press keys 1–4 / A–D).','Lifelines (once per game): 50:50 removes two wrong answers, 👥 shows an audience poll, ⏱ gives 15 more seconds.','After each answer, read the explanation — then press Next.','Guided: 10 questions in 5 stages. Free play: classic rules, a wrong answer ends the game.'],
note:'Prizes are pretend "VidyaPoints" (✦) for fun only. Audience polls are simulated.',
onChange:function(){if(timer){K.clear(timer);timer=null;}if(S.mode==='free')free();else guided();}});
var lay=K.h('div',{c:'lay'}),mainP=K.h('div'),side=K.h('div');
catEl=K.h('div',{c:'cat'});qtEl=K.h('p',{c:'qt','aria-live':'polite'});
var qbox=K.h('div',{c:'qbox'},[catEl,qtEl]);
var opts=K.h('div',{c:'opts'});
LET.forEach(function(l,i){var b=K.btn([K.h('span',{c:'k'},l),K.h('span',null,'')],'opt',function(){answer(i);});optB.push(b);opts.appendChild(b);});
lifeB.fifty=K.btn('50:50','ghost',function(){life('fifty');},{'aria-label':'Fifty fifty lifeline'});
lifeB.poll=K.btn('👥 Audience','ghost',function(){life('poll');});
lifeB.time=K.btn('⏱ +15 s','ghost',function(){life('time');});
var walk=K.btn('🚶 Walk away','ghost',function(){if(S.mode!=='free'||st.locked){S.fb('Walk away is available in Free play while a question is open.','info');return;}st.locked=true;if(timer){K.clear(timer);timer=null;}K.award(Math.round(st.right*2),'Quiz Show free play');S.card('You walked away',['You keep ✦ '+st.bank.toLocaleString('en-IN')+'.','Knowing when you don\u2019t know is a real skill!'],[['↺ New game',free]]);});
nextB=K.btn('Next question ▶','pri',function(){st.idx++;show();});
whyEl=K.h('div',{c:'why','aria-live':'polite'});
var lifeRow=K.h('div',{c:'life'},[lifeB.fifty,lifeB.poll,lifeB.time,walk]);
mainP.appendChild(qbox);mainP.appendChild(opts);mainP.appendChild(lifeRow);mainP.appendChild(whyEl);mainP.appendChild(K.h('div',{c:'row'},[nextB]));
ladEl=K.h('ol',{c:'ladder','aria-label':'Prize ladder'});
side.appendChild(ladEl);
lay.appendChild(mainP);lay.appendChild(side);S.stage.appendChild(lay);
cv=K.canvas(mainP,0.28,draw,120,190);
mainP.insertBefore(cv.wrap,lifeRow);
K.on(S.root,'keydown',function(e){
var k=(e.key||'').toUpperCase(),m={'1':0,'2':1,'3':2,'4':3,A:0,B:1,C:2,D:3};
if(k in m&&!st.locked&&!optB[m[k]].disabled){e.preventDefault();answer(m[k]);}
});
st={idx:0,used:[],lifes:{}};
guided();
return{destroy:function(){K.destroy();}};
}
});
})();
