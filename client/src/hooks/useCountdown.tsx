import { useEffect, useRef, useState } from "react";
import { CountDownHookType, Timer } from "../types/gameTypes";

export const useCountdown = (): CountDownHookType => {
  const INITIAL_STATE: Timer = {
    secondsLeft: 0,
    isPaused: true
  }
  
  const [timerState, setTimerState] = useState(INITIAL_STATE)
  const {secondsLeft, isPaused} = timerState

  const countdownId = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (!isPaused) {
      countdownId.current = setInterval(() => {
        setTimerState((prev) => {
          return {
            ...prev,
            secondsLeft: prev.secondsLeft - 1
          }
        })
      }, 1000)
    } else {
      clearInterval(countdownId.current)
    }

    return () => clearInterval(countdownId.current)
  }, [isPaused])

  const start = (seconds: number) => setTimerState((prev) => {
    return {
      ...prev,
      secondsLeft: seconds,
      isPaused: false
    }
  })
  
  const pause = () => setTimerState((prev) => {
    return {
      ...prev,
      isPaused: true
    }
  })

  const resume = () => setTimerState((prev) => {
    return {
      ...prev,
      isPaused: false
    }
  })
  
  return {secondsLeft, start, pause, resume}
}