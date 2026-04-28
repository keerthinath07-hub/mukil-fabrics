document.addEventListener('DOMContentLoaded', () => {
  let products = JSON.parse(localStorage.getItem('mukil_products')) || [];
  let orders = JSON.parse(localStorage.getItem('mukil_orders')) || [];

  const productsTableBody = document.getElementById('productsTableBody');
  const addProductBtn = document.getElementById('addProductBtn');
  const productModal = document.getElementById('productModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const productForm = document.getElementById('productForm');
  const modalTitle = document.getElementById('modalTitle');

  // Tabs DOM
  const tabProducts = document.getElementById('tabProducts');
  const tabOrders = document.getElementById('tabOrders');
  const sectionProducts = document.getElementById('sectionProducts');
  const sectionOrders = document.getElementById('sectionOrders');
  const pageTitle = document.getElementById('pageTitle');
  const ordersTableBody = document.getElementById('ordersTableBody');
  const ordersStats = document.getElementById('ordersStats');

  // Initial render
  renderTable();
  renderOrders();

  // Event Listeners
  addProductBtn.addEventListener('click', () => {
    openModal();
  });

  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveProduct();
  });

  // Tab Listeners
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
    
    // Refresh orders on tab click
    orders = JSON.parse(localStorage.getItem('mukil_orders')) || [];
    renderOrders();
  });

  // Functions
  function renderTable() {
    productsTableBody.innerHTML = '';
    
    if (products.length === 0) {
      productsTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No products found.</td></tr>';
      return;
    }

    products.forEach((product, index) => {
      // Create sizes badges
      const sizesHTML = product.sizes.map(s => {
        const qty = s.quantity !== undefined ? s.quantity : (s.available ? 10 : 0);
        const statusClass = qty > 0 ? 'available' : 'unavailable';
        return `<span class="badge ${statusClass}">${s.size} (${qty})</span>`;
      }).join('');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <img src="${product.images[0]}" alt="${product.name}" class="product-img-thumb" onerror="this.src='https://via.placeholder.com/50x60?text=No+Image'">
        </td>
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

  function openModal(productId = null) {
    productForm.reset();
    
    if (productId) {
      modalTitle.textContent = 'Edit Product';
      const product = products.find(p => p.id === productId);
      if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productOriginalPrice').value = product.originalPrice || '';
        document.getElementById('productDiscount').value = product.discount || '';
        document.getElementById('productImages').value = product.images.join(', ');
        document.getElementById('productCategory').value = product.category.join(', ');
        document.getElementById('productTags').value = product.tags.join(', ');

        // Set sizes
        product.sizes.forEach(s => {
          const input = document.getElementById(`qty${s.size}`);
          if (input) {
            input.value = s.quantity !== undefined ? s.quantity : (s.available ? 10 : 0);
          }
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

  function saveProduct() {
    const idField = document.getElementById('productId').value;
    const isNew = !idField;
    
    const id = isNew ? 'p' + Date.now() : idField;
    
    // Parse comma separated values
    const imagesStr = document.getElementById('productImages').value;
    const images = imagesStr.split(',').map(s => s.trim()).filter(s => s);
    
    const categoryStr = document.getElementById('productCategory').value;
    const category = categoryStr.split(',').map(s => s.trim()).filter(s => s);

    const tagsStr = document.getElementById('productTags').value;
    const tags = tagsStr.split(',').map(s => s.trim()).filter(s => s);

    // Parse sizes
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'].map(size => {
      const qtyStr = document.getElementById(`qty${size}`).value;
      const qty = parseInt(qtyStr, 10) || 0;
      return { size: size, available: qty > 0, quantity: qty };
    });

    const newProduct = {
      id: id,
      name: document.getElementById('productName').value,
      price: parseInt(document.getElementById('productPrice').value),
      originalPrice: document.getElementById('productOriginalPrice').value ? parseInt(document.getElementById('productOriginalPrice').value) : null,
      discount: document.getElementById('productDiscount').value || null,
      images: images,
      category: category,
      tags: tags,
      sizes: sizes,
      reviews: isNew ? 0 : products.find(p => p.id === id).reviews
    };

    if (isNew) {
      products.push(newProduct);
    } else {
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = newProduct;
      }
    }

    localStorage.setItem('mukil_products', JSON.stringify(products));
    renderTable();
    closeModal();
  }

  function renderOrders() {
    ordersTableBody.innerHTML = '';
    
    if (orders.length === 0) {
      ordersTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No orders found.</td></tr>';
      ordersStats.innerHTML = '';
      return;
    }

    let totalRevenue = 0;
    let totalItemsSold = 0;

    // Sort newest first
    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedOrders.forEach(order => {
      totalRevenue += order.total;
      
      let itemsHTML = '';
      let orderItemsCount = 0;
      order.items.forEach(item => {
        itemsHTML += `<div style="margin-bottom: 4px; font-size: 0.9em;">
          • ${item.name} <span class="badge" style="background:#eee;color:#333;font-size:0.8em;padding:2px 6px;">Size: ${item.size}</span> x <strong>${item.qty}</strong>
        </div>`;
        orderItemsCount += item.qty;
      });
      totalItemsSold += orderItemsCount;

      const dateStr = new Date(order.date).toLocaleString();

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="vertical-align: top;"><small>${dateStr}</small></td>
        <td style="vertical-align: top;">
          <strong>${order.customer.name}</strong><br>
          <small class="text-muted">📞 ${order.customer.phone}</small><br>
          <small class="text-muted">🏠 ${order.customer.address}</small>
        </td>
        <td style="vertical-align: top;">${itemsHTML}</td>
        <td style="vertical-align: top; font-weight: bold; color: #1a1a1a;">₹${order.total}</td>
      `;
      ordersTableBody.appendChild(tr);
    });

    ordersStats.innerHTML = `
      <div style="background:#fff; padding: 15px 20px; border-radius: 8px; border: 1px solid #eaeaea; flex: 1;">
        <div style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Total Revenue</div>
        <div style="font-size: 1.8em; font-weight: 600;">₹${totalRevenue}</div>
      </div>
      <div style="background:#fff; padding: 15px 20px; border-radius: 8px; border: 1px solid #eaeaea; flex: 1;">
        <div style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Items Sold</div>
        <div style="font-size: 1.8em; font-weight: 600;">${totalItemsSold}</div>
      </div>
      <div style="background:#fff; padding: 15px 20px; border-radius: 8px; border: 1px solid #eaeaea; flex: 1;">
        <div style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Total Orders</div>
        <div style="font-size: 1.8em; font-weight: 600;">${orders.length}</div>
      </div>
    `;
  }

  // Global functions for inline onclick handlers
  window.editProduct = function(id) {
    openModal(id);
  };

  window.deleteProduct = function(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      products = products.filter(p => p.id !== id);
      localStorage.setItem('mukil_products', JSON.stringify(products));
      renderTable();
    }
  };

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeModal();
    }
  });
});
