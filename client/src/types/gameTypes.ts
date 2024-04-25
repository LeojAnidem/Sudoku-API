import { Dispatch, ReactNode } from "react"

export enum Difficult {
	Easy = 'Easy',
	Medium = 'Medium',
	Hard = 'Hard'
}

export type BoardPositionType = {
	groupIndex: number,
	indexInGroup: number
}

export type PositionType = {
	row: number,
	col: number
}

export type SelectType = {
	isSameValue: Boolean,
	isInRowOrCol: Boolean,
	isOnCenter: Boolean,
	isInGroup: Boolean,
	isWrong: Boolean
}

export type errorBoard = {
	errorPos: BoardPositionType,
	errorVal: number,
	asociatedErrorPos: BoardPositionType[]
}

export type Time = {
	minutes: number,
	seconds: number
}

export type GameType = {
	board: IElement[][],
	difficult: Difficult,
	lifes: number,
	errors: errorBoard[],
	defeat: boolean,
	time: Time
}

export type GameAction = 
	| { type: 'CHANGE_DIFFICULT'; difficult: Difficult}
	| { type: 'SET_NEW_TYPE'; difficult: Difficult}
	| { type: 'UPDATE_BOARD'; board: IElement[][] }
	| { type: 'CHECK_GAME_OVER' }
	| { type: 'SELECTING'; position: PositionType; value: number }

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
	value: number,
	position: PositionType,
	isUnsolved: Boolean,
	isSelected: SelectType
	inputValue: number | undefined
}

export interface IBoardElement {
	boardElt: IElement[]
}

export const INITIAL_STATE:GameType = {
  board: [],
  difficult: Difficult.Easy,
  lifes: 3,
	errors: [],
	defeat: false,
	time: {
		minutes: 8,
		seconds: 0
	},
}