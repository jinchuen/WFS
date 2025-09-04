"use client"
import { useEffect, useState, useMemo, useCallback } from "react"
// eslint-disable-next-line no-unused-vars
import { animated, useSpring, useTrail } from "@react-spring/web"
import {
  Hash,
  Code,
  FileText,
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  RefreshCw,
} from "lucide-react"
import { getCategory } from "../../services/sku/category"
import { toast } from 'react-toastify';

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

// Enhanced Form Component
function RecordForm({ record, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    code: record?.code || "",
    descs: record?.descs || "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="code" className="block text-sm font-medium text-gray-300">
          Code
        </label>
        <input
          type="text"
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          placeholder="Enter code..."
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

// Enhanced Pagination Component
function EnhancedPagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, totalItems }) {
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
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
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

// Hook for debounced search
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const Category = () => {
  const [hoveredRow, setHoveredRow] = useState(null)
  const [currentPage, setCurrentPage] = useState(() => {
    // Persist currentPage in localStorage for memory
    const saved = localStorage.getItem("category_currentPage")
    return saved ? Number(saved) : 1
  })
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem("category_itemsPerPage")
    return saved ? Number(saved) : 10
  })
  const [categoryList, setCategoryList] = useState([])
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("category_searchTerm") || ""
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Modal and CRUD state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  
  // Separate loading states for different operations
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Memoized filtered and sorted data
  const filteredAndSortedData = useMemo(() => {
    const filtered = categoryList.filter(
      (item) =>
        item.code?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.descs?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [categoryList, debouncedSearchTerm, sortConfig])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredAndSortedData.slice(startIndex, endIndex)

  // Optimized animations - reduce for large datasets
  const shouldAnimate = filteredAndSortedData.length < 50
  const trail = useTrail(currentData.length, {
    from: { opacity: shouldAnimate ? 0 : 1, transform: shouldAnimate ? "translateY(10px)" : "translateY(0px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 300, friction: 40 },
    delay: shouldAnimate ? 50 : 0,
  })

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const handleCreate = async (data) => {
    let model = {
      mode: 'create',
      data: {
        code: data.code,
        descs: data.descs,
      }
    }
    try {
      setIsCreating(true)
      const data = await getCategory.createUpdateCategory(model)
      setIsCreateModalOpen(false)
      setSelectedRecord(null)
      toast.success(`Category ${data.code} created successfully!`)
      // Refresh the data after successful creation
      handleRefresh()
    }catch(error) {
      const errorMsg = error.response.data.error
      if(errorMsg){
        toast.error(errorMsg)
      }else{
        toast.error("An unknown error occurred while creating data. Please try again later.")
      }
    }finally{
      setIsCreating(false)
    }
    // const newRecord = {
    //   id: generateId(),
    //   ...data,
    //   createdate: new Date().toISOString(),
    //   updatedate: new Date().toISOString(),
    // }


    // setCategoryList([newRecord, ...categoryList])
    // setIsCreateModalOpen(false)
    // setCurrentPage(1)
  }

  const handleEdit = async (data) => {
    let model = {
      mode: 'update',
      data: {
        id: selectedRecord.id,
        code: data.code,
        descs: data.descs,
      }
    }
    try {
      setIsEditing(true)
      const data = await getCategory.createUpdateCategory(model)
      setIsEditModalOpen(false)
      setSelectedRecord(null)
      toast.success(`Category ${data.code} updated successfully!`)
      // Refresh the data after successful update
      handleRefresh()
    }catch(error) {
      const errorMsg = error.response.data.error
      if(errorMsg){
        toast.error(errorMsg)
      }else{
        toast.error("An unknown error occurred while updating data. Please try again later.")
      }
    }finally{
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    let model = {
      mode: 'delete',
      data: {
        id: selectedRecord.id,
      }
    }
    try {
      setIsDeleting(true)
      await getCategory.deleteCategory(model)
      setIsDeleteModalOpen(false)
      setSelectedRecord(null)
      toast.success("Category deleted successfully!")
      // Refresh the data after successful deletion
      handleRefresh()
    }catch(error) {
      const errorMsg = error.response.data.error
      if(errorMsg){
        toast.error(errorMsg)
      }else{
        toast.error("An unknown error occurred while deleting data. Please try again later.")
      }
    }finally{
      setIsDeleting(false)
    }

    // const updatedList = categoryList.filter((item) => item.id !== selectedRecord.id)
    // setCategoryList(updatedList)
    // setIsDeleteModalOpen(false)
    // setSelectedRecord(null)

    // // Adjust pagination if needed
    // const newTotalPages = Math.ceil(updatedList.length / itemsPerPage)
    // if (currentPage > newTotalPages && newTotalPages > 0) {
    //   setCurrentPage(newTotalPages)
    // }
  }

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ["ID", "Code", "Description", "Created", "Updated"],
      ...filteredAndSortedData.map((item) => [item.id, item.code, item.descs, item.createdate, item.updatedate]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `categories_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Refresh data (improved: actually re-fetch, clear memory, debounce)
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    setIsLoading(true)
    try {
      const res = await getCategory.getCategoryList()
      setCategoryList(res)
      toast.success("Categories refreshed!")
    } catch {
      toast.error("An unknown error occurred while refreshing data. Please try again later.")
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }, [isRefreshing])

  // Page change handlers (persist to localStorage)
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    localStorage.setItem("category_currentPage", String(page))
  }, [])

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    localStorage.setItem("category_itemsPerPage", String(newItemsPerPage))
    localStorage.setItem("category_currentPage", "1")
  }, [])

  // Persist search term
  useEffect(() => {
    localStorage.setItem("category_searchTerm", searchTerm)
  }, [searchTerm])

  // Animation for the entire container
  const containerAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const truncateId = (id) => { 
    return `${id.substring(0, 8)}...`
  }

  // Fetch category list (fix useAlter usage)
  useEffect(() => {
    const fetchCategoryList = async () => {
      setIsLoading(true)
      try {
        const res = await getCategory.getCategoryList()
        setCategoryList(res)
      } catch {
        toast.error("An unknown error occurred while fetching data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategoryList()
  }, [])

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
    localStorage.setItem("category_currentPage", "1")
  }, [debouncedSearchTerm])

  // Fix: If filtered data shrinks below current page, reset to last valid page
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
      localStorage.setItem("category_currentPage", String(totalPages))
    }
  }, [filteredAndSortedData.length, currentPage, totalPages])

  return (
    <div className="p-6 mb-4">
      <animated.div style={containerAnimation} className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                Category Management
              </h1>
              <p className="text-gray-400 text-lg">Manage and organize your data categories</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all w-full sm:w-64"
                />
              </div>

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
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Create New
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
                <p className="text-gray-400 text-sm">Total Categories</p>
                <p className="text-2xl font-bold text-white">{categoryList.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Filtered Results</p>
                <p className="text-2xl font-bold text-white">{filteredAndSortedData.length}</p>
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
                  {currentPage} of {totalPages}
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
                <p className="text-gray-400 text-sm">Items Per Page</p>
                <p className="text-2xl font-bold text-white">{itemsPerPage}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
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
                        <button
                          onClick={() => handleSort("id")}
                          className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <Hash className="w-4 h-4" />
                          ID
                          {sortConfig.key === "id" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="w-3 h-3" />
                            ) : (
                              <SortDesc className="w-3 h-3" />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("code")}
                          className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <Code className="w-4 h-4" />
                          Code
                          {sortConfig.key === "code" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="w-3 h-3" />
                            ) : (
                              <SortDesc className="w-3 h-3" />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("descs")}
                          className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Description
                          {sortConfig.key === "descs" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="w-3 h-3" />
                            ) : (
                              <SortDesc className="w-3 h-3" />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("createdate")}
                          className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          Created
                          {sortConfig.key === "createdate" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="w-3 h-3" />
                            ) : (
                              <SortDesc className="w-3 h-3" />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("updatedate")}
                          className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <Clock className="w-4 h-4" />
                          Updated
                          {sortConfig.key === "updatedate" &&
                            (sortConfig.direction === "asc" ? (
                              <SortAsc className="w-3 h-3" />
                            ) : (
                              <SortDesc className="w-3 h-3" />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {trail.map((style, index) => {
                      const item = currentData[index]
                      if (!item) return null

                      return (
                        <animated.tr
                          key={item.id}
                          style={style}
                          className={`transition-all duration-300 ${
                            hoveredRow === item.id
                              ? "bg-gray-700/30 shadow-lg transform scale-[1.01] border-l-4 border-blue-500"
                              : "hover:bg-gray-700/20"
                          }`}
                          onMouseEnter={() => setHoveredRow(item.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                              <span className="text-sm font-mono text-gray-300 bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-600/30">
                                {truncateId(item.id)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30">
                              {item.code}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-200 max-w-xs truncate" title={item.descs}>
                              {item.descs}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDate(item.createdate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDate(item.updatedate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedRecord(item)
                                  setIsEditModalOpen(true)
                                }}
                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all transform hover:scale-110"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedRecord(item)
                                  setIsDeleteModalOpen(true)
                                }}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all transform hover:scale-110"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </animated.tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Pagination */}
        <EnhancedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={filteredAndSortedData.length}
        />
      </animated.div>

      {/* Modals */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Category">
        <RecordForm onSave={handleCreate} onCancel={() => setIsCreateModalOpen(false)} isLoading={isCreating} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRecord(null)
        }}
        title="Edit Category"
      >
        <RecordForm
          record={selectedRecord}
          onSave={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedRecord(null)
          }}
          isLoading={isEditing}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedRecord(null)
        }}
        title="Delete Category"
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

export default Category
