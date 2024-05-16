import { useContext, useEffect } from "react"
import { GameContext } from "../context/GameProvider"
import { useCountdown } from "../hooks/useCountdown"
import { formatSecondsToString, timeObjToSeconds } from "../utils/boardFn"
import { IconClock } from "./icons/IconClock"

export const CountDownComponent = () => {
  const { state, dispatch } = useContext(GameContext)
  const timer = useCountdown()

  useEffect(() => {
    if (state.time.minutes <= 0) return
    timer.start(timeObjToSeconds(state.time) - 1)
    timer.resume()
  }, [state.time])

  useEffect(() => {
    if (timer.secondsLeft <= 0 && state.time.minutes > 0) {
      timer.pause()
      dispatch({ type: "SET_GAME_OVER", isDefeat: true })
    }
  }, [timer.secondsLeft])

  useEffect(() => {
    state.lifes <= 0
      ? timer.pause() 
      : timer.resume()

    if (timer.secondsLeft <= 0 && state.lifes > 0) {
      timer.start(timeObjToSeconds({
        minutes: 2,
        seconds: 59
      }))
      timer.resume()
    }

  }, [state.lifes])

  return (
    <div
      className={`
        w-min h-min rounded-lg
        flex items-center
      `}
    > 
      <div
        className={`
          p-1 rounded-full
          ${timer.secondsLeft > 0
            ? 'bg-tremor-brand-emphasis '
            : 'bg-red-700'
          }
        `}
      >
        <IconClock
          className={`
            w-16 h-16 fill-dark-tremor-background
            stroke-none
          `} 
        />
      </div>
      <div
        className={`
          w-min h-min pr-2 py-1 rounded-lg relative
          ${timer.secondsLeft > 0
            ? 'bg-tremor-brand-emphasis'
            : 'bg-red-700'
          }
        `}
      >
        <span
          className="
            text-dark-tremor-background
            text-3xl font-extrabold relative z-[1]
          "
        >
          {formatSecondsToString(timer.secondsLeft)}
        </span>
        <div
          className={`
            h-full w-5 absolute -left-2 top-0
            ${timer.secondsLeft > 0
              ? 'bg-tremor-brand-emphasis'
              : 'bg-red-700'
            }
          `}
        />
      </div>
    </div>
  )
}