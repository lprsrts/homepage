"use client";

import { useState, useEffect, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";

const ZINDEX_STORAGE_KEY = "cardZIndices";

interface Article {
  slug: string;
  title: string;
  date: string;
}

interface CardZIndexContextType {
  updateZIndex: (slug: string) => void;
  totalCards: number;
  hoveredCard: string | null;
  setHoveredCard: (slug: string | null) => void;
}

export const CardZIndexContext = createContext<CardZIndexContextType>({
  updateZIndex: () => {},
  totalCards: 0,
  hoveredCard: null,
  setHoveredCard: () => {},
});

interface DeckProps {
  articles: Article[];
  title?: string;
}

export default function Deck({ articles, title = "Articles" }: DeckProps) {
  const [mounted, setMounted] = useState(false);
  const [sortedArticles, setSortedArticles] = useState<Article[]>([]);
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [safeRadius, setSafeRadius] = useState(0);
  const [debugMode, setDebugMode] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Sort articles by date, newest first
    const sorted = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setSortedArticles(sorted);

    // Try to load z-indices from localStorage
    let initialZIndices: Record<string, number> = {};
    try {
      const savedIndices = localStorage.getItem(ZINDEX_STORAGE_KEY);
      if (savedIndices) {
        const parsed = JSON.parse(savedIndices);
        let valid = true;
        sorted.forEach((article) => {
          if (!(article.slug in parsed)) {
            valid = false;
          }
        });

        if (valid) {
          initialZIndices = parsed;
          console.log("Restored z-indices from storage");
        }
      }
    } catch (e) {
      console.warn("Error loading z-indices", e);
    }

    // Initialize z-indices if not loaded
    if (Object.keys(initialZIndices).length === 0) {
      sorted.forEach((article, index) => {
        initialZIndices[article.slug] = sorted.length - index;
      });
    }

    setZIndices(initialZIndices);

    // Set center point and safe radius
    const updateDimensions = () => {
      setCenterPoint({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      const newSafeRadius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
      setSafeRadius(newSafeRadius);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Delay showing cards
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 1800);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [articles]);

  // Save z-indices to localStorage
  useEffect(() => {
    if (Object.keys(zIndices).length > 0) {
      try {
        localStorage.setItem(ZINDEX_STORAGE_KEY, JSON.stringify(zIndices));
      } catch (e) {
        console.warn("Error saving z-indices", e);
      }
    }
  }, [zIndices]);

  const updateZIndex = (slug: string) => {
    setHoveredCard(null);

    setZIndices((prevZIndices) => {
      const newZIndices = { ...prevZIndices };
      const selectedCardZIndex = prevZIndices[slug];
      const maxZIndex = sortedArticles.length;

      if (selectedCardZIndex < maxZIndex) {
        Object.keys(newZIndices).forEach((cardSlug) => {
          if (cardSlug !== slug && newZIndices[cardSlug] > selectedCardZIndex) {
            newZIndices[cardSlug]--;
          }
        });

        newZIndices[slug] = maxZIndex;
      }

      if (debugMode) {
        console.log(
          `Card ${slug} z-index updated from ${selectedCardZIndex} to ${newZIndices[slug]}`
        );
      }

      return newZIndices;
    });
  };

  // Toggle debug mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "d") {
        setDebugMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!mounted) {
    return (
      <div className="deck">
        <div className="site-title">{title}</div>
      </div>
    );
  }

  return (
    <CardZIndexContext.Provider
      value={{
        updateZIndex,
        totalCards: sortedArticles.length,
        hoveredCard,
        setHoveredCard,
      }}
    >
      <div className="deck">
        <motion.div
          className="site-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {title}
        </motion.div>

        <AnimatePresence>
          {showCards && (
            <div
              className="cards-container"
              style={{
                position: "absolute",
                left: centerPoint.x,
                top: centerPoint.y,
              }}
            >
              {debugMode && (
                <div
                  className="debug-circle"
                  style={{
                    position: "absolute",
                    width: safeRadius * 2 + "px",
                    height: safeRadius * 2 + "px",
                    borderRadius: "50%",
                    border: "2px dashed rgba(255, 0, 0, 0.5)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
              )}

              {sortedArticles.map((article, i) => (
                <Card
                  key={article.slug}
                  article={article}
                  index={i}
                  zIndex={zIndices[article.slug] || 0}
                  safeRadius={safeRadius}
                  debugMode={debugMode}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {debugMode && (
          <div
            className="debug-info"
            style={{
              position: "fixed",
              bottom: "10px",
              left: "10px",
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "12px",
              zIndex: 9999,
            }}
          >
            <p>Debug Mode: ON (Press &apos;d&apos; to toggle)</p>
            <p>
              Center: {centerPoint.x.toFixed(0)}px, {centerPoint.y.toFixed(0)}px
            </p>
            <p>Safe Radius: {safeRadius.toFixed(0)}px</p>
            <p>Cards: {sortedArticles.length}</p>
            <p>Hovered: {hoveredCard || "None"}</p>
            <div>
              <p>Z-Indices:</p>
              <div
                style={{
                  maxHeight: "100px",
                  overflowY: "auto",
                  fontSize: "10px",
                }}
              >
                {Object.entries(zIndices).map(([slug, z]) => (
                  <div key={slug}>
                    {slug.substring(0, 10)}: {z}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </CardZIndexContext.Provider>
  );
}
