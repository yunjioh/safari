import React, { useEffect, useRef } from "react";
import "./Together.css";
import gsap from "gsap";
import ScrollReveal from "../../components/ScrollReveal";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Together = () => {
  const sectionRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    if (!section || !reveal) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(reveal, {
        duration: 1.1,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        once: false,
        onEnter: () => tl.play(0),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="together-wrapper" ref={sectionRef}>
      <div className="together" ref={revealRef}>
        <p className="top-label">UX/UI DESIGN @2026</p>

        <ScrollReveal delay={0.1}>
          <div className="center">
            <h1 className="main-display-title">
              LET’S BUILD <br />
              SOMETHING TOGETHER
            </h1>
          </div>
        </ScrollReveal>

        <p className="bottom-description">
          해석하고 연결할 준비가 되어 있습니다.
        </p>
      </div>
    </section>
  );
};

export default Together;
