import { Plus } from 'akar-icons';
import { useState, useRef, useEffect } from 'react';

const FactItem = ({ title, text, index, selected, toggle }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (selected === index) {
      setMaxHeight(contentRef.current.scrollHeight);
    } else {
      setMaxHeight(0); 
    }
  }, [selected, index]);

  return (
    <div className="fact-item">
      <div className="fact-title" onClick={() => toggle(index)}>
        <h3>{title}</h3>
        <span className={selected === index ?  'active' : ''}> <Plus strokeWidth={2} size={24} /></span>
      </div>
      <div
        className={selected === index ? "fact-content show" : "fact-content"}
        style={{ maxHeight: selected === index ? `${maxHeight}px` : '0' }}
        ref={contentRef}
      >
        <div>{text}</div>
      </div>
    </div>
  );
};

export default FactItem;
