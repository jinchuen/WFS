// App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import SideNav from "./components/theme-layout/SideNav";
import AppRoutes from "./AppRoutes";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated, easings, useTrail } from "@react-spring/web";
import { navItems } from "./components/theme-layout/navItems";

function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

function InnerApp() {
  const { pathname } = useLocation();

  const styles = useSpring({
    from: { opacity: 0, transform: "translateX(-150px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 50, friction: 18 },
    reset: true,
  });

  const lineSpring = useSpring({
    from: { width: "0%" },
    to: { width: "100%" },
    delay: 300,
    config: {
      duration: 700,
      easing: easings.easeOutExpo, // ✅ strong throw-like motion
    },
    reset: true,
  });

  // 🔍 Find active item from nav
  let active = navItems.find((item) => item.path === pathname);
  let activeIcon = active?.icon;
  let activeLabel = active?.label;
  if (!active) {
    for (const item of navItems) {
      if (item.children) {
        const child = item.children.find((c) => c.path === pathname);
        if (child) {
          active = child;
          activeIcon = item.icon;
          activeLabel = child.label;
          break;
        }
      }
    }
  }

  return (
    <div className="w-full h-screen flex bg-black relative overflow-hidden">
      <div className="flex-shrink-0 z-10">
        <SideNav />
      </div>
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {activeLabel && (
          <>
            <animated.h1
              key={pathname}
              style={styles}
              className="text-4xl font-bold text-indigo-700 flex items-center gap-3 mb-6 ml-20 mt-1.5"
            >
              <span className="flex items-center gap-3">
                {activeIcon &&
                  React.createElement(activeIcon, {
                    className: "mt-1",
                    style: { width: 40, height: 40 },
                  })}
                {activeLabel}
              </span>
            </animated.h1>
            <animated.div
              key={pathname + "-line"}
              style={{
                ...lineSpring,
                height: "3px",
                backgroundColor: "#c7d2fe",
                borderRadius: "9999px",
                boxShadow: "0 0 5px rgba(99,102,241,0.5)",
              }}
              className="mb-6"
            />
          </>
        )}
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
