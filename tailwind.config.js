/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      fontFamily: {
        sans: ['Univers', 'Arial', 'sans-serif'],
        heading: ['Bebas Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          selected: "hsl(var(--primary-selected))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Section-specific colors
        support: {
          DEFAULT: "hsl(var(--support))",
          foreground: "hsl(var(--support-foreground))",
          light: "hsl(var(--support-light))",
          hover: "hsl(var(--support-hover))",
        },
        control: {
          DEFAULT: "hsl(var(--control))",
          foreground: "hsl(var(--control-foreground))",
          light: "hsl(var(--control-light))",
          hover: "hsl(var(--control-hover))",
        },
        acquisition: {
          DEFAULT: "hsl(var(--acquisition))",
          foreground: "hsl(var(--acquisition-foreground))",
          light: "hsl(var(--acquisition-light))",
          hover: "hsl(var(--acquisition-hover))",
        },
        strategy: {
          DEFAULT: "hsl(var(--strategy))",
          foreground: "hsl(var(--strategy-foreground))",
          light: "hsl(var(--strategy-light))",
          hover: "hsl(var(--strategy-hover))",
        },
        digital: {
          DEFAULT: "hsl(var(--digital))",
          foreground: "hsl(var(--digital-foreground))",
          light: "hsl(var(--digital-light))",
          hover: "hsl(var(--digital-hover))",
        },
        alerts: {
          DEFAULT: "hsl(var(--alerts))",
          foreground: "hsl(var(--alerts-foreground))",
          light: "hsl(var(--alerts-light))",
          hover: "hsl(var(--alerts-hover))",
        },
      },
      borderRadius: {
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
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