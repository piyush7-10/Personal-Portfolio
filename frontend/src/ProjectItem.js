import React from "react";
import "./ProjectItem.css";

const ProjectItem = ({ title, description, skillsUsed, softSkills, image, reverse }) => {
  return (
    <div className={`project-item ${reverse ? "reverse" : ""}`}>
      <div className="project-text">
        <h3>{title}</h3>
        <p className="project-description">{description}</p>
        <p className="project-skills">
          <strong>Skills Used:</strong> {skillsUsed}
        </p>
        <p className="project-soft-skills">
          <strong>Soft Skills:</strong> {softSkills}
        </p>
      </div>
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default ProjectItem;
