/*
  Site behaviour: nav scroll state, reveal-on-scroll, mobile menu, contact form.
  Loaded AFTER partials.js so the injected nav/footer/menu already exist.
*/
(function () {
  /* ── Nav scroll effect ── */
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reveal on scroll ── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add('visible'); }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Mobile menu ── */
  var menu = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger');
  var closeBtn = document.getElementById('mobile-close');

  function openMenu() {
    if (!menu) return;
    menu.classList.add('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) {
    // Close when any link inside is tapped (links navigate to real pages).
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Contact form (only present on contact.html) ── */
  var form = document.getElementById('contact-form');
  var formContainer = document.getElementById('form-container');
  var successContainer = document.getElementById('success-container');
  var resetBtn = document.getElementById('reset-form-btn');

  function showForm() {
    if (formContainer) formContainer.style.display = 'block';
    if (successContainer) successContainer.style.display = 'none';
    if (form) form.reset();
  }
  function showSuccess() {
    if (formContainer) formContainer.style.display = 'none';
    if (successContainer) successContainer.style.display = 'block';
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var action = form.getAttribute('action');

      // Until the real Formspree ID is set, don't pretend to deliver — tell the user.
      if (!action || action.indexOf('REPLACE_WITH_FORM_ID') !== -1) {
        alert('This contact form is not connected yet. Please email anupama@anupamamd.com directly for now.');
        return;
      }

      try {
        var res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          showSuccess();
        } else {
          alert('Something went wrong. Please try again, or email anupama@anupamamd.com.');
        }
      } catch (err) {
        alert('Oops — something went wrong. Please try again or email anupama@anupamamd.com.');
      }
    });

    if (resetBtn) resetBtn.addEventListener('click', showForm);
  }
})();
