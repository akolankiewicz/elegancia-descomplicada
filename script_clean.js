document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqAnswer = question.nextElementSibling;
            const icon = question.querySelector('.toggle-icon');

            faqAnswer.classList.toggle('open');

            if (faqAnswer.classList.contains('open')) {
                icon.textContent = '−';
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20; // 20px = gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (currentIndex === cards.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        }, 5000);
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex === cards.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = cards.length - 1;
        } else {
            currentIndex--;
        }
        updateCarousel();
        startAutoSlide();
    });

    window.addEventListener('resize', updateCarousel);

    startAutoSlide();
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    function animateOnScroll() {
        document.querySelectorAll('.fade-in:not(.active)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
        
        document.querySelectorAll('.slide-up:not(.active)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
        
        document.querySelectorAll('.reveal-left:not(.active)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
        
        document.querySelectorAll('.reveal-right:not(.active)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
        
        document.querySelectorAll('.reveal-item:not(.active)').forEach((el, index) => {
            if (isElementInViewport(el)) {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 150);
            }
        });
        
        document.querySelectorAll('.fade-in-item:not(.active)').forEach((el, index) => {
            if (isElementInViewport(el)) {
                setTimeout(() => {
                    el.classList.add('active');
                    el.style.transform = 'translateY(0) rotate(0)';
                }, index * 200);
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    setTimeout(animateOnScroll, 100);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelectorAll('.clothes-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.zIndex = '1';
            }, 300);
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundPosition = `center ${scrollPosition * 0.05}px`;
        }
        
        document.querySelectorAll('.solution-section, .offer-section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            const distanceFromMiddle = scrollPosition - sectionMiddle;
            
            section.style.backgroundPosition = `center ${distanceFromMiddle * 0.05}px`;
        });
    });
    
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const item = this.parentElement;
            
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    function typeEffect(element, text, speed) {
        let i = 0;
        const timer = setInterval(function() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    function startCountdown() {
        const countdownElement = document.querySelector('.limited-time');
        if (!countdownElement) return;
        
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);
        
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = endTime - now;
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `(oferta expira em ${hours}h ${minutes}m ${seconds}s)`;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "(oferta expirada)";
            }
        }, 1000);
    }
    
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});
