import React from "react";

const MarqueeCard = ({ skills }) => {
    return (
      <div className="marquee__group" aria-hidden="true">
        {skills.map((skill, index) => (
          <div className="logo-item" key={index}>
            <img
              src={skill.image}
              alt={skill.title || `logo-${index}`}
              title={skill.title || ""}
              className={skill.className || ""}
            />
            {skill.title && <span className="logo-title">{skill.title}</span>}
          </div>
        ))}
      </div>
    );
  };

export default MarqueeCard;
