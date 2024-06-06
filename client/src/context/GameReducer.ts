import { isEqual } from "lodash";
import { Difficult, GameStatus } from "../types/gameEnum";
import { BoardPositionType, GameAction, GameType, Time, errorBoard } from "../types/gameTypes";
import { getBoardPosition, updatedSelectGroup } from "../utils/boardFn";

export const gameReducer = (state: GameType, action: GameAction) => {
  switch (action.type) {
    case 'CHANGE_DIFFICULT':
      return {
          ...state,
          difficult: action.difficult,
          board: [],
          status: GameStatus.loading,
          forceRestart: action.isSameDifficult
        }
    
    case 'INCREMENT_LIFE':
      const currLifes = state.lifes + 1

      return {
        ...state,
        lifes: currLifes
      }

    case 'CHECK_WIN' :
      const justUnsolvedElt = state.board.map(group => group.filter(elt => elt.isUnsolved))
      const someUndefined = justUnsolvedElt
        .flat()
        .some(elt => typeof(elt.inputValue) === 'undefined')
      
      const isPossibleWin = !someUndefined && state.errors.length <= 0

      return {
        ...state,
        status: isPossibleWin ? GameStatus.Win : GameStatus.playing,
        errors: isPossibleWin ? [] : [...state.errors]
      }

    case 'UPDATE_BOARD':
      const setTimeByDifficult = (difficult: Difficult):Time => {
        switch (difficult) {
          case Difficult.Easy :
            return {
              minutes: 8,
              seconds: 0
            }
          case Difficult.Medium :
            return {
              minutes: 6,
              seconds: 30
            }
          case Difficult.Hard :
            return {
              minutes: 5,
              seconds: 0
            }
          default:
            return {
              minutes: 0,
              seconds: 0
            }
        }
      }

      return {
        ...state,
        board: action.board,
        lifes: 3,
        errors: [],
        score: 0,
        time: setTimeByDifficult(state.difficult),
        state: GameStatus.loading,
        forceRestart: false
      }

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      }

    case 'SELECTING':
      const selectingErr = [...state.errors]
      let selectingLifes = state.lifes
      let selectingScore = state.score

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
          if (state.status === GameStatus.playing) selectingLifes -= 1
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
          
          // Si no hay ningun error y se ha ingresado un valor aumentamos el
          // score en 50
          } else if (!isNaN(action.value) && action.value <= 9) {
            if (selectElt.canIncrementScore) {
              selectElt.canIncrementScore = false
              selectingScore += 50
            }
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
        score: selectingScore,
        errors: [...selectingErr],
        lifes: selectingLifes
      }

    default:
      return state
  }
}
