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
      const gallery = el;
      const bg = el.querySelector(".gallery-bg");
      const textWrap = el.querySelector(".gallery-scale");
      const mainTitle = el.querySelector(".main-display-title");
      const top = el.querySelector(".top-label");
      const bottom = el.querySelector(".bottom-description");

      if (!bg || !textWrap || !mainTitle || !top || !bottom) return;

      gsap.set(gallery, {
        clipPath: "circle(0% at 50% 50%)",
      });

      gsap.to(gallery, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "restart none none reverse",
        },
      });

      /* =========================
       2️⃣ Pin + Scale 애니메이션
    ========================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 3,
          anticipatePin: 1,
        },
      });

      tl.to(
        bg,
        {
          filter: "grayscale(0%)",
          borderRadius: "20px",
          ease: "none",
        },
        0,
      )
        .to(
          textWrap,
          {
            scale: 2,
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
