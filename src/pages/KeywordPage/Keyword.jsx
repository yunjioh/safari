import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Keyword.css";
import Badge from "../../components/Badge";

gsap.registerPlugin(ScrollTrigger);

const Keyword = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const keywords = [
    "COLLABORATION",
    "ENTHUSIASM",
    "IDEATION",
    "PERSISTENCE",
    "RESPONSIBILITY",
    "METICULOUSNESS",
  ];

  const photos = [
    {
      src: "img/key1.jpg",
      badge: { text: "협업", color: "--blue", rotate: -12, position: { top: "40px", left: "-30px" } },
      pos: { top: "12%", right: "4%", rotate: "8deg" },
    },
    {
      src: "img/key2.jpg",
      badge: { text: "열정", color: "--pro2", rotate: 8, position: { top: "-14px", right: "-14px" } },
      pos: { top: "16%", left: "5%", rotate: "-5deg" },
    },
    {
      src: "img/key3.jpg",
      badge: { text: "아이디어", color: "--orange", rotate: -10, position: { top: "40px", left: "-30px" } },
      pos: { top: "31%", right: "6%", rotate: "5deg" },
    },
    {
      src: "img/key4.jpg",
      badge: { text: "책임감", color: "--purple", rotate: -14, position: { top: "-14px", right: "-14px" } },
      pos: { top: "30%", left: "4%", rotate: "-7deg" },
    },
    {
      src: "img/key5.jpg",
      badge: { text: "끈기", color: "--purple", rotate: -10, position: { top: "74px", left: "-30px" } },
      pos: { top: "50%", right: "3%", rotate: "6deg" },
    },
    {
      src: "img/key6.jpg",
      badge: { text: "꼼꼼함", color: "--blue", rotate: 10, position: { top: "28px", right: "-42px" } },
      pos: { top: "59%", left: "3%", rotate: "-4deg" },
    },
  ];

  useEffect(() => {
    // 반응형 체크 함수
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const total = keywords.length;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (total - 1)}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (total - 1));
        setActiveIndex(idx);
      },
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      st.kill();
    };
  }, [keywords.length]);

  return (
    <section className="keyword" ref={sectionRef}>
      <p className="section-label">Keyword</p>

      <div className="keyword-pin">
        {/* 이미지 섹션 */}
        <div className="keyword-images">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`photo-box ${activeIndex === i ? "is-active" : ""}`}
              style={{
                // PC일 때만 개별 데이터 기반 스타일 부여 (모바일 스타일은 CSS에서 일괄 처리)
                ...(!isMobile && {
                  top: p.pos.top,
                  ...(p.pos.right ? { right: p.pos.right } : { left: p.pos.left }),
                  transform: activeIndex === i 
                    ? `rotate(${p.pos.rotate}) scale(1)` 
                    : `rotate(0deg) scale(0.9) translateY(40px)`
                })
              }}
            >
              <div className="badge-container">
                <Badge {...p.badge} />
              </div>
              <img src={p.src} alt={keywords[i]} />
            </div>
          ))}
        </div>

        {/* 텍스트 슬롯 섹션 */}
        <div className="keyword-text-wrapper">
          <div
            className="keyword-text-list"
            style={{
              // 모바일 높이(60px)와 PC 높이(120px)에 맞춰 스크롤 이동 연산 분기
              transform: `translateY(${-activeIndex * (isMobile ? 60 : 120)}px)`,
            }}
          >
            {keywords.map((k, i) => (
              <h2
                key={k}
                className={`kw-item ${activeIndex === i ? "active" : ""}`}
              >
                {k}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keyword;
