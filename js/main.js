(function () {
  'use strict';
  // Menu del movil
  var btn = document.querySelector('.top__burger'), nav = document.getElementById('nav');
  if (btn && nav) {
    function set(open) { nav.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); }
    btn.addEventListener('click', function () { set(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  // Visor de fotos de la galeria
  var lb = document.querySelector('.lightbox'), links = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (lb && links.length && typeof lb.showModal === 'function') {
    var img = lb.querySelector('img'), cur = 0;
    function show(i) { cur = (i + links.length) % links.length; img.src = links[cur].href; img.alt = links[cur].querySelector('img').alt; }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); show(i); lb.showModal(); });
    });
    lb.querySelector('.lightbox__x').addEventListener('click', function () { lb.close(); });
    lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(cur + 1); else if (e.key === 'ArrowLeft') show(cur - 1); });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); sx = null; }, { passive: true });
  }
})();
