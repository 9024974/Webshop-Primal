function lsGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function loadAllProducts() {
  let base = [];
  try {
    const r = await fetch('products.json');
    base = await r.json();
  } catch (e) { console.warn('products.json niet geladen', e); }
  const extra = lsGet('primal_user_products', []);
  return [...base, ...extra];
}

function getCart() { return lsGet('primal_cart', []); }

function saveCart(cart) {
  lsSet('primal_cart', cart);
  updateCartBadge();
}

function addToCart(product, size) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      color: product.color || '',
      price: product.price,
      image: product.image,
      size,
      qty: 1
    });
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function getCurrentUser() { return lsGet('primal_current_user', null); }

function updateNavAuth() {
  const user = getCurrentUser();
  const loginEl = document.getElementById('nav-login');
  const addEl   = document.getElementById('nav-add-btn');

  if (loginEl) {
    if (user) {
      const name = user.split('@')[0];
      loginEl.textContent = `Hello, ${name}`;
      loginEl.href = '#';
      loginEl.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('primal_current_user');
        updateNavAuth();
        if (window.location.pathname.includes('add-product')) {
          window.location.href = 'index.html';
        }
      };
    } else {
      loginEl.textContent = 'Login';
      loginEl.href = 'login.html';
      loginEl.onclick = null;
    }
  }

  if (addEl) {
    addEl.style.display = user ? 'flex' : 'none';
  }
}

function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (page === href || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) btn.addEventListener('click', () => menu.classList.toggle('open'));
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  const fullName = product.color
    ? `${product.name} – ${product.color}`
    : product.name;

  card.innerHTML = `
    <div class="product-card__img">
      <img src="${product.image}" alt="${fullName}" loading="lazy"
           onerror="this.src='https://placehold.co/400x530/f5f5f5/aaa?text=No+Image'">
    </div>
    <p class="product-card__name">${fullName.toUpperCase()}</p>
    <p class="product-card__price">€${product.price}</p>
  `;
  card.addEventListener('click', () => {
    window.location.href = `product.html?id=${product.id}`;
  });
  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavAuth();
  updateCartBadge();
  setActiveNav();
  initMobileMenu();
});