import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const TerminalContainer = styled.div`
  font-family: 'Fira Code', monospace;
  background-color: rgba(20, 20, 20, 0.9);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 700px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const TerminalHeader = styled.div`
  background-color: #333;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TerminalTitle = styled.div`
  color: #ddd;
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
  color: #f1f1f1;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.6;
  flex-grow: 1;
  font-size: 0.95rem;
  scrollbar-width: thin;
  scrollbar-color: #555 #222;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #222;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
  }
`;

const TerminalLine = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const TerminalPrompt = styled.span`
  color: #4f8fff;
  margin-right: 8px;
  white-space: nowrap;
`;

const TerminalCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background-color: #f1f1f1;
  margin-left: 2px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const TerminalOutput = styled.div`
  margin-bottom: 1rem;
  color: #ddd;
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
    <TerminalPrompt>alper@macbook:~/portfolio$</TerminalPrompt>
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
              {renderPrompt()} {line.content}
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
            {renderPrompt()} {currentLine}
            {currentStep !== AnimationStep.PAUSE_AFTER_TYPING && <TerminalCursor />}
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