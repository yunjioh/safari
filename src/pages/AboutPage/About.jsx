import Title from "../../components/Title";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextFill from "../../components/TextFill";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ✅ (1) 텍스트 fill pin (기존)
      gsap.to(".fill-text", {
        "--p": 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          scrub: true,
          anticipatePin: 1,
        },
      });

      // ✅ (2) 옆 텍스트 + 프로필 이미지 등장 애니메이션
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "20% 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".text-content",
        { x: -200, opacity: 0, filter: "blur(6px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        },
      ).fromTo(
        ".profile-wrapper",
        { x: 50, opacity: 0, scale: 0.98, filter: "blur(6px)" },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <Title
        subTitle="THIS IS ME"
        mainTitle="UX/UI DESIGNER"
        decoTitle="YUNJI OH"
      />

      <div className="content-section">
        <div className="text-content">
          <div className="quote-mark">“</div>
          <h3 className="intro-phrase">
            [ I am a <TextFill>De-Coder:</TextFill> ] <br />
            디자인으로 해석하고 코드로 해독하는 사람
          </h3>

          <p className="description">
            컴퓨터공학을 전공하며 쌓은 개발 구조와 구현 흐름에 대한 깊은 이해로
            <br />
            <TextFill color="#0066ff">사용자의 니즈를 감각적으로 해석</TextFill>
            하고, 이를{" "}
            <TextFill color="#0066ff">
              실제 구현 가능한 솔루션으로 해독
            </TextFill>
            하는 것을 지향합니다.
            <br />
            이제 단순히 보기 좋은 화면을 넘어 사용자와 브랜드 모두에게
            <br />
            의미 있는 경험을 설계하는 DE-CODER가 되고자 합니다.
          </p>
        </div>

        <div className="image-content">
          <div className="profile-wrapper">
            <img
              src="/img/profile.svg"
              alt="Yunji Oh"
              className="profile-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
