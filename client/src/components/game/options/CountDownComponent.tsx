import { useContext, useEffect } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameEnum"
import { formatSecondsToString, timeObjToSeconds } from "../../../utils/boardFn"
import { IconClock } from "../../icons/IconClock"

export const CountDownComponent = () => {
  const { state, dispatch, timer } = useContext(GameContext)

  useEffect(() => {
    if (state.time.minutes > 0 && state.status === GameStatus.playing) {
      timer.start(timeObjToSeconds(state.time) - 1)
      timer.resume()
    }
  }, [state.time])

  useEffect(() => {
    if (timer.secondsLeft <= 0 && state.time.minutes > 0) {
      timer.pause()
      dispatch({ type: "SET_STATUS", status: GameStatus.gameOver })
    }
  }, [timer.secondsLeft])

  useEffect(() => {
    if (state.status === GameStatus.gameOver) {
      dispatch({type: 'SET_STATUS', status: GameStatus.playing})

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
          ${state.status !== GameStatus.gameOver
            ? 'border-tremor-brand-emphasis'
            : 'border-red-700'
          }
        `}
      >
        <IconClock
          className={`
            w-10 h-10 stroke-none
            ${state.status !== GameStatus.gameOver
              ? 'fill-tremor-brand-emphasis'
              : 'fill-red-700'
            }
          `} 
        />
      </div>
      <div
        className={`
          w-min h-min pr-1 py-1 rounded-lg relative
          ${state.status !== GameStatus.gameOver
            ? 'bg-tremor-brand-emphasis'
            : 'bg-red-700'
          }
        `}
      >
        <span
          className={`
            text-2xl font-extrabold relative z-[1] pr-2
            bg-dark-tremor-background rounded-md
            ${state.status !== GameStatus.gameOver
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
            ${state.status !== GameStatus.gameOver
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