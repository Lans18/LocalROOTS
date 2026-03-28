// ===================================
// GLOBAL VARIABLES & STATE
// ===================================
let cart = getStoredData('cart', []);

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCart();
    initNewsletterForm();
    initSmoothScroll();
    updateCartCount();
    lazyLoadImages();
});

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    // Sticky navbar on scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }, 100));

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks?.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navLinks?.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// ===================================
// CART FUNCTIONALITY
// ===================================
function initCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.querySelector('[data-close-cart]');

    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartModal?.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal?.classList.contains('active')) {
            cartModal.classList.remove('active');
        }
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
        cartCount.setAttribute('aria-label', `${totalItems} items in cart`);
    }
}

function addToCart(product) {
    if (!product || !product.id) {
        console.error('Invalid product:', product);
        showToast('Error adding product to cart', 'error');
        return false;
    }

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    storeData('cart', cart);
    updateCartCount();
    showToast(`${product.name} added to cart!`, 'success');
    
    // Add success animation to button
    event.target?.classList.add('success');
    setTimeout(() => event.target?.classList.remove('success'), 2000);
    
    return true;
}

function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    cart = cart.filter(item => item.id !== productId);
    storeData('cart', cart);
    updateCartCount();
    renderCart();
    showToast(`${item.name} removed from cart`, 'info');
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else if (newQuantity <= 999) {
        item.quantity = newQuantity;
        storeData('cart', cart);
        renderCart();
    }
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        renderCart();
        cartModal.classList.add('active');
    }
}

function renderCart() {
    const cartModalBody = document.getElementById('cartModalBody');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartModalBody) return;

    if (cart.length === 0) {
        cartModalBody.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><p style="font-size: 0.9rem; margin-top: 1rem;"><a href="shop.html" style="color: var(--forest-green); font-weight: 600;">Continue Shopping →</a></p></div>';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }

    let total = 0;
    let html = '<div class="summary-items">';

    cart.forEach(item => {
        const itemTotal = (item.price || 0) * (item.quantity || 0);
        total += itemTotal;

        html += `
            <div class="summary-item">
                <img src="${item.image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect fill=\'%23e8dcc8\' width=\'100\' height=\'100\'/%3E%3C/svg%3E'}" alt="${sanitizeHTML(item.name)}">
                <div class="item-info">
                    <h4>${sanitizeHTML(item.name)}</h4>
                    <p>${sanitizeHTML(item.vendor || 'Unknown Vendor')}</p>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})" class="btn btn-small" title="Decrease quantity">−</button>
                        <span>Qty: ${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})" class="btn btn-small" title="Increase quantity">+</button>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                    <span class="item-price">${formatCurrency(itemTotal)}</span>
                    <button onclick="removeFromCart('${item.id}')" style="color: var(--error-color); font-size: 0.875rem; cursor: pointer; border: none; background: none; padding: 0; text-decoration: underline;" title="Remove from cart">Remove</button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    cartModalBody.innerHTML = html;

    if (cartTotal) {
        cartTotal.textContent = formatCurrency(total);
    }
}

// ===================================
// NEWSLETTER FORM
// ===================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            const submitBtn = e.target.querySelector('button[type="submit"]');
            
            if (!emailInput) return;

            const email = emailInput.value.trim();

            // Validate email
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                setFormGroupState(emailInput, false, 'Invalid email address');
                return;
            }

            // Simulate API call
            setButtonLoading(submitBtn, true);
            
            setTimeout(() => {
                setButtonLoading(submitBtn, false, 'Subscribe');
                showToast('Thank you for subscribing!', 'success');
                emailInput.value = '';
                setFormGroupState(emailInput, true);
            }, 1500);
        });
    }
}

// ===================================
// SMOOTH SCROLLING
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ===================================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
