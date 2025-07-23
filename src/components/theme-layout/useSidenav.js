/* eslint-disable import/no-unresolved */
import { useContext, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SidenavContext } from './SidenavContext'

// Custom hook to use sidenav context
export const useSidenav = () => {
  const context = useContext(SidenavContext)
  if (!context) {
    throw new Error('useSidenav must be used within a SidenavProvider')
  }
  return context
}

// Hook for navigation with auto-expand functionality
export const useSidenavNavigation = () => {
  const { setCurrentPath, toggleExpandedItem, expandedItems } = useSidenav()
  const navigate = useNavigate()
  const location = useLocation()
  
  const navigateTo = useCallback((path, shouldAutoExpand = true) => {
    // Actually navigate to the route
    navigate(path)
    
    // Update sidenav state
    setCurrentPath(path)
    
    // Auto-expand parent items based on path
    if (shouldAutoExpand) {
      const pathSegments = path.split('/').filter(Boolean)
      const itemsToExpand = []
      
      // Build parent paths to expand
      for (let i = 1; i < pathSegments.length; i++) {
        const parentPath = '/' + pathSegments.slice(0, i).join('/')
        itemsToExpand.push(parentPath)
      }
      
      // Expand all parent items
      itemsToExpand.forEach(itemPath => {
        if (!expandedItems.has(itemPath)) {
          toggleExpandedItem(itemPath)
        }
      })
    }
  }, [navigate, setCurrentPath, toggleExpandedItem, expandedItems])

  return { navigate: navigateTo, currentPath: location.pathname }
} 