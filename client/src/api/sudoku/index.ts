import { Difficult } from "./types/types";
import { generateBoard, generateUnsolvedBoard } from "./utils/sudokuUtils";

export const createSudoku = (difficult: Difficult) => {
	const solvedBoard = generateBoard();
	const unsolvedBoard = generateUnsolvedBoard(solvedBoard, difficult);

	return {
		solved: solvedBoard,
		unsolved: unsolvedBoard,
		difficult,
	};
};
