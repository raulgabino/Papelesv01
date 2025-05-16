"use client"

import { User } from "lucide-react"

interface SupervisorReviewPanelProps {
  supervisorName: string
  tips: string[]
  onClose: () => void
}

export function SupervisorReviewPanel({ supervisorName, tips, onClose }: SupervisorReviewPanelProps) {
  return (
    <div className="bg-slate-800 border-2 border-slate-600 w-full h-full flex flex-col font-mono">
      {/* Header */}
      <div className="bg-slate-700 border-b border-slate-600 p-3 flex items-center">
        <div className="bg-slate-600 border-2 border-slate-500 p-2 mr-3">
          <User className="w-6 h-6 text-amber-300" style={{ imageRendering: "pixelated" }} />
        </div>
        <h2 className="text-amber-300 font-bold text-lg">Consejos del {supervisorName}</h2>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 overflow-auto">
        <div className="bg-amber-100 text-slate-800 border border-slate-400 p-4 h-full overflow-auto">
          <ul className="list-none space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="border-b border-amber-200 pb-3 last:border-0">
                <div className="flex">
                  <span className="font-bold mr-2 text-amber-800">#{index + 1}:</span>
                  <span>{tip}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-700 border-t border-slate-600 p-3 flex justify-center">
        <button
          onClick={onClose}
          className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 border-b-4 border-slate-800 uppercase tracking-wide"
        >
          ENTENDIDO
        </button>
      </div>
    </div>
  )
}
