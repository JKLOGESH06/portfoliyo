/**
 * Interactive Hero PCB Diagram & Power Management Priority Flow Simulator
 */

class PCBSimulation {
  constructor() {
    this.currentMode = 'solar'; // 'solar' | 'battery' | 'grid'
    this.sunlightLevel = 100;   // 0 - 100%
    this.batteryLevel = 85;     // 0 - 100%
  }

  init() {
    // Store instance so renderFeaturedProject can call it after DOM is ready
    window._pcbSimInstance = this;
    // Render if containers already exist (will be called again after featured project renders)
    if (document.getElementById('heroPcbContainer')) this.renderHeroPCB();
    if (document.getElementById('priorityFlowContainer')) this.renderPriorityFlow();
    this.attachEventListeners();
  }

  renderHeroPCB() {
    const pcbContainer = document.getElementById('heroPcbContainer');
    if (!pcbContainer) return;

    let activeSourceLabel = "SOLAR POWER (PRIMARY)";
    let statusColor = "var(--accent)";

    if (this.currentMode === 'battery') {
      activeSourceLabel = "BATTERY BACKUP (SECONDARY)";
      statusColor = "#3B82F6";
    } else if (this.currentMode === 'grid') {
      activeSourceLabel = "GRID SUPPLY (BACKUP)";
      statusColor = "#EF4444";
    }

    pcbContainer.innerHTML = `
      <div class="pcb-controls">
        <div class="pcb-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="4"/>
            <path d="M6 12h4M14 12h4M12 6v4M12 14v4"/>
          </svg>
          SYSTEM DEMO: SMART SOURCE SWITCHING
        </div>
        <div class="pcb-status-pill" style="border: 1px solid ${statusColor}; color: ${statusColor}">
          ● ${activeSourceLabel}
        </div>
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
        <button class="sim-btn ${this.currentMode === 'solar' ? 'active' : ''}" data-mode="solar">
          ☀️ High Solar
        </button>
        <button class="sim-btn ${this.currentMode === 'battery' ? 'active' : ''}" data-mode="battery">
          🌙 Low Solar (Battery)
        </button>
        <button class="sim-btn ${this.currentMode === 'grid' ? 'active' : ''}" data-mode="grid">
          🔌 Solar & Battery Low (Grid)
        </button>
      </div>

      <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- PCB Base Board -->
        <rect x="10" y="10" width="500" height="380" rx="16" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/>
        
        <!-- Board Mounting Holes -->
        <circle cx="30" cy="30" r="5" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>
        <circle cx="490" cy="30" r="5" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>
        <circle cx="30" cy="370" r="5" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>
        <circle cx="490" cy="370" r="5" fill="var(--bg)" stroke="var(--line)" stroke-width="2"/>

        <!-- Microcontroller (MCU) Core -->
        <rect x="200" y="140" width="120" height="120" rx="10" fill="var(--deep)" stroke="var(--accent)" stroke-width="2"/>
        <text x="260" y="195" text-anchor="middle" fill="#FFFFFF" font-family="'Space Grotesk'" font-weight="700" font-size="14">MCU CORE</text>
        <text x="260" y="215" text-anchor="middle" fill="var(--accent)" font-family="'Inter'" font-size="10">ESP32 / ARDUINO</text>
        
        <!-- MCU Pins -->
        <line x1="185" y1="160" x2="200" y2="160" stroke="var(--line)" stroke-width="2"/>
        <line x1="185" y1="180" x2="200" y2="180" stroke="var(--line)" stroke-width="2"/>
        <line x1="185" y1="200" x2="200" y2="200" stroke="var(--line)" stroke-width="2"/>
        <line x1="185" y1="220" x2="200" y2="220" stroke="var(--line)" stroke-width="2"/>

        <line x1="320" y1="160" x2="335" y2="160" stroke="var(--line)" stroke-width="2"/>
        <line x1="320" y1="180" x2="335" y2="180" stroke="var(--line)" stroke-width="2"/>
        <line x1="320" y1="200" x2="335" y2="200" stroke="var(--line)" stroke-width="2"/>
        <line x1="320" y1="220" x2="335" y2="220" stroke="var(--line)" stroke-width="2"/>

        <!-- 1. SOLAR MODULE NODE (Top Left) -->
        <g transform="translate(40, 40)" class="pcb-node">
          <rect x="0" y="0" width="110" height="70" rx="8" fill="var(--bg)" stroke="${this.currentMode === 'solar' ? 'var(--accent)' : 'var(--line)'}" stroke-width="${this.currentMode === 'solar' ? '2.5' : '1.5'}"/>
          <text x="55" y="28" text-anchor="middle" font-family="'Space Grotesk'" font-weight="700" font-size="12" fill="var(--ink)">SOLAR PV</text>
          <text x="55" y="46" text-anchor="middle" font-family="'Inter'" font-size="10" fill="var(--accent-ink)">PRIMARY (1ST)</text>
          <!-- Sun icon -->
          <circle cx="90" cy="20" r="6" fill="${this.currentMode === 'solar' ? 'var(--accent)' : 'var(--muted)'}"/>
        </g>

        <!-- Solar Trace to MCU -->
        <path d="M 150 75 H 230 V 140" fill="none" 
              stroke="${this.currentMode === 'solar' ? 'var(--accent)' : 'var(--line)'}" 
              stroke-width="${this.currentMode === 'solar' ? '3' : '1.5'}"
              stroke-dasharray="${this.currentMode === 'solar' ? '6 4' : 'none'}">
          ${this.currentMode === 'solar' ? '<animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite"/>' : ''}
        </path>
        <circle cx="230" cy="75" r="4" fill="var(--accent)"/>

        <!-- 2. BATTERY STORAGE NODE (Bottom Left) -->
        <g transform="translate(40, 270)" class="pcb-node">
          <rect x="0" y="0" width="110" height="70" rx="8" fill="var(--bg)" stroke="${this.currentMode === 'battery' ? '#3B82F6' : 'var(--line)'}" stroke-width="${this.currentMode === 'battery' ? '2.5' : '1.5'}"/>
          <text x="55" y="28" text-anchor="middle" font-family="'Space Grotesk'" font-weight="700" font-size="12" fill="var(--ink)">BATTERY</text>
          <text x="55" y="46" text-anchor="middle" font-family="'Inter'" font-size="10" fill="var(--muted)">BACKUP (2ND)</text>
        </g>

        <!-- Battery Trace to MCU -->
        <path d="M 150 305 H 230 V 260" fill="none" 
              stroke="${this.currentMode === 'battery' ? '#3B82F6' : 'var(--line)'}" 
              stroke-width="${this.currentMode === 'battery' ? '3' : '1.5'}"
              stroke-dasharray="${this.currentMode === 'battery' ? '6 4' : 'none'}">
          ${this.currentMode === 'battery' ? '<animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite"/>' : ''}
        </path>
        <circle cx="230" cy="305" r="4" fill="${this.currentMode === 'battery' ? '#3B82F6' : 'var(--muted)'}"/>

        <!-- 3. GRID SUPPLY NODE (Top Right) -->
        <g transform="translate(370, 40)" class="pcb-node">
          <rect x="0" y="0" width="110" height="70" rx="8" fill="var(--bg)" stroke="${this.currentMode === 'grid' ? '#EF4444' : 'var(--line)'}" stroke-width="${this.currentMode === 'grid' ? '2.5' : '1.5'}"/>
          <text x="55" y="28" text-anchor="middle" font-family="'Space Grotesk'" font-weight="700" font-size="12" fill="var(--ink)">AC MAINS</text>
          <text x="55" y="46" text-anchor="middle" font-family="'Inter'" font-size="10" fill="var(--muted)">FALLBACK (3RD)</text>
        </g>

        <!-- Grid Trace to MCU -->
        <path d="M 370 75 H 290 V 140" fill="none" 
              stroke="${this.currentMode === 'grid' ? '#EF4444' : 'var(--line)'}" 
              stroke-width="${this.currentMode === 'grid' ? '3' : '1.5'}"
              stroke-dasharray="${this.currentMode === 'grid' ? '6 4' : 'none'}">
          ${this.currentMode === 'grid' ? '<animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite"/>' : ''}
        </path>
        <circle cx="290" cy="75" r="4" fill="${this.currentMode === 'grid' ? '#EF4444' : 'var(--muted)'}"/>

        <!-- 4. RELAY SWITCH & LOAD NODE (Bottom Right) -->
        <g transform="translate(370, 270)" class="pcb-node">
          <rect x="0" y="0" width="110" height="70" rx="8" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/>
          <text x="55" y="28" text-anchor="middle" font-family="'Space Grotesk'" font-weight="700" font-size="12" fill="var(--ink)">RELAY LOAD</text>
          <text x="55" y="46" text-anchor="middle" font-family="'Inter'" font-size="10" fill="var(--accent-ink)">POWER OUTPUT</text>
        </g>

        <!-- Output Trace from MCU to Load -->
        <path d="M 290 260 V 305 H 370" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.6s" repeatCount="indefinite"/>
        </path>
        <circle cx="290" cy="305" r="4" fill="var(--accent)"/>

      </svg>
    `;
  }

