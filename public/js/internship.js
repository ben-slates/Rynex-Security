AOS.init({ once: false, mirror: true });
        const header = document.getElementById('navbar');
        const syncHeader = () => {
            if (window.scrollY > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        };
        syncHeader();
        window.addEventListener('scroll', syncHeader, { passive: true });

        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const daysLeftEl = document.getElementById('daysLeft');
        const hoursLeftEl = document.getElementById('hoursLeft');
        const minutesLeftEl = document.getElementById('minutesLeft');
        const secondsLeftEl = document.getElementById('secondsLeft');
        const deadline = new Date('2026-07-05T00:00:00');

        const pad = value => String(value).padStart(2, '0');

        const tick = () => {
            const now = new Date();
            const remainingMs = Math.max(deadline - now, 0);
            const days = Math.floor(remainingMs / 86400000);
            const hours = Math.floor((remainingMs % 86400000) / 3600000);
            const minutes = Math.floor((remainingMs % 3600000) / 60000);
            const seconds = Math.floor((remainingMs % 60000) / 1000);

            daysLeftEl.textContent = pad(days);
            hoursLeftEl.textContent = pad(hours);
            minutesLeftEl.textContent = pad(minutes);
            secondsLeftEl.textContent = pad(seconds);
        };

        tick();
        setInterval(tick, 1000);

        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            question.addEventListener('click', () => {
                const isOpen = answer.classList.toggle('open');
                question.querySelector('span').textContent = isOpen ? '−' : '+';
                document.querySelectorAll('.faq-answer').forEach(other => {
                    if (other !== answer) {
                        other.classList.remove('open');
                        other.previousElementSibling.querySelector('span').textContent = '+';
                    }
                });
            });
        });
