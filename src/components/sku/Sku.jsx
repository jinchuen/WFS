"use client"
import React, { useState, useMemo, useCallback, useEffect } from "react"
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
  Plus,
  Save,
  Search,
  Download,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  RefreshCw,
  Hash,
} from "lucide-react"
import { Sku as SkuService } from "../../services/sku/sku"
import { getCategory } from "../../services/sku/category"
import { toast } from 'react-toastify'
import Select from 'react-select'

// Enhanced Modal Component
function Modal({ isOpen, onClose, title, children }) {
  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.95)",
    config: { tension: 300, friction: 30 },
  })

  const backdropAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    backdropFilter: isOpen ? "blur(12px)" : "blur(0px)",
    config: { tension: 300, friction: 30 },
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <animated.div style={backdropAnimation} className="absolute inset-0 bg-black/40" onClick={onClose} />
      <animated.div
        style={modalAnimation}
        className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </animated.div>
      </div>
  )
}

// Enhanced Form Component for SKU
function SkuForm({ record, onSave, onCancel, isLoading, categories }) {
  const [formData, setFormData] = useState({
    code: record?.code || "",
    descs: record?.descs || "",
    categoryId: record?.category?.id || "",
  })

  // Prepare options for react-select
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: `${category.code} - ${category.descs}`
  }))

  // Find selected category for react-select
  const selectedCategory = categoryOptions.find(option => option.value === formData.categoryId) || null

  // Custom styles for react-select to match the dark theme
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      borderColor: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(75, 85, 99, 0.5)',
      borderRadius: '0.75rem',
      padding: '0.5rem',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
      '&:hover': {
        borderColor: 'rgba(59, 130, 246, 0.5)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(17, 24, 39)',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      borderRadius: '0.75rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'rgba(59, 130, 246, 0.2)' 
        : state.isFocused 
        ? 'rgba(75, 85, 99, 0.3)' 
        : 'transparent',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(156, 163, 175, 1)',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="code" className="block text-sm font-medium text-gray-300">
          SKU Code
          </label>
          <input
            type="text"
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            placeholder="Enter SKU code..."
          required
          />
        </div>
      <div className="space-y-2">
        <label htmlFor="descs" className="block text-sm font-medium text-gray-300">
          Description
          </label>
        <textarea
          id="descs"
          value={formData.descs}
          onChange={(e) => setFormData({ ...formData, descs: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
            placeholder="Enter description..."
          required
          />
        </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Category
          </label>
        <Select
          value={selectedCategory}
          onChange={(option) => setFormData({ ...formData, categoryId: option?.value || "" })}
          options={categoryOptions}
          styles={customStyles}
          placeholder="Select a category..."
          isClearable
          isSearchable
          required
        />
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-600/50 rounded-xl hover:bg-gray-700/50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  )
}

// Delete Confirmation Component
function DeleteConfirmation({ record, onConfirm, onCancel, isLoading }) {
  const handleConfirm = async () => {
    onConfirm()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
          <Trash2 className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-gray-300 text-lg">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white bg-gray-800/50 px-2 py-1 rounded">{record?.code}</span>?
        </p>
        <p className="text-gray-400 text-sm mt-2">This action cannot be undone.</p>
        </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-600/50 rounded-xl hover:bg-gray-700/50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  )
}

// Loading Skeleton Component
function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-4 p-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4 p-4">
          <div className="rounded-full bg-gray-700/50 h-4 w-4"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
        </div>
      </div>
      ))}
      </div>
  )
}

