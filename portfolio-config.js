/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     ABDULRAHMAN ATEF ALFEQY — PORTFOLIO CONFIG FILE      ║
 * ║  Edit ONLY this file to update your portfolio details.   ║
 * ║  All changes here automatically reflect in the website.  ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const PORTFOLIO_CONFIG = {

  // ──────────────────────────────────────────
  // 👤 BASIC PROFILE
  // ──────────────────────────────────────────
  profile: {
    name:            "Abdulrahman Alfeqy",
    title:           "AI & Machine Learning Engineer",
    company:         "Self-Employed",
    tagline:         "Agentic AI & LLM Integration ⚡ Data Engineering ⚡ Full-Stack Django",
    heroContext:     "Third-year B.Sc. AI student at Menofia University · Open to freelance & AI/ML opportunities",
    resumeUrl:       "assets/resume.pdf",
    level:           3,
    location:        "Menofia, Egypt 🇪🇬",
    status:          "Open to Freelance & AI/ML Opportunities",
    avatar:          "images/avatar_warrior.png",
    avatarEmoji:     "⚔️",
    bio:             "Third-year B.Sc. Artificial Intelligence student at Menofia University (Machine Intelligence) with a 3.16/4.0 GPA and an upward trend (3.59 latest semester). Builds agentic AI systems, retrieval-augmented reasoning pipelines, predictive ML models, full-stack Django applications, and end-to-end BI solutions. Currently studying through the University of Tokyo GCI World program and a fully funded BHN Academy scholarship with DataCamp.",
    creed:           "I build grounded AI agents, useful software, and analytical systems that solve real problems — and keep learning with every quest.",
    careerStart:     "2026",
    projectsShipped: "10+",
    techStackSize:   "30+ Tools",
    githubRepos:     "7",
    clientRating:    "5/5",
    languages:       [
      "Arabic — Native",
      "English — Upper-Intermediate / Advanced (Professional Working Proficiency)",
      "French — Intermediate",
      "Japanese — Beginner",
      "German — Beginner",
    ],
  },

  // ──────────────────────────────────────────
  // 📡 CONTACT & SOCIAL LINKS
  // ──────────────────────────────────────────
  contact: {
    linkedin:      "https://www.linkedin.com/in/abdulrahman-alfeqy",
    github:        "https://github.com/Abdulrahman-Alfeqy",
    credly:        "https://credly.com/users/abdulrahman-atef",
    email:         "abdulrahmanalfky@gmail.com",
    academicEmail: "abdalrahaman.atef432024@ai.menofia.edu.eg",
    phone:         "+20 1157504456",
    kafiil:        "https://kafiil.com/u/Abdulrahman_Alfeqy",
  },

  // ──────────────────────────────────────────
  // ⚡ SKILLS (grouped by applied area; no unsupported percentage scores)
  // ──────────────────────────────────────────
  skills: [
    {
      group: "AI & MACHINE LEARNING",
      items: ["Agentic AI", "LLM Integration", "RAG", "Multi-Step Reasoning", "Scikit-Learn", "Feature Engineering", "OpenCV", "EasyOCR", "Hugging Face", "SMOTE"]
    },
    {
      group: "DATA & BUSINESS INTELLIGENCE",
      items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "DAX", "Power Query / M", "Tableau", "Advanced Excel", "Power Pivot", "ETL", "Star / Snowflake Schema"]
    },
    {
      group: "SOFTWARE & BACKEND",
      items: ["Django", "Flask", "JavaScript", "HTML5", "CSS3", "C++", "Java / JADE", "Bash", "REST APIs", "SQL", "PostgreSQL", "SQL Server", "Oracle 11g"]
    },
    {
      group: "AGENT PLATFORMS & ENGINEERING TOOLS",
      items: ["Azure AI Projects SDK", "Foundry IQ", "FastMCP", "Google Gemini API", "OpenRouter", "Groq", "GitHub Models", "Prompt Engineering", "Responsible AI", "Docker", "Cloudflare Tunnels", "Linux", "Git / GitHub", "Slack Bolt", "Streamlit"]
    }
  ],

  // ──────────────────────────────────────────
  // 💼 WORK EXPERIENCE
  // ──────────────────────────────────────────
  experience: [
    {
      icon:    "💻",
      title:   "Freelance Data Analyst & Full-Stack Developer",
      company: "Self-Employed · Egypt (Remote)",
      date:    "May 2026 - Present",
      desc:    "Deliver BI and data-engineering solutions for retail, finance, and operations using automated Power Query ETL, Star Schema models, Power BI dashboards, and DAX time intelligence (YoY, QoQ, rolling 12-month). Built and deployed Honor Board for Al-Wahhab Center for Quran Memorization through Kafiil (Sep–Oct 2026): a responsive, branch-filterable Django/PostgreSQL student display and secure weekly-update admin panel. Delivered on schedule and earned a 5/5 client rating."
    },
    {
      icon:    "🤖",
      title:   "Machine Learning Engineering Intern",
      company: "FlyRank AI · Remote",
      date:    "Jul 1 - Sep 23, 2026 · 12 weeks",
      desc:    "Completed FlyRank AI’s intensive 12-week ML engineering internship under CEO Alen Malkoc. Worked on model evaluation, feature engineering, production-grade pipeline architecture, and end-to-end ML pipeline design across heterogeneous datasets."
    },
    {
      icon:    "🌐",
      title:   "Web Development Trainee",
      company: "Information Technology Institute (ITI), CREATIVA Menofia",
      date:    "Jul 9 - Aug 30, 2026 · 126 hours",
      desc:    "Completed Web Development using Python & Generative AI: client-side technologies (42h), PostgreSQL (18h), Python OOP (24h), Django (24h), Generative AI and prompt engineering (6h), vibe coding (6h), and freelancing (6h). Applied the stack in CARVIX and the Honor Board client project."
    },
    {
      icon:    "📊",
      title:   "Data Analysis Trainee",
      company: "National Telecommunication Institute (NTI)",
      date:    "Apr - May 2026 · 90+ contact hours",
      desc:    "Completed applied training across the analytical workflow at a nationally accredited telecom institute. Built reporting and data workflows using Microsoft SQL Server, relational database fundamentals, Python (Pandas, Matplotlib), Power BI, DAX, Tableau, and advanced Excel."
    }
  ],

  // ──────────────────────────────────────────
  // 🏗 PROJECTS
  // ──────────────────────────────────────────
  projects: [
    {
      name: "🛡️ Cyber-Intel AI Agent",
      desc: "Microsoft Agents League submission for enterprise security. Built on Azure AI Projects SDK with Foundry IQ retrieval-augmented generation to ground policy decisions and automate Tier-1 incident response. FastMCP threat-intelligence tools run over Cloudflare Quick Tunnels (SSE / streamable HTTP) with human approval and no static infrastructure.",
      tags: ["Python", "Azure AI Projects SDK", "Foundry IQ", "FastMCP", "Cloudflare Tunnels"],
      link: "https://github.com/Abdulrahman-Alfeqy/cyber-intel-agent"
    },
    {
      name: "🕵️ AgentZero — Slack Credential Leak Detection",
      desc: "Real-time Slack security agent combining regex and AI semantic detection for 15+ credential and sensitive-data patterns. Includes a Flask/Chart.js compliance dashboard, deduplicated alerts, false-positive feedback, failover across four AI providers, audit slash commands, PDF reports, and an MCP server.",
      tags: ["Python", "Slack Bolt", "FastMCP", "Flask", "Google GenAI", "Docker"],
      link: "https://github.com/Abdulrahman-Alfeqy/AgentZero"
    },
    {
      name: "🏠 HouseHub+ — AI Public Housing Allocation",
      desc: "USAII Global AI Hackathon anti-fraud housing system (63/70). A RandomForestRegressor scores applicant housing need from 0–100; OpenCV document inspection, SHA-256 PII hashing, and dual citizen/admin portals support safer eligibility review.",
      tags: ["Python", "Scikit-Learn", "Streamlit", "OpenCV", "EasyOCR", "Folium"],
      link: "https://github.com/Abdulrahman-Alfeqy/HouseHub-"
    },
    {
      name: "🚗 CARVIX — Smart Vehicle Maintenance",
      desc: "Full-stack, role-based vehicle maintenance platform for Owners, Technicians, and Administrators, covering vehicles, maintenance, appointments, technician workflows, and spare-parts inventory. Uses Django MVT with service and selector layers, PostgreSQL, demo data, automated tests, and a Gemini assistant restricted to each user’s permissions.",
      tags: ["Python", "Django", "PostgreSQL", "Google Gemini API", "Docker"],
      link: "https://github.com/Abdulrahman-Alfeqy/carvix-smart-maintenance"
    },
    {
      name: "🏅 Honor Board — Quran Center Student Recognition",
      desc: "Client-delivered application for Al-Wahhab Center for Quran Memorization. Responsive, branch-filterable student display following the center’s visual identity, plus a secure admin panel for weekly record updates. Delivered on schedule with a 5/5 client rating.",
      tags: ["Python", "Django", "PostgreSQL", "Full-Stack", "Kafiil Client Project"],
      link: ""
    },
    {
      name: "🛒 FOODMART — Multi-Year Retail Intelligence",
      desc: "Automated ETL and Star Schema consolidating 270,000+ retail records across 19 stores in the USA, Mexico, and Canada. YoY, QoQ, and rolling-12-month measures cut month-end reconciliation time by 70%.",
      tags: ["Power BI", "Power Query / M", "DAX", "Star Schema", "ETL"],
      link: ""
    },
    {
      name: "🛍️ Olist E-Commerce Analysis — Delivery & Customer Insights",
      desc: "Cleaned and analyzed 98,199 eligible Brazilian marketplace orders (2016–2018), covering 94,983 customers and BRL 13.49M in product revenue. Late deliveries were 6.8% of orders and averaged 2.27/5 reviews versus 4.29 for on-time deliveries; only 3% of customers ordered again. Includes safe multi-table joins, data-quality checks, 12 charts, and retention and logistics recommendations.",
      tags: ["Python", "Pandas", "Jupyter", "Matplotlib", "EDA", "Data Cleaning"],
      link: "https://github.com/Abdulrahman-Alfeqy/olist-ecommerce-analysis"
    },
    {
      name: "📊 METRICALIST — Mobile Game Monetization",
      desc: "Player-monetization analytics with Power Query ingestion, Whale/Dolphin/Minnow segmentation, ARPU and payer-conversion measures, and cohort-retention matrices comparing country and game genre.",
      tags: ["Power BI", "DAX", "Power Query", "Cohort Analysis"],
      link: ""
    },
    {
      name: "📈 Executive Financial Reporting",
      desc: "Interactive executive reporting environment built in Microsoft Excel using Power Pivot, advanced DAX, and custom interface design.",
      tags: ["Advanced Excel", "Power Pivot", "DAX"],
      link: ""
    },
    {
      name: "⚙️ Automated ML Evaluation Pipeline",
      desc: "Five-module system automating dataset ingestion, preprocessing, multi-algorithm classification, and reporting with SMOTE imbalance correction — reducing manual model evaluation from hours to a single run.",
      tags: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "SMOTE"],
      link: ""
    },
    {
      name: "📊 ML Studio — Interactive ML Web App",
      desc: "No-code ML experimentation app for CSV/Excel upload, EDA and correlation heatmaps, preprocessing, seven classification algorithms, regression, and K-Means clustering.",
      tags: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-Learn", "imbalanced-learn"],
      link: "https://github.com/Abdulrahman-Alfeqy/ML_Project"
    },
    {
      name: "🤖 Multi-Agent System (JADE)",
      desc: "Java multi-agent systems with autonomous behaviours and inter-agent communication using Sender/Receiver agents and ACL messages.",
      tags: ["Java", "JADE", "Multi-Agent Systems"],
      link: ""
    },
  ],

  // ──────────────────────────────────────────
  // ✍️ FREELANCE PROFILES
  // ──────────────────────────────────────────
  freelanceProfiles: [
    {
      title: "Mostaql",
      desc:  "Independent projects and professional services on Mostaql.",
      date:  "Active",
      link:  "https://mostaql.com/u/A_A_Alfeqy",
      tags:  []
    },
    {
      title: "Khamsat",
      desc:  "Freelance services and gigs on Khamsat.",
      date:  "Active",
      link:  "https://khamsat.com/user/a_a_fky",
      tags:  []
    },
    {
      title: "Nafezly",
      desc:  "Freelance profile and services on Nafezly.",
      date:  "Active",
      link:  "https://nafezly.com/u/Abdulrahman_Alfeqy",
      tags:  []
    },
    {
      title: "Kafiil",
      desc:  "Freelance profile and client projects on Kafiil.",
      date:  "Active",
      link:  "https://kafiil.com/u/Abdulrahman_Alfeqy",
      tags:  []
    },
    {
      title: "Freelancer",
      desc:  "Projects and bids on Freelancer.",
      date:  "Active",
      link:  "https://www.freelancer.com/u/AbdulrahmanAteff",
      tags:  []
    },
    {
      title: "Freelance Yard",
      desc:  "Freelance profile on Freelance Yard.",
      date:  "Active",
      link:  "https://freelanceyard.com/en/freelancers/abdulrahman-atef-2",
      tags:  []
    },
  ],

  // ──────────────────────────────────────────
  // 🎓 EDUCATION, TRAINING & CERTIFICATIONS
  // ──────────────────────────────────────────
  education: [
    {
      icon:   "🏛️",
      degree: "B.Sc. Artificial Intelligence — Machine Intelligence",
      school: "Menofia University, Faculty of Artificial Intelligence",
      year:   "2024-2028 · Third Year",
      desc:   "Cognitive Security & Threat Intelligence track. GPA: 3.16/4.0 (Very Good), with 72 credits earned and a 3.59 latest-semester GPA. Grades include Data Science & Analytics 100% (A+), Computer Networks 95% (A+), Programming for Data Science 94% (A), Oracle Database Systems 88% (A−), Introduction to ML 87% (A−), and Digital Image Processing 85% (A−). Fall 2026 coursework: Deep Learning, Computer Vision, Robotics, Logic Programming, Automata & Complexity Theory, and Cybersecurity Fundamentals."
    },
    {
      icon:   "🌏",
      degree: "GCI World 2026 — In Progress",
      school: "Matsuo & Iwasawa Laboratory, The University of Tokyo (Omnicampus)",
      year:   "Sep 2026 - Present",
      desc:   "Online data science and AI program for international students."
    },
    {
      icon:   "🎓",
      degree: "BDIF Fully Funded Scholarship — In Progress",
      school: "BHN Academy (Bechem Humanitarian Network e.V.) with DataCamp, Google & Coursera",
      year:   "Oct 2026 - Present",
      desc:   "Enrolled in a six-month, self-paced professional certification program; DataCamp courses unlocked."
    },
    {
      icon:   "🌐",
      degree: "Web Development using Python & Generative AI · 126 hours",
      school: "Information Technology Institute (ITI), CREATIVA Menofia",
      year:   "Jul 9 - Aug 30, 2026",
      desc:   "Client-side technologies, PostgreSQL, Python OOP, Django, Generative AI and prompt engineering, vibe coding, and freelancing."
    },
    {
      icon:   "☁️",
      degree: "Machine Learning Foundations & Learning Plan",
      school: "Amazon Web Services (AWS) / AWS Educate",
      year:   "Jul-Sep 2025",
      desc:   "AWS Educate Machine Learning Foundations badge; ML Learning Plan, ML Essentials for Business & Technical Decision Makers, Planning a Machine Learning Project, ML Terminology and Process, and Art of the Possible."
    },
    {
      icon:   "📜",
      degree: "Python & Machine Learning Certificates",
      school: "DataCamp",
      year:   "Jun-Aug 2026",
      desc:   "Introduction to Python, Intermediate Python, Supervised Learning with scikit-learn, and Unsupervised Learning in Python."
    },
    {
      icon:   "🤖",
      degree: "AI Skills Fest 2026",
      school: "Microsoft",
      year:   "Jun 2026",
      desc:   "AI Ethics, AI Literacy, Applied AI, Prompt Engineering, Responsible AI, and Workflow Automation."
    },
    {
      icon:   "🛡️",
      degree: "Cybersecurity, Linux & Programming Certificates",
      school: "Satr / Tuwaiq Academy",
      year:   "2024-Apr 2026 · Sep 2026",
      desc:   "Introduction to Cybersecurity, Linux 101, Linux Files and Permissions, Kali Linux, Secure Shell (SSH) 101, Threats, Attacks & Vulnerabilities, C++ 101, Python 101, and Intro to Programming."
    }
  ],

  specializations: [
    { icon: "🤖", name: "AI & ML ENGINEER",  desc: "Predictive ML, LLM integration & grounded agents" },
    { icon: "🌐", name: "AGENTIC AI",        desc: "RAG, multi-step reasoning & multi-agent systems" },
    { icon: "🏗",  name: "FULL-STACK DJANGO", desc: "Python, Django, PostgreSQL & REST APIs" },
    { icon: "📊", name: "DATA & BI",          desc: "ETL, dimensional models, Power BI & DAX" },
    { icon: "📝", name: "FREELANCER",         desc: "Active across six freelance platforms" },
  ],

  // ──────────────────────────────────────────
  // 🏆 ACHIEVEMENTS
  // ──────────────────────────────────────────
  achievements: [
    { icon: "🛡️", name: "MICROSOFT AGENTS LEAGUE", desc: "June 2026 individual submission: agentic AI for enterprise security" },
    { icon: "🌐", name: "USAII GLOBAL AI HACKATHON", desc: "Public-sector AI & ML fraud detection · team of four · 63/70" },
    { icon: "🏅", name: "REASONING AGENTS BADGE", desc: "Global AI Community · Microsoft Foundry · July 2026" },
    { icon: "🎓", name: "AI SCHOLAR", desc: "Menofia University AI student · GPA 3.16/4.0 · 3.59 latest semester" },
    { icon: "🌐", name: "ITI WEB DEVELOPMENT", desc: "Completed intensive 126-hour Python, Django & Generative AI program" },
    { icon: "💼", name: "CLIENT PROJECT DELIVERED", desc: "Honor Board delivered on schedule · client rating 5/5" },
  ],

};
