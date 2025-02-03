document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));
    const slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });let currentSlide = 0;
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');

        currentSlide = targetIndex;
    }; nextButton.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
    });
    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
    });
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    }); setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 5000);
    const brandsTrack = document.querySelector('.brands-track');
    const brandLogos = Array.from(brandsTrack.children);
    brandLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        brandsTrack.appendChild(clone);
    }); const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active'); document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }function animateCounter(element, target) {
        let current = 0;
        const increment = target > 100 ? 10 : 1;
        const duration = 2000;
        const steps = Math.ceil(target / increment);
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, stepTime);
    }const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsElements = entry.target.querySelectorAll('.stat-number');
                statsElements.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (!stat.classList.contains('counted')) {
                        animateCounter(stat, target);
                        stat.classList.add('counted');
                    }
                });
                observer.unobserve(entry.target);
            } });};const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5,
        rootMargin: '0px'
    });const impactStats = document.querySelector('.impact-stats');
    if (impactStats) {
        observer.observe(impactStats);
    }
}); 