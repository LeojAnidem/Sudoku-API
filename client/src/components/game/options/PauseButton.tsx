import { useContext, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { IconPause } from "../../icons/IconPause"
import { IconPlay } from "../../icons/IconPlay"

export const PauseButton = () => {
  const [isPause, setIsPause] = useState(false)
  const { timer } = useContext(GameContext)

  const handleClic = () => {
    if (isPause) {
      timer.resume()
      setIsPause(false)
    } else {
      timer.pause()
      setIsPause(true)
    }
  }

  return (
    <button
      className="
        w-12 h-12 select-none cursor-pointer
        stroke-tremor-brand-emphasis

        hover:stroke-tremor-brand-subtle
      "
      onClick={handleClic}
    >
      {
        isPause
          ? <IconPlay className="w-full h-full"/>
          : <IconPause className="w-full h-full" />
      }
      
    </button>
  )
}