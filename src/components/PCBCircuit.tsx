import { useEffect, useState, useRef, ReactElement } from 'react';
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

// Circuit trace/path
const CircuitTrace = styled(motion.div)<{ $width: string; $height: string; $top: string; $left: string; $rotate?: string; $color?: string; $radius?: string; }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$width};
  height: ${props => props.$height};
  background-color: ${props => props.$color || 'rgba(40, 40, 40, 0.7)'};
  transform: ${props => props.$rotate ? `rotate(${props.$rotate})` : 'none'};
  border-radius: ${props => props.$radius || (props.$height === '2px' ? '1px' : props.$width === '2px' ? '1px' : '0')};
`;

// Curved circuit trace
const CurvedTrace = styled(motion.div)<{ $top: string; $left: string; $size: string; $borderStartAngle: string; $borderEndAngle: string; $color?: string; }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  border: 2px solid ${props => props.$color || 'rgba(40, 40, 40, 0.7)'};
  border-radius: 50%;
  clip-path: polygon(50% 50%, ${props => props.$borderStartAngle}, ${props => props.$borderEndAngle}, 50% 50%);
  background-color: transparent;
`;

// Via (connection between layers)
const Via = styled(motion.div)<{ $top: string; $left: string; $size?: string; $color?: string; }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size || '6px'};
  height: ${props => props.$size || '6px'};
  background-color: ${props => props.$color || 'rgba(70, 70, 70, 0.8)'};
  border: 1px solid rgba(90, 90, 90, 0.8);
  border-radius: 50%;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
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

// A pulse that travels along circuit traces
const ElectricalPulse = styled(motion.div)<{ $size: string; $color?: string; }>`
  position: absolute;
  width: ${props => props.$size};
  height: ${props => props.$size};
  background-color: ${props => props.$color || 'rgba(79, 143, 255, 0.9)'};
  border-radius: 50%;
  box-shadow: ${props => `0 0 8px 2px ${props.$color || 'rgba(79, 143, 255, 0.6)'}`};
`;

// Container for a pulse path
const PulsePath = styled.div`
  position: absolute;
  overflow: visible;
  width: 100%;
  height: 100%;
`;

// Circuit traces where the pulses will travel - enhanced with more complex paths
const CIRCUIT_PATHS = [
  // Path 1: From bottom to microprocessor - more complex route
  [
    { x: '50%', y: '90%' },
    { x: '50%', y: '80%' },
    { x: '42%', y: '80%' },
    { x: '42%', y: '65%' },
    { x: '55%', y: '65%' },
    { x: '55%', y: '50%' },
  ],
  // Path 2: From left to microprocessor - curved path
  [
    { x: '5%', y: '45%' },
    { x: '15%', y: '45%' },
    { x: '15%', y: '35%' },
    { x: '25%', y: '35%' },
    { x: '25%', y: '50%' },
    { x: '35%', y: '50%' },
  ],
  // Path 3: From right to LED (RX) - S-curve
  [
    { x: '95%', y: '30%' },
    { x: '85%', y: '30%' },
    { x: '85%', y: '25%' },
    { x: '75%', y: '25%' },
    { x: '75%', y: '20%' },
    { x: '70%', y: '20%' },
  ],
  // Path 4: From microprocessor to LED (TX) - diagonal with jog
  [
    { x: '65%', y: '50%' },
    { x: '68%', y: '55%' },
    { x: '72%', y: '55%' },
    { x: '75%', y: '60%' },
    { x: '80%', y: '60%' },
    { x: '80%', y: '65%' },
    { x: '85%', y: '65%' },
  ],
  // Path 5: From crystal to microprocessor
  [
    { x: '30%', y: '15%' },
    { x: '30%', y: '25%' },
    { x: '40%', y: '25%' },
    { x: '40%', y: '45%' },
  ],
  // Path 6: From MOSFET to electrolytic capacitor
  [
    { x: '12%', y: '60%' },
    { x: '12%', y: '70%' },
    { x: '20%', y: '70%' },
    { x: '20%', y: '75%' },
    { x: '25%', y: '75%' },
  ],
  // Path 7: From microcontroller to RGB LED
  [
    { x: '78%', y: '40%' },
    { x: '85%', y: '40%' },
    { x: '85%', y: '45%' },
    { x: '90%', y: '45%' },
    { x: '90%', y: '52%' },
  ],
  // Path 8: From IC to microcontroller
  [
    { x: '60%', y: '25%' },
    { x: '65%', y: '25%' },
    { x: '65%', y: '30%' },
    { x: '70%', y: '30%' },
    { x: '70%', y: '40%' },
  ]
];

// Define path colors with a theme
const PATH_COLORS = {
  data: 'rgba(60, 100, 180, 0.7)',
  power: 'rgba(180, 60, 60, 0.7)',
  ground: 'rgba(60, 60, 60, 0.7)',
  signal: 'rgba(60, 180, 60, 0.7)',
  control: 'rgba(180, 180, 60, 0.7)',
  analog: 'rgba(180, 60, 180, 0.7)'
};

