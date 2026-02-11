import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const videoLayerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    const videoLayer = videoLayerRef.current;
    if (!heroEl || !videoLayer) return;

    const mm = gsap.matchMedia();

    // ✅ 431px 이상: 기존 스크롤 애니메이션
    mm.add("(min-width: 431px)", () => {
      const strokeText = heroEl.querySelector(".decoder-mask-container");
      const decoderWrap = heroEl.querySelector(".decoder-wrap");

      gsap.set(videoLayer, {
        opacity: 0,
        scale: 1.55,
        yPercent: 0,
        transformOrigin: "50% 50%",
        borderRadius: 0,
      });

      gsap.set(strokeText, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transformOrigin: "50% 50%",
        willChange: "transform, filter, opacity",
      });

      gsap.set(decoderWrap, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(strokeText, { scale: 3, filter: "blur(14px)", opacity: 0, ease: "power2.out" }, 0)
        .to(videoLayer, { opacity: 1, ease: "power2.out" }, 0.12)
        .to(videoLayer, { scale: 0.8, borderRadius: 20, ease: "power3.out" }, 0.12)
        .to(videoLayer, { yPercent: 6, ease: "power3.out" }, 0.12)
        .to(decoderWrap, { opacity: 0, ease: "none" }, 0.2);

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    // ✅ 430px 이하: 스크롤 없이 바로 영상 노출
    mm.add("(max-width: 560px)", () => {
      // 혹시 이전 트리거 남아있으면 정리
      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.set(videoLayer, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        borderRadius: 16,
        clearProps: "filter",
      });

      // 마스크(DECODER) 영역은 필요하면 숨김(영상만 보여주고 싶으면)
      const decoderWrap = heroEl.querySelector(".decoder-wrap");
      if (decoderWrap) gsap.set(decoderWrap, { opacity: 0 });

      return () => {};
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="header">
        <div className="hero-name">OH YUNJI</div>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`hero-nav ${isMenuOpen ? "active" : ""}`}>
          <a href="#home" className="active" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#process" onClick={() => setIsMenuOpen(false)}>Process</a>
          <a href="#project" onClick={() => setIsMenuOpen(false)}>Project</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </nav>
      </div>

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

      {/* 기존 DECODER 마스크 영역 */}
      <div className="hero-center">
        <div className="decoder-wrap" aria-label="DECODER masked video">
          <div className="decoder-mask-container">
            <video className="decoder-video" src="/video/video.mp4" autoPlay muted loop playsInline />
          </div>
        </div>
      </div>

      {/* ✅ 풀 영상 레이어 */}
      <div className="full-video-layer" ref={videoLayerRef}>
        <video className="full-video" src="/video/video.mp4" autoPlay muted loop playsInline />
        <div className="video-text-overlay">
          <p className="video-text">ABOUT ME</p>
        </div>
      </div>

      {/* ✅ 430px에서 보일 마키 텍스트 (영상 아래) */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>OH YUNJI · UI/UX DESIGNER · INTERACTION DESIGN · </span>
          <span>OH YUNJI · UI/UX DESIGNER · INTERACTION DESIGN · </span>
        </div>
      </div>
    </section>
  );
}
