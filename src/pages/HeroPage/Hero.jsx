import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const videoLayerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ 초기값 세팅
      gsap.set(".decoder-wrap", {
        scale: 1,
        transformOrigin: "50% 85%",
        opacity: 1,
      });

      // ✅ 비디오 레이어(카드) 초기: 아래에서 대기 + 안 보임
      gsap.set(videoLayerRef.current, {
        y: "190%",
        scale: 1.5, // ⭐ 처음부터 "카드 크기"로
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

      // 1) 텍스트가 커지며 사라짐
      tl.to(".decoder-wrap", { opacity: 0, scale: 2, ease: "power2.inOut" }, 0);

      // 2) 텍스트가 사라질 때, 영상 카드가 올라오며 나타남
      tl.to(
        videoLayerRef.current,
        { y: "0%", opacity: 1, ease: "power2.out", duration: 1.0 },
        0.25,
      );

      // (원하면) 문구도 여기서 순차 노출 가능
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="header">
        <div className="hero-name">OH YUNJI</div>
        <nav className="hero-nav">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#project">Project</a>
          <a href="#contact">Contact</a>
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

      {/* ✅ DECODER (영상 마스크) */}
      <div className="hero-center">
        <div className="decoder-wrap" aria-label="DECODER masked video">
          <svg
            className="decoder-svg"
            viewBox="0 0 1600 520"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              {/* 마스크: 텍스트 부분만 보이게 */}
              <mask id="decoderMask">
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="50%"
                  y="90%"
                  textAnchor="middle"
                  className="decoder-text"
                  fill="white"
                >
                  DECODER
                </text>
              </mask>
            </defs>

            {/* 영상은 foreignObject로 넣고 mask 적용 */}
            <foreignObject
              x="0"
              y="0"
              width="100%"
              height="100%"
              mask="url(#decoderMask)"
            >
              <div className="decoder-videoBox">
                <video
                  className="decoder-video"
                  src="/video/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </foreignObject>

            {/* 텍스트 외곽선(선명하게) */}
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              className="decoder-stroke"
            >
              DECODER
            </text>
          </svg>
        </div>
      </div>

      {/* ✅ 스크롤 전환: 풀스크린 비디오 레이어 */}
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
