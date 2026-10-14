// TRAIT AI Aviation Interactive Controller
document.addEventListener('DOMContentLoaded', () => {

  const aviationTabsData = {
    flights: [
      { code: 'SEA ➔ SFO • UA-1049', title: 'United Flight 1049', desc: 'Cruising altitude 34,000 ft • Fuel burn optimized -3.8%', status: 'ON TIME', statusClass: 'emerald-400' },
      { code: 'LAX ➔ HND • NH-105', title: 'ANA Flight 105', desc: 'Jetstream assist vector • Altitude 38,000 ft', status: '12 MINS EARLY', statusClass: 'emerald-400' },
      { code: 'JFK ➔ LHR • BA-178', title: 'British Airways 178', desc: 'Ground de-icing hold • Gate hold active', status: 'PREDICTED DELAY: 14M', statusClass: 'amber-400' }
    ],
    baggage: [
      { code: 'CAROUSEL 4 • TERMINAL 1', title: 'Baggage Conveyor Velocity', desc: 'Average luggage transfer time 7.4 mins from aircraft touchdown.', status: '94.2% OPTIMAL', statusClass: 'cyan-400' },
      { code: 'TRANSFER POD 2 • T3 CONCOURSE', title: 'Inter-Terminal Transfer Line', desc: 'Zero misrouted bags in last 24-hour cycle.', status: '100% ACCURACY', statusClass: 'emerald-400' },
      { code: 'CLAIM HALL B', title: 'Peak Arrival Load Warning', desc: 'High bag density predicted at 18:30 due to 3 incoming widebody flights.', status: 'ALERT ACTIVE', statusClass: 'amber-400' }
    ],
    passenger: [
      { code: 'SECURITY CHECKPOINT 2', title: 'TSA Queue Flow Rate', desc: 'Avg wait time 4.2 minutes across 8 active screening lanes.', status: 'FLOW OPTIMAL', statusClass: 'emerald-400' },
      { code: 'PASSPORT CONTROL • INT HALL', title: 'Immigration Queue Density', desc: 'Predicting 12-minute wait time spike at 19:15.', status: 'LANE ADDITION ADVISED', statusClass: 'amber-400' },
      { code: 'GATE B10-B18 CONCOURSE', title: 'Gate Seating Capacity', desc: 'Passenger density 68% • Retail foot traffic optimal.', status: 'NORMAL DENSITY', statusClass: 'cyan-400' }
    ]
  };

  window.switchAviationTab = function(tabKey) {
    const tabBtns = document.querySelectorAll('.av-tab-btn');
    tabBtns.forEach(btn => {
      btn.classList.remove('bg-aviation-skyBlue', 'text-white');
      btn.classList.add('bg-aviation-cyan/10', 'text-aviation-charcoal', 'dark:text-slate-300');
    });

    if (event && event.currentTarget) {
      event.currentTarget.classList.remove('bg-aviation-cyan/10', 'text-aviation-charcoal', 'dark:text-slate-300');
      event.currentTarget.classList.add('bg-aviation-skyBlue', 'text-white');
    }

    const data = aviationTabsData[tabKey];
    const contentBox = document.getElementById('aviation-tab-content');
    if (!contentBox || !data) return;

    let html = '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">';
    data.forEach(item => {
      html += `
        <div class="p-5 rounded-2xl bg-aviation-navyDark/60 border border-aviation-cyan/20 space-y-2">
          <div class="text-xs font-mono text-aviation-cyan">${item.code}</div>
          <div class="text-lg font-bold text-white font-display">${item.title}</div>
          <div class="text-xs text-slate-300">${item.desc}</div>
          <div class="text-[10px] font-mono text-${item.statusClass}">${item.status}</div>
        </div>
      `;
    });
    html += '</div>';

    contentBox.innerHTML = html;
  };

  window.openAviationModal = function() {
    const modal = document.getElementById('aviation-modal');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
    }
  };

  window.closeAviationModal = function() {
    const modal = document.getElementById('aviation-modal');
    if (modal) {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100', 'pointer-events-auto');
    }
  };

  window.handleAviationForm = function(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const name = document.getElementById('av-name') ? document.getElementById('av-name').value.trim() : 'Aviation Operations Lead';
    const org = inputs[1] ? inputs[1].value.trim() : 'Airport / Carrier';
    const select = form.querySelector('select');
    const area = select ? select.value : 'Flight Telemetry & Turnaround';
    const email = inputs[2] ? inputs[2].value.trim() : '';

    const waText = 
`*TRAIT Aviation & AirportAI — Consultation Request*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
✈️ *Airport Authority / Carrier:* ${org}
🎯 *Area of Interest:* ${area}
📧 *Work Email:* ${email}
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent via www.traitinnovation.com/trait-ai-aviation_`;

    const waUrl = `https://api.whatsapp.com/send?phone=917975926279&text=${encodeURIComponent(waText)}`;

    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service: 'TRAIT Aviation & AirportAI', message: `Authority/Carrier: ${org} | Area: ${area}` })
      }).catch(() => {});
    } catch (err) {}

    closeAviationModal();
    const win = window.open(waUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = waUrl;
    }
  };
});
