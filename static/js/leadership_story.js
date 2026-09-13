// GSAP + ScrollTrigger Leadership & Solutions Section Reveal Controller
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded; falling back to standard CSS reveals.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.getElementById('leadership');
  if (!section) return;

  const timelineContainer = section.querySelector('.relative.flex.flex-col');
  const lineProgress = document.getElementById('leadership-timeline-progress');

  // 1. CENTRAL LASER BEAM TIMELINE PROGRESS (Scroll-driven top-to-bottom laser fill)
  if (timelineContainer && lineProgress) {
    gsap.fromTo(lineProgress,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 0.15, // Crisp, ultra-responsive scroll beam tracking
          fastScrollEnd: true
        }
      }
    );
  }

  // 2. NETFLIX-GRADE LEADER CARDS RE-TRIGGERING SCROLL REVEAL (Plays EVERY time scrolling up or down)
  const leaderItems = [
    { card: document.getElementById('leader-card-01'), dot: document.getElementById('leader-dot-01'), num: document.getElementById('leader-num-01') },
    { card: document.getElementById('leader-card-02'), dot: document.getElementById('leader-dot-02'), num: document.getElementById('leader-num-02') },
    { card: document.getElementById('leader-card-03'), dot: document.getElementById('leader-dot-03'), num: document.getElementById('leader-num-03') }
  ];

  leaderItems.forEach((item, idx) => {
    if (!item.card) return;

    // Enable GPU hardware acceleration
    item.card.style.willChange = 'transform, opacity';

    // toggleActions: 'restart reverse restart reverse'
    // Re-triggers and plays entrance reveal EVERY SINGLE TIME scrolling up or down into viewport!
    gsap.fromTo(item.card,
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item.card,
          start: 'top 85%',
          toggleActions: 'restart reverse restart reverse',
          onEnter: () => {
            if (item.dot) {
              gsap.to(item.dot, {
                backgroundColor: '#00F0FF',
                boxShadow: '0 0 30px #00F0FF, 0 0 12px #00F0FF, inset 0 0 8px #ffffff',
                scale: 1.4,
                duration: 0.35,
                ease: 'back.out(2)'
              });
            }
            if (item.num) {
              gsap.to(item.num, {
                color: '#00F0FF',
                fontWeight: '800',
                textShadow: '0 0 20px rgba(0, 240, 255, 0.6)',
                duration: 0.35
              });
            }
          },
          onLeaveBack: () => {
            if (item.dot) {
              gsap.to(item.dot, {
                backgroundColor: '#64748B',
                boxShadow: 'none',
                scale: 1,
                duration: 0.35
              });
            }
            if (item.num) {
              gsap.to(item.num, {
                color: '#64748B',
                fontWeight: '300',
                textShadow: 'none',
                duration: 0.35
              });
            }
          }
        }
      }
    );

    // Staggered tag pills entrance inside each leader card
    const tags = item.card.querySelectorAll('.leader-tag-item');
    if (tags.length > 0) {
      gsap.fromTo(tags,
        { opacity: 0, y: 12, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.07,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: item.card,
            start: 'top 80%',
            toggleActions: 'restart reverse restart reverse'
          }
        }
      );
    }
  });

  // 3. LEADERSHIP HEADER RE-TRIGGERING SCROLL REVEAL
  const headerElem = section.querySelector('.text-center') || section.querySelector('.flex.flex-col.md\\:flex-row');
  if (headerElem) {
    gsap.fromTo(headerElem,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerElem,
          start: 'top 88%',
          toggleActions: 'restart reverse restart reverse'
        }
      }
    );
  }

  // 4. "WHAT TRAIT BUILDS" (FLAGSHIP SOLUTIONS) — INDIVIDUAL CARD BIDIRECTIONAL RE-TRIGGERING
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
            toggleActions: 'restart reverse restart reverse'
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
            trigger: card, // Individual trigger per card!
            start: 'top 85%',
            toggleActions: 'restart reverse restart reverse'
          }
        }
      );
    });
  }

  // 5. "WHY CHOOSE TRAIT" — INDIVIDUAL PILLAR BIDIRECTIONAL RE-TRIGGERING
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
            toggleActions: 'restart reverse restart reverse'
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
            trigger: pillar, // Individual trigger per pillar!
            start: 'top 85%',
            toggleActions: 'restart reverse restart reverse'
          }
        }
      );
    });
  }

  // 6. "FREQUENTLY ASKED QUESTIONS" — INDIVIDUAL FAQ ITEM BIDIRECTIONAL RE-TRIGGERING
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
            toggleActions: 'restart reverse restart reverse'
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
            trigger: item, // Individual trigger per FAQ item!
            start: 'top 88%',
            toggleActions: 'restart reverse restart reverse'
          }
        }
      );
    });
  }

  // 7. "LET'S BUILD WHAT'S NEXT" / CONTACT SECTION — BIDIRECTIONAL RE-TRIGGERING
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
            trigger: col, // Individual trigger per column!
            start: 'top 85%',
            toggleActions: 'restart reverse restart reverse'
          }
        }
      );
    });
  }
});
