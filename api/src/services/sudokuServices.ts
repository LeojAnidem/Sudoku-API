import { Difficult, Sudoku } from "../types/sudokuTypes.js";
import { generateBoard, generateUnsolvedBoard } from "../utils/sudokuUtils.js";

export const getSudoku = (difficult: Difficult): Sudoku => {
	const solvedBoard = generateBoard();
	const unsolvedBoard = generateUnsolvedBoard(solvedBoard, difficult);

	return {
		solved: solvedBoard,
		unsolved: unsolvedBoard,
		difficult,
	};
};
