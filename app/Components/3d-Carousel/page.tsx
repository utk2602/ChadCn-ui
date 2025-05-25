"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Carousel3D from "@/CHADCN-UI/3d-Carousel"
import { DraggableModal } from "@/CHADCN-UI/Modal"
import { Code, Copy, Check } from 'lucide-react';

const componentCode = `import { useEffect, useRef, useState } from 'react';

const Carousel3D = () => {
  const dragContainer = useRef<HTMLDivElement>(null);
  const spinContainer = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(240);
  
  const config = {
    autoRotate: true,
    rotateSpeed: -60,
    imgWidth: 120,
    imgHeight: 170
  };

  const images = [
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170'
  ];

  const videoSrc = "https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761";

  useEffect(() => {
    let tX = 0, tY = 10;
    let desX = 0, desY = 0;

    const init = (delayTime?: number) => {
      if (!spinContainer.current) return;
      
      const aEle = [...spinContainer.current.getElementsByTagName('img'), 
                    ...spinContainer.current.getElementsByTagName('video')];
      
      aEle.forEach((ele, i) => {
        ele.style.transform = \`rotateY(\${i * (360 / aEle.length)}deg) translateZ(\${radius}px)\`;
        ele.style.transition = "transform 1s";
        ele.style.transitionDelay = delayTime?.toString() + "s" || (aEle.length - i) / 4 + "s";
      });
    };

    const applyTransform = (obj: HTMLElement) => {
      if(tY > 180) tY = 180;
      if(tY < 0) tY = 0;
      obj.style.transform = \`rotateX(\${-tY}deg) rotateY(\${tX}deg)\`;
    };

    const playSpin = (yes: boolean) => {
      if (spinContainer.current) {
        spinContainer.current.style.animationPlayState = yes ? 'running' : 'paused';
      }
    };

    // Initialize
    setTimeout(() => init(), 1000);

    // Auto rotate
    if (config.autoRotate && spinContainer.current) {
      const animationName = config.rotateSpeed > 0 ? 'spin' : 'spinRevert';
      spinContainer.current.style.animation = \`\${animationName} \${Math.abs(config.rotateSpeed)}s infinite linear\`;
    }

    // Event handlers with proper TypeScript types
    const handlePointerDown = (e: PointerEvent) => {
      // ... event handling logic
    };

    const handleWheel = (e: WheelEvent) => {
      const d = (e as any).wheelDelta / 20 || -e.deltaY / 40;
      setRadius(prev => prev + d);
      init(1);
    };

    return () => {
      // cleanup logic
    };
  }, [radius]);

  return (
    <>
      <style>
        {\`
          @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
          
          @keyframes spinRevert {
            from { transform: rotateY(360deg); }
            to { transform: rotateY(0deg); }
          }
          
          .carousel-media:hover {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9) !important;
          }
          
          .carousel-media {
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.3));
            box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.3));
          }
        \`}
      </style>
      <div className="h-full w-full bg-black flex items-center justify-center" style={{perspective: '1000px'}}>
        {/* Carousel JSX */}
      </div>
    </>
  );
};

export default Carousel3D;`;


