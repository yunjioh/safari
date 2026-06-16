import React from "react";
import "./Website.css"
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import ScrollReveal from "../../components/ScrollReveal";
import { Link } from "react-router-dom";

export const websiteProjects = [
  {
    id: "01",
    sub: "세리프 계열의 우아한 타이포그래피와 브랜드의 감성을 담아 직관성과 트렌드를 모두 담은 디자인",
    name: "J1.Global 웹사이트",
    txt: "베이지 톤의 백그라운드를 강점으로 트렌드에 집중하나 과하지 않은 배치를 통해 명확한 배치 구조를 나타내어 브랜드 메세지를 클린하게 전달하고자 노력하였습니다.",
    contribution: "서브페이지 제작 60%",
    img: "/img/web1.jpg",
    detail: "/img/detail1.jpg",
    link: "#"
  },
  {
    id: "02",
    sub: "레이아웃의 충분한 구조를 통한 정돈되고 안정적으로 브랜드의 내용을 전달하는 디자인",
    name: "메이저위드 웹사이트",
    txt: "브랜드 내용에 대한 깊이 있는 전달을 위해 진중한 느낌의 컬러 사용 및 충분한 여백 등으로 깔끔한 정보 전달을 고려하여 설계하였습니다.",
    contribution: "서브페이지 제작 60%",
    img: "/img/web2.jpg",
    detail: "/img/detail2.jpg",
    link: "#"
  },
  {
    id: "03",
    sub: "형식적이지 않은 레이아웃으로 독특하면서 고급스러운 디자인하는 디자인",
    name: "대치교육 웹사이트",
    txt: "최신 트렌드의 레이아웃으로 쉽고 직관적인 메인디자인으로 CI의 컬러를 포인트 컬러로 구성하였습니다.",
    contribution: "메인페이지(랜딩페이지) 제작 40%",
    img: "/img/web3.jpg",
    detail: "/img/detail3.jpg",
    link: "#"
  },
  {
    id: "04",
    sub: "절제된 강조의 디자인과, 구조의 리듬감을 통해 정통적인 수단으로 기업의 무게감을 표현한 디자인",
    name: "세종메딕스 웹사이트",
    txt: "내포된 뜻이 있는 이미지의 사용 및 화려한 장식보다는 계산적인 여백 간격 등을 통해 정통적인 수단으로 기업의 무게감을 컬러 및 레이아웃을 통해 표현할 수 있도록 설계하였습니다.",
    contribution: "전체 서브페이지 제작",
    img: "/img/web4.jpg",
    detail: "/img/detail4.jpg",
    link: "#"
  },
  {
    id: "05",
    sub: "형식적이지 않은 레이아웃으로 독특하면서 고급스러운 디자인",
    name: "토트게이트 웹사이트",
    txt: "최신 트렌드의 레이아웃으로 쉽고 직관적인 메인디자인으로 CI의 컬러를 포인트 컬러로 구성하였습니다.",
    contribution: "전체 서브페이지 제작",
    img: "/img/web5.jpg",
    detail: "/img/detail5.jpg",
    link: "#"
  },
  {
    id: "06",
    sub: "브랜드 컬러의 무드와 활기를 자연스럽게 강조하여 행동 유도를 중점으로 구성한 디자인",
    name: "유니에스 웹사이트",
    txt: "넓게 펼쳐진 비주얼과 안정적인 타이포 배치로 기업의 핵심 메시지가 직관적으로 전달되도록 구성하였습니다.",
    contribution: "전체 서브페이지 제작",
    img: "/img/web6.jpg",
    detail: "/img/detail6.jpg",
    link: "#"
  },
  {
    id: "07",
    sub: "명확한 정보 구조를 통해 접근성을 균형 있게 설계한 디자인",
    name: "호서대학교 녹색금융대학원 웹사이트",
    txt: "녹색금융이라는 전문적이고 추상적인 개념을, 신뢰감 있는 이미지 사용과 명확한 정보 구조를 통해 누구나 쉽게 이해할 수 있도록 설계하였습니다.",
    contribution: "서브페이지 제작 60%",
    img: "/img/web7.jpg",
    detail: "/img/detail7.jpg",
    link: "#"
  },
  {
    id: "08",
    sub: "확장감 있는 비주얼과 직관적인 사용자 경험을 고려한 세련된 디자인",
    name: "플라사드 웹사이트",
    txt: "넓게 펼쳐진 비주얼과 안정적인 타이포 배치로 기업의 핵심 메시지가 직관적으로 전달되도록 구성하였습니다.",
    contribution: "전체 서브페이지 제작",
    img: "/img/web8.jpg",
    detail: "/img/detail8.jpg",
    link: "#"
  },
  {
    id: "09",
    sub: "형식적이지 않은 레이아웃으로 독특하면서 고급스러운 디자인하는 디자인",
    name: "기후위기대응연구원 웹사이트",
    txt: "최신 트렌드의 레이아웃으로 쉽고 직관적인 메인디자인으로 CI의 컬러를 포인트 컬러로 구성하였습니다.",
    contribution: "전체 서브페이지 제작",
    img: "/img/web9.jpg",
    detail: "/img/detail9.jpg",
    link: "#"
  },
  {
    id: "10",
    sub: "형식적이지 않은 레이아웃으로 독특하면서 고급스러운 디자인하는 디자인",
    name: "윈터그린 웹사이트",
    txt: "최신 트렌드의 레이아웃으로 쉽고 직관적인 메인디자인으로 CI의 컬러를 포인트 컬러로 구성하였습니다.",
    contribution: "메인페이지 40% · 전체 서브페이지 제작",
    img: "/img/web10.jpg",
    detail: "/img/detail10.jpg",
    link: "#"
  },
  {
    id: "11",
    sub: "형식적이지 않은 레이아웃으로 독특하면서 고급스러운 디자인하는 디자인",
    name: "한서건설 웹사이트",
    txt: "최신 트렌드의 레이아웃으로 쉽고 직관적인 메인디자인으로 CI의 컬러를 포인트 컬러로 구성하였습니다.",
    contribution: "전체 서브페이지 제작",
    img: "/img/web11.jpg",
    detail: "/img/detail11.jpg",
    link: "#"
  },
  {
    id: "12",
    sub: "형식적이지 않은 레이아웃으로 독특하면서 고급스러운 디자인하는 디자인",
    name: "이티워터 웹사이트",
    txt: "최신 트렌드의 레이아웃으로 쉽고 직관적인 메인디자인으로 CI의 컬러를 포인트 컬러로 구성하였습니다.",
    contribution: "메인페이지 80% · 전체 서브페이지 제작",
    img: "/img/web12.jpg",
    detail: "/img/detail12.jpg",
    link: "#"
  }
];

