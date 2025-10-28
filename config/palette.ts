/**
 * Color Palette
 * Define reusable color schemes that can be assigned to themes
 */

export interface Palette {
  name: string;
  colors: {
    shade_1: string;  // Lightest
    shade_2: string;
    accent_1: string;
    accent_2: string;
    main: string;
    accent_3: string;
    accent_4: string;
    shade_3: string;
    shade_4: string;  // Darkest
  };
}

export const palettes: Record<string, Palette> = {
  monochrome_light: {
    name: "Monochrome Light",
    colors: {
      shade_1: "#ffffff",
      shade_2: "#f5f5f5",
      accent_1: "#e5e5e5",
      accent_2: "#d4d4d4",
      main: "#000000",
      accent_3: "#737373",
      accent_4: "#525252",
      shade_3: "#262626",
      shade_4: "#0a0a0a",
    },
  },
  monochrome_dark: {
    name: "Monochrome Dark",
    colors: {
      shade_1: "#0a0a0a",
      shade_2: "#171717",
      accent_1: "#262626",
      accent_2: "#404040",
      main: "#ffffff",
      accent_3: "#a3a3a3",
      accent_4: "#d4d4d4",
      shade_3: "#e5e5e5",
      shade_4: "#fafafa",
    },
  },
  sepia: {
    name: "Sepia",
    colors: {
      shade_1: "#f4f1ea",
      shade_2: "#ede8dc",
      accent_1: "#e8e3d6",
      accent_2: "#d4c8b3",
      main: "#5c4a3a",
      accent_3: "#8b6f47",
      accent_4: "#a58662",
      shade_3: "#9b8b7e",
      shade_4: "#4a3828",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      shade_1: "#f0f4f0",
      shade_2: "#e8f0e8",
      accent_1: "#e1ebe1",
      accent_2: "#c5d9c5",
      main: "#1a3a1a",
      accent_3: "#2d5a2d",
      accent_4: "#3d7a3d",
      shade_3: "#6b8e6b",
      shade_4: "#0f2a0f",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      shade_1: "#f0f4f8",
      shade_2: "#e6f0f7",
      accent_1: "#d9e8f4",
      accent_2: "#b8d4e8",
      main: "#0f2a3a",
      accent_3: "#1e3a5f",
      accent_4: "#2c5f8d",
      shade_3: "#5a8bb0",
      shade_4: "#0a1f2e",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      shade_1: "#fff5f0",
      shade_2: "#ffede1",
      accent_1: "#ffe8db",
      accent_2: "#ffd4b8",
      main: "#3a1f1f",
      accent_3: "#8b4513",
      accent_4: "#d2691e",
      shade_3: "#cd853f",
      shade_4: "#2a1515",
    },
  },
  midnight: {
    name: "Midnight",
    colors: {
      shade_1: "#0f0f23",
      shade_2: "#16162e",
      accent_1: "#1a1a3d",
      accent_2: "#2d2d5a",
      main: "#e0e0ff",
      accent_3: "#6666cc",
      accent_4: "#8888ff",
      shade_3: "#9999cc",
      shade_4: "#0a0a1a",
    },
  },
  minimal_gray: {
    name: "Minimal Gray",
    colors: {
      shade_1: "#fafafa",
      shade_2: "#f5f5f5",
      accent_1: "#f0f0f0",
      accent_2: "#d9d9d9",
      main: "#1a1a1a",
      accent_3: "#404040",
      accent_4: "#525252",
      shade_3: "#737373",
      shade_4: "#0f0f0f",
    },
  },
};
