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
    <div className="fixed inset-0 flex items-center justify-center z-50 font-mono">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div className="relative bg-slate-800 border-2 border-slate-600 text-slate-200 w-full max-w-2xl max-h-[80vh] z-10">
        {/* Header */}
        <div className="bg-slate-700 border-b border-slate-600 p-3 flex justify-between items-center">
          <h2 className="text-amber-300 font-bold uppercase tracking-wide">{rulesTitle}</h2>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 flex items-center justify-center border border-red-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
          <ul className="list-none space-y-3">
            {rulesContent.map((rule, index) => (
              <li key={index} className="border-b border-slate-700 pb-2 last:border-0">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="bg-slate-700 border-t border-slate-600 p-3 text-center">
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
