"use client"

import { useState } from "react"
import AnalystWorkstation from "@/analyst-workstation"
import { ImmediateFeedbackTicker } from "@/components/immediate-feedback-ticker"
import { DayEndSummaryScreen } from "@/components/day-end-summary-screen"
import { SupervisorReviewPanel } from "@/components/supervisor-review-panel"

export default function Home() {
  const [showDemo, setShowDemo] = useState(false)
  const [demoComponent, setDemoComponent] = useState<string>("workstation")

  // Datos de ejemplo para los componentes de demostración
  const supervisorTips = [
    "Asegúrate de verificar siempre la coherencia entre el asunto y el contenido del mensaje. Algunos casos tenían discrepancias sutiles.",
    "Cuando evalúes propuestas de proyectos, presta especial atención a si incluyen datos concretos que respalden las afirmaciones.",
    "Los mensajes que solicitan acciones específicas deben incluir plazos claros. Varios casos aprobados carecían de esta información esencial.",
    "La formalidad del lenguaje debe adaptarse al destinatario. Recuerda que la comunicación con directivos requiere un tono más formal que la comunicación entre departamentos del mismo nivel.",
    "Las comunicaciones efectivas suelen tener una estructura clara: introducción, desarrollo y conclusión. Busca esta estructura al evaluar los casos.",
  ]

  // Función para cambiar entre componentes de demostración
  const handleDemoChange = (component: string) => {
    setDemoComponent(component)
  }

  return (
    <main className="min-h-screen bg-slate-900 p-4">
      {!showDemo ? (
        <div className="max-w-4xl mx-auto bg-slate-800 p-6 border border-slate-600 font-mono text-white">
          <h1 className="text-2xl text-amber-300 mb-6 text-center">SKILL INSPECTOR - DEMOSTRACIÓN DE COMPONENTES</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => {
                setShowDemo(true)
                setDemoComponent("workstation")
              }}
              className="bg-slate-700 hover:bg-slate-600 p-4 border border-slate-600 text-center"
            >
              Ver Estación de Trabajo
            </button>

            <button
              onClick={() => {
                setShowDemo(true)
                setDemoComponent("feedback")
              }}
              className="bg-blue-700 hover:bg-blue-600 p-4 border border-blue-800 text-center"
            >
              Ver Feedback Inmediato
            </button>

            <button
              onClick={() => {
                setShowDemo(true)
                setDemoComponent("dayend")
              }}
              className="bg-purple-700 hover:bg-purple-600 p-4 border border-purple-800 text-center"
            >
              Ver Resumen de Fin de Día
            </button>

            <button
              onClick={() => {
                setShowDemo(true)
                setDemoComponent("supervisor")
              }}
              className="bg-amber-700 hover:bg-amber-600 p-4 border border-amber-800 text-center"
            >
              Ver Panel del Supervisor
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Botón para volver */}
          <button
            onClick={() => setShowDemo(false)}
            className="mb-4 bg-slate-700 hover:bg-slate-600 px-4 py-2 border border-slate-600 font-mono text-white"
          >
            ← VOLVER AL MENÚ
          </button>

          {/* Componentes de demostración */}
          {demoComponent === "workstation" && <AnalystWorkstation />}

          {demoComponent === "feedback" && (
            <div className="max-w-4xl mx-auto bg-slate-800 p-6 border border-slate-600 font-mono text-white">
              <h2 className="text-xl text-amber-300 mb-6">Ejemplos de Feedback Inmediato</h2>

              <div className="space-y-4">
                <ImmediateFeedbackTicker
                  message="¡Documento aprobado correctamente!"
                  type="success"
                  duration={100000} // Duración larga para la demo
                />

                <ImmediateFeedbackTicker message="Documento rechazado por 3 motivos" type="error" duration={100000} />

                <ImmediateFeedbackTicker message="Cargando siguiente caso..." type="info" duration={100000} />
              </div>
            </div>
          )}

          {demoComponent === "dayend" && (
            <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-600 h-[600px]">
              <DayEndSummaryScreen
                skillName="Comunicación Estratégica"
                finalScore={75}
                onAcknowledge={() => handleDemoChange("supervisor")}
              />
            </div>
          )}

          {demoComponent === "supervisor" && (
            <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-600 h-[600px]">
              <SupervisorReviewPanel
                supervisorName="Supervisor Martínez"
                tips={supervisorTips}
                onClose={() => handleDemoChange("workstation")}
              />
            </div>
          )}
        </>
      )}
    </main>
  )
}
