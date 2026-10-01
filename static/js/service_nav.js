/**
 * TRAIT Innovation — Service-Page Secondary Navigation Script
 * Handles Smooth Scrolling, Scroll-Spy Active Section Highlighting, and Responsive Side-Nav Toggles
 */

document.addEventListener('DOMContentLoaded', () => {

  // Find any service side navigation container
  const sideNavs = document.querySelectorAll('aside, .service-side-nav, #advocate-service-nav');
  if (sideNavs.length === 0) return;

  sideNavs.forEach(aside => {
    const navLinks = aside.querySelectorAll('a[href^="#"]');
    const container = aside.querySelector('#advocate-nav-container') || aside;
    const triggerBtn = aside.querySelector('#advocate-nav-trigger') || aside.querySelector('button');
    const toggleIcon = aside.querySelector('#advocate-nav-toggle-icon');
    const textElements = aside.querySelectorAll('.sidebar-text-content');

    let isExpanded = false;

    // Toggle Expand / Collapse
    function setNavExpanded(expanded) {
      isExpanded = expanded;
      if (expanded) {
        container.classList.remove('w-14', 'sm:w-16');
        container.classList.add('w-56', 'sm:w-64');
        textElements.forEach(el => {
          el.classList.remove('hidden');
          el.classList.add('flex');
        });
        if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
      } else {
        container.classList.remove('w-56', 'sm:w-64');
        container.classList.add('w-14', 'sm:w-16');
        textElements.forEach(el => {
          el.classList.remove('flex');
          el.classList.add('hidden');
        });
        if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
      }
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setNavExpanded(!isExpanded);
      });
    }

    // Hover expand behavior on desktop
    aside.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024 && !isExpanded) {
        setNavExpanded(true);
      }
    });

    aside.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024 && isExpanded) {
        setNavExpanded(false);
      }
    });

    // Collect target sections for Scroll-Spy
    const sectionsMap = [];
    navLinks.forEach(link => {
      const targetId = link.getAttribute('href').replace('#', '');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        sectionsMap.push({
          link: link,
          section: targetSec
        });
      }

      // Smooth scroll on click
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (hash && hash.startsWith('#') && hash.length > 1) {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Scroll-Spy active section observer
    if (sectionsMap.length > 0) {
      const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            navLinks.forEach(link => {
              const linkHash = link.getAttribute('href').replace('#', '');
              const activePill = link.querySelector('.nav-active-pill');
              if (linkHash === activeId) {
                link.classList.add('bg-white/10', 'text-cyan-400');
                if (activePill) activePill.classList.remove('opacity-0');
              } else {
                link.classList.remove('bg-white/10', 'text-cyan-400');
                if (activePill) activePill.classList.add('opacity-0');
              }
            });
          }
        });
      }, {
        threshold: 0.25,
        rootMargin: '-10% 0px -40% 0px'
      });

      sectionsMap.forEach(item => spyObserver.observe(item.section));
    }
  });

});
