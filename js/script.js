const menuBtn = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

function updateCountdown() {
  const eventDate = new Date('2025-11-06T09:00:00'); // 06/11/2025 09:00
  const now = new Date();
  const diff = eventDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');
    if (d) d.textContent = String(days).padStart(2, '0');
    if (h) h.textContent = String(hours).padStart(2, '0');
    if (m) m.textContent = String(minutes).padStart(2, '0');
    if (s) s.textContent = String(seconds).padStart(2, '0');
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

(function () {
  const container = document.querySelector('.carousel-container');
  if (!container) return;

  const track = container.querySelector('.carousel-track');
  const items = Array.from(container.querySelectorAll('.carousel-item'));
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');
  const viewport = container.querySelector('.carousel-viewport');

  let index = 0;
  let itemWidth = viewport.clientWidth;

  function setTransform() {
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  function goPrev() {
    index = (index - 1 + items.length) % items.length;
    setTransform();
  }

  function goNext() {
    index = (index + 1) % items.length;
    setTransform();
  }

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  window.addEventListener('resize', () => {
    itemWidth = viewport.clientWidth;
    setTransform();
  });

  let auto = setInterval(goNext, 6000);
  container.addEventListener('mouseenter', () => clearInterval(auto));
  container.addEventListener('mouseleave', () => { auto = setInterval(goNext, 6000); });
})();


const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let index = 0;

function showNextSlide() {
  index = (index + 1) % items.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(showNextSlide, 3000);

