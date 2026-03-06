// ===== Toggle navbar =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// ===== Slider Proyectos =====
const slides = document.querySelectorAll('.slide');
const btnPrev = document.getElementById('sliderPrev');
const btnNext = document.getElementById('sliderNext');
const slider = document.querySelector('.proyectos-slider');
let currentSlide = 0;
let autoSlide = null;

function changeSlide(direction) {
  const currentElement = slides[currentSlide];
  currentElement.classList.remove('active');
  const currentVideo = currentElement.querySelector('video');
  if (currentVideo) currentVideo.pause();

  currentSlide = (currentSlide + direction + slides.length) % slides.length;

  const nextElement = slides[currentSlide];
  nextElement.classList.add('active');
  const nextVideo = nextElement.querySelector('video');
  if (nextVideo) nextVideo.play();
}

function startAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
  autoSlide = setInterval(() => changeSlide(1), 4000);
}

function stopAutoSlide() {
  if (autoSlide) {
    clearInterval(autoSlide);
    autoSlide = null;
  }
}

btnNext.addEventListener('click', () => {
  changeSlide(1);
  startAutoSlide();
});

btnPrev.addEventListener('click', () => {
  changeSlide(-1);
  startAutoSlide();
});

slider.addEventListener('mousedown', stopAutoSlide);
slider.addEventListener('touchstart', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);
slider.addEventListener('touchend', startAutoSlide);

startAutoSlide();

// ===== Animación aparecer desde abajo en Nosotros =====
const nosotrosLeft = document.querySelector('.nosotros-left');
const nosotrosRight = document.querySelector('.nosotros-right');
const serviciosGrid = document.querySelector('.servicios-grid');
const serviciosHeader = document.querySelector('.servicios-header');
const contactoLeft = document.querySelector('.contacto-left');
const contactoRight = document.querySelector('.contacto-right');
const proyectosH2 = document.querySelector('.proyectos h2');
const proyectosSlider = document.querySelector('.proyectos-slider');


const observerNosotros = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

observerNosotros.observe(nosotrosLeft);
observerNosotros.observe(nosotrosRight);
observerNosotros.observe(serviciosGrid);
observerNosotros.observe(serviciosHeader);
observerNosotros.observe(contactoLeft);
observerNosotros.observe(contactoRight);
observerNosotros.observe(proyectosH2);
observerNosotros.observe(proyectosSlider);