import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const videoLayerRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const videoLayer = videoLayerRef.current;

    if (!heroEl || !videoLayer) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 431px)", () => {
      const strokeText = heroEl.querySelector(".decoder-mask-container");
      const decoderWrap = heroEl.querySelector(".decoder-wrap");

      if (!strokeText || !decoderWrap) return;

      gsap.set(videoLayer, {
        opacity: 0,
        scale: 1.55,
        borderRadius: 0,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });

      gsap.set(strokeText, {
        opacity: 1,
        scale: 1,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });

      gsap.set(decoderWrap, {
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "+=450%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        strokeText,
        {
          scale: 3,
          opacity: 0,
          ease: "power2.out",
        },
        0
      )
        .to(
          videoLayer,
          {
            opacity: 1,
            ease: "power2.out",
          },
          0.12
        )
        .to(
          videoLayer,
          {
            scale: 0.9,
            borderRadius: 20,
            ease: "power3.out",
          },
          0.12
        )
        .to(
          decoderWrap,
          {
            opacity: 0,
            ease: "none",
          },
          0.2
        );

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 430px)", () => {
      const decoderWrap = heroEl.querySelector(".decoder-wrap");

      gsap.set(videoLayer, {
        opacity: 1,
        scale: 1,
        borderRadius: 0,
        clearProps: "transform",
      });

      if (decoderWrap) {
        gsap.set(decoderWrap, {
          opacity: 0,
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      {/* 하단 텍스트 */}
      <div className="hero-bottomBox">
        <div className="hero-bottom-content">
          <div className="hero-bottom left">
            <p>Designer Yunji Oh</p>
            <p>UI/UX DESIGNER · INTERACTION DESIGNER</p>
          </div>

          <div className="hero-bottom right">
            <p>스스로를 디자인하다</p>
            <p>논리로 기초를 다지고 감각으로 경험을 설계합니다</p>
          </div>
        </div>
      </div>

      {/* DECODER 마스크 */}
      <div className="hero-center">
        <div className="decoder-wrap" aria-label="DECODER masked video">
          <div className="decoder-mask-container">
            <video
              className="decoder-video"
              poster="/img/hero-thumb.webp"
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video/video2.webm" type="video/webm" />
              <source src="/video/video2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* 전체 화면 비디오 */}
      <div className="full-video-layer" ref={videoLayerRef}>
        <video
          className="full-video"
          poster="/img/hero-thumb.webp"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/video2.webm" type="video/webm" />
          <source src="/video/video2.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}