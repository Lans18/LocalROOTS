// ===================================
// ADMIN DASHBOARD FUNCTIONALITY
// ===================================

// Sample data
let adminData = {
    products: getStoredData('adminProducts', generateSampleProducts()),
    vendors: getStoredData('adminVendors', generateSampleVendors()),
    orders: getStoredData('adminOrders', generateSampleOrders()),
    users: getStoredData('adminUsers', generateSampleUsers()),
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initAdminNavigation();
    initSectionNavigation();
    initDashboard();
    initProductsSection();
    initVendorsSection();
    initOrdersSection();
    initUsersSection();
    initAnalyticsSection();
    initSettingsSection();
    checkAdminAuth();
});

function checkAdminAuth() {
    const isAdmin = getStoredData('isAdmin', false);
    if (!isAdmin) {
        showToast('Admin access denied. Redirecting...', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// ===================================
// NAVIGATION
// ===================================
function initAdminNavigation() {
    const toggle = document.getElementById('adminNavToggle');
    const menu = document.getElementById('adminNavMenu');

    if (toggle) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

function initSectionNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show active section
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.querySelector(`[data-section="${section}"]`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

function logout() {
    removeStoredData('isAdmin');
    removeStoredData('isLoggedIn');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// ===================================
// DASHBOARD
// ===================================
function initDashboard() {
    updateDashboardStats();
    renderRecentOrders();
    renderRecentProducts();
}

function updateDashboardStats() {
    document.getElementById('totalProducts').textContent = adminData.products.length;
    document.getElementById('totalVendors').textContent = adminData.vendors.length;
    document.getElementById('totalOrders').textContent = adminData.orders.length;
    document.getElementById('totalUsers').textContent = adminData.users.length;
}

function renderRecentOrders() {
    const container = document.getElementById('recentOrders');
    const recent = adminData.orders.slice(-5).reverse();

    container.innerHTML = recent.map(order => `
        <div class="recent-item">
            <h4>Order #${order.id}</h4>
            <p>Customer: ${sanitizeHTML(order.customer)}</p>
            <p>Total: ${formatCurrency(order.total)} - <span class="status-badge ${order.status}">${capitalize(order.status)}</span></p>
        </div>
    `).join('');
}

function renderRecentProducts() {
    const container = document.getElementById('recentProducts');
    const recent = adminData.products.slice(-5).reverse();

    container.innerHTML = recent.map(product => `
        <div class="recent-item">
            <h4>${sanitizeHTML(product.name)}</h4>
            <p>Price: ${formatCurrency(product.price)}</p>
            <p>Vendor: ${sanitizeHTML(product.vendor)}</p>
        </div>
    `).join('');
}

// ===================================
// PRODUCTS SECTION
// ===================================
function initProductsSection() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const productForm = document.getElementById('productForm');

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }

    if (productForm) {
        productForm.addEventListener('submit', handleProductFormSubmit);
    }

    populateProductVendorDropdown();
    renderProducts();
}

function populateProductVendorDropdown() {
    const vendorSelect = document.getElementById('productVendor');
    if (!vendorSelect) return;

    vendorSelect.innerHTML = '<option value="">Select a vendor</option>';
    adminData.vendors.forEach(vendor => {
        const option = document.createElement('option');
        option.value = vendor.name;
        option.textContent = vendor.name;
        vendorSelect.appendChild(option);
    });
}

function handleProductFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const newProduct = {
        id: String(adminData.products.length + 1),
        name: formData.get('productName'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        vendor: formData.get('vendor'),
        description: formData.get('description'),
        rating: 4.5
    };

    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.vendor) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    adminData.products.push(newProduct);
    storeData('adminProducts', adminData.products);
    renderProducts();
    updateDashboardStats();
    closeModal('productModal');
    form.reset();
    showToast('Product added successfully', 'success');
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';

    let filtered = adminData.products;

    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.vendor.toLowerCase().includes(searchTerm)
        );
    }

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    renderProductsTable(filtered);
}

function renderProducts() {
    renderProductsTable(adminData.products);
}

function renderProductsTable(products) {
    const tbody = document.getElementById('productsTable');

    tbody.innerHTML = products.map(product => `
        <tr>
            <td><strong>${sanitizeHTML(product.name)}</strong></td>
            <td>${capitalize(product.category)}</td>
            <td>${sanitizeHTML(product.vendor)}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.rating}⭐</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No products found</td></tr>';
    }
}

function editProduct(id) {
    const product = adminData.products.find(p => p.id === id);
    if (product) {
        showToast('Edit product: ' + product.name, 'info');
        // Open modal with product data
    }
}

function deleteProduct(id) {
    const product = adminData.products.find(p => p.id === id);
    if (product) {
        showConfirmation(
            'Delete Product',
            `Are you sure you want to delete "${product.name}"?`,
            () => {
                adminData.products = adminData.products.filter(p => p.id !== id);
                storeData('adminProducts', adminData.products);
                renderProducts();
                showToast('Product deleted successfully', 'success');
            }
        );
    }
}

// ===================================
// VENDORS SECTION
// ===================================
function initVendorsSection() {
    const searchInput = document.getElementById('vendorSearch');
    const statusFilter = document.getElementById('statusFilter');
    const vendorForm = document.getElementById('vendorForm');

    if (searchInput) {
        searchInput.addEventListener('input', filterVendors);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterVendors);
    }

    if (vendorForm) {
        vendorForm.addEventListener('submit', handleVendorFormSubmit);
    }

    renderVendors();
}

function handleVendorFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const newVendor = {
        id: String(adminData.vendors.length + 1),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        status: formData.get('status'),
        location: formData.get('location'),
        description: formData.get('description'),
        products: 0,
        joined: new Date().toISOString().split('T')[0]
    };

    if (!newVendor.name || !newVendor.email || !newVendor.phone || !newVendor.status) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    adminData.vendors.push(newVendor);
    storeData('adminVendors', adminData.vendors);
    renderVendors();
    updateDashboardStats();
    populateProductVendorDropdown();
    closeModal('vendorModal');
    form.reset();
    showToast('Vendor added successfully', 'success');
}

function filterVendors() {
    const searchTerm = document.getElementById('vendorSearch')?.value.toLowerCase() || '';
    const status = document.getElementById('statusFilter')?.value || '';

    let filtered = adminData.vendors;

    if (searchTerm) {
        filtered = filtered.filter(v => 
            v.name.toLowerCase().includes(searchTerm) ||
            v.email.toLowerCase().includes(searchTerm)
        );
    }

    if (status) {
        filtered = filtered.filter(v => v.status === status);
    }

    renderVendorsTable(filtered);
}

function renderVendors() {
    renderVendorsTable(adminData.vendors);
}

function renderVendorsTable(vendors) {
    const tbody = document.getElementById('vendorsTable');

    tbody.innerHTML = vendors.map(vendor => `
        <tr>
            <td><strong>${sanitizeHTML(vendor.name)}</strong></td>
            <td>${sanitizeHTML(vendor.email)}</td>
            <td>${sanitizeHTML(vendor.phone)}</td>
            <td><span class="status-badge ${vendor.status}">${capitalize(vendor.status)}</span></td>
            <td>${vendor.products}</td>
            <td>${formatDate(vendor.joined)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewVendor('${vendor.id}')">View</button>
                    <button class="action-btn edit" onclick="editVendor('${vendor.id}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteVendor('${vendor.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    if (vendors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No vendors found</td></tr>';
    }
}

function viewVendor(id) {
    const vendor = adminData.vendors.find(v => v.id === id);
    if (vendor) {
        showToast('Viewing vendor: ' + vendor.name, 'info');
    }
}

function editVendor(id) {
    const vendor = adminData.vendors.find(v => v.id === id);
    if (vendor) {
        showToast('Edit vendor: ' + vendor.name, 'info');
    }
}

function deleteVendor(id) {
    const vendor = adminData.vendors.find(v => v.id === id);
    if (vendor) {
        showConfirmation(
            'Delete Vendor',
            `Are you sure you want to delete "${vendor.name}"?`,
            () => {
                adminData.vendors = adminData.vendors.filter(v => v.id !== id);
                storeData('adminVendors', adminData.vendors);
                renderVendors();
                showToast('Vendor deleted successfully', 'success');
            }
        );
    }
}

// ===================================
// ORDERS SECTION
// ===================================
function initOrdersSection() {
    const searchInput = document.getElementById('orderSearch');
    const statusFilter = document.getElementById('orderStatusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterOrders);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrders);
    }

    renderOrders();
}

function filterOrders() {
    const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const status = document.getElementById('orderStatusFilter')?.value || '';

    let filtered = adminData.orders;

    if (searchTerm) {
        filtered = filtered.filter(o => 
            o.id.toLowerCase().includes(searchTerm) ||
            o.customer.toLowerCase().includes(searchTerm)
        );
    }

    if (status) {
        filtered = filtered.filter(o => o.status === status);
    }

    renderOrdersTable(filtered);
}

function renderOrders() {
    renderOrdersTable(adminData.orders);
}

function renderOrdersTable(orders) {
    const tbody = document.getElementById('ordersTable');

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>#${order.id}</strong></td>
            <td>${sanitizeHTML(order.customer)}</td>
            <td>${order.items}</td>
            <td>${formatCurrency(order.total)}</td>
            <td><span class="status-badge ${order.status}">${capitalize(order.status)}</span></td>
            <td>${formatDate(order.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewOrder('${order.id}')">View</button>
                    <button class="action-btn edit" onclick="editOrder('${order.id}')">Update</button>
                </div>
            </td>
        </tr>
    `).join('');

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No orders found</td></tr>';
    }
}

function viewOrder(id) {
    showToast('Viewing order #' + id, 'info');
}

function editOrder(id) {
    showToast('Editing order #' + id, 'info');
}

// ===================================
// USERS SECTION
// ===================================
function initUsersSection() {
    const searchInput = document.getElementById('userSearch');
    const roleFilter = document.getElementById('roleFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    }

    if (roleFilter) {
        roleFilter.addEventListener('change', filterUsers);
    }

    renderUsers();
}

function filterUsers() {
    const searchTerm = document.getElementById('userSearch')?.value.toLowerCase() || '';
    const role = document.getElementById('roleFilter')?.value || '';

    let filtered = adminData.users;

    if (searchTerm) {
        filtered = filtered.filter(u => 
            u.name.toLowerCase().includes(searchTerm) ||
            u.email.toLowerCase().includes(searchTerm)
        );
    }

    if (role) {
        filtered = filtered.filter(u => u.role === role);
    }

    renderUsersTable(filtered);
}

function renderUsers() {
    renderUsersTable(adminData.users);
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTable');

    tbody.innerHTML = users.map(user => `
        <tr>
            <td><strong>${sanitizeHTML(user.name)}</strong></td>
            <td>${sanitizeHTML(user.email)}</td>
            <td>${capitalize(user.role)}</td>
            <td>${formatDate(user.joined)}</td>
            <td>${user.orders}</td>
            <td><span class="status-badge ${user.status}">${capitalize(user.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editUser('${user.id}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteUser('${user.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No users found</td></tr>';
    }
}

function editUser(id) {
    const user = adminData.users.find(u => u.id === id);
    if (user) {
        showToast('Edit user: ' + user.name, 'info');
    }
}

function deleteUser(id) {
    const user = adminData.users.find(u => u.id === id);
    if (user) {
        showConfirmation(
            'Delete User',
            `Are you sure you want to delete "${user.name}"?`,
            () => {
                adminData.users = adminData.users.filter(u => u.id !== id);
                storeData('adminUsers', adminData.users);
                renderUsers();
                showToast('User deleted successfully', 'success');
            }
        );
    }
}

// ===================================
// ANALYTICS SECTION
// ===================================
function initAnalyticsSection() {
    calculateAnalytics();
}

function calculateAnalytics() {
    // Revenue
    const monthlyRevenue = adminData.orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('monthlyRevenue').textContent = formatCurrency(monthlyRevenue);

    // Average Order Value
    const avgOrder = adminData.orders.length > 0 
        ? monthlyRevenue / adminData.orders.length 
        : 0;
    document.getElementById('avgOrderValue').textContent = formatCurrency(avgOrder);

    // Sales by Category
    renderSalesByCategory();
}

function renderSalesByCategory() {
    const container = document.getElementById('salesByCategory');
    const categories = {};

    adminData.products.forEach(product => {
        const cat = capitalize(product.category);
        categories[cat] = (categories[cat] || 0) + 1;
    });

    container.innerHTML = Object.entries(categories).map(([cat, count]) => `
        <div class="category-stat">
            <span>${cat}</span>
            <span>${count} products</span>
        </div>
    `).join('');
}

// ===================================
// SETTINGS SECTION
// ===================================
function initSettingsSection() {
    const siteFrm = document.getElementById('siteSettings');
    const paymentFrm = document.getElementById('paymentSettings');
    const emailFrm = document.getElementById('emailSettings');
    const shippingFrm = document.getElementById('shippingSettings');

    if (siteFrm) {
        siteFrm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Site settings saved successfully', 'success');
        });
    }

    if (paymentFrm) {
        paymentFrm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Payment settings saved successfully', 'success');
        });
    }

    if (emailFrm) {
        emailFrm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Email settings saved successfully', 'success');
        });
    }

    if (shippingFrm) {
        shippingFrm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Shipping settings saved successfully', 'success');
        });
    }
}

