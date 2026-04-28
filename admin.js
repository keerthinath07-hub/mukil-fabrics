import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdi6rU_eGbrdbenE5LQp-bgC58QkYQ-UQ",
  authDomain: "mukil-fabrics.firebaseapp.com",
  projectId: "mukil-fabrics",
  storageBucket: "mukil-fabrics.firebasestorage.app",
  messagingSenderId: "486533319432",
  appId: "1:486533319432:web:093be705ef9d96a4647abd",
  measurementId: "G-RVMHF7LXTQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  let products = [];
  let orders = [];

  const productsTableBody = document.getElementById('productsTableBody');
  const addProductBtn = document.getElementById('addProductBtn');
  const productModal = document.getElementById('productModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const productForm = document.getElementById('productForm');
  const modalTitle = document.getElementById('modalTitle');

  const tabProducts = document.getElementById('tabProducts');
  const tabOrders = document.getElementById('tabOrders');
  const sectionProducts = document.getElementById('sectionProducts');
  const sectionOrders = document.getElementById('sectionOrders');
  const pageTitle = document.getElementById('pageTitle');
  const ordersTableBody = document.getElementById('ordersTableBody');
  const ordersStats = document.getElementById('ordersStats');

  // Firestore Sync
  console.log("🔥 Admin: Initializing Firestore Sync...");
  onSnapshot(collection(db, 'mukil_products'), (snapshot) => {
    console.log("📦 Admin: Products snapshot received.");
    products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderTable();
  }, (error) => {
    console.error("❌ Admin: Products sync error:", error);
  });

  onSnapshot(collection(db, 'mukil_orders'), (snapshot) => {
    console.log("📦 Admin: Orders snapshot received.");
    orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderOrders();
  }, (error) => {
    console.error("❌ Admin: Orders sync error:", error);
  });

  // Event Listeners
  addProductBtn.addEventListener('click', () => openModal());
  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveProduct();
  });

  tabProducts.addEventListener('click', (e) => {
    e.preventDefault();
    tabOrders.classList.remove('active');
    tabProducts.classList.add('active');
    sectionOrders.style.display = 'none';
    sectionProducts.style.display = 'block';
    pageTitle.textContent = 'Product Management';
    addProductBtn.style.display = 'block';
  });

  tabOrders.addEventListener('click', (e) => {
    e.preventDefault();
    tabProducts.classList.remove('active');
    tabOrders.classList.add('active');
    sectionProducts.style.display = 'none';
    sectionOrders.style.display = 'block';
    pageTitle.textContent = 'Orders Overview';
    addProductBtn.style.display = 'none';
  });

  // Functions
  function renderTable() {
    productsTableBody.innerHTML = products.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No products found.</td></tr>' : '';
    products.forEach(product => {
      const sizesHTML = product.sizes.map(s => {
        const qty = s.quantity !== undefined ? s.quantity : (s.available ? 10 : 0);
        return `<span class="badge ${qty > 0 ? 'available' : 'unavailable'}">${s.size} (${qty})</span>`;
      }).join('');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${product.images[0]}" class="product-img-thumb" onerror="this.src='https://via.placeholder.com/50x60'"></td>
        <td><strong>${product.name}</strong><br><small class="text-muted">${product.category.join(', ')}</small></td>
        <td>₹${product.price}</td>
        <td>${product.discount || '-'}</td>
        <td>${sizesHTML}</td>
        <td class="actions">
          <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
          <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
        </td>
      `;
      productsTableBody.appendChild(tr);
    });
  }

  function renderOrders() {
    ordersTableBody.innerHTML = orders.length === 0 ? '<tr><td colspan="4" style="text-align:center;">No orders found.</td></tr>' : '';
    let totalRev = 0, totalItems = 0;
    [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(order => {
      totalRev += order.total;
      let itemsHTML = '';
      order.items.forEach(item => {
        itemsHTML += `<div style="font-size:0.9em;">• ${item.name} <span class="badge" style="background:#eee;">${item.size}</span> x <strong>${item.qty}</strong></div>`;
        totalItems += item.qty;
      });
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><small>${new Date(order.date).toLocaleString()}</small></td>
        <td><strong>${order.customer.name}</strong><br><small>${order.customer.phone}</small><br><small>${order.customer.address}</small></td>
        <td>${itemsHTML}</td>
        <td><strong>₹${order.total}</strong></td>
      `;
      ordersTableBody.appendChild(tr);
    });
    ordersStats.innerHTML = `
      <div style="background:#fff; padding:15px; border:1px solid #eee; border-radius:8px; flex:1;"><div>Revenue</div><div style="font-size:1.5em; font-weight:600;">₹${totalRev}</div></div>
      <div style="background:#fff; padding:15px; border:1px solid #eee; border-radius:8px; flex:1;"><div>Items Sold</div><div style="font-size:1.5em; font-weight:600;">${totalItems}</div></div>
      <div style="background:#fff; padding:15px; border:1px solid #eee; border-radius:8px; flex:1;"><div>Orders</div><div style="font-size:1.5em; font-weight:600;">${orders.length}</div></div>
    `;
  }

  window.openModal = function(productId = null) {
    productForm.reset();
    if (productId) {
      modalTitle.textContent = 'Edit Product';
      const p = products.find(p => p.id === productId);
      if (p) {
        document.getElementById('productId').value = p.id;
        document.getElementById('productName').value = p.name;
        document.getElementById('productPrice').value = p.price;
        document.getElementById('productOriginalPrice').value = p.originalPrice || '';
        document.getElementById('productDiscount').value = p.discount || '';
        document.getElementById('productImages').value = p.images.join(', ');
        document.getElementById('productCategory').value = p.category.join(', ');
        document.getElementById('productTags').value = p.tags.join(', ');
        p.sizes.forEach(s => {
          const input = document.getElementById(`qty${s.size}`);
          if (input) input.value = s.quantity !== undefined ? s.quantity : (s.available ? 10 : 0);
        });
      }
    } else {
      modalTitle.textContent = 'Add Product';
      document.getElementById('productId').value = '';
    }
    productModal.classList.add('active');
  }

  window.closeModal = function() { productModal.classList.remove('active'); }

  async function saveProduct() {
    const idField = document.getElementById('productId').value;
    const isNew = !idField;
    const id = isNew ? 'p' + Date.now() : idField;
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'].map(size => {
      const qty = parseInt(document.getElementById(`qty${size}`).value) || 0;
      return { size, available: qty > 0, quantity: qty };
    });

    const product = {
      name: document.getElementById('productName').value,
      price: parseInt(document.getElementById('productPrice').value),
      originalPrice: document.getElementById('productOriginalPrice').value ? parseInt(document.getElementById('productOriginalPrice').value) : null,
      discount: document.getElementById('productDiscount').value || null,
      images: document.getElementById('productImages').value.split(',').map(s => s.trim()).filter(s => s),
      category: document.getElementById('productCategory').value.split(',').map(s => s.trim()).filter(s => s),
      tags: document.getElementById('productTags').value.split(',').map(s => s.trim()).filter(s => s),
      sizes: sizes,
      reviews: isNew ? 0 : products.find(p => p.id === id).reviews
    };

    await setDoc(doc(db, 'mukil_products', id), product);
    closeModal();
  }

  window.editProduct = (id) => openModal(id);
  window.deleteProduct = async (id) => {
    if (confirm('Delete this product?')) await deleteDoc(doc(db, 'mukil_products', id));
  };
});
