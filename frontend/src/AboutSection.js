import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const interests = [
    "Problem Solving 🧩",
    "AI 📚",
    "Machine Learning 🤖",
    "Full Stack Development 💻",
    "Scalability 🌟",
    "Innovation 💡"
  ];

  const basicInfo = [
    { label: "Location", value: "Boston, MA" },
    { label: "Education", value: "MS Computer Science" },
    { label: "University", value: "University of Massachusetts Boston" },
    { label: "Roles", value: "Software Engineering & AI/ML Engineer" }
  ];

  return (
    <div className="about-section">
      <div className="about-card">
        <div className="about-header">
          <h2>About Me</h2>
          <span className="active-status">ENFP</span>
        </div>

        <div className="basic-info">
          {basicInfo.map((info, index) => (
            <div key={index} className="info-item">
              <span className="info-label">{info.label}</span>
              <span className="info-value">{info.value}</span>
            </div>
          ))}
        </div>

        <div className="bio-section">
          <h3>My Bio</h3>
          <p>
          Debugging code and decoding social cues with varying success rates. My commits are atomic, my jokes are dad level, and my coffee intake is enterprise scale, Data structures organized, desk completely chaotic.
          I create AI that composes music, apps that connect people, and occasionally bake cookies that don't set off smoke alarms. 
          Swipe right for clean architecture and the occasional anime reference.
          </p>
        </div>

        <div className="interests-section">
          <h3>Interests</h3>
          <div className="interests-grid">
            {interests.map((interest, index) => (
              <span key={index} className="interest-tag">{interest}</span>
            ))}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-value">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">10+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">500+</span>
            <span className="stat-label">Problems Solved</span>
          </div>
        </div>

        <a href="/resume.pdf" className="connect-button" target="_blank" rel="noopener noreferrer">
          <span>Download Resume</span>
          <svg viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AboutSection; 