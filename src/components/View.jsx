import React from "react";

const View = ({ data }) => {
  return (
    <div className="view-card">
      <div className="view-info">
        <span className="v-tag" style={{ color: data.color }}>
          {data.tag}
        </span>
        <h3 className="v-title">{data.title}</h3>
      </div>

      <div className="v-image-box">
        <img src={data.image} alt={data.title} />
      </div>

      <div className="v-stats-container">
        {data.stats.map((stat, i) => (
          <div key={i} className="v-stat-row">
            <span className="v-stat-label">{stat.label}</span>
            <div className="v-progress-bg">
              <div
                className="v-progress-bar"
                style={{
                  width: stat.value,
                  backgroundColor: data.color,
                }}
              ></div>
            </div>
            <span className="v-stat-value">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
