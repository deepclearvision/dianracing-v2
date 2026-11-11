/* Dhian Singh Pahal — site behaviour. Small, dependency-free, resilient. */
(function () {
  'use strict';
  var d = document;
  d.documentElement.classList.add('js');

  /* ---- header state on scroll ---- */
  var head = d.querySelector('.site-head');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('scrolled', (window.scrollY || 0) > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile menu ---- */
  var burger = d.querySelector('.burger');
  var menu = d.querySelector('.mobile-menu');
  if (burger && menu) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('open', open);
      d.body.classList.toggle('no-scroll', open);
    };
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ---- reveal on scroll (safe: everything is visible without JS) ---- */
  var revealEls = d.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---- copy buttons ---- */
  var copy = function (text, btn) {
    var done = function () {
      var old = btn.textContent;
      btn.textContent = 'COPIED';
      window.setTimeout(function () { btn.textContent = old; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { done(); });
    } else {
      var ta = d.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      d.body.appendChild(ta);
      ta.select();
      try { d.execCommand('copy'); } catch (e) { /* ignore */ }
      d.body.removeChild(ta);
      done();
    }
  };

  d.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = d.getElementById(btn.getAttribute('data-copy'));
      if (!target) return;
      var v = typeof target.value === 'string' ? target.value : target.textContent;
      copy(String(v).trim(), btn);
    });
  });

  /* ---- partnership enquiry form ---- */
  var form = d.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) {
        var f = form.querySelector('[name="' + id + '"]');
        return f ? String(f.value || '').trim() : '';
      };
      var lines = [
        'PARTNERSHIP ENQUIRY — dsp website',
        '',
        'Name: ' + get('name'),
        'Organisation: ' + get('org'),
        'Email: ' + get('email'),
        'Phone: ' + (get('phone') || '—'),
        'Interest: ' + (get('interest') || 'Partnership'),
        '',
        'Message:',
        get('message') || '—'
      ];
      var text = lines.join('\n');
      var out = d.getElementById('form-output');
      var outText = d.getElementById('form-output-text');
      if (out && outText) {
        outText.value = text;
        out.hidden = false;
      }
      var ml = d.getElementById('mailto-link');
      if (ml) {
        ml.setAttribute('href', 'mailto:dhianracing@outlook.com?subject=' +
          encodeURIComponent('Partnership enquiry — ' + (get('org') || get('name') || 'DSP website')) +
          '&body=' + encodeURIComponent(text));
      }
      var btn = form.querySelector('.btn');
      if (btn) {
        btn.textContent = 'DRAFT READY — SEE BELOW';
        window.setTimeout(function () {
          btn.textContent = 'SEND ENQUIRY';
        }, 2600);
      }
      if (out) {
        var r = out.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + r.top - 110, behavior: 'smooth' });
      }
    });
  }

  /* ---- footer year ---- */
  var yr = d.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
