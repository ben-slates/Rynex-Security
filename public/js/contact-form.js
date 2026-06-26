const backendContactForm = document.getElementById('contactForm');
const backendFormStatus = document.getElementById('formStatus');

if (backendContactForm && backendFormStatus) {
    backendContactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = backendContactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            backendFormStatus.textContent = '';

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(backendContactForm)
            });
            const result = await response.json();

            if (response.ok && result.success) {
                backendFormStatus.textContent = result.message || 'Message sent successfully. We will contact you shortly.';
                backendFormStatus.style.color = '#00ffcc';
                backendContactForm.reset();
            } else {
                backendFormStatus.textContent = result.message || 'Message could not be sent. Please try again.';
                backendFormStatus.style.color = '#ff6b6b';
            }
        } catch (error) {
            backendFormStatus.textContent = 'Network error while sending the message. Please try again.';
            backendFormStatus.style.color = '#ff6b6b';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
