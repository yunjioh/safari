import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Coding.css";
import Title from "../../components/Title";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const codingProjects = [
  { id: "01", name: "Y.Studio Agency", img: "/img/coding1.png" },
  { id: "02", name: "Daebang Website", img: "/img/coding2.png" },
  { id: "03", name: "Grew a la mode Agency", img: "/img/coding5.png" },
  { id: "04", name: "Musign W. Agency", img: "/img/coding4.png" },
  { id: "05", name: "The Dopda Platform", img: "/img/coding3.png" },
  { id: "06", name: "Phomein Website", img: "/img/coding6.png" },
];

const Coding = () => {
  const projects = useMemo(() => codingProjects, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const trackRef = useRef(null);

  const scrollToIndex = (idx) => {
    const el = trackRef.current;
    if (!el) return;

    const slides = el.querySelectorAll(".slide");
    const target = slides[idx];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const handleNext = () => {
    const next = Math.min(currentIndex + 1, projects.length - 1);
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const handlePrev = () => {
    const prev = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prev);
    scrollToIndex(prev);
  };

  // ✅ 스크롤 중심에 가장 가까운 카드로 currentIndex 갱신
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const slides = Array.from(el.querySelectorAll(".slide"));
        const centerX = el.scrollLeft + el.clientWidth / 2;

        let bestIdx = 0;
        let bestDist = Infinity;

        slides.forEach((s, idx) => {
          const sCenter = s.offsetLeft + s.clientWidth / 2;
          const dist = Math.abs(centerX - sCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });

        setCurrentIndex(bestIdx);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ✅ 마우스 드래그 스와이프
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e) => {
      isDown = true;
      el.classList.add("is-dragging");
      startX = e.pageX;
      startScroll = el.scrollLeft;
    };

    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      el.scrollLeft = startScroll - dx;
    };

    const onUp = () => {
      isDown = false;
      el.classList.remove("is-dragging");
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const project = projects[currentIndex];

  return (
    <section className="coding">
      <div className="coding-container">
        <div className="coding-info">
          <Title subTitle="HTML · CSS · JavaScript" mainTitle="CLONE CODING" animate={false} />
          <p className="coding-desc">
            실제 웹사이트를 분석해 레이아웃과 인터랙션을 구현했습니다.
            가로 스크롤로 프로젝트를 탐색할 수 있습니다.
          </p>
        </div>
        <div className="coding-visual">
          <div className="swiper-wrap">
            {/* pill */}
            <div className="tech-tabs">
              <div className="tech-tab orange">HTML</div>
              <div className="tech-tab neon">CSS</div>
              <div className="tech-tab blue">JAVASCRIPT</div>
            </div>

            {/* left arrow */}
            <button className="nav-btn nav-left" onClick={handlePrev} aria-label="Prev">
              <FaArrowLeft />
            </button>

            {/* ✅ 가로 스크롤 */}
            <div className="swiper" ref={trackRef}>
              {projects.map((p, idx) => (
                <article className={`slide ${idx === currentIndex ? "is-active" : ""}`} key={p.id}>
                  <div className="slide-media">
                    <img src={p.img} alt={p.name} draggable="false" />
                  </div>
                </article>
              ))}
            </div>

            {/* right arrow */}
            <button className="nav-btn nav-right" onClick={handleNext} aria-label="Next">
              <FaArrowRight />
            </button>
          </div>

          <p className="ring-caption">
            {project.id}. {project.name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Coding;
