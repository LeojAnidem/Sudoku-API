import { useContext } from "react"
import { GameContext } from "../../context/GameProvider"
import { GameStatus } from "../../types/gameEnum"
import { Sudoku } from "./board/Sudoku"
import { CountDownComponent } from "./options/CountDownComponent"
import { DifficultTab } from "./options/DifficultTab"
import { DrawComponent } from "./options/DrawComponent"
import { LifeComponent } from "./options/LifeComponent"
import { PauseButton } from "./options/PauseButton"
import { ScoreComponent } from "./options/ScoreComponent"
import { FailScreenComponent } from "./screens/FailScreenComponent"
import { PauseScreenComponent } from "./screens/PauseScreenComponent"

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
        <PauseButton />
        <DrawComponent />
        <ScoreComponent />
      </div>
      <div className="flex justify-between items-center gap-2">
        <LifeComponent />
        <DifficultTab />
      </div>
      <Sudoku />
      {
        state.status === GameStatus.gameOver &&
        <FailScreenComponent /> 
      }
      {
        state.status === GameStatus.pause &&
        <PauseScreenComponent /> 
      }
    </div>
  )
}