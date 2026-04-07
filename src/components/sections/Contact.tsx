"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "email",    href: "mailto:priyanshu4996@gmail.com", icon: <MdEmail size={15} /> ,external: false   },
  { label: "x.com",  href: "https://x.com/Priyanshu29810",icon: <FaXTwitter size={15} /> ,external: true },
  { label: "github",   href: "https://github.com/Priyanshu0105",icon: <FaGithub size={15} />   ,external: true },
  { label: "linkedin", href: "https://www.linkedin.com/in/priyanshu-90694a293/",icon: <FaLinkedin size={15} /> ,external: true },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".contact-sub", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
      });

      gsap.from(".contact-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60, opacity: 0, duration: 1, ease: "power4.out",
      });

      gsap.from(".contact-link", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power2.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ borderTop: "1px solid var(--border-col)", padding: "7rem 3rem" }}
    >
      {/* label */}
      <p style={{
        fontSize: "11px", letterSpacing: "0.15em",
        color: "var(--accent)", textTransform: "uppercase",
        marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem",
      }}>
        <span style={{ display: "block", width: "30px", height: "1px", background: "var(--accent)" }} />
        Contact
      </p>

      <p
        className="contact-sub"
        style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "1rem" }}
      >
        Got a project in mind?
      </p>

      <h2
        className="contact-title"
        style={{
          fontFamily:    "Syne, sans-serif",
          fontSize:      "clamp(2.5rem, 7vw, 6rem)",
          fontWeight:    800,
          lineHeight:    1,
          letterSpacing: "-0.03em",
          marginBottom:  "3rem",
        }}
      >
        Let's build<br />
        <span style={{ color: "var(--accent)" }}>together.</span>
      </h2>

      <div className="contact-links" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="contact-link"
            data-hover
            style={{
              color:          "var(--muted)",
              textDecoration: "none",
              fontSize:       "12px",
              letterSpacing:  "0.08em",
              display:        "flex",
              alignItems:     "center",
              gap:            "8px",
              paddingBottom:  "4px",
              borderBottom:   "1px solid var(--border-col)",
              transition:     "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border-col)";
            }}
            target={l.external ? "_blank" : "_self"}
            rel={l.external ? "noopener noreferrer" : undefined}
          >
            {l.icon}
            {l.label}

          </a>
        ))}
      </div>

      {/* footer */}
      <div style={{
        marginTop:      "6rem",
        paddingTop:     "2rem",
        borderTop:      "1px solid var(--border-col)",
        display:        "flex",
        justifyContent: "space-between",
        color:          "var(--muted)",
        fontSize:       "11px",
        letterSpacing:  "0.05em",
      }}>
        <span>© 2026 — all rights reserved</span>
        <span>designed & built by <span style={{ color: "var(--accent)" }}>Priyanshu.</span></span>
      </div>
    </section>
  );
}