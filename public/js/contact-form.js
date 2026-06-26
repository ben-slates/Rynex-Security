const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const formStatus = document.getElementById('formStatus');

const setStatus = (message, isError = false) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.style.color = isError ? '#ff7b8b' : '#8ad6ff';
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    setStatus('Sending your message...');

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
            form.reset();
            setStatus(data.message || 'Message sent successfully.');
        } else {
            setStatus(data.message || 'Something went wrong. Please try again.', true);
        }
    } catch (error) {
        setStatus('Something went wrong. Please try again.', true);
    } finally {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }
});
