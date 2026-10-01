/**
 * TRAIT INNOVATION — AI CUSTOMER SUPPORT AGENT
 * WebGL 3D Background System, Scroll-Spy Navigation Controller,
 * Alternating Ticker Marquee Touch Pause, and 3D Card Micro-Interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. THREE.JS VOLUMETRIC 3D BACKGROUND ENGINE (PETROL / CYAN / CORAL)
  // =========================================================================
  const bgContainer = document.getElementById('support-3d-bg-canvas');
  if (bgContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bgContainer.appendChild(renderer.domElement);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x061E29, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00F0FF, 3, 100);
    cyanLight.position.set(25, 25, 20);
    scene.add(cyanLight);

    const coralLight = new THREE.PointLight(0xFF6B4A, 2, 100);
    coralLight.position.set(-25, -25, 20);
    scene.add(coralLight);

    // Floating Geometric Particles Group
    const group3D = new THREE.Group();
    scene.add(group3D);

    const particleCount = 120;
    const geometry = new THREE.IcosahedronGeometry(0.6, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6
    });

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 80;
      mesh.position.y = (Math.random() - 0.5) * 80;
      mesh.position.z = (Math.random() - 0.5) * 40;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      const scale = Math.random() * 0.8 + 0.3;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        speedY: (Math.random() * 0.02 + 0.005),
        rotSpeed: (Math.random() * 0.01 + 0.002)
      };

      group3D.add(mesh);
      particles.push(mesh);
    }

    // Animation Loop
    function animate3D() {
      requestAnimationFrame(animate3D);

      particles.forEach(p => {
        p.position.y += p.userData.speedY;
        p.rotation.x += p.userData.rotSpeed;
        p.rotation.y += p.userData.rotSpeed;

        if (p.position.y > 40) {
          p.position.y = -40;
        }
      });

      group3D.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate3D();

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  // =========================================================================
  // 2. SCROLL-SPY ACTIVE NAVIGATION CONTROLLER (LEFT SERVICE SIDEBAR)
  // =========================================================================
  const sideNavLinks = document.querySelectorAll('.support-side-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateScrollSpy() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    sideNavLinks.forEach(link => {
      const linkSection = link.getAttribute('data-section');
      const activePill = link.querySelector('.support-nav-active-pill');

      if (linkSection === currentSectionId) {
        link.classList.add('bg-cyan-400/15', 'text-cyan-400');
        if (activePill) activePill.classList.remove('opacity-0');
      } else {
        link.classList.remove('bg-cyan-400/15', 'text-cyan-400');
        if (activePill) activePill.classList.add('opacity-0');
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy);
  updateScrollSpy();


  // =========================================================================
  // 3. MARQUEE TICKER TOUCH PAUSE CONTROLLER (MOBILE / TOUCH DEVICES)
  // =========================================================================
  const marqueeTracks = document.querySelectorAll('.animate-marquee-ltr, .animate-marquee-rtl');
  marqueeTracks.forEach(track => {
    track.addEventListener('touchstart', () => {
      track.classList.add('touch-paused');
    }, { passive: true });

    track.addEventListener('touchend', () => {
      track.classList.remove('touch-paused');
    }, { passive: true });

    track.addEventListener('touchcancel', () => {
      track.classList.remove('touch-paused');
    }, { passive: true });
  });


  // =========================================================================
  // 4. 3D PERSPECTIVE TILT ON HOVER FOR FEATURE CARDS
  // =========================================================================
  const tiltCards = document.querySelectorAll('.support-glass-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

});
