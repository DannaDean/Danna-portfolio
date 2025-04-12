import { Plus } from 'akar-icons';
import { useState, useRef, useEffect } from 'react';

const FaqItem = ({ title, text, index, selected, toggle }) => {
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
    <div className="faq-item">
      <div className="faq-title" onClick={() => toggle(index)}>
        <h3>{title}</h3>
        <span className={selected === index ?  'active' : ''}> <Plus strokeWidth={2} size={24} /></span>
      </div>
      <div
        className={selected === index ? "faq-content show" : "faq-content"}
        style={{ maxHeight: selected === index ? `${maxHeight}px` : '0' }}
        ref={contentRef}
      >
        <div>{text}</div>
      </div>
    </div>
  );
};

export default FaqItem;
