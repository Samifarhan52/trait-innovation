/**
 * ADVOCATEPRO AI — Standalone Product Page Application Logic
 * Interactive 3D Canvas, GSAP Scroll Animations, Query Simulator, & Modal Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------
  // 1. THREE.JS WARM AMBER AMBIENT PARTICLES & LIGHTING CANVAS
  // -------------------------------------------------------------------
  const container = document.getElementById('advocatepro-canvas-container');
  if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Warm Amber & Golden Sparks Particle System
    const particleCount = window.innerWidth < 768 ? 60 : 160;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const amberColor = new THREE.Color(0xF59E0B);
    const copperColor = new THREE.Color(0xEA580C);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixColor = Math.random() > 0.5 ? amberColor : copperColor;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;
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
  // 2. GSAP HERO REVEAL ANIMATIONS
  // -------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    gsap.from('#hero-left-box', {
      duration: 1.2,
      y: 40,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('#hero-right-visual', {
      duration: 1.4,
      scale: 0.94,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.4
    });
  }

  // -------------------------------------------------------------------
  // 3. HERO TYPING PROMPT SIMULATOR
  // -------------------------------------------------------------------
  const typingPromptEl = document.getElementById('hero-typing-prompt');
  const prompts = [
    "Analyze breach of contract precedent in corporate dispute...",
    "Extract key liability clauses from commercial NDA filing...",
    "Summarize Supreme Court judgments on arbitration jurisdiction...",
    "Generate initial compliance outline for data privacy regulations..."
  ];
  let promptIdx = 0;

  if (typingPromptEl) {
    setInterval(() => {
      promptIdx = (promptIdx + 1) % prompts.length;
      typingPromptEl.style.opacity = '0';
      setTimeout(() => {
        typingPromptEl.textContent = prompts[promptIdx];
        typingPromptEl.style.opacity = '1';
      }, 300);
    }, 4000);
  }

  // -------------------------------------------------------------------
  // 4. INTERACTIVE PRODUCT DEMO QUERY RUNNER
  // -------------------------------------------------------------------
  window.runQuery = function(type) {
    const outputContent = document.getElementById('demo-output-content');
    if (!outputContent) return;

    outputContent.innerHTML = '<span class="text-amber-400 font-mono">⚡ AdvocatePro AI Processing Query...</span>';

    setTimeout(() => {
      if (type === 'contract') {
        outputContent.innerHTML = `
          <div class="space-y-2">
            <div class="text-amber-400 font-bold">▶ Clause Summary & Risk Analysis: Section 14 (Indemnity)</div>
            <p><span class="text-slate-400">[Extracted Text]:</span> "Party A agrees to indemnify Party B against claims arising from gross negligence..."</p>
            <div class="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-[11px] text-amber-200">
              💡 <span class="font-bold">AI Insight:</span> Indemnity cap is uncapped under Section 14.2. Recommend inserting a monetary ceiling matching annual contract value.
            </div>
            <div class="text-[10px] text-slate-500">Human Verification Checkbox: [✔ Verified by Lead Counsel]</div>
          </div>
        `;
      } else if (type === 'precedent') {
        outputContent.innerHTML = `
          <div class="space-y-2">
            <div class="text-amber-400 font-bold">▶ Precedent Search: Arbitration Clause Enforcement</div>
            <p><span class="text-slate-400">[Matching Landmark Precedents]:</span> 3 Relevant Authorities Found.</p>
            <ul class="list-disc pl-4 space-y-1 text-slate-300">
              <li><span class="text-amber-300 font-bold">State Corp v. Apex Infra (2023):</span> Affirmed binding nature of emergency arbitrator awards.</li>
              <li><span class="text-amber-300 font-bold">Globe Tech v. Union Enterprise (2021):</span> Clarified scope of section 9 interim measures.</li>
            </ul>
            <div class="text-[10px] text-slate-500 pt-1">Human Verification Checkbox: [✔ Reviewed for Case Citation Validity]</div>
          </div>
        `;
      } else if (type === 'compliance') {
        outputContent.innerHTML = `
          <div class="space-y-2">
            <div class="text-amber-400 font-bold">▶ Compliance & Regulatory Checklist</div>
            <p><span class="text-slate-400">[Statutory Review]:</span> Data Privacy & Corporate Governance Audit.</p>
            <div class="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div class="p-2 rounded bg-slate-900 border border-slate-800">✔ Board Resolution Verification</div>
              <div class="p-2 rounded bg-slate-900 border border-slate-800">✔ Data Protection Officer Filing</div>
              <div class="p-2 rounded bg-slate-900 border border-slate-800">✔ Cross-Border Transfer Assessment</div>
              <div class="p-2 rounded bg-slate-900 border border-slate-800">✔ Annual Audit Submission</div>
            </div>
            <div class="text-[10px] text-slate-500 pt-1">Human Verification Checkbox: [✔ Final Sign-off Pending Corporate Officer]</div>
          </div>
        `;
      }
    }, 400);
  };

  // -------------------------------------------------------------------
  // 5. FEATURE CARD SELECTION CONTROLLER
  // -------------------------------------------------------------------
  window.selectFeature = function(featKey) {
    document.querySelectorAll('.feat-interactive-card').forEach(card => {
      card.classList.remove('border-amber-500', 'shadow-amber-500/30', 'scale-[1.02]');
    });
    const target = document.getElementById(`feat-card-${featKey}`);
    if (target) {
      target.classList.add('border-amber-500', 'shadow-amber-500/30', 'scale-[1.02]');
    }
  };

  // -------------------------------------------------------------------
  // 6. FAQ ACCORDION CONTROLLER
  // -------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-adv-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-adv-btn');
    const ans = item.querySelector('.faq-adv-ans');
    if (btn && ans) {
      btn.addEventListener('click', () => {
        const isHidden = ans.classList.contains('hidden');
        document.querySelectorAll('.faq-adv-ans').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-adv-btn span:last-child').forEach(s => s.textContent = '+');
        if (isHidden) {
          ans.classList.remove('hidden');
          btn.querySelector('span:last-child').textContent = '−';
        }
      });
    }
  });

  // -------------------------------------------------------------------
  // 7. DEMO MODAL CONTROLLERS & SUBMISSION
  // -------------------------------------------------------------------
  window.openDemoModal = function() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
    }
  };

  window.closeDemoModal = function() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
      modal.classList.add('opacity-0', 'pointer-events-none');
    }
  };

  window.toggleMobileAdvMenu = function() {
    const menu = document.getElementById('mobile-adv-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  const mobileBtn = document.getElementById('mobile-adv-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', window.toggleMobileAdvMenu);
  }

  window.scrollToExperience = function() {
    const sec = document.getElementById('demo-showcase');
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('demo-status');
      const name = document.getElementById('demo-name').value;
      const email = document.getElementById('demo-email').value;

      status.textContent = `Thank you, ${name}! Your AdvocatePro AI demo request has been received. Our team will contact you at ${email} shortly.`;
      status.className = 'text-xs font-mono text-amber-400 text-center pt-2 block';
      demoForm.reset();
      setTimeout(window.closeDemoModal, 3000);
    });
  }

})();
