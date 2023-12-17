import { FC, createContext, useEffect, useReducer } from "react";
import { getSudokuData } from "../services/sudokuApi";
import { ContextProviderProps, GameAction, GameContextType, GameType, INITIAL_STATE } from "../types/gameTypes";

export const GameContext = createContext<GameContextType>({state: INITIAL_STATE, dispatch: () => {}})

const gameReducer = (state:GameType, action:GameAction) => {
  switch (action.type) {
    case 'CHANGE_DIFFICULT':
      return {
        ...state,
        difficult: action.difficult,
      }
    case 'UPDATE_BOARD' :
      return {
        ...state,
        board: action.board
      }
    case 'INCREMENT_SCORE' :
      return {
        ...state,
        score: state.score + 150
      }
    case 'DECREMENT_LIFES' :
      return {
        ...state,
        lifes: state.lifes--
      }
    case 'SELECT_GROUP' :
      return {
        ...state,
        selectGroup: action.position
      }
    default:
      return state
  }
}

export const GameProvider: FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)  

  useEffect(() => {
    (async () => {
      const board = await getSudokuData({difficult: state.difficult})
      dispatch({ type: 'UPDATE_BOARD', board })
    })()
  }, [state.difficult])

  return (
    <GameContext.Provider value={{ state, dispatch}}>
      {children}
    </GameContext.Provider>
  )
}