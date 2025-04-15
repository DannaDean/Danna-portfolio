import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Box from "./partials/Box";
import Popup from "./partials/Popup";
import Button from "./partials/Button";
import InputField from "./partials/InputField";
import flowerImg from "../assets/images/flowers/flower-4.png";
import FooterBox from "./partials/FooterBox";

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const flowerRef = useRef(null);

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

  return (
    <>
      <footer>
        <div className="container" id="getInTouch">
          <Box
            title="Thanks for stopping by!"
            subtitle="I’d love to chat with you about how I can help. Get in touch!"
            flowerImg={flowerImg}
            flowerRef={flowerRef}
            bgColor="rgba(255, 157, 101, 1)"
          >
            <div className="footer-boxes">
              <FooterBox
                title="Email"
                email="dciubari@gmail.com"
                showArrow={false}
              />
              <FooterBox
                title="Send a message"
                showArrow={true}
                onClick={() => setShowPopup(true)}
              />
              <FooterBox
                title="Linkedin"
                showArrow={true}
                href={"https://www.linkedin.com/in/daniela-ciubari-615236257/"}
              />
              <FooterBox
                title="Back to top"
                showArrow={true}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </div>
          </Box>
        </div>
      </footer>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <h3>Send a message</h3>
          <form>
            <InputField placeholder="Your Name" required />
            <InputField type="email" placeholder="Your Email" required />
            <InputField type="textarea" placeholder="Your Message" rows={5} required />
            <Button text="Send"></Button>
          </form>
        </Popup>
      )}
    </>
  );
};

export default Footer;
