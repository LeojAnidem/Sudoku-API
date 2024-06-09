import { useContext, useEffect, useRef } from "react"
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
  const sudokuRef = useRef<HTMLDivElement>(null)

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
  
	useEffect(() => {
		dispatch({type: 'SET_BOARD_REF', ref: sudokuRef})
  }, [state.status])

  return (
    <div className="relative">
      <div
        ref={sudokuRef}
        className="
          p-2 flex flex-col gap-4
          items-center justify-center
          bg-dark-tremor-background 
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
      </div>
        {returnScreenByStatus(state.status)}
    </div>
  )
}