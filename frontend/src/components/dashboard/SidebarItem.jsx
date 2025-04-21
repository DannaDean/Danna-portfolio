import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types';

const SidebarItem = ({ icon: Icon, text, href = '#', active = false }) => {
  const className = `sidebar-item ${active ? 'active' : ''}`;

  return (
    <li className={className}>
      <Link to={href}>
        <Icon strokeWidth={2} size={30} />
        <span>{text}</span>
      </Link>
    </li>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  active: PropTypes.bool,
};

export default SidebarItem;
