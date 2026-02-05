document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // 4. Custom Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.c-next');
    const prevButton = document.querySelector('.c-prev');

    if (track && slides.length > 0) {
        let currentIndex = 0;

        const updateCarousel = () => {
            // Standard translateX approach
            // We want to transform based on percentage - 100% per slide
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Auto-advance
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }

    // 5. Scroll Reveal Animation (Interaction Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial style for reveal elements
    const revealElements = document.querySelectorAll('.animate-on-scroll');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically or in CSS?
    // Let's add the logic here to modify style directly for simplicity
    // Actually, better to use a class in CSS but since I already wrote CSS...
    // I will inject a style block for the 'visible' class just to be safe, 
    // or relying on the JS to set styles when visible.
    // Let's use the CSS-in-JS approach for this specific interaction to ensure it works without editing CSS file again.

    // Helper to apply visible styles
    const addVisibleStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };
    addVisibleStyles();


    // 6. Copy BibTeX
    const copyBtn = document.getElementById('copy-bib-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const bibText = copyBtn.getAttribute('data-bib');
            try {
                await navigator.clipboard.writeText(bibText);
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied!';
                copyBtn.style.background = 'var(--primary)';
                copyBtn.style.color = '#000';

                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        });
    }

    // Navbar Scroll Effect (Glass gets stronger)
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 17, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
        }
    });

    // Handle missing images gracefully
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function () {
            // Use a dark themed placeholder
            this.src = 'https://placehold.co/600x400/1a1a2e/00f2ea?text=Quantum+Visual';
            this.alt = 'Image placeholder';
        };
    });

});
