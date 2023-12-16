import { BoardType, Difficult } from "./gameTypes";

export interface ISudokuData {
	solved: BoardType,
	unsolved: BoardType,
	difficult: Difficult
}

export interface IFetchSudokuData {
  difficult: Difficult,
}