import React, { useEffect, useRef } from "react";
import "./Gallery.css";
import Button from "../../components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const bgWrap = el.querySelector(".gallery-bg-wrap");
      const scaleWrap = el.querySelector(".gallery-scale");
      const top = el.querySelector(".top-label");
      const bottom = el.querySelector(".bottom-description");

      gsap.set(bgWrap, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(scaleWrap, { scale: 1, transformOrigin: "50% 50%" });

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        // ✅ 배경 + 이미지 같이 작아짐
        .to(bgWrap, { scale: 0.3, ease: "none" }, 0)

        // ✅ 텍스트는 커짐
        .to(scaleWrap, { scale: 2, ease: "none" }, 0)

        // ✅ 위/아래 설명 fade
        .to([top, bottom], { opacity: 0, y: -10, ease: "none" }, 0.15);

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery" ref={sectionRef}>
      {/* ✅ 배경 레이어 */}
      <div className="gallery-bg" aria-hidden="true" />

      <p className="top-label">UX/UI DESIGN @2026</p>

      {/* ✅ 스케일 대상 묶기 */}
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
