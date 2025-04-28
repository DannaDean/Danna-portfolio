import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSkill, getSkills } from "../../../store/slices/skillsSlice";
import "../../../assets/css/Dashboard.scss";
import TableItem from "../../../components/dashboard/TableItem";

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const handleDeleteSkill= (id) => {
   if (window.confirm('You really want to delete this skill')) {
    dispatch(deleteSkill(id));
   }
  };

  return (
    <>
      <div className="container">
        <h2>All skills</h2>
        <Link to={`/dashboard/create/skill`}>Create Skill</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
         <tbody>
         {skills &&
            skills.map((skill) => (
              <TableItem
                key={skill._id}
                id={skill._id}
                data={{
                  image: skill.image,
                  title: skill.title,
                }}
                type="skill"
                onDeleteClick={handleDeleteSkill}
              />
            ))}
         </tbody>
        </table>
      </div>
    </>
  );
};

export default Skills;
