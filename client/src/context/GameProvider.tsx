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

    case 'CHECK_GAME_OVER':
      // checar si el timer ha llegado a cero o las vidas se han agotado
    
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
      
      // Solo aplicar si es un input
      if (selectElt.isUnsolved && !selectElt.isSelected.isSameValue) {
        // Verificamos si hay un numero que se repita en los elt selecionados
        const errorPositions: BoardPositionType[] = allEltInSelection
        .filter(({ isSelected }) => isSelected.isSameValue)
        .map(({ position }) => getBoardPosition(position))

        // verificamos si existe un error
        if (errorPositions.length) {
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
            const isInput = updBoard[errP.groupIndex][errP.indexInGroup].isUnsolved
            if (isInput) {
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
          
          // Reducimos la vida y agregamos el error al estado
          selectingLifes -= 1
          selectingErr.push(nError)

        } else {
          // Buscamos la ubicacion de todos los lugares en el que el error
          // estuviera asociado
          const idxAscErrIn = selectingErr.reduce((acc: BoardPositionType[], cur, errIdx) => {
            cur.asociatedErrorPos.forEach((ascErr, ascIdx) => {
              if (isEqual(ascErr, eltBPos)) {
                acc.push({
                  groupIndex: errIdx,
                  indexInGroup: ascIdx
                })
              }
            })

            return acc
          }, [])

          // Eliminamos el error de esas ubicaciones
          if (idxAscErrIn.length) {
            // Eliminamos el error asociado
            idxAscErrIn.forEach(({groupIndex, indexInGroup}) => {
              selectingErr[groupIndex].asociatedErrorPos.splice(indexInGroup, 1)

              // Si el error no tiene errores asociados eliminamos el error
              if (selectingErr[groupIndex].asociatedErrorPos.length <= 0) {
                selectingErr.splice(groupIndex, 1)
              }
            })
          }

          // Desactivamos el estado de error en los errores solucionados
          const idxOldErr = selectingErr.findIndex(err => isEqual(err.errorPos, eltBPos))
          
          if (idxOldErr >= 0) {
            const {errorPos, asociatedErrorPos} = selectingErr[idxOldErr]
            updBoard[errorPos.groupIndex][errorPos.indexInGroup].isSelected.isWrong = false

            asociatedErrorPos.forEach(({groupIndex, indexInGroup}) => {
              updBoard[groupIndex][indexInGroup].isSelected.isWrong = false
            })

            // se elimina de la lista de errores el error solucionado
            selectingErr.splice(idxOldErr, 1)
          }
        }
      }

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