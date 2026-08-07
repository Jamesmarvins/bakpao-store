/**
 * BAKPAO CIK SIEN - INTERACTIVE APPLICATION LOGIC
 * Putih, Lembut, Menul-Menul!
 */

const STORE_WHATSAPP_NUMBER = "6281329816838"; // WhatsApp: 0813-2981-6838

// Products Database - Exact Menu & Pricing from Bakpao Cik Sien Menu Poster
const products = [
  {
    id: 1,
    name: "Kacang Hijau",
    category: "manis",
    badge: "Favorit Klasik 🌿",
    badgeColor: "green",
    price: 10000,
    rating: "4.9",
    steamLevel: "♨️♨️♨️ Soft & Sweet",
    image: "images/kacang_hijau.png",
    desc: "Bakpao empuk menul-menul dengan isian pasta kacang hijau lembut manis pas.",
    ingredients: "Tepung terigu pilihan, Kacang hijau murni, Gula pasir, Daun pandan wangi."
  },
  {
    id: 2,
    name: "Kumbu Hitam",
    category: "manis",
    badge: "Best Seller 🖤",
    badgeColor: "gold",
    price: 10000,
    rating: "4.9",
    steamLevel: "♨️♨️♨️ Rich & Smooth",
    image: "images/kumbu_hitam.png",
    desc: "Isian kumbu hitam khas resep tradisional Cik Sien yang halus, manis gurih aromatik.",
    ingredients: "Kumbu hitam pilihan, Gula merah kelapa, Adonan ragi bakpao khas Cik Sien."
  },
  {
    id: 3,
    name: "Kacang Wijen",
    category: "manis",
    badge: "Wangi Wijen 🥜",
    badgeColor: "gold",
    price: 10000,
    rating: "4.8",
    steamLevel: "♨️♨️ Nutty Delight",
    image: "images/kacang_wijen.png",
    desc: "Perpaduan kacang tanah tumbuk gurih dan wijen sangrai wangi melimpah.",
    ingredients: "Kacang tanah sangrai, Wijen putih & hitam, Gula karamel, Mentega."
  },
  {
    id: 4,
    name: "Coklat",
    category: "manis",
    badge: "Super Lumer 🍫",
    badgeColor: "gold",
    price: 10000,
    rating: "5.0",
    steamLevel: "♨️♨️♨️ Melted Chocolate",
    image: "images/chocolate.png",
    desc: "Isian cokelat kaya rasa yang lumer meleleh hangat begitu digigit.",
    ingredients: "Cokelat premium, Susu murni, Mentega gourmet, Adonan bakpao menul-menul."
  },
  {
    id: 5,
    name: "Ayam Kecap",
    category: "gurih",
    badge: "Gurih Manis 🍗",
    badgeColor: "red",
    price: 12000,
    rating: "4.9",
    steamLevel: "♨️♨️♨️ Savory Chicken",
    image: "images/ayam_kecap.png",
    desc: "Daging ayam cincang dimasak bumbu kecap manis gurih dengan rempah meresap.",
    ingredients: "Daging ayam fillet cincang, Kecap manis resep Cik Sien, Bawang putih, Daun bawang."
  },
  {
    id: 6,
    name: "Ayam Charsiu",
    category: "gurih",
    badge: "Favorit Spesial 🥓",
    badgeColor: "red",
    price: 12000,
    rating: "4.9",
    steamLevel: "♨️♨️♨️ Oriental Char Siu",
    image: "images/ayam_charsiu.png",
    desc: "Daging ayam potongan dadu dipadu saus Char Siu khas oriental merah manis juicy.",
    ingredients: "Daging ayam pilihan, Saus oriental Char Siu Cik Sien, Minyak wijen, Rempah."
  },
  {
    id: 7,
    name: "Ayam Keju",
    category: "gurih",
    badge: "Gurih Keju 🧀",
    badgeColor: "gold",
    price: 13000,
    rating: "5.0",
    steamLevel: "♨️♨️♨️ Cheesy Chicken",
    image: "images/keju.png",
    desc: "Olahan daging ayam gurih empuk berpadu dengan keju parut gurih khas Cik Sien.",
    ingredients: "Daging ayam fillet pilihan, Keju parut olahan gurih, Bumbu rempah lezat Cik Sien."
  },
  {
    id: 8,
    name: "Keju",
    category: "manis",
    badge: "Keju Parut 🧀",
    badgeColor: "gold",
    price: 10000,
    rating: "4.9",
    steamLevel: "♨️♨️ Rich Cheese",
    image: "images/keju.png",
    desc: "Isian keju parut khas Cik Sien dengan perpaduan cita rasa gurih dan manis yang pas.",
    ingredients: "Keju parut pilihan Cik Sien, Susu, Mentega, Ragi bakpao empuk menul-menul."
  },
  {
    id: 9,
    name: "Babi Kecap",
    category: "gurih",
    badge: "Resep Warisan 🥩",
    badgeColor: "red",
    price: 15000,
    rating: "5.0",
    steamLevel: "♨️♨️♨️ Braised Pork",
    image: "images/babi_kecap.png",
    desc: "Daging babi empuk bumbu kecap pekat gurih juicy dengan resep warisan Cik Sien.",
    ingredients: "Daging babi pilihan, Kecap warisan Cik Sien, Pekak, Bawang putih, Rempah."
  },
  {
    id: 10,
    name: "Babi Charsiu",
    category: "gurih",
    badge: "Paling Laris 🔥",
    badgeColor: "red",
    price: 15000,
    rating: "5.0",
    steamLevel: "♨️♨️♨️ Authentic Pork Char Siu",
    image: "images/babi_charsiu.png",
    desc: "Bakpao Babi Char Siu khas Cik Sien warna merah menggoda, empuk dan ekstra juicy.",
    ingredients: "Daging babi Char Siu panggang, Honey glaze, Saus oriental Cik Sien, Minyak wijen."
  }
];

