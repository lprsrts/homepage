/**
 * Color Palette
 * Define reusable color schemes that can be assigned to themes
 */

export interface Palette {
  name: string;
  colors: {
    shade_1: string;
    shade_2: string;
    accent_1: string;
    accent_2: string;
    main: string;
  };
}

export const palettes: Record<string, Palette> = {
  monochrome_light: {
    name: "Monochrome Light",
    colors: {
      shade_1: "#ffffff",
      shade_2: "#f5f5f5",
      accent_1: "#e5e5e5",
      accent_2: "#737373",
      main: "#000000",
    },
  },
  monochrome_dark: {
    name: "Monochrome Dark",
    colors: {
      shade_1: "#0a0a0a",
      shade_2: "#171717",
      accent_1: "#404040",
      accent_2: "#a3a3a3",
      main: "#ffffff",
    },
  },
  sepia: {
    name: "Sepia",
    colors: {
      shade_1: "#f4f1ea",
      shade_2: "#ede8dc",
      accent_1: "#d4c8b3",
      accent_2: "#8b6f47",
      main: "#5c4a3a",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      shade_1: "#f0f4f0",
      shade_2: "#e8f0e8",
      accent_1: "#c5d9c5",
      accent_2: "#2d5a2d",
      main: "#1a3a1a",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      shade_1: "#f0f4f8",
      shade_2: "#e6f0f7",
      accent_1: "#b8d4e8",
      accent_2: "#1e3a5f",
      main: "#0f2a3a",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      shade_1: "#fff5f0",
      shade_2: "#ffede1",
      accent_1: "#ffd4b8",
      accent_2: "#8b4513",
      main: "#3a1f1f",
    },
  },
  midnight: {
    name: "Midnight",
    colors: {
      shade_1: "#0f0f23",
      shade_2: "#16162e",
      accent_1: "#2d2d5a",
      accent_2: "#6666cc",
      main: "#e0e0ff",
    },
  },
  minimal_gray: {
    name: "Minimal Gray",
    colors: {
      shade_1: "#fafafa",
      shade_2: "#f5f5f5",
      accent_1: "#d9d9d9",
      accent_2: "#404040",
      main: "#1a1a1a",
    },
  },
};
