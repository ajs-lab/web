/**
 * components.js — AJ's Data & AI Lab
 *
 * 1. Injects HTML fragments into elements with [data-include="path/to/file.html"].
 *    Optional data-include-selector="css selector" extracts one element from the
 *    fetched file instead of injecting the whole response.
 *
 * 2. Loads assets/ref/site-content.json and populates [data-content="dot.path"]
 *    elements. Fragment injection always completes first so that data-content
 *    elements inside injected fragments are also populated.
 *
 * All paths in data-include are resolved relative to the site root.
 *
 * Legacy: [data-bio] is still supported as an alias for author.bio.
 *
 * Uses XMLHttpRequest so it works on both web servers and file:// (Firefox).
 * On Chrome via file://, use VS Code Live Server for data to populate.
 */
(function () {

  // Compute site root robustly.
  // Preferred: go two levels up from assets/js/components.js → site root.
  // Fallback: use the origin of the current page.
  var _cs = document.currentScript;
  var BASE = (_cs && _cs.src)
    ? new URL('../../', _cs.src).href
    : (window.location.origin + '/');

  console.log('[components.js] BASE =', BASE);

  // ── HTTP helpers ──────────────────────────────────────────────────────────

  function loadHTML(url, callback) {
    console.log('[components.js] fetching fragment:', url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 0) {
        callback(xhr.responseText);
      } else {
        console.warn('[components.js] failed to load', url, '— status', xhr.status);
        callback(null);
      }
    };
    xhr.onerror = function () {
      console.warn('[components.js] network error loading', url);
      callback(null);
    };
    xhr.send();
  }

  function loadJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 0) {
        try { callback(JSON.parse(xhr.responseText)); }
        catch (e) { console.warn('[components.js] JSON parse error:', e); }
      }
    };
    xhr.onerror = function () { callback(null); };
    xhr.send();
  }

  // ── data-content population ───────────────────────────────────────────────

  function getPath(obj, path) {
    return path.split('.').reduce(function (cur, key) {
      return cur != null ? cur[key] : undefined;
    }, obj);
  }

  // ── Orchestration ─────────────────────────────────────────────────────────
  // Fragments and JSON load in parallel; populateAll fires only when both done.

  var siteData    = {};
  var fragsReady  = false;
  var jsonReady   = false;
  var jsonPending = 1;

  function onJsonLoaded() {
    jsonPending--;
    if (jsonPending === 0) {
      jsonReady = true;
    }
  }

  // Inject [data-include] placeholders
  var includes = Array.from(document.querySelectorAll('[data-include]'));
  if (includes.length === 0) {
    fragsReady = true;
  } else {
    var remaining = includes.length;
    includes.forEach(function (placeholder) {
      var src      = placeholder.getAttribute('data-include');
      var selector = placeholder.getAttribute('data-include-selector');
      var url      = new URL(src, BASE).href;

      loadHTML(url, function (html) {
        if (html) {
          var toInject = html;

          if (selector) {
            var parsed = new DOMParser().parseFromString(html, 'text/html');
            var match  = parsed.querySelector(selector);
            if (match) {
              toInject = match.outerHTML;
            } else {
              console.warn('[components.js] selector "' + selector + '" not found in', src);
              toInject = null;
            }
          }

          if (toInject) {
            // insertAdjacentHTML + removeChild is more reliable than outerHTML assignment
            placeholder.insertAdjacentHTML('beforebegin', toInject);
            placeholder.parentNode.removeChild(placeholder);
          }
        }

        remaining--;
        if (remaining === 0) {
          fragsReady = true;
        }
      });
    });
  }

  loadJSON(new URL('assets/ref/site-content.json', BASE).href, function (data) {
    if (data) Object.assign(siteData, data);
    onJsonLoaded();
  });

})();

/* ── Card & stream rendering helpers ────────────────────────────────────────
 * Exposed on window.AJSLab so any page can reuse them.
 * Each function is pure: data is passed in, no globals consumed.
 * ────────────────────────────────────────────────────────────────────────── */
window.AJSLab = window.AJSLab || {};

/**
 * Build a single article card element.
 * @param {Object} article  - article data object
 * @param {Object} pillars  - pillar definitions map { id: { label } }
 * @returns {HTMLElement}
 */
AJSLab.buildCard = function (article, pillars) {
  var pillar = article.pillar;
  var label  = pillars[pillar] ? pillars[pillar].label : pillar;
  var card   = document.createElement('div');
  card.className = 'article-card';
  card.setAttribute('data-stream', article.stream);
  card.setAttribute('data-pillar', pillar);
  card.innerHTML =
    '<div class="card-pillar-bar ' + pillar + '"></div>' +
    '<div class="card-body">' +
      '<div class="card-meta"><span class="card-date">' + article.date + '</span></div>' +
      '<h3><a href="' + article.href + '">' + article.title + '</a></h3>' +
      '<p class="card-excerpt">' + article.excerpt + '</p>' +
      '<div class="card-footer">' +
        '<span class="card-read">' + article.readTime + '</span>' +
        '<span class="pillar-tag ' + pillar + '">' + label + '</span>' +
      '</div>' +
    '</div>';
  return card;
};

/**
 * Build a stream section element with a paginated carousel.
 * @param {Object}   stream   - stream definition { id, title, href, viewAll }
 * @param {Array}    articles - full articles array (filtered internally)
 * @param {Object}   pillars  - pillar definitions map
 * @returns {HTMLElement|null}
 */
