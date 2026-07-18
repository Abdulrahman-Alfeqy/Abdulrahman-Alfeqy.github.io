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
    title:           "Machine Learning Developer & Data Analyst",
    company:         "FlyRank AI",
    tagline:         "Data Engineering ⚡ Predictive Modeling ⚡ Business Intelligence",
    level:           "LVL 2 AI ENGINEER",
    location:        "Egypt 🇪🇬",
    status:          "Open to Freelance & Roles",
    avatar:          "images/avatar_warrior.png",
    avatarEmoji:     "⚔️",
    bio:             "End-to-end data practitioner with academic specialization in Artificial Intelligence and hands-on experience engineering complete analytical systems — from raw source ingestion through automated ETL processes, dimensional data modeling, predictive machine learning pipelines, and production-grade business intelligence dashboards.",
    creed:           "Motivated, hard-working, and ambitious — driven to build intelligent systems and robust AI models. Always learning, always building.",
    yearsExp:        "2+",
    projectsShipped: "10+",
    techStackSize:   "15+ Tools",
    githubRepos:     "8",
    mediumFollowers: "5+", // Repurposed for Freelance Profiles
  },

  // ──────────────────────────────────────────
  // 📡 CONTACT & SOCIAL LINKS
  // ──────────────────────────────────────────
  contact: {
    linkedin:   "https://www.linkedin.com/in/abdulrahman-atef-424710337",
    github:     "https://github.com/Abdulrahman-Alfeqy",
    twitter:    "",
    medium:     "https://khamsat.com/user/a_a_fky",
    buymeacoffee: "",
    kofi:       "",
    twitch:     "",
    website:    "",
    email:      "abdulrahmanalfky@gmail.com",
    phone:      "(+20) 01157504456",

    // ── CONTACT FORM (Formspree) ──────────────────────────────────
    formspreeUrl: "https://formspree.io/f/yourendpoint",
  },

  // ──────────────────────────────────────────
  // ⚡ SKILLS (name + proficiency 0–100)
  // ──────────────────────────────────────────
  skills: [
    { name: "Power BI / DAX",  pct: 95 },
    { name: "Python / Pandas", pct: 95 },
    { name: "Scikit-Learn",    pct: 90 },
    { name: "SQL / Oracle 11g",pct: 90 },
    { name: "Advanced Excel",  pct: 95 },
    { name: "Streamlit",       pct: 85 },
    { name: "Data Modeling",   pct: 90 },
    { name: "ETL Pipelines",   pct: 85 },
    { name: "Agentic Systems", pct: 85 },
    { name: "C++ (OOP)",       pct: 80 },
    { name: "Java (JADE)",     pct: 80 },
    { name: "AWS / Cloud",     pct: 75 },
  ],

  techTags: [
    "Power BI", "DAX", "Power Query", "Advanced Excel", "Power Pivot",
    "Python", "Scikit-Learn", "Pandas", "NumPy", "Streamlit",
    "SQL", "Oracle 11g", "Data Modeling", "ETL Pipelines", "Agentic Systems", "AWS"
  ],

  // ──────────────────────────────────────────
  // 💼 WORK EXPERIENCE
  // ──────────────────────────────────────────
  experience: [
    {
      icon:    "🤖",
      title:   "Machine Learning Engineer",
      company: "FlyRank AI",
      date:    "Jul 2026 - Present",
      desc:    "Selected for an intensive ML engineering track focused on production-grade pipeline architecture and model evaluation — building commercial Applied AI experience."
    },
    {
      icon:    "🎓",
      title:   "Data Analytics Trainee",
      company: "NTI (National Telecommunication Institute)",
      date:    "Apr - May 2026",
      desc:    "Completed 120-hour intensive training program (90 technical, 30 freelance). Gained hands-on experience in Microsoft SQL Server, Excel, Power BI, Tableau, and Python."
    },
    {
      icon:    "💻",
      title:   "Data Analyst & ML Developer",
      company: "Freelance",
      date:    "May 2026 - Present",
      desc:    "Delivered BI and data engineering solutions — ETL pipelines, Power BI dashboards, and dimensional data models — across heterogeneous client datasets in retail, finance, and operations sectors."
    }
  ],

  // ──────────────────────────────────────────
  // 🏗 PROJECTS
  // ──────────────────────────────────────────
  projects: [
    {
      name: "📊 METRICALIST: Mobile Game Analytics",
      desc: "Power BI Dashboard. Transformed raw in-app purchase data into a structured monetization intelligence system using advanced DAX and Power Query.",
      tags: ["Power BI", "DAX", "Power Query"],
      link: ""
    },
    {
      name: "🛒 FOODMART: Retail Sales System",
      desc: "Multi-Source Retail Intelligence System. Designed Star Schema and automated ETL pipelines for multi-year transactional data.",
      tags: ["Power BI", "Star Schema", "ETL"],
      link: ""
    },
    {
      name: "📈 Executive Financial Reporting",
      desc: "Interactive executive reporting environment built entirely within Microsoft Excel using Power Pivot and advanced UI engineering.",
      tags: ["Advanced Excel", "Power Pivot", "DAX"],
      link: ""
    },
    {
      name: "🛡️ Cyber-Intel AI Agent",
      desc: "Agentic AI for Enterprise Security submitted to Microsoft Agents League Hackathon. Enforces corporate security policies via Foundry IQ retrieval with live cloud threat intelligence.",
      tags: ["Python", "Azure AI", "FastMCP", "Agentic Systems"],
      link: "https://github.com/Abdulrahman-Alfeqy/cyber-intel-agent"
    },
    {
      name: "🕵️‍♂️ Agent Zero",
      desc: "Real-time credential leak detection and remediation for Slack. Hybrid regex and AI semantic detection.",
      tags: ["Python", "Slack API", "Gemini AI", "FastMCP"],
      link: "https://github.com/Abdulrahman-Alfeqy/AgentZero"
    },
    {
      name: "📊 ML Studio",
      desc: "A sleek, interactive Machine Learning web application built with Streamlit. Allows dataset upload, EDA, and training multiple ML models.",
      tags: ["Python", "Streamlit", "Scikit-Learn", "Pandas"],
      link: "https://github.com/Abdulrahman-Alfeqy/ML_Project"
    },
    {
      name: "🏠 HouseHub+",
      desc: "Anti-Fraud Public Housing Allocation System built for the USAII Global AI Hackathon (Scored 63/70). Combines deterministic ML scoring with Computer Vision forgery detection (PrivacyShield, DocumentInspector, RankingEngine).",
      tags: ["Python", "Streamlit", "Scikit-Learn", "OpenCV"],
      link: "https://github.com/Abdulrahman-Alfeqy/HouseHub-"
    },
    {
      name: "⚙️ Automated ML Evaluation Pipeline",
      desc: "End-to-end Python ML pipeline automation reducing manual evaluation time to a single run. Includes dataset ingestion, preprocessing, classification, and SMOTE.",
      tags: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "SMOTE"],
      link: ""
    },

    {
      name: "🤖 Multi-Agent System (JADE)",
      desc: "Developed multi-agent systems using JADE, including autonomous behaviours and inter-agent communication using Sender/Receiver agents with ACL messages.",
      tags: ["Java", "JADE", "Multi-Agent"],
      link: ""
    },
  ],

  // ──────────────────────────────────────────
  // ✍️ BLOG POSTS (Medium — @thecodebean) -> Repurposed to Freelance Profiles
  // ──────────────────────────────────────────
  blogPosts: [
    {
      title: "Khamsat Profile",
      desc:  "Freelance services and gigs on Khamsat platform.",
      date:  "Active",
      link:  "https://khamsat.com/user/a_a_fky"
    },
    {
      title: "Fiverr Profile",
      desc:  "Global freelance services on Fiverr.",
      date:  "Active",
      link:  "https://www.fiverr.com/sellers/a_a_fky"
    },
    {
      title: "Freelance Yard",
      desc:  "Freelance profile on Freelance Yard.",
      date:  "Active",
      link:  "https://freelanceyard.com/en/freelancers/abdulrahman-atef-2"
    },
    {
      title: "Freelancer.com",
      desc:  "Projects and bids on Freelancer.",
      date:  "Active",
      link:  "https://www.freelancer.com/u/AbdulrahmanAteff"
    },
    {
      title: "Mostaql Profile",
      desc:  "Independent projects on Mostaql.",
      date:  "Active",
      link:  "https://mostaql.com/u/A_A_Alfeqy"
    },
  ],

  // ──────────────────────────────────────────
  // 🎓 EDUCATION
  // ──────────────────────────────────────────
  education: [
    {
      icon:   "🏛️",
      degree: "BSc in Artificial Intelligence",
      school: "Menoufia University (Machine Intelligence Dept.)",
      year:   "2024-2028",
      desc:   "GPA: 3.59 (Semester) / 3.16 (Cumulative). Studied: Data Science & Analytics (A+), Computer Networks (A+), Intro to ML (A-), Database Systems (A-). Programmed Algorithms, OOP, and Structured logic in C++. Explored AI Principles in Java. Built Data Science models in Python and Oracle SQL."
    },
    {
      icon:   "☁️",
      degree: "AWS Machine Learning Foundations",
      school: "Amazon Web Services (AWS)",
      year:   "Jul 2025",
      desc:   "Completed Art of the Possible, ML Learning Plan, Terminology and Process, Planning ML Projects, and ML Essentials for Business/Technical Decision Makers."
    },
    {
      icon:   "📜",
      degree: "Python Data Science Track",
      school: "DataCamp",
      year:   "Jun - Jul 2026",
      desc:   "Earned 'Intermediate Python' (Jul 2026) and 'Introduction to Python' (Jun 2026) certifications focusing on Pandas, NumPy, and core data engineering."
    },
    {
      icon:   "🛡️",
      degree: "CyberSecurity & Linux",
      school: "Satr / Tuwaiq Academy",
      year:   "Apr 2026",
      desc:   "Completed Intro to CyberSecurity, Kali Linux Intro, Linux 101, and Linux: Files And Permissions."
    },
    {
      icon:   "🤖",
      degree: "AI Skills Fest 2026",
      school: "Microsoft",
      year:   "Jun 2026",
      desc:   "Credentialed in AI Ethics, AI Literacy, Prompt Engineering, and Workflow Automation."
    }
  ],

  specializations: [
    { icon: "🤖", name: "AI ENGINEER",       desc: "Machine Learning & Deep Learning" },
    { icon: "🌐", name: "AGENTIC SYSTEMS",   desc: "Multi-Agent workflows & JADE" },
    { icon: "🏗",  name: "PYTHON EXPERT",     desc: "Data Science & Backend" },
    { icon: "📝", name: "FREELANCER",        desc: "Active across 5 platforms" },
  ],

  // ──────────────────────────────────────────
  // 🏆 ACHIEVEMENTS
  // ──────────────────────────────────────────
  achievements: [
    { icon: "🤖", name: "ML ENGINEER",       desc: "Working at FlyRank AI" },
    { icon: "🌐", name: "USAII HACKATHON",   desc: "Global AI Hackathon 2026 (Scored 63/70)" },
    { icon: "🏆", name: "MS AGENTS LEAGUE",  desc: "Microsoft Hackathon 2026 Submission" },
    { icon: "🎓", name: "AI SCHOLAR",        desc: "Excellent GPA in AI Faculty" },
    { icon: "📜", name: "CERTIFIED",         desc: "DataCamp, AWS & Microsoft Certifications" },
    { icon: "💼", name: "FREELANCE PRO",     desc: "Top rated across platforms" },
  ],

};
