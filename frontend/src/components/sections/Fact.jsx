import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFacts } from '../../store/slices/factsSlice';

import FactItem from "../partials/FactItem";

const Fact = () => {
    const dispatch = useDispatch();
    const { facts} = useSelector((state) => state.facts);

    const [selectedEven, setSelectedEven] = useState(null);
    const [selectedOdd, setSelectedOdd] = useState(null);

    useEffect(() => {
        dispatch(getFacts());
    }, [dispatch])

    const toggleEven = index => {
        setSelectedEven(selectedEven === index ? null : index)
    }

    const toggleOdd = index => {
        setSelectedOdd(selectedOdd === index ? null : index)
    }

    const oddFacts = facts.filter((fact, index) => index % 2 !== 0);
    const evenFacts = facts.filter((fact, index) => index % 2 === 0);

  return (
    <section className="fact" id='facts'>
      <div className="container">
        <h2>Facts</h2>

        <div className="fact-container">
             <div className="fact-section">
            {evenFacts.map((fact, index) => (
              <FactItem
                key={index}
                title={fact.title}
                text={fact.text}
                index={index}
                selected={selectedEven}
                toggle={toggleEven}
              />
            ))}
          </div>

          <div className="fact-section">
            {oddFacts.map((fact, index) => (
              <FactItem
                key={index}
                title={fact.title}
                text={fact.text}
                index={index}
                selected={selectedOdd}
                toggle={toggleOdd}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fact;
