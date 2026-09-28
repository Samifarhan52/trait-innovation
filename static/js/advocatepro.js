/**
 * TRAIT AdvocatePro AI — Legal Intelligence Interactive Engine
 * Handles: Minimized Sticky Left Service Navbar, Global Theme Toggle, Interactive Case File Highlights,
 * Active Section Scroll Observer, GSAP Scroll Reveals, and Touch Controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------
  // 1. FLOATING MINIMIZED STICKY LEFT SERVICE NAVBAR CONTROLLER
  // -------------------------------------------------------------------
  const serviceNav = document.getElementById('advocate-service-nav');
  const navContainer = document.getElementById('advocate-nav-container');
  const navTrigger = document.getElementById('advocate-nav-trigger');
  const navToggleIcon = document.getElementById('advocate-nav-toggle-icon');
  const navCollapseBtn = document.getElementById('advocate-nav-collapse-btn');
  const navLinks = document.querySelectorAll('.advocate-nav-link');
  const sidebarTextElements = document.querySelectorAll('.sidebar-text-content');

  let isNavExpanded = false;

  function expandNav() {
    if (isNavExpanded) return;
    isNavExpanded = true;
    
    if (navContainer) {
      navContainer.classList.remove('w-14', 'sm:w-16');
      navContainer.classList.add('w-64', 'sm:w-72');
    }
    
    sidebarTextElements.forEach(el => {
      el.classList.remove('hidden');
      el.classList.add('flex');
    });

    if (navToggleIcon) {
      navToggleIcon.style.transform = 'rotate(180deg)';
    }
  }

  function collapseNav() {
    if (!isNavExpanded) return;
    isNavExpanded = false;
    
    if (navContainer) {
      navContainer.classList.remove('w-64', 'sm:w-72');
      navContainer.classList.add('w-14', 'sm:w-16');
    }

    sidebarTextElements.forEach(el => {
      el.classList.remove('flex');
      el.classList.add('hidden');
    });

    if (navToggleIcon) {
      navToggleIcon.style.transform = 'rotate(0deg)';
    }
  }

  if (navTrigger) {
    navTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isNavExpanded) {
        collapseNav();
      } else {
        expandNav();
      }
    });
  }

  // Hover expand on Desktop (lg and up)
  if (serviceNav && window.innerWidth >= 1024) {
    serviceNav.addEventListener('mouseenter', expandNav);
    serviceNav.addEventListener('mouseleave', collapseNav);
  }

  if (navCollapseBtn) {
    navCollapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      collapseNav();
    });
  }

  // Close when clicking any nav anchor link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      collapseNav();
    });
  });

  // Tap/Click outside to collapse
  document.addEventListener('click', (e) => {
    if (serviceNav && !serviceNav.contains(e.target)) {
      collapseNav();
    }
  });


  // -------------------------------------------------------------------
  // 2. ACTIVE SECTION INTERSECTION OBSERVER (SCROLL HIGHLIGHTING)
  // -------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const sectionTarget = link.getAttribute('data-section') || link.getAttribute('href').replace('#', '');
            const activePill = link.querySelector('.nav-active-pill');
            const iconBox = link.querySelector('.w-8');
            
            if (sectionTarget === currentId) {
              link.classList.add('bg-white/15', 'text-advocate-brass');
              if (activePill) activePill.classList.remove('opacity-0');
              if (iconBox) {
                iconBox.classList.add('bg-advocate-burgundy', 'text-white', 'border-transparent');
                iconBox.classList.remove('bg-white/5', 'text-advocate-brass', 'border-white/10');
              }
            } else {
              link.classList.remove('bg-white/15', 'text-advocate-brass');
              if (activePill) activePill.classList.add('opacity-0');
              if (iconBox) {
                iconBox.classList.remove('bg-advocate-burgundy', 'text-white', 'border-transparent');
                iconBox.classList.add('bg-white/5', 'text-advocate-brass', 'border-white/10');
              }
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }


  // -------------------------------------------------------------------
  // 3. GLOBAL THEME TOGGLE CONTROLLER (LIGHT / DARK MODE)
  // -------------------------------------------------------------------
  const themeBtn = document.getElementById('global-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const htmlEl = document.documentElement;
      if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
        localStorage.setItem('trait-theme', 'light');
      } else {
        htmlEl.classList.remove('light');
        htmlEl.classList.add('dark');
        localStorage.setItem('trait-theme', 'dark');
      }
    });
  }


  // -------------------------------------------------------------------
  // 4. HERO DIGITAL CASE FILE CLAUSE SCANNER & HIGHLIGHT ROTATOR
  // -------------------------------------------------------------------
  const highlightClause = document.getElementById('hero-highlight-clause');
  if (highlightClause) {
    const clauseHighlights = [
      {
        authority: 'State Tech Corporation v. Apex Logistics (2024 SC 402)',
        detail: 'Affirming limitation of liability in enterprise software SLAs.',
        relevance: 'HIGH RELEVANCE'
      },
      {
        authority: 'Commercial Arbitration Board Rule 14.8 (2025 Revision)',
        detail: 'Mandatory 30-day pre-arbitration mediation protocol.',
        relevance: 'STATUTORY COMPLIANCE'
      },
      {
        authority: 'Global Data Governance Act (Section 9.2)',
        detail: 'Cross-border data processing consent requirement.',
        relevance: 'HIGH SEVERITY'
      }
    ];

    let currentClauseIdx = 0;
    setInterval(() => {
      currentClauseIdx = (currentClauseIdx + 1) % clauseHighlights.length;
      const item = clauseHighlights[currentClauseIdx];
      
      highlightClause.style.opacity = '0.4';
      setTimeout(() => {
        const emEl = highlightClause.querySelector('em');
        const badgeEl = highlightClause.querySelector('span.px-2');
        if (emEl) emEl.innerText = item.authority;
        if (badgeEl) badgeEl.innerText = item.relevance;
        highlightClause.style.opacity = '1';
      }, 300);

    }, 5000);
  }


  // -------------------------------------------------------------------
  // 5. GSAP SCROLL REVEALS
  // -------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('#problem > div', {
      scrollTrigger: {
        trigger: '#problem',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('#case-workflow .grid > div', {
      scrollTrigger: {
        trigger: '#case-workflow',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

});
