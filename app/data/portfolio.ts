// app/data/portfolio.ts

export const portfolioData = {
  personal: {
    name: "Risman Sambeiga",
    firstName: "Risman",
    lastName: "Sambeiga",
    title: "Full Stack Developer",
    tagline: "Building scalable, elegant & high-performance software solutions",
    location: "Bekasi, Indonesia",
    email: "sambeigarisman@gmail.com",
    phone: "082114050533",
    linkedin: "https://www.linkedin.com/in/risman-sambeiga-0000a8377/",
    github: "https://github.com/risman-sambeiga",
    available: true,
    summary:
      "Junior Software Developer with 2+ years of experience in Full Stack Development. Skilled in .NET Framework, React.js, React Native, Java, and PHP. Experienced in developing web & mobile applications, building REST API integrations, managing Microsoft SQL Server, and creating interactive reports using SSRS. Strong in problem-solving, logical thinking, and quickly adapting to new technologies.",
  },

  stats: [
    { label: "Years Experience", value: "2+", suffix: "" },
    { label: "Users Served", value: "5K", suffix: "+" },
    { label: "Reports Built", value: "10", suffix: "+" },
    { label: "Tech Debt Reduced", value: "20", suffix: "%" },
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 80, years: "2yr" },
      { name: "React Native", level: 75, years: "1yr" },
      { name: "HTML / CSS", level: 85, years: "3yr" },
    ],
    backend: [
      { name: ".NET Framework", level: 85, years: "2yr" },
      { name: "REST API Design", level: 85, years: "2yr" },
      { name: "Java", level: 70, years: "1yr" },
      { name: "PHP", level: 72, years: "1yr" },
    ],
    data: [
      { name: "MS SQL Server", level: 80, years: "2yr" },
      { name: "SSRS Reports", level: 78, years: "2yr" },
    ],
    tools: [
      { name: "Git / Version Control", level: 78, years: "2yr" },
      { name: "Visual Studio", level: 82, years: "2yr" },
    ],
  },

  techStack: [
    { name: ".NET", icon: "⚙️", color: "#512BD4" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "React Native", icon: "📱", color: "#61DAFB" },
    { name: "Java", icon: "☕", color: "#ED8B00" },
    { name: "PHP", icon: "🐘", color: "#8892BF" },
    { name: "SQL Server", icon: "🗄️", color: "#CC2927" },
    { name: "SSRS", icon: "📊", color: "#0078D4" },
    { name: "REST API", icon: "🔌", color: "#00D4FF" },
  ],

  experience: [
    {
      id: "exp-1",
      role: "Software Developer",
      company: "PT. Focus Inti Solusi",
      period: "June 2023 – Present",
      duration: "2+ years",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      description:
        "Full stack development of enterprise web and mobile applications. Led performance optimization initiatives, built scalable REST APIs serving thousands of users monthly, and developed comprehensive reporting solutions using SSRS.",
      highlights: [
        "Increased application performance by 35% through code optimization and caching strategies",
        "Developed 10+ interactive SSRS reports improving data accessibility across departments",
        "Built REST APIs consumed by 5,000+ monthly active users",
        "Reduced technical debt by 20% via systematic code reviews and refactoring",
        "Collaborated in agile development cycles delivering features on schedule",
      ],
      tech: [".NET Framework", "React.js", "React Native", "MS SQL Server", "SSRS", "REST API"],
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor's Degree — Informatics",
      institution: "Universitas Indraprasta PGRI (UNINDRA)",
      period: "January 2022 – January 2026",
      location: "Jakarta, Indonesia",
      status: "In Progress",
      gpa: "On Track",
      focus: "Software Engineering & Information Systems",
    },
  ],

  achievements: [
    {
      id: "ach-1",
      icon: "⚡",
      metric: "35%",
      label: "Performance Boost",
      description:
        "Led optimization project that increased application performance by 35%, directly enhancing user experience and system throughput.",
      category: "Performance",
    },
    {
      id: "ach-2",
      icon: "📊",
      metric: "10+",
      label: "Reports Delivered",
      description:
        "Developed 10+ interactive SSRS reports, transforming raw data into actionable business intelligence dashboards.",
      category: "Data",
    },
    {
      id: "ach-3",
      icon: "🔌",
      metric: "5K+",
      label: "Monthly API Users",
      description:
        "Engineered REST APIs that reliably serve 5,000+ monthly users with high availability and seamless integration.",
      category: "Scale",
    },
    {
      id: "ach-4",
      icon: "🛠",
      metric: "20%",
      label: "Tech Debt Reduced",
      description:
        "Systematically reduced technical debt by 20% through rigorous code reviews, refactoring, and documentation.",
      category: "Quality",
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Enterprise Web Application",
      description:
        "Full-stack enterprise web application built with .NET Framework backend and React.js frontend. Features complex business logic, role-based access control, and real-time data processing.",
      tech: [".NET Framework", "React.js", "SQL Server", "REST API"],
      type: "Web App",
      status: "Production",
      highlight: "35% performance improvement",
    },
    {
      id: "proj-2",
      title: "Mobile Application Suite",
      description:
        "Cross-platform mobile application built with React Native, enabling field teams to access enterprise data and submit reports from anywhere.",
      tech: ["React Native", "REST API", "SQL Server"],
      type: "Mobile",
      status: "Production",
      highlight: "5,000+ monthly users",
    },
    {
      id: "proj-3",
      title: "SSRS Reporting Dashboard",
      description:
        "Comprehensive suite of 10+ interactive SSRS reports providing executive-level insights, KPI tracking, and drill-down capabilities for data-driven decisions.",
      tech: ["SSRS", "SQL Server", "T-SQL"],
      type: "Reporting",
      status: "Production",
      highlight: "10+ interactive reports",
    },
    {
      id: "proj-4",
      title: "REST API Platform",
      description:
        "Scalable REST API platform serving multiple client applications. Designed with security, performance, and maintainability at the forefront, supporting high-concurrency workloads.",
      tech: [".NET Framework", "SQL Server", "REST API"],
      type: "API",
      status: "Production",
      highlight: "High availability architecture",
    },
  ],

  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type PortfolioData = typeof portfolioData;
