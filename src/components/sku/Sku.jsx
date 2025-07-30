"use client"
import React, { useState, useMemo, useCallback, memo } from "react"
// eslint-disable-next-line no-unused-vars
import { animated, useSpring, useTrail } from "@react-spring/web"
import {
  Calendar,
  Code,
  FileText,
  Tag,
  Clock,
  Database,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Trash2,
  Filter,
  X,
  Grid,
  List,
} from "lucide-react"

// Sample data with multiple items
const sampleData = [
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b51",
    code: "TEST_cssa",
    descs: "Product description A",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e66",
      code: "ABC123",
      descs: "Electronics Category",
    },
    createdate: "2025-07-30T02:32:16.984867",
    updatedate: null,
  },
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b52",
    code: "PROD_001",
    descs: "Premium wireless headphones",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e67",
      code: "AUDIO",
      descs: "Audio Equipment",
    },
    createdate: "2025-07-29T14:22:10.123456",
    updatedate: "2025-07-30T09:15:30.654321",
  },
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b53",
    code: "SKU_mobile",
    descs: "Smartphone with advanced camera",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e68",
      code: "MOBILE",
      descs: "Mobile Devices",
    },
    createdate: "2025-07-28T11:45:22.789012",
    updatedate: null,
  },
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b54",
    code: "LAPTOP_pro",
    descs: "High-performance gaming laptop",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e69",
      code: "COMP",
      descs: "Computers",
    },
    createdate: "2025-07-27T16:30:45.345678",
    updatedate: "2025-07-29T12:20:15.987654",
  },
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b55",
    code: "WATCH_smart",
    descs: "Fitness tracking smartwatch",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e70",
      code: "WEAR",
      descs: "Wearables",
    },
    createdate: "2025-07-26T08:15:33.456789",
    updatedate: null,
  },
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b56",
    code: "CAM_dslr",
    descs: "Professional DSLR camera",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e71",
      code: "PHOTO",
      descs: "Photography",
    },
    createdate: "2025-07-25T13:42:18.234567",
    updatedate: "2025-07-28T10:30:22.876543",
  },
  {
    id: "635bad59-a700-4f0a-b951-94ad90eb5b57",
    code: "TABLET_pro",
    descs: "Professional drawing tablet",
    category: {
      id: "6c1d85ec-f790-4d47-b1d1-ded83f389e72",
      code: "TABLET",
      descs: "Tablets",
    },
    createdate: "2025-07-24T19:25:41.567890",
    updatedate: null,
  },
]

