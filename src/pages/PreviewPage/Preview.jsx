import React from "react";
import "./Preview.css";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";

const Preview = () => {
  return (
    <section className="preview">
      <div className="preview-header">
        <Title subTitle="I CAN DO" mainTitle="UI/UX DESIGN" />
        <SubTitle
          align="right"
          title={`Possesses solid coding skills\nand is proficient in design tools.`}
          description={[
            { text: "탄탄한 ", highlight: false },
            { text: "코딩 스킬", highlight: true, color: "purple" },
            { text: "을 겸비하고 있으며, ", highlight: false },
            { text: "디자인 툴", highlight: true, color: "yellow" },
            { text: "과 AI 도구를 능숙하게 다룹니다.", highlight: false },
          ]}
        />
      </div>
      <div className="down_arrow">
        <div>
          <img src="img/arrow.png" alt="down arrow" />
        </div>
      </div>
    </section>
  );
};

export default Preview;
