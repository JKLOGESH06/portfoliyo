/**
 * Centralized Configuration Data for J. K. Logesh Portfolio & CV
 * All personal info, skills, projects, and activities live in this single file.
 */

window.PORTFOLIO_DATA = {
  personal: {
    fullName: "J. K. Logesh",
    professionalTitle: "Electrical & Electronics Engineering Student",
    degree: "Bachelor of Engineering (B.E.) in Electrical & Electronics Engineering",
    college: "Nandha Engineering College, Erode",
    location: "Erode, Tamil Nadu, India",
    email: "jklogeshnpatti@gmail.com",
    phone: "9363606436",
    linkedin: "https://www.linkedin.com/in/logesh-j-k-14529b3b0/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Ba2IzpsQ9Q4e9ZcUBH7vm4g%3D%3D",
    github: "https://github.com/JKLOGESH06",
    tagline: "Learning. Building. Innovating.",
    interests: [
      "Embedded Systems",
      "IoT",
      "Renewable Energy",
      "Power Electronics",
      "Electrical & Electronics Systems",
      "Automation",
      "Hardware Prototyping"
    ],
    headline: "Building Practical Solutions with Embedded Systems, IoT & Renewable Energy.",
    intro: "I am an Electrical & Electronics Engineering student at Nandha Engineering College passionate about embedded systems, IoT, renewable energy, and power electronics. I enjoy transforming engineering concepts into practical solutions through hands-on projects."
  },

  about: {
    paragraph1: "I am an Electrical & Electronics Engineering student at Nandha Engineering College, Erode, passionate about embedded systems, IoT, renewable energy, and power electronics. I enjoy transforming engineering concepts into practical solutions through hands-on projects.",
    paragraph2: "Through my academic journey, I have gained hands-on practical exposure working with microcontrollers such as Arduino and ESP32, programming in C and Java, circuit simulation in MATLAB / Simulink, Keil uVision, and Proteus, as well as designing 5-tier power-source prioritization systems for renewable energy applications.",
    currentlyLearning: [
      "Embedded Systems Architecture (Arduino & ESP32)",
      "PLC & Industrial Automation",
      "Renewable Energy Power Management",
      "Circuit Simulation (MATLAB/Simulink & Proteus)",
      "Software Tools & Microcontroller Programming"
    ]
  },

  education: [
    {
      degree: "Electrical and Electronics Engineering",
      institution: "Nandha Engineering College",
      location: "Erode, Tamil Nadu, India",
      duration: "Year of Study: 3rd Year | Expected: 2026",
      cgpa: "7.5 CGPA",
      coursework: "Embedded Systems, Power Electronics, Circuit Simulation, Digital Logic, Sensors & Interfacing, Renewable Energy Systems, Industrial Automation (PLC)"
    }
  ],

  experience: [
    {
      role: "[Add Role / Position Title]",
      duration: "[Add Duration / Dates]",
      organization: "[Add Organization Name]",
      bullets: [
        "[Add key responsibility or action verb bullet point]",
        "[Add technical or professional skill gained during experience]"
      ]
    }
  ],

  technicalSkills: [
    {
      category: "Programming",
      icon: "terminal",
      skills: ["C", "Java"]
    },
    {
      category: "Embedded Systems",
      icon: "microchip",
      skills: ["Arduino", "ESP32"]
    },
    {
      category: "Electronics Core",
      icon: "zap",
      skills: ["Circuit Simulation", "Digital Logic", "Sensors & Interfacing"]
    },
    {
      category: "Software & Tools",
      icon: "terminal",
      skills: ["MATLAB / Simulink", "Keil uVision", "Proteus"]
    }
  ],

  softSkills: [
    { name: "Communication", icon: "message-square" },
    { name: "Teamwork", icon: "users" },
    { name: "Time management", icon: "clock" },
    { name: "Problem solving", icon: "cpu" },
    { name: "Adaptability", icon: "compass" }
  ],

  languages: ["English", "Tamil"],

  additionalInformation: {
    workshops: "Hands-on Workshop on Programmable Logic Controllers (PLC) & Industrial Automation",
    languages: ["English", "Tamil"]
  },

  featuredProject: {
    id: "smart-solar-power-management",
    title: "Smart Solar Priority Power Management System",
    category: "Academic / Technical Project",
    shortDescription: "Developed an automated hybrid renewable energy control system to eliminate rural power outages, aligning with SDG 7 (Affordable & Clean Energy) and SDG 13 (Climate Action).",
    objective: "Engineered zero-overlap 5-tier priority logic: Solar (Day/Primary) → Battery Inverter (Night, >20% SOC) → AC Grid (Night, <20% SOC) → Generator Backup → Auto-Solar Restore.",
    priorityFlow: [
      { step: 1, name: "Solar (Day/Primary)", role: "Primary Renewable Source", desc: "Monitors solar irradiance and serves load as primary power source." },
      { step: 2, name: "Battery Inverter", role: "Night, >20% SOC", desc: "Supplies load from stored energy when battery State of Charge is above 20%." },
      { step: 3, name: "AC Grid", role: "Night, <20% SOC", desc: "Switches to grid supply when battery State of Charge drops below 20%." },
      { step: 4, name: "Generator Backup", role: "Emergency Fallback", desc: "Engages generator backup during complete grid and battery depletion." },
      { step: 5, name: "Auto-Solar Restore", role: "Automatic Recovery", desc: "Seamlessly restores primary solar operation when solar generation recovers." }
    ],
    keyFeatures: [
      "Problem & SDG Mapping: Developed an automated hybrid renewable energy control system to eliminate rural power outages, aligning with SDG 7 (Affordable & Clean Energy) and SDG 13 (Climate Action)",
      "5-Tier Priority Switching Algorithm: Engineered zero-overlap priority logic: Solar (Day/Primary) → Battery Inverter (Night, >20% SOC) → AC Grid (Night, <20% SOC) → Generator Backup → Auto-Solar Restore",
      "Technical Implementation: Integrated Embedded C microcontroller control, charge controllers, relay switching networks, and real-time battery/grid telemetry for safe, automated power source selection",
      "Technology Readiness Level (TRL): Formulated and validated TRL 2–3 proof-of-concept model for low-cost, scalable rural hybrid energy deployment"
    ],
    areasInvolved: [
      "Embedded Systems",
      "Embedded C",
      "Renewable Energy",
      "Power Electronics",
      "Priority Switching Algorithms",
      "Circuit Simulation & Telemetry"
    ],
    componentsUsed: [
      "Microcontroller (Embedded C)",
      "Solar PV Array",
      "Battery Storage & Inverter",
      "Relay Switching Networks",
      "Charge Controllers",
      "Voltage & Current Telemetry Sensors"
    ],
    outcome: "Formulated and validated TRL 2–3 proof-of-concept model for low-cost, scalable rural hybrid energy deployment."
  },

  otherProjects: [
    {
      id: "rfid-door-lock-system",
      title: "RFID Door Lock System",
      category: "Embedded Security & Hardware",
      problem: "Engineered an automated contactless security access control system using RFID keycard authentication, solenoids, and microcontroller relay drivers.",
      technologies: ["Microcontroller", "RFID RC522 Module", "Solenoid Lock", "Relay Circuit", "Embedded C"],
      outcome: "Successfully demonstrated high-security automated door unlocking with authorized RFID keycards."
    },
    {
      id: "automatic-driver-monitoring",
      title: "Automatic Driver Monitoring System",
      category: "Automotive Safety & IoT",
      problem: "Developed a real-time driver fatigue and drowsiness detection system with sensor telemetry and instant buzzer alerts to prevent road accidents.",
      technologies: ["Arduino / ESP32", "Sensors & Interfacing", "Buzzer Alert", "IoT Telemetry"],
      outcome: "Achieved reliable real-time drowsiness detection and automatic emergency safety triggers."
    },
    {
      id: "overload-protection-system",
      title: "Overload Protection System",
      category: "Electrical Power Safety",
      problem: "Designed an automated current-sensing electrical overload protection trip mechanism with instantaneous relay isolation for equipment protection.",
      technologies: ["Current Sensors", "Relay Isolation", "Power Electronics", "Circuit Simulation"],
      outcome: "Effectively isolated electrical loads during overcurrent faults to prevent equipment damage."
    },
    {
      id: "web-development-solutions",
      title: "Web Development & Custom Website Solutions",
      category: "Full-Stack Web Development",
      problem: "Designed and developed modern responsive websites, portfolio applications, and custom web tools for academic and client project requirements.",
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "UI/UX Design", "Vercel Deployment"],
      outcome: "Created high-performance, responsive web interfaces with custom dynamic interactivity."
    }
  ],

  studentProjectsBanner: {
    highlightText: "I build projects for students! Need custom hardware, microcontroller prototypes, or web development projects?",
    orderUrl: "https://creators-in.vercel.app/",
    buttonText: "Place Your Project Order Here (creators-in.vercel.app)"
  },

  activities: [
    {
      title: "Hands-on Workshop on Programmable Logic Controllers (PLC) & Industrial Automation",
      organization: "Nandha Engineering College, Erode",
      date: "Technical Training",
      role: "Participant",
      description: "Hands-on Workshop on Programmable Logic Controllers (PLC) & Industrial Automation covering practical PLC programming, relay networks, and industrial control systems."
    }
  ],

  certifications: [
    {
      title: "NPTEL Online Certification",
      organization: "NPTEL / SWAYAM (IIT & IISc)",
      date: "Certified",
      credentialId: "NPTEL Certified",
      credentialLink: "#"
    }
  ],

  achievements: [
    {
      title: "1st Prize Winner — Green Energy Technical Event",
      event: "Nandha Engineering College",
      date: "1st Place",
      description: "Secured First Place in the \"Green Energy\" technical event at Nandha Engineering College for presenting innovative sustainable power and green technology solutions."
    },
    {
      title: "3rd Prize Winner — Inter-Collegiate Project Expo",
      event: "P.A. College of Engineering",
      date: "3rd Place",
      description: "Won Third Place in the inter-collegiate Project Expo held at P.A. College of Engineering for showcasing a working technical project prototype."
    }
  ],

  careerGoals: {
    shortTerm: {
      tag: "SHORT-TERM GOAL",
      title: "Technical Growth & Industry Exposure",
      text: "My short-term goal is to strengthen my technical skills in embedded systems, power management, and automation, gain practical industry experience, and continuously improve my engineering knowledge."
    },
    longTerm: {
      tag: "LONG-TERM GOAL",
      title: "Engineering Excellence & Sustainable Innovation",
      text: "My long-term goal is to become a skilled and successful Electrical & Electronics Engineer who contributes to innovative, scalable, and sustainable technological solutions."
    }
  },

  summaryForCV: "Electrical & Electronics Engineering student at Nandha Engineering College with strong expertise in Programming (C, Java), Embedded Systems (Arduino, ESP32), Electronics Core (Circuit Simulation, Digital Logic, Sensors & Interfacing), and Software Tools (MATLAB / Simulink, Keil uVision, Proteus). Developer of the Smart Solar Priority Power Management System with a 5-tier priority switching algorithm aligned with SDG 7 & SDG 13. Certified through NPTEL / SWAYAM (IIT & IISc), 1st Prize Winner in Green Energy, 3rd Prize Winner at P.A. College of Engineering Project Expo, and trained in PLC & Industrial Automation.",

  careerObjectiveForCV: "To begin my professional career in Electrical & Electronics Engineering, leveraging my technical proficiency in C, Java, embedded microcontrollers, circuit simulation, and renewable power management systems to deliver innovative hardware and control solutions."
};

