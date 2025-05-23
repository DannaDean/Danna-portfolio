import { useEffect, useRef } from "react";
import Box from "../partials/Box";
import Category from "../partials/Category";
import myImg from "../../assets/images/daniela.png";
import flowerImg from "../../assets/images/flowers/flower-3.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // Immediately set the elements off-screen (before the animation starts)
    gsap.set(".about-three .category", {
      y: -1080,
      opacity: 0, // Hide them initially
      visibility: "visible", // Ensure they are visible from the start
    });

    gsap.fromTo(
      ".about-three .category",
      {
        y: -1080,
        opacity: 0, // Hide them off-screen initially
      },
      {
        y: 0, // Final position
        opacity: 1, // Ensure opacity reaches 1
        duration: 1.2,
        ease: "bounce.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".about",
          start: "top 70%", // Start the animation when the section is 70% from the top of the viewport
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const flowerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const yPosition = -scrollY * 0.3; 

      if (flowerRef.current) {  
        gsap.to(flowerRef.current, {
          y: yPosition,
          ease: "none",
          duration: 0.1,
          immediateRender: true,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="about" id="meet">
      <div className="container">
        <div className="about-img">
          <img src={myImg} alt="Ciubari Daniela" />
        </div>
        <Box
          title="Nice to meet you!"
          subtitle="I'm Ciubari Daniela, a Full Stack Web Developer!"
          text="My mission is to help companies like yours achieve their goals through modern and efficient web development solutions. I specialize in crafting responsive, user-centered interfaces with clean code and modern frameworks. While I can build across the stack, my strength lies in frontend development — turning designs into smooth, accessible, and engaging digital experiences."
          flowerImg={flowerImg}
          flowerRef={flowerRef}
          className="about-one"
          bgColor="#FFDF2B"
        />
        <Box
          subtitle="The perfect blend of code and UX."
          text="I transform designs into fast, accessible, and intuitive interfaces, ensuring a seamless user experience that not only looks great but also performs flawlessly across all devices."
          className="about-two"
          bgColor="rgba(238, 238, 57, 1)"
        />
        <Box subtitle="What you can count on from me." className="about-three" bgColor="rgba(254, 173, 210, 1)">
          <Category bgColor="#FF9D65">Curiosity</Category>
          <Category bgColor="#FFEE8F">Responsability</Category>
          <Category bgColor="#FFBE81">Adaptability</Category>
          <Category bgColor="#FF9999">Empathy</Category>
          <Category bgColor="rgba(237, 187, 249, 1)">Creativity</Category>
          <Category bgColor="#EEEE39">Innovation</Category>
          <Category bgColor="rgba(237, 187, 249, 1)">Dedication</Category>
          <Category bgColor="#FF9D6560">Perseverance</Category>
        </Box>
      </div>
    </section>
  );
};

export default About;
