import { useState, useEffect } from "react";
import { gsap } from "gsap";
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

  const animateNameWave = () => {
    const letters = document.querySelectorAll(".name .char");

    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.6,
        from: "start"
      }
    });
  };

  useEffect(() => {
    if (!isLoading) {
      animateNameWave();
    }
  }, [isLoading]);

  return (
    <>
    {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
    {!isLoading && (
      <div className="inner-wrapper">
        <Navbar />
        <Hero />
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
