import React from "react";
import "./Header.css";

const Header = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Remove any existing highlight class
      document.querySelectorAll('.section-highlight').forEach(el => {
        el.classList.remove('section-highlight');
      });
      
      // Add highlight class to the target section
      element.classList.add('section-highlight');
      
      // Scroll to the section
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Remove the highlight class after animation completes
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 1500);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">
          <img src="/images/bee.png" alt="Bee Logo" width="32" height="32" />
          Portfolio
        </a>
        <nav className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => handleScroll(e, 'about')}>About</a>
          <a href="#experience" className="nav-link" onClick={(e) => handleScroll(e, 'experience')}>Experience</a>
          <a href="#projects" className="nav-link" onClick={(e) => handleScroll(e, 'projects')}>Projects</a>
          <a href="#skills" className="nav-link" onClick={(e) => handleScroll(e, 'skills')}>Skills</a>
          <a href="#links-panel" className="contact-button" onClick={(e) => handleScroll(e, 'links-panel')}>Let's Connect</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
