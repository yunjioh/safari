import React, { useEffect, useRef } from "react";
import "./Gallery.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const inner = section.querySelector(".gallery-inner");
      const bg = section.querySelector(".gallery-bg");
      const textWrap = section.querySelector(".gallery-scale");
      const top = section.querySelector(".top-label");
      const bottom = section.querySelector(".bottom-description");

      // 1. 처음 등장할 때 서서히 커지는 ClipPath 효과
      gsap.to(inner, {
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // 섹션이 보이기 시작할 때
          end: "top 20%",
          scrub: true,
        },
      });

      // 2. 스크롤에 따른 스케일 및 필터 변화 (Sticky 구간 내에서 동작)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",   // 섹션 상단이 화면 위에 닿을 때 시작
          end: "bottom bottom", // 섹션 하단이 화면 밑에 닿을 때 종료
          scrub: 1, // 값이 낮을수록 스크롤에 더 즉각적으로 반응 (부드러움)
        },
      });

      tl.to(bg, { filter: "grayscale(0%)", ease: "none" }, 0)
        .to(textWrap, { scale: 1.5, ease: "none" }, 0)
        .to([top, bottom], { y: -30, autoAlpha: 0.5, ease: "none" }, 0.1);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery" ref={sectionRef}>
      {/* 고정되어 보여질 컨테이너 */}
      <div className="gallery-inner">
        <div className="gallery-bg" aria-hidden="true" />
        <div className="text">
          <p className="top-label">UX/UI DESIGN @2026</p>

          <div className="gallery-scale">
            <div className="center">
              <h1 className="main-display-title">
                MY WORK PAGE
                <br />
                GALLERY
              </h1>
            </div>
          </div>

          <p className="bottom-description">
            UI/UX 프로젝트, 클론 코딩, 디자인 작업물로
            <br />
            창의성과 실용성을 담아낸 저의 디자인 역량을 확인하실 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;