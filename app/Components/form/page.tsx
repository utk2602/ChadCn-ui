"use client"

import { useState } from "react"
import { ArrowLeft, Code, Copy, Check } from "lucide-react"
import Link from "next/link"

// Multi-step form component
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Form submitted successfully!")
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step <= currentStep
                ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"
                : "bg-white/10 text-white/40 border border-white/20"
            }`}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={`w-16 h-1 mx-3 rounded-full transition-all duration-300 ${
                step < currentStep ? "bg-gradient-to-r from-indigo-500 to-cyan-500" : "bg-white/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const Step1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300 mb-2">
          Basic Information
        </h3>
        <p className="text-white/60 text-sm">Let's start with your essential details</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-white/40 transition-all duration-200 backdrop-blur-sm"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-white/40 transition-all duration-200 backdrop-blur-sm"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">
          Contact Details
        </h3>
        <p className="text-white/60 text-sm">How can we reach you?</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-white/40 transition-all duration-200 backdrop-blur-sm"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-white/40 transition-all duration-200 backdrop-blur-sm"
            placeholder="Enter your address"
            required
          />
        </div>
      </div>
    </div>
  )

  const Step3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
          Additional Information
        </h3>
        <p className="text-white/60 text-sm">Tell us more about yourself</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Experience Level</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 text-white transition-all duration-200 backdrop-blur-sm"
            required
          >
            <option value="" className="bg-gray-800 text-white">
              Select Experience
            </option>
            <option value="beginner" className="bg-gray-800 text-white">
              Beginner
            </option>
            <option value="intermediate" className="bg-gray-800 text-white">
              Intermediate
            </option>
            <option value="advanced" className="bg-gray-800 text-white">
              Advanced
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-white/40 resize-none transition-all duration-200 backdrop-blur-sm"
            placeholder="Tell us about yourself..."
            required
          />
        </div>
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
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-lg mx-auto shadow-2xl border border-white/10">
      {/* Header with gradient */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-cyan-200 mb-2">
          Registration
        </h2>
        <p className="text-white/50 text-sm">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <StepIndicator />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="min-h-[300px]">{renderStep()}</div>

        <div className="flex justify-between pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 1
                ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 backdrop-blur-sm"
            }`}
          >
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 font-medium transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Submit Form
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 font-medium transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Next Step
            </button>
          )}
        </div>
      </form>

      {/* Progress bar at bottom */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between text-xs text-white/40 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ children, language = "tsx" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
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

export default function MultiStepFormDocumentationPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center">
            <Link href="/docs" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              Multi-Step Form
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              A clean, progressive form component with step indicators, smooth transitions, and comprehensive form
              validation across multiple steps.
            </p>
          </div>

          {/* Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-white/[0.2] bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors backdrop-blur-sm"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {/* Form Demo */}
            <div className="flex items-center justify-center p-8 rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
              <MinimalMultiStepForm />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white/90">Interactive Features</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mt-2"></div>
                  <span className="text-white/70 text-sm">
                    Navigate through 3 distinct steps with progress indication
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mt-2"></div>
                  <span className="text-white/70 text-sm">Form validation and state management across steps</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mt-2"></div>
                  <span className="text-white/70 text-sm">Clean black and white design with consistent styling</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mt-2"></div>
                  <span className="text-white/70 text-sm">Responsive layout that works on all screen sizes</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mt-2"></div>
                  <span className="text-white/70 text-sm">Accessible form inputs with proper labeling</span>
                </div>
              </div>
            </div>

            {showCode && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white/90">Component Code</h3>
                <CodeBlock language="tsx">
                  {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">useState</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"react"</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">MinimalMultiStepForm</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">const</span> <span class="text-[#d4d4d4]">[</span><span class="text-[#9cdcfe]">currentStep</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">setCurrentStep</span><span class="text-[#d4d4d4]">]</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#dcdcaa]">useState</span><span class="text-[#d4d4d4]">(</span><span class="text-[#b5cea8]">1</span><span class="text-[#d4d4d4]">)</span>
  <span class="text-[#c586c0]">const</span> <span class="text-[#d4d4d4]">[</span><span class="text-[#9cdcfe]">formData</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">setFormData</span><span class="text-[#d4d4d4]">]</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#dcdcaa]">useState</span><span class="text-[#d4d4d4]">({</span>
    <span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">""</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">email</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">""</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#608b4e]">// ... other fields</span>
  <span class="text-[#d4d4d4]">})</span>

  <span class="text-[#608b4e]">// Form logic and render methods...</span>
<span class="text-[#d4d4d4]">}</span>`}
                </CodeBlock>
              </div>
            )}
          </div>

          {/* API Reference */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              API Reference
            </h2>
            <div className="rounded-xl border border-white/[0.1] overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] border-b border-white/[0.1]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-white/90">State/Function</th>
                    <th className="text-left p-4 font-semibold text-white/90">Type</th>
                    <th className="text-left p-4 font-semibold text-white/90">Default</th>
                    <th className="text-left p-4 font-semibold text-white/90">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">currentStep</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">number</td>
                    <td className="p-4 font-mono text-xs text-white/60">1</td>
                    <td className="p-4 text-white/70">Current active step (1-3)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">formData</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">object</td>
                    <td className="p-4 font-mono text-xs text-white/60">{"{}"}</td>
                    <td className="p-4 text-white/70">Form data object containing all field values</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">totalSteps</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">number</td>
                    <td className="p-4 font-mono text-xs text-white/60">3</td>
                    <td className="p-4 text-white/70">Total number of steps in the form</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">handleChange</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">function</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">Updates form data when input values change</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">nextStep / prevStep</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">function</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">Navigate between form steps</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">handleSubmit</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">function</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">Handles final form submission</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Steps */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Form Steps
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Basic Information</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Collects essential user information including full name and email address.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                    <span className="text-xs text-white/70">Full Name (required)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                    <span className="text-xs text-white/70">Email Address (required)</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Contact Details</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Gathers additional contact information for communication purposes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-white/70">Phone Number (required)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-white/70">Address (required)</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Additional Info</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Captures supplementary information and user preferences.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-white/70">Experience Level (dropdown)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-white/70">Message (textarea)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white/90">Basic Implementation</h3>
                <CodeBlock language="tsx">
                  {`<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">MinimalMultiStepForm</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/forms/MinimalMultiStepForm"</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">RegistrationPage</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"min-h-screen bg-gray-50 flex items-center justify-center p-4"</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">MinimalMultiStepForm</span> <span class="text-[#d4d4d4]">/&gt;</span>
    <span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`}
                </CodeBlock>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white/90">Custom Form Submission</h3>
                <CodeBlock language="typescript">
                  {`<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">handleSubmit</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#c586c0]">async</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">e</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#4ec9b0]">React</span><span class="text-[#d4d4d4]">.</span><span class="text-[#4ec9b0]">FormEvent</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#9cdcfe]">e</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">preventDefault</span><span class="text-[#d4d4d4]">()</span>
  
  <span class="text-[#c586c0]">try</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">response</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">fetch</span><span class="text-[#d4d4d4]">(</span><span class="text-[#ce9178]">'/api/register'</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#d4d4d4]">{</span>
      <span class="text-[#9cdcfe]">method</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">'POST'</span><span class="text-[#d4d4d4]">,</span>
      <span class="text-[#9cdcfe]">headers</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{</span>
        <span class="text-[#ce9178]">'Content-Type'</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">'application/json'</span>
      <span class="text-[#d4d4d4]">},</span>
      <span class="text-[#9cdcfe]">body</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#dcdcaa]">JSON</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">stringify</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">formData</span><span class="text-[#d4d4d4]">)</span>
    <span class="text-[#d4d4d4]">})</span>
    
    <span class="text-[#c586c0]">if</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">response</span><span class="text-[#d4d4d4]">.</span><span class="text-[#9cdcfe]">ok</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">{</span>
      <span class="text-[#608b4e]">// Handle success</span>
    <span class="text-[#d4d4d4]">}</span>
  <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">catch</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">error</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#608b4e]">// Handle error</span>
  <span class="text-[#d4d4d4]">}</span>
<span class="text-[#d4d4d4]">}</span>`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
