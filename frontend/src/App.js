import './assets/css/App.scss'
import Navbar from './components/Header'
import Footer from './components/Footer'
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Faq from "./components/sections/Faq";

function App() {
  return (
    <div className="inner-wrapper">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
