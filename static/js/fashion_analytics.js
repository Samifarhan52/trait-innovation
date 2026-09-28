// TRAIT AI Fashion Analytics Interactive Controller
document.addEventListener('DOMContentLoaded', () => {
  
  // Dashboard Tab Switching Data
  const fashionTabsData = {
    apparel: [
      { category: 'Oversized Outerwear', sub: 'Search surge +68%', desc: 'Structured coats and cocoon silhouettes leading A/W orders.', val: '88%' },
      { category: 'Tailored Blazers', sub: 'Sell-through 91.2%', desc: 'Double-breasted cut showing high velocity across luxury retail.', val: '92%' },
      { category: 'Pleated Trousers', sub: 'Demand index 84.0', desc: 'High-waisted relaxed fits outperforming slim cut items.', val: '84%' }
    ],
    footwear: [
      { category: 'Chunky Leather Loafers', sub: 'Growth +74%', desc: 'High demand in urban markets for premium calfskin loafers.', val: '95%' },
      { category: 'Pointed Toe Boots', sub: 'Velocity 89.5%', desc: 'Metallic and deep burgundy accents trending on e-commerce.', val: '89%' },
      { category: 'Minimalist Sneakers', sub: 'Stable core item', desc: 'Re-order frequency remains high across all age demographics.', val: '82%' }
    ],
    color: [
      { category: 'Velvet Rose & Carmine', sub: 'Dominant A/W Palette', desc: '44% of top designer collections featuring deep red tones.', val: '98%' },
      { category: 'Amethyst & Midnight Blue', sub: 'Secondary Accent', desc: 'High affinity in evening wear and luxury outerwear items.', val: '91%' },
      { category: 'Olive & Warm Earth', sub: 'Daywear Staple', desc: 'Sustained seasonal demand in casual and knitwear categories.', val: '85%' }
    ],
    demand: [
      { category: 'Re-Stock Signal: Knitwear', sub: 'Lead time 18 days', desc: 'AI recommends boosting inventory before mid-season peak.', val: '96%' },
      { category: 'Markdown Risk: Denim Shorts', sub: 'Inventory clearance alert', desc: 'Recommend 15% promotional discount to optimize warehouse turnover.', val: '64%' },
      { category: 'Regional Allocation: Asia Pacific', sub: 'Outerwear allocation +35%', desc: 'Cold snap forecast indicates surge in outerwear purchasing.', val: '90%' }
    ]
  };

  window.switchFashionTab = function(tabKey) {
    const tabBtns = document.querySelectorAll('.fashion-tab-btn');
    tabBtns.forEach(btn => {
      btn.classList.remove('bg-fashion-rose', 'text-white');
      btn.classList.add('bg-fashion-rose/10', 'dark:bg-fashion-darkCard', 'text-fashion-charcoal', 'dark:text-slate-300');
    });

    // Highlight clicked button
    if (event && event.currentTarget) {
      event.currentTarget.classList.remove('bg-fashion-rose/10', 'dark:bg-fashion-darkCard', 'text-fashion-charcoal', 'dark:text-slate-300');
      event.currentTarget.classList.add('bg-fashion-rose', 'text-white');
    }

    const data = fashionTabsData[tabKey];
    const contentBox = document.getElementById('fashion-tab-content');
    if (!contentBox || !data) return;

    let html = '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">';
    data.forEach((item, idx) => {
      const colorClass = idx === 0 ? 'rose' : idx === 1 ? 'fuchsia' : 'violet';
      html += `
        <div class="p-6 rounded-2xl bg-fashion-${colorClass}/5 dark:bg-fashion-darkVelvet border border-fashion-${colorClass}/15 space-y-3">
          <div class="text-xs font-mono text-fashion-${colorClass} font-bold uppercase">${item.sub}</div>
          <div class="text-xl font-bold font-display text-fashion-charcoal dark:text-white">${item.category}</div>
          <p class="text-xs text-fashion-muted dark:text-slate-300 leading-relaxed">${item.desc}</p>
          <div class="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="bg-fashion-${colorClass} h-full" style="width: ${item.val}; transition: width 0.6s ease-in-out;"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    contentBox.innerHTML = html;
  };

  // Modal Handlers
  window.openFashionModal = function() {
    const modal = document.getElementById('fashion-modal');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
    }
  };

  window.closeFashionModal = function() {
    const modal = document.getElementById('fashion-modal');
    if (modal) {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100', 'pointer-events-auto');
    }
  };

  window.handleFashionForm = function(e) {
    e.preventDefault();
    const name = document.getElementById('fashion-name').value;
    alert(`Thank you ${name}! Your request for TRAIT AI Fashion Analytics demo has been submitted. Our team will contact you shortly.`);
    closeFashionModal();
  };
});
