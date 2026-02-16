// ===================================
// VENDOR PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initVendorForm();
});

function initVendorForm() {
    const vendorForm = document.getElementById('vendorForm');

    if (vendorForm) {
        vendorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(vendorForm);
            const data = Object.fromEntries(formData.entries());

            // Validate description length
            if (data.description.length < 50) {
                showNotification('Please provide a description of at least 50 characters', 'error');
                return;
            }

            // Validate terms agreement
            if (!data.terms) {
                showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
                return;
            }

            // Simulate form submission
            console.log('Vendor Application Submitted:', data);

            // Show success message
            showNotification('Application submitted successfully! We\'ll review your information and get back to you within 2-3 business days.');

            // Reset form
            vendorForm.reset();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
