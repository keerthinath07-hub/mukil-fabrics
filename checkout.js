import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zotvzqtkfwlcvqakdtwo.supabase.co';
const supabaseKey = 'sb_publishable_7c4B5AiAgzJKuuLgIuhuEQ_NQP3Am6m';
const supabase = createClient(supabaseUrl, supabaseKey);

// STATE
let cart = JSON.parse(localStorage.getItem('mukil_cart')) || [];
let currentStep = 1;

// DOM ELEMENTS
const shippingForm = document.getElementById('shippingForm');
const checkoutCartItems = document.getElementById('checkoutCartItems');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const itemCountEl = document.getElementById('itemCount');
const placeOrderBtn = document.getElementById('placeOrderBtn');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  if (cart.length === 0) {
    window.location.href = 'index.html'; // Redirect if cart is empty
    return;
  }

  renderSummary();
  initFormListeners();
});

function renderSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal; // For now, no tax/shipping cost in standard

  subtotalEl.textContent = `₹${subtotal}`;
  totalEl.textContent = `₹${total}`;
  itemCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  checkoutCartItems.innerHTML = cart.map(item => `
    <div class="checkout-cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="checkout-cart-item-info">
        <div class="checkout-cart-item-name">${item.name}</div>
        <div class="checkout-cart-item-meta">Size: ${item.size} | Qty: ${item.qty}</div>
        <div class="checkout-cart-item-price">₹${item.price * item.qty}</div>
      </div>
    </div>
  `).join('');
}

function initFormListeners() {
  if (shippingForm) {
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      nextStep(1);
    });
  }

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', processOrder);
  }
}

window.nextStep = function(step) {
  const currentStepEl = document.getElementById(`step${step}`);
  const nextStepEl = document.getElementById(`step${step + 1}`);

  if (currentStepEl && nextStepEl) {
    currentStepEl.classList.remove('active');
    currentStepEl.classList.add('completed');
    nextStepEl.classList.add('active');
    
    // Scroll to top of next step
    nextStepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    currentStep = step + 1;
  }
};

async function processOrder() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const address = `${document.getElementById('address1').value}, ${document.getElementById('address2').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} - ${document.getElementById('zip').value}`;
  
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Generate Order ID (Sequential like in app.js)
  let nextOrderNum = 1;
  try {
    const { data: existingOrders } = await supabase.from('mukil_orders').select('id');
    if (existingOrders && existingOrders.length > 0) {
      const orderNums = existingOrders.map(o => {
        if (o.id && o.id.startsWith('OR')) return parseInt(o.id.replace('OR', ''));
        return null;
      }).filter(n => n !== null && !isNaN(n));
      if (orderNums.length > 0) nextOrderNum = Math.max(...orderNums) + 1;
    }
  } catch (err) { console.error("Error fetching order count:", err); }

  const orderId = 'OR' + nextOrderNum.toString().padStart(3, '0');

  const order = {
    id: orderId,
    date: new Date().toISOString(),
    customer: { name: `${firstName} ${lastName}`, phone, address },
    items: [...cart],
    total: totalAmount
  };

  try {
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';

    // 1. Save to Supabase
    const { error } = await supabase.from('mukil_orders').insert(order);
    if (error) throw error;

    // 2. Clear Cart
    localStorage.removeItem('mukil_cart');

    // 3. Success Notification
    Swal.fire({
      title: 'Order Confirmed!',
      html: `
        <div style="font-size: 1.1em; margin-bottom: 10px;">Thank you, <strong>${firstName}</strong>!</div>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
          <div style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Your Order ID is:</div>
          <div style="font-size: 1.8em; font-weight: 800; letter-spacing: 2px; color: #000;">${orderId}</div>
        </div>
        <p style="margin-top: 15px; font-size: 0.9em; color: #666;">We will contact you shortly.</p>
      `,
      icon: 'success',
      confirmButtonText: 'Great!',
      confirmButtonColor: '#000'
    }).then(() => {
      window.location.href = 'index.html';
    });

  } catch (err) {
    console.error("Order error:", err);
    Swal.fire('Error', 'Failed to place order. Please try again.', 'error');
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Place Order';
  }
}
