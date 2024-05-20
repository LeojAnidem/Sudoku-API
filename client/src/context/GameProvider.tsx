import { FC, createContext, useEffect, useReducer } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { getSudokuData } from "../services/sudokuApi";
import { ContextProviderProps, Difficult, GameContextType, GameType } from "../types/gameTypes";
import { gameReducer } from "./GameReducer";

const INITIAL_STATE:GameType = {
  board: [],
  difficult: Difficult.Easy,
  lifes: 3,
	errors: [],
	defeat: false,
	time: {
		minutes: 0,
		seconds: 0
	},
	score: 0,
	sameDifficult: false,
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
      } else {
        console.log('Fallo al conectarse con la API')
      }
    }, 250)
  }

  useEffect(() => {
    fetchAPI()
  }, [state.difficult, state.sameDifficult])

  return (
    <GameContext.Provider value={{ state, dispatch, timer }}>
      {children}
    </GameContext.Provider>
  )
}