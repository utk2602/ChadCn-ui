"use client"

import { useState, useRef, useEffect } from "react"

interface DropdownOption {
  label: string
  value: string
  onClick?: () => void
}

interface CustomDropdownProps {
  options: DropdownOption[]
  placeholder?: string
  className?: string
}

export function CustomDropdown({ options, placeholder = "Select an option", className = "" }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (option.onClick) {
      option.onClick()
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-3 text-left bg-white border-2 border-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-black font-medium">{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`w-5 h-5 text-black transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-black shadow-lg">
          <ul role="listbox" className="py-1">
            {options.map((option, index) => (
              <li key={option.value} role="option">
                <button
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-3 text-left text-black hover:bg-black hover:text-white focus:bg-black focus:text-white focus:outline-none transition-colors duration-150"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
