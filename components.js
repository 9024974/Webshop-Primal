function injectNavbar(active) {
  const el = document.getElementById('navbar-placeholder');
  if (!el) return;

  el.innerHTML = `
  <!-- ===== NAVBAR ===== -->
  <nav class="navbar">

    <!-- Logo -->
    <a href="index.html" aria-label="PRIMAL home">
      <span class="navbar__logo-text">PRIMAL</span>
    </a>

    <!-- Verticale scheidingslijn -->
    <div class="navbar__div"></div>

    <!-- Navigatielinks -->
    <ul class="navbar__links">
      <li><a href="index.html"  ${active === 'home'        ? 'class="active"' : ''}>Home</a></li>
      <li><a href="shop.html"   ${active === 'shop'        ? 'class="active"' : ''}>Shop</a></li>
      <li><a href="shop.html"   ${active === 'collections' ? 'class="active"' : ''}>Collections</a></li>
    </ul>

    <!-- Rechterkant: login + iconen -->
    <div class="navbar__right">
      <!-- Login / gebruikersnaam -->
      <a href="login.html" id="nav-login"
         class="nav-login-link ${active === 'login' ? 'active' : ''}">Login</a>

      <!-- Add-product icoon (alleen zichtbaar als ingelogd) -->
      <a href="add-product.html" id="nav-add-btn" class="nav-add-btn" style="display:none;" title="Product toevoegen">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      </a>

      <!-- Scheidingslijn voor winkelmandje -->
      <div class="navbar__right-div"></div>

      <!-- Winkelmandicoon -->
      <a href="cart.html" class="nav-cart-btn" title="Winkelmandje" aria-label="Winkelmandje">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <!-- Badge: aantal artikelen -->
        <span id="cart-badge" class="cart-badge">0</span>
      </a>
    </div>

    <!-- Hamburger knop (mobiel) -->
    <button class="nav-hamburger" id="hamburger" aria-label="Menu openen">
      <span></span><span></span><span></span>
    </button>

  </nav>

  <!-- Mobiel uitklapmenu -->
  <div class="navbar__mobile" id="mobile-menu">
    <a href="index.html">Home</a>
    <a href="shop.html">Shop</a>
    <a href="shop.html">Collections</a>
    <a href="login.html" id="nav-login-mobile">Login</a>
  </div>
  `;
}

function injectFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;

  el.innerHTML = `
  <!-- ===== FOOTER ===== -->
  <footer>
    <div class="footer__top">

      <!-- Merk + socials -->
      <div class="footer__brand">
        <span class="footer__logo">PRIMAL</span>
        <p class="footer__tagline">Get in touch with us through our socials and don't forget to follow us!</p>
        <div class="footer__socials">
          <a href="#" class="social-icon" aria-label="YouTube">▶</a>
          <a href="#" class="social-icon" aria-label="X (Twitter)">𝕏</a>
          <a href="#" class="social-icon" aria-label="Instagram">◎</a>
          <a href="#" class="social-icon" aria-label="LinkedIn">in</a>
        </div>
      </div>

      <!-- Nieuwsbrief -->
      <div class="footer__newsletter">
        <h3>Sing up for our Newsletter</h3>
        <input type="email" id="newsletter-email" placeholder="Email address" aria-label="E-mailadres nieuwsbrief">
        <button onclick="subscribeNewsletter()">Subscribe</button>
      </div>

    </div>

    <!-- Onderste balk met beleidslinks -->
    <div class="footer__bottom">
      <a href="#">Terms of Service</a>
      <a href="#">Return Policy</a>
      <a href="#">Privacy Policy</a>
    </div>
  </footer>
  `;
}

function subscribeNewsletter() {
  const input = document.getElementById('newsletter-email');
  if (input && input.value.includes('@')) {
    showToast('Bedankt voor je inschrijving!');
    input.value = '';
  } else {
    showToast('Voer een geldig e-mailadres in.');
  }
}