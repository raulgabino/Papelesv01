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

  // Datos de ejemplo para el caso actual
  const currentCaseData = {
    title: "MEMORÁNDUM INTERNO",
    sender: "Ana Gómez, Departamento de Innovación",
    recipient: "Sr. Rodríguez, Director de Operaciones",
    subject: "Propuesta de Proyecto: EcoIniciativa Oficina Verde",
    body: "Estimado Sr. Rodríguez,\n\nLe escribo para proponer una nueva iniciativa que creo firmemente que será de gran beneficio. Se trata de implementar un sistema de reciclaje más eficiente y reducir nuestro consumo energético. Esto no solo ayudará al planeta, sino que también podría mejorar nuestra imagen corporativa y, a largo plazo, generar ahorros significativos.\n\nHe adjuntado un documento con más detalles, pero la idea central es instalar nuevos contenedores y cambiar a luces LED. Necesitaríamos una pequeña inversión inicial, pero los retornos son prometedores.\n\n¿Qué le parece si lo discutimos la próxima semana? Avíseme su disponibilidad.\n\nSaludos cordiales,\nAna Gómez\nDepartamento de Innovación",
    attachments: ["Detalles_EcoIniciativa.pdf", "Presupuesto_Estimado.xlsx"],
  }

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
    setFeedbackText("¡Documento APROBADO! Buen trabajo, analista.")
    setFeedbackType("success")
    setScore((prev) => prev + 10)
    setCaseReviewed(true)
    setIsNextCaseDisabled(false)
  }

  const handleReject = () => {
    setFeedbackText("Documento RECHAZADO. Se han registrado los motivos.")
    setFeedbackType("error")
    setScore((prev) => prev + 5) // Menos puntos por rechazar
    setCaseReviewed(true)
    setIsNextCaseDisabled(false)
  }

  const handleNextCase = () => {
    setFeedbackText("Cargando siguiente caso...")
    setFeedbackType("info")
    setIsLoadingNextCase(true)
    setCaseReviewed(false)
    setIsNextCaseDisabled(true)

    // Simular carga del siguiente caso
    setTimeout(() => {
      setDayNumber((prev) => prev + 1)
      setIsLoadingNextCase(false)
      setFeedbackText(null)
      setFeedbackType(null)
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
        currentCaseData={currentCaseData}
        rulebookContent={rulebookContent}
        feedbackText={feedbackText}
        feedbackType={feedbackType}
        isLoadingCase={isLoadingCase}
        isLoadingNextCase={isLoadingNextCase}
        isNextCaseDisabled={isNextCaseDisabled}
        onApprove={handleApprove}
        onReject={handleReject}
        onNextCase={handleNextCase}
        onToggleRulebook={handleToggleRulebook}
      />
    </main>
  )
}
