import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const TerminalContainer = styled.div`
  font-family: 'Fira Code', monospace;
  background-color: var(--color-dark);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px var(--shadow-color);
  width: 100%;
  max-width: 700px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const TerminalHeader = styled.div`
  background-color: var(--color-medium);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TerminalTitle = styled.div`
  color: var(--color-light);
  font-size: 0.9rem;
`;

const TerminalButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const TerminalButton = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`;

const TerminalBody = styled.div`
  padding: 1rem;
  color: var(--color-light);
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.6;
  flex-grow: 1;
  font-size: 0.95rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral) var(--color-dark);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-dark);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-neutral);
    border-radius: 4px;
  }
`;

const TerminalLine = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const TerminalPrompt = styled.span`
  color: var(--accent-color);
  margin-right: 8px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const TerminalContent = styled.span`
  word-break: break-word;
  white-space: pre-wrap;
`;

const TerminalCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background-color: var(--color-light);
  margin-left: 2px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const TerminalOutput = styled.div`
  margin-bottom: 1rem;
  color: var(--color-light);
  text-align: left;
`;

interface TerminalProps {
  commands: string[];
  outputs: string[];
  typingSpeed?: number;
  initialDelay?: number;
}

enum AnimationStep {
  WAITING,
  TYPING,
  PAUSE_AFTER_TYPING,
  SHOWING_OUTPUT,
  PAUSE_AFTER_OUTPUT
}

const Terminal: React.FC<TerminalProps> = ({ 
  commands, 
  outputs, 
  typingSpeed = 50,
  initialDelay = 1000
}) => {
  const [lines, setLines] = useState<{type: 'command' | 'output', content: string}[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentStep, setCurrentStep] = useState(AnimationStep.WAITING);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Handle the animation sequence
  useEffect(() => {
    if (isComplete) return;
    
    // Initial delay
    if (currentStep === AnimationStep.WAITING && currentCommandIndex === 0) {
      const timer = setTimeout(() => {
        setCurrentStep(AnimationStep.TYPING);
      }, initialDelay);
      return () => clearTimeout(timer);
    }
    
    // Transition between commands
    if (currentStep === AnimationStep.WAITING && currentCommandIndex > 0) {
      const timer = setTimeout(() => {
        setCurrentStep(AnimationStep.TYPING);
      }, 800);
      return () => clearTimeout(timer);
    }
    
    // Type the current command
    if (currentStep === AnimationStep.TYPING) {
      const currentCommand = commands[currentCommandIndex];
      
      if (currentLine.length === currentCommand.length) {
        // Command typing complete, pause
        const timer = setTimeout(() => {
          setCurrentStep(AnimationStep.PAUSE_AFTER_TYPING);
        }, 200);
        return () => clearTimeout(timer);
      }
      
      // Type next character
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + currentCommand.charAt(prev.length));
      }, typingSpeed + Math.floor(Math.random() * 20));
      return () => clearTimeout(timer);
    }
    
    // Show enter "keypress" effect and add command to history
    if (currentStep === AnimationStep.PAUSE_AFTER_TYPING) {
      const timer = setTimeout(() => {
        // Add the command to history
        setLines(prev => [...prev, {type: 'command', content: currentLine}]);
        setCurrentLine("");
        setCurrentStep(AnimationStep.SHOWING_OUTPUT);
      }, 400);
      return () => clearTimeout(timer);
    }
    
    // Show command output
    if (currentStep === AnimationStep.SHOWING_OUTPUT) {
      const timer = setTimeout(() => {
        // Add output to lines
        setLines(prev => [...prev, {type: 'output', content: outputs[currentCommandIndex]}]);
        setCurrentStep(AnimationStep.PAUSE_AFTER_OUTPUT);
      }, 300);
      return () => clearTimeout(timer);
    }
    
    // Wait after showing output before next command
    if (currentStep === AnimationStep.PAUSE_AFTER_OUTPUT) {
      const timer = setTimeout(() => {
        if (currentCommandIndex < commands.length - 1) {
          setCurrentCommandIndex(prev => prev + 1);
          setCurrentStep(AnimationStep.WAITING);
        } else {
          setIsComplete(true);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [
    currentStep, 
    currentCommandIndex, 
    currentLine, 
    commands, 
    outputs, 
    typingSpeed, 
    initialDelay, 
    isComplete
  ]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  const renderPrompt = () => (
    <TerminalPrompt>alpersaritas@MacBook: ~/portfolio$</TerminalPrompt>
  );

  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalButtons>
          <TerminalButton $color="#ff6057" />
          <TerminalButton $color="#ffbd2e" />
          <TerminalButton $color="#27c93f" />
        </TerminalButtons>
        <TerminalTitle>alpersaritas@MacBook: ~/portfolio</TerminalTitle>
        <div></div>
      </TerminalHeader>
      <TerminalBody ref={terminalBodyRef}>
        {/* History of commands and outputs */}
        {lines.map((line, index) => (
          line.type === 'command' ? (
            <TerminalLine key={`line-${index}`}>
              {renderPrompt()} 
              <TerminalContent>{line.content}</TerminalContent>
            </TerminalLine>
          ) : (
            <TerminalOutput key={`output-${index}`}>
              {line.content}
            </TerminalOutput>
          )
        ))}
        
        {/* Currently typing command line */}
        {!isComplete && currentStep !== AnimationStep.SHOWING_OUTPUT && currentStep !== AnimationStep.PAUSE_AFTER_OUTPUT && (
          <TerminalLine>
            {renderPrompt()} 
            <TerminalContent>
              {currentLine}
              {currentStep !== AnimationStep.PAUSE_AFTER_TYPING && <TerminalCursor />}
            </TerminalContent>
          </TerminalLine>
        )}
        
        {/* Final command prompt */}
        {isComplete && (
          <TerminalLine>
            {renderPrompt()} <TerminalCursor />
          </TerminalLine>
        )}
      </TerminalBody>
    </TerminalContainer>
  );
};

export default Terminal;