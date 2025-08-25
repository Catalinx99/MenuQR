// themes.ts
import { DefaultTheme } from "styled-components";

export const restaurantTheme: DefaultTheme = {
  name: "Restaurant",
  colors: {
    primary: "#6366f1", // Violet pentru butoane/accent
    secondary: "#4ECDC4", // Turcoaz
    background: "#f8fafc", // Fundal gri deschis
    text: "#1e293b", // Text întunecat
    cardBackground: "#FFFFFF", // Fundal carduri
    cardShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    accent: "#FF6B6B", // Roșu accent
    lightText: "#64748b", // Text secundar
  },
  fonts: {
    main: "'Open Sans', sans-serif",
    title: "'Bebas Neue', sans-serif", // Fontul specific din header
  },
  borderRadius: {
    small: "8px",
    medium: "12px",
    large: "16px",
    full: "50px",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
    large: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
};

export const darkRestaurantTheme: DefaultTheme = {
  ...restaurantTheme,
  name: "Dark Restaurant",
  colors: {
    primary: "#818cf8",
    background: "#1e293b",
    text: "#f8fafc",
    cardBackground: "#334155",
    cardShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    lightText: "#94a3b8",
  },
};

export const elegantRestaurantTheme: DefaultTheme = {
  name: "Elegant Restaurant",
  colors: {
    primary: "#6D6875", // Gri violet
    secondary: "#B5838D", // Roz pal
    background: "#FFE5D9", // Bej deschis
    text: "#3A3A3A", // Gri închis
    cardBackground: "#FFFFFF",
    cardShadow: "0 2px 10px rgba(109, 104, 117, 0.2)",
    accent: "#E5989B", // Roz deschis
    lightText: "#6D6875",
  },
  fonts: {
    main: "'Playfair Display', serif",
    title: "'Cinzel', serif",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "24px",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
    large: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
};
