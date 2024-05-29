import { useContext } from "react"
import { Sudoku } from "./board/Sudoku"
import { CountDownComponent } from "./options/CountDownComponent"
import { DifficultTab } from "./options/DifficultTab"
import { FailScreenComponent } from "./screens/FailScreenComponent"
import { LifeComponent } from "./options/LifeComponent"
import { ScoreComponent } from "./options/ScoreComponent"
import { GameContext } from "../../context/GameProvider"
import { QuestionComponent } from "./options/QuestionComponent"
import { PauseButton } from "./options/PauseButton"
import { GameStatus } from "../../types/gameTypes"
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
        <QuestionComponent />
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