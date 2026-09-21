/**
 * TRAIT INNOVATION — AI CUSTOMER SUPPORT AGENT
 * WebGL 3D Intelligence Core, Customer Support Constellation,
 * Dynamic Particle Fields, Interactive Knowledge Network & Motion Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------
  // 0. HIGH-VISIBILITY VOLUMETRIC THREE.JS 3D BACKGROUND WORLD (FULL WEBSITE)
  // -------------------------------------------------------------------
  const bgCanvasContainer = document.getElementById('global-3d-bg-canvas');
  if (bgCanvasContainer && typeof THREE !== 'undefined') {
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    bgCamera.position.z = 26;

    const bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bgCanvasContainer.appendChild(bgRenderer.domElement);

    // Dynamic Lighting System for Volumetric 3D Shimmer
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    bgScene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3, 120);
    cyanPointLight.position.set(20, 20, 20);
    bgScene.add(cyanPointLight);

    const amberPointLight = new THREE.PointLight(0xf59e0b, 2.5, 120);
    amberPointLight.position.set(-20, -100, 20);
    bgScene.add(amberPointLight);

    const group3D = new THREE.Group();
    bgScene.add(group3D);

    // 1. HERO ZONE 3D MODEL: Nested Glowing AI Rings (Y = 8)
    const heroRing1Geo = new THREE.TorusGeometry(6, 0.12, 16, 100);
    const heroRing1Mat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.1, wireframe: true });
    const heroRing1 = new THREE.Mesh(heroRing1Geo, heroRing1Mat);
    heroRing1.position.set(16, 8, -6);
    heroRing1.rotation.x = Math.PI / 3;
    group3D.add(heroRing1);

    const heroRing2Geo = new THREE.TorusGeometry(7.5, 0.08, 16, 100);
    const heroRing2Mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.2, wireframe: true });
    const heroRing2 = new THREE.Mesh(heroRing2Geo, heroRing2Mat);
    heroRing2.position.set(16, 8, -6);
    heroRing2.rotation.y = Math.PI / 4;
    group3D.add(heroRing2);

    // 2. SIGNALS / ENGINE ZONE 3D MODEL: Floating Metallic TorusKnot (Y = -28)
    const knotGeo = new THREE.TorusKnotGeometry(4.8, 1.2, 128, 32);
    const knotMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.85, roughness: 0.15, wireframe: true });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(-18, -28, -8);
    group3D.add(knotMesh);

    // 3. CAPABILITIES BENTO ZONE 3D MODEL: Spinning Wireframe Icosahedron (Y = -65)
    const icoGeo = new THREE.IcosahedronGeometry(7, 2);
    const icoMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1, wireframe: true });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(18, -65, -8);
    group3D.add(icoMesh);

    // 4. KNOWLEDGE NETWORK ZONE 3D MODEL: Molecular Mesh Lattice (Y = -105)
    const latticeGeo = new THREE.DodecahedronGeometry(6.5, 1);
    const latticeMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.7, roughness: 0.3, wireframe: true });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    latticeMesh.position.set(-16, -105, -7);
    group3D.add(latticeMesh);

    // 5. HUMAN ESCALATION ZONE 3D MODEL: Warm Amber Crystal Octahedron (Y = -145)
    const octGeo = new THREE.OctahedronGeometry(6, 1);
    const octMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1, wireframe: true });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(16, -145, -7);
    group3D.add(octMesh);

    // 6. ECOSYSTEM & PRICING ZONE 3D MODEL: Orbital Ring & Cyber Cube (Y = -185)
    const ecoRingGeo = new THREE.TorusGeometry(8.5, 0.15, 16, 100);
    const ecoRingMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.1, wireframe: true });
    const ecoRingMesh = new THREE.Mesh(ecoRingGeo, ecoRingMat);
    ecoRingMesh.position.set(-15, -185, -9);
    ecoRingMesh.rotation.x = Math.PI / 4;
    group3D.add(ecoRingMesh);

    // 7. FULL-WEBSITE 3D STARFIELD PARTICLES (Spanning Y = +30 to -240)
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 90;
      starPos[i * 3 + 1] = (Math.random() * 260) - 220; // Y coordinates from -220 to +40
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 45;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeo, starMat);
    group3D.add(starField);

    // Mouse & Scroll Parallax Tracker
    let bgMouseX = 0, bgMouseY = 0;
    window.addEventListener('mousemove', (e) => {
      bgMouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
      bgMouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
    }, { passive: true });

    let bgClock = new THREE.Clock();
    function animateGlobal3D() {
      requestAnimationFrame(animateGlobal3D);
      const time = bgClock.getElapsedTime();

      // Organic rotations for all 3D models down the page
      heroRing1.rotation.z = time * 0.25;
      heroRing2.rotation.z = -time * 0.2;

      knotMesh.rotation.x = time * 0.2;
      knotMesh.rotation.y = time * 0.25;

      icoMesh.rotation.y = -time * 0.18;
      icoMesh.rotation.z = time * 0.12;

      latticeMesh.rotation.x = time * 0.15;
      latticeMesh.rotation.y = time * 0.2;

      octMesh.rotation.y = time * 0.25;
      octMesh.rotation.z = time * 0.15;

      ecoRingMesh.rotation.z = time * 0.2;

      starField.rotation.y = time * 0.015;

      // Full-site Scroll Camera Translation
      const scrollY = window.scrollY;
      bgCamera.position.y = -scrollY * 0.038;

      // Smooth mouse parallax
      bgCamera.position.x += (bgMouseX * 12 - bgCamera.position.x) * 0.05;

      bgRenderer.render(bgScene, bgCamera);
    }
    animateGlobal3D();

    window.addEventListener('resize', () => {
      bgCamera.aspect = window.innerWidth / window.innerHeight;
      bgCamera.updateProjectionMatrix();
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  // -------------------------------------------------------------------
  // REACT BITS STYLE — SPOTLIGHT CARDS & MAGNETIC BUTTONS
  // -------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll('.spotlight-card, .void-surface, .engine-state-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      btn.style.transition = 'transform 0.4s ease-out';
    });
  });


  // -------------------------------------------------------------------
  // 1. THREE.JS HERO 3D INTELLIGENCE CORE & CONSTELLATION ENGINE
  // -------------------------------------------------------------------
  const heroContainer = document.getElementById('support-hero-canvas');
  if (heroContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, heroContainer.clientWidth / heroContainer.clientHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroContainer.appendChild(renderer.domElement);

    // AI Core Sphere: Metallic/Glass Geometry with Internal Cyan Glow
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Middle Metallic Lattice Frame
    const latticeGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const latticeCore = new THREE.Mesh(latticeGeo, latticeMat);
    coreGroup.add(latticeCore);

    // Outer Glass Shell Ring
    const ringGeo = new THREE.TorusGeometry(5.8, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.6
    });
    const outerRing = new THREE.Mesh(ringGeo, ringMat);
    outerRing.rotation.x = Math.PI / 3;
    coreGroup.add(outerRing);

    // Second Secondary Ring
    const ringGeo2 = new THREE.TorusGeometry(6.4, 0.05, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.4
    });
    const outerRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    outerRing2.rotation.y = Math.PI / 4;
    coreGroup.add(outerRing2);

    // Customer Support Constellation Particles
    const particleCount = window.innerWidth < 768 ? 120 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00F0FF);
    const blue = new THREE.Color(0x3B82F6);
    const amber = new THREE.Color(0xF59E0B); // Human escalation accent

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);

      // Random color mix: mostly cyan/blue, few amber signals
      const rand = Math.random();
      const col = rand > 0.92 ? amber : (rand > 0.4 ? cyan : blue);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Circular Glow Texture
    function createCircleCanvas() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    }

    const particleMat = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: createCircleCanvas(),
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const constellation = new THREE.Points(particleGeo, particleMat);
    scene.add(constellation);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
      }, { passive: true });
    }

    // Animation Loop
    let clock = new THREE.Clock();

    function animate3D() {
      requestAnimationFrame(animate3D);
      const elapsedTime = clock.getElapsedTime();

      // Smooth organic rotation
      coreGroup.rotation.y = elapsedTime * 0.25;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15;
      outerRing.rotation.z = elapsedTime * 0.3;
      outerRing2.rotation.z = -elapsedTime * 0.25;

      constellation.rotation.y = -elapsedTime * 0.08;

      // Mouse Parallax Smooth Tilt
      coreGroup.rotation.y += (mouseX - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (mouseY - coreGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    }
    animate3D();

    window.addEventListener('resize', () => {
      if (!heroContainer) return;
      camera.aspect = heroContainer.clientWidth / heroContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    });
  }


  // -------------------------------------------------------------------
  // 2. SECTION 2 — DYNAMIC PARTICLES: "EVERY QUESTION IS DATA"
  // -------------------------------------------------------------------
  const signalCanvasContainer = document.getElementById('signal-particles-canvas');
  if (signalCanvasContainer && typeof THREE !== 'undefined') {
    const scene2 = new THREE.Scene();
    const camera2 = new THREE.PerspectiveCamera(50, signalCanvasContainer.clientWidth / signalCanvasContainer.clientHeight, 0.1, 1000);
    camera2.position.z = 20;

    const renderer2 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer2.setSize(signalCanvasContainer.clientWidth, signalCanvasContainer.clientHeight);
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    signalCanvasContainer.appendChild(renderer2.domElement);

    const count2 = 220;
    const geo2 = new THREE.BufferGeometry();
    const pos2 = new Float32Array(count2 * 3);

    for (let i = 0; i < count2; i++) {
      pos2[i * 3] = (Math.random() - 0.5) * 30;
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
    const mat2 = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.5,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles2 = new THREE.Points(geo2, mat2);
    scene2.add(particles2);

    function animateSignal() {
      requestAnimationFrame(animateSignal);
      particles2.rotation.y += 0.003;
      particles2.rotation.x += 0.001;
      renderer2.render(scene2, camera2);
    }
    animateSignal();
  }


  // -------------------------------------------------------------------
  // 3. SECTION 3 — THE SUPPORT ENGINE MACRO STATE SWITCHER
  // -------------------------------------------------------------------
  const engineTag = document.getElementById('engine-state-tag');
  const engineDesc = document.getElementById('engine-state-description');
  const enginePulseDot = document.getElementById('engine-pulse-dot');
  const engineVisualContainer = document.getElementById('engine-visual-render');

  const engineStates = {
    '01': {
      tag: 'STATE 01 — AUTOMATED ASSISTANCE ACTIVE',
      desc: 'Continuous instant resolution stream active across all time zones with sub-150ms response latency, conversational intent extraction, and strict source grounding.',
      color: '#00F0FF',
      visual: `<svg class="w-full h-32 text-cyan-400" viewBox="0 0 400 100" fill="none" stroke="currentColor"><circle cx="200" cy="50" r="30" stroke-width="2" class="animate-pulse" fill="rgba(0,240,255,0.08)"/><path d="M50 50 Q 120 10, 200 50 T 350 50" stroke-width="2" class="animate-pulse"/><circle cx="200" cy="50" r="8" fill="#00F0FF" class="animate-ping"/><text x="130" y="90" fill="#38BDF8" font-size="10" font-family="monospace">NLU: 24/7_AUTOMATED_STREAM</text></svg>`
    },
    '02': {
      tag: 'STATE 02 — TICKET AUTOMATION & ROUTING',
      desc: 'Multi-channel support request intake automatically transforms unstructured customer signals into categorized ticket payloads, priority tags, and domain-specific routes.',
      color: '#38BDF8',
      visual: `<svg class="w-full h-32 text-cyan-400" viewBox="0 0 400 100" fill="none" stroke="currentColor"><rect x="40" y="25" width="100" height="50" rx="8" stroke-width="1.5" fill="rgba(6,10,20,0.8)"/><text x="52" y="48" fill="#00F0FF" font-size="10" font-family="monospace">TICKET #88412</text><text x="52" y="64" fill="#94A3B8" font-size="9" font-family="monospace">CAT: Billing Inquiry</text><path d="M140 50 L 260 25" stroke-width="2" stroke="#00F0FF"/><path d="M140 50 L 260 75" stroke-width="2" stroke="#38BDF8"/><circle cx="270" cy="25" r="6" fill="#00F0FF"/><circle cx="270" cy="75" r="6" fill="#38BDF8"/></svg>`
    },
    '03': {
      tag: 'STATE 03 — AMBER HUMAN ESCALATION PROTOCOL',
      desc: 'When an inquiry exceeds threshold complexity rules, context dialog memory is instantly transferred to a live human specialist without forcing the customer to repeat themselves.',
      color: '#F59E0B',
      visual: `<svg class="w-full h-32 text-amber-400" viewBox="0 0 400 100" fill="none" stroke="currentColor"><circle cx="80" cy="50" r="16" stroke-width="2" stroke="#00F0FF"/><path d="M96 50 L 280 50" stroke-width="2" stroke="#F59E0B" stroke-dasharray="6 6" class="animate-pulse"/><circle cx="300" cy="50" r="22" stroke-width="2" stroke="#F59E0B" fill="rgba(245,158,11,0.2)"/><text x="240" y="88" fill="#F59E0B" font-size="10" font-family="monospace">AMBER_HANDOVER_ACTIVE</text></svg>`
    },
    '04': {
      tag: 'STATE 04 — CONTINUOUS ANALYTICS & KB LOOP',
      desc: 'Real-time telemetry groups customer queries into issue clusters, monitors CSAT sentiment ratings, and continuously highlights knowledge-base gaps for article enhancement.',
      color: '#3B82F6',
      visual: `<svg class="w-full h-32 text-cyan-400" viewBox="0 0 400 100" fill="none" stroke="currentColor"><rect x="60" y="55" width="20" height="30" fill="#00F0FF"/><rect x="100" y="35" width="20" height="50" fill="#38BDF8"/><rect x="140" y="20" width="20" height="65" fill="#00F0FF"/><rect x="180" y="10" width="20" height="75" fill="#3B82F6"/><path d="M230 50 Q 280 20, 330 50 T 380 50" stroke-width="2" stroke="#00F0FF"/><text x="250" y="85" fill="#38BDF8" font-size="10" font-family="monospace">RESOLUTION_CSAT: 99.4%</text></svg>`
    }
  };

  window.switchEngineState = function(stateId) {
    const state = engineStates[stateId];
    if (!state) return;

    document.querySelectorAll('.engine-state-card').forEach(card => {
      card.classList.remove('border-cyan-400', 'bg-cyan-950/40', 'border-amber-500/50', 'bg-amber-950/30', 'text-cyan-300', 'text-amber-300');
      card.classList.add('border-slate-800', 'text-slate-400');
    });

    const activeBtn = document.getElementById(`engine-state-btn-${stateId}`);
    if (activeBtn) {
      activeBtn.classList.remove('border-slate-800', 'text-slate-400');
      if (stateId === '03') {
        activeBtn.classList.add('border-amber-500/50', 'bg-amber-950/30', 'text-amber-300');
      } else {
        activeBtn.classList.add('border-cyan-400', 'bg-cyan-950/40', 'text-cyan-300');
      }
    }

    if (engineTag) engineTag.textContent = state.tag;
    if (engineDesc) engineDesc.textContent = state.desc;
    if (enginePulseDot) enginePulseDot.style.backgroundColor = state.color;
    if (engineVisualContainer && state.visual) {
      engineVisualContainer.innerHTML = state.visual;
    }
  };


  // -------------------------------------------------------------------
  // 4. SECTION 5 — KNOWLEDGE NETWORK NODE ACTIVATION
  // -------------------------------------------------------------------
  const knowledgeNodes = {
    'shipping': 'Shipping: Delivery estimates, carrier tracking & dispatch rules.',
    'returns': 'Returns: 30-day return policy, RMA generation & refund processing.',
    'orders': 'Orders: Order status, item modification & cancellation workflows.',
    'accounts': 'Accounts: Password resets, authentication & profile updates.',
    'policies': 'Policies: Terms of service, privacy compliance & SLA guarantees.',
    'services': 'Services: Subscription management, plan upgrades & add-ons.'
  };

  window.activateKnowledgeNode = function(nodeKey) {
    document.querySelectorAll('.knowledge-node-btn').forEach(btn => {
      btn.classList.remove('border-cyan-400', 'bg-cyan-950/70', 'shadow-[0_0_20px_rgba(0,240,255,0.4)]');
    });

    const activeBtn = document.getElementById(`node-btn-${nodeKey}`);
    if (activeBtn) {
      activeBtn.classList.add('border-cyan-400', 'bg-cyan-950/70', 'shadow-[0_0_20px_rgba(0,240,255,0.4)]');
    }

    const outputText = document.getElementById('knowledge-output-text');
    if (outputText && knowledgeNodes[nodeKey]) {
      outputText.innerHTML = `<span class="text-cyan-400 font-bold">Node [${nodeKey.toUpperCase()}] Illuminated:</span> ${knowledgeNodes[nodeKey]}`;
    }
  };


  // -------------------------------------------------------------------
  // 5. SECTION 6 — HUMAN ESCALATION SIMULATION
  // -------------------------------------------------------------------
  window.triggerEscalationFlow = function() {
    const statusText = document.getElementById('escalation-status-text');
    const humanNode = document.getElementById('human-escalation-node');
    if (!statusText || !humanNode) return;

    statusText.innerHTML = '<span class="text-cyan-400">AI Core: Escalation threshold reached...</span>';

    setTimeout(() => {
      statusText.innerHTML = '<span class="text-amber-400 font-bold">🚨 Amber Signal Activated: Transferring context to live specialist...</span>';
      humanNode.classList.add('border-amber-400', 'shadow-[0_0_30px_rgba(245,158,11,0.6)]', 'bg-amber-950/60');
    }, 600);

    setTimeout(() => {
      statusText.innerHTML = '<span class="text-amber-300 font-bold">✓ Human Specialist Connected. Full conversation history handed over.</span>';
    }, 1800);
  };


  // -------------------------------------------------------------------
  // 5.5 PRICING BILLING CYCLE TOGGLE
  // -------------------------------------------------------------------
  let isAnnualBilling = false;
  window.togglePricingCycle = function() {
    isAnnualBilling = !isAnnualBilling;
    const dot = document.getElementById('billing-toggle-dot');
    const labelMonthly = document.getElementById('billing-label-monthly');
    const labelAnnual = document.getElementById('billing-label-annual');
    const priceStarter = document.getElementById('price-starter');
    const subtextStarter = document.getElementById('subtext-starter');
    const pricePro = document.getElementById('price-pro');
    const subtextPro = document.getElementById('subtext-pro');

    if (isAnnualBilling) {
      if (dot) { dot.classList.remove('translate-x-0'); dot.classList.add('translate-x-7'); }
      if (labelMonthly) { labelMonthly.classList.remove('text-white', 'font-bold'); labelMonthly.classList.add('text-slate-400'); }
      if (labelAnnual) { labelAnnual.classList.remove('text-slate-400'); labelAnnual.classList.add('text-white', 'font-bold'); }
      if (priceStarter) priceStarter.textContent = '$399';
      if (subtextStarter) subtextStarter.textContent = 'Billed annually ($4,788/yr)';
      if (pricePro) pricePro.textContent = '$999';
      if (subtextPro) subtextPro.textContent = 'Billed annually ($11,988/yr)';
    } else {
      if (dot) { dot.classList.remove('translate-x-7'); dot.classList.add('translate-x-0'); }
      if (labelMonthly) { labelMonthly.classList.remove('text-slate-400'); labelMonthly.classList.add('text-white', 'font-bold'); }
      if (labelAnnual) { labelAnnual.classList.remove('text-white', 'font-bold'); labelAnnual.classList.add('text-slate-400'); }
      if (priceStarter) priceStarter.textContent = '$499';
      if (subtextStarter) subtextStarter.textContent = 'Billed monthly';
      if (pricePro) pricePro.textContent = '$1,299';
      if (subtextPro) subtextPro.textContent = 'Billed monthly';
    }
  };


  // -------------------------------------------------------------------
  // 6. SECTION 7 — INTERACTIVE ECOSYSTEM SIGNAL TRANSMISSION ENGINE
  // -------------------------------------------------------------------
  const ecosystemTelemetryMap = {
    'inquiries': '⚡ INQUIRIES: Ingested 4,820 live voice/chat streams into core queue.',
    'knowledge': '⚡ RAG KNOWLEDGE: Queried vector database • 14ms latency • 99.8% precision.',
    'tickets': '⚡ TICKET OPS: Auto-classified payload #88412 → Assigned SLA Tier 1.',
    'analytics': '⚡ CSAT ENGINE: Sentiment score 99.4% • Telemetry normal.',
    'feedback': '⚡ FEEDBACK SYNC: Model weights fine-tuned with 500 RLHF ratings.',
    'human': '🚨 AMBER OVERRIDE: High-priority handover initiated → Live specialist connected.'
  };

  const nodeCoords = {
    'inquiries': { x1: 200, y1: 120, cx: 320, cy: 180 },
    'knowledge': { x1: 800, y1: 120, cx: 680, cy: 180 },
    'tickets': { x1: 140, y1: 300, cx: 300, cy: 300 },
    'analytics': { x1: 860, y1: 300, cx: 700, cy: 300 },
    'feedback': { x1: 200, y1: 480, cx: 320, cy: 420 },
    'human': { x1: 800, y1: 480, cx: 680, cy: 420 }
  };

  // CONTINUOUS 6-CHANNEL AUTOMATED NETWORK CONNECTION ENGINE
  const activeStreams = {
    'inquiries': { speed: 0.008, offset: 0.0 },
    'knowledge': { speed: 0.007, offset: 0.33 },
    'tickets': { speed: 0.009, offset: 0.66 },
    'analytics': { speed: 0.0075, offset: 0.15 },
    'feedback': { speed: 0.0085, offset: 0.45 },
    'human': { speed: 0.0065, offset: 0.80 }
  };

  function animateNetworkFlow() {
    Object.keys(activeStreams).forEach(key => {
      const stream = activeStreams[key];
      const coords = nodeCoords[key];
      const packet = document.getElementById(`light-packet-${key}`);

      if (packet && coords) {
        stream.offset = (stream.offset + stream.speed) % 1;
        const t = stream.offset;
        
        // Bezier formula B(t)
        const x = Math.pow(1 - t, 2) * coords.x1 + 2 * (1 - t) * t * coords.cx + Math.pow(t, 2) * 500;
        const y = Math.pow(1 - t, 2) * coords.y1 + 2 * (1 - t) * t * coords.cy + Math.pow(t, 2) * 300;

        packet.setAttribute('cx', x);
        packet.setAttribute('cy', y);
        packet.classList.remove('opacity-0');
      }
    });
    requestAnimationFrame(animateNetworkFlow);
  }
  animateNetworkFlow();

  window.dispatchEcosystemSignal = function(nodeKey) {
    const telemetry = document.getElementById('ecosystem-telemetry-text');
    if (telemetry && ecosystemTelemetryMap[nodeKey]) {
      telemetry.innerHTML = nodeKey === 'human' 
        ? `<span class="text-amber-400 font-bold">${ecosystemTelemetryMap[nodeKey]}</span>`
        : `<span class="text-cyan-300 font-bold">${ecosystemTelemetryMap[nodeKey]}</span>`;
    }
    // Boost current stream speed briefly
    if (activeStreams[nodeKey]) {
      activeStreams[nodeKey].offset = 0.0;
    }
  };


  // CARD TILT ANIMATIONS REMOVED FOR CLEAN STABLE UI READABILITY



  // -------------------------------------------------------------------
  // 8. GSAP BIDIRECTIONAL SCROLLTRIGGER REVEALS & KINETIC TYPOGRAPHY
  // -------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.editorial-reveal');
    revealElements.forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.9,
        y: 35,
        opacity: 0,
        ease: 'power3.out'
      });
    });
  }


  // -------------------------------------------------------------------
  // 9. EXPLORATION REQUEST MODAL & FORM CONTROLS
  // -------------------------------------------------------------------
  window.openExploreModal = function() {
    const modal = document.getElementById('explore-modal');
    if (modal) modal.classList.remove('hidden');
  };

  window.closeExploreModal = function() {
    const modal = document.getElementById('explore-modal');
    if (modal) modal.classList.add('hidden');
  };

  const modalForm = document.getElementById('explore-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = document.getElementById('explore-form');
      const success = document.getElementById('form-success-msg');
      if (form && success) {
        form.classList.add('hidden');
        success.classList.remove('hidden');
      }
    });
  }
});

