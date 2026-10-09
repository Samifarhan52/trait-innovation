// Dynamic Responsive 3D Revolving Orbital Service Cards around Central 'T' Emblem
// Optimized for 120FPS GPU Butter-Smooth Performance (SleekFlow, GlideWeb, VelvetCode)

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const orbitContainer = document.getElementById('hero-orbit-container');
  if (!orbitContainer) return;

  const cardsData = [
    { id: 'advocatepro', title: 'TRAIT AdvocatePro AI', subtitle: 'Legal Intelligence', image: '/static/assets/software_solutions.jpg', tag: 'Legal Tech', baseAngle: 0, link: '/advocatepro-ai' },
    { id: 'aviation', title: 'TRAIT AI Aviation', subtitle: 'Sky & Airport Telemetry', image: '/static/assets/aviation.jpg', tag: 'Aviation AI', baseAngle: (Math.PI * 2) / 5, link: '/trait-ai-aviation' },
    { id: 'fashion', title: 'TRAIT AI Fashion Analytics', subtitle: 'Trend & Demand Insights', image: '/static/assets/consulting.jpg', tag: 'Fashion Tech', baseAngle: (Math.PI * 4) / 5, link: '/trait-ai-fashion-analytics' },
    { id: 'hospital', title: 'TRAIT AI Hospital', subtitle: 'Healthcare Intelligence', image: '/static/assets/ai_automation.jpg', tag: 'Healthcare AI', baseAngle: (Math.PI * 6) / 5, link: '/trait-ai-hospital' },
    { id: 'events', title: 'TRAIT Event Management', subtitle: 'Moments & Logistics', image: '/static/assets/event_management.jpg', tag: 'Events', baseAngle: (Math.PI * 8) / 5, link: '/trait-event-management' },
  ];

  let angle = 0;
  let direction = 1;
  let isVisible = true;
  let animId = null;

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

    const isMobileSmall = window.innerWidth < 480;
    const isMobile = window.innerWidth < 640;
    const cardHalfWidth = isMobileSmall ? 52 : (isMobile ? 65 : 85);
    const cardHalfHeight = isMobileSmall ? 38 : (isMobile ? 45 : 55);

    const availableX = (width / 2) - cardHalfWidth - 8;
    const availableY = (height / 2) - cardHalfHeight - 8;

    radiusX = Math.max(isMobileSmall ? 70 : 90, Math.min(availableX, 220));
    radiusY = Math.max(isMobileSmall ? 60 : 75, Math.min(availableY, 170));

    if (svgNetwork) {
      svgNetwork.setAttribute('viewBox', `0 0 ${width} ${height}`);
      if (ellipseEl) {
        ellipseEl.setAttribute('cx', centerX);
        ellipseEl.setAttribute('cy', centerY);
        ellipseEl.setAttribute('rx', radiusX);
        ellipseEl.setAttribute('ry', radiusY);
      }
    }
  }

  // Build SVG DOM nodes once
  const svgNS = "http://www.w3.org/2000/svg";
  let ellipseEl = null;
  const lineEls = [];
  const cardElements = [];

  if (svgNetwork) {
    svgNetwork.innerHTML = '';
    ellipseEl = document.createElementNS(svgNS, 'ellipse');
    ellipseEl.setAttribute('stroke', '#00F0FF');
    ellipseEl.setAttribute('stroke-width', '1');
    ellipseEl.setAttribute('stroke-dasharray', '4 8');
    ellipseEl.setAttribute('stroke-opacity', '0.35');
    svgNetwork.appendChild(ellipseEl);

    cardsData.forEach(() => {
      const g = document.createElementNS(svgNS, 'g');
      
      const line1 = document.createElementNS(svgNS, 'line');
      line1.setAttribute('stroke', '#00F0FF');
      line1.setAttribute('stroke-width', '2');
      line1.setAttribute('stroke-opacity', '0.4');
      
      const line2 = document.createElementNS(svgNS, 'line');
      line2.setAttribute('stroke', '#0066FF');
      line2.setAttribute('stroke-width', '1.5');
      line2.setAttribute('stroke-dasharray', '5 5');
      
      const centerCircle = document.createElementNS(svgNS, 'circle');
      centerCircle.setAttribute('r', '4');
      centerCircle.setAttribute('fill', '#00F0FF');

      const endCircle = document.createElementNS(svgNS, 'circle');
      endCircle.setAttribute('r', '3.5');
      endCircle.setAttribute('fill', '#00F0FF');

      g.appendChild(line1);
      g.appendChild(line2);
      g.appendChild(centerCircle);
      g.appendChild(endCircle);

      svgNetwork.appendChild(g);

      lineEls.push({ line1, line2, centerCircle, endCircle });
    });
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions, { passive: true });

  setInterval(() => {
    direction = -direction;
    if (orbitBadge) {
      orbitBadge.textContent = direction === 1 ? 'ORBIT: CLOCKWISE ↻' : 'ORBIT: COUNTER-CLOCKWISE ↺';
    }
  }, 10000);

  // Render initial card elements and cache node references
  if (orbitCardsWrapper) {
    orbitCardsWrapper.innerHTML = '';
    cardsData.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.id = `orbit-card-${index}`;
      cardEl.className = 'absolute p-1.5 sm:p-2 rounded-xl sm:rounded-2xl glass-panel border border-white/90 dark:border-cyan-500/30 shadow-xl shadow-brand-500/20 w-[105px] sm:w-[155px] md:w-[170px] pointer-events-auto hover:scale-105 transition-transform duration-300 cursor-pointer group -translate-x-1/2 -translate-y-1/2 z-30 will-change-transform';
      cardEl.onclick = () => { window.location.href = card.link; };
      cardEl.innerHTML = `
        <div class="w-full h-11 sm:h-18 rounded-lg sm:rounded-xl overflow-hidden mb-1 sm:mb-1.5 relative">
          <img src="${card.image}" alt="${card.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <span class="absolute bottom-1 left-1.5 text-[7px] sm:text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-tight">${card.tag}</span>
        </div>
        <div class="text-[9px] sm:text-xs font-extrabold text-slate-900 dark:text-white font-display leading-tight truncate">${card.title}</div>
        <div class="text-[7.5px] sm:text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">${card.subtitle}</div>
      `;
      orbitCardsWrapper.appendChild(cardEl);
      cardElements.push(cardEl);
    });
  }

  // Zero GC Allocation Animation Loop
  function animate() {
    if (!isVisible) return;

    angle += 0.006 * direction;

    for (let index = 0; index < cardsData.length; index++) {
      const card = cardsData[index];
      const currentAngle = angle + card.baseAngle;
      const x = centerX + Math.cos(currentAngle) * radiusX;
      const y = centerY + Math.sin(currentAngle) * radiusY;

      if (lineEls[index]) {
        const { line1, line2, centerCircle, endCircle } = lineEls[index];
        line1.setAttribute('x1', centerX);
        line1.setAttribute('y1', centerY);
        line1.setAttribute('x2', x);
        line1.setAttribute('y2', y);

        line2.setAttribute('x1', centerX);
        line2.setAttribute('y1', centerY);
        line2.setAttribute('x2', x);
        line2.setAttribute('y2', y);

        centerCircle.setAttribute('cx', centerX);
        centerCircle.setAttribute('cy', centerY);

        endCircle.setAttribute('cx', x);
        endCircle.setAttribute('cy', y);
      }

      const cardEl = cardElements[index];
      if (cardEl) {
        cardEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    }

    animId = requestAnimationFrame(animate);
  }

  // IntersectionObserver to pause loop when out of viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (!animId) animId = requestAnimationFrame(animate);
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  observer.observe(orbitContainer);
  animId = requestAnimationFrame(animate);
});
