"use client"

import { useState } from "react"
import { Check, X, BookOpen, ArrowRight } from "lucide-react"
import { PixelatedCaseDocument } from "@/components/pixelated-case-document"
import { RulebookModal } from "@/components/rulebook-modal"
import { RejectionFeedbackModal } from "@/components/rejection-feedback-modal"
import { ImmediateFeedbackTicker } from "@/components/immediate-feedback-ticker"

// Tipos
export interface CaseData {
  id?: number
  title?: string
  sender?: string
  recipient?: string
  subject?: string
  body: string
  attachments?: string[]
}

export interface RuleItem {
  id: string
  name: string
  description?: string
}

export interface AnalystWorkstationProps {
  dayNumber: number
  currentSkillName: string
  score: number
  currentCaseData: CaseData | null
  rulebookContent: RuleItem[] | null
  feedbackText: string | null
  feedbackType: "success" | "error" | "info" | null
  isLoadingCase: boolean
  isLoadingNextCase: boolean
  isNextCaseDisabled: boolean
  onApprove: () => void
  onReject: () => void
  onNextCase: () => void
  onToggleRulebook: () => void
}

export default function AnalystWorkstation({
  dayNumber = 1,
  currentSkillName = "Comunicación Estratégica",
  score = 0,
  currentCaseData = null,
  rulebookContent = [],
  feedbackText = null,
  feedbackType = null,
  isLoadingCase = false,
  isLoadingNextCase = false,
  isNextCaseDisabled = false,
  onApprove = () => {},
  onReject = () => {},
  onNextCase = () => {},
  onToggleRulebook = () => {},
}: AnalystWorkstationProps) {
  const [isRulebookOpen, setIsRulebookOpen] = useState(false)
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false)

  // Datos de ejemplo para el rulebook si no se proporciona
  const defaultRulebookContent = [
    {
      id: "CE1",
      name: "Claridad de ideas centrales",
      description: "El mensaje principal debe ser fácil de entender.",
    },
    {
      id: "CE2",
      name: "Estructura lógica",
      description: "La información debe presentarse en un orden que facilite la comprensión.",
    },
    {
      id: "CE3",
      name: "Adecuación al destinatario",
      description: "El lenguaje y tono deben ser apropiados para quien recibe el mensaje.",
    },
    {
      id: "CE4",
      name: "Concisión",
      description: "Comunicar lo necesario sin redundancias o información irrelevante.",
    },
    {
      id: "CE5",
      name: "Propósito claro",
      description: "El objetivo de la comunicación debe ser evidente.",
    },
  ]

  // Datos de ejemplo para el caso si no se proporciona
  const defaultCaseData = {
    title: "MEMORÁNDUM INTERNO",
    sender: "Ana Gómez, Departamento de Innovación",
    recipient: "Sr. Rodríguez, Director de Operaciones",
    subject: "Propuesta de Proyecto: EcoIniciativa Oficina Verde",
    body: "Estimado Sr. Rodríguez,\n\nLe escribo para proponer una nueva iniciativa que creo firmemente que será de gran beneficio. Se trata de implementar un sistema de reciclaje más eficiente y reducir nuestro consumo energético. Esto no solo ayudará al planeta, sino que también podría mejorar nuestra imagen corporativa y, a largo plazo, generar ahorros significativos.\n\nHe adjuntado un documento con más detalles, pero la idea central es instalar nuevos contenedores y cambiar a luces LED. Necesitaríamos una pequeña inversión inicial, pero los retornos son prometedores.\n\n¿Qué le parece si lo discutimos la próxima semana? Avíseme su disponibilidad.\n\nSaludos cordiales,\nAna Gómez\nDepartamento de Innovación",
    attachments: ["Detalles_EcoIniciativa.pdf", "Presupuesto_Estimado.xlsx"],
  }

  const handleToggleRulebook = () => {
    setIsRulebookOpen(!isRulebookOpen)
    onToggleRulebook()
  }

  const handleReject = () => {
    setIsRejectionModalOpen(true)
  }

  const handleSubmitRejection = (feedback: { reasons: string[]; comments?: string }) => {
    setIsRejectionModalOpen(false)
    onReject()
  }

  // Verificar si todos los casos han sido procesados
  const allCasesCompleted = !currentCaseData && !isLoadingCase

  // Usar los datos proporcionados o los datos por defecto
  const caseToDisplay = currentCaseData || defaultCaseData
  const rulesToDisplay = rulebookContent || defaultRulebookContent

  // Convertir las reglas al formato esperado por RulebookModal
  const formattedRules = rulesToDisplay.map((rule) => `${rule.id}: ${rule.name} - ${rule.description || ""}`)

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-mono text-slate-200">
      {/* InfoBar - Barra Superior */}
      <div
        id="infobar"
        className="w-full bg-slate-800 p-2 border-b-2 border-slate-600 flex justify-between items-center"
      >
        <span className="text-amber-300 font-mono text-sm">DÍA: {dayNumber}</span>
        <span className="text-sky-300 font-mono text-sm">HABILIDAD: {currentSkillName}</span>
        <span className="text-green-300 font-mono text-sm">PUNTUACIÓN: {score} PTS</span>
      </div>

      {/* WorkspaceArea - Área Central */}
      <div className="flex-grow p-4 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* CaseDocumentDisplay - Área Principal */}
        <div
          id="case-display-area"
          className="flex-grow-[2] bg-slate-700 p-3 md:p-4 border border-slate-600 rounded-sm overflow-y-auto"
        >
          {isLoadingCase ? (
            <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono">
              <div className="animate-pulse flex flex-col items-center">
                <div className="mb-2">CARGANDO CASO...</div>
                <div className="h-2 w-24 bg-slate-600 rounded"></div>
              </div>
            </div>
          ) : allCasesCompleted ? (
            <div className="w-full h-full flex items-center justify-center text-amber-300 font-mono">
              <div className="text-center max-w-md">
                <h2 className="text-2xl mb-4">¡JORNADA FINALIZADA!</h2>
                <p className="mb-4">Has completado todos los casos disponibles.</p>
                <p>
                  Puntuación final: <span className="text-green-400 font-bold">{score}</span> puntos
                </p>
              </div>
            </div>
          ) : (
            <PixelatedCaseDocument caseData={caseToDisplay} />
          )}
        </div>

        {/* RulebookPanelArea - Área Secundaria */}
        <div className="flex-grow-[1] max-w-xs bg-slate-800 p-3 border border-slate-600 rounded-sm flex flex-col">
          <button
            id="rulebook-button"
            onClick={handleToggleRulebook}
            className="bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 border-b-4 border-sky-800 rounded-sm mb-2 flex items-center justify-center font-mono font-bold"
          >
            <BookOpen className="w-4 h-4 mr-2" style={{ imageRendering: "pixelated" }} />
            VER MANUAL
          </button>

          <div className="text-xs text-slate-400 mt-2 flex-grow">
            <p className="mb-2">Consulta el manual para revisar las reglas de evaluación.</p>
            <p>Recuerda que cada decisión afecta tu puntuación final.</p>
          </div>
        </div>
      </div>

      {/* ControlsAndFeedbackPanel - Panel Inferior */}
      <div className="w-full bg-slate-800 p-3 md:p-4 border-t-2 border-slate-600 shadow-inner">
        {/* ImmediateFeedbackTicker - Área de Feedback */}
        <div
          id="feedback-ticker"
          className="h-8 text-center font-mono text-sm rounded-sm flex items-center justify-center mb-3 px-2"
        >
          {feedbackText && feedbackType && (
            <ImmediateFeedbackTicker message={feedbackText} type={feedbackType} duration={5000} />
          )}
        </div>

        {/* ActionStamps - Botones de Acción */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mb-3">
          <button
            id="approve-button"
            onClick={onApprove}
            className={`bg-green-500 hover:bg-green-400 text-white py-3 px-5 md:py-4 md:px-6 border-b-4 border-green-700 rounded-sm flex items-center font-mono font-bold text-base md:text-lg ${
              isLoadingCase || isLoadingNextCase || allCasesCompleted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoadingCase || isLoadingNextCase || allCasesCompleted}
          >
            <Check className="w-6 h-6 mr-2" style={{ imageRendering: "pixelated" }} />
            APROBAR
          </button>
          <button
            id="reject-button"
            onClick={handleReject}
            className={`bg-red-500 hover:bg-red-400 text-white py-3 px-5 md:py-4 md:px-6 border-b-4 border-red-700 rounded-sm flex items-center font-mono font-bold text-base md:text-lg ${
              isLoadingCase || isLoadingNextCase || allCasesCompleted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoadingCase || isLoadingNextCase || allCasesCompleted}
          >
            <X className="w-6 h-6 mr-2" style={{ imageRendering: "pixelated" }} />
            RECHAZAR
          </button>
        </div>

        {/* CaseNavigationControls - Navegación */}
        <div className="flex justify-between items-center">
          {/* Placeholder para Mensaje de Carga */}
          <div className="w-1/3 text-left">
            {isLoadingNextCase && (
              <span className="text-sm font-mono text-slate-400 animate-pulse">Cargando siguiente caso...</span>
            )}
          </div>

          {/* Espacio central */}
          <div className="w-1/3 flex justify-center"></div>

          {/* Botón Siguiente Caso */}
          <div className="w-1/3 text-right">
            <button
              id="next-case-button"
              onClick={onNextCase}
              disabled={isNextCaseDisabled || isLoadingCase || isLoadingNextCase || allCasesCompleted}
              className={`bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border-b-4 border-amber-700 rounded-sm flex items-center font-mono font-bold ml-auto ${
                isNextCaseDisabled || isLoadingCase || isLoadingNextCase || allCasesCompleted
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              SIGUIENTE CASO
              <ArrowRight className="w-4 h-4 ml-2" style={{ imageRendering: "pixelated" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <RulebookModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
        rulesTitle={`Manual de ${currentSkillName}`}
        rulesContent={formattedRules}
      />

      <RejectionFeedbackModal
        isOpen={isRejectionModalOpen}
        onClose={() => setIsRejectionModalOpen(false)}
        onSubmitRejection={handleSubmitRejection}
        rejectionOptions={rulesToDisplay.map((rule) => ({ id: rule.id, label: `${rule.id}: ${rule.name}` }))}
      />
    </div>
  )
}
