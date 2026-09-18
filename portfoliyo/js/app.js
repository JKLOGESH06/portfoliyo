/**
 * Main Web Application Logic & DOM Renderer
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;

  // Initialize Modules
  const animationEngine = new window.AnimationEngine();
  const pcbSim = new window.PCBSimulation();
  const cvGen = new window.CVGenerator();

  pcbSim.init();

  // Populate Sections
  renderHero(data.personal);
  renderAbout(data.about);
  renderEducation(data.education);
  renderTechnicalSkills(data.technicalSkills);
  renderSoftSkills(data.softSkills);
  renderFeaturedProject(data.featuredProject);
  renderOtherProjects(data.otherProjects);
  renderStudentProjectsBanner(data.studentProjectsBanner);
  renderActivities(data.activities);
  renderCertifications(data.certifications);
  renderAchievements(data.achievements);
  renderEmbeddedResume();
  renderCareerGoals(data.careerGoals);
  renderContact(data.personal);
  renderFooter(data.personal);

  // Attach Project Modal Interactivity
  attachProjectModalHandlers();

  // Trigger reveal animation recalculation
  setTimeout(() => {
    animationEngine.initScrollReveals();
  }, 100);
});

function renderHero(p) {
  const heroContent = document.getElementById('heroContent');
  if (!heroContent) return;

  heroContent.innerHTML = `
    <div class="hero-centered">

      <!-- Profile Photo with PCB Ring -->
      <div class="profile-photo-wrap reveal-zoom">
        <div class="profile-ring"></div>
        <div class="profile-ring-inner"></div>
        <img
          src="assets/profile.jpg"
          alt="J. K. Logesh — EEE Student, Nandha Engineering College"
          class="profile-photo"
          loading="eager"
          onerror="this.style.display='none'"
        />
        <span class="profile-via profile-via-1"></span>
        <span class="profile-via profile-via-2"></span>
        <span class="profile-via profile-via-3"></span>
        <span class="profile-via profile-via-4"></span>
      </div>

      <!-- Name -->
      <h1 class="hero-name reveal-left">${p.fullName}</h1>

      <!-- College -->
      <div class="hero-role reveal-right">📍 ${p.college}</div>

      <!-- Large CV Label -->
      <div class="hero-cv-label reveal-zoom">CV</div>

      <!-- Headline -->
      <div class="hero-headline reveal-left">"${p.headline}"</div>

      <!-- Intro -->
      <p class="hero-intro reveal-right">${p.intro}</p>

      <!-- Action Buttons -->
      <div class="hero-btns reveal">
        <a href="#projects" class="btn btn-primary">View My Projects</a>
        <button class="btn btn-copper js-open-cv">Download CV</button>
        <a href="#contact" class="btn btn-outline">Contact Me</a>
      </div>
    </div>
  `;
}


function renderAbout(about) {
  const textContainer = document.getElementById('aboutTextContainer');
  const learningList = document.getElementById('currentlyLearningList');

  if (textContainer) {
    textContainer.className = 'about-text reveal-left stagger-1';
    textContainer.innerHTML = `
      <!-- Profile Photo: larger version in About section -->
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 28px; flex-wrap: wrap;">
        <div class="profile-photo-wrap" style="margin-bottom: 0;">
          <div class="profile-ring"></div>
          <div class="profile-ring-inner"></div>
          <img
            src="assets/profile.jpg"
            alt="J. K. Logesh — EEE Student"
            class="profile-photo"
            style="width: 100px; height: 100px;"
            loading="lazy"
            onerror="this.style.display='none'"
          />
          <span class="profile-via profile-via-1"></span>
          <span class="profile-via profile-via-2"></span>
          <span class="profile-via profile-via-3"></span>
          <span class="profile-via profile-via-4"></span>
        </div>
        <div>
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: var(--ink);">J. K. Logesh</div>
          <div style="font-size: 14px; color: var(--accent-ink); font-weight: 600; margin-top: 2px;">Nandha Engineering College, Erode</div>
        </div>
      </div>
      <p>${about.paragraph1}</p>
      <p>${about.paragraph2}</p>
    `;
  }

  if (learningList) {
    learningList.innerHTML = about.currentlyLearning.map((item, idx) => `
      <li class="${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${(idx % 3) + 1}">
        <div class="learning-icon">⚡</div>
        <span>${item}</span>
      </li>
    `).join('');
  }
}

function renderEducation(educationList) {
  const container = document.getElementById('educationContainer');
  if (!container) return;

  container.innerHTML = educationList.map((edu, idx) => `
    <div class="timeline-item ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <h3>${edu.degree}</h3>
        <div class="timeline-inst">🏫 ${edu.institution}, ${edu.location}</div>
        
        <div class="timeline-grid-meta">
          <div class="meta-field">
            <span class="meta-label">STATUS / DURATION</span>
            <span class="meta-val">${edu.duration}</span>
          </div>
          <div class="meta-field">
            <span class="meta-label">ACADEMIC STANDING</span>
            <span class="meta-val">${edu.cgpa}</span>
          </div>
        </div>

        <div style="margin-top: 16px; font-size: 14.5px; color: var(--muted);">
          <strong style="color: var(--ink);">Relevant Coursework:</strong> 
          ${edu.coursework}
        </div>
      </div>
    </div>
  `).join('');
}

function renderTechnicalSkills(skillsGroups) {
  const container = document.getElementById('technicalSkillsContainer');
  if (!container) return;

  container.innerHTML = skillsGroups.map((group, idx) => `
    <div class="skill-panel ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${(idx % 4) + 1}">
      <div class="skill-panel-head">
        <div class="skill-icon-wrap">${getSkillIcon(group.icon)}</div>
        <h3>${group.category}</h3>
      </div>
      <div class="chip-group">
        ${group.skills.map(skill => `<span class="chip">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function getSkillIcon(iconName) {
  switch (iconName) {
    case 'microchip': return '🔌';
    case 'wifi': return '📡';
    case 'sun': return '☀️';
    case 'zap': return '⚡';
    case 'terminal': return '💻';
    default: return '⚙️';
  }
}

function renderSoftSkills(softSkills) {
  const container = document.getElementById('softSkillsContainer');
  if (!container) return;

  container.innerHTML = softSkills.map((skill, idx) => `
    <div class="soft-card ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${(idx % 4) + 1}">
      <div class="soft-icon">${getSoftSkillIcon(skill.name)}</div>
      <span>${skill.name}</span>
    </div>
  `).join('');
}

function getSoftSkillIcon(name) {
  const icons = {
    "Communication": "💬",
    "Teamwork": "🤝",
    "Leadership": "🏆",
    "Problem Solving": "🧩",
    "Quick Learning": "🚀",
    "Adaptability": "🔄",
    "Presentation Skills": "📊",
    "Time Management": "⏱️",
    "Creative Thinking": "💡"
  };
  return icons[name] || "⭐";
}

function renderFeaturedProject(project) {
  const container = document.getElementById('featuredProjectContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="featured-card reveal-zoom">
      <div class="featured-top reveal-left">
        <div>
          <span class="cat-pill">${project.category}</span>
          <h3>${project.title}</h3>
        </div>
        <button class="btn btn-outline btn-sm js-view-featured-details">Full Project Specs</button>
      </div>

      <div class="featured-grid">
        <div class="featured-desc reveal-left">
          <p>${project.shortDescription}</p>
          
          <div class="feature-block-title">5-TIER PRIORITY SWITCHING ALGORITHM</div>
          <p style="font-size:14.5px; color:var(--ink); font-weight:500; border-left: 2.5px solid var(--accent); padding-left:12px;">
            "${project.objective}"
          </p>

          <div class="feature-block-title">KEY ENGINEERING HIGHLIGHTS</div>
          <ul class="feature-list">
            ${project.keyFeatures.map(feat => `<li>${feat}</li>`).join('')}
          </ul>

          <div class="feature-block-title">DOMAINS INVOLVED</div>
          <div class="tag-cloud">
            ${project.areasInvolved.map(area => `<span class="tag">${area}</span>`).join('')}
          </div>
        </div>

        <div class="featured-right-panel reveal-right">
          <!-- PCB Circuit Simulation -->
          <div class="pcb-box" id="heroPcbContainer">
            <!-- Rendered dynamically by pcb-simulation.js -->
          </div>

          <!-- Priority Flow Diagram below the PCB panel -->
          <div id="priorityFlowContainer" class="flow-container stagger-2" style="margin-top: 18px;"></div>
          <div style="margin-top: 10px; font-size: 12.5px; color: var(--muted); text-align: center;">
            💡 <em>Click any step or the PCB buttons to simulate automatic source switching.</em>
          </div>
        </div>
      </div>
    </div>
  `;

  // Re-initialise the PCB simulation now that its container exists in the DOM
  if (window._pcbSimInstance) {
    window._pcbSimInstance.renderHeroPCB();
    window._pcbSimInstance.renderPriorityFlow();
    window._pcbSimInstance.attachEventListeners();
  }
}

function renderOtherProjects(projects) {
  const container = document.getElementById('otherProjectsContainer');
  if (!container) return; // Safely return if section was removed

  let html = projects.map((proj, idx) => `
    <div class="proj-card ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${(idx % 2) + 1}">
      <div>
        <span class="proj-badge">${proj.category}</span>
        <h4>${proj.title}</h4>
        <p>${proj.problem.length > 90 ? proj.problem.substring(0, 90) + '...' : proj.problem}</p>
      </div>
      <div class="proj-spec-list">
        <div><span>Tech:</span> ${proj.technologies.join(', ')}</div>
        <div><span>Status:</span> Completed</div>
      </div>
      <button class="btn btn-outline btn-sm js-view-proj" data-id="${proj.id}" style="margin-top: 16px; width: 100%;">
        View Details
      </button>
    </div>
  `).join('');

  container.innerHTML = html;
}

function renderActivities(activities) {
  const container = document.getElementById('activitiesContainer');
  if (!container) return;

  container.innerHTML = activities.map((act, idx) => `
    <div class="entry-card ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${(idx % 2) + 1}">
      <h4>${act.title}</h4>
      <div class="entry-meta">📍 ${act.organization} • <span class="chip" style="font-size: 11px;">${act.date}</span></div>
      <p>${act.description}</p>
      <div style="margin-top: 10px; font-size: 13px; color: var(--muted);"><strong>Role:</strong> ${act.role}</div>
    </div>
  `).join('');
}

function renderCertifications(certs) {
  const container = document.getElementById('certificationsContainer');
  if (!container) return;

  container.innerHTML = certs.map((cert, idx) => `
    <div class="entry-card reveal-left stagger-${(idx % 2) + 1}">
      <h4>${cert.title}</h4>
      <div class="entry-meta">🏅 ${cert.organization}</div>
      <p style="font-size: 13px; color: var(--muted); margin-top: 6px;">Certification Credential: NPTEL / SWAYAM Verified (IIT & IISc)</p>
    </div>
  `).join('');
}

function renderAchievements(achievements) {
  const container = document.getElementById('achievementsContainer');
  if (!container) return;

  container.innerHTML = achievements.map((ach, idx) => `
    <div class="entry-card reveal-right stagger-${(idx % 2) + 1}">
      <h4>${ach.title}</h4>
      <div class="entry-meta">🏆 ${ach.event}</div>
      <p style="margin-top: 6px;">${ach.description}</p>
    </div>
  `).join('');
}

function renderCareerGoals(goals) {
  const container = document.getElementById('careerGoalsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="career-card short-term reveal-left stagger-1">
      <div class="career-tag">${goals.shortTerm.tag}</div>
      <h3>${goals.shortTerm.title}</h3>
      <p>"${goals.shortTerm.text}"</p>
    </div>
    <div class="career-card long-term reveal-right stagger-2">
      <div class="career-tag">${goals.longTerm.tag}</div>
      <h3>${goals.longTerm.title}</h3>
      <p>"${goals.longTerm.text}"</p>
    </div>
  `;
}

function renderContact(p) {
  const container = document.getElementById('contactContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-box reveal-zoom">
      <div class="contact-info reveal-left">
        <div class="eyebrow" style="color: var(--accent);">LET'S CONNECT</div>
        <h2>Open for Engineering Opportunities & Collaborations</h2>
        <p>I am always open to learning opportunities, technical discussions, project collaborations, internships, and professional opportunities in Electrical & Electronic Engineering, Embedded Systems, IoT, and Renewable Energy.</p>
        
        <div class="contact-links-list">
          <div class="contact-item">
            <div class="contact-item-icon">📧</div>
            <div class="contact-item-details">
              <div class="label">Email Address</div>
              <div class="value">${p.email}</div>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-item-icon">📱</div>
            <div class="contact-item-details">
              <div class="label">Phone Number</div>
              <div class="value">${p.phone}</div>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-item-icon">📍</div>
            <div class="contact-item-details">
              <div class="label">Location</div>
              <div class="value">${p.location}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-actions reveal-right">
        <button class="btn btn-outline js-copy-email" style="width: 100%; justify-content: center; color: #fff; border-color: rgba(255,255,255,0.3);">
          📋 Copy Email Address
        </button>
        <div style="display: flex; gap: 12px;">
          <a href="${p.linkedin}" target="_blank" rel="noopener" class="btn btn-outline" style="flex: 1; color: #fff; border-color: rgba(255,255,255,0.3); text-align: center;">
            LinkedIn
          </a>
          <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline" style="flex: 1; color: #fff; border-color: rgba(255,255,255,0.3); text-align: center;">
            GitHub
          </a>
        </div>
      </div>
    </div>
  `;

  const copyBtn = container.querySelector('.js-copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(p.email);
      copyBtn.innerText = "✓ Copied to Clipboard!";
      setTimeout(() => { copyBtn.innerText = "📋 Copy Email Address"; }, 2000);
    });
  }
}


function renderFooter(p) {
  const footerContent = document.getElementById('footerContent');
  if (!footerContent) return;

  footerContent.innerHTML = `
    <div class="footer-content">
      <div class="footer-brand">
        <h4>${p.fullName}</h4>
        <p style="margin-top: 4px;">${p.professionalTitle} • <em>"${p.tagline}"</em></p>
      </div>
      <ul class="footer-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
    <div class="copyright">
      © 2026 J. K. Logesh. All rights reserved. • ECE Student, Nandha Engineering College, Erode.
    </div>
  `;
}

function attachProjectModalHandlers() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.js-view-featured-details')) {
      showProjectModal(window.PORTFOLIO_DATA.featuredProject);
    }

    const projBtn = e.target.closest('.js-view-proj');
    if (projBtn) {
      const projId = projBtn.dataset.id;
      const proj = window.PORTFOLIO_DATA.otherProjects.find(p => p.id === projId);
      if (proj) showProjectModal(proj);
    }
  });
}

function showProjectModal(proj) {
  let modalOverlay = document.getElementById('projectModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'projectModalOverlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <h3>${proj.title}</h3>
        <button class="modal-close" onclick="document.getElementById('projectModalOverlay').classList.remove('active')">✕</button>
      </div>
      <div class="modal-body">
        <div style="font-size: 13px; font-weight: 700; color: var(--accent-ink); margin-bottom: 12px; text-transform: uppercase;">
          Category: ${proj.category}
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 15px; margin-bottom: 6px;">Problem Statement / Need:</h4>
          <p style="font-size: 14.5px;">${proj.problem || proj.shortDescription}</p>
        </div>

        ${proj.solution ? `
          <div style="margin-bottom: 20px;">
            <h4 style="font-size: 15px; margin-bottom: 6px;">Proposed Solution:</h4>
            <p style="font-size: 14.5px;">${proj.solution}</p>
          </div>
        ` : ''}

        ${proj.objective ? `
          <div style="margin-bottom: 20px;">
            <h4 style="font-size: 15px; margin-bottom: 6px;">Project Objective:</h4>
            <p style="font-size: 14.5px;">${proj.objective}</p>
          </div>
        ` : ''}

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 15px; margin-bottom: 6px;">Technologies & Components Used:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
            ${(proj.technologies || []).concat(proj.components || proj.componentsUsed || []).map(item => `
              <span class="tag">${item}</span>
            `).join('')}
          </div>
        </div>

        ${proj.outcome ? `
          <div style="margin-bottom: 20px; background: var(--bg); padding: 16px; border-radius: 8px; border: 1px solid var(--line);">
            <h4 style="font-size: 14px; color: var(--ink); margin-bottom: 4px;">Key Learning & Outcome:</h4>
            <p style="font-size: 14px; margin: 0;">"${proj.outcome}"</p>
          </div>
        ` : ''}

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          ${proj.githubLink ? `<a href="#" class="btn btn-outline btn-sm">GitHub Repository (${proj.githubLink})</a>` : ''}
          ${proj.docLink ? `<a href="#" class="btn btn-outline btn-sm">Project Documentation (${proj.docLink})</a>` : ''}
        </div>
      </div>
    </div>
  `;

  setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function renderStudentProjectsBanner(banner) {
  const container = document.getElementById('projectOrderBannerContainer');
  if (!container || !banner) return;

  container.innerHTML = `
    <div class="project-order-banner reveal-zoom">
      <div class="banner-badge">⚡ STUDENT PROJECT SERVICES &amp; CUSTOM ORDERS</div>
      <h3 class="banner-title">${banner.highlightText}</h3>
      <p class="banner-sub">I build custom microcontroller prototypes, embedded systems, electrical safety hardware, and custom full-stack web applications for student projects and client orders.</p>
      <div class="banner-cta">
        <a href="${banner.orderUrl}" target="_blank" rel="noopener" class="btn btn-copper btn-lg btn-glow">
          🛒 ${banner.buttonText}
        </a>
      </div>
    </div>
  `;
}

function renderEmbeddedResume() {
  const container = document.getElementById('embeddedResumeDoc');
  if (!container) return;
  const cvGen = new window.CVGenerator();
  container.innerHTML = cvGen.generateHTMLContent();
}

window.renderEmbeddedResume = renderEmbeddedResume;
