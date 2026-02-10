import React, { useEffect, useRef } from "react";
import "./Contact.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ 초기 상태 (배경 라인이 안 보이게)
      gsap.set(bgRef.current, {
        transformOrigin: "50% 100%",
        scaleY: 0,
      });

      // ✅ 텍스트도 초기 숨김
      gsap.set(".contact-container", { y: 50, opacity: 0 });
      gsap.set(".reveal-text", { y: 30, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(bgRef.current, {
        scaleY: 1,
        duration: 0.9,
        ease: "power2.inOut",
      })
        .to(
          ".contact-container",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          ".reveal-text",
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: false, 
        onEnter: () => tl.play(0),
        // markers: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" ref={sectionRef} id="contact">
      <div className="contact-bg-line" ref={bgRef}></div>
      <div className="contact-bg-text">CONTACT</div>

      <div className="contact-container">
        <div className="contact-top">
          <p className="contact-label reveal-text">~ CONTACT ME</p>
          <h2 className="contact-email reveal-text">dhdbswl08@naver.com</h2>

          <div className="contact-info">
            <p className="reveal-text">Tell: 010.2311.2560</p>
            <p className="reveal-text">
              GitHub:{" "}
              <a
                href="https://github.com/yunjoh"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/yunjoh
              </a>
            </p>
          </div>
        </div>

        <div className="contact-bottom">
          <h1 className="brand-title reveal-text">YUNJI DE-CODER®</h1>
          <span className="copyright reveal-text">
            Copyright © Oh Yunji 2026
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
