import { useState, useEffect } from "react"
import { Mail, Building2, Fingerprint, Shield, Calendar } from "lucide-react"

// Minimal MacOS ID Card Component
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

  return (
    <div className="w-full max-w-md mx-auto">
      {/* macOS Window Container */}
      <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
        {/* macOS Title Bar */}
        <div className="bg-black border-b border-white/10 px-4 py-3 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-sm font-medium text-white/60">Employee ID Card</h1>
          </div>
          <div className="w-14"></div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/5 border border-white/10">
                <img
                  src={photoUrl || "https://via.placeholder.com/80x80/000000/FFFFFF?text=User"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-1">{name}</h2>
              <p className="text-sm text-white/60 mb-1">{role}</p>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-white/80 border border-white/10">
                ID: {employeeId}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-3">
            {/* Department */}
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <Building2 className="w-5 h-5 text-white/40 mr-3" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wide">Department</div>
                <div className="text-sm font-medium text-white/80">{department}</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <Mail className="w-5 h-5 text-white/40 mr-3" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wide">Email</div>
                <div className="text-sm font-medium text-white/80">{email}</div>
              </div>
            </div>

            {/* Access Level */}
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <Shield className="w-5 h-5 text-white/40 mr-3" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wide">Access Level</div>
                <div className="text-sm font-medium text-white/80">{accessLevel}</div>
              </div>
            </div>

            {/* Validity Period */}
            <div className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-white/40 mr-3" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wide">Valid Period</div>
                <div className="text-sm font-medium text-white/80">
                  {formatDate(issueDate)} - {formatDate(expiryDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center">
                <Fingerprint className="w-6 h-6 text-white/60 mr-3" />
                <div>
                  <div className="text-sm font-medium text-white/80">Biometric Verified</div>
                  <div className="text-xs text-white/40">Security clearance active</div>
                </div>
              </div>
              <div className="w-3 h-3 bg-white/60 rounded-full"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-white/40">
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

// Example usage
export default function App() {
  const sampleData = {
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    department: "Engineering",
    employeeId: "ENG001",
    email: "sarah.johnson@company.com",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    accessLevel: "Level 3 - Senior",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=80&h=80&fit=crop&crop=face"
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <MacOsIdCard {...sampleData} />
    </div>
  )
}