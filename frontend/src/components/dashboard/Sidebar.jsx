import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ChevronLeft, HomeAlt1, AlignBottom, CirclePlus, Sparkles, Envelope } from "akar-icons";
import SidebarItem from './SidebarItem';
import { selectIsAuth } from '../../store/slices/authSlice';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isAuth = useSelector(selectIsAuth)
  const location = useLocation();

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <nav id="sidebar" className={showSidebar ? 'open' : 'close'}>
      <ul>
        <li>
          <button onClick={toggleSidebar} className={showSidebar ? '' : 'rotate'} id="toggle-btn">
            <ChevronLeft strokeWidth={2} size={28} />
          </button>
        </li>

        <SidebarItem icon={HomeAlt1} text="Home" href="/dashboard" active={location.pathname === "/dashboard"}  />
        <SidebarItem icon={Envelope} text="Contact Form" href="/dashboard/contact/form" active={location.pathname === "/dashboard/contact/form"}  />
        <SidebarItem icon={AlignBottom} text="Projects" href="/dashboard/projects"  active={location.pathname === "/dashboard/projects"}  />
        <SidebarItem icon={Sparkles} text="Skills" href="/dashboard/skills"  active={location.pathname === "/dashboard/skills"}  />
        <SidebarItem icon={CirclePlus} text="Facts" href="/dashboard/facts"  active={location.pathname === "/dashboard/facts"}  />
      </ul>
    </nav>
  );
};


export default Sidebar;