import React, { memo, useCallback, useMemo, useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { sidenavData } from './sidenavData'
import { useSidenav } from './useSidenav'

// Memoized individual menu item component
const MenuItem = memo(({ item, isActive, isExpanded, onToggle, onNavigate, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0
  const IconComponent = item.icon
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = useCallback((e) => {
    e.preventDefault()
    if (hasChildren) {
      onToggle(item.id)
    } else {
      onNavigate(item.path)
    }
  }, [hasChildren, item.id, item.path, onToggle, onNavigate])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const itemClasses = useMemo(() => {
    const baseClasses = [
      'flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium transition-all duration-200',
      'hover:bg-base-300 hover:text-base-content rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
      'cursor-pointer'
    ]
    
    if (isActive) {
      baseClasses.push('bg-primary text-primary-content shadow-sm')
    } else {
      baseClasses.push('text-base-content')
    }
    
    if (level > 0) {
      baseClasses.push('ml-6 text-xs mr-2') // Added mr-2 for children
    }

    // Enhanced hover effects
    if (isHovered && !isActive) {
      baseClasses.push('bg-base-200 shadow-sm')
    }
    
    return baseClasses.join(' ')
  }, [isActive, level, isHovered])

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={itemClasses}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="flex items-center gap-3 min-w-[0.20rem] flex-1">
        <IconComponent className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`} />
        <span className="truncate">{item.title}</span>
      </div>
      {hasChildren && (
        <div className="flex-shrink-0 ml-2">
          {isExpanded ? (
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`} />
          ) : (
            <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`} />
          )}
        </div>
      )}
    </button>
  )
})
MenuItem.displayName = 'MenuItem'

// Main SidenavItemList component
const SidenavItemList = memo(({ className = '' }) => {
  const { expandedItems, setExpandedItems, setCurrentPath, setDrawerOpen } = useSidenav()
  const navigate = useNavigate()
  const location = useLocation()

  // Accordion logic: only one parent open at a time
  const handleToggle = useCallback((itemId) => {
    setExpandedItems((prev) => {
      // If already open, close it
      if (prev.has(itemId)) return new Set()
      // Only keep this one open
      return new Set([itemId])
    })
  }, [setExpandedItems])

  const handleNavigate = useCallback((path) => {
    // Actually navigate to the route
    navigate(path)
    // Update the sidenav state
    setCurrentPath(path)
    setDrawerOpen(false) // Close the drawer on navigation
  }, [navigate, setCurrentPath, setDrawerOpen])

  // Optimized active state check - memoized for performance
  const isPathActive = useCallback((path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }, [location.pathname])

  // Recursive function to render menu items with proper active states
  const renderMenuItem = useCallback((item, level = 0) => {
    const isActive = isPathActive(item.path)
    const isExpanded = expandedItems.has(item.id)
    return (
      <div key={item.id} className="w-[96%]">
        <MenuItem
          item={item}
          isActive={isActive}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          onNavigate={handleNavigate}
          level={level}
        />
        {item.children && item.children.length > 0 && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }, [expandedItems, handleToggle, handleNavigate, isPathActive])

  // Memoize the menu items to prevent unnecessary re-renders
  const menuItems = useMemo(() => {
    return sidenavData.map((item) => renderMenuItem(item))
  }, [renderMenuItem])

  return (
    <nav className={`space-y-2 ${className}`} role="navigation" aria-label="Main navigation">
      {menuItems}
    </nav>
  )
})
SidenavItemList.displayName = 'SidenavItemList'

export default SidenavItemList