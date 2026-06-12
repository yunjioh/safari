import React, { useState } from "react";
import Title from "./Title";
import Button from "./Button";
import Badge from "./Badge";
import "../pages/ProjectPage/Project.css";

const ProjectCard = ({ project }) => {
  // 💡 현재 보여줄 이미지의 인덱스 상태 관리 (0부터 시작)
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // 안전장치: images 배열 처리 (데이터가 단일 문자열일 경우 배열로 래핑)
  const imgList = project.images || (project.image ? [project.image] : []);

  // 💡 이전 이미지 보기 (1칸씩 역이동)
  const handlePrev = () => {
    setCurrentImgIdx((prev) => {
      // 맨 처음(0)에서 뒤로가면 가장 마지막 이미지 인덱스로 이동
      if (prev === 0) {
        return imgList.length - 1;
      }
      return prev - 1;
    });
  };

  // 💡 다음 이미지 보기 (1칸씩 정이동)
  const handleNext = () => {
    setCurrentImgIdx((prev) => {
      // 맨 마지막 인덱스에서 다음으로 넘어가면 처음(0)으로 리턴
      if (prev === imgList.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <section className="project">
      <div className="project-content">
        <div className="title-wrapper">
          <Title
            subTitle={project.subTitle}
            mainTitle={project.mainTitle}
            animate={false}
          />
          <div className="badge-con">
            {project.type && (
              <Badge
                text={project.type === "team" ? "TEAM PROJECT" : "PERSONAL PROJECT"}
                color={project.bg}
                rotate={0}
                position={{ top: "0", right: "0" }}
              />
            )}</div>
        </div>
        <div className="text-area">
          <div className="project-info">
            <p className="duration-text">
              <strong style={{ color: `var(${project.bg})` }}>DURATION</strong> {project.duration}
            </p>
            {Array.isArray(project.contribution) &&
              project.contribution.length > 0 && (
                <div className="contrib">
                  <div className="con">
                    <strong style={{ color: `var(${project.bg})` }}>Contribution</strong>
                  </div>
                  <div className="num">
                    {project.contribution.map((item, idx) => (
                      <div className="contrib-row" key={idx}>
                        <span className="contrib-label">{item.label}</span>
                        <span className="contrib-value">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <div className="role-text">
              <strong style={{ color: `var(${project.bg})` }}>PROJECT ROLE</strong>
              <p>{project.role}</p>

              <p className="detail-text">{project.detail}</p>

            </div>

            <div className="bottom">
              <div className="button-group">
                <Button text="WEBSITE  →" href={project.site} />
                <Button text="PROPOSAL  →" href={project.doc} />
              </div>
            </div>
          </div>

          {/* 💡 이미지 디스플레이 영역: 1개씩 보여주는 슬라이더 */}
          <div className="image-display-area">
            {imgList.length > 0 && (
              <div className="slider-container">
                {/* 전체 이미지 개수가 1개보다 많을 때만 좌우 제어 버튼 노출 */}
                {imgList.length > 1 && (
                  <button className="slide-btn prev" onClick={handlePrev} aria-label="Previous image">
                    ‹
                  </button>
                )}

                {/* 💡 단일 이미지 래퍼 */}
                <div className="image-pair-wrapper">
                  <div className="image-wrapper">
                    <picture>
                      <img
                        src={imgList[currentImgIdx]}
                        alt={`${project.mainTitle} preview ${currentImgIdx + 1}`}
                      />
                    </picture>
                  </div>
                </div>

                {imgList.length > 1 && (
                  <button className="slide-btn next" onClick={handleNext} aria-label="Next image">
                    ›
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectCard;