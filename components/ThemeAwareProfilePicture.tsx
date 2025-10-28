"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface ThemeAwareProfilePictureProps {
  lightImage: string;  // Path to image for light themes
  darkImage: string;   // Path to image for dark themes
  alt?: string;
  className?: string;
  size?: number;
}

export default function ThemeAwareProfilePicture({
  lightImage,
  darkImage,
  alt = "Profile Picture",
  className = "",
  size = 128,
}: ThemeAwareProfilePictureProps) {
  const { currentPalette } = useTheme();

  // Determine if theme is light or dark based on shade_1 luminance
  const isLightTheme = () => {
    if (!currentPalette) return true;
    
    const shade1 = currentPalette.colors.shade_1;
    // Convert hex to RGB
    const hex = shade1.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // If luminance > 0.5, it's a light theme
    return luminance > 0.5;
  };

  const imageSrc = isLightTheme() ? lightImage : darkImage;

  return (
    <div className={`w-32 h-32 mx-auto overflow-hidden ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
