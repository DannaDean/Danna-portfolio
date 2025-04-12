import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Box from "../partials/Box";
import Project from "../partials/Project";
import Button from "../partials/Button";
import flowerImg from "../../assets/images/flowers/flower-2.png";
import proj11 from "../../assets/images/projects/project1-1.png";
import proj12 from "../../assets/images/projects/project1-1.png";
import proj21 from "../../assets/images/projects/project2-1.png";
import proj22 from "../../assets/images/projects/project2-2.png";

const Projects = () => {
  const projectData = [
    {
      srcOne: proj11,
      srcTwo: proj12,
      link: "#",
      title: "Parenting App Website",
      categories: [
        "Web Design",
        "Copywriting",
        "D2C",
        "Food",
        "Sustainability",
      ],
    },
    {
      srcOne: proj21,
      srcTwo: proj22,
      link: "#",
      title: "Plant-forward Meal Delivery Website",
      categories: ["Web Design", "AI", "Parenthood"],
    },
  ];

  const flowerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const yPosition = -scrollY * 0.3; 

      if (flowerRef.current) {  
        gsap.to(flowerRef.current, {
          y: yPosition,
          ease: "none",
          duration: 0.1,
          immediateRender: true,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero projects" id="projects">
      <div className="container">
        <Box
          title="Design is in the details."
          text="My work is based on timeless design principles, clear copywriting, and well-established UX patterns. Each design is carefully crafted to meet your goals."
          flowerImg={flowerImg}
          flowerRef={flowerRef}
          bgColor="#FAEBC5"
        />

        <div className="projects-container">
          {projectData.map((project, index) => (
            <Project
              key={index}
              srcOne={project.srcOne}
              srcTwo={project.srcTwo}
              link={project.link}
              title={project.title}
              categories={project.categories}
            />
          ))}
        </div>
        <div className="projects-btn">
          <Button text="Load More" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
