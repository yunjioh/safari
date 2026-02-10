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
    link: "https://yunjioh.github.io/Musign/",
  },
  {
    id: "02",
    name: "Crew a la mode Agency",
    img: "/img/coding5.png",
    link: "https://yunjioh.github.io/Musign/",
  },
  {
    id: "03",
    name: "Musign W. Agency",
    img: "/img/coding4.png",
    link: "https://yunjioh.github.io/Musign/",
  },
  {
    id: "04",
    name: "The Dopda Platform",
    img: "/img/coding3.png",
    link: "https://yunjioh.github.io/Musign/",
  },
  {
    id: "05",
    name: "Daebang Website",
    img: "/img/coding6.png",
    link: "https://yunjioh.github.io/Musign/",
  },
  {
    id: "06",
    name: "Y.Studio Agency",
    img: "/img/coding1.png",
    link: "https://yunjioh.github.io/Musign/",
  },
];
const Coding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visualRef = useRef(null);
  const projects = useMemo(() => codingProjects, []);
  const total = projects.length;

  useEffect(() => {
    const el = visualRef.current;
    gsap.fromTo(
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
      },
    );
  }, []);

  const move = (dir) => {
    // 일반 슬라이더이므로 끝에 도달하면 멈추거나 처음으로 돌아가게 설정
    setCurrentIndex((prev) => (prev + dir + total) % total);
  };

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
            <Title
              subTitle="HTML · CSS · JavaScript"
              mainTitle="CLONE CODING"
              animate={false}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <SubTitle
              align="right"
              description={[
                {
                  text: "HTML, CSS, JavaScript ",
                  highlight: true,
                  color: "orange",
                },
                {
                  text: "에 대한 이해를 바탕으로 총 6개의 클론 코딩 프로젝트를 제작했습니다.\n실제 웹사이트의 구조와 인터랙션을 분석하며 반복적인 구현을 통해",
                  highlight: false,
                },
                {
                  text: "퍼블리싱과 인터랙션 구현 역량",
                  highlight: true,
                  color: "purple",
                },
                { text: "을 키웠습니다.", highlight: false },
              ]}
            />
          </ScrollReveal>
        </div>

        <div className="coding-visual" ref={visualRef}>
          <div className="swiper-wrap is-visible">
            <div className="swiper-container">
              {/* ✅ 트랙 자체를 움직이는 방식으로 변경 */}
              <div
                className="swiper-track-horizontal"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 1)}%)`, // 1개씩 보일 때 기준
                  transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {projects.map((p, idx) => (
                  <a
                    key={p.id}
                    className={`slide ${currentIndex === idx ? "active" : ""}`}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseMove={handleMouseMove}
                  >
                    <div className="slide-inner">
                      <img src={p.img} alt={p.name} />
                      <div className="cursor">
                        <svg
                          className="cursor-text"
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                        >
                          <defs>
                            <path
                              id="circlePath"
                              d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                            />
                          </defs>
                          <text>
                            <textPath href="#circlePath">
                              VIEW PROJECT • VIEW PROJECT • VIEW PROJECT
                            </textPath>
                          </text>
                        </svg>
                        <div className="cursor-arrow">→</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <button className="nav-btn nav-left" onClick={() => move(-1)}>
              <FaArrowLeft />
            </button>
            <button className="nav-btn nav-right" onClick={() => move(1)}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coding;
