/*
  Shared nav + footer for every page.
  Markup is built from JS template strings (NOT fetch()), so it works on
  GitHub Pages over HTTP and also when opening files directly over file://.

  Each page includes:
    <header id="site-nav"></header>
    <div id="mobile-menu-mount"></div>
    <footer id="site-footer"></footer>
  ...and this script fills them in.

  NOTE: Instagram handle is standardized to @anupamamd here. The original site
  had three conflicting values (@anupamamy, /anupamam, none). Confirm the
  correct handle with the owner and update SOCIAL.instagram below.
*/
(function () {
  // Are we inside the /legal/ folder? If so, links need a "../" prefix.
  var inLegal = /\/legal\//.test(location.pathname);
  var base = inLegal ? '../' : '';

  // Current file name (e.g. "coaching.html"); treat "/" as index.html.
  var file = location.pathname.split('/').pop();
  if (!file) file = 'index.html';

  var SOCIAL = {
    instagram: 'https://instagram.com/anupamamd',
    instagramHandle: '@anupamamd',
    linkedin: 'https://www.linkedin.com/in/anupamamd/',
    email: 'anupama@anupamamd.com'
  };

  var navItems = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'coaching.html', label: 'Coaching' },
    { href: 'speaking.html', label: 'Speaking' }
  ];

  function isActive(href) {
    if (inLegal) return false;
    if (href === 'index.html') return file === 'index.html' || file === '';
    return file === href;
  }

  function navLinkMarkup(item) {
    var current = isActive(item.href) ? ' aria-current="page"' : '';
    return '<li><a href="' + base + item.href + '"' + current + '>' + item.label + '</a></li>';
  }

  var contactActive = (!inLegal && file === 'contact.html') ? ' aria-current="page"' : '';

  /* ── NAV ── */
  var navHTML =
    '<nav id="main-nav">' +
      '<a class="nav-logo" href="' + base + 'index.html">Anupama Mohanram, MD</a>' +
      '<ul class="nav-links">' +
        navItems.map(navLinkMarkup).join('') +
        '<li><a href="' + base + 'contact.html" class="nav-cta"' + contactActive + '>Connect</a></li>' +
      '</ul>' +
      '<button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>';

  /* ── MOBILE MENU ── */
  var mobileLinks = navItems.concat([{ href: 'contact.html', label: 'Connect with Me' }]);
  var mobileHTML =
    '<div class="mobile-menu" id="mobile-menu">' +
      '<button class="mobile-close" id="mobile-close" aria-label="Close menu">✕</button>' +
      mobileLinks.map(function (item) {
        return '<a href="' + base + item.href + '">' + item.label + '</a>';
      }).join('') +
    '</div>';

  /* ── FOOTER ── */
  var footerHTML =
    '<div class="footer-inner">' +
      '<div class="footer-brand">' +
        '<p>Limelight &amp; Leaf</p>' +
        '<span>Physician &middot; Certified Life Coach &middot; Speaker</span>' +
        '<span style="margin-top:10px;">Helping high-achieving professionals find<br>confidence, balance, and peace of mind.</span>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Navigate</h4>' +
        '<ul>' +
          '<li><a href="' + base + 'about.html">About</a></li>' +
          '<li><a href="' + base + 'coaching.html">Coaching</a></li>' +
          '<li><a href="' + base + 'speaking.html">Speaking</a></li>' +
          '<li><a href="' + base + 'contact.html">Contact</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Legal</h4>' +
        '<ul>' +
          '<li><a href="' + base + 'legal/privacy.html">Privacy Policy</a></li>' +
          '<li><a href="' + base + 'legal/terms.html">Terms of Service</a></li>' +
          '<li><a href="' + base + 'legal/cookies.html">Cookie Policy</a></li>' +
          '<li><a href="' + base + 'legal/disclaimer.html">Disclaimer</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Connect</h4>' +
        '<ul>' +
          '<li><a href="' + SOCIAL.instagram + '" target="_blank" rel="noopener">Instagram</a></li>' +
          '<li><a href="' + SOCIAL.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
          '<li><a href="' + base + 'contact.html">Send a message</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<p>&copy; 2026 Limelight &amp; Leaf</p>' +
    '</div>';

  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  inject('site-nav', navHTML);
  inject('mobile-menu-mount', mobileHTML);
  inject('site-footer', footerHTML);

  // Expose social config for any page-level scripts (e.g. contact mailto).
  window.LL_SOCIAL = SOCIAL;
})();
