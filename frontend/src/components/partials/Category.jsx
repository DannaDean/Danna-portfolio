const Category = ({href, children, bgColor = "#FAEBC5", onClick}) => {
    const style = bgColor ? { backgroundColor: bgColor } : {};

    if (href) {
        return (
            <a href={href} className="category" style={style} onClick={onClick}>
                {children}
            </a>
        );
    }

    return (
        <div className="category" style={style} onClick={onClick}>
            {children}
        </div>
    );
}   

export default Category;