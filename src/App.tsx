import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import './App.css'
import Terminal from './components/Terminal'
import ModernBackground from './components/ModernBackground'
import Navbar from './components/Navbar'

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  font-family: var(--font-ui);
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  text-align: center;
`;

const ContentSection = styled.div`
  padding: 2rem;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  text-align: center;
  font-weight: 500;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--shadow-color-hover);
    border-color: var(--accent-color);
  }
`;

const ProjectLink = styled(motion.a)`
  text-decoration: none;
  color: inherit;
  display: contents;
`;

const ProjectTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
`;

const ProjectDescription = styled.p`
  font-family: var(--font-article);
  font-size: 0.9rem;
  color: var(--card-text);
  line-height: 1.5;
`;

function App() {
  // State for dark/light mode toggle
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    // Add or remove data-theme attribute to enable CSS variable switching
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };
  
  // Set initial theme based on user preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    if (prefersDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Terminal commands and outputs
  const terminalCommands = [
    "whoami",
    "cat about.md",
    "ls -l skills/",
    "cat contact.sh"
  ];
  
  const terminalOutputs = [
    "Alper Saritas\nEngineer & Developer",
    "# About Me\n\nHey there! I'm a dude based in Germany. I build things that live both in the digital and physical worlds.",
    "-rw-r--r--  1 alper  staff   102 May  1 2025 coding.json\n-rw-r--r--  1 alper  staff    82 May  1 2025 engineering.txt",
    "#!/bin/bash\n\necho \"Email: alper@saritas.net.tr\"\necho \"GitHub: github.com/lprsrts\"\necho \"LinkedIn: linkedin.com/in/mehmetalpersaritas\"\n\nexit 0"
  ];

  return (
    <AppContainer>
      <ModernBackground isDarkMode={isDarkMode} />
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <HeroSection>
        <Terminal
          commands={terminalCommands}
          outputs={terminalOutputs}
          typingSpeed={50}
          initialDelay={500}
        />
      </HeroSection>

      <ContentSection>
        <SectionTitle>Projects</SectionTitle>
        <ProjectsGrid>
          <ProjectLink 
            href="https://meditations.alpersaritas.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ProjectCard 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProjectTitle>Meditations</ProjectTitle>
              <ProjectDescription>
                A collection of daily meditations and reflections in my native language.
              </ProjectDescription>
            </ProjectCard>
          </ProjectLink>
          
          <ProjectCard 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProjectTitle>Engineering Blog</ProjectTitle>
            <ProjectDescription>
              Coming soon! Technical articles and insights about engineering.
            </ProjectDescription>
          </ProjectCard>
          
          <ProjectCard 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProjectTitle>Code Lab</ProjectTitle>
            <ProjectDescription>
              Coming soon! Experiments, demos, and interactive examples of my coding projects.
            </ProjectDescription>
          </ProjectCard>
        </ProjectsGrid>
      </ContentSection>
    </AppContainer>
  )
}

export default App
