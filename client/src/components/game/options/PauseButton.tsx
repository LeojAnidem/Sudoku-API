import { useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { IconPause } from "../../icons/IconPause"
import { GameStatus } from "../../../types/gameEnum"

export const PauseButton = () => {
  const { state, dispatch, timer } = useContext(GameContext)

  const handleClic = () => {
    if (state.status === GameStatus.playing) {
      timer.pause()
      dispatch({type: 'SET_STATUS', status: GameStatus.pause})
    }
  }

  return (
    <button
      className="w-12 h-12 select-none cursor-pointer"
      onClick={handleClic}
    >
      <IconPause
        className="
          w-full h-full stroke-tremor-brand-emphasis
          hover:stroke-tremor-brand-subtle
        "
      /> 
    </button>
  )
}