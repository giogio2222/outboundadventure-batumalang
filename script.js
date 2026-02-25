/**
 * script.js - Outbound Adventure Batu Malang
 * Main JavaScript for interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Navbar Scroll Effect
    const mainNavbar = document.getElementById('mainNavbar');
    if (mainNavbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        });

        // Trigger once on load in case page is already scrolled
        if (window.scrollY > 50) {
            mainNavbar.classList.add('scrolled');
        }
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseFloat(target.getAttribute('data-count'));
                    const duration = 2000;
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        let currentCount = progress * countTo;

                        if (countTo % 1 !== 0) {
                            target.textContent = currentCount.toFixed(1);
                        } else {
                            target.textContent = Math.floor(currentCount);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            target.textContent = countTo;
                        }
                    };

                    requestAnimationFrame(updateCount);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle Mobile Menu auto-close
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // Image Zoom functionality (simple implementation for gallery)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            console.log('Gallery image clicked');
        });
    });

    // TOC Toggle
    const tocHeader = document.querySelector('.toc-header');
    const tocList = document.querySelector('.toc-list');
    if (tocHeader && tocList) {
        tocHeader.addEventListener('click', function () {
            this.classList.toggle('collapsed');
            tocList.classList.toggle('d-none');
        });
    }

    // Automatic TOC Generation
    const articleBody = document.querySelector('.article-body');
    const tocTarget = document.querySelector('.toc-list');
    if (articleBody && tocTarget) {
        const headings = articleBody.querySelectorAll('h2, h3');
        headings.forEach((heading, index) => {
            const id = 'heading-' + index;
            heading.id = id;

            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'toc-' + heading.tagName.toLowerCase();

            const a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = heading.textContent;

            li.appendChild(a);
            tocTarget.appendChild(li);
        });
    }

    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
            } else {
                document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                    openAnswer.classList.remove('open');
                    openAnswer.previousElementSibling.classList.remove('active');
                });
                answer.classList.add('open');
            }
        });
    });

    // Share Buttons Logic
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const url = window.location.href;
            const title = document.title;
            let shareUrl = '';

            if (this.classList.contains('wa')) {
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
            } else if (this.classList.contains('fb')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            } else if (this.classList.contains('tw')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
    });
});

