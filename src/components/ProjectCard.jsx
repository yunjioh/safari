import React from "react";
import Title from "./Title";
import Button from "./Button";
import "../pages/ProjectPage/Project.css";

const ProjectCard = ({ project }) => {
  return (
    <section
      className="project"
      style={{ backgroundColor: project.bg }}
    >
      <div className="project-content">
        <div className="text-area">
          <Title
            subTitle={project.subTitle}
            mainTitle={project.mainTitle}
            animate={false}
          />

          <div className="project-info">
            <p className="duration-text">
              <strong>DURATION</strong> {project.duration}
            </p>

            <div className="role-text">
              <strong>PROJECT ROLE</strong>
              <p>{project.role}</p>
            </div>

            <p className="detail-text">{project.detail}</p>
          </div>

          <div className="bottom">
            {Array.isArray(project.contribution) &&
              project.contribution.length > 0 && (
                <div className="contrib">
                  {project.contribution.map((item, idx) => (
                    <div className="contrib-row" key={idx}>
                      <span className="contrib-label">{item.label}</span>
                      <span className="contrib-value">{item.value}%</span>
                    </div>
                  ))}
                </div>
              )}

            <div className="button-group">
              <Button text="WEBSITE  →" href={project.site}/>
              <Button text="PROPOSAL  →" href={project.doc}/>
            </div>
          </div>
        </div>

        <div className="image-display-area">
          {project.image && (
            <div className="image-wrapper">
              <picture>
                <img src={project.image} alt={`${project.mainTitle} preview`} />
              </picture>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
