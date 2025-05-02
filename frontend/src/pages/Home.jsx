import React, { useState } from "react";
import { HeadProvider, Title, Meta } from "react-head";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Fact from "../components/sections/Fact";
import Footer from "../components/Footer";
import Preloader from "../components/partials/Preloader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <HeadProvider>

          <Title>Home | My Portfolio</Title>
          <Meta name="description" content="Welcome to the homepage of my portfolio." />

          <Hero isLoading={isLoading} />
          <Projects />
          <About />
          <Skills />
          <Fact />
          <Footer />
        </HeadProvider>
      )}
    </>
  );
};

export default Home;
