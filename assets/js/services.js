
  const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
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
        const duration = 2000; // 2 seconds
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
    }
    const observerCallback = (entries, observer) => {
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
            }
        });
    };const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5,
        rootMargin: '0px'
    });const impactStats = document.querySelector('.impact-stats');
    if (impactStats) {
        observer.observe(impactStats);
    }
document.addEventListener('DOMContentLoaded', function() {const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active')); if (!isActive) {
                item.classList.add('active');
            }
        });});const projectsSlider = {
        container: document.querySelector('.projects-slider'),
        slides: document.querySelectorAll('.project-card'),
        currentSlide: 0,
        
        init() {
            if (this.slides.length <= 1) return;
            
            this.createNavigation();
            this.startAutoSlide();
        },
        
        createNavigation() {
            const nav = document.createElement('div');
            nav.className = 'slider-nav';
            
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '←';
            prevBtn.addEventListener('click', () => this.prevSlide());
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '→';
            nextBtn.addEventListener('click', () => this.nextSlide());
            
            nav.appendChild(prevBtn);
            nav.appendChild(nextBtn);
            this.container.appendChild(nav);
        },
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlider();
        },
        
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.updateSlider();
        },
        
        updateSlider() {
            const offset = -this.currentSlide * 100;
            this.container.style.transform = `translateX(${offset}%)`;
        },
        
        startAutoSlide() {
            setInterval(() => this.nextSlide(), 5000);
        }
    };
    projectsSlider.init();
    const testimonialsCarousel = {
        container: document.querySelector('.testimonials-carousel'),
        slides: document.querySelectorAll('.testimonial-slide'),
        currentSlide: 0,
        
        init() {
            if (this.slides.length <= 1) return;
            
            this.createDots();
            this.showSlide(0);
            this.startAutoSlide();
        },
        
        createDots() {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.addEventListener('click', () => this.showSlide(index));
                dotsContainer.appendChild(dot);
            });
            
            this.container.appendChild(dotsContainer);
        },
        
        showSlide(index) {
            this.currentSlide = index; this.slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
                slide.style.visibility = i === index ? 'visible' : 'hidden';
            });const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        },
        
        nextSlide() {
            this.showSlide((this.currentSlide + 1) % this.slides.length);
        },
        
        startAutoSlide() {
            setInterval(() => this.nextSlide(), 5000);
        }
    };
    testimonialsCarousel.init();const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => observer.observe(element));
    };observeElements(document.querySelectorAll('.service-card'), 'animate-in');
    observeElements(document.querySelectorAll('.process-step'), 'animate-in');
}); 