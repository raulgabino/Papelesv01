"use client"

import { useState } from "react"
import { CheckSquare, Square } from "lucide-react"

interface RejectionOption {
  id: string
  label: string
}

interface RejectionFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitRejection: (data: { reasons: string[]; comments: string }) => void
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
      comments,
    })
    // Reset form
    setSelectedReasons([])
    setComments("")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-mono">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div className="relative bg-slate-800 border-2 border-slate-600 text-slate-200 w-full max-w-md max-h-[80vh] z-10">
        {/* Header */}
        <div className="bg-slate-700 border-b border-slate-600 p-3">
          <h2 className="text-red-400 font-bold uppercase tracking-wide text-center">
            Motivo del Rechazo (Comunicación Estratégica)
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(80vh-8rem)]">
          <div className="mb-4">
            <h3 className="text-slate-300 mb-2 font-bold">Seleccione los motivos:</h3>
            <ul className="list-none space-y-2">
              {rejectionOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex items-start cursor-pointer hover:bg-slate-700 p-1"
                  onClick={() => handleReasonToggle(option.id)}
                >
                  <div className="mr-2 mt-0.5">
                    {selectedReasons.includes(option.id) ? (
                      <CheckSquare className="w-5 h-5 text-red-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-300 mb-2 font-bold">Comentarios Adicionales:</h3>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full h-24 bg-slate-600 text-slate-200 p-2 border border-slate-500 font-mono resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-700 border-t border-slate-600 p-3 flex justify-between">
          <button
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 border-b-2 border-slate-800"
          >
            CANCELAR
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 border-b-2 border-red-800"
            disabled={selectedReasons.length === 0}
          >
            CONFIRMAR RECHAZO
          </button>
        </div>
      </div>
    </div>
  )
}
