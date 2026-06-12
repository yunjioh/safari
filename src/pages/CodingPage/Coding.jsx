import React from "react";
import "./Coding.css";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import ScrollReveal from "../../components/ScrollReveal";

const codingProjects = [
  {
    id: "01",
    sub: "CLONE CODING 01",
    name: "Y.Studio Agency",
    txt: "메인 비주얼 배너에 슬라이더를 활용한 자동 재생 기능을 구현하였고,\n미디어 쿼리를 통해 레이아웃이 유기적으로 재배치되는 반응형 그리드를 적용하였습니다.",
    img: "/img/coding1.jpg",
    link: "https://yunjioh.github.io/Y.Studio/"
  },
  {
    id: "02",
    sub: "CLONE CODING 02",
    name: "The Dopda Platform",
    txt: '스크롤 이벤트에 맞춰 상단에 고정되는 Fixed 헤더를 제어하였고, \n제이쿼리/자바스크립트의 터치 스와이프 이벤트를 활용하여 메인 배너 슬라이더를 구현하였습니다.',
    img: "/img/coding5.jpg",
    link: "https://yunjioh.github.io/Dopda/"
  },
  {
    id: "03",
    sub: "CLONE CODING 03",
    name: "Crew a la mode Agency",
    txt: '메인 배너의 백그라운드 영상과 Splitting.js를 활용한 텍스트 모션으로 첫 화면을 구성하였고, \nGSAP의 ScrollTrigger를 활용하여 감각적인 스크롤 인터랙션을 구현하였습니다.',
    img: "/img/coding3.jpg",
    link: "https://yunjioh.github.io/Crew-a-la-mode/"
  },
  {
    id: "04",
    sub: "CLONE CODING 04",
    name: "Phomein Website",
    txt: '시맨틱 마크업을 기반으로 단일 페이지 내 많은 정보를 구조화하였고, \n자바스크립트를 활용한 탭(Tab) 메뉴 전환과 아코디언 컴포넌트로 메인 콘텐츠의 시각적 접근성을 높였습니다.',
    img: "/img/coding2.jpg",
    link: "https://yunjioh.github.io/Phomein/"
  },
  {
    id: "05",
    sub: "CLONE CODING 05",
    name: "Musign W. Agency",
    txt: '마우스 무브 이벤트를 활용하여 화면을 따라다니는 커스텀 포인터 효과를 주었고, \nCSS Transition과 패러랙스 스크롤을 연동하여 동적인 시차 모션을 구현하였습니다.',
    img: "/img/coding4.jpg",
    link: "https://yunjioh.github.io/Musign/"
  },
  {
    id: "06",
    sub: "CLONE CODING 06",
    name: "Daebang Website",
    txt: '자바스크립트로 멀티 레벨 GNB 드롭다운과 컨트롤러 연동 슬라이더를 빌드하였고, \nCSS 애니메이션을 활용하여 스크롤에 따라 테두리가 그려지고 색이 채워지는 효과를 구현하였습니다.',
    img: "/img/coding6.jpg",
    link: "https://yunjioh.github.io/Daebang/"
  },
];

export default function Coding() {
  return (
    <section className="coding">
      <div className="coding-container">

        {/* 상단 타이틀 영역 */}
        <div className="coding-info">
          <ScrollReveal delay={0.3}>
            <Title subTitle="HTML · CSS · JavaScript" mainTitle="CLONE CODING" animate={false} />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <SubTitle
              align="right"
              description={[
                { text: "HTML, CSS, JavaScript ", highlight: true, color: "orange" },
                {
                  text: "에 대한 이해를 바탕으로 총 6개의 클론 코딩 프로젝트를 제작했습니다.\n실제 웹사이트의 구조와 인터랙션을 분석하며 반복적인 구현을 통해 ",
                  highlight: false,
                },
                { text: "퍼블리싱과 인터랙션 구현 역량", highlight: true, color: "purple" },
                { text: "을 키웠습니다.", highlight: false },
              ]}
            />
          </ScrollReveal>
        </div>

        {/* 카드 스택 리스트 영역 */}
        <div className="coding-list">
          {codingProjects.map((p, index) => (
            <div
              key={p.id}
              className="slide-card"
              style={{
                // 상단 고정 위치 계산: 카드가 완전히 겹치게 하려면 고정값(예: 80px),
                // 이미지처럼 계단식으로 살짝 보이게 겹치려면 인덱스를 곱해줍니다.
                top: `${80 + index * 25}px`,
                zIndex: index + 1,
              }}
            >
              <div className="card-inner">

                {/* 왼쪽: 프로젝트 정보 */}
                <div className="card-text-side">
                  <span className="card-sub">{p.sub}</span>
                  <div className="txtbox">
                    <h3 className="card-title">{p.name}</h3>
                    <h3 className="card-text">{p.txt}</h3>
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="tag-badge">GO TO SITE →</a>
                </div>

                {/* 오른쪽: 이미지 영역 */}
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <div className="card-img-side">
                    <img src={p.img} alt={p.name} />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
