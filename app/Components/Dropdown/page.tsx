"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Code } from "lucide-react"

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

function CustomDropdown({ options, placeholder = "Select an option", className = "" }: CustomDropdownProps) {
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

const componentCode = `"use client"

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
    <div className={\`relative inline-block \${className}\`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-3 text-left bg-white border-2 border-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-black font-medium">{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={\`w-5 h-5 text-black transition-transform duration-200 \${isOpen ? "rotate-180" : "rotate-0"}\`}
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
}`

export default function CustomDropdownPage() {
  const [showCode, setShowCode] = useState(false)
  const [selectedAction, setSelectedAction] = useState("")

  const DROPDOWN_OPTIONS = [
    { label: "Edit Profile", value: "edit", onClick: () => setSelectedAction("Edit Profile clicked") },
    { label: "View Settings", value: "settings", onClick: () => setSelectedAction("View Settings clicked") },
    { label: "Export Data", value: "export", onClick: () => setSelectedAction("Export Data clicked") },
    { label: "Delete Account", value: "delete", onClick: () => setSelectedAction("Delete Account clicked") },
  ]

  const FRAMEWORK_OPTIONS = [
    { label: "React", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
  ]

  const SIZE_OPTIONS = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
    { label: "Extra Large", value: "xl" },
  ]

  return (
    <div className="flex-1 container max-w-7xl py-10 bg-white text-black">
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <button className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </button>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-black">CustomDropdown</h1>
            <p className="text-xl text-gray-600">
              A clean, accessible dropdown component with keyboard navigation and click-outside handling.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6 bg-gray-50 border-2 border-black p-6 md:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-black">Preview</h2>
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
            >
              <Code className="h-4 w-4" />
              {showCode ? "Hide Code" : "View Code"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-black">With Actions</h3>
                <CustomDropdown 
                  options={DROPDOWN_OPTIONS} 
                  placeholder="Choose an action" 
                  className="w-full"
                />
                {selectedAction && (
                  <p className="text-xs text-gray-600 mt-2">{selectedAction}</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-black">Framework Selection</h3>
                <CustomDropdown 
                  options={FRAMEWORK_OPTIONS} 
                  placeholder="Select framework" 
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-black">Size Options</h3>
                <CustomDropdown 
                  options={SIZE_OPTIONS} 
                  placeholder="Pick a size" 
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {showCode && (
            <div className="border-2 border-black bg-white p-4 mt-4">
              <h3 className="text-lg font-medium mb-2 text-black">Component Code</h3>
              <pre className="text-sm overflow-auto whitespace-pre-wrap text-black">
                <code>{componentCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Props Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-black">Props</h2>
          <div className="border-2 border-black overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-medium text-black border-b border-black">Name</th>
                  <th className="text-left p-3 font-medium text-black border-b border-black">Type</th>
                  <th className="text-left p-3 font-medium text-black border-b border-black">Default</th>
                  <th className="text-left p-3 font-medium text-black border-b border-black">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                <tr>
                  <td className="p-3 font-mono text-xs text-black">options</td>
                  <td className="p-3 font-mono text-xs text-black">DropdownOption[]</td>
                  <td className="p-3 font-mono text-xs text-black">—</td>
                  <td className="p-3 text-black">Array of dropdown option objects</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs text-black">placeholder</td>
                  <td className="p-3 font-mono text-xs text-black">string</td>
                  <td className="p-3 font-mono text-xs text-black">"Select an option"</td>
                  <td className="p-3 text-black">Text displayed when no option is selected</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs text-black">className</td>
                  <td className="p-3 font-mono text-xs text-black">string</td>
                  <td className="p-3 font-mono text-xs text-black">""</td>
                  <td className="p-3 text-black">Additional CSS classes for the dropdown container</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Structure */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-black">Data Structure</h2>
          <div className="border-2 border-black bg-gray-50 p-4">
            <pre className="text-sm overflow-auto text-black">
              <code>{`interface DropdownOption {
  label: string     // Display text for the option
  value: string     // Unique identifier for the option
  onClick?: () => void  // Optional callback when option is selected
}`}</code>
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-black">Features</h2>
          <ul className="space-y-2 list-disc pl-5 text-black">
            <li>Accessible keyboard navigation (Escape to close)</li>
            <li>Click-outside-to-close functionality</li>
            <li>Smooth animations and transitions</li>
            <li>Optional callback functions for each option</li>
            <li>Customizable placeholder text</li>
            <li>Clean black and white design</li>
            <li>Fully responsive layout</li>
            <li>ARIA attributes for screen readers</li>
          </ul>
        </div>

        {/* Usage Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-black">Usage Examples</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-black">Basic Usage</h3>
              <div className="border-2 border-black bg-gray-50 p-4">
                <pre className="text-sm overflow-auto text-black">
                  <code>{`import { CustomDropdown } from "@/components/CustomDropdown"

export default function MyComponent() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" }
  ]

  return <CustomDropdown options={options} />
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-black">With Custom Actions</h3>
              <div className="border-2 border-black bg-gray-50 p-4">
                <pre className="text-sm overflow-auto text-black">
                  <code>{`const actionOptions = [
  { 
    label: "Delete Item", 
    value: "delete",
    onClick: () => handleDelete()
  },
  { 
    label: "Edit Item", 
    value: "edit",
    onClick: () => setEditMode(true)
  }
]

<CustomDropdown 
  options={actionOptions}
  placeholder="Select action"
  className="w-48"
/>`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-black">Form Integration</h3>
              <div className="border-2 border-black bg-gray-50 p-4">
                <pre className="text-sm overflow-auto text-black">
                  <code>{`const [selectedValue, setSelectedValue] = useState("")

const countryOptions = [
  { 
    label: "United States", 
    value: "us",
    onClick: () => setSelectedValue("us")
  },
  { 
    label: "Canada", 
    value: "ca",
    onClick: () => setSelectedValue("ca")
  }
]

<CustomDropdown 
  options={countryOptions}
  placeholder="Select country"
  className="w-full"
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}