import React, { useState, useEffect } from "react";
import "./Skill.css";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import {
  SiFigma,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiJquery,
  SiOpenai,
  SiGooglegemini,
  SiGreensock,
  SiArtstation,
} from "react-icons/si";

const Skill = () => {
  // 955px 이하 여부 감지
  const [isGrid, setIsGrid] = useState(window.innerWidth <= 955);

  useEffect(() => {
    const handleResize = () => {
      setIsGrid(window.innerWidth <= 955);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skills = [
    {
      id: "figma",
      name: "Figma",
      icon: <SiFigma />,
      color: "var(--blue)",
      desc: "디자인 시스템 구축 및 고도화된 프로토타이핑 가능",
    },
    {
      id: "illustrator",
      name: "Illustrator",
      icon: <SiAdobeillustrator />,
      color: "var(--orange)",
      desc: "벡터 그래픽 및 브랜드 시각화 작업 숙련",
    },
    {
      id: "photoshop",
      name: "Photoshop",
      icon: <SiAdobephotoshop />,
      color: "var(--orange)",
      desc: "고퀄리티 이미지 합성 및 상세 페이지 디자인 가능",
    },
    {
      id: "html",
      name: "HTML5",
      icon: <SiHtml5 />,
      color: "var(--blue)",
      desc: "시맨틱한 마크업 작성이 가능합니다.",
    },
    {
      id: "css",
      name: "CSS3",
      icon: <SiCss3 />,
      color: "var(--blue)",
      desc: "반응형 레이아웃 및 정교한 UI 인터랙션 구현",
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: <SiJavascript />,
      color: "var(--blue)",
      desc: "동적인 데이터 바인딩 및 웹 앱 로직 개발",
    },
    {
      id: "jquery",
      name: "JQuery",
      icon: <SiJquery />,
      color: "var(--orange)",
      desc: "DOM 조작 및 라이브러리 활용을 통한 유지보수",
    },
    {
      id: "react",
      name: "React",
      icon: <SiReact />,
      color: "var(--orange)",
      desc: "컴포넌트 기반 아키텍처 및 상태 관리 도구 활용",
    },
    {
      id: "gsap",
      name: "GSAP",
      icon: <SiGreensock />,
      color: "var(--blue)",
      desc: "스크롤 애니메이션 및 인터랙션 최적화",
    },
    {
      id: "gpt",
      name: "ChatGPT",
      icon: <SiOpenai />,
      color: "var(--blue)",
      desc: "AI 협업을 통한 코드 리뷰 및 업무 자동화",
    },
    {
      id: "midjourney",
      name: "Midjourney",
      icon: <SiArtstation />,
      color: "var(--purple)",
      desc: "AI 이미지 생성 및 컨셉 아트 도출",
    },
    {
      id: "gemini",
      name: "Gemini",
      icon: <SiGooglegemini />,
      color: "var(--blue)",
      desc: "LLM을 활용한 기획 및 데이터 분석",
    },
  ];

  // 그리드 모드일 때는 1세트만, 마키 모드일 때는 무한 루프를 위해 2세트 사용
  const displaySkills = isGrid ? skills : [...skills, ...skills];

  return (
    <section className={`skill ${isGrid ? "grid-mode" : "marquee-mode"}`}>
      <div className="skill-header">
        <div className="header-left">
          <Title subTitle="I CAN DO" mainTitle={`DE-CODER’S\nTOOLKIT`} />
        </div>
        <SubTitle
          align="right"
          title={`Possesses solid coding skills\nand is proficient in design tools.`}
          description={[
            { text: "탄탄한 ", highlight: false },
            { text: "코딩 스킬", highlight: true, color: "purple" },
            { text: "을 겸비하고 있으며, ", highlight: false },
            { text: "디자인 툴", highlight: true, color: "orange" },
            { text: "과 AI 도구를 능숙하게 다룹니다.", highlight: false },
          ]}
        />
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          {displaySkills.map((skill, index) => (
            <div
              key={`${skill.id}-${index}`}
              className="skill-card"
              style={{
                backgroundColor: skill.color,
                color: "#ffffff",
              }}
            >
              <div className="skill-active-title">{skill.name}</div>
              <div className="icon-box">{skill.icon}</div>
              <span className="skill-name">{skill.name}</span>
              <div className="skill-hover-desc">{skill.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
