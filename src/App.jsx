// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  FaReact, FaNodeJs, FaPython, FaAws, FaGithub, FaLinkedin, FaTwitter,
  FaExternalLinkAlt, FaCode, FaPalette, FaMobileAlt, FaServer, FaDatabase,
  FaArrowRight, FaBars, FaTimes, FaCube
} from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiMongodb, SiTensorflow } from "react-icons/si";

// ---------- Replace with your actual profile image ----------
import profileImg from "./assets/profile.jpg"; 
import lenz from "./assets/lenz.png"
import logo from "./assets/Logo.png"
import orphan from "./assets/orphan.jpg"
import casaz from "./assets/casaz.jpg"

// ---------- Your personal info ----------
const personal = {
  name: "Jeremy Jabrah",
  title: "Full-Stack mobile and web app developer",
  bio: "I build digital experiences that feel alive — from dashboards to immersive web apps. 6+ years of turning ideas into fluid, high‑performance products.",
  email: "kwabenafourtimes@gmail.com",
  location: "Tema, Ghana",
};

// ---------- Projects ----------
const projects = [
  {
    id: 1,
    title: "LenzPay",
    logo: lenz,
    summary: "A school fee management dashboard with real-time analytics, payment tracking, and notifications. Built with React and WebSockets for live updates between parents and school administrators.",
    link: "https://lenzpay.naomall.com",
    tags: ["React", "python", "tailwind"],
    gradient: "from-orange-50 to-white",
  },
  {
    id: 2,
    title: "NaoMall - Multi Vendor market",
    logo: logo,
    summary: "A multi vendor marketplace that allows users to own their own store and make sales.",
    link: "https://naomall.com",
    tags: ["Python", "react", "websockets"],
    gradient: "from-white to-orange-50",
  },
  {
    id: 3,
    title: "Casaz",
    logo: casaz,
    summary: "Casaz is a classifieds mobile application that allows property owners to list their property for sale after making a subscription.",
    link: "https://play.google.com/store/apps/details?id=com.casaz.zombie",
    tags: ["python", "react-native", "Tailwind", "expo"],
    gradient: "from-orange-50 to-white",
  },
  {
    id: 4,
    title: "Orphanage Donation Mock",
    logo: orphan,
    summary: "Open‑source component library used by 200+ startups. Fully accessible and motion‑optimized.",
    link: "https://orphance-mock-up.vercel.app/",
    tags: ["React", "Framer Motion"],
    gradient: "from-white to-orange-50",
  },
];

// ---------- Logos for moving marquee ----------
const marqueeLogos = [
  { icon: <FaReact />, name: "React" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <SiMongodb /> },
  { icon: <FaPython />, name: "Python" },
  { icon: <FaAws /> },
  { icon: <SiTensorflow /> },
  { icon: <FaPalette /> },
  { icon: <FaMobileAlt />, name: "React Native" },
  { icon: <FaServer /> },
];

// ---------- Skills ----------
const skills = [
  { name: "Python", level: 99, icon: <FaNodeJs /> },
  { name: "React", level: 99, icon: <FaReact /> },
  { name: "ReactNative", level: 99, icon: <FaReact /> },
  { name: "UI Animation (Framer/GSAP)", level: 92, icon: <FaCode /> },
  { name: "UI/UX Design", level: 92, icon: <FaPalette /> },
];

// ---------- Custom hook for mouse position (glow) ----------
const useMousePosition = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const update = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);
  return mouse;
};

// ---------- Main Component ----------
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const mouse = useMousePosition();

  // Parallax effect for hero background
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <div className="bg-gradient-to-br from-white via-orange-50/30 to-white text-gray-800 overflow-x-hidden relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Animated background glow that follows mouse */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(249,115,22,0.15), transparent 80%)`,
        }}
      />

      {/* ========== IMPROVED NAVBAR ========== */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-orange-200/50 px-6 py-3 flex items-center justify-between">
          {/* Logo / Name */}
          <a href="#home" className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {personal.name.split(" ")[0]}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500 transition font-medium">Home</a>
            <a href="#projects" className="text-gray-700 hover:text-orange-500 transition font-medium">Projects</a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 transition font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500 transition font-medium">Contact</a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full bg-orange-50 text-orange-600"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Navigation (overlay) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-orange-100 p-4 md:hidden"
            >
              <div className="flex flex-col gap-3">
                <a href="#home" onClick={handleLinkClick} className="px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition">Home</a>
                <a href="#projects" onClick={handleLinkClick} className="px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition">Projects</a>
                <a href="#about" onClick={handleLinkClick} className="px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition">About</a>
                <a href="#contact" onClick={handleLinkClick} className="px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 lg:px-24 py-20 pt-32">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y: yBg }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center md:text-left"
        >
          <div className="overflow-hidden">
            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-black">
              {personal.name.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-orange-600 font-medium mt-4"
          >
            {personal.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 max-w-2xl mx-auto md:mx-0 mt-6 text-lg"
          >
            {personal.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start mt-8"
          >
            <a href="#projects" className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition flex items-center gap-2">
              See work <FaArrowRight />
            </a>
            <a href="#contact" className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition">
              Let’s talk
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* INFINITE MOVING LOGO MARQUEE */}
      <div className="py-12 bg-white border-y border-orange-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeLogos, ...marqueeLogos].map((logo, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 mx-8 text-gray-500 hover:text-orange-500 transition text-2xl"
            >
              {logo.icon}
              <span className="text-sm font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 inline-block border-b-4 border-orange-400 pb-2">
              Featured <span className="text-orange-500">Projects</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Each project is a live, interactive ecosystem — click the link to explore.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${project.gradient} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-orange-100 group relative overflow-hidden`}
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-100 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-orange-100 rounded-2xl text-orange-600 shadow-md">
                    <img 
                      src={project.logo} 
                      alt={project.title} 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 mt-5 text-orange-500 font-semibold hover:text-orange-700"
                    >
                      Live project <FaExternalLinkAlt size={12} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-orange-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About <span className="text-orange-500">Me</span></h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  I'm {personal.name}, a mobile and web app developer who cares just as much about how things feel as how they function. I build products where smooth interactions, thoughtful motion, and real user needs drive every decision, not just specs on a page.

Over the past 6 years, I’ve worked with both startups and large-scale companies, helping turn ideas into apps people actually enjoy using (and keep coming back to). 
                </p>
                <p>
                  My stack changes as fast as the industry does, but my approach stays the same: <span className="text-orange-600 font-medium">if it doesn’t feel intuitive, responsive, and a little bit delightful, it’s not done yet.</span>
                </p>
              </div>
              <div className="mt-8 space-y-5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        {skill.icon} {skill.name}
                      </span>
                      <span className="text-orange-600 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden ring-4 ring-orange-400 shadow-2xl"
              >
                <img src={profileImg} alt={personal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 text-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Let’s create <span className="text-orange-500">something epic</span></h2>
          <p className="text-gray-500 mt-4">
            Whether it's a full‑stack platform, a micro‑interaction lab, or a 3D brand experience — I'm ready.
          </p>
          <motion.a
            href={`mailto:${personal.email}`}
            whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
            className="inline-block mt-8 px-8 py-4 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-all"
          >
            Start a conversation →
          </motion.a>

        </motion.div>
      </section>

      <footer className="py-8 text-center text-gray-400 border-t border-orange-100 text-sm">
        © {new Date().getFullYear()} {personal.name} — Crafted with React, Tailwind & Framer Motion
      </footer>

      {/* Custom CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default App;