// frontend/src/FluidBackground.js
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

const FluidBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      console.log('Initializing Vanta Waves effect...');
      setVantaEffect(WAVES({
        el: vantaRef.current,
        THREE: THREE,
        color: 0x0077cc,   // Blue waves
        shininess: 50,     // How reflective the waves are
        waveHeight: 40,    // Increased wave height for a more dramatic effect
        waveSpeed: 1.5,    // Slightly faster wave speed
        zoom: 1.0,
      }));
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        console.log('Destroyed Vanta effect');
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1, // Ensure the fluid simulation stays behind your content
      }}
    />
  );
};

export default FluidBackground;
