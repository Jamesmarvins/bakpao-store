/**
 * BAO GOURMET - INTERACTIVE APPLICATION LOGIC
 * Master Steamed Buns Store
 */

const STORE_WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WhatsApp Penjual (format 62...)

// Products Database
const products = [
  {
    id: 1,
    name: "Bakpao Ayam Char Siu Premium",
    category: "gurih",
    badge: "Best Seller 🔥",
    badgeColor: "gold",
    price: 12000,
    rating: "4.9",
    steamLevel: "♨️♨️♨️ Extra Fluffy",
    image: "images/hero.png",
    desc: "Daging ayam pilihan dipotong dadu dengan saus oriental manis gurih juicy khas Char Siu.",
    ingredients: "Tepung gandum murni, Daging Ayam Fillet, Saus Oriental, Minyak Wijen, Rempah Spesial."
  },
  {
    id: 2,
    name: "Bakpao Daging Sapi Lada Hitam",
    category: "gurih",
    badge: "Favorite Chef 🥩",
    badgeColor: "red",
    price: 15000,
    rating: "4.9",
    fluffyScore: 98,
    lavaScore: 95,
    steamLevel: "♨️♨️♨️ Extra Fluffy",
    image: "images/beef.png",
    desc: "Cincangan daging sapi tenderloin berpadu saus lada hitam gurih pedas hangat.",
    ingredients: "Daging Sapi Tenderloin Cincang, Lada Hitam Sarawak, Bawang Bombay, Mentega."
  },
  {
    id: 3,
    name: "Bakpao Cokelat Belgian Lava",
    category: "manis",
    badge: "Super Lumer 🍫",
    badgeColor: "gold",
    price: 10000,
    rating: "4.9",
    fluffyScore: 99,
    lavaScore: 100,
    steamLevel: "♨️♨️♨️ Melted Lava",
    image: "images/chocolate.png",
    desc: "Isian Belgian Dark Chocolate 70% melimpah yang lumer seketika begitu digigit.",
    ingredients: "Cokelat Belgian Premium, Susu Murni, Mentega Gourmet, Adonan Ragi Spesial."
  },
  {
    id: 4,
    name: "Bakpao Salted Egg Custard",
    category: "spesial",
    badge: "Limited Edition 🌟",
    badgeColor: "gold",
    price: 14000,
    rating: "5.0",
    fluffyScore: 97,
    lavaScore: 99,
    steamLevel: "♨️♨️♨️ Golden Lava",
    image: "images/salted_egg.png",
    desc: "Perpaduan unik telur asin gurih creaminess tinggi dan rasa manis lembut menggoda.",
    ingredients: "Kuning Telur Asin Pilihan, Butter Cream, Susu Evaporasi, Gula Kelapa."
  },
  {
    id: 5,
    name: "Bakpao Mozzarella Smoked Beef",
    category: "spesial",
    badge: "Keju Molor 🧀",
    badgeColor: "red",
    price: 15000,
    rating: "4.9",
    fluffyScore: 96,
    lavaScore: 98,
    steamLevel: "♨️♨️ Extra Cheesy",
    image: "images/cheese.png",
    desc: "Daging sapi asap premium dibalut keju Mozzarella mulur gurih sempurna.",
    ingredients: "Keju Mozzarella Premium, Daging Sapi Asap (Smoked Beef), Saus Keju."
  },
  {
    id: 6,
    name: "Bakpao Matcha Red Bean Velvet",
    category: "manis",
    badge: "Authentic Japan 🍵",
    badgeColor: "green",
    price: 11000,
    rating: "4.7",
    steamLevel: "♨️♨️ Smooth Creamy",
    image: "images/chocolate.png",
    desc: "Kombinasi pasta kacang merah manis lembut dengan cream matcha Uji Jepang aromatik.",
    ingredients: "Matcha Uji Grade A, Pasta Kacang Merah Halus, Susu Oat."
  },
  {
    id: 99,
    name: "Family Box (Isi 6 Varian Mix)",
    category: "paket",
    badge: "Paket Box 🎁",
    badgeColor: "gold",
    price: 75000,
    rating: "5.0",
    steamLevel: "♨️♨️♨️ Mixed Flavors",
    image: "images/chocolate.png",
    desc: "1 Box lengkap isi 2x Ayam Char Siu, 2x Cokelat Belgian, 1x Salted Egg, 1x Mozzarella Beef.",
    ingredients: "Kombinasi 6 Bakpao Terfavorit dalam kemasan Gift Box Eksklusif."
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
});

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
        <div class="product-meta">
          <span>⭐ ${p.rating}</span>
          <span>${p.steamLevel}</span>
        </div>
        <h3 class="product-title" onclick="app.showProductDetail(${p.id})" style="cursor:pointer">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        
        <!-- Meter Gauge Kelembutan & Kelumeran -->
        <div class="meter-wrapper">
          <div class="meter-row">
            <span>🌾 Kelembutan Adonan</span>
            <span>${p.fluffyScore || 98}% Fluffy</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill" style="width: ${p.fluffyScore || 98}%"></div>
          </div>
        </div>

        <div class="product-price-row">
          <div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>
          <button class="add-cart-btn" onclick="app.addToCart(${p.id})" title="Tambah ke Keranjang">
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
  const cartDrawer = document.getElementById("cartDrawer");

  if (cartBtn) cartBtn.addEventListener("click", toggleCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", toggleCart);
  if (cartOverlay) cartOverlay.addEventListener("click", toggleCart);

  function toggleCart() {
    cartDrawer.classList.toggle("active");
    cartOverlay.classList.toggle("active");
  }

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

// Cart Functions
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  
  // Open Drawer or Toast
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
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

// WhatsApp Order Formatting & Redirection
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Keranjang belanja Anda masih kosong!");
    return;
  }

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("custNotes").value.trim();
  const shipType = document.getElementById("shippingTypeSelect").value;

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let message = `*HALO BAO GOURMET, SAYA MAU PESAN BAKPAO!* 🥟🔥\n\n`;
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
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: center; padding: 1.5rem;">
      <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:16px; object-fit:cover;">
      <div>
        <span class="card-badge ${p.badgeColor}" style="position:static">${p.badge}</span>
        <h2 style="margin: 0.5rem 0; font-size:1.5rem; color:#0F172A">${p.name}</h2>
        <p style="color:#64748B; font-size:0.9rem; margin-bottom: 1rem">${p.desc}</p>
        <div style="background:#FEF3C7; padding: 0.75rem; border-radius: 10px; font-size:0.85rem; color:#92400E; margin-bottom: 1rem;">
          <strong>🌱 Bahan Utama:</strong> ${p.ingredients}
        </div>
        <div style="font-size:1.4rem; font-weight:800; color:#0F172A; margin-bottom: 1rem">
          Rp ${p.price.toLocaleString('id-ID')}
        </div>
        <button class="btn btn-primary btn-block" onclick="app.addToCart(${p.id}); document.getElementById('productModalOverlay').classList.remove('active');">
          <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
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

function finishQuiz(timing) {
  quizSelections.timing = timing;
  document.getElementById("quizStep2").classList.add("d-none");

  const resultContainer = document.getElementById("quizResult");
  resultContainer.classList.remove("d-none");

  let recommended;
  if (quizSelections.type === 'gurih') {
    recommended = products.find(p => p.id === 1);
  } else if (quizSelections.type === 'manis') {
    recommended = products.find(p => p.id === 3);
  } else {
    recommended = products.find(p => p.id === 4);
  }

  resultContainer.innerHTML = `
    <div style="text-align:center; padding: 1rem;">
      <span style="font-size: 3rem">🎉</span>
      <h3 style="color:#0F172A; margin: 0.5rem 0;">Bakpao Terbaik Untukmu:</h3>
      <h2 style="color:#D97706; font-size:1.8rem; margin-bottom:0.5rem">${recommended.name}</h2>
      <p style="color:#64748B; max-width:500px; margin: 0 auto 1.5rem">${recommended.desc}</p>
      <div style="display:flex; justify-content:center; gap: 1rem">
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
  addCustomBoxToCart
};