// App State
let cart = [];
let quizSelections = {};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  initSteamParticles();
  initEventListeners();
  updateCartUI();
  syncWhatsAppLinks();
});

// Synchronize all WhatsApp links to STORE_WHATSAPP_NUMBER
function syncWhatsAppLinks() {
  const waBtnHeader = document.getElementById("headerWaBtn");
  const waLinkFooter = document.getElementById("waLink");
  
  if (waBtnHeader) {
    waBtnHeader.href = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Halo%20Bakpao%20Cik%20Sien%2C%20saya%20mau%20pesan%20Bakpao`;
  }
  if (waLinkFooter) {
    waLinkFooter.href = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Halo%20Bakpao%20Cik%20Sien`;
  }
}

// Render Products Grid
function renderProducts(items) {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748B;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: #CBD5E1;"></i>
        <h3>Varian Bakpao Tidak Ditemukan</h3>
        <p>Coba kata kunci pencarian lain atau pilih kategori lain.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(p => `
    <div class="product-card">
      <span class="card-badge ${p.badgeColor}">${p.badge}</span>
      <div class="product-img-wrapper" onclick="app.showProductDetail(${p.id})">
        <img src="${p.image}" alt="${p.name}" class="product-img">
      </div>
      <div class="product-info">
        <div class="product-meta-row">
          <span class="star-rating"><i class="fa-solid fa-star"></i> ${p.rating || '4.9'}</span>
          <span class="category-pill">${p.category === 'manis' ? 'Manis & Lumer' : 'Gurih & Daging'}</span>
        </div>
        <h3 class="product-title" onclick="app.showProductDetail(${p.id})">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        
        <div class="product-price-row">
          <div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); app.addToCart(${p.id})" title="Tambah ke Keranjang" aria-label="Tambah ${p.name}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Steam Ambient FX Generator
function initSteamParticles() {
  const container = document.getElementById("steamBg");
  if (!container) return;

  const count = 12;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "steam-particle";
    
    const size = Math.random() * 80 + 40;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
}

// Event Listeners
function initEventListeners() {
  // Category Filter Tabs
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      
      const filter = e.target.getAttribute("data-filter");
      if (filter === "all") {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category === filter);
        renderProducts(filtered);
      }
    });
  });

  // Search Input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.desc.toLowerCase().includes(term)
      );
      renderProducts(filtered);
    });
  }

  // Mobile Navbar Toggle
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const navMenu = document.getElementById("navMenu");
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-active");
      const icon = mobileNavToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    // Close menu when clicking link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-active");
        const icon = mobileNavToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // Cart Drawer Toggles
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartBtn) cartBtn.addEventListener("click", toggleCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", toggleCart);
  if (cartOverlay) cartOverlay.addEventListener("click", toggleCart);

  // Accordion Guide
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active");
    });
  });

  // Checkout Form Submission to WhatsApp
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sendWhatsAppOrder();
    });
  }

  // Modal Close
  const closeModalBtn = document.getElementById("closeModalBtn");
  const productModalOverlay = document.getElementById("productModalOverlay");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      productModalOverlay.classList.remove("active");
    });
  }
}

// Global Toggle Cart Drawer
function toggleCart() {
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartDrawer) cartDrawer.classList.toggle("active");
  if (cartOverlay) cartOverlay.classList.toggle("active");
}

// Toast Notification Helper
function showToastNotification(msg) {
  let toast = document.getElementById("appToastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToastNotification";
    toast.className = "app-toast-notification";
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.classList.add("active");

  if (toast.hideTimer) clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => {
    toast.classList.remove("active");
  }, 2500);
}

// Cart Functions
function addToCart(productId) {
  const idNum = Number(productId);
  const product = products.find(p => p.id === idNum || p.id == productId);
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToastNotification(`✨ <strong>1x ${product.name}</strong> ditambahkan ke keranjang!`);
  
  // Open Cart Drawer
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartDrawer) cartDrawer.classList.add("active");
  if (cartOverlay) cartOverlay.classList.add("active");
}

function updateCartUI() {
  const badge = document.getElementById("cartBadge");
  const mobileBadge = document.getElementById("mobileCartCount");
  const titleCount = document.getElementById("cartCountTitle");
  const itemsContainer = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalEl = document.getElementById("cartTotal");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (badge) badge.innerText = totalQty;
  if (mobileBadge) mobileBadge.innerText = totalQty;
  if (titleCount) titleCount.innerText = totalQty;
  if (subtotalEl) subtotalEl.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
  if (totalEl) totalEl.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center; padding: 2.5rem 1rem; color: #94A3B8;">
        <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; margin-bottom: 1rem; color: #CBD5E1;"></i>
        <p style="font-weight:700">Keranjang Belanja Masih Kosong</p>
        <span style="font-size: 0.85rem">Pilih varian bakpao lezat untuk ditambahkan.</span>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="app.changeQty(${item.id}, -1)">-</button>
          <span style="font-weight:800; font-size:0.9rem">${item.qty}</span>
          <button class="qty-btn" onclick="app.changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button onclick="app.removeItem(${item.id})" style="background:none; border:none; color:#EF4444; cursor:pointer;" title="Hapus">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

// Input Sanitization for Security (XSS Prevention)
function sanitizeText(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

// WhatsApp Order Formatting & Redirection
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Keranjang belanja Anda masih kosong!");
    return;
  }

  const name = sanitizeText(document.getElementById("custName").value.trim());
  const phone = sanitizeText(document.getElementById("custPhone").value.trim());
  const address = sanitizeText(document.getElementById("custAddress").value.trim());
  const notes = sanitizeText(document.getElementById("custNotes").value.trim());
  const shipType = sanitizeText(document.getElementById("shippingTypeSelect").value);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let message = `*HALO BAKPAO CIK SIEN, SAYA MAU PESAN BAKPAO!* 🥟🔥\n\n`;
  message += `👤 *Nama:* ${name}\n`;
  message += `📞 *No WA:* ${phone}\n`;
  message += `📍 *Alamat/Tipe:* ${address}\n`;
  message += `❄️ *Kondisi Penyajian:* ${shipType}\n\n`;
  message += `📋 *Rincian Pesanan:* \n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.qty}x) = Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
  });

  message += `\n💰 *Total Pembayaran:* Rp ${total.toLocaleString('id-ID')}\n`;
  if (notes) message += `📝 *Catatan Khusus:* ${notes}\n`;
  message += `\nMohon diproses dan diinfokan total ongkirnya ya. Terima kasih! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(waUrl, "_blank");
}

// Product Detail Modal
function showProductDetail(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const body = document.getElementById("modalDetailBody");
  const modal = document.getElementById("productModalOverlay");

  body.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; align-items: center; padding: 1.25rem;">
      <div style="position:relative; width:100%; border-radius:18px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        <img src="${p.image}" alt="${p.name}" style="width:100%; height:260px; object-fit:cover; display:block;">
        <span class="card-badge ${p.badgeColor}" style="position:absolute; top:12px; left:12px;">${p.badge}</span>
      </div>
      <div>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem; font-size:0.85rem; color:#FBBF24; font-weight:800;">
          <i class="fa-solid fa-star"></i> ${p.rating || '4.9'} • <span style="color:#CBD5E1; font-weight:600;">Bakpao Cik Sien</span>
        </div>
        <h2 style="margin: 0 0 0.5rem; font-size:1.6rem; font-weight:900; color:#FFFFFF">${p.name}</h2>
        <p style="color:#CBD5E1; font-size:0.9rem; margin-bottom: 1.2rem; line-height:1.6">${p.desc}</p>
        
        <div style="background:rgba(245, 158, 11, 0.1); border:1px solid rgba(245, 158, 11, 0.25); padding: 0.85rem 1rem; border-radius: 14px; font-size:0.84rem; color:#FCD34D; margin-bottom: 1.25rem; line-height:1.5;">
          <strong style="color:#FFF;">🌱 Komposisi Bahan:</strong> ${p.ingredients}
        </div>
        
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 1.25rem; background:rgba(0,0,0,0.3); padding:0.75rem 1rem; border-radius:14px; border:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:0.85rem; color:#94A3B8; font-weight:700;">Harga Satuan</span>
          <div style="font-size:1.45rem; font-weight:900; color:#F59E0B">
            Rp ${p.price.toLocaleString('id-ID')}
          </div>
        </div>
        
        <button class="btn btn-primary btn-block" onclick="app.addToCart(${p.id}); document.getElementById('productModalOverlay').classList.remove('active');" style="padding:0.85rem; font-size:0.95rem;">
          <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang Belanja
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

// Quiz Recommender System
function selectQuizOpt(step, val) {
  quizSelections.type = val;
  document.getElementById("quizStep1").classList.add("d-none");
  document.getElementById("quizStep2").classList.remove("d-none");
}

function finishQuiz(texture) {
  quizSelections.texture = texture;
  document.getElementById("quizStep2").classList.add("d-none");

  const resultContainer = document.getElementById("quizResult");
  resultContainer.classList.remove("d-none");

  let recommended;
  const type = quizSelections.type;

  if (type === 'ayam') {
    if (texture === 'charsiu') {
      recommended = products.find(p => p.id === 6); // Ayam Charsiu
    } else if (texture === 'keju_nutty') {
      recommended = products.find(p => p.id === 7); // Ayam Keju
    } else {
      recommended = products.find(p => p.id === 5); // Ayam Kecap
    }
  } else if (type === 'babi') {
    if (texture === 'charsiu') {
      recommended = products.find(p => p.id === 10); // Babi Charsiu
    } else {
      recommended = products.find(p => p.id === 9); // Babi Kecap
    }
  } else if (type === 'manis') {
    if (texture === 'keju_nutty') {
      recommended = products.find(p => p.id === 8); // Keju
    } else if (texture === 'charsiu') {
      recommended = products.find(p => p.id === 3); // Kacang Wijen
    } else if (texture === 'kecap') {
      recommended = products.find(p => p.id === 2); // Kumbu Hitam
    } else {
      recommended = products.find(p => p.id === 4); // Coklat
    }
  } else {
    recommended = products[Math.floor(Math.random() * products.length)];
  }

  // Fallback safety if recommendation not found
  if (!recommended) {
    recommended = products[0];
  }

  resultContainer.innerHTML = `
    <div style="text-align:center; padding: 1.2rem 1rem;">
      <span style="font-size: 3rem">🎉</span>
      <h3 style="color:#F8FAFC; font-size:1.15rem; margin: 0.6rem 0 0.3rem; opacity:0.9">Bakpao Terbaik Untukmu:</h3>
      <h2 style="color:#F59E0B; font-size:2rem; font-weight:800; margin-bottom:0.75rem">${recommended.name}</h2>
      <p style="color:#CBD5E1; font-size:0.95rem; max-width:520px; margin: 0 auto 1.75rem; line-height:1.6">${recommended.desc}</p>
      <div style="display:flex; justify-content:center; gap: 1rem; flex-wrap:wrap">
        <button class="btn btn-primary" onclick="app.addToCart(${recommended.id})">
          <i class="fa-solid fa-cart-plus"></i> Pesan Bakpao Ini Now
        </button>
        <button class="btn btn-secondary" onclick="app.resetQuiz()">Coba Kuis Lagi</button>
      </div>
    </div>
  `;
}

function resetQuiz() {
  quizSelections = {};
  document.getElementById("quizResult").classList.add("d-none");
  document.getElementById("quizStep2").classList.add("d-none");
  document.getElementById("quizStep1").classList.remove("d-none");
}

/* Squeeze Simulator */
function squeezeBakpao(e) {
  const card = document.getElementById("interactiveHeroCard");
  if (!card) return;

  card.classList.remove("squish-active");
  void card.offsetWidth; // trigger reflow
  card.classList.add("squish-active");

  // Create floating toast
  const toast = document.createElement("div");
  toast.innerHTML = "💨 <strong>Super Soft & Fluffy!</strong>";
  toast.style.cssText = `
    position: fixed;
    top: ${e.clientY - 40}px;
    left: ${e.clientX - 60}px;
    background: #F59E0B;
    color: #0F172A;
    padding: 0.4rem 0.85rem;
    border-radius: 50px;
    font-weight: 800;
    font-size: 0.85rem;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: all 0.8s ease;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = "translateY(-30px)";
    toast.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    document.body.removeChild(toast);
  }, 900);
}

