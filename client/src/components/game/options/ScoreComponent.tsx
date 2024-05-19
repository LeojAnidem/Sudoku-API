import { useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { IconFire } from "../../icons/IconFire"

export const ScoreComponent = () => {
  const { state } = useContext(GameContext)
  
  return (
    <div
      className="
        flex items-center justify-center gap-1
      "
    >
      <span
        className={`
        text-2xl font-bold text-tremor-brand-emphasis
        `}
      >
        {state.score}
      </span>
      <IconFire
        className="
          w-10 h-10 text-tremor-brand-emphasis
        "
      />
    </div>
  )
}