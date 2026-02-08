(function () {
  'use strict';

  var CODESTER_PROFILE_URL = 'https://www.codester.com/seenivasan/';
  var CODESTER_TOAST_MESSAGE = 'Opening official Codester store';
  var CODESTER_TOAST_MS = 1500;
  var THEME_KEY = 'seenios-theme';
  var THEME_TOAST_MS = 2000;
  var THEME_TOAST_MESSAGE = 'Theme applied. Imagine your product in this style.';
  var VALID_THEMES = ['startup-blue', 'saas-purple', 'fintech-green', 'business-orange', 'premium-red', 'dark-pro', 'clean-light', 'midnight-cyan'];
  var DEBOUNCE_MS = 120;

  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navLinkItems = document.querySelectorAll('.nav-link');
  var sidebarLinks = document.querySelectorAll('.sidebar-link');
  var sections = document.querySelectorAll('.panel');
  var statValues = document.querySelectorAll('.stat-value[data-target]');
  var themeSettingsBtn = document.getElementById('theme-settings-btn');
  var themeSidePanel = document.getElementById('theme-side-panel');
  var themePresets = document.querySelectorAll('.theme-preset');
  var themeToast = document.getElementById('theme-toast');
  var toastTimer = null;

  function debounce(fn, ms) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }

  function isCodesterErrorUrl(url) {
    if (!url || typeof url !== 'string') return false;
    var lower = url.toLowerCase();
    return lower.indexOf('codester.com') !== -1 && (lower.indexOf('/error') !== -1 || lower.indexOf('/error/') !== -1);
  }

  function safeCodesterOpen(url) {
    return isCodesterErrorUrl(url) ? CODESTER_PROFILE_URL : url;
  }

  var nativeOpen = window.open;
  window.open = function (url, target, features) {
    if (url && typeof url === 'string' && url.indexOf('codester.com') !== -1) {
      url = safeCodesterOpen(url);
    }
    return nativeOpen.call(window, url, target, features);
  };

  function sanitizeCodesterLinks() {
    var links = document.querySelectorAll('a[href*="codester.com"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      if (isCodesterErrorUrl(href) || href !== CODESTER_PROFILE_URL) {
        links[i].setAttribute('href', CODESTER_PROFILE_URL);
      }
    }
  }

  function showToast(message, duration) {
    if (!themeToast) return;
    if (toastTimer) clearTimeout(toastTimer);
    themeToast.textContent = message || THEME_TOAST_MESSAGE;
    themeToast.classList.add('is-visible');
    toastTimer = setTimeout(function () {
      themeToast.classList.remove('is-visible');
      toastTimer = null;
    }, duration || THEME_TOAST_MS);
  }

  function openCodesterProfile() {
    window.open(CODESTER_PROFILE_URL, '_blank', 'noopener,noreferrer');
    showToast(CODESTER_TOAST_MESSAGE, CODESTER_TOAST_MS);
  }

  function initCodesterButtons() {
    var elements = document.querySelectorAll('[data-codester="true"]');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', function (e) {
        e.preventDefault();
        openCodesterProfile();
      });
    }
  }

  function toggleMenu() {
    if (!navLinks) return;
    navLinks.classList.toggle('is-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('is-open'));
  }

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('is-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  function setActiveSection() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var headerOffset = 80;
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var top = section.offsetTop - headerOffset;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) current = section.getAttribute('id');
    }
    var navHash = current ? '#' + current : '#status';
    for (var j = 0; j < navLinkItems.length; j++) {
      navLinkItems[j].classList.toggle('active', navLinkItems[j].getAttribute('href') === navHash);
    }
    for (var k = 0; k < sidebarLinks.length; k++) {
      var link = sidebarLinks[k];
      if (link.getAttribute('href') === navHash) link.classList.add('active');
      else link.classList.remove('active');
    }
  }

  function animateValue(el, target, duration, isDecimal) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 2);
      var current = start + (target - start) * easeOut;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  function runCounters() {
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (!entry.isIntersecting) continue;
          var el = entry.target;
          if (el.dataset.animated) continue;
          el.dataset.animated = '1';
          var target = parseFloat(el.getAttribute('data-target')) || 0;
          animateValue(el, target, 1200, el.hasAttribute('data-decimal'));
        }
      },
      { rootMargin: '0px', threshold: 0.2 }
    );
    for (var j = 0; j < statValues.length; j++) {
      if (!statValues[j].classList.contains('stat-mode')) observer.observe(statValues[j]);
    }
  }

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function setTheme(theme) {
    if (VALID_THEMES.indexOf(theme) === -1) theme = 'dark-pro';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    setActiveThemeInPanel(theme);
  }

  function setActiveThemeInPanel(theme) {
    for (var i = 0; i < themePresets.length; i++) {
      var t = themePresets[i].getAttribute('data-theme');
      themePresets[i].classList.toggle('is-active', t === theme);
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored && VALID_THEMES.indexOf(stored) !== -1) setTheme(stored);
    else setActiveThemeInPanel('dark-pro');

    if (themeSettingsBtn && themeSidePanel) {
      themeSettingsBtn.addEventListener('click', function () {
        var isOpen = themeSidePanel.classList.toggle('is-open');
        themeSidePanel.setAttribute('aria-hidden', !isOpen);
      });
    }

    for (var i = 0; i < themePresets.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var theme = btn.getAttribute('data-theme');
          if (theme) {
            setTheme(theme);
            showToast(THEME_TOAST_MESSAGE, THEME_TOAST_MS);
            themeSidePanel.classList.remove('is-open');
            themeSidePanel.setAttribute('aria-hidden', 'true');
          }
        });
      })(themePresets[i]);
    }
  }

  function initNavLinks() {
    for (var i = 0; i < navLinkItems.length; i++) {
      navLinkItems[i].addEventListener('click', function () {
        if ((this.getAttribute('href') || '').charAt(0) === '#') closeMenu();
      });
    }
    for (var k = 0; k < sidebarLinks.length; k++) {
      sidebarLinks[k].addEventListener('click', closeMenu);
    }
  }

  function onDomReady() {
    sanitizeCodesterLinks();
    initCodesterButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDomReady);
  } else {
    onDomReady();
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

  window.addEventListener('scroll', debounce(setActiveSection, DEBOUNCE_MS));
  window.addEventListener('resize', debounce(closeMenu, DEBOUNCE_MS));
  setActiveSection();
  runCounters();
  initTheme();
  initNavLinks();
})();
