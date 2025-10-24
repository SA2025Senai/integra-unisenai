document.addEventListener('DOMContentLoaded', () => {

    // ----------------- ANIMAÇÃO DO HEADER NO SCROLL -----------------
    const header = document.querySelector('header');
    const headerAnimatedClass = 'header-animated';

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.remove(headerAnimatedClass);
        } else {
            header.classList.add(headerAnimatedClass);
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez ao carregar a página

    // ----------------- MENU MOBILE -----------------
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('open');
        });

        // Close menu when a link is clicked (for mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint is 768px
                    menu.classList.add('hidden');
                    menu.classList.remove('open');
                }
            });
        });
    }

    // Countdown Timer
    const countdownDate = new Date('Nov 6, 2025 00:00:00').getTime();

    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';
        }
    }, 1000);

    // ----------------- CARROSSEL -----------------
    const initCarousel = () => {
        const carouselTrack = document.querySelector('.carousel-track');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const carouselContainer = document.querySelector('.carousel-container');

        if (!carouselTrack || carouselItems.length === 0) return;

        let currentIndex = 0;
        const slideCount = carouselItems.length;
        const slideIntervalMs = 5000; // 5 segundos
        let autoplayTimer = null;
        let isPaused = false;

        const updateCarousel = (index = currentIndex) => {
            currentIndex = (index + slideCount) % slideCount;
            // Recalcula a largura do item a cada atualização para lidar com redimensionamento
            const itemWidth = carouselItems[0].clientWidth; 
            carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
        };

        const nextSlide = () => updateCarousel(currentIndex + 1);
        const prevSlide = () => updateCarousel(currentIndex - 1);

        const stopAutoplay = () => { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } };
        const startAutoplay = () => {
            stopAutoplay();
            autoplayTimer = setInterval(() => {
                if (!isPaused) nextSlide();
            }, slideIntervalMs);
        };
        const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => { isPaused = true; });
            carouselContainer.addEventListener('mouseleave', () => { isPaused = false; });
            carouselContainer.addEventListener('touchstart', () => { isPaused = true; }, {passive: true});
            carouselContainer.addEventListener('touchend', () => { isPaused = false; }, {passive: true});
        }

        if (slideCount > 1) startAutoplay();

        window.addEventListener('resize', updateCarousel);
        updateCarousel(); // Inicializa a posição
    };
    
    initCarousel();
});

