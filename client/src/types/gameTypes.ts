import { ISudokuData } from "./apiTypes";

export enum Difficult {
	Easy = 'easy',
	Normal = 'normal',
	Hard = 'hard'
}

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