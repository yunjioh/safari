import React, { useEffect, useRef } from "react";
import "./Together.css";
import Button from "../../components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Together = () => {
  const sectionRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 시작점: 중앙의 0% 크기 원
      gsap.set(revealRef.current, {
        clipPath: "circle(0% at 50% 50%)",
      });

      gsap.to(revealRef.current, {
        clipPath: "circle(150% at 50% 50%)", // 모서리까지 다 덮도록 150%
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "-90% top",
          end: "+=100%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="together-wrapper" ref={sectionRef}>
      {/* 실제 애니메이션으로 퍼져나가는 영역 */}
      <div className="together" ref={revealRef}>
        <p className="top-label">UX/UI DESIGN @2026</p>

        <div className="center">
          <h1 className="main-display-title">
            LET’S BUILD <br />
            SOMETHING TOGETHER.
          </h1>

          <Button
            text="Decode My Projects"
            onClick={() => console.log("Navigate to Projects")}
          />
        </div>

        <p className="bottom-description">
          해석하고 연결할 준비가 되어 있습니다.
        </p>
      </div>
    </section>
  );
};

export default Together;
