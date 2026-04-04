"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const counterRef = useRef<HTMLParagraphElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(counterRef.current, {
        opacity: 0, y: 10, duration: 0.6, delay: 0.5,
      })
      .to([line1Ref.current, line2Ref.current, line3Ref.current], {
        y: "0%", duration: 1.1, stagger: 0.13,
      }, "-=0.3")
      .from(bottomRef.current, {
        opacity: 0, y: 20, duration: 0.8,
      }, "-=0.5");
  }, []);

  return (
    <section
      id="hero"
        className="hero-section"
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "flex-end",
        padding:        "0 3rem 4rem",
        position:       "relative",
        overflow:       "hidden",
      }}
    >
      {/* big bg text */}
      <div
        style={{
          position:      "absolute",
          top:           "50%",
          right:         "-2%",
          transform:     "translateY(-50%)",
          fontFamily:    "Syne, sans-serif",
          fontSize:      "28vw",
          fontWeight:    800,
          color:         "var(--surface)",
          lineHeight:    1,
          pointerEvents: "none",
          userSelect:    "none",
          letterSpacing: "-0.05em",
          zIndex:        0,
        }}
      >
        FS
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* counter */}
        <p
          ref={counterRef}
          style={{
            fontSize:      "11px",
            color:         "var(--muted)",
            letterSpacing: "0.15em",
            marginBottom:  "1.5rem",
          }}
        >
          // full-stack developer — 2026
        </p>

        {/* title */}
        <h1
          style={{
            fontFamily:    "Syne, sans-serif",
            fontSize:      "clamp(3.5rem, 10vw, 8rem)",
            fontWeight:    800,
            lineHeight:    0.95,
            letterSpacing: "-0.03em",
            marginBottom:  "2.5rem",
          }}
        >
          {[
            { ref: line1Ref, text: "Building" },
            { ref: line2Ref, text: "things" },
            {
              ref: line3Ref,
              text: (
                <>
                  that{" "}
                  <span style={{ color: "var(--accent)" }}>matter.</span>
                </>
              ),
            },
          ].map((line, i) => (
            <span
              key={i}
              style={{ display: "block", overflow: "hidden" }}
            >
              <span
                ref={line.ref}
                style={{ display: "block", transform: "translateY(110%)" }}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        {/* bottom row */}
        <div
          className="hero-bottom"
          ref={bottomRef}
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
          }}
        >
          <p
            style={{
              maxWidth:   "380px",
              color:      "var(--muted)",
              fontSize:   "13px",
              lineHeight: 1.8,
            }}
          >
            I craft fast, functional, and beautiful digital products —
            from database to UI. Currently open to new projects.
          </p>

          <div
            style={{
              display:       "flex",
              alignItems:    "center",
              gap:           "12px",
              fontSize:      "11px",
              color:         "var(--muted)",
              letterSpacing: "0.1em",
            }}
          >
            <div
              style={{
                width:    "60px",
                height:   "1px",
                background: "var(--muted)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position:   "absolute",
                  left:       "-100%",
                  top:        0,
                  width:      "100%",
                  height:     "100%",
                  background: "var(--accent)",
                  animation:  "scan 2s ease-in-out infinite",
                }}
              />
            </div>
            scroll to explore
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          to { left: 100%; }
        }
      `}</style>
    </section>
  );
}