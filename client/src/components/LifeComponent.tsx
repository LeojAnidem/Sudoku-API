import { FC, useContext, useEffect } from "react"
import { GameContext } from "../context/GameProvider"
import { ILifeComponent } from "../types/gameTypes"

export const LifeComponent: FC<ILifeComponent> = ({ timer }) => {
  const { state, dispatch } = useContext(GameContext)

  useEffect(() => {
    if (state.lifes <= 0) {
      timer.pause()
      dispatch({ type: "CHECK_GAME_OVER" })
    }
  }, [state.lifes])

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