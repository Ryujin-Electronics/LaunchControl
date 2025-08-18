import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the relative luminance of a color
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Relative luminance value
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map(c => {
    if (c <= 0.03928) {
      return c / 12.92
    }
    return Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Converts HSL to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns RGB values as array [r, g, b]
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ]
}

/**
 * Determines if text should be black or white based on background color
 * @param backgroundColor HSL color string (e.g., "hsl(270, 70%, 70%)")
 * @returns "black" or "white"
 */
export function getContrastTextColor(backgroundColor: string): "black" | "white" {
  // Extract HSL values from the string
  const match = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!match) {
    return "black" // fallback
  }

  const h = parseInt(match[1])
  const s = parseInt(match[2])
  const l = parseInt(match[3])

  // Convert HSL to RGB
  const [r, g, b] = hslToRgb(h, s, l)

  // Calculate luminance
  const luminance = getLuminance(r, g, b)

  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? "black" : "white"
}

/**
 * Gets the appropriate text color class for a given background color
 * @param colorName The color name (e.g., "primary", "support", "control")
 * @returns Tailwind class for text color
 */
export function getTextColorClass(colorName: string): string {
  const colorMap: Record<string, string> = {
    primary: "text-primary-foreground",
    support: "text-support-foreground",
    control: "text-control-foreground",
    acquisition: "text-acquisition-foreground",
    strategy: "text-strategy-foreground",
    digital: "text-digital-foreground",
    alerts: "text-alerts-foreground",
    destructive: "text-destructive-foreground"
  }
  
  return colorMap[colorName] || "text-foreground"
} 