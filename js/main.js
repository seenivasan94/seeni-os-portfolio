(function () {
  'use strict';

  var THEME_KEY = 'seenios-theme';
  var THEME_TOAST_MS = 2000;
  var THEME_TOAST_MESSAGE = 'Theme applied.';
  var THEME_COLORS = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    orange: '#f59e0b',
    red: '#ef4444',
    cyan: '#06b6d4',
    dark: '#6366f1'
  };

  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navLinkItems = document.querySelectorAll('.nav-link');
  var sidebarLinks = document.querySelectorAll('.sidebar-link');
  var sections = document.querySelectorAll('.panel');
  var themeSettingsBtn = document.getElementById('theme-settings-btn');
  var themeSidePanel = document.getElementById('theme-side-panel');
  var themePresets = document.querySelectorAll('.theme-preset');
  var themeToast = document.getElementById('theme-toast');
  var toastTimeout = null;

  function showToast(message, duration) {
    if (!themeToast) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    themeToast.textContent = message || THEME_TOAST_MESSAGE;
    themeToast.classList.add('is-visible');
    toastTimeout = setTimeout(function () {
      themeToast.classList.remove('is-visible');
      toastTimeout = null;
    }, duration || THEME_TOAST_MS);
  }

  function applyAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
    var r = parseInt(color.slice(1, 3), 16);
    var g = parseInt(color.slice(3, 5), 16);
    var b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty('--border', 'rgba(' + r + ',' + g + ',' + b + ',0.2)');
    document.documentElement.style.setProperty('--accent-soft', 'rgba(' + r + ',' + g + ',' + b + ',0.15)');
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setTheme(themeId) {
    var color = THEME_COLORS[themeId];
    if (!color) {
      themeId = 'dark';
      color = THEME_COLORS.dark;
    }
    applyAccentColor(color);
    try {
      localStorage.setItem(THEME_KEY, themeId);
    } catch (e) {}
    setActiveThemeInPanel(themeId);
  }

  function setActiveThemeInPanel(themeId) {
    for (var i = 0; i < themePresets.length; i++) {
      var t = themePresets[i].getAttribute('data-theme');
      themePresets[i].classList.toggle('is-active', t === themeId);
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored && THEME_COLORS[stored]) {
      setTheme(stored);
    } else {
      setTheme('dark');
    }

    if (themeSettingsBtn && themeSidePanel) {
      themeSettingsBtn.addEventListener('click', function () {
        var isOpen = themeSidePanel.classList.toggle('is-open');
        themeSidePanel.setAttribute('aria-hidden', !isOpen);
      });
    }

    for (var j = 0; j < themePresets.length; j++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var themeId = btn.getAttribute('data-theme');
          if (themeId) {
            setTheme(themeId);
            showToast(THEME_TOAST_MESSAGE, THEME_TOAST_MS);
            themeSidePanel.classList.remove('is-open');
            themeSidePanel.setAttribute('aria-hidden', 'true');
          }
        });
      })(themePresets[j]);
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
    var navHash = current ? '#' + current : '#hero';
    for (var k = 0; k < navLinkItems.length; k++) {
      navLinkItems[k].classList.toggle('active', navLinkItems[k].getAttribute('href') === navHash);
    }
    for (var m = 0; m < sidebarLinks.length; m++) {
      var link = sidebarLinks[m];
      link.classList.toggle('active', link.getAttribute('href') === navHash);
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

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

  window.addEventListener('scroll', setActiveSection);
  window.addEventListener('resize', closeMenu);
  setActiveSection();
  initTheme();
  initNavLinks();
})();
