// PRODUCT DATA (Hay Clothing style structure with sizes)
const defaultProducts = [
  {
    id: 'p1',
    name: 'Premium Pleated Maxi with Lining',
    price: 1499,
    originalPrice: 1999,
    discount: '25%',
    images: ['images/dress_1_main.jpg', 'images/dress_1_back.jpg', 'images/dress_1_side.jpg'],
    category: ['all', 'bestseller', 'maxi'],
    tags: ['Bestseller', 'Sale'],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: false }, // Out of stock
      { size: 'XXL', available: true }
    ],
    reviews: 45
  },
  {
    id: 'p2',
    name: 'Elegant Pleated Maxi with Lining',
    price: 1599,
    originalPrice: null,
    discount: null,
    images: ['images/dress_2_main.jpg', 'images/dress_2_back.jpg', 'images/dress_2_side.jpg'],
    category: ['all', 'new', 'maxi'],
    tags: ['New'],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    reviews: 12
  },
  {
    id: 'p3',
    name: 'Vibrant Pleated Maxi with Lining',
    price: 1699,
    originalPrice: 2200,
    discount: '22%',
    images: ['images/dress_3_main.jpg', 'images/dress_3_back.jpg', 'images/dress_3_side.jpg'],
    category: ['all', 'bestseller', 'maxi'],
    tags: ['Trending'],
    sizes: [
      { size: 'S', available: false },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    reviews: 89
  },
  {
    id: 'p4',
    name: 'Classic Pleated Maxi with Lining',
    price: 1499,
    originalPrice: null,
    discount: null,
    images: ['images/dress_4_main.jpg', 'images/dress_4_back.jpg', 'images/dress_4_side.jpg'],
    category: ['all', 'new', 'maxi'],
    tags: ['Sale'],
    sizes: [
      { size: '2Y', available: true },
      { size: '4Y', available: true },
      { size: '6Y', available: true },
      { size: '8Y', available: false },
      { size: '10Y', available: true }
    ],
    reviews: 0
  }
];

let products = JSON.parse(localStorage.getItem('mukil_products'));
if (!products) {
  products = defaultProducts;
  localStorage.setItem('mukil_products', JSON.stringify(products));
}

// STATE
let cart = JSON.parse(localStorage.getItem('mukil_cart')) || [];
const FREE_SHIPPING_THRESHOLD = 999;

// DOM ELEMENTS
const productGrid = document.getElementById('productGrid');
const categoryTabs = document.getElementById('categoryTabs');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartCountDrawer = document.getElementById('cartCountDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMsg = document.getElementById('emptyCartMsg');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const shippingProgress = document.getElementById('shippingProgress');
const shippingMessage = document.getElementById('shippingMessage');
const toast = document.getElementById('toast');

// QUICK VIEW ELEMENTS
const quickViewModal = document.getElementById('quickViewModal');
const quickViewBody = document.getElementById('quickViewBody');
const quickViewClose = document.getElementById('quickViewClose');
const quickViewBackdrop = document.getElementById('quickViewBackdrop');

// CHECKOUT ELEMENTS
const checkoutModal = document.getElementById('checkoutModal');
const checkoutClose = document.getElementById('checkoutClose');
const checkoutBackdrop = document.getElementById('checkoutBackdrop');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutTotalBtn = document.getElementById('checkoutTotalBtn');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initHeaderScroll();
  initMobileNav();
  renderProducts('all');
  updateCartUI();
  initAnimations();
  
  // Tab click listeners
  if(categoryTabs) {
    categoryTabs.addEventListener('click', (e) => {
      if(e.target.classList.contains('tab-item')) {
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.filter);
      }
    });
  }

  // Cart Drawer toggles
  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  
  // Quick View close
  if(quickViewClose) quickViewClose.addEventListener('click', closeQuickView);
  if(quickViewBackdrop) quickViewBackdrop.addEventListener('click', closeQuickView);

  // Checkout Listeners
  if(checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
  if(checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
  if(checkoutBackdrop) checkoutBackdrop.addEventListener('click', closeCheckout);
  if(checkoutForm) checkoutForm.addEventListener('submit', processCheckout);

  // View All Products button
  const viewAllBtn = document.getElementById('viewAllBtn');
  if(viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      // Reset tabs
      document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      const allTab = document.querySelector('.tab-item[data-filter="all"]');
      if(allTab) allTab.classList.add('active');
      
      // Render all and scroll to grid
      renderProducts('all');
      document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

// --- UI COMPONENTS ---

function initAnimations() {
  // Trigger on-load animations
  setTimeout(() => {
    document.querySelectorAll('.animate-on-load').forEach(el => {
      el.classList.add('active');
    });
  }, 100);

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function initAnnouncementBar() {
  const track = document.getElementById('announcementTrack');
  if(!track) return;
  
  let currentSlide = 0;
  const slidesCount = 4; // We have 4 messages
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slidesCount;
    track.style.transform = `translateX(-${currentSlide * 25}%)`;
  }, 3500);
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled down
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    // Hide header on scroll down, show on scroll up (optional UX enhancement)
    /*
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('scroll-up');
    } else {
      header.classList.remove('scroll-up');
    }
    */
    lastScroll = currentScroll;
  });
}

