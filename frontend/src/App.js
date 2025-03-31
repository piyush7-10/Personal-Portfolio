import React, { useState } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import WorkExperience from './WorkExperience';
import ChatBot from './ChatBot';
import LinksPanel from './LinksPanel';
import SplashScreen from './SplashScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(false);

  const SkillsSection = () => {
    const skills = {
      "Prog. Languages": [
        { name: "C++", icon: "⚡" },
        { name: "C", icon: "🔧" },
        { name: "Python", icon: "🐍" },
        { name: "Java", icon: "☕" },
        { name: "JavaScript", icon: "🌟" },
        { name: "HTML/CSS", icon: "🎨" },
        { name: "TypeScript", icon: "📘" },
        { name: "Coq", icon: "🔍" }
      ],
      "Core Competencies": [
        { name: "Data Structures", icon: "🏗️" },
        { name: "Algorithms", icon: "🔍" },
        { name: "Operating Systems", icon: "⚙️" },
        { name: "Problem Solving", icon: "🧩" },
        { name: "System Design", icon: "📐" },
        { name: "Object Oriented Design", icon: "🔄" },
        { name: "Computer Networking", icon: "🌐" },
        { name: "Full Stack Development", icon: "💻" },
      ],
      "AI & Machine Learning": [
        { name: "Machine Learning", icon: "🤖" },
        { name: "Deep Learning", icon: "🧠" },
        { name: "Computer Vision", icon: "👁️" },
        { name: "NLP", icon: "📝" },
        { name: "Neural Networks", icon: "🔮" },
        { name: "Data Analysis", icon: "📊" },
        { name: "Hugging Face", icon: "🤗" },
        { name: "Reinforcement Learning", icon: "🎮" },
        { name: "Large Language Models", icon: "📚" },
        // { name: "TensorFlow", icon: "📊" },
        // { name: "PyTorch", icon: "🔥" },
        { name: "CUDA", icon: "⚡" }
      ],
      "Technologies & Tools": [
        { name: "ReactJS", icon: "⚛️" },
        { name: "Git", icon: "📦" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Kubernetes", icon: "⚙️" },
        { name: "Ant", icon: "🐜" },
        { name: "Express.js", icon: "🚀" },
        { name: "Next.js", icon: "🇳" },
        { name: "Node.js", icon: "🟢" }
      ]
    };

    return (
      <section className="skills-section">
        <div className="skills-container">
          {Object.entries(skills).map(([category, skillList]) => (
            <div className="skill-category" key={category}>
              <h3>{category}</h3>
              <div className="skill-list">
                {skillList.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          <Header />
          <div className="content-wrapper">
            <div className="main-content">
              <div className="profile-grid">
                <div className="profile-left">
                  <ProfilePicture src="/images/my-picture.jpg" alt="Piyush Kumar Arya" />
                  <div id="links-panel">
                    <LinksPanel />
                  </div>
                </div>
                <div className="profile-right">
                  <div id="about">
                    <AboutSection />
                  </div>
                </div>
              </div>
              <div id="experience">
                <WorkExperience />
              </div>
              <section id="projects" className="section-container">
                <h2 className="section-title">Featured Projects</h2>
                <ProjectsSection />
              </section>

              <div id="skills">
                <SkillsSection />
              </div>

              <section className="section-container chat-section">
                <h2 className="section-title">Chat with My AI Assistant</h2>
                <p className="chat-description">
                  Have questions about my experience, skills, projects or will I be a good fit ? My AI assistant is here to help!
                  Feel free to ask anything, and get instant responses about my background and expertise.
                </p>
                <div className="chat-wrapper">
                  <ChatBot />
                </div>
              </section>

              <section id="contact" className="section-container">
                <div className="connect-section">
                  <div className="match-message">
                    <h2>Boom, It's a Match! 🎉</h2>
                    <p className="match-description">
                      I'm passionate about creating innovative solutions and would love to bring my expertise to your team.
                    </p>
                  </div>
                  <div className="connect-content">
                    <p className="connect-description">
                      Ready to build something amazing together? Let's connect and discuss how I can contribute to your projects.
                    </p>
                    <a 
                      href="#links-panel" 
                      className="connect-button"
                      onClick={(e) => {
                        e.preventDefault();
                        const button = e.currentTarget;
                        const linksPanel = document.getElementById('links-panel');
                        
                        // Add highlight class to both button and links panel
                        button.classList.add('section-highlight');
                        linksPanel.classList.add('section-highlight');
                        
                        // Scroll to the section
                        linksPanel.scrollIntoView({ behavior: 'smooth' });
                        
                        // Remove highlight classes after animation
                        setTimeout(() => {
                          button.classList.remove('section-highlight');
                          linksPanel.classList.remove('section-highlight');
                        }, 1500);
                      }}
                    >
                      <span>Connect with me</span>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;