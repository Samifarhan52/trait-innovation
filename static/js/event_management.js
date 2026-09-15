/**
 * TRAIT Event Management — Interactive Script
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initGSAPAnimations();
});

// GSAP SCROLL ANIMATIONS
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Fade-in animations for section headings
  gsap.utils.toArray('section').forEach(sec => {
    gsap.from(sec, {
      opacity: 0.9,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
      }
    });
  });
}

// GALLERY CAROUSEL SLIDER
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', title: 'Royal Destination Wedding' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', title: 'Annual Enterprise Summit' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80', title: 'Inter-College Youth Festival' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80', title: 'Golden Anniversary Gala' }
];

let galleryIndex = 0;

function slideGallery(direction) {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  galleryIndex = (galleryIndex + direction + galleryImages.length) % galleryImages.length;
  container.style.opacity = '0.5';

  setTimeout(() => {
    container.style.opacity = '1';
  }, 200);
}

function openLightbox(index) {
  openPlanModal();
}

// MODAL CONTROLS
function openPlanModal() {
  const modal = document.getElementById('plan-modal');
  if (modal) modal.classList.remove('hidden');
}

function closePlanModal() {
  const modal = document.getElementById('plan-modal');
  if (modal) modal.classList.add('hidden');
}

function runModalSubmit() {
  const output = document.getElementById('modal-output');
  if (output) output.classList.remove('hidden');
}

// THEME TOGGLE
function initTheme() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

// MOBILE MENU
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
