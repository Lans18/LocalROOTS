// ===================================
// SHOP PAGE FUNCTIONALITY
// ===================================

// Sample product data
const products = [
    {
        id: 'prod1',
        name: 'Organic Mixed Greens',
        price: 8.99,
        category: 'produce',
        vendor: 'Green Acres Farm',
        vendorId: 'greenacres',
        rating: 4.8,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23e8f4ea\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🥬%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local', 'seasonal']
    },
    {
        id: 'prod2',
        name: 'Artisan Sourdough Bread',
        price: 6.50,
        category: 'baked',
        vendor: 'Artisan Bakery Co.',
        vendorId: 'artisan',
        rating: 5.0,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23f5f1ea\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🥖%3C/text%3E%3C/svg%3E',
        organic: false,
        features: ['local', 'handmade']
    },
    {
        id: 'prod3',
        name: 'Farm Fresh Eggs (Dozen)',
        price: 7.25,
        category: 'dairy',
        vendor: 'Valley View Dairy',
        vendorId: 'valley',
        rating: 4.9,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23fff9e6\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🥚%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local']
    },
    {
        id: 'prod4',
        name: 'Handmade Lavender Soap',
        price: 12.00,
        category: 'crafts',
        vendor: 'Crafted by Hand',
        vendorId: 'crafted',
        rating: 4.7,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23e8dff5\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🧼%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'handmade', 'local']
    },
    {
        id: 'prod5',
        name: 'Raw Honey (16 oz)',
        price: 14.99,
        category: 'pantry',
        vendor: 'Sunrise Organics',
        vendorId: 'sunrise',
        rating: 4.9,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23fff4d6\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🍯%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local']
    },
    {
        id: 'prod6',
        name: 'Heritage Tomatoes (2 lbs)',
        price: 9.50,
        category: 'produce',
        vendor: 'Green Acres Farm',
        vendorId: 'greenacres',
        rating: 4.8,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23ffe8e8\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🍅%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local', 'seasonal']
    },
    {
        id: 'prod7',
        name: 'Cinnamon Rolls (6 pack)',
        price: 11.00,
        category: 'baked',
        vendor: 'Artisan Bakery Co.',
        vendorId: 'artisan',
        rating: 5.0,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23f5e6d3\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🥐%3C/text%3E%3C/svg%3E',
        organic: false,
        features: ['local', 'handmade']
    },
    {
        id: 'prod8',
        name: 'Organic Whole Milk (Half Gallon)',
        price: 8.75,
        category: 'dairy',
        vendor: 'Valley View Dairy',
        vendorId: 'valley',
        rating: 4.7,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23f0f8ff\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🥛%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local']
    },
    {
        id: 'prod9',
        name: 'Handwoven Basket',
        price: 45.00,
        category: 'crafts',
        vendor: 'Crafted by Hand',
        vendorId: 'crafted',
        rating: 4.9,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23f5e6d3\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🧺%3C/text%3E%3C/svg%3E',
        organic: false,
        features: ['handmade', 'local']
    },
    {
        id: 'prod10',
        name: 'Organic Quinoa (2 lbs)',
        price: 16.50,
        category: 'pantry',
        vendor: 'Sunrise Organics',
        vendorId: 'sunrise',
        rating: 4.6,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23f5f1ea\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🌾%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local']
    },
    {
        id: 'prod11',
        name: 'Fresh Strawberries (1 lb)',
        price: 6.99,
        category: 'produce',
        vendor: 'Green Acres Farm',
        vendorId: 'greenacres',
        rating: 5.0,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23ffe8f0\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🍓%3C/text%3E%3C/svg%3E',
        organic: true,
        features: ['organic', 'local', 'seasonal']
    },
    {
        id: 'prod12',
        name: 'Blueberry Muffins (4 pack)',
        price: 8.50,
        category: 'baked',
        vendor: 'Artisan Bakery Co.',
        vendorId: 'artisan',
        rating: 4.8,
        image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%23e8e0f5\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'100\' y=\'120\' font-size=\'80\' text-anchor=\'middle\'%3E🧁%3C/text%3E%3C/svg%3E',
        organic: false,
        features: ['local', 'handmade']
    }
];

let filteredProducts = [...products];
let currentSort = 'featured';

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initFilters();
    initSearch();
    initSort();
});

// ===================================
// RENDER PRODUCTS
// ===================================
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const resultsCount = document.getElementById('resultsCount');

    if (!productsGrid) return;

    if (resultsCount) {
        resultsCount.textContent = filteredProducts.length;
    }

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-vendor">${product.vendor}</p>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="handleAddToCart('${product.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'produce': 'Fresh Produce',
        'dairy': 'Dairy & Eggs',
        'baked': 'Baked Goods',
        'crafts': 'Handmade Crafts',
        'pantry': 'Organic Pantry',
        'meat': 'Meat & Poultry',
        'honey': 'Honey & Preserves'
    };
    return categories[category] || category;
}

// ===================================
// FILTERS
// ===================================
function initFilters() {
    const filterInputs = document.querySelectorAll('.filter-options input');
    const clearFilters = document.getElementById('clearFilters');

    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            filterInputs.forEach(input => {
                input.checked = false;
                if (input.type === 'radio' && input.value === 'all') {
                    input.checked = true;
                }
            });
            applyFilters();
        });
    }
}

function applyFilters() {
    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);

    // Get selected vendors
    const selectedVendors = Array.from(document.querySelectorAll('input[name="vendor"]:checked'))
        .map(input => input.value);

    // Get selected features
    const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked'))
        .map(input => input.value);

    // Get price range
    const priceRange = document.querySelector('input[name="price"]:checked')?.value || 'all';

    // Filter products
    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Vendor filter
        if (selectedVendors.length > 0 && !selectedVendors.includes(product.vendorId)) {
            return false;
        }

        // Features filter
        if (selectedFeatures.length > 0) {
            const hasAllFeatures = selectedFeatures.every(feature =>
                product.features.includes(feature)
            );
            if (!hasAllFeatures) return false;
        }

        // Price filter
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (max) {
                if (product.price < min || product.price > max) return false;
            } else {
                // 50+ range
                if (product.price < min) return false;
            }
        }

        return true;
    });

    sortProducts();
    renderProducts();
}

// ===================================
// SEARCH
// ===================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            if (searchTerm === '') {
                applyFilters();
                return;
            }

            filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(searchTerm) ||
                       product.vendor.toLowerCase().includes(searchTerm) ||
                       product.category.toLowerCase().includes(searchTerm) ||
                       getCategoryName(product.category).toLowerCase().includes(searchTerm);
            });

            sortProducts();
            renderProducts();
        });
    }
}

// ===================================
// SORTING
// ===================================
function initSort() {
    const sortSelect = document.getElementById('sortSelect');

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            sortProducts();
            renderProducts();
        });
    }
}

function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
            break;
        default: // featured
            filteredProducts.sort((a, b) => b.rating - a.rating);
    }
}

// ===================================
// ADD TO CART
// ===================================
function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        window.addToCart(product);
    }
}

// Export for global use
window.handleAddToCart = handleAddToCart;
