/*
 * site-header-inject.js — AJ's Data & AI Lab
 *
 * Injects the site nav + hero immediately before this <script> tag.
 * Include it wherever you want the header to appear:
 *
 *   <script src="./assets/common/site-header-inject.js"></script>
 */
(function () {

  var me   = document.currentScript;
  var BASE = (function () {
    var b = (me && me.src)
      ? new URL('../../', me.src).href
      : (window.location.origin !== 'null' ? window.location.origin + '/' : './');
    return b.replace(/([^:])\/\/+/g, '$1/');
  }());

  var logo = BASE + 'assets/img/ajs-labs-logo.png';

  var HTML =
    '<nav class="site-nav">' +
    '<div class="nav-inner">' +
    '  <button class="nav-toggle" onclick="document.querySelector(\'.nav-links\').classList.toggle(\'open\')">&#9776;</button>' +
    '  <div class="nav-links">' +
    '    <a href="' + BASE + 'index.html" class="active">Home</a>' +
    //'    <div class="nav-dropdown">' +
    //'      <a href="#">Pillars</a>' +
    //'      <div class="nav-dropdown-menu">' +
    //'        <a href="#"><span class="pillar-dot strategy"></span><span>Data &amp; AI Strategy</span></a>' +
    //'        <a href="#"><span class="pillar-dot innovation"></span><span>Products &amp; Platform Innovation</span></a>' +
    //'        <a href="#"><span class="pillar-dot delivery"></span><span>Governed Execution at Scale</span></a>' +
    //'        <a href="#"><span class="pillar-dot leadership"></span><span>Impact Through Leadership</span></a>' +
    //'      </div>' +
    //'    </div>' +
    '    <div class="nav-dropdown">' +
    '      <a href="#">Article Streams</a>' +
    '      <div class="nav-dropdown-menu">' +
    '        <a href="' + BASE + 'practitioner-series/index.html"><span class="stream-dot practitioner"></span><span>Practitioner Series - Deep Dives</span></a>' +
    '        <a href="' + BASE + 'quick-bytes/index.html"><span class="stream-dot quickbytes"></span><span>Quick Bytes - Key Pointers</span></a>' +
    '        <a href="' + BASE + 'exec-briefing/index.html"><span class="stream-dot executive"></span><span>Executive Briefing - For Decision Makers</span></a>' +
    '        <a href="' + BASE + 'spotlight/index.html"><span class="stream-dot spotlight"></span><span>Spotlight - Shared Insights</span></a>' +
    '      </div>' +
    '    </div>' +
    '    <div class="nav-dropdown">' +
    '      <a href="' + BASE + 'ips-and-products/">IPs &amp; Products</a>' +
    '      <div class="nav-dropdown-menu">' +
    '        <a href="https://github.com/ajs-lab/sparkdqx" target="_blank" rel="noopener"><span class="stream-dot practitioner"></span><span>Spark DQX</span></a>' +
    '      </div>' +
    '    </div>' +
    '    <div class="nav-dropdown">' +
    '      <a href="#">About</a>' +
    '      <div class="nav-dropdown-menu">' +
    '        <a href="' + BASE + 'about/about-ajs-lab.html"><span class="stream-dot practitioner"></span><span>AJ\'s Data &amp; AI Lab</span></a>' +
    '      </div>' +
    '    </div>' +
    '    <a href="https://linkedin.com/in/arnayjoshi" target="_blank" rel="noopener" class="nav-contact">Connect &#8599;</a>' +
    '  </div>' +
    '</div>' +
    '</nav>' +

    '<section class="hero">' +
    '  <div class="hero-inner">' +
    '    <div class="hero-text">' +
    '      <h1>Think · <em>Build · Deliver · </em>Lead</h1>' +
    '      <p class="hero-tagline" data-content="site.tagline">' +
    '        Practitioner perspectives on building AI-driven enterprises — from strategy and innovation to execution at scale with leadership impact. \nFrom the trenches, not the textbook.' +
    '      </p>' +
    '      <div class="hero-pillars">' +
    '        <span class="hero-pill strategy"  data-content="pillars.strategy.label">Data &amp; AI Strategy</span>' +
    '        <span class="hero-pill innovation" data-content="pillars.innovation.label">Products &amp; Platform Innovation</span>' +
    '        <span class="hero-pill delivery"   data-content="pillars.delivery.label">Governed Execution at Scale</span>' +
    '        <span class="hero-pill leadership" data-content="pillars.leadership.label">Impact Through Leadership</span>' +
    '      </div>' +
    '    </div>' +
    '    <div class="hero-lab">' +
    '      <div class="hero-lab-img">' +
    '        <img src="' + logo + '" alt="AJ\'s Data &amp; AI Lab"' +
    '             onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
    '        <div class="lab-visual" style="display:none;position:absolute;inset:0;">' +
    '          <div class="lab-nodes">' +
    '            <div class="lab-node"></div><div class="lab-node"></div><div class="lab-node"></div><div class="lab-node"></div>' +
    '            <div class="lab-node"></div><div class="lab-node"></div><div class="lab-node"></div><div class="lab-node"></div>' +
    '            <div class="lab-node"></div><div class="lab-node"></div><div class="lab-node"></div><div class="lab-node"></div>' +
    '          </div>' +
    '        </div>' +
    '      </div>' +
    //'      <div class="hero-lab-caption" data-content="site.name">AJ\'S DATA &amp; AI LAB</div>' +
    '    </div>' +
    '  </div>' +
    '</section>';

  if (me) {
    me.insertAdjacentHTML('beforebegin', HTML);
  }

})();
