import { useState } from "react";
import Hamburger from "./partials/Hamburger";
import Category from "./partials/Category";
import { Moon } from "akar-icons";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <nav className={`${open ? "open" : "hidden"}`}>
          <Category href="#projects">Works</Category>
          <Category href="#meet">Meet Daniela</Category>
          <Category href="#faq">FAQ</Category>
          <Category href="#getInTouch">Get in Touch</Category>
          <Category href="#">
            <Moon strokeWidth={2} size={16} />
          </Category>
        </nav>
        <Hamburger open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
