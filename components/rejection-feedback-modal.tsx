"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface RejectionOption {
  id: string
  label: string
}

interface RejectionFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitRejection: (feedback: { reasons: string[]; comments?: string }) => void
  rejectionOptions: RejectionOption[]
}

export function RejectionFeedbackModal({
  isOpen,
  onClose,
  onSubmitRejection,
  rejectionOptions,
}: RejectionFeedbackModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [comments, setComments] = useState("")

  if (!isOpen) return null

  const handleReasonToggle = (id: string) => {
    setSelectedReasons((prev) => (prev.includes(id) ? prev.filter((reasonId) => reasonId !== id) : [...prev, id]))
  }

  const handleSubmit = () => {
    onSubmitRejection({
      reasons: selectedReasons,
      comments: comments.trim() || undefined,
    })
    // Reset form
    setSelectedReasons([])
    setComments("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-mono">
      <div className="bg-slate-800 text-slate-200 border-2 border-slate-500 rounded-sm shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-3 bg-slate-700 border-b border-slate-600">
          <h2 className="text-lg font-mono font-bold text-red-400">MOTIVO DEL RECHAZO</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-400 text-white h-6 w-6 flex items-center justify-center border-b-2 border-red-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" style={{ imageRendering: "pixelated" }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4 space-y-1 max-h-60 overflow-y-auto">
            <div className="text-sm mb-2 text-slate-300">Seleccione los motivos de rechazo:</div>
            {rejectionOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-start space-x-2 p-1.5 hover:bg-slate-700 rounded-sm cursor-pointer"
              >
                <div className="mt-0.5">
                  <div
                    className={`h-4 w-4 border ${
                      selectedReasons.includes(option.id)
                        ? "bg-blue-500 border-blue-600"
                        : "bg-slate-600 border-slate-500"
                    }`}
                    onClick={() => handleReasonToggle(option.id)}
                  >
                    {selectedReasons.includes(option.id) && (
                      <div className="flex items-center justify-center h-full text-white text-xs">✓</div>
                    )}
                  </div>
                </div>
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="additionalComments" className="block text-xs font-mono mb-1 text-slate-400">
              Comentarios Adicionales (Opcional):
            </label>
            <textarea
              id="additionalComments"
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-slate-600 text-slate-200 p-2 border border-slate-500 rounded-sm text-sm focus:ring-1 focus:ring-blue-400 outline-none resize-none font-mono"
            />
          </div>

          <div className="flex justify-between gap-3 mt-4">
            <button
              onClick={onClose}
              className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 border-b-2 border-slate-800"
            >
              CANCELAR
            </button>
            <button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 border-b-2 border-red-800"
              disabled={selectedReasons.length === 0}
            >
              CONFIRMAR RECHAZO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
