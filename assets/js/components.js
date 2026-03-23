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