/* Custom Steamer Box Builder State & Logic */
let customBoxItems = [];

function initCustomBoxBuilder() {
  renderFlavorPicker();
  updateSteamerBoxUI();
}

function renderFlavorPicker() {
  const container = document.getElementById("flavorPickerGrid");
  if (!container) return;

  // Filter single products (exclude box item id 99)
  const singleProducts = products.filter(p => p.id !== 99);

  container.innerHTML = singleProducts.map(p => `
    <div class="flavor-pick-card" onclick="app.addFlavorToBox(${p.id})">
      <img src="${p.image}" alt="${p.name}" class="flavor-pick-img">
      <div class="flavor-pick-info">
        <div class="flavor-pick-name">${p.name}</div>
        <div class="flavor-pick-price">+ Rp ${p.price.toLocaleString('id-ID')}</div>
      </div>
      <i class="fa-solid fa-circle-plus" style="color:var(--primary); font-size:1.2rem;"></i>
    </div>
  `).join('');
}

function addFlavorToBox(id) {
  if (customBoxItems.length >= 6) {
    alert("Box sudah penuh (Maksimal 6 Pcs Bakpao)! Anda bisa mereset atau menghapus slot untuk mengganti varian.");
    return;
  }

  const p = products.find(prod => prod.id === id);
  if (!p) return;

  customBoxItems.push(p);
  updateSteamerBoxUI();
}

