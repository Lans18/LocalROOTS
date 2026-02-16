// ===================================
// CHECKOUT PAGE FUNCTIONALITY
// ===================================

let currentStep = 1;
let orderData = {
    shipping: {},
    payment: {},
    deliveryMethod: 'delivery'
};

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
    initDeliveryOptions();
    initPaymentMethods();
    initCardFormatting();
});

function initCheckout() {
    // Load cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty. Redirecting to shop...', 'error');
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 2000);
    }
}

function initDeliveryOptions() {
    const deliveryInputs = document.querySelectorAll('input[name="delivery"]');
    const shippingAddress = document.getElementById('shippingAddress');
    const pickupLocation = document.getElementById('pickupLocation');
    const deliveryFee = document.getElementById('deliveryFee');
    const orderTotal = document.getElementById('orderTotal');

    deliveryInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            orderData.deliveryMethod = e.target.value;

            if (e.target.value === 'delivery') {
                shippingAddress.style.display = 'block';
                pickupLocation.style.display = 'none';
                if (deliveryFee) deliveryFee.textContent = '$6.99';
                if (orderTotal) orderTotal.textContent = '$24.33'; // Example total with delivery
            } else {
                shippingAddress.style.display = 'none';
                pickupLocation.style.display = 'block';
                if (deliveryFee) deliveryFee.textContent = 'Free';
                if (orderTotal) orderTotal.textContent = '$17.34'; // Example total without delivery
            }
        });
    });
}

function initPaymentMethods() {
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');

    paymentInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

function initCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');

    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue.substring(0, 19); // 16 digits + 3 spaces
        });
    }

    if (expiry) {
        expiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value.substring(0, 5);
        });
    }

    if (cvv) {
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
}

function goToStep(step) {
    // Hide all steps
    for (let i = 1; i <= 3; i++) {
        const stepElement = document.getElementById(`step${i}`);
        const progressStep = document.querySelectorAll('.progress-step')[i - 1];

        if (stepElement) {
            stepElement.classList.add('hidden');
        }
        if (progressStep) {
            progressStep.classList.remove('active');
        }
    }

    // Show current step
    const currentStepElement = document.getElementById(`step${step}`);
    const currentProgressStep = document.querySelectorAll('.progress-step')[step - 1];

    if (currentStepElement) {
        currentStepElement.classList.remove('hidden');
    }
    if (currentProgressStep) {
        currentProgressStep.classList.add('active');
    }

    currentStep = step;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function placeOrder() {
    const agreeTerms = document.getElementById('agreeTerms');

    if (!agreeTerms || !agreeTerms.checked) {
        showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
        return;
    }

    // Get cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Create order
    const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        items: cart,
        deliveryMethod: orderData.deliveryMethod,
        total: orderData.deliveryMethod === 'delivery' ? 24.33 : 17.34,
        status: 'confirmed'
    };

    console.log('Order placed:', order);

    // Clear cart
    localStorage.removeItem('cart');

    // Show success message
    showNotification('Order placed successfully! Thank you for your purchase.');

    // Redirect to order confirmation (or home page)
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Export functions for global use
window.goToStep = goToStep;
window.placeOrder = placeOrder;
