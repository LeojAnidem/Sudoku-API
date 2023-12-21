import { useContext } from "react"
import { GameContext } from "../context/GameProvider"

export const LifeComponent = () => {
  const {state} = useContext(GameContext)

  return (
    <h1
      className="
        text-tremor-brand-emphasis text-tremor-title
        font-semibold
      "
    >
      Vidas: {state.lifes}
    </h1>
  )
}