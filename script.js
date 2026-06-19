document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // PORTFOLIO DATABASE
    // ==========================================
    const portfolioItems = [
        {
            id: 'Podcast Logo',
            img: './1.png',
            title: 'Podcast Logo',
            category: 'Logo Design',
            description: 'Custom podcast logo designed for a modern digital brand.',
            client: 'Personal Project',
            year: '2026',
            role: 'Logo Designer'
        },
        {
            id: 'Luxury Travel logo',
            img: './2.png',
            title: 'Luxury Travel logo',
            category: 'Logo Design',
            description: 'Modern Logo Design for a Luxury Travel Brand.',
            client: 'Personal Project',
            year: '2025',
            role: 'Logo Designer'
        },
        {
            id: 'Luxury Hotel logo',
            img: './3.jpg',
            title: 'Luxury Hotel logo',
            category: 'Logo Design',
            description: 'Modern Logo Design for a Luxury Hotel Brand.',
            client: 'Personal Project',
            year: '2025',
            role: 'Logo Designer'
        },
        {
            id: 'Mustang Poster',
            img: './mustang.webp',
            title: 'Mustang Poster',
            category: 'Poster Design',
            description: 'A bold poster inspired by the iconic Ford Mustang.',
            client: 'Personal Project',
            year: '2025',
            role: 'Graphic Designer'
        },
        {
            id: 'Chess Tuition Poster',
            img: './poster.web.webp',
            title: 'Chess Tuition Poster',
            category: 'Poster Design',
            description: 'A clean and engaging poster designed to promote chess tuition classes with a modern and professional look.',
            client: 'Personal Project',
            year: '2026',
            role: 'Graphic Designer'
        },
        {
            id: 'SFT Tuition Poster',
            img: './sft.webp',
            title: 'SFT Tuition Poster',
            category: 'Poster Design',
            description: 'A modern poster designed to promote SFT tuition with a clean and professional layout.',
            client: 'Personal Project',
            year: '2025',
            role: 'Graphic Designer'
        }
    ];

    let currentItemIndex = 0;

    // ==========================================
    // STICKY HEADER & NAV ACTIVE LINK STATE
    // ==========================================
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section, .hero-section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        // Sticky Header toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlights based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}` || 
               (currentSectionId === 'hero' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav');
    const menuLinks = document.querySelectorAll('nav a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('overflow-hidden');
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // ==========================================
    // PARALLAX / SLIDE-IN ON SCROLL ANIMATIONS
    // ==========================================
    // Apply incremental transition delays auto-staggering
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('fade-up-element');
            child.style.setProperty('--i', index);
        });
    });

    // Make sure random loose components also compile fade-ups or are explicitly watched
    const animations = document.querySelectorAll('.fade-up-element');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opt out of observing once showing to ensure clean performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animations.forEach(el => {
        animationObserver.observe(el);
    });

    // ==========================================
    // PORTFOLIO LIGHTBOX ENGINE
    // ==========================================
    const portfolioCards = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = lightbox?.querySelector('.lightbox-content-container');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClient = document.getElementById('lightbox-client');
    const lightboxYear = document.getElementById('lightbox-year');
    const lightboxRole = document.getElementById('lightbox-role');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxPrevMob = document.getElementById('lightbox-prev-mob');
    const lightboxNextMob = document.getElementById('lightbox-next-mob');

    const updateLightboxContent = (index) => {
        const data = portfolioItems[index];
        if (!data) return;

        // Apply visual transition
        if (lightboxContainer) {
            lightboxContainer.style.opacity = '0';
            lightboxContainer.style.transform = 'scale(0.97)';
        }

        setTimeout(() => {
            if (lightboxImg) lightboxImg.src = data.img;
            if (lightboxCategory) lightboxCategory.textContent = data.category;
            if (lightboxTitle) lightboxTitle.textContent = data.title;
            if (lightboxDescription) lightboxDescription.textContent = data.description;
            if (lightboxClient) lightboxClient.textContent = data.client;
            if (lightboxYear) lightboxYear.textContent = data.year;
            if (lightboxRole) lightboxRole.textContent = data.role;

            if (lightboxContainer) {
                lightboxContainer.style.opacity = '1';
                lightboxContainer.style.transform = 'scale(1)';
            }
        }, 150);
    };

    const openLightbox = (id) => {
        const index = portfolioItems.findIndex(item => item.id === id);
        if (index === -1) return;

        currentItemIndex = index;
        updateLightboxContent(currentItemIndex);

        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    const showNextItem = () => {
        currentItemIndex = (currentItemIndex + 1) % portfolioItems.length;
        updateLightboxContent(currentItemIndex);
    };

    const showPrevItem = () => {
        currentItemIndex = (currentItemIndex - 1 + portfolioItems.length) % portfolioItems.length;
        updateLightboxContent(currentItemIndex);
    };

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const itemId = card.getAttribute('data-id');
            openLightbox(itemId);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightbox) {
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevItem);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextItem);
    if (lightboxPrevMob) lightboxPrevMob.addEventListener('click', showPrevItem);
    if (lightboxNextMob) lightboxNextMob.addEventListener('click', showNextItem);

    // Keyboard bindings inside Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextItem();
        if (e.key === 'ArrowLeft') showPrevItem();
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // CONTACT FORM CLIENT-SIDE INTERCEPTOR
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Client-side validation checks
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message-text');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill out all mandatory inputs before sending.');
                return;
            }

            // Mock submission success animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'MESSAGE SENT';
                
                // Clear input strings
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';

                // Trigger Success Alert Layout
                if (formMessage) {
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    formMessage.textContent = 'Thank you for reaching out, Chirantha Dewruwan will respond to you within 24 hours.';
                }

                // Reset button in 4 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 4000);

            }, 1200);
        });
    }
});
