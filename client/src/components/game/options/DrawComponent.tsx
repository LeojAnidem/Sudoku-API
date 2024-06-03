import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameEnum"
import { IconPencil } from "../../icons/IconPencil"

export const DrawComponent = () => {
  const {state, dispatch} = useContext(GameContext)
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    if (state.status !== GameStatus.draw)
      setIsOn(false)
  }, [state.difficult, state.status])

  const handleOnClic = () => {
    const nIsOn = !isOn
    const setStatus: GameStatus = nIsOn
      ? GameStatus.draw
      : GameStatus.playing
    
    dispatch({type: 'SET_STATUS', status: setStatus})
    setIsOn(nIsOn)
  }

  return (
    <button
      className="
        w-12 h-12 select-none cursor-pointer relative
        group
      "
      onClick={handleOnClic}
      onContextMenu={(e) => e.preventDefault()}
    >
      <IconPencil
        className="
          w-full h-4/5 fill-tremor-brand-emphasis
          group-hover:fill-tremor-brand-subtle relative
          transition-colors duration-300
        "
      />
      <div
        className={`
          absolute -bottom-0 right-1 rounded-md
          w-min px-1 flex items-center justify-center
          font-semibold text-center text-[10px] 
          border-2 border-dark-tremor-background
          
          transition-colors duration-200
          group-hover:text-white

          ${isOn
            ? 'text-white bg-tremor-brand-emphasis'
            :  'bg-dark-tremor-brand-subtle'
          }
        `}
      >
        {isOn ? 'ON' : 'OFF'}
      </div>
    </button>
  )
}