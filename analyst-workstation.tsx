"use client"

import { useState } from "react"
import { Check, X, BookOpen, ArrowRight } from "lucide-react"
import { PixelatedCaseDocument } from "@/components/pixelated-case-document"
import { RulebookModal } from "@/components/rulebook-modal"
import { RejectionFeedbackModal } from "@/components/rejection-feedback-modal"

// Datos de ejemplo
const exampleCaseData = {
  title: "MEMORÁNDUM INTERNO",
  sender: "Ana Gómez, Departamento de Innovación",
  recipient: "Sr. Rodríguez, Director de Operaciones",
  subject: "Propuesta de Proyecto: EcoIniciativa Oficina Verde",
  body: "Estimado Sr. Rodríguez,\n\nLe escribo para proponer una nueva iniciativa que creo firmemente que será de gran beneficio. Se trata de implementar un sistema de reciclaje más eficiente y reducir nuestro consumo energético. Esto no solo ayudará al planeta, sino que también podría mejorar nuestra imagen corporativa y, a largo plazo, generar ahorros significativos.\n\nHe adjuntado un documento con más detalles, pero la idea central es instalar nuevos contenedores y cambiar a luces LED. Necesitaríamos una pequeña inversión inicial, pero los retornos son prometedores.\n\n¿Qué le parece si lo discutimos la próxima semana? Avíseme su disponibilidad.\n\nSaludos cordiales,\nAna Gómez\nDepartamento de Innovación",
  attachments: ["Detalles_EcoIniciativa.pdf", "Presupuesto_Estimado.xlsx"],
}

const rulebookRules = [
  "CE1: Claridad de ideas centrales - El mensaje principal debe ser fácil de entender.",
  "CE2: Estructura lógica - La información debe presentarse en un orden que facilite la comprensión.",
  "CE3: Adecuación al destinatario - El lenguaje y tono deben ser apropiados para quien recibe el mensaje.",
  "CE4: Concisión - Comunicar lo necesario sin redundancias o información irrelevante.",
  "CE5: Propósito claro - El objetivo de la comunicación debe ser evidente.",
  "CE6: Datos precisos - La información factual debe ser exacta y verificable.",
  "CE7: Llamado a la acción - Si se requiere una respuesta, debe especificarse claramente qué se espera.",
  "CE8: Profesionalismo - Mantener un tono profesional y respetuoso en todo momento.",
  "CE9: Coherencia visual - Los elementos visuales deben apoyar el mensaje, no distraer de él.",
  "CE10: Corrección gramatical - El texto debe estar libre de errores ortográficos y gramaticales.",
]

const rejectionOptions = [
  { id: "CE1", label: "CE1: Falta de claridad en las ideas principales" },
  { id: "CE2", label: "CE2: Estructura desorganizada o confusa" },
  { id: "CE3", label: "CE3: Lenguaje o tono inapropiado para el destinatario" },
  { id: "CE4", label: "CE4: Excesivamente verboso o redundante" },
  { id: "CE5", label: "CE5: Propósito de la comunicación ambiguo" },
  { id: "CE6", label: "CE6: Datos imprecisos o no verificables" },
  { id: "CE7", label: "CE7: Falta de un llamado a la acción claro" },
  { id: "CE8", label: "CE8: Tono poco profesional o irrespetuoso" },
  { id: "CE9", label: "CE9: Elementos visuales distractores o inapropiados" },
  { id: "CE10", label: "CE10: Errores ortográficos o gramaticales significativos" },
]

interface AnalystWorkstationProps {
  dayNumber: number
  currentSkillName: string
  score: number
  isLoadingCase: boolean
}

