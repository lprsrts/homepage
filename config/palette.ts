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
  toupe_light: {
    name: "Toupe Light",
    colors: {
      shade_1: "#E7E5E4",
      shade_2: "#171418",
      accent_1: "#7D8488",
      accent_2: "#727686",
      main: "#362A26",
    },
  },
  toupe_dark: {
    name: "Toupe Dark",
    colors: {
      shade_1: "#171418",
      shade_2: "#E7E5E4",
      accent_1: "#727686",
      accent_2: "#7D8488",
      main: "#362A26",
    },
  },
};
