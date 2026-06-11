import React, { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { websiteProjects } from "./Website";
import Contact from "../ContactPage/Contact";
import Button from "../../components/Button";
import "./WebsiteDetail.css"; // 💡 분리된 CSS 파일 임포트

export default function WebsiteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = websiteProjects.findIndex((item) => item.id === id);
  const project = websiteProjects[currentIndex];

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  if (!project) {
    return (
      <div className="detail-error">
        프로젝트를 찾을 수 없습니다.
      </div>
    );
  }

  const prevProject = websiteProjects[currentIndex - 1];
  const nextProject = websiteProjects[currentIndex + 1];

  return (
    <>
      {/* 프로젝트 정보 */}
      <section className="detail-page">
        <div className="detail-container">
          <div className="detail-nav">
            <Button
              text="← BACK TO LIST"
              onClick={() =>
                navigate("/", { state: { fromSection: "website" } })
              }
            />
          </div>

          <div className="detail-header">
            <span className="meta-value">{project.contribution}</span>
            <h1 className="project-title">
              {project.name} 디자인
              <br />
              PC · Mobile Web
            </h1>
          </div>

          <div className="detail-content">
            <div className="concept-box">
              <h3 className="concept-title">{project.sub}</h3>
              <p className="concept-txt">
                {project.txt}
                <br />
                최신 트렌드 반영 및 사용자 관점의 User Friendly 제공하고
                사용자의 환경에 맞추어 PC, 태블릿, 모바일 등 어떠한 환경에서도
                최적화되어 볼 수 있도록 반응형웹을 타겟으로 각 화면에서 보여줄
                최적의 배치를 고려하여 디자인을 완성하였습니다.
              </p>
            </div>
            <div className="pre-visual">
              <img src={project.img} alt={project.name} />
            </div>
          </div>
        </div>
      </section>

      {/* 상세 이미지 */}
      <section className="detail-visual-section">
        <div className="detail-visual">
          <img src={project.detail} alt={project.name} />
        </div>
      </section>

      {/* 이전 / 다음 */}
      <section className="detail-pagination-section">
        <div className="detail-container">
          <div className="detail-pagination">
            {prevProject ? (
              <Button
                className="page-btn prev"
                onClick={() => navigate(`/website/${prevProject.id}`)}
                text="← PREV PROJECT"
              />
            ) : (
              <div className="page-empty" />
            )}

            {nextProject && (
              <Button
                text="NEXT PROJECT →"
                className="page-btn next"
                onClick={() => navigate(`/website/${nextProject.id}`)}
              />
            )}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}