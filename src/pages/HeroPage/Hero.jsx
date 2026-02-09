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
        opacity: 1,
      });

      // ✅ 비디오 레이어(카드) 초기: 아래에서 대기
      gsap.set(videoLayerRef.current, {
        y: "150%",
        scale: 1.2,
        opacity: 0,
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

      // 1) 중앙 마스크 텍스트가 커지며 사라짐
      tl.to(".decoder-wrap", { 
        opacity: 0, 
        scale: 2.5, 
        ease: "power2.inOut" 
      }, 0);

      // 2) 풀스크린 비디오 카드가 아래에서 올라옴
      tl.to(
        videoLayerRef.current,
        { 
          y: "0%", 
          opacity: 1, 
          scale: 1,
          ease: "power2.out"
        },
        0.2
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="header">
        <div className="hero-name">OH YUNJI</div>
        <nav className="hero-nav">
          <a href="#home" className="active">Home</a>
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

      {/* ✅ 핵심: 사파리 대응 마스크 영역 */}
      <div className="hero-center">
        <div className="decoder-wrap">
          {/* 비디오가 나오는 글자 영역 */}
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
          {/* 글자 외곽선 영역 */}
          <div className="decoder-stroke-text">DECODER</div>
        </div>
      </div>

      {/* ✅ 스크롤 후 나타나는 풀스크린 비디오 */}
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