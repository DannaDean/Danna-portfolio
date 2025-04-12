const Category = ({href, children, bgColor = "#FAEBC5"}) => {
    const style = bgColor ? { backgroundColor: bgColor } : {};

    if (href) {
        return (
            <a href={href} className="category" style={style}>
                {children}
            </a>
        );
    }

    return (
        <div className="category" style={style}>
            {children}
        </div>
    );
}   

export default Category;