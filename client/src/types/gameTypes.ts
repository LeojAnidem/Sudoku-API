import { ISudokuData } from "./apiTypes";

export enum Difficult {
	Easy = 'easy',
	Normal = 'normal',
	Hard = 'hard'
}

export type PositionType = {
	row: Number,
	col: Number
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

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

export interface IinputElemnt {
	pos: PositionType
	correctVal: Number
}