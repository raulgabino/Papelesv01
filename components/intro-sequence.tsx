"use client"

import { useState, useEffect, useRef } from "react"

interface IntroSequenceProps {
  onIntroComplete: () => void
}

export function IntroSequence({ onIntroComplete }: IntroSequenceProps) {
  const [currentState, setCurrentState] = useState<"title" | "letter">("title")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const introCompleted = useRef(false)
  const letterContentRef = useRef<string>(`
========================================
MINISTERIO DE ESTÁNDARES PROFESIONALES
========================================

EXPEDIENTE: ANALISTA JUNIOR #0042

Estimado/a Analista,

Tras una rigurosa evaluación, ha sido seleccionado/a para
el puesto de Analista de Documentos en el Departamento
de Evaluación de Habilidades.

Su labor será crucial para mantener los más altos
estándares de profesionalismo en nuestra organización.

Preséntese en su terminal asignada de inmediato.
La eficiencia y la precisión son primordiales.

Atentamente,
El Supervisor Principal
----------------------------------------
  `)

  // Efecto para el efecto de teletipo
  useEffect(() => {
    if (currentState === "letter" && !isTyping) {
      setIsTyping(true)
      const content = letterContentRef.current
      let index = 0
      const timer = setInterval(() => {
        if (index < content.length) {
          setDisplayedText(content.substring(0, index + 1))
          index++
        } else {
          clearInterval(timer)
          setIsTyping(false)
        }
      }, 30) // Velocidad del efecto de teletipo

      return () => clearInterval(timer)
    }
  }, [currentState, isTyping])

  // Manejador para el botón de comenzar
  const handleStartGame = () => {
    setCurrentState("letter")
  }

  // CORRECCIÓN CRÍTICA: Función simplificada para manejar la aceptación de la misión
  // Esta función DEBE llamar a onIntroComplete de forma directa y garantizada
  const handleAcceptMission = () => {
    // console.log('[DEBUG] handleAcceptMission: INICIO');

    // Si aún está escribiendo, mostrar todo el texto de una vez
    if (isTyping) {
      setDisplayedText(letterContentRef.current)
      setIsTyping(false)
    }

    // Evitar llamadas múltiples a onIntroComplete
    if (!introCompleted.current) {
      introCompleted.current = true
      // console.log('[DEBUG] handleAcceptMission: Llamando a onIntroComplete');

      // Llamar DIRECTAMENTE a onIntroComplete sin setTimeout
      onIntroComplete()
    }

    // console.log('[DEBUG] handleAcceptMission: FIN');
  }

  // Manejador para la tecla Enter - SIMPLIFICADO
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (currentState === "title") {
          handleStartGame()
        } else if (currentState === "letter") {
          handleAcceptMission()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentState])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-mono">
      {currentState === "title" ? (
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-300 mb-4 tracking-wider">SKILL INSPECTOR</h1>
          <p className="text-slate-400 mb-12">Ministerio de Estándares Profesionales</p>
          <button
            onClick={handleStartGame}
            className="bg-green-500 hover:bg-green-400 text-white py-3 px-6 border-b-4 border-green-700 font-mono font-bold text-lg"
          >
            COMENZAR PARTIDA
          </button>
          <p className="text-slate-500 mt-8 text-sm">[PRESIONE ENTER PARA CONTINUAR]</p>
        </div>
      ) : (
        <div className="max-w-2xl w-full">
          <div className="bg-amber-100 text-slate-800 p-6 border border-slate-400 font-mono whitespace-pre-wrap">
            {displayedText}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleAcceptMission}
              className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 border-b-4 border-blue-700 font-mono font-bold"
              disabled={isTyping}
            >
              {isTyping ? "ESPERE..." : "ACEPTAR MISIÓN"}
            </button>
          </div>
          {!isTyping && <p className="text-slate-500 mt-4 text-center text-sm">[PRESIONE ENTER PARA CONTINUAR]</p>}
        </div>
      )}
    </div>
  )
}
