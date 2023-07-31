import { Card, Title } from "@tremor/react";
import { FC } from "react";

type SudokuBoard = number[][];
type DeleteAmountByElement = 2 | 3 | 4 | 5 | 6 | 7;
type Difficult = "easy" | "normal" | "hard";

interface BoardElement {
	element: number[]
}

interface Board {
	difficult: Difficult;
}

interface DelAmount {
	totalAmount: number;
	rangeDel: [number, number];
}

const generateNumsArr = (): number[] => {
	// Crea un array que contiene numeros del 1 al 9 y los mezcla
	const nums = new Array(9).fill(0).map((e, i) => e + i + 1);
	return nums.sort(() => 0.5 - Math.random());
};

const generateBoard = (): SudokuBoard => {
	// Genera un tablero con valores aleatorios para la primera fila
	return new Array(9).fill(0).map((e, i) => {
		if (i === 0) return generateNumsArr();
		return new Array(9).fill(e);
	});
};

const generateSudokuBoard = (): SudokuBoard => {
	const board = generateBoard();

	const isValidNum = (row: number, col: number, num: number): boolean => {
		for (let i = 0; i < 9; i++) {
			if (board[row][i] === num || board[i][col] === num) return false;
		}

		const startRow = Math.floor(row / 3) * 3;
		const startCol = Math.floor(col / 3) * 3;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[startRow + i][startCol + j] === num) return false;
			}
		}

		return true;
	};

	const solveSudoku = (): boolean => {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col] === 0) {
					for (let num = 1; num <= 9; num++) {
						if (isValidNum(row, col, num)) {
							board[row][col] = num;
							if (solveSudoku()) {
								return true;
							}
							board[row][col] = 0;
						}
					}
					return false;
				}
			}
		}
		return true;
	};

	solveSudoku();
	return board;
};

const getAmountDel = (difficult: Difficult): DelAmount => {
	// Los numeros mostrados por dificultad son un rango del minimo y
	// maximo valor de numeros que deben quedar disponibles en el
	// tablero, el resto sera eliminado
	const amountsByDifficult = {
		easy: [34, 38],
		normal: [30, 32],
		hard: [23, 28],
	};

	// 81 es el # total de elementos en la tabla de sudoku
	const [min, max] = amountsByDifficult[difficult];
	const randomNumber = 81 - getRandomInRange(min, max);

	return { totalAmount: randomNumber, rangeDel: [1, 9] };
};

const getRandomInRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

const getArrDel = (difficult: Difficult): DeleteAmountByElement[] => {
	// restrictionNumber es un arreglo que contiene la cantidad minima y maxima
	// de elementos a borrar por cada BoardElement
	const amountsByBoardElement = new Array(9).fill(0);
	const { totalAmount, rangeDel } = getAmountDel(difficult);
	const [min, max] = [...rangeDel];

	// De forma aleatoria creara un array con nueve elementos, cada elemento puede
	// tener un valor entre 1 y 9, la suma de todos los elementos debe ser igual a
	// totalAmount
	const randomizeDeletes = (
		amountDel: number,
		arr: number[],
	): DeleteAmountByElement[] => {
		let countDel = amountDel;

		const arrMod = arr.map((elmt, index) => {
			const valToSet = getRandomInRange(min, max);
			countDel -= elmt;

			if (countDel <= 0 && index !== arr.length) return 0;

			return valToSet;
		});

		const sumTotal = arrMod.reduce((a, b) => a + b);
		if (arrMod.some((elmt) => elmt === 0) || sumTotal !== amountDel) {
			return randomizeDeletes(amountDel, arr);
		}

		return arrMod as DeleteAmountByElement[];
	};

	return randomizeDeletes(totalAmount, amountsByBoardElement);
};

const getRandomIdxArr = (length: number): number[] => {
	const idxArr = new Array(length).fill(0);

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

	return setValues(idxArr);
};

const getUnSolvedBoard = (
	solvedBoard: SudokuBoard,
	difficult: Difficult,
): SudokuBoard => {
	// Segun la dificultad obtenemos un array de 9 elementos, cada elemento
	// representa la cantidad de # a eliminar en cada grilla/elementBoard
	const amountDelByElmt = getArrDel(difficult);

	const arrUnsolved = new Array(0)

	// Eliminamos n cantidad de elementos de cada array del board,
	// reemplazandolo con 0's
	solvedBoard.forEach((elementArr, idx) => {
		// copiamos el array para evitar editar el original
		const arrDelElements = [...elementArr];

		// generamos un nuevo array con indices al azar entre 1 y 9 sin
		// repeticiones, la longitud del array dependera de amountDelByElmt
		const idxDelArr = getRandomIdxArr(amountDelByElmt[idx]);

		// reemplazamos con ceros segun los indices generados
		idxDelArr.forEach(idxDel => {arrDelElements[idxDel] = 0})

		arrUnsolved.push(arrDelElements)
	});

	return arrUnsolved;
};

const BoardElement: FC<BoardElement> = ({ element }) => {
	return (
		<div className="grid_sk">
			{element.map((num, i) => (
				<div className="grid_item_sk" key={`element-${i}`}>
					{num === 0 ? "" : num}
				</div>
			))}
		</div>
	);
};

const Board: FC<Board> = ({ difficult }) => {

	const createGame = (difficult: Difficult) => {
		const board = generateSudokuBoard()

		return {
			solved: board,
			unSolved: getUnSolvedBoard(board, difficult)
		}
	}

	const game = createGame(difficult)
	console.log(game);

	return (
		<div className="grid_sk gap-3">
			{game.unSolved.map((row, i) => (
				<BoardElement
					key={`boardElement-${i}`}
					element={row}
				/>
			))}
		</div>
	);
};

export const Sudoku = () => {
	return (
		<Card className="!bg-dark-tremor-brand-subtle">
			<Title>Sudoku</Title>
			<Board difficult="easy" />
		</Card>
	);
};
