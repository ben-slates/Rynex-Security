const form = document.getElementById('contactForm');

if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        if (formStatus) {
            formStatus.textContent = '';
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Success! Your message has been sent.');
                form.reset();

                if (formStatus) {
                    formStatus.textContent = data.message || 'Message sent successfully. We will contact you shortly.';
                    formStatus.style.color = '#00ffcc';
                }
            } else {
                alert('Error: ' + (data.message || 'Message could not be sent. Please try again.'));

                if (formStatus) {
                    formStatus.textContent = data.message || 'Message could not be sent. Please try again.';
                    formStatus.style.color = '#ff6b6b';
                }
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');

            if (formStatus) {
                formStatus.textContent = 'Network error while sending the message. Please try again.';
                formStatus.style.color = '#ff6b6b';
            }
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
