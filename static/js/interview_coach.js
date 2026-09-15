/**
 * AI Interview Coach — Interactive Script
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initTheme();
  initMobileMenu();
});

// HERO THREE.JS LIGHTING & AMBIENT CANVAS
function initHeroCanvas() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 25;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Soft Ambient Particle Field
  const pCount = 200;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);

  for (let i = 0; i < pCount * 3; i++) {
    pPos[i] = (Math.random() - 0.5) * 40;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

  const pMat = new THREE.PointsMaterial({
    color: 0x9E1B32,
    size: 0.35,
    transparent: true,
    opacity: 0.3
  });

  const pMesh = new THREE.Points(pGeo, pMat);
  scene.add(pMesh);

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    pMesh.rotation.y = elapsedTime * 0.03;
    pMesh.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// 2. BUILT FOR EVERY AMBITION SWITCHER
const ambitionData = {
  students: {
    badge: 'CAMPUS & GRADUATE PREPARATION',
    title: 'Ace Your Campus Placement Interviews',
    desc: 'Practice foundational behavioral questions, technical screening drills, and group discussion formats tailored for campus recruitment drives.',
    tags: ['✓ HR Screening', '✓ Core Technical Basics', '✓ Confidence Building'],
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  },
  seekers: {
    badge: 'JOB SEARCH & MID-CAREER',
    title: 'Stand Out in Competitive Job Openings',
    desc: 'Prepare for targeted role requirements, behavioral STAR method frameworks, and company-specific culture questions.',
    tags: ['✓ STAR Method Drills', '✓ Resume Deep-Dives', '✓ Salary Negotiations'],
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  professionals: {
    badge: 'LEADERSHIP & SENIOR ROLES',
    title: 'Master Executive & Management Interviews',
    desc: 'Refine strategic leadership narratives, system architecture challenges, and high-stakes executive decision scenarios.',
    tags: ['✓ System Design', '✓ Executive Communication', '✓ Conflict Resolution'],
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
  },
  switchers: {
    badge: 'PIVOT & DOMAIN TRANSITION',
    title: 'Pivot Confidently to a New Career Domain',
    desc: 'Articulate transferable skills effectively, address domain experience gaps, and frame past successes for your target role.',
    tags: ['✓ Transferable Skills Framing', '✓ Industry Jargon', '✓ Career Pivot Stories'],
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80'
  },
  placement: {
    badge: 'CAMPUS PLACEMENT DRIVES',
    title: 'High-Volume Campus Placement Readiness',
    desc: 'Simulate high-pressure campus placement rounds with quick-fire technical screenings and behavioral rounds.',
    tags: ['✓ Rapid Fire Q&A', '✓ Aptitude Reasoning', '✓ Mock Panel Interview'],
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }
};

function switchAmbition(key) {
  const data = ambitionData[key];
  if (!data) return;

  document.querySelectorAll('.amb-btn').forEach(btn => {
    btn.classList.remove('active', 'border-coach-winered', 'dark:border-coach-coral', 'shadow-md');
    btn.classList.add('border-coach-lightborder', 'dark:border-slate-800');
  });

  const activeBtn = document.getElementById(`amb-btn-${key}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'border-coach-winered', 'dark:border-coach-coral', 'shadow-md');
    activeBtn.classList.remove('border-coach-lightborder', 'dark:border-slate-800');
  }

  const box = document.getElementById('ambition-display');
  if (box) {
    box.style.opacity = '0.4';
    setTimeout(() => {
      document.getElementById('amb-badge').innerText = data.badge;
      document.getElementById('amb-title').innerText = data.title;
      document.getElementById('amb-desc').innerText = data.desc;
      document.getElementById('amb-img').src = data.img;

      const tagsContainer = document.getElementById('amb-tags');
      tagsContainer.innerHTML = data.tags.map(t => `<span class="px-2.5 py-1 rounded-lg bg-coach-cream dark:bg-coach-burgundy border border-coach-lightborder dark:border-slate-700">${t}</span>`).join('');

      box.style.opacity = '1';
    }, 200);
  }
}

// 3. MOCK INTERVIEW SIMULATOR CONTROL
const typeData = {
  general: {
    label: 'GENERAL INTERVIEW',
    questions: [
      "Let's start with a simple question. Tell me about yourself.",
      "What are your greatest professional strengths?",
      "Where do you see yourself in five years?"
    ],
    tip: '💡 Tip: Keep your response structured (Present, Past, Future).'
  },
  technical: {
    label: 'TECHNICAL INTERVIEW',
    questions: [
      "Describe a challenging technical project you worked on and how you resolved bottlenecks.",
      "How do you ensure data security and performance in distributed application architectures?",
      "Walk me through your debugging methodology when faced with an unexpected production bug."
    ],
    tip: '💡 Tip: State your technical approach clearly, mentioning key tools and quantitative outcomes.'
  },
  behavioral: {
    label: 'BEHAVIORAL INTERVIEW',
    questions: [
      "Describe a time when you had a disagreement with a team member. How did you handle it?",
      "Give an example of a goal you reached and tell me how you achieved it under pressure.",
      "Tell me about a time you failed and what lessons you learned from the experience."
    ],
    tip: '💡 Tip: Use the STAR method (Situation, Task, Action, Result).'
  },
  hr: {
    label: 'HR INTERVIEW',
    questions: [
      "Why do you want to work for our company specifically?",
      "What environment brings out your best productivity?",
      "How do you handle multiple competing deadlines?"
    ],
    tip: '💡 Tip: Align your personal motivations with company core values and culture.'
  }
};

let currentType = 'general';
let currentQuestionIndex = 0;
let simTimerInterval = null;
let simSeconds = 0;

function selectType(key) {
  const data = typeData[key];
  if (!data) return;

  currentType = key;
  currentQuestionIndex = 0;

  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-coach-burgundy', 'text-white', 'shadow-md');
    btn.classList.add('bg-coach-cream/60', 'dark:bg-coach-burgundy/40', 'text-coach-charcoal', 'dark:text-slate-300');
  });

  const activeBtn = document.getElementById(`type-btn-${key}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-coach-burgundy', 'text-white', 'shadow-md');
    activeBtn.classList.remove('bg-coach-cream/60', 'dark:bg-coach-burgundy/40', 'text-coach-charcoal', 'dark:text-slate-300');
  }

  document.getElementById('sim-category-label').innerText = data.label;
  document.getElementById('sim-question-text').innerText = `"${data.questions[0]}"`;
  document.getElementById('sim-tip').innerText = data.tip;
}

function startSimSession() {
  const statusEl = document.getElementById('sim-status');
  statusEl.innerText = 'STATUS: LIVE SESSION IN PROGRESS';
  statusEl.className = 'font-bold text-emerald-500 animate-pulse';

  if (simTimerInterval) clearInterval(simTimerInterval);
  simSeconds = 0;

  simTimerInterval = setInterval(() => {
    simSeconds++;
    const m = String(Math.floor(simSeconds / 60)).padStart(2, '0');
    const s = String(simSeconds % 60).padStart(2, '0');
    document.getElementById('sim-timer').innerText = `${m}:${s}`;
  }, 1000);
}

function nextSimQuestion() {
  const data = typeData[currentType];
  if (!data) return;

  currentQuestionIndex = (currentQuestionIndex + 1) % data.questions.length;
  const qText = document.getElementById('sim-question-text');
  qText.style.opacity = '0.3';
  setTimeout(() => {
    qText.innerText = `"${data.questions[currentQuestionIndex]}"`;
    qText.style.opacity = '1';
  }, 200);
}

function endSimSession() {
  if (simTimerInterval) clearInterval(simTimerInterval);
  const statusEl = document.getElementById('sim-status');
  statusEl.innerText = 'STATUS: SESSION COMPLETED';
  statusEl.className = 'font-bold text-coach-winered dark:text-coach-coral';
}

// 5 & 6. FEEDBACK REPORT TABS SWITCHER
const reportTabsData = {
  overview: {
    comm: '92%',
    conf: '88%',
    struct: '95%',
    well: 'Clear explanation with good examples.',
    improve: 'Try to be more specific with outcomes.',
    suggest: 'Work on structuring using STAR method.'
  },
  comm: {
    comm: '96%',
    conf: '85%',
    struct: '90%',
    well: 'Articulate tone and pleasant cadence.',
    improve: 'Reduce filler words ("um", "like").',
    suggest: 'Practice 2-second pauses before speaking.'
  },
  conf: {
    comm: '90%',
    conf: '94%',
    struct: '88%',
    well: 'Strong eye contact & steady posture.',
    improve: 'Maintain energy toward technical answers.',
    suggest: 'Record self-practice videos for pacing.'
  },
  cont: {
    comm: '91%',
    conf: '90%',
    struct: '98%',
    well: 'Strong domain relevance & logic flow.',
    improve: 'Quantify metrics (e.g. % gain, revenue).',
    suggest: 'Include specific numbers in final results.'
  }
};

function switchReportTab(tabKey) {
  const data = reportTabsData[tabKey];
  if (!data) return;

  document.querySelectorAll('.rep-tab').forEach(btn => {
    btn.classList.remove('active', 'bg-coach-coral', 'text-white', 'font-bold');
    btn.classList.add('bg-white/10', 'text-slate-300');
  });

  const activeTab = document.getElementById(`tab-${tabKey}`);
  if (activeTab) {
    activeTab.classList.add('active', 'bg-coach-coral', 'text-white', 'font-bold');
    activeTab.classList.remove('bg-white/10', 'text-slate-300');
  }

  document.getElementById('rep-well').innerText = data.well;
  document.getElementById('rep-improve').innerText = data.improve;
  document.getElementById('rep-suggest').innerText = data.suggest;
}

// MODAL CONTROLS
function openInterviewModal() {
  const m = document.getElementById('interview-modal');
  if (m) m.classList.remove('hidden');
}

function closeInterviewModal() {
  const m = document.getElementById('interview-modal');
  if (m) m.classList.add('hidden');
}

function runModalPractice() {
  const out = document.getElementById('modal-output');
  if (out) out.classList.remove('hidden');
}

function openReportModal() {
  openInterviewModal();
}

// THEME & MOBILE MENU
function initTheme() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