// ===================================
// MODAL FUNCTIONS
// ===================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        
        // Populate vendor dropdown when opening product modal
        if (modalId === 'productModal') {
            populateProductVendorDropdown();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function showConfirmation(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    
    const confirmBtn = document.getElementById('confirmButton');
    const oldConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(oldConfirmBtn, confirmBtn);
    
    oldConfirmBtn.addEventListener('click', () => {
        closeModal('confirmModal');
        onConfirm();
    });

    openModal('confirmModal');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
    }
});

// ===================================
// SAMPLE DATA GENERATORS
// ===================================
function generateSampleProducts() {
    return [
        { id: '1', name: 'Organic Mixed Greens', category: 'produce', vendor: 'Green Acres Farm', price: 8.99, rating: 4.8 },
        { id: '2', name: 'Artisan Sourdough', category: 'baked', vendor: 'Artisan Bakery', price: 6.50, rating: 5.0 },
        { id: '3', name: 'Farm Fresh Eggs', category: 'dairy', vendor: 'Valley View Dairy', price: 7.25, rating: 4.9 },
        { id: '4', name: 'Lavender Soap', category: 'crafts', vendor: 'Crafted by Hand', price: 12.00, rating: 4.7 },
        { id: '5', name: 'Raw Honey', category: 'pantry', vendor: 'Sunrise Organics', price: 14.99, rating: 4.9 },
    ];
}

