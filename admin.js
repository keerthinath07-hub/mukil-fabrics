import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zotvzqtkfwlcvqakdtwo.supabase.co';
const supabaseKey = 'sb_publishable_7c4B5AiAgzJKuuLgIuhuEQ_NQP3Am6m';
const supabase = createClient(supabaseUrl, supabaseKey);

const defaultProducts = [
  { id: 'p1', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️.jpg'], category: ['all', 'maxi', 'new'], tags: ['New', 'Sale'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 45 },
  { id: 'p2', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (1).jpg'], category: ['all', 'maxi'], tags: ['Bestseller'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 32 },
  { id: 'p3', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (2).jpg'], category: ['all', 'maxi'], tags: [], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 18 },
  { id: 'p4', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (3).jpg'], category: ['all', 'maxi'], tags: ['Sale'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 25 },
  { id: 'p5', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (4).jpg'], category: ['all', 'maxi', 'bestseller'], tags: ['Trending'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 50 },
  { id: 'p6', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (5).jpg'], category: ['all', 'maxi'], tags: [], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 11 },
  { id: 'p7', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (7).jpg'], category: ['all', 'maxi'], tags: ['New'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 29 },
  { id: 'p8', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (8).jpg'], category: ['all', 'maxi'], tags: [], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 14 },
  { id: 'p9', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (9).jpg'], category: ['all', 'maxi', 'new'], tags: ['Sale'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 36 },
  { id: 'p10', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (10).jpg'], category: ['all', 'maxi'], tags: [], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 21 },
  { id: 'p11', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (11).jpg'], category: ['all', 'maxi'], tags: ['Trending'], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 42 },
  { id: 'p12', name: 'Pleated Maxi with Lining', price: 1499, originalPrice: 1999, discount: '25%', images: ['photos/Pleated maxi with lining ❤️ (12).jpg'], category: ['all', 'maxi'], tags: [], sizes: [{ size: 'S', available: true, quantity: 10 }, { size: 'M', available: true, quantity: 10 }, { size: 'L', available: true, quantity: 10 }, { size: 'XL', available: true, quantity: 10 }, { size: 'XXL', available: true, quantity: 10 }], reviews: 9 }
];

  async function seedDatabase() {
    for (const p of defaultProducts) {
      await supabase.from('mukil_products').upsert(p);
    }
  }

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

  // Check if running via file:// (ES Modules won't work)
  if (window.location.protocol === 'file:') {
    alert("CRITICAL: ES Modules (used for Firebase) do not work when opening HTML files directly via 'file://'. Please use a local server (e.g., Live Server in VS Code, or 'npx serve').");
  }

  // --- DB Status Banner ---
  function showDbBanner(type, message) {
    let banner = document.getElementById('dbStatusBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'dbStatusBanner';
      banner.style.padding = '10px 20px';
      banner.style.textAlign = 'center';
      banner.style.fontWeight = '500';
      banner.style.fontSize = '0.9rem';
      banner.style.transition = 'all 0.3s ease';
      banner.style.position = 'relative';
      banner.style.zIndex = '9999';
      document.body.insertBefore(banner, document.body.firstChild);
    }

    if (!document.getElementById('bannerAnimations')) {
      const style = document.createElement('style');
      style.id = 'bannerAnimations';
      style.innerHTML = `
        @keyframes pulse-buffer {
          0% { opacity: 0.5; }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0.5; }
        }
        @keyframes slide-down-fade {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes pop-in {
          0% { transform: scale(0.95); opacity: 0; }
          60% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    // Reset animations
    banner.style.animation = 'none';
    void banner.offsetWidth; // trigger reflow

    if (type === 'error') {
      banner.style.background = '#e74c3c';
      banner.style.color = '#fff';
      banner.innerHTML = message;
      banner.style.animation = 'slide-down-fade 0.4s ease-out forwards';
    } else if (type === 'success') {
      banner.style.background = '#27ae60';
      banner.style.color = '#fff';
      banner.innerHTML = message;
      banner.style.animation = 'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
      setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-10px)';
        setTimeout(() => { if(banner && banner.parentNode) banner.remove(); banner = null; }, 300);
      }, 4000);
    } else if (type === 'warning') {
      banner.style.background = '#f39c12';
      banner.style.color = '#fff';
      // Use standard text but apply pulse-buffer animation to the container span
      banner.innerHTML = `<span style="display:inline-block; animation: pulse-buffer 1.5s infinite ease-in-out;">${message.replace('⏳', '🔄')}</span>`;
      banner.style.animation = 'slide-down-fade 0.4s ease-out forwards';
    }
  }

  // Supabase Sync
  console.log("🔥 Admin: Initializing Supabase Sync...");
  showDbBanner('warning', '⏳ Connecting to Supabase database...');
  
  let isConnected = false;
  let hasResponded = false;
  
  // Fallback timeout for local firewall blocking
  setTimeout(() => {
    if (!hasResponded) {
      console.warn("⚠️ Admin: Database connection blocked by firewall. Loading offline fallback data...");
      showDbBanner('warning', '⚠️ Firewall Blocked Connection. Showing Offline Preview.');
      
      const loader = document.getElementById('globalLoader');
      if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
      }
      
      // Load the 12 photos as fallback
      products = JSON.parse(JSON.stringify(defaultProducts));
      renderTable();
    }
  }, 2000);

  async function initSupabaseAdmin() {
    try {
      const { data: snapshot, error } = await supabase.from('mukil_products').select('*');
      hasResponded = true;
      if (error) throw error;

      isConnected = true;
      console.log("📦 Admin: Products snapshot received. Count:", snapshot.length);
      showDbBanner('success', '✅ Connected to Supabase! Database is live.');
      
      const loader = document.getElementById('globalLoader');
      if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2c3e50', '#e74c3c', '#f39c12', '#27ae60']
          });
        }
      }

      if (snapshot.length < 5) {
        console.log("🌱 Admin: Injecting default photos into database...");
        await seedDatabase();
        const { data: newSnapshot } = await supabase.from('mukil_products').select('*');
        products = newSnapshot || [];
        renderTable();
      } else {
        products = snapshot;
        renderTable();
      }

      supabase.channel('public:mukil_products')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'mukil_products' }, payload => {
          if (payload.eventType === 'INSERT') {
            products.push(payload.new);
          } else if (payload.eventType === 'UPDATE') {
            const idx = products.findIndex(p => p.id === payload.new.id);
            if (idx !== -1) products[idx] = payload.new;
          } else if (payload.eventType === 'DELETE') {
            products = products.filter(p => p.id !== payload.old.id);
          }
          renderTable();
        })
        .subscribe();

    } catch (error) {
      hasResponded = true;
      console.error("❌ Admin: Products sync error:", error);
      showDbBanner('error', '❌ Database error: ' + error.message + ' | Check browser console (F12) for details.');
    }

    try {
      const { data: ordersSnapshot, error: ordersError } = await supabase.from('mukil_orders').select('*');
      if (ordersError) throw ordersError;
      console.log("📦 Admin: Orders snapshot received.");
      orders = ordersSnapshot;
      renderOrders();

      supabase.channel('public:mukil_orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'mukil_orders' }, payload => {
          if (payload.eventType === 'INSERT') {
            orders.push(payload.new);
          } else if (payload.eventType === 'UPDATE') {
            const idx = orders.findIndex(o => o.id === payload.new.id);
            if (idx !== -1) orders[idx] = payload.new;
          } else if (payload.eventType === 'DELETE') {
            orders = orders.filter(o => o.id !== payload.old.id);
          }
          renderOrders();
        })
        .subscribe();
    } catch (error) {
      console.error("❌ Admin: Orders sync error:", error);
    }
  }

  initSupabaseAdmin();

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
    try {
      productsTableBody.innerHTML = products.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No products found.</td></tr>' : '';
      products.forEach(product => {
        const sizes = product.sizes || [];
        const sizesHTML = sizes.map(s => {
          const qty = s.quantity !== undefined ? s.quantity : (s.available ? 10 : 0);
          return `<span class="badge ${qty > 0 ? 'available' : 'unavailable'}">${s.size} (${qty})</span>`;
        }).join('');

        const categories = Array.isArray(product.category) ? product.category : [product.category || 'all'];
        const images = Array.isArray(product.images) ? product.images : [product.images || ''];

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${images[0]}" class="product-img-thumb" onerror="this.src='https://via.placeholder.com/50x60'"></td>
          <td><strong>${product.name || 'Unnamed Product'}</strong><br><small class="text-muted">${categories.join(', ')}</small></td>
          <td>₹${product.price || 0}</td>
          <td>${product.discount || '-'}</td>
          <td>${sizesHTML}</td>
          <td class="actions">
            <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
            <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
          </td>
        `;
        productsTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error("❌ Admin: Error rendering table:", err);
      productsTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Error rendering table. Check console.</td></tr>`;
    }
  }

  function renderOrders() {
    try {
      ordersTableBody.innerHTML = orders.length === 0 ? '<tr><td colspan="4" style="text-align:center;">No orders found.</td></tr>' : '';
      let totalRev = 0, totalItems = 0;
      
      const sortedOrders = [...orders].filter(o => o.date).sort((a, b) => new Date(b.date) - new Date(a.date));
      
      sortedOrders.forEach(order => {
        totalRev += (order.total || 0);
        let itemsHTML = '';
        const items = order.items || [];
        items.forEach(item => {
          itemsHTML += `<div style="font-size:0.9em;">• ${item.name || 'Item'} <span class="badge" style="background:#eee;">${item.size || 'N/A'}</span> x <strong>${item.qty || 1}</strong></div>`;
          totalItems += (item.qty || 1);
        });

        const orderDate = order.date ? new Date(order.date).toLocaleString() : 'N/A';
        const customer = order.customer || { name: 'Unknown', phone: 'N/A', address: 'N/A' };

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><small>${orderDate}</small></td>
          <td><strong>${customer.name}</strong><br><small>${customer.phone}</small><br><small>${customer.address}</small></td>
          <td>${itemsHTML}</td>
          <td><strong>₹${order.total || 0}</strong></td>
        `;
        ordersTableBody.appendChild(tr);
      });
      ordersStats.innerHTML = `
        <div style="background:#fff; padding:15px; border:1px solid #eee; border-radius:8px; flex:1;"><div>Revenue</div><div style="font-size:1.5em; font-weight:600;">₹${totalRev}</div></div>
        <div style="background:#fff; padding:15px; border:1px solid #eee; border-radius:8px; flex:1;"><div>Items Sold</div><div style="font-size:1.5em; font-weight:600;">${totalItems}</div></div>
        <div style="background:#fff; padding:15px; border:1px solid #eee; border-radius:8px; flex:1;"><div>Orders</div><div style="font-size:1.5em; font-weight:600;">${orders.length}</div></div>
      `;
    } catch (err) {
      console.error("❌ Admin: Error rendering orders:", err);
      ordersTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Error rendering orders. Check console.</td></tr>`;
    }
  }

  function openModal(productId = null) {
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

  function closeModal() {
    productModal.classList.remove('active');
  }

  async function saveProduct() {
    const saveBtn = productForm.querySelector('button[type="submit"]');
    const originalBtnText = saveBtn.textContent;

    try {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';

      const idField = document.getElementById('productId').value.trim();
      const isNew = !idField;
      
      const sizes = ['S', 'M', 'L', 'XL', 'XXL'].map(size => {
        const input = document.getElementById(`qty${size}`);
        const qty = parseInt(input ? input.value : 0) || 0;
        return { size, available: qty > 0, quantity: qty };
      });

      const existingProduct = isNew ? null : products.find(p => p.id === idField);
      const reviews = existingProduct ? (existingProduct.reviews || 0) : 0;

      // Handle image uploads
      const fileInput = document.getElementById('productImageUpload');
      const files = fileInput ? fileInput.files : [];
      let uploadedImageUrls = [];
      
      if (files.length > 0) {
        saveBtn.textContent = 'Uploading Photos...';
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2,9)}.${fileExt}`;
          
          const { data, error } = await supabase.storage
            .from('product-images')
            .upload(fileName, file, { cacheControl: '3600', upsert: false });
            
          if (error) {
            console.error('Upload error:', error);
            alert(`Failed to upload ${file.name}: ${error.message}`);
            throw error;
          }
          
          const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
            
          if (publicUrlData && publicUrlData.publicUrl) {
            uploadedImageUrls.push(publicUrlData.publicUrl);
          }
        }
      }

      // Combine manually pasted URLs with newly uploaded URLs
      const manualImages = document.getElementById('productImages').value.split(',').map(s => s.trim()).filter(s => s);
      const allImages = [...manualImages, ...uploadedImageUrls];

      const product = {
        name: document.getElementById('productName').value.trim(),
        price: parseInt(document.getElementById('productPrice').value) || 0,
        originalPrice: document.getElementById('productOriginalPrice').value ? parseInt(document.getElementById('productOriginalPrice').value) : null,
        discount: document.getElementById('productDiscount').value.trim() || null,
        images: allImages,
        category: document.getElementById('productCategory').value.split(',').map(s => s.trim()).filter(s => s),
        tags: document.getElementById('productTags').value.split(',').map(s => s.trim()).filter(s => s),
        sizes: sizes,
        reviews: reviews
      };

      const withTimeout = (promise, ms) => Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
      ]);

      if (isNew) {
        // No ID needed, Supabase will generate one if not provided, or we can use UUID.
        // But our schema expects 'id' to be text, so let's generate a quick ID if it's new
        product.id = 'prod_' + Math.random().toString(36).substr(2, 9);
        const { error } = await withTimeout(supabase.from('mukil_products').insert(product), 8000);
        if (error) throw error;
      } else {
        product.id = idField;
        const { error } = await withTimeout(supabase.from('mukil_products').update(product).eq('id', idField), 8000);
        if (error) throw error;
      }

      showDbBanner('success', '🎉 Product saved successfully!');
      closeModal();
    } catch (err) {
      console.error('❌ Error in save process:', err);
      if (err.message === 'timeout') {
        alert('❌ SAVE TIMEOUT!\n\nThe database took too long to respond. This usually happens if your internet connection is weak, or a firewall is blocking Supabase.\n\nPlease check your connection and try again.');
      } else {
        alert('❌ Error processing form:\n' + err.message);
      }
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = originalBtnText;
    }
  }

  function editProduct(id) {
    openModal(id);
  }

  async function deleteProduct(id) {
    if (confirm('Delete this product?')) {
      await supabase.from('mukil_products').delete().eq('id', id);
    }
  }

  // Assign to window for global access (from HTML onclicks)
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.editProduct = editProduct;
  window.deleteProduct = deleteProduct;
});
