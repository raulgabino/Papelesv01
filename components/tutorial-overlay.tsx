"use client"

import { useEffect } from "react"
import { User, ChevronRight } from "lucide-react"

interface TutorialOverlayProps {
  message: string
  supervisorIconUrl?: string
  showNextButton: boolean
  onNextStep: () => void
  isActive: boolean
  highlightElementId?: string
}

export function TutorialOverlay({
  message,
  supervisorIconUrl,
  showNextButton,
  onNextStep,
  isActive,
  highlightElementId,
}: TutorialOverlayProps) {
  // Efecto para resaltar el elemento especificado
  useEffect(() => {
    if (isActive && highlightElementId) {
      const element = document.getElementById(highlightElementId)
      if (element) {
        // Guardar los estilos originales
        const originalBorder = element.style.border
        const originalPadding = element.style.padding
        const originalBorderRadius = element.style.borderRadius
        const originalTransition = element.style.transition

        // Aplicar estilos de resaltado
        element.style.border = "2px solid #fde047" // yellow-300
        element.style.padding = "4px"
        element.style.borderRadius = "2px"
        element.style.transition = "all 0.3s ease"

        // Restaurar estilos originales al desmontar o cambiar el elemento resaltado
        return () => {
          element.style.border = originalBorder
          element.style.padding = originalPadding
          element.style.borderRadius = originalBorderRadius
          element.style.transition = originalTransition
        }
      }
    }
  }, [isActive, highlightElementId])

  if (!isActive) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-slate-700 text-slate-200 border border-slate-500 rounded-sm p-3 font-mono text-sm shadow-lg">
        <div className="flex items-start mb-2">
          <div className="bg-slate-600 p-2 mr-3 rounded-sm">
            {supervisorIconUrl ? (
              <img
                src={supervisorIconUrl || "/placeholder.svg"}
                alt="Supervisor"
                className="w-12 h-12"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <User className="w-12 h-12 text-amber-300" style={{ imageRendering: "pixelated" }} />
            )}
          </div>
          <div className="flex-1">
            <div className="text-amber-300 font-bold mb-1">SUPERVISOR:</div>
            <p className="text-slate-200">{message}</p>
          </div>
        </div>
        {showNextButton && (
          <div className="flex justify-end">
            <button
              onClick={onNextStep}
              className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 text-xs border-b-2 border-sky-800 flex items-center"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" style={{ imageRendering: "pixelated" }} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
