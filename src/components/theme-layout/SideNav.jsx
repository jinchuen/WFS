"use client";

import { useState, useEffect, useCallback, memo } from "react";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated, useTrail, config } from "@react-spring/web";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { navItems } from "./navItems";
import React from "react";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleExpanded = useCallback((label) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  }, []);

  const handleNavClick = useCallback(() => setIsOpen(false), []);

  // auto-expand parent section if a child route is active
  useEffect(() => {
    for (const item of navItems) {
      if (item.children && item.children.some((c) => c.path === pathname)) {
        setExpandedItem(item.label);
        return;
      }
    }
    setExpandedItem(null);
  }, [pathname]);

  const sidebarAnim = useSpring({
    transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
    opacity: isOpen ? 1 : 0,
    config: config.gentle,
  });
  const backdropAnim = useSpring({
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    config: config.gentle,
  });
  const menuBtnAnim = useSpring({
    opacity: isOpen ? 0 : 1,
    transform: isOpen ? "scale(0)" : "scale(1)",
    visibility: isOpen ? "hidden" : "visible",
    config: config.wobbly,
  });
  const trail = useTrail(navItems.length, {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateX(0px)" : "translateX(-50px)",
    config: config.gentle,
    delay: isOpen ? 100 : 0,
  });

  return (
    <>
      <animated.button
        style={menuBtnAnim}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 group"
        disabled={isOpen}
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <MenuIcon className="text-white text-2xl" />
        </div>
      </animated.button>

      <animated.div
        style={backdropAnim}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
      />

      <animated.div
        style={sidebarAnim}
        className="fixed top-0 left-0 h-full w-80 z-40"
      >
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

          {/* Nav Items */}
          <div className="flex-1 overflow-hidden">
            <nav className="h-full overflow-y-auto px-6 py-4 space-y-2">
              {trail.map((style, idx) => (
                <animated.div key={navItems[idx].label} style={style}>
                  <MemoNavItem
                    item={navItems[idx]}
                    isExpanded={expandedItem === navItems[idx].label}
                    isActive={pathname === navItems[idx].path}
                    hasActiveChild={
                      !!(
                        navItems[idx].children &&
                        navItems[idx].children.some((c) => c.path === pathname)
                      )
                    }
                    onToggleExpanded={toggleExpanded}
                    onNavClick={(path) => {
                      navigate(path);
                      handleNavClick();
                    }}
                  />
                </animated.div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-700/50 flex-shrink-0 text-center text-slate-400 text-sm">
            <p>© 2024 Your App</p>
            <p className="text-xs mt-1">Version 1.0.0</p>
          </div>
        </div>
      </animated.div>
    </>
  );
}

const NavItem = ({
  item,
  isExpanded,
  isActive,
  hasActiveChild,
  onToggleExpanded,
  onNavClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const hoverAnim = useSpring({
    transform: isHovered ? "translateX(8px)" : "translateX(0px)",
    backgroundColor:
      isActive || hasActiveChild
        ? "rgba(59, 130, 246, 0.2)"
        : isHovered
        ? "rgba(59, 130, 246, 0.1)"
        : "rgba(0,0,0,0)",
    borderColor:
      isActive || hasActiveChild
        ? "rgba(59, 130, 246, 0.5)"
        : isHovered
        ? "rgba(59, 130, 246, 0.3)"
        : "transparent",
    config: config.gentle,
  });

  const iconAnim = useSpring({
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    color:
      isActive || hasActiveChild
        ? "#3b82f6"
        : isHovered
        ? "#60a5fa"
        : "#cbd5e1",
    config: config.wobbly,
  });

  const expandAnim = useSpring({
    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
    config: config.gentle,
  });
  const childrenAnim = useSpring({
    maxHeight: isExpanded ? `${item.children.length * 50}px` : "0px",
    opacity: isExpanded ? 1 : 0,
    config: config.gentle,
  });

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpanded(item.label);
    } else {
      onNavClick(item.path);
    }
  };

  return (
    <div className="space-y-1">
      <animated.div
        style={hoverAnim}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent group"
      >
        <animated.span style={iconAnim} className="text-xl">
          {item.icon && React.createElement(item.icon, { className: "w-6 h-6" })}
        </animated.span>
        <span
          className={`text-lg font-medium flex-1 transition-colors ${
            isActive || hasActiveChild
              ? "text-blue-300 font-semibold"
              : "text-slate-200 group-hover:text-white"
          }`}
        >
          {item.label}
        </span>
        {hasChildren ? (
          <animated.div style={expandAnim}>
            <ExpandMoreIcon
              className={`transition-colors ${
                isActive || hasActiveChild
                  ? "text-blue-300"
                  : "text-slate-400 group-hover:text-white"
              }`}
            />
          </animated.div>
        ) : (
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              className={`w-2 h-2 rounded-full bg-blue-400 ${
                isActive ? "opacity-100" : ""
              }`}
            />
          </div>
        )}
      </animated.div>

      {hasChildren && (
        <animated.div style={childrenAnim} className="overflow-hidden">
          <div className="ml-8 space-y-1 border-l-2 border-slate-700/50 pl-4 py-2">
            {item.children.map((c, i) => (
              <MemoSubNavItem
                key={c.label}
                child={c}
                pathname={window.location.pathname}
                isActive={window.location.pathname === c.path}
                onNavClick={onNavClick}
                isVisible={isExpanded}
                delay={isExpanded ? i * 100 : 0}
              />
            ))}
          </div>
        </animated.div>
      )}
    </div>
  );
};
const SubNavItem = ({
  child,
  pathname,
  isActive,
  onNavClick,
  isVisible,
  delay,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemAnim = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0px)" : "translateX(-20px)",
    delay: isVisible ? delay : 0,
    config: config.gentle,
  });
  const hoverAnim = useSpring({
    backgroundColor: isActive
      ? "rgba(59, 130, 246, 0.15)"
      : isHovered
      ? "rgba(59, 130, 246, 0.08)"
      : "transparent",
    transform: isHovered ? "translateX(4px)" : "translateX(0px)",
    config: config.gentle,
  });

  return (
    <animated.div style={itemAnim}>
      <animated.div
        onClick={() => onNavClick(child.path)}
        style={hoverAnim}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            pathname === child.path
              ? "bg-blue-400"
              : "bg-slate-500 group-hover:bg-blue-400"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            pathname === child.path
              ? "text-blue-300 font-semibold"
              : "text-slate-300 group-hover:text-white"
          }`}
        >
          {child.label}
        </span>
        {pathname === child.path && (
          <div className="ml-auto">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          </div>
        )}
      </animated.div>
    </animated.div>
  );
};

const MemoNavItem = memo(NavItem);
const MemoSubNavItem = memo(SubNavItem);
