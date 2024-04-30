import { useEffect, useRef, useState } from "react";
import { CountDownHook, Timer } from "../types/gameTypes";

export const useCountdown = (): CountDownHook => {
  const INITIAL_STATE: Timer = {
    secondsLeft: 0,
    isPaused: false
  }
  
  const [timerState, setTimerState] = useState(INITIAL_STATE)
  const {secondsLeft, isPaused} = timerState

  const countdownId = useRef(0)

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
      secondsLeft: seconds
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