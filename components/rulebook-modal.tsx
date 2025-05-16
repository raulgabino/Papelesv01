"use client"

import { X } from "lucide-react"

interface RulebookModalProps {
  isOpen: boolean
  onClose: () => void
  rulesTitle: string
  rulesContent: string[]
}

export function RulebookModal({ isOpen, onClose, rulesTitle, rulesContent }: RulebookModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-mono">
      <div className="bg-slate-800 text-slate-200 border-2 border-slate-500 rounded-sm shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 bg-slate-700 border-b border-slate-600">
          <h2 className="text-lg font-mono font-bold text-amber-300">{rulesTitle}</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-400 text-white h-6 w-6 flex items-center justify-center border-b-2 border-red-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" style={{ imageRendering: "pixelated" }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4">
          <ul className="space-y-3">
            {rulesContent.map((rule, index) => (
              <li key={index} className="border-b border-slate-700 pb-2 last:border-0">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-600 bg-slate-700 flex justify-center">
          <button
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 border-b-2 border-slate-800"
          >
            CERRAR MANUAL
          </button>
        </div>
      </div>
    </div>
  )
}
