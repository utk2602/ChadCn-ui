"use client"

import { useEffect, useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Search,
  ArrowLeft,
  ArrowRight,
  X,
  Moon,
  Sun,
} from "lucide-react"

const USERS_DATA = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", status: "Active", lastLogin: "2023-05-12" },
  { id: 2, name: "Sarah Williams", email: "sarah@example.com", role: "Editor", status: "Active", lastLogin: "2023-05-15" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Viewer", status: "Inactive", lastLogin: "2023-04-28" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Admin", status: "Active", lastLogin: "2023-05-18" },
  { id: 5, name: "James Wilson", email: "james@example.com", role: "Editor", status: "Active", lastLogin: "2023-05-10" },
  { id: 6, name: "Jessica Taylor", email: "jessica@example.com", role: "Viewer", status: "Inactive", lastLogin: "2023-04-15" },
  { id: 7, name: "David Martinez", email: "david@example.com", role: "Editor", status: "Active", lastLogin: "2023-05-17" },
  { id: 8, name: "Lisa Anderson", email: "lisa@example.com", role: "Viewer", status: "Active", lastLogin: "2023-05-11" },
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
  const [darkMode, setDarkMode] = useState(false)

  const itemsPerPage = 5

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const results = data.filter((user) =>
        [user.name, user.email, user.role, user.status].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      setFilteredData(results)
      setCurrentPage(1)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, data])

  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
    setIsLoading(true)

    setTimeout(() => {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1
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

  const getSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) return <ChevronUp size={12} className="opacity-20 group-hover:opacity-50" />
    return sortConfig.direction === "ascending"
      ? <ChevronUp size={12} className="text-emerald-500" />
      : <ChevronDown size={12} className="text-emerald-500" />
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-xl transition-all duration-300">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-3">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white border border-gray-200 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">{filteredData.length} users</span>
            
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-zinc-800">
              <tr>
                {["name", "email", "role", "status", "lastLogin"].map((key) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key as keyof User)}
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-1">
                      <span>{key === "lastLogin" ? "Last Login" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      {getSortIcon(key as keyof User)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`${isLoading ? "opacity-50" : "opacity-100"} transition-opacity divide-y divide-gray-100 dark:divide-zinc-700`}>
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.id} className="hover:bg-emerald-50/30 dark:hover:bg-zinc-800 transition duration-150">
                    <td className="px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200">{user.name}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="px-4 py-2.5 text-xs">
                      <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                        user.role === "Admin"
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                          : user.role === "Editor"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                          : "bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-600"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                        user.status === "Active"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition ${
              currentPage === 1
                ? "text-gray-300 dark:text-zinc-600 cursor-not-allowed"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
          >
            <ArrowLeft size={12} /> Prev
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded-full text-xs transition ${
                  currentPage === page
                    ? "bg-emerald-500 text-white shadow"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition ${
              currentPage === totalPages
                ? "text-gray-300 dark:text-zinc-600 cursor-not-allowed"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
          >
            Next <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
