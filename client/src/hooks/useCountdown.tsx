import { useEffect, useRef, useState } from "react";

export default function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const countdownId = useRef(0)

  useEffect(() => {
    if (secondsLeft <= 0) return

    countdownId.current = setInterval(() => {
      setSecondsLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(countdownId.current)
  }, [secondsLeft])

  const start = (seconds: number) => setSecondsLeft(seconds)
  const pause = () => clearInterval(countdownId.current)
  const resume = () => setSecondsLeft(prev => prev - 1)
  
  return {secondsLeft, start, pause, resume}
}