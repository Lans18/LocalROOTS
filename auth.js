// ===================================
// AUTHENTICATION PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initAuthForms();
    initAuthToggle();
    initRealTimeValidation();
});

function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    // Validate form
    let isValid = true;

    if (!emailInput.value.trim()) {
        setFormGroupState(emailInput, false, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        setFormGroupState(emailInput, false, 'Please enter a valid email');
        isValid = false;
    } else {
        setFormGroupState(emailInput, true);
    }

    if (!passwordInput.value.trim()) {
        setFormGroupState(passwordInput, false, 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        setFormGroupState(passwordInput, false, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        setFormGroupState(passwordInput, true);
    }

    if (!isValid) {
        showToast('Please fix the errors above', 'error');
        return;
    }

    // Simulate API call
    setButtonLoading(submitBtn, true, 'Logging in...');

    setTimeout(() => {
        setButtonLoading(submitBtn, false, 'Login');
        
        // Store mock auth state
        storeData('isLoggedIn', true);
        storeData('userEmail', emailInput.value);

        showToast('Login successful! Redirecting...', 'success');

        // Redirect to shop page
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1500);
    }, 1500);
}

async function handleRegisterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const firstNameInput = form.querySelector('input[name="firstName"]');
    const lastNameInput = form.querySelector('input[name="lastName"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmInput = form.querySelector('input[name="confirmPassword"]');
    const termsCheckbox = form.querySelector('input[name="terms"]');

    let isValid = true;

    // Validate first name
    if (!firstNameInput.value.trim()) {
        setFormGroupState(firstNameInput, false, 'First name is required');
        isValid = false;
    } else {
        setFormGroupState(firstNameInput, true);
    }

    // Validate last name
    if (!lastNameInput.value.trim()) {
        setFormGroupState(lastNameInput, false, 'Last name is required');
        isValid = false;
    } else {
        setFormGroupState(lastNameInput, true);
    }

    // Validate email
    if (!emailInput.value.trim()) {
        setFormGroupState(emailInput, false, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        setFormGroupState(emailInput, false, 'Please enter a valid email');
        isValid = false;
    } else {
        setFormGroupState(emailInput, true);
    }

    // Validate password
    const passwordValidation = validatePassword(passwordInput.value);
    if (!passwordValidation.isValid) {
        const feedback = `Password must include: ${passwordValidation.feedback.join(', ')}`;
        setFormGroupState(passwordInput, false, feedback);
        isValid = false;
    } else {
        setFormGroupState(passwordInput, true);
    }

    // Validate confirm password
    if (passwordInput.value !== confirmInput.value) {
        setFormGroupState(confirmInput, false, 'Passwords do not match');
        isValid = false;
    } else if (confirmInput.value) {
        setFormGroupState(confirmInput, true);
    }

    // Validate terms
    if (!termsCheckbox.checked) {
        showToast('Please agree to the Terms of Service', 'error');
        isValid = false;
    }

    if (!isValid) {
        showToast('Please fix the errors above', 'error');
        return;
    }

    // Simulate API call
    setButtonLoading(submitBtn, true, 'Creating account...');

    setTimeout(() => {
        setButtonLoading(submitBtn, false, 'Create Account');
        
        // Store mock auth state
        storeData('isLoggedIn', true);
        storeData('userEmail', emailInput.value);
        storeData('userName', `${firstNameInput.value} ${lastNameInput.value}`);

        showToast('Account created successfully!', 'success');

        // Redirect to shop page
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1500);
    }, 1500);
}

function initRealTimeValidation() {
    const emailInputs = document.querySelectorAll('input[name="email"]');
    const passwordInputs = document.querySelectorAll('input[name="password"]');
    const confirmInputs = document.querySelectorAll('input[name="confirmPassword"]');

    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                const isValid = isValidEmail(input.value);
                setFormGroupState(input, isValid, isValid ? '' : 'Invalid email address');
            }
        });
    });

    passwordInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                const validation = validatePassword(input.value);
                const isValid = validation.isValid;
                const message = isValid ? '' : `Strength: ${validation.feedback.join(', ')}`;
                setFormGroupState(input, isValid, message);
            }
        });
    });

    confirmInputs.forEach(input => {
        input.addEventListener('blur', () => {
            const passwordInput = document.querySelector('input[name="password"]');
            if (input.value.trim() && passwordInput?.value) {
                const match = input.value === passwordInput.value;
                setFormGroupState(input, match, match ? '' : 'Passwords do not match');
            }
        });
    });
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
