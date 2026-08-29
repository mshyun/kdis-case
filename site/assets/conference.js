/* Conference page: session filter (FLIP), the player modal, and the URL
   plumbing that makes a single talk shareable.
   Without JS the grid still lists all 13 talks — nothing here is load-bearing
   for the content itself. */
(function () {
  'use strict';

  var APN = window.APN || {};
  var isReduced = APN.isReduced || function () { return false; };
  var TOTAL_TALKS = 13;

  /* ---------------------------------------------------------- the filter */

  var filters = document.querySelector('.filters');
  var grid = document.querySelector('[data-grid]');
  var chips = document.querySelectorAll('[data-filter]');
  var chipRail = document.querySelector('.filters__chips');
  var countLabel = document.querySelector('[data-count-label]');

  function updateCount() {
    if (!countLabel || !grid) return;
    var shown = grid.querySelectorAll('.card:not([hidden])').length;
    countLabel.textContent = 'Showing ' + shown + ' of ' + TOTAL_TALKS + ' talks';
  }

  function applyFilter(value) {
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
    var animate = !isReduced();

    var first = new Map();
    if (animate) {
      cards.forEach(function (c) { if (!c.hidden) first.set(c, c.getBoundingClientRect()); });
    }

    cards.forEach(function (c) {
      c.hidden = !(value === 'all' || c.getAttribute('data-track') === value);
    });

    // FLIP. GSAP owns card transforms elsewhere (the hover tilt), so when it is
    // present the move goes through it too — two writers on one transform is
    // what makes this kind of thing stutter.
    if (animate) {
      var g = window.gsap;
      cards.forEach(function (c) {
        if (c.hidden) return;
        var last = c.getBoundingClientRect();
        var was = first.get(c);
        var dx = was ? was.left - last.left : 0;
        var dy = was ? was.top - last.top : 0;

        if (g) {
          if (was) {
            if (!dx && !dy) return;
            g.fromTo(c, { x: dx, y: dy }, { x: 0, y: 0, duration: .45, ease: 'power2.out' });
          } else {
            g.fromTo(c, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .4, ease: 'power2.out' });
          }
          return;
        }

        c.style.transition = 'none';
        if (was) {
          if (!dx && !dy) { c.style.transition = ''; return; }
          c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        } else {
          c.style.opacity = '0';
          c.style.transform = 'scale(.96)';
        }
        requestAnimationFrame(function () {
          c.style.transition = ''; c.style.transform = ''; c.style.opacity = '';
        });
      });
    }

    updateCount();
  }

  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      Array.prototype.forEach.call(chips, function (other) {
        var on = other === chip;
        other.classList.toggle('is-active', on);
        other.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  updateCount();

  /* ------------------------------------------ chip rail scroll affordance */

  if (filters && chipRail) {
    ['start', 'end'].forEach(function (side) {
      var f = document.createElement('span');
      f.className = 'filters__fade filters__fade--' + side;
      f.setAttribute('aria-hidden', 'true');
      filters.appendChild(f);
    });

    var syncFades = function () {
      var max = chipRail.scrollWidth - chipRail.clientWidth;
      filters.classList.toggle('can-scroll-start', chipRail.scrollLeft > 4);
      filters.classList.toggle('can-scroll-end', max > 4 && chipRail.scrollLeft < max - 4);
    };
    chipRail.addEventListener('scroll', syncFades, { passive: true });
    window.addEventListener('resize', syncFades, { passive: true });
    syncFades();

    chipRail.addEventListener('focusin', function (e) {
      if (e.target.scrollIntoView) e.target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  /* ----------------------------------------------------------- the modal */

  var modal = document.querySelector('[data-modal]');
  if (!modal) return;

  var mount = modal.querySelector('[data-modal-video]');
  var elTag = modal.querySelector('[data-modal-tag]');
  var elTrack = modal.querySelector('[data-modal-trackname]');
  var elTitle = modal.querySelector('[data-modal-title]');
  var elSpeaker = modal.querySelector('[data-modal-speaker]');
  var elRole = modal.querySelector('[data-modal-role]');
  var elSlides = modal.querySelector('[data-modal-slides]');
  var elSlidesMeta = modal.querySelector('[data-modal-slides-meta]');
  var elWatch = modal.querySelector('[data-modal-watch]');
  var closeBtn = modal.querySelector('.modal__close');

  var lastFocused = null;
  var pushed = 0;              // history entries this page added

  var HASH = /^#talk\/([A-Za-z0-9_-]{5,24})$/;
  function idFromHash() { var m = HASH.exec(window.location.hash); return m ? m[1] : null; }
  function openerFor(id) { return document.querySelector('.card__open[data-video="' + id + '"]'); }
  function bareUrl() { return window.location.pathname + window.location.search; }

  function render(btn, autoplay) {
    var d = btn.dataset;

    elTag.textContent = d.tag || '';
    elTrack.textContent = d.trackname || '';
    elTitle.textContent = d.title || '';
    elSpeaker.textContent = d.speaker || '';
    elRole.textContent = d.role || '';

    if (d.slides) {
      elSlides.hidden = false;
      elSlides.href = d.slides;
      elSlidesMeta.hidden = false;
      elSlidesMeta.textContent = d.slidesMeta || '';
    } else {
      elSlides.hidden = true;
      elSlidesMeta.hidden = true;
    }

    // Always offer the direct link: if the video is pulled, made private, or
    // blocked from embedding, the iframe shows YouTube's own error and this is
    // the only way through.
    if (elWatch) elWatch.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(d.video);

    // Safe: video ids come from our own build and are [A-Za-z0-9_-] only.
    mount.style.backgroundImage = 'url("media/thumbs/' + d.video + '.jpg")';

    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(d.video) +
      '?rel=0&modestbranding=1' + (autoplay ? '&autoplay=1' : '');
    frame.title = d.title || 'Session video';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    mount.replaceChildren(frame);
  }

  // `history:false` means the change came from the browser (popstate or a
  // direct load), so we must not push another entry.
  function open(btn, opts) {
    opts = opts || {};
    var wasOpen = !modal.hidden;
    render(btn, opts.autoplay !== false);

    if (!wasOpen) {
      lastFocused = document.activeElement;
      modal.hidden = false;
      if (APN.scrollLock) APN.scrollLock.on();
      closeBtn.focus();
    }

    if (opts.history !== false) {
      window.history.pushState({ talk: btn.dataset.video }, '', '#talk/' + btn.dataset.video);
      pushed++;
    }
  }

  function teardown() {
    modal.hidden = true;
    mount.replaceChildren();          // removing the iframe is what stops playback
    if (APN.scrollLock) APN.scrollLock.off();
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    lastFocused = null;
  }

  function close(opts) {
    opts = opts || {};
    if (modal.hidden) return;

    if (opts.history === false) { teardown(); return; }

    if (pushed > 0) {
      window.history.back();          // popstate finishes the close
    } else {
      // Arrived straight on #talk/… — there is nothing of ours to go back to.
      window.history.replaceState(null, '', bareUrl());
      teardown();
    }
  }

  window.addEventListener('popstate', function () {
    if (pushed > 0) pushed--;
    var id = idFromHash();
    if (id) {
      var btn = openerFor(id);
      if (btn) { open(btn, { history: false, autoplay: false }); return; }
    }
    if (!modal.hidden) teardown();
  });

  document.addEventListener('click', function (e) {
    var opener = e.target.closest ? e.target.closest('.card__open') : null;
    if (opener && opener.dataset.video) { e.preventDefault(); open(opener); return; }
    if (e.target.closest && e.target.closest('[data-modal-close]')) { e.preventDefault(); close(); }
  });

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab' && APN.trapFocus) APN.trapFocus(modal, e);
  });

  /* --------------------------------------------------- download feedback */

  if (elSlides) {
    elSlides.addEventListener('click', function () {
      // A 13 MB deck can sit silent for a while before the browser reacts.
      if (elSlides.classList.contains('is-working')) return;
      var original = elSlides.lastChild;
      elSlides.classList.add('is-working');
      var was = original && original.nodeType === 3 ? original.nodeValue : null;
      if (was !== null) original.nodeValue = 'Starting…';
      setTimeout(function () {
        elSlides.classList.remove('is-working');
        if (was !== null) original.nodeValue = was;
      }, 2200);
    });
  }

  /* ------------------------------------- open straight from a shared link */

  (function fromUrl() {
    var id = idFromHash();
    if (!id) return;
    var btn = openerFor(id);
    if (!btn) { window.history.replaceState(null, '', bareUrl()); return; }
    open(btn, { history: false, autoplay: false });
  })();
})();
