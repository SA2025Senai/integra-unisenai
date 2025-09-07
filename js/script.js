const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menu.style.display = isOpen ? 'flex' : 'none';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const track = document.querySelector('.carousel-track');
const items = track ? Array.from(track.children) : [];
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
let currentIndex = 0;
const slideCount = items.length;
const slideIntervalMs = 5000; // 5 segundos
let autoplayTimer = null;
let isPaused = false;

function updateCarousel(index = currentIndex) {
  if (!track) return;
  currentIndex = (index + slideCount) % slideCount;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() { updateCarousel(currentIndex + 1); }
function prevSlide() { updateCarousel(currentIndex - 1); }

if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    if (!isPaused) nextSlide();
  }, slideIntervalMs);
}

function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }
function resetAutoplay() { stopAutoplay(); startAutoplay(); }

const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', () => { isPaused = true; });
  carouselContainer.addEventListener('mouseleave', () => { isPaused = false; });
  carouselContainer.addEventListener('touchstart', () => { isPaused = true; }, {passive: true});
  carouselContainer.addEventListener('touchend', () => { isPaused = false; }, {passive: true});
}

if (slideCount > 1) startAutoplay();

const eventDate = new Date('2025-11-06T14:00:00').getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = Date.now();
  const diff = eventDate - now;
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  if (diff <= 0) { daysEl.textContent = '00'; hoursEl.textContent = '00'; minutesEl.textContent = '00'; secondsEl.textContent = '00'; return; }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();
