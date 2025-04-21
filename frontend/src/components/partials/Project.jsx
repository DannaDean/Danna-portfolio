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
          {deskImg &&  <img src={deskImg} alt={title} />}
        </div>
        <div className="proj-img-two">
          {mobileImg && <img src={mobileImg} alt={title} />}
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
