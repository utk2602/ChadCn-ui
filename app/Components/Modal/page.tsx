"use client"

import { useState } from "react"
import { ArrowLeft, Code, Move, X, Copy, Check } from "lucide-react"
import type React from "react"
import { useRef, useEffect } from "react"

// CodeBlock component
function CodeBlock({ children, language = "javascript" }: { children: string; language?: string }) {
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
          <code className="text-[#d4d4d4]">{children}</code>
        </pre>
      </div>
    </div>
  )
}

// DraggableModal component
interface DraggableModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  draggable?: boolean
}

function DraggableModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  draggable = true 
}: DraggableModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modal = modalRef.current
      const rect = modal.getBoundingClientRect()
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      })
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable || !modalRef.current) return

    setIsDragging(true)
    const rect = modalRef.current.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modalRef.current || !draggable) return

      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      const modal = modalRef.current
      const rect = modal.getBoundingClientRect()
      const maxX = window.innerWidth - rect.width
      const maxY = window.innerHeight - rect.height

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging && draggable) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart, draggable])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const modalStyle = draggable
    ? {
        position: "fixed" as const,
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "default",
      }
    : {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/[0.1] min-w-96 max-w-2xl max-h-[90vh] overflow-hidden"
        style={modalStyle}
      >
        <div
          className={`flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] border-b border-white/[0.1] select-none ${
            draggable ? "cursor-grab active:cursor-grabbing hover:from-indigo-500/[0.15] hover:to-cyan-500/[0.15]" : ""
          }`}
          onMouseDown={handleMouseDown}
        >
          <h2 className="text-lg font-bold text-white">{title || "Modal"}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/[0.1] rounded-md transition-colors border border-white/[0.2]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-white">
          {children}
        </div>
      </div>
    </div>
  )
}

const componentCode = `"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X } from 'lucide-react'

interface DraggableModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  draggable?: boolean
}

export function DraggableModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  draggable = true 
}: DraggableModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  // Center modal on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modal = modalRef.current
      const rect = modal.getBoundingClientRect()
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      })
    }
  }, [isOpen])

  // Handle mouse down on modal header
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable || !modalRef.current) return

    setIsDragging(true)
    const rect = modalRef.current.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modalRef.current || !draggable) return

      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // Keep modal within viewport bounds
      const modal = modalRef.current
      const rect = modal.getBoundingClientRect()
      const maxX = window.innerWidth - rect.width
      const maxY = window.innerHeight - rect.height

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging && draggable) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart, draggable])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const modalStyle = draggable
    ? {
        position: "fixed" as const,
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "default",
      }
    : {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-2xl border-2 border-black min-w-96 max-w-2xl max-h-[90vh] overflow-hidden"
        style={modalStyle}
      >
        {/* Header */}
        <div
          className={\`flex items-center justify-between p-4 border-b-2 border-black bg-black select-none \${
            draggable ? "cursor-grab active:cursor-grabbing hover:bg-gray-800" : ""
          }\`}
          onMouseDown={handleMouseDown}
        >
          <h2 className="text-lg font-bold text-white">{title || "Modal"}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-md transition-colors border border-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-white text-black">
          {children}
        </div>
      </div>
    </div>
  )
}`;

