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
      // usar variable global timer para aumentar el score
      // mientras menos tiempo halla pasado, mas puntos se dara
      // 150 -> 5:00 min - 4:00 min
      // 130 -> 3:59 min - 3:00 min
      // 110 -> 2:59 min - 2:30 min
      // 080 -> 1:59 min - 1:00 min
      // 050 -> 1:59 min - 1:00 min
      
      return {
        ...state,
        score: state.score + 150
      }

    case 'CHECK_GAME_OVER' :
      return {
        ...state,
        defeat: state.lifes <= 0,
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