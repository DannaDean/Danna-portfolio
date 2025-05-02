import defaultImage from "../../assets/images/default.jpg";

const Project = ({ 
  link = '', 
  deskImg = '', 
  mobileImg = '', 
  title = '',
  categories = []
}) => {
  return (
    <a href={link} className="project-card" target="_blank">
      <div className="images-block">
        <div className="proj-img-one">
        <img
            src={deskImg || defaultImage}
            alt={title}
            onError={(e) => (e.target.src = defaultImage)}
          />
        </div>
        <div className="proj-img-two">
        <img
            src={mobileImg || defaultImage}
            alt={title}
            onError={(e) => (e.target.src = defaultImage)}
          />
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
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
