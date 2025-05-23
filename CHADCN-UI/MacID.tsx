"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, Building2, Fingerprint, Shield, Calendar } from "lucide-react"

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

export function MacOsIdCard({
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

  // Format dates to be more readable
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
      {/* macOS Window Container - Dark Mode */}
      <div className="bg-black rounded-lg shadow-lg border border-gray-800 overflow-hidden">
        {/* macOS Title Bar */}
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-sm font-medium text-gray-300">Employee ID Card</h1>
          </div>
          <div className="w-14"></div> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700">
                <Image
                  src={photoUrl || "/placeholder.svg"}
                  alt={name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-1">{name}</h2>
              <p className="text-sm text-gray-400 mb-1">{role}</p>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                ID: {employeeId}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {/* Department */}
              <div className="flex items-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Department</div>
                  <div className="text-sm font-medium text-gray-300">{department}</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Email</div>
                  <div className="text-sm font-medium text-gray-300">{email}</div>
                </div>
              </div>

              {/* Access Level */}
              <div className="flex items-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                <Shield className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Access Level</div>
                  <div className="text-sm font-medium text-gray-300">{accessLevel}</div>
                </div>
              </div>

              {/* Validity Period */}
              <div className="flex items-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Valid Period</div>
                  <div className="text-sm font-medium text-gray-300">
                    {formatDate(issueDate)} - {formatDate(expiryDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-green-900">
              <div className="flex items-center">
                <Fingerprint className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-green-400">Biometric Verified</div>
                  <div className="text-xs text-green-600">Security clearance active</div>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
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
