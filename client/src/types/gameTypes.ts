import { Dispatch, ReactNode } from "react"

export enum Difficult {
	Easy = 'Easy',
	Medium = 'Medium',
	Hard = 'Hard'
}

export type PositionType = {
	row: Number,
	col: Number
}

export type SelectType = {
	isSameValue: Boolean,
	isInRowOrCol: Boolean,
	isOnCenter: Boolean,
	isInGroup: Boolean,
	isWrong: Boolean
}

export type GameType = {
	board: IElement[][],
	difficult: Difficult,
	lifes: number,
	score: number
}

export type GameAction = 
	| { type: 'CHANGE_DIFFICULT'; difficult: Difficult}
	| { type: 'INCREMENT_SCORE'}
	| { type: 'UPDATE_BOARD'; board: IElement[][] }
	| { type: 'DECREMENT_LIFES' }
	| { type: 'SELECTING'; position: PositionType; value: Number }

export type ContextProviderProps = {
	children?: ReactNode
}

export interface GameContextType {
  state: GameType;
  dispatch: Dispatch<GameAction>;
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type BoardType = number[][]

export interface IElement {
	value: Number,
	position: PositionType,
	isUnsolved: Boolean,
	isSelected: SelectType
	inputValue: Number | undefined
}

export interface IBoardElement {
	boardElt: IElement[]
}

export const INITIAL_STATE:GameType = {
  board: [],
  difficult: Difficult.Easy,
  lifes: 3,
  score: 0
}