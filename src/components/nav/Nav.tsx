"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "@/hooks/useTheme";

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const lastScrollY               = useRef(0);
  const navRef                    = useRef<HTMLElement>(null);
  const linksRef                  = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(navRef.current, {
      y: -30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2,
    }).from(
      linksRef.current?.children ? [...linksRef.current.children] : [],
      { y: -10, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );

    const onScroll = () => {
      const currentY = window.scrollY;

      // scrolled state — blur effect
      setScrolled(currentY > 60);

      // hide jab neeche jao, show jab upar aao
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);   // scroll down → hide
      } else {
        setHidden(false);  // scroll up → show
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["about", "work", "contact"];

  return (
    <nav
      ref={navRef}
      style={{
        position:       "fixed",
        top:            0, left: 0, right: 0,
        padding:        "1.5rem 3rem",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        zIndex:         100,
        borderBottom:   scrolled ? "1px solid var(--border-col)" : "1px solid transparent",
        background:     scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        // ← yeh 2 lines hide/show karti hain
        transform:      hidden ? "translateY(-100%)" : "translateY(0)",
        transition:     "transform 0.4s ease, background 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* logo */}
      <div style={{
        fontFamily: "Syne, sans-serif", fontSize: "25px",
        fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)",
      }}>
        P<span style={{ color: "var(--accent)" }}>.dev</span>
      </div>

      {/* links */}
      <ul ref={linksRef}
        className="nav-links"
        style={{ display: "flex", gap: "2.5rem", listStyle: "none", marginLeft: "auto" , marginRight: "3rem"}}>
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link}`}
              data-hover
              style={{
                color: "var(--muted)", textDecoration: "none",
                fontSize: "15px", letterSpacing: "0.1em",
                textTransform: "uppercase" as const, transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* theme toggle */}
      <button
        onClick={toggle}
        data-hover
        style={{
          background: "none", border: "1px solid var(--border-col)",
          borderRadius: "2px", padding: "6px 14px", color: "var(--muted)",
          fontSize: "11px", letterSpacing: "0.1em", cursor: "none",
          transition: "border-color 0.2s, color 0.2s",
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
        {theme === "dark" ? "☀ light" : "◑ dark"}
      </button>
    </nav>
  );
}