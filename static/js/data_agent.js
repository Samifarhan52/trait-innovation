/**
 * AI Data Analysis Agent — Executive Data Observatory JS
 * Trait Innovation LLP
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initCharts();
  initTheme();
  initMobileMenu();
});

// THREE.JS 3D DATA PARTICLES & MATRIX NETWORK
let scene, camera, renderer, particleSystem, matrixMesh;

function initThreeJS() {
  const container = document.getElementById('hero-canvas');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070A, 0.015);

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 15, 35);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Data Particle Grid Surface
  const particleCount = 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const emeraldColor = new THREE.Color(0x10B981);
  const limeColor = new THREE.Color(0x84CC16);
  const darkColor = new THREE.Color(0x232E44);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 80;
    const z = (Math.random() - 0.5) * 80;
    const y = (Math.sin(x * 0.2) + Math.cos(z * 0.2)) * 2 - 5;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const rand = Math.random();
    const c = rand > 0.6 ? emeraldColor : (rand > 0.3 ? limeColor : darkColor);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.45,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // 2. Central Analytical Wireframe Core
  const coreGeo = new THREE.IcosahedronGeometry(8, 2);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x10B981,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  matrixMesh = new THREE.Mesh(coreGeo, coreMat);
  matrixMesh.position.set(0, 2, -5);
  scene.add(matrixMesh);

  // Outer orbital ring
  const ringGeo = new THREE.TorusGeometry(12, 0.08, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x84CC16, transparent: true, opacity: 0.35 });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 3;
  matrixMesh.add(ringMesh);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate matrix core
    if (matrixMesh) {
      matrixMesh.rotation.y = elapsedTime * 0.15;
      matrixMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2;
    }

    // Wave movement in particle terrain
    if (particleSystem) {
      const pos = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const x = pos[i * 3];
        const z = pos[i * 3 + 2];
        pos[i * 3 + 1] = (Math.sin(x * 0.1 + elapsedTime * 0.8) + Math.cos(z * 0.1 + elapsedTime * 0.8)) * 1.5 - 4;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.02;
    }

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || window.innerHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

// CHART.JS DASHBOARD & SIMULATOR VISUALIZATIONS
let simChart, dashChart1, dashChart2, dashChart3;

function initCharts() {
  const chartFont = { family: 'Plus Jakarta Sans', size: 11 };

  // 1. Simulator Chart
  const simCtx = document.getElementById('simChart');
  if (simCtx) {
    simChart = new Chart(simCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Operating Margin (%)',
          data: [18.2, 18.5, 17.9, 18.1, 17.8, 16.4, 15.2, 14.0, 13.8],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#84CC16'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: chartFont } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: chartFont } }
        }
      }
    });
  }

  // 2. Control Room Dashboard Chart 1 (Revenue Trajectory)
  const d1 = document.getElementById('dashChart1');
  if (d1) {
    dashChart1 = new Chart(d1, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4 (Est)'],
        datasets: [{
          label: 'Revenue ($M)',
          data: [3.1, 3.8, 4.2, 4.8],
          backgroundColor: ['#10B981', '#10B981', '#34D399', '#84CC16'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94A3B8', font: chartFont } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: chartFont } }
        }
      }
    });
  }

  // 3. Dashboard Chart 2 (Anomaly Radar / Heatmap)
  const d2 = document.getElementById('dashChart2');
  if (d2) {
    dashChart2 = new Chart(d2, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [{
          label: 'Telemetry Variance',
          data: [0.2, 0.4, 1.8, 0.5, 0.3, 0.1],
          borderColor: '#84CC16',
          backgroundColor: 'rgba(132, 204, 22, 0.15)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94A3B8', font: chartFont } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: chartFont } }
        }
      }
    });
  }

  // 4. Dashboard Chart 3 (Resource Allocation Doughnut)
  const d3 = document.getElementById('dashChart3');
  if (d3) {
    dashChart3 = new Chart(d3, {
      type: 'doughnut',
      data: {
        labels: ['Core Compute', 'Vector Store', 'LLM Inference', 'Cache Layer'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#10B981', '#84CC16', '#34D399', '#232E44'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}

// QUERY SIMULATOR SWITCHER
const querySimData = {
  1: {
    status: 'FINANCE QUERY COMPLETE',
    latency: 'LATENCY: 38ms • CONFIDENCE: 99.4%',
    brief: 'Q3 margin compression in EU West is primarily driven by a 14.8% spike in localized shipping tariffs and a 6.2% delay in raw material customs clearance at Hamburg Port.',
    action: 'Re-route 35% of secondary logistics via Rotterdam rail hub. Estimated margin recovery: +3.8% within 21 business days.',
    rows: '1,420,890',
    tables: '12',
    chartLabel: 'Operating Margin (%)',
    chartData: [18.2, 18.5, 17.9, 18.1, 17.8, 16.4, 15.2, 14.0, 13.8],
    chartColor: '#10B981'
  },
  2: {
    status: 'SUPPLY CHAIN ANOMALY DISCOVERED',
    latency: 'LATENCY: 42ms • CONFIDENCE: 98.9%',
    brief: 'Vendor V-804 (East Asia Semiconductor) lead time variance increased from 14 to 38 days. Risk threshold breached for Q4 assembly lines.',
    action: 'Trigger backup allocation from Dual-Sourced Vendor V-201 in Vietnam. Secures 94% of planned production capacity.',
    rows: '3,890,120',
    tables: '18',
    chartLabel: 'Lead Time Variance (Days)',
    chartData: [14, 15, 14, 16, 22, 28, 34, 38, 38],
    chartColor: '#84CC16'
  },
  3: {
    status: 'CHURN CLUSTER IDENTIFIED',
    latency: 'LATENCY: 29ms • CONFIDENCE: 99.7%',
    brief: 'Enterprise accounts dropping daily active user activity by >30% over 14 days exhibit a 78% probability of non-renewal at month 12.',
    action: 'Dispatch automated Customer Success Executive alert for 18 flagged accounts with tailored feature re-onboarding packages.',
    rows: '8,410,000',
    tables: '24',
    chartLabel: 'DAU Engagement Index',
    chartData: [92, 88, 85, 74, 62, 58, 51, 48, 44],
    chartColor: '#34D399'
  }
};

function runQuerySim(id) {
  const data = querySimData[id];
  if (!data) return;

  // Update button active state
  document.querySelectorAll('.q-btn').forEach((btn, index) => {
    if (index + 1 === id) {
      btn.classList.add('active', 'border-emerald-500/40', 'bg-graphite-950');
      btn.classList.remove('bg-graphite-950/50', 'border-graphite-800');
    } else {
      btn.classList.remove('active', 'border-emerald-500/40', 'bg-graphite-950');
      btn.classList.add('bg-graphite-950/50', 'border-graphite-800');
    }
  });

  // Update Text Elements
  document.getElementById('sim-status-title').innerText = data.status;
  document.getElementById('sim-timestamp').innerText = data.latency;
  document.getElementById('sim-brief-text').innerText = data.brief;
  document.getElementById('sim-action-text').innerText = data.action;
  document.getElementById('sim-rows').innerText = data.rows;
  document.getElementById('sim-tables').innerText = data.tables;

  // Update Chart
  if (simChart) {
    simChart.data.datasets[0].label = data.chartLabel;
    simChart.data.datasets[0].data = data.chartData;
    simChart.data.datasets[0].borderColor = data.chartColor;
    simChart.update();
  }
}

// DEMO MODAL CONTROLS
function openDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.classList.add('hidden');
}

function runModalDemo() {
  const output = document.getElementById('modal-output');
  if (output) {
    output.classList.remove('hidden');
  }
}

// LIGHT / DARK THEME TOGGLE
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
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
