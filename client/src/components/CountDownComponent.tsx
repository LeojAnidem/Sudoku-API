import { FC, useContext, useEffect } from "react"
import { GameContext } from "../context/GameProvider"
import { formatSecondsToString, timeObjToSeconds } from "../utils/boardFn"
import { ICountDownComponent } from "../types/gameTypes"

// Bloquear sudoku cuando se halla perdido, y dar oportunidad
// de reintentar

export const CountDownComponent: FC<ICountDownComponent> = ({ timer }) => {
  const { state, dispatch } = useContext(GameContext)

  useEffect(() => {
    if (state.time.minutes <= 0) return
    timer.start(timeObjToSeconds(state.time) - 1)
  }, [state.time])

  useEffect(() => {
    if (timer.secondsLeft <= 0 && state.time.minutes > 0) {
      timer.pause()
      dispatch({ type: "CHECK_GAME_OVER" })
    }
  }, [timer.secondsLeft])

  return (
    <div>
      <span
        className="
          text-tremor-brand-emphasis text-tremor-title
          font-semibold
        "
      >
        Tiempo: {formatSecondsToString(timer.secondsLeft)}
      </span>
    </div>
  )
}