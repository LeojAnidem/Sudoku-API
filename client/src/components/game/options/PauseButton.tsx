import { useContext, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { IconPause } from "../../icons/IconPause"
import { IconPlay } from "../../icons/IconPlay"
import { GameStatus } from "../../../types/gameTypes"

export const PauseButton = () => {
  const [isPause, setIsPause] = useState(false)
  const { dispatch, timer } = useContext(GameContext)

  const handleClic = () => {
    if (isPause) {
      timer.resume()
      dispatch({ type: 'SET_STATUS', status: GameStatus.playing })
      setIsPause(false)
    } else {
      timer.pause()
      dispatch({type: 'SET_STATUS', status: GameStatus.pause})
      setIsPause(true)
    }
  }

  return (
    <button
      className="w-12 h-12 select-none cursor-pointer"
      onClick={handleClic}
    >
      {
        isPause
          ? <IconPlay
              className="
                w-full h-full stroke-tremor-brand-emphasis
                hover:stroke-tremor-brand-subtle
              "
            />
          : <IconPause
              className="
                w-full h-full stroke-tremor-brand-emphasis
                hover:stroke-tremor-brand-subtle
              "
            />
      }
      
    </button>
  )
}