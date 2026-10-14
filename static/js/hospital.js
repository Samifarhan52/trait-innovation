// TRAIT AI Hospital Interactive Controller
document.addEventListener('DOMContentLoaded', () => {

  const hospitalTabsData = {
    er: [
      { area: 'TRIAGE ZONE A', title: 'ER Wait Time: 11 Mins', desc: 'Queue volume 14% below peak • 4 Triage lanes active', status: 'STATUS: OPTIMAL', statusClass: 'emerald-500' },
      { area: 'TRAUMA BAY 2', title: 'Resource Readiness', desc: 'Trauma team pre-alert active • Prep complete', status: 'STATUS: READY', statusClass: 'teal-500' },
      { area: 'PEDIATRIC ER', title: 'Shift Capacity', desc: 'Predicted arrival influx at 20:00 (+4 patients)', status: 'PREDICTIVE ALLOCATION ON', statusClass: 'cyan-500' }
    ],
    beds: [
      { area: 'ICU FLOOR 4', title: 'ICU Bed Occupancy: 84%', desc: '6 beds available • 2 patient discharge summaries pending', status: 'CAPACITY STABLE', statusClass: 'emerald-500' },
      { area: 'SURGICAL WING B', title: 'Post-Op Recovery Beds', desc: '9 beds open • Turnaround velocity 42 mins', status: 'TURNOVER FAST', statusClass: 'teal-500' },
      { area: 'CARDIAC CARE UNIT', title: 'Telemetry Bed Capacity', desc: '88% occupancy • 1 transfer requested from Regional Health', status: 'MONITORING ACTIVE', statusClass: 'cyan-500' }
    ],
    staff: [
      { area: 'NURSING SHIFT A', title: 'Floor Staffing Ratio: 1:4', desc: 'Optimal nurse-to-patient ratio maintained across all wards', status: 'RATIO BALANCED', statusClass: 'emerald-500' },
      { area: 'ON-CALL SPECIALISTS', title: 'Physician Availability', desc: 'Cardiology and Neurology on-call response time < 6 mins', status: 'ON-CALL ACTIVE', statusClass: 'teal-500' },
      { area: 'ER NIGHT SHIFT', title: 'Predicted Surge Staffing', desc: 'Recommending +2 triage nurses for 22:00-04:00 window', status: 'STATION RECOMMENDATION', statusClass: 'cyan-500' }
    ]
  };

  window.switchHospitalTab = function(tabKey) {
    const tabBtns = document.querySelectorAll('.hosp-tab-btn');
    tabBtns.forEach(btn => {
      btn.classList.remove('bg-hospital-emerald', 'text-slate-950');
      btn.classList.add('bg-hospital-emerald/10', 'text-hospital-charcoal', 'dark:text-slate-300');
    });

    if (event && event.currentTarget) {
      event.currentTarget.classList.remove('bg-hospital-emerald/10', 'text-hospital-charcoal', 'dark:text-slate-300');
      event.currentTarget.classList.add('bg-hospital-emerald', 'text-slate-950');
    }

    const data = hospitalTabsData[tabKey];
    const contentBox = document.getElementById('hospital-tab-content');
    if (!contentBox || !data) return;

    let html = '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">';
    data.forEach(item => {
      html += `
        <div class="p-5 rounded-2xl bg-hospital-emerald/5 dark:bg-hospital-navyDark border border-hospital-emerald/20 space-y-2">
          <div class="text-xs font-mono text-hospital-emerald">${item.area}</div>
          <div class="text-lg font-bold text-hospital-charcoal dark:text-white font-display">${item.title}</div>
          <div class="text-xs text-hospital-muted dark:text-slate-300">${item.desc}</div>
          <div class="text-[10px] font-mono text-${item.statusClass} font-bold">${item.status}</div>
        </div>
      `;
    });
    html += '</div>';

    contentBox.innerHTML = html;
  };

  window.openHospitalModal = function() {
    const modal = document.getElementById('hospital-modal');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
    }
  };

  window.closeHospitalModal = function() {
    const modal = document.getElementById('hospital-modal');
    if (modal) {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100', 'pointer-events-auto');
    }
  };

  window.handleHospitalForm = function(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const name = document.getElementById('hosp-name') ? document.getElementById('hosp-name').value.trim() : 'Healthcare Administrator';
    const hospital = inputs[1] ? inputs[1].value.trim() : 'Hospital Organization';
    const select = form.querySelector('select');
    const area = select ? select.value : 'Clinical Assistance';
    const email = inputs[2] ? inputs[2].value.trim() : '';

    const waText = 
`*TRAIT HospitalAI — Consultation Request*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
🏥 *Organization:* ${hospital}
🎯 *Area of Interest:* ${area}
📧 *Work Email:* ${email}
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent via www.traitinnovation.com/trait-ai-hospital_`;

    const waUrl = `https://api.whatsapp.com/send?phone=917975926279&text=${encodeURIComponent(waText)}`;

    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service: 'TRAIT HospitalAI', message: `Hospital: ${hospital} | Area: ${area}` })
      }).catch(() => {});
    } catch (err) {}

    closeHospitalModal();
    const win = window.open(waUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = waUrl;
    }
  };
});
