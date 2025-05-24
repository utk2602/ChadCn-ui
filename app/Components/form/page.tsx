import { useState } from "react"
import { ArrowLeft, Code, Play, Square, Link, Sparkles } from "lucide-react"

// Multi-step form component based on your provided code
function MinimalMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    experience: "",
  })

  const totalSteps = 3

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)

  const handleSubmit = ( e: { preventDefault: () => void } ) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Form submitted successfully!")
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? "bg-white text-black" : "bg-gray-700 text-gray-300"
            }`}
          >
            {step}
          </div>
          {step < totalSteps && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-white" : "bg-gray-700"}`} />}
        </div>
      ))}
    </div>
  )

  const Step1 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
          placeholder="Enter your email"
          required
        />
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Contact Details</h3>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
          placeholder="Enter your address"
          required
        />
      </div>
    </div>
  )

  const Step3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Experience Level</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
          required
        >
          <option value="">Select Experience</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white resize-none"
          placeholder="Tell us about yourself..."
          required
        />
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      default:
        return <Step1 />
    }
  }

  return (
  <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
    <h2 className="text-2xl font-bold text-black mb-6 text-center">Registration</h2>

    <StepIndicator />

    <form onSubmit={handleSubmit}>
      {renderStep()}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-md font-medium ${
            currentStep === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Previous
        </button>

        {currentStep === totalSteps ? (
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
          >
            Next
          </button>
        )}
      </div>
    </form>
  </div>
);

}
const componentCode = `"use client"

import type React from "react"
import { useState } from "react"

export default function MinimalMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    experience: "",
  })

  const totalSteps = 3

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Form submitted successfully!")
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={\`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium \${
              step <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600"
            }\`}
          >
            {step}
          </div>
          {step < totalSteps && <div className={\`w-16 h-1 mx-2 \${step < currentStep ? "bg-black" : "bg-gray-200"}\`} />}
        </div>
      ))}
    </div>
  )

  const Step1 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-black mb-4">Basic Information</h3>
      <div>
        <label className="block text-sm font-medium text-black mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="Enter your email"
          required
        />
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-black mb-4">Contact Details</h3>
      <div>
        <label className="block text-sm font-medium text-black mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
          placeholder="Enter your address"
          required
        />
      </div>
    </div>
  )

  const Step3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-black mb-4">Additional Information</h3>
      <div>
        <label className="block text-sm font-medium text-black mb-1">Experience Level</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
          required
        >
          <option value="">Select Experience</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-1">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black resize-none"
          placeholder="Tell us about yourself..."
          required
        />
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      default:
        return <Step1 />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Registration</h2>

        <StepIndicator />

        <form onSubmit={handleSubmit}>
          {renderStep()}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={\`px-4 py-2 rounded-md font-medium \${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }\`}
            >
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium">
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}`;

export default function MultiStepFormDocumentationPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex-1 container max-w-7xl py-10">
        <div className="space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center text-sm text-white hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r text-white bg-clip-text text-transparent">
                Multi-Step Form
              </h1>
              <p className="text-xl text-gray-300">
                A clean, progressive form component with step indicators, smooth transitions, and comprehensive form validation across multiple steps.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6 bg-black rounded-xl p-6 md:p-8 border border-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-white bg-black hover:bg-white hover:text-black text-white transition-colors"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {/* Form Demo */}
            <div className="flex items-center justify-center p-8 rounded-lg border border-white bg-black">
              <MinimalMultiStepForm />
            </div>

            <div className="text-sm text-white space-y-2">
              <p><strong className="text-white">Interactive Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Navigate through 3 distinct steps with progress indication</li>
                <li>Form validation and state management across steps</li>
                <li>Clean black and white design with consistent styling</li>
                <li>Responsive layout that works on all screen sizes</li>
                <li>Accessible form inputs with proper labeling</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-black border border-white p-4 mt-4">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* API Reference */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">API Reference</h2>
            <div className="rounded-md border border-white overflow-hidden bg-black">
              <table className="w-full text-sm">
                <thead className="bg-white text-black">
                  <tr>
                    <th className="text-left p-3 font-medium">State/Function</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Default</th>
                    <th className="text-left p-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white">
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">currentStep</td>
                    <td className="p-3 font-mono text-xs text-white">number</td>
                    <td className="p-3 font-mono text-xs text-white">1</td>
                    <td className="p-3 text-white">Current active step (1-3)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">formData</td>
                    <td className="p-3 font-mono text-xs text-white">object</td>
                    <td className="p-3 font-mono text-xs text-white">{"{}"}</td>
                    <td className="p-3 text-white">Form data object containing all field values</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">totalSteps</td>
                    <td className="p-3 font-mono text-xs text-white">number</td>
                    <td className="p-3 font-mono text-xs text-white">3</td>
                    <td className="p-3 text-white">Total number of steps in the form</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">handleChange</td>
                    <td className="p-3 font-mono text-xs text-white">function</td>
                    <td className="p-3 font-mono text-xs text-white">—</td>
                    <td className="p-3 text-white">Updates form data when input values change</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">nextStep / prevStep</td>
                    <td className="p-3 font-mono text-xs text-white">function</td>
                    <td className="p-3 font-mono text-xs text-white">—</td>
                    <td className="p-3 text-white">Navigate between form steps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">handleSubmit</td>
                    <td className="p-3 font-mono text-xs text-white">function</td>
                    <td className="p-3 font-mono text-xs text-white">—</td>
                    <td className="p-3 text-white">Handles final form submission</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Steps */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Form Steps</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Step 1: Basic Information</h3>
                <p className="text-sm text-white mb-2">
                  Collects essential user information including full name and email address.
                </p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Full Name (required)</li>
                  <li>• Email Address (required)</li>
                </ul>
              </div>
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Step 2: Contact Details</h3>
                <p className="text-sm text-white mb-2">
                  Gathers additional contact information for communication purposes.
                </p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Phone Number (required)</li>
                  <li>• Address (required)</li>
                </ul>
              </div>
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Step 3: Additional Info</h3>
                <p className="text-sm text-white mb-2">
                  Captures supplementary information and user preferences.
                </p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Experience Level (dropdown)</li>
                  <li>• Message (textarea)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Usage Examples</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-200">Basic Implementation</h3>
                <div className="rounded-md bg-black border border-white p-4">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{`import MinimalMultiStepForm from "@/components/forms/MinimalMultiStepForm"

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <MinimalMultiStepForm />
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-200">Custom Form Submission</h3>
                <div className="rounded-md bg-black border border-white p-4">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{`const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    
    if (response.ok) {
      alert('Registration successful!')
      // Redirect or reset form
    } else {
      alert('Registration failed. Please try again.')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-200">Adding Validation</h3>
                <div className="rounded-md bg-black border border-white p-4">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{`const [errors, setErrors] = useState({})

const validateStep = (step: number) => {
  const newErrors: any = {}
  
  if (step === 1) {
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
  }
  
  if (step === 2) {
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const nextStep = () => {
  if (validateStep(currentStep) && currentStep < totalSteps) {
    setCurrentStep(currentStep + 1)
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Design Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Design Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Progress Indicator</h3>
                <p className="text-sm text-gray-400">
                  Visual step indicator with connected progress bars showing current position and completion status.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Smooth Navigation</h3>
                <p className="text-sm text-gray-400">
                  Intuitive Previous/Next buttons with conditional rendering and proper state management.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Form Persistence</h3>
                <p className="text-sm text-gray-400">
                  Form data persists across steps, allowing users to navigate back and forth without losing data.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Responsive Design</h3>
                <p className="text-sm text-gray-400">
                  Mobile-first design that adapts to different screen sizes with consistent spacing and layout.
                </p>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Implementation Notes</h2>
            <div className="p-4 border border-white rounded-lg bg-black">
              <h3 className="font-semibold mb-2 text-white">Key Features & Considerations</h3>
              <ul className="text-sm text-white space-y-1">
                <li>• Uses React hooks (useState) for state management</li>
                <li>• TypeScript support for type safety and better development experience</li>
                <li>• Modular step components for easy customization and maintenance</li>
                <li>• Accessible form inputs with proper labeling and ARIA attributes</li>
                <li>• Responsive design using Tailwind CSS utility classes</li>
                <li>• Form validation can be easily extended per step</li>
                <li>• Supports all standard HTML form input types and attributes</li>
                <li>• Clean separation of concerns between UI and business logic</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}