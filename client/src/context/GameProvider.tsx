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
      const selectionGroup: IElement[] = []
      
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

          const isInSelection = isSameRow || isSameCol || isInGroup
          if (isInSelection) selectionGroup.push(elt)

          return elt
        })
      })

      // const isSomeWrongVal = filter.some(arr => arr.some(elt => elt.isSelected.isWrong))
      // console.log(isSomeWrongVal, state.lifes)

      const showDuplicatePos = (arr: any[], numberToFind: Number = 0, minRepeats = 2) => {
        const result: number[] = []
        const positions: {[key: string] : number[]} = {}

        arr.forEach((val, i) => {
          if (typeof val !== 'undefined' && !Number.isNaN(val)) {
            positions[val] = positions[val] || []
            positions[val].push(i)
          }
        })

        if (numberToFind !== 0) {
          if (positions[numberToFind as number].length >= minRepeats)
            result.push(...positions[numberToFind as number])

          return result.sort((a, b) => a - b)
        }

        Object.keys(positions).forEach((val) => {
          const posArr = positions[val]
          if (posArr.length >= minRepeats) result.push(...posArr)
        })

        return result.sort((a, b) => a - b)
      }
      
      const valuesInSelection = selectionGroup.map(elt => elt.isUnsolved ? elt.inputValue : elt.value)
      const onCenterElt = selectionGroup.filter(elt => elt.isSelected.isOnCenter)[0]
      const canFindVal = !Number.isNaN(onCenterElt.inputValue) && typeof onCenterElt.inputValue !== 'undefined'
        
      if (onCenterElt.isUnsolved && canFindVal) {
        const idxErrors = showDuplicatePos(valuesInSelection, onCenterElt.inputValue)
        const eltError = idxErrors.map(idx => selectionGroup[idx])

        console.log(idxErrors, valuesInSelection)
        
        // pasar filterWithErrors a board
        const filterWithErrors = filter.map(arr => {
          return arr.map(elt => {
            if (!elt.isSelected.isWrong) {
              elt.isSelected.isWrong = eltError.includes(elt)
            } else {
              // desmarcar cuando el valor cambie
              
            }
          })
        })
      }


      return {
        ...state,
        board: filter
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