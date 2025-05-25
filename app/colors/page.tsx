"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Palette, Eye, Info, Zap } from "lucide-react"
import { useState } from "react"

interface ColorSwatch {
  name: string
  hsl: string
  hex: string
  rgb: string
  className: string
  usage?: string
  accessibility?: string
  contrast?: string
}

interface ColorShade {
  shade: string
  hex: string
  hsl: string
  className: string
}

interface ExtendedColorPalette {
  name: string
  description: string
  baseColor: string
  shades: ColorShade[]
  usage: string[]
  psychology: string
}

interface ColorTemplate {
  name: string
  description: string
  colors: ColorSwatch[]
  theme: string
  industry: string[]
}

interface GradientSet {
  name: string
  description: string
  gradient: string
  css: string
  usage: string[]
  variants: {
    name: string
    gradient: string
    css: string
  }[]
}

export default function ColorsPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(colorName)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const systemColors: ColorSwatch[] = [
    {
      name: "Background",
      hsl: "hsl(0 0% 3.9%)",
      hex: "#0a0a0a",
      rgb: "rgb(10, 10, 10)",
      className: "bg-zinc-950 border border-zinc-800",
      usage: "Main background, cards, containers",
      accessibility: "WCAG AAA compliant with light text",
      contrast: "21:1 with white text",
    },
    {
      name: "Foreground",
      hsl: "hsl(0 0% 98%)",
      hex: "#fafafa",
      rgb: "rgb(250, 250, 250)",
      className: "bg-zinc-50",
      usage: "Primary text, headings, icons",
      accessibility: "High contrast on dark backgrounds",
      contrast: "21:1 with dark backgrounds",
    },
    {
      name: "Primary",
      hsl: "hsl(0 0% 98%)",
      hex: "#fafafa",
      rgb: "rgb(250, 250, 250)",
      className: "bg-zinc-50",
      usage: "Primary buttons, links, CTAs",
      accessibility: "Excellent readability",
      contrast: "21:1 with dark backgrounds",
    },
    {
      name: "Primary Foreground",
      hsl: "hsl(0 0% 9%)",
      hex: "#171717",
      rgb: "rgb(23, 23, 23)",
      className: "bg-zinc-900",
      usage: "Text on primary elements",
      accessibility: "High contrast pairing",
      contrast: "21:1 with light backgrounds",
    },
    {
      name: "Secondary",
      hsl: "hsl(0 0% 14.9%)",
      hex: "#262626",
      rgb: "rgb(38, 38, 38)",
      className: "bg-zinc-800",
      usage: "Secondary buttons, subtle backgrounds",
      accessibility: "Good contrast with light text",
      contrast: "12.6:1 with white text",
    },
    {
      name: "Secondary Foreground",
      hsl: "hsl(0 0% 98%)",
      hex: "#fafafa",
      rgb: "rgb(250, 250, 250)",
      className: "bg-zinc-50",
      usage: "Text on secondary elements",
      accessibility: "Excellent readability",
      contrast: "21:1 with dark backgrounds",
    },
    {
      name: "Muted",
      hsl: "hsl(0 0% 14.9%)",
      hex: "#262626",
      rgb: "rgb(38, 38, 38)",
      className: "bg-zinc-800",
      usage: "Disabled states, subtle elements",
      accessibility: "Moderate contrast",
      contrast: "8.5:1 with white text",
    },
    {
      name: "Muted Foreground",
      hsl: "hsl(0 0% 63.9%)",
      hex: "#a3a3a3",
      rgb: "rgb(163, 163, 163)",
      className: "bg-zinc-400",
      usage: "Secondary text, placeholders",
      accessibility: "WCAG AA compliant",
      contrast: "4.5:1 with dark backgrounds",
    },
    {
      name: "Accent",
      hsl: "hsl(210 40% 98%)",
      hex: "#f8fafc",
      rgb: "rgb(248, 250, 252)",
      className: "bg-slate-50",
      usage: "Hover states, highlights",
      accessibility: "Subtle accent color",
      contrast: "20.8:1 with dark text",
    },
    {
      name: "Destructive",
      hsl: "hsl(0 62.8% 30.6%)",
      hex: "#7f1d1d",
      rgb: "rgb(127, 29, 29)",
      className: "bg-red-900",
      usage: "Error states, delete actions",
      accessibility: "Clear danger indication",
      contrast: "5.2:1 with white text",
    },
    {
      name: "Warning",
      hsl: "hsl(38 92% 50%)",
      hex: "#f59e0b",
      rgb: "rgb(245, 158, 11)",
      className: "bg-amber-500",
      usage: "Warning messages, caution states",
      accessibility: "Attention-grabbing",
      contrast: "3.1:1 with dark text",
    },
    {
      name: "Success",
      hsl: "hsl(142 76% 36%)",
      hex: "#16a34a",
      rgb: "rgb(22, 163, 74)",
      className: "bg-green-600",
      usage: "Success states, confirmations",
      accessibility: "Positive feedback",
      contrast: "4.8:1 with white text",
    },
    {
      name: "Info",
      hsl: "hsl(200 98% 39%)",
      hex: "#0284c7",
      rgb: "rgb(2, 132, 199)",
      className: "bg-sky-600",
      usage: "Information, neutral alerts",
      accessibility: "Clear information indicator",
      contrast: "5.9:1 with white text",
    },
    {
      name: "Border",
      hsl: "hsl(0 0% 14.9%)",
      hex: "#262626",
      rgb: "rgb(38, 38, 38)",
      className: "bg-zinc-800",
      usage: "Borders, dividers, outlines",
      accessibility: "Subtle separation",
      contrast: "Subtle visual separation",
    },
    {
      name: "Input",
      hsl: "hsl(0 0% 14.9%)",
      hex: "#262626",
      rgb: "rgb(38, 38, 38)",
      className: "bg-zinc-800",
      usage: "Form inputs, text areas",
      accessibility: "Clear input boundaries",
      contrast: "Good focus visibility",
    },
    {
      name: "Ring",
      hsl: "hsl(0 0% 83.1%)",
      hex: "#d4d4d4",
      rgb: "rgb(212, 212, 212)",
      className: "bg-zinc-300",
      usage: "Focus rings, selection indicators",
      accessibility: "Clear focus indication",
      contrast: "High visibility focus",
    },
  ]

  const extendedPalettes: ExtendedColorPalette[] = [
    {
      name: "Zinc",
      description: "Neutral grayscale palette perfect for modern interfaces",
      baseColor: "#71717a",
      psychology: "Conveys sophistication, neutrality, and professionalism. Creates a clean, modern aesthetic.",
      usage: ["Backgrounds", "Text", "Borders", "Subtle UI elements"],
      shades: [
        { shade: "50", hex: "#fafafa", hsl: "hsl(0 0% 98%)", className: "bg-zinc-50" },
        { shade: "100", hex: "#f4f4f5", hsl: "hsl(240 5% 96%)", className: "bg-zinc-100" },
        { shade: "200", hex: "#e4e4e7", hsl: "hsl(240 6% 90%)", className: "bg-zinc-200" },
        { shade: "300", hex: "#d4d4d8", hsl: "hsl(240 5% 84%)", className: "bg-zinc-300" },
        { shade: "400", hex: "#a1a1aa", hsl: "hsl(240 4% 66%)", className: "bg-zinc-400" },
        { shade: "500", hex: "#71717a", hsl: "hsl(240 4% 46%)", className: "bg-zinc-500" },
        { shade: "600", hex: "#52525b", hsl: "hsl(240 4% 36%)", className: "bg-zinc-600" },
        { shade: "700", hex: "#3f3f46", hsl: "hsl(240 5% 26%)", className: "bg-zinc-700" },
        { shade: "800", hex: "#27272a", hsl: "hsl(240 4% 16%)", className: "bg-zinc-800" },
        { shade: "900", hex: "#18181b", hsl: "hsl(240 6% 10%)", className: "bg-zinc-900" },
        { shade: "950", hex: "#09090b", hsl: "hsl(240 10% 4%)", className: "bg-zinc-950" },
      ],
    },
    {
      name: "Blue",
      description: "Trust and reliability palette for professional applications",
      baseColor: "#3b82f6",
      psychology: "Evokes trust, stability, and professionalism. Commonly used for corporate and tech brands.",
      usage: ["Primary actions", "Links", "Information states", "Professional themes"],
      shades: [
        { shade: "50", hex: "#eff6ff", hsl: "hsl(214 100% 97%)", className: "bg-blue-50" },
        { shade: "100", hex: "#dbeafe", hsl: "hsl(214 95% 93%)", className: "bg-blue-100" },
        { shade: "200", hex: "#bfdbfe", hsl: "hsl(214 86% 88%)", className: "bg-blue-200" },
        { shade: "300", hex: "#93c5fd", hsl: "hsl(213 82% 78%)", className: "bg-blue-300" },
        { shade: "400", hex: "#60a5fa", hsl: "hsl(213 93% 68%)", className: "bg-blue-400" },
        { shade: "500", hex: "#3b82f6", hsl: "hsl(217 91% 60%)", className: "bg-blue-500" },
        { shade: "600", hex: "#2563eb", hsl: "hsl(221 83% 53%)", className: "bg-blue-600" },
        { shade: "700", hex: "#1d4ed8", hsl: "hsl(224 76% 48%)", className: "bg-blue-700" },
        { shade: "800", hex: "#1e40af", hsl: "hsl(226 71% 40%)", className: "bg-blue-800" },
        { shade: "900", hex: "#1e3a8a", hsl: "hsl(228 69% 32%)", className: "bg-blue-900" },
        { shade: "950", hex: "#172554", hsl: "hsl(233 84% 22%)", className: "bg-blue-950" },
      ],
    },
    {
      name: "Emerald",
      description: "Growth and success palette for positive interactions",
      baseColor: "#10b981",
      psychology: "Represents growth, success, and nature. Creates feelings of harmony and freshness.",
      usage: ["Success states", "Positive actions", "Nature themes", "Health applications"],
      shades: [
        { shade: "50", hex: "#ecfdf5", hsl: "hsl(151 81% 96%)", className: "bg-emerald-50" },
        { shade: "100", hex: "#d1fae5", hsl: "hsl(149 80% 90%)", className: "bg-emerald-100" },
        { shade: "200", hex: "#a7f3d0", hsl: "hsl(152 76% 80%)", className: "bg-emerald-200" },
        { shade: "300", hex: "#6ee7b7", hsl: "hsl(156 72% 67%)", className: "bg-emerald-300" },
        { shade: "400", hex: "#34d399", hsl: "hsl(158 64% 52%)", className: "bg-emerald-400" },
        { shade: "500", hex: "#10b981", hsl: "hsl(160 84% 39%)", className: "bg-emerald-500" },
        { shade: "600", hex: "#059669", hsl: "hsl(161 94% 30%)", className: "bg-emerald-600" },
        { shade: "700", hex: "#047857", hsl: "hsl(163 94% 24%)", className: "bg-emerald-700" },
        { shade: "800", hex: "#065f46", hsl: "hsl(166 91% 19%)", className: "bg-emerald-800" },
        { shade: "900", hex: "#064e3b", hsl: "hsl(169 91% 15%)", className: "bg-emerald-900" },
        { shade: "950", hex: "#022c22", hsl: "hsl(170 97% 9%)", className: "bg-emerald-950" },
      ],
    },
    {
      name: "Rose",
      description: "Elegant and warm palette for creative and lifestyle brands",
      baseColor: "#f43f5e",
      psychology: "Conveys passion, creativity, and warmth. Perfect for lifestyle and creative applications.",
      usage: ["Accent colors", "Creative themes", "Lifestyle brands", "Emotional connections"],
      shades: [
        { shade: "50", hex: "#fff1f2", hsl: "hsl(356 100% 97%)", className: "bg-rose-50" },
        { shade: "100", hex: "#ffe4e6", hsl: "hsl(356 100% 94%)", className: "bg-rose-100" },
        { shade: "200", hex: "#fecdd3", hsl: "hsl(353 96% 90%)", className: "bg-rose-200" },
        { shade: "300", hex: "#fda4af", hsl: "hsl(353 95% 81%)", className: "bg-rose-300" },
        { shade: "400", hex: "#fb7185", hsl: "hsl(351 95% 71%)", className: "bg-rose-400" },
        { shade: "500", hex: "#f43f5e", hsl: "hsl(350 89% 60%)", className: "bg-rose-500" },
        { shade: "600", hex: "#e11d48", hsl: "hsl(347 77% 50%)", className: "bg-rose-600" },
        { shade: "700", hex: "#be123c", hsl: "hsl(345 83% 41%)", className: "bg-rose-700" },
        { shade: "800", hex: "#9f1239", hsl: "hsl(343 88% 34%)", className: "bg-rose-800" },
        { shade: "900", hex: "#881337", hsl: "hsl(341 90% 30%)", className: "bg-rose-900" },
        { shade: "950", hex: "#4c0519", hsl: "hsl(343 94% 16%)", className: "bg-rose-950" },
      ],
    },
    {
      name: "Violet",
      description: "Premium and creative palette for luxury and innovation",
      baseColor: "#8b5cf6",
      psychology: "Represents luxury, creativity, and innovation. Often used for premium and artistic brands.",
      usage: ["Premium features", "Creative tools", "Innovation themes", "Luxury brands"],
      shades: [
        { shade: "50", hex: "#f5f3ff", hsl: "hsl(250 100% 98%)", className: "bg-violet-50" },
        { shade: "100", hex: "#ede9fe", hsl: "hsl(251 91% 95%)", className: "bg-violet-100" },
        { shade: "200", hex: "#ddd6fe", hsl: "hsl(251 95% 92%)", className: "bg-violet-200" },
        { shade: "300", hex: "#c4b5fd", hsl: "hsl(252 95% 85%)", className: "bg-violet-300" },
        { shade: "400", hex: "#a78bfa", hsl: "hsl(255 92% 76%)", className: "bg-violet-400" },
        { shade: "500", hex: "#8b5cf6", hsl: "hsl(258 90% 66%)", className: "bg-violet-500" },
        { shade: "600", hex: "#7c3aed", hsl: "hsl(262 83% 58%)", className: "bg-violet-600" },
        { shade: "700", hex: "#6d28d9", hsl: "hsl(263 70% 50%)", className: "bg-violet-700" },
        { shade: "800", hex: "#5b21b6", hsl: "hsl(263 69% 42%)", className: "bg-violet-800" },
        { shade: "900", hex: "#4c1d95", hsl: "hsl(263 67% 35%)", className: "bg-violet-900" },
        { shade: "950", hex: "#2e1065", hsl: "hsl(264 78% 23%)", className: "bg-violet-950" },
      ],
    },
  ]

  const advancedGradients: GradientSet[] = [
    {
      name: "Cosmic Aurora",
      description: "Mystical gradient inspired by northern lights",
      gradient: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
      css: "background: linear-gradient(135deg, #581c87, #1e3a8a, #312e81);",
      usage: ["Hero sections", "Dark themes", "Tech products", "Gaming interfaces"],
      variants: [
        {
          name: "Light Aurora",
          gradient: "bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600",
          css: "background: linear-gradient(135deg, #c084fc, #3b82f6, #4f46e5);",
        },
        {
          name: "Neon Aurora",
          gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500",
          css: "background: linear-gradient(135deg, #a855f7, #ec4899, #3b82f6);",
        },
      ],
    },
    {
      name: "Sunset Blaze",
      description: "Warm, energetic gradient perfect for call-to-actions",
      gradient: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
      css: "background: linear-gradient(90deg, #f97316, #ef4444, #ec4899);",
      usage: ["Buttons", "CTAs", "Energy brands", "Food & beverage"],
      variants: [
        {
          name: "Golden Hour",
          gradient: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
          css: "background: linear-gradient(90deg, #facc15, #f97316, #ef4444);",
        },
        {
          name: "Fire Ember",
          gradient: "bg-gradient-to-r from-red-600 via-red-500 to-orange-500",
          css: "background: linear-gradient(90deg, #dc2626, #ef4444, #f97316);",
        },
      ],
    },
    {
      name: "Ocean Depths",
      description: "Cool, professional gradient for corporate applications",
      gradient: "bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900",
      css: "background: linear-gradient(180deg, #2563eb, #1d4ed8, #1e3a8a);",
      usage: ["Corporate sites", "Finance apps", "Professional tools", "Healthcare"],
      variants: [
        {
          name: "Tropical Waters",
          gradient: "bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600",
          css: "background: linear-gradient(180deg, #22d3ee, #3b82f6, #2563eb);",
        },
        {
          name: "Deep Sea",
          gradient: "bg-gradient-to-b from-blue-800 via-blue-900 to-slate-900",
          css: "background: linear-gradient(180deg, #1e40af, #1e3a8a, #0f172a);",
        },
      ],
    },
    {
      name: "Forest Canopy",
      description: "Natural, organic gradient for eco-friendly brands",
      gradient: "bg-gradient-to-tr from-green-800 via-green-600 to-emerald-500",
      css: "background: linear-gradient(45deg, #166534, #16a34a, #10b981);",
      usage: ["Eco brands", "Nature apps", "Health products", "Sustainability"],
      variants: [
        {
          name: "Spring Meadow",
          gradient: "bg-gradient-to-tr from-green-400 via-emerald-400 to-teal-400",
          css: "background: linear-gradient(45deg, #4ade80, #34d399, #2dd4bf);",
        },
        {
          name: "Dark Forest",
          gradient: "bg-gradient-to-tr from-green-900 via-emerald-900 to-teal-900",
          css: "background: linear-gradient(45deg, #14532d, #064e3b, #134e4a);",
        },
      ],
    },
    {
      name: "Royal Luxury",
      description: "Premium gradient for luxury and high-end products",
      gradient: "bg-gradient-to-r from-purple-800 via-violet-700 to-purple-600",
      css: "background: linear-gradient(90deg, #6b21a8, #6d28d9, #9333ea);",
      usage: ["Luxury brands", "Premium features", "VIP sections", "High-end products"],
      variants: [
        {
          name: "Gold Luxury",
          gradient: "bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500",
          css: "background: linear-gradient(90deg, #ca8a04, #eab308, #f59e0b);",
        },
        {
          name: "Rose Gold",
          gradient: "bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300",
          css: "background: linear-gradient(90deg, #f472b6, #fb7185, #fdba74);",
        },
      ],
    },
  ]

  const premiumTemplates: ColorTemplate[] = [
    {
      name: "Midnight Professional",
      description: "Sophisticated dark theme for professional applications",
      theme: "Dark",
      industry: ["Technology", "Finance", "Corporate", "SaaS"],
      colors: [
        {
          name: "Deep Black",
          hsl: "hsl(0 0% 3%)",
          hex: "#080808",
          rgb: "rgb(8, 8, 8)",
          className: "bg-gray-950",
          usage: "Primary background",
          accessibility: "Perfect for dark themes",
        },
        {
          name: "Charcoal",
          hsl: "hsl(0 0% 12%)",
          hex: "#1f1f1f",
          rgb: "rgb(31, 31, 31)",
          className: "bg-gray-900",
          usage: "Card backgrounds",
          accessibility: "Good contrast with light text",
        },
        {
          name: "Steel Gray",
          hsl: "hsl(0 0% 25%)",
          hex: "#404040",
          rgb: "rgb(64, 64, 64)",
          className: "bg-gray-600",
          usage: "Borders, dividers",
          accessibility: "Subtle separation",
        },
        {
          name: "Silver",
          hsl: "hsl(0 0% 70%)",
          hex: "#b3b3b3",
          rgb: "rgb(179, 179, 179)",
          className: "bg-gray-400",
          usage: "Secondary text",
          accessibility: "WCAG AA compliant",
        },
        {
          name: "Pure White",
          hsl: "hsl(0 0% 100%)",
          hex: "#ffffff",
          rgb: "rgb(255, 255, 255)",
          className: "bg-white",
          usage: "Primary text, icons",
          accessibility: "Maximum contrast",
        },
      ],
    },
    {
      name: "Ocean Breeze Pro",
      description: "Calming blue palette for productivity and focus",
      theme: "Cool",
      industry: ["Healthcare", "Education", "Productivity", "Wellness"],
      colors: [
        {
          name: "Deep Ocean",
          hsl: "hsl(210 100% 8%)",
          hex: "#0c1426",
          rgb: "rgb(12, 20, 38)",
          className: "bg-blue-950",
          usage: "Dark backgrounds",
          accessibility: "High contrast base",
        },
        {
          name: "Navy Blue",
          hsl: "hsl(210 100% 20%)",
          hex: "#1e3a8a",
          rgb: "rgb(30, 58, 138)",
          className: "bg-blue-800",
          usage: "Primary elements",
          accessibility: "Strong brand color",
        },
        {
          name: "Ocean Blue",
          hsl: "hsl(210 100% 45%)",
          hex: "#2563eb",
          rgb: "rgb(37, 99, 235)",
          className: "bg-blue-600",
          usage: "Interactive elements",
          accessibility: "Good contrast ratio",
        },
        {
          name: "Sky Blue",
          hsl: "hsl(210 100% 70%)",
          hex: "#60a5fa",
          rgb: "rgb(96, 165, 250)",
          className: "bg-blue-400",
          usage: "Hover states",
          accessibility: "Attention-grabbing",
        },
        {
          name: "Ice Blue",
          hsl: "hsl(210 100% 95%)",
          hex: "#eff6ff",
          rgb: "rgb(239, 246, 255)",
          className: "bg-blue-50",
          usage: "Light backgrounds",
          accessibility: "Subtle tinting",
        },
      ],
    },
    {
      name: "Emerald Growth",
      description: "Fresh green palette for growth and sustainability",
      theme: "Natural",
      industry: ["Environment", "Finance", "Health", "Agriculture"],
      colors: [
        {
          name: "Forest Deep",
          hsl: "hsl(150 100% 6%)",
          hex: "#022c22",
          rgb: "rgb(2, 44, 34)",
          className: "bg-emerald-950",
          usage: "Deep backgrounds",
          accessibility: "Rich, natural base",
        },
        {
          name: "Pine Green",
          hsl: "hsl(150 100% 15%)",
          hex: "#064e3b",
          rgb: "rgb(6, 78, 59)",
          className: "bg-emerald-900",
          usage: "Primary sections",
          accessibility: "Strong natural color",
        },
        {
          name: "Emerald",
          hsl: "hsl(150 84% 39%)",
          hex: "#10b981",
          rgb: "rgb(16, 185, 129)",
          className: "bg-emerald-500",
          usage: "Success states, CTAs",
          accessibility: "Vibrant accent",
        },
        {
          name: "Mint Green",
          hsl: "hsl(150 76% 67%)",
          hex: "#6ee7b7",
          rgb: "rgb(110, 231, 183)",
          className: "bg-emerald-300",
          usage: "Highlights, badges",
          accessibility: "Fresh accent",
        },
        {
          name: "Mint Cream",
          hsl: "hsl(150 81% 96%)",
          hex: "#ecfdf5",
          rgb: "rgb(236, 253, 245)",
          className: "bg-emerald-50",
          usage: "Light backgrounds",
          accessibility: "Subtle natural tint",
        },
      ],
    },
    {
      name: "Sunset Energy",
      description: "Vibrant warm palette for energy and creativity",
      theme: "Warm",
      industry: ["Creative", "Entertainment", "Food", "Lifestyle"],
      colors: [
        {
          name: "Deep Amber",
          hsl: "hsl(30 100% 8%)",
          hex: "#431407",
          rgb: "rgb(67, 20, 7)",
          className: "bg-orange-950",
          usage: "Rich backgrounds",
          accessibility: "Warm, deep base",
        },
        {
          name: "Burnt Orange",
          hsl: "hsl(30 100% 25%)",
          hex: "#c2410c",
          rgb: "rgb(194, 65, 12)",
          className: "bg-orange-700",
          usage: "Primary elements",
          accessibility: "Strong warm color",
        },
        {
          name: "Vibrant Orange",
          hsl: "hsl(30 95% 53%)",
          hex: "#f97316",
          rgb: "rgb(249, 115, 22)",
          className: "bg-orange-500",
          usage: "CTAs, highlights",
          accessibility: "High energy accent",
        },
        {
          name: "Peach",
          hsl: "hsl(30 100% 80%)",
          hex: "#fed7aa",
          rgb: "rgb(254, 215, 170)",
          className: "bg-orange-200",
          usage: "Soft accents",
          accessibility: "Gentle warmth",
        },
        {
          name: "Cream",
          hsl: "hsl(30 100% 97%)",
          hex: "#fffbeb",
          rgb: "rgb(255, 251, 235)",
          className: "bg-orange-50",
          usage: "Light backgrounds",
          accessibility: "Warm neutral",
        },
      ],
    },
    {
      name: "Royal Luxury",
      description: "Premium purple palette for luxury and innovation",
      theme: "Luxury",
      industry: ["Luxury", "Beauty", "Technology", "Premium Services"],
      colors: [
        {
          name: "Deep Purple",
          hsl: "hsl(270 100% 8%)",
          hex: "#2e1065",
          rgb: "rgb(46, 16, 101)",
          className: "bg-violet-950",
          usage: "Luxury backgrounds",
          accessibility: "Rich, premium base",
        },
        {
          name: "Royal Purple",
          hsl: "hsl(270 70% 35%)",
          hex: "#4c1d95",
          rgb: "rgb(76, 29, 149)",
          className: "bg-violet-900",
          usage: "Premium elements",
          accessibility: "Regal brand color",
        },
        {
          name: "Vibrant Violet",
          hsl: "hsl(270 90% 66%)",
          hex: "#8b5cf6",
          rgb: "rgb(139, 92, 246)",
          className: "bg-violet-500",
          usage: "Interactive elements",
          accessibility: "Striking accent",
        },
        {
          name: "Lavender",
          hsl: "hsl(270 95% 85%)",
          hex: "#ddd6fe",
          rgb: "rgb(221, 214, 254)",
          className: "bg-violet-200",
          usage: "Soft highlights",
          accessibility: "Elegant accent",
        },
        {
          name: "Violet Mist",
          hsl: "hsl(270 100% 98%)",
          hex: "#f5f3ff",
          rgb: "rgb(245, 243, 255)",
          className: "bg-violet-50",
          usage: "Light backgrounds",
          accessibility: "Luxury tinting",
        },
      ],
    },
  ]

  const ColorSwatchComponent = ({ color, showDetails = false }: { color: ColorSwatch; showDetails?: boolean }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-zinc-900/50 border-zinc-800">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-zinc-100">{color.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-100"
              onClick={() => copyToClipboard(color.hex, color.name)}
            >
              {copiedColor === color.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>

          <div className={`h-20 w-full rounded-md ${color.className} relative overflow-hidden border border-zinc-700`}>
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/20 flex items-center justify-center">
              <div className="text-center text-xs text-white font-medium space-y-1">
                <div>{color.hex}</div>
                <div className="text-xs opacity-75">{color.hsl}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2 text-zinc-400">
              <div>
                <span className="text-zinc-500">HEX:</span>
                <span className="font-mono ml-1 text-zinc-300">{color.hex}</span>
              </div>
              <div>
                <span className="text-zinc-500">RGB:</span>
                <span className="font-mono ml-1 text-zinc-300">{color.rgb}</span>
              </div>
            </div>
            <div className="text-zinc-500">
              <span>HSL:</span>
              <span className="font-mono ml-1 text-zinc-300">{color.hsl}</span>
            </div>

            {showDetails && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                {color.usage && (
                  <div>
                    <span className="text-zinc-500 text-xs">Usage:</span>
                    <p className="text-zinc-400 text-xs mt-1">{color.usage}</p>
                  </div>
                )}
                {color.accessibility && (
                  <div>
                    <span className="text-zinc-500 text-xs">Accessibility:</span>
                    <p className="text-zinc-400 text-xs mt-1">{color.accessibility}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex-1 container max-w-7xl py-10 px-4">
        <div className="space-y-10">
          <div className="space-y-6 text-center">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-clip-text text-transparent">
              Advanced Color System
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Professional-grade color palette system with detailed specifications, accessibility guidelines, and
              harmonious templates for modern design systems.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>200+ Colors</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>WCAG Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Ready to Use</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="system" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="system" className="data-[state=active]:bg-zinc-800">
                System Colors
              </TabsTrigger>
              <TabsTrigger value="extended" className="data-[state=active]:bg-zinc-800">
                Extended Palettes
              </TabsTrigger>
              <TabsTrigger value="gradients" className="data-[state=active]:bg-zinc-800">
                Advanced Gradients
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-zinc-800">
                Premium Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    System Color Palette
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Core colors used throughout the design system with detailed accessibility information and usage
                    guidelines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {systemColors.map((color) => (
                      <ColorSwatchComponent key={color.name} color={color} showDetails={true} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="extended" className="space-y-8">
              {extendedPalettes.map((palette) => (
                <Card key={palette.name} className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-zinc-100">{palette.name} Palette</CardTitle>
                    <CardDescription className="text-zinc-400">{palette.description}</CardDescription>
                    <div className="space-y-3">
                      <div className="text-sm text-zinc-400">
                        <strong className="text-zinc-300">Color Psychology:</strong> {palette.psychology}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {palette.usage.map((use) => (
                          <Badge key={use} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
                      {palette.shades.map((shade) => (
                        <div key={shade.shade} className="space-y-2 group">
                          <div
                            className={`h-16 w-full rounded-md ${shade.className} relative overflow-hidden border border-zinc-700`}
                          >
                            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/20 flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-white"
                                onClick={() => copyToClipboard(shade.hex, `${palette.name}-${shade.shade}`)}
                              >
                                {copiedColor === `${palette.name}-${shade.shade}` ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-xs text-zinc-300">{shade.shade}</div>
                            <div className="text-xs text-zinc-500 font-mono">{shade.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="gradients" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Advanced Gradient Collection</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Professional gradient sets with multiple variants for different design needs and brand
                    personalities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {advancedGradients.map((gradientSet) => (
                      <div key={gradientSet.name} className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-zinc-100">{gradientSet.name}</h3>
                          <p className="text-zinc-400">{gradientSet.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {gradientSet.usage.map((use) => (
                              <Badge key={use} variant="outline" className="border-zinc-700 text-zinc-400">
                                {use}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {/* Main gradient */}
                          <div className="space-y-3 group">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-zinc-200">Primary</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400"
                                onClick={() => copyToClipboard(gradientSet.css, gradientSet.name)}
                              >
                                {copiedColor === gradientSet.name ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                            <div
                              className={`h-24 w-full rounded-md ${gradientSet.gradient} relative overflow-hidden border border-zinc-700`}
                            >
                              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/10 flex items-center justify-center">
                                <div className="text-center text-xs text-white font-medium">Click to copy CSS</div>
                              </div>
                            </div>
                            <div className="text-xs text-zinc-500 font-mono">{gradientSet.css}</div>
                          </div>

                          {/* Variants */}
                          {gradientSet.variants.map((variant) => (
                            <div key={variant.name} className="space-y-3 group">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-zinc-200">{variant.name}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400"
                                  onClick={() => copyToClipboard(variant.css, `${gradientSet.name}-${variant.name}`)}
                                >
                                  {copiedColor === `${gradientSet.name}-${variant.name}` ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                              <div
                                className={`h-24 w-full rounded-md ${variant.gradient} relative overflow-hidden border border-zinc-700`}
                              >
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/10 flex items-center justify-center">
                                  <div className="text-center text-xs text-white font-medium">Click to copy CSS</div>
                                </div>
                              </div>
                              <div className="text-xs text-zinc-500 font-mono">{variant.css}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Premium Color Templates</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Professionally curated color combinations designed for specific industries and brand personalities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {premiumTemplates.map((template) => (
                      <div key={template.name} className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-zinc-100">{template.name}</h3>
                            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">{template.theme}</Badge>
                          </div>
                          <p className="text-zinc-400">{template.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {template.industry.map((industry) => (
                              <Badge key={industry} variant="outline" className="border-zinc-700 text-zinc-400">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                          {template.colors.map((color) => (
                            <ColorSwatchComponent key={color.name} color={color} showDetails={true} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
