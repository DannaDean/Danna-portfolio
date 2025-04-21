import React, { useState } from 'react';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Fact from '../components/sections/Fact';
import Footer from "../components/Footer";
import Preloader from "../components/partials/Preloader";

const Home = () => {
const [isLoading, setIsLoading] = useState(true);

  return (
    <>
     {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
    {!isLoading && (
      <>
        <Hero isLoading={isLoading} />
        <Projects />
        <About />
        <Skills />
        <Fact />
        <Footer />
      </>
    )}
  </>
  );
};

export default Home;