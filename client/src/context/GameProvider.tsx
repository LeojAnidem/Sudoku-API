import { FC, createContext, useEffect, useReducer } from "react";
import { getSudokuData } from "../services/sudokuApi";
import { ContextProviderProps, GameAction, GameContextType, GameType, IElement, INITIAL_STATE, PositionType, errorBoard } from "../types/gameTypes";
import { getBoardPosition, idxDuplicateVals } from "../utils/boardFn";

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
      const selectingErr = [...state.errors]
      let selectingLifes = state.lifes
      
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

      let applyErrFilter = [...filter]
      const eltOnCenter = selectionGroup.filter(elt => elt.isSelected.isOnCenter)[0]
      const chgIsWrongInSomePos = (arr: IElement[][], positionsArr: PositionType[], value: boolean) => {
        const nArr = [...arr]

        positionsArr.forEach(pos => {
          const boardPos = getBoardPosition(pos)
          // No permitir que se cambie el valor si hay algun otro
          // error que contenga la posicion
          // if pos include in more than 1 selectingErrs no hacer nada
          
          if (boardPos) {
            const { groupIndex, indexInGroup } = boardPos
            nArr[groupIndex][indexInGroup].isSelected.isWrong = value
          }
        })
        
        return nArr
      }

      if (eltOnCenter.isUnsolved) {
        const idxExistErr = selectingErr.findIndex(err => err.errorPos === eltOnCenter.position)
        const valsOfSelGroup = selectionGroup.map(elt => elt.isUnsolved ? elt.inputValue : elt.value)
        
        const isEmptyVal = (
          Number.isNaN(eltOnCenter.inputValue)
          || typeof eltOnCenter.inputValue === 'undefined'
          )
        
        const idxErrors = !isEmptyVal 
          ? idxDuplicateVals(valsOfSelGroup, eltOnCenter.inputValue)
          : []
        
        if (isEmptyVal && idxExistErr >= 0) {
          applyErrFilter = chgIsWrongInSomePos(filter, selectingErr[idxExistErr].asociatedErrorPos, false)
          selectingErr.splice(idxExistErr, 1)
        }

        if (!isEmptyVal && idxExistErr >= 0) {
          console.log('es posible?')
        }
        
        if (!isEmptyVal && idxExistErr < 0 && idxErrors.length) {
          const posErrors: PositionType[] = idxErrors.map(idx => selectionGroup[idx].position)
          const nError: errorBoard = {
            errorVal: eltOnCenter.inputValue as number,
            errorPos: eltOnCenter.position,
            asociatedErrorPos: [...posErrors]
          }

          selectingLifes -= 1
          applyErrFilter = chgIsWrongInSomePos(filter, posErrors, true)
          selectingErr.push(nError)
        }

      }

      // replantear solucion
      // modelo error:
      // --
      // error: [ 
      //  {
      //    value: Number
      //    position: PositionType *Error principal input
      //    afectedPos: PositionType[]  *Posiciones de donde se repita el numero
      //  }  
      // ]
      // -- 
      // [] Crear una funcion para crear y almacenar los errores en una variable global
      // [] Crear una funcion para interpretar esos errores y cambiar el estado de las posiciones afectadas a error.
      // [] Crear una funcion que revise si existe un error creado en esa posicion.
      // [] Crear una funcion para eliminar el error en esa posicion si el valor de la casilla ha cambiado
      // --
      // Tener en cuenta que la funcion para crear errores debe ser implementada una vez que ya todas las
      // posiciones hallan sido revisadas, eso quiere decir la funcion debe ir fuera del ciclo de la funcion del array.
      // --
      // Orden probable de las funciones
      // 1. Eliminar error si el valor registrado en esa posicion ha cambiado
      // 2. Revisar si hay un error creado
      // 3. Crear y almacenar error
      // 4. Interpretar error y cambiar a estado de error las posiciones marcadas en el error

      return {
        ...state,
        board: applyErrFilter,
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