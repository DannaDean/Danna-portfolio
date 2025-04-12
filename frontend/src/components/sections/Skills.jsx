import Button from "../partials/Button";
import MarqueeCard from "../partials/MarqueeCard";
import html from "../../assets/images/skills/html.svg";
import css from "../../assets/images/skills/css.svg";
import js from "../../assets/images/skills/js.svg";
import react from "../../assets/images/skills/react.svg";
import mysql from "../../assets/images/skills/mysql.svg";
import php from "../../assets/images/skills/php.svg";
import figma from "../../assets/images/skills/figma.svg";
import laravel from "../../assets/images/skills/laravel.svg";
import photoshop from "../../assets/images/skills/photoshop.svg";

const logos = [
  { src: html, title: "HTML" },
  { src: css, title: "CSS/SCSS" },
  { src: js, title: "JavaScript" },
  { src: react, title: "React" },
  { src: mysql, title: "MySQL" },
  { src: php, title: "PHP" },
  { src: figma, title: "Figma" },
  { src: laravel, title: "Laravel" },
  { src: photoshop, title: "Photoshop" },
];

const Skills = () => {
  return (
    <section className="skills">
      <div className="container">
        <div className="marquee-container">
          <p>Coding Skills:</p>
          <div className="marquee marquee--reverse">
            <MarqueeCard logos={logos} />
            <MarqueeCard logos={logos} />
          </div>
        </div>
        <div className="conect-box">
          <h3>Ready to get started?</h3>
          <Button href={"#getInTouch"} bgColor="rgba(208, 150, 223, 1)" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
