"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stat } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const stack: string[] = [
  "React", "Next.js", "Node.js","Express.js","JavaScript", "PostgreSQL",
  "TypeScript", "GSAP", "Docker", "Go(learning)", "MongoDB", "Tailwind",
];

const stats: Stat[] = [
  { label: "projects built", value: "10+" },
  { label: "years building",   value: "2"   },
  { label: "cups of coffee",     value: "∞"   },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // title
      gsap.from(".about-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
      });

      // paragraphs stagger
      gsap.from(".about-para", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: "power3.out",
      });

      // stack tags stagger
      gsap.from(".stack-tag", {
        scrollTrigger: { trigger: ".stack-wrap", start: "top 85%" },
        y: 20, opacity: 0, stagger: 0.04, duration: 0.45, ease: "power2.out",
      });

      // stats slide in
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-wrap", start: "top 80%" },
        x: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
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
        About
      </p>

      <div 
        className="about-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

        {/* left */}
        <div>
          <h2
            className="about-title"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Code is my<br />
            <span style={{ color: "var(--accent)" }}>craft.</span>
          </h2>

          <p className="about-para" style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: "1.2rem" }}>
            Hey, I'm Priyanshu — a 3rd year IT student from India.
            I'm a full-stack developer who obsesses over details —
            clean architecture on the backend, pixel-perfect UI on the front.
          </p>
          <p className="about-para" style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: "2rem" }}>
            Currently diving deep into system design & infra —
            making the boring stuff fun, one distributed system at a time.

          </p>

          {/* stack */}
          <div className="stack-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {stack.map((tech) => (
              <span
                key={tech}
                className="stack-tag"
                data-hover
                style={{
                  padding:       "5px 14px",
                  border:        "1px solid var(--border-col)",
                  borderRadius:  "2px",
                  fontSize:      "12px",
                  color:         "var(--muted)",
                  transition:    "border-color 0.2s, color 0.2s",
                  cursor:        "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-col)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* right — stats */}
        <div className="stats-wrap">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item"
              style={{
                padding:        "1.5rem 0",
                borderBottom:   "1px solid var(--border-col)",
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "baseline",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.05em" }}>
                {stat.label}
              </span>
              <span style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "3rem",
                fontWeight:    800,
                color:         "var(--accent)",
                letterSpacing: "-0.03em",
              }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}