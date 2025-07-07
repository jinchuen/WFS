"use client"

import { useEffect, useState } from "react"
import "./SmokeBackground"

export default function SmokeBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 背景雾层 */}
      <div className="absolute inset-0">
        {/* 第一层雾 */}
        <div className="absolute inset-0 opacity-30">
          <div className="fog-layer fog-1"></div>
        </div>

        {/* 第二层雾 */}
        <div className="absolute inset-0 opacity-25">
          <div className="fog-layer fog-2"></div>
        </div>

        {/* 第三层雾 */}
        <div className="absolute inset-0 opacity-20">
          <div className="fog-layer fog-3"></div>
        </div>

        {/* 第四层雾 */}
        <div className="absolute inset-0 opacity-15">
          <div className="fog-layer fog-4"></div>
        </div>
      </div>
    </div>
  )
}
