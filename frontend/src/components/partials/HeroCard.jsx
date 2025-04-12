const Category = ({src, title, text}) => {
    return (
        <div className="hero-card">
            <img src={src} alt={title} className="hero-card-image" />
            <div className="hero-card-text">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>

        </div>
    );
}   

export default Category;