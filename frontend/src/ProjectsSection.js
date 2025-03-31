import React, { useState } from "react";
import "./ProjectsSection.css";

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Mustard - Premiere movie with strangers",
      description: "Don't wanna watch movie alone ? Get on Mustard and join rooms to watch movies with strangers. This application allows about 50 people to watch together and chat with each other, giving you a new experience of watching movies.",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Authentication", "Tailwind CSS", "Typescript","Socket.io"],
      links: {
        github: "https://github.com/yourusername/robot-vacuum",
      },
      featured: true
    },
    {
      id: 2,
      title: "TextSniffer - AI powered OCR",
      description: "It uses a combination of OCR and LLM to extract text from images and return the text in a readable format. This OCR has been trained using Albeaugumentation which makes it fast and word accuracy has surged upto 89%. The best part is the flexibility to fineutune this OCR for specific use cases, like getting text from handwritten medical presicriptions",
      technologies: ["Python","Pytorch","Pandas", "Machine Learning","DONUT Model", "Large Language System", "Finetuning", "Pre-trained", "Computer Vision", "Data Preprocessing"],
      links: {
        github: "https://github.com/yourusername/memory-leak-detection",
        demo: "https://demo-link.com"
      }
    },
    {
      id: 3,
      title: "Conversational LLM - Sales Training Platform",
      description: "Built an advanced conversational AI platform for sales and soft skills training, achieving 85% accuracy in response generation. Integrated multiple language models and created a dynamic training interface with real-time feedback mechanisms.",
      technologies: ["NLP", "PyTorch", "React", "Node.js", "Express.js", "MongoDB", "WebSocket"],
      links: {
        github: "https://github.com/yourusername/conv-ai-platform",
        demo: "https://demo-link.com"
      }
    },
    {
      id: 4,
      title: "Music Generation using LSTM",
      description: "Devised a model capable of generating novel music based on input music files. Enhanced its performance using LSTM using, further elevating accuracy from 86% to 95% with Generative Algorithm",
      technologies: ["GenAI", "NLP", "Research","LSTM", "RNN", "TensorFlow", "Data Preprocessing"],
      links: {
        github: "https://github.com/yourusername/smart-home",
        demo: "https://demo-link.com"
      }
    },
    {
      id: 5,
      title: "Portfolio AI Chatbot",
      description: "Created an interactive AI chatbot that engages with visitors, providing detailed information about my experience and projects. Implemented natural language understanding and context management using LLM.",
      technologies: ["Python", "ChatGPT", "React", "NLP", "OpenAI"],
      links: {
        github: "https://github.com/yourusername/portfolio-chatbot",
        demo: "https://demo-link.com"
      }
    }
  ];

  const getCardClassName = (index) => {
    const total = projects.length;
    const diff = (index - currentIndex + total) % total;
    
    if (diff === 0) return "project-card active";
    if (diff === total - 2 || diff === -2) return "project-card prev-2";
    if (diff === total - 1 || diff === -1) return "project-card prev";
    if (diff === 1) return "project-card next";
    if (diff === 2) return "project-card next-2";
    return "project-card hidden";
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="projects-container">
      <div className="cards-wrapper">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={getCardClassName(index)}
            onClick={() => handleCardClick(index)}
          >
            <div className="project-content">
              {project.featured && (
                <div className="project-featured">Upcoming</div>
              )}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.links.github && (
                  <a href={project.links.github} className="project-link" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="project-navigation">
        <button className="nav-button" onClick={handlePrev}>
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="nav-button" onClick={handleNext}>
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <div className="project-counter">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`counter-dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
