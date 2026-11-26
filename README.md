# VidyaVerse University (v2) — engine

A free, private, offline-friendly online university for every age — from an infant on a parent’s lap to a PhD scholar, an AZ-104 candidate, a fresher learning office politics or a senior manager. 100 % static, client-side and free: no sign-up, no backend, no trackers.

Live (after publishing): https://kumarnikhildeveloperaccount.github.io/vidyaverse/

## What the engine does
- **Cinematic welcome**: a campus-at-dawn SVG scene (stars fade, the sun rises, windows light up, birds, mist, a lotus pond, parallax), a stroke-drawn lotus logo and a letter-by-letter word reveal. After that comes onboarding: *Who is learning?* → age slider (0–80+, or “I’d rather not say”, plus study/work stage for adults) → interests across the 15 schools → avatar builder → UI mode with a live preview. You can skip any of it, start as a guest, keep several profiles on one device and pick from them.
- **Five UI modes**, each with its own palette, type, density, motion and Web Audio sound set: `tiny` (audio-first, 72 px targets, reads everything aloud on tap, captions always on, adult maths gate before settings and before leaving), `kids`, `teen`, `campus`, `pro`. Accessibility options for every profile: larger text, high contrast, dyslexia-friendly spacing, reduced motion and captions for audio cues.
- **Campus home**: greeting, XP level, streak, daily-goal ring, continue learning, a 3D campus map (three.js r128, loaded lazily from cdnjs) with an accessible 2D SVG fallback, recommendations by band and interests, the 15 school cards with progress rings, and instant fuzzy search across course and lesson titles. Filters: school, band, age, level range 1–10, curriculum tag, duration and show/hide sensitive.
- **School, course and lesson pages**. The lesson player has five parts: an animated story told as a storyboard (with autoplay and read-aloud) → steps rendered from markdown-lite, revealed as you scroll, with per-step and read-all speech → the activity widget → a quiz with explanations → XP, confetti and the next lesson. Lessons can also have optional *Open lab* / *Play game* buttons.
- **All 17 widget types**: tap-hear, count-tap, tap-reveal, flashcards, match-pairs, order-steps, sort-buckets, fill-blank, number-input, true-false, scenario, slider, timeline, reflection, breathing, checklist and faq. Each works with pointer, touch and keyboard.
- **Placement tests**: every level is open. A course above your unlocked level offers a 10-question adaptive test, built from exam questions of that school’s lower-level courses. Each right answer makes the next question harder. Scoring 70 % or more unlocks that level and everything below it. *Explore freely* needs the adult gate on under-18 profiles. Results show what to revise.
- **Exam hall**: course exams (timed or untimed, easiest → toughest), 5-rung challenge ladders per school, timed mock tests, results broken down by difficulty, retry of wrong answers and a certificate (canvas → PNG download, plus a print stylesheet).
- **Progress & rewards**: XP, levels with titles, streaks, 27 badges (one is secret), rings per school, time learned, a 7-day chart, a grown-ups dashboard (progress, time, goals and sensitive-topic settings for each profile), JSON export/import and reset.
- **Sensitive topics**: calm notice with the guardianNote, a grown-up confirms once per course for under-18 profiles, and a quick exit (Esc or ✋ button) that goes to a neutral times-tables page. Adults are never blocked.
- **Labs & Games hubs** (`#/labs`, `#/games`), filtered by band, with a full-screen launcher that loads `labs/<id>.js` / `games/<id>.js` on demand and passes the SPEC API. The built-in **Dimension Lab** (`dimension-lab`, 2D → 9D) is ported from v1.
- **About page** with the independence statement, safety, privacy, credits and the gratitude line. There are **15 school link folders**, each with its own title, description, og tags and theme colour. The app also has an offline **service worker**, an installable **manifest** and **i18n** for navigation labels (English and Hindi).
- Easter egg: type `vidya` anywhere, enter the Konami code, or tap the logo 7 times.

## Routes (hash routing; deep links and the back button work)
`#/` home · `#/search?q=` · `#/school/<faculty>` · `#/course/<courseId>` · `#/lesson/<lessonId>` · `#/exam/<courseId>[?timed=1|?cert=1]` · `#/exams` · `#/ladder/<faculty>` · `#/mock/<faculty>` · `#/placement/<faculty>/<level>[?course=<courseId>]` · `#/labs` · `#/lab/<id>` · `#/games` · `#/game/<id>` · `#/progress` · `#/parents` · `#/settings` · `#/profiles` · `#/about` · `#/code[/<lang>]` (Code Studio) · `#/calm` (neutral quick-exit page) · `#/welcome` (add a learner)

## Data contracts
- `packs/index.json`: an array of `{id, faculty, title, icon, color, description, courses:[{id, title, icon, band, ages:[min,max], level, minutes, lessons:<count>, curricula:[…], sensitive, summary, lessonTitles?:[…]}]}`. **`lessonTitles` is optional but recommended**, because it lets search find lesson titles without downloading packs. If `packs/index.json` is missing or empty, the engine falls back to `packs/index.sample.json`.
- `packs/<packId>.json`: the SPEC schema 2. It is loaded lazily when a course, lesson, exam, ladder, mock or placement test needs it.
- `labs/index.json`, `games/index.json`: an array of `{id, title, icon, faculty, bands:[…], summary}`. The fallback is `*/index.sample.json`. `dimension-lab` is always added to the labs list.
- Lab/game scripts: `VVLabs.register({id, …, mount(el, api)})` / `VVGames.register(…)`. The `api` is `{mode, reducedMotion, lowPower, sound(name), say(text), award(xp, reason), done(scorePct), t(key), profile}`. Awards are capped at 50 XP per launch.