function removeBoxSlot(index) {
  customBoxItems.splice(index, 1);
  updateSteamerBoxUI();
}

function clearCustomBox() {
  customBoxItems = [];
  updateSteamerBoxUI();
}

function updateSteamerBoxUI() {
  const slotsContainer = document.getElementById("steamerSlots");
  const countEl = document.getElementById("boxFilledCount");
  const priceEl = document.getElementById("boxTotalPrice");
  const submitBtn = document.getElementById("addBoxToCartBtn");

  if (!slotsContainer) return;

  if (countEl) countEl.innerText = customBoxItems.length;

  const totalPrice = customBoxItems.reduce((sum, p) => sum + p.price, 0);
  if (priceEl) priceEl.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;

  if (submitBtn) {
    submitBtn.disabled = customBoxItems.length !== 6;
    if (customBoxItems.length === 6) {
      submitBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Masukkan Custom Box (Rp ${totalPrice.toLocaleString('id-ID')}) ke Keranjang`;
    } else {
      submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Tambah ${6 - customBoxItems.length} Pcs Lagi untuk Selesaikan Box`;
    }
  }

  // Render 6 Slots
  let html = '';
  for (let i = 0; i < 6; i++) {
    if (i < customBoxItems.length) {
      const item = customBoxItems[i];
      html += `
        <div class="slot-item filled">
          <button class="slot-remove-btn" onclick="app.removeBoxSlot(${i})" title="Hapus">&times;</button>
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name.replace('Bakpao ', '')}</span>
        </div>
      `;
    } else {
      html += `
        <div class="slot-item empty">
          <i class="fa-solid fa-plus" style="margin-bottom:4px; opacity:0.5"></i>
          <span>Slot ${i + 1}</span>
        </div>
      `;
    }
  }

  slotsContainer.innerHTML = html;
}

