import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../../components/ProjectCard";
import "./Project.css";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    subTitle: "영양제 복용 관리 어플",
    mainTitle: `Dr.Pill app`,
    decoTitle: "MANAGEMENT APP",
    duration: "2025.09 - 2025.10",
    role: "“이 프로젝트에서는 서비스의 UX 기획부터 최종 디자인까지 전 과정을 수행하였습니다”",
    detail: `더블 다이아몬드 프로세스를 바탕으로 데스크 리서치와 사용자 조사를 통해 문제를 정의하고, 
페르소나 및 여정 지도를 설계하여 전략적 솔루션을 도출했습니다.
이를 정보 구조(IA)와 와이어프레임으로 구체화한 뒤, 일관된 디자인 시스템을 구축하여 서비스 전반의 UI를 설계했습니다.
총 4차례의 피드백 과정을 거쳐 스토리보드와 인터랙션이 포함된 고도화된 프로토타입을 제작하며, 
기획부터 최종 전달(Deliver)까지의 프로젝트 사이클을 완수했습니다.`,
    image: "/img/project1.svg",
    pointColor: "var(--blue)",
    bgGradient: "#F1EFDF",
    contribution: [
      { label: "기획", value: 90 },
      { label: "디자인", value: 90 },
      { label: "개발", value: 60 },
    ],
  },
  {
    subTitle: "댄서 원밀리언 웹사이트 리뉴얼",
    mainTitle: `1MILLION website`,
    decoTitle: "WEBSITE RENEWAL",
    duration: "2025.11 - 2025.12",
    role: "“이 프로젝트에서는 서브 디자이너 및 프론트엔드 메인 코더로서 팀을 지원했습니다”",
    detail: `원밀리언 브랜드의 역동성을 시각화한 메인 페이지 디자인을 수행하고, 
카드 UI와 디자인 가이드를 구축하여 프로젝트 전반의 시각적 일관성을 확보했습니다. 
이를 바탕으로 전체 페이지의 반응형 구현을 전담하며 GSAP 애니메이션을 절제 있게 적용해 디자인 의도를 기술적으로 
정교하게 구현했습니다. 최종적으로 인터랙션 안정화와 QA를 거쳐, 설계한 디자인 시스템이 배포 환경까지 완성도 높게 
유지되도록 기여했습니다.`,
    image: "/img/project2.svg",
    pointColor: "var(--orange)",
    bgGradient: "#F5FFC9",
    contribution: [
      { label: "기획", value: 90 },
      { label: "디자인", value: 90 },
      { label: "개발", value: 60 },
    ],
  },
  {
    subTitle: "버츄얼 팬덤 어플",
    mainTitle: `NOVA app`,
    decoTitle: "NOVA APP",
    duration: "2025.12 - 2026.01",
    role: "“이 프로젝트에서는 메인 페이지와 핵심 기능을 디자인하고, 이후 개발에 참여하여 배포하였습니다”",
    detail: `이 프로젝트의 메인 디자이너로서 서비스의 시각 시스템을 총괄하며 메인 페이지와 핵심 기능을 디자인했습니다. 
직접 설계한 화면을 React 기반의 컴포넌트 단위로 구현하여 디자인 의도가 반영되도록 하였습니다. 
이후 배너와 포스터 등 제작은 물론, Vercel 배포와 최종 QA를 도맡아 하며 실제 서비스로 완성되는 전 과정을 책임졌습니다.`,
    image: "/img/project3.svg",
    pointColor: "var(--purple)",
    bgGradient: "#E1DAF7",
    contribution: [
      { label: "기획", value: 90 },
      { label: "디자인", value: 90 },
      { label: "개발", value: 60 },
    ],
  },
];

const Project = () => {
  const BASE_TOP = 80;
  const STACK_GAP = 28;
  return (
    <main className="project-page">
      <section className="project-sticky-stack">
        {projectData.map((project, idx) => (
          <div
            key={project.id}
            className="project-sticky-item"
            style={{ top: `${BASE_TOP + idx * STACK_GAP}px`, zIndex: 10 + idx,  "--bg-gradient": project.bgGradient, }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Project;
