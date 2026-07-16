import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

type ProjectKey = "betterleaders" | "hitome" | "branding";
type EducationKey = "hufs" | "inalco";
type VideoLanguage = "ko" | "de";

const NAV_ITEMS = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
] as const;

const EDUCATION = {
  hufs: {
    eyebrow: "SEOUL · 2024 — PRESENT",
    title: "Hankuk University of Foreign Studies",
    subtitle: "B.A. French & EU Studies · Minor in Business Administration",
    body: "Building a cross-disciplinary foundation in European affairs, communication, business, and market thinking. Current GPA: 3.8 / 4.5.",
  },
  inalco: {
    eyebrow: "PARIS · FALL 2025",
    title: "Institut National des Langues et Civilisations Orientales",
    subtitle: "Exchange Programme · Paris, France",
    body: "Studied French at B2 level while living in Paris, strengthening cultural fluency, audience awareness, and confidence in cross-cultural communication.",
  },
} satisfies Record<EducationKey, { eyebrow: string; title: string; subtitle: string; body: string }>;

const SKILL_DETAILS = [
  { code: "W", name: "Word", tone: "word", detail: "Reports, proposals, structured documentation" },
  { code: "P", name: "PowerPoint", tone: "powerpoint", detail: "Story-led decks, campaign proposals, presentations" },
  { code: "X", name: "Excel", tone: "excel", detail: "Inventory tracking, research tables, practical analysis" },
  { code: "C", name: "CapCut", tone: "capcut", detail: "Short-form video, subtitles, social-first editing" },
  { code: "N", name: "Notion", tone: "notion", detail: "Project planning, documentation, collaboration" },
  { code: "F", name: "Figma", tone: "figma", detail: "Visual systems, layouts, prototypes, social assets" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.08, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Navbar({ active }: { active: string }) {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <nav className="nav-pill-row">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`nav-pill ${active === id ? "is-active" : ""}`}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function ProfileCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-card-wrap">
      <button
        type="button"
        className={`profile-card interactive ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Open Jua's profile card"
      >
        <div className="profile-photo-frame">
          <img src="/media/jua-profile-original.png" alt="Jua Oh profile" />
        </div>
        <div className="profile-card-caption">
          <strong>JUA OH</strong>
          <span>SEOUL, KOREA · KO / EN / FR</span>
        </div>
      </button>

      <div className={`profile-popover ${open ? "is-visible" : ""}`} aria-hidden={!open}>
        <span className="profile-popover-label">PROFILE CARD</span>
        <p>Market research, strategic thinking, and global communication — translated into useful action.</p>
        <div className="profile-tags">
          <span>ESG</span>
          <span>Marketing</span>
          <span>Cross-cultural</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-copy">
        <h1>
          Hello<br />I’m <strong>Jua</strong>
        </h1>
        <p className="hero-subtitle">
          MARKET RESEARCH · STRATEGIC THINKING<br />GLOBAL COMMUNICATION
        </p>
        <button type="button" className="primary-button" onClick={() => scrollToSection("about")}>
          EXPLORE
        </button>
      </div>
      <div className="hero-profile-zone">
        <div className="hero-blue-block" aria-hidden="true" />
        <ProfileCard />
      </div>
    </section>
  );
}

function TravelGlobe() {
  return (
    <div className="globe-stage" aria-label="Animated route between Seoul and Paris">
      <div className="globe-shell">
        <img className="globe-original" src="/media/about-globe-original.png" alt="" />
        <div className="globe-route-overlay" aria-hidden="true">
          <span className="city-dot seoul-dot" />
          <span className="city-label seoul-label">SEOUL</span>
          <span className="city-dot paris-dot" />
          <span className="city-label paris-label">PARIS</span>
          <div className="plane-orbit">
            <span className="plane">✈</span>
          </div>
        </div>
      </div>
      <button type="button" className="education-link" onClick={() => scrollToSection("education")}>
        Education ↘
      </button>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="about section-anchor">
      <div className="about-copy">
        <h2>About</h2>
        <h3>FROM INSIGHT———TO ACTION</h3>
        <p>
          I study French &amp; EU Studies and Business Administration at Hankuk University of Foreign
          Studies, communicating across Korean, English, and French. My strength lies in turning global
          research and cross-cultural perspectives into clear plans, communication, and execution.
        </p>
        <p>
          Through projects with KOTRA, LG Energy Solution, and my exchange at INALCO Paris, I have
          conducted market research, developed reports and campaigns, coordinated teams, and supported
          global business projects.
        </p>
      </div>
      <TravelGlobe />
    </section>
  );
}

function EducationModal({ school, onClose }: { school: EducationKey; onClose: () => void }) {
  const content = EDUCATION[school];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="education-modal" role="dialog" aria-modal="true" aria-label={content.title}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <p className="modal-eyebrow">{content.eyebrow}</p>
        <h3>{content.title}</h3>
        <h4>{content.subtitle}</h4>
        <p>{content.body}</p>
      </article>
    </div>
  );
}

function Education() {
  const [selected, setSelected] = useState<EducationKey | null>(null);

  return (
    <section id="education" className="education section-anchor grid-background">
      <h2>Education</h2>
      <div className="education-grid">
        <button type="button" className="education-card interactive" onClick={() => setSelected("hufs")}>
          <div className="school-mark hufs-mark">
            <img src="/media/hufs-logo-original.png" alt="Hankuk University of Foreign Studies logo" />
          </div>
          <div>
            <strong>Hankuk University of<br />Foreign Studies</strong>
            <span>B.A. French &amp; EU Studies</span>
            <small>Minor in Business Administration</small>
          </div>
        </button>

        <button type="button" className="education-card interactive" onClick={() => setSelected("inalco")}>
          <div className="school-mark inalco-mark">
            <img src="/media/inalco-logo-original.png" alt="INALCO logo" />
          </div>
          <div>
            <strong>Institut National des Langues et<br />Civilisations Orientales</strong>
            <span>Exchange Programme · Paris, France</span>
            <small>French Language &amp; Culture</small>
          </div>
        </button>
      </div>
      {selected && <EducationModal school={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

const WORK_CARDS: Array<{
  key: ProjectKey;
  title: string;
  subtitle: string;
  role: string;
  cover: string;
  alt: string;
}> = [
  {
    key: "betterleaders",
    title: "Global Ambassador\nBetter Leaders",
    subtitle: "LG Energy Solution · Seoul",
    role: "Project Coordination · ESG\nGlobal Content",
    cover: "/media/work-better-leaders-original.jpg",
    alt: "Earth viewed from space",
  },
  {
    key: "hitome",
    title: "Hitome",
    subtitle: "KOTRA deXters Digital\nTrade Program · Seoul",
    role: "Market Research\nB2B Strategy",
    cover: "/media/work-hitome-original.jpg",
    alt: "Red spheres from the original Hitome project design",
  },
  {
    key: "branding",
    title: "PR Member",
    subtitle: "Department Student Council\nSeoul",
    role: "Branding · PR\nEvent Operations",
    cover: "/media/work-branding-original.jpg",
    alt: "HUFS lettering from the original branding design",
  },
];

function Work() {
  return (
    <section id="work" className="work section-anchor grid-background">
      <h2>WORK</h2>
      <div className="work-grid">
        {WORK_CARDS.map(({ key, title, subtitle, role, cover, alt }) => (
          <article className="work-card interactive" key={key}>
            <div className="work-cover-frame">
              <img className="work-cover" src={cover} alt={alt} />
              {key === "branding" && (
                <div className="branding-lettering" aria-hidden="true">
                  {(["h", "u", "f", "s"] as const).map((letter) => (
                    <img key={letter} src={`/media/branding-${letter}-original.png`} alt="" />
                  ))}
                </div>
              )}
            </div>
            <div className="work-card-body">
              <h3>{title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
              <p>{subtitle.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
              <strong>{role.split("\n").map((line) => <span key={line}>{line}</span>)}</strong>
              <button type="button" onClick={() => scrollToSection(`project-${key}`)}>
                VIEW PROJECT
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectSection({
  id,
  title,
  intro,
  role,
  deliverables,
  outcome,
  visual,
}: {
  id: string;
  title: string;
  intro: string;
  role: string[];
  deliverables: string[];
  outcome: string[];
  visual: ReactNode;
}) {
  return (
    <section id={id} className="project-detail section-anchor">
      <div className="project-copy">
        <h2>{title}</h2>
        <p className="project-intro">{intro}</p>
        <div className="project-block">
          <h3>My Role</h3>
          <ul>{role.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="project-block">
          <h3>Deliverables</h3>
          <ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="project-block">
          <h3>Outcome</h3>
          <ul>{outcome.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="project-visual">{visual}</div>
    </section>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  const [language, setLanguage] = useState<VideoLanguage>("ko");
  const source = language === "ko" ? "/videos/hitome-ko.mp4" : "/videos/hitome-de.mp4";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop video-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="video-modal" role="dialog" aria-modal="true" aria-label="Hitome campaign videos">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close video">
          ×
        </button>
        <div className="video-tabs" role="tablist">
          <button type="button" className={language === "ko" ? "is-active" : ""} onClick={() => setLanguage("ko")}>KOREAN</button>
          <button type="button" className={language === "de" ? "is-active" : ""} onClick={() => setLanguage("de")}>GERMAN</button>
        </div>
        <div className="large-phone">
          <div className="phone-speaker" />
          <video key={source} src={source} controls autoPlay playsInline preload="metadata" />
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <ProjectSection
        id="project-betterleaders"
        title="BETTER LEADERS GLOBAL CAMPAIGN"
        intro="Collaborated with a global team to create ESG-focused digital content and coordinate a cross-regional campaign."
        role={[
          "Coordinated project timelines and team communication",
          "Contributed to content planning and production",
          "Created social media content for global audiences",
        ]}
        deliverables={["Instagram Reels", "Carousel posts", "YouTube content"]}
        outcome={[
          "Collaborated with a six-member team across the U.S., Europe, and Asia",
          "Received the Outstanding Project Award",
          "Strengthened global project coordination skills",
          "Developed a deeper understanding of ESG and sustainability",
        ]}
        visual={
          <img
            className="project-original project-original-laptop interactive"
            src="/media/better-leaders-original.png"
            alt="Better Leaders global campaign shown in the original laptop design"
          />
        }
      />

      <ProjectSection
        id="project-hitome"
        title="OVERSEAS MARKET ENTRY PROJECT FOR HITOME"
        intro="Researched target markets and developed B2B marketing materials to support the global expansion of a Korean beverage brand."
        role={[
          "Researched target countries, consumers, and distribution channels",
          "Developed a B2B marketing plan and English product materials",
          "Supported buyer outreach and global promotion",
        ]}
        deliverables={[
          "Market research summary",
          "Target market analysis",
          "English / German catalogue and advertisement",
          "BuyKOREA listing",
          "Selected slogan: ‘Hi To Me, Healthier ME!’",
        ]}
        outcome={[
          "Contacted 100+ overseas distributors",
          "Generated buyer interest from Germany and the U.S.",
          "Built practical experience in market research, export marketing, and content planning",
        ]}
        visual={
          <button type="button" className="phone-project-button" onClick={() => setVideoOpen(true)}>
            <img
              className="project-original project-original-phone interactive"
              src="/media/hitome-phone-original.png"
              alt="Hitome BuyKOREA product page shown in the original phone design"
            />
            <span>Click here to see more</span>
          </button>
        }
      />

      <ProjectSection
        id="project-branding"
        title="DEPARTMENT BRANDING"
        intro="Supported department branding through social media content, merchandise planning, and on-site event operations."
        role={[
          "Created promotional content and managed social media",
          "Coordinated merchandise production with external vendors",
          "Supported booth operations with materials and on-site guidance",
        ]}
        deliverables={[
          "Card news and posters",
          "SNS promotional content",
          "Merchandise designs",
          "Festival booth materials and operation guide",
        ]}
        outcome={[
          "Department merchandise sold out",
          "Improved consistency in department promotion",
          "Gained experience in branding, vendor communication, and event execution",
        ]}
        visual={
          <img
            className="project-original project-original-poster interactive"
            src="/media/department-branding-original.png"
            alt="Department merchandise and branding outcomes in the original poster design"
          />
        }
      />

      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
    </>
  );
}

function Skills() {
  const [activeSkill, setActiveSkill] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const active = SKILL_DETAILS[activeSkill];

  const rotatedSkills = useMemo(() => {
    return [...SKILL_DETAILS.slice(activeSkill), ...SKILL_DETAILS.slice(0, activeSkill)];
  }, [activeSkill]);

  return (
    <section id="skills" className="skills section-anchor grid-background">
      <h2>SKILLS</h2>
      <div className="skills-layout">
        <div className="language-skills">
          <h3>Languages</h3>
          {[
            { name: "Korean", note: "Native", width: "100%", className: "korean" },
            { name: "English", note: "TOEIC 955", width: "95%", className: "english" },
            { name: "French", note: "DELF B1", width: "62%", className: "french" },
          ].map((skill) => (
            <div className="language-row" key={skill.name}>
              <div><span>{skill.name}</span><strong>{skill.note}</strong></div>
              <div className="language-track"><i className={skill.className} style={{ width: skill.width }} /></div>
            </div>
          ))}
        </div>

        <div className={`technical-skills ${expanded ? "is-expanded" : ""}`}>
          <button type="button" className="technical-title" onClick={() => setExpanded((value) => !value)}>
            Technical Skills <span>{expanded ? "−" : "+"}</span>
          </button>
          <div className="skill-icon-grid">
            {rotatedSkills.map((skill) => {
              const originalIndex = SKILL_DETAILS.findIndex((item) => item.name === skill.name);
              return (
                <button
                  type="button"
                  key={skill.name}
                  className={`skill-icon skill-${skill.tone} interactive ${originalIndex === activeSkill ? "is-active" : ""}`}
                  onClick={() => setActiveSkill(originalIndex)}
                >
                  <span>{skill.code}</span>
                  <small>{skill.name}</small>
                </button>
              );
            })}
          </div>
          <div className="skill-detail-card" aria-live="polite">
            <strong>{active.name}</strong>
            <p>{active.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("_subject", "Portfolio contact from jua-portfolio.vercel.app");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/juaoh0424@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) throw new Error("Message service unavailable");
      formRef.current?.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact section-anchor grid-background-dark">
      <div className="contact-copy">
        <h2>CONTACT</h2>
        <p>Whether it’s a collaboration, an opportunity, or simply a conversation — my inbox is always open.</p>
        <div className="contact-card">
          <p><strong>Email:</strong> <a href="mailto:juaoh0424@gmail.com">juaoh0424@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+821038736208">010-3873-6208</a></p>
          <p><strong>Blog:</strong> <a href="https://blog.naver.com/ozxzua" target="_blank" rel="noreferrer">Click here to go ↗</a></p>
        </div>
      </div>

      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="_honey" className="hidden-field" tabIndex={-1} autoComplete="off" />
        <label>
          <span>Name</span>
          <input className="interactive" type="text" name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input className="interactive" type="email" name="email" required autoComplete="email" />
        </label>
        <label>
          <span>Message</span>
          <textarea className="interactive" name="message" required rows={5} />
        </label>
        <button className="send-button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send"}
        </button>
        {status === "error" && (
          <p className="form-status error">
            The direct form could not connect. Please email <a href="mailto:juaoh0424@gmail.com">juaoh0424@gmail.com</a>.
          </p>
        )}
        {status === "sent" && <p className="form-status">Thank you — your message has been delivered.</p>}
      </form>
    </section>
  );
}

export default function App() {
  const active = useActiveSection();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }));
  }, []);

  return (
    <>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Education />
        <Work />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