AJSLab.buildSection = function (stream, articles, pillars) {
  var streamArticles = articles.filter(function (a) { return a.stream === stream.id; });
  if (!streamArticles.length) return null;

  var titleParts = stream.title.split(' \u2014 ');
  var titleMain  = titleParts[0];
  var titleSub   = titleParts[1] ? ' \u2014 <span class="stream-title-sub">' + titleParts[1] + '</span>' : '';

  var section = document.createElement('div');
  section.className = 'stream-section stream-' + stream.id;
  section.innerHTML =
    '<div class="section-hd">' +
      '<div class="section-hd-meta"><h2>' + titleMain + titleSub + '</h2></div>' +
      '<a href="' + stream.href + '" class="section-view-all">' + stream.viewAll + '</a>' +
    '</div>' +
    '<div class="section-carousel">' +
      '<div class="section-feed"></div>' +
      '<div class="carousel-nav">' +
        '<button class="carousel-btn prev" aria-label="Previous">\u2039</button>' +
        '<span class="carousel-page"></span>' +
        '<button class="carousel-btn next" aria-label="Next">\u203a</button>' +
      '</div>' +
    '</div>';

  var feed = section.querySelector('.section-feed');
  streamArticles.forEach(function (a) { feed.appendChild(AJSLab.buildCard(a, pillars)); });
  return section;
};

/**
 * Wire up prev/next pagination for a carousel container.
 * Filter-aware: cards with class 'pillar-hidden' are excluded from paging.
 * @param {HTMLElement} carousel - element containing .section-feed and .carousel-nav
 */
AJSLab.initCarousel = function (carousel) {
  var feed  = carousel.querySelector('.section-feed');
  var nav   = carousel.querySelector('.carousel-nav');
  var prev  = nav.querySelector('.carousel-btn.prev');
  var next  = nav.querySelector('.carousel-btn.next');
  var label = nav.querySelector('.carousel-page');
  var PER   = 2;
  var cur   = 0;

  function render(page) {
    var allCards  = Array.from(feed.children);
    var showCards = allCards.filter(function (c) { return !c.classList.contains('pillar-hidden'); });
    var pages     = Math.ceil(showCards.length / PER) || 1;
    cur = Math.min(Math.max(page, 0), pages - 1);

    allCards.forEach(function (c) { c.style.display = 'none'; });
    showCards.slice(cur * PER, (cur + 1) * PER).forEach(function (c) { c.style.display = ''; });

    prev.disabled = cur === 0;
    next.disabled = cur >= pages - 1;
    label.textContent = (cur + 1) + ' / ' + pages;
    nav.style.display = pages <= 1 ? 'none' : '';
  }

  prev.addEventListener('click', function () { render(cur - 1); });
  next.addEventListener('click', function () { render(cur + 1); });
  render(0);

  /* Store re-render so filterByPillar can reset pagination after a filter change */
  carousel._reRender = function () { render(0); };
};

/**
 * Build the sidebar pillars widget with click-to-filter behaviour.
 * Clicking a pillar filters all stream cards to that pillar.
 * An "All" entry at the bottom clears the filter.
 * @param {Object} pillars  - pillar definitions map
 * @param {Array}  articles - full articles array (for counts)
 * @returns {HTMLElement}
 */
AJSLab.buildPillarsWidget = function (pillars, articles) {
  var counts = {};
  articles.forEach(function (a) { counts[a.pillar] = (counts[a.pillar] || 0) + 1; });

  var wrap = document.createElement('div');
  wrap.className = 'sidebar-section';

  var html = '<div class="sidebar-section-title">Pillars</div>';
  Object.keys(pillars).forEach(function (key) {
    html +=
      '<div class="pillar-link" data-pillar-filter="' + key + '">' +
        '<span class="pillar-icon ' + key + '"></span>' +
        '<span>' + pillars[key].label + '</span>' +
        '<span class="pillar-count">' + (counts[key] || 0) + '</span>' +
      '</div>';
  });
  html +=
    '<div class="pillar-link pillar-link--all active" data-pillar-filter="all">' +
      '<span class="pillar-icon pillar-icon--all"></span>' +
      '<span>All</span>' +
      '<span class="pillar-count">' + articles.length + '</span>' +
    '</div>';

  wrap.innerHTML = html;

  Array.from(wrap.querySelectorAll('[data-pillar-filter]')).forEach(function (el) {
    el.addEventListener('click', function () {
      AJSLab.filterByPillar(el.getAttribute('data-pillar-filter'), wrap);
    });
  });

  return wrap;
};

/**
 * Filter stream cards by pillar. Pass 'all' to clear the filter.
 * Updates pillar link active states and hides empty stream sections.
 * @param {string}      pillarId     - pillar key or 'all'
 * @param {HTMLElement} pillarsWidget - the widget element (for active-state update)
 */
AJSLab.filterByPillar = function (pillarId, pillarsWidget) {
  /* Mark / unmark cards */
  Array.from(document.querySelectorAll('.article-card')).forEach(function (card) {
    var match = pillarId === 'all' || card.getAttribute('data-pillar') === pillarId;
    card.classList.toggle('pillar-hidden', !match);
  });

  /* Reset carousel pagination for every section */
  Array.from(document.querySelectorAll('.section-carousel')).forEach(function (c) {
    if (c._reRender) c._reRender();
  });

  /* Hide stream sections that have no visible cards */
  Array.from(document.querySelectorAll('.stream-section')).forEach(function (section) {
    var visible = section.querySelectorAll('.article-card:not(.pillar-hidden)').length;
    section.style.display = visible ? '' : 'none';
  });

  /* Update active state on pillar links */
  if (pillarsWidget) {
    Array.from(pillarsWidget.querySelectorAll('[data-pillar-filter]')).forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-pillar-filter') === pillarId);
    });
  }
};