function addCustomBoxToCart() {
  if (customBoxItems.length !== 6) {
    alert("Silakan pilih 6 varian bakpao untuk menyelesaikan custom box Anda.");
    return;
  }

  const names = customBoxItems.map(p => p.name.replace('Bakpao ', '')).join(', ');
  const totalPrice = customBoxItems.reduce((sum, p) => sum + p.price, 0);

  const customBoxProduct = {
    id: Date.now(), // unique id
    name: `Custom Steamer Box (6 Pcs: ${names})`,
    category: "paket",
    badge: "Custom Mix 📦",
    badgeColor: "gold",
    price: totalPrice,
    rating: "5.0",
    image: "images/chocolate.png",
    desc: `Pilihan rasa Anda: ${names}`,
    qty: 1
  };

  cart.push(customBoxProduct);
  updateCartUI();

  // Reset custom box
  customBoxItems = [];
  updateSteamerBoxUI();

  // Open Cart Drawer
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}

// Call Custom Box Builder on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initCustomBoxBuilder();
});

// QRIS Payment Modal Viewer
function showQrisModal() {
  const body = document.getElementById("modalDetailBody");
  const modal = document.getElementById("productModalOverlay");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="text-align:center; padding: 2rem 1.5rem;">
      <span class="card-badge gold" style="position:static">QRIS ALL PAYMENT</span>
      <h2 style="color:#FFF; font-size:1.6rem; margin:0.8rem 0 0.4rem">Scan QRIS Untuk Pembayaran</h2>
      <p style="color:#94A3B8; font-size:0.9rem; margin-bottom: 1.5rem">Mendukung GoPay, OVO, ShopeePay, DANA, BCA, Mandiri, BRI & Seluruh Aplikasi M-Banking</p>
      
      <div style="background:#FFF; padding: 1.25rem; border-radius:20px; display:inline-block; box-shadow:0 10px 30px rgba(0,0,0,0.5); margin-bottom: 1.5rem;">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#FFF"/>
          <path d="M10 10H40V40H10V10ZM15 15V35H35V15H15Z" fill="#0F172A"/>
          <path d="M20 20H30V30H20V20Z" fill="#F59E0B"/>
          <path d="M60 10H90V40H60V10ZM65 15V35H85V15H65Z" fill="#0F172A"/>
          <path d="M70 20H80V30H70V20Z" fill="#F59E0B"/>
          <path d="M10 60H40V90H10V60ZM15 65V85H35V65H15Z" fill="#0F172A"/>
          <path d="M20 70H30V80H20V70Z" fill="#F59E0B"/>
          <rect x="50" y="50" width="12" height="12" fill="#0F172A"/>
          <rect x="70" y="50" width="15" height="8" fill="#0F172A"/>
          <rect x="50" y="70" width="18" height="15" fill="#0F172A"/>
          <rect x="75" y="75" width="15" height="15" fill="#F59E0B"/>
        </svg>
      </div>

      <p style="color:#FCD34D; font-size:0.85rem; font-weight:700">📌 Setelah scan & transfer, kirimkan bukti bayar via WhatsApp CS.</p>
    </div>
  `;

  modal.classList.add("active");
}

// Bank Transfer Modal Viewer
function showBankModal() {
  const body = document.getElementById("modalDetailBody");
  const modal = document.getElementById("productModalOverlay");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="text-align:center; padding: 2rem 1.5rem;">
      <span class="card-badge gold" style="position:static">TRANSFER BANK</span>
      <h2 style="color:#FFF; font-size:1.6rem; margin:0.8rem 0 1rem">Rekening Pembayaran Resmi</h2>
      
      <div style="display:flex; flex-direction:column; gap:1rem; text-align:left; margin-bottom:1.5rem">
        <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); padding:1rem; border-radius:14px;">
          <div style="font-weight:800; color:#F59E0B">🏛️ BANK BCA</div>
          <div style="font-size:1.1rem; font-weight:800; color:#FFF; margin:0.2rem 0">123-456-7890</div>
          <div style="font-size:0.85rem; color:#94A3B8">a.n. BAO GOURMET ARTISAN</div>
        </div>

        <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); padding:1rem; border-radius:14px;">
          <div style="font-weight:800; color:#F59E0B">🏛️ BANK MANDIRI</div>
          <div style="font-size:1.1rem; font-weight:800; color:#FFF; margin:0.2rem 0">987-000-123456</div>
          <div style="font-size:0.85rem; color:#94A3B8">a.n. BAO GOURMET ARTISAN</div>
        </div>
      </div>

      <p style="color:#FCD34D; font-size:0.85rem; font-weight:700">📌 Konfirmasi bukti kirim dapat dilakukan via WhatsApp saat checkout.</p>
    </div>
  `;
  modal.classList.add("active");
}

