import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TextFill.css";

gsap.registerPlugin(ScrollTrigger);

export default function TextFill({ children, color = "#0066ff", className = "" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // progress(0~1)를 CSS 변수 --p 로 넣어줌
      gsap.to(el, {
        "--p": 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <span
      ref={wrapRef}
      className={`fill-text ${className}`}
      style={{ "--fill": color, "--p": 0 }}
    >
      {/* 기본(회색) */}
      <span className="fill-text__base">{children}</span>
      {/* 채움(색) */}
      <span className="fill-text__fill" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
