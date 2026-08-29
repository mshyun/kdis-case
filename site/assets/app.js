/* Shared behaviour: header, scroll progress, reveals, counters, mobile menu,
   cursor glow. Everything degrades to a readable static page without JS. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var isReduced = function () { return reduced.matches; };

  /* ------------------------------------------------------ shared helpers */

  var scrollLock = (function () {
    var depth = 0, y = 0;
    return {
      on: function () {
        if (depth++ > 0) return;
        y = window.scrollY;
        var bar = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = bar > 0 ? bar + 'px' : '';
        document.body.classList.add('is-locked');
        if (window.APN && window.APN.pauseScroll) window.APN.pauseScroll();
      },
      off: function () {
        if (--depth > 0) return;
        depth = 0;
        document.body.classList.remove('is-locked');
        document.body.style.paddingRight = '';
        window.scrollTo(0, y);
        if (window.APN && window.APN.resumeScroll) window.APN.resumeScroll();
      },
    };
  })();

  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function trapFocus(container, event) {
    var items = Array.prototype.filter.call(
      container.querySelectorAll(FOCUSABLE),
      function (el) { return el.offsetParent !== null || el === document.activeElement; }
    );
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  window.APN = { scrollLock: scrollLock, trapFocus: trapFocus, isReduced: isReduced };

  /* ------------------------------------------------ header + progress bar */

  var header = document.querySelector('[data-header]');
  var progress = document.querySelector('[data-progress] span');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 80);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(1, y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Reveals, counters and scroll choreography live in motion.js, which only
     engages once GSAP is confirmed loaded. Nothing here depends on it.
     --------------------------------------------------------------------- */

  /* ----------------------------------------------------------- menu sheet */

  var sheet = document.querySelector('[data-menu]');
  var openBtn = document.querySelector('[data-menu-open]');

  if (sheet && openBtn) {
    var closeMenu = function () {
      sheet.hidden = true;
      openBtn.setAttribute('aria-expanded', 'false');
      scrollLock.off();
      openBtn.focus();
    };

    openBtn.addEventListener('click', function () {
      sheet.hidden = false;
      openBtn.setAttribute('aria-expanded', 'true');
      scrollLock.on();
      var close = sheet.querySelector('[data-menu-close]');
      if (close) close.focus();
    });

    Array.prototype.forEach.call(sheet.querySelectorAll('[data-menu-close]'), function (el) {
      el.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (sheet.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
      else if (e.key === 'Tab') trapFocus(sheet, e);
    });

    // A resize past the breakpoint leaves the sheet stranded; close it.
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
      if (e.matches && !sheet.hidden) closeMenu();
    });
  }

  /* ---------------------------------------------------------- cursor glow */

  var glow = document.querySelector('[data-glow]');
  if (glow && !isReduced() && window.matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    var gx = 0, gy = 0, pending = false;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      gx = e.clientX; gy = e.clientY;
      document.body.classList.add('has-pointer');
      if (!pending) {
        pending = true;
        requestAnimationFrame(function () {
          glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
          pending = false;
        });
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------ countdown */

  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var clock = cd.querySelector('[data-countdown-clock]');
    var label = cd.querySelector('[data-countdown-label]');
    var units = {
      days: cd.querySelector('[data-unit="days"]'),
      hours: cd.querySelector('[data-unit="hours"]'),
      minutes: cd.querySelector('[data-unit="minutes"]'),
      seconds: cd.querySelector('[data-unit="seconds"]'),
    };
    var closesAt = Date.parse(cd.getAttribute('data-deadline'));

    var pad = function (n) { return n < 10 ? '0' + n : String(n); };

    // Always counts to the submission deadline — that is the date people are
    // actually racing, whether or not submissions have opened yet.
    var tick = function () {
      var now = Date.now();

      if (isNaN(closesAt)) { clock.hidden = true; return true; }

      if (now >= closesAt) {
        label.textContent = 'Submissions are closed';
        label.classList.add('is-closed');
        clock.hidden = true;
        return true;                       // stop ticking
      }

      var sec = Math.floor(Math.max(0, closesAt - now) / 1000);
      label.textContent = 'Submission deadline in';
      units.days.textContent = String(Math.floor(sec / 86400));
      units.hours.textContent = pad(Math.floor(sec / 3600) % 24);
      units.minutes.textContent = pad(Math.floor(sec / 60) % 60);
      units.seconds.textContent = pad(sec % 60);
      clock.hidden = false;
      return false;
    };

    if (!tick()) {
      var timer = setInterval(function () { if (tick()) clearInterval(timer); }, 1000);
      // Don't burn a timer on a tab nobody is looking at.
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { clearInterval(timer); }
        else { tick(); timer = setInterval(function () { if (tick()) clearInterval(timer); }, 1000); }
      });
    }
  }
})();
