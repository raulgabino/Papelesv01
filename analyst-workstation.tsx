"use client"

import { useState } from "react"
import { Check, X, BookOpen, ArrowRight } from "lucide-react"
import { PixelatedCaseDocument } from "@/components/pixelated-case-document"
import { RulebookModal } from "@/components/rulebook-modal"
import { RejectionFeedbackModal } from "@/components/rejection-feedback-modal"
import { ImmediateFeedbackTicker } from "@/components/immediate-feedback-ticker"
import { DayEndSummaryScreen } from "@/components/day-end-summary-screen"
import { SupervisorReviewPanel } from "@/components/supervisor-review-panel"

// Datos de ejemplo
const exampleCaseDocument = {
  title: "MEMORÁNDUM INTERNO",
  sender: "Ana Gómez, Departamento de Innovación",
  recipient: "Sr. Rodríguez, Director de Operaciones",
  subject: "Propuesta de Proyecto: EcoIniciativa Oficina Verde",
  body: "Estimado Sr. Rodríguez,\n\nLe escribo para proponer una nueva iniciativa que creo firmemente que será de gran beneficio. Se trata de implementar un sistema de reciclaje más eficiente y reducir nuestro consumo energético. Esto no solo ayudará al planeta, sino que también podría mejorar nuestra imagen corporativa y, a largo plazo, generar ahorros significativos.\n\nHe adjuntado un documento con más detalles, pero la idea central es instalar nuevos contenedores y cambiar a luces LED. Necesitaríamos una pequeña inversión inicial, pero los retornos son prometedores.\n\n¿Qué le parece si lo discutimos la próxima semana? Avíseme su disponibilidad.\n\nSaludos cordiales,\nAna Gómez\nDepartamento de Innovación",
  attachments: [
    { name: "Detalles_EcoIniciativa.pdf", id: "1" },
    { name: "Presupuesto_Estimado.xlsx", id: "2" },
  ],
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

const supervisorTips = [
  "Recuerda que la claridad es fundamental en la comunicación estratégica. Asegúrate de que el mensaje principal sea fácilmente identificable.",
  "Al evaluar documentos, presta especial atención a la estructura. Una buena comunicación sigue un orden lógico que guía al lector.",
  "El tono y lenguaje deben adaptarse al destinatario. Un mensaje dirigido a un director ejecutivo debe ser diferente a uno para un compañero de equipo.",
  "La concisión es una virtud. Elimina información redundante o irrelevante que pueda distraer del mensaje principal.",
  "Siempre verifica que el propósito de la comunicación sea claro. El receptor debe entender qué se espera de él después de leer el mensaje.",
  "Los datos incorrectos pueden minar la credibilidad de todo el mensaje. Verifica siempre la precisión de la información presentada.",
]

export default function AnalystWorkstation() {
  const [day, setDay] = useState(1)
  const [skill, setSkill] = useState("Comunicación Estratégica")
  const [score, setScore] = useState(0)
  const [casesReviewed, setCasesReviewed] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState<{
    message: string
    type: "success" | "error" | "info"
  } | null>(null)

  const [isRulebookOpen, setIsRulebookOpen] = useState(false)
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false)
  const [isDayComplete, setIsDayComplete] = useState(false)
  const [isShowingSupervisorReview, setIsShowingSupervisorReview] = useState(false)

  const handleApprove = () => {
    setFeedbackMessage({
      message: "¡Caso APROBADO! Buen trabajo.",
      type: "success",
    })
    setScore((prev) => prev + 10)
    setCasesReviewed((prev) => prev + 1)

    // Simular fin del día después de 5 casos
    if (casesReviewed + 1 >= 5) {
      setTimeout(() => {
        setIsDayComplete(true)
      }, 1500)
    }
  }

  const handleReject = () => {
    setIsRejectionModalOpen(true)
  }

  const handleSubmitRejection = (data) => {
    setFeedbackMessage({
      message:
        "Caso RECHAZADO. Considera las siguientes razones: " +
        data.reasons.join(", ") +
        ". Comentarios adicionales: " +
        data.comments,
      type: "error",
    })
    setCasesReviewed((prev) => prev + 1)

    // Simular fin del día después de 5 casos
    if (casesReviewed + 1 >= 5) {
      setTimeout(() => {
        setIsDayComplete(true)
      }, 1500)
    }
  }

  const handleShowSupervisorReview = () => {
    setIsShowingSupervisorReview(true)
  }

  const handleCloseSupervisorReview = () => {
    setIsShowingSupervisorReview(false)
  }

  return (
    <div>
      <PixelatedCaseDocument caseDocument={exampleCaseDocument} />
      <button onClick={handleApprove}>
        <Check /> Aprobar
      </button>
      <button onClick={handleReject}>
        <X /> Rechazar
      </button>
      <button onClick={() => setIsRulebookOpen(true)}>
        <BookOpen /> Ver Reglamento
      </button>
      <button onClick={handleShowSupervisorReview}>
        <ArrowRight /> Solicitar Revisión del Supervisor
      </button>
      {isRulebookOpen && <RulebookModal rules={rulebookRules} onClose={() => setIsRulebookOpen(false)} />}
      {isRejectionModalOpen && (
        <RejectionFeedbackModal
          options={rejectionOptions}
          onSubmit={handleSubmitRejection}
          onClose={() => setIsRejectionModalOpen(false)}
        />
      )}
      {feedbackMessage && <ImmediateFeedbackTicker message={feedbackMessage.message} type={feedbackMessage.type} />}
      {isDayComplete && <DayEndSummaryScreen day={day} score={score} />}
      {isShowingSupervisorReview && (
        <SupervisorReviewPanel tips={supervisorTips} onClose={handleCloseSupervisorReview} />
      )}
    </div>
  )
}
