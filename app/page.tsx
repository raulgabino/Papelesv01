"use client"

import { useState } from "react"
import AnalystWorkstation from "@/analyst-workstation"

export default function Home() {
  // Estado para controlar el flujo del juego
  const [dayNumber, setDayNumber] = useState(1)
  const [score, setScore] = useState(0)
  const [isLoadingCase, setIsLoadingCase] = useState(false)
  const [isLoadingNextCase, setIsLoadingNextCase] = useState(false)
  const [isNextCaseDisabled, setIsNextCaseDisabled] = useState(true)
  const [feedbackText, setFeedbackText] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info" | null>(null)
  const [caseReviewed, setCaseReviewed] = useState(false)

  // Nuevo estado para rastrear el índice del caso actual
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)

  // Array de casos en lugar de un solo caso estático
  const allCases = [
    {
      id: 1,
      title: "MEMORÁNDUM INTERNO",
      sender: "Ana Gómez, Dept. Innovación",
      recipient: "Sr. Rodríguez, Dir. Operaciones",
      subject: "Propuesta Proyecto: EcoIniciativa Oficina Verde",
      body: "Estimado Sr. Rodríguez,\n\nPropongo implementar un sistema de reciclaje eficiente y reducir consumo energético. Adjunto detalles y presupuesto. ¿Podríamos discutirlo la próxima semana?\n\nSaludos,\nAna Gómez",
      attachments: ["Detalles_EcoIniciativa.pdf", "Presupuesto_Estimado.xlsx"],
    },
    {
      id: 2,
      title: "EMAIL URGENTE: Revisión de Software",
      sender: "equipo.ti@empresa.com",
      recipient: "Analista de Calidad (Tú)",
      subject: "URGENTE: Fallo en sistema de login",
      body: "Se ha detectado un fallo crítico en el nuevo módulo de login que impide el acceso a usuarios nuevos. Se requiere análisis y reporte de impacto inmediato. Prioridad ALTA.\n\nEquipo de TI.",
      attachments: ["log_error_sistema.txt"],
    },
    {
      id: 3,
      title: "INFORME DE PROPUESTA",
      sender: "Luis Fernandez, Marketing",
      recipient: "Comité de Proyectos",
      subject: "Campaña Publicitaria Q3",
      body: "Presentamos la propuesta para la campaña publicitaria del tercer trimestre. Enfocada en redes sociales y colaboraciones con influencers. Se espera un ROI del 15%.\n\nDetalles en adjunto.\n\nGracias,\nLuis Fernandez",
      attachments: ["Propuesta_CampañaQ3.docx", "Estimacion_Costos_Q3.xlsx"],
    },
  ]

  // Estado para controlar si todos los casos han sido procesados
  const [allCasesCompleted, setAllCasesCompleted] = useState(false)

  // Datos de ejemplo para el rulebook
  const rulebookContent = [
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

  // Manejadores de eventos
  const handleApprove = () => {
    if (allCasesCompleted) return

    setFeedbackText("¡Documento APROBADO! Buen trabajo, analista.")
    setFeedbackType("success")
    setScore((prev) => prev + 10)
    setCaseReviewed(true)
    setIsNextCaseDisabled(false)
  }

  const handleReject = () => {
    if (allCasesCompleted) return

    setFeedbackText("Documento RECHAZADO. Se han registrado los motivos.")
    setFeedbackType("error")
    setScore((prev) => prev + 5) // Menos puntos por rechazar
    setCaseReviewed(true)
    setIsNextCaseDisabled(false)
  }

  const handleNextCase = () => {
    if (allCasesCompleted) return

    setFeedbackText("Cargando siguiente caso...")
    setFeedbackType("info")
    setIsLoadingNextCase(true)
    setCaseReviewed(false)
    setIsNextCaseDisabled(true)

    // Simular carga del siguiente caso
    setTimeout(() => {
      // Incrementar el día
      setDayNumber((prev) => prev + 1)

      // Verificar si hay más casos disponibles
      if (currentCaseIndex >= allCases.length - 1) {
        // No hay más casos, mostrar mensaje de finalización
        setFeedbackText("¡Todos los casos han sido procesados! Buen trabajo, Analista.")
        setFeedbackType("success")
        setAllCasesCompleted(true)
        setIsLoadingNextCase(false)
      } else {
        // Avanzar al siguiente caso
        setCurrentCaseIndex((prev) => prev + 1)
        setIsLoadingNextCase(false)
        setFeedbackText(null)
        setFeedbackType(null)
      }
    }, 2000)
  }

  const handleToggleRulebook = () => {
    setFeedbackText("Consultando manual de normas...")
    setFeedbackType("info")

    // Limpiar el mensaje después de un tiempo
    setTimeout(() => {
      setFeedbackText(null)
      setFeedbackType(null)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <AnalystWorkstation
        dayNumber={dayNumber}
        currentSkillName="Comunicación Estratégica"
        score={score}
        currentCaseData={allCasesCompleted ? null : allCases[currentCaseIndex]}
        rulebookContent={rulebookContent}
        feedbackText={feedbackText}
        feedbackType={feedbackType}
        isLoadingCase={isLoadingCase}
        isLoadingNextCase={isLoadingNextCase}
        isNextCaseDisabled={isNextCaseDisabled || allCasesCompleted}
        onApprove={handleApprove}
        onReject={handleReject}
        onNextCase={handleNextCase}
        onToggleRulebook={handleToggleRulebook}
      />
    </main>
  )
}
