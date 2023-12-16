import { Dispatch, ReactNode } from "react"

export enum Difficult {
	Easy = 'easy',
	Normal = 'normal',
	Hard = 'hard'
}

export type PositionType = {
	row: Number,
	col: Number
}

export type GameType = {
	board: IElement[][],
	difficult: Difficult,
	lifes: number,
	score: number
}

export type GameAction = 
	| { type: 'CHANGE_DIFFICULT'; difficult: Difficult}
	| { type: 'INCREMENT_SCORE'; amount: number}
	| { type: 'UPDATE_BOARD'; board: IElement[][] }
	| { type: 'DECREMENT_LIFES' }

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
	pos: PositionType,
	isUnsolved: Boolean
}

export interface IBoardElement {
	boardElt: IElement[]
}

export interface IinputElemnt {
	pos: PositionType,
	correctVal: Number
}

export const INITIAL_STATE:GameType = {
  board: [],
  difficult: Difficult.Easy,
  lifes: 3,
  score: 0
}