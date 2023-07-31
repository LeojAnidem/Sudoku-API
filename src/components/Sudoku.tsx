import { Card, Title } from "@tremor/react";
import { FC } from "react";

type SudokuBoard = number[][];
type DeleteAmountByElement = 2 | 3 | 4 | 5 | 6 | 7;
type Difficult = "easy" | "normal" | "hard";

interface BoardElement {
	element: number[];
	amountToDelete: DeleteAmountByElement;
}

interface Board {
	difficult: Difficult;
}

interface DelAmount {
	totalAmount: number,
	rangeDel: [number, number]
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
	const amountsByDifficult = {
		easy: {
			totalAmount: [34, 38],
			delRestriction: [2, 7]
		},
		normal:{
			totalAmount: [30, 32],
			delRestriction: [2, 7]
		},
		hard: {
			totalAmount: [23, 28],
			delRestriction: [2, 7]
		},
	};

	const { totalAmount, delRestriction } = amountsByDifficult[difficult];
	const [minRestr, maxRestr] = delRestriction;
	const [min, max] = totalAmount;
	const randomNumber = getRandomInRange(min, max);

	return { totalAmount: randomNumber, rangeDel: [minRestr, maxRestr] };
};

const getRandomInRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

const getArrDel = (
	difficult: Difficult
): DeleteAmountByElement[] => {
	// restrictionNumber es un arreglo que contiene la cantidad minima y maxima
	// de elementos a borrar por cada BoardElement
	const amountsByBoardElement = new Array(9).fill(0);
	const {totalAmount, rangeDel} = getAmountDel(difficult);

	const restrictionNumber = [...rangeDel];
	const [min, max] = restrictionNumber;

	// De forma aleatoria creara un array con nueve elementos, cada elemento puede
	// tener un valor entre 2 y 7, la suma de todos los elementos debe ser igual a
	// totalAmount
	const randomizeDeletes = (amountDel: number, arr: number[]): DeleteAmountByElement[] => {
		let countDel = amountDel;

		const arrMod = arr.map((elmt, index) => {
				const valToSet = getRandomInRange(min, max);
				countDel -= elmt;

				if (countDel <= 0 && index !== arr.length) return 0;

				return valToSet;
		});

		const sumTotal = arrMod.reduce((a, b)=> a + b)
		if (arrMod.some((elmt) => elmt === 0) || sumTotal !== amountDel) {
			return randomizeDeletes(amountDel, arr);
		}

		console.log(totalAmount, arrMod.reduce((a,b) => a + b), arrMod)
		return arrMod as DeleteAmountByElement[]
	};

	return randomizeDeletes(totalAmount, amountsByBoardElement)
};

const getRandomIndex = (indexArr: number[]): number[] => {
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
		return getRandomIndex(newIndexArr);
	}

	return indexArr;
};

const BoardElement: FC<BoardElement> = ({ element, amountToDelete }) => {
	const emptyAmountArr = new Array(amountToDelete).fill(0)
	const indexDel = getRandomIndex(emptyAmountArr)
	const copyElmt = [...element]
	indexDel.forEach(iDel => {copyElmt[iDel] = 0})

	return (
		<div className="grid_sk">
			{copyElmt.map((num, i) => (
				<div className="grid_item_sk" key={`element-${i}`}>
					{num === 0 ? '' : num}
				</div>
			))}
		</div>
	);
};

const Board: FC<Board> = ({ difficult }) => {
	const amountDelByElmt = getArrDel(difficult)

	return (
		<div className="grid_sk gap-3">
			{generateSudokuBoard().map((row, i) => (
				<BoardElement
					key={`boardElement-${i}`}
					element={row}
					amountToDelete={amountDelByElmt[i]}
				/>
			))}
		</div>
	);
};

export const Sudoku = () => {
	return (
		<Card className="!bg-dark-tremor-brand-subtle">
			<Title>Sudoku</Title>
			<Board difficult="hard" />
		</Card>
	);
};