export default function Website() {
  return (
    <section id="website" className="website js-reveal">
      <div className="website-container">

        <div className="website-info">
          <ScrollReveal delay={0.3}>
            <Title subTitle="MAIN · SUB DESIGN" mainTitle="WEB DESIGN" animate={false} />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <SubTitle
              align="right"
              description={[
                { text: "브랜드의 성격", highlight: true, color: "orange" },
                { text: "과 ", highlight: false },
                { text: "사용자 경험", highlight: true, color: "purple" },
                { text: "을 고려한 맞춤형 디자인부터, \n퍼블리셔와의 긴밀한 협업으로 완성도를 높인 실무 컬렉션입니다.", highlight: false },
              ]}
            />
          </ScrollReveal>
        </div>

        <div className="website-grid">
          {websiteProjects.map((project, index) => {
            const rowDelay = Math.floor(index / 2) * 0.2;
            const itemDelay = (index % 2) * 0.1;
            const finalDelay = 0.2 + rowDelay + itemDelay;

            return (
              <ScrollReveal key={project.id} delay={finalDelay}>
                <div className="website-item">
                  <div className="titbox">
                    <div className="tit">
                      <div className="dot">
                        <img src="/img/dot.png" alt="" />
                      </div>
                      <h3 className="item-name">{project.name}</h3>
                    </div>
                  </div>

                  <Link to={`/website/${project.id}`} className="screen">
                    <img src={project.img} alt={project.name} />
                    <p className="imgtxt">{project.name}<br/>자세히 보기</p>
                  </Link>

                  <div className="item-bottom">
                    <p className="item-txt">
                      {project.txt}
                    </p>
                    <p><strong>기여도</strong>{project.contribution}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
