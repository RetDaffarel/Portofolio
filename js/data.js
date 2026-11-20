/* =====================================================================
   PORTFOLIO DATA — edit ONLY this file to fill in your website.
   Everything on the page is generated from the object below.
   ===================================================================== */

window.PORTFOLIO = {
  // ---------- Basic profile ----------
  profile: {
    name: "Ferdian Daffarel Ardibrata",
    logo: "Ferdian",                      // text in the top-left logo
    initials: "FD",                       // shown in the avatar when there is no photo
    roles: ["Full-stack Developer", "Mechatronics Engineering Student", "IoT & Embedded Developer", "Robotics Enthusiast"], // typed in hero
    tagline: "I combine hardware, interactive web interfaces, and AI into products that teachers and students actually enjoy using.",
    location: "Yogyakarta, Indonesia",
    email: "ferdiandafarel@gmail.com",
    photo: "assets/profile.png",                            // e.g. "assets/profile.jpg" — leave "" to show initials
    cv: "assets/CV-Ferdian-Daffarel-Ardibrata.pdf", // leave "" to hide the Download CV button
    available: true,                      // shows the "Open to work" badge
    accent: "#7c5cff",                    // main theme color
  },

  socials: [
    { label: "GitHub",    url: "https://github.com/RetDaffarel",               icon: "github" },
    { label: "LinkedIn",  url: "https://linkedin.com/in/ferdian-daffarel-ard", icon: "linkedin" },
    { label: "Instagram", url: "https://instagram.com/ferdian_dffarel/",       icon: "instagram" },
    { label: "Email",     url: "mailto:ferdiandafarel@gmail.com",              icon: "mail" },
  ],

  // ---------- About ----------
  about: {
    paragraphs: [
      "I'm a Mechatronics Engineering Education undergraduate at Universitas Negeri Yogyakarta (GPA 3.82). My coursework covers mechanical design with CAD (AutoCAD), electrical & electronic installation, industrial automation (PLC), microcontroller programming, pneumatics, and industrial robotics.",
      "I'm also a full-stack developer. I built RoboLearn, an educational robotics platform for K-12 students, end to end: the front end, a BLE compiler, ESP32 firmware, and a FastAPI backend. I love bridging hardware, interactive web interfaces, and AI-powered features.",
      "Before university I studied Software Engineering (RPL) at SMK Negeri 65 Jakarta, where I was vice-head of the coding club. I speak Indonesian (native) and English (advanced).",
    ],
    stats: [
      { value: 3.82, suffix: "",  label: "GPA at UNY" },
      { value: 4,    suffix: "+", label: "Years of coding" },
      { value: 4,    suffix: "+", label: "Projects built" },
    ],
  },

  // ---------- Skills (level 0–100 — rough self-estimates, adjust freely) ----------
  skills: [
    {
      group: "Front End",
      items: [
        { name: "JavaScript", level: 85 },
        { name: "HTML & CSS / Responsive", level: 90 },
        { name: "SPA & Three.js", level: 70 },
        { name: "PHP & Laravel", level: 75 },
      ],
    },
    {
      group: "Back End & Data",
      items: [
        { name: "Python", level: 85 },
        { name: "FastAPI / REST API", level: 80 },
        { name: "Firebase Auth & Firestore", level: 80 },
        { name: "MySQL", level: 75 },
      ],
    },
    {
      group: "Embedded & IoT",
      items: [
        { name: "ESP32", level: 80 },
        { name: "MicroPython", level: 80 },
        { name: "Bluetooth Low Energy (BLE)", level: 75 },
      ],
    },
    {
      group: "AI",
      items: [
        { name: "OpenAI / Gemini API", level: 80 },
        { name: "YOLO / OpenCV", level: 65 },
      ],
    },
    {
      group: "Mechatronics",
      items: [
        { name: "AutoCAD", level: 70 },
        { name: "PLC / Industrial Automation", level: 65 },
        { name: "Pneumatics", level: 65 },
        { name: "Industrial Robotics", level: 65 },
      ],
    },
  ],

  // ---------- Experience (work, projects, internships) ----------
  // type: "work" | "project" | "intern" | "volunteer"   (sets the icon)
  experience: [
    {
      type: "work",
      title: "Inspection Robot",
      org: "Hackathon Project UNY",
      period: "Present",
      description: "Handled the software and hardware integration for a robot that inspects pipelines. Developed the control system using ESP32 and implemented real-time data transmission to a web dashboard.",
    },
    {
      type: "work",
      title: "Software Developer — RoboLearn",
      org: "Educational Robotics Platform for K-12",
      period: "Mar — Jun 2025",
      description: "Built the block-based editor, BLE compiler, ESP32 MicroPython firmware, role-based dashboards, and an AI-powered quest grading backend.",
    },
    {
      type: "work",
      title: "Software Developer — Absensi HR",
      org: "Photo & time-based attendance web app",
      period: "Oct — Nov 2024",
      description: "Built an attendance/leave/sick-report system with Laravel 10 and MySQL, including manager-approved leave requests.",
    },
  ],

  // ---------- Education (schools, organizations, certifications) ----------
  // type: "education" | "org" | "award" | "course"   (sets the icon)
  education: [
    {
      type: "education",
      title: "B.Ed. Mechatronics Engineering Education",
      org: "Universitas Negeri Yogyakarta",
      period: "2025 — Present",
      description: "GPA 3.82. CAD (AutoCAD), electrical & electronics installation, PLC automation, microcontrollers, pneumatics, and industrial robotics.",
    },
    {
      type: "org",
      title: "Research & Technology Division",
      org: "UKM Fakultas Matriks — UNY",
      period: "2025 — 2026",
      description: "Member of the research and technology division of the faculty student organization.",
    },
    {
      type: "org",
      title: "Member",
      org: "UKM Catur (Chess Club) — UNY",
      period: "2025 — 2026",
      description: "Member of the university chess club.",
    },
    {
      type: "award",
      title: "BNSP Certified Junior Coder",
      org: "BNSP — Software Developer Certification",
      period: "2025",
      description: "Certified under the Junior Coder Occupational Certification Scheme (Skema Sertifikasi Okupasi Pemrogram Junior).",
    },
    {
      type: "education",
      title: "Software Engineering (RPL)",
      org: "SMK Negeri 65 Jakarta",
      period: "2022 — 2025",
      description: "Vice-head of the coding extracurricular club, leading and managing programming activities. Built a biodata website with Laravel and Tailwind.",
    },
  ],

  // ---------- Projects ----------
  // The project with featured: true is shown in the big spotlight.
  // If none is featured, the newest "date" is shown as "Latest project".
  // date:   used for sorting (YYYY-MM-DD).  period: optional text shown instead of the date.
  // status: "finished" | "in-progress"
  // image:  path to an image (e.g. "assets/projects/robolearn.png"); leave "" for a generated cover.
  // gallery: extra images shown in the detail popup.
  projects: [
    {
      title: "RoboLearn",
      featured: true,
      date: "2025-06-30",
      period: "Mar — Jun 2025",
      role: "Software Developer",
      status: "finished",
      category: "Robotics",
      summary: "Educational robotics platform for K-12 with a visual block editor, BLE robot control, and role-based dashboards.",
      description:
        "A robotics learning platform where students program a real robot with a drag-and-drop block editor and run it over Bluetooth Low Energy. I built it end to end — front end, BLE compiler, ESP32 firmware, and a FastAPI backend with AI-powered grading.",
      highlights: [
        "Stateful drag-and-drop block editor that also works on mobile (hamburger menu, responsive modals)",
        "BLE compiler + ESP32 MicroPython firmware: conditionals (IFLT/IFEND), variables & operators, servo/gripper, line-follower sensors, RUNTIL / WAITUNTIL / HALT blocks",
        "Firebase email/password auth with role-based access (admin, teacher, student), teacher invite codes, and offline-capable Firestore persistence",
        "Three separate dashboards for admins, teachers, and students",
        "AI quest grading (OpenAI/Gemini) via FastAPI, with automatic hint generation when teachers create quests",
        "Integrated the real robot's 3D model into the Robot panel, fixing mesh normals and zero-thickness geometry",
        "Started refactoring a monolithic file into 9 CSS files and separate JavaScript modules",
      ],
      tech: ["JavaScript", "HTML/CSS", "Three.js", "Firebase Auth", "Firestore", "Python", "FastAPI", "MicroPython", "ESP32", "Web Bluetooth", "OpenAI/Gemini"],
      image: "assets/robolearn.png",
      imageFit: "icon",                  // "icon" = small centred logo; leave out for full-size screenshots
      gallery: [
        "assets/projects/robolearn/robolearn-login.png",
        "assets/projects/robolearn/robolearn-dashboard.png",
        "assets/projects/robolearn/robolearn-learn.png",
        "assets/projects/robolearn/robolearn-quest.png",
      ],
      links: { demo: "https://robo-learn-nu.vercel.app", repo: "https://github.com/RetDaffarel/RoboLearn" },
    },
    {
      title: "Inspection Robot",
      date: "2026-11-01",
      period: "Present",
      role: "Software & Hardware Integration",
      status: "in-progress",
      category: "Robotics",
      summary: "Pipeline inspection robot with an ESP32 control system and real-time data streamed to a web dashboard.",
      description:
        "A hackathon project at UNY. I handle the software and hardware integration: the ESP32-based control system and real-time data transmission to a web dashboard.",
      highlights: ["ESP32 control system", "Real-time telemetry to a web dashboard"],
      tech: ["ESP32", "IoT", "Web Dashboard"],
      image: "",
      gallery: [],
      links: { demo: "", repo: "" },
    },
    {
      title: "Absensi HR",
      date: "2024-11-30",
      period: "Oct — Nov 2024",
      role: "Software Developer",
      status: "finished",
      category: "Web",
      summary: "Photo- and time-based attendance, leave, and sick-report web application.",
      description:
        "A web attendance system where employees check in with a photo and timestamp. Managers can see who is on leave today and approve leave requests directly.",
      highlights: [
        "Daily list of employees on leave, pulled live from MySQL",
        "Leave request letters handled directly by supervisors",
        "Fast, accurate photo + time check-in",
      ],
      tech: ["Laravel 10", "PHP", "MySQL", "JavaScript", "Bootstrap", "HTML/CSS"],
      image: "assets/projects/absensiHR.jpeg",
      gallery: [],
      links: { demo: "", repo: "" },
    },
    {
      title: "Biodata Website",
      date: "2024-06-01",
      period: "SMK Negeri 65 Jakarta",
      status: "finished",
      category: "Web",
      summary: "Personal biodata website built during vocational high school.",
      description: "A biodata website built with Laravel and Tailwind CSS as part of the Software Engineering (RPL) program.",
      highlights: [],
      tech: ["Laravel", "Tailwind CSS", "PHP"],
      image: "",
      gallery: [],
      links: { demo: "", repo: "" },
    },
    {
      title: "Personal Portfolio",
      date: "2026-11-20",
      status: "finished",
      category: "Web",
      summary: "This website! Interactive, data-driven, zero dependencies.",
      description:
        "A portfolio framework where all content lives in one data file. Features project filtering, search, detail popups, theme switching, and scroll animations.",
      highlights: ["No build step", "Light & dark theme", "Fully responsive"],
      tech: ["HTML", "CSS", "JavaScript"],
      image: "assets/portofolio.png",
      gallery: [],
      links: { demo: "", repo: "https://github.com/RetDaffarel" },
    },
  ],

  // ---------- Contact ----------
  contact: {
    heading: "Let's build something together",
    text: "Looking for a developer for robotics, IoT, or web projects — or have an internship opportunity? My inbox is always open.",
    // The form opens the visitor's email app (no server needed).
    // Want real form submissions? Create a free form at https://formspree.io and paste its URL here:
    formEndpoint: "",
  },
};
