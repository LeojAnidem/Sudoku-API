import { Card, Title } from "@tremor/react";
import { FC } from "react";

type SudokuBoard = number[][];

interface BoardElement {
	element: number[];
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
								return true; // Se encontró una solución
							}
							board[row][col] = 0; // Si no se puede completar el tablero con este número, deshacemos el cambio
						}
					}
					return false; // No se pudo completar el tablero con ningún número
				}
			}
		}
		return true; // Se completó el tablero con éxito
	};

	solveSudoku();
	return board;
};

const BoardElement: FC<BoardElement> = ({ element }) => {
	// Crea un cuadro en pantalla donde muestra los numeros del array nums
	return (
		<div className="grid_sk">
			{element.map((num, i) => (
				<div className="grid_item_sk" key={`element-${i}`}>
					{num}
				</div>
			))}
		</div>
	);
};

const Board = () => {
	return (
		<div className="grid_sk gap-3">
			{generateSudokuBoard().map((row, i) => (
				<BoardElement element={row} key={`boardElement-${i}`} />
			))}
		</div>
	);
};

export const Sudoku = () => {
	return (
		<Card className="!bg-dark-tremor-brand-subtle">
			<Title>Sudoku</Title>
			<Board />
		</Card>
	);
};
