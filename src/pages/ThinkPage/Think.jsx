import React, { useEffect, useRef } from "react";
import "./Think.css";
import Title from "../../components/Title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    id: 1,
    q: "왜 디자인을 선택했나요?",
    a: "사용자 경험 설계에 매력을 느꼈습니다.",
  },
  {
    id: 2,
    q: "중요하게 생각하는 것은?",
    a: "자연스러운 흐름을 만드는 것입니다.",
  },
  { id: 3, q: "가장 중요한 단계는?", a: "본질을 파악하는 정의 단계입니다." },
  {
    id: 4,
    q: "기억에 남는 프로젝트?",
    a: "전 과정에 참여했던 프로젝트입니다.",
  },
];

const Think = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        // PC: 1201px 이상 (가로 한 줄 배치)
        isDesktop: "(min-width: 1201px)",
        // 반응형: 1200px 이하 (2x2 그리드 배치)
        isResponsive: "(max-width: 1200px)",
      },
      (context) => {
        let { isDesktop } = context.conditions;

        gsap.fromTo(
          cardsRef.current,
          {
            opacity: 0,
            scale: 0.5,
            // PC일 때는 중앙(0)에서 시작, 모바일은 제자리에서 약간 아래(y)에서 시작
            x: isDesktop ? 0 : 0,
            y: isDesktop ? 0 : 50,
          },
          {
            x: isDesktop ? (i) => (i - 1.5) * 320 : 0,
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isDesktop ? "top top" : "top 80%", // 모바일은 핀 고정 없이 트리거
              end: isDesktop ? "+=500" : "bottom 20%",
              scrub: 1.5,
              pin: isDesktop, // PC에서만 화면 고정(Pin) 사용
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="think" ref={sectionRef}>
      <div className="think-header">
        <Title
          subTitle="I THINK"
          mainTitle={
            <>
              MY THOUGHTS <br /> ON DESIGN
            </>
          }
        />
      </div>

      <div className="think-container">
        {questions.map((item, i) => (
          <div
            key={item.id}
            className="think-card-wrapper"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className="think-card-inner">
              <div className="think-card front">
                <span className="think-q-label">QUESTION 0{item.id}</span>
                <p className="think-q-text">{item.q}</p>
              </div>
              <div className="think-card back">
                <p className="think-a-text">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Think;
