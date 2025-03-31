import React from "react";
import "./InfoSection.css";

const InfoSection = ({ id, title, content, image, reverse, children }) => {
  return (
    <section id={id} className={`info-section ${reverse ? "reverse" : ""}`}>
      <div className="info-content">
        <h2>{title}</h2>
        {content && <p>{content}</p>}
        {children && <div className="additional-content">{children}</div>}
      </div>
      {image && (
        <div className="info-image">
          <img src={image} alt={title} />
        </div>
      )}
    </section>
  );
};

export default InfoSection;
