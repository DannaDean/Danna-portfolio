import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, HomeAlt1, AlignBottom, CirclePlus, Sparkles, Person, SignOut } from "akar-icons";
import SidebarItem from './SidebarItem';
import { selectIsAuth, reset } from '../../store/slices/authSlice';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
   const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const onClickLogout = () => {
    if (window.confirm('Are you sure tou want to log out?')) {
      dispatch(reset())
      window.localStorage.removeItem('token');
    }
  }

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
        <SidebarItem icon={Sparkles} text="Skills" href="/dashboard/skills" />
        <SidebarItem icon={CirclePlus} text="Facts" href="/dashboard/facts" />
        <SidebarItem icon={Person} text="Account" href="/" />
        <SidebarItem icon={SignOut} text="Logout" onClick={onClickLogout} />
      </ul>
    </nav>
  );
};


export default Sidebar;