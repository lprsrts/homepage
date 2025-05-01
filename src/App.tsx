import { motion } from 'framer-motion'
import styled from 'styled-components'
import './App.css'
import PCBCircuit from './components/PCBCircuit'
import Terminal from './components/Terminal'

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  color: #f8f8f8;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
`

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 0 2rem;
  text-align: center;
`

const Menu = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`

const MenuTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #4f8fff;
`

const SiteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`

const SiteCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: rgba(40, 40, 40, 0.6);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #333;

  &:hover {
    background-color: rgba(60, 60, 60, 0.6);
    transform: translateY(-4px);
    border-color: #4f8fff;
  }
`

const SiteTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #f8f8f8;
`

const SiteDescription = styled.p`
  font-size: 0.9rem;
  color: #bebebe;
  line-height: 1.5;
`

function App() {
  // Define the terminal commands and outputs
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
      <PCBCircuit />

      <HeroSection>
        <Terminal
          commands={terminalCommands}
          outputs={terminalOutputs}
          typingSpeed={50}
          initialDelay={500}
        />
      </HeroSection>

      <Menu>
        <MenuTitle>README.md</MenuTitle>
        <SiteGrid>
          <SiteCard 
            href="https://meditations.alpersaritas.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SiteTitle>Meditations</SiteTitle>
            <SiteDescription>
              A collection of daily meditations and reflections in my native language.
            </SiteDescription>
          </SiteCard>
          
          <SiteCard 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SiteTitle>Engineering Blog</SiteTitle>
            <SiteDescription>
              Coming soon! Technical articles and insights about engineering.
            </SiteDescription>
          </SiteCard>
          
          <SiteCard 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SiteTitle>Code Lab</SiteTitle>
            <SiteDescription>
              Coming soon! Experiments, demos, and interactive examples of my coding projects.
            </SiteDescription>
          </SiteCard>
        </SiteGrid>
      </Menu>
    </AppContainer>
  )
}

export default App
