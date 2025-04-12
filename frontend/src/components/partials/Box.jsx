const Box = ({
    title,
    subtitle,
    text,
    flowerImg,
    button,
    children,
    className = "",
    bgColor, 
  }) => {
    const style = bgColor ? { backgroundColor: bgColor } : {};
  
    return (
      <div className={`box ${className}`} style={style}>
        <div className="box-content">
            {title && <h2>{title}</h2>}
            {subtitle && <h3>{subtitle}</h3>}
            {text && <p>{text}</p>}
            {button && <div className="box-btn">{button}</div>}
            {children && <div className="box-extra">{children}</div>}
        </div>
        {flowerImg && <img src={flowerImg} alt="Flower" className="flower-1" />}
      </div>
    );
  };
  export default Box;  