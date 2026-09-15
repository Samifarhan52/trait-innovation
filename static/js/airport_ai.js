/**
 * TRAIT AirportAI — Interactive Script
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGSAPAnimations();
  initHeroParallax();
});

// GSAP SCROLL & LOAD ANIMATIONS
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero timeline reveal
  const heroTl = gsap.timeline();
  heroTl.from('#hero h1', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('#hero p', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('#hero-visual-container', { opacity: 0, scale: 0.95, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.5');

  // Fade-in section animations
  gsap.utils.toArray('section:not(#hero)').forEach(sec => {
    gsap.from(sec, {
      opacity: 0.92,
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

// SUBTLE CURSOR PARALLAX EFFECT IN HERO VISUAL
function initHeroParallax() {
  const container = document.getElementById('hero-visual-container');
  if (!container || window.innerWidth < 1024) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(container, {
      rotationY: x * 6,
      rotationX: -y * 6,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4
    });
  });

  container.addEventListener('mouseleave', () => {
    gsap.to(container, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
}

// PASSENGER SELECTOR (SECTION 02)
function selectPassenger(type) {
  const strip = document.getElementById('passenger-selector-strip');
  if (!strip) return;

  const buttons = strip.querySelectorAll('.passenger-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'border-airport-cyan', 'border-airport-blue', 'border-airport-amber', 'border-airport-magenta', 'border-airport-violet', 'border-airport-emerald');
    btn.classList.add('border-transparent');
  });

  const targetBtn = event.currentTarget;
  if (targetBtn) {
    targetBtn.classList.remove('border-transparent');
    targetBtn.classList.add('active');
    
    if (type === 'departing') targetBtn.classList.add('border-airport-cyan');
    else if (type === 'arriving') targetBtn.classList.add('border-airport-blue');
    else if (type === 'transit') targetBtn.classList.add('border-airport-amber');
    else if (type === 'families') targetBtn.classList.add('border-airport-magenta');
    else if (type === 'business') targetBtn.classList.add('border-airport-violet');
    else targetBtn.classList.add('border-airport-emerald');
  }
}

// TERMINAL MENU SWITCHING (SECTION 03)
function switchTerminalTab(tabName) {
  const tabs = document.querySelectorAll('.term-tab');
  tabs.forEach(t => {
    t.classList.remove('active', 'bg-airport-blue', 'text-white');
    t.classList.add('text-slate-300');
  });

  const targetTab = document.getElementById(`term-tab-${tabName}`);
  if (targetTab) {
    targetTab.classList.add('active', 'bg-airport-blue', 'text-white');
    targetTab.classList.remove('text-slate-300');
  }
}

// MODAL CONTROLS
function openAssistanceModal() {
  const modal = document.getElementById('assistance-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAssistanceModal() {
  const modal = document.getElementById('assistance-modal');
  if (modal) modal.classList.add('hidden');
}

function runAssistanceSubmit() {
  const output = document.getElementById('assistance-output');
  if (output) output.classList.remove('hidden');
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
