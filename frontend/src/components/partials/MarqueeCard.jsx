import React from "react";
import getImageSrc from "../../utils/getImageSrc";

const MarqueeCard = ({ skills }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

    return (
      <div className="marquee__group" aria-hidden="true">
        {skills.map((skill, index) => (
          <div className="logo-item" key={index}>
            <img
              src={getImageSrc(skill.image, backendUrl)}
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
