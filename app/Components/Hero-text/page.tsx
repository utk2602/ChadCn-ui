"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Code } from "lucide-react"

// Particle physics system
class Particle {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8; // High velocity
    this.vy = (Math.random() - 0.5) * 8;
    this.radius = Math.random() * 2 + 1;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.005;
    this.id = Math.random();
  }

  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  decay: number;
  id: number;

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;

    // Boundary collisions with bounce
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.vx *= -0.8; // Energy loss on bounce
      this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.vy *= -0.8;
      this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
    }

    return this.life > 0;
  }

  checkCollision(other: Particle) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = this.radius + other.radius;

    if (distance < minDistance) {
      // Simple elastic collision
      const angle = Math.atan2(dy, dx);
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      // Rotate velocities
      const vx1 = this.vx * cos + this.vy * sin;
      const vy1 = this.vy * cos - this.vx * sin;
      const vx2 = other.vx * cos + other.vy * sin;
      const vy2 = other.vy * cos - other.vx * sin;

      // Swap velocities (elastic collision)
      this.vx = vx2 * cos - vy1 * sin;
      this.vy = vy1 * cos + vx2 * sin;
      other.vx = vx1 * cos - vy2 * sin;
      other.vy = vy2 * cos + vx1 * sin;

      // Separate particles
      const overlap = minDistance - distance;
      const separationX = (dx / distance) * overlap * 0.5;
      const separationY = (dy / distance) * overlap * 0.5;
      
      this.x += separationX;
      this.y += separationY;
      other.x -= separationX;
      other.y -= separationY;
    }
  }
}

