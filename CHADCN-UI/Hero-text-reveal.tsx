"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ModernTextEffect = ({
  text,
  duration = 0.3,
}: {
  text: string;
  duration?: number;
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

  // Generate particle positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 300,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="relative w-full h-32 bg-black overflow-hidden m-0 p-0">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none cursor-pointer"
      >
        <defs>
          {/* Glow filter for modern effects */}
          <filter id="modernGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Sharp digital noise filter */}
          <filter id="digitalNoise">
            <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5"/>
          </filter>

          {/* Reveal mask with cursor following */}
          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            animate={maskPosition}
            transition={{ duration, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="70%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          {/* Linear scanline gradient */}
          <linearGradient id="scanlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Geometric pattern */}
          <pattern id="gridPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.2" opacity="0.3"/>
          </pattern>

          <mask id="textRevealMask">
            <rect width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* Background grid pattern */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#gridPattern)" 
          opacity={hovered ? 0.6 : 0.2}
          style={{ transition: "opacity 0.3s ease" }}
        />

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r="0.5"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: hovered ? [0, 1, 0] : 0,
              scale: hovered ? [0, 1.5, 0] : 0,
              y: hovered ? particle.y - 20 : particle.y,
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              repeat: hovered ? Infinity : 0,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Scanning line effect */}
        <motion.rect
          x="0"
          y="48"
          width="300"
          height="4"
          fill="url(#scanlineGradient)"
          initial={{ x: -300 }}
          animate={{
            x: hovered ? 300 : -300,
          }}
          transition={{
            duration: 1.5,
            repeat: hovered ? Infinity : 0,
            ease: "linear"
          }}
          filter="url(#modernGlow)"
        />

        {/* Main text - background (always visible, subtle) */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-none stroke-white font-mono text-6xl font-bold tracking-wider"
          strokeWidth="0.2"
          opacity="0.3"
        >
          {text}
        </text>

        {/* Animated stroke text */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-none stroke-white font-mono text-6xl font-bold tracking-wider"
          strokeWidth="0.4"
          initial={{ 
            strokeDasharray: "0 1000",
            opacity: 0
          }}
          animate={{
            strokeDasharray: hovered ? "1000 0" : "0 1000",
            opacity: hovered ? 0.7 : 0
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut"
          }}
          filter="url(#digitalNoise)"
        />

        {/* Revealed text with mask */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-mono text-6xl font-bold tracking-wider"
          mask="url(#textRevealMask)"
          filter="url(#modernGlow)"
        >
          {text}
        </text>

        {/* Corner brackets - top left */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hovered ? 1 : 0, 
            scale: hovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <path 
            d="M 20 20 L 20 35 M 20 20 L 35 20" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            filter="url(#modernGlow)"
          />
        </motion.g>

        {/* Corner brackets - top right */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hovered ? 1 : 0, 
            scale: hovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <path 
            d="M 280 20 L 280 35 M 280 20 L 265 20" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            filter="url(#modernGlow)"
          />
        </motion.g>

        {/* Corner brackets - bottom left */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hovered ? 1 : 0, 
            scale: hovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          <path 
            d="M 20 80 L 20 65 M 20 80 L 35 80" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            filter="url(#modernGlow)"
          />
        </motion.g>

        {/* Corner brackets - bottom right */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hovered ? 1 : 0, 
            scale: hovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
        >
          <path 
            d="M 280 80 L 280 65 M 280 80 L 265 80" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            filter="url(#modernGlow)"
          />
        </motion.g>

        {/* Vertical scanning bars */}
        {[60, 120, 180, 240].map((x, i) => (
          <motion.rect
            key={`vbar-${i}`}
            x={x}
            y="0"
            width="2"
            height="100"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hovered ? [0, 0.5, 0] : 0,
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: hovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Additional overlay effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse" />
      </motion.div>
    </div>
  );
};

// Demo component
export default function Demo() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <ModernTextEffect text="HOVER ME" duration={0.2} />
        <div className="mt-8 text-center">
          <p className="text-white/60 font-mono text-sm">
            A modern black & white text hover effect with particles, scanlines, and geometric elements
          </p>
        </div>
      </div>
    </div>
  );
}