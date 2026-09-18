# Premium Portfolio & ATS-Friendly CV — J. K. Logesh

**Student:** J. K. Logesh  
**Branch:** Electronics & Communication Engineering (ECE)  
**Institution:** Nandha Engineering College, Erode, Tamil Nadu, India  
**Specializations:** Embedded Systems, IoT, Renewable Energy, Power Electronics  

---

## 🌟 Executive Summary

The personal portfolio website and matching ATS-friendly CV for **J. K. Logesh** are built specifically around an **Electronics & Hardware Engineering design language**. Grounded in circuit design aesthetics (PCB traces, via points, interactive MCU diagram, priority flow logic simulator, copper accents), the application avoids generic AI SaaS templates and strictly adheres to real student credentials without fabricating marks, dates, or metrics.

### Key Highlights
- **Electronics Design Language:** Custom color palette (`--bg: #F5F6F3`, `--surface: #FFFFFF`, `--ink: #14201C`, `--accent: #C8752F` circuit copper, `--deep: #0E3B2E` PCB green), Space Grotesk technical headings, and Inter sans-serif body.
- **Interactive Hero PCB Simulator:** Labeled PCB diagram illustrating **Solar → Battery → Grid** power flow with real-time interactive simulation buttons (*High Solar*, *Low Solar/Battery*, *Solar & Battery Low/Grid Fallback*).
- **Featured Project Priority Flow Diagram:** Smart Solar-Based Power Management System equipped with step-by-step interactive priority logic visualization.
- **Scroll Reveal Animations:** Powered by `IntersectionObserver` to animate sections, cards, timelines, and skill panels smoothly as the user scrolls.
- **1-Page ATS CV Generator & Exporter:**
  - One-click A4 Single-Column ATS preview modal.
  - Native **Print / Save to PDF** formatted with `@media print` rules.
  - Direct **Download `.DOCX`** generator for Microsoft Word / ATS portals.
- **Centralized Data Engine (`js/config.js`):** Every piece of personal information, CGPA, project, skill, and certification is managed in one centralized configuration file for instant updates.
- **Zero Fabricated Data:** Clear, marked editable placeholders (`[YOUR EMAIL]`, `[YOUR PHONE NUMBER]`, `[ADD CGPA]`, `[ADD YEAR]`, `[YOUR LINKEDIN URL]`, `[YOUR GITHUB URL]`) everywhere real information is pending.

---

## 🛠️ Architecture & File Structure

```
d:\portfoliyo\
├── index.html            # Main semantic HTML5 portfolio page
├── css/
│   └── style.css         # Design system tokens, circuit motifs, dark mode & ATS print rules
├── js/
│   ├── config.js         # Centralized configuration (Source of Truth)
│   ├── pcb-simulation.js # Interactive Hero PCB diagram & Priority Flow logic engine
│   ├── animations.js     # IntersectionObserver scroll reveal engine & theme toggle
│   ├── cv-generator.js   # ATS CV preview modal, PDF print styling & .docx exporter
│   └── app.js            # Main application initializer & dynamic DOM renderer
└── serve.ps1             # Local HTTP server script for instant local testing (Port 8080)
```

---

## 🎨 Visual Design & Aesthetics

| Element | Specification |
|---|---|
| **Background (Light)** | `#F5F6F3` (Cool off-white) |
| **Surface (Card)** | `#FFFFFF` |
| **Ink / Primary Text** | `#14201C` (Deep pine-charcoal) |
| **Accent / Trace** | `#C8752F` (Circuit trace copper) |
| **Structural Primary** | `#0E3B2E` (Deep PCB solder green) |
| **Dark Mode Background** | `#0B1210` |
| **Dark Mode Surface** | `#101B17` |
| **Typography** | `Space Grotesk` (Technical Display) + `Inter` (Body sans-serif) |
| **Section Dividers** | Copper circuit trace lines with animated via dots |

---

## 🚀 Interactive Features

### 1. Interactive PCB Hero Simulator
- Renders an embedded circuit diagram showing the **ESP32/Arduino MCU Core**, **Solar PV Panel**, **Battery Storage**, **AC Mains Grid**, and **Relay Output**.
- Clicking **High Solar**, **Low Solar (Battery)**, or **Solar & Battery Low (Grid)** animates the current flow traces dynamically and highlights active power sources.

### 2. Smart Solar Priority Flow Logic
- Visualizes the priority strategy:
  1. **Solar Power (Primary):** Maximize renewable energy usage whenever sunlight is sufficient.
  2. **Battery Power (Secondary Backup):** Engages when solar falls below load threshold.
  3. **Grid Supply (Final Fallback):** Automatically switches to AC Mains grid when both renewable sources are depleted.

### 3. Scroll Reveal Animations
- Each section, timeline node, skill panel, project card, and goal card triggers a subtle fade-and-lift motion upon scrolling into view.

### 4. Recruiter-Ready ATS Resume Generator
- Click **Download CV** anywhere on the page to open the ATS Resume modal.
- Includes **Print / Save as PDF** (formatted strictly as an A4 single page without headers/footers/backgrounds) and **Download `.DOCX`** for direct job portal uploads.

---

## 📝 How J. K. Logesh Can Update Personal Details

All customizable fields are located inside `d:\portfoliyo\js\config.js`. Open the file and replace any marked placeholder:

```javascript
window.PORTFOLIO_DATA = {
  personal: {
    fullName: "J. K. Logesh",
    email: "logesh.jk@example.com",           // Replace [YOUR EMAIL]
    phone: "+91 98765 43210",                // Replace [YOUR PHONE NUMBER]
    linkedin: "https://linkedin.com/in/...", // Replace [YOUR LINKEDIN URL]
    github: "https://github.com/...",        // Replace [YOUR GITHUB URL]
  },
  education: [
    {
      degree: "Bachelor's Degree in Electrical & Electronics Engineering",
      institution: "Nandha Engineering College",
      location: "Erode, Tamil Nadu, India",
      duration: "2023 – 2027",                 // Replace [ADD YEAR]
      cgpa: "8.5 / 10",                        // Replace [ADD CGPA]
      coursework: "Embedded Systems, Microcontrollers, IoT Architecture, Power Electronics"
    }
  ],
  // ... Certifications, Achievements & Additional Projects can be appended here!
};
```

---

## 🌐 Running & Previewing Locally

To preview the portfolio site locally:
1. Open PowerShell in `d:\portfoliyo`.
2. Run the included server script:
   ```powershell
   powershell -ExecutionPolicy Bypass -File serve.ps1
   ```
3. Open your browser to `http://localhost:8080/`.
