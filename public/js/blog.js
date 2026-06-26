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

        document.querySelectorAll('.blog-card').forEach((card) => {
            const title = card.querySelector('.blog-content h2');
            const summary = card.querySelector('.blog-content p');
            const link = card.querySelector('.blog-content .btn[href]');

            if (summary) {
                const body = document.createElement('div');
                body.className = 'blog-card-body';
                while (card.firstChild) {
                    body.appendChild(card.firstChild);
                }
                card.appendChild(body);

                const preview = document.createElement('div');
                preview.className = 'blog-preview';
                const previewTitle = document.createElement('h3');
                previewTitle.textContent = title.textContent;
                const previewText = document.createElement('p');
                previewText.textContent = summary.textContent;
                const previewHint = document.createElement('span');
                previewHint.textContent = link && link.getAttribute('href') !== '#' ? 'Click anywhere to read the full article' : 'Full article coming soon';
                preview.append(previewTitle, previewText, previewHint);
                card.appendChild(preview);

                const getPointerDirection = (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left - rect.width / 2;
                    const y = event.clientY - rect.top - rect.height / 2;
                    const directionIndex = Math.round(Math.atan2(y, x) / (Math.PI / 2) + 5) % 4;
                    return ['top', 'right', 'bottom', 'left'][directionIndex];
                };

                const setPreviewDirection = (direction) => {
                    preview.classList.remove('from-top', 'from-right', 'from-bottom', 'from-left');
                    preview.classList.add(`from-${direction}`);
                };

                card.addEventListener('mouseenter', (event) => {
                    setPreviewDirection(getPointerDirection(event));
                    requestAnimationFrame(() => card.classList.add('preview-visible'));
                });

                card.addEventListener('mouseleave', (event) => {
                    card.classList.remove('preview-visible');
                    setPreviewDirection(getPointerDirection(event));
                });
            }

            if (!link || link.getAttribute('href') === '#') {
                return;
            }

            card.classList.add('clickable');
            card.setAttribute('role', 'link');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Read article: ${card.querySelector('h2').textContent}`);

            card.addEventListener('click', (event) => {
                if (!event.target.closest('a')) {
                    window.location.href = link.href;
                }
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.location.href = link.href;
                }
            });
        });
