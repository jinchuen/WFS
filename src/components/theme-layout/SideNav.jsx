/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
import { MenuIcon, X, LogOut } from 'lucide-react'
import { useSpring, animated, config } from '@react-spring/web'
import SidenavItemList from './SidenavItemList'
import { useSidenav } from './useSidenav'
import { getAuthorization } from '../../services/authorization/authorization'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Memoized drawer button component
const DrawerButton = memo(({ onOpen, className = '' }) => (
  <button
    onClick={onOpen}
    className={`btn btn-circle btn-sm bg-base-200 hover:bg-base-300 shadow-lg transition-all duration-200 ${className}`}
    aria-label="Open navigation menu"
  >
    <MenuIcon className="w-4 h-4" />
  </button>
))

DrawerButton.displayName = 'DrawerButton'

// Memoized close button component
const CloseButton = memo(({ onClose, className = '' }) => (
  <button
    onClick={onClose}
    className={`btn btn-circle btn-sm btn-ghost hover:bg-base-300 transition-all duration-200 ${className}`}
    aria-label="Close navigation menu"
  >
    <X className="w-4 h-4" />
  </button>
))

CloseButton.displayName = 'CloseButton'

// Main SideNav component
const SideNav = memo(({ className = '' }) => {
  const { isOpenDrawer, toggleDrawer, setDrawerOpen } = useSidenav()
  const [showButton, setShowButton] = useState(false)
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Optimized spring animation with better performance
  const drawerSpring = useSpring({
    transform: isOpenDrawer ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: isOpenDrawer ? 1 : 0,
    config: config.gentle
  })

	const hrSpring = useSpring({
		from: { width: '0%', opacity: 0 },
		to: { width: '100%', opacity: 1 },
		delay: 200 + 100,
		config: { tension: 170, friction: 26 },
	})

  const overlaySpring = useSpring({
    opacity: isOpenDrawer ? 1 : 0,
    pointerEvents: isOpenDrawer ? 'auto' : 'none',
    config: config.fast
  })

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [setDrawerOpen])

  // Optimized button visibility logic
  useEffect(() => {
    let timeoutId
    if (!isOpenDrawer) {
      timeoutId = setTimeout(() => setShowButton(true), 300)
    } else {
      setShowButton(false)
    }
    return () => clearTimeout(timeoutId)
  }, [isOpenDrawer])
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const data = await getAuthorization.logout();
      toast.success(data.message);
    } catch ( err ) {
      toast.error("An unknown error occurred. Please refresh the page.");
    } 
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    closeDrawer();
    navigate("/authorization/login");
  }, [navigate, closeDrawer]);

  const handleLoginClick = useCallback(() => {
    if (!user?.username) {
      navigate("/authorization/login");
    }
  }, [navigate, user]);

  // Memoized sidebar content
  const sidebarContent = useMemo(() => (
  
    <div className="flex flex-col h-full bg-base-100 border-r border-base-300 px-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <h1 className="text-lg font-bold text-base-content">Navigation</h1>
        <CloseButton onClose={closeDrawer} />
      </div>
      
      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <SidenavItemList className="space-y-2" />
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-base-300">
        <div className="text-xs text-base-content/60 text-center">

        <div className="dropdown dropdown-top">
          {/* LOGIN / USER BOX */}
          {!user?.username ? (
            <div
              role="button"
              className="border px-20 py-3 text-1xl hover:cursor-pointer"
              onClick={handleLoginClick}
            >
              Login
            </div>
          ) : (
            <div
              tabIndex={0}
              className="border px-20 py-3 text-1xl hover:cursor-pointer"
            >
              {user.username}
            </div>
          )}

          {/* Dropdown CONTENT only when logged in */}
          {user && (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 py-2 px-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
        
        </div>
      </div>
    </div>
  ), [closeDrawer, user, handleLogout, handleLoginClick])

  return (
    <>
      {/* Drawer Button only shown when drawer is closed */}
      {showButton && (
        <div className="absolute top-4 left-5 z-50">
          <DrawerButton onOpen={toggleDrawer} />
        </div>
      )}

      {/* Animated Sidebar - Fixed width at 16.666% */}
      <animated.div
        style={drawerSpring}
        className={`fixed top-0 left-0 h-full w-1/5 z-40 ${className}`}
      >
        {sidebarContent}
      </animated.div>

      {/* Animated Overlay */}
      <animated.div
        style={overlaySpring}
        className="fixed inset-0 bg-black/50 z-30"
        onClick={closeDrawer}
        aria-hidden="true"
      />
    </>
  )
})

SideNav.displayName = 'SideNav'

export default SideNav
