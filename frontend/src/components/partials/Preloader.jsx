import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }) => {
  const barsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    gsap.set(barsRef.current, {yPercent: -100})

    tl.to({}, { duration: 0.3 });

    tl.to(barsRef.current, {
      yPercent: 0,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "start",
      },
      ease: "power3.out"
    });

    tl.to(barsRef.current.slice().reverse(), {
      yPercent: -100,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "start",
      },
      ease: "power3.inOut",
    });

    tl.to(".preloader", {
      opacity: 0,
      duration: 0,
      ease: "power1.out",
    });
  }, [onComplete]);

  return (
    <div className="preloader">
      <div className="preloader-bars">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`bar bar-${i}`}
            ref={(el) => (barsRef.current[i] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
