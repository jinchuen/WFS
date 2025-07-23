import React, { createContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Action types
const SIDENAV_ACTIONS = {
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  SET_DRAWER_OPEN: 'SET_DRAWER_OPEN',
  SET_CURRENT_PATH: 'SET_CURRENT_PATH',
  TOGGLE_EXPANDED_ITEM: 'TOGGLE_EXPANDED_ITEM',
  SET_EXPANDED_ITEMS: 'SET_EXPANDED_ITEMS'
}

// Initial state
const initialState = {
  isOpenDrawer: false,
  currentPath: '/dashboard',
  expandedItems: new Set(),
  navigationHistory: []
}

// Reducer function
const sidenavReducer = (state, action) => {
  switch (action.type) {
    case SIDENAV_ACTIONS.TOGGLE_DRAWER:
      return {
        ...state,
        isOpenDrawer: !state.isOpenDrawer
      }
    
    case SIDENAV_ACTIONS.SET_DRAWER_OPEN:
      return {
        ...state,
        isOpenDrawer: action.payload
      }
    
    case SIDENAV_ACTIONS.SET_CURRENT_PATH:
      return {
        ...state,
        currentPath: action.payload,
        navigationHistory: [
          ...state.navigationHistory.slice(-9), // Keep last 10 items
          action.payload
        ]
      }
    
    case SIDENAV_ACTIONS.TOGGLE_EXPANDED_ITEM: {
      const newExpandedItems = new Set(state.expandedItems)
      if (newExpandedItems.has(action.payload)) {
        newExpandedItems.delete(action.payload)
      } else {
        newExpandedItems.add(action.payload)
      }
      return {
        ...state,
        expandedItems: newExpandedItems
      }
    }
    
    case SIDENAV_ACTIONS.SET_EXPANDED_ITEMS: {
      // Handle both function and array/Set inputs
      let newItems
      if (typeof action.payload === 'function') {
        newItems = action.payload(state.expandedItems)
      } else {
        newItems = action.payload
      }
      
      // Ensure we create a new Set from the result
      const newExpandedItems = new Set(newItems)
      return {
        ...state,
        expandedItems: newExpandedItems
      }
    }
    
    default:
      return state
  }
}

// Create context
const SidenavContext = createContext()

// Provider component
export const SidenavProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidenavReducer, initialState)
  const location = useLocation()

  // Sync sidenav state with actual browser URL
  useEffect(() => {
    if (location.pathname !== state.currentPath) {
      dispatch({ 
        type: SIDENAV_ACTIONS.SET_CURRENT_PATH, 
        payload: location.pathname 
      })
    }
  }, [location.pathname, state.currentPath])

  // Memoized actions to prevent unnecessary re-renders
  const toggleDrawer = useCallback(() => dispatch({ type: SIDENAV_ACTIONS.TOGGLE_DRAWER }), [])
  const setDrawerOpen = useCallback((isOpen) => dispatch({ 
    type: SIDENAV_ACTIONS.SET_DRAWER_OPEN, 
    payload: isOpen 
  }), [])
  const setCurrentPath = useCallback((path) => dispatch({ 
    type: SIDENAV_ACTIONS.SET_CURRENT_PATH, 
    payload: path 
  }), [])
  const toggleExpandedItem = useCallback((itemId) => dispatch({ 
    type: SIDENAV_ACTIONS.TOGGLE_EXPANDED_ITEM, 
    payload: itemId 
  }), [])
  const setExpandedItems = useCallback((items) => dispatch({ 
    type: SIDENAV_ACTIONS.SET_EXPANDED_ITEMS, 
    payload: items 
  }), [])

  // Memoized actions object
  const actions = useMemo(() => ({
    toggleDrawer,
    setDrawerOpen,
    setCurrentPath,
    toggleExpandedItem,
    setExpandedItems
  }), [toggleDrawer, setDrawerOpen, setCurrentPath, toggleExpandedItem, setExpandedItems])

  // Memoized context value - only update when state actually changes
  const contextValue = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions])

  return (
    <SidenavContext.Provider value={contextValue}>
      {children}
    </SidenavContext.Provider>
  )
}

// Export context for use in hooks file
export { SidenavContext } 