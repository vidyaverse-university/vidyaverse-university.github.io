/* VidyaVerse v2 — Code Studio (#/code, #/code/<lang>): a free playground for 12 languages with starter templates,
   saved snippets (localStorage), file import/export and keyboard shortcuts. Uses VV2.Code.lab from widgets-code.js. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, C = VV2.Code = VV2.Code || {};
  var S = VV2.Studio = {};

  var SQL_SETUP = "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, city TEXT, marks INTEGER);\nINSERT INTO students VALUES\n  (1, 'Asha', 'Pune', 91), (2, 'Ravi', 'Delhi', 78), (3, 'Meera', 'Pune', 85),\n  (4, 'Kabir', 'Chennai', 66), (5, 'Zoya', 'Delhi', 94);\nCREATE TABLE fees (student_id INTEGER, paid INTEGER);\nINSERT INTO fees VALUES (1, 12000), (2, 9000), (3, 12000), (5, 6000);";
  var MONGO_SETUP = [{ collection: 'books', docs: [
    { _id: 1, title: 'The Monsoon Clockmaker', author: 'Ira Sen', year: 2011, genre: 'fiction', copies: 4, tags: ['rain', 'mystery'] },
    { _id: 2, title: 'Algorithms for Chai Lovers', author: 'Dev Rao', year: 2019, genre: 'tech', copies: 7, tags: ['code'] },
    { _id: 3, title: 'Kites over Jaipur', author: 'Ira Sen', year: 2016, genre: 'fiction', copies: 2, tags: ['travel'] },
    { _id: 4, title: 'Tiny Habits, Big Exams', author: 'Neha Iyer', year: 2021, genre: 'self-help', copies: 9, tags: ['study', 'habits'] },
    { _id: 5, title: 'The Cricket Physicist', author: 'Dev Rao', year: 2014, genre: 'science', copies: 3, tags: ['sport', 'physics'] }] }];

  var T = {
    python: [
      { n: 'Hello + input', stdin: 'Asha', c: 'name = input("What is your name? ")\nprint(f"Namaste, {name}! 👋")\n\nfor i in range(1, 4):\n    print(i, "x 7 =", i * 7)\n' },
      { n: 'Lists & dictionaries', c: 'marks = {"Asha": 91, "Ravi": 78, "Meera": 85}\n\ntop = max(marks, key=marks.get)\nprint("Topper:", top)\n\naverage = sum(marks.values()) / len(marks)\nprint(f"Average: {average:.1f}")\n\nfor name, m in sorted(marks.items(), key=lambda kv: -kv[1]):\n    print(f"{name:<6} {m:>3}", "⭐" * (m // 30))\n' },
      { n: 'Functions & recursion', c: 'def fib(n):\n    """Return the n-th Fibonacci number."""\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint([fib(i) for i in range(10)])\n\ndef is_prime(n):\n    return n > 1 and all(n % d for d in range(2, int(n ** 0.5) + 1))\n\nprint([p for p in range(30) if is_prime(p)])\n' }
    ],
    javascript: [
      { n: 'Hello + arrays', stdin: '5', c: 'const n = Number(prompt("How many squares?"));\nconst squares = Array.from({ length: n }, (_, i) => (i + 1) ** 2);\nconsole.log("Squares:", squares);\nconsole.log("Even ones:", squares.filter(x => x % 2 === 0));\nconsole.log(`Total = ${squares.reduce((a, b) => a + b, 0)}`);\n' },
      { n: 'Async & promises', c: 'const wait = (ms) => new Promise((res) => setTimeout(res, ms));\n\nasync function brewChai() {\n  console.log("Boiling water…");\n  await wait(300);\n  console.log("Adding tea leaves…");\n  await wait(300);\n  return "Chai is ready ☕";\n}\n\nbrewChai().then(console.log);\nconsole.log("(this line prints first — JavaScript does not wait!)");\n' },
      { n: 'Classes & objects', c: 'class Account {\n  #balance = 0;\n  constructor(owner) { this.owner = owner; }\n  deposit(x) { if (x <= 0) throw new Error("Deposit must be positive"); this.#balance += x; return this; }\n  get balance() { return this.#balance; }\n}\n\nconst a = new Account("Meera").deposit(500).deposit(250);\nconsole.log(a.owner, "has ₹" + a.balance);\ntry { a.deposit(-5); } catch (e) { console.log("Oops:", e.message); }\n' }
    ],
    html: [
      { n: 'Profile card', c: '<!doctype html>\n<html>\n<head>\n  <style>\n    body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 90vh; background: #fdf6ec; }\n    .card { background: white; padding: 24px; border-radius: 18px; box-shadow: 0 10px 30px #0002; text-align: center; max-width: 280px; }\n    .avatar { font-size: 56px; }\n    button { padding: 10px 18px; border: 0; border-radius: 999px; background: #1d5c63; color: white; font-size: 16px; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <div class="avatar">🧑‍🎓</div>\n    <h1>Asha Verma</h1>\n    <p>Learning HTML at VidyaVerse</p>\n    <button id="like">❤️ Like (<span id="n">0</span>)</button>\n  </div>\n  <script>\n    let likes = 0;\n    document.getElementById("like").addEventListener("click", () => {\n      likes++;\n      document.getElementById("n").textContent = likes;\n      console.log("Likes:", likes);\n    });\n  </script>\n</body>\n</html>\n' },
      { n: 'Form & table', c: '<h2>Monthly budget</h2>\n<form id="f">\n  <input name="item" placeholder="Item" required>\n  <input name="cost" type="number" placeholder="₹" required>\n  <button>Add</button>\n</form>\n<table border="1" cellpadding="6">\n  <thead><tr><th>Item</th><th>Cost (₹)</th></tr></thead>\n  <tbody id="rows"></tbody>\n</table>\n<p>Total: ₹<b id="total">0</b></p>\n<script>\n  const f = document.getElementById("f");\n  let total = 0;\n  f.addEventListener("submit", (e) => {\n    e.preventDefault();\n    const item = f.item.value, cost = Number(f.cost.value);\n    document.getElementById("rows").insertAdjacentHTML("beforeend", `<tr><td>${item}</td><td>${cost}</td></tr>`);\n    total += cost;\n    document.getElementById("total").textContent = total;\n    f.reset();\n  });\n</script>\n' }
    ],
    css: [
      { n: 'Style the demo page', c: '.demo {\n  max-width: 520px;\n  margin: 0 auto;\n  font-family: Georgia, serif;\n}\nh1 { color: #1d5c63; letter-spacing: -0.5px; }\n.lead { color: #5b6478; font-size: 1.1rem; }\n.btn {\n  padding: 10px 20px;\n  border: 0;\n  border-radius: 999px;\n  background: linear-gradient(135deg, #ff7a45, #ffb36b);\n  color: white;\n  cursor: pointer;\n  transition: transform .2s;\n}\n.btn:hover { transform: translateY(-2px) scale(1.04); }\n.list { display: flex; gap: 8px; padding: 0; list-style: none; }\n.list li { background: #fff3d6; padding: 6px 12px; border-radius: 12px; }\n.card { border: 2px dashed #d4a23c; padding: 12px 16px; border-radius: 16px; margin-top: 16px; }\n' },
      { n: 'Flexbox & grid', c: '.list {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n  list-style: none;\n  padding: 0;\n}\n.list li {\n  aspect-ratio: 1;\n  display: grid;\n  place-items: center;\n  border-radius: 16px;\n  background: #e0f2f1;\n  font-weight: bold;\n}\n.list li:nth-child(2) { background: #fde2e4; }\n.list li:nth-child(3) { background: #fff1c1; }\n' }
    ],
    react: [
      { n: 'Counter', c: 'function App() {\n  const [count, setCount] = React.useState(0);\n  const mood = count > 5 ? "🤩" : count > 0 ? "🙂" : "😴";\n  return (\n    <div style={{ fontFamily: "system-ui", textAlign: "center", padding: 20 }}>\n      <h1>{mood} {count}</h1>\n      <button onClick={() => setCount(count + 1)}>Add one</button>{" "}\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}\n' },
      { n: 'To-do list', c: 'import { useState } from "react";\n\nexport default function App() {\n  const [items, setItems] = useState(["Revise maths", "Drink water"]);\n  const [text, setText] = useState("");\n  const add = (e) => { e.preventDefault(); if (text.trim()) { setItems([...items, text.trim()]); setText(""); } };\n  return (\n    <main style={{ fontFamily: "system-ui", maxWidth: 360, margin: "auto" }}>\n      <h2>📝 My tasks ({items.length})</h2>\n      <form onSubmit={add}>\n        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" />\n        <button>Add</button>\n      </form>\n      <ul>{items.map((it, i) => <li key={i} onClick={() => setItems(items.filter((_, j) => j !== i))}>{it}</li>)}</ul>\n      <small>Tap a task to finish it.</small>\n    </main>\n  );\n}\n' }
    ],
    node: [
      { n: 'Express API', c: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nconst students = [{ id: 1, name: "Asha" }, { id: 2, name: "Ravi" }];\n\napp.get("/", (req, res) => res.send("Hello from a simulated server 👋"));\napp.get("/api/students", (req, res) => res.json(students));\napp.get("/api/students/:id", (req, res) => {\n  const s = students.find((x) => x.id === Number(req.params.id));\n  if (!s) return res.status(404).json({ error: "Not found" });\n  res.json(s);\n});\napp.post("/api/students", (req, res) => {\n  const s = { id: students.length + 1, name: req.body.name };\n  students.push(s);\n  res.status(201).json(s);\n});\n\napp.listen(3000, () => console.log("Server listening on port 3000"));\n' },
      { n: 'Read stdin (fs)', stdin: '4 8 15 16 23 42', c: 'const fs = require("fs");\nconst nums = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);\nconst total = nums.reduce((a, b) => a + b, 0);\nconsole.log("Count:", nums.length);\nconsole.log("Sum:", total);\nconsole.log("Max:", Math.max(...nums));\n' }
    ],
    sql: [
      { n: 'Group & sort', setup: SQL_SETUP, c: '-- Average marks per city, best first\nSELECT city, COUNT(*) AS students, ROUND(AVG(marks), 1) AS avg_marks\nFROM students\nGROUP BY city\nORDER BY avg_marks DESC;\n' },
      { n: 'JOIN two tables', setup: SQL_SETUP, c: '-- Who has paid fees? (LEFT JOIN keeps students with no payment)\nSELECT s.name, COALESCE(f.paid, 0) AS paid\nFROM students s\nLEFT JOIN fees f ON f.student_id = s.id\nORDER BY paid DESC, s.name;\n' }
    ],
    mongodb: [
      { n: 'find & sort', setup: MONGO_SETUP, c: '// Fiction books, newest first, only title and year\ndb.books.find({ genre: "fiction" }, { _id: 0, title: 1, year: 1 }).sort({ year: -1 })\n' },
      { n: 'aggregate', setup: MONGO_SETUP, c: '// Copies per author\ndb.books.aggregate([\n  { $group: { _id: "$author", books: { $sum: 1 }, copies: { $sum: "$copies" } } },\n  { $sort: { copies: -1 } }\n])\n' }
    ],
    c: [
      { n: 'Hello + scanf', stdin: '7', c: '#include <stdio.h>\n\nint main() {\n    int n;\n    printf("Enter a number: ");\n    scanf("%d", &n);\n    printf("\\n");\n    for (int i = 1; i <= 5; i++) {\n        printf("%d x %d = %d\\n", n, i, n * i);\n    }\n    return 0;\n}\n' },
      { n: 'Arrays & functions', c: '#include <stdio.h>\n\nint maxOf(int a[], int n) {\n    int best = a[0];\n    for (int i = 1; i < n; i++)\n        if (a[i] > best) best = a[i];\n    return best;\n}\n\nint main() {\n    int marks[] = {72, 91, 85, 64, 99};\n    int n = sizeof(marks) / sizeof(marks[0]);\n    printf("Highest: %d\\n", maxOf(marks, n));\n    double sum = 0;\n    for (int i = 0; i < n; i++) sum += marks[i];\n    printf("Average: %.2f\\n", sum / n);\n    return 0;\n}\n' }
    ],
    cpp: [
      { n: 'cin & cout', stdin: '3 4', c: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << "Sum: " << a + b << endl;\n    cout << "Product: " << a * b << endl;\n    return 0;\n}\n' },
      { n: 'vector & sort', c: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names = {"Meera", "Asha", "Ravi", "Zoya"};\n    sort(names.begin(), names.end());\n    for (const string& n : names) cout << n << " ";\n    cout << "\\n";\n    vector<int> v = {5, 3, 9, 1};\n    cout << "Max: " << *max_element(v.begin(), v.end()) << endl;\n    return 0;\n}\n' }
    ],
    java: [
      { n: 'Scanner & loop', stdin: '5', c: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for (int i = 1; i <= n; i++) {\n            sum += i;\n        }\n        System.out.println("Sum of 1.." + n + " = " + sum);\n    }\n}\n' },
      { n: 'Classes & ArrayList', c: 'import java.util.ArrayList;\n\npublic class Main {\n    static class Student {\n        String name;\n        int marks;\n        Student(String name, int marks) { this.name = name; this.marks = marks; }\n        boolean passed() { return marks >= 40; }\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Student> list = new ArrayList<>();\n        list.add(new Student("Asha", 91));\n        list.add(new Student("Kabir", 35));\n        for (Student s : list) {\n            System.out.printf("%-6s %3d %s%n", s.name, s.marks, s.passed() ? "PASS" : "RETRY");\n        }\n    }\n}\n' }
    ],
    csharp: [
      { n: 'Console & input', stdin: 'Meera', c: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.Write("Your name: ");\n        string name = Console.ReadLine();\n        Console.WriteLine();\n        Console.WriteLine($"Hello, {name}! Today you will learn C#.");\n        for (int i = 3; i > 0; i--) Console.WriteLine(i + "…");\n        Console.WriteLine("Go! 🚀");\n    }\n}\n' },
      { n: 'List & LINQ', c: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nvar marks = new List<int> { 72, 91, 85, 64, 99 };\nConsole.WriteLine($"Average: {marks.Average():F1}");\nConsole.WriteLine($"Top three: {string.Join(", ", marks.OrderByDescending(m => m).Take(3))}");\nvar passed = marks.Where(m => m >= 70).Count();\nConsole.WriteLine($"Passed: {passed} of {marks.Count}");\n' }
    ]
  };
  S.templates = T;

  var cur = null;
  S.render = function (main, langArg) {
    VV2.setTitle('Code Studio'); main.innerHTML = '';
    var w = h('div', { class: 'wrap studio' }); main.appendChild(w);
    var st0 = C.cstore ? C.cstore.get() : { snippets: [] };
    var lang = C.langOf(langArg || (st0.lastLang || 'python')), openSnip = null;
    w.appendChild(h('header', { class: 'st-hero' }, [
      h('div', null, [h('p', { class: 'eyebrow' }, 'Yantra · Code Studio'), h('h1', null, '💻 Write code. Run it. Right here.'),
        h('p', { class: 'lead' }, '12 languages, no installs, no sign-up. Python, SQL, JavaScript, HTML, CSS and React run for real in a locked-down sandbox; Node/Express and MongoDB are honest simulations; Java, C#, C and C++ use teaching interpreters. Everything stays on your device.')]),
      h('div', { class: 'st-art', 'aria-hidden': 'true' }, [h('span', null, '{'), h('i', null, '▶'), h('span', null, '}')])]));
    var picker = h('div', { class: 'st-langs', role: 'radiogroup', 'aria-label': 'Choose a language' });
    w.appendChild(picker);
    var bar = h('div', { class: 'st-bar' }), slot = h('div', { class: 'st-slot' }), side = h('aside', { class: 'st-side', 'aria-label': 'Saved snippets and help' });
    w.appendChild(bar); w.appendChild(h('div', { class: 'st-grid' }, [slot, side]));
    VV2.loading(slot, 'Plugging in the keyboard…');

    return C.deps().then(function () {
      C.ORDER.forEach(function (l) {
        var L = C.LANGS[l], k = (C.ENGINES[l] || {}).kind;
        var b = h('button', { type: 'button', role: 'radio', class: 'st-lang k-' + k, 'aria-checked': l === lang ? 'true' : 'false', 'data-l': l, title: (C.ENGINES[l] || {}).label || L.name }, [h('span', { 'aria-hidden': 'true' }, L.icon), h('b', null, L.name.replace(' (SQLite)', '').replace(' · Express', '').replace(' (JSX)', ''))]);
        b.addEventListener('click', function () { if (l !== lang) { lang = l; openSnip = null; history.replaceState(null, '', '#/code/' + l); build(); } });
        picker.appendChild(b);
      });
      picker.addEventListener('keydown', function (e) {
        if (!/Arrow(Left|Right|Up|Down)/.test(e.key)) return;
        var bs = VV2.$$('.st-lang', picker), i = bs.indexOf(document.activeElement); if (i < 0) return;
        e.preventDefault(); var j = (i + (/Right|Down/.test(e.key) ? 1 : -1) + bs.length) % bs.length; bs[j].focus(); bs[j].click();
      });
      build();
      VV2.onLeave(function () { if (cur) { cur.destroy(); cur = null; } });
    });

    function tplOf(l, i) { return (T[l] || [])[i || 0] || { n: 'Blank', c: '' }; }
    function build(snip) {
      if (cur) { cur.destroy(); cur = null; }
      VV2.$$('.st-lang', picker).forEach(function (b) { b.setAttribute('aria-checked', b.getAttribute('data-l') === lang ? 'true' : 'false'); b.tabIndex = b.getAttribute('data-l') === lang ? 0 : -1; });
      C.cstore.edit(function (s) { s.lastLang = lang; });
      var tp = tplOf(lang, 0);
      bar.innerHTML = '';
      var sel = h('select', { 'aria-label': 'Start from a template' }, [h('option', { value: '' }, '📄 Templates…')].concat((T[lang] || []).map(function (t, i) { return h('option', { value: String(i) }, t.n); })));
      sel.addEventListener('change', function () {
        if (sel.value === '') return; var t = tplOf(lang, +sel.value); sel.value = '';
        var apply = function () { openSnip = null; cur.set(t.c); if (t.stdin != null) cur.stdin(t.stdin); if (t.setup != null) cur.setSetup(typeof t.setup === 'string' ? t.setup : JSON.stringify(t.setup, null, 2)); title.textContent = 'Untitled ' + C.LANGS[lang].name; VV2.toast('Template loaded: ' + t.n, '📄'); };
        if (cur.get().trim() && cur.get() !== tp.c) VV2.modal({ title: 'Replace your code?', body: h('p', null, 'Load “' + t.n + '”? Your current code will be replaced (save it as a snippet first if you want to keep it).'), actions: [{ label: 'Cancel', value: false }, { label: 'Load template', primary: true, onClick: apply }] });
        else apply();
      });
      var bSave = h('button', { type: 'button', class: 'btn small primary', 'aria-keyshortcuts': 'Control+S' }, '💾 Save');
      var bNew = h('button', { type: 'button', class: 'btn small ghost' }, '✨ New');
      var fileIn = h('input', { type: 'file', accept: '.py,.js,.mjs,.jsx,.html,.htm,.css,.sql,.c,.h,.cpp,.cc,.hpp,.java,.cs,.txt,.json', class: 'sr', 'aria-label': 'Open a code file from your device', tabindex: '-1' });
      var bOpen = h('button', { type: 'button', class: 'btn small ghost' }, '📂 Open file');
      var title = h('span', { class: 'st-title', 'aria-live': 'polite' }, snip ? snip.name : 'Untitled ' + C.LANGS[lang].name);
      bar.appendChild(h('div', { class: 'st-bl' }, [title])); bar.appendChild(h('div', { class: 'st-br' }, [sel, bNew, bOpen, fileIn, bSave]));
      slot.innerHTML = '';
      cur = C.lab(slot, { lang: lang, code: snip ? snip.code : tp.c, studio: true, setup: snip && snip.setup != null ? snip.setup : tp.setup, stdin: snip ? snip.stdin || '' : tp.stdin || '', draftKey: snip ? null : 'studio:' + lang, fileBase: snip ? snip.name.replace(/[^\w.-]+/g, '-') : 'vidyaverse-' + lang, onSave: saveSnip, minLines: 14, maxLines: 30,
        onRun: function (r) { if (r.ok && /hello,? vidyaverse/i.test(r.out || '')) VV2.toast('Hello back! 🪷 The campus heard you.', '🪷'); } });
      bSave.addEventListener('click', saveSnip);
      bNew.addEventListener('click', function () { openSnip = null; cur.set(''); title.textContent = 'Untitled ' + C.LANGS[lang].name; cur.editor.focus(); });
      bOpen.addEventListener('click', function () { fileIn.click(); });
      fileIn.addEventListener('change', function () {
        var f = fileIn.files && fileIn.files[0]; if (!f) return;
        if (f.size > 400000) { VV2.toast('That file is over 400 KB — too big for the studio.', '⚠️'); return; }
        var ext = (f.name.split('.').pop() || '').toLowerCase(), map = { py: 'python', js: 'javascript', mjs: 'javascript', jsx: 'react', html: 'html', htm: 'html', css: 'css', sql: 'sql', c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', hpp: 'cpp', java: 'java', cs: 'csharp' };
        var rd = new FileReader();
        rd.onload = function () { var nl = map[ext] || lang; var sn = { name: f.name, lang: nl, code: String(rd.result || '') }; lang = nl; history.replaceState(null, '', '#/code/' + nl); build(sn); VV2.toast('Opened ' + f.name, '📂'); };
        rd.onerror = function () { VV2.toast('Could not read that file.', '⚠️'); };
        rd.readAsText(f); fileIn.value = '';
      });
      if (snip && snip.stdin) cur.stdin(snip.stdin);
      openSnip = snip && snip.id ? snip : null;
      drawSide();
      function saveSnip() {
        var code = cur.get();
        if (!code.trim()) { VV2.toast('Nothing to save yet — write a little code first.', '✍️'); return; }
        var inp = h('input', { type: 'text', value: openSnip ? openSnip.name : 'My ' + C.LANGS[lang].name + ' snippet', maxlength: '60', 'aria-label': 'Snippet name', class: 'st-name' });
        VV2.modal({ title: '💾 Save snippet', body: h('div', null, [h('label', null, ['Name', inp]), h('p', { class: 'muted small-note' }, 'Saved only in this browser. Use ⬇️ to keep a file copy.')]), actions: [{ label: 'Cancel', value: false }, { label: openSnip ? 'Update' : 'Save', primary: true, onClick: function () {
          var nm = inp.value.trim() || 'Untitled';
          C.cstore.edit(function (s) {
            var rec = { id: openSnip ? openSnip.id : 's' + Date.now().toString(36), name: nm, lang: lang, code: code, stdin: cur.stdin(), setup: cur.setup(), t: Date.now() };
            s.snippets = s.snippets.filter(function (x) { return x.id !== rec.id; }); s.snippets.unshift(rec); if (s.snippets.length > 60) s.snippets.length = 60; openSnip = rec;
          });
          title.textContent = nm; VV2.toast('Saved “' + nm + '”', '💾'); VV2.sfx('good'); drawSide();
        } }] });
        setTimeout(function () { try { inp.select(); } catch (e) { } }, 80);
      }
    }
    function drawSide() {
      side.innerHTML = '';
      var sn = C.cstore.get().snippets;
      side.appendChild(h('h2', { class: 'st-h' }, '📚 Your snippets'));
      if (!sn.length) side.appendChild(h('p', { class: 'muted' }, 'Nothing saved yet. Press 💾 Save (or Ctrl/⌘ + S) and your code lives here — on this device only.'));
      var ul = h('ul', { class: 'st-snips' }); side.appendChild(ul);
      sn.forEach(function (x) {
        var L = C.LANGS[x.lang] || C.LANGS.javascript;
        var open = h('button', { type: 'button', class: 'st-sn', title: 'Open ' + x.name }, [h('span', { 'aria-hidden': 'true' }, L.icon), h('b', null, x.name), h('small', { class: 'muted' }, L.name + ' · ' + new Date(x.t).toLocaleDateString())]);
        var del = h('button', { type: 'button', class: 'icon-btn small', 'aria-label': 'Delete ' + x.name }, '🗑️');
        var dl = h('button', { type: 'button', class: 'icon-btn small', 'aria-label': 'Download ' + x.name }, '⬇️');
        open.addEventListener('click', function () { lang = x.lang; history.replaceState(null, '', '#/code/' + x.lang); build(x); });
        dl.addEventListener('click', function () { C.download(x.name.replace(/[^\w.-]+/g, '-') + '.' + L.ext, x.code); });
        del.addEventListener('click', function () { VV2.modal({ title: 'Delete snippet?', body: h('p', null, '“' + x.name + '” will be removed from this browser.'), actions: [{ label: 'Keep', value: false }, { label: 'Delete', primary: true, onClick: function () { C.cstore.edit(function (s) { s.snippets = s.snippets.filter(function (q) { return q.id !== x.id; }); }); drawSide(); VV2.toast('Deleted.', '🗑️'); } }] }); });
        ul.appendChild(h('li', null, [open, dl, del]));
      });
      if (sn.length) side.appendChild(h('button', { type: 'button', class: 'btn small ghost', onclick: function () { C.download('vidyaverse-snippets.json', JSON.stringify({ app: 'VidyaVerse Code Studio', v: 1, snippets: C.cstore.get().snippets }, null, 2), 'application/json'); } }, '⬇️ Export all (.json)'));
      side.appendChild(h('h2', { class: 'st-h' }, '⌨️ Shortcuts'));
      var mod = navigator.platform && /Mac/.test(navigator.platform) ? '⌘' : 'Ctrl';
      side.appendChild(h('dl', { class: 'st-keys' }, [[mod + ' + Enter', 'Run'], [mod + ' + Shift + Enter', 'Run tests (lessons)'], [mod + ' + S', 'Save snippet'], [mod + ' + /', 'Comment / uncomment'], ['Tab · Shift + Tab', 'Indent · outdent'], ['Esc, then Tab', 'Leave the editor'], ['⌨ button', 'Symbol keys for phones']].map(function (k) { return h('div', null, [h('dt', null, h('kbd', null, k[0])), h('dd', null, k[1])]); })));
      side.appendChild(h('h2', { class: 'st-h' }, '🛡️ Honest engines'));
      side.appendChild(h('ul', { class: 'st-eng' }, C.ORDER.map(function (l) { var e = C.ENGINES[l] || {}; return h('li', { class: 'k-' + e.kind }, [h('b', null, C.LANGS[l].icon + ' ' + C.LANGS[l].name + ': '), e.label]); })));
      side.appendChild(h('p', { class: 'muted small-note' }, 'Your code runs in a sandbox with no access to this page and no network. Infinite loops are stopped automatically.'));
    }
  };
})();
