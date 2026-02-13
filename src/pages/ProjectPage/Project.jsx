import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../../components/ProjectCard";
import "./Project.css";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    subTitle: "영양제 복용 관리 어플",
    mainTitle: "Dr.Pill app",
    decoTitle: "MANAGEMENT APP",
    duration: "2025.10.22 - 2025.11.21",
    role: "“이 프로젝트에서는 서비스의 UX 기획부터 최종 디자인까지 전 과정을 수행하였습니다”",
    detail: `더블 다이아몬드 프로세스를 바탕으로 데스크 리서치와 사용자 조사를 통해 문제를 정의하고, 
페르소나 및 여정 지도를 설계하여 전략적 솔루션을 도출했습니다.
이를 정보 구조(IA)와 와이어프레임으로 구체화한 뒤, 일관된 디자인 시스템을 구축하여 서비스 전반의 UI를 설계했습니다.
총 4차례의 피드백 과정을 거쳐 스토리보드와 인터랙션이 포함된 고도화된 프로토타입을 제작하며, 
기획부터 최종 전달(Deliver)까지의 프로젝트 사이클을 완수했습니다.`,
    image: "/img/project1.svg",
    imageMobile: "/img/project1_mo.svg",
    bg: "#021526",
    contribution: [
      { label: "기획", value: 100 },
      { label: "디자인", value: 100 },
      { label: "개발", value: 100 },
    ],
    site: "https://www.figma.com/proto/aXpojpcM780EqJOBHuUMLw/14.%EC%98%A4%EC%9C%A4%EC%A7%80?page-id=1838%3A3633&node-id=1841-1083&viewport=361%2C277%2C0.2&t=JW121MXqmAnZxrrL-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1841%3A1107",
    doc: "https://www.figma.com/proto/KzhIKNZbXJiO85fA9b1NGw/%EC%98%A4%EC%9C%A4%EC%A7%80?page-id=1%3A2343&node-id=1-3024&viewport=-1303%2C-7159%2C0.64&t=kO4sUMMgftaijTtf-1&scaling=scale-down-width&content-scaling=fixed",
  },
  {
    subTitle: "댄서 원밀리언 웹사이트 리뉴얼",
    mainTitle: "1MILLION web",
    decoTitle: "WEBSITE RENEWAL",
    duration: "2025.11.26 - 2025.12.28",
    role: "“이 프로젝트에서는 서브 디자이너 및 프론트엔드 메인 코더로서 팀을 지원했습니다”",
    detail: `원밀리언 브랜드의 역동성을 시각화한 메인 페이지 디자인을 수행하고, 
카드 UI와 디자인 가이드를 구축하여 프로젝트 전반의 시각적 일관성을 확보했습니다. 
이를 바탕으로 전체 페이지의 반응형 구현을 전담하며 GSAP 애니메이션을 절제 있게 적용해 디자인 의도를 기술적으로 
정교하게 구현했습니다. 최종적으로 인터랙션 안정화와 QA를 거쳐, 설계한 디자인 시스템이 배포 환경까지 완성도 높게 
유지되도록 기여했습니다.`,
    image: "/img/project2.svg",
    imageMobile: "/img/project2_mo.svg",
    bg: "#FB773C",
    contribution: [
      { label: "기획", value: 80 },
      { label: "디자인", value: 80 },
      { label: "개발", value: 90 },
    ],
    site: "https://yunjioh.github.io/1million/",
    doc: "https://www.figma.com/proto/aXpojpcM780EqJOBHuUMLw/14.%EC%98%A4%EC%9C%A4%EC%A7%80?page-id=1730%3A2501&node-id=2166-7882&viewport=518%2C307%2C0.02&t=e1lP80PZXa264VIY-1&scaling=scale-down-width&content-scaling=fixed",
  },
  {
    subTitle: "버츄얼 팬덤 어플",
    mainTitle: "NOVA app",
    decoTitle: "NOVA APP",
    duration: "2025.01.02 - 2026.01.26",
    role: "“이 프로젝트에서는 메인 페이지와 핵심 기능을 디자인하고, 이후 개발에 참여하여 배포하였습니다”",
    detail: `이 프로젝트의 메인 디자이너로서 서비스의 시각 시스템을 총괄하며 메인 페이지와 핵심 기능을 디자인했습니다. 
직접 설계한 화면을 React 기반의 컴포넌트 단위로 구현하여 디자인 의도가 반영되도록 하였습니다. 
이후 배너와 포스터 등 제작은 물론, Vercel 배포와 최종 QA를 도맡아 하며 실제 서비스로 완성되는 전 과정을 책임졌습니다.`,
    image: "/img/project3.svg",
    imageMobile: "/img/project3_mo.svg",
    bg: "#0B2F9F",
    contribution: [
      { label: "기획", value: 70 },
      { label: "디자인", value: 70 },
      { label: "개발", value: 90 },
    ],
    site: "https://tubi-team-project.vercel.app/",
    doc: "https://www.figma.com/proto/aXpojpcM780EqJOBHuUMLw/14.%EC%98%A4%EC%9C%A4%EC%A7%80?page-id=1730%3A2501&node-id=2166-6413&viewport=518%2C307%2C0.02&t=e1lP80PZXa264VIY-1&scaling=scale-down-width&content-scaling=fixed",
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const bg = section.querySelector(".project-bg");
      const panels = gsap.utils.toArray(".project-panel");

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(bg, { backgroundColor: projectData[0].bg });

        // 내부 요소 초기값
        panels.forEach((panel) => {
          const text = panel.querySelector(".text-area");
          const image = panel.querySelector(".image-display-area");
          if (text) gsap.set(text, { autoAlpha: 0, x: -70 });
          if (image) gsap.set(image, { autoAlpha: 0, x: 70 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${projectData.length * 100}%`,
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        // ✅ 0번(첫 카드) 켜고, 첫 카드도 등장 애니메이션
        tl.set(panels[0], { autoAlpha: 1 }, 0);

        const firstText = panels[0].querySelector(".text-area");
        const firstImg = panels[0].querySelector(".image-display-area");

        tl.to(firstText, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        tl.to(firstImg, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0.18);

        // ✅ 1번부터 전환 애니메이션
        projectData.forEach((p, i) => {
          if (i === 0) return;

          const prev = panels[i - 1];
          const cur = panels[i];

          const prevText = prev.querySelector(".text-area");
          const prevImg = prev.querySelector(".image-display-area");
          const curText = cur.querySelector(".text-area");
          const curImg = cur.querySelector(".image-display-area");

          tl.to(bg, { backgroundColor: p.bg, ease: "none" }, i);

          tl.to(prevText, { autoAlpha: 0, x: -70, duration: 0.35, ease: "power2.out" }, i);
          tl.to(prevImg, { autoAlpha: 0, x: 70, duration: 0.35, ease: "power2.out" }, i);

          tl.to(prev, { autoAlpha: 0, duration: 0.2, ease: "none" }, i + 0.05);

          tl.set(cur, { autoAlpha: 1 }, i + 0.1);

          tl.set(curText, { autoAlpha: 0, x: -70 }, i + 0.1);
          tl.set(curImg, { autoAlpha: 0, x: 70 }, i + 0.1);

          tl.to(curText, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, i + 0.18);
          tl.to(curImg, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, i + 0.24);
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
      });

      /* =========================
         모바일
      ========================= */
      mm.add("(max-width: 768px)", () => {
        gsap.set(bg, { backgroundColor: "#fff" });
        gsap.set(panels, {
          clearProps: "all",
          autoAlpha: 1,
          position: "relative",
          y: 0,
        });

        panels.forEach((panel) => {
          const text = panel.querySelector(".text-area");
          const image = panel.querySelector(".image-display-area");
          if (text) gsap.set(text, { clearProps: "all" });
          if (image) gsap.set(image, { clearProps: "all" });
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="project-section" ref={sectionRef} id="project">
      <div className="project-bg" aria-hidden="true" />
      <div className="project-inner">
        {projectData.map((project, idx) => (
          <div className="project-panel" key={idx}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