function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('mainNav');
  
  if(hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      // Change icon
      if(nav.classList.contains('open')) {
        hamburger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        hamburger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    // Handle mobile mega menu toggle
    const megaMenuParent = document.querySelector('.has-mega-menu > a');
    if(megaMenuParent) {
      megaMenuParent.addEventListener('click', (e) => {
        if(window.innerWidth <= 768) {
          e.preventDefault();
          megaMenuParent.parentElement.classList.toggle('active');
        }
      });
    }
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- PRODUCT RENDERING ---

function renderProducts(filterCategory) {
  if(!productGrid) return;
  
  const filtered = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category.includes(filterCategory));
  
  productGrid.innerHTML = filtered.map(product => {
    // Generate size pills HTML
    const sizesHTML = product.sizes.map(s => `
      <div>
        <input type="radio" name="size-${product.id}" id="size-${product.id}-${s.size}" value="${s.size}" class="size-radio" ${!s.available ? 'disabled' : ''}>
        <label for="size-${product.id}-${s.size}" class="size-label" title="${!s.available ? 'Out of Stock' : ''}">${s.size}</label>
      </div>
    `).join('');

    // Generate tags HTML
    const tagsHTML = product.tags.map(t => {
      if(t === 'Sale') return `<span class="badge-sale">Sale</span>`;
      if(t === 'New') return `<span class="badge-new">New</span>`;
      return `<span class="badge-new">${t}</span>`;
    }).join('');

    // Stars HTML
    const stars = product.reviews > 0 
      ? `<span class="stars">★★★★★</span> <span>(${product.reviews})</span>`
      : `<span class="stars">★★★★★</span> <span>No reviews</span>`;

    return `
      <div class="product-card reveal-up" data-id="${product.id}">
        <div class="product-image-wrap" onclick="openQuickView('${product.id}')">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" class="main-img">
          ${product.images.length > 1 ? `<img src="${product.images[1]}" loading="lazy" class="hover-img">` : ''}
          <div class="card-badges">${tagsHTML}</div>
          <button class="quick-view-btn" aria-label="Quick View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
          
          <div class="size-overlay" onclick="event.stopPropagation()">
            <div class="size-title">Select Size</div>
            <div class="size-selector">
              ${sizesHTML}
            </div>
            <button class="quick-add-btn" onclick="addToCartFromCard('${product.id}')">Add to Bag</button>
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-vendor">Mukil Fabrics</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price-row">
            <span class="price">₹${product.price}</span>
            ${product.originalPrice ? `<span class="price-old">₹${product.originalPrice}</span>` : ''}
            ${product.discount ? `<span class="price-discount">${product.discount} OFF</span>` : ''}
          </div>
          <div class="product-rating">${stars}</div>
        </div>
      </div>
    `;
  }).join('');

  // Animate newly rendered products
  setTimeout(() => {
    productGrid.querySelectorAll('.product-card').forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      card.classList.add('active');
    });
  }, 50);
}

// --- QUICK VIEW MODAL ---

