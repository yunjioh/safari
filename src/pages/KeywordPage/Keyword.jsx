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
      src: "img/key1.svg",
      badge: {
        text: "협업",
        color: "--blue",
        rotate: -12,
        position: { top: "40px", left: "-30px" },
      },
      pos: { top: "16%", right: "8%", rotate: "8deg" },
    },
    {
      src: "img/key2.svg",
      badge: {
        text: "열정",
        color: "--orange",
        rotate: 8,
        position: { top: "-14px", right: "-14px" },
      },
      pos: { top: "16%", left: "5%", rotate: "-5deg" },
    },
    {
      src: "img/key3.svg",
      badge: {
        text: "아이디어",
        color: "--orange",
        rotate: -10,
        position: { top: "40px", left: "-30px" },
      },
      pos: { top: "31%", right: "5%", rotate: "3deg" },
    },
    {
      src: "img/key4.svg",
      badge: {
        text: "책임감",
        color: "--purple",
        rotate: -14,
        position: { top: "-14px", right: "-14px" },
      },
      pos: { top: "30%", left: "3%", rotate: "-7deg" },
    },
    {
      src: "img/key5.svg",
      badge: {
        text: "끈기",
        color: "--purple",
        rotate: -10,
        position: { top: "40px", left: "-30px" },
      },
      pos: { top: "57%", right: "8%", rotate: "6deg" },
    },
    {
      src: "img/key6.svg",
      badge: {
        text: "꼼꼼함",
        color: "--blue",
        rotate: 10,
        position: { top: "-14px", right: "-14px" },
      },
      pos: { top: "59%", left: "3%", rotate: "-4deg" },
    },
  ];

  useEffect(() => {
    // 반응형 체크
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
        {/* 이미지 섹션: PC에서는 absolute 분산, 모바일은 상단 고정 */}
        <div className="keyword-images">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`photo-box ${activeIndex === i ? "is-active" : ""}`}
              style={{
                top: !isMobile ? p.pos.top : "0",

                // ✅ left / right 조건 분기
                ...(!isMobile && p.pos.right
                  ? { right: p.pos.right, left: "auto" }
                  : !isMobile && p.pos.left
                    ? { left: p.pos.left, right: "auto" }
                    : {}),

                transform: !isMobile
                  ? activeIndex === i
                    ? `rotate(${p.pos.rotate}) scale(1)`
                    : `rotate(0deg) scale(0.9) translateY(40px)`
                  : undefined,
              }}
            >
              <div className="badge-container">
                <Badge {...p.badge} />
              </div>
              <img src={p.src} alt={keywords[i]} />
            </div>
          ))}
        </div>

        {/* 텍스트 슬롯 섹션: 2~3개만 보이도록 설정 */}
        <div className="keyword-text-wrapper">
          <div
            className="keyword-text-list"
            style={{
              transform: `translateY(${-activeIndex * (isMobile ? 80 : 120)}px)`,
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