export default function AnalystWorkstation({
  dayNumber = 1,
  currentSkillName = "Comunicación Estratégica",
  score = 0,
  isLoadingCase = false,
}: AnalystWorkstationProps) {
  const [isRulebookOpen, setIsRulebookOpen] = useState(false)
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const handleApprove = () => {
    setFeedbackMessage("Documento APROBADO. Buen trabajo, analista.")
    // Aquí iría la lógica para procesar la aprobación
  }

  const handleReject = () => {
    setIsRejectionModalOpen(true)
  }

  const handleSubmitRejection = (feedback: { reasons: string[]; comments?: string }) => {
    setFeedbackMessage(
      `Documento RECHAZADO. Motivos: ${feedback.reasons.join(", ")}${
        feedback.comments ? `. Comentarios: ${feedback.comments}` : ""
      }`,
    )
    setIsRejectionModalOpen(false)
    // Aquí iría la lógica para procesar el rechazo
  }

  const handleNextCase = () => {
    setFeedbackMessage("Cargando siguiente caso...")
    // Aquí iría la lógica para cargar el siguiente caso
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-mono text-slate-200">
      {/* InfoBar - Barra Superior */}
      <div className="w-full bg-slate-800 p-2 border-b border-slate-600 flex justify-between items-center">
        <span className="text-amber-300 font-mono text-sm">DÍA: {dayNumber}</span>
        <span className="text-sky-300 font-mono text-sm">HABILIDAD: {currentSkillName}</span>
        <span className="text-green-300 font-mono text-sm">PUNTUACIÓN: {score} PTS</span>
      </div>

      {/* WorkspaceArea - Área Central */}
      <div className="flex-grow flex p-4 gap-4">
        {/* CaseDocumentDisplay - Área Principal */}
        <div className="flex-grow-[2] bg-slate-700 p-4 border border-slate-600 rounded-sm overflow-y-auto">
          {isLoadingCase ? (
            <div className="w-full h-full flex items-center justify-center text-slate-400">CARGANDO CASO...</div>
          ) : (
            <PixelatedCaseDocument caseData={exampleCaseData} />
          )}
        </div>

        {/* RulebookPanelToggle - Área Secundaria */}
        <div className="flex-grow-[1] max-w-xs flex flex-col">
          <button
            onClick={() => setIsRulebookOpen(true)}
            className="bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 border-b-4 border-sky-800 rounded-sm mb-2 flex items-center justify-center"
          >
            <BookOpen className="w-4 h-4 mr-2" style={{ imageRendering: "pixelated" }} />
            VER MANUAL
          </button>
        </div>
      </div>

      {/* ControlsAndFeedbackPanel - Panel Inferior */}
      <div className="w-full bg-slate-800 p-3 border-t border-slate-600">
        {/* ActionStamps - Botones de Acción */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={handleApprove}
            className="bg-green-500 hover:bg-green-400 text-white p-3 border-b-4 border-green-700 rounded-sm flex items-center"
          >
            <Check className="w-6 h-6 mr-2" style={{ imageRendering: "pixelated" }} />
            APROBAR
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-400 text-white p-3 border-b-4 border-red-700 rounded-sm flex items-center"
          >
            <X className="w-6 h-6 mr-2" style={{ imageRendering: "pixelated" }} />
            RECHAZAR
          </button>
        </div>

        {/* CaseNavigationControls - Navegación */}
        <div className="flex justify-end items-center mb-2">
          <button
            onClick={handleNextCase}
            className="bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border-b-4 border-amber-700 rounded-sm flex items-center"
          >
            SIGUIENTE CASO
            <ArrowRight className="w-4 h-4 ml-2" style={{ imageRendering: "pixelated" }} />
          </button>
        </div>

        {/* ImmediateFeedbackTicker - Área de Feedback */}
        <div className="h-6 text-center text-sm font-mono">
          {feedbackMessage ? (
            <span className="text-amber-300 animate-pulse">{feedbackMessage}</span>
          ) : (
            <span className="text-slate-400">Feedback aparecerá aquí...</span>
          )}
        </div>
      </div>

      {/* Modales */}
      <RulebookModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
        rulesTitle="Manual de Comunicación Estratégica"
        rulesContent={rulebookRules}
      />

      <RejectionFeedbackModal
        isOpen={isRejectionModalOpen}
        onClose={() => setIsRejectionModalOpen(false)}
        onSubmitRejection={handleSubmitRejection}
        rejectionOptions={rejectionOptions}
      />
    </div>
  )
}
