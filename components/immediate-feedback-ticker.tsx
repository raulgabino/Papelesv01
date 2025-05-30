"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Info } from "lucide-react"

interface ImmediateFeedbackTickerProps {
  message: string
  type: "success" | "error" | "info"
  duration?: number // duración en milisegundos
}

export function ImmediateFeedbackTicker({ message, type, duration = 3000 }: ImmediateFeedbackTickerProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, message])

  if (!visible) return null

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-700"
      case "error":
        return "bg-red-700"
      case "info":
        return "bg-blue-700"
      default:
        return "bg-slate-700"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 mr-2" style={{ imageRendering: "pixelated" }} />
      case "error":
        return <XCircle className="w-4 h-4 mr-2" style={{ imageRendering: "pixelated" }} />
      case "info":
        return <Info className="w-4 h-4 mr-2" style={{ imageRendering: "pixelated" }} />
      default:
        return null
    }
  }

  return (
    <div
      className={`${getBackgroundColor()} border border-slate-600 px-3 py-1 rounded-sm flex items-center justify-center font-mono animate-fadeIn`}
    >
      <div className="flex items-center text-amber-100">
        {getIcon()}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  )
}
