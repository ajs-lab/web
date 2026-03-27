/*
 * author-bio-inject.js — AJ's Data & AI Lab
 *
 * Injects the sidebar author bio card immediately before this <script> tag,
 * then loads assets/ref/author.json and populates all fields.
 *
 *   <script src="./assets/common/author-bio-inject.js"></script>
 */
(function () {

  var me   = document.currentScript;
  var BASE = (me && me.src)
    ? new URL('../../', me.src).href
    : (window.location.origin !== 'null' ? window.location.origin + '/' : './');

  // ── 1. Inject skeleton synchronously (me/currentScript is valid here) ─────

  var HTML =
    '<div class="sidebar-author" id="author-bio-card">' +
    '  <div class="sidebar-avatar">' +
    '    <img id="author-avatar" src="' + BASE + 'assets/img/aj-black-bg.png" alt="AJ">' +
    '  </div>' +
    '<div class="sidebar-social">' +
    '    <a id="author-linkedin" href="https://linkedin.com/in/arnayjoshi" target="_blank" title="LinkedIn">' +
    '      <svg viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>' +
    '    </a>' +
    '    <a id="author-github" href="https://github.com/ajs-lab" target="_blank" title="GitHub">' +
    '      <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>' +
    '    </a>' +
    '    <a id="author-email" href="mailto:hello.arnay@gmail.com" title="Email">' +
    '      <svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
    '    </a>' +
    '  </div>' +
    '  <h3 id="author-name">Arnay Joshi</h3>' +
    '  <div class="headline" id="author-headline">Data & AI Executive · Founder & Investor · Ex-Microsoft</div>' +
    '  <p class="bio" id="author-bio">22+ years building enterprise data platforms at Microsoft, Harman International, Founder(CTO), Investor, and Sr. Director at iLink Digital. Founded Cosxell, and led multi-geo engineering teams delivering Intelligent Data Platforms, AI/ML, and BI platforms at scale. Harvard and MIT credentialed.</p>' +
    '</div>';

  if (me) { me.insertAdjacentHTML('beforebegin', HTML); }
})();
