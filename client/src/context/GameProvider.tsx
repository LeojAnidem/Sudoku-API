import { FC, createContext, useEffect, useReducer } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { getSudokuData } from "../services/sudokuApi";
import { ContextProviderProps, Difficult, GameContextType, GameStatus, GameType } from "../types/gameTypes";
import { gameReducer } from "./GameReducer";

const INITIAL_STATE: GameType = {
  board: [],
  difficult: Difficult.Easy,
  lifes: 3,
  errors: [],
  time: {
    minutes: 0,
    seconds: 0
  },
  score: 0,
  status: GameStatus.loading
}

export const GameContext = createContext<GameContextType>({
  state: INITIAL_STATE,
  dispatch: () => { },
  timer: {
    secondsLeft: 0,
    pause: () => { },
    resume: () => { },
    start: () => { }
  }
})

export const GameProvider: FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  const timer = useCountdown()

  const fetchAPI = async (
    attemps: number = 0,
    maxRetries: number = 5,
    retryDelay: number = 1000
  ) => {
    const board = await getSudokuData({ difficult: state.difficult })

    if (board.length > 0) {
      dispatch({ type: 'UPDATE_BOARD', board })
      dispatch({ type: 'SET_STATUS', status: GameStatus.playing })
    } else {
      console.log('Fallo al conectarse con la API')

      if (attemps < maxRetries) {
        setTimeout(() => fetchAPI(attemps + 1), retryDelay)
      }
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [state.difficult, state.forceRestart])

  return (
    <GameContext.Provider value={{ state, dispatch, timer }}>
      {children}
    </GameContext.Provider>
  )
}