  renderPriorityFlow() {
    const flowContainer = document.getElementById('priorityFlowContainer');
    if (!flowContainer) return;

    const data = window.PORTFOLIO_DATA.featuredProject;

    flowContainer.innerHTML = `
      <div class="flow-title">AUTOMATIC POWER SOURCE PRIORITY LOGIC</div>
      ${data.priorityFlow.map((step, idx) => `
        <div class="flow-step ${this.currentMode === (step.step === 1 ? 'solar' : step.step === 2 ? 'battery' : 'grid') ? 'active' : ''}" data-step="${step.step}">
          <div class="step-num">${step.step}</div>
          <div>
            <div class="step-title">${step.name}</div>
            <div class="step-role">${step.role}</div>
          </div>
        </div>
        ${idx < data.priorityFlow.length - 1 ? '<div class="flow-arrow"></div>' : ''}
      `).join('')}
    `;
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const simBtn = e.target.closest('.sim-btn');
      if (simBtn) {
        this.currentMode = simBtn.dataset.mode;
        this.renderHeroPCB();
        this.renderPriorityFlow();
      }

      const flowStep = e.target.closest('.flow-step');
      if (flowStep) {
        const stepNum = parseInt(flowStep.dataset.step);
        this.currentMode = stepNum === 1 ? 'solar' : stepNum === 2 ? 'battery' : 'grid';
        this.renderHeroPCB();
        this.renderPriorityFlow();
      }
    });
  }
}

window.PCBSimulation = PCBSimulation;
