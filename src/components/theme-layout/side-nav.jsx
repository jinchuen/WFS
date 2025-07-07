"use client"

import { useState, useEffect } from "react"
import { useSpring, animated, useTrail, config } from "@react-spring/web"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const navItems = [
  {
    icon: <HomeIcon />,
    label: "Home",
    href: "#home",
  },
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    href: "#dashboard",
    children: [
      { label: "Analytics", href: "#analytics" },
      { label: "Reports", href: "#reports" },
      { label: "Statistics", href: "#statistics" },
    ],
  },
  {
    icon: <PersonIcon />,
    label: "Profile",
    href: "#profile",
  },
  {
    icon: <InfoIcon />,
    label: "About",
    href: "#about",
    children: [
      { label: "Company", href: "#company" },
      { label: "Team", href: "#team" },
      { label: "History", href: "#history" },
      { label: "Mission", href: "#mission" },
    ],
  },
  {
    icon: <ContactMailIcon />,
    label: "Contact",
    href: "#contact",
  },
  {
    icon: <SettingsIcon />,
    label: "Settings",
    href: "#settings",
    children: [
      { label: "General", href: "#general" },
      { label: "Security", href: "#security" },
      { label: "Notifications", href: "#notifications" },
    ],
  },
]

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)
  const [activePage, setActivePage] = useState("#home")

  // Accordion behavior - only one section open at a time
  const toggleExpanded = (label) => {
    setExpandedItem((prev) => (prev === label ? null : label))
  }

  // Track current page from URL hash
  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(window.location.hash || "#home")
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Auto-expand section if active page is a child item
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => child.href === activePage)
        if (hasActiveChild && expandedItem !== item.label) {
          setExpandedItem(item.label)
        }
      }
    })
  }, [activePage, expandedItem])

  // Main sidebar animation
  const sidebarAnimation = useSpring({
    transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
    opacity: isOpen ? 1 : 0,
    config: config.gentle,
  })

  // Backdrop animation
  const backdropAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    config: config.gentle,
  })

  // Menu button animation
  const menuButtonAnimation = useSpring({
    opacity: isOpen ? 0 : 1,
    transform: isOpen ? "scale(0)" : "scale(1)",
    visibility: isOpen ? "hidden" : "visible",
    config: config.wobbly,
  })

  // Trail animation for nav items
  const trail = useTrail(navItems.length, {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateX(0px)" : "translateX(-50px)",
    config: config.gentle,
    delay: isOpen ? 100 : 0,
  })

  return (
    <>
      {/* Menu Button */}
      <animated.button
        style={menuButtonAnimation}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 group"
        disabled={isOpen}
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <MenuIcon className="text-white text-2xl" />
        </div>
      </animated.button>

      {/* Backdrop */}
      <animated.div
        style={backdropAnimation}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
      />

      {/* Sidebar */}
      <animated.div style={sidebarAnimation} className="fixed top-0 left-0 h-full w-80 z-40">
        <div className="h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Navigation
                  </h2>
                  <p className="text-slate-400 text-sm">Welcome back!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:rotate-90"
              >
                <CloseIcon className="text-slate-300 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-hidden">
            <nav className="h-full overflow-y-auto px-6 py-4 space-y-2">
              {trail.map((style, index) => (
                <animated.div key={navItems[index].label} style={style}>
                  <NavItem
                    item={navItems[index]}
                    isExpanded={expandedItem === navItems[index].label}
                    isActive={activePage === navItems[index].href}
                    hasActiveChild={navItems[index].children?.some((child) => child.href === activePage) || false}
                    onToggleExpanded={() => toggleExpanded(navItems[index].label)}
                    onNavClick={() => setIsOpen(false)}
                    activePage={activePage}
                  />
                </animated.div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-700/50 flex-shrink-0">
            <div className="text-center text-slate-400 text-sm">
              <p>© 2024 Your App</p>
              <p className="text-xs mt-1">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  )
}

function NavItem({ item, isExpanded, isActive, hasActiveChild, onToggleExpanded, onNavClick, activePage }) {
  const [isHovered, setIsHovered] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const hoverAnimation = useSpring({
    transform: isHovered ? "translateX(8px)" : "translateX(0px)",
    backgroundColor:
      isActive || hasActiveChild
        ? "rgba(59, 130, 246, 0.2)"
        : isHovered
          ? "rgba(59, 130, 246, 0.1)"
          : "rgba(0, 0, 0, 0)",
    borderColor:
      isActive || hasActiveChild
        ? "rgba(59, 130, 246, 0.5)"
        : isHovered
          ? "rgba(59, 130, 246, 0.3)"
          : "rgba(0, 0, 0, 0)",
    config: config.gentle,
  })

  const iconAnimation = useSpring({
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    color: isActive || hasActiveChild ? "#3b82f6" : isHovered ? "#60a5fa" : "#cbd5e1",
    config: config.wobbly,
  })

  const expandAnimation = useSpring({
    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
    config: config.gentle,
  })

  const childrenAnimation = useSpring({
    maxHeight: isExpanded ? `${(item.children?.length || 0) * 50}px` : "0px",
    opacity: isExpanded ? 1 : 0,
    config: config.gentle,
  })

  // Fixed click handler
  const handleClick = (e) => {
    e.preventDefault()

    if (hasChildren) {
      // If item has children, toggle expansion
      onToggleExpanded()
    } else {
      // If no children, navigate to the link and close sidebar
      window.location.hash = item.href
      onNavClick()
    }
  }

  return (
    <div className="space-y-1">
      {/* Main Nav Item */}
      <animated.div
        style={hoverAnimation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent group"
      >
        <animated.span style={iconAnimation} className="text-xl">
          {item.icon}
        </animated.span>

        <span
          className={`text-lg font-medium transition-colors flex-1 ${
            isActive || hasActiveChild ? "text-blue-300 font-semibold" : "text-slate-200 group-hover:text-white"
          }`}
        >
          {item.label}
        </span>

        {hasChildren ? (
          <animated.div style={expandAnimation}>
            <ExpandMoreIcon
              className={`transition-colors ${
                isActive || hasActiveChild ? "text-blue-300" : "text-slate-400 group-hover:text-white"
              }`}
            />
          </animated.div>
        ) : (
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`w-2 h-2 rounded-full ${isActive ? "bg-blue-400 opacity-100" : "bg-blue-400"}`} />
          </div>
        )}
      </animated.div>

      {/* Children/Sub-menu */}
      {hasChildren && (
        <animated.div style={childrenAnimation} className="overflow-hidden">
          <div className="ml-8 space-y-1 border-l-2 border-slate-700/50 pl-4 py-2">
            {item.children.map((child, index) => (
              <SubNavItem
                key={child.label}
                child={child}
                onNavClick={onNavClick}
                isVisible={isExpanded}
                isActive={activePage === child.href}
                delay={isExpanded ? index * 100 : 0}
              />
            ))}
          </div>
        </animated.div>
      )}
    </div>
  )
}

function SubNavItem({ child, onNavClick, isVisible, isActive, delay }) {
  const [isHovered, setIsHovered] = useState(false)

  const itemAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0px)" : "translateX(-20px)",
    delay: isVisible ? delay : 0,
    config: config.gentle,
  })

  const hoverAnimation = useSpring({
    backgroundColor: isActive
      ? "rgba(59, 130, 246, 0.15)"
      : isHovered
        ? "rgba(59, 130, 246, 0.08)"
        : "rgba(0, 0, 0, 0)",
    transform: isHovered ? "translateX(4px)" : "translateX(0px)",
    config: config.gentle,
  })

  // Fixed click handler for sub-items
  const handleClick = (e) => {
    e.preventDefault()
    window.location.hash = child.href
    onNavClick()
  }

  return (
    <animated.div style={itemAnimation}>
      <animated.div
        onClick={handleClick}
        style={hoverAnimation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isActive ? "bg-blue-400" : "bg-slate-500 group-hover:bg-blue-400"
          }`}
        />
        <span
          className={`text-sm font-medium transition-colors ${
            isActive ? "text-blue-300 font-semibold" : "text-slate-300 group-hover:text-white"
          }`}
        >
          {child.label}
        </span>
        {isActive && (
          <div className="ml-auto">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          </div>
        )}
      </animated.div>
    </animated.div>
  )
}
