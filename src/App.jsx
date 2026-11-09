import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight, Download, Github, Linkedin, Mail, Menu, Moon, Send, Sun, X,
} from 'lucide-react';
import { EXPERIENCE, FEATURED, LINKS, MORE_PROJECTS, NAV, SKILLS } from './data.js';
import './App.css';

const EMPTY_FORM = { name: '', email: '', message: '' };
const MORE_PREVIEW_COUNT = 6;

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* storage unavailable */ }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-shown' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function SectionHeading({ title, command }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {command && <p className="mono muted">{command}</p>}
    </div>
  );
}

function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main">
        <a href="#top" className="brand mono" onClick={close}>
          ~/anand<span className="cursor" aria-hidden="true">_</span>
        </a>

        <div className={`nav-links ${open ? 'is-open' : ''}`} id="nav-links">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="mono" onClick={close}>
              ./{item.label}
            </a>
          ))}
          <a href={LINKS.resume} download className="mono nav-resume" onClick={close}>
            resume.pdf
          </a>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="container hero">
      <div className="hero-copy">
        <p className="mono accent-ink prompt">$ whoami</p>
        <h1>Anand K Anil</h1>
        <p className="hero-lede">
          Full-stack developer. I build real-time, voice and AI-powered web apps, from React
          front ends to the Node APIs and cloud functions behind them.
        </p>
        <div className="button-row">
          <a href="#work" className="button button-primary">See my work</a>
          <a href={LINKS.resume} download className="button button-ghost">
            <Download size={16} aria-hidden="true" /> Download résumé
          </a>
        </div>
        <p className="mono muted status"><span className="status-dot" aria-hidden="true" /> open to software engineering roles</p>
      </div>

      <figure className="code-card" aria-label="A short profile written as code">
        <div className="window-bar">
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          <figcaption className="mono">anand.config.js</figcaption>
        </div>
        <pre className="mono"><code>
<span className="tok-key">export const</span> anand = {'{'}{'\n'}
{'  '}role: <span className="tok-str">"Full-Stack Developer"</span>,{'\n'}
{'  '}stack: [<span className="tok-str">"React"</span>, <span className="tok-str">"Node"</span>, <span className="tok-str">"Express"</span>, <span className="tok-str">"MongoDB"</span>],{'\n'}
{'  '}shipping: [<span className="tok-str">"Aura"</span>, <span className="tok-str">"CollabBoard"</span>],{'\n'}
{'  '}previously: <span className="tok-str">"TCS · SAP CAR"</span>,{'\n'}
{'  '}learning: <span className="tok-str">"System design"</span>,{'\n'}
{'}'};
        </code></pre>
      </figure>
    </section>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          Live <ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> — {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className="link-quiet">
          Code <ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> — {project.title} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function Work() {
  const [showAll, setShowAll] = useState(false);
  const more = showAll ? MORE_PROJECTS : MORE_PROJECTS.slice(0, MORE_PREVIEW_COUNT);

  return (
    <section id="work" className="container section">
      <SectionHeading title="Selected work" command="ls ./projects --featured" />

      <div className="featured-grid">
        {FEATURED.map((p) => (
          <Reveal as="article" key={p.title} className="card project-card">
            <div className="card-bar mono">{p.file}</div>
            <img src={p.image} alt={p.imageAlt} loading="lazy" className="project-shot" />
            <div className="card-body">
              <h3>{p.title}</h3>
              <p className="muted-strong">{p.description}</p>
              <p className="mono accent-ink stack-line">{p.stack.join(' · ')}</p>
              <ProjectLinks project={p} />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="more-heading">
        <h3>More projects</h3>
        <p className="mono muted">{MORE_PROJECTS.length} more</p>
      </div>
      <ul className="more-grid">
        {more.map((p) => (
          <li key={p.title} className="card more-card">
            <img src={p.image} alt="" loading="lazy" className="more-thumb" />
            <div className="more-body">
              <h4>{p.title}</h4>
              <p className="muted-strong">{p.description}</p>
              <p className="mono muted small">{p.stack.join(' · ')}</p>
              <ProjectLinks project={p} />
            </div>
          </li>
        ))}
      </ul>
      <div className="center">
        {MORE_PROJECTS.length > MORE_PREVIEW_COUNT && (
          <button type="button" className="button button-ghost mono" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
            {showAll ? 'show less' : `show all ${MORE_PROJECTS.length}`}
          </button>
        )}
        <a href={LINKS.github} target="_blank" rel="noreferrer" className="mono muted-link">
          everything else on github.com/Anandkanil <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="container section">
      <SectionHeading title="Experience" command="git log --oneline" />
      {EXPERIENCE.map((job) => (
        <Reveal key={job.hash} className="card log-card">
          <p className="mono commit">
            commit {job.hash} <span className="muted">· {job.period}</span>
          </p>
          <h3>{job.role} — {job.company}</h3>
          <ul className="diff">
            {job.points.map((point) => (
              <li key={point}><span className="mono accent-ink" aria-hidden="true">+</span> {point}</li>
            ))}
          </ul>
        </Reveal>
      ))}
      <Reveal className="card log-card">
        <p className="mono commit">commit education</p>
        <h3>MCA / BTech in Computer Science</h3>
        <p className="muted-strong">Grounded in data structures, algorithms and low-level design; now going deep on system design.</p>
      </Reveal>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="container section">
      <SectionHeading title="Stack" command="npm ls --depth=0" />
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <Reveal key={s.group} className="skill-card">
            <p className="mono muted">{s.group}/</p>
            <ul>
              {s.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [state, setState] = useState({ status: 'idle', message: '' });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!serviceId || !templateId || !publicKey) {
      setState({ status: 'error', message: `The form isn't set up yet. Please email ${LINKS.email} instead.` });
      return;
    }
    setState({ status: 'sending', message: '' });
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          subject: `Portfolio contact from ${form.name}`,
          message: form.message,
          to_email: LINKS.email,
        },
        { publicKey },
      );
      setForm(EMPTY_FORM);
      setState({ status: 'sent', message: "Thanks — your message is on its way. I'll reply soon." });
    } catch {
      setState({ status: 'error', message: `Couldn't send that. Please try again, or email ${LINKS.email}.` });
    }
  };

  return (
    <section id="contact" className="container section">
      <div className="card contact-card">
        <div className="contact-intro">
          <p className="mono accent-ink">$ ./contact --now</p>
          <h2>Let's build something.</h2>
          <p className="muted-strong">Hiring, collaborating, or just want to talk shop? Send a message or reach me directly.</p>
          <div className="contact-links">
            <a href={`mailto:${LINKS.email}`}><Mail size={18} aria-hidden="true" /> {LINKS.email}</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden="true" /> LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer"><Github size={18} aria-hidden="true" /> GitHub</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            <span className="mono">name</span>
            <input name="name" value={form.name} onChange={onChange} required autoComplete="name" />
          </label>
          <label>
            <span className="mono">email</span>
            <input name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
          </label>
          <label>
            <span className="mono">message</span>
            <textarea name="message" rows={5} value={form.message} onChange={onChange} required />
          </label>
          <button type="submit" className="button button-primary" disabled={state.status === 'sending'}>
            <Send size={16} aria-hidden="true" /> {state.status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="site">
      <a href="#work" className="skip-link">Skip to projects</a>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <footer className="container footer mono muted">
        <p>© {new Date().getFullYear()} Anand K Anil</p>
        <a href="#top" className="muted-link">back to top ↑</a>
      </footer>
    </div>
  );
}
