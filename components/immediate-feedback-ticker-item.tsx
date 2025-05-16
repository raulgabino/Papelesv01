"use client"

interface ImmediateFeedbackTickerItemProps {
  message: string
  type: "success" | "error" | "info"
}

export function ImmediateFeedbackTickerItem({ message, type }: ImmediateFeedbackTickerItemProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500/80"
      case "error":
        return "bg-red-500/80"
      case "info":
        return "bg-blue-500/80"
      default:
        return "bg-slate-500/80"
    }
  }

  return (
    <div
      className={`${getBackgroundColor()} text-white px-3 py-1 rounded-sm text-xs shadow-md font-mono animate-fadeIn`}
    >
      {message}
    </div>
  )
}
