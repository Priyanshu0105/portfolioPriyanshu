"use client";
import { Analytics } from "@vercel/analytics/next"
import Cursor  from "@/components/cursor/Cursor";
import Nav     from "@/components/nav/Nav";
import Hero    from "@/components/sections/Hero";
import About   from "@/components/sections/About";
import Work    from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Analytics />
    </main>
  );
}