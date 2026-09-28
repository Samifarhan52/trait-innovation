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
    const name = document.getElementById('hosp-name').value;
    alert(`Thank you ${name}! Your request for TRAIT AI Hospital clinical demo has been submitted.`);
    closeHospitalModal();
  };
});
