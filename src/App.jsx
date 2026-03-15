import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Moon, Sun, Github, Linkedin, Mail, ChevronDown, 
  ExternalLink, Code2, Database, Layout, Server, 
  Terminal, GraduationCap, Briefcase, FileText,
  Menu, X
} from 'lucide-react';

// --- CUSTOM HOOKS ---

// Hook for scroll-based fade-in animations
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [ref, isVisible];
};

// --- DATA ---

const SKILLS = [
  {
    title: "Languages",
    icon: <Terminal className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["C", "C++", "Java", "Python", "JavaScript"]
  },
  {
    title: "Frontend",
    icon: <Layout className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["HTML5", "CSS3", "React.js", "Redux", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["Node.js", "Express.js", "REST APIs", "JWT"]
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["MongoDB", "MySQL"]
  },
  {
    title: "Tools & DevOps",
    icon: <Code2 className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["Git", "GitHub", "Postman", "VS Code", "Docker", "Google Cloud"]
  },
  {
    title: "Core Concepts",
    icon: <GraduationCap className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["Data Structures", "Algorithms", "LLD", "OOP", "SOLID"]
  }
];

const PROJECTS = [
  {
    title: "StudyNotion (EdTech Platform)",
    description: "Full-stack learning platform with authentication, comprehensive course management, and secure password recovery flows.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Anandkanil/Study-Notion-Project",
    live: "https://studynotion-project-1.netlify.app/",
    color: "from-blue-500 to-indigo-500",
    image: "/images/project-studynotion.svg",
    imageAlt: "Dashboard style illustration for the StudyNotion learning platform"
  },
  {
    title: "Razorpay Landing Page Clone",
    description: "A pixel-perfect static clone of the official Razorpay website built using Tailwind CSS to demonstrate responsive design, layout mastery, and UI replication skills.",
    stack: ["Tailwind CSS", "HTML", "JavaScript"],
    github: "https://github.com/Anandkanil/Razorpay",
    live: "https://razorpayanandkanil.netlify.app/",
    color: "from-teal-500 to-cyan-500",
    image: "/images/project-razorpay.svg",
    imageAlt: "Razorpay landing page clone illustration"
  },
  {
    title: "Sorting Visualizer",
    description: "Interactive algorithm visualizer that demonstrates sorting behavior with animated bars and step-by-step transitions.",
    stack: ["React", "JavaScript", "CSS", "Algorithms"],
    github: "https://github.com/Anandkanil/Sorting-Visualizer",
    live: "https://sortingvisualizeranandkanil.netlify.app/",
    color: "from-cyan-500 to-blue-500",
    image: "/images/project-ecommerce.svg",
    imageAlt: "Sorting visualizer illustration with animated bars and algorithm panels"
  },
  {
    title: "Shopping Cart",
    description: "Responsive shopping cart application with add-to-cart flows, quantity updates, and pricing summaries.",
    stack: ["React", "Redux Toolkit", "JavaScript", "Netlify"],
    github: "https://github.com/Anandkanil/Shopping-Cart",
    live: "https://shopping-cart-anandkanil.netlify.app/",
    color: "from-blue-500 to-indigo-500",
    image: "/images/project-ecommerce.svg",
    imageAlt: "Shopping cart interface illustration with products and checkout summary"
  },
  {
    title: "Blog Website",
    description: "Content-focused blogging platform with clean reading layouts, article pages, and responsive navigation.",
    stack: ["React", "JavaScript", "CSS", "Netlify"],
    github: "https://github.com/Anandkanil/Blogs",
    live: "https://blogsanandkanil.netlify.app/",
    color: "from-teal-500 to-cyan-500",
    image: "/images/project-vegetable-store.svg",
    imageAlt: "Blog website illustration with articles and reading layout"
  },
  {
    title: "Tour Planner",
    description: "Travel planning interface for exploring destinations, browsing packages, and organizing trip details.",
    stack: ["React", "JavaScript", "CSS", "Netlify"],
    github: "https://github.com/Anandkanil/Tour-Plan",
    live: "https://tourplananandkanil.netlify.app/",
    color: "from-blue-500 to-indigo-500",
    image: "/images/project-vegetable-store.svg",
    imageAlt: "Tour planner illustration with destination cards and trip planning layout"
  },
  {
    title: "Top Courses",
    description: "Course discovery interface that highlights curated learning content with filtering and featured sections.",
    stack: ["React", "Tailwind CSS", "APIs", "Netlify"],
    github: "https://github.com/Anandkanil/Top-Courses",
    live: "https://topcoursesanandkanil.netlify.app/",
    color: "from-cyan-500 to-blue-500",
    image: "/images/project-studynotion.svg",
    imageAlt: "Course platform illustration with lesson cards and category sections"
  },
  {
    title: "GIF Generator",
    description: "Fun GIF search and generation app using external APIs with instant previews and responsive interactions.",
    stack: ["React", "APIs", "Tailwind CSS", "Netlify"],
    github: "https://github.com/Anandkanil/Gif-Generator",
    live: "https://gifgeneratoranandkanil.netlify.app/",
    color: "from-cyan-500 to-blue-500",
    image: "/images/project-studynotion.svg",
    imageAlt: "GIF generator illustration with animated content and search controls"
  },
  {
    title: "Dev Detective",
    description: "GitHub profile finder app with user search, profile insights, and clean card-based information display.",
    stack: ["HTML", "CSS", "JavaScript", "APIs"],
    github: "https://github.com/Anandkanil/Dev-Detective",
    live: "https://devdetectiveanandkanil.netlify.app/",
    color: "from-blue-500 to-indigo-500",
    image: "/images/project-studynotion.svg",
    imageAlt: "GitHub profile search dashboard illustration for Dev Detective"
  },
  {
    title: "Weather App",
    description: "Weather forecasting app using location and city search with real-time weather data and quick visual summaries.",
    stack: ["HTML", "CSS", "JavaScript", "Weather API"],
    github: "https://github.com/Anandkanil/Weather-App",
    live: "https://weatherappanandkanil.netlify.app/",
    color: "from-cyan-500 to-blue-500",
    image: "/images/project-ecommerce.svg",
    imageAlt: "Weather app illustration with forecast cards and climate indicators"
  },
  {
    title: "Forms App",
    description: "Dynamic forms project with validation, controlled inputs, and streamlined user submission experience.",
    stack: ["React", "Forms", "JavaScript", "Netlify"],
    github: "https://github.com/Anandkanil/Forms",
    live: "https://formsanandkanil.netlify.app/",
    color: "from-teal-500 to-cyan-500",
    image: "/images/project-ecommerce.svg",
    imageAlt: "Forms app illustration with input fields, validation states, and submission flow"
  },
  {
    title: "Password Generator",
    description: "Secure password generation utility with customizable rules and instant copy-to-clipboard support.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Anandkanil/Password-Generator",
    live: "https://passwordgeneratoranandkanil.netlify.app/",
    color: "from-blue-500 to-indigo-500",
    image: "/images/project-vegetable-store.svg",
    imageAlt: "Password generator illustration with strength meter and controls"
  },
  {
    title: "Tic Tac Toe",
    description: "Classic two-player Tic Tac Toe game with smooth UI interactions and responsive board design.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Anandkanil/Tic-Tac-Toe",
    live: "https://tictactoeanandkanil.netlify.app/",
    color: "from-teal-500 to-cyan-500",
    image: "/images/project-razorpay.svg",
    imageAlt: "Tic Tac Toe board illustration with glowing game cells"
  },
  {
    title: "Testimonial Page",
    description: "Testimonial showcase page featuring polished layout composition, user cards, and responsive presentation.",
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    github: "https://github.com/Anandkanil/Testimonial",
    live: "https://testimonialanandkanil.netlify.app/",
    color: "from-blue-500 to-indigo-500",
    image: "/images/project-studynotion.svg",
    imageAlt: "Testimonial page illustration with profile cards and review content"
  },
];

const NAV_ITEMS = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  message: ''
};

