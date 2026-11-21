/* Shirley's Soul Food Cafe — shared behaviour */
(function () {
  'use strict';

  /* mobile nav */
  var head = document.getElementById('head');
  var toggle = document.getElementById('navToggle');
  if (head && toggle) {
    toggle.addEventListener('click', function () {
      var open = head.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        head.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* highlight today's hours */
  var list = document.getElementById('hoursList');
  if (list) {
    var today = new Date().getDay();
    var row = list.querySelector('[data-day="' + today + '"]');
    if (row) row.classList.add('today');
  }

  /* gallery lightbox */
  var box = document.getElementById('lightbox');
  if (box) {
    var img = document.getElementById('lbImg');
    var cap = document.getElementById('lbCap');
    var close = document.getElementById('lbClose');

    document.querySelectorAll('.gallery-grid figure').forEach(function (fig) {
      fig.addEventListener('click', function () {
        var full = fig.getAttribute('data-full');
        var caption = fig.querySelector('figcaption');
        img.src = full;
        img.alt = fig.querySelector('img') ? fig.querySelector('img').alt : '';
        cap.textContent = caption ? caption.textContent : '';
        box.classList.add('on');
        document.body.style.overflow = 'hidden';
      });
    });

    function hide() {
      box.classList.remove('on');
      document.body.style.overflow = '';
      img.src = '';
    }
    close.addEventListener('click', hide);
    box.addEventListener('click', function (e) { if (e.target === box) hide(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  }
})();
