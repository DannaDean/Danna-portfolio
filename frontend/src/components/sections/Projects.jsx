import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/slices/projectsSlice";
import Box from "../partials/Box";
import Project from "../partials/Project";
import Button from "../partials/Button";
import flowerImg from "../../assets/images/flowers/flower-2.png";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const flowerRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(2);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

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

  const handleLoadMore = () => {
    if (showAll) {
      setVisibleCount(2);
      setShowAll(false);
    } else {
      const newCount = visibleCount + 2;
      if (newCount >= projects.length) {
        setVisibleCount(projects.length);
        setShowAll(true);
      } else {
        setVisibleCount(newCount);
      }
    }
  };
  
  useEffect(() => {
    if (projectsContainerRef.current) {
      // Get the new project items (the ones that will fade in)
      const newProjectItems = projectsContainerRef.current.querySelectorAll(".project-card:nth-child(n+" + (visibleCount - 1) + ")");
      
      // Animate only the new projects
      gsap.fromTo(
        newProjectItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [visibleCount]);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <Box
          title="Development is in the details."
          text="My work is rooted in clean architecture, scalable code, and proven UX patterns. Every line is written with purpose — ensuring your project not only works but works beautifully."
          flowerImg={flowerImg}
          flowerRef={flowerRef}
          bgColor="#FAEBC5"
        />

        <div className="projects-container" ref={projectsContainerRef}>
          {projects &&
            projects
              .slice(0, visibleCount)
              .map((project) => <Project key={project._id} {...project} />)}
        </div>
        {projects.length > 2 && (
          <div className="projects-btn">
            <Button
              text={showAll ? "Show Less" : "Load More"}
              onClick={handleLoadMore}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
