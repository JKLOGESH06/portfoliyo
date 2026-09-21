/**
 * ATS Resume Generator, Printable Modal & .docx Exporter
 */

class CVGenerator {
  constructor() {
    this.data = window.PORTFOLIO_DATA;
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const openCvBtn = e.target.closest('.js-open-cv');
      if (openCvBtn) {
        e.preventDefault();
        this.openCVModal();
      }

      const closeCvBtn = e.target.closest('.js-close-cv');
      if (closeCvBtn) {
        this.closeCVModal();
      }

      const printCvBtn = e.target.closest('.js-print-cv');
      if (printCvBtn) {
        window.print();
      }

      const exportDocxBtn = e.target.closest('.js-export-docx');
      if (exportDocxBtn) {
        this.exportToDocx();
      }
    });
  }

  generateHTMLContent() {
    const data = this.data;
    const p = data.personal;
    const edu = data.education[0];
    const fp = data.featuredProject;
    const exp = data.experience ? data.experience[0] : null;

    return `
      <div class="ats-resume-document" id="atsCvPrintContainer">
        <!-- HEADER -->
        <div class="ats-header">
          <div class="ats-name">${p.fullName.toUpperCase()}</div>
          <div class="ats-contact-line">
            <span>📞 +91 ${p.phone}</span>
            <span>|</span>
            <span>✉️ ${p.email}</span>
            <span>|</span>
            <span>🔗 <a href="${p.linkedin}" target="_blank" rel="noopener">linkedin.com/in/logesh-j-k</a></span>
            <span>|</span>
            <span>💻 <a href="${p.github}" target="_blank" rel="noopener">github.com/JKLOGESH06</a></span>
          </div>
        </div>

        <!-- PROFESSIONAL SUMMARY -->
        <section class="ats-section">
          <div class="ats-section-title">PROFESSIONAL SUMMARY</div>
          <p class="ats-text">
            Motivated Electrical and Electronics Engineering student with a strong passion for electronics, embedded systems, and emerging technologies. Equipped with foundational skills in circuit principles and microcontroller applications, seeking entry-level engineering roles and internship opportunities to deliver practical, innovative technological solutions.
          </p>
        </section>

        <!-- EDUCATION -->
        <section class="ats-section">
          <div class="ats-section-title">EDUCATION</div>
          <div class="ats-entry">
            <div class="ats-entry-header">
              <span>Electrical and Electronics Engineering</span>
              <span class="ats-right">Year of Study: 3rd Year | Expected: 2026</span>
            </div>
            <div class="ats-entry-sub">${edu.institution}</div>
            <div class="ats-subtext">Academic Standing: ${edu.cgpa}</div>
          </div>
        </section>

        <!-- TECHNICAL SKILLS -->
        <section class="ats-section">
          <div class="ats-section-title">TECHNICAL SKILLS</div>
          <ul class="ats-bullet-list">
            ${data.technicalSkills.map(group => `
              <li><strong>${group.category}:</strong> ${group.skills.join(', ')}</li>
            `).join('')}
            <li><strong>Soft Skills:</strong> ${data.softSkills.map(s => s.name).join(', ')}</li>
          </ul>
        </section>

        <!-- PROJECTS -->
        <section class="ats-section">
          <div class="ats-section-title">PROJECTS</div>
          <div class="ats-entry">
            <div class="ats-entry-header">
              <span>${fp.title}</span>
              <span class="ats-right" style="font-style: italic; font-weight: normal;">${fp.category}</span>
            </div>
            <ul class="ats-bullet-list">
              <li><strong>Problem &amp; SDG Mapping:</strong> Developed an automated hybrid renewable energy control system to eliminate rural power outages, aligning with SDG 7 (Affordable &amp; Clean Energy) and SDG 13 (Climate Action).</li>
              <li><strong>5-Tier Priority Switching Algorithm:</strong> Engineered zero-overlap priority logic: Solar (Day/Primary) &rarr; Battery Inverter (Night, &gt;20% SOC) &rarr; AC Grid (Night, &lt;20% SOC) &rarr; Generator Backup &rarr; Auto-Solar Restore.</li>
              <li><strong>Technical Implementation:</strong> Integrated Embedded C microcontroller control, charge controllers, relay switching networks, and real-time battery/grid telemetry for safe, automated power source selection.</li>
            </ul>
          </div>

          ${(data.otherProjects || []).map(p => `
            <div class="ats-entry" style="margin-top: 4pt;">
              <div class="ats-entry-header">
                <span><strong>${p.title}</strong></span>
                <span class="ats-right" style="font-style: italic; font-weight: normal;">${p.category}</span>
              </div>
              <ul class="ats-bullet-list">
                <li>${p.problem} <strong>Technologies:</strong> ${p.technologies.join(', ')}.</li>
              </ul>
            </div>
          `).join('')}
        </section>

        <!-- INDUSTRIAL VISIT / FIELD VISIT -->
        <section class="ats-section">
          <div class="ats-section-title">INDUSTRIAL VISIT / FIELD VISIT</div>
          <div class="ats-entry">
            <div class="ats-entry-header">
              <span><strong>Coral Coil India Private Limited, Erode</strong></span>
              <span class="ats-right" style="font-style: italic; font-weight: normal;">Field Visit</span>
            </div>
            <ul class="ats-bullet-list">
              <li>Observed the manufacturing process of wind-turbine generators, including stator and rotor assembly.</li>
              <li>Gained practical exposure to industrial operations, quality testing and real-time production systems.</li>
            </ul>
          </div>
        </section>

        <!-- CERTIFICATIONS -->
        <section class="ats-section">
          <div class="ats-section-title">CERTIFICATIONS</div>
          <ul class="ats-bullet-list">
            <li><strong>NPTEL Online Certification</strong> &mdash; NPTEL / SWAYAM (IIT &amp; IISc)</li>
          </ul>
        </section>

        <!-- ACHIEVEMENTS -->
        <section class="ats-section">
          <div class="ats-section-title">ACHIEVEMENTS</div>
          <ul class="ats-bullet-list">
            <li><strong>1st Prize Winner:</strong> Secured First Place in the "Green Energy" technical event at Nandha Engineering College for presenting innovative sustainable power and green technology solutions.</li>
            <li><strong>3rd Prize Winner:</strong> Won Third Place in the inter-collegiate Project Expo held at P.A. College of Engineering for showcasing a working technical project prototype.</li>
          </ul>
        </section>

        <!-- ADDITIONAL INFORMATION -->
        <section class="ats-section">
          <div class="ats-section-title">ADDITIONAL INFORMATION</div>
          <ul class="ats-bullet-list">
            <li><strong>Workshops &amp; Technical Training:</strong> ${data.additionalInformation.workshops}</li>
            <li><strong>Languages Known:</strong> ${data.additionalInformation.languages.join(', ')}</li>
          </ul>
        </section>

      </div>
    `;
  }

  openCVModal() {
    let overlay = document.getElementById('cvModalOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cvModalOverlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal-container" style="max-width: 900px;">
        <div class="modal-header">
          <h3>ATS-Friendly Curriculum Vitae — ${this.data.personal.fullName}</h3>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-copper btn-sm js-print-cv">🖨️ Print / Save as PDF</button>
            <button class="btn btn-outline btn-sm js-export-docx">📄 Download .DOCX</button>
            <button class="modal-close js-close-cv">✕</button>
          </div>
        </div>
        <div class="modal-body" style="background: var(--bg); padding: 24px;">
          ${this.generateHTMLContent()}
        </div>
      </div>
    `;

    setTimeout(() => overlay.classList.add('active'), 10);
  }

  closeCVModal() {
    const overlay = document.getElementById('cvModalOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  exportToDocx() {
    const p = this.data.personal;
    const edu = this.data.education[0];
    const fp = this.data.featuredProject;
    const exp = this.data.experience ? this.data.experience[0] : null;

    const headerContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${p.fullName} Resume</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 10.5pt; line-height: 1.4; color: #111111; }
          h1 { font-size: 18pt; text-transform: uppercase; color: #0E3B2E; text-align: center; margin-bottom: 2pt; font-weight: bold; }
          h2 { font-size: 11pt; text-transform: uppercase; border-bottom: 1pt solid #111111; color: #0E3B2E; margin-top: 10pt; margin-bottom: 4pt; font-weight: bold; }
          .sub { text-align: center; font-size: 9.5pt; color: #333333; margin-bottom: 10pt; }
          .bold { font-weight: bold; }
          ul { margin-top: 2pt; margin-bottom: 6pt; padding-left: 18pt; }
          li { margin-bottom: 3pt; }
        </style>
      </head>
      <body>
        <h1>${p.fullName}</h1>
        <div class="sub">
          ${p.professionalTitle} | ${p.college}<br>
          Location: ${p.location} | Email: ${p.email} | Phone: ${p.phone}<br>
          LinkedIn: linkedin.com/in/logesh-j-k | GitHub: github.com/JKLOGESH06
        </div>

        <h2>Education</h2>
        <p><span class="bold">${edu.institution}</span>, ${edu.location}<br>
        ${edu.degree} (${edu.duration})</p>

        <h2>Technical Skills</h2>
        <ul>
          ${this.data.technicalSkills.map(s => `<li><span class="bold">${s.category}:</span> ${s.skills.join(', ')}</li>`).join('')}
          <li><span class="bold">Soft Skills:</span> ${this.data.softSkills.map(s => s.name).join(', ')}</li>
        </ul>

        <h2>Projects</h2>
        <p><span class="bold">${fp.title}</span> — <em>${fp.category}</em></p>
        <ul>
          <li><span class="bold">Problem &amp; SDG Mapping:</span> Developed an automated hybrid renewable energy control system to eliminate rural power outages, aligning with SDG 7 (Affordable &amp; Clean Energy) and SDG 13 (Climate Action).</li>
          <li><span class="bold">5-Tier Priority Switching Algorithm:</span> Engineered zero-overlap priority logic: Solar (Day/Primary) → Battery Inverter (Night, >20% SOC) → AC Grid (Night, <20% SOC) → Generator Backup → Auto-Solar Restore.</li>
          <li><span class="bold">Technical Implementation:</span> Integrated Embedded C microcontroller control, charge controllers, relay switching networks, and real-time battery/grid telemetry for safe, automated power source selection.</li>
          <li><span class="bold">Technology Readiness Level (TRL):</span> Formulated and validated TRL 2–3 proof-of-concept model for low-cost, scalable rural hybrid energy deployment.</li>
        </ul>
        ${(this.data.otherProjects || []).map(p => `
          <p><span class="bold">${p.title}</span> — <em>${p.category}</em></p>
          <ul>
            <li>${p.problem} <span class="bold">Technologies:</span> ${p.technologies.join(', ')}.</li>
          </ul>
        `).join('')}

        <h2>Industrial Visit / Field Visit</h2>
        <p><span class="bold">Coral Coil India Private Limited, Erode</span><span style="float:right;font-weight:normal;font-style:italic;">Field Visit</span></p>
        <ul>
          <li>Observed the manufacturing process of wind-turbine generators, including stator and rotor assembly.</li>
          <li>Gained practical exposure to industrial operations, quality testing and real-time production systems.</li>
        </ul>

        <h2>Certifications</h2>
        <ul>
          ${this.data.certifications.map(c => `<li><span class="bold">${c.title}</span> — ${c.organization}</li>`).join('')}
        </ul>

        <h2>Achievements</h2>
        <ul>
          <li><span class="bold">1st Prize Winner:</span> Secured First Place in the "Green Energy" technical event for presenting innovative sustainable power and green technology solutions.</li>
          <li><span class="bold">3rd Prize Winner:</span> Won Third Place in the inter-collegiate Project Expo held at P.A. College of Engineering for showcasing a working technical project prototype.</li>
        </ul>

        <h2>Additional Information</h2>
        <ul>
          <li><span class="bold">Workshops &amp; Technical Training:</span> ${this.data.additionalInformation.workshops}</li>
          <li><span class="bold">Languages Known:</span> ${this.data.additionalInformation.languages.join(', ')}</li>
        </ul>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + headerContent], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.fullName.replace(/\s+/g, '_').replace(/\./g, '')}_ATS_CV.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

window.CVGenerator = CVGenerator;