// Optimized filter component with memo
const FilterSection = memo(({ filters, onFilterChange, onClearFilters, uniqueCategories }) => {
  const hasActiveFilters = filters.code || filters.descs || filters.category

  return (
    <div className="backdrop-blur-xl bg-gray-900/30 border border-gray-700/50 rounded-3xl p-8 mb-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="w-6 h-6 text-blue-400" />
          <h3 className="text-white font-bold text-xl">Filters</h3>
          {hasActiveFilters && (
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">Active</span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-300 text-sm font-medium border border-red-500/30"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="flex items-center space-x-3 text-gray-300 text-sm font-semibold">
            <Code className="w-5 h-5 text-blue-400" />
            <span>Filter by Code</span>
          </label>
          <input
            type="text"
            placeholder="Enter SKU code..."
            value={filters.code}
            onChange={(e) => onFilterChange("code", e.target.value)}
            className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-sm transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 text-gray-300 text-sm font-semibold">
            <FileText className="w-5 h-5 text-green-400" />
            <span>Filter by Description</span>
          </label>
          <input
            type="text"
            placeholder="Enter description..."
            value={filters.descs}
            onChange={(e) => onFilterChange("descs", e.target.value)}
            className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-sm transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 text-gray-300 text-sm font-semibold">
            <Tag className="w-5 h-5 text-purple-400" />
            <span>Filter by Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-gray-800/50 border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm transition-all duration-300"
          >
            <option value="" className="bg-gray-900">
              All Categories
            </option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category} className="bg-gray-900">
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
})

FilterSection.displayName = "FilterSection"

// Optimized card component with memo
const SkuCard = memo(({ item, style, formatDate, handleClick	 }) => (
  <animated.div style={style} className="group relative">
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/25">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
            <Database className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{item.code}</h2>
            <p className="text-slate-300 text-sm">ID: {item.id.slice(0, 8)}...</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-medium">
            Active
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-300" />
            <span className="text-slate-300 text-sm font-medium">Description</span>
          </div>
          <p className="text-white text-lg pl-6">{item.descs}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-green-300" />
            <span className="text-slate-300 text-sm font-medium">Category</span>
          </div>
          <div className="pl-6 space-y-2">
            <div className="flex items-center space-x-2">
              <Code className="w-3 h-3 text-purple-300" />
              <span className="text-white font-mono text-sm">{item.category.code}</span>
            </div>
            <p className="text-slate-300 text-sm">{item.category.descs}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Calendar className="w-4 h-4 text-blue-300" />
          </div>
          <div>
            <p className="text-slate-400 text-xs">Created</p>
            <p className="text-white text-sm font-medium">{formatDate(item.createdate)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-500/20">
            <Clock className="w-4 h-4 text-slate-300" />
          </div>
          <div>
            <p className="text-slate-400 text-xs">Updated</p>
            <p className="text-white text-sm font-medium">
              {item.updatedate ? formatDate(item.updatedate) : "Never"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-sm" onClick={() => handleClick("edit", item)}>
          Edit
        </button>
        <button className="flex-1 py-3 px-6 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm" onClick={() => handleClick("view", item)}>
          View Details
        </button>
      </div>
    </div>
  </animated.div>
))

SkuCard.displayName = "SkuCard"

// Optimized table row component with memo
const TableRow = memo(({ item, style, formatDate, handleClick }) => (
  <animated.tr style={style} className="hover:bg-white/5 transition-all duration-300 group h-20">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <Database className="w-4 h-4 text-purple-300" />
        </div>
        <div>
          <div className="text-white font-medium">{item.code}</div>
          <div className="text-slate-400 text-xs">{item.id.slice(0, 8)}...</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="text-white max-w-xs truncate" title={item.descs}>
        {item.descs}
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="space-y-1">
        <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
          {item.category.code}
        </div>
        <div className="text-slate-400 text-xs">{item.category.descs}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-white text-sm">{formatDate(item.createdate)}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-white text-sm">
        {item.updatedate ? (
          <span className="text-green-300">{formatDate(item.updatedate)}</span>
        ) : (
          <span className="text-slate-400">Never</span>
        )}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center">
      <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors duration-200" onClick={() => handleClick("view", item)}>
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors duration-200" onClick={() => handleClick("edit", item)}>
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors duration-200" onClick={() => handleClick("delete", item)}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </animated.tr>
))

TableRow.displayName = "TableRow"

// Main SKU component
const Sku = () => {
  const [viewMode, setViewMode] = useState("table") // "table" or "cards"
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [filters, setFilters] = useState({
    code: "",
    descs: "",
    category: "",
  })

  // Memoized format date function
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [])

  // Memoized unique categories
  const uniqueCategories = useMemo(() => {
    return [...new Set(sampleData.map((item) => item.category.code))]
  }, [])

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const codeMatch = item.code.toLowerCase().includes(filters.code.toLowerCase())
      const descsMatch = item.descs.toLowerCase().includes(filters.descs.toLowerCase())
      const categoryMatch = filters.category === "" || item.category.code === filters.category

      return codeMatch && descsMatch && categoryMatch
    })
  }, [filters])

  // Memoized pagination data
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    return {
      totalPages,
      startIndex,
      endIndex,
      currentData,
    }
  }, [filteredData, currentPage, itemsPerPage])

  // Optimized callbacks
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page)
    }
  }, [paginationData.totalPages])

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setCurrentPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      code: "",
      descs: "",
      category: "",
    })
    setCurrentPage(1)
  }, [])

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode)
  }, [])

	const handleClick = useCallback((mode, data) => {
		if (mode === "view") {
			console.log(data)
		} else if (mode === "edit") {
			console.log(data)
		} else if (mode === "delete") {
			console.log(data)
		}
	}, [])

  // Animations
  const containerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  })

  const cardTrail = useTrail(paginationData.currentData.length, {
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 280, friction: 60 },
    delay: 200,
  })

  const tableRowTrail = useTrail(paginationData.currentData.length, {
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 280, friction: 60 },
  })

  // Generate empty rows for table view
  const emptyRowsCount = Math.max(0, itemsPerPage - paginationData.currentData.length)
  const emptyRows = useMemo(() => Array(emptyRowsCount).fill(null), [emptyRowsCount])

  return (
    <div className="min-h-screen p-6">
      <animated.div style={containerSpring} className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                SKU Management
              </h1>
              <p className="text-gray-400 text-lg">Manage your product inventory with precision and elegance</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* View Mode Toggle */}
              <div className="backdrop-blur-xl bg-gray-900/50 border border-gray-700/50 rounded-2xl p-3 flex space-x-3 shadow-2xl">
                <button
                  onClick={() => handleViewModeChange("table")}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span>Table View</span>
                </button>
                <button
                  onClick={() => handleViewModeChange("cards")}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${
                    viewMode === "cards"
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  <span>Card View</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          uniqueCategories={uniqueCategories}
        />

        {/* Stats Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex space-x-4">
            <div className="backdrop-blur-xl bg-gray-900/50 border border-gray-700/50 rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-gray-400 text-sm font-medium">Total Records: </span>
              <span className="text-white font-bold text-lg">{filteredData.length}</span>
            </div>
            <div className="backdrop-blur-xl bg-gray-900/50 border border-gray-700/50 rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-gray-400 text-sm font-medium">Showing: </span>
              <span className="text-white font-bold text-lg">
                {paginationData.startIndex + 1}-{Math.min(paginationData.endIndex, filteredData.length)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === "cards" ? (
          /* Card View */
          <div className="grid gap-8">
            {cardTrail.map((style, index) => {
              const item = paginationData.currentData[index]
              if (!item) return null

              return (
                <SkuCard
                  key={item.id}
                  item={item}
                  style={style}
                  formatDate={formatDate}
                  handleClick={handleClick}
                />
              )
            })}
          </div>
        ) : (
          /* Table View */
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4" />
                        <span>SKU Code</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Description</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4" />
                        <span>Category</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Created</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibtml-300 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Updated</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10" style={{ minHeight: `${itemsPerPage * 80}px` }}>
                  {tableRowTrail.map((style, index) => {
                    const item = paginationData.currentData[index]
                    if (!item) return null

	return (
                      <TableRow
                        key={item.id}
                        item={item}
                        style={style}
                        formatDate={formatDate}
                        handleClick={handleClick}
                      />
                    )
                  })}

                  {emptyRows.map((_, index) => (
                    <tr key={`empty-${index}`} className="h-20">
                      <td colSpan="6" className="px-6 py-4"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {paginationData.totalPages > 1 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl px-6 py-4 mt-8">
            <div className="flex items-center justify-between">
              <div className="text-slate-300 text-sm">
                Showing {Math.min(paginationData.startIndex + 1, filteredData.length)} to{" "}
                {Math.min(paginationData.endIndex, filteredData.length)} of {filteredData.length} results
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <span className="text-white font-medium">
                    {currentPage} / {paginationData.totalPages}
                  </span>
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === paginationData.totalPages}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </animated.div>
		</div>
	)
}

export default Sku