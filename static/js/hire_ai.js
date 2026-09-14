/**
 * TRAIT HireAI — The Talent Ecosystem JS
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initAssessmentRadar();
  initTheme();
  initMobileMenu();
});

// THREE.JS 3D TALENT NETWORK SYSTEM
let scene, camera, renderer, talentGroup;

function initThreeJS() {
  const container = document.getElementById('hero-talent-canvas');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x12181B, 0.012);

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 5, 30);

  renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  talentGroup = new THREE.Group();
  scene.add(talentGroup);

  // Create Abstract Human Silhouettes / Profile Spheres
  const nodeCount = 45;
  const nodes = [];
  const terracottaColor = new THREE.Color(0xE07A5F);
  const goldColor = new THREE.Color(0xF4A261);
  const sageColor = new THREE.Color(0x88AB8E);

  for (let i = 0; i < nodeCount; i++) {
    const isCandidate = i % 3 === 0;
    const isRole = i % 3 === 1;

    const geo = isCandidate ? new THREE.SphereGeometry(0.7, 16, 16) : new THREE.IcosahedronGeometry(0.5, 1);
    const color = isCandidate ? terracottaColor : (isRole ? goldColor : sageColor);

    const mat = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: !isCandidate,
      transparent: true,
      opacity: 0.85
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );

    talentGroup.add(mesh);
    nodes.push(mesh);
  }

  // Connecting Lines (Dynamic Talent Network)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xE07A5F,
    transparent: true,
    opacity: 0.15
  });

  const lineGeo = new THREE.BufferGeometry();
  const linePositions = new Float32Array(nodeCount * nodeCount * 3);
  let lineIndex = 0;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].position.distanceTo(nodes[j].position);
      if (dist < 12) {
        linePositions[lineIndex++] = nodes[i].position.x;
        linePositions[lineIndex++] = nodes[i].position.y;
        linePositions[lineIndex++] = nodes[i].position.z;

        linePositions[lineIndex++] = nodes[j].position.x;
        linePositions[lineIndex++] = nodes[j].position.y;
        linePositions[lineIndex++] = nodes[j].position.z;
      }
    }
  }

  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex), 3));
  const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
  talentGroup.add(linesMesh);

  // Mouse interactivity
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
  });

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (talentGroup) {
      talentGroup.rotation.y = elapsedTime * 0.08 + mouseX;
      talentGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 + mouseY;
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || window.innerHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

// INTERACTIVE TALENT MAP NODE SELECTOR
const talentNodeData = {
  'data-analysis': {
    type: 'SKILL NODE DETAILS',
    status: 'ACTIVE CONNECTIONS: 9',
    title: 'Data Analysis & Statistical Modeling',
    desc: 'Connected candidate profiles demonstrate high-proficiency SQL synthesis, python data pipelines, and quantitative decision modeling.',
    val1: '3',
    val2: '4',
    val3: '2'
  },
  'fullstack': {
    type: 'ROLE NODE DETAILS',
    status: 'ACTIVE CONNECTIONS: 12',
    title: 'Lead Systems Architect',
    desc: 'High-alignment enterprise role requiring cloud-native infrastructure, distributed systems architecture, and team mentorship.',
    val1: '5',
    val2: '1',
    val3: '3'
  },
  'product-mgmt': {
    type: 'DEVELOPMENT NODE DETAILS',
    status: 'ACTIVE CONNECTIONS: 7',
    title: 'Executive Upskilling Path',
    desc: 'Targeted continuous learning path bridging engineering managers into strategic executive leadership roles.',
    val1: '4',
    val2: '2',
    val3: '5'
  }
};

function selectTalentNode(key) {
  const data = talentNodeData[key];
  if (!data) return;

  document.getElementById('map-node-type').innerText = data.type;
  document.getElementById('map-node-status').innerText = data.status;
  document.getElementById('map-node-title').innerText = data.title;
  document.getElementById('map-node-desc').innerText = data.desc;
  document.getElementById('map-val-1').innerText = data.val1;
  document.getElementById('map-val-2').innerText = data.val2;
  document.getElementById('map-val-3').innerText = data.val3;
}

// CHART.JS ASSESSMENT RADAR CHART
function initAssessmentRadar() {
  const ctx = document.getElementById('assessmentRadarChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Technical Mastery', 'Domain Knowledge', 'Adaptability', 'Cultural Alignment', 'Leadership', 'Role Fit'],
      datasets: [{
        label: 'Candidate Competency',
        data: [92, 88, 95, 90, 84, 94],
        borderColor: '#E07A5F',
        backgroundColor: 'rgba(224, 122, 95, 0.25)',
        borderWidth: 2,
        pointBackgroundColor: '#F4A261'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { display: false },
          pointLabels: { color: '#FAFAF5', font: { family: 'Plus Jakarta Sans', size: 11 } }
        }
      }
    }
  });
}

// MODAL CONTROLS
function openDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.classList.add('hidden');
}

function runModalDemo() {
  const out = document.getElementById('modal-output');
  if (out) out.classList.remove('hidden');
}

// THEME TOGGLE
function initTheme() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

// MOBILE MENU
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
