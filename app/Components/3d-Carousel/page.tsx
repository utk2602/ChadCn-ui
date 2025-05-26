"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Carousel3D from "@/CHADCN-UI/3d-Carousel"

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

function CodeBlock({ children, language = "bash" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group">
      <div className="rounded-lg bg-[#1e1e1e] border border-[#323233] shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#323233]">
          <span className="text-xs text-[#cccccc] font-medium">{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 text-xs text-[#cccccc] hover:text-white hover:bg-[#404040] rounded transition-colors"
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 text-sm font-mono overflow-x-auto">
          <code dangerouslySetInnerHTML={{ __html: children }} />
        </pre>
      </div>
    </div>
  )
}

export default function Carousel3DPage() {
  const [showCode, setShowCode] = useState(false)
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
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />
      
      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center text-sm text-white/40 hover:text-white/60 mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                Carousel3D
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
                An interactive 3D carousel component with drag controls, auto-rotation, and zoom functionality.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-white/90 hover:from-indigo-500/30 hover:to-cyan-500/30 hover:border-indigo-500/50 transition-all duration-200"
              >
                <Code className="h-4 w-4" />
                {showCode ? 'Hide Code' : 'View Code'}
              </button>
            </div>
            
            <div className="h-50 rounded-lg border border-white/10 bg-black overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
              <Carousel3D />
            </div>

            <div className="text-sm text-white/50 space-y-2">
              <p><strong className="text-white/80">Controls:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-white/40 ml-4">
                <li>Drag to rotate the carousel</li>
                <li>Scroll/mousewheel to zoom in and out</li>
                <li>Hover over images for enhanced effects</li>
                <li>Auto-rotation pauses during interaction</li>
              </ul>
            </div>

            {showCode && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white/90">Component Code</h3>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-white/90 hover:from-emerald-500/30 hover:to-green-500/30 hover:border-emerald-500/50 transition-all duration-200"
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
                </div>
                <CodeBlock language="javascript">
                  {componentCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </CodeBlock>
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Configuration</h2>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-black/20">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/80">Property</th>
                    <th className="text-left p-4 font-medium text-white/80">Type</th>
                    <th className="text-left p-4 font-medium text-white/80">Default</th>
                    <th className="text-left p-4 font-medium text-white/80">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">autoRotate</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">boolean</td>
                    <td className="p-4 font-mono text-xs text-white/90">true</td>
                    <td className="p-4 text-white/60">Enable automatic rotation of the carousel</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">rotateSpeed</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">number</td>
                    <td className="p-4 font-mono text-xs text-white/90">-60</td>
                    <td className="p-4 text-white/60">Rotation speed in seconds (negative for reverse)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">imgWidth</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">number</td>
                    <td className="p-4 font-mono text-xs text-white/90">120</td>
                    <td className="p-4 text-white/60">Width of carousel images in pixels</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">imgHeight</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">number</td>
                    <td className="p-4 font-mono text-xs text-white/90">170</td>
                    <td className="p-4 text-white/60">Height of carousel images in pixels</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">images</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string[]</td>
                    <td className="p-4 font-mono text-xs text-white/40">—</td>
                    <td className="p-4 text-white/60">Array of image URLs to display in the carousel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm hover:border-white/20 transition-all duration-200">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Interactive Controls</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Drag to rotate, scroll to zoom, with smooth momentum-based interactions.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm hover:border-white/20 transition-all duration-200">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Auto-Rotation</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Configurable automatic rotation that pauses during user interaction.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm hover:border-white/20 transition-all duration-200">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">3D Effects</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  CSS 3D transforms with perspective, reflections, and hover animations.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm hover:border-white/20 transition-all duration-200">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Responsive Design</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Adapts to different screen sizes with touch and pointer event support.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Usage Examples</h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-white/90">Basic Usage</h3>
                <CodeBlock language="javascript">
                  {`<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">Carousel3D</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/CHADCN-UI/3d-Carousel"</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">MyComponent</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"h-screen w-full"</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Carousel3D</span> <span class="text-[#d4d4d4]">/&gt;</span>
    <span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`}
                </CodeBlock>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-white/90">Custom Configuration</h3>
                <CodeBlock language="javascript">
                  {`<span class="text-[#608b4e]">// Modify the config object in the component:</span>
<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">config</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#9cdcfe]">autoRotate</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">false</span><span class="text-[#d4d4d4]">,</span>        <span class="text-[#608b4e]">// Disable auto-rotation</span>
  <span class="text-[#9cdcfe]">rotateSpeed</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#b5cea8]">30</span><span class="text-[#d4d4d4]">,</span>          <span class="text-[#608b4e]">// Slower, forward rotation</span>
  <span class="text-[#9cdcfe]">imgWidth</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#b5cea8]">150</span><span class="text-[#d4d4d4]">,</span>            <span class="text-[#608b4e]">// Larger images</span>
  <span class="text-[#9cdcfe]">imgHeight</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#b5cea8]">200</span>
<span class="text-[#d4d4d4]">};</span>

<span class="text-[#608b4e]">// Update the images array:</span>
<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">images</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">[</span>
  <span class="text-[#ce9178]">'your-image-1.jpg'</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#ce9178]">'your-image-2.jpg'</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#608b4e]">// ... more images</span>
<span class="text-[#d4d4d4]">];</span>`}
                </CodeBlock>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-8 bg-gradient-to-br from-amber-500/[0.03] to-orange-500/[0.02] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-500/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Implementation Notes</h2>
            <div className="p-6 border border-amber-500/20 rounded-xl bg-gradient-to-br from-amber-500/[0.05] to-orange-500/[0.03]">
              <h3 className="font-semibold mb-4 text-amber-200 text-lg">Performance Considerations</h3>
              <ul className="text-sm text-amber-100/80 space-y-2 leading-relaxed">
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