import React from "react";
import Title from "./Title";
import Button from "./Button";
import Badge from "./Badge";
import "../pages/ProjectPage/Project.css";

const ProjectCard = ({ project }) => {
  return (
    <section className="project">
      <div className="project-content">
        <div className="inner">
          <div className="text-area">
            <div className="title-wrapper">
              <Title
                subTitle={project.subTitle}
                mainTitle={project.mainTitle}
                animate={false}
              />

              {project.type && (
                <Badge
                  text={project.type === "team" ? "TEAM PROJECT" : "PERSONAL PROJECT"}
                  color={project.bg}
                  rotate={0}
                  position={{ top: "0", right: "0" }}
                />
              )}
            </div>

            <div className="project-info">
              <p className="duration-text">
                <strong style={{ color: `var(${project.bg})` }}>DURATION</strong> {project.duration}
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
              </p>
              <div className="border-box">
                <div className="role-text">
                  <strong style={{ color: `var(${project.bg})` }}>PROJECT ROLE</strong>
                  <p>{project.role}</p>
                </div>

                <p className="detail-text">{project.detail}</p>

                <div className="bottom">
                  <div className="button-group">
                    <Button text="WEBSITE  →" href={project.site} />
                    <Button text="PROPOSAL  →" href={project.doc} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="image-display-area">
            {project.image && (
              <div className="image-wrapper">
                <picture>
                  <img
                    src={project.image}
                    alt={`${project.mainTitle} preview`}
                  />
                </picture>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
