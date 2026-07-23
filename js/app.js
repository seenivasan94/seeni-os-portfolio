/*
    Seenivasan Portfolio Scripts
    Production-grade Vanilla JS
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.className = savedTheme;

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.height = '70px';
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.height = '80px';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Mobile Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger counter if element is or contains a stat-num
                const counter = entry.target.classList.contains('stat-num') ? entry.target : entry.target.querySelector('.stat-num');
                if (counter) {
                    startCounter(counter);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Observe stat-cards directly to trigger counters
    document.querySelectorAll('.stat-card').forEach(card => {
        revealOnScroll.observe(card);
    });

    // --- Dynamic Development Experience Calculation ---
    function updateDevExperience() {
        const startDate = new Date('2025-01-01');
        const today = new Date();

        // Calculate total years with decimals
        let years = today.getFullYear() - startDate.getFullYear();
        let months = today.getMonth() - startDate.getMonth();

        // Convert to total fractional years
        let fractionalYears = years + (months / 12);

        // Ensure format like 1.5+ (minimum 0.5 step or similar based on your 2026=1.5 requirement)
        // If Jan 2025 to Jan 2026 is 1.0, then 1.5 would be mid-2026.
        // Based on user example: 2026 = 1.5+, 2027 = 2.5+
        // This implies: (Current Year - 2025) + 0.5
        let displayYears = (today.getFullYear() - 2025) + 0.5;

        const devExpElement = document.getElementById('dynamic-dev-exp');
        if (devExpElement) {
            devExpElement.innerText = displayYears.toFixed(1) + '+ Years';
            devExpElement.classList.add('counted'); // Prevent the standard counter from overwriting
        }
    }
    updateDevExperience();

    // --- Stats Counter ---
    function startCounter(counterElement) {
        if (counterElement.classList.contains('counted')) return;

        const targetAttr = counterElement.getAttribute('data-target');
        if (!targetAttr) return; // For non-numeric stats like "AI"

        const target = +targetAttr;
        let count = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeProgress * target);

            counterElement.innerText = currentCount;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                let suffix = '';
                if (target === 21) suffix = '+';
                else if (target === 2) suffix = '+';
                else if (target === 11) suffix = ' Years';

                counterElement.innerText = target + suffix;
                counterElement.classList.add('counted');
            }
        }

        requestAnimationFrame(update);
    }

    // --- Product Collage Interaction ---
    const collageCards = document.querySelectorAll('.collage-card');

    collageCards.forEach(card => {
        const handleEnter = () => {
            collageCards.forEach(c => c.classList.remove('is-active'));
            card.classList.add('is-active');
        };

        const handleLeave = () => {
            card.classList.remove('is-active');
        };

        // Desktop Hover
        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);

        // Mobile Touch
        card.addEventListener('touchstart', (e) => {
            // Prevent simulated mouse events but allow interaction
            handleEnter();
        }, { passive: true });
    });

    // Close active card when clicking/tapping outside the collage
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.product-collage')) {
            collageCards.forEach(c => c.classList.remove('is-active'));
        }
    }, { passive: true });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
