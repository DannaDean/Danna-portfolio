import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { deleteSkill, getSkills } from "../../../store/slices/skillsSlice";
import "../../../assets/css/Dashboard.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import TableItem from "../../../components/dashboard/TableItem";
import { Plus } from "akar-icons";

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const handleDeleteSkill = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this skill?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteSkill(id))
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <>
      <h2>All skills</h2>
      <Link to={`/dashboard/create/skill`} className="btn create-btn">
        Create Skill
        <Plus strokeWidth={2} size={24} />
      </Link>
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
    </>
  );
};

export default Skills;
