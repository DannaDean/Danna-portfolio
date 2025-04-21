import { useState } from 'react';
import { ChevronLeft, HomeAlt1, AlignBottom, CirclePlus, Sparkles } from "akar-icons";
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <nav id="sidebar" className={showSidebar ? 'open' : 'close'}>
      <ul>
        <li>
          <span className="logo">Dashboard Menu</span>
          <button onClick={toggleSidebar} className={showSidebar ? '' : 'rotate'} id="toggle-btn">
            <ChevronLeft strokeWidth={2} size={28} />
          </button>
        </li>

        <SidebarItem icon={HomeAlt1} text="Home" href="/dashboard" active />
        <SidebarItem icon={AlignBottom} text="Projects" href="/dashboard/projects" />
        <SidebarItem icon={Sparkles} text="Skills" href="/" />
        <SidebarItem icon={CirclePlus} text="Facts" href="/" />
      </ul>
    </nav>
  );
};


export default Sidebar;