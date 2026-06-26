AOS.init({ once: false, mirror: true });

        // Navbar Scroll Effect
        const header = document.getElementById('navbar');
        const syncNavbarState = () => {
            header.style.visibility = 'visible';
            header.style.opacity = '1';

            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        syncNavbarState();
        window.addEventListener('scroll', syncNavbarState, { passive: true });

        const isEditableTarget = (target) => target.closest && target.closest('input, textarea, [contenteditable="true"]');
        document.addEventListener('selectstart', (event) => {
            if (!isEditableTarget(event.target)) {
                event.preventDefault();
            }
        });
        document.addEventListener('copy', (event) => {
            if (!isEditableTarget(event.target)) {
                event.preventDefault();
            }
        });

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const menuIcon = hamburger.querySelector('i');

        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');

        const closeMobileMenu = () => {
            navLinks.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        const toggleMobileMenu = () => {
            const isOpen = navLinks.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars', !isOpen);
            menuIcon.classList.toggle('fa-times', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        hamburger.addEventListener('click', () => {
            toggleMobileMenu();
        });

        hamburger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMobileMenu();
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMobileMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
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
