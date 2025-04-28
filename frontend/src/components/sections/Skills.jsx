import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../store/slices/skillsSlice";

import Button from "../partials/Button";
import MarqueeCard from "../partials/MarqueeCard";

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills)

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch])

  return (
    <section className="skills">
      <div className="container">
        <div className="marquee-container">
          <p>Coding Skills:</p>
          <div className="marquee marquee--reverse">
            <MarqueeCard skills={skills} />
            <MarqueeCard skills={skills} />
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
