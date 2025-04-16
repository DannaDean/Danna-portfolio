import { useState } from "react";
import './assets/css/App.scss'
import Navbar from './components/Header'
import Footer from './components/Footer'
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Fact from "./components/sections/Fact";
import Preloader from "./components/partials/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
    {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
    {!isLoading && (
      <div className="inner-wrapper">
        <Navbar />
        <Hero isLoading={isLoading} />
        <Projects />
        <About />
        <Skills />
        <Fact />
        <Footer />
      </div>
    )}
  </>
  );
}

export default App;