## Files
`index.html`, `404.html`, `sw.js`, `manifest.webmanifest`, `favicon.svg`, `assets/icon-192.png`, `assets/icon-512.png`, `assets/icon-maskable-512.png`
`css/`: base, modes, ui, widgets, welcome, print
`js/` loaded at start (~100 KB): core, data, store, campus, app
`js/` loaded lazily: welcome, player, widgets-a, widgets-b, exam, progress, hub, pages, worldmap, lab-dim
School link folders: `nanhe-kadam/`, `pathshala/`, `lakshya/`, `vishwavidyalaya/`, `shodh/`, `udyog/`, `yantra/`, `jeevan/`, `mann/`, `nyaya/`, `krida/`, `kala/`, `hunar/`, `seva/`, `bhasha/`
Samples (for testing only): `packs/_sample.json`, `packs/index.sample.json`, `labs/index.sample.json`, `games/index.sample.json`. **Exclude `_sample` from the generated `packs/index.json`.**

## Code Lab (activity type `code`) and Code Studio (`#/code`)
- **Lesson widget** `{"type":"code","lang":…,"prompt","starter","tests":[{stdin, expect}],"solution","hint"}` (SPEC-X1). Editor with line numbers, syntax highlighting, smart indent/auto-pairs, Tab/Shift+Tab, Ctrl/⌘+/ comments, a phone symbol bar (⌨), Esc→Tab to leave the editor. **Run** (Ctrl/⌘+Enter), **Check** runs every test (Ctrl/⌘+Shift+Enter) and shows a line-by-line diff that marks the first differing character. You also get a stdin box, an output console, **Hint**, **Show solution** (your own attempt is kept), **Reset**, copy and download. Drafts autosave per lesson. Passing all tests gives +15 XP once (+5 after peeking) and the activity completes.
- **Test matching**: an exact match after trimming line ends passes, a match that differs only in spacing passes with a note, and `expect` written as `/regex/flags` is matched as a regex. Optional extras: `sql` uses the `setup` script and is compared as CSV rows, with or without the header line. `mongodb` uses `setup:[{collection, docs}]` and prints one JSON document per line; the shell-style rendering is also accepted. `node` tests may add `"request":"GET /path"` (or `{method,path,body,headers}`) and an optional `"status"`, and are then compared with the response body. `html`/`css`/`react` tests are compared with the page's visible text, and a regex is also tried against the HTML and the source. A test can add `"selector":"h1","css":"color"` to compare a computed style. `css` lessons may give `"html"` to style; otherwise a demo page is used.
- **Engines.** Real execution: Python (Pyodide 0.26.4), JavaScript (the browser's own engine in a worker), HTML/CSS (live preview), React 18.2 + Babel 7.24, and SQL (sql.js 1.8.0, real SQLite). Simulated: Node.js/Express (shims for express, http, fs-stdin, readline, events, path, util, os and assert, plus a fake HTTP client), and MongoDB through "Mongo-lite", our own in-memory engine. Educational interpreters: Java and C# run on VidyaVerse's teaching interpreter for a subset of each language. C/C++ use JSCPP 2.0.9, and fall back automatically to the same teaching interpreter, which also handles vector/string/map/set/algorithm.
- **Sandboxing**: user code runs in an opaque-origin `<iframe sandbox="allow-scripts">`, which hosts a Worker under a CSP that allows connections only to the three CDNs. If the browser refuses that, it falls back to a plain Worker with fetch/XHR/WebSocket/IndexedDB/caches removed. Previews use a second sandboxed frame with `connect-src 'none'`, and links and forms are caught. Loops are guarded by injected checks that report the line number. Every run also has a hard time limit (JS/Node/Mongo 6 s, Python 20 s with a warning at 5 s, SQL 8 s, C/C++ 10 s), and the teaching interpreter is step- and recursion-limited.
- **Files**: `js/widgets-code.js` (widget + shared panel), `js/codestudio.js` (route), `js/code-editor.js`, `js/code-run.js`, `js/code-preview.js`, `js/code-node.js`, `js/code-mongo.js`, `js/code-edu.js` + `js/code-edu-rt.js` + `js/code-edu-lib.js` (teaching interpreter), `css/code.css`. All load lazily; the runtimes download from the CDN on first use, and the service worker keeps them in a long-lived `vv2-cdn-1` cache.
- **Sample pack**: `packs/tech-codelab-samples.json` has 6 lessons covering Python, JavaScript, SQL, HTML/CSS, Node/Express and Java.

## CDN (Code Lab)
`https://cdn.jsdelivr.net/pyodide/v0.26.4/full/` · `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/` (sql-wasm.js + .wasm) · `https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js` · `https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js` · `https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.7/babel.min.js` · `https://cdn.jsdelivr.net/npm/JSCPP@2.0.9/dist/JSCPP.es5.min.js` (optional; the built-in interpreter is used if it fails).

## CDN
three.js r128 — `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`. It is only needed for the 3D campus map, and the app falls back to 2D if it fails or the device is low-power.

## Privacy
All data lives in `localStorage` under the key `vidyaverse2` on the learner’s device. Nothing is ever sent anywhere.

---
Designed & built by **Kumar Nikhil** — [Portfolio](https://kumarnikhildeveloperaccount.github.io/) · [LinkedIn](https://www.linkedin.com/in/kumar-nikhil-1000a9192/) · [Email](mailto:nkashyapnikhilnk@gmail.com) · [More projects by Kumar Nikhil →](https://kumarnikhildeveloperaccount.github.io/)

With gratitude to God — Om Namah Paarvati Pateh, Har Har Mahadev. May God bless you and everyone.
