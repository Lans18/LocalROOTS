// ===================================
// CONTACT PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initFAQ();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission
            console.log('Contact Form Submitted:', data);

            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.');

            // Reset form
            contactForm.reset();
        });
    }
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}
