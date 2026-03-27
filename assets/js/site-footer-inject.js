/*
 * site-footer-inject.js — AJ's Data & AI Lab
 *
 * Injects the site footer immediately before this <script> tag.
 * Include it wherever you want the footer to appear:
 *
 *   <script src="./assets/common/site-footer-inject.js"></script>
 */
(function () {

  var me   = document.currentScript;
  var BASE = (function () {
    var b = (me && me.src)
      ? new URL('../../', me.src).href
      : (window.location.origin !== 'null' ? window.location.origin + '/' : './');
    return b.replace(/([^:])\/\/+/g, '$1/');
  }());

  var HTML =
    '<footer>' +
    '  <div class="footer-inner">' +
    '    <div>' +
    '      <p class="footer-desc" data-content="site.footerDesc">' +
    '        Practitioner perspectives on building AI-driven enterprises — from strategy and innovation to execution at scale with leadership impact.' +
    '        Earned from 22+ years in the trenches, not the textbook.' +
    '      </p>' +
    '    </div>' +
    '    <div>' +
    '      <div class="footer-heading">Article Streams</div>' +
    '      <div class="footer-links">' +
    '        <a href="' + BASE + 'practitioner-series/index.html">Practitioner Series - Deep Dives</a>' +
    '        <a href="' + BASE + 'quick-bytes/index.html">Quick Bytes - Key Pointers</a>' +
    '        <a href="' + BASE + 'exec-briefing/index.html">Executive Briefing - For Decision Makers</a>' +
    '        <a href="' + BASE + 'spotlight/index.html">Spotlight - Shared Insights</a>' +
    '      </div>' +
    '    </div>' +
    '    <div>' +
    '      <div class="footer-heading">IPs &amp; Products</div>' +
    '      <div class="footer-links">' +
    '        <a href="https://github.com/ajs-lab/sparkdqx" target="_blank" rel="noopener">Spark DQX</a>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '  <div class="footer-copy" data-content="site.copyright">' +
    '    &copy;AJ\'s Data &amp; AI Lab &middot; Arnay Joshi &middot; All rights reserved' +
    '  </div>' +
    '</footer>';

  if (me) {
    me.insertAdjacentHTML('beforebegin', HTML);
  }

})();
