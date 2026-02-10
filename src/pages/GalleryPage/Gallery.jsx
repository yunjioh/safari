import React, { useEffect, useRef } from "react";
import "./Gallery.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const bg = el.querySelector(".gallery-bg");
      const textWrap = el.querySelector(".gallery-scale");
      const mainTitle = el.querySelector(".main-display-title"); // 제목 직접 선택
      const top = el.querySelector(".top-label");
      const bottom = el.querySelector(".bottom-description");

      // 초기 상태 설정
      gsap.set(bg, { scale: 1, filter: "grayscale(100%)" }); // 초기엔 흑백
      gsap.set(textWrap, { scale: 1 });
      gsap.set(mainTitle, { color: "#fff" }); // 초기엔 흰색

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%", // 부드러운 전환을 위해 조금 더 늘림
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        bg,
        {
          scale: 0.5,
          filter: "grayscale(0%)",
          ease: "none",
          borderRadius: "20px",
        },
        0,
      )
        .to(
          textWrap,
          {
            scale: 1.5, // 🔼 텍스트 커짐
            ease: "none",
          },
          0,
        )
        .to(
          mainTitle,
          {
            color: "#BBFF52", // 🔼 텍스트 검정색으로 변경
            ease: "none",
          },
          0,
        )
        .to(
          [top, bottom],
          {
            opacity: 0,
            y: -20,
            ease: "none",
          },
          0.1,
        ); // 살짝 늦게 사라지도록 조절
    }, el);

    return () => ctx.revert();
  }, []);
  return (
    <section className="gallery" ref={sectionRef}>
      {/* 🔹 이미지 배경 */}
      <div className="gallery-bg" aria-hidden="true" />

      <p className="top-label">UX/UI DESIGN @2026</p>

      {/* 🔹 텍스트 스케일 영역 */}
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
    </section>
  );
};

export default Gallery;