function generateSampleVendors() {
    return [
        { id: '1', name: 'Green Acres Farm', email: 'info@greenacres.com', phone: '555-0101', status: 'active', products: 12, joined: '2025-01-15' },
        { id: '2', name: 'Artisan Bakery Co.', email: 'hello@artisanbakery.com', phone: '555-0102', status: 'active', products: 8, joined: '2025-02-10' },
        { id: '3', name: 'Valley View Dairy', email: 'contact@valleyview.com', phone: '555-0103', status: 'pending', products: 5, joined: '2026-03-01' },
        { id: '4', name: 'Crafted by Hand', email: 'info@crafted.com', phone: '555-0104', status: 'active', products: 15, joined: '2025-01-20' },
        { id: '5', name: 'Sunrise Organics', email: 'hello@sunrise.com', phone: '555-0105', status: 'active', products: 20, joined: '2025-03-05' },
    ];
}

function generateSampleOrders() {
    return [
        { id: '001', customer: 'John Doe', items: 3, total: 45.99, status: 'delivered', date: '2026-03-20' },
        { id: '002', customer: 'Jane Smith', items: 2, total: 32.50, status: 'shipped', date: '2026-03-22' },
        { id: '003', customer: 'Mike Johnson', items: 5, total: 78.25, status: 'processing', date: '2026-03-24' },
        { id: '004', customer: 'Sarah Williams', items: 1, total: 14.99, status: 'pending', date: '2026-03-28' },
        { id: '005', customer: 'Tom Brown', items: 4, total: 62.75, status: 'delivered', date: '2026-03-18' },
    ];
}

function generateSampleUsers() {
    return [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', joined: '2025-01-10', orders: 5, status: 'active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'vendor', joined: '2025-02-15', orders: 0, status: 'active' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'customer', joined: '2025-03-05', orders: 2, status: 'active' },
        { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'customer', joined: '2026-01-20', orders: 1, status: 'active' },
        { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'vendor', joined: '2025-11-30', orders: 0, status: 'inactive' },
    ];
}
