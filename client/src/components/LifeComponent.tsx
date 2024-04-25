import { useContext } from "react"
import { GameContext } from "../context/GameProvider"

export const LifeComponent = () => {
  const {state} = useContext(GameContext)

  return (
    <div>
      <span
        className="
          text-tremor-brand-emphasis text-tremor-title
          font-semibold
        "
      >
        Vidas: {state.lifes}
      </span>
    </div>
  )
}