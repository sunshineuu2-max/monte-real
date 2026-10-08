/* Comportamientos accesibles y mensajes de WhatsApp, sin dependencias. */
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = document.querySelectorAll('.primary-nav a');
const accordion = document.querySelector('[data-accordion]');
const form = document.querySelector('#form-reserva');
const year = document.querySelector('#year');

// Mantener el encabezado visible tras subir.
const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Menú móvil con acceso por teclado y cierre al seleccionar una sección.
const closeMenu = () => {
  if (!menuButton || !primaryNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  primaryNav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  primaryNav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Acordeón accesible: cada botón mantiene el estado y el contenido oculto.
accordion?.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const answerId = button.getAttribute('aria-controls');
  const answer = answerId ? document.getElementById(answerId) : null;
  const willOpen = button.getAttribute('aria-expanded') !== 'true';

  accordion.querySelectorAll('button').forEach((item) => {
    const itemAnswer = document.getElementById(item.getAttribute('aria-controls'));
    item.setAttribute('aria-expanded', 'false');
    if (itemAnswer) itemAnswer.hidden = true;
  });

  if (willOpen) {
    button.setAttribute('aria-expanded', 'true');
    if (answer) answer.hidden = false;
  }
});

// Validar y costruir el mensaje de WhatsApp con los datos del formulario.
const fields = {
  nombre: document.querySelector('#nombre'),
  evento: document.querySelector('#evento'),
  fecha: document.querySelector('#fecha'),
  personas: document.querySelector('#personas')
};
const status = document.querySelector('#form-status');

const showError = (field, message) => {
  const error = document.querySelector(`#error-${field.id}`);
  field.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
};

const clearError = (field) => {
  field.removeAttribute('aria-invalid');
  const error = document.querySelector(`#error-${field.id}`);
  if (error) error.textContent = '';
};

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  const today = new Date();
  const selectedDate = fields.fecha?.value ? new Date(`${fields.fecha.value}T00:00:00`) : null;

  Object.values(fields).forEach((field) => clearError(field));
  if (!fields.nombre?.value.trim()) { showError(fields.nombre, 'Escribe tu nombre.'); valid = false; }
  if (!fields.evento?.value) { showError(fields.evento, 'Selecciona un tipo de evento.'); valid = false; }
  if (!selectedDate || Number.isNaN(selectedDate.getTime()) || selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    showError(fields.fecha, 'Selecciona una fecha futura.'); valid = false;
  }
  if (!fields.personas?.value || Number(fields.personas.value) < 1) { showError(fields.personas, 'Indica al menos una persona.'); valid = false; }

  if (!valid) {
    status.textContent = 'Revisa los campos marcados.';
    fields.nombre?.focus();
    return;
  }

  const message = [
    'Hola Monte Real, quiero reservar una fecha.',
    '',
    `Nombre: ${fields.nombre.value.trim()}`,
    `Evento: ${fields.evento.value}`,
    `Fecha: ${fields.fecha.value}`,
    `Personas: ${fields.personas.value}`,
    '',
    'Por favor, confirma disponibilidad y el proceso de reserva.'
  ].join('\n');

  const whatsappUrl = `https://wa.me/[NUMERO_DE_WHATSAPP]?text=${encodeURIComponent(message)}`;
  status.textContent = 'Abriendo WhatsApp con tu mensaje...';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

Object.values(fields).forEach((field) => {
  field?.addEventListener('input', () => clearError(field));
});

if (year) year.textContent = String(new Date().getFullYear());