// Enhanced Pagination Component for Server-side pagination
function EnhancedPagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, totalItems, startIndex, endIndex }) {
  const [jumpToPage, setJumpToPage] = useState("")

  const handleJumpToPage = (e) => {
    e.preventDefault()
    const page = Number.parseInt(jumpToPage)
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
      setJumpToPage("")
    }
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-8">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
          {totalItems} entries
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-300 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-300 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentPage === page
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : page === "..."
                    ? "text-gray-500 cursor-default"
                    : "text-gray-300 bg-gray-800/50 border border-gray-600/50 hover:bg-gray-700/50"
              }`}
            >
              {page === "..." ? <MoreHorizontal className="w-4 h-4" /> : page}
            </button>
          ))}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-300 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-300 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>

        {/* Jump to Page */}
        <form onSubmit={handleJumpToPage} className="flex items-center gap-2 ml-4">
          <span className="text-sm text-gray-400">Go to:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            className="w-16 px-2 py-1 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="1"
          />
        </form>
      </div>
    </div>
  )
}





// Main SKU component
const Sku = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("sku_currentPage")
    return saved ? Number(saved) : 1
  })
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem("sku_itemsPerPage")
    return saved ? Number(saved) : 5
  })
  const [filters, setFilters] = useState({
    code: "",
    descs: "",
    category: "",
  })
  
  // Data state
  const [skuList, setSkuList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("sku_searchTerm") || ""
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Server-side pagination state
  const [paginationInfo, setPaginationInfo] = useState({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false
  })

  // Modal and CRUD state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  
  // Separate loading states for different operations
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  


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



  // Build API parameters for server-side filtering and pagination
  const buildApiParams = useCallback(() => {
    const params = {
      pageNumber: currentPage,
      pageSize: itemsPerPage,
    }

    // Add filters
    if (searchTerm.trim()) {
      params.code = searchTerm.trim()
      params.descs = searchTerm.trim()
    }
    if (filters.code.trim()) {
      params.code = filters.code.trim()
    }
    if (filters.descs.trim()) {
      params.descs = filters.descs.trim()
    }
    if (filters.category) {
      // Find the category ID from the selected category code
      const selectedCategory = categoryList.find(cat => cat.code === filters.category)
      if (selectedCategory) {
        params.categoryId = selectedCategory.id
      }
    }

    return params
  }, [currentPage, itemsPerPage, searchTerm, filters.code, filters.descs, filters.category, categoryList])

  // Server-side pagination data
  const paginationData = useMemo(() => {
    return {
      totalPages: paginationInfo.totalPages,
      currentPage: paginationInfo.currentPage,
      startIndex: (paginationInfo.currentPage - 1) * itemsPerPage,
      endIndex: paginationInfo.currentPage * itemsPerPage,
      currentData: skuList,
      hasNextPage: paginationInfo.hasNextPage,
      hasPrevPage: paginationInfo.hasPrevPage,
    }
  }, [paginationInfo, itemsPerPage, skuList])

  // CRUD Operations
  const handleCreate = async (data) => {
    const model = {
      operation: 'create',
      data: {
        code: data.code,
        descs: data.descs,
        categoryId: data.categoryId,
      }
    }
    try {
      setIsCreating(true)
      const newSku = await SkuService.createUpdateSku(model)
      setIsCreateModalOpen(false)
      setSelectedRecord(null)
      toast.success(`SKU ${newSku.code} created successfully!`)
      // Refresh the data after successful creation
      handleRefresh()
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message
      toast.error(errorMsg || "An unknown error occurred while creating SKU. Please try again later.")
    } finally {
      setIsCreating(false)
    }
  }

  const handleEdit = async (data) => {
    const model = {
      operation: 'update',
      data: {
        id: selectedRecord.id,
        code: data.code,
        descs: data.descs,
        categoryId: data.categoryId,
      }
    }
    try {
      setIsEditing(true)
      const updatedSku = await SkuService.createUpdateSku(model)
      setIsEditModalOpen(false)
      setSelectedRecord(null)
      toast.success(`SKU ${updatedSku.code} updated successfully!`)
      // Refresh the data after successful update
      handleRefresh()
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message
      toast.error(errorMsg || "An unknown error occurred while updating SKU. Please try again later.")
    } finally {
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    const model = {
      operation: 'delete',
      data: {
        id: selectedRecord.id,
      }
    }
    try {
      setIsDeleting(true)
      await SkuService.deleteSku(model)
      setIsDeleteModalOpen(false)
      setSelectedRecord(null)
      toast.success("SKU deleted successfully!")
      // Refresh the data after successful deletion
      handleRefresh()
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message
      toast.error(errorMsg || "An unknown error occurred while deleting SKU. Please try again later.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Export functionality (current page only)
  const handleExport = () => {
    const csvContent = [
      ["ID", "Code", "Description", "Category", "Created", "Updated"],
      ...skuList.map((item) => [
        item.id, 
        item.code, 
        item.descs, 
        item.category?.code || '', 
        item.createdate, 
        item.updatedate
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `skus_page_${paginationInfo.currentPage}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Fetch SKU data with pagination and filters
  const fetchSkuData = useCallback(async (showToast = false) => {
    if (isRefreshing) return
    setIsLoading(true)
    try {
      const params = buildApiParams()
      const [skuRes, categoryRes] = await Promise.all([
        SkuService.getSkuList(params),
        getCategory.getCategoryList()
      ])
      setSkuList(skuRes.data)
      setPaginationInfo(skuRes.pagination)
      setCategoryList(categoryRes)
      if (showToast) {
        toast.success("SKUs refreshed!")
      }
    } catch {
      toast.error("An unknown error occurred while fetching data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [buildApiParams, isRefreshing])



  // Refresh data
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    await fetchSkuData(true)
    setIsRefreshing(false)
  }, [fetchSkuData, isRefreshing])

  // Page change handlers (persist to localStorage)
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page)
      localStorage.setItem("sku_currentPage", String(page))
    }
  }, [paginationData.totalPages])

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    // Reset to first page when filters change
    setCurrentPage(1)
    localStorage.setItem("sku_currentPage", "1")
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      code: "",
      descs: "",
      category: "",
    })
    setSearchTerm("")
    setCurrentPage(1)
    localStorage.setItem("sku_currentPage", "1")
    localStorage.setItem("sku_searchTerm", "")
  }, [])

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    localStorage.setItem("sku_itemsPerPage", String(newItemsPerPage))
    localStorage.setItem("sku_currentPage", "1")
  }, [])

  const handleAddNewSku = useCallback(() => {
    setIsCreateModalOpen(true)
  }, [])

  const handleClick = useCallback((mode, data) => {
    if (mode === "view") {
      // TODO: Implement view functionality
    } else if (mode === "edit") {
      setSelectedRecord(data)
      setIsEditModalOpen(true)
    } else if (mode === "delete") {
      setSelectedRecord(data)
      setIsDeleteModalOpen(true)
    }
  }, [])

  // Single useEffect to handle all data fetching with proper debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSkuData()
    }, 300) // 300ms debounce for all changes

    return () => clearTimeout(timeoutId)
  }, [currentPage, itemsPerPage, searchTerm, filters.code, filters.descs, filters.category])

  // Handle search term changes and persist to localStorage
  useEffect(() => {
    localStorage.setItem("sku_searchTerm", searchTerm)
  }, [searchTerm])



  // Animation for the entire container
  const containerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  })

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
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-4 py-3 bg-gray-800/50 border border-gray-600/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all flex items-center gap-2 disabled:opacity-50"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>

                <button
                  onClick={handleExport}
                  className="px-4 py-3 bg-gray-800/50 border border-gray-600/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all flex items-center gap-2"
                  title="Export Data"
                >
                  <Download className="w-4 h-4" />
                </button>

              <button
                onClick={handleAddNewSku}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Add New SKU
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total SKUs</p>
                <p className="text-2xl font-bold text-white">{paginationInfo.totalCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Page Results</p>
                <p className="text-2xl font-bold text-white">{skuList.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Page</p>
                <p className="text-2xl font-bold text-white">
                  {currentPage} of {paginationData.totalPages}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-2xl font-bold text-white">{categoryList.length}</p>
            </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-orange-400" />
            </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-xl bg-gray-900/30 border border-gray-700/50 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Filter className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-bold text-xl">Filters</h3>
              {(filters.code || filters.descs || filters.category || searchTerm) && (
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">Active</span>
              )}
            </div>
            {(filters.code || filters.descs || filters.category || searchTerm) && (
              <button
                onClick={handleClearFilters}
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
                onChange={(e) => handleFilterChange("code", e.target.value)}
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
                onChange={(e) => handleFilterChange("descs", e.target.value)}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-sm transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 text-gray-300 text-sm font-semibold">
                <Tag className="w-5 h-5 text-purple-400" />
                <span>Filter by Category</span>
              </label>
              <Select
                value={filters.category ? { value: filters.category, label: filters.category } : null}
                onChange={(option) => handleFilterChange("category", option?.value || "")}
                options={categoryList.map(cat => ({ value: cat.code, label: `${cat.code} - ${cat.descs}` }))}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    borderColor: state.isFocused ? 'rgba(147, 51, 234, 0.5)' : 'rgba(75, 85, 99, 0.5)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    boxShadow: state.isFocused ? '0 0 0 2px rgba(147, 51, 234, 0.5)' : 'none',
                    '&:hover': {
                      borderColor: 'rgba(147, 51, 234, 0.5)',
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: 'rgb(17, 24, 39)',
                    border: '1px solid rgba(75, 85, 99, 0.5)',
                    borderRadius: '0.75rem',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected 
                      ? 'rgba(147, 51, 234, 0.2)' 
                      : state.isFocused 
                      ? 'rgba(75, 85, 99, 0.3)' 
                      : 'transparent',
                    color: 'white',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: 'rgba(156, 163, 175, 1)',
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                }}
                placeholder="All Categories"
                isClearable
                isSearchable
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {isLoading ? (
                <TableSkeleton rows={itemsPerPage} />
              ) : (
            <table className="w-full">
                  <thead className="sticky top-0 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 z-10">
                    <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          ID
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                          SKU Code
                    </div>
                  </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                          Description
                    </div>
                  </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                          Category
                    </div>
                  </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                          Created
                    </div>
                  </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                          Updated
                    </div>
                  </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {paginationData.currentData.map((item) => (
                      <tr
                      key={item.id}
                        className="transition-all duration-300 hover:bg-gray-700/20"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                            <span className="text-sm font-mono text-gray-300 bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-600/30">
                              {item.id.slice(0, 8)}...
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                              <Database className="w-4 h-4 text-purple-300" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{item.code}</div>
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
                              {item.category?.code || 'N/A'}
                            </div>
                            <div className="text-slate-400 text-xs">{item.category?.descs || 'No category'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(item.createdate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {item.updatedate ? (
                            <span className="text-green-300">{formatDate(item.updatedate)}</span>
                          ) : (
                            <span className="text-slate-400">Never</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleClick("view", item)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all transform hover:scale-110"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleClick("edit", item)}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all transform hover:scale-110"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleClick("delete", item)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all transform hover:scale-110"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Pagination */}
          <EnhancedPagination
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={paginationInfo.totalCount}
            startIndex={paginationData.startIndex}
            endIndex={paginationData.endIndex}
          />
      </animated.div>

      {/* Modals */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New SKU">
        <SkuForm 
          onSave={handleCreate} 
          onCancel={() => setIsCreateModalOpen(false)} 
          isLoading={isCreating} 
          categories={categoryList}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRecord(null)
        }}
        title="Edit SKU"
      >
        <SkuForm
          record={selectedRecord}
          onSave={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedRecord(null)
          }}
          isLoading={isEditing}
          categories={categoryList}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedRecord(null)
        }}
        title="Delete SKU"
      >
        {selectedRecord && (
          <DeleteConfirmation
            record={selectedRecord}
            onConfirm={handleDelete}
            onCancel={() => {
              setIsDeleteModalOpen(false)
              setSelectedRecord(null)
            }}
            isLoading={isDeleting}
          />
        )}
      </Modal>
    </div>
  )
}

export default Sku