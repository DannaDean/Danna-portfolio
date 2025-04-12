import {useState } from 'react';
import FaqItem from "../partials/FaqItem";

const Faq = () => {
    const [selectedEven, setSelectedEven] = useState(null);
    const [selectedOdd, setSelectedOdd] = useState(null);

    const toggleEven = index => {
        setSelectedEven(selectedEven === index ? null : index)
    }

    const toggleOdd = index => {
        setSelectedOdd(selectedOdd === index ? null : index)
    }

    const oddFaqs = faqs.filter((faq, index) => index % 2 !== 0);
    const evenFaqs = faqs.filter((faq, index) => index % 2 === 0);

  return (
    <section className="faq" id='faq'>
      <div className="container">
        <h2>FAQs</h2>

        <div className="faq-container">
             <div className="faq-section">
            {evenFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                title={faq.question}
                text={faq.answer}
                index={index}
                selected={selectedEven}
                toggle={toggleEven}
              />
            ))}
          </div>

          <div className="faq-section">
            {oddFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                title={faq.question}
                text={faq.answer}
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

const faqs = [
    {
        question: 'Why should I work with you?',
        answer: 'The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum", written by Cicero in 45 BCSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    },
    {
        question: 'Do you offer any website packages?',
        answer: 'The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum", written by Cicero in 45 BCSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    },
    {
        question: 'Can you also do _______?',
        answer: 'The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum", written by Cicero in 45 BCSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    },
    {
        question: 'How much do your services cost?',
        answer: 'The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum", written by Cicero in 45 BCSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    },
    {
        question: 'What UX services do you provide?',
        answer: 'The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum", written by Cicero in 45 BCSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    },
    {
        question: 'Whats the process for getting started?',
        answer: 'The standard Lorem Ipsum passage, used since the 1500sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum", written by Cicero in 45 BCSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    }
]

export default Faq;
