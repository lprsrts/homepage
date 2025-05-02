import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ToggleContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--toggle-color);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--toggle-bg);
  }
  
  &:focus {
    outline: none;
  }
`;

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme} aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      {isDarkMode ? (
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -45 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.svg>
      ) : (
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: 45 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      )}
    </ToggleContainer>
  );
};

export default ThemeToggle;