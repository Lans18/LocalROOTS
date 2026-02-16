// ===================================
// AUTHENTICATION PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initAuthForms();
    initAuthToggle();
});

function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate login
            console.log('Login attempt:', data);

            // Store mock auth state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', data.email);

            showNotification('Login successful! Redirecting...');

            // Redirect to shop page
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1500);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            // Validate passwords match
            if (data.password !== data.confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            // Validate password length
            if (data.password.length < 8) {
                showNotification('Password must be at least 8 characters', 'error');
                return;
            }

            // Validate terms agreement
            if (!data.terms) {
                showNotification('Please agree to the Terms of Service', 'error');
                return;
            }

            // Simulate registration
            console.log('Registration attempt:', data);

            // Store mock auth state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userName', `${data.firstName} ${data.lastName}`);

            showNotification('Account created successfully! Redirecting...');

            // Redirect to shop page
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1500);
        });
    }
}

function initAuthToggle() {
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');

    if (showRegister && loginBox && registerBox) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginBox.classList.add('hidden');
            registerBox.classList.remove('hidden');
        });
    }

    if (showLogin && loginBox && registerBox) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        });
    }
}