const APP_STYLES = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  @keyframes floatSlow {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, -20px, 0) scale(1.04); }
    100% { transform: translate3d(0, 0, 0) scale(1); }
  }
  @keyframes floatReverse {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, 24px, 0) scale(0.98); }
    100% { transform: translate3d(0, 0, 0) scale(1); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes fadeInDown {
    0% { opacity: 0; transform: translateY(-12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes softGlow {
    0%, 100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
    50% { box-shadow: 0 0 24px rgba(59, 130, 246, 0.18); }
  }
  .glass-nav {
    background: rgba(var(--nav-bg), 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .animate-float-slow {
    animation: floatSlow 10s ease-in-out infinite;
  }
  .animate-float-reverse {
    animation: floatReverse 12s ease-in-out infinite;
  }
  .animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }
  .animate-fade-in-down {
    animation: fadeInDown 0.35s ease-out both;
  }
  .animate-soft-glow {
    animation: softGlow 4s ease-in-out infinite;
  }
  .nav-brand {
    position: relative;
    transition: transform 0.3s ease;
  }
  .nav-brand::after {
    content: '';
    position: absolute;
    inset: -6px -10px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.16), transparent 70%);
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.35s ease;
    z-index: -1;
  }
  .nav-brand:hover {
    cursor: pointer;
    transform: translateY(-1px);
  }
  .nav-brand:hover::after {
    opacity: 1;
  }
  .nav-link {
    position: relative;
    padding-bottom: 4px;
    transition: color 0.3s ease, transform 0.3s ease;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    border-radius: 9999px;
    background: linear-gradient(90deg, #2563eb, #06b6d4);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .nav-link:hover,
  .nav-link:focus-visible {
    cursor: pointer;
    transform: translateY(-2px);
  }
  .nav-link:hover::after,
  .nav-link:focus-visible::after {
    transform: scaleX(1);
  }
  .nav-icon-btn {
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  }
  .nav-icon-btn:hover,
  .nav-icon-btn:focus-visible {
    cursor: pointer;
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 10px 24px rgba(59, 130, 246, 0.16);
  }
  .button-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  }
  .button-lift:hover,
  .button-lift:focus-visible {
    cursor: pointer;
    transform: translateY(-3px);
  }
  .social-link {
    transition: transform 0.3s ease, color 0.3s ease;
  }
  .social-link:hover,
  .social-link:focus-visible {
    transform: translateY(-4px) scale(1.05);
  }
  .interactive-card {
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    will-change: transform;
  }
  .interactive-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
  }
  .floating-badge {
    animation: floatSlow 5s ease-in-out infinite;
    transition: transform 0.3s ease;
  }
  .floating-badge:hover {
    transform: scale(1.06);
  }
  .tech-pill {
    transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
  }
  .tech-pill:hover {
    transform: translateY(-3px);
  }
  .contact-link {
    transition: transform 0.3s ease, color 0.3s ease;
  }
  .contact-link:hover,
  .contact-link:focus-visible {
    transform: translateX(6px);
  }
`;

// --- COMPONENTS ---

const RevealWrapper = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  // --- Form State ---
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    type: 'success',
    message: ''
  });
  const toastTimeoutRef = useRef(null);

  const showToast = (type, message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({ isVisible: true, type, message });

    toastTimeoutRef.current = setTimeout(() => {
      setToast((currentToast) => ({ ...currentToast, isVisible: false }));
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Smooth scroll handler
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  // --- Form Submit Handler ---
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      showToast('error', 'Email service is not configured. Please check environment keys.');
      return;
    }

    setIsSubmitting(true);

    const { firstName, lastName, email, message } = formData;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${firstName} ${lastName}`,
          from_email: email,
          reply_to: email,
          subject: `Portfolio Contact from ${firstName} ${lastName}`,
          message,
          to_email: 'ktmanand@gmail.com'
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      setFormData(INITIAL_FORM_DATA);
      showToast('success', 'Message sent successfully. I will get back to you soon.');
    } catch (sendError) {
      console.error('EmailJS send failed:', sendError);
      showToast('error', 'Failed to send message. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Resume Download Handler ---
  const handleDownloadResume = (e) => {
    e.preventDefault();
    
    // To make this work in your actual deployed project:
    // Place your 'AnandKAnil_FullStackDeveloper_Resume.pdf' file inside your React project's 'public' folder.
    // This script will then point to it and trigger a standard file download.
    const element = document.createElement("a");
    element.href = "/AnandKAnil_FullStackDeveloper_Resume.pdf";
    element.download = "AnandKAnil_FullStackDeveloper_Resume.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const visibleProjects = showAllProjects
    ? PROJECTS
    : PROJECTS.slice(0, 3);
  

  return (
    <div>
      <div className="min-h-screen font-sans text-slate-800 bg-slate-50 dark:text-slate-200 dark:bg-[#0a0f1c] selection:bg-blue-500/30 transition-colors duration-300">
        
        {/* Custom Styles for Background Patterns & Animations */}
        <style dangerouslySetInnerHTML={{ __html: APP_STYLES }} />

        <div
          className={`fixed top-6 right-6 z-100 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
            toast.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
          } ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700/50'
              : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-700/50'
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>

        {/* --- NAVIGATION --- */}
        <nav 
          className="fixed top-0 w-full z-50 glass-nav border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300"
          style={{ '--nav-bg': darkMode ? '10, 15, 28' : '255, 255, 255' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="shrink-0 flex items-center cursor-pointer nav-brand" onClick={() => scrollTo('home')}>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 animate-gradient-shift">
                  Anand K Anil
                </span>
              </div>
              
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                {NAV_ITEMS.map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="nav-link text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
                
                <button 
                  onClick={toggleDarkMode}
                  className="nav-icon-btn p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-4">
                <button 
                  onClick={toggleDarkMode}
                  className="nav-icon-btn p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="nav-icon-btn p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0a0f1c] border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 px-4 flex flex-col space-y-4 animate-fade-in-down">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="nav-link text-left text-base font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* --- HERO SECTION --- */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.15]"></div>
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-reverse"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
              <div className="flex-1 text-center lg:text-left">
                <RevealWrapper>
                  <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium animate-soft-glow">
                    <span style={{ backgroundColor: "#0EEF9D" }} className="flex h-2 w-2 rounded-full mr-2 animate-pulse"></span>
                    Available for new opportunities
                  </div>
                </RevealWrapper>
                
                <RevealWrapper delay={100}>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                    Hi, I'm <br className="hidden lg:block"/>
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 animate-gradient-shift">
                      Anand K Anil
                    </span>
                  </h1>
                </RevealWrapper>

                <RevealWrapper delay={200}>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6">
                    Full-Stack Developer (MERN)
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                    Building scalable, user-focused web applications with clean architecture and modern technologies. Transforming complex problems into elegant solutions.
                  </p>
                </RevealWrapper>

                <RevealWrapper delay={300} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button onClick={() => scrollTo('projects')} className="button-lift w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 group">
                    View My Work
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </button>
                  <button onClick={handleDownloadResume} className="button-lift w-full sm:w-auto px-8 py-3.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium transition-all flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Download Resume
                  </button>
                </RevealWrapper>
                
                <RevealWrapper delay={400} className="mt-10 flex items-center justify-center lg:justify-start gap-6">
                  <a href="https://github.com/Anandkanil" target="_blank" rel="noreferrer" className="social-link text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <Github className="w-7 h-7" />
                  </a>
                  <a href="https://www.linkedin.com/in/anand-k-anil-96b717211/" target="_blank" rel="noreferrer" className="social-link text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="w-7 h-7" />
                  </a>
                  <a href="mailto:ktmanand@gmail.com" className="social-link text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only">Email</span>
                    <Mail className="w-7 h-7" />
                  </a>
                </RevealWrapper>
              </div>

              {/* Abstract Hero Graphic */}
              <div className="flex-1 hidden lg:flex justify-center relative">
                <RevealWrapper delay={300}>
                  <div className="relative w-80 h-80 animate-float">
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-3xl rotate-6 opacity-20 blur-lg dark:opacity-30"></div>
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-3xl -rotate-6 shadow-2xl overflow-hidden flex items-center justify-center border border-white/20">
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
                      <Code2 className="w-32 h-32 text-white/80 z-10" strokeWidth={1.5} />
                    </div>
                    {/* Floating Tech Badges */}
                    <div className="floating-badge absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700" style={{animationDuration: '3s'}}>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Express.js</span>
                    </div>
                    <div className="floating-badge absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700" style={{animationDuration: '4s'}}>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">React</span>
                    </div>
                    
                    <div className="floating-badge absolute top-6 -left-6 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700" style={{animationDuration: '4s', animationDelay: '1s'}}>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">MongoDB</span>
                    </div>
                    <div className="floating-badge absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700" style={{animationDuration: '3s', animationDelay: '1s'}}>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">Node.js</span>
                    </div>
                    
                  </div>
                </RevealWrapper>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-24 bg-white dark:bg-slate-900/50 relative border-y border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealWrapper>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
              </div>
            </RevealWrapper>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealWrapper delay={100}>
                <div className="interactive-card aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group bg-slate-100 dark:bg-slate-800">
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img
                    src="/images/about-dev-illustration.svg"
                    alt="Developer workspace illustration"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </RevealWrapper>

              <RevealWrapper delay={200}>
                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
                  <p>
                    I am a highly motivated Full-Stack Developer with comprehensive hands-on experience in the MERN stack. My engineering foundation is built on robust Data Structures, Algorithms, and Low-Level Design principles.
                  </p>
                  <p>
                    I thrive on building scalable web applications, writing clean, maintainable, and efficient code, and solving complex real-world problems. My goal is always to deliver software that not only functions flawlessly but provides an exceptional user experience.
                  </p>
                  <p>
                    Currently, I am intensely focused on deepening my knowledge in advanced System Design architecture and actively preparing to contribute to high-impact software engineering teams.
                  </p>
                  
                  <div className="pt-6 grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">Education</h4>
                      <div className="flex items-start gap-2 mt-3">
                        <GraduationCap className="w-5 h-5 text-blue-500 shrink-0" />
                        <div>
                          <p className="font-medium text-sm text-slate-800 dark:text-slate-200">MCA / BTech in Computer Science</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">Target Roles</h4>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Software Engineer, Full-Stack Developer, Frontend Developer
                      </p>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section id="experience" className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealWrapper>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
                <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
              </div>
            </RevealWrapper>

            <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-3 md:ml-0 md:pl-0">
              <RevealWrapper delay={100}>
                <div className="mb-10 ml-8 md:ml-10 relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-10.25 md:-left-13.75 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 ring-4 ring-white dark:ring-[#0a0f1c]">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </span>
                  
                  <div className="interactive-card bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">SAP CAR Consultant</h3>
                      <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-full whitespace-nowrap">
                        Jun 2023 – Sep 2024
                      </span>
                    </div>
                    <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4">Tata Consultancy Services (TCS)</h4>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        Worked extensively on retail data solutions and enterprise-scale architectures for Kingfisher PLC.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        Successfully delivered and maintained production-ready features, bug fixes, and system optimizations.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        Achieved top-tier recognition with a 5/5 first-year performance rating for outstanding delivery.
                      </li>
                    </ul>
                  </div>
                </div>
              </RevealWrapper>
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="py-24 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealWrapper>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
                <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Technologies and tools I use to build robust and scalable applications.
                </p>
              </div>
            </RevealWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SKILLS.map((skillGroup, index) => (
                <RevealWrapper key={skillGroup.title} delay={index * 100}>
                  <div className="interactive-card h-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                        {skillGroup.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{skillGroup.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map(item => (
                        <span 
                          key={item} 
                          className="tech-pill px-3 py-1.5 text-sm font-medium bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealWrapper>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Showcasing my capability to build full-stack applications from concept to deployment.
                </p>
              </div>
            </RevealWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <RevealWrapper key={project.title} delay={index * 150}>
                  <div className="interactive-card group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col h-full hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                    {/* Project Image Placeholder */}
                    <div className={`h-48 w-full bg-linear-to-br ${project.color} relative overflow-hidden`}>
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/5 transition-colors duration-300"></div>
                      <div className="absolute -inset-y-4 -left-16 w-14 rotate-12 bg-white/20 blur-xl opacity-0 group-hover:translate-x-96 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/35 via-transparent to-transparent"></div>
                      <Layout className="absolute inset-0 m-auto w-16 h-16 text-white/60 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map(tech => (
                          <span key={tech} className="text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <a href={project.github} target="_blank" rel="noreferrer" className="social-link flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                          <Github className="w-4 h-4" /> Code
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer" className="social-link flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors ml-auto">
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>

            <RevealWrapper delay={250} className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="button-lift inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-white font-medium shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
              >
                {showAllProjects ? 'Show Less' : 'View More Projects'}
              </button>
            </RevealWrapper>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-24 bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealWrapper>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
            </RevealWrapper>

            <div className="interactive-card bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                
                {/* Contact Info */}
                <div className="md:col-span-2 bg-blue-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                      Fill up the form and I will get back to you within 24 hours.
                    </p>
                    
                    <div className="space-y-6">
                      <a href="mailto:ktmanand@gmail.com" className="contact-link flex items-center gap-4 hover:text-blue-200 transition-colors">
                        <Mail className="w-5 h-5 text-blue-200" />
                        <span>ktmanand@gmail.com</span>
                      </a>
                      <a href="https://www.linkedin.com/in/anand-k-anil-96b717211/" target="_blank" rel="noreferrer" className="contact-link flex items-center gap-4 hover:text-blue-200 transition-colors">
                        <Linkedin className="w-5 h-5 text-blue-200" />
                        <span>linkedin.com/in/Anand_K_Anil</span>
                      </a>
                      <a href="https://github.com/Anandkanil" target="_blank" rel="noreferrer" className="contact-link flex items-center gap-4 hover:text-blue-200 transition-colors">
                        <Github className="w-5 h-5 text-blue-200" />
                        <span>github.com/Anandkanil</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="md:col-span-3 p-8">
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                        <input 
                          name="firstName"
                          type="text" 
                          required
                          value={formData.firstName}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white" 
                          placeholder="John" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                        <input 
                          name="lastName"
                          type="text" 
                          required
                          value={formData.lastName}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white" 
                          placeholder="Doe" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                      <input 
                        name="email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                      <textarea 
                        name="message"
                        rows="4" 
                        required
                        value={formData.message}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none dark:text-white" 
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-white dark:bg-[#050810] border-t border-slate-200 dark:border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 animate-gradient-shift">
                AA.
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm border-l border-slate-300 dark:border-slate-700 pl-2">
                © {new Date().getFullYear()} Anand K Anil
              </span>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com/anandkanil" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/anand-k-anil-96b717211/" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:ktmanand@gmail.com" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}