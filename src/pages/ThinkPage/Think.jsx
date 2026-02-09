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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { x: 0, opacity: 0, scale: 0.5 },
        {
          x: (i) => (i - 1.5) * 320,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500",
            scrub: 1.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
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
              {/* 앞면: 질문 */}
              <div className="think-card front">
                <span className="think-q-label">QUESTION 0{item.id}</span>
                <p className="think-q-text">{item.q}</p>
              </div>

              {/* 뒷면: 답변 */}
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
