/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#244f26", // Dark green from design tokens
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8a8f63", // Olive green from colors
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#a51313", // Bright red from colors
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f3f3", // Off-white from colors
          foreground: "#757575", // Medium gray from design tokens
        },
        accent: {
          DEFAULT: "#344ab9", // Medium blue from colors
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        raider: {
          green: "#02542d", // Medium green from colors
          lightgreen: "#4b6e4d", // Forest green from colors
          olive: "#8a8f63", // Olive green from colors
          red: "#a51313", // Bright red from colors
          darkred: "#720f0f", // Dark red from colors
          blue: "#344ab9", // Medium blue from colors
          lightblue: "#505f94", // Slate blue from colors
          gray: "#d9d9d9", // Light gray from colors
          darkgray: "#2c2c2c", // Dark gray from colors
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

