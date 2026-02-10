import { useEffect, useRef, useState } from "react"; // useState 추가
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const videoLayerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태 추가
useEffect(() => {
  const ctx = gsap.context(() => {
    const videoLayer = videoLayerRef.current;
    const strokeText = heroRef.current?.querySelector(".decoder-mask-container");
    const decoderWrap = heroRef.current?.querySelector(".decoder-wrap");

    // ✅ 초기 상태
    gsap.set(videoLayer, {
      opacity: 0,          // 처음엔 안 보임
      scale: 1.55,         // 처음엔 크게
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
        trigger: heroRef.current,
        start: "top top",
        end: "+=260%",
        scrub: 1,
        pin: true,
      },
    });

    // 1) 텍스트 커지면서 흐려지고 사라짐
    tl.to(
      strokeText,
      {
        scale: 3,
        filter: "blur(14px)",
        opacity: 0,
        ease: "power2.out",
      },
      0
    );

    // 2) 텍스트가 흐려질 때 영상이 보이기 시작
    tl.to(
      videoLayer,
      {
        opacity: 1,
        ease: "power2.out",
      },
      0.12
    );

    // 3) 영상은 크게 보였다가 점점 작아짐 (+ 카드 느낌 옵션)
    tl.to(
      videoLayer,
      {
        scale: 0.8,
        borderRadius: 20,
        ease: "power3.out",
      },
      0.12
    );

    // (선택) 살짝 정돈되며 내려오는 느낌
    tl.to(
      videoLayer,
      {
        yPercent: 6,
        ease: "power3.out",
      },
      0.12
    );

    // decoder-wrap 자체는 완전히 정리 (원하면)
    tl.to(decoderWrap, { opacity: 0, ease: "none" }, 0.2);
  }, heroRef);

  return () => ctx.revert();
}, []);


  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="header">
        <div className="hero-name">OH YUNJI</div>

        {/* ✅ 햄버거 버튼 추가 (1024px 이하에서 노출) */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ✅ 메뉴 클래스에 상태에 따른 active 추가 */}
        <nav className={`hero-nav ${isMenuOpen ? "active" : ""}`}>
          <a
            href="#home"
            className="active"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#process" onClick={() => setIsMenuOpen(false)}>
            Process
          </a>
          <a href="#project" onClick={() => setIsMenuOpen(false)}>
            Project
          </a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </div>

      {/* ... 나머지 JSX (hero-bottomBox, hero-center 등)는 동일 ... */}
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

      <div className="hero-center">
        <div className="decoder-wrap" aria-label="DECODER masked video">
          <div className="decoder-mask-container">
            <video
              className="decoder-video"
              src="/video/video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>

      <div className="full-video-layer" ref={videoLayerRef}>
        <video
          className="full-video"
          src="/video/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-text-overlay">
          <p className="video-text">ABOUT ME</p>
        </div>
      </div>
    </section>
  );
}
