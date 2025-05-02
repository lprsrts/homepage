import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background-color: var(--navbar-bg);
  box-shadow: 0 1px 10px var(--shadow-color);
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--text-color);
  transition: color 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

// Updated to match the meditations website styling exactly
const NavLink = styled(motion.a)`
  font-family: var(--font-ui);
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.3rem 0;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--text-color); /* Force same color on hover to match meditations site */
  }
  
  &:hover::after {
    width: 100%;
  }
  
  &.coming-soon {
    opacity: 0.7;
    cursor: default;
    
    &:hover::after {
      width: 0;
    }
  }
`;


const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [] = useState(false);
  
  
  return (
    <NavContainer>
      <Logo>Alper Saritas • Home</Logo>
      
      <NavLinks>
        <NavLink 
          href="https://meditations.alpersaritas.com" 
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Meditations
        </NavLink>
        
        <NavLink 
          className="coming-soon"
        >
          Engineering Blog
        </NavLink>
        
        <NavLink 
          className="coming-soon"
        >
          Code Lab
        </NavLink>
        
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;