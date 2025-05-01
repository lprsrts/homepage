import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

// PCB Board container
const PCBContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(10, 10, 10, 0.95);
  overflow: hidden;
`;

// Semi-transparent PCB board
const PCBBoard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 30, 20, 0.15);
  box-shadow: inset 0 0 100px rgba(0, 20, 10, 0.2);
`;

// Component base (general electronic component)
const Component = styled(motion.div)<{ $width: string; $height: string; $top: string; $left: string; $rotate?: string; }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$width};
  height: ${props => props.$height};
  transform: ${props => props.$rotate ? `rotate(${props.$rotate})` : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Microprocessor chip
const Microprocessor = styled(Component)`
  background-color: rgba(40, 40, 40, 0.9);
  border: 1px solid rgba(60, 60, 60, 0.9);
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 2px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 2px;
`;

// Microcontroller chip (larger with more pins)
const Microcontroller = styled(Component)`
  background-color: rgba(30, 35, 40, 0.9);
  border: 1px solid rgba(50, 55, 60, 0.9);
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 3px;
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    background: radial-gradient(
      circle at center,
      rgba(60, 65, 70, 0.8) 0%,
      rgba(40, 45, 50, 0.6) 70%
    );
    border-radius: 2px;
  }
`;

// IC Chip - Integrated Circuit
const ICChip = styled(Component)`
  background-color: rgba(35, 35, 35, 0.9);
  border: 1px solid rgba(55, 55, 55, 0.9);
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  padding: 2px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    height: 100%;
    background: repeating-linear-gradient(
      180deg,
      transparent,
      transparent 3px,
      rgba(50, 50, 50, 0.5) 3px,
      rgba(50, 50, 50, 0.5) 6px
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5%;
    left: 0;
    width: 100%;
    height: 90%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(70, 70, 70, 0.2) 40%,
      rgba(70, 70, 70, 0.2) 60%,
      transparent 100%
    );
  }
`;

// Crystal Oscillator
const Crystal = styled(Component)`
  background-color: rgba(180, 180, 180, 0.3);
  border: 1px solid rgba(200, 200, 200, 0.4);
  border-radius: 2px;
  
  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 70%;
    background-color: rgba(210, 210, 210, 0.2);
    border: 1px solid rgba(220, 220, 220, 0.3);
  }
`;

// Microprocessor pin
const Pin = styled.div`
  background-color: rgba(150, 150, 150, 0.7);
  height: 2px;
  width: 6px;
  position: absolute;
`;

// Pins along the left side
const LeftPin = styled(Pin)`
  left: -6px;
`;

// Pins along the right side
const RightPin = styled(Pin)`
  right: -6px;
`;

// Pins along the top
const TopPin = styled(Pin)`
  top: -6px;
  height: 6px;
  width: 2px;
`;

// Pins along the bottom
const BottomPin = styled(Pin)`
  bottom: -6px;
  height: 6px;
  width: 2px;
`;

// Resistor component
const Resistor = styled(Component)`
  background-color: rgba(80, 80, 80, 0.6);
  border: 1px solid rgba(100, 100, 100, 0.7);
  border-radius: 3px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 60%;
    background: repeating-linear-gradient(
      90deg,
      rgba(100, 100, 100, 0.6),
      rgba(100, 100, 100, 0.6) 2px,
      rgba(60, 60, 60, 0.6) 2px,
      rgba(60, 60, 60, 0.6) 4px
    );
  }
`;

// SMD Resistor (Surface Mount Device)
const SMDResistor = styled(Component)`
  background-color: rgba(100, 100, 100, 0.6);
  border: 1px solid rgba(120, 120, 120, 0.7);
  border-radius: 1px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 70%;
    background-color: rgba(80, 80, 80, 0.7);
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(60, 60, 60, 0.4) 0%,
      rgba(120, 120, 120, 0.6) 100%
    );
  }
`;

// Capacitor component
const Capacitor = styled(Component)`
  background-color: rgba(60, 60, 60, 0.6);
  border: 1px solid rgba(100, 100, 100, 0.6);
  border-radius: 50%;
`;

// Electrolytic Capacitor
const ElectrolyticCapacitor = styled(Component)`
  background-color: rgba(70, 70, 70, 0.6);
  border: 1px solid rgba(100, 100, 100, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    height: 70%;
    background-color: rgba(50, 50, 50, 0.7);
    border-radius: 50%;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 45%;
    width: 10%;
    height: 100%;
    background-color: rgba(100, 100, 100, 0.5);
  }
`;

// SMD Capacitor
const SMDCapacitor = styled(Component)`
  background-color: rgba(200, 200, 200, 0.3);
  border: 1px solid rgba(220, 220, 220, 0.4);
  border-radius: 1px;
  
  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 80%;
    background: linear-gradient(
      180deg,
      rgba(180, 180, 180, 0.4) 0%,
      rgba(150, 150, 150, 0.3) 100%
    );
  }
`;

// Transistor component
const Transistor = styled(Component)`
  background-color: rgba(60, 60, 60, 0.6);
  border: 1px solid rgba(100, 100, 100, 0.6);
  border-radius: 3px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 60%;
    height: 60%;
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 2px;
  }
`;

// MOSFET Transistor
const MOSFET = styled(Component)`
  background-color: rgba(50, 50, 50, 0.7);
  border: 1px solid rgba(80, 80, 80, 0.8);
  border-radius: 2px;
  
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    background-color: rgba(30, 30, 30, 0.8);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%);
  }
`;

// Inductor component
const Inductor = styled(Component)`
  background-color: rgba(90, 75, 60, 0.5);
  border: 1px solid rgba(110, 95, 80, 0.6);
  border-radius: 3px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 80%;
    background: repeating-linear-gradient(
      90deg,
      rgba(80, 65, 50, 0.6) 0%,
      rgba(80, 65, 50, 0.6) 3px,
      rgba(100, 85, 70, 0.5) 3px,
      rgba(100, 85, 70, 0.5) 6px
    );
    border-radius: 2px;
  }
`;

// LED component
const LED = styled(motion.div)<{ $size: string; $top: string; $left: string; $color: string; $active?: boolean; }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  border-radius: 50%;
  background-color: ${props => props.$active ? props.$color : 'rgba(30, 30, 30, 0.7)'};
  box-shadow: ${props => props.$active ? `0 0 10px 2px ${props.$color}` : 'none'};
  transition: all 0.2s ease;
`;

// RGB LED
const RGBLED = styled(Component)`
  background-color: rgba(40, 40, 40, 0.7);
  border: 1px solid rgba(60, 60, 60, 0.7);
  border-radius: 2px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  padding: 2px;
`;

interface LEDState {
  rxActive: boolean;
  txActive: boolean;
  powerActive: boolean;
  dataActive: boolean;
  statusActive: boolean;
}

const PCBCircuit = () => {
  const [ledStates, setLedStates] = useState<LEDState>({
    rxActive: false,
    txActive: false,
    powerActive: true,  // Power LED always on
    dataActive: false,
    statusActive: false
  });
  
  const microprocessorControls = useAnimation();
  const microcontrollerControls = useAnimation();
  
  useEffect(() => {
    // Start microprocessor subtle pulsing animation
    microprocessorControls.start({
      opacity: [0.9, 1, 0.9],
      boxShadow: [
        '0 0 3px rgba(79, 143, 255, 0.3)',
        '0 0 8px rgba(79, 143, 255, 0.6)',
        '0 0 3px rgba(79, 143, 255, 0.3)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
    
    // Start microcontroller animation
    microcontrollerControls.start({
      opacity: [0.9, 1, 0.9],
      boxShadow: [
        '0 0 3px rgba(255, 143, 79, 0.3)',
        '0 0 8px rgba(255, 143, 79, 0.6)',
        '0 0 3px rgba(255, 143, 79, 0.3)'
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
    
    // Blink LED animation - simulate random activity
    const ledInterval = setInterval(() => {
      const randomLED = Math.floor(Math.random() * 4);
      
      switch (randomLED) {
        case 0:
          setLedStates(prev => ({ ...prev, rxActive: true }));
          setTimeout(() => {
            setLedStates(prev => ({ ...prev, rxActive: false }));
          }, 1000);
          break;
        case 1:
          setLedStates(prev => ({ ...prev, txActive: true }));
          setTimeout(() => {
            setLedStates(prev => ({ ...prev, txActive: false }));
          }, 1000);
          break;
        case 2:
          setLedStates(prev => ({ ...prev, dataActive: true }));
          setTimeout(() => {
            setLedStates(prev => ({ ...prev, dataActive: false }));
          }, 1000);
          break;
        case 3:
          setLedStates(prev => ({ ...prev, statusActive: true }));
          setTimeout(() => {
            setLedStates(prev => ({ ...prev, statusActive: false }));
          }, 1000);
          break;
        default:
          break;
      }
    }, 2000);
    
    return () => {
      clearInterval(ledInterval);
    };
  }, []);
  
  return (
    <PCBContainer>
      <PCBBoard>
        {/* Microprocessor */}
        <Microprocessor 
          $width="100px" 
          $height="150px" 
          $top="40%" 
          $left="45%"
          animate={microprocessorControls}
        >
          {/* Add pins to microprocessor */}
          {Array(8).fill(0).map((_, i) => (
            <LeftPin key={`left-pin-${i}`} style={{ top: `${10 + i * 12}%` }} />
          ))}
          {Array(8).fill(0).map((_, i) => (
            <RightPin key={`right-pin-${i}`} style={{ top: `${10 + i * 12}%` }} />
          ))}
          
          {/* Microprocessor internals - simple grid of dots */}
          {Array(24).fill(0).map((_, i) => (
            <div key={`processor-element-${i}`} style={{
              width: '4px',
              height: '4px',
              backgroundColor: 'rgba(100, 100, 100, 0.5)',
              borderRadius: '50%',
              margin: '1px'
            }} />
          ))}
        </Microprocessor>
        
        {/* Microcontroller */}
        <Microcontroller
          $width="120px"
          $height="120px"
          $top="35%"
          $left="70%"
          animate={microcontrollerControls}
        >
          {/* Add pins to microcontroller */}
          {Array(6).fill(0).map((_, i) => (
            <TopPin key={`top-pin-${i}`} style={{ left: `${12 + i * 16}%` }} />
          ))}
          {Array(6).fill(0).map((_, i) => (
            <BottomPin key={`bottom-pin-${i}`} style={{ left: `${12 + i * 16}%` }} />
          ))}
          {Array(6).fill(0).map((_, i) => (
            <LeftPin key={`mc-left-pin-${i}`} style={{ top: `${12 + i * 16}%` }} />
          ))}
          {Array(6).fill(0).map((_, i) => (
            <RightPin key={`mc-right-pin-${i}`} style={{ top: `${12 + i * 16}%` }} />
          ))}
          
          {/* Microcontroller internals */}
          {Array(36).fill(0).map((_, i) => (
            <div key={`mc-element-${i}`} style={{
              width: '3px',
              height: '3px',
              backgroundColor: 'rgba(120, 100, 80, 0.5)',
              borderRadius: '50%',
              margin: '1px'
            }} />
          ))}
        </Microcontroller>
        
        {/* IC Chips */}
        <ICChip $width="70px" $height="30px" $top="25%" $left="60%" $rotate="0deg" />
        <ICChip $width="50px" $height="20px" $top="80%" $left="45%" $rotate="0deg" />
        
        {/* Crystal Oscillator */}
        <Crystal $width="20px" $height="30px" $top="15%" $left="30%" />
        
        {/* Passive & Active Components */}
        <Resistor $width="40px" $height="15px" $top="25%" $left="30%" $rotate="0deg" />
        <Resistor $width="40px" $height="15px" $top="55%" $left="25%" $rotate="90deg" />
        <SMDResistor $width="15px" $height="8px" $top="35%" $left="60%" />
        <SMDResistor $width="15px" $height="8px" $top="60%" $left="60%" />
        <SMDResistor $width="15px" $height="8px" $top="70%" $left="70%" />
        
        <Capacitor $width="20px" $height="20px" $top="40%" $left="20%" />
        <Capacitor $width="22px" $height="22px" $top="70%" $left="60%" />
        <ElectrolyticCapacitor $width="25px" $height="25px" $top="75%" $left="25%" />
        <ElectrolyticCapacitor $width="30px" $height="30px" $top="65%" $left="40%" />
        <SMDCapacitor $width="12px" $height="8px" $top="45%" $left="60%" />
        <SMDCapacitor $width="12px" $height="8px" $top="55%" $left="80%" />
        
        <Transistor $width="18px" $height="18px" $top="30%" $left="80%" />
        <Transistor $width="18px" $height="18px" $top="65%" $left="75%" />
        <MOSFET $width="20px" $height="20px" $top="60%" $left="12%" $rotate="0deg" />
        
        <Inductor $width="30px" $height="15px" $top="20%" $left="45%" />
        <Inductor $width="30px" $height="15px" $top="15%" $left="60%" />
        
        {/* Add more components in different locations */}
        <Resistor $width="35px" $height="15px" $top="85%" $left="70%" $rotate="30deg" />
        <SMDResistor $width="15px" $height="8px" $top="18%" $left="80%" />
        <Capacitor $width="18px" $height="18px" $top="90%" $left="20%" />
        <Transistor $width="18px" $height="18px" $top="10%" $left="45%" />
        <ICChip $width="60px" $height="25px" $top="50%" $left="15%" $rotate="90deg" />
        
        {/* LEDs */}
        <LED 
          $size="8px" 
          $top="20%" 
          $left="70%" 
          $color="rgba(0, 255, 0, 0.8)" 
          $active={ledStates.rxActive}
          animate={ledStates.rxActive ? {
            boxShadow: ['0 0 5px 2px rgba(0, 255, 0, 0.6)', '0 0 10px 4px rgba(0, 255, 0, 0.8)', '0 0 5px 2px rgba(0, 255, 0, 0.6)'],
          } : {}}
          transition={{ duration: 1, repeat: ledStates.rxActive ? Infinity : 0 }}
        />
        
        <LED 
          $size="8px" 
          $top="65%" 
          $left="85%" 
          $color="rgba(255, 30, 0, 0.8)" 
          $active={ledStates.txActive}
          animate={ledStates.txActive ? {
            boxShadow: ['0 0 5px 2px rgba(255, 30, 0, 0.6)', '0 0 10px 4px rgba(255, 30, 0, 0.8)', '0 0 5px 2px rgba(255, 30, 0, 0.6)'],
          } : {}}
          transition={{ duration: 0.8, repeat: ledStates.txActive ? Infinity : 0 }}
        />
        
        <LED 
          $size="6px" 
          $top="10%" 
          $left="10%" 
          $color="rgba(255, 0, 0, 0.8)" 
          $active={ledStates.powerActive}
          animate={{
            boxShadow: ['0 0 5px 2px rgba(255, 0, 0, 0.4)', '0 0 8px 3px rgba(255, 0, 0, 0.6)', '0 0 5px 2px rgba(255, 0, 0, 0.4)'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <LED 
          $size="7px" 
          $top="30%" 
          $left="10%" 
          $color="rgba(0, 100, 255, 0.8)" 
          $active={ledStates.statusActive}
          animate={ledStates.statusActive ? {
            boxShadow: ['0 0 5px 2px rgba(0, 100, 255, 0.6)', '0 0 10px 3px rgba(0, 100, 255, 0.8)', '0 0 5px 2px rgba(0, 100, 255, 0.6)'],
          } : {}}
          transition={{ duration: 0.7, repeat: ledStates.statusActive ? Infinity : 0 }}
        />
        
        {/* RGB LED */}
        <RGBLED $width="16px" $height="16px" $top="52%" $left="90%">
          <div style={{ 
            width: '5px', 
            height: '5px', 
            backgroundColor: ledStates.dataActive ? 'rgba(255, 0, 0, 0.8)' : 'rgba(100, 0, 0, 0.4)',
            borderRadius: '50%',
            boxShadow: ledStates.dataActive ? '0 0 5px 2px rgba(255, 0, 0, 0.6)' : 'none'
          }} />
          <div style={{ 
            width: '5px', 
            height: '5px', 
            backgroundColor: 'rgba(0, 100, 0, 0.4)',
            borderRadius: '50%'
          }} />
          <div style={{ 
            width: '5px', 
            height: '5px', 
            backgroundColor: 'rgba(0, 0, 100, 0.4)',
            borderRadius: '50%'
          }} />
          <div style={{ 
            width: '5px', 
            height: '5px', 
            backgroundColor: 'rgba(100, 100, 100, 0.4)',
            borderRadius: '50%'
          }} />
        </RGBLED>
      </PCBBoard>
    </PCBContainer>
  );
};

export default PCBCircuit;