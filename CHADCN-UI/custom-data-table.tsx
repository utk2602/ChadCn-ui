"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Search, ArrowLeft, ArrowRight, X } from "lucide-react"

const USERS_DATA = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", status: "Active", lastLogin: "2023-05-12" },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-15",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2023-04-28",
  },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Admin", status: "Active", lastLogin: "2023-05-18" },
  {
    id: 5,
    name: "James Wilson",
    email: "james@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-10",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    email: "jessica@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2023-04-15",
  },
  {
    id: 7,
    name: "David Martinez",
    email: "david@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-05-17",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    role: "Viewer",
    status: "Active",
    lastLogin: "2023-05-11",
  },
]

type User = {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

type SortConfig = {
  key: keyof User | null
  direction: "ascending" | "descending"
}

export default function CustomDataTable() {
  const [data] = useState<User[]>(USERS_DATA)
  const [filteredData, setFilteredData] = useState<User[]>(USERS_DATA)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "ascending" })
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const results = data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.status.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredData(results)
      setCurrentPage(1)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, data])

  // Handle sorting
  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
    setIsLoading(true)

    setTimeout(() => {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1
        }
        return 0
      })

      setFilteredData(sortedData)
      setIsLoading(false)
    }, 200)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const getSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) {
      return (
        <div className="w-3 h-3 opacity-0 group-hover:opacity-30 transition-opacity">
          <ChevronUp size={12} />
        </div>
      )
    }

    if (sortConfig.direction === "ascending") {
      return <ChevronUp size={12} className="text-emerald-500" />
    }

    return <ChevronDown size={12} className="text-emerald-500" />
  }

  return (
    <div className="w-full backdrop-blur-sm bg-white/80 rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Search bar */}
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500 font-light">{filteredData.length} users</div>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              {["name", "email", "role", "status", "lastLogin"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort(key as keyof User)}
                >
                  <div className="flex items-center gap-1">
                    <span>{key === "lastLogin" ? "Last Login" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    {getSortIcon(key as keyof User)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y divide-gray-100 ${isLoading ? "opacity-50" : "opacity-100"} transition-opacity duration-200`}
          >
            {currentItems.length > 0 ? (
              currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-emerald-50/30 transition-colors duration-150">
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="font-medium text-sm text-gray-800">{user.name}</div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs text-gray-500">{user.email}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs">
                    <span
                      className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                        user.role === "Admin"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : user.role === "Editor"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
            currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft size={12} />
          Prev
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-6 h-6 rounded-full text-xs transition-all duration-200 ${
                currentPage === page ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
            currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Next
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