export default function DraggableModalPage() {
  const [showCode, setShowCode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNonDraggableModalOpen, setIsNonDraggableModalOpen] = useState(false)
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-6xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center text-sm text-white/40 hover:text-white/70 mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                DraggableModal
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
                A fully interactive modal component with drag functionality, keyboard shortcuts, and customizable styling. Built for modern React applications.
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Interactive Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] hover:from-indigo-500/[0.2] hover:to-cyan-500/[0.2] text-white transition-all duration-300 border border-white/[0.1]"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Move className="h-4 w-4" />
                  Open Draggable Modal
                </button>
                
                <button
                  onClick={() => setIsNonDraggableModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/[0.05] to-white/[0.02] hover:from-white/[0.1] hover:to-white/[0.05] rounded-lg text-white font-medium transition-all duration-300 border border-white/[0.1]"
                >
                  Non-Draggable Modal
                </button>

                <button
                  onClick={() => setIsLargeModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Large Content Modal
                </button>
              </div>

              <div className="p-6 bg-gradient-to-r from-emerald-500/[0.05] to-cyan-500/[0.05] border border-emerald-500/[0.1] rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Drag modal by clicking and holding the header
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Close with Escape key or click the X button
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Click backdrop to close modal
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Automatic centering on open
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Viewport boundary constraints
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Body scroll prevention when open
                  </div>
                </div>
              </div>
            </div>

            {showCode && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Component Code</h3>
                <CodeBlock language="typescript">
                  {componentCode}
                </CodeBlock>
              </div>
            )}
          </div>

          {/* Props Documentation */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              API Reference
            </h2>
            <div className="rounded-xl border border-white/[0.1] overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.01]">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] border-b border-white/[0.1]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-white">Property</th>
                    <th className="text-left p-4 font-semibold text-white">Type</th>
                    <th className="text-left p-4 font-semibold text-white">Default</th>
                    <th className="text-left p-4 font-semibold text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300 font-bold">isOpen</td>
                    <td className="p-4 font-mono text-xs text-white/60">boolean</td>
                    <td className="p-4 font-mono text-xs text-white/40">—</td>
                    <td className="p-4 text-white/70">Controls whether the modal is visible</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300 font-bold">onClose</td>
                    <td className="p-4 font-mono text-xs text-white/60">() = void</td>
                    <td className="p-4 font-mono text-xs text-white/40">—</td>
                    <td className="p-4 text-white/70">Callback function called when modal should close</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300 font-bold">title</td>
                    <td className="p-4 font-mono text-xs text-white/60">string</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">"Modal"</td>
                    <td className="p-4 text-white/70">Title displayed in the modal header</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300 font-bold">children</td>
                    <td className="p-4 font-mono text-xs text-white/60">React.ReactNode</td>
                    <td className="p-4 font-mono text-xs text-white/40">—</td>
                    <td className="p-4 text-white/70">Content to be rendered inside the modal</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300 font-bold">draggable</td>
                    <td className="p-4 font-mono text-xs text-white/60">boolean</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">true</td>
                    <td className="p-4 text-white/70">Enable or disable drag functionality</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Basic Usage</h3>
                <CodeBlock language="typescript">
{`import { DraggableModal } from "@/components/DraggableModal"
import { useState } from "react"

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <DraggableModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <p>This is the modal content!</p>
      </DraggableModal>
    </>
  )
}`}
                </CodeBlock>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Non-Draggable Modal</h3>
                <CodeBlock language="typescript">
{`<DraggableModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Fixed Modal"
  draggable={false}
>
  <p>This modal cannot be dragged.</p>
</DraggableModal>`}
                </CodeBlock>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Advanced Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-gradient-to-br from-indigo-500/[0.05] to-indigo-500/[0.02] border border-indigo-500/[0.1] rounded-xl">
                <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  Drag & Drop
                </h3>
                <p className="text-sm text-white/70">
                  Click and drag the modal header to reposition the modal anywhere on screen with smooth, responsive movement.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-cyan-500/[0.05] to-cyan-500/[0.02] border border-cyan-500/[0.1] rounded-xl">
                <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  Keyboard Support
                </h3>
                <p className="text-sm text-white/70">
                  Press Escape key to close the modal, with automatic focus management and accessibility features.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-500/[0.05] to-emerald-500/[0.02] border border-emerald-500/[0.1] rounded-xl">
                <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  Boundary Constraints
                </h3>
                <p className="text-sm text-white/70">
                  Modal stays within viewport bounds and cannot be dragged off-screen, ensuring optimal user experience.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-violet-500/[0.05] to-violet-500/[0.02] border border-violet-500/[0.1] rounded-xl">
                <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                  Auto-Centering
                </h3>
                <p className="text-sm text-white/70">
                  Modal automatically centers on screen when opened, regardless of content size or viewport dimensions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal instances for demo */}
      <DraggableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Draggable Modal Demo"
      >
        <div className="space-y-4">
          <p>This is a draggable modal! Try the following:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
              Click and drag the header to move this modal around
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              Press the Escape key to close
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              Click the X button to close
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
              Click outside the modal to close
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/[0.1] rounded-lg mt-6">
            <h4 className="font-semibold text-white mb-2">Modal Content</h4>
            <p className="text-sm text-white/70">
              This modal can be dragged around the screen. Try moving it to different corners or edges of the viewport.
            </p>
          </div>
        </div>
      </DraggableModal>
      <DraggableModal
        isOpen={isNonDraggableModalOpen}
        onClose={() => setIsNonDraggableModalOpen(false)}
        title="Non-Draggable Modal"
        draggable={false}
      >
        <div className="space-y-4">
          <p>This modal cannot be dragged. It is fixed in place.</p>
          <div className="p-4 bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/[0.1] rounded-lg mt-6">
            <h4 className="font-semibold text-white mb-2">Fixed Content</h4>
            <p className="text-sm text-white/70">
              This content is static and cannot be moved. Click the X button or press Escape to close.
            </p>
          </div>
        </div>
      </DraggableModal>
      <DraggableModal
        isOpen={isLargeModalOpen}
        onClose={() => setIsLargeModalOpen(false)}
        title="Large Content Modal" 
        draggable={true}
      >
        <div className="space-y-4">
          <p>This modal contains a lot of content to demonstrate scrolling and viewport constraints.</p>
          <div className="p-4 bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/[0.1] rounded-lg mt-6">
            <h4 className="font-semibold text-white mb-2">Large Content</h4>
            <p className="text-sm text-white/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="mt-2 text-sm text-white/70">
              More content here to fill the modal and demonstrate scrolling behavior...
            </p>
          </div>
        </div>  
      </DraggableModal>
    </div>
  )
}