import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }) => {
  const barsRef = useRef([]);
  const nameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // Bars enter from top (Y = -100%)
    tl.fromTo(
      barsRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 0.6,
        stagger: {
          amount: 0.6,
          from: "start", // left to right
        },
        ease: "power2.out",
      }
    );

    // Bars exit toward top (Y = 100%), reverse order (right to left)
    tl.to(barsRef.current.slice().reverse(), {
      yPercent: -100,
      duration: 0.6,
      stagger: {
        amount: 0.6,
        from: "start", // reverse: right to left
      },
      ease: "power2.in",
    });

    // Fade out whole preloader container
    tl.to(".preloader", {
      opacity: 0,
      duration: 0.4,
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
