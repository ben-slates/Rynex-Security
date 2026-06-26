AOS.init({ duration: 1000, once: false });

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
