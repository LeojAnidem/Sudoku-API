import { FC, createContext, useEffect, useReducer } from "react";
import { getSudokuData } from "../services/sudokuApi";
import { ContextProviderProps, GameAction, GameContextType, GameType, IElement, INITIAL_STATE, PositionType } from "../types/gameTypes";

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

    case 'SELECTING' :
      // Esta accion se encarga de establecer cuales son los
      // elementos que estan en la misma fila, columna, grupo
      // y tienen el mismo valor que el elemento seleccionado
      const filter: IElement[][] = state.board.map(arr => {
        // buscamos cual array contiene el elemento que hemos seleccionado
        const groupPos: PositionType[] = []
        const isMenberGroup = arr.some(elt => elt.position === action.position)

        isMenberGroup 
          ? groupPos.push(...(arr.map(elt => elt.position))) : null

        return arr.map((elt, i) => {
          const isInGroup = elt.position === groupPos[i]
          const isSameRow = action.position.row === elt.position.row
          const isSameCol = action.position.col === elt.position.col
          
          const isFocusInput = isSameCol && isSameRow && elt.isUnsolved
          isFocusInput ? elt.inputValue = action.value : null
          
          const isSameValue = elt.isUnsolved
            ? action.value === elt.inputValue
            : action.value === elt.value

          elt.isSelected.isInGroup = isInGroup
          elt.isSelected.isInRowOrCol = isSameRow || isSameCol
          elt.isSelected.isOnCenter = isSameCol && isSameRow
          elt.isSelected.isSameValue = isSameValue

          if (!elt.isSelected.isWrong) {
            // Debo encontrar una manera de que al digitar un numero en el
            // input seleccionado me reste vida en el caso de que ese numero
            // se encuentre en la misma fila o columna, pero el numero debera
            // mantener el estado de isWrong hasta que el error sea removido
          }

          return elt
        })
      })

      const isSomeWrongVal = filter.some(arr => arr.some(elt => elt.isSelected.isWrong))
      console.log(isSomeWrongVal, state.lifes)

      return {
        ...state,
        board: filter,
        lifes: isSomeWrongVal ? state.lifes - 1 : state.lifes
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