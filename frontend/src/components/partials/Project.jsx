import getImageSrc from "../../utils/getImageSrc";

const Project = ({ 
  link = '', 
  deskImg = '', 
  mobileImg = '', 
  title = '',
  categories = []
}) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  return (
    <a href={link} className="project-card" target="_blank">
      <div className="images-block">
        <div className="proj-img-one">
        <img
            src={getImageSrc(deskImg, backendUrl)}
            alt={title}
          />
        </div>
        <div className="proj-img-two">
        <img
            src={getImageSrc(mobileImg, backendUrl)}
            alt={title}
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
