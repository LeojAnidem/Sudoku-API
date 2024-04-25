import { useContext, useEffect } from "react"
import { GameContext } from "../context/GameProvider"
import useCountdown from "../hooks/useCountdown"
import { formatSecondsToString, timeObjToSeconds } from "../utils/boardFn"

export const CountDownComponent = () => {
  const { state, dispatch } = useContext(GameContext)
  const { secondsLeft, start } = useCountdown()

  useEffect(() => {
    if (state.time.minutes <= 0) return
    start(timeObjToSeconds(state.time) - 1)
  }, [state.time])

  useEffect(() => {
    if (secondsLeft <= 0 && state.time.minutes > 0) 
      dispatch({type: "CHECK_GAME_OVER"})
  }, [secondsLeft])

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