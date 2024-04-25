import { useContext, useEffect, useRef, useState } from "react"
import { GameContext } from "../context/GameProvider"
import { formatSecondsToString, timeObjToSeconds } from "../utils/boardFn"

export const CountDownComponent = () => {
  const { state, dispatch} = useContext(GameContext)
  const [countDown, setCoundown] = useState(timeObjToSeconds(state.time))
  const timerId = useRef(0)

  useEffect(() => {
    setCoundown(timeObjToSeconds(state.time) - 1)
  }, [state.time])

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCoundown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timerId.current)
      dispatch({type: "CHECK_GAME_OVER"})
    }
  }, [countDown])

  return (
    <div>
      <span
        className="
          text-tremor-brand-emphasis text-tremor-title
          font-semibold
        "
      >
        Tiempo: {formatSecondsToString(countDown)}
      </span>
    </div>
  )
}