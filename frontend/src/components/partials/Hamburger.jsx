import { useState } from "react";

const Hamburger = ({ open, setOpen }) => {
  const handleClick = () => setOpen((prev) => !prev);

  return (
    <div onClick={handleClick} className={`lines ${open ? 'active' : ''}`}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

export default Hamburger;
