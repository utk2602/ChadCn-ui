"use client"

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
        className="relative bg-gray-900 rounded-lg shadow-2xl border-2 border-white min-w-96 max-w-2xl max-h-[90vh] overflow-hidden"
        style={modalStyle}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b-2 border-white bg-black select-none ${
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-gray-900 text-white">
          {children}
        </div>
      </div>
    </div>
  )
}