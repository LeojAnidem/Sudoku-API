import { Board, DeleteInfo, Difficult } from "../types/sudokuTypes.js";
import {
	generateNumsArr,
	getRandomInRange,
	getSrictArr,
} from "./arrayMethods.js";

const DIFFICULT_NUMS_RESOLVES = {
	easy: [36, 42],
	normal: [30, 34],
	hard: [20, 26],
};

const BOARD_ELEMENTS = 81;

// Genera un tablero/board con valores aleatorios para la
// primera fila
export const createInitialBoard = (): Board => {
	return new Array(9).fill(0).map((e, i) => {
		if (i === 0) return generateNumsArr();
		return new Array(9).fill(e);
	});
};

// Comprueba que no haya ningun numero repetido tanto en la fila como en la
// columna
export const checkIfValidNum = (
	row: number,
	col: number,
	num: number,
	arr: Board,
): boolean => {
	for (let i = 0; i < 9; i++) {
		if (arr[row][i] === num || arr[i][col] === num) return false;
	}

	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (arr[startRow + i][startCol + j] === num) return false;
		}
	}

	return true;
};

// resuelve el tablero usando el metodo de backtracking
export const solvedBoard = (arr: Board) => {
	const copy = [...arr];

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (copy[row][col] === 0) {
				for (let num = 1; num <= 9; num++) {
					if (checkIfValidNum(row, col, num, copy)) {
						copy[row][col] = num;
						if (solvedBoard(copy)) {
							return copy;
						}
						copy[row][col] = 0;
					}
				}
				return false;
			}
		}
	}
	return copy;
};

// Se genera un objeto con la informacion de cuantos numeros se
// van a eliminar y cuanto es el minimo y maximo a eliminar
// por cada elemento del tablero/board
export const getDeleteInfo = (difficult: Difficult): DeleteInfo => {
	const [min, max] = DIFFICULT_NUMS_RESOLVES[difficult];
	const numsTotalToDelete = BOARD_ELEMENTS - getRandomInRange(min, max);

	return { numsTotalToDelete, rangeDeleteByElement: [1, 9] };
};

// Obtenemos el numero a eliminar por cada elemento del tablero/board
export const getNumsToDelByElement = (difficult: Difficult): number[] => {
	const { numsTotalToDelete, rangeDeleteByElement } = getDeleteInfo(difficult);
	return getSrictArr(numsTotalToDelete, rangeDeleteByElement);
};

// crea un array con una longitud determinada (length), en el cual sus elementos
// son numeros aleatorios del 1 al 9, no se permiten repeticiones
export const getIndexToDeleteByElement = (
	numTotalDeletes: number,
): number[] => {
	const idxToDeleteArr = new Array(numTotalDeletes).fill(0);

	const setValues = (indexArr: number[]): number[] => {
		const { repeat } = indexArr.reduce(
			(acc, currVal) => {
				if (acc.values.includes(currVal)) {
					acc.repeat = true;
				}

				acc.values.push(currVal);
				return acc;
			},
			{ values: new Array(0), repeat: false },
		);

		if (repeat) {
			const newIndexArr = indexArr.map(() => getRandomInRange(0, 8));
			return setValues(newIndexArr);
		}

		return indexArr;
	};

	return setValues(idxToDeleteArr);
};

export const generateBoard = (): Board => {
	const sample = createInitialBoard();
	const board = solvedBoard(sample);

	if (!board) throw console.error("Fallo al resolver el tablero");

	return board;
};

// pasamos como argumento un tablero/board resuelto, y procedemos
// a reemplazar n cantidad de numeros con ceros dependiendo de la dificultad
// seleccionada
export const generateUnsolvedBoard = (
	solvedBoard: Board,
	difficult: Difficult,
): Board => {
	const arrNumsToDelByElmt = getNumsToDelByElement(difficult);
	const arrUnsolved = new Array(0);

	// Eliminamos n cantidad de elementos de cada array del board,
	// reemplazandolo con 0's
	solvedBoard.forEach((elementArr, i) => {
		const idxDelArr = getIndexToDeleteByElement(arrNumsToDelByElmt[i]);
		const arrDelElements = [...elementArr];

		// reemplazamos con ceros segun los indices generados
		idxDelArr.forEach((idx) => {
			arrDelElements[idx] = 0;
		});

		arrUnsolved.push(arrDelElements);
	});

	return arrUnsolved;
};
