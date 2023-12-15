// AnimatedRoute.js
import React from "react";
import { useSpring, animated } from "react-spring";

const AnimatedRoute = ({ start, end, icon }) => {
  const animation = useSpring({
    from: { x: start[0], y: start[1] },
    to: async (next) => {
      while (true) {
        await next({ x: end[0], y: end[1] });
        await next({ x: start[0], y: start[1] });
      }
    },
    reset: true,
  });

  return (
    <animated.div
      style={{
        position: "absolute",
        transform: animation.to((x, y) => `translate(${x}px, ${y}px)`),
      }}
    >
      {icon}
    </animated.div>
  );
};

export default AnimatedRoute;
