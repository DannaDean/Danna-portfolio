import Box from "./partials/Box";
import flowerImg from "../assets/images/flowers/flower-4.png";
import FooterBox from "./partials/FooterBox";

const Footer = () => {
  return (
    <footer>
      <div className="container" id="getInTouch">
        <Box
          title="Thanks for stopping by!"
          subtitle="I’d love to chat with you about how I can help. Get in touch!"
          flowerImg={flowerImg}
          bgColor="rgba(255, 157, 101, 1)"
        >
          <div className="footer-boxes">
            <FooterBox
              title="Email"
              email="dciubary@gmail.com"
              showArrow={false}
            />
            <FooterBox
              title="Send a message"
              showArrow={true}
              // onClick={() => setShowPopup(true)}
            />
            <FooterBox
              title="Linkedin"
              showArrow={true}
              href={'https://www.linkedin.com/in/daniela-ciubari-615236257/'}
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
  );
};

export default Footer;
