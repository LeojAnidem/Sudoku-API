import { FC, createContext, useEffect, useReducer } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { getSudokuData } from "../services/sudokuApi";
import { ContextProviderProps, Difficult, GameContextType, GameStatus, GameType } from "../types/gameTypes";
import { gameReducer } from "./GameReducer";

const INITIAL_STATE:GameType = {
  board: [],
  difficult: Difficult.Easy,
  lifes: 3,
	errors: [],
	time: {
		minutes: 0,
		seconds: 0
	},
	score: 0,
	status: GameStatus.playing
}

export const GameContext = createContext<GameContextType>({
  state: INITIAL_STATE, 
  dispatch: () => { },
  timer: {
    secondsLeft: 0,
    pause: () => {},
    resume: () => {},
    start: () => {}
  }
})

export const GameProvider: FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  const timer = useCountdown()

  // mejorar llamada a la api
  const fetchAPI = () => {
    const interval = setInterval(async () => {
      const board = await getSudokuData({ difficult: state.difficult })

      if (board.length > 0) {
        dispatch({ type: 'UPDATE_BOARD', board })
        clearInterval(interval)
        dispatch({ type: 'SET_STATUS', status: GameStatus.playing })
      } else {
        console.log('Fallo al conectarse con la API')
      }
    }, 250)
  }

  useEffect(() => {
    fetchAPI()
  }, [state.difficult, state.status])

  return (
    <GameContext.Provider value={{ state, dispatch, timer }}>
      {children}
    </GameContext.Provider>
  )
}