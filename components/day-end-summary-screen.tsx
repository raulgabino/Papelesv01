"use client"

interface DayEndSummaryScreenProps {
  skillName: string
  finalScore: number
  onAcknowledge: () => void
}

export function DayEndSummaryScreen({ skillName, finalScore, onAcknowledge }: DayEndSummaryScreenProps) {
  // Determinar mensaje basado en la puntuación
  const getFeedbackMessage = () => {
    if (finalScore >= 80) {
      return "¡Excelente trabajo! Has demostrado gran dominio de esta habilidad."
    } else if (finalScore >= 60) {
      return "Buen trabajo. Has mostrado competencia en esta habilidad, pero hay áreas de mejora."
    } else if (finalScore >= 40) {
      return "Has completado la evaluación con resultados mixtos. Hay varias áreas que requieren atención."
    } else {
      return "Esta habilidad necesita desarrollo significativo. Revisa cuidadosamente los consejos del supervisor."
    }
  }

  return (
    <div className="bg-slate-800 border-2 border-slate-600 w-full h-full flex flex-col items-center justify-center p-6 font-mono">
      <div className="text-center max-w-lg">
        <h1 className="text-amber-300 text-3xl font-bold mb-6 uppercase tracking-wider">¡JORNADA FINALIZADA!</h1>

        <div className="bg-slate-700 border border-slate-600 p-6 mb-6">
          <div className="mb-4">
            <span className="text-sky-300 block mb-1">Habilidad Evaluada:</span>
            <span className="text-white text-xl">{skillName}</span>
          </div>

          <div className="mb-6">
            <span className="text-green-300 block mb-1">Puntuación Obtenida:</span>
            <span className="text-2xl font-bold">
              <span className={finalScore >= 60 ? "text-green-400" : "text-red-400"}>{finalScore}</span> / 100 PTS
            </span>
          </div>

          <p className="text-slate-300 mb-4">{getFeedbackMessage()}</p>

          <p className="text-slate-400 text-sm">El Supervisor revisará tu desempeño y preparará algunos consejos.</p>
        </div>

        <button
          onClick={onAcknowledge}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 border-b-4 border-purple-900 uppercase tracking-wide"
        >
          VER CONSEJOS DEL SUPERVISOR
        </button>
      </div>
    </div>
  )
}