// E-Wallet Modal Viewer
function showEwalletModal() {
  const body = document.getElementById("modalDetailBody");
  const modal = document.getElementById("productModalOverlay");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="text-align:center; padding: 2rem 1.5rem;">
      <span class="card-badge gold" style="position:static">E-WALLET PAYMENT</span>
      <h2 style="color:#FFF; font-size:1.6rem; margin:0.8rem 0 1rem">Pembayaran GoPay / OVO / ShopeePay</h2>
      
      <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); padding:1.2rem; border-radius:16px; text-align:left; margin-bottom:1.5rem">
        <div style="font-weight:800; color:#F59E0B; margin-bottom:0.5rem">📱 Nomor E-Wallet Toko:</div>
        <div style="font-size:1.3rem; font-weight:800; color:#FFF; margin-bottom:0.3rem">0812-3456-7890</div>
        <div style="font-size:0.85rem; color:#94A3B8">a.n. BAO GOURMET</div>
      </div>

      <button class="btn btn-primary btn-block" onclick="app.showQrisModal()">
        <i class="fa-solid fa-qrcode"></i> Atau Scan via QRIS
      </button>
    </div>
  `;
  modal.classList.add("active");
}

// Courier Modal Viewer
function showCourierModal() {
  const body = document.getElementById("modalDetailBody");
  const modal = document.getElementById("productModalOverlay");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="text-align:center; padding: 2rem 1.5rem;">
      <span class="card-badge gold" style="position:static">PENGIRIMAN INSTANT</span>
      <h2 style="color:#FFF; font-size:1.6rem; margin:0.8rem 0 0.5rem">GoSend & GrabExpress</h2>
      <p style="color:#94A3B8; font-size:0.9rem; margin-bottom:1.5rem">Pengiriman Sameday / Instant langsung dari dapur hangat kami sampai ke rumah Anda dalam 30-60 menit.</p>
      <div style="background:rgba(245,158,11,0.15); border:1px solid #F59E0B; padding:1rem; border-radius:14px; color:#FCD34D; font-size:0.85rem; font-weight:700">
        🔥 Bakpao dikemas dalam Thermal Bag khusus agar tetap hangat & lembut saat sampai!
      </div>
    </div>
  `;
  modal.classList.add("active");
}