function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if(!product) return;

  const sizesHTML = product.sizes.map(s => `
    <div>
      <input type="radio" name="qv-size" id="qv-size-${s.size}" value="${s.size}" class="size-radio" ${!s.available ? 'disabled' : ''}>
      <label for="qv-size-${s.size}" class="size-label">${s.size}</label>
    </div>
  `).join('');

  const thumbnailsHTML = product.images.map((img, index) => `
    <img src="${img}" alt="Thumbnail ${index+1}" class="qv-thumb ${index === 0 ? 'active' : ''}" onclick="changeQvImage('${img}', this)">
  `).join('');

  quickViewBody.innerHTML = `
    <div class="qv-gallery">
      <img src="${product.images[0]}" alt="${product.name}" class="qv-main-image" id="qvMainImage">
      <div class="qv-thumbnails">
        ${thumbnailsHTML}
      </div>
    </div>
    <div class="qv-details">
      <div class="product-vendor">Mukil Fabrics</div>
      <h2 class="qv-title">${product.name}</h2>
      <div class="qv-price">
        ₹${product.price}
        ${product.originalPrice ? `<span class="price-old" style="margin-left:10px; font-weight:400;">₹${product.originalPrice}</span>` : ''}
      </div>
      <p class="qv-desc">Premium in-house manufactured pleated fabric. Comfortable, vibrant, and perfect for any occasion. Directly from our looms to your wardrobe.</p>
      
      <div class="qv-sizes">
        <h4>Size</h4>
        <div class="size-selector" style="justify-content:flex-start;" id="qvSizeContainer">
          ${sizesHTML}
        </div>
      </div>

      <div class="quantity-selector">
        <button class="qty-btn" onclick="updateQvQty(-1)">-</button>
        <input type="number" class="qty-input" id="qvQty" value="1" min="1" readonly>
        <button class="qty-btn" onclick="updateQvQty(1)">+</button>
      </div>

      <button class="btn-primary qv-add-btn" onclick="addToCartFromQuickView('${product.id}')">Add to Bag</button>
    </div>
  `;

  quickViewModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeQuickView() {
  quickViewModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Global scope for onclick handlers injected via innerHTML
window.updateQvQty = function(change) {
  const input = document.getElementById('qvQty');
  let newVal = parseInt(input.value) + change;
  if(newVal >= 1) input.value = newVal;
}

window.changeQvImage = function(src, element) {
  document.getElementById('qvMainImage').src = src;
  document.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
}

// --- CART FUNCTIONALITY ---

function addToCartFromCard(productId) {
  // Find the selected size radio for this specific product card
  const selectedSizeRadio = document.querySelector(`input[name="size-${productId}"]:checked`);
  
  if(!selectedSizeRadio) {
    showToast("Please select a size first!");
    return;
  }
  
  const size = selectedSizeRadio.value;
  addToCart(productId, size, 1);
}

function addToCartFromQuickView(productId) {
  const selectedSizeRadio = document.querySelector(`input[name="qv-size"]:checked`);
  if(!selectedSizeRadio) {
    showToast("Please select a size!");
    return;
  }
  
  const size = selectedSizeRadio.value;
  const qty = parseInt(document.getElementById('qvQty').value) || 1;
  
  addToCart(productId, size, qty);
  closeQuickView();
}

function addToCart(productId, size, qty) {
  const product = products.find(p => p.id === productId);
  if(!product) return;

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: size,
      qty: qty
    });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateCartQty(index, change) {
  if (cart[index].qty + change > 0) {
    cart[index].qty += change;
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('mukil_cart', JSON.stringify(cart));
}

function openCart() {
  cartOverlay.classList.add('active');
  cartDrawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOverlay.classList.remove('active');
  cartDrawer.classList.remove('open');
  document.body.style.overflow = '';
}

function updateCartUI() {
  if(!cartCount) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.textContent = totalQty;
  cartCountDrawer.textContent = `(${totalQty})`;
  cartTotal.textContent = `₹${totalAmount}`;

  // Update Free Shipping Progress
  if(totalAmount >= FREE_SHIPPING_THRESHOLD) {
    shippingProgress.style.width = '100%';
    shippingMessage.innerHTML = '🎉 You qualify for <strong>Free Shipping!</strong>';
  } else {
    const percentage = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remaining = FREE_SHIPPING_THRESHOLD - totalAmount;
    shippingProgress.style.width = `${percentage}%`;
    shippingMessage.innerHTML = `Add <strong>₹${remaining}</strong> more for free shipping!`;
  }

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    emptyCartMsg.style.display = 'block';
    cartItemsContainer.appendChild(emptyCartMsg);
    checkoutBtn.disabled = true;
  } else {
    emptyCartMsg.style.display = 'none';
    checkoutBtn.disabled = false;
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-size">Size: ${item.size}</p>
          <p class="cart-item-price">₹${item.price}</p>
          <div class="cart-item-actions">
            <div class="cart-qty">
              <button onclick="updateCartQty(${index}, -1)">-</button>
              <input type="text" value="${item.qty}" readonly>
              <button onclick="updateCartQty(${index}, 1)">+</button>
            </div>
            <span class="remove-btn" onclick="removeFromCart(${index})">Remove</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Global scope for cart DOM actions
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;

// --- CHECKOUT LOGIC ---
function openCheckout() {
  if (cart.length === 0) return;
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  checkoutTotalBtn.textContent = `₹${totalAmount}`;
  
  closeCart();
  checkoutModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  checkoutModal.classList.remove('active');
  document.body.style.overflow = '';
}

function processCheckout(e) {
  e.preventDefault();
  
  if (cart.length === 0) {
    showToast("Cart is empty!");
    return;
  }

  const name = document.getElementById('checkoutName').value;
  const phone = document.getElementById('checkoutPhone').value;
  const address = document.getElementById('checkoutAddress').value;
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const order = {
    id: 'ord_' + Date.now(),
    date: new Date().toISOString(),
    customer: { name, phone, address },
    items: [...cart],
    total: totalAmount
  };

  // 1. Save Order
  let orders = JSON.parse(localStorage.getItem('mukil_orders')) || [];
  orders.push(order);
  localStorage.setItem('mukil_orders', JSON.stringify(orders));

  // 2. Deduct Inventory
  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    if (product) {
      const sizeObj = product.sizes.find(s => s.size === cartItem.size);
      if (sizeObj) {
        let currentQty = sizeObj.quantity !== undefined ? sizeObj.quantity : (sizeObj.available ? 10 : 0);
        currentQty = Math.max(0, currentQty - cartItem.qty);
        sizeObj.quantity = currentQty;
        sizeObj.available = currentQty > 0;
      }
    }
  });
  localStorage.setItem('mukil_products', JSON.stringify(products));

  // 3. Clear Cart
  cart = [];
  saveCart();
  updateCartUI();

  // 4. Finish
  closeCheckout();
  checkoutForm.reset();
  showToast("Order placed successfully!");
  renderProducts('all'); // re-render to reflect new stock
}
