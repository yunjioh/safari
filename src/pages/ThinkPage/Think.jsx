import "./Think.css";
import Title from "../../components/Title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    id: 1,
    q: "왜 개발이 아닌 UI/UX 디자인을 선택하게 되었나요?",
    a: "컴퓨터공학 전공으로 기능 구현 과정을 이해했지만, 같은 기능이라도 화면 흐름과 인터페이스 설계에 따라 사용자 경험이 크게 달라진다는 점을 체감했습니다. ‘동작하는 기능’보다 사용자의 문제를 정의하고 구조로 풀어내는 역할에 더 매력을 느껴 UI/UX 디자인을 선택하게 되었습니다.",
    color: "#242FBE",
    bg: "/img/think1.svg"
  },
  {
    id: 2,
    q: "디자인할 때 가장 중요하게 생각하는 것은 무엇인가요?",
    a: "가장 중요하게 생각하는 것은 사용자가 판단하기 쉬운 구조입니다. 디자인은 예쁘게 보이는 것보다, 사용자가 이해 → 비교 → 결정 → 행동까지 자연스럽게 이어질 수 있도록 돕는 역할이라고 생각합니다.",
    color: "#F3A4FF",
    bg: "/img/think3.svg"
  },
  {
    id: 3,
    q: "디자인과 개발의 협업에서 본인만의 강점은 무엇인가요?",
    a: "개발 언어를 이해하는 디자인 언어입니다. 개발자와 소통할 때 성능을 고려해 이런 구조로 설계했다고 제안할 수 있어 협업 비용을 획기적으로 낮추고 프로젝트의 퀄리티를 높이는 저만의 핵심 경쟁력입니다.",
    color: "#BEDC39",
    bg: "/img/think2.svg"
  },
  {
    id: 4,
    q: "앞으로 어떤 디자이너가 되고 싶나요?",
    a: "‘경계를 허무는 디자이너’가 되고 싶습니다. 디자인과 개발 사이의 간극을 줄여, 구현 가능한 혁신을 제안하는 전문가를 꿈꿉니다. 단순히 예쁜 인터페이스를 만드는 것을 넘어, 포용적이고 지속 가능한 디자인을 통해 더 많은 사람이 기술의 혜택을 누릴 수 있도록 기여하고 싶습니다.",
    color: "#DC8A39",
    bg: "/img/think4.svg"
  },
];


const Think = () => {

  return (
    <section className="think">
      <div className="think-header">
        <Title
          subTitle="I THINK"
          mainTitle={
            <>
              MY THOUGHTS <br /> ON DESIGN
            </>
          }
        />
      </div>

      <div className="think-container">
        {questions.map((item, i) => (
          <div
            key={item.id}
            className="think-card-wrapper"

          >
            <div className="think-card-inner">
              <div className="think-card front" style={{
                "--card-color": item.color
              }}>
                <span className="think-q-label">QUESTION 0{item.id}</span>
                <p className="think-q-text">{item.q}</p>
                <img src={item.bg} alt="" />
              </div>
              <div className="think-card back" style={{
                "--card-color": item.color
              }}>
                <p className="think-a-text">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section >
  );
};

export default Think;
