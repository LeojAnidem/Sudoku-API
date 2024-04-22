import { isEqual } from "lodash";
import { FC, createContext, useEffect, useReducer } from "react";
import { getSudokuData } from "../services/sudokuApi";
import { BoardPositionType, ContextProviderProps, GameAction, GameContextType, GameType, INITIAL_STATE, errorBoard } from "../types/gameTypes";
import { getBoardPosition, updatedSelectGroup } from "../utils/boardFn";

export const GameContext = createContext<GameContextType>({ state: INITIAL_STATE, dispatch: () => { } })

const gameReducer = (state: GameType, action: GameAction) => {
  switch (action.type) {
    case 'CHANGE_DIFFICULT':
      return {
        ...state,
        difficult: action.difficult,
      }

    case 'UPDATE_BOARD':
      return {
        ...state,
        board: action.board
      }

    case 'INCREMENT_SCORE':
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

    case 'CHECK_GAME_OVER':
      return {
        ...state,
        defeat: state.lifes <= 0,
      }

    case 'SELECTING':
      const selectingErr = [...state.errors]
      let selectingLifes = state.lifes

      const { updBoard, allEltInSelection } = updatedSelectGroup(state.board, action.position, action.value)
      const eltBPos = getBoardPosition(action.position)
      const selectElt = updBoard[eltBPos.groupIndex][eltBPos.indexInGroup]
      
      // Verificamos si hay un numero que se repita en los elt selecionados
      const errorPositions: BoardPositionType[] = allEltInSelection
        .filter(({ isSelected }) => isSelected.isSameValue)
        .map(({ position }) => getBoardPosition(position))
      
      // Agregamos el error
      if (selectElt.isUnsolved && errorPositions.length) {
        
        // Creamos el objeto error
        const nError: errorBoard = {
          errorPos: eltBPos,
          asociatedErrorPos: errorPositions,
          errorVal: action.value
        }

        // Buscamos si entre los errores asociados se encuentra un input
        // en caso de ser asi, buscamos si ya existe un error creado, si
        // ese es el caso agregramos la posicion del error actual a sus errores
        // asociados. Caso contrario creamos un nuevo error.
        nError.asociatedErrorPos.forEach(errP => {
          if (updBoard[errP.indexInGroup][errP.groupIndex].isUnsolved) {
            const idxExistErr = selectingErr.findIndex(({errorPos}) => isEqual(errorPos, errP))
            
            if (idxExistErr >= 0) {
              selectingErr[idxExistErr].asociatedErrorPos.push(nError.errorPos)
            } else {
              selectingErr.push({
                errorPos: errP,
                asociatedErrorPos: [nError.errorPos],
                errorVal: nError.errorVal
              })
            }
          }
        })

        selectingLifes -= 1
        selectingErr.push(nError)
      }

      // Eliminamos el estado de error
      const errFocusIdx = selectingErr.findIndex(err => isEqual(err.errorPos, eltBPos))
  
      // Si un input seleccionado cambia, verificar en los errores asociados si se incluye un input
      // si ese es el caso, eliminar el elemento del error asociado de ese input, verificar si 
      // si ese input tiene errores asociados, en caso de no tenerlo, eliminamos el error relacionado
      // a ese input

      if (errFocusIdx >= 0) {
        const errFocus = selectingErr[errFocusIdx]
        const doChangeVal = errFocus.errorVal !== action.value && !isNaN(errFocus.errorVal)

        // verificanis que el error haya cambiado
        if (doChangeVal) {
          updBoard[eltBPos.groupIndex][eltBPos.indexInGroup].isSelected.isWrong = false

          errFocus.asociatedErrorPos.forEach(({ indexInGroup, groupIndex }) => {
            updBoard[groupIndex][indexInGroup].isSelected.isWrong = false
          })
          
          console.log(`Selecting Err Before`, selectingErr)
          // eliminamos el error
          selectingErr.splice(errFocusIdx, 1)
        }
      }
      
      console.log(`Selecting Err After`, selectingErr)

      // establecemos error para todos los valores
      selectingErr.forEach(({asociatedErrorPos, errorPos}) => {
        updBoard[errorPos.groupIndex][errorPos.indexInGroup].isSelected.isWrong = true
        
        asociatedErrorPos.forEach(({indexInGroup, groupIndex}) => {
          updBoard[groupIndex][indexInGroup].isSelected.isWrong = true
        })
      })

      return {
        ...state,
        board: updBoard,
        errors: [...selectingErr],
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
      const board = await getSudokuData({ difficult: state.difficult })
      dispatch({ type: 'UPDATE_BOARD', board })
    })()
  }, [state.difficult])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}