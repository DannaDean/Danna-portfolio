const Project = ({ 
  link = '', 
  projectDeskImg = '', 
  projectMobileImg = '', 
  name = '',
  categories = []
}) => {
  return (
    <a href={link} className="project-card">
      <div className="images-block">
        <div className="proj-img-one">
          {projectDeskImg &&  <img src={projectDeskImg} alt={name} />}
        </div>
        <div className="proj-img-two">
          {projectMobileImg && <img src={projectMobileImg} alt={name} />}
        </div>
      </div>
      <div className="project-content">
        <h3>{name}</h3>
        <div className="categories">
          {categories?.map((category, index) => (
            <span key={index} className="category">
              {category}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Project;
