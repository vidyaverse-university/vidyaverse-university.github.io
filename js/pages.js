/* VidyaVerse v2 — static pages: about, the neutral "calm" page (quick-exit target), not found */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var P = VV2.Pages = {};

  P.about = function (main) {
    VV2.setTitle(VV2.t('about')); main.innerHTML = '';
    var w = h('div', { class: 'wrap' }); main.appendChild(w);
    w.appendChild(h('p', { class: 'eyebrow' }, 'About VidyaVerse University'));
    w.appendChild(h('h1', null, 'A free university for every age — from a first word to a PhD'));
    w.appendChild(h('p', { class: 'lead' }, 'VidyaVerse is one open campus where an infant on a parent’s lap, a Class 7 student, a JEE/NEET aspirant, an AI engineer, a fresher in their first job, a senior manager, a would-be cricketer or dancer — and anyone with a question they have never asked aloud — can learn, practise, test themselves and grow. No fees, no sign-up, no ads.'));
    var grid = h('div', { class: 'about-grid' }); w.appendChild(grid);
    VV2.SCHOOLS.forEach(function (s) { grid.appendChild(h('a', { class: 'card teaser', href: '#/school/' + s.id, style: { borderTop: '4px solid ' + s.color } }, [h('span', { class: 'ts-i', 'aria-hidden': 'true' }, s.icon), h('b', null, s.name + ' · ' + s.hi), h('small', null, s.en + ' — ' + s.tag)])); });
    var pr = h('div', { class: 'prose' }); w.appendChild(pr);
    pr.innerHTML = [
      '<h2>📚 How it works</h2><p>Every course belongs to one of fifteen schools and has a level from 1 (easiest) to 10 (hardest). Each lesson starts with a real-world story, explains the idea fully with worked examples, common mistakes and tips, then gives you something to <em>do</em> and a quick quiz. Courses end with an exam that runs from easy to tough.</p>',
      '<p><strong>Every level is open.</strong> If a course is above the level you have unlocked, take a 10-question adaptive placement test — score 70% and that level (and everything below) is yours. Or simply explore freely.</p>',
      '<h2>🏷️ Independence</h2><p><strong>Topic tags show which syllabus a lesson can support. VidyaVerse is independent and not affiliated with any board, exam body or university.</strong></p>',
      '<p>Exam-prep courses are independent practice material; not affiliated with or endorsed by the exam provider. Check the official exam guide for the current skills outline. Certificates are personal achievement records, not accredited qualifications.</p>',
      '<h2>🕊️ Safety</h2><ul><li>Sensitive topics (puberty, consent, abuse, bullying, mental health, grief, drugs, crime) are medically accurate, age-appropriate and non-explicit, following UNESCO’s International Technical Guidance on Sexuality Education (2018) and WHO guidance.</li><li>They open with a calm note for grown-ups; for under-18 profiles a grown-up confirms once per course.</li><li><strong>Quick exit:</strong> press <kbd>Esc</kbd> or the ✋ button on any sensitive page to jump to a neutral page.</li><li>Health, fitness and mental-health lessons are general education, not medical advice. Law lessons are general education, not legal advice. India’s criminal laws are the Bharatiya Nyaya Sanhita (BNS), BNSS and Bharatiya Sakshya Adhiniyam, in force from 1 July 2024.</li><li>In India: <strong>112</strong> for any emergency · <strong>1098</strong> Childline · <strong>14416</strong> Tele-MANAS (mental health).</li></ul>',
      '<h2>🔒 Privacy</h2><p>Everything stays on this device. There are no accounts, no cookies for tracking, no analytics and no servers that see your answers. Progress, notes and reflections are stored in your browser’s local storage. You can export all of it as a JSON file, import it on another device, or delete it in Settings.</p>',
      '<h2>♿ Made for everyone</h2><p>Five looks (Tiny, Kids, Teen, Campus, Pro), read-aloud, captions for sounds, larger text, high contrast, dyslexia-friendly spacing, reduced motion, full keyboard support and an offline mode once you have visited.</p>',
      '<h2>🙏 Credits</h2><p>Designed &amp; built by <strong>Kumar Nikhil</strong> — <a href="https://kumarnikhildeveloperaccount.github.io/" target="_blank" rel="noopener">Portfolio</a> · <a href="https://www.linkedin.com/in/kumar-nikhil-1000a9192/" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:nkashyapnikhilnk@gmail.com">Email</a></p><p><a href="https://kumarnikhildeveloperaccount.github.io/" target="_blank" rel="noopener">More projects by Kumar Nikhil →</a></p>',
      '<p class="grat">With gratitude to God — Om Namah Paarvati Pateh, Har Har Mahadev. May God bless you and everyone.</p>',
      '<p class="muted">All learner names and stories in lessons are fictional. Psst — somewhere on this campus, a lotus is hiding.</p>'
    ].join('');
  };

  P.calm = function (main) {
    document.title = 'Times tables practice';
    main.innerHTML = '';
    var n = VV2.rnd(2, 12), w = h('div', { class: 'wrap calm-page' }); main.appendChild(w);
    w.appendChild(h('h1', null, 'Times tables: ' + n));
    w.appendChild(h('p', { class: 'muted' }, 'Say each line out loud twice.'));
    var g = h('div', { class: 'tt-grid' }); for (var i = 1; i <= 12; i++) g.appendChild(h('span', null, n + ' × ' + i + ' = ' + n * i)); w.appendChild(g);
    w.appendChild(h('p', { style: { marginTop: '24px' } }, h('a', { href: '#/', class: 'btn small ghost' }, 'Home')));
  };

  P.notFound = function (main) {
    VV2.setTitle('Not found');
    VV2.errorView(main, 'This corridor leads nowhere (yet)', 'The page you asked for is not on the campus map. Maybe the link is old, or the course is still being written.');
  };
})();
