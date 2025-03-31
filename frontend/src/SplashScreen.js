// frontend/src/SplashScreen.js
import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  const name = "Piyush Kumar Arya"; // Replace with your actual name
  const letters = name.split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <h1 className="splash-text">
        {letters.map((char, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SplashScreen;
