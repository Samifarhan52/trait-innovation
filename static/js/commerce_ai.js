/**
 * TRAIT CommerceAI — Interactive Script
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initGSAPAnimations();
  initHeroParallax();
});

// GSAP SCROLL & LOAD ANIMATIONS
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero section sequence reveal
  const heroTl = gsap.timeline();
  heroTl.from('#hero h1', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('#hero p', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('#hero-visual-container', { opacity: 0, scale: 0.95, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.5');

  // Fade-in animations for remaining sections
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

// CATEGORY STRIP SELECTOR (SECTION 02)
function selectCategory(cat) {
  const strip = document.getElementById('category-selector-strip');
  if (!strip) return;

  const buttons = strip.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'border-commerce-pink', 'border-commerce-purple', 'border-commerce-orange', 'border-commerce-emerald', 'border-commerce-cyan');
    btn.classList.add('border-transparent');
  });

  const targetBtn = event.currentTarget;
  if (targetBtn) {
    targetBtn.classList.remove('border-transparent');
    targetBtn.classList.add('active');
    
    if (cat === 'fashion') targetBtn.classList.add('border-commerce-pink');
    else if (cat === 'electronics') targetBtn.classList.add('border-commerce-purple');
    else if (cat === 'home') targetBtn.classList.add('border-commerce-orange');
    else if (cat === 'beauty') targetBtn.classList.add('border-commerce-pink');
    else if (cat === 'food') targetBtn.classList.add('border-commerce-emerald');
    else targetBtn.classList.add('border-commerce-cyan');
  }
}

// DASHBOARD TAB SWITCHING (SECTION 03)
function switchDashboardTab(tabName) {
  // Hide all panels
  const panels = document.querySelectorAll('.dash-panel');
  panels.forEach(p => p.classList.add('hidden'));

  // Reset tab button styles
  const tabs = document.querySelectorAll('.dash-tab');
  tabs.forEach(t => {
    t.classList.remove('active', 'bg-commerce-purple', 'text-white');
    t.classList.add('text-commerce-textPrimary', 'dark:text-slate-300');
  });

  // Activate target panel
  const targetPanel = document.getElementById(`dash-panel-${tabName}`);
  if (targetPanel) {
    targetPanel.classList.remove('hidden');
    gsap.fromTo(targetPanel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
  }

  // Activate target tab button
  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) {
    targetTab.classList.add('active', 'bg-commerce-purple', 'text-white');
    targetTab.classList.remove('text-commerce-textPrimary', 'dark:text-slate-300');
  }
}

// HERO PRODUCT ADD TO CART TRIGGER
function triggerProductAdd(btn) {
  if (!btn) return;
  const origText = btn.innerText;
  btn.innerText = 'ADDED ✓';
  btn.classList.remove('bg-commerce-emerald');
  btn.classList.add('bg-emerald-700');

  setTimeout(() => {
    btn.innerText = origText;
    btn.classList.remove('bg-emerald-700');
    btn.classList.add('bg-commerce-emerald');
  }, 2000);
}

// MODAL CONTROLS
function openStoreModal() {
  const modal = document.getElementById('store-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeStoreModal() {
  const modal = document.getElementById('store-modal');
  if (modal) modal.classList.add('hidden');
}

function runStoreSubmit() {
  const output = document.getElementById('store-output');
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
