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
      // ✅ 기존 GSAP ScrollTrigger 로직 (동일하게 유지)
      gsap.set(".decoder-wrap", {
        scale: 1,
        transformOrigin: "50% 85%",
        opacity: 1,
      });
      gsap.set(videoLayerRef.current, {
        y: "190%",
        scale: 1.5,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(".decoder-wrap", { opacity: 0, scale: 2, ease: "power2.inOut" }, 0);
      tl.to(
        videoLayerRef.current,
        { y: "0%", opacity: 1, ease: "power2.out", duration: 1.0 },
        0.25,
      );
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
          <div className="decoder-stroke-text">DECODER</div>
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
