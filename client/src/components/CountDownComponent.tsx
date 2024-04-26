import { useContext, useEffect } from "react"
import { GameContext } from "../context/GameProvider"
import { useCountdown } from "../hooks/useCountdown"
import { formatSecondsToString, timeObjToSeconds } from "../utils/boardFn"

// Agregar Cambio de color cuando el tiempo llegue a cero
// Igual con las vidas
// Bloquear sudoku cuando se halla perdido, y dar oportunidad
// de reintentar

export const CountDownComponent = () => {
  const { state, dispatch } = useContext(GameContext)
  const { secondsLeft, start, pause } = useCountdown()

  useEffect(() => {
    if (state.time.minutes <= 0) return
    start(timeObjToSeconds(state.time) - 1)
  }, [state.time])

  useEffect(() => {
    if (secondsLeft <= 0 && state.time.minutes > 0) 
      dispatch({type: "CHECK_GAME_OVER"})
  }, [secondsLeft])

  // No borrar o mover, por alguna razon
  // que no comprendo solo actualiza el estado aqui
  // llevo 3 horas observando el motivo y no lo he
  // encontrado.
  //
  // #horas_usadas_revisando_error = 3
  useEffect(() => {
    if (state.lifes <= 0) {
      pause()
      dispatch({type: "CHECK_GAME_OVER"})
    }
  }, [state.lifes])

  return (
    <div>
      <span
        className="
          text-tremor-brand-emphasis text-tremor-title
          font-semibold
        "
      >
        Tiempo: {formatSecondsToString(secondsLeft)}
      </span>
    </div>
  )
}