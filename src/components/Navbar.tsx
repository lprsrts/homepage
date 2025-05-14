import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
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
  
  @media (max-width: 650px) {
    display: none; /* Hide on mobile */
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

const MobileNavButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 20;
  
  @media (max-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--navbar-bg);
  backdrop-filter: blur(15px);
  z-index: 15;
  padding: 5rem 2rem 2rem;
  flex-direction: column;
  
  @media (max-width: 650px) {
    display: flex;
  }
`;

const MobileNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.2rem;
`;

const ThemeToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen size increases beyond mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  const navigateToMeditations = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "https://meditations.alpersaritas.com";
    setIsMobileMenuOpen(false);
  };
  
  return (
    <NavContainer>
      <Logo>Alper Saritas • Home</Logo>
      
      {/* Desktop navigation */}
      <NavLinks>
        <NavLink 
          href="https://meditations.alpersaritas.com"
          onClick={navigateToMeditations}
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
      
      {/* Mobile menu button */}
      <MobileNavButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </MobileNavButton>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavList>
              <MobileNavLink 
                href="https://meditations.alpersaritas.com"
                onClick={navigateToMeditations}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Meditations
              </MobileNavLink>
              
              <MobileNavLink 
                className="coming-soon"
              >
                Engineering Blog
              </MobileNavLink>
              
              <MobileNavLink 
                className="coming-soon"
              >
                Code Lab
              </MobileNavLink>
            </MobileNavList>
            
            <ThemeToggleWrapper>
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </ThemeToggleWrapper>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;