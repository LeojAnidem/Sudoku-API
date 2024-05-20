import { useContext, useEffect } from "react"
import { GameContext } from "../../../context/GameProvider"
import { useCountdown } from "../../../hooks/useCountdown"
import { formatSecondsToString, timeObjToSeconds } from "../../../utils/boardFn"
import { IconClock } from "../../icons/IconClock"

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
      onContextMenu={(e) => e.preventDefault()}
      className={`
        w-min h-min rounded-lg select-none
        flex items-center max-w-[128px]
      `}
    > 
      <div
        className={`
          p-1 rounded-full border-4
        bg-dark-tremor-background
          ${timer.secondsLeft > 0
            ? 'border-tremor-brand-emphasis'
            : 'border-red-700'
          }
        `}
      >
        <IconClock
          className={`
            w-10 h-10 stroke-none
            ${timer.secondsLeft > 0
              ? 'fill-tremor-brand-emphasis'
              : 'fill-red-700'
            }
          `} 
        />
      </div>
      <div
        className={`
          w-min h-min pr-1 py-1 rounded-lg relative
          ${timer.secondsLeft > 0
            ? 'bg-tremor-brand-emphasis'
            : 'bg-red-700'
          }
        `}
      >
        <span
          className={`
            text-2xl font-extrabold relative z-[1] pr-2
            bg-dark-tremor-background rounded-md
            ${timer.secondsLeft > 0
              ? 'text-tremor-brand-emphasis'
              : 'text-red-700'
            }
          `}
        >
          {formatSecondsToString(timer.secondsLeft)}
        </span>
        <div
          className={`
            h-full w-5 absolute -left-2.5 top-0
            border-t-4 border-b-4
            bg-dark-tremor-background
            ${timer.secondsLeft > 0
              ? `
                  border-t-tremor-brand-emphasis
                  border-b-tremor-brand-emphasis
                `
              : `
                  border-t-red-700
                  border-b-red-700
                `
            }
          `}
        />
      </div>
    </div>
  )
}