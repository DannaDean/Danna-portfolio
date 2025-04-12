import Button from "../partials/Button";
import Box from "../partials/Box";
import HeroCard from "../partials/HeroCard";
import flowerImg from "../../assets/images/flowers/flower-1.png";
import myImg from "../../assets/images/daniela.png";
import desktopImg from "../../assets/images/desktop.png";
import mobileImg from "../../assets/images/mobile.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="name">Daniela Ciubari</h1>
        <Box
          title={<>Here to make you look <br /> good and win business.</>}
          text={<>Websites that convert and apps that feel effortless. <br/> Clean, clear, and thoughtfully designed.</>}
          flowerImg={flowerImg}
          button={<Button href={"#getInTouch"} />}
          bgColor="#F889E7"
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
