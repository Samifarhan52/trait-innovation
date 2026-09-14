/**
 * AI CUSTOMER SUPPORT AGENT — Standalone Product Page Application Logic
 * Interactive Three.js Cyber Particles, Light/Dark Theme Switcher, GSAP Animations, & Demo Runners
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------
  // 1. LIGHT / DARK THEME TOGGLE
  // -------------------------------------------------------------------
  const themeBtn = document.getElementById('theme-toggle-btn');
  const htmlEl = document.documentElement;
  const body = document.body;

  function applySupportTheme(isDark) {
    if (isDark) {
      htmlEl.classList.add('dark');
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      htmlEl.classList.remove('dark');
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }

  const savedTheme = localStorage.getItem('ai_support_theme') || 'dark';
  applySupportTheme(savedTheme === 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = !htmlEl.classList.contains('dark');
      applySupportTheme(isDark);
      localStorage.setItem('ai_support_theme', isDark ? 'dark' : 'light');
    });
  }

  // -------------------------------------------------------------------
  // 2. THREE.JS CYBER PARTICLES & ATMOSPHERE CANVAS
  // -------------------------------------------------------------------
  const container = document.getElementById('ai-support-canvas-container');
  if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = window.innerWidth < 768 ? 60 : 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00F0FF);
    const purpleColor = new THREE.Color(0x8B5CF6);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixColor = Math.random() > 0.5 ? cyanColor : purpleColor;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0007;
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
  // 3. GSAP HERO REVEAL ANIMATIONS
  // -------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    gsap.from('#hero-support-left', {
      duration: 1.2,
      y: 40,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('#hero-support-right', {
      duration: 1.4,
      scale: 0.94,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.4
    });
  }

  // -------------------------------------------------------------------
  // 4. INTERACTIVE FEATURE TAB EXPLORER
  // -------------------------------------------------------------------
  const tabsData = {
    faqs: {
      title: "Answer FAQs Instantly",
      desc: "Provide accurate, consistent answers to common questions across all channels.",
      bullets: [
        "✔ Understands natural language",
        "✔ Learns from your knowledge base",
        "✔ Provides instant, accurate answers"
      ],
      chatUser: "What is your return policy?",
      chatAi: "You can return any product within 30 days of delivery. The item should be unused and in original packaging.",
      chatHighlight: "Would you like me to initiate a return for you?",
      chips: ["Yes, initiate return", "Talk to a human"]
    },
    tickets: {
      title: "Manage & Categorize Tickets",
      desc: "Automatically group, tag, and assign incoming support requests to the right department.",
      bullets: [
        "✔ Automatic priority tagging",
        "✔ Context extraction & routing",
        "✔ Reduced backlog response times"
      ],
      chatUser: "My account billing seems incorrect for July.",
      chatAi: "I have flagged your invoice #INV-9021 and assigned high-priority ticket #TK-4821 to Finance Support.",
      chatHighlight: "A specialist will review within 15 minutes.",
      chips: ["View Ticket Status", "Add Receipt Note"]
    },
    escalation: {
      title: "Smart Human Handover",
      desc: "Recognize complex inquiries and seamlessly transfer context to a live support agent.",
      bullets: [
        "✔ Zero customer repetition required",
        "✔ Sentiment & urgency detection",
        "✔ Full chat history handoff"
      ],
      chatUser: "I'm having a technical issue during deployment.",
      chatAi: "I am connecting you with Senior Technical Engineer Marcus. Handing over full diagnostic context now...",
      chatHighlight: "Agent Marcus joined the chat 👨‍💻",
      chips: ["Attach Error Logs", "Call Support"]
    },
    insights: {
      title: "Real-time Customer Insights",
      desc: "Track common friction points, customer sentiment, and operational support bottlenecks.",
      bullets: [
        "✔ Automated sentiment analysis",
        "✔ Topic frequency clustering",
        "✔ Actionable support recommendations"
      ],
      chatUser: "Show me top customer questions this week.",
      chatAi: "Top 3 inquiries: 1. Password Reset (34%), 2. Shipping Delay Inquiry (22%), 3. Billing (18%).",
      chatHighlight: "Knowledge Base Article #12 recommended for update.",
      chips: ["Export CSV Report", "Update FAQ"]
    },
    multichannel: {
      title: "Multi-Channel Deployment",
      desc: "Deliver uniform support across Web Chat, Email, WhatsApp, Social Channels, and In-App.",
      bullets: [
        "✔ Synchronized cross-channel memory",
        "✔ Unified agent inbox view",
        "✔ Consistent brand tone across channels"
      ],
      chatUser: "Hi on WhatsApp! Is support active?",
      chatAi: "Yes! AdvocatePro Support Agent is active 24/7 across WhatsApp, Web Chat, and Email.",
      chatHighlight: "Conversations synced to central CRM.",
      chips: ["Connect WhatsApp", "View Active Channels"]
    }
  };

  window.selectSupportTab = function(tabKey) {
    document.querySelectorAll('.support-tab-btn').forEach(btn => {
      btn.className = 'support-tab-btn w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-left flex items-center gap-3 transition-all font-display font-bold text-sm text-slate-700 dark:text-slate-300 hover:border-blue-400';
    });

    const activeBtn = document.getElementById(`tab-btn-${tabKey}`);
    if (activeBtn) {
      activeBtn.className = 'support-tab-btn w-full p-4 rounded-2xl border border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-left flex items-center gap-3 transition-all font-display font-bold text-sm text-blue-600 dark:text-cyan-300 shadow-md';
    }

    const data = tabsData[tabKey];
    if (!data) return;

    const titleEl = document.getElementById('tab-title');
    const descEl = document.getElementById('tab-desc');
    const bulletsEl = document.getElementById('tab-bullets');
    const contentBox = document.getElementById('tab-display-content');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (bulletsEl) {
      bulletsEl.innerHTML = data.bullets.map(b => `<div class="flex items-center gap-2"><span class="text-blue-600 dark:text-cyan-400 font-bold">${b.slice(0, 1)}</span> ${b.slice(2)}</div>`).join('');
    }
  };

  // -------------------------------------------------------------------
  // 5. LIVE DEMO SCENARIO RUNNER
  // -------------------------------------------------------------------
  window.runSupportDemo = function(type) {
    const demoText = document.getElementById('support-demo-text');
    if (!demoText) return;

    demoText.innerHTML = '<span class="text-cyan-400">⚡ AI Agent analyzing request...</span>';

    setTimeout(() => {
      if (type === 'order') {
        demoText.innerHTML = `
          <div class="space-y-2">
            <div class="text-cyan-400 font-bold">▶ User: "Where is order #ORD-8821?"</div>
            <div class="p-3 rounded-xl bg-[#060B1E] border border-blue-500/30 text-slate-200">
              🤖 <span class="font-bold text-amber-300">AI Response:</span> "Order #ORD-8821 is currently in transit with BlueDart Express. Estimated delivery: Tomorrow by 2:00 PM."
            </div>
            <div class="text-[10px] text-slate-400 flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✔ Resolved Automatically</span> · Ticket Closed #TK-9921
            </div>
          </div>
        `;
      } else if (type === 'refund') {
        demoText.innerHTML = `
          <div class="space-y-2">
            <div class="text-cyan-400 font-bold">▶ User: "I want a refund for my last invoice."</div>
            <div class="p-3 rounded-xl bg-[#060B1E] border border-blue-500/30 text-slate-200">
              🤖 <span class="font-bold text-cyan-300">AI Response:</span> "I have verified your eligibility for a 30-day money-back guarantee. Would you like me to process a refund to your original payment method ending in 4092?"
            </div>
            <div class="text-[10px] text-slate-400 flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✔ Automated Workflow Ready</span> · Awaiting User Confirmation
            </div>
          </div>
        `;
      } else if (type === 'escalate') {
        demoText.innerHTML = `
          <div class="space-y-2">
            <div class="text-amber-400 font-bold">▶ User: "I need custom enterprise SLA terms approved immediately!"</div>
            <div class="p-3 rounded-xl bg-[#060B1E] border border-purple-500/40 text-slate-200">
              🚨 <span class="font-bold text-purple-300">Escalation Triggered:</span> "Custom SLA requests require Account Manager authorization. Transferring full conversation memory to Senior Representative Sarah now..."
            </div>
            <div class="text-[10px] text-purple-300 flex items-center gap-2">
              <span class="font-bold">👥 Seamless Handover Complete</span> · Sarah (Live Agent) Connected
            </div>
          </div>
        `;
      }
    }, 400);
  };

  // -------------------------------------------------------------------
  // 6. FAQ ACCORDION CONTROLLER
  // -------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-sup-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-sup-btn');
    const ans = item.querySelector('.faq-sup-ans');
    if (btn && ans) {
      btn.addEventListener('click', () => {
        const isHidden = ans.classList.contains('hidden');
        document.querySelectorAll('.faq-sup-ans').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-sup-btn span:last-child').forEach(s => s.textContent = '+');
        if (isHidden) {
          ans.classList.remove('hidden');
          btn.querySelector('span:last-child').textContent = '−';
        }
      });
    }
  });

  // -------------------------------------------------------------------
  // 7. DEMO MODAL CONTROLLERS
  // -------------------------------------------------------------------
  window.openDemoModal = function() {
    const modal = document.getElementById('demo-modal');
    if (modal) modal.classList.remove('opacity-0', 'pointer-events-none');
  };

  window.closeDemoModal = function() {
    const modal = document.getElementById('demo-modal');
    if (modal) modal.classList.add('opacity-0', 'pointer-events-none');
  };

  window.toggleMobileSupportMenu = function() {
    const menu = document.getElementById('mobile-support-menu');
    if (menu) menu.classList.toggle('hidden');
  };

  const mobileBtn = document.getElementById('mobile-support-menu-btn');
  if (mobileBtn) mobileBtn.addEventListener('click', window.toggleMobileSupportMenu);

  window.scrollToDemo = function() {
    const sec = document.getElementById('demo-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  };

  const demoForm = document.getElementById('support-demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('sup-status');
      const name = document.getElementById('sup-name').value;
      const email = document.getElementById('sup-email').value;

      status.textContent = `Thank you, ${name}! Your AI Customer Support Agent demo request has been received. Our team will contact you at ${email} shortly.`;
      status.className = 'text-xs font-mono text-cyan-400 text-center pt-2 block';
      demoForm.reset();
      setTimeout(window.closeDemoModal, 3000);
    });
  }

})();
