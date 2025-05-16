"use client"

import { User } from "lucide-react"

interface SupervisorReviewPanelProps {
  supervisorName?: string
  tips: string[]
  onClose: () => void
}

export function SupervisorReviewPanel({ supervisorName = "Supervisor", tips, onClose }: SupervisorReviewPanelProps) {
  return (
    <div className="bg-slate-800 p-6 md:p-8 border-2 border-slate-600 rounded-md shadow-lg text-slate-200 flex flex-col h-full max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <div className="bg-slate-700 p-2 rounded-sm border border-slate-600 mr-3">
          <User className="h-6 w-6 text-sky-300" style={{ imageRendering: "pixelated" }} />
        </div>
        <h2 className="text-2xl font-mono font-bold text-sky-300">Consejos del {supervisorName}</h2>
      </div>

      <div className="flex-grow bg-amber-100 text-slate-800 p-4 rounded-sm border border-slate-400 overflow-y-auto mb-6 min-h-[200px]">
        <ul className="space-y-3 list-decimal list-inside font-mono text-sm">
          {tips.map((tip, index) => (
            <li key={index} className="pb-2 border-b border-amber-200 last:border-0">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex justify-center">
        <button
          onClick={onClose}
          className="bg-slate-600 hover:bg-slate-700 text-white py-2 px-5 rounded-sm border-b-2 border-slate-800 font-mono"
        >
          ENTENDIDO
        </button>
      </div>
    </div>
  )
}
