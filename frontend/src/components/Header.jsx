import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import Hamburger from "./partials/Hamburger";
import Category from "./partials/Category";
import { Moon, Sun } from "akar-icons";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme', 'light'); 

  const toggleTheme = () => setIsDarkMode(isDarkMode === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (isDarkMode === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header>
      <div className="container">
        <nav className={`${open ? "open" : "hidden"}`}>
          <Category href="#projects">Works</Category>
          <Category href="#meet">Meet Daniela</Category>
          <Category href="#facts">Facts</Category>
          <Category href="#getInTouch">Get in Touch</Category>
          <Category href="#" onClick={toggleTheme}>
            {isDarkMode === 'dark' ? (
              <Sun strokeWidth={2} size={16} />
            ) : (
              <Moon strokeWidth={2} size={16} />
            )}
          </Category>
        </nav>
        <Hamburger open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
