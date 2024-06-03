import { useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { IconPause } from "../../icons/IconPause"
import { GameStatus } from "../../../types/gameEnum"

export const PauseButton = () => {
  const { state, dispatch, timer } = useContext(GameContext)

  const handleClic = () => {
    const isPossibleChange = state.status === GameStatus.playing
      || state.status === GameStatus.draw

    if (isPossibleChange) {
      timer.pause()
      dispatch({type: 'SET_STATUS', status: GameStatus.pause})
    }
  }

  return (
    <button
      className="w-12 h-12 select-none cursor-pointer"
      onClick={handleClic}
      onContextMenu={(e) => e.preventDefault()}
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