import ScrollReveal from "./ScrollReveal";
import "./Title.css";

const Title = ({
  subTitle,
  mainTitle,
  decoTitle,
  animate = true,   // ✅ 기본값 true
}) => {
  const Content = () => (
    <>
      <span className="sub-title">{subTitle}</span>
      <h1 className="title">{mainTitle}</h1>
      <h2 className="title deco">{decoTitle}</h2>
    </>
  );

  return (
    <div className="title-container">
      {animate ? (
        <>
          <ScrollReveal delay={0.1}>
            <span className="sub-title">{subTitle}</span>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h1 className="title">{mainTitle}</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <h2 className="title deco">{decoTitle}</h2>
          </ScrollReveal>
        </>
      ) : (
        <Content />   // ✅ 애니메이션 없이 바로 렌더
      )}
    </div>
  );
};

export default Title;
