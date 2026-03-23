🌱 LocalRoots Market

A simple front-end marketplace that connects local vendors with customers. Built using HTML, CSS, and JavaScript.

📁 Project Structure
LocalRoots/
│
├── index.html
├── shop.html
├── vendors.html
├── about.html
├── contact.html
├── login.html
├── checkout.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── main.js
│   ├── products.js
│   ├── cart.js
│   ├── auth.js
│   ├── checkout.js
│   └── filter.js
│
└── assets/
    ├── images/
    └── icons/
⚙️ Core Modules
📦 products.js — Product Data

Handles all product information.

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 50,
    category: "Vegetables",
    vendor: "Local Farm",
    image: "assets/images/tomato.jpg"
  }
];

Purpose:

Acts as a temporary database
Provides product data for the shop page
🎨 main.js — UI Rendering
function displayProducts(productList) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  productList.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>₱${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

Purpose:

Dynamically renders products
Updates UI based on data
🛒 cart.js — Cart Logic
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function addToCart(id) {
  const cart = getCart();
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

Purpose:

Manages shopping cart
Uses localStorage for persistence
🔍 filter.js — Search & Filter
function filterProducts(category) {
  const filtered = products.filter(p => p.category === category);
  displayProducts(filtered);
}

Purpose:

Filters products by category
Improves browsing experience
🔐 auth.js — Authentication (Simulated)
function login(username, password) {
  if (username && password) {
    localStorage.setItem("user", username);
    return true;
  }
  return false;
}

Purpose:

Simulates user login
Stores session locally
💳 checkout.js — Checkout Process
function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert("Order placed successfully!");
  localStorage.removeItem("cart");
}

Purpose:

Handles order confirmation
Clears cart after checkout
🔄 Data Flow
Products (products.js)
        ↓
Display UI (main.js)
        ↓
User Interaction (Add to Cart)
        ↓
Local Storage (cart.js)
        ↓
Checkout Process (checkout.js)
⚡ Event Flow Example
User clicks "Add to Cart"
        ↓
addToCart(id)
        ↓
Update localStorage
        ↓
UI updates cart state
⚠️ Notes
This is a front-end prototype (no backend)
Uses localStorage instead of database
Designed for demonstration and learning purposes
