import { isEqual } from "lodash";
import { ISudokuData } from "../types/apiTypes";
import { BoardPositionType, IElement, PositionType } from "../types/gameTypes";

// La API de donde recopilamos los datos para nuestro sudoku
// nos devuelve los valores en nueve arrays donde cada array
// representa una fila y sus elementos individuales las columnas.
// La forma en la que construi la estructura del cliente requiere
// que los datos sean reorganizados de tal forma que cada array
// contenga un grupo de elementos, por ejemplo: las filas del 0 al
// 2, junto con las columnas del 0 al 2, pertenecerian a un grupo,
// que pasaria a ser el primer array (indice 0) del nuevo arreglo.
const organizeToBoardElement = (boardData: IElement[][]) => {
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
};

// Funcion que convierte el objeto obtenido de nuestra API, en un arreglo
// que contiene nueve arreglos del tipo IElement
const convertBoardToData = (board: ISudokuData) => {
	const boardData: IElement[][] = [];
	const { solved, unsolved } = board;

	for (let row = 0; row < solved.length; row++) {
		const group: IElement[] = [];

		for (let col = 0; col < solved[row].length; col++) {
			const elt: IElement = {
				value: solved[row][col],
				position: { col, row },
				isUnsolved: unsolved[row][col] === 0,
				isSelected: {
					isInGroup: false,
					isInRowOrCol: false,
					isOnCenter: false,
					isSameValue: false,
					isWrong: false,
				},
				inputValue: undefined,
			};
			group.push(elt);
		}
		boardData.push(group);
	}

	return boardData;
};

// Encargada de crear el tablero, dividi los distintos sectores por grupos
// 9 grupos de 9 elementos, un total de 81 elementos
// un sudoku de 3x3
export const createBoardGame = (board: ISudokuData) => {
	const boardData = convertBoardToData(board);
	return organizeToBoardElement(boardData);
};

// Convierte la posicion del elemento a la posicion que tiene en el array board
export const getBoardPosition = (position: PositionType): BoardPositionType => {
	const { row, col } = position;

	if (row < 0 || row > 8 || col < 0 || col > 8) {
		console.error("Coordenadas fuera de los límites.");
		return {
      groupIndex: -1,
      indexInGroup: -1
    };
	}

	const groupIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
	const indexInGroup = (row % 3) * 3 + (col % 3);

	const boardPos: BoardPositionType = {
		groupIndex,
		indexInGroup,
	};

	return boardPos;
};

// Devuelve la ubicacion en el array de los elementos que se repiten
export const idxDuplicateVals = (
	arr: any[],
	numberToFind = 0,
	minRepeats = 2,
) => {
	const result: number[] = [];
	const positions: { [key: string]: number[] } = {};

	arr.forEach((val, i) => {
		if (typeof val !== "undefined" && !Number.isNaN(val)) {
			positions[val] = positions[val] || [];
			positions[val].push(i);
		}
	});

	if (numberToFind !== 0) {
		if (positions[numberToFind as number].length >= minRepeats)
			result.push(...positions[numberToFind as number]);

		return result.sort((a, b) => a - b);
	}

	Object.keys(positions).forEach((val) => {
		const posArr = positions[val];
		if (posArr.length >= minRepeats) result.push(...posArr);
	});

	return result.sort((a, b) => a - b);
};

// Se encarga de actualizar el estado de los elementos cercanos y que
// compartan misma fila o columna del elemento seleccionado,
// ademas de devolver los mismos en un array
export const updatedSelectGroup = (board: IElement[][], eltCenterPos: PositionType, selectVal: number) => {
  const isEltCtrInGroup = (group: IElement[]): boolean => group.some(elt => isEqual(elt.position, eltCenterPos))
  const groupSelectIdx = board.findIndex(group => isEltCtrInGroup(group))
  const selectGroupPox: PositionType[] = board[groupSelectIdx].map(({position}) => position)
  const allEltInSelection: IElement[] = []
  
  const updBoard = board.map((group) => {
    return group.map(elt => {
      elt.isSelected.isInGroup = selectGroupPox.some(pos => isEqual(elt.position, pos))
      elt.isSelected.isOnCenter = isEqual(eltCenterPos, elt.position)
      elt.isSelected.isInRowOrCol = eltCenterPos.row === elt.position.row || eltCenterPos.col === elt.position.col
      
      // Verificamos si existe algun elemento que tenga el mismo valor
      if (!isEqual(eltCenterPos, elt.position)) 
        elt.isSelected.isSameValue = elt.isUnsolved
          ? elt.inputValue === selectVal
          : elt.value === selectVal

			// El valor de sameValue para los input representara si cambio su
			// valor o no
			if (isEqual(eltCenterPos, elt.position) && elt.isUnsolved) 
				elt.isSelected.isSameValue = elt.inputValue === selectVal

			// Guardamos el valor actual del input elt
      if (elt.isUnsolved && eltCenterPos === elt.position) elt.inputValue = selectVal

      // Almacenamos todos los elts selecionados
      if (elt.isSelected.isInRowOrCol || elt.isSelected.isInGroup)
        allEltInSelection.push(elt)
        
      return elt
    })
  })
  
  return {
    updBoard,
    allEltInSelection
  }
}