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

export interface IElement {
	value: Number,
	pos: PositionType,
	isUnsolved: Boolean
}

export interface IBoardElement {
	boardElt: IElement[]
}

export interface IinputElemnt {
	pos: PositionType
	correctVal: Number
}