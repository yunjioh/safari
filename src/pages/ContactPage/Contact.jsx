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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%", // 섹션이 화면 하단 80% 지점에 도달하면 시작
          end: "40% 55%",
          scrub: 1,
        },
      });

      // 1. 0이었던 scaleY를 1로 만들어 100vh를 꽉 채움
      tl.to(bgRef.current, {
        scaleY: 1,
        duration: 2,
        ease: "power2.inOut",
      })
        // 2. 배경이 다 찬 후 내부 텍스트 등장
        .from(
          ".contact-container",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".reveal-text",
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" ref={sectionRef} id="contact">
      {/* 배경색 #BBFF52 적용 및 100vh 높이 유지 */}
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
