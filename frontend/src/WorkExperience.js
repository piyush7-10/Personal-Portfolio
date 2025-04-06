import React, { useState } from 'react';
import './WorkExperience.css';

const WorkExperience = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const experiences = [
    {
      id: 2,
      company: "University of Massachusetts Boston",
      logo: "/images/umb_logo.png",
      role: "Graduate Teaching Fellow",
      period: "September 2024 - May 2025",
      location: "Boston, USA",
      description: "Teaching fundamentals of computer science to undergraduate Computer Science freshmen",
      achievements: [
        "Taught topics including topics like algorithms, data structures, operating systems, database management system, computer networks and software engineering principles.",
        "Designing and delivering interactive classes to develop problem-solving skills and critical thinking, while mentoring students to foster their understanding of core concepts for academic and professional growth."
        
      ]
    },
    {
      id: 1,
      company: "Samsung Research Institute",
      logo: "/images/samsung_logo.gif", // You'll need to add these logo images
      role: "SoftwareEngineer",
      period: "June 2022 - August 2023",
      location: "Noida, India",
      description: "Leading AI/ML initiatives in consumer electronics, specializing in computer vision, reinforcement learning, and robotics. Driving innovation in smart home automation and performance optimization.",
      achievements: [
        "Led RVC path planning optimization using Reinforcement Learning and Deep Learning with GPU acceleration, improving obstacle detection accuracy from 88% to 93% for dynamic objects like humans and pets",
        "Developed AI-powered memory leak detection system for Smart TVs using Computer Vision and Reinforcement Learning (DQN, PPO, Rainbow), achieving 86% accuracy and resolving critical performance issues",
        "Led development and launch of Samsung's premium gaming monitors, resolving critical bugs and ensuring successful product release"
      ]
    }
    // ,{
    //   id: 3,
    //   company: "AMIE",
    //   logo: "/images/Amie.jpeg",
    //   role: "Software Engineer Intern",
    //   period: "June 2024 - Decemeber 2025",
    //   location: "Boston, USA",
    //   description: "Built a full-stack web app using the MERN stack and integrated AI-powered simulations with a fine-tuned LLM and sentiment analysis for sales and soft skills training.",
    //   achievements: [
    //     "Built a scalable web application using the MERN stack (MongoDB, Express.js, React, Node.js) with JWT authentication, Redux for state management, and Tailwind CSS for UI optimization.",
    //     "Fine-tuned a Large Language Model (LLM) using PyTorch and Hugging Face Transformers, incorporating NLTK and Vader for sentiment analysis to quantify user performance in sales and soft skills training.",
    //     "Developed real-time, AI-driven role-playing scenarios using LangChain, WebSockets for live interactions, and TensorFlow.js for in-browser AI processing, enhancing user engagement."
    //   ]
    // }
  ];

  const toggleCard = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="section-container">
      <h2 className="section-title">Work Experience</h2>
      <div className="experience-grid">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className={`flip-card ${flippedCards[exp.id] ? 'flipped' : ''}`}
            onClick={() => toggleCard(exp.id)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${exp.company}`}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img 
                  src={exp.logo} 
                  alt={`${exp.company} logo`} 
                  className="company-logo"
                />
              </div>
              <div className="flip-card-back">
                <div className="card-content">
                  <h3>{exp.role}</h3>
                  <span className="company">{exp.company}</span>
                  <div className="period-location">
                    <span>{exp.period}</span>
                    <span className="location">📍 {exp.location}</span>
                  </div>
                  <p className="description">{exp.description}</p>
                  <div className="achievements">
                    <h4>Key Achievements</h4>
                    <ul>
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience; 
