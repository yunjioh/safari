import React, { useEffect, useRef } from "react";
import "./Think.css";
import Title from "../../components/Title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    id: 1,
    q: "왜 개발이 아닌 UI/UX 디자인을 선택하게 되었나요?",
    a: "컴퓨터공학 전공으로 기능 구현 과정을 이해했지만, 같은 기능이라도 화면 흐름과 인터페이스 설계에 따라 사용자 경험이 크게 달라진다는 점을 체감했습니다. ‘동작하는 기능’보다 사용자의 문제를 정의하고 구조로 풀어내는 역할에 더 매력을 느껴 UI/UX 디자인을 선택하게 되었습니다.",
    color: "#242FBE",
  },
  {
    id: 2,
    q: "디자인할 때 가장 중요하게 생각하는 것은 무엇인가요?",
    a: "가장 중요하게 생각하는 것은 사용자가 판단하기 쉬운 구조입니다. 디자인은 예쁘게 보이는 것보다, 사용자가 이해 → 비교 → 결정 → 행동까지 자연스럽게 이어질 수 있도록 돕는 역할이라고 생각합니다.",
    color: "#F3A4FF",
  },
  {
    id: 3,
    q: "디자인과 개발의 협업에서 본인만의 강점은 무엇인가요?",
    a: "개발 언어를 이해하는 디자인 언어입니다. 개발자와 소통할 때 성능을 고려해 이런 구조로 설계했다고 제안할 수 있어 협업 비용을 획기적으로 낮추고 프로젝트의 퀄리티를 높이는 저만의 핵심 경쟁력입니다.",
    color: "#BEDC39",
  },
  {
    id: 4,
    q: "앞으로 어떤 디자이너가 되고 싶나요?",
    a: "‘경계를 허무는 디자이너’가 되고 싶습니다. 디자인과 개발 사이의 간극을 줄여, 구현 가능한 혁신을 제안하는 전문가를 꿈꿉니다. 단순히 예쁜 인터페이스를 만드는 것을 넘어, 포용적이고 지속 가능한 디자인을 통해 더 많은 사람이 기술의 혜택을 누릴 수 있도록 기여하고 싶습니다.",
    color: "#FFA556",
  },
];


const Think = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardsRef.current;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1201px)",
        isResponsive: "(max-width: 1200px)",
      },
      (ctx) => {
        const { isDesktop } = ctx.conditions;

        // ✅ 초기값 (둘 다 공통)
        gsap.set(cards, {
          opacity: 0,
          scale: 0.9,
          x: 0,
          y: isDesktop ? 140 : 40,
          transformOrigin: "50% 50%",
        });

        const tl = gsap.timeline({ paused: true });

        if (isDesktop) {
          const getSpread = () => {
            const w = container?.clientWidth || window.innerWidth;
            return gsap.utils.clamp(420, 820, w * 0.28); // ✅ 더 넓게
          };

          tl.to(
            cards,
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
            },
            0
          ).to(
            cards,
            {
              x: (i) => (i - (cards.length - 1) / 2) * getSpread(),
              y: 260,
              zIndex: (i) => cards.length - Math.abs(i - (cards.length - 1) / 2),
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.03,
            },
            0
          );
        } else {
          // ✅ 1200 이하(그리드/모바일): 반드시 opacity 올려줘야 함
          tl.to(cards, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          });
        }

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          once: false,
          onEnter: () => tl.play(0),
          onLeaveBack: () => tl.pause(0),
          // markers: true,
        });

        return () => {
          st.kill();
          tl.kill();
        };
      }
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

      <div className="think-container" ref={containerRef}>
        {questions.map((item, i) => (
          <div
            key={item.id}
            className="think-card-wrapper"
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ "--card-bg": item.color }}
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
