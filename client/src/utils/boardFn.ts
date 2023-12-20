import { ISudokuData } from "../types/apiTypes";
import { IElement } from "../types/gameTypes";

// La API de donde recopilamos los datos para nuestro sudoku
// nos devuelve los valores en nueve arrays donde cada array
// representa una fila y sus elementos individuales las columnas.
// La forma en la que construi la estructura del cliente requiere
// que los datos sean reorganizados de tal forma que cada array
// contenga un grupo de elementos, por ejemplo: las filas del 0 al
// 2, junto con las columnas del 0 al 2, pertenecerian a un grupo,
// que pasaria a ser el primer array (indice 0) del nuevo arreglo.
const organizeToBoardElement = (boardData:IElement[][]) => {
	const organizeArr = [];

  for (let i = 0; i < boardData.length; i += 3) {
    for (let j = 0; j < boardData[i].length; j += 3) {
      const subArray = [];

      for (let k = 0; k < 3; k++) {
        subArray.push(...boardData[i + k].slice(j, j + 3));
      }

      organizeArr.push(subArray);
    }
  }

  return organizeArr;
}

// Funcion que convierte el objeto obtenido de nuestra API, en un arreglo
// que contiene nueve arreglos del tipo IElement
const convertBoardToData = (board: ISudokuData) => {
  const boardData: IElement[][] = [];
	const {solved, unsolved} = board

  for (let row = 0; row < solved.length; row++) {
    const group: IElement[] = [];

    for (let col = 0; col < solved[row].length; col++) {
			const elt: IElement = {
				value: solved[row][col],
				position: {col, row},
				isUnsolved: unsolved[row][col] === 0,
        isSelected: {
          isInGroup: false,
          isInRowOrCol: false,
          isOnCenter: false,
          isSameValue: false
        },
        inputValue: undefined
			}
			group.push(elt);
		}
    boardData.push(group);
  }

  return boardData;
}

export const createBoardGame = (board: ISudokuData) => {
	const boardData = convertBoardToData(board)
	return organizeToBoardElement(boardData)
}