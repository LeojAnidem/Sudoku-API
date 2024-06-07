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
import { WinScreenComponent } from "./screens/WinScreenComponent"

export const GameComponent = () => {
  const { state, dispatch, timer } = useContext(GameContext)

  const returnScreenByStatus = (status: GameStatus) => {
    switch(status) {
      case GameStatus.gameOver :
        return <FailScreenComponent /> 
      case GameStatus.pause :
        return <PauseScreenComponent /> 
      case GameStatus.Win :
        return <WinScreenComponent />
      default :
        return <></>
    }
  }

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
        <button
          className="text-white"
          onClick={() => {
            dispatch({type:"SET_STATUS", status: GameStatus.Win})
            timer.pause()
          }}
        >Test</button>
      </div>
      <div className="flex justify-between items-center gap-2">
        <LifeComponent />
        <DifficultTab />
      </div>
      <Sudoku />
      {returnScreenByStatus(state.status)}
    </div>
  )
}