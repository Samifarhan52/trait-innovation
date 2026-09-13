// Main Interactive Application Logic
document.addEventListener('DOMContentLoaded', () => {

  // 1. LIGHT / DARK THEME TOGGLE (TARGETS BOTH HTML & BODY FOR TAILWIND DARK MODE)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlEl = document.documentElement;
  const body = document.body;

  function applyTheme(isDark) {
    if (isDark) {
      htmlEl.classList.add('dark');
      body.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
      body.classList.remove('dark');
    }
  }

  // Read saved theme from localStorage or default to Light Mode
  const savedTheme = localStorage.getItem('trait_theme') || 'light';
  applyTheme(savedTheme === 'dark');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = !htmlEl.classList.contains('dark');
      applyTheme(isDark);
      localStorage.setItem('trait_theme', isDark ? 'dark' : 'light');
    });
  }

  // 2. HERO DYNAMIC TEXT CYCLING
  const dynamicTextEl = document.getElementById('hero-dynamic-text');
  const headlines = [
    "Real Impact.",
    "Smarter Automation.",
    "Aviation Telemetry.",
    "Scalable Web SaaS.",
    "Digital Event Production."
  ];
  let headlineIdx = 0;

  if (dynamicTextEl) {
    setInterval(() => {
      headlineIdx = (headlineIdx + 1) % headlines.length;
      dynamicTextEl.style.opacity = '0';
      dynamicTextEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        dynamicTextEl.textContent = headlines[headlineIdx];
        dynamicTextEl.style.opacity = '1';
        dynamicTextEl.style.transform = 'translateY(0px)';
      }, 300);
    }, 3500);
  }

  // 3. LEADERSHIP STAGGERED ANIMATED REVEAL ON SCROLL
  const leadershipCards = document.querySelectorAll('.leadership-reveal');
  if (leadershipCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Re-trigger animation on scroll back
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15 });

    leadershipCards.forEach(card => observer.observe(card));
  }

  // 4. FAQ ACCORDION TOGGLE
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isOpen = content.classList.contains('hidden');
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');

        if (isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 5. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
