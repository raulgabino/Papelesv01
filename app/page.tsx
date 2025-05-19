"use client"

import { useState, useEffect, useRef } from "react"
import AnalystWorkstation from "@/analyst-workstation"
import { IntroSequence } from "@/components/intro-sequence"
import { TutorialOverlay } from "@/components/tutorial-overlay"

export default function Home() {
  // Referencia para rastrear si el componente está montado
  const isMounted = useRef(true)

  // Estado para depuración
  const [debugInfo, setDebugInfo] = useState<string>("")

  // Estado para controlar el flujo del juego
  const [gameState, setGameState] = useState<
    "intro" | "loading" | "tutorial" | "playing" | "day_end_summary" | "supervisor_review"
  >("intro")

  const [currentTutorialStep, setCurrentTutorialStep] = useState(0)
  const isTutorialActive = gameState === "tutorial"

  // Estados del juego
  const [dayNumber, setDayNumber] = useState(1)
  const [score, setScore] = useState(0)
  const [isLoadingCase, setIsLoadingCase] = useState(false)
  const [isLoadingNextCase, setIsLoadingNextCase] = useState(false)
  const [isNextCaseDisabled, setIsNextCaseDisabled] = useState(true)
  const [feedbackText, setFeedbackText] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info" | null>(null)
  const [caseReviewed, setCaseReviewed] = useState(false)
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [allCasesCompleted, setAllCasesCompleted] = useState(false)

  // Efecto para limpiar la referencia cuando el componente se desmonta
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Función para actualizar información de depuración
  const updateDebugInfo = (message: string) => {
    console.log(message)
    setDebugInfo((prev) => `${prev}\n${message}`)
  }

  // Mensajes del tutorial
  const tutorialMessages = [
    {
      text: "Bienvenido/a, Analista. Esta es su InfoBar: Día, Habilidad y Puntuación.",
      highlightId: "infobar",
      showButton: true,
    },
    {
      text: "Aquí se mostrará el CASO a analizar. Léalo con atención.",
      highlightId: "case-display-area",
      showButton: true,
    },
    {
      text: "Consulte el MANUAL DE NORMAS para conocer los criterios de evaluación. Es vital.",
      highlightId: "rulebook-button",
      showButton: true,
    },
    {
      text: "Después de revisar el caso, use el sello APROBAR si cumple con los criterios.",
      highlightId: "approve-button",
      showButton: true,
    },
    {
      text: "O use el sello RECHAZAR si no cumple con los criterios. Deberá especificar los motivos.",
      highlightId: "reject-button",
      showButton: true,
    },
    {
      text: "Aquí aparecerá el feedback de sus decisiones.",
      highlightId: "feedback-ticker",
      showButton: true,
    },
    {
      text: "Una vez tomada una decisión, use SIGUIENTE CASO para continuar.",
      highlightId: "next-case-button",
      showButton: true,
    },
    {
      text: "¡Excelente! Ha completado el entrenamiento. Su jornada real comienza ahora.",
      highlightId: null,
      showButton: false,
    },
  ]

  // Array de casos
  const allCases = [
    // Caso especial para el tutorial - más simple
    {
      id: 0,
      title: "MEMORÁNDUM DE PRUEBA",
      sender: "Departamento de Formación",
      recipient: "Analista Junior (Tú)",
      subject: "Documento de Práctica",
      body: "Este es un documento de prueba para familiarizarte con el sistema.\n\nPor favor, revisa si este documento cumple con las normas básicas de comunicación profesional.\n\nEste documento está correctamente estructurado y debe ser APROBADO como parte de tu entrenamiento.\n\nDepartamento de Formación",
      attachments: ["Guía_Básica.pdf"],
    },
    // Casos regulares
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

  // Manejadores para la secuencia de introducción y tutorial
  const handleIntroComplete = () => {
    try {
      updateDebugInfo("handleIntroComplete llamado")

      // Cambiar directamente al estado tutorial sin pasar por un estado de carga
      setGameState("tutorial")
      updateDebugInfo("Estado cambiado a: tutorial")

      // Inicializar otros estados necesarios
      setCurrentTutorialStep(0)
      setCurrentCaseIndex(0)
      setCaseReviewed(false)
      setIsNextCaseDisabled(true)

      // Desactivar explícitamente cualquier estado de carga
      setIsLoadingCase(false)
      setIsLoadingNextCase(false)

      updateDebugInfo("Inicialización de tutorial completada")
    } catch (error) {
      updateDebugInfo(`Error en handleIntroComplete: ${error}`)
      // En caso de error, asegurar que no nos quedemos en un estado intermedio
      setGameState("tutorial")
      setIsLoadingCase(false)
      setIsLoadingNextCase(false)
    }
  }

  // Efecto para garantizar que nunca nos quedemos en estado de carga
  useEffect(() => {
    if (gameState === "loading") {
      updateDebugInfo("Detectado estado de carga activo")

      // Establecer un temporizador de seguridad para salir del estado de carga
      const safetyTimer = setTimeout(() => {
        if (isMounted.current && gameState === "loading") {
          updateDebugInfo("Temporizador de seguridad activado - forzando salida del estado de carga")
          setGameState("tutorial")
          setIsLoadingCase(false)
          setIsLoadingNextCase(false)
        }
      }, 3000) // 3 segundos como máximo en estado de carga

      return () => clearTimeout(safetyTimer)
    }
  }, [gameState])

  const advanceTutorialStep = () => {
    try {
      updateDebugInfo(`Avanzando paso de tutorial: ${currentTutorialStep} -> ${currentTutorialStep + 1}`)

      const nextStep = currentTutorialStep + 1
      if (nextStep >= tutorialMessages.length) {
        // Fin del tutorial, comenzar el juego real
        updateDebugInfo("Fin del tutorial, cambiando a modo de juego")
        setGameState("playing")

        // Reiniciar para el primer caso real
        setCurrentCaseIndex(1) // Saltar el caso de tutorial
        setCaseReviewed(false)
        setIsNextCaseDisabled(true)
        setFeedbackText("¡Comienza tu primera jornada real!")
        setFeedbackType("info")

        // Asegurar que no haya estados de carga activos
        setIsLoadingCase(false)
        setIsLoadingNextCase(false)

        setTimeout(() => {
          if (isMounted.current) {
            setFeedbackText(null)
            setFeedbackType(null)
          }
        }, 3000)
      } else {
        setCurrentTutorialStep(nextStep)
      }
    } catch (error) {
      updateDebugInfo(`Error en advanceTutorialStep: ${error}`)
      // En caso de error, intentar avanzar de todos modos
      setCurrentTutorialStep((prev) => prev + 1)
    }
  }

  // Manejadores de eventos del juego
  const handleApprove = () => {
    if (allCasesCompleted) return

    setFeedbackText("¡Documento APROBADO! Buen trabajo, analista.")
    setFeedbackType("success")
    setScore((prev) => prev + 10)
    setCaseReviewed(true)
    setIsNextCaseDisabled(false)

    // Si estamos en el tutorial y es el paso que muestra el botón aprobar
    if (isTutorialActive && tutorialMessages[currentTutorialStep]?.highlightId === "approve-button") {
      // Avanzar automáticamente al siguiente paso después de un breve retraso
      setTimeout(() => {
        if (isMounted.current) {
          advanceTutorialStep()
        }
      }, 1500)
    }
  }

  const handleReject = () => {
    if (allCasesCompleted) return

    setFeedbackText("Documento RECHAZADO. Se han registrado los motivos.")
    setFeedbackType("error")
    setScore((prev) => prev + 5) // Menos puntos por rechazar
    setCaseReviewed(true)
    setIsNextCaseDisabled(false)

    // Si estamos en el tutorial y es el paso que muestra el botón rechazar
    if (isTutorialActive && tutorialMessages[currentTutorialStep]?.highlightId === "reject-button") {
      // Avanzar automáticamente al siguiente paso después de un breve retraso
      setTimeout(() => {
        if (isMounted.current) {
          advanceTutorialStep()
        }
      }, 1500)
    }
  }

  const handleNextCase = () => {
    if (allCasesCompleted) return

    // Si estamos en el tutorial y es el paso que muestra el botón siguiente caso
    if (isTutorialActive && tutorialMessages[currentTutorialStep]?.highlightId === "next-case-button") {
      // Avanzar al siguiente paso del tutorial en lugar de cargar un nuevo caso
      advanceTutorialStep()
      return
    }

    setFeedbackText("Cargando siguiente caso...")
    setFeedbackType("info")
    setIsLoadingNextCase(true)
    setCaseReviewed(false)
    setIsNextCaseDisabled(true)

    // Simular carga del siguiente caso
    setTimeout(() => {
      if (!isMounted.current) return

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

    // Si estamos en el tutorial y es el paso que muestra el botón del manual
    if (isTutorialActive && tutorialMessages[currentTutorialStep]?.highlightId === "rulebook-button") {
      // Avanzar automáticamente al siguiente paso después de un breve retraso
      setTimeout(() => {
        if (isMounted.current) {
          advanceTutorialStep()
        }
      }, 1500)
    }

    // Limpiar el mensaje después de un tiempo
    setTimeout(() => {
      if (isMounted.current) {
        setFeedbackText(null)
        setFeedbackType(null)
      }
    }, 2000)
  }

  // Componente de pantalla de carga
  const LoadingScreen = () => (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center">
      <div className="w-full h-2 bg-amber-300 mb-8"></div>
      <div className="text-center">
        <button
          disabled
          className="bg-blue-500 text-white py-3 px-6 border-b-4 border-blue-700 font-mono font-bold opacity-70 cursor-not-allowed"
        >
          ESPERE...
        </button>
        <p className="text-slate-400 mt-4 text-sm font-mono">Preparando estación de trabajo...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Renderizado condicional basado en el estado del juego */}
      {gameState === "intro" ? (
        <IntroSequence onIntroComplete={handleIntroComplete} />
      ) : gameState === "loading" ? (
        <LoadingScreen />
      ) : (
        <>
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

          {/* Renderizar el overlay de tutorial solo si estamos en estado tutorial */}
          {gameState === "tutorial" && (
            <TutorialOverlay
              isActive={true}
              message={tutorialMessages[currentTutorialStep]?.text || ""}
              highlightElementId={tutorialMessages[currentTutorialStep]?.highlightId || undefined}
              showNextButton={tutorialMessages[currentTutorialStep]?.showButton || false}
              onNextStep={advanceTutorialStep}
            />
          )}

          {/* Panel de depuración - solo visible en desarrollo */}
          {process.env.NODE_ENV === "development" && (
            <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 text-xs font-mono max-w-xs max-h-40 overflow-auto">
              <div>Estado: {gameState}</div>
              <div>Paso tutorial: {currentTutorialStep}</div>
              <div>Caso: {currentCaseIndex}</div>
              <div>Cargando: {isLoadingCase || isLoadingNextCase ? "Sí" : "No"}</div>
              <div className="mt-1 border-t border-gray-700 pt-1">Log:</div>
              <pre>{debugInfo}</pre>
            </div>
          )}
        </>
      )}
    </main>
  )
}
