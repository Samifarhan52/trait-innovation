/**
 * ADVOCATEPRO AI — Flagship Motion, Typewriter Rotator & Interactive Engine
 * Features: Three.js 3D WebGL ambient dust particles, Typewriter words rotator,
 * Multi-layer mouse parallax, GSAP ScrollTrigger reveals, and Form submission handlers.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------
  // 1. TYPEWRITER / CHANGING WORDS ROTATOR IN HERO
  // -------------------------------------------------------------------
  const changingWordEl = document.getElementById('changing-word-text');
  if (changingWordEl) {
    const words = [
      'Automating Legal Research',
      'Accelerating Document Drafting',
      'Extracting Contract Insights',
      'Organizing Case Chronologies',
      'Streamlining Legal Workflows'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeLoop() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        changingWordEl.innerText = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        changingWordEl.innerText = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2200; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }


  // -------------------------------------------------------------------
  // 2. THREE.JS 3D AMBIENT SILK LIGHT & ROUND GLOWING ORBS (NO SQUARES)
  // -------------------------------------------------------------------
  const container = document.getElementById('advocatepro-canvas-container');
  if (container && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create a 100% smooth circular radial glow texture (NO SQUARES / NO BOXES)
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    }

    const circleTexture = createCircleTexture();

    const particleCount = window.innerWidth < 768 ? 25 : 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00F0FF);
    const goldColor = new THREE.Color(0xD4AF37);
    const blueColor = new THREE.Color(0x3B82F6);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 85;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 85;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const rand = Math.random();
      const mixColor = rand > 0.6 ? cyanColor : (rand > 0.3 ? goldColor : blueColor);
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      map: circleTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0002;
      particles.rotation.x += 0.0001;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  // -------------------------------------------------------------------
  // 3. FLUID MOUSE PARALLAX TILT ON HERO VISUAL (THROTTLED WITH RAF)
  // -------------------------------------------------------------------
  const heroFluid = document.getElementById('hero-fluid-visual');
  if (heroFluid) {
    let ticking = false;
    window.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
          const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
          heroFluid.style.transform = `rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // -------------------------------------------------------------------
  // 4. GSAP SCROLL TRIGGER REVEALS — BIDIRECTIONAL SCROLL ENGINE
  // -------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Section 2: Key Features & Capabilities — Outer cards stay static in place
    const commandCardsList = document.querySelectorAll('.command-grid-card');
    commandCardsList.forEach(card => {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.transform = 'none';
    });

    // Inner capability sub-cards — Bidirectional ScrollTrigger entry animation
    const capItems = document.querySelectorAll('.capability-item');
    capItems.forEach(item => {
      item.style.opacity = '1';
      item.style.visibility = 'visible';
    });

    gsap.from(capItems, {
      scrollTrigger: {
        trigger: '#capabilities',
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play reverse play reverse'
      },
      duration: 0.55,
      y: 18,
      opacity: 0,
      stagger: 0.04,
      ease: 'power2.out'
    });

    // Section 3: Why Choose TRAIT? — Bidirectional left (-90px) & right (90px) reveals
    const whyTraitLeft = document.getElementById('why-trait-left');
    const whyTraitRight = document.getElementById('why-trait-right');

    if (whyTraitLeft) {
      whyTraitLeft.style.opacity = '1';
      whyTraitLeft.style.visibility = 'visible';
      gsap.from(whyTraitLeft, {
        scrollTrigger: {
          trigger: '#why-trait',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.75,
        x: -90,
        opacity: 0,
        ease: 'power2.out'
      });
    }

    if (whyTraitRight) {
      whyTraitRight.style.opacity = '1';
      whyTraitRight.style.visibility = 'visible';
      gsap.from(whyTraitRight, {
        scrollTrigger: {
          trigger: '#why-trait',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.75,
        x: 90,
        opacity: 0,
        ease: 'power2.out'
      });
    }

    // Section 4: AdvocatePro AI Pro CTA — Bidirectional left (-90px) & right (90px) reveals
    const ctaLeft = document.getElementById('cta-left');
    const ctaRight = document.getElementById('cta-right');

    if (ctaLeft) {
      ctaLeft.style.opacity = '1';
      ctaLeft.style.visibility = 'visible';
      gsap.from(ctaLeft, {
        scrollTrigger: {
          trigger: '#cta',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.75,
        x: -90,
        opacity: 0,
        ease: 'power2.out'
      });
    }

    if (ctaRight) {
      ctaRight.style.opacity = '1';
      ctaRight.style.visibility = 'visible';
      gsap.from(ctaRight, {
        scrollTrigger: {
          trigger: '#cta',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.75,
        x: 90,
        opacity: 0,
        ease: 'power2.out'
      });
    }
  }


  // -------------------------------------------------------------------
  // 5. LEGAL INTELLIGENCE COMMAND GRID — CAPABILITY CONSTELLATION ENGINE
  // -------------------------------------------------------------------
  // A. MAGNETIC HOVER (Subtle 3D Depth tilt on cards - Throttled with RAF)
  const commandCards = document.querySelectorAll('.command-grid-card');
  commandCards.forEach(card => {
    let cardTicking = false;
    card.addEventListener('mousemove', (e) => {
      if (!cardTicking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          card.style.transform = `perspective(1000px) rotateX(${-y * 0.03}deg) rotateY(${x * 0.03}deg) translateZ(6px)`;
          cardTicking = false;
        });
        cardTicking = true;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // B. SCROLL MORPH & PARALLAX
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Scroll Morph: Document Intelligence Card subtly expands & glows as user scrolls
    const morphCard = document.getElementById('document-intelligence-card');
    if (morphCard) {
      gsap.to(morphCard, {
        scrollTrigger: {
          trigger: '#capabilities',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1
        },
        scale: 1.025,
        borderColor: 'rgba(212, 175, 55, 0.65)',
        boxShadow: '0 25px 65px -10px rgba(212, 175, 55, 0.25)'
      });
    }

    // Depth Shift Parallax on Living Legal Archive Background
    const archiveBg = document.getElementById('living-archive-texture');
    if (archiveBg) {
      gsap.to(archiveBg, {
        scrollTrigger: {
          trigger: '#capabilities',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -40,
        ease: 'none'
      });
    }
  }
});


// -------------------------------------------------------------------
// 6. EXPLORE MODAL, MOBILE NAVBAR & SECTION FORM CONTROLS
// -------------------------------------------------------------------
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function openExploreModal() {
  const modal = document.getElementById('explore-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeExploreModal() {
  const modal = document.getElementById('explore-modal');
  if (modal) modal.classList.add('hidden');
}

function handleExploreSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('explore-form');
  const success = document.getElementById('form-success-msg');
  if (form && success) {
    form.classList.add('hidden');
    success.classList.remove('hidden');
  }
}

function handleSectionFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('section-cta-form');
  const success = document.getElementById('section-form-success');
  if (form && success) {
    form.classList.add('hidden');
    success.classList.remove('hidden');
  }
}
