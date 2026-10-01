/**
 * TRAIT Innovation — Master Global Application Script
 * Handles Theme Switching, Global Navigation, Mobile Menu, Fast Page Entrance, and Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. LIGHT / DARK THEME ENGINE (UNIFIED ACROSS ALL PAGES & COMPONENTS)
  // =========================================================================
  const htmlEl = document.documentElement;
  const bodyEl = document.body;

  function applyTheme(isDark) {
    if (isDark) {
      htmlEl.classList.add('dark');
      bodyEl.classList.add('dark');
      htmlEl.classList.remove('light');
      bodyEl.classList.remove('light');
    } else {
      htmlEl.classList.remove('dark');
      bodyEl.classList.remove('dark');
      htmlEl.classList.add('light');
      bodyEl.classList.add('light');
    }
  }

  // Load saved theme (default to dark for sleek tech aesthetic)
  const savedTheme = localStorage.getItem('trait_theme') || 'dark';
  applyTheme(savedTheme === 'dark');

  // Bind all potential theme toggle buttons across templates and components
  const themeToggleSelectors = [
    '#global-theme-toggle-btn',
    '#theme-toggle-btn',
    '#global-theme-btn',
    '.theme-toggle-trigger'
  ];

  themeToggleSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDarkNow = !htmlEl.classList.contains('dark');
        applyTheme(isDarkNow);
        localStorage.setItem('trait_theme', isDarkNow ? 'dark' : 'light');
      });
    });
  });


  // =========================================================================
  // 2. GLOBAL NAVBAR ACTIVE STATE & MOBILE DRAWER CONTROLLER
  // =========================================================================
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  
  // Highlight active home dot if on root page
  const homeNavLinks = document.querySelectorAll('.global-nav-link[data-path="/"]');
  homeNavLinks.forEach(link => {
    const dot = link.querySelector('.home-active-dot');
    if (currentPath === '/' || currentPath === '') {
      if (dot) dot.classList.remove('opacity-0');
      link.classList.add('font-bold', 'text-blue-600', 'dark:text-cyan-400');
    } else {
      if (dot) dot.classList.add('opacity-0');
    }
  });

  // Mobile Drawer Toggle
  const mobileBtn = document.getElementById('global-mobile-menu-btn') || document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('global-mobile-menu-close');
  const mobileDrawer = document.getElementById('global-mobile-menu') || document.getElementById('mobile-menu');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  if (mobileCloseBtn && mobileDrawer) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });
  }


  // =========================================================================
  // 3. FAST HIGH-END SCENE ENTRY ANIMATION (LOAD TIME < 350ms)
  // =========================================================================
  const mainHero = document.querySelector('section') || document.querySelector('main');
  if (mainHero) {
    mainHero.classList.add('hero-entry-anim');
  }


  // =========================================================================
  // 4. SCROLL REVEAL OBSERVER (SECTION LEVEL)
  // =========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal, .leadership-reveal');
  if (revealElements.length > 0) {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }


  // =========================================================================
  // 5. HERO DYNAMIC HEADLINE TEXT CYCLING
  // =========================================================================
  const dynamicTextEl = document.getElementById('hero-dynamic-text');
  if (dynamicTextEl) {
    const headlines = [
      "Real Impact.",
      "Smarter Automation.",
      "Aviation Telemetry.",
      "Scalable Web SaaS.",
      "Digital Event Production."
    ];
    let headlineIdx = 0;

    setInterval(() => {
      headlineIdx = (headlineIdx + 1) % headlines.length;
      dynamicTextEl.style.opacity = '0';
      dynamicTextEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        dynamicTextEl.textContent = headlines[headlineIdx];
        dynamicTextEl.style.opacity = '1';
        dynamicTextEl.style.transform = 'translateY(0px)';
      }, 250);
    }, 3200);
  }


  // =========================================================================
  // 6. FAQ ACCORDION CONTROLLER
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all FAQs first
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });


  // =========================================================================
  // 7. FLOATING AI CHATBOT POPOVER & TYPEWRITER REVEAL
  // =========================================================================
  const chatbotTriggerBtn = document.getElementById('chatbot-trigger-btn');
  const chatbotPopover = document.getElementById('chatbot-popover');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotTypingText = document.getElementById('chatbot-typing-text');

  let typingTimeout = null;
  const fullMessage = "Our AI assistant is currently being trained.\nWe'll be ready to help you soon.";

  function typeWriterMessage(text, element, i = 0) {
    if (i === 0) {
      element.innerHTML = '';
    }
    if (i < text.length) {
      const char = text.charAt(i);
      if (char === '\n') {
        element.innerHTML += '<br />';
      } else {
        element.innerHTML += char;
      }
      typingTimeout = setTimeout(() => {
        typeWriterMessage(text, element, i + 1);
      }, 20);
    }
  }

  function toggleChatbot() {
    if (!chatbotPopover) return;
    const isHidden = chatbotPopover.classList.contains('opacity-0');

    if (isHidden) {
      chatbotPopover.classList.remove('opacity-0', 'translate-y-4', 'scale-95', 'pointer-events-none');
      chatbotPopover.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');

      if (chatbotTypingText) {
        if (typingTimeout) clearTimeout(typingTimeout);
        typeWriterMessage(fullMessage, chatbotTypingText, 0);
      }
    } else {
      chatbotPopover.classList.add('opacity-0', 'translate-y-4', 'scale-95', 'pointer-events-none');
      chatbotPopover.classList.remove('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
      if (typingTimeout) clearTimeout(typingTimeout);
    }
  }

  window.toggleChatbot = toggleChatbot;
  if (chatbotTriggerBtn) chatbotTriggerBtn.addEventListener('click', toggleChatbot);
  if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', toggleChatbot);


  // =========================================================================
  // 8. SOCIAL MEDIA & LEGAL DOCUMENT MODAL UTILITIES
  // =========================================================================
  function showSocialComingSoon(platform) {
    let toast = document.getElementById('social-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'social-toast';
      toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-2xl bg-white/95 dark:bg-[#0A0F1D]/95 border border-slate-200 dark:border-cyan-500/40 backdrop-blur-2xl shadow-2xl text-slate-900 dark:text-white text-xs font-mono font-bold flex items-center gap-3 transition-all duration-300 opacity-0 translate-y-6 pointer-events-none select-none';
      toast.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse"></span>
        <span id="social-toast-text">Coming Soon 🚀 Our official channel is launching soon!</span>
        <button onclick="hideSocialToast()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-extrabold ml-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">✕</button>
      `;
      document.body.appendChild(toast);
    }

    const toastText = document.getElementById('social-toast-text');
    if (toastText) {
      toastText.innerHTML = `<span class="text-blue-600 dark:text-cyan-400 font-black">Coming Soon 🚀</span> Our official <u>${platform}</u> channel is launching soon!`;
    }

    toast.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');

    if (window.socialToastTimeout) clearTimeout(window.socialToastTimeout);
    window.socialToastTimeout = setTimeout(() => {
      hideSocialToast();
    }, 3800);
  }

  function hideSocialToast() {
    const toast = document.getElementById('social-toast');
    if (toast) {
      toast.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  }

  window.showSocialComingSoon = showSocialComingSoon;
  window.hideSocialToast = hideSocialToast;

});
