"use client"

interface DayEndSummaryScreenProps {
  skillName: string
  finalScore: number
  onProceedToReview: () => void
}

export function DayEndSummaryScreen({ skillName, finalScore, onProceedToReview }: DayEndSummaryScreenProps) {
  return (
    <div className="bg-slate-800 p-6 md:p-8 border-2 border-slate-600 rounded-md shadow-lg text-center flex flex-col items-center justify-center h-full max-w-lg mx-auto">
      <h1 className="text-3xl md:text-4xl font-mono font-bold text-amber-300 mb-6">¡JORNADA FINALIZADA!</h1>

      <div className="bg-slate-700 p-4 rounded-sm border border-slate-600 w-full mb-6">
        <p className="text-sky-300 mb-2 text-lg">Habilidad Evaluada: {skillName}</p>
        <p className="text-2xl font-bold mb-3">
          Puntuación Obtenida: <span className="text-green-400">{finalScore}</span> / 100 PTS
        </p>

        {finalScore < 60 && (
          <p className="text-sm text-yellow-300 mt-2">
            Esta habilidad necesita desarrollo significativo. Revisa cuidadosamente los consejos del supervisor.
          </p>
        )}

        {finalScore >= 60 && finalScore < 80 && (
          <p className="text-sm text-yellow-200 mt-2">
            Buen trabajo, pero hay áreas de mejora. Los consejos del supervisor te ayudarán a perfeccionar esta
            habilidad.
          </p>
        )}

        {finalScore >= 80 && (
          <p className="text-sm text-green-300 mt-2">
            ¡Excelente trabajo! Has demostrado un gran dominio de esta habilidad.
          </p>
        )}

        <p className="text-sm text-slate-300 mt-4">
          El Supervisor revisará tu desempeño y preparará algunos consejos. ¡Buen trabajo!
        </p>
      </div>

      <button
        onClick={onProceedToReview}
        className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 text-base rounded-sm border-b-4 border-purple-800 font-mono"
      >
        VER CONSEJOS DEL SUPERVISOR
      </button>
    </div>
  )
}
