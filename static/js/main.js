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

  // 6. FLOATING AI CHATBOT POPOVER TOGGLE & TYPING REVEAL
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
      }, 25);
    }
  }

  function toggleChatbot() {
    if (!chatbotPopover) return;
    const isHidden = chatbotPopover.classList.contains('opacity-0');

    if (isHidden) {
      chatbotPopover.classList.remove('opacity-0', 'translate-y-4', 'scale-95', 'pointer-events-none');
      chatbotPopover.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');

      // Trigger typewriter animation
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

  if (chatbotTriggerBtn) {
    chatbotTriggerBtn.addEventListener('click', toggleChatbot);
  }
  if (chatbotCloseBtn) {
    chatbotCloseBtn.addEventListener('click', toggleChatbot);
  }

  // 7. ANIMATED COMING SOON TOAST FOR SOCIAL MEDIA CLICK EVENTS
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
