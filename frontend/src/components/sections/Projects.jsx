import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/slices/projectsSlice";
import Box from "../partials/Box";
import Project from "../partials/Project";
import Button from "../partials/Button";
import Spinner from "../partials/Spinner";
import flowerImg from "../../assets/images/flowers/flower-2.png";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);
  const flowerRef = useRef(null);

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

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <section className="projects" id="projects">
      <div className="container">
        <Box
          title="Design is in the details."
          text="My work is based on timeless design principles, clear copywriting, and well-established UX patterns. Each design is carefully crafted to meet your goals."
          flowerImg={flowerImg}
          flowerRef={flowerRef}
          bgColor="#FAEBC5"
        />

        <div className="projects-container">
          {projects &&
            projects.map((project) => (
              <Project key={project._id} {...project} />
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
