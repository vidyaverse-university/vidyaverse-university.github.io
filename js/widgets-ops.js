/* VidyaVerse v2 — widgets "terminal" (simulated console) and "ticket" (service-desk ticket simulation).
   Nothing here ever executes anything real: commands are matched against the lab's own regexes and a
   tiny virtual file system. Also exposes VV2.Ops.terminal(host, spec, opts) so tickets can embed a console. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var W = VV2.W = VV2.W || {};
  var Ops = VV2.Ops = VV2.Ops || {};
  if (VV2.needCss) VV2.needCss('ops');

  /* ====================== helpers ====================== */
  var MAXLINE = 600, MAXOUT = 500;
  function esc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  /* "/body/flags" -> RegExp, built safely; null when invalid */
  Ops.rx = function (s) {
    if (s instanceof RegExp) return s;
    s = String(s == null ? '' : s);
    var m = /^\/([\s\S]*)\/([a-z]*)$/.exec(s), body, flags = '';
    if (m) { body = m[1]; flags = m[2].replace(/[^imsu]/g, ''); }
    else { body = '^' + esc(s.trim()) + '$'; flags = 'i'; }
    if (/^\(\?i\)/.test(body)) { body = body.slice(4); if (flags.indexOf('i') < 0) flags += 'i'; }
    try { return new RegExp(body, flags); } catch (e) { try { console.warn('[terminal] bad regex', s, e.message); } catch (x) { } return null; }
  };
  function test(re, s) { if (!re) return false; try { re.lastIndex = 0; return re.test(s); } catch (e) { return false; } }
  function tokens(s) {
    var out = [], cur = '', q = null, had = false;
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (q) { if (c === q) q = null; else cur += c; continue; }
      if (c === '"' || c === "'") { q = c; had = true; continue; }
      if (/\s/.test(c)) { if (cur || had) out.push(cur); cur = ''; had = false; continue; }
      cur += c;
    }
    if (cur || had) out.push(cur);
    return out;
  }
  /* split on an operator outside quotes; ops: array of strings, longest first */
  function splitOut(s, ops) {
    var parts = [], cur = '', q = null, seps = [];
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (q) { if (c === q) q = null; cur += c; continue; }
      if (c === '"' || c === "'") { q = c; cur += c; continue; }
      var hit = null;
      for (var k = 0; k < ops.length; k++) if (s.substr(i, ops[k].length) === ops[k]) { hit = ops[k]; break; }
      if (hit) { parts.push(cur); seps.push(hit); cur = ''; i += hit.length - 1; continue; }
      cur += c;
    }
    parts.push(cur);
    return { parts: parts.map(function (x) { return x.trim(); }), seps: seps };
  }
  function fmtMin(m) { m = Math.max(0, Math.round(m)); var hh = Math.floor(m / 60), mm = m % 60; return (hh ? hh + 'h ' : '') + mm + 'm'; }
  function confirmBox(title, text, yes) {
    return new Promise(function (res) {
      if (VV2.modal) { var ok = false; VV2.modal({ title: title, body: h('p', null, text), actions: [{ label: 'Not yet', value: false }, { label: yes || 'Show it', primary: true, onClick: function () { ok = true; } }], onClose: function () { res(ok); } }); }
      else res(window.confirm(text));
    });
  }

  /* ====================== shells ====================== */
  var SH = {
    bash: { fam: 'nix', label: 'bash' }, kubectl: { fam: 'nix', label: 'bash · kubectl' }, docker: { fam: 'nix', label: 'bash · docker' }, git: { fam: 'nix', label: 'bash · git' },
    adb: { fam: 'nix', label: 'bash · adb' }, esxcli: { fam: 'nix', esx: true, label: 'ESXi shell' }, powershell: { fam: 'ps', label: 'PowerShell' }, powercli: { fam: 'ps', label: 'PowerShell · PowerCLI' },
    cmd: { fam: 'cmd', label: 'Command Prompt' }, cisco: { fam: 'ios', label: 'Cisco IOS' }, sql: { fam: 'sql', label: 'SQL' }, mongosh: { fam: 'mongo', label: 'mongosh' }, 'python-repl': { fam: 'py', label: 'Python REPL' }
  };
  var KNOWN_NIX = ('sudo su systemctl service journalctl dmesg nginx apache2ctl httpd ip ifconfig ping curl wget ss netstat lsof df du free top htop ps kill killall pkill grep egrep sed awk tail head less more vi vim nano chmod chown chgrp useradd usermod userdel groupadd passwd id who w last uptime uname hostnamectl timedatectl ' +
    'docker kubectl helm terraform ansible ssh scp rsync tar gzip gunzip zip unzip apt apt-get yum dnf rpm dpkg snap esxcli vim-cmd vmkping esxtop vmkfstools adb fastboot dig nslookup host traceroute tracepath mtr crontab mount umount lsblk fdisk parted mkfs fsck blkid ' +
    'git npm node python python3 pip pip3 java mvn gradle make gcc openssl nmap tcpdump iptables firewall-cmd ufw nft sestatus getenforce setenforce semanage restorecon find locate which whereis file stat ln cp mv diff sort uniq wc cut tr tee xargs env export alias date cal bc').split(' ');
  var KN = {}; KNOWN_NIX.forEach(function (k) { KN[k] = 1; });

  function helpText(fam, hasFs) {
    var lab = 'Lab commands: type what a real admin would type for the task on the left. Your command is checked by the lab, never run on a real machine.';
    if (fam === 'ps') return 'Simulated PowerShell — built-ins:\n  help · cls/clear · history · hint\n' + (hasFs ? '  Get-ChildItem (ls, dir, gci) · Get-Content (cat, type, gc) · Set-Location (cd, sl) · Get-Location (pwd)\n  New-Item / mkdir · Remove-Item (rm, del) · echo / Write-Output (> file)\n' : '') + lab;
    if (fam === 'cmd') return 'Simulated Command Prompt — built-ins:\n  help · cls · doskey /history · hint\n' + (hasFs ? '  dir · type · cd · mkdir · del · echo (> file)\n' : '') + lab;
    if (fam === 'ios') return 'Simulated Cisco IOS — built-ins: help · history · hint · clear · configure terminal · interface … · exit · end\n' + lab;
    if (fam === 'sql') return 'Simulated SQL prompt — built-ins: help · history · hint · clear\n' + lab;
    if (fam === 'mongo') return 'Simulated mongosh — built-ins: help · history · hint · clear\n' + lab;
    if (fam === 'py') return 'Simulated Python REPL — built-ins: help · history · hint · clear\n' + lab;
    return 'Simulated shell — built-ins:\n  help · clear · history · hint · pwd · ls [-la] · cd · cat · echo (> / >> file) · mkdir [-p] · touch · rm [-r]\n  grep · head · tail · wc -l   (pipes like  cat file | grep error  work on the virtual files)\n' + lab;
  }

  /* ====================== the terminal ====================== */
  Ops.terminal = function (host, a, o) {
    o = o || {}; a = a || {};
    var shell = SH[a.shell] ? a.shell : 'bash', S = SH[shell], fam = S.fam, win = fam === 'ps' || fam === 'cmd';
    var hostName = String(a.host || (fam === 'ios' ? 'Router' : S.esx ? 'esx01' : 'lab01')).slice(0, 40);
    var user = String(a.user || (S.esx ? 'root' : 'user')).slice(0, 24);
    var home = user === 'root' ? '/root' : '/home/' + user;
    var responses = (a.responses || []).map(function (r) { return { re: Ops.rx(r.match), out: r.out == null ? '' : String(r.out), set: r.set || null, err: !!r.err }; });
    var tasks = (a.tasks || []).map(function (t) { return { goal: String(t.goal || 'Task'), re: Ops.rx(t.match), needs: t.needs || [], set: t.set || null, done: false }; });
    var st, alive = true;
    function fresh() {
      st = { cwd: win ? '/' : (a.cwd || home), files: {}, dirs: {}, flags: {}, hist: [], hi: -1, miss: 0, cmds: 0, hint: 0, peeked: false, complete: false, ios: 'exec' };
      tasks.forEach(function (t) { t.done = false; });
      st.dirs['/'] = 1; if (!win) { mkdirp('/home'); mkdirp(home); mkdirp('/tmp'); mkdirp('/etc'); mkdirp('/var/log'); } else { mkdirp('/Windows/System32'); mkdirp('/Users/' + user); mkdirp('/Program Files'); }
      var fs = a.fs || {};
      Object.keys(fs).forEach(function (k) {
        var p = norm(k, '/'), v = fs[k];
        if (/[\\/]$/.test(k) || v === null) mkdirp(p); else { mkdirp(parent(p)); st.files[p] = String(v == null ? '' : v); }
      });
      if (a.cwd) { st.cwd = norm(a.cwd, '/'); mkdirp(st.cwd); }
    }
    /* ---- path model: internal POSIX paths; Windows paths drop the drive and are case-insensitive ---- */
    function norm(p, cwd) {
      p = String(p == null ? '' : p);
      var w = win || /^[a-z]:[\\/]/i.test(p);
      if (w) { p = p.replace(/\\/g, '/').replace(/^[a-z]:/i, ''); if (!p) p = '/'; }
      if (!w && (p === '~' || p.indexOf('~/') === 0)) p = home + p.slice(1);
      var abs = p.charAt(0) === '/' ? p : (cwd || st.cwd).replace(/\/$/, '') + '/' + p, out = [];
      abs.split('/').forEach(function (seg) { if (!seg || seg === '.') return; if (seg === '..') out.pop(); else out.push(seg); });
      return '/' + out.join('/');
    }
    function parent(p) { var i = p.lastIndexOf('/'); return i <= 0 ? '/' : p.slice(0, i); }
    function base(p) { return p === '/' ? '/' : p.slice(p.lastIndexOf('/') + 1); }
    function mkdirp(p) { var cur = ''; p.split('/').filter(Boolean).forEach(function (seg) { cur += '/' + seg; st.dirs[cur] = 1; }); st.dirs['/'] = 1; }
    function key(map, p) { if (map[p] != null) return p; if (!win) return null; var lp = p.toLowerCase(); for (var k in map) if (k.toLowerCase() === lp) return k; return null; }
    function isDir(p) { return key(st.dirs, p) != null; }
    function fileKey(p) { return key(st.files, p); }
    function kids(p) {
      var pre = p === '/' ? '/' : p + '/', seen = {}, out = [], lp = pre.toLowerCase();
      function add(k, d) { var kk = win ? k.toLowerCase() : k; if (kk.indexOf(win ? lp : pre) !== 0 || k === p) return; var rest = k.slice(pre.length); if (!rest) return; var nm = rest.split('/')[0]; if (seen[nm]) return; seen[nm] = 1; out.push({ name: nm, dir: d || rest.indexOf('/') >= 0, path: pre + nm }); }
      Object.keys(st.dirs).forEach(function (k) { add(k, true); }); Object.keys(st.files).forEach(function (k) { add(k, false); });
      return out.sort(function (x, y) { return x.name.localeCompare(y.name); });
    }
    function disp(p) {
      if (win) return 'C:' + (p === '/' ? '\\' : p.replace(/\//g, '\\'));
      if (p === home) return '~'; if (p.indexOf(home + '/') === 0) return '~' + p.slice(home.length); return p;
    }
    function promptText() {
      if (a.ps1) return String(a.ps1);
      if (fam === 'ps') return 'PS ' + disp(st.cwd) + '>';
      if (fam === 'cmd') return disp(st.cwd) + '>';
      if (fam === 'ios') return hostName + ({ exec: '#', user: '>', config: '(config)#', 'config-if': '(config-if)#', 'config-router': '(config-router)#', 'config-line': '(config-line)#', 'config-vlan': '(config-vlan)#' }[st.ios] || '#');
      if (fam === 'sql') return (a.db ? a.db : 'sql') + '>';
      if (fam === 'mongo') return (a.db || 'test') + '>';
      if (fam === 'py') return '>>>';
      if (S.esx) return '[' + user + '@' + hostName + ':' + (st.cwd === home || st.cwd === '/' ? '~' : st.cwd) + ']';
      return user + '@' + hostName + ':' + disp(st.cwd) + (user === 'root' ? '#' : '$');
    }

    /* ---- DOM ---- */
    var uid = 'vt' + (++VV2._id);
    var root = h('div', { class: 'op-term' + (o.embedded ? ' op-emb' : '') });
    if (a.prompt && !o.noPrompt) root.appendChild(h('p', { class: 'w-prompt op-task' }, a.prompt));
    var grid = h('div', { class: 'op-grid' }); root.appendChild(grid);
    var con = h('div', { class: 'op-con', 'data-shell': shell });
    var bar = h('div', { class: 'op-bar' }, [h('span', { class: 'op-dots', 'aria-hidden': 'true' }, [h('i'), h('i'), h('i')]), h('span', { class: 'op-title' }, (fam === 'ios' ? hostName : user + '@' + hostName) + ' — ' + S.label), h('span', { class: 'op-badge', title: 'Commands are checked by the lesson, never run on a real computer' }, '🛡️ Simulated console')]);
    var out = h('div', { class: 'op-out', id: uid + '-out', role: 'log', 'aria-live': 'polite', 'aria-label': 'Console output', tabindex: '0' });
    var pr = h('span', { class: 'op-ps', 'aria-hidden': 'true' });
    var inp = h('input', { type: 'text', class: 'op-in', id: uid + '-in', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'send', 'aria-describedby': uid + '-ps', maxlength: String(MAXLINE) });
    var lab = h('label', { class: 'sr op-sr', for: uid + '-in' }, 'Command to type into the simulated ' + S.label + ' console');
    var psTxt = h('span', { class: 'sr op-sr', id: uid + '-ps' });
    var run = h('button', { type: 'submit', class: 'btn primary op-run' }, '▶ Run');
    var form = h('form', { class: 'op-form', autocomplete: 'off' }, [lab, psTxt, h('div', { class: 'op-line' }, [pr, inp]), run]);
    var keys = h('div', { class: 'op-keys', role: 'group', 'aria-label': 'Console keys' });
    [['↑', 'Previous command', function () { histMove(-1); }], ['↓', 'Next command', function () { histMove(1); }], ['Tab', 'Complete a file name', function () { complete(); }], ['|', 'Pipe', function () { ins(' | '); }], ['-', 'Dash', function () { ins('-'); }], ['/', 'Slash', function () { ins(win ? '\\' : '/'); }], ['^C', 'Cancel line', function () { cancel(); }], ['clear', 'Clear the screen', function () { clearOut(); }]].forEach(function (k) {
      keys.appendChild(h('button', { type: 'button', class: 'op-key', 'aria-label': k[1], onclick: function (e) { e.preventDefault(); k[2](); inp.focus(); } }, k[0]));
    });
    con.appendChild(bar); con.appendChild(out); con.appendChild(form); con.appendChild(keys);
    grid.appendChild(con);

    var side = h('aside', { class: 'op-side', 'aria-label': 'Lab tasks' });
    var tl = h('ol', { class: 'op-tasks' });
    var prog = h('p', { class: 'op-prog', 'aria-live': 'polite' });
    var pbar = h('div', { class: 'op-pbar', 'aria-hidden': 'true' }, h('i'));
    var hintB = h('button', { type: 'button', class: 'btn small ghost' }, '💡 Hint');
    var solB = h('button', { type: 'button', class: 'btn small ghost' }, '🔑 Show solution');
    var resetB = h('button', { type: 'button', class: 'btn small ghost' }, '↻ Reset');
    var solBox = h('div', { class: 'op-sol', hidden: true });
    var doneBox = h('div', { class: 'op-done', hidden: true, role: 'status' });
    side.appendChild(h('h3', { class: 'op-h' }, '✅ Tasks'));
    side.appendChild(tl); side.appendChild(pbar); side.appendChild(prog);
    side.appendChild(h('div', { class: 'op-acts' }, [hintB, solB, resetB]));
    side.appendChild(solBox); side.appendChild(doneBox);
    grid.appendChild(side);
    host.appendChild(root);

    function drawTasks() {
      tl.innerHTML = ''; var n = 0;
      tasks.forEach(function (t, i) {
        if (t.done) n++;
        tl.appendChild(h('li', { class: 'op-t' + (t.done ? ' ok' : '') }, [h('span', { class: 'op-tk', 'aria-hidden': 'true' }, t.done ? '✔' : String(i + 1)), h('span', null, [t.goal, h('span', { class: 'sr op-sr' }, t.done ? ' (done)' : ' (to do)')])]));
      });
      prog.textContent = n + ' of ' + tasks.length + ' tasks done';
      pbar.firstChild.style.width = (tasks.length ? n / tasks.length * 100 : 0) + '%';
      return n;
    }
    function line(text, cls) {
      var d = h('div', { class: 'op-l' + (cls ? ' ' + cls : '') }); d.textContent = text; out.appendChild(d);
      while (out.childNodes.length > MAXOUT) out.removeChild(out.firstChild);
      out.scrollTop = out.scrollHeight;
    }
    function echoCmd(cmd) {
      var d = h('div', { class: 'op-l op-cmd' }, [h('span', { class: 'op-ps' }, promptText() + ' '), h('span', null, cmd)]);
      out.appendChild(d); out.scrollTop = out.scrollHeight;
    }
    function setPrompt() { pr.textContent = promptText() + ' '; psTxt.textContent = 'Prompt: ' + promptText(); }
    function clearOut() { out.innerHTML = ''; }
    function ins(s) { var p = inp.selectionStart == null ? inp.value.length : inp.selectionStart; inp.value = inp.value.slice(0, p) + s + inp.value.slice(inp.selectionEnd || p); try { inp.setSelectionRange(p + s.length, p + s.length); } catch (e) { } }
    function cancel() { echoCmd(inp.value + '^C'); inp.value = ''; st.hi = -1; }
    function histMove(d) {
      if (!st.hist.length) return;
      if (st.hi < 0) st.hi = st.hist.length;
      st.hi = VV2.clamp(st.hi + d, 0, st.hist.length);
      inp.value = st.hi >= st.hist.length ? '' : st.hist[st.hi];
      try { var L = inp.value.length; inp.setSelectionRange(L, L); } catch (e) { }
    }
    /* Tab: complete a virtual file/dir name when there is exactly one match; returns true if it did something */
    function complete() {
      var v = inp.value, m = /(\S*)$/.exec(v), w = m ? m[1] : '';
      if (!v.trim() || fam === 'ios' || fam === 'sql' || fam === 'mongo' || fam === 'py') return false;
      var dirPart = w.lastIndexOf('/') >= 0 || (win && w.lastIndexOf('\\') >= 0) ? w.slice(0, Math.max(w.lastIndexOf('/'), w.lastIndexOf('\\')) + 1) : '';
      var stem = w.slice(dirPart.length), dir = dirPart ? norm(dirPart) : st.cwd;
      if (!isDir(dir)) return false;
      var hits = kids(dir).filter(function (k) { return (win ? k.name.toLowerCase().indexOf(stem.toLowerCase()) : k.name.indexOf(stem)) === 0; });
      if (hits.length === 1) { inp.value = v.slice(0, v.length - w.length) + dirPart + hits[0].name + (hits[0].dir ? (win ? '\\' : '/') : ' '); return true; }
      if (hits.length > 1) { echoCmd(v); line(hits.map(function (k) { return k.name + (k.dir ? '/' : ''); }).join('  '), 'op-dim'); return true; }
      return false;
    }

    /* ---- builtins ---- */
    function notFound(cmd, name) {
      st.miss++;
      if (fam === 'ps') {
        if (/^[a-z]+-[a-z]+/i.test(name) || KN[name.toLowerCase()]) return { t: '(simulated) "' + name + '" with these parameters is not part of this lab. Check the task list, or type hint.', c: 'op-dim' };
        return { t: name + " : The term '" + name + "' is not recognized as the name of a cmdlet, function, script file, or operable program.\nCheck the spelling of the name, or if a path was included, verify that the path is correct and try again.", c: 'op-err' };
      }
      if (fam === 'cmd') return { t: "'" + name + "' is not recognized as an internal or external command,\noperable program or batch file.", c: 'op-err' };
      if (fam === 'ios') { var off = Math.max(0, cmd.indexOf(name.charAt(0))); return { t: new Array(promptText().length + 2 + off).join(' ') + '^\n% Invalid input detected at \'^\' marker.', c: 'op-err' }; }
      if (fam === 'sql') return { t: 'ERROR: syntax error at or near "' + name + '" — or this statement is not part of this lab (simulated). Type hint for a nudge.', c: 'op-err' };
      if (fam === 'mongo') return { t: 'MongoServerError: this command is not part of this lab (simulated console). Type hint for a nudge.', c: 'op-err' };
      if (fam === 'py') return /^[A-Za-z_]\w*$/.test(name) ? { t: 'Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name \'' + name + '\' is not defined', c: 'op-err' } : { t: '(simulated) That line is not part of this lab. Type hint for a nudge.', c: 'op-dim' };
      if (KN[name] || a.shell === name || /^(kubectl|docker|git|adb|esxcli)$/.test(name)) return { t: '(simulated) ' + name + ': this exact command is not part of this lab. Check the task list, or type hint.', c: 'op-dim' };
      return { t: (S.esx ? '-sh: ' : 'bash: ') + name + ': ' + (S.esx ? 'not found' : 'command not found'), c: 'op-err' };
    }
    function readFile(arg, who) {
      var p = norm(arg), k = fileKey(p);
      if (k != null) return { ok: true, t: st.files[k] };
      if (isDir(p)) return { ok: false, t: fam === 'ps' ? who + " : Access to the path '" + disp(p) + "' is denied." : who + ': ' + arg + ': Is a directory' };
      return { ok: false, t: fam === 'ps' ? who + " : Cannot find path '" + disp(p) + "' because it does not exist." : fam === 'cmd' ? 'The system cannot find the file specified.' : who + ': ' + arg + ': No such file or directory' };
    }
    function lsLong(list) {
      var d = new Date(); var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      var ts = mon + ' ' + ('  ' + d.getDate()).slice(-2) + ' 09:14';
      return 'total ' + list.length * 4 + '\n' + list.map(function (k) { var sz = k.dir ? 4096 : (st.files[k.path] || '').length; return (k.dir ? 'drwxr-xr-x' : '-rw-r--r--') + ' 1 ' + user + ' ' + user + ' ' + ('      ' + sz).slice(-6) + ' ' + ts + ' ' + k.name; }).join('\n');
    }
    function psDir(p, list) {
      var d = new Date(), ds = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
      if (!list.length) return '';
      return '\n    Directory: ' + disp(p) + '\n\nMode                 LastWriteTime         Length Name\n----                 -------------         ------ ----\n' + list.map(function (k) { return (k.dir ? 'd-----' : '-a----') + '        ' + ds + '   9:14 AM ' + (k.dir ? '              ' : ('              ' + (st.files[k.path] || '').length).slice(-14)) + ' ' + k.name; }).join('\n') + '\n';
    }
    function textOf(r) { return r && typeof r.t === 'string' ? r.t : ''; }
    function grepText(text, args) {
      var flags = '', pat = null;
      args.forEach(function (x) { if (/^-[a-zA-Z]+$/.test(x) && pat == null) flags += x.slice(1); else if (pat == null) pat = x; });
      if (pat == null) return { t: 'Usage: grep [OPTION]... PATTERNS [FILE]...', c: 'op-err' };
      var re; try { re = new RegExp(pat, /i/.test(flags) ? 'i' : ''); } catch (e) { re = new RegExp(esc(pat), /i/.test(flags) ? 'i' : ''); }
      var ls = String(text).split('\n'), res = [];
      ls.forEach(function (l, i) { var hit = re.test(l); if (/v/.test(flags)) hit = !hit; if (hit) res.push((/n/.test(flags) ? (i + 1) + ':' : '') + l); });
      if (/c/.test(flags)) return { t: String(res.length) };
      return { t: res.join('\n') };
    }
    function headTail(text, args, tail) {
      var n = 10; args.forEach(function (x, i) { if (x === '-n' && args[i + 1]) n = parseInt(args[i + 1], 10) || 10; else if (/^-\d+$/.test(x)) n = -parseInt(x, 10); else if (/^-n\d+$/.test(x)) n = parseInt(x.slice(2), 10); });
      var ls = String(text).replace(/\n$/, '').split('\n'); return { t: (tail ? ls.slice(-n) : ls.slice(0, n)).join('\n') };
    }
    function fileArgs(args) { return args.filter(function (x, i) { return !/^-/.test(x) && !(win && /^\/[a-z]$/i.test(x)) && !(i > 0 && /^-n$/.test(args[i - 1])); }); }
    /* filters usable after a pipe (and grep/head/tail/wc on files) */
    function filter(name, args, input) {
      var n = name.toLowerCase();
      if (n === 'grep' || n === 'egrep' || n === 'select-string' || n === 'sls' || n === 'findstr') { if (n === 'select-string' || n === 'sls') args = args.filter(function (x) { return !/^-pattern$/i.test(x); }).concat(['-i']).reverse(); return grepText(input, n === 'findstr' ? ['-i'].concat(args.filter(function (x) { return !/^\//.test(x); })) : args); }
      if (n === 'head') return headTail(input, args, false);
      if (n === 'tail') return headTail(input, args, true);
      if (n === 'wc') { var ls = String(input).replace(/\n$/, ''); return { t: args.indexOf('-l') >= 0 ? String(ls ? ls.split('\n').length : 0) : String(ls ? ls.split('\n').length : 0) + ' ' + (ls.split(/\s+/).filter(Boolean).length) + ' ' + ls.length }; }
      if (n === 'sort') return { t: String(input).split('\n').sort().join('\n') };
      if (n === 'uniq') return { t: String(input).split('\n').filter(function (x, i, arr) { return i === 0 || x !== arr[i - 1]; }).join('\n') };
      if (n === 'less' || n === 'more' || n === 'cat' || n === 'out-host' || n === 'format-table' || n === 'ft' || n === 'format-list' || n === 'fl' || n === 'out-string') return { t: String(input) };
      if (n === 'select-object' || n === 'select') { var k = 0, first = true; args.forEach(function (x, i) { if (/^-first$/i.test(x)) { k = +args[i + 1]; first = true; } if (/^-last$/i.test(x)) { k = +args[i + 1]; first = false; } }); return k ? headTail(input, ['-n', String(k)], !first) : { t: String(input) }; }
      return null;
    }
    function builtin(cmd) {
      var tk = tokens(cmd); if (!tk.length) return { t: '' };
      if (fam === 'nix' && tk[0] === 'sudo' && tk.length > 1) { tk = tk.slice(1); cmd = cmd.replace(/^\s*sudo\s+/, ''); }
      var name = tk[0], n = name.toLowerCase(), args = tk.slice(1), hasFs = fam === 'nix' || fam === 'ps' || fam === 'cmd';
      /* universal */
      if (n === 'help' || n === 'get-help' || n === '?' || (fam === 'py' && n === 'help()')) return { t: helpText(fam, hasFs), c: 'op-dim' };
      if (n === 'clear' || n === 'cls' || n === 'clear-host') return { clear: true };
      if (n === 'history' || n === 'get-history' || n === 'h' && fam === 'ps' || (n === 'doskey' && /history/i.test(args[0] || ''))) return { t: st.hist.map(function (x, i) { return ('   ' + (i + 1)).slice(-4) + '  ' + x; }).join('\n') };
      if (n === 'hint') { st.hint++; return { t: '💡 ' + (a.hint || 'Re-read the task list: each task names the tool you need. Start by looking (status, logs, list) before changing anything.'), c: 'op-hint' }; }
      if (n === 'exit' || n === 'logout' || n === 'quit' || n === 'exit()' || n === 'quit()') {
        if (fam === 'ios' && n === 'exit') { st.ios = { 'config-if': 'config', 'config-router': 'config', 'config-line': 'config', 'config-vlan': 'config', config: 'exec' }[st.ios] || 'exec'; return { t: '' }; }
        return { t: 'This is a simulated console — there is nowhere to log out to. 🙂 Keep going with the tasks.', c: 'op-dim' };
      }
      if (fam === 'ios') {
        if (/^(conf(i(g(u(r(e)?)?)?)?)?)$/.test(n) && (!args.length || /^t/.test(args[0]))) { st.ios = 'config'; return { t: 'Enter configuration commands, one per line.  End with CNTL/Z.' }; }
        if (n === 'end') { st.ios = 'exec'; return { t: '' }; }
        if (n === 'enable' || n === 'en') { st.ios = 'exec'; return { t: '' }; }
        if (n === 'disable') { st.ios = 'user'; return { t: '' }; }
        if (/^config/.test(st.ios)) {
          if (/^int(e(r(f(a(c(e)?)?)?)?)?)?$/.test(n) && args.length) { st.ios = 'config-if'; return { t: '' }; }
          if (n === 'router' && args.length) { st.ios = 'config-router'; return { t: '' }; }
          if (n === 'line' && args.length) { st.ios = 'config-line'; return { t: '' }; }
          if (n === 'vlan' && args.length) { st.ios = 'config-vlan'; return { t: '' }; }
        }
        return null;
      }
      if (!hasFs) return null;
      /* file system */
      if (n === 'pwd' || n === 'get-location' || n === 'gl') return { t: fam === 'ps' ? '\nPath\n----\n' + disp(st.cwd) + '\n' : disp(st.cwd) };
      if (n === 'whoami') return { t: win ? 'contoso\\' + user : user };
      if (n === 'hostname') return { t: hostName };
      if (n === 'cd' || n === 'set-location' || n === 'sl' || n === 'chdir' || n === 'cd..') {
        var tgt = n === 'cd..' ? '..' : args.filter(function (x) { return !/^-path$/i.test(x); })[0];
        if (!tgt) { if (fam === 'cmd') return { t: disp(st.cwd) }; if (!win) st.cwd = home; return { t: '' }; }
        if (tgt === '-') return { t: '' };
        var p = norm(tgt); if (isDir(p)) { st.cwd = key(st.dirs, p); return { t: '' }; }
        if (fileKey(p) != null) return { t: fam === 'ps' ? "Set-Location : Cannot find path '" + disp(p) + "' because it does not exist." : fam === 'cmd' ? 'The directory name is invalid.' : 'bash: cd: ' + tgt + ': Not a directory', c: 'op-err' };
        return { t: fam === 'ps' ? "Set-Location : Cannot find path '" + disp(p) + "' because it does not exist." : fam === 'cmd' ? 'The system cannot find the path specified.' : (S.esx ? '-sh: cd: can\'t cd to ' : 'bash: cd: ') + tgt + (S.esx ? '' : ': No such file or directory'), c: 'op-err' };
      }
      if (n === 'ls' || n === 'dir' || n === 'll' || n === 'get-childitem' || n === 'gci') {
        var opts = args.filter(function (x) { return /^-/.test(x) || (fam === 'cmd' && /^\//.test(x)); }).join(''), paths = args.filter(function (x) { return !/^-/.test(x) && !(fam === 'cmd' && /^\//.test(x)); });
        if (/^-path$/i.test(args[0] || '')) paths = args.slice(1, 2);
        var p2 = paths.length ? norm(paths[0]) : st.cwd, fk = fileKey(p2);
        if (fk != null) { var one = [{ name: base(fk), dir: false, path: fk }]; return { t: fam === 'ps' || fam === 'cmd' ? psDir(parent(fk), one) : (/l/.test(opts) || n === 'll' ? lsLong(one) : paths[0]) }; }
        if (!isDir(p2)) return { t: fam === 'ps' ? "Get-ChildItem : Cannot find path '" + disp(p2) + "' because it does not exist." : fam === 'cmd' ? 'File Not Found' : 'ls: cannot access \'' + paths[0] + '\': No such file or directory', c: 'op-err' };
        var list = kids(key(st.dirs, p2)); if (!/a/.test(opts) || win) list = list.filter(function (k) { return k.name.charAt(0) !== '.' || win; });
        if (fam === 'ps' || fam === 'cmd') return { t: psDir(p2, list) };
        if (/l/.test(opts) || n === 'll') return { t: lsLong(list) };
        return { t: list.map(function (k) { return k.name + (k.dir ? '/' : ''); }).join('  ') };
      }
      if (n === 'cat' || n === 'type' || n === 'get-content' || n === 'gc' || n === 'more' || n === 'less') {
        var fa = args.filter(function (x) { return !/^-/.test(x); }); if (/^-path$/i.test(args[0] || '')) fa = args.slice(1, 2);
        if (!fa.length) return { t: n === 'cat' ? '(simulated) cat needs a file name, e.g.  cat /etc/hosts' : 'Supply a file name.', c: 'op-dim' };
        var parts = fa.map(function (f) { return readFile(f, name); }), bad = parts.filter(function (x) { return !x.ok; });
        var tt = parts.filter(function (x) { return x.ok; }).map(function (x) { return x.t.replace(/\n$/, ''); }).join('\n');
        var tailN = 0; args.forEach(function (x, i) { if (/^-tail$/i.test(x)) tailN = +args[i + 1] || 0; });
        if (tailN && tt) tt = headTail(tt, ['-n', String(tailN)], true).t;
        return bad.length ? { t: (tt ? tt + '\n' : '') + bad.map(function (x) { return x.t; }).join('\n'), c: tt ? '' : 'op-err' } : { t: tt };
      }
      if (n === 'grep' || n === 'egrep' || n === 'head' || n === 'tail' || n === 'wc' || n === 'select-string' || n === 'findstr') {
        var files = fileArgs(args); if (n === 'grep' || n === 'egrep' || n === 'findstr' || n === 'select-string') files = files.slice(1);
        if (n === 'select-string') { var pi = -1; args.forEach(function (x, i) { if (/^-path$/i.test(x)) pi = i; }); files = pi >= 0 ? [args[pi + 1]] : files; }
        if (!files.length) return { t: '(simulated) ' + name + ' needs a file here — or pipe into it, e.g.  cat app.log | ' + name + ' …', c: 'op-dim' };
        var txt = files.map(function (f) { var r = readFile(f, name); return r.ok ? r.t : null; });
        if (txt.some(function (x) { return x == null; })) return { t: readFile(files[txt.indexOf(null)], name).t, c: 'op-err' };
        var fargs = args.filter(function (x) { return files.indexOf(x) < 0; });
        return filter(name, fargs, txt.join('\n'));
      }
      if (n === 'echo' || n === 'write-output' || n === 'write-host') {
        var sp = splitOut(cmd, ['>>', '>']), text = tokens(sp.parts[0]).slice(1).join(' ');
        if (sp.seps.length) {
          var dst = tokens(sp.parts[1] || '')[0]; if (!dst) return { t: (fam === 'nix' ? 'bash: syntax error near unexpected token `newline\'' : 'Missing file specification after redirection operator.'), c: 'op-err' };
          var pth = norm(dst); if (!isDir(parent(pth))) return { t: fam === 'nix' ? 'bash: ' + dst + ': No such file or directory' : 'Could not find a part of the path.', c: 'op-err' };
          if (isDir(pth)) return { t: fam === 'nix' ? 'bash: ' + dst + ': Is a directory' : 'Access denied.', c: 'op-err' };
          var k2 = fileKey(pth) || pth; st.files[k2] = (sp.seps[0] === '>>' && st.files[k2] != null ? st.files[k2] : '') + text + '\n'; return { t: '' };
        }
        return { t: text };
      }
      if (n === 'mkdir' || n === 'md' || (n === 'new-item' && /directory/i.test(cmd))) {
        var ds = args.filter(function (x) { return !/^-/.test(x) && !/^directory$/i.test(x); }); if (n === 'new-item') { var ip = -1; args.forEach(function (x, i) { if (/^-(path|name)$/i.test(x)) ip = i; }); if (ip >= 0) ds = [args[ip + 1]]; }
        if (!ds.length) return { t: 'mkdir: missing operand', c: 'op-err' };
        var outs = [];
        ds.forEach(function (d) { var p3 = norm(d); if (isDir(p3) || fileKey(p3) != null) { if (args.indexOf('-p') < 0) outs.push(fam === 'nix' ? "mkdir: cannot create directory '" + d + "': File exists" : 'A subdirectory or file ' + d + ' already exists.'); return; } if (!isDir(parent(p3)) && args.indexOf('-p') < 0 && fam === 'nix') { outs.push("mkdir: cannot create directory '" + d + "': No such file or directory"); return; } mkdirp(p3); if (fam === 'ps') outs.push(psDir(parent(p3), [{ name: base(p3), dir: true, path: p3 }])); });
        return { t: outs.join('\n'), c: outs.length && fam === 'nix' ? 'op-err' : '' };
      }
      if (n === 'touch' || n === 'new-item' || n === 'ni') {
        var fs2 = args.filter(function (x) { return !/^-/.test(x) && !/^file$/i.test(x); }); if (n !== 'touch') { var ip2 = -1; args.forEach(function (x, i) { if (/^-(path|name)$/i.test(x)) ip2 = i; }); if (ip2 >= 0) fs2 = [args[ip2 + 1]]; }
        if (!fs2.length) return { t: 'touch: missing file operand', c: 'op-err' };
        var o2 = [];
        fs2.forEach(function (f) { var p4 = norm(f); if (!isDir(parent(p4))) { o2.push("touch: cannot touch '" + f + "': No such file or directory"); return; } if (fileKey(p4) == null && !isDir(p4)) st.files[p4] = ''; if (n !== 'touch') o2.push(psDir(parent(p4), [{ name: base(p4), dir: false, path: p4 }])); });
        return { t: o2.join('\n') };
      }
      if (n === 'rm' || n === 'del' || n === 'erase' || n === 'rmdir' || n === 'rd' || n === 'remove-item' || n === 'ri') {
        var rec = args.some(function (x) { return /^-[a-z]*r/i.test(x) || /^-recurse$/i.test(x) || /^\/s$/i.test(x); }) || n === 'rmdir' || n === 'rd';
        var tg = args.filter(function (x) { return !/^-/.test(x) && !/^\/[sq]$/i.test(x); });
        if (!tg.length) return { t: 'rm: missing operand', c: 'op-err' };
        var o3 = [];
        tg.forEach(function (t) {
          var p5 = norm(t);
          if (p5 === '/') { o3.push(fam === 'nix' && rec ? "rm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe" : fam === 'nix' ? "rm: cannot remove '/': Is a directory" : '(simulated) Nice try. 🙂 Deleting the whole drive is never the fix.'); return; }
          var fk3 = fileKey(p5);
          if (fk3 != null) { delete st.files[fk3]; return; }
          var dk = key(st.dirs, p5);
          if (dk != null) {
            if (!rec && (n === 'rm' || n === 'del')) { o3.push(fam === 'nix' ? "rm: cannot remove '" + t + "': Is a directory" : 'The directory is not empty. Use -Recurse.'); return; }
            var pre = dk + '/'; Object.keys(st.files).forEach(function (k) { if (k.indexOf(pre) === 0) delete st.files[k]; }); Object.keys(st.dirs).forEach(function (k) { if (k === dk || k.indexOf(pre) === 0) delete st.dirs[k]; });
            if (st.cwd === dk || st.cwd.indexOf(pre) === 0) st.cwd = parent(dk);
            return;
          }
          if (args.indexOf('-f') < 0 && !/^-[a-z]*f/.test(args.join(' '))) o3.push(fam === 'nix' ? "rm: cannot remove '" + t + "': No such file or directory" : fam === 'ps' ? "Remove-Item : Cannot find path '" + disp(p5) + "' because it does not exist." : 'Could Not Find ' + disp(p5));
        });
        return { t: o3.join('\n'), c: o3.length ? 'op-err' : '' };
      }
      return null;
    }

    function respond(cmd) {
      for (var i = 0; i < responses.length; i++) {
        var r = responses[i];
        if (test(r.re, cmd)) { if (r.set) for (var k in r.set) st.flags[k] = r.set[k]; return { t: r.out, c: r.err ? 'op-err' : '', resp: true }; }
      }
      return null;
    }
    /* one simple command: responses first (first match wins), then builtins, else "not found" */
    function simple(cmd) {
      var r = respond(cmd); if (r) return r;
      var b = builtin(cmd); if (b) { b.builtin = true; return b; }
      var name = tokens(cmd)[0] || cmd; if (fam === 'nix' && name === 'sudo') name = tokens(cmd)[1] || name;
      var nf = notFound(cmd, name); nf.miss = true; return nf;
    }
    function piped(cmd) {
      if (fam === 'ios' || fam === 'sql' || fam === 'mongo' || fam === 'py') return simple(cmd);
      var sp = splitOut(cmd, ['|']); if (sp.parts.length < 2 || sp.parts.some(function (x) { return !x; })) return simple(cmd);
      var first = simple(sp.parts[0]); if (first.miss || first.clear) return first;
      var txt = textOf(first);
      for (var i = 1; i < sp.parts.length; i++) {
        var tk = tokens(sp.parts[i]), f = filter(tk[0] || '', tk.slice(1), txt);
        if (!f) { var rr = respond(sp.parts[i]); if (rr) { txt = rr.t; continue; } return { t: '(simulated) ' + (tk[0] || '') + ': piping into this is not part of this lab.', c: 'op-dim', miss: true }; }
        txt = f.t;
      }
      return { t: txt, resp: first.resp };
    }
    function execute(cmd) {
      var whole = respond(cmd); if (whole) return [whole, [cmd]];
      if (fam === 'nix' || fam === 'ps' || fam === 'cmd') {
        var sp = splitOut(cmd, ['&&', '||', ';']);
        if (sp.parts.length > 1 && sp.parts.every(function (x) { return x; })) {
          var res = [], ok = true;
          for (var i = 0; i < sp.parts.length; i++) {
            if (i > 0 && sp.seps[i - 1] === '&&' && !ok) break;
            if (i > 0 && sp.seps[i - 1] === '||' && ok) continue;
            var r = piped(sp.parts[i]); res.push(r); ok = !r.miss && r.c !== 'op-err';
          }
          return [{ multi: res }, sp.parts];
        }
      }
      return [piped(cmd), [cmd]];
    }
    function show(r) {
      if (!r) return;
      if (r.multi) { r.multi.forEach(show); return; }
      if (r.clear) { clearOut(); return; }
      if (r.t) line(r.t, r.c || '');
    }
    function checkTasks(cands) {
      var newly = [], blocked = false;
      cands.forEach(function (c) {
        tasks.forEach(function (t) {
          if (t.done || !test(t.re, c)) return;
          if (t.needs.every(function (f) { return st.flags[f]; })) { t.done = true; newly.push(t); if (t.set) for (var k in t.set) st.flags[k] = t.set[k]; }
          else blocked = true;
        });
      });
      return { newly: newly, blocked: blocked };
    }
    function submit(raw) {
      if (!alive) return;
      var cmd = String(raw || '').replace(/\s+$/, '').replace(/^\s+/, '').slice(0, MAXLINE);
      echoCmd(cmd); inp.value = ''; st.hi = -1;
      if (!cmd) return;
      if (st.hist[st.hist.length - 1] !== cmd) st.hist.push(cmd); if (st.hist.length > 200) st.hist.shift();
      st.cmds++;
      var ex; try { ex = execute(cmd); } catch (e) { ex = [{ t: '(simulated) The console tripped over that line — try writing it another way.', c: 'op-err' }, [cmd]]; }
      show(ex[0]);
      var cands = [cmd].concat(ex[1].length > 1 ? ex[1] : []);
      var ck = checkTasks(cands);
      var r0 = ex[0], wasMiss = r0.multi ? r0.multi.every(function (x) { return x.miss; }) : !!r0.miss;
      if (ck.newly.length) { st.miss = 0; ck.newly.forEach(function (t) { line('✔ Task done: ' + t.goal, 'op-ok'); }); VV2.sfx('good'); }
      else if (ck.blocked) line('… That is the right idea, but an earlier step is missing first. Check the task list.', 'op-hint');
      else if (wasMiss && st.miss === 3) line('Stuck? Type  hint  — or open "Show solution".', 'op-hint');
      if (o.onCommand) try { o.onCommand(cmd, ck.newly.length > 0, wasMiss); } catch (e) { }
      var n = drawTasks(); setPrompt();
      if (ck.newly.length && n === tasks.length && !st.complete) finish();
    }
    function finish() {
      st.complete = true;
      var pct = st.peeked ? 70 : st.hint ? 90 : 100;
      doneBox.hidden = false; doneBox.innerHTML = '';
      doneBox.appendChild(h('div', { class: 'op-done-i', 'aria-hidden': 'true' }, '🎉'));
      doneBox.appendChild(h('div', null, [h('b', null, 'Lab complete!'), h('p', null, 'All ' + tasks.length + ' tasks done in ' + st.cmds + ' command' + (st.cmds === 1 ? '' : 's') + (st.peeked ? ' (with the solution open).' : st.hint ? ' (with a hint).' : '. Clean run!'))]));
      line('🎉 All tasks complete. (Remember: this was a simulated console — practise on a real lab VM next.)', 'op-ok');
      try { VV2.store.badge('lab'); } catch (e) { }
      if (o.onComplete) o.onComplete(pct);
    }
    function revealSolution() {
      st.peeked = true; solBox.hidden = false; solBox.innerHTML = '';
      var sol = Array.isArray(a.solution) ? a.solution : (a.solution ? [String(a.solution)] : []);
      solBox.appendChild(h('h4', null, '🔑 One good solution'));
      if (!sol.length) { solBox.appendChild(h('p', { class: 'muted' }, 'This lab has no written solution — use the hint and the task list.')); return; }
      var ol = h('ol', { class: 'op-sol-l' });
      sol.forEach(function (c) {
        ol.appendChild(h('li', null, [h('code', null, String(c)), h('button', { type: 'button', class: 'btn small ghost op-paste', 'aria-label': 'Put this command in the input: ' + c, onclick: function () { inp.value = String(c); inp.focus(); } }, '⤵ Use')]));
      });
      solBox.appendChild(ol);
      solBox.appendChild(h('p', { class: 'muted small-note' }, 'Type them yourself (or tap ⤵ Use, then Run). Different but correct commands also count.'));
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); submit(inp.value); inp.focus(); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); histMove(-1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); histMove(1); }
      else if (e.key === 'Tab' && !e.shiftKey && !e.altKey && !e.ctrlKey && inp.value.trim()) { if (complete()) e.preventDefault(); }
      else if ((e.key === 'l' || e.key === 'L') && e.ctrlKey) { e.preventDefault(); clearOut(); }
      else if ((e.key === 'c' || e.key === 'C') && e.ctrlKey && inp.selectionStart === inp.selectionEnd) { e.preventDefault(); cancel(); }
      e.stopPropagation();
    });
    out.addEventListener('click', function () { if (!window.getSelection || !String(window.getSelection())) inp.focus(); });
    hintB.addEventListener('click', function () { submit('hint'); });
    solB.addEventListener('click', function () {
      if (st.peeked) { solBox.hidden = !solBox.hidden; return; }
      if (st.cmds >= 2) { revealSolution(); return; }
      confirmBox('Show the solution?', 'Try at least two commands first — you learn most by trying. Show the solution anyway? (You will still finish the lab, with a little less XP.)').then(function (ok) { if (ok && alive) revealSolution(); });
    });
    resetB.addEventListener('click', function () { if (!alive) return; fresh(); clearOut(); greet(); drawTasks(); setPrompt(); doneBox.hidden = true; solBox.hidden = true; inp.focus(); });

    function greet() {
      var g = a.motd || a.banner;
      if (g) line(String(g), 'op-dim');
      else if (fam === 'ps') line('Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved. (simulated)', 'op-dim');
      else if (fam === 'cmd') line('Microsoft Windows [Version 10.0] (simulated)', 'op-dim');
      else if (fam === 'ios') line(hostName + ' — simulated Cisco IOS console', 'op-dim');
      else if (fam === 'py') line('Python 3 (simulated REPL)', 'op-dim');
      else if (fam === 'mongo') line('Current Mongosh Log ID: 0000 (simulated)', 'op-dim');
      else if (S.esx) line('The time and date of this login have been sent to the system logs. (simulated ESXi shell)', 'op-dim');
      else line('Last login: today on pts/0 (simulated console)', 'op-dim');
      line('Type help for built-in commands, hint for a nudge.', 'op-dim');
    }
    fresh(); greet(); drawTasks(); setPrompt();
    var api = {
      el: root, input: inp, run: function (c) { submit(c); }, state: function () { return st; }, tasks: tasks,
      isComplete: function () { return st.complete; }, focus: function () { inp.focus(); },
      destroy: function () { alive = false; }
    };
    return api;
  };

  W.terminal = function (el, a, ctx) {
    var t = Ops.terminal(el, a, { onComplete: function (pct) { if (ctx && ctx.done) ctx.done(pct); } });
    return { destroy: t.destroy, api: t };
  };

  /* ====================== the ticket ====================== */
  var STOPW = { the: 1, a: 1, an: 1, and: 1, or: 1, of: 1, to: 1, in: 1, on: 1, for: 1, with: 1, is: 1, was: 1, by: 1, at: 1, as: 1, it: 1, be: 1 };
  var SYN = {
    root: ['root', 'caus', 'because', 'due to', 'reason', 'origin', 'triggered by'], caus: ['caus', 'because', 'due to', 'reason', 'root', 'triggered by'],
    fix: ['fix', 'resolv', 'resolut', 'remed', 'correct', 'repair', 'restor', 'replac', 'workaround', 'appl', 'chang', 'clear', 'updat', 'reset', 'restart', 'extend', 'freed', 'reconfig', 'unlock', 'reinstall', 'rollback', 'rolled back', 'patch'],
    resolv: ['resolv', 'resolut', 'fix', 'restor', 'correct'], resolut: ['resolv', 'resolut', 'fix', 'restor'],
    verif: ['verif', 'confirm', 'test', 'check', 'validat', 'works', 'working', 'monitor'], confirm: ['confirm', 'verif', 'test', 'validat'],
    impact: ['impact', 'affect', 'outage', 'users', 'down'], affect: ['affect', 'impact'],
    escal: ['escalat', 'assign', 'handed', 'hand over', 'handover', 'l2', 'l3', 'vendor', 'transferr'],
    prevent: ['prevent', 'avoid', 'monitor', 'alert', 'recur', 'problem record', 'threshold', 'going forward'],
    workaround: ['workaround', 'temporar', 'interim', 'stopgap'], user: ['user', 'caller', 'customer', 'requester'],
    commun: ['commun', 'inform', 'notif', 'updat', 'told', 'email', 'called'], backup: ['backup', 'back up', 'restore point', 'snapshot'],
    document: ['document', 'kb', 'knowledge', 'article', 'record', 'logged', 'noted'], approv: ['approv', 'cab', 'authori', 'sign-off', 'signoff'],
    rollback: ['rollback', 'roll back', 'back-out', 'backout', 'revert'], test: ['test', 'verif', 'check', 'validat']
  };
  function stem(w) {
    w = String(w).toLowerCase().replace(/[^a-z0-9]/g, '');
    var suf = ['ations', 'ation', 'ments', 'ment', 'ings', 'ing', 'ies', 'ied', 'ers', 'ed', 'es', 'er', 'ly', 'ion', 'al', 's', 'y', 'e'];
    for (var i = 0; i < suf.length; i++) { var s = suf[i]; if (w.length - s.length >= 4 && w.slice(-s.length) === s) return w.slice(0, -s.length); }
    return w;
  }
  function hasStart(txt, frag) { if (!frag) return false; try { return new RegExp('(^|[^a-z0-9])' + esc(frag)).test(txt); } catch (e) { return txt.indexOf(frag) >= 0; } }
  Ops.keyHit = function (note, kw) {
    var txt = ' ' + String(note || '').toLowerCase() + ' ', k = String(kw || '').toLowerCase().trim();
    if (!k) return true; if (txt.indexOf(k) >= 0) return true;
    var words = k.split(/[^a-z0-9]+/).filter(function (w) { return w && !STOPW[w]; });
    if (!words.length) return false;
    function wordHit(w) {
      var s = stem(w), cands = [s.length > 5 ? s.slice(0, Math.max(5, s.length - 1)) : s];
      var sk = Object.keys(SYN).filter(function (x) { return s.indexOf(x) === 0 || x.indexOf(s) === 0 && s.length >= 4; });
      sk.forEach(function (x) { cands = cands.concat(SYN[x]); });
      return cands.some(function (c) { return hasStart(txt, c); });
    }
    return words.every(wordHit);
  };
  function parseSla(s) {
    var m = /^\s*(\d+(?:\.\d+)?)\s*(m|min|mins|minutes|h|hr|hrs|hours?|d|days?)?\s*$/i.exec(String(s || ''));
    if (!m) return 480; var v = parseFloat(m[1]), u = (m[2] || 'h').toLowerCase();
    return Math.max(15, Math.round(u.charAt(0) === 'm' ? v : u.charAt(0) === 'd' ? v * 1440 : v * 60));
  }
  var PRI = { P1: ['1 - Critical', 'p1'], P2: ['2 - High', 'p2'], P3: ['3 - Moderate', 'p3'], P4: ['4 - Low', 'p4'] };
  var DEF_SLA = { P1: '4h', P2: '8h', P3: '24h', P4: '72h' };

  W.ticket = function (el, a, ctx) {
    ctx = ctx || {}; a = a || {};
    var T = a.ticket || {}, inv = a.investigate || [], dg = a.diagnosis || {}, steps0 = a.resolution || [], cl = a.closure || {};
    var pri = String(T.priority || 'P3').toUpperCase(), P = PRI[pri] || PRI.P3;
    var sla = parseSla(T.sla || DEF_SLA[pri] || '8h');
    var SECT = [['inv', '🔎', 'Investigate']].concat(a.terminal ? [['con', '💻', 'Console']] : []).concat([['dia', '🧠', 'Diagnose'], ['res', '🛠️', 'Resolve'], ['clo', '📝', 'Close']]);
    var st, alive = true, term = null, timer = 0;
    function fresh() { st = { used: 0, cur: 0, max: 0, rev: {}, mark: {}, diag: null, oTries: 0, oOk: false, oPct: 0, note: '', noteHits: 0, sub: false, termDone: false, termCost: 0, wn: [], state: 'New', awarded: false, order: null }; }
    fresh();
    var root = h('div', { class: 'tk' }); el.appendChild(root);

    /* ---- header (ServiceNow-like form) ---- */
    var stateEl = h('span', { class: 'tk-state' }), slaTxt = h('span', { class: 'tk-sla-t' }), slaBar = h('div', { class: 'tk-sla-bar', role: 'progressbar', 'aria-label': 'SLA time used', 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('i'));
    var slaFlag = h('span', { class: 'tk-sla-f' });
    function field(lbl, val, cls) { return h('div', { class: 'tk-f' + (cls ? ' ' + cls : '') }, [h('span', { class: 'tk-fl' }, lbl), h('span', { class: 'tk-fv' }, val)]); }
    root.appendChild(h('div', { class: 'tk-top' }, [h('span', { class: 'tk-logo', 'aria-hidden': 'true' }, '≡'), h('b', null, 'Service Management'), h('span', { class: 'tk-sep', 'aria-hidden': 'true' }, '›'), h('span', null, (T.type || 'Incident') + ' ' + (T.id || 'INC0000000')), h('span', { class: 'op-badge tk-sim' }, '🛡️ Simulation')]));
    var form = h('div', { class: 'tk-form' }, [
      field('Number', h('b', { class: 'tk-id' }, T.id || 'INC0000000')), field('Caller', T.caller || '—'),
      field('Type', T.type || 'Incident'), field('Configuration item', h('code', null, T.ci || '—')),
      field('Priority', h('span', { class: 'tk-pri ' + P[1] }, pri + ' · ' + P[0].replace(/^\d - /, ''))), field('State', stateEl),
      field('Assignment group', T.group || 'Service Desk'), field('Assigned to', 'You'),
      field('Short description', h('b', null, T.short || ''), 'wide'),
      field('Description', h('div', { class: 'tk-desc' }, T.description || ''), 'wide')
    ]);
    root.appendChild(form);
    root.appendChild(h('div', { class: 'tk-sla' }, [h('span', { class: 'tk-sla-l' }, ['⏱ SLA · resolve within ', h('b', null, fmtMin(sla))]), slaBar, h('span', { class: 'tk-sla-r' }, [slaTxt, slaFlag])]));
    var rail = h('div', { class: 'tk-rail', role: 'tablist', 'aria-label': 'Ticket steps' });
    var tabs = SECT.map(function (s, i) { var b = h('button', { type: 'button', role: 'tab', class: 'tk-tab', 'aria-selected': 'false' }, [h('span', { 'aria-hidden': 'true' }, s[1]), ' ', h('b', null, (i + 1) + '. ' + s[2])]); b.addEventListener('click', function () { if (i <= st.max) go(i); }); rail.appendChild(b); return b; });
    root.appendChild(rail);
    var panel = h('div', { class: 'tk-panel', role: 'tabpanel', tabindex: '-1' }); root.appendChild(panel);
    var notesWrap = h('details', { class: 'tk-wn', open: true }, [h('summary', null, '🗒️ Activity & work notes')]);
    var notesList = h('ol', { class: 'tk-wn-l', 'aria-live': 'polite' }); notesWrap.appendChild(notesList); root.appendChild(notesWrap);

    function stamp() { return 'T+' + fmtMin(st.used); }
    function note(who, text) { st.wn.push({ who: who, t: text, at: stamp() }); drawNotes(); }
    function drawNotes() {
      notesList.innerHTML = '';
      st.wn.slice().reverse().forEach(function (n) { notesList.appendChild(h('li', { class: 'tk-n' + (n.who === 'You' ? ' me' : '') }, [h('span', { class: 'tk-n-h' }, n.who + ' · ' + n.at), h('span', { class: 'tk-n-t' }, n.t)])); });
    }
    function setState(s) { st.state = s; stateEl.textContent = s; stateEl.className = 'tk-state s-' + s.toLowerCase().replace(/\s+/g, '-'); }
    function cost(m) { st.used += m; drawSla(); }
    function left() { return sla - st.used; }
    function drawSla() {
      var pct = VV2.clamp(st.used / sla * 100, 0, 100), lf = left();
      slaBar.firstChild.style.width = pct + '%'; slaBar.setAttribute('aria-valuenow', String(Math.round(pct)));
      slaBar.className = 'tk-sla-bar' + (lf <= 0 ? ' br' : pct >= 75 ? ' risk' : '');
      slaTxt.textContent = lf > 0 ? fmtMin(lf) + ' left' : 'breached by ' + fmtMin(-lf);
      slaFlag.textContent = lf <= 0 ? ' · 🔴 SLA breached' : pct >= 75 ? ' · 🟠 at risk' : ' · 🟢 on track';
    }
    function unlock(i) { if (i > st.max) st.max = i; drawTabs(); }
    function drawTabs() { tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === st.cur ? 'true' : 'false'); t.disabled = k > st.max; t.classList.toggle('seen', k < st.max); }); }
    function nextBtn(label, i) { return h('button', { type: 'button', class: 'btn primary tk-next', onclick: function () { unlock(i); go(i); } }, label); }
    function go(i) {
      if (term && SECT[st.cur][0] === 'con' && i !== st.cur) { /* keep terminal state alive */ }
      st.cur = i; drawTabs(); panel.innerHTML = '';
      ({ inv: pInv, con: pCon, dia: pDia, res: pRes, clo: pClo })[SECT[i][0]](panel);
      try { panel.focus({ preventScroll: true }); } catch (e) { }
    }
    var idx = function (id) { for (var i = 0; i < SECT.length; i++) if (SECT[i][0] === id) return i; return -1; };

    /* ---- 1. investigate ---- */
    function pInv(p) {
      p.appendChild(h('h3', { class: 'tk-h' }, '🔎 Investigate'));
      p.appendChild(h('p', { class: 'muted' }, 'Pick what you would check. Each check takes SLA time — useless ones take more. Mark the findings that matter as clues 📌.'));
      var list = h('div', { class: 'tk-inv' }); p.appendChild(list);
      var cont = h('div', { class: 'row tk-row' }); p.appendChild(cont);
      inv.forEach(function (it, i) {
        var card = h('div', { class: 'tk-ic' + (st.rev[i] ? ' open' : '') });
        var btn = h('button', { type: 'button', class: 'tk-ib', 'aria-expanded': st.rev[i] ? 'true' : 'false' }, [h('span', { 'aria-hidden': 'true' }, st.rev[i] ? '✓' : '▸'), ' ', String(it.label || 'Check')]);
        var body = h('div', { class: 'tk-ir', hidden: !st.rev[i] });
        function fill() {
          body.innerHTML = '';
          body.appendChild(h('pre', { class: 'tk-find' }, String(it.reveal || 'Nothing unusual.')));
          var mk = h('button', { type: 'button', class: 'btn small ' + (st.mark[i] ? 'primary' : 'ghost'), 'aria-pressed': st.mark[i] ? 'true' : 'false' }, st.mark[i] ? '📌 Marked as clue' : '📌 Mark as clue');
          mk.addEventListener('click', function () { st.mark[i] = !st.mark[i]; VV2.sfx('tick'); fill(); });
          body.appendChild(mk);
          if (st.sub || st.diag != null) body.appendChild(h('span', { class: 'tk-truth ' + (it.clue ? 'ok' : 'no') }, it.clue ? ' ✔ a real clue' : ' ✖ red herring'));
        }
        btn.addEventListener('click', function () {
          if (!st.rev[i]) {
            st.rev[i] = 1; var c = Math.round(sla * (it.clue ? 0.05 : 0.15)); cost(c);
            if (st.state === 'New') setState('In Progress');
            note('You', String(it.label || 'Check') + ' → ' + String(it.reveal || '').split('\n')[0].slice(0, 140));
            VV2.sfx(it.clue ? 'pop' : 'tick');
            card.classList.add('open'); btn.firstChild.textContent = '✓'; fill();
            unlock(idx('inv') + 1); drawCont();
          }
          var open = body.hidden; body.hidden = !open; btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        if (st.rev[i]) fill();
        card.appendChild(btn); card.appendChild(body); list.appendChild(card);
      });
      function drawCont() { cont.innerHTML = ''; var n = Object.keys(st.rev).length; if (!n) cont.appendChild(h('p', { class: 'muted' }, 'Run at least one check to continue.')); else cont.appendChild(nextBtn((a.terminal ? 'Open the console' : 'Diagnose') + ' →', 1)); }
      drawCont();
    }
    /* ---- 2. console (optional) ---- */
    var termHost = null;
    function pCon(p) {
      p.appendChild(h('h3', { class: 'tk-h' }, '💻 Console on ' + (a.terminal.host || T.ci || 'the server')));
      if (!termHost) {
        termHost = h('div');
        term = Ops.terminal(termHost, a.terminal, {
          embedded: true,
          onCommand: function (c, hit, miss) { if (st.termCost < sla * 0.2) { var m = Math.max(1, Math.round(sla * 0.01)); st.termCost += m; cost(m); } if (hit) note('You', 'Ran on console: ' + c.slice(0, 120)); },
          onComplete: function () { st.termDone = true; note('You', 'Console tasks complete.'); VV2.sfx('good'); drawCont(); }
        });
      }
      p.appendChild(termHost);
      var cont = h('div', { class: 'row tk-row' }); p.appendChild(cont);
      function drawCont() { cont.innerHTML = ''; cont.appendChild(nextBtn(st.termDone ? 'Diagnose →' : 'Skip to diagnosis →', idx('dia'))); if (!st.termDone) cont.appendChild(h('span', { class: 'muted' }, 'Finishing the console tasks gives you better evidence.')); }
      drawCont();
      if (term) setTimeout(function () { try { term.focus(); } catch (e) { } }, 60);
    }
    /* ---- 3. diagnose ---- */
    function pDia(p) {
      p.appendChild(h('h3', { class: 'tk-h' }, '🧠 Diagnose'));
      var marked = inv.filter(function (x, i) { return st.mark[i]; });
      if (marked.length) p.appendChild(h('div', { class: 'tk-clues' }, [h('b', null, 'Your clues: ')].concat(marked.map(function (x) { return h('span', { class: 'pill' }, '📌 ' + String(x.label)); }))));
      p.appendChild(h('p', { class: 'qr-q' }, dg.q || 'What is the root cause?'));
      var opts = h('div', { class: 'qr-opts', role: 'group', 'aria-label': 'Diagnosis options' }); p.appendChild(opts);
      var why = h('div', { class: 'qr-why', 'aria-live': 'polite', hidden: st.diag == null }); p.appendChild(why);
      var cont = h('div', { class: 'row tk-row' }); p.appendChild(cont);
      var bs = (dg.options || []).map(function (op, k) { var b = h('button', { type: 'button', class: 'qr-opt' }, [h('kbd', null, String.fromCharCode(65 + k)), h('span', null, String(op))]); b.addEventListener('click', function () { pick(k); }); opts.appendChild(b); return b; });
      function paint() {
        if (st.diag == null) return;
        var ok = st.diag === dg.answer;
        bs.forEach(function (b, j) { b.disabled = true; if (j === dg.answer) b.classList.add('right'); else if (j === st.diag) b.classList.add('wrong'); });
        why.hidden = false; why.innerHTML = '<b>' + (ok ? '✅ Correct diagnosis. ' : '💡 Not quite. ') + '</b>' + VV2.inline(dg.why || '');
        cont.innerHTML = ''; cont.appendChild(nextBtn('Plan the fix →', idx('res')));
      }
      function pick(k) {
        if (st.diag != null) return; st.diag = k; var ok = k === dg.answer;
        if (!ok) cost(Math.round(sla * 0.15));
        VV2.sfx(ok ? 'good' : 'bad');
        note('You', 'Diagnosis: ' + String((dg.options || [])[k] || '').slice(0, 140));
        paint(); unlock(idx('res'));
      }
      paint();
    }
    /* ---- 4. resolve: order the steps (drag on desktop, tap-to-order on touch) ---- */
    function pRes(p) {
      p.appendChild(h('h3', { class: 'tk-h' }, '🛠️ Put the resolution steps in order'));
      var coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      if (!st.order) st.order = VV2.shuffleNot(steps0.map(function (x, i) { return i; }));
      if (st.tap == null) st.tap = coarse;
      var modeB = h('button', { type: 'button', class: 'btn small ghost' }, st.tap ? '↕ Switch to drag & arrows' : '👆 Switch to tap-to-order');
      modeB.addEventListener('click', function () { st.tap = !st.tap; panel.innerHTML = ''; pRes(panel); });
      p.appendChild(h('div', { class: 'row tk-row' }, [h('p', { class: 'muted', style: { margin: 0 } }, st.tap ? 'Tap the steps in the order you would do them. Tap a placed step to send it back.' : 'Drag the ⠿ handle, or use ▲ ▼, to order the steps.'), modeB]));
      var area = h('div', { class: 'tk-ord' }); p.appendChild(area);
      var fb = h('p', { class: 'w-fb', 'aria-live': 'polite' }); var acts = h('div', { class: 'row tk-row' });
      var check = h('button', { type: 'button', class: 'btn primary' }, '✔ Check order');
      acts.appendChild(check); p.appendChild(acts); p.appendChild(fb);
      var getOrder, mark;
      if (st.tap) {
        var placed = st.oOk ? st.order.slice() : [], pool = h('div', { class: 'tk-pool', role: 'group', 'aria-label': 'Steps to place' }), seq = h('ol', { class: 'tk-seq', 'aria-label': 'Your order' });
        area.appendChild(h('p', { class: 'tk-sub' }, 'Steps')); area.appendChild(pool); area.appendChild(h('p', { class: 'tk-sub' }, 'Your order')); area.appendChild(seq);
        var drawTap = function () {
          pool.innerHTML = ''; seq.innerHTML = '';
          st.order.forEach(function (v) { if (placed.indexOf(v) >= 0) return; pool.appendChild(h('button', { type: 'button', class: 'tk-chip', onclick: function () { placed.push(v); VV2.sfx('tick'); drawTap(); } }, String(steps0[v]))); });
          placed.forEach(function (v, k) { seq.appendChild(h('li', null, h('button', { type: 'button', class: 'tk-chip on', 'data-v': v, 'aria-label': 'Step ' + (k + 1) + ': ' + steps0[v] + '. Tap to remove', onclick: function () { if (st.oOk) return; placed.splice(k, 1); drawTap(); } }, String(steps0[v])))); });
          if (!pool.childNodes.length) pool.appendChild(h('p', { class: 'muted' }, 'All placed — check your order.'));
          check.disabled = placed.length !== steps0.length || st.oOk;
        };
        getOrder = function () { return placed.slice(); };
        mark = function (res) { VV2.$$('.tk-chip.on', seq).forEach(function (b, k) { b.classList.add(res[k] ? 'ok' : 'no'); }); };
        drawTap();
      } else if (VV2.Wh && VV2.Wh.reorder) {
        var ro = VV2.Wh.reorder(area, st.order.map(function (v) { return { v: v, t: String(steps0[v]) }; }), function () { fb.textContent = ''; });
        getOrder = function () { return ro.order().map(Number); };
        mark = function (res) { ro.items().forEach(function (li, k) { li.classList.add(res[k] ? 'ok' : 'no'); }); };
      } else {
        var cur = st.order.slice(), ul = h('ol', { class: 'reorder' }); area.appendChild(ul);
        var drawUl = function () { ul.innerHTML = ''; cur.forEach(function (v, k) { ul.appendChild(h('li', { class: 'ro-item' }, [h('span', { class: 'ro-t' }, String(steps0[v])), h('span', { class: 'ro-b' }, [h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Move up', onclick: function () { if (k) { cur.splice(k - 1, 0, cur.splice(k, 1)[0]); drawUl(); } } }, '▲'), h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Move down', onclick: function () { if (k < cur.length - 1) { cur.splice(k + 1, 0, cur.splice(k, 1)[0]); drawUl(); } } }, '▼')])])); }); };
        drawUl(); getOrder = function () { return cur.slice(); }; mark = function (res) { VV2.$$('li', ul).forEach(function (li, k) { li.classList.add(res[k] ? 'ok' : 'no'); }); };
      }
      function doneOrder() { check.disabled = true; acts.appendChild(nextBtn('Write the closure note →', idx('clo'))); unlock(idx('clo')); }
      check.addEventListener('click', function () {
        var ord = getOrder(); if (ord.length !== steps0.length) return;
        st.oTries++; st.order = ord.slice();
        var res = ord.map(function (v, k) { return v === k; }), right = res.filter(Boolean).length;
        mark(res);
        if (right === steps0.length) { st.oOk = true; st.oPct = st.oTries === 1 ? 1 : st.oTries === 2 ? 0.7 : 0.4; VV2.sfx('win'); fb.textContent = '✅ Right order' + (st.oTries > 1 ? ' (try ' + st.oTries + ').' : ' first time!'); fb.className = 'w-fb ok'; note('You', 'Resolution plan agreed: ' + steps0.length + ' steps.'); doneOrder(); return; }
        VV2.sfx('bad'); cost(Math.round(sla * 0.08));
        if (st.oTries >= 3) { st.oPct = Math.max(0, right / steps0.length * 0.3); st.order = steps0.map(function (x, i) { return i; }); fb.className = 'w-fb'; fb.textContent = right + ' of ' + steps0.length + ' in place. Here is the right order:'; p.appendChild(h('ol', { class: 'tk-right' }, steps0.map(function (s) { return h('li', null, String(s)); }))); doneOrder(); return; }
        fb.className = 'w-fb no'; fb.textContent = right + ' of ' + steps0.length + ' in the right place. Think: what must be true before each step? (try ' + st.oTries + ' of 3)';
      });
      if (st.oOk || st.oTries >= 3) { check.disabled = true; acts.appendChild(nextBtn('Write the closure note →', idx('clo'))); }
    }
    /* ---- 5. close ---- */
    function pClo(p) {
      p.appendChild(h('h3', { class: 'tk-h' }, '📝 Resolve & close'));
      p.appendChild(h('p', null, cl.prompt || 'Write the resolution (closure) note the next engineer and the caller will read.'));
      var must = cl.mustInclude || ['root cause', 'fix', 'verification'];
      var id = 'tkn' + (++VV2._id);
      var ta = h('textarea', { id: id, class: 'tk-ta', rows: '6', placeholder: 'Root cause: …\nFix: …\nVerification: …', 'aria-describedby': id + '-k' });
      ta.value = st.note;
      p.appendChild(h('label', { for: id, class: 'tk-sub' }, 'Closure note'));
      p.appendChild(ta);
      var kw = h('div', { class: 'tk-kw', id: id + '-k', 'aria-live': 'polite' }); p.appendChild(kw);
      var sub = h('button', { type: 'button', class: 'btn primary' }, st.sub ? '✔ Submitted' : '✔ Resolve ticket'); var acts = h('div', { class: 'row tk-row' }, [sub]); p.appendChild(acts);
      var resBox = h('div', { class: 'tk-res' }); p.appendChild(resBox);
      function upd() {
        st.note = ta.value; kw.innerHTML = ''; var hits = 0;
        kw.appendChild(h('span', { class: 'muted' }, 'Should mention: '));
        must.forEach(function (k) { var ok = Ops.keyHit(ta.value, k); if (ok) hits++; kw.appendChild(h('span', { class: 'tk-k' + (ok ? ' ok' : '') }, (ok ? '✔ ' : '○ ') + k)); });
        st.noteHits = hits; sub.disabled = st.sub || ta.value.trim().length < 30;
      }
      ta.addEventListener('input', upd); ta.addEventListener('keydown', function (e) { e.stopPropagation(); });
      sub.addEventListener('click', function () { if (st.sub) return; st.sub = true; ta.readOnly = true; setState('Resolved'); note('You', 'Resolution note: ' + ta.value.trim().slice(0, 300)); sub.textContent = '✔ Submitted'; upd(); summary(resBox); });
      upd();
      if (st.sub) { ta.readOnly = true; summary(resBox); }
    }
    function score() {
      var lf = left(), slaPts = lf > 0 ? Math.round(20 + 10 * lf / sla) : 0;
      var diagPts = st.diag === dg.answer ? 35 : 0, ordPts = Math.round(25 * st.oPct);
      var must = (cl.mustInclude || ['root cause', 'fix', 'verification']), notePts = Math.round(10 * st.noteHits / Math.max(1, must.length));
      return { sla: slaPts, diag: diagPts, ord: ordPts, note: notePts, total: Math.min(100, slaPts + diagPts + ordPts + notePts) };
    }
    function summary(box) {
      var s = score(), lf = left(), cluesRight = 0, cluesAll = 0;
      inv.forEach(function (x, i) { if (x.clue) { cluesAll++; if (st.mark[i]) cluesRight++; } });
      box.innerHTML = '';
      if (cl.model) box.appendChild(h('div', { class: 'tk-model' }, [h('b', null, '📄 A model closure note'), h('p', null, String(cl.model))]));
      var missing = (cl.mustInclude || []).filter(function (k) { return !Ops.keyHit(st.note, k); });
      if (missing.length) box.appendChild(h('p', { class: 'w-fb no' }, 'Your note did not clearly mention: ' + missing.join(', ') + '.'));
      box.appendChild(h('div', { class: 'tk-score' }, [
        h('div', { class: 'res-score' }, s.total + '%'),
        h('ul', { class: 'tk-break' }, [
          h('li', null, (lf > 0 ? '🟢 SLA kept (' + fmtMin(lf) + ' to spare)' : '🔴 SLA breached') + ' — ' + s.sla + '/30'),
          h('li', null, (st.diag === dg.answer ? '✅ Correct diagnosis' : '❌ Diagnosis missed') + ' — ' + s.diag + '/35'),
          h('li', null, '🛠️ Resolution order — ' + s.ord + '/25'),
          h('li', null, '📝 Closure note keywords — ' + s.note + '/10'),
          h('li', { class: 'muted' }, '📌 Clues marked: ' + cluesRight + ' of ' + cluesAll + (inv.some(function (x, i) { return !x.clue && st.mark[i]; }) ? ' (you also pinned a red herring)' : ''))
        ])]));
      box.appendChild(h('div', { class: 'row tk-row' }, [h('button', { type: 'button', class: 'btn ghost', onclick: restart }, '↻ Work this ticket again')]));
      if (!st.awarded) { st.awarded = true; note('System', 'Ticket ' + (T.id || '') + ' resolved. Caller notified for confirmation.'); if (ctx.done) ctx.done(s.total); }
    }
    function restart() { if (term) term.destroy(); fresh(); term = null; termHost = null; setState('New'); drawSla(); st.wn = []; (T.worknotes || []).forEach(function (w) { st.wn.push({ who: 'Earlier note', t: String(w), at: 'before you' }); }); drawNotes(); go(0); }

    setState('New'); drawSla();
    (T.worknotes || []).forEach(function (w) { st.wn.push({ who: 'Earlier note', t: String(w), at: 'before you' }); });
    drawNotes(); go(0);
    /* a gentle visual pulse on the SLA clock (purely cosmetic) */
    timer = setInterval(function () { if (!alive || !document.body.contains(root)) { clearInterval(timer); return; } slaTxt.classList.toggle('tick'); }, 1000);
    return { destroy: function () { alive = false; clearInterval(timer); if (term) term.destroy(); }, score: score, state: function () { return st; } };
  };
})();
