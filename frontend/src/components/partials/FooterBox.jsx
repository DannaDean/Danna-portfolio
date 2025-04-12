import { ArrowRight } from "akar-icons";
import { useState } from "react";

const FooterBox = ({ title, email, showArrow = true, onClick, href }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleClick = () => {
    if (onClick) {
        onClick();
    }
  }

  const Wrapper = href ? "a" : "div";
  const wraperProps = href
    	? {href, target: "_blank", rel: "noopener noreferrer"}
        : onClick || email
        ? { onClick: handleClick, rol: "button", tabIndex: 0 }
        :{};

  return (
    <Wrapper className="footer-box" {...wraperProps}>
      <p>{title}</p>
        {email && (
            <div className="copy-email">
                <span className="copy-label" onClick={handleCopy}>{copied ? "Copied" : "Copy"}</span>
                <p>{email}</p>
            </div>
        )}
        {showArrow && <ArrowRight strokeWidth={2} size={22} />}
    </Wrapper>
  );
};

export default FooterBox;
