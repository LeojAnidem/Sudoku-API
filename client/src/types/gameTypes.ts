import { ISudokuData } from "./apiTypes";

export type Difficult = "easy" | "normal" | "hard";
export type BoardType = number[][]

export interface IBoardElement {
	element: number[]
}

export interface IBoardRender {
	board: ISudokuData
}

export interface IBoard {
	difficult: Difficult;
}