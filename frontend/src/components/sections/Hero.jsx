import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "../partials/Button";
import Box from "../partials/Box";
import HeroCard from "../partials/HeroCard";
import flowerImg from "../../assets/images/flowers/flower-1.png";
import myImg from "../../assets/images/daniela.png";
import desktopImg from "../../assets/images/desktop.png";
import mobileImg from "../../assets/images/mobile.png";

const Hero = ({ isLoading }) => {
  const flowerRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const rotation = (scrollY / maxScroll) * 360;

      gsap.to(flowerRef.current, {
        rotation: rotation,
        ease: "none",
        duration: 0.1,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const letters = document.querySelectorAll(".name .char");

      const tl = gsap.timeline();

      tl.to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.6,
          from: "start",
        },
      })

      tl.to(boxRef.current, { 
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, 0); 
    }
  }, [isLoading]);

  return (
    <section className="hero">
      <div className="container">
        <h1 className="name">
          {"Daniela Ciubari".split("").map((char, i) => (
            <span key={i} className="char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <Box
          title={
            <>
             Here to bring your ideas to life  <br />  and drive business success.
            </>
          }
          text={
            <>
              Web applications that convert, built to perform seamlessly. <br /> Scalable, reliable, and crafted with precision.
            </>
          }
          flowerImg={flowerImg}
          flowerRef={flowerRef}
          button={<Button href={"#getInTouch"} />}
          bgColor="#F889E7"
          boxRef={boxRef}
        />

        <div className="hero-cards">
          <HeroCard
            src={myImg}
            title="Home of Ciubari Daniela"
            text="A independent digital designer set to conquer the world."
          />
          <HeroCard
            src={desktopImg}
            title="Web Design & Dev"
            text="Cleanly designed, conversion-focused, and built for easy updates."
          />
          <HeroCard
            src={mobileImg}
            title="UI/UX Design"
            text="Seamless web or mobile app design to wow your users."
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
