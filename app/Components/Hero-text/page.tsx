import { useState } from "react"
import { ArrowLeft, Code } from "lucide-react"
import { motion } from "framer-motion"

// TextHoverEffect Component
const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
      <motion.path
        d="M 0 0 L 6 20 L 6 80 L 0 100 Z"
        filter="url(#glowFilter)"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        fill="none"
        mask="url(#textMask)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.path
        d="M 300 0 L 294 20 L 294 80 L 300 100 Z"
        filter="url(#glowFilter)"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        fill="none"
        mask="url(#textMask)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
};

const componentCode = `"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: \`\${cxPercentage}%\`,
        cy: \`\${cyPercentage}%\`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
      <motion.path
        d="M 0 0 L 6 20 L 6 80 L 0 100 Z"
        filter="url(#glowFilter)"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        fill="none"
        mask="url(#textMask)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.path
        d="M 300 0 L 294 20 L 294 80 L 300 100 Z"
        filter="url(#glowFilter)"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        fill="none"
        mask="url(#textMask)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
};`;

import { useRef, useEffect } from 'react';

export default function TextHoverEffectPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex-1 container max-w-7xl py-10">
        <div className="space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TextHoverEffect
              </h1>
              <p className="text-xl text-gray-300">
                An interactive SVG text component with gradient reveal effects, animated strokes, and mouse-following hover animations.
              </p>
            </div>
          </div>

          {/* Large Preview Section */}
          <div className="space-y-6 bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Interactive Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {/* Large Preview Container */}
            <div className="h-96 rounded-lg border border-gray-700 bg-black overflow-hidden flex items-center justify-center p-8">
              <div className="w-full max-w-2xl h-full">
                <TextHoverEffect text="HOVER ME" duration={0.3} />
              </div>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p><strong className="text-white">Interaction Guide:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Hover over the text to reveal the colorful gradient effect</li>
                <li>Move your mouse around to see the radial mask follow your cursor</li>
                <li>Notice the animated stroke drawing effect on component mount</li>
                <li>Side decorative beams animate on hover with infinite loop</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4 mt-4">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-green-400 whitespace-pre-wrap">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Props Configuration */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Props</h2>
            <div className="rounded-md border border-gray-700 overflow-hidden bg-gray-900">
              <table className="w-full text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-200">Property</th>
                    <th className="text-left p-3 font-medium text-gray-200">Type</th>
                    <th className="text-left p-3 font-medium text-gray-200">Default</th>
                    <th className="text-left p-3 font-medium text-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">text</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-gray-500">—</td>
                    <td className="p-3 text-gray-300">The text content to display and animate</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">duration</td>
                    <td className="p-3 font-mono text-xs text-purple-400">number</td>
                    <td className="p-3 font-mono text-xs text-green-400">0</td>
                    <td className="p-3 text-gray-300">Animation duration for mask position transitions</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">automatic</td>
                    <td className="p-3 font-mono text-xs text-purple-400">boolean</td>
                    <td className="p-3 font-mono text-xs text-gray-500">unused</td>
                    <td className="p-3 text-gray-300">Reserved prop for future automatic animation features</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Mouse-Following Gradient</h3>
                <p className="text-sm text-gray-400">
                  Radial gradient mask that follows your mouse cursor for interactive text reveal effects.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Animated Stroke Drawing</h3>
                <p className="text-sm text-gray-400">
                  SVG stroke-dasharray animation that draws the text outline on component mount.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Multi-Color Gradient</h3>
                <p className="text-sm text-gray-400">
                  Vibrant 5-color gradient with yellow, red, blue, cyan, and purple transitions.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Decorative Elements</h3>
                <p className="text-sm text-gray-400">
                  Animated side beams that pulse infinitely when text is hovered.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Usage Examples</h2>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-200">Basic Usage</h3>
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
                <pre className="text-sm text-green-400 whitespace-pre-wrap">
                  <code>{`import { TextHoverEffect } from "@/components/TextHoverEffect"

export default function Hero() {
  return (
    <div className="h-32 w-full">
      <TextHoverEffect text="Welcome" />
    </div>
  )
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-200">With Custom Duration</h3>
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
                <pre className="text-sm text-green-400 whitespace-pre-wrap">
                  <code>{`<TextHoverEffect 
  text="SMOOTH HOVER" 
  duration={0.5} 
/>`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-200">Hero Section Example</h3>
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
                <pre className="text-sm text-green-400 whitespace-pre-wrap">
                  <code>{`export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-4xl w-full h-48">
        <TextHoverEffect 
          text="FUTURE UI" 
          duration={0.2}
        />
      </div>
    </section>
  )
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Technical Implementation</h2>
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-900">
              <h3 className="font-semibold mb-2 text-gray-200">SVG Architecture</h3>
              <p className="text-sm text-gray-400 mb-3">
                The component uses SVG with advanced features including filters, gradients, masks, and Framer Motion integration:
              </p>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li><strong className="text-white">Gaussian Blur Filter:</strong> Creates glow effects on decorative elements</li>
                <li><strong className="text-white">Linear Gradient:</strong> 5-stop gradient for vibrant color transitions</li>
                <li><strong className="text-white">Radial Gradient Mask:</strong> Mouse-following reveal effect</li>
                <li><strong className="text-white">Stroke Dash Animation:</strong> Text drawing effect using SVG properties</li>
                <li><strong className="text-white">Motion Components:</strong> Framer Motion for smooth animations</li>
              </ul>
            </div>
          </div>

          {/* Browser Support */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Browser Support & Dependencies</h2>
            <div className="p-4 border border-amber-600 rounded-lg bg-amber-950/20">
              <h3 className="font-semibold mb-2 text-amber-300">Requirements</h3>
              <ul className="text-sm text-amber-200 space-y-1">
                <li>• <strong>Framer Motion:</strong> Required for animated gradients and path animations</li>
                <li>• <strong>React 16.8+:</strong> Uses React hooks (useState, useEffect, useRef)</li>
                <li>• <strong>SVG Support:</strong> Modern browsers with SVG mask and filter support</li>
                <li>• <strong>CSS Custom Properties:</strong> For Tailwind dark mode stroke colors</li>
              </ul>
            </div>
          </div>

          {/* Performance Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Performance Considerations</h2>
            <div className="p-4 border border-blue-600 rounded-lg bg-blue-950/20">
              <h3 className="font-semibold mb-2 text-blue-300">Optimization Tips</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Component re-renders on every mouse move when hovered</li>
                <li>• Consider throttling mouse move events for better performance</li>
                <li>• SVG filters and masks are GPU-accelerated in modern browsers</li>
                <li>• Use shorter text strings for better rendering performance</li>
                <li>• Each instance creates unique SVG filter IDs to avoid conflicts</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}