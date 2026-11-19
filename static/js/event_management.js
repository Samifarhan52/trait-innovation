/**
 * TRAIT Event Management — Interactive Script
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initGSAPAnimations();
  if (typeof selectEventBundle === 'function') {
    selectEventBundle('wedding');
  }
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
  const modal = document.getElementById('plan-modal');
  const select = modal ? modal.querySelector('select') : null;
  const eventType = select ? select.value : 'Event Planning';
  const input = modal ? modal.querySelector('input') : null;
  const contact = input ? input.value.trim() : '';

  const waText = 
`*TRAIT Event Management — Event Planning Inquiry*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 *Event Type:* ${eventType}
📧 *Contact Info:* ${contact || 'Client Requester'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent via www.traitinnovation.com/trait-event-management_`;

  const waUrl = `https://api.whatsapp.com/send?phone=917975926279&text=${encodeURIComponent(waText)}`;
  const output = document.getElementById('modal-output');
  if (output) {
    output.classList.remove('hidden');
    output.innerHTML = `
      <div class="text-event-rose font-bold">✓ INQUIRY PREPARED</div>
      <div class="text-event-charcoal dark:text-slate-200">Connecting you directly to our WhatsApp team...</div>
      <a href="${waUrl}" target="_blank" class="inline-block mt-2 underline text-event-rose font-bold">Click here to continue to WhatsApp</a>
    `;
  }

  try {
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Event Client', email: contact, service: 'TRAIT Event Management', message: `Event Type: ${eventType}` })
    }).catch(() => {});
  } catch (err) {}

  const win = window.open(waUrl, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = waUrl;
  }
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

// INTERACTIVE TURNKEY EVENT BUNDLE PLANNER
const eventBundlesData = {
  wedding: {
    title: "Grand Wedding & Reception All-Inclusive Package",
    scope: "Complete end-to-end coverage from Mehndi & Sangeet to Mandap and Grand Reception.",
    services: [
      "Custom Mandap Architecture, Floral Installations & Entrance Tunnel",
      "Multi-Cuisine Gourmet Catering with Live Specialty Counters",
      "Bridal, Groom & Family Concierge Styling and Makeup Services",
      "Cinematic 4K Videography, Drone Coverage & Live Web Streaming",
      "Custom Digital & Print Foil Invitation Suites with WhatsApp RSVP",
      "Dedicated On-Ground Hospitality Desk & Venue Teardown Management"
    ],
    leadTime: "30 to 60 Days Recommended Lead Time"
  },
  corporate: {
    title: "Enterprise Corporate Summit & Annual Gala",
    scope: "Executive offsites, symposiums, product launches, and annual shareholder banquets.",
    services: [
      "Modular Stage Trusses, LED Video Wall (P2.5) & Audio Consoles",
      "Corporate Delegate Registration, QR Badge Printing & Welcome Kits",
      "C-Suite Speaker Hospitality, Green Rooms & Run-of-Show Protocol",
      "Executive Dining & High-Tea Buffets with Dietary Categorization",
      "Keynote Photography, Live Social Clipping & Post-Event Highlights",
      "Complete AV Rigging, Load-In/Out Safety Compliance & Cleanup"
    ],
    leadTime: "14 to 30 Days Recommended Lead Time"
  },
  gala: {
    title: "VIP Awards Gala & Cultural Celebration",
    scope: "Black-tie award ceremonies, celebrity evenings, and milestone anniversary galas.",
    services: [
      "Red Carpet Entry, Step-and-Repeat Media Walls & VIP Lounges",
      "Themed Ballroom Draping, Intelligent Lighting & Haze Ambience",
      "Master of Ceremonies (MC), Live Orchestral Band / DJ Coordination",
      "Five-Star Plated Dinner Service & Cocktail Bar Mixology",
      "Trophy Fabrication, Certificate Printing & Stage Presenter Flow",
      "VIP Chauffeur Transit, Hotel Blocks & Security Coordination"
    ],
    leadTime: "20 to 45 Days Recommended Lead Time"
  },
  private: {
    title: "Curated Private Social & Milestone Celebration",
    scope: "Birthdays, silver/golden jubilees, intimate rooftop dinners, and family reunions.",
    services: [
      "Bespoke Theme Styling, Ambient Fairy/Bistro Lights & Table Decor",
      "Live Barbecue / Wood-Fired Pizza Station & Custom Designer Cake",
      "Instagrammable Thematic Photo Backdrops, Neon Signage & Tablescapes",
      "Custom Animated Video Invitations & WhatsApp RSVP Tracking",
      "Live Acoustic Band / DJ Setup with Intelligent Dance Floor Lighting",
      "Bespoke Gifting Hampers, Return Gifts & Keepsake Coordination"
    ],
    leadTime: "10 to 25 Days Recommended Lead Time"
  }
};

function selectEventBundle(key) {
  const data = eventBundlesData[key];
  if (!data) return;

  document.querySelectorAll('.event-bundle-btn').forEach(btn => {
    btn.classList.remove('bg-gradient-to-r', 'from-rose-500', 'to-pink-500', 'text-white', 'shadow-lg');
    btn.classList.add('bg-slate-900/80', 'border', 'border-slate-700', 'text-slate-300');
  });

  const active = document.getElementById('bundle-btn-' + key);
  if (active) {
    active.classList.add('bg-gradient-to-r', 'from-rose-500', 'to-pink-500', 'text-white', 'shadow-lg');
    active.classList.remove('bg-slate-900/80', 'border', 'border-slate-700', 'text-slate-300');
  }

  const box = document.getElementById('bundle-display-box');
  if (!box) return;

  box.innerHTML = `
    <div class="space-y-4 animate-fadeIn">
      <div class="flex flex-wrap items-center justify-between pb-3 border-b border-rose-500/20 gap-2">
        <div>
          <h4 class="text-base font-display font-bold text-white">${data.title}</h4>
          <p class="text-xs text-slate-300 mt-0.5">${data.scope}</p>
        </div>
        <span class="text-[10px] font-mono text-rose-400 font-bold uppercase px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">${data.leadTime}</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        ${data.services.map(s => `
          <div class="p-2.5 rounded-xl bg-slate-900/90 border border-rose-500/20 flex items-start gap-2">
            <span class="text-rose-400 font-bold shrink-0">✓</span>
            <span class="text-slate-200">${s}</span>
          </div>
        `).join('')}
      </div>

      <div class="pt-2 flex flex-wrap items-center justify-between gap-4">
        <span class="text-xs font-mono text-slate-400">Single Contract • Single Point of Contact • 100% Quality Assurance</span>
        <button onclick="openPlanModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md">
          Inquire This Package
        </button>
      </div>
    </div>
  `;
}
