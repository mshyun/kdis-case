/* Scroll choreography: Lenis for inertial scrolling, GSAP + ScrollTrigger for
   entrances, parallax and scrubbed effects.

   Everything here is additive. `.has-motion` is only set once GSAP is confirmed
   present, and the stylesheet hides nothing until that class exists — so a
   blocked or failed script leaves a complete, readable page. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (!hasGsap || reduced.matches) return;   // CSS fallback already shows everything

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  var ST = window.ScrollTrigger;

  root.classList.add('has-motion');

  /* ------------------------------------------------ inertial scrolling */

  var lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // The modal and menu lock the page; Lenis has to be told.
    window.APN = window.APN || {};
    window.APN.pauseScroll = function () { lenis.stop(); };
    window.APN.resumeScroll = function () { lenis.start(); };

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]:not([href="#"])');
      if (!a) return;
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
    });
  }

  /* -------------------------------------------------- word-split titles */

  function splitWords(el) {
    if (el.dataset.split === 'done') return [];
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    var spans = words.map(function (word, i) {
      var outer = document.createElement('span');
      outer.className = 'word';
      var inner = document.createElement('span');
      inner.textContent = word;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      return inner;
    });
    el.dataset.split = 'done';
    return spans;
  }

  /* ------------------------------------------------------ hero entrance */

  var hero = document.querySelector('.hero');
  if (hero) {
    var lines = hero.querySelectorAll('.display--hero .line > span');
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(hero.querySelectorAll('.eyebrow'), { y: 16, opacity: 0, duration: .7, stagger: .07 })
      .from(lines, { yPercent: 108, duration: 1.05, stagger: .085, ease: 'expo.out' }, '-=.42')
      .from(hero.querySelectorAll('.hero__pull, .hero__sub, .hero__actions, .stats'),
        { y: 22, opacity: 0, duration: .8, stagger: .09 }, '-=.62');

    // the contour field drifts as the hero leaves
    var waves = hero.querySelector('[data-waves]');
    if (waves) {
      gsap.to(waves, {
        yPercent: 16, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
    gsap.to(hero.querySelector('.hero__inner'), {
      y: 60, opacity: .35, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* --------------------------------------------------- section reveals */

  ST.batch('.reveal', {
    start: 'top 86%',
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { opacity: 1, y: 0, duration: .85, stagger: .1, ease: 'power2.out', overwrite: true });
    },
  });

  // Section headings arrive word by word.
  gsap.utils.toArray('.display--section, .display--keynote, .display--closing').forEach(function (el) {
    var spans = splitWords(el);
    if (!spans.length) return;
    gsap.from(spans, {
      yPercent: 110, duration: .9, ease: 'expo.out', stagger: .045,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* --------------------------------------------------------- counters */

  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var box = { v: 0 };
    gsap.to(box, {
      v: target, duration: 1.1, ease: 'power2.out',
      onUpdate: function () { el.textContent = String(Math.round(box.v)); },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });

  /* ---------------------------------------------------------- parallax */

  var keyThumb = document.querySelector('.keynote__thumb img');
  if (keyThumb) {
    gsap.fromTo(keyThumb, { yPercent: -7 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: '.keynote', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  gsap.utils.toArray('.watch-thumb img').forEach(function (img, i) {
    gsap.fromTo(img, { yPercent: -4 - i }, {
      yPercent: 4 + i, ease: 'none',
      scrollTrigger: { trigger: img.closest('.watch-preview'), start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ------------------------------------------------- grid + list detail */

  var grid = document.querySelector('[data-grid]');
  if (grid) {
    ST.batch(grid.querySelectorAll('.card'), {
      start: 'top 92%',
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: .7, stagger: .07, ease: 'power2.out', overwrite: true });
      },
    });
  }

  // The timeline connector draws itself through the milestones.
  var timeline = document.querySelector('.timeline');
  if (timeline) {
    gsap.from(timeline.querySelectorAll('.timeline__step'), {
      opacity: 0, y: 18, duration: .6, stagger: .12, ease: 'power2.out',
      scrollTrigger: { trigger: timeline, start: 'top 82%', once: true },
    });
    gsap.from(timeline.querySelectorAll('.timeline__node'), {
      scale: 0, duration: .5, stagger: .12, ease: 'back.out(2.2)',
      scrollTrigger: { trigger: timeline, start: 'top 82%', once: true },
    });
  }

  gsap.utils.toArray('.awards tbody tr').forEach(function (row, i) {
    gsap.from(row, {
      opacity: 0, y: 14, duration: .55, delay: i * .06, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 94%', once: true },
    });
  });

  /* --------------------------------------------------- marquee ticker */

  gsap.utils.toArray('[data-marquee]').forEach(function (track) {
    var inner = track.firstElementChild;
    if (!inner) return;
    inner.innerHTML += inner.innerHTML;          // duplicate for a seamless loop
    var loop = gsap.to(inner, {
      xPercent: -50, duration: 34, ease: 'none', repeat: -1,
    });
    ST.create({
      trigger: track, start: 'top bottom', end: 'bottom top',
      onToggle: function (self) { self.isActive ? loop.play() : loop.pause(); },
    });
  });

  /* ------------------------------------------------- pointer-led detail */

  var fine = window.matchMedia('(hover: hover) and (min-width: 900px)');

  if (fine.matches) {
    // Cards tip very slightly toward the cursor.
    gsap.utils.toArray('.card').forEach(function (card) {
      var thumb = card.querySelector('.card__thumb');
      gsap.set(card, { transformPerspective: 900, transformOrigin: 'center' });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        gsap.to(card, { rotateY: px * 5, rotateX: -py * 5, duration: .5, ease: 'power2.out' });
        if (thumb) gsap.to(thumb, { x: px * 8, y: py * 8, duration: .6, ease: 'power2.out' });
      });
      card.addEventListener('pointerleave', function () {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: .7, ease: 'power3.out' });
        if (thumb) gsap.to(thumb, { x: 0, y: 0, duration: .7, ease: 'power3.out' });
      });
    });

    // Buttons lean toward the pointer.
    gsap.utils.toArray('.btn, .chip-btn').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: ((e.clientX - r.left) / r.width - .5) * 10,
          y: ((e.clientY - r.top) / r.height - .5) * 6,
          duration: .4, ease: 'power2.out',
        });
      });
      btn.addEventListener('pointerleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1, .5)' });
      });
    });
  }

  /* --------------------------------------------------------- keep sane */

  window.addEventListener('load', function () { ST.refresh(); });
  reduced.addEventListener('change', function (e) { if (e.matches) window.location.reload(); });
})();
