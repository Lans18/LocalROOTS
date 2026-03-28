// ===================================
// UTILITY FUNCTIONS & HELPERS
// ===================================

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    toast.innerHTML = `<span class="toast-icon">${iconMap[type]}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

/**
 * Show alert message
 * @param {string} message - Alert message
 * @param {string} type - Alert type (success, error, warning, info)
 * @param {HTMLElement} container - Parent element to append alert
 */
function showAlert(message, type = 'info', container = null) {
    const target = container || document.querySelector('.container') || document.body;
    
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    const iconMap = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    alert.innerHTML = `
        <span class="alert-icon">${iconMap[type]}</span>
        <div>${message}</div>
        <button class="alert-close" aria-label="Close alert">✕</button>
    `;
    
    target.insertBefore(alert, target.firstChild);
    
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.remove();
    });
    
    return alert;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with score and feedback
 */
function validatePassword(password) {
    let strength = 0;
    const feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Lowercase letters');
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Uppercase letters');
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Numbers');
    
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    else feedback.push('Special characters');
    
    return {
        strength,
        score: Math.round((strength / 5) * 100),
        feedback,
        isValid: strength >= 3
    };
}

/**
 * Format currency value
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string}
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Debounce function for handling frequent events
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function}
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function for handling frequent events
 * @param {function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {function}
 */
function throttle(func, delay = 300) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func(...args);
            lastCall = now;
        }
    };
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null}
 */
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

/**
 * Set multiple classes on element
 * @param {HTMLElement} element - Target element
 * @param {object} classes - Object with class names as keys and boolean values
 */
function setClasses(element, classes) {
    Object.entries(classes).forEach(([className, shouldAdd]) => {
        if (shouldAdd) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    });
}

/**
 * Validate form group and show feedback
 * @param {HTMLElement} input - Form input element
 * @param {boolean} isValid - Validation result
 * @param {string} errorMessage - Error message to display
 */
function setFormGroupState(input, isValid, errorMessage = '') {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    setClasses(formGroup, {
        'error': !isValid,
        'success': isValid
    });
    
    let errorEl = formGroup.querySelector('small.error-message');
    if (!isValid && errorMessage) {
        if (!errorEl) {
            errorEl = document.createElement('small');
            errorEl.className = 'error-message';
            formGroup.appendChild(errorEl);
        }
        errorEl.textContent = errorMessage;
    } else if (errorEl) {
        errorEl.remove();
    }
}

/**
 * Add loading state to button
 * @param {HTMLElement} button - Button element
 * @param {boolean} isLoading - Loading state
 * @param {string} originalText - Original button text
 */
function setButtonLoading(button, isLoading, originalText = 'Submit') {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        button.setAttribute('aria-busy', 'false');
        button.textContent = originalText;
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Lazy load images
 * @param {string} selector - Image selector
 */
function lazyLoadImages(selector = 'img[data-src]') {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll(selector).forEach(img => imageObserver.observe(img));
    }
}

/**
 * Get stored data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*}
 */
function getStoredData(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage: ${error}`);
        return defaultValue;
    }
}

/**
 * Store data in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean}
 */
function storeData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage: ${error}`);
        return false;
    }
}

/**
 * Remove stored data from localStorage
 * @param {string} key - Storage key
 */
function removeStoredData(key) {
    localStorage.removeItem(key);
}

/**
 * Sanitize HTML string (basic)
 * @param {string} html - HTML string to sanitize
 * @returns {string}
 */
function sanitizeHTML(html) {
    const tmp = document.createElement('DIV');
    tmp.textContent = html;
    return tmp.innerHTML;
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string}
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

/**
 * Pluralize text based on count
 * @param {number} count - Count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form
 * @returns {string}
 */
function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
}

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string}
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===================================
// ALIASES FOR BACKWARD COMPATIBILITY
// ===================================
// Alias for showToast to support existing code calling showNotification
function showNotification(message, type = 'info', duration = 3000) {
    return showToast(message, type, duration);
}
