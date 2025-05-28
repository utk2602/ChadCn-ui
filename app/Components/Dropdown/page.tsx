"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Code, Copy, Check } from "lucide-react"

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
        className="flex items-center justify-between w-full px-4 py-3 text-left bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 rounded-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-white/90 font-medium">{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`w-5 h-5 text-white/70 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-lg overflow-hidden">
          <ul role="listbox" className="py-1">
            {options.map((option, index) => (
              <li key={option.value} role="option">
                <button
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-3 text-left text-white/90 hover:bg-white/20 focus:bg-white/20 focus:outline-none transition-colors duration-150"
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

function CodeBlock({ children, language = "javascript", title }: { children: string; language?: string; title?: string }) {
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
    <div className="space-y-3">
      {title && (
        <h4 className="text-lg font-semibold text-white/90">{title}</h4>
      )}
      <div className="relative group">
        <div className="rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/10">
            <span className="text-xs text-white/60 font-medium uppercase tracking-wide">{language}</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-sm font-mono overflow-x-auto text-white/80 leading-relaxed">
            <code>{children}</code>
          </pre>
        </div>
      </div>
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
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-6">
            <Link href="/docs" className="inline-flex items-center text-sm text-white/60 hover:text-white/90 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Link>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                CustomDropdown
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                A clean, accessible dropdown component with keyboard navigation and click-outside handling.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 rounded-lg text-white/90"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white/90">With Actions</h3>
                  <CustomDropdown 
                    options={DROPDOWN_OPTIONS} 
                    placeholder="Choose an action" 
                    className="w-full"
                  />
                  {selectedAction && (
                    <p className="text-sm text-white/60 mt-2">{selectedAction}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white/90">Framework Selection</h3>
                  <CustomDropdown 
                    options={FRAMEWORK_OPTIONS} 
                    placeholder="Select framework" 
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white/90">Size Options</h3>
                  <CustomDropdown 
                    options={SIZE_OPTIONS} 
                    placeholder="Pick a size" 
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {showCode && (
              <div className="mt-8 space-y-4">
                <CodeBlock title="Component Code" language="typescript">
                  {componentCode}
                </CodeBlock>
              </div>
            )}
          </div>

          {/* Props Table */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Props
            </h2>
            <div className="overflow-hidden rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead className="bg-white/10 backdrop-blur-sm">
                  <tr>
                    <th className="text-left p-4 font-semibold text-white/90 border-b border-white/20">Name</th>
                    <th className="text-left p-4 font-semibold text-white/90 border-b border-white/20">Type</th>
                    <th className="text-left p-4 font-semibold text-white/90 border-b border-white/20">Default</th>
                    <th className="text-left p-4 font-semibold text-white/90 border-b border-white/20">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300">options</td>
                    <td className="p-4 font-mono text-xs text-white/70">DropdownOption[]</td>
                    <td className="p-4 font-mono text-xs text-white/50">—</td>
                    <td className="p-4 text-white/80">Array of dropdown option objects</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300">placeholder</td>
                    <td className="p-4 font-mono text-xs text-white/70">string</td>
                    <td className="p-4 font-mono text-xs text-white/50">"Select an option"</td>
                    <td className="p-4 text-white/80">Text displayed when no option is selected</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-cyan-300">className</td>
                    <td className="p-4 font-mono text-xs text-white/70">string</td>
                    <td className="p-4 font-mono text-xs text-white/50">""</td>
                    <td className="p-4 text-white/80">Additional CSS classes for the dropdown container</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Structure */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Data Structure
            </h2>
            <CodeBlock language="typescript">
              {`interface DropdownOption {
  label: string     // Display text for the option
  value: string     // Unique identifier for the option
  onClick?: () => void  // Optional callback when option is selected
}`}
            </CodeBlock>
          </div>

          {/* Features */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Accessible keyboard navigation (Escape to close)",
                "Click-outside-to-close functionality",
                "Smooth animations and transitions",
                "Optional callback functions for each option",
                "Customizable placeholder text",
                "Clean black and white design",
                "Fully responsive layout",
                "ARIA attributes for screen readers"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-white/80 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-8">
              <CodeBlock title="Basic Usage" language="typescript">
                {`import { CustomDropdown } from "@/components/CustomDropdown"

export default function MyComponent() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" }
  ]

  return <CustomDropdown options={options} />
}`}
              </CodeBlock>

              <CodeBlock title="With Custom Actions" language="typescript">
                {`const actionOptions = [
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
/>`}
              </CodeBlock>

              <CodeBlock title="Form Integration" language="typescript">
                {`const [selectedValue, setSelectedValue] = useState("")

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
/>`}
              </CodeBlock>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}