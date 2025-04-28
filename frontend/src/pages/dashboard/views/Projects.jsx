import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProjects } from "../../../store/slices/projectsSlice";
import "../../../assets/css/Dashboard.scss";
import TableItem from "../../../components/dashboard/TableItem";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleDeleteProject = (id) => {
   if (window.confirm('You really want to delete this project')) {
    dispatch(deleteProject(id));
   }
  };

  return (
    <>
      <div className="container">
        <h2>All Projects</h2>
        <Link to={`/dashboard/create/project`}>Create Project</Link>
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
                  image: project.deskIm,
                  title: project.title,
                  categories: project.categories,
                }}
                type="project"
                onDeleteClick={handleDeleteProject}
              />
            ))}
         </tbody>
        </table>
      </div>
    </>
  );
};

export default Projects;
