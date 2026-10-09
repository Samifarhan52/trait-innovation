// GSAP + ScrollTrigger Section Reveal Controller (Permanent Entrance — Never Vanish)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded; falling back to CSS reveals.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. "TRAIT ECOSYSTEM" / FLAGSHIP SOLUTIONS (#solutions)
  const solutionsSection = document.getElementById('solutions');
  if (solutionsSection) {
    const solutionsHeader = solutionsSection.querySelector('.text-center');
    if (solutionsHeader) {
      gsap.fromTo(solutionsHeader,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: solutionsHeader,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }

    const solutionCards = solutionsSection.querySelectorAll('.glass-panel');
    solutionCards.forEach((card) => {
      card.style.willChange = 'transform, opacity';
      gsap.fromTo(card,
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }

  // 3. "WHY CHOOSE TRAIT" (#why-us)
  const whyUsSection = document.getElementById('why-us');
  if (whyUsSection) {
    const whyUsHeader = whyUsSection.querySelector('.text-center');
    if (whyUsHeader) {
      gsap.fromTo(whyUsHeader,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: whyUsHeader,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }

    const whyUsPillars = whyUsSection.querySelectorAll('.glass-panel');
    whyUsPillars.forEach((pillar) => {
      pillar.style.willChange = 'transform, opacity';
      gsap.fromTo(pillar,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillar,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }

  // 4. "FREQUENTLY ASKED QUESTIONS" (#faq)
  const faqSection = document.getElementById('faq');
  if (faqSection) {
    const faqHeader = faqSection.querySelector('.text-center');
    if (faqHeader) {
      gsap.fromTo(faqHeader,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: faqHeader,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }

    const faqItems = faqSection.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      item.style.willChange = 'transform, opacity';
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }

  // 5. CONTACT SECTION (#contact)
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const contactCols = contactSection.querySelectorAll('.lg\\:col-span-4, .lg\\:col-span-5, .lg\\:col-span-3');
    contactCols.forEach((col) => {
      col.style.willChange = 'transform, opacity';
      gsap.fromTo(col,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: col,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }
});
