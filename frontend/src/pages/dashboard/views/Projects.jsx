import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "akar-icons";
import { confirmAlert } from "react-confirm-alert";
import {
  deleteProject,
  getProjects,
} from "../../../store/slices/projectsSlice";
import "../../../assets/css/Dashboard.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import TableItem from "../../../components/dashboard/TableItem";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleDeleteProject = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this project?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteProject(id))
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <>
      <h2>All Projects</h2>
      <Link to={`/dashboard/create/project`} className="btn create-btn">
        Create Project
        <Plus strokeWidth={2} size={24} />
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project) => (
              <TableItem
                key={project._id}
                id={project._id}
                data={{
                  image: project.deskImg,
                  title: project.title,
                  categories: project.categories,
                }}
                type="project"
                onDeleteClick={handleDeleteProject}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Projects;
