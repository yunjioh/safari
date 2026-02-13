import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hobby.css";
import ScrollReveal from "../../components/ScrollReveal";
import SubTitle from "../../components/SubTitle";

gsap.registerPlugin(ScrollTrigger);

const hobbyList = [
  { id: 1, title: "HEALING", img: "/img/hobby1.svg", label: "Mind" },
  { id: 2, title: "TAKE\nPHOTO", img: "/img/hobby2.svg", label: "Culture" },
  {
    id: 3,
    title: "VISIT\nEXHIBITION",
    img: "/img/hobby3.svg",
    label: "Inspiration",
  },
  { id: 4, title: "World\nTravel", img: "/img/hobby4.svg", label: "History" },
  {
    id: 5,
    title: "MAKING\nPERFUME",
    img: "/img/hobby7.svg",
    label: "Experience",
  },
  { id: 6, title: "Daily\nActivity", img: "/img/hobby6.svg", label: "Energy" },
  { id: 7, title: "VISIT\nMUSEUM", img: "/img/hobby5.svg", label: "Discovery" },
];

const Hobby = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hobby-list",
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
  }, []);
  useEffect(() => {
    // 1. 중앙 선 애니메이션 (기존 유지)
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hobby-list",
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );

    // 2. 이미지 개별 패럴랙스 효과 추가
    const items = document.querySelectorAll(".hobby-item");
    items.forEach((item) => {
      const img = item.querySelector(".hobby-thumb img");

      gsap.fromTo(
        img,
        {
          y: 30,
        },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top 60%", // 화면 하단에 보일 때부터
            end: "bottom top", // 화면 상단으로 사라질 때까지
            scrub: 1.5, // 선보다 약간 더 쫀득하게(느리게) 반응
          },
        },
      );
    });
  }, []);

  return (
    <section className="hobby" id="process">
      <div className="hobby-header">
        <ScrollReveal delay={0.1}>
          <h2 className="hobbyTit">
            HOBBIES:{" "}
            <span>MUSIC · EXERCISE · INSPIRATION · THEATER · TRAVEL</span>
          </h2>
        </ScrollReveal>
        <SubTitle
          align="right"
          title={`Curious about experiences, \ninspired by moments.`}
          description={[
            { text: "다양한 경험에서 ", highlight: false },
            { text: " 영감", highlight: true, color: "purple" },
            { text: "을 얻고, 일상의 순간을 ", highlight: false },
            { text: "관찰", highlight: true, color: "orange" },
            { text: "합니다.", highlight: false },
          ]}
        />
      </div>
      <div className="selected-projects-label">START</div>

      <div className="hobby-list">
        <div
          className="hobby-line"
          ref={lineRef}
          style={{ transformOrigin: "top" }}
        />

        {hobbyList.map((item) => (
          <div className="hobby-item" key={item.id}>
            <div className="hobby-text">
              <span className="hobby-label">{item.label}</span>
              <p className="hobby-title">{item.title}</p>
            </div>

            <div className="hobby-thumb">
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobby;
