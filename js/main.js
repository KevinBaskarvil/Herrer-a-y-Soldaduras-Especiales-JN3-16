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
const serviciosSectores = document.querySelector('.servicios-sectores');
const serviciosCategorias = document.querySelectorAll('.servicios-categoria');
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
observerNosotros.observe(serviciosHeader);
if (serviciosSectores) observerNosotros.observe(serviciosSectores);
serviciosCategorias.forEach(cat => observerNosotros.observe(cat));
observerNosotros.observe(contactoLeft);
observerNosotros.observe(contactoRight);
observerNosotros.observe(proyectosH2);
observerNosotros.observe(proyectosSlider);

const cotizacionHeader = document.querySelector('.cotizacion-header');
const cotizacionForm   = document.querySelector('.cotizacion-form');
if (cotizacionHeader) observerNosotros.observe(cotizacionHeader);
if (cotizacionForm)   observerNosotros.observe(cotizacionForm);

// ===== Formulario de Cotización =====
const formEl = document.getElementById('cotizacionForm');
const catPills = document.querySelectorAll('.cat-pill');
const selectedCats = new Set();

catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const val = pill.dataset.value;
    if (selectedCats.has(val)) {
      selectedCats.delete(val);
      pill.classList.remove('selected');
    } else {
      selectedCats.add(val);
      pill.classList.add('selected');
    }
  });
});

if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = document.getElementById('cf-nombre').value.trim();
    const empresa  = document.getElementById('cf-empresa').value.trim();
    const telefono = document.getElementById('cf-telefono').value.trim();
    const mensaje  = document.getElementById('cf-mensaje').value.trim();

    if (!nombre || !telefono || !mensaje) {
      formEl.reportValidity();
      return;
    }

    const servicios = selectedCats.size > 0
      ? [...selectedCats].join(', ')
      : 'No especificado';

    let text = `*Nueva Solicitud de Cotización — HSE*\n\n`;
    text += `*Nombre:* ${nombre}\n`;
    if (empresa) text += `*Empresa:* ${empresa}\n`;
    text += `*Teléfono:* ${telefono}\n`;
    text += `*Servicio de interés:* ${servicios}\n\n`;
    text += `*Descripción del proyecto:*\n${mensaje}`;

    window.open(`https://wa.me/5667731044?text=${encodeURIComponent(text)}`, '_blank');
  });
}
