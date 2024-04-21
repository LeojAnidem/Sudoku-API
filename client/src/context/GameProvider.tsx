import { isEqual } from "lodash";
import { FC, createContext, useEffect, useReducer } from "react";
import { getSudokuData } from "../services/sudokuApi";
import { BoardPositionType, ContextProviderProps, GameAction, GameContextType, GameType, INITIAL_STATE, errorBoard } from "../types/gameTypes";
import { getBoardPosition, updatedSelectGroup } from "../utils/boardFn";

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
      const selectingErr = [...state.errors]
      let selectingLifes = state.lifes
      
      const {updBoard, allEltInSelection} = updatedSelectGroup(state.board, action.position, action.value)
      const eltBPos = getBoardPosition(action.position)
      const selectElt = updBoard[eltBPos.groupIndex][eltBPos.indexInGroup]
      const errFocusIdx = selectingErr.findIndex(err => isEqual(err.errorPos, eltBPos))

      // Verificamos si hay un numero que se repita en los elt selecionados
      const errorPositions:BoardPositionType[] = allEltInSelection
        .filter(({isSelected}) => isSelected.isSameValue)
        .map(({position}) => getBoardPosition(position))
      
      // Creamos el objeto error
      const nError:errorBoard = {
        errorPos: eltBPos,
        asociatedErrorPos: errorPositions,
        errorVal: action.value
      }

      // Aplicamos el estado de error
      if (selectElt.isUnsolved && errorPositions.length) {
        updBoard[eltBPos.groupIndex][eltBPos.indexInGroup].isSelected.isWrong = true
  
        errorPositions.forEach(({indexInGroup, groupIndex}) => {
          updBoard[groupIndex][indexInGroup].isSelected.isWrong = true
        })

        selectingLifes -= 1
        selectingErr.push(nError)
      }
      
      if (errFocusIdx >= 0) {
        const errFocus = selectingErr[errFocusIdx]
        const doChangeVal = errFocus.errorVal !== action.value && !isNaN(errFocus.errorVal)
        
        if (doChangeVal) {
          updBoard[eltBPos.groupIndex][eltBPos.indexInGroup].isSelected.isWrong = false
          
          errFocus.asociatedErrorPos.forEach(({indexInGroup, groupIndex}) => {
            updBoard[groupIndex][indexInGroup].isSelected.isWrong = false
          })
  
          selectingErr.splice(errFocusIdx, 1)
        }
      }

      return {
        ...state,
        board: updBoard,
        errors: selectingErr,
        lifes: selectingLifes
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