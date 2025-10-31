"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useContext } from "react";
import { CardZIndexContext } from "./Deck";

// Gaussian random number generator for normal distribution
function randomGaussian(mean = 0, stdev = 1) {
  let u = 1 - Math.random();
  let v = 1 - Math.random();
  if (u === 0) u = 0.0001;
  if (v === 0) v = 0.0001;
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + stdev * z;
}

// Constrain a value between min and max
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Convert spherical coordinates to cartesian
function sphericalToCartesian(radius: number, angle: number) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

// Check if a position is within viewport boundaries with some margin
function isPositionInBounds(
  position: { x: number; y: number },
  windowWidth: number,
  windowHeight: number,
  cardWidth = 280,
  cardHeight = 120,
  margin = 20
) {
  const maxX = windowWidth / 2 - cardWidth / 2 - margin;
  const maxY = windowHeight / 2 - cardHeight / 2 - margin;

  return (
    position.x >= -maxX &&
    position.x <= maxX &&
    position.y >= -maxY &&
    position.y <= maxY
  );
}

// Key for position storage in localStorage
const POSITION_STORAGE_KEY = "cardPositions";

interface Article {
  slug: string;
  title: string;
  date: string;
}

interface CardProps {
  article: Article;
  index: number;
  safeRadius?: number;
  debugMode?: boolean;
  zIndex: number;
}

export default function Card({
  article,
  index,
  safeRadius = 200,
  debugMode = false,
  zIndex,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [distancePercent, setDistancePercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { updateZIndex, totalCards, hoveredCard, setHoveredCard } =
    useContext(CardZIndexContext);

  // Format the date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Clear all saved positions if holding shift when pressing 'r'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" && e.shiftKey) {
        console.log("Clearing all saved card positions");
        localStorage.removeItem(POSITION_STORAGE_KEY);
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Generate initial position or load saved position
  useEffect(() => {
    try {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const savedPositionsJSON = localStorage.getItem(POSITION_STORAGE_KEY);
      let initialPosition: { x: number; y: number } | undefined;
      let needsRepositioning = false;

      if (savedPositionsJSON) {
        const savedPositions = JSON.parse(savedPositionsJSON);
        initialPosition = savedPositions[article.slug];

        if (
          initialPosition &&
          !isPositionInBounds(initialPosition, windowWidth, windowHeight)
        ) {
          console.log(`Card "${article.slug}" is outside bounds, repositioning`);
          needsRepositioning = true;
        }
      }

      if (initialPosition && !needsRepositioning) {
        setPosition(initialPosition);
      } else {
        const distance = Math.abs(randomGaussian(0, safeRadius / 3));
        const angle = Math.random() * 2 * Math.PI;
        const clampedDist = clamp(distance, 0, safeRadius * 0.9);

        let newPosition = sphericalToCartesian(clampedDist, angle);

        if (!isPositionInBounds(newPosition, windowWidth, windowHeight)) {
          const maxX = windowWidth / 2 - 160;
          const maxY = windowHeight / 2 - 80;

          newPosition = {
            x: clamp(newPosition.x, -maxX, maxX),
            y: clamp(newPosition.y, -maxY, maxY),
          };
        }

        setPosition(newPosition);
        setDistancePercent(Math.round((clampedDist / safeRadius) * 100));

        const savedPositions = savedPositionsJSON
          ? JSON.parse(savedPositionsJSON)
          : {};
        savedPositions[article.slug] = newPosition;
        localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(savedPositions));
      }
    } catch (e) {
      console.warn("Failed to handle card position", e);
      const randomAngle = Math.random() * 2 * Math.PI;
      const randomDist = Math.random() * safeRadius * 0.5;
      setPosition(sphericalToCartesian(randomDist, randomAngle));
    }
  }, [article.slug, safeRadius]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredCard(article.slug);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoveredCard === article.slug) {
      setHoveredCard(null);
    }
  };

  const handleInteraction = () => {
    updateZIndex(article.slug);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (!position) return;

    let newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    };

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (!isPositionInBounds(newPosition, windowWidth, windowHeight)) {
      const maxX = windowWidth / 2 - 160;
      const maxY = windowHeight / 2 - 80;

      newPosition = {
        x: clamp(newPosition.x, -maxX, maxX),
        y: clamp(newPosition.y, -maxY, maxY),
      };
    }

    setPosition(newPosition);

    try {
      const savedPositionsJSON = localStorage.getItem(POSITION_STORAGE_KEY);
      const savedPositions = savedPositionsJSON
        ? JSON.parse(savedPositionsJSON)
        : {};
      savedPositions[article.slug] = newPosition;
      localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(savedPositions));
    } catch (e) {
      console.warn("Failed to save card position", e);
    }
  };

  const effectiveZIndex = () => {
    if (hoveredCard === article.slug) {
      return totalCards + 1000;
    }
    return zIndex;
  };

  const rotation = ((index % 3) - 1) * 5;

  if (position === null) {
    return null;
  }

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: "-140px",
    marginTop: "-60px",
    zIndex: effectiveZIndex(),
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  };

  return (
    <motion.div
      ref={cardRef}
      className={`article-card ${isHovered ? "card-hovered" : ""}`}
      drag
      dragMomentum={false}
      onDragStart={handleInteraction}
      onDragEnd={handleDragEnd}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      initial={{
        opacity: 0,
        scale: 0,
        x: position.x,
        y: position.y,
        rotate: rotation,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
        rotate: rotation,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      transition={{
        delay: index * 0.15,
        type: "spring",
        damping: 15,
        stiffness: 150,
      }}
      style={cardStyle}
    >
      <div className="card-content">
        <h2>{article.title}</h2>
        {article.date && (
          <div className="card-date">{formatDate(article.date)}</div>
        )}
        <div className="card-decoration"></div>
      </div>
      <a href={`/articles/${article.slug}`} className="card-link">
        Read →
      </a>

      {debugMode && (
        <div
          className="card-debug"
          style={{
            position: "absolute",
            top: "2px",
            left: "2px",
            fontSize: "8px",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            padding: "2px 4px",
            borderRadius: "2px",
            pointerEvents: "none",
          }}
        >
          z:{zIndex} {hoveredCard === article.slug ? "H" : ""} d:
          {distancePercent}%
        </div>
      )}
    </motion.div>
  );
}
