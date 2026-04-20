document.addEventListener('DOMContentLoaded', () => {
    // Add js-ready class to body to enable animations safely
    document.body.classList.add('js-ready');

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                // Only remove if it's not a page that requires it to be always scrolled
                if (!navbar.classList.contains('always-scrolled')) {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }

    if (mobileLinks && mobileMenu) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth Scroll Offset Adjustment (for same-page anchors if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mouse Parallax for Hero Background (Subtle)
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroBg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        // Create Lightbox DOM
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <img src="" class="lightbox-content">
        `;
        document.body.appendChild(lb);

        const lbImage = lb.querySelector('img');
        const lbClose = lb.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.parentElement.style.cursor = 'zoom-in';
            item.parentElement.addEventListener('click', () => {
                lbImage.src = item.src;
                lb.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLb = () => {
            lb.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        lbClose.addEventListener('click', closeLb);
        lb.addEventListener('click', (e) => {
            if (e.target === lb) closeLb();
        });
    }

    // Auto-init Lucide icons if the library is loaded
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            console.log('Icons initialized');
        }
    };

    initIcons();
    // Fallback for slow external script loading
    setTimeout(initIcons, 500);
    setTimeout(initIcons, 2000);
});

// Also try on window.load
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
