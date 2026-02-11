import "./SubTitle.css";
import ScrollReveal from "./ScrollReveal";

export default function SubTitle({ title, description, align = "right" }) {
  return (
    <div className={`subTitle ${align}`}>
      {title && (
        <ScrollReveal delay={0.2}>
          <h3 className="sub-phrase">
            {title.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </h3>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.3}>
        <p className="sub-desc">
          {description.map((item, idx) =>
            item.highlight ? (
              <span key={idx} className={`highlight ${item.color || ""}`}>
                {item.text}
              </span>
            ) : (
              <span key={idx}>{item.text}</span>
            ),
          )}
        </p>
      </ScrollReveal>
    </div>
  );
}
