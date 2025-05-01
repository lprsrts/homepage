import { TypeAnimation } from 'react-type-animation'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import './App.css'
import PCBCircuit from './components/PCBCircuit'

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

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`

const Subtitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #bebebe;
`

const TypedContent = styled.div`
  font-size: 1.25rem;
  line-height: 1.8;
  padding: 1.5rem;
  background-color: rgba(30, 30, 30, 0.7);
  border-radius: 8px;
  border-left: 4px solid #4f8fff;
  max-width: 700px;
  text-align: left;
  font-family: 'Fira Code', monospace;
  margin-bottom: 3rem;
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
  return (
    <AppContainer>
      {/* Replace the old ElectricalCircuit with our new PCBCircuit component */}
      <PCBCircuit />

      <HeroSection>
        <Title>Alper Saritas</Title>
        <Subtitle>Electrical Engineer & Developer</Subtitle>
        
        <TypedContent>
          <TypeAnimation
            sequence={[
              "// Hello, I'm Alper\nconst skills = {\n  coding: ['JavaScript', 'TypeScript', 'React'],\n  engineering: ['Electrical', 'Circuit Design'],\n  interests: ['Innovation', 'Problem Solving']\n};",
              2000,
              "// Hello, I'm Alper\nconst skills = {\n  coding: ['JavaScript', 'TypeScript', 'React'],\n  engineering: ['Electrical', 'Circuit Design'],\n  interests: ['Innovation', 'Problem Solving']\n};\n\n// Welcome to my digital space",
              1000,
            ]}
            speed={50}
            style={{ whiteSpace: 'pre-line' }}
            repeat={Infinity}
          />
        </TypedContent>
      </HeroSection>

      <Menu>
        <MenuTitle>My Projects</MenuTitle>
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
              A collection of daily meditations and reflections to help you find peace and clarity in your everyday life.
            </SiteDescription>
          </SiteCard>
          
          <SiteCard 
            href="#" 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SiteTitle>Engineering Blog</SiteTitle>
            <SiteDescription>
              Coming soon! Technical articles and insights about electrical engineering and circuit design.
            </SiteDescription>
          </SiteCard>
          
          <SiteCard 
            href="#" 
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