export default function Carousel3DPage() {
  const [showCode, setShowCode] = useState(false)
  const [isOpen,SetIsOpen] = useState(false)
  const [copied, setCopied] = useState(false);

const handleCopyCode = async () => {
  try {
    await navigator.clipboard.writeText(componentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};

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
                Carousel3D
              </h1>
              <p className="text-xl text-gray-300">
                An interactive 3D carousel component with drag controls, auto-rotation, and zoom functionality.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6 bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Preview</h2>
               <button
      onClick={() => SetIsOpen(true)}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border-2 border-black bg-white hover:bg-gray-100 text-black transition-colors"
    >
      <Code className="h-4 w-4" />
      View Code
    </button>

    <DraggableModal 
      isOpen={isOpen} 
      onClose={() => SetIsOpen(false)} 
      title="Carousel3D Component Code"
    >
      <div className="relative">
        {/* Copy button positioned at top right of code area */}
        <button
          onClick={handleCopyCode}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border-2 border-black bg-white hover:bg-gray-100 text-black transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Code
            </>
          )}
        </button>
        
        <div className="text-black">
          <pre className="whitespace-pre-wrap break-words font-mono text-sm bg-black text-white p-4 pr-24 rounded-none overflow-x-auto border-t-2 border-black">
            <code>{componentCode}</code>
          </pre>
        </div>
      </div>
    </DraggableModal>
      </div>
            <div className="h-50 rounded-lg border border-gray-700 bg-black overflow-hidden">
              <Carousel3D />
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p><strong className="text-white">Controls:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Drag to rotate the carousel</li>
                <li>Scroll/mousewheel to zoom in and out</li>
                <li>Hover over images for enhanced effects</li>
                <li>Auto-rotation pauses during interaction</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4 mt-4">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Configuration</h2>
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
                    <td className="p-3 font-mono text-xs text-blue-400">autoRotate</td>
                    <td className="p-3 font-mono text-xs text-purple-400">boolean</td>
                    <td className="p-3 font-mono text-xs text-white">true</td>
                    <td className="p-3 text-gray-300">Enable automatic rotation of the carousel</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">rotateSpeed</td>
                    <td className="p-3 font-mono text-xs text-purple-400">number</td>
                    <td className="p-3 font-mono text-xs text-white">-60</td>
                    <td className="p-3 text-gray-300">Rotation speed in seconds (negative for reverse)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">imgWidth</td>
                    <td className="p-3 font-mono text-xs text-purple-400">number</td>
                    <td className="p-3 font-mono text-xs text-white">120</td>
                    <td className="p-3 text-gray-300">Width of carousel images in pixels</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">imgHeight</td>
                    <td className="p-3 font-mono text-xs text-purple-400">number</td>
                    <td className="p-3 font-mono text-xs text-white">170</td>
                    <td className="p-3 text-gray-300">Height of carousel images in pixels</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">images</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string[]</td>
                    <td className="p-3 font-mono text-xs text-gray-500">—</td>
                    <td className="p-3 text-gray-300">Array of image URLs to display in the carousel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Interactive Controls</h3>
                <p className="text-sm text-gray-400">
                  Drag to rotate, scroll to zoom, with smooth momentum-based interactions.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Auto-Rotation</h3>
                <p className="text-sm text-gray-400">
                  Configurable automatic rotation that pauses during user interaction.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">3D Effects</h3>
                <p className="text-sm text-gray-400">
                  CSS 3D transforms with perspective, reflections, and hover animations.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Responsive Design</h3>
                <p className="text-sm text-gray-400">
                  Adapts to different screen sizes with touch and pointer event support.
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
                  <code>{`import Carousel3D from "@/CHADCN-UI/3d-Carousel"

export default function MyComponent() {
  return (
    <div className="h-screen w-full">
      <Carousel3D />
    </div>
  )
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-200">Custom Configuration</h3>
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
                <pre className="text-sm text-green-400 whitespace-pre-wrap">
                  <code>{`// Modify the config object in the component:
const config = {
  autoRotate: false,        // Disable auto-rotation
  rotateSpeed: 30,          // Slower, forward rotation
  imgWidth: 150,            // Larger images
  imgHeight: 200
};

// Update the images array:
const images = [
  'your-image-1.jpg',
  'your-image-2.jpg',
  // ... more images
];`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Implementation Notes</h2>
            <div className="p-4 border border-amber-600 rounded-lg bg-amber-950/20">
              <h3 className="font-semibold mb-2 text-amber-300">Performance Considerations</h3>
              <ul className="text-sm text-amber-200 space-y-1">
                <li>• The component uses requestAnimationFrame for smooth animations</li>
                <li>• Image reflections use CSS box-reflect which may not work in all browsers</li>
                <li>• Consider optimizing images for web to improve loading performance</li>
                <li>• The component is designed for modern browsers with 3D transform support</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}