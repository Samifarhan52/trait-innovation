// TRAIT Aviation Analytics — Interactive Logic & Command Center Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Live UTC Clock
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Telemetry Live Counter Tickers
    animateCounters();

    // 3. GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.from('#overview h1', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
        gsap.from('#overview p', { opacity: 0, y: 20, duration: 0.8, delay: 0.4 });
        gsap.from('#overview .hud-border', { opacity: 0, scale: 0.95, duration: 1, delay: 0.5 });
    }
});

// Live UTC Clock Ticker
function updateClock() {
    const clockEl = document.getElementById('live-utc-clock');
    if (!clockEl) return;
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.innerText = `UTC ${hours}:${minutes}:${seconds}`;
}

// Counter Animations
function animateCounters() {
    const flightsEl = document.getElementById('kpi-hero-flights');
    if (!flightsEl) return;

    let flights = 1100;
    const targetFlights = 1248;
    const interval = setInterval(() => {
        flights += 4;
        if (flights >= targetFlights) {
            flights = targetFlights;
            clearInterval(interval);
        }
        flightsEl.innerText = flights.toLocaleString();
    }, 30);
}

// Tab Switching Data Spec
const tabData = {
    global: {
        title: 'GLOBAL FLIGHT NETWORK INTELLIGENCE',
        desc: 'Live tracking of 31,000+ commercial flights across 412 airport nodes with automated delay prediction and air traffic flow optimization.',
        stat1: '31,487',
        stat2: '412',
        stat3: '99.98%',
        stat4: '4.2 MIN',
        radar: [
            { flight: 'UA214 (B789)', status: 'ON TIME', color: 'text-emerald-400' },
            { flight: 'BA488 (A350)', status: 'EN ROUTE', color: 'text-cyan-400' },
            { flight: 'DL930 (B777)', status: 'SLOT HOLD', color: 'text-amber-400' }
        ]
    },
    flight: {
        title: 'FLIGHT OPERATIONS & TELEMETRY STREAM',
        desc: 'High-frequency ADS-B and ACARS telemetry processing fuel burn optimization, altitude level management, and cockpit advisories.',
        stat1: '14,820',
        stat2: '186',
        stat3: '99.99%',
        stat4: '2.1 MIN',
        radar: [
            { flight: 'AA112 (B738)', status: 'CLIMBING', color: 'text-cyan-400' },
            { flight: 'LH711 (A388)', status: 'CRUISE', color: 'text-emerald-400' },
            { flight: 'CX250 (B773)', status: 'APPROACH', color: 'text-purple-400' }
        ]
    },
    passenger: {
        title: 'TERMINAL PASSENGER FLOW & QUEUE HEATMAPS',
        desc: 'Computer vision and BLE beacon analytics forecasting security checkpoint congestion, gate dwell times, and retail footfall.',
        stat1: '325.4K',
        stat2: '28 TERMINALS',
        stat3: '94.2%',
        stat4: '6.5 MIN QUEUE',
        radar: [
            { flight: 'TERMINAL 1 SEC', status: '8 MIN WAIT', color: 'text-amber-400' },
            { flight: 'TERMINAL 2 GATE', status: 'BOARDING', color: 'text-emerald-400' },
            { flight: 'CUSTOMS HALL', status: 'CLEAR', color: 'text-cyan-400' }
        ]
    },
    baggage: {
        title: 'BAGGAGE RFID & CAROUSEL INTELLIGENCE',
        desc: 'End-to-end bag tracking with instant carousel allocation, interline transfer monitoring, and automated ramp loading verification.',
        stat1: '4,892',
        stat2: '64 BELTS',
        stat3: '99.99%',
        stat4: '0 MISPLACED',
        radar: [
            { flight: 'CAROUSEL 04', status: 'ACTIVE', color: 'text-emerald-400' },
            { flight: 'RAMP BELT 12', status: 'LOADING', color: 'text-cyan-400' },
            { flight: 'TRANSFER BAY B', status: 'SORTED', color: 'text-emerald-400' }
        ]
    }
};

// Switch Tab Logic
function switchTab(tabKey) {
    const data = tabData[tabKey];
    if (!data) return;

    // Reset button styles
    ['global', 'flight', 'passenger', 'baggage'].forEach(k => {
        const btn = document.getElementById(`tab-${k}`);
        if (btn) {
            btn.className = 'px-3.5 py-2 rounded-lg text-slate-400 hover:text-white transition-all';
        }
    });

    // Active button style
    const activeBtn = document.getElementById(`tab-${tabKey}`);
    if (activeBtn) {
        activeBtn.className = 'px-3.5 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40 transition-all';
    }

    // Update Content
    const titleEl = document.getElementById('tab-card-title');
    const descEl = document.getElementById('tab-card-desc');
    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.desc;

    // Update Stats
    const stat1 = document.getElementById('dash-stat-1');
    const stat2 = document.getElementById('dash-stat-2');
    const stat3 = document.getElementById('dash-stat-3');
    const stat4 = document.getElementById('dash-stat-4');
    if (stat1) stat1.innerText = data.stat1;
    if (stat2) stat2.innerText = data.stat2;
    if (stat3) stat3.innerText = data.stat3;
    if (stat4) stat4.innerText = data.stat4;

    // Update Radar feed list
    const radarList = document.getElementById('radar-feed-list');
    if (radarList && data.radar) {
        radarList.innerHTML = data.radar.map(item => `
            <div class="p-2 rounded bg-navy-900/60 border border-cyan-500/20 text-slate-300 flex justify-between">
                <span>${item.flight}</span>
                <span class="${item.color}">${item.status}</span>
            </div>
        `).join('');
    }
}

// Modal Controllers
function openDemoModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeDemoModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) modal.classList.add('hidden');
}

function openVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) modal.classList.add('hidden');
}

// Demo Form Submission Handler
async function handleDemoSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('demo-submit-btn');
    const feedback = document.getElementById('demo-feedback');
    const name = document.getElementById('modal-name')?.value || 'Valued Partner';
    const email = document.getElementById('modal-email')?.value || '';
    const category = document.getElementById('modal-category')?.value || 'General Inquiry';

    if (btn) btn.innerText = 'PROCESSING REQUEST...';

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                service: `TRAIT Aviation Analytics (${category})`,
                message: document.getElementById('modal-interest')?.value || 'Demo request for Aviation Analytics'
            })
        });

        const resData = await response.json();

        if (feedback) {
            feedback.classList.remove('hidden');
            feedback.innerText = resData.message || `Thank you ${name}! Your demo request has been received.`;
        }

        if (btn) {
            btn.innerText = 'REQUEST RECEIVED ✓';
            btn.className = 'w-full py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm tracking-wider';
        }

        setTimeout(() => {
            closeDemoModal();
        }, 3000);

    } catch (err) {
        if (feedback) {
            feedback.classList.remove('hidden');
            feedback.innerText = `Thank you ${name}! Your request has been logged. Our aviation team will reach out to ${email} shortly.`;
        }
    }
}
