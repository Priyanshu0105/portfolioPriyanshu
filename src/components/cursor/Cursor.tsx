"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 3, duration: 0.4, ease: "power2.out" });
      gsap.to(dot,  { scale: 0, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.1 });
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.2 });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    // re-query on every mount so dynamic elements bhi catch hon
    const attachHover = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHover();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* dot — white, snappy */}
      <div
        ref={dotRef}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           "8px",
          height:          "8px",
          borderRadius:    "50%",
          background:      "#ffffff",
          pointerEvents:   "none",
          zIndex:          9999,
          transform:       "translate(-50%, -50%)",
          mixBlendMode:    "difference",
        }}
      />

      {/* ring — white filled, difference blend = transparent effect */}
      <div
        ref={ringRef}
        style={{
          position:        "fixed",
          borderColor: "black",
          borderWidth: "2px",
          top:             0,
          left:            0,
          width:           "36px",
          height:          "36px",
          borderRadius:    "50%",
          background:      "#ffffff",
          opacity:         0.05,
          pointerEvents:   "none",
          zIndex:          9998,
          transform:       "translate(-50%, -50%)",
          mixBlendMode:    "difference",
        }}
      />
    </>
  );
}