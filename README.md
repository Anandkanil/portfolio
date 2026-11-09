# 🌐 Anand K Anil — Developer Portfolio

This repository contains the source code for my **personal portfolio website**, built to showcase my projects, technical skills, and professional experience as a **Full-Stack Developer (MERN Stack)**.

🔗 **Live Website**  
https://anandkanil-portfolio.netlify.app/

🔗 **GitHub Repository**  
https://github.com/Anandkanil/portfolio

---

## 📸 Portfolio Preview

![Portfolio Preview](./portfolio-preview.png)

---

## 🚀 About The Project

A developer portfolio with a terminal-inspired design: dark by default with a light theme, a code-card hero, project cards with real screenshots, a `git log`-style experience section and a working contact form.

The site includes:

• Hero with a one-click résumé download  
• Featured projects (Aura, CollabBoard, StudyNotion) plus 13 more  
• Experience and education  
• Skills grouped by area  
• Contact form (EmailJS) with direct email, LinkedIn and GitHub links  
• Light and dark themes (remembered per visitor)  
• Responsive layout for phone, tablet and desktop, keyboard-friendly and respectful of reduced-motion settings  

---

## 🛠 Tech Stack

- React 19 + Vite
- Plain CSS with theme variables (Tailwind is still available)
- Lucide icons
- EmailJS for the contact form
- Netlify hosting

---

## 📂 Project Structure

```
src/
  App.jsx    # page sections: nav, hero, work, experience, stack, contact
  App.css    # design tokens (dark/light) and styles
  data.js    # links, projects, experience and skills — edit content here
  main.jsx
public/
  images/    # project screenshots and illustrations
  AnandKAnil_FullStackDeveloper_Resume.pdf
```

To add or change a project, edit `src/data.js`.

---

## ⭐ Featured Projects

- **Aura** — multilingual voice AI assistant (React, Netlify Functions, Gemini) · [live](https://auraa-voice.netlify.app/)
- **CollabBoard** — real-time collaborative whiteboard (React, Firebase, Fabric.js) · [live](https://anand-whiteboard.netlify.app/)
- **StudyNotion** — MERN EdTech platform · [live](https://studynotion-project-1.netlify.app/)

---

## 🔑 Environment variables

Set these in Netlify (or a local `.env`) for the contact form:

| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

If they're missing, the form tells visitors to email directly instead.

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/Anandkanil/portfolio.git
cd portfolio
npm install
npm run dev
```

---

## 🌍 Deployment

Deployed on Netlify: https://anandkanil-portfolio.netlify.app/

---

## 📬 Contact

Anand K Anil

📧 Email
ktmanand@gmail.com

🔗 LinkedIn
https://linkedin.com/in/anand-k-anil-96b717211

💻 GitHub
https://github.com/Anandkanil

📄 License

This project is open source and available under the MIT License.