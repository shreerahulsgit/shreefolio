import {
  SiJavascript,
  SiMysql,
  SiReact,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiAmazonwebservices,
  SiGithub,
} from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const experiences = [
  {
    role: "Web Development Intern",
    organization: "CIT Chennai",
    duration: "Nov 2025 - Dec 2025",
    description: "Built a full-on college web app with a squad of 4 (group project but make it real). Handled features like attendance, seating arrangements, lab occupancy, and timetable generation — basically turned college chaos into one sol.",
    techStack: ["React", "JavaScript", "Python: Fast API", "MySQL", "Git"],
    xp: {
      learning: 8,
      stress: 10,
      satisfaction: 8,
    },
  },
  {
    role: "Research Intern",
    organization: "CIT Chennai",
    duration: "Apr 2025 – May 2025",
    description: "Entered my big-brain era.Reviewed energy-efficient cloud computing methods — VM migration, energy-aware scheduling, forecasting models, and renewable energy integration (saving clouds AND the planet fr ).Explored a Kubernetes-based Multi-Objective Reinforcement Learning framework to optimize cost and SLA across AWS, Azure, and GCP.Yes, it was complex. Yes, I survived.",
    techStack: ["React", "Express.js", "MySQL", "Firebase"],
    xp: {
      learning: 6,
      stress: 8,
      satisfaction: 7,
    },
  },
  {
    role: "UI/UX & Frontend Intern",
    organization: "Altruisty",
    duration: "Nov 2024 – Jan 2025",
    description: "Completed a 2-month internship with a strong focus on UI/UX design within frontend development. Crafted clean, user-friendly interfaces while understanding how frontend decisions connect with backend logic (designing responsibly fr).",
    techStack: ["Figma", "HTML", "CSS", "JavaScript"],
    xp: {
      learning: 9,
      stress: 5,
      satisfaction: 9,
    },
  },
  {
    role: "Web Development Intern",
    organization: "Smart Qart",
    duration: "Nov 2024 – Dec 2024",
    description: "Got hands-on with the real e-commerce dev grind.Worked closely with actual devs (yes, professionals ) and learned how production code doesn’t forgive mistakes.",
    techStack: ["React", "Node.js", "MongoDB", "AWS"],
    xp: {
      learning: 9,
      stress: 6,
      satisfaction: 8,
    },
  },
];

export const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
];

export const projects = [
  {
    label: "Featured Project",
    title: "Campus-Connect",
    description:
      "A centralized web application built to simplify college operations. Features include digital attendance tracking, automated exam seating arrangements, real-time lab occupancy monitoring, and timetable generation — reducing manual work and peak-hour chaos for students and faculty.",
    image: "",
  },
  {
    label: "Featured Project",
    title: "Farm Sync",
    description:
      "A smart agriculture web application designed to help farmers make better decisions using real-time data. Features include crop insights, weather-aware guidance, and live commodity price updates to support smarter selling and planning — tech but make it farmer-friendly.",
    image: "",
  },
];

export const certificates = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    color: "#FF9900",
    icon: "☁️",
  },
  {
    title: "Dynamic Web Development",
    issuer: "Web Development Certification",
    color: "#61DAFB",
    icon: "🌐",
  },
  {
    title: "SQL Database",
    issuer: "Database Management",
    color: "#4479A1",
    icon: "🗄️",
  },
  {
    title: "Python Programming",
    issuer: "Programming Certification",
    color: "#3776AB",
    icon: "🐍",
  },
  {
    title: "NPTEL – Cloud Computing",
    issuer: "NPTEL",
    color: "#A78BFA",
    icon: "☁️",
  },
  {
    title: "NPTEL – Database Management Systems",
    issuer: "NPTEL",
    color: "#47A248",
    icon: "📊",
  },
  {
    title: "NPTEL – Parallel Computing Architecture",
    issuer: "NPTEL",
    color: "#E0234E",
    icon: "⚡",
  },
];

export const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com",
    color: "#FFFFFF",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://linkedin.com",
    color: "#0A66C2",
  },
];
