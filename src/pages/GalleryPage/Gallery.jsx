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
      // ✅ el 자체가 .gallery 섹션이므로 querySelector로 다시 찾지 말기
      const gallery = el;

      const bg = el.querySelector(".gallery-bg");
      const textWrap = el.querySelector(".gallery-scale");
      const mainTitle = el.querySelector(".main-display-title");
      const top = el.querySelector(".top-label");
      const bottom = el.querySelector(".bottom-description");

      // 안전장치 (없으면 애니메이션 적용 안 됨)
      if (!bg || !textWrap || !mainTitle || !top || !bottom) return;

      // 초기 상태
      gsap.set(gallery, { backgroundColor: "#fff" });
      gsap.set(bg, { scale: 1, filter: "grayscale(100%)", opacity: 1 });
      gsap.set(textWrap, { scale: 1 });
      gsap.set(mainTitle, { color: "#fff" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
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
          borderRadius: "20px",
          ease: "none",
        },
        0,
      )
        .to(
          textWrap,
          {
            scale: 1.5,
            ease: "none",
          },
          0,
        )
        .to(
          gallery,
          {
            backgroundColor: "#021526",
            ease: "none",
          },
          0,
        )
        .to(
          mainTitle,
          {
            color: "#BBFF52",
            ease: "none",
          },
          0,
        )
        .to(
          [top, bottom],
          {
            y: -20,
            ease: "none",
          },
          0.1,
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery" ref={sectionRef}>
      {/* 🔹 이미지 배경 */}
      <div className="gallery-bg" aria-hidden="true" />
      <div className="text">
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
      </div>
    </section>
  );
};

export default Gallery;
