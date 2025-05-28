"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Code,
  Copy,
  Check,
  User,
  Building2,
  Mail,
  Shield,
  Calendar,
  Fingerprint,
  Palette,
  Settings,
  Eye,
  Download,
} from "lucide-react"

// MacOS ID Card Component
interface MacOsIdCardProps {
  name: string
  role: string
  department: string
  employeeId: string
  email: string
  issueDate: string
  expiryDate: string
  accessLevel: string
  photoUrl: string
  theme?: "dark" | "light"
}

function MacOsIdCard({
  name,
  role,
  department,
  employeeId,
  email,
  issueDate,
  expiryDate,
  accessLevel,
  photoUrl,
  theme = "dark",
}: MacOsIdCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isDark = theme === "dark"

  return (
    <div className="w-full max-w-md mx-auto">
      {/* macOS Window Container */}
      <div
        className={`${isDark ? "bg-black border-white/10" : "bg-white border-gray-200"} rounded-lg border overflow-hidden shadow-2xl transition-all duration-300`}
      >
        {/* macOS Title Bar */}
        <div
          className={`${isDark ? "bg-black border-white/10" : "bg-gray-50 border-gray-200"} border-b px-4 py-3 flex items-center transition-all duration-300`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex-1 text-center">
            <h1
              className={`text-sm font-medium ${isDark ? "text-white/60" : "text-gray-600"} transition-colors duration-300`}
            >
              Employee ID Card
            </h1>
          </div>
          <div className="w-14"></div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative group">
              <div
                className={`w-20 h-20 rounded-full overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"} border transition-all duration-300 group-hover:scale-105`}
              >
                <img
                  src={photoUrl || "https://via.placeholder.com/80x80/6366f1/FFFFFF?text=User"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 ${isDark ? "bg-green-500 border-black" : "bg-green-500 border-white"} rounded-full border-2 flex items-center justify-center transition-all duration-300`}
              >
                <div className={`w-2 h-2 ${isDark ? "bg-black" : "bg-white"} rounded-full`}></div>
              </div>
            </div>
            <div className="flex-1">
              <h2
                className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1 transition-colors duration-300`}
              >
                {name}
              </h2>
              <p
                className={`text-sm ${isDark ? "text-white/60" : "text-gray-600"} mb-1 transition-colors duration-300`}
              >
                {role}
              </p>
              <div
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isDark ? "bg-white/5 text-white/80 border-white/10" : "bg-gray-100 text-gray-700 border-gray-200"} border transition-all duration-300`}
              >
                ID: {employeeId}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-3">
            {/* Department */}
            <div
              className={`flex items-center p-3 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"} rounded-lg border transition-all duration-300 hover:scale-[1.02]`}
            >
              <Building2
                className={`w-5 h-5 ${isDark ? "text-white/40" : "text-gray-500"} mr-3 transition-colors duration-300`}
              />
              <div>
                <div
                  className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"} uppercase tracking-wide transition-colors duration-300`}
                >
                  Department
                </div>
                <div
                  className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-800"} transition-colors duration-300`}
                >
                  {department}
                </div>
              </div>
            </div>

            {/* Email */}
            <div
              className={`flex items-center p-3 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"} rounded-lg border transition-all duration-300 hover:scale-[1.02]`}
            >
              <Mail
                className={`w-5 h-5 ${isDark ? "text-white/40" : "text-gray-500"} mr-3 transition-colors duration-300`}
              />
              <div>
                <div
                  className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"} uppercase tracking-wide transition-colors duration-300`}
                >
                  Email
                </div>
                <div
                  className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-800"} transition-colors duration-300`}
                >
                  {email}
                </div>
              </div>
            </div>

            {/* Access Level */}
            <div
              className={`flex items-center p-3 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"} rounded-lg border transition-all duration-300 hover:scale-[1.02]`}
            >
              <Shield
                className={`w-5 h-5 ${isDark ? "text-white/40" : "text-gray-500"} mr-3 transition-colors duration-300`}
              />
              <div>
                <div
                  className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"} uppercase tracking-wide transition-colors duration-300`}
                >
                  Access Level
                </div>
                <div
                  className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-800"} transition-colors duration-300`}
                >
                  {accessLevel}
                </div>
              </div>
            </div>

            {/* Validity Period */}
            <div
              className={`flex items-center p-3 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"} rounded-lg border transition-all duration-300 hover:scale-[1.02]`}
            >
              <Calendar
                className={`w-5 h-5 ${isDark ? "text-white/40" : "text-gray-500"} mr-3 transition-colors duration-300`}
              />
              <div>
                <div
                  className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"} uppercase tracking-wide transition-colors duration-300`}
                >
                  Valid Period
                </div>
                <div
                  className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-800"} transition-colors duration-300`}
                >
                  {formatDate(issueDate)} - {formatDate(expiryDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div
            className={`mt-6 pt-6 border-t ${isDark ? "border-white/10" : "border-gray-200"} transition-colors duration-300`}
          >
            <div
              className={`flex items-center justify-between p-4 ${isDark ? "bg-white/5 border-white/10" : "bg-green-50 border-green-200"} rounded-lg border transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-center">
                <Fingerprint
                  className={`w-6 h-6 ${isDark ? "text-green-400" : "text-green-600"} mr-3 transition-colors duration-300`}
                />
                <div>
                  <div
                    className={`text-sm font-medium ${isDark ? "text-green-400" : "text-green-700"} transition-colors duration-300`}
                  >
                    Biometric Verified
                  </div>
                  <div
                    className={`text-xs ${isDark ? "text-green-500" : "text-green-600"} transition-colors duration-300`}
                  >
                    Security clearance active
                  </div>
                </div>
              </div>
              <div
                className={`w-3 h-3 ${isDark ? "bg-green-400" : "bg-green-500"} rounded-full animate-pulse transition-colors duration-300`}
              ></div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`mt-6 pt-4 border-t ${isDark ? "border-white/10" : "border-gray-200"} text-center transition-colors duration-300`}
          >
            <p className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"} transition-colors duration-300`}>
              This card remains property of the organization.
              <br />
              Report if lost or stolen immediately.
            </p>
          </div>
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

export default function MacOsIdCardPage() {
  const [showCode, setShowCode] = useState(false)
  const [cardData, setCardData] = useState({
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    department: "Engineering",
    employeeId: "ENG001",
    email: "sarah.johnson@company.com",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    accessLevel: "Level 3 - Senior",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=80&h=80&fit=crop&crop=face",
    theme: "dark" as "dark" | "light",
  })

  const presetEmployees = [
    {
      name: "Sarah Johnson",
      role: "Senior Software Engineer",
      department: "Engineering",
      employeeId: "ENG001",
      email: "sarah.johnson@company.com",
      accessLevel: "Level 3 - Senior",
      photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      department: "Product",
      employeeId: "PM002",
      email: "michael.chen@company.com",
      accessLevel: "Level 4 - Executive",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      department: "Design",
      employeeId: "DES003",
      email: "emily.rodriguez@company.com",
      accessLevel: "Level 2 - Standard",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "David Kim",
      role: "Security Analyst",
      department: "Security",
      employeeId: "SEC004",
      email: "david.kim@company.com",
      accessLevel: "Level 5 - Critical",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    },
  ]

  const handlePresetChange = (preset: (typeof presetEmployees)[0]) => {
    setCardData({
      ...cardData,
      ...preset,
      issueDate: "2024-01-15",
      expiryDate: "2025-01-15",
    })
  }

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-6xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="  text-white/60 hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Documentation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              macOS ID Card
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              A beautiful employee ID card component with authentic macOS window styling, complete with interactive
              controls and theme switching.
            </p>
          </div>

          {/* Interactive Preview */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Preview */}
            <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Live Preview
                </h2>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-white/[0.2] bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors backdrop-blur-sm"
                >
                  <Code className="h-4 w-4" />
                  {showCode ? "Hide Code" : "View Code"}
                </button>
              </div>

              {/* Card Preview */}
              <div className="flex items-center justify-center p-8 rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <MacOsIdCard {...cardData} />
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCardData({ ...cardData, theme: cardData.theme === "dark" ? "light" : "dark" })}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-colors"
                >
                  <Palette className="h-4 w-4" />
                  Toggle Theme
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Print Card
                </button>
              </div>

              {showCode && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white/90">Component Code</h3>
                  <CodeBlock language="tsx">
                    {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">MacOsIdCard</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/MacOsIdCard"</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">EmployeePage</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">MacOsIdCard</span>
      <span class="text-[#92c5f7]">name</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"${cardData.name}"</span>
      <span class="text-[#92c5f7]">role</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"${cardData.role}"</span>
      <span class="text-[#92c5f7]">department</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"${cardData.department}"</span>
      <span class="text-[#92c5f7]">theme</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"${cardData.theme}"</span>
    <span class="text-[#d4d4d4]">/&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`}
                  </CodeBlock>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Employee Presets */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <h3 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Employee Presets
                </h3>
                <div className="grid gap-3">
                  {presetEmployees.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetChange(preset)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] transition-all text-left"
                    >
                      <img
                        src={preset.photoUrl || "/placeholder.svg"}
                        alt={preset.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-white/90">{preset.name}</div>
                        <div className="text-xs text-white/60">{preset.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Controls */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <h3 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Customization
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Theme</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCardData({ ...cardData, theme: "dark" })}
                        className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                          cardData.theme === "dark"
                            ? "bg-white/[0.1] border-white/[0.2] text-white"
                            : "bg-white/[0.02] border-white/[0.05] text-white/60 hover:bg-white/[0.05]"
                        }`}
                      >
                        Dark
                      </button>
                      <button
                        onClick={() => setCardData({ ...cardData, theme: "light" })}
                        className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                          cardData.theme === "light"
                            ? "bg-white/[0.1] border-white/[0.2] text-white"
                            : "bg-white/[0.02] border-white/[0.05] text-white/60 hover:bg-white/[0.05]"
                        }`}
                      >
                        Light
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Role</label>
                    <input
                      type="text"
                      value={cardData.role}
                      onChange={(e) => setCardData({ ...cardData, role: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Department</label>
                    <select
                      value={cardData.department}
                      onChange={(e) => setCardData({ ...cardData, department: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Security">Security</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Access Level</label>
                    <select
                      value={cardData.accessLevel}
                      onChange={(e) => setCardData({ ...cardData, accessLevel: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                      <option value="Level 1 - Basic">Level 1 - Basic</option>
                      <option value="Level 2 - Standard">Level 2 - Standard</option>
                      <option value="Level 3 - Senior">Level 3 - Senior</option>
                      <option value="Level 4 - Executive">Level 4 - Executive</option>
                      <option value="Level 5 - Critical">Level 5 - Critical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Component Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                    <Eye className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Authentic macOS Design</h3>
                </div>
                <p className="text-sm text-white/60">
                  Perfect recreation of macOS window styling with traffic light controls and native aesthetics.
                </p>
              </div>

              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                    <Palette className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Theme Support</h3>
                </div>
                <p className="text-sm text-white/60">
                  Built-in dark and light theme support with smooth transitions and proper contrast ratios.
                </p>
              </div>

              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Security Features</h3>
                </div>
                <p className="text-sm text-white/60">
                  Includes biometric verification status, access levels, and security clearance indicators.
                </p>
              </div>

              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30">
                    <User className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Employee Information</h3>
                </div>
                <p className="text-sm text-white/60">
                  Comprehensive employee data display including photo, contact info, and organizational details.
                </p>
              </div>

              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Validity Tracking</h3>
                </div>
                <p className="text-sm text-white/60">
                  Built-in date formatting and validity period tracking for compliance and security.
                </p>
              </div>

              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                    <Settings className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Fully Customizable</h3>
                </div>
                <p className="text-sm text-white/60">
                  TypeScript interfaces and props for complete customization of all employee data and styling.
                </p>
              </div>
            </div>
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
                    <th className="text-left p-4 font-semibold text-white/90">Prop</th>
                    <th className="text-left p-4 font-semibold text-white/90">Type</th>
                    <th className="text-left p-4 font-semibold text-white/90">Required</th>
                    <th className="text-left p-4 font-semibold text-white/90">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">name</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Employee's full name</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">role</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Job title or position</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">department</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Department or team</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">employeeId</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Unique employee identifier</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">email</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Contact email address</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">accessLevel</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Security clearance level</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">photoUrl</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Profile photo URL</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">issueDate</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Card issue date (ISO format)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">expiryDate</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">string</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-white/70">Card expiry date (ISO format)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">theme</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">'dark' | 'light'</td>
                    <td className="p-4 text-center">—</td>
                    <td className="p-4 text-white/70">Visual theme (default: 'dark')</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