const ModernTextEffect = ({
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
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const particleSpawnRef = useRef<NodeJS.Timeout>();

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

  // Particle system animation loop
  useEffect(() => {
    if (!hovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (particleSpawnRef.current) {
        clearInterval(particleSpawnRef.current);
      }
      setParticles([]);
      return;
    }

    // Spawn particles continuously
    particleSpawnRef.current = setInterval(() => {
      if (particles.length < 50) { // Limit particle count
        setParticles(prev => [
          ...prev,
          new Particle(Math.random() * 600, Math.random() * 200)
        ]);
      }
    }, 100);

    // Animation loop
    const animate = () => {
      setParticles(prevParticles => {
        const newParticles = prevParticles.filter(particle => 
          particle.update(600, 200)
        );

        // Check collisions between all particles
        for (let i = 0; i < newParticles.length; i++) {
          for (let j = i + 1; j < newParticles.length; j++) {
            newParticles[i].checkCollision(newParticles[j]);
          }
        }

        return newParticles;
      });

      if (hovered) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (particleSpawnRef.current) {
        clearInterval(particleSpawnRef.current);
      }
    };
  }, [hovered]);

  // Generate static particles for basic animation
  const staticParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 600,
    y: Math.random() * 200,
    delay: Math.random() * 2,
  }));

  return (
    <div className="relative w-full h-64 bg-black overflow-hidden m-0 p-0">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 600 200"
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

          {/* Particle glow filter */}
          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Reveal mask with cursor following */}
          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="70%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

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

        {/* High-speed colliding particles */}
        {particles.map((particle) => (
          <circle
            
            cx={particle.x}
            cy={particle.y}
            r={particle.radius}
            fill="white"
            opacity={particle.life * 0.8}
            filter="url(#particleGlow)"
          />
        ))}

        {/* Static animated particles (original) */}
        {staticParticles.map((particle) => (
          <circle
            key={particle.id}
            r="0.5"
            fill="white"
            style={{
              transform: hovered ? `translateY(-20px) scale(1.5)` : 'scale(0)',
              transition: `all 2s ease-out ${particle.delay}s`,
              opacity: hovered ? 0.4 : 0, // Reduced opacity to not compete with dynamic particles
            }}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={hovered ? `${particle.x} ${particle.y}; ${particle.x} ${particle.y - 20}` : `${particle.x} ${particle.y}`}
              dur="2s"
              begin={`${particle.delay}s`}
              repeatCount={hovered ? "indefinite" : "0"}
            />
            <animate
              attributeName="opacity"
              values={hovered ? "0;0.4;0" : "0"}
              dur="2s"
              begin={`${particle.delay}s`}
              repeatCount={hovered ? "indefinite" : "0"}
            />
          </circle>
        ))}

        {/* Main text - background (always visible, subtle) */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-none stroke-white font-mono text-8xl font-bold tracking-wider"
          strokeWidth="0.2"
          opacity="0.3"
        >
          {text}
        </text>

        {/* Animated stroke text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-none stroke-white font-mono text-8xl font-bold tracking-wider"
          strokeWidth="0.4"
          strokeDasharray={hovered ? "1000 0" : "0 1000"}
          opacity={hovered ? 0.7 : 0}
          style={{ transition: "all 1.2s ease-in-out" }}
          filter="url(#digitalNoise)"
        />

        {/* Revealed text with mask */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-mono text-8xl font-bold tracking-wider"
          mask="url(#textRevealMask)"
          filter="url(#modernGlow)"
        >
          {text}
        </text>
      </svg>
      
      {/* Additional overlay effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: hovered ? 0.1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse" />
      </div>
    </div>
  );
};

const componentCode = `"use client";
import React, { useRef, useEffect, useState } from "react";

// Particle physics system
class Particle {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8; // High velocity
    this.vy = (Math.random() - 0.5) * 8;
    this.radius = Math.random() * 2 + 1;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.005;
    this.id = Math.random();
  }

  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  decay: number;
  id: number;

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;

    // Boundary collisions with bounce
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.vx *= -0.8; // Energy loss on bounce
      this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.vy *= -0.8;
      this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
    }

    return this.life > 0;
  }

  checkCollision(other: Particle) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = this.radius + other.radius;

    if (distance < minDistance) {
      // Simple elastic collision
      const angle = Math.atan2(dy, dx);
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      const vx1 = this.vx * cos + this.vy * sin;
      const vy1 = this.vy * cos - this.vx * sin;
      const vx2 = other.vx * cos + other.vy * sin;
      const vy2 = other.vy * cos - other.vx * sin;

      this.vx = vx2 * cos - vy1 * sin;
      this.vy = vy1 * cos + vx2 * sin;
      other.vx = vx1 * cos - vy2 * sin;
      other.vy = vy2 * cos + vx1 * sin;

      const overlap = minDistance - distance;
      const separationX = (dx / distance) * overlap * 0.5;
      const separationY = (dy / distance) * overlap * 0.5;
      
      this.x += separationX;
      this.y += separationY;
      other.x -= separationX;
      other.y -= separationY;
    }
  }
}

export const ModernTextEffect = ({
  text,
  duration = 0.3,
}: {
  text: string;
  duration?: number;
}) => {
  // Component implementation with particle system
  // ... (full implementation as shown above)
};

export default ModernTextEffect;`;

export default function ModernTextEffectPage() {
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
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ModernTextEffect - Colliding Particles
              </h1>
              <p className="text-xl text-gray-300">
                Enhanced futuristic text hover effect with high-speed colliding particles, physics simulation, and dynamic particle interactions.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className=" bg-black rounded-xl p-6 md:p-8 border border-black">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="h-100 rounded-lg border border-gray-700 bg-black overflow-hidden">
              <ModernTextEffect text="HOVER ME" duration={0.2} />
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p><strong className="text-white">Interactions:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Hover to spawn high-speed particles that collide with each other</li>
                <li>Particles bounce off boundaries and lose energy over time</li>
                <li>Real-time physics simulation with elastic collisions</li>
                <li>Mouse movement controls the reveal mask position</li>
                <li>Dynamic particle system limited to 50 particles for performance</li>
                <li>Particles have individual life cycles and fade out naturally</li>
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

          {/* New Physics Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Physics Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">High-Speed Particles</h3>
                <p className="text-sm text-gray-400">
                  Particles spawn with random velocities up to 8 units per frame, creating fast-moving interactions.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Elastic Collisions</h3>
                <p className="text-sm text-gray-400">
                  Full physics simulation with elastic collisions between particles, including velocity exchange and separation.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Boundary Bouncing</h3>
                <p className="text-sm text-gray-400">
                  Particles bounce off screen boundaries with energy loss (0.8 coefficient) for realistic physics.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Life Cycle System</h3>
                <p className="text-sm text-gray-400">
                  Each particle has a life value that decreases over time, causing natural fade-out and removal.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Performance Optimization</h3>
                <p className="text-sm text-gray-400">
                  Particle count limited to 50 with efficient collision detection and automatic cleanup.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Continuous Spawning</h3>
                <p className="text-sm text-gray-400">
                  New particles spawn every 100ms while hovered, maintaining dynamic activity.
                </p>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Physics Configuration</h2>
            <div className="rounded-md border border-gray-700 overflow-hidden bg-gray-900">
              <table className="w-full text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-200">Parameter</th>
                    <th className="text-left p-3 font-medium text-gray-200">Value</th>
                    <th className="text-left p-3 font-medium text-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">Max Velocity</td>
                    <td className="p-3 font-mono text-xs text-green-400">±4 units/frame</td>
                    <td className="p-3 text-gray-300">Maximum initial velocity in each direction</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">Bounce Damping</td>
                    <td className="p-3 font-mono text-xs text-green-400">0.8</td>
                    <td className="p-3 text-gray-300">Energy retention after boundary collision</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">Spawn Rate</td>
                    <td className="p-3 font-mono text-xs text-green-400">100ms</td>
                    <td className="p-3 text-gray-300">Interval between new particle spawns</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">Max Particles</td>
                    <td className="p-3 font-mono text-xs text-green-400">50</td>
                    <td className="p-3 text-gray-300">Maximum number of active particles</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">Life Decay</td>
                    <td className="p-3 font-mono text-xs text-green-400">0.005-0.025</td>
                    <td className="p-3 text-gray-300">Random decay rate per frame</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Implementation Notes</h2>
            <div className="p-4 border border-amber-600 rounded-lg bg-amber-950/20">
              <h3 className="font-semibold mb-2 text-amber-300">Physics System</h3>
              <ul className="text-sm text-amber-200 space-y-1">
                <li>• Custom Particle class with position, velocity, and life properties</li>
                <li>• O(n²) collision detection - optimized for particle count limit</li>
                <li>• Elastic collision formula with velocity exchange</li>
                <li>• Particle separation to prevent overlap after collision</li>
                <li>• RequestAnimationFrame for smooth 60fps animation</li>
              </ul>
            </div>
            <div className="p-4 border border-blue-600 rounded-lg bg-blue-950/20">
              <h3 className="font-semibold mb-2 text-blue-300">Performance Considerations</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Animation loop only runs when hovered</li>
                <li>• Automatic cleanup of expired particles</li>
                <li>• Efficient state updates using React's functional updates</li>
                <li>• SVG rendering optimized with particle glow filter</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}