// Assign specific themes to paths
const PATH_THEMES = [
  PATH_COLORS.power,     // Path 1
  PATH_COLORS.ground,    // Path 2
  PATH_COLORS.signal,    // Path 3
  PATH_COLORS.signal,    // Path 4
  PATH_COLORS.control,   // Path 5
  PATH_COLORS.power,     // Path 6
  PATH_COLORS.data,      // Path 7
  PATH_COLORS.control    // Path 8
];

// Pulse colors corresponding to path themes
const PULSE_COLORS = [
  'rgba(255, 100, 100, 0.9)',  // Power - red
  'rgba(100, 100, 100, 0.9)',  // Ground - gray
  'rgba(100, 255, 100, 0.9)',  // Signal - green
  'rgba(255, 100, 100, 0.9)',  // Signal - red
  'rgba(255, 255, 100, 0.9)',  // Control - yellow
  'rgba(255, 100, 100, 0.9)',  // Power - red
  'rgba(100, 100, 255, 0.9)',  // Data - blue
  'rgba(255, 255, 100, 0.9)'   // Control - yellow
];

interface Point {
  x: string;
  y: string;
}

interface Pulse {
  id: number;
  pathIndex: number;
  position: number; // 0-1 value representing position along the path
  size: string;
}

interface LEDState {
  rxActive: boolean;
  txActive: boolean;
  powerActive: boolean;
  dataActive: boolean;
  statusActive: boolean;
}

const PCBCircuit = () => {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [ledStates, setLedStates] = useState<LEDState>({
    rxActive: false,
    txActive: false,
    powerActive: true,  // Power LED always on
    dataActive: false,
    statusActive: false
  });
  
  const microprocessorControls = useAnimation();
  const microcontrollerControls = useAnimation();
  const requestRef = useRef<number | undefined>(undefined);
  
  // Helper to convert percentage string to numeric value
  const percentToValue = (percent: string): number => {
    return parseFloat(percent.replace('%', ''));
  };
  
  // Get point along path based on position (0-1)
  const getPointAlongPath = (path: Point[], position: number): { x: number; y: number } => {
    // Determine which segment we're on
    const numSegments = path.length - 1;
    const segmentLength = 1 / numSegments;
    const currentSegment = Math.min(Math.floor(position / segmentLength), numSegments - 1);
    const segmentPosition = (position - currentSegment * segmentLength) / segmentLength;
    
    // Get the points for the current segment
    const start = path[currentSegment];
    const end = path[currentSegment + 1];
    
    // Interpolate between the points
    const startX = percentToValue(start.x);
    const startY = percentToValue(start.y);
    const endX = percentToValue(end.x);
    const endY = percentToValue(end.y);
    
    return {
      x: startX + (endX - startX) * segmentPosition,
      y: startY + (endY - startY) * segmentPosition
    };
  };
  
  // Animation loop
  const animatePulses = () => {
    setPulses(prev => prev.map(pulse => {
      const newPosition = pulse.position + 0.003;
      
      // If pulse completes a path
      if (newPosition >= 1) {
        // Trigger LED effects when pulse reaches end
        if (pulse.pathIndex === 2) {
          setLedStates(prev => ({ ...prev, rxActive: true }));
        }
        if (pulse.pathIndex === 3) {
          setLedStates(prev => ({ ...prev, txActive: true }));
        }
        if (pulse.pathIndex === 6) {
          setLedStates(prev => ({ ...prev, dataActive: true }));
        }
        if (pulse.pathIndex === 7) {
          setLedStates(prev => ({ ...prev, statusActive: true }));
        }
        
        // Remove this pulse
        return { ...pulse, position: 1.1 }; 
      }
      
      return { ...pulse, position: newPosition };
    }).filter(pulse => pulse.position <= 1.1));
    
    requestRef.current = requestAnimationFrame(animatePulses);
  };
  
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
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animatePulses);
    
    // Generate new pulses periodically
    const pulseInterval = setInterval(() => {
      // Create a new pulse on a random path
      const pathIndex = Math.floor(Math.random() * CIRCUIT_PATHS.length);
      
      setPulses(prev => [...prev, {
        id: Date.now(),
        pathIndex,
        position: 0,
        size: '4px',
      }]);
      
      // Turn off LED after a delay when pulse completes
      setTimeout(() => {
        if (pathIndex === 2) {
          setLedStates(prev => ({ ...prev, rxActive: false }));
        }
        if (pathIndex === 3) {
          setLedStates(prev => ({ ...prev, txActive: false }));
        }
        if (pathIndex === 6) {
          setLedStates(prev => ({ ...prev, dataActive: false }));
        }
        if (pathIndex === 7) {
          setLedStates(prev => ({ ...prev, statusActive: false }));
        }
      }, 2000);
      
    }, 1500);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearInterval(pulseInterval);
    };
  }, []);
  
  // Generate circuit traces based on paths
  const renderCircuitTraces = () => {
    const traces: ReactElement[] = [];
    const vias: ReactElement[] = [];
    const corners: ReactElement[] = [];

    CIRCUIT_PATHS.forEach((path, pathIndex) => {
      const pathColor = PATH_THEMES[pathIndex] || PATH_COLORS.ground;
      
      // For each segment in the path
      for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        
        // Determine if this is horizontal, vertical, or diagonal
        const isHorizontal = start.y === end.y;
        const isVertical = start.x === end.x;
        
        if (isHorizontal || isVertical) {
          // Straight trace
          const left = isHorizontal ? start.x : Math.min(percentToValue(start.x), percentToValue(end.x)) + '%';
          const top = isHorizontal ? start.y : Math.min(percentToValue(start.y), percentToValue(end.y)) + '%';
          const width = isHorizontal ? 
            Math.abs(percentToValue(end.x) - percentToValue(start.x)) + '%' : 
            '2px';
          const height = isHorizontal ? 
            '2px' : 
            Math.abs(percentToValue(end.y) - percentToValue(start.y)) + '%';
          
          traces.push(
            <CircuitTrace 
              key={`trace-${pathIndex}-${i}`}
              $width={width}
              $height={height}
              $top={top}
              $left={left}
              $color={pathColor}
            />
          );
        } else {
          // Diagonal trace - we'll use multiple segments to create this
          const startX = percentToValue(start.x);
          const startY = percentToValue(start.y);
          const endX = percentToValue(end.x);
          const endY = percentToValue(end.y);
          
          // Calculate the angle
          const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
          
          // Calculate the length
          const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
          
          traces.push(
            <CircuitTrace 
              key={`diagonal-${pathIndex}-${i}`}
              $width={`${length}%`}
              $height="2px"
              $top={`${startY}%`}
              $left={`${startX}%`}
              $rotate={`${angle}deg`}
              $color={pathColor}
              style={{ transformOrigin: 'left center' }}
            />
          );
        }
        
        // Add vias at corners/intersections (except at endpoints)
        if (i > 0 && i < path.length - 1) {
          vias.push(
            <Via 
              key={`via-${pathIndex}-${i}`}
              $top={`calc(${path[i].y} - 3px)`}
              $left={`calc(${path[i].x} - 3px)`}
              $color={pathColor}
            />
          );
        }
        
        // For consecutive segments that form a corner, add rounded corner caps
        if (i < path.length - 2) {
          const current = path[i];
          const next = path[i + 1];
          const afterNext = path[i + 2];
          
          // Check if this is a corner (change in both x and y direction)
          const isCornerX = next.x !== current.x && next.x !== afterNext.x;
          const isCornerY = next.y !== current.y && next.y !== afterNext.y;
          
          if (isCornerX && isCornerY) {
            corners.push(
              <CircuitTrace
                key={`corner-${pathIndex}-${i}`}
                $width="4px"
                $height="4px"
                $top={`calc(${next.y} - 2px)`}
                $left={`calc(${next.x} - 2px)`}
                $color={pathColor}
                $radius="2px"
              />
            );
          }
        }
      }
      
      // Add a special curved trace in a few places for realism
      if (pathIndex === 1 || pathIndex === 4 || pathIndex === 7) {
        const curvePt = Math.floor(path.length / 2);
        const x = percentToValue(path[curvePt].x);
        const y = percentToValue(path[curvePt].y);
        
        // Add a curved segment
        corners.push(
          <CurvedTrace
            key={`curve-${pathIndex}`}
            $top={`${y - 2}%`}
            $left={`${x - 2}%`}
            $size="4%"
            $borderStartAngle="0% 0%"
            $borderEndAngle="100% 100%"
            $color={pathColor}
          />
        );
      }
    });
    
    return [...traces, ...corners, ...vias];
  };
  
  return (
    <PCBContainer>
      <PCBBoard>
        {/* Circuit Traces */}
        {renderCircuitTraces()}
        
        {/* Extra Vias across the board for realistic look */}
        <Via $top="10%" $left="15%" />
        <Via $top="15%" $left="40%" />
        <Via $top="25%" $left="55%" />
        <Via $top="35%" $left="75%" />
        <Via $top="45%" $left="30%" />
        <Via $top="60%" $left="55%" />
        <Via $top="70%" $left="35%" />
        <Via $top="80%" $left="65%" />
        <Via $top="85%" $left="25%" />
        <Via $top="55%" $left="85%" />
        
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
        
        {/* Electrical Pulses traveling along the circuit */}
        {pulses.map(pulse => {
          const path = CIRCUIT_PATHS[pulse.pathIndex];
          const { x, y } = getPointAlongPath(path, pulse.position);
          const pulseColor = PULSE_COLORS[pulse.pathIndex] || 'rgba(79, 143, 255, 0.9)';
          
          return (
            <PulsePath key={pulse.id}>
              <ElectricalPulse
                $size={pulse.size}
                $color={pulseColor}
                style={{
                  left: `calc(${x}% - 2px)`,
                  top: `calc(${y}% - 2px)`,
                }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
              />
            </PulsePath>
          );
        })}
      </PCBBoard>
    </PCBContainer>
  );
};

export default PCBCircuit;