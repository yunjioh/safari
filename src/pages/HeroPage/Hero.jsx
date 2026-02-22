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

    // ✅ 431px 이상: 기존 스크롤 애니메이션 + 텍스트 3개 순차 노출
    mm.add("(min-width: 431px)", () => {
      const strokeText = heroEl.querySelector(".decoder-mask-container");
      const decoderWrap = heroEl.querySelector(".decoder-wrap");
      const overlayTexts = videoLayer.querySelectorAll(".video-text"); // 텍스트 3개 선택

      // 초기 세팅
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

      // 텍스트 초기 상태: 투명하고 살짝 아래에 위치
      gsap.set(overlayTexts, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "+=450%", // 텍스트 3개가 충분히 머물 수 있도록 길이 연장
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1단계: 마스크 뚫리면서 영상 등장 및 축소
      tl.to(strokeText, { scale: 3, filter: "blur(14px)", opacity: 0, ease: "power2.out" }, 0)
        .to(videoLayer, { opacity: 1, ease: "power2.out" }, 0.12)
        .to(videoLayer, { scale: 0.9, borderRadius: 20, ease: "power3.out" }, 0.12)
        .to(videoLayer, { yPercent: 0, ease: "power3.out" }, 0.12) // 위치 조정
        .to(decoderWrap, { opacity: 0, ease: "none" }, 0.2);

      // 2단계: 텍스트 3개 순차 애니메이션 (영상이 작아진 후)
      overlayTexts.forEach((text, index) => {
        const startTime = 0.4 + index * 0.6; // 0.4초 지점부터 간격을 두고 시작
        tl.to(text, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, startTime)
          .to(text, { opacity: 0, y: -50, duration: 0.4, ease: "power2.in" }, startTime + 0.5);
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    // ✅ 430px 이하: 모바일 대응
    mm.add("(max-width: 430px)", () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.set(videoLayer, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        borderRadius: 0,
        clearProps: "all",
      });

      const decoderWrap = heroEl.querySelector(".decoder-wrap");
      const overlayTexts = videoLayer.querySelectorAll(".video-text");
      if (decoderWrap) gsap.set(decoderWrap, { opacity: 0 });

      // 모바일에서는 첫 번째 텍스트만 보여주거나 모두 숨김 처리
      gsap.set(overlayTexts, { opacity: 0, y: 0 });

      return () => { };
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
          <span></span>
          <span></span>
          <span></span>
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
            <video
              className="decoder-video"
              src="/video/video2.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>

      {/* ✅ 풀 영상 및 텍스트 레이어 */}
      <div className="full-video-layer" ref={videoLayerRef}>
        <video
          className="full-video"
          src="/video/video2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-text-overlay">
          <p className="video-text">기술적 이해를 바탕으로</p>
          <p className="video-text">최적의 경험의 설계하는</p>
          <p className="video-text">디자이너 오윤지입니다</p>
        </div>
      </div>
    </section>
  );
}