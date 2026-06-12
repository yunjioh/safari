import React from "react";

const CodingCard = ({ item, index }) => {
  return (
    <div className="coding-card-item">
      <div className="coding-card-inner">
        {/* 중앙 텍스트 그룹 */}
        <div className="coding-card-text">
          <span className="coding-card-label">0{index + 1} / CLONE CODING</span>
          <p className="coding-card-title">{item.title}</p>
          <div className="coding-card-tags">
            <span>HTML</span>
            <span>CSS</span>
            <span>Javascript</span>
          </div>
        </div>

        {/* 좌우 배치될 이미지 */}
        <div className="coding-card-thumb">
          <img src={item.image} alt={item.title} />
        </div>
      </div>
    </div>
  );
};

export default CodingCard;
