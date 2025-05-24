"use client"

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
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {step}
          </div>
          {step < totalSteps && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-black" : "bg-gray-200"}`} />}
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
              className={`px-4 py-2 rounded-md font-medium ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
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
}
