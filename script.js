const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const form = document.querySelector('#inquiry-form');
const note = document.querySelector('#form-note');
form.addEventListener('submit', () => {
  note.textContent = 'Sending your inquiry securely...';
});

const modal = document.querySelector('#video-modal');
const modalVideo = document.querySelector('#modal-video');
const modalTitle = document.querySelector('#video-modal-title');
const launchButtons = document.querySelectorAll('.video-launch');
let lastTrigger = null;

function openVideoModal(button) {
  lastTrigger = button;
  modalTitle.textContent = button.dataset.title || 'Event Highlight';
  modalVideo.src = button.dataset.video;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalVideo.play().catch(() => {});
  modal.querySelector('.video-modal-close').focus();
}

function closeVideoModal() {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastTrigger) lastTrigger.focus();
}

launchButtons.forEach(button => button.addEventListener('click', () => openVideoModal(button)));
modal.querySelectorAll('[data-close-modal]').forEach(element => element.addEventListener('click', closeVideoModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeVideoModal();
});
