"use client"

import { useState } from "react"
import { ArrowLeft, Code, Move, X } from "lucide-react"

// DraggableModal component code (embedded for preview)
import type React from "react"
import { useRef, useEffect } from "react"

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
          className={`flex items-center justify-between p-4 border-b-2 border-black bg-black select-none ${
            draggable ? "cursor-grab active:cursor-grabbing hover:bg-gray-800" : ""
          }`}
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
    <div className="min-h-screen bg-black text-white">
      <div className="flex-1 container max-w-7xl py-10">
        <div className="space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                DraggableModal
              </h1>
              <p className="text-xl text-gray-300">
                A fully interactive modal component with drag functionality, keyboard shortcuts, and customizable styling.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6 bg-white rounded-xl p-6 md:p-8 border-2 border-black">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-black">Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border-2 border-black bg-white hover:bg-black hover:text-white text-black transition-colors"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 rounded-lg text-white font-medium transition-colors border-2 border-black"
                >
                  <Move className="h-4 w-4" />
                  Open Draggable Modal
                </button>
                
                <button
                  onClick={() => setIsNonDraggableModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 rounded-lg text-black font-medium transition-colors border-2 border-black"
                >
                  Non-Draggable Modal
                </button>

                <button
                  onClick={() => setIsLargeModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 rounded-lg text-white font-medium transition-colors border-2 border-black"
                >
                  Large Content Modal
                </button>
              </div>
            </div>

            <div className="text-sm text-black space-y-2">
              <p><strong className="text-black">Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Drag modal by clicking and holding the header</li>
                <li>Close with Escape key or click the X button</li>
                <li>Click backdrop to close modal</li>
                <li>Automatic centering on open</li>
                <li>Viewport boundary constraints</li>
                <li>Body scroll prevention when open</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-black border-2 border-black p-4 mt-4">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Props Documentation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Props</h2>
            <div className="rounded-md border-2 border-white overflow-hidden bg-white">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-3 font-medium text-white">Property</th>
                    <th className="text-left p-3 font-medium text-white">Type</th>
                    <th className="text-left p-3 font-medium text-white">Default</th>
                    <th className="text-left p-3 font-medium text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  <tr>
                    <td className="p-3 font-mono text-xs text-black font-bold">isOpen</td>
                    <td className="p-3 font-mono text-xs text-black">boolean</td>
                    <td className="p-3 font-mono text-xs text-gray-500">—</td>
                    <td className="p-3 text-black">Controls whether the modal is visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-black font-bold">onClose</td>
                    <td className="p-3 font-mono text-xs text-black">() = void</td>
                    <td className="p-3 font-mono text-xs text-gray-500">—</td>
                    <td className="p-3 text-black">Callback function called when modal should close</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-black font-bold">title</td>
                    <td className="p-3 font-mono text-xs text-black">string</td>
                    <td className="p-3 font-mono text-xs text-black">"Modal"</td>
                    <td className="p-3 text-black">Title displayed in the modal header</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-black font-bold">children</td>
                    <td className="p-3 font-mono text-xs text-black">React.ReactNode</td>
                    <td className="p-3 font-mono text-xs text-gray-500">—</td>
                    <td className="p-3 text-black">Content to be rendered inside the modal</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-black font-bold">draggable</td>
                    <td className="p-3 font-mono text-xs text-black">boolean</td>
                    <td className="p-3 font-mono text-xs text-black">true</td>
                    <td className="p-3 text-black">Enable or disable drag functionality</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border-2 border-white rounded-lg bg-white">
                <h3 className="font-semibold mb-2 text-black">Drag & Drop</h3>
                <p className="text-sm text-gray-700">
                  Click and drag the modal header to reposition the modal anywhere on screen.
                </p>
              </div>
              <div className="p-4 border-2 border-white rounded-lg bg-white">
                <h3 className="font-semibold mb-2 text-black">Keyboard Support</h3>
                <p className="text-sm text-gray-700">
                  Press Escape key to close the modal, with automatic focus management.
                </p>
              </div>
              <div className="p-4 border-2 border-white rounded-lg bg-white">
                <h3 className="font-semibold mb-2 text-black">Boundary Constraints</h3>
                <p className="text-sm text-gray-700">
                  Modal stays within viewport bounds and cannot be dragged off-screen.
                </p>
              </div>
              <div className="p-4 border-2 border-white rounded-lg bg-white">
                <h3 className="font-semibold mb-2 text-black">Auto-Centering</h3>
                <p className="text-sm text-gray-700">
                  Modal automatically centers on screen when opened, regardless of content size.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Usage Examples</h2>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white">Basic Usage</h3>
              <div className="rounded-md bg-black border-2 border-white p-4">
                <pre className="text-sm text-white whitespace-pre-wrap">
                  <code>{`import { DraggableModal } from "@/components/DraggableModal"
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
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white">Non-Draggable Modal</h3>
              <div className="rounded-md bg-black border-2 border-white p-4">
                <pre className="text-sm text-white whitespace-pre-wrap">
                  <code>{`<DraggableModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Fixed Modal"
  draggable={false}
>
  <p>This modal cannot be dragged.</p>
</DraggableModal>`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Implementation Notes</h2>
            <div className="p-4 border-2 border-white rounded-lg bg-white">
              <h3 className="font-semibold mb-2 text-black">Best Practices</h3>
              <ul className="text-sm text-black space-y-1">
                <li>• Always provide an onClose callback to handle modal dismissal</li>
                <li>• Use meaningful titles for accessibility and user experience</li>
                <li>• Consider disabling drag functionality for smaller screens or mobile devices</li>
                <li>• The modal prevents body scrolling when open to maintain focus</li>
                <li>• Modal content is scrollable if it exceeds the maximum height</li>
              </ul>
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
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Click and drag the header to move this modal around</li>
            <li>Press the Escape key to close</li>
            <li>Click the X button to close</li>
            <li>Click outside the modal to close</li>
          </ul>
          <div className="p-4 bg-gray-100 border-2 border-black rounded-lg">
            <h4 className="font-semibold mb-2">Interactive Content</h4>
            <p className="mb-4">You can include any content here, including interactive elements:</p>
            <button className="px-4 py-2 bg-black hover:bg-gray-800 border-2 border-black rounded text-white transition-colors">
              Sample Button
            </button>
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
          <p>This modal cannot be dragged because the <code className="bg-gray-100 border border-black px-2 py-1 rounded text-black">draggable</code> prop is set to <code className="bg-gray-100 border border-black px-2 py-1 rounded text-black">false</code>.</p>
          <p>It will remain centered on the screen and behave like a traditional modal.</p>
        </div>
      </DraggableModal>

      <DraggableModal
        isOpen={isLargeModalOpen}
        onClose={() => setIsLargeModalOpen(false)}
        title="Large Content Modal"
      >
        <div className="space-y-4">
          <p>This modal demonstrates how the component handles larger amounts of content with scrolling.</p>
          
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-4 bg-gray-100 border-2 border-black rounded-lg">
              <h4 className="font-semibold mb-2">Section {i + 1}</h4>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
      </DraggableModal>
    </div>
  )
}