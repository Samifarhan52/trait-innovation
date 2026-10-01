import os, re

# Update service_nav.js first
service_nav_js = """/**
 * TRAIT Innovation — Master Service-Page Secondary Navigation Script
 * Handles Hover Expansion, Smooth Scrolling, Scroll-Spy Active Highlighting, and Mobile/Desktop Toggles
 * Works seamlessly across ALL 9 TRAIT service pages!
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Find all service side navigation containers
  const sideNavs = document.querySelectorAll('aside, .service-side-nav, [id$="-service-nav"]');
  if (sideNavs.length === 0) return;

  sideNavs.forEach(aside => {
    // Locate container inner div
    const container = aside.querySelector('div[id$="-nav-container"]') || 
                      aside.querySelector('.service-nav-container') || 
                      aside.firstElementChild || 
                      aside;

    const triggerBtn = aside.querySelector('button[id$="-nav-trigger"]') || 
                       aside.querySelector('.service-nav-trigger') || 
                       aside.querySelector('button');

    const toggleIcon = aside.querySelector('svg[id$="-nav-toggle-icon"]') || 
                       aside.querySelector('.service-nav-icon') || 
                       aside.querySelector('button svg');

    const textElements = aside.querySelectorAll('.sidebar-text-content, span.opacity-0, div.opacity-0');
    const navLinks = aside.querySelectorAll('a[href^="#"]');

    let isExpanded = false;

    function expandNav() {
      isExpanded = true;
      if (container) {
        container.classList.remove('w-14', 'sm:w-16', 'w-16');
        container.classList.add('w-64', 'sm:w-72');
      }

      textElements.forEach(el => {
        el.classList.remove('hidden', 'opacity-0');
        el.classList.add('flex', 'opacity-100');
      });

      if (toggleIcon) {
        toggleIcon.style.transform = 'rotate(180deg)';
      }
    }

    function collapseNav() {
      isExpanded = false;
      if (container) {
        container.classList.remove('w-64', 'sm:w-72', 'w-60');
        container.classList.add('w-14', 'sm:w-16');
      }

      textElements.forEach(el => {
        if (el.classList.contains('sidebar-text-content')) {
          el.classList.remove('flex', 'opacity-100');
          el.classList.add('hidden', 'opacity-0');
        } else {
          el.classList.remove('opacity-100');
          el.classList.add('opacity-0');
        }
      });

      if (toggleIcon) {
        toggleIcon.style.transform = 'rotate(0deg)';
      }
    }

    // Toggle button click
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isExpanded) {
          collapseNav();
        } else {
          expandNav();
        }
      });
    }

    // Desktop hover expand & minimize on mouseleave
    aside.addEventListener('mouseenter', () => {
      expandNav();
    });

    aside.addEventListener('mouseleave', () => {
      collapseNav();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!aside.contains(e.target) && isExpanded) {
        collapseNav();
      }
    });

    // Smooth scroll & active state on link click
    const sectionsMap = [];
    navLinks.forEach(link => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#') && hash.length > 1) {
        const targetId = hash.replace('#', '');
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
          sectionsMap.push({ link, section: targetSec, id: targetId });
        }

        link.addEventListener('click', (e) => {
          e.preventDefault();
          collapseNav();
          const target = document.getElementById(targetId);
          if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      }
    });

    // Scroll-Spy observer for active link indicator
    if (sectionsMap.length > 0) {
      const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            navLinks.forEach(link => {
              const linkHash = (link.getAttribute('href') || '').replace('#', '');
              const activePill = link.querySelector('.nav-active-pill, .support-nav-active-pill');
              if (linkHash === activeId) {
                link.classList.add('bg-white/10');
                if (activePill) activePill.classList.remove('opacity-0');
              } else {
                link.classList.remove('bg-white/10');
                if (activePill) activePill.classList.add('opacity-0');
              }
            });
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '-10% 0px -40% 0px'
      });

      sectionsMap.forEach(item => spyObserver.observe(item.section));
    }
  });
});
"""

with open('static/js/service_nav.js', 'w', encoding='utf-8') as f:
    f.write(service_nav_js)

print("Updated service_nav.js successfully.")