// Paxel Modal Viewer
function showPaxelModal() {
  const body = document.getElementById("modalDetailBody");
  const modal = document.getElementById("productModalOverlay");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="text-align:center; padding: 2rem 1.5rem;">
      <span class="card-badge gold" style="position:static">KIRIM LUAR KOTA</span>
      <h2 style="color:#FFF; font-size:1.6rem; margin:0.8rem 0 0.5rem">Paxel Frozen Delivery</h2>
      <p style="color:#94A3B8; font-size:0.9rem; margin-bottom:1.5rem">Layanan khusus kurir pendingin Paxel Frozen Next Day dengan jaminan produk aman & fresh sampai luar kota.</p>
      <div style="background:rgba(16,185,129,0.15); border:1px solid #10B981; padding:1rem; border-radius:14px; color:#A7F3D0; font-size:0.85rem; font-weight:700">
        ❄️ Dikemas vacuum sealed kedap udara + ice pack dingin tahan hingga 48 jam perjalanan.
      </div>
    </div>
  `;
  modal.classList.add("active");
}

// Export global app helper
window.app = {
  addToCart,
  addDirectToCart: addToCart,
  toggleCart,
  changeQty,
  removeItem,
  showProductDetail,
  selectQuizOpt,
  finishQuiz,
  resetQuiz,
  squeezeBakpao,
  addFlavorToBox,
  removeBoxSlot,
  clearCustomBox,
  addCustomBoxToCart,
  showQrisModal,
  showBankModal,
  showEwalletModal,
  showCourierModal,
  showPaxelModal
};
