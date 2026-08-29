/* Animated contour field behind the hero.
   Layered sines drawn on a canvas — reads as drifting topographic lines,
   the same motif the static mockup used, now in motion.
   Pauses when off-screen or when the tab is hidden; frozen flat for
   prefers-reduced-motion. */
(function () {
  'use strict';

  var host = document.querySelector('[data-waves]');
  if (!host || !window.requestAnimationFrame) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var canvas = document.createElement('canvas');
  canvas.className = 'waves__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var LINES = 11;
  var TEAL = '175,199,184';          // --teal-light
  var w = 0, h = 0, dpr = 1;
  var t = 0;                          // animation clock
  var pointer = { x: .5, y: .5, tx: .5, ty: .5 };
  var raf = 0, visible = true, running = false;

  function resize() {
    var r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // One contour: three sines of different periods stacked, so the line never
  // looks like a plain sine wave.
  function contour(i, time, driftX, driftY) {
    var span = h * 0.075;
    var y0 = h * 0.40 + i * span + driftY * (12 + i * 1.5);
    var amp = (46 - i * 2.2) * (h / 730);
    var phase = time * (0.22 + i * 0.012) + i * 0.55;
    var step = w > 900 ? 8 : 12;

    ctx.beginPath();
    for (var x = -24; x <= w + 24; x += step) {
      var u = (x / Math.max(w, 1)) + driftX * 0.06;
      var y = y0
        + Math.sin(u * 5.2 + phase) * amp
        + Math.sin(u * 11.4 - phase * 1.35) * amp * 0.30
        + Math.sin(u * 2.6 + phase * 0.62) * amp * 0.55;
      if (x === -24) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(' + TEAL + ',' + (0.78 - i * 0.030).toFixed(3) + ')';
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  // The fan of short strokes in the upper right — terraced rows in perspective.
  function rows(time, driftX) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(' + TEAL + ',.42)';
    for (var i = 0; i < 14; i++) {
      var sway = Math.sin(time * 0.5 + i * 0.42) * 6;
      var x = w * 0.62 + i * (w * 0.031) + driftX * 18 + sway;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.06);
      ctx.lineTo(x + w * 0.055, h * 0.33);
      ctx.stroke();
    }
  }

  function sun(time, driftX, driftY) {
    var r = h * 0.19 + Math.sin(time * 0.35) * (h * 0.006);
    ctx.beginPath();
    ctx.arc(w * 0.80 + driftX * 26, h * 0.20 + driftY * 18, Math.max(r, 4), 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(' + TEAL + ',.48)';
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }

  function paint(time) {
    ctx.clearRect(0, 0, w, h);
    var dx = (pointer.x - 0.5) * 2;
    var dy = (pointer.y - 0.5) * 2;
    sun(time, dx, dy);
    rows(time, dx);
    for (var i = 0; i < LINES; i++) contour(i, time, dx, dy);
  }

  function frame() {
    // ease the pointer so parallax glides rather than snaps
    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;
    t += 0.0085;
    paint(t);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduced.matches) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function sync() {
    if (reduced.matches) { stop(); paint(0); return; }
    if (visible && !document.hidden) start(); else stop();
  }

  resize();
  paint(0);
  sync();

  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); paint(t); }, 150);
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 }).observe(host);
  }

  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);

  if (window.matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      pointer.tx = e.clientX / Math.max(window.innerWidth, 1);
      pointer.ty = e.clientY / Math.max(window.innerHeight, 1);
    }, { passive: true });
  }
})();
