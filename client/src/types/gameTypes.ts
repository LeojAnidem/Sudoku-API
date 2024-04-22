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

export type GameType = {
	board: IElement[][],
	difficult: Difficult,
	lifes: number,
	score: number,
	errors: errorBoard[],
	defeat: boolean,
	time: number
}

export type GameAction = 
	| { type: 'CHANGE_DIFFICULT'; difficult: Difficult}
	| { type: 'INCREMENT_SCORE'}
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
  score: 0,
	errors: [],
	defeat: false,
	time: 300000, /*5 minutos en milisegundos*/
}