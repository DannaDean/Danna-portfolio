const Project = ({ srcOne, srcTwo, title, categories }) => {
  return (
    <div className="project-card">
      <div className="images-block">
        <div className="proj-img-one">
          <img src={srcOne} alt={title} />
        </div>
        <div className="proj-img-two">
          <img src={srcTwo} alt={title} />
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <div className="categories">
          {categories.map((category, index) => (
            <span key={index} className="category">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
