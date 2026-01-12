import { useState } from "react";
import "../styles/rain.css";

const RainOverlay = () => {
  const [drops] = useState(() => {
    const totalDrops = 160;

    return Array.from({ length: totalDrops }, () => {
      const size = Math.random() * 1.5 + 0.5;

      return {
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 0.8 + Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        width: size * 0.8,
        height: size * 20,
      };
    });
  });

  return (
    <div className="rain-overlay">
      {drops.map((drop, index) => (
        <div
          key={index}
          className="rain-drop"
          style={{
            left: `${drop.left}vw`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            opacity: drop.opacity,
            width: `${drop.width}px`,
            height: `${drop.height}px`,
          }}
        />
      ))}
    </div>
  );
};

export default RainOverlay;
