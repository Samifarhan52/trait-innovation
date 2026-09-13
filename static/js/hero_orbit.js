// Dynamic Responsive 3D Revolving Orbital Service Cards around Central 'T' Emblem
document.addEventListener('DOMContentLoaded', () => {
  const orbitContainer = document.getElementById('hero-orbit-container');
  if (!orbitContainer) return;

  const cardsData = [
    { id: 'ai', title: 'AI & Automation', subtitle: 'Intelligent Systems', image: '/static/assets/ai_automation.jpg', tag: 'AI & Automation', baseAngle: 0 },
    { id: 'aviation', title: 'Smarter Skies', subtitle: 'Flight Data Analytics', image: '/static/assets/aviation.jpg', tag: 'Aviation', baseAngle: (Math.PI * 2) / 5 },
    { id: 'software', title: 'Web & Software', subtitle: 'Digital Platform Growth', image: '/static/assets/software_solutions.jpg', tag: 'Software', baseAngle: (Math.PI * 4) / 5 },
    { id: 'consulting', title: 'Strategic Guidance', subtitle: 'Enterprise Advisory', image: '/static/assets/consulting.jpg', tag: 'Consulting', baseAngle: (Math.PI * 6) / 5 },
    { id: 'events', title: 'Event Management', subtitle: 'End-to-End Production', image: '/static/assets/event_management.jpg', tag: 'Events', baseAngle: (Math.PI * 8) / 5 },
  ];

  let angle = 0;
  let direction = 1; // 1 = Clockwise, -1 = Counter-clockwise

  let centerX = 300;
  let centerY = 280;
  let radiusX = 180;
  let radiusY = 140;

  const svgNetwork = document.getElementById('orbit-svg-network');
  const orbitCardsWrapper = document.getElementById('orbit-cards-wrapper');
  const orbitBadge = document.getElementById('orbit-direction-badge');

  function updateDimensions() {
    const rect = orbitContainer.getBoundingClientRect();
    const width = rect.width || 550;
    const height = rect.height || 520;

    centerX = width / 2;
    centerY = height / 2;

    // Dynamically calculate radius so cards NEVER overflow container boundaries
    const cardHalfWidth = window.innerWidth < 640 ? 65 : 85;
    const cardHalfHeight = window.innerWidth < 640 ? 45 : 55;

    const availableX = (width / 2) - cardHalfWidth - 10;
    const availableY = (height / 2) - cardHalfHeight - 10;

    radiusX = Math.max(90, Math.min(availableX, 220));
    radiusY = Math.max(75, Math.min(availableY, 170));

    if (svgNetwork) {
      svgNetwork.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions);

  // Periodically reverse orbit direction (every 10 seconds)
  setInterval(() => {
    direction = -direction;
    if (orbitBadge) {
      orbitBadge.textContent = direction === 1 ? 'ORBIT: CLOCKWISE ↻' : 'ORBIT: COUNTER-CLOCKWISE ↺';
    }
  }, 10000);

  // Render initial card elements
  cardsData.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.id = `orbit-card-${index}`;
    cardEl.className = 'absolute p-2 rounded-xl sm:rounded-2xl glass-panel border border-white/90 dark:border-cyan-500/30 shadow-xl shadow-brand-500/20 w-[125px] sm:w-[155px] md:w-[170px] pointer-events-auto hover:scale-105 transition-transform duration-300 cursor-pointer group -translate-x-1/2 -translate-y-1/2 z-30';
    cardEl.innerHTML = `
      <div class="w-full h-14 sm:h-18 rounded-lg sm:rounded-xl overflow-hidden mb-1.5 relative">
        <img src="${card.image}" alt="${card.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <span class="absolute bottom-1 left-1.5 text-[8px] sm:text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-tight">${card.tag}</span>
      </div>
      <div class="text-[10px] sm:text-xs font-extrabold text-slate-900 dark:text-white font-display leading-tight truncate">${card.title}</div>
      <div class="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">${card.subtitle}</div>
    `;
    orbitCardsWrapper.appendChild(cardEl);
  });

  // Animation Loop
  function animate() {
    angle += 0.007 * direction;

    let svgLinesHtml = `
      <ellipse cx="${centerX}" cy="${centerY}" rx="${radiusX}" ry="${radiusY}" stroke="#00F0FF" stroke-width="1" stroke-dasharray="4 8" stroke-opacity="0.35" />
    `;

    cardsData.forEach((card, index) => {
      const currentAngle = angle + card.baseAngle;
      const x = centerX + Math.cos(currentAngle) * radiusX;
      const y = centerY + Math.sin(currentAngle) * radiusY;

      // Update SVG wire connection
      svgLinesHtml += `
        <g>
          <line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#00F0FF" stroke-width="2" stroke-opacity="0.4" />
          <line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#0066FF" stroke-width="1.5" stroke-dasharray="5 5" class="animate-pulse" />
          <circle cx="${centerX}" cy="${centerY}" r="4" fill="#00F0FF" />
          <circle cx="${x}" cy="${y}" r="3.5" fill="#00F0FF" />
        </g>
      `;

      // Update Card position
      const cardEl = document.getElementById(`orbit-card-${index}`);
      if (cardEl) {
        cardEl.style.left = `${x}px`;
        cardEl.style.top = `${y}px`;
      }
    });

    if (svgNetwork) {
      svgNetwork.innerHTML = svgLinesHtml;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
