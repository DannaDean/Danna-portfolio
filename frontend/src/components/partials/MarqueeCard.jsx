import React from "react";

const MarqueeCard = ({ logos }) => {
    return (
      <div className="marquee__group" aria-hidden="true">
        {logos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <img
              src={logo.src}
              alt={logo.title || `logo-${index}`}
              title={logo.title || ""}
              className={logo.className || ""}
            />
            {logo.title && <span className="logo-title">{logo.title}</span>}
          </div>
        ))}
      </div>
    );
  };

export default MarqueeCard;
