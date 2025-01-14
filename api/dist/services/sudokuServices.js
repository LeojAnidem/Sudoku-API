import { generateBoard, generateUnsolvedBoard } from "../utils/sudokuUtils.js";
export const getSudoku = (difficult) => {
    const solvedBoard = generateBoard();
    const unsolvedBoard = generateUnsolvedBoard(solvedBoard, difficult);
    return {
        solved: solvedBoard,
        unsolved: unsolvedBoard,
        difficult,
    };
};
