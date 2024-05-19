import { useContext } from "react"
import { Sudoku } from "./board/Sudoku"
import { CountDownComponent } from "./options/CountDownComponent"
import { DifficultTab } from "./options/DifficultTab"
import { FailScreenComponent } from "./options/FailScreenComponent"
import { LifeComponent } from "./options/LifeComponent"
import { ScoreComponent } from "./options/ScoreComponent"
import { GameContext } from "../../context/GameProvider"

export const GameComponent = () => {
  const { state } = useContext(GameContext)

  return (
    <div
      className="
        relative flex flex-col items-center
        justify-center gap-4
      "
    >
      <div className="w-full flex justify-between items-center">
        <CountDownComponent />
        <ScoreComponent />
      </div>
      <div
        className="
          flex justify-between items-center gap-2
        "
      >
        <LifeComponent />
        <DifficultTab />
      </div>
      <Sudoku />
      {state.defeat ? <FailScreenComponent /> : <></>}
    </div>
  )
}