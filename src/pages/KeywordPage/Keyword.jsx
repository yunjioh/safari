import React, { useRef, useEffect, useState } from "react";
import "./Keyword.css";
import Badge from "../../components/Badge";

const Keyword = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const photos = [
    {
      id: 1,
      src: "img/key1.svg",
      alt: "Collaboration",
      badge: {
        text: "협업",
        color: "--blue",
        rotate: -15,
        position: { top: "40px", left: "-30px" },
      },
    },
    {
      id: 2,
      src: "img/key2.svg",
      alt: "Discussion",
      badge: {
        text: "열정",
        color: "--orange",
        rotate: 10,
        position: { top: "-14px", right: "-14px" },
      },
    },
    {
      id: 3,
      src: "img/key3.svg",
      alt: "Presentation",
      badge: {
        text: "아이디어",
        color: "--orange",
        rotate: -8,
        position: { top: "40px", left: "-30px" },
      },
    },
    {
      id: 4,
      src: "img/key4.svg",
      alt: "Ideation",
      badge: {
        text: "책임감",
        color: "--purple",
        rotate: -12,
        position: { top: "-14px", right: "-14px" },
      },
    },
    {
      id: 5,
      src: "img/key5.svg",
      alt: "Certificate",
      badge: {
        text: "끈기",
        color: "--purple",
        rotate: -15,
        position: { top: "40px", left: "-30px" },
      },
    },
    {
      id: 6,
      src: "img/key6.svg",
      alt: "Working",
      badge: {
        text: "꼼꼼함",
        color: "--blue",
        rotate: 12,
        position: { top: "-14px", right: "-14px" },
      },
    },
  ];

  const keywords = [
    "COLLABORATION",
    "ENTHUSIASM",
    "IDEATION",
    "PERSISTENCE",
    "RESPONSIBILITY",
    "METICULOUSNESS",
  ];

  // ✅ 랜덤 딜레이: 컴포넌트 생애주기 동안 고정
  const randomDelays = useRef(photos.map(() => Math.random() * 0.7)).current;

  // ✅ 섹션 중앙 진입 감지
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ✅ 중앙 kw-item 계산
  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const centerY = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;

      itemsRef.current.forEach((node, idx) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const dist = Math.abs(midY - centerY);

        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <section
      className={`keyword ${isInView ? "in-view" : ""}`}
      ref={containerRef}
    >
      <p className="section-label">Keyword</p>

      <div className="keyword-container">
        <div className="keyword-text-group">
          {keywords.map((txt, idx) => (
            <h2
              key={txt}
              ref={(el) => (itemsRef.current[idx] = el)}
              className={`kw-item ${activeIndex === idx ? "active" : ""}`}
            >
              {txt}
            </h2>
          ))}
        </div>

        {photos.map((photo, index) => {
          const isActive = activeIndex === index;
          const delay = isInView ? randomDelays[index] : 0;

          return (
            <div
              key={photo.id}
              className={`photo-box photo-${index + 1} ${
                isActive ? "is-active" : ""
              }`}
              style={{
                transitionDelay: isActive ? "0s" : `${delay}s`,
              }}
            >
              <Badge
                text={photo.badge.text}
                color={photo.badge.color}
                rotate={photo.badge.rotate}
                position={photo.badge.position}
                style={{
                  transitionDelay: isActive ? "0s" : `${delay + 0.08}s`,
                }}
              />
              <img src={photo.src} alt={photo.alt} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Keyword;
