import { ArrowRight } from "akar-icons";

const Button = ({text = "Get in Touch", bgColor, href, type, disabled, onClick}) => {
    const style = bgColor ? { backgroundColor: bgColor } : {};

    if (href) {
        return (
            <a href={href} className="btn" style={style}>
                {text}
                <ArrowRight strokeWidth={2} size={24} />
            </a>
        );
    }

    return (
        <button className="btn" type={type} style={style} disabled={disabled} onClick={onClick} >
            {text}
            <ArrowRight strokeWidth={2} size={24} />
        </button>
    );
}   

export default Button;