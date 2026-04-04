"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    num:  "01",
    name: "RepoWind — AI Context Engine",
    desc: "AI tool that analyzes GitHub repos to generate context summaries for faster project resumption.",
    tags: ["Next.js", "Tailwind", "Bun", "Hono", "Gemini AI", "GitHub OAuth"],
    url:  "https://github.com/Priyanshu0105/repowind",
    year: "2026",
  },
  {
    num:  "02",
    name: "Next-Commerce",
    desc: "Full-stack e-commerce backend with JWT authentication and admin-controlled product management.",
    tags: ["Next.js", "Express.js", "MongoDB", "JWT", "Redis"],
    url:  "https://github.com/Priyanshu0105/next-commerce",
    year: "2025",
  },
  {
    num:  "03",
    name: "urlShortner",
    desc: "Simple URL shortening service made for learning purposes.",
    tags: ["JavaScript", "Node.js", "Express.js", "MongoDB", "EJS"],
    url:  "https://github.com/Priyanshu0105/urlShortner",
    year: "2025",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-title", {
        scrollTrigger: {
          trigger: sectionRef.current, // ✅ ref
          start: "top 75%",
        },
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".project-row", {
        scrollTrigger: {
          trigger: sectionRef.current, // ✅ ref
          start: "top 65%",
        },
        y: 50, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ borderTop: "1px solid var(--border-col)", padding: "7rem 3rem" }}
    >
      <p style={{
        fontSize: "11px", letterSpacing: "0.15em",
        color: "var(--accent)", textTransform: "uppercase",
        marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem",
      }}>
        <span style={{ display: "block", width: "30px", height: "1px", background: "var(--accent)" }} />
        Work
      </p>

      <h2
        className="work-title"
        style={{
          fontFamily:    "Syne, sans-serif",
          fontSize:      "clamp(2rem, 4vw, 3.5rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          marginBottom:  "3rem",
        }}
      >
        Selected<br />
        <span style={{ color: "var(--accent)" }}>Projects</span>
      </h2>

      <div>
        {projects.map((proj) => (
          <a
            key={proj.num}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
            data-hover
            style={{
              display:             "grid",
              gridTemplateColumns: "60px 1fr auto",
              gap:                 "2rem",
              alignItems:          "center",
              padding:             "2rem 0",
              borderTop:           "1px solid var(--border-col)",
              textDecoration:      "none",
              color:               "var(--text)",
              position:            "relative",
              overflow:            "hidden",
            }}
            onMouseEnter={(e) => {
              const num   = e.currentTarget.querySelector(".p-num")   as HTMLElement;
              const arrow = e.currentTarget.querySelector(".p-arrow") as HTMLElement;
              const line  = e.currentTarget.querySelector(".p-line")  as HTMLElement;
              if (num)   num.style.color = "var(--accent)";
              if (arrow) { arrow.style.color = "var(--accent)"; arrow.style.transform = "translate(4px, -4px)"; }
              if (line)  line.style.width = "100%";
            }}
            onMouseLeave={(e) => {
              const num   = e.currentTarget.querySelector(".p-num")   as HTMLElement;
              const arrow = e.currentTarget.querySelector(".p-arrow") as HTMLElement;
              const line  = e.currentTarget.querySelector(".p-line")  as HTMLElement;
              if (num)   num.style.color = "var(--muted)";
              if (arrow) { arrow.style.color = "var(--muted)"; arrow.style.transform = "translate(0, 0)"; }
              if (line)  line.style.width = "0%";
            }}
          >
            <div
              className="p-line"
              style={{
                position:   "absolute",
                bottom:     0, left: 0,
                width:      "0%",
                height:     "1px",
                background: "var(--accent)",
                transition: "width 0.4s ease",
              }}
            />

            <span
              className="p-num"
              style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "11px",
                color:         "var(--muted)",
                letterSpacing: "0.1em",
                transition:    "color 0.2s",
              }}
            >
              {proj.num}
            </span>

            <div>
              <h3 style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "clamp(1.1rem, 2vw, 1.6rem)",
                fontWeight:    700,
                letterSpacing: "-0.01em",
                marginBottom:  "4px",
              }}>
                {proj.name}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "10px" }}>
                {proj.desc}
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize:      "10px",
                      color:         "var(--muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
              <span
                className="p-arrow"
                style={{
                  fontSize:   "1.2rem",
                  color:      "var(--muted)",
                  transition: "transform 0.25s ease, color 0.2s",
                }}
              >
                ↗
              </span>
              <span style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.05em" }}>
                {proj.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}