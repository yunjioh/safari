import React, { useState, useMemo, useEffect, useRef } from "react";
import "./Coding.css";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import ScrollReveal from "../../components/ScrollReveal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codingProjects = [
  {
    id: "01",
    name: "Phomein Website",
    img: "/img/coding2.png",
    link: "https://yunjioh.github.io/Phomein/",
  },
  {
    id: "02",
    name: "The Dopda Platform",
    img: "/img/coding5.png",
    link: "https://yunjioh.github.io/Dopda/",
  },
  {
    id: "03",
    name: "Musign W. Agency",
    img: "/img/coding4.png",
    link: "https://yunjioh.github.io/Musign/",
  },
  {
    id: "04",
    img: "/img/coding3.png",
    name: "Crew a la mode Agency",
    link: "https://yunjioh.github.io/Crew-a-la-mode/",
  },
  {
    id: "05",
    name: "Daebang Website",
    img: "/img/coding6.png",
    link: "https://yunjioh.github.io/Daebang/",
  },
  {
    id: "06",
    name: "Y.Studio Agency",
    img: "/img/coding1.png",
    link: "https://yunjioh.github.io/Y.Studio/",
  },
];

const EASING = "cubic-bezier(0.25, 1, 0.5, 1)";
const DURATION = 0.6;

export default function Coding() {
  const visualRef = useRef(null);

  // ✅ clone 포함 슬라이드
  const slides = useMemo(() => {
    const first = codingProjects[0];
    const last = codingProjects[codingProjects.length - 1];
    return [last, ...codingProjects, first];
  }, []);

  const realTotal = codingProjects.length; // 6
  const total = slides.length; // 8 (lastClone + 6 + firstClone)

  // ✅ 처음부터 2번 보이게: slides 기준 index 2가 "02"
  const [currentIndex, setCurrentIndex] = useState(2);

  // ✅ transition on/off를 state로 제어 (튐 방지 핵심)
  const [transitionOn, setTransitionOn] = useState(true);

  // ✅ 버튼 연타 시 꼬임 방지(선택이지만 안정성↑)
  const [isAnimating, setIsAnimating] = useState(false);

  // 섹션 진입 애니메이션(기존 유지)
  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "restart pause resume pause",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const move = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + dir);
  };

  // ✅ transition end에서 clone 보정 (React state로 transition 끄고 순간이동)
  const handleTransitionEnd = () => {
    setIsAnimating(false);

    // 맨 끝 firstClone에 도착했으면 -> 진짜 첫 번째(01 = index 1)로 순간이동
    if (currentIndex === total - 1) {
      setTransitionOn(false);
      setCurrentIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionOn(true));
      });
      return;
    }

    // 맨 앞 lastClone에 도착했으면 -> 진짜 마지막(06 = index total-2)로 순간이동
    if (currentIndex === 0) {
      setTransitionOn(false);
      setCurrentIndex(total - 2);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionOn(true));
      });
    }
  };

  // ✅ active 계산(실제 0~5)
  const realIndex =
    currentIndex === 0
      ? realTotal - 1
      : currentIndex === total - 1
      ? 0
      : currentIndex - 1;

  const handleMouseMove = (e) => {
    const slide = e.currentTarget;
    const cursor = slide.querySelector(".cursor");
    if (!cursor) return;
    const rect = slide.getBoundingClientRect();
    cursor.style.left = `${e.clientX - rect.left - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${e.clientY - rect.top - cursor.offsetHeight / 2}px`;
  };

  return (
    <section className="coding">
      <div className="coding-container">
        <div className="coding-info">
          <ScrollReveal delay={0.3}>
            <Title subTitle="HTML · CSS · JavaScript" mainTitle="CLONE CODING" animate={false} />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <SubTitle
              align="right"
              description={[
                { text: "HTML, CSS, JavaScript ", highlight: true, color: "orange" },
                {
                  text: "에 대한 이해를 바탕으로 총 6개의 클론 코딩 프로젝트를 제작했습니다.\n실제 웹사이트의 구조와 인터랙션을 분석하며 반복적인 구현을 통해",
                  highlight: false,
                },
                { text: "퍼블리싱과 인터랙션 구현 역량", highlight: true, color: "purple" },
                { text: "을 키웠습니다.", highlight: false },
              ]}
            />
          </ScrollReveal>
        </div>

        <div className="coding-visual" ref={visualRef}>
          <div className="swiper-wrap is-visible">
            <div className="swiper-container">
              <div
                className="swiper-track-horizontal"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: transitionOn ? `transform ${DURATION}s ${EASING}` : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((p, idx) => {
                  const mappedRealIndex =
                    idx === 0 ? realTotal - 1 : idx === total - 1 ? 0 : idx - 1;

                  // ✅ circlePath id 중복 방지(슬라이드 여러개면 id 충돌 가능)
                  const circleId = `circlePath-${idx}`;

                  return (
                    <a
                      key={`${p.id}-${idx}`}
                      className={`slide ${mappedRealIndex === realIndex ? "active" : ""}`}
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseMove={handleMouseMove}
                    >
                      <div className="slide-inner">
                        <img src={p.img} alt={p.name} />
                        <div className="cursor">
                          <svg className="cursor-text" width="120" height="120" viewBox="0 0 120 120">
                            <defs>
                              <path
                                id={circleId}
                                d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                              />
                            </defs>
                            <text>
                              <textPath href={`#${circleId}`}>
                                VIEW PROJECT • VIEW PROJECT • VIEW PROJECT
                              </textPath>
                            </text>
                          </svg>
                          <div className="cursor-arrow">→</div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <button className="nav-btn nav-left" onClick={() => move(-1)} aria-label="Previous">
              <FaArrowLeft />
            </button>
            <button className="nav-btn nav-right" onClick={() => move(1)} aria-label="Next">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}