import { Dispatch, ReactNode } from "react"

export enum Difficult {
	Easy = 'Easy',
	Medium = 'Medium',
	Hard = 'Hard'
}

export type Life = {
	isActive: boolean,
	id: number
}

export interface IIcon {
  className?: string
}

export type CountDownHook = {
	secondsLeft: number,
	start: (seconds: number) => void
	pause: () => void
	resume: () => void
}

export type Timer = {
	secondsLeft: number,
	isPaused: boolean
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

export type OptionDifficult = {
	value: Difficult,
	isActive: boolean,
	id: number
}

export type GameType = {
	board: IElement[][],
	difficult: Difficult,
	lifes: number,
	errors: errorBoard[],
	defeat: boolean,
	time: Time
	score: number,
	sameDifficult: boolean
}

export type GameAction = 
	| { type: 'SELECTING'; position: PositionType; value: number }
	| { type: 'CHANGE_DIFFICULT'; difficult: Difficult}
	| { type: 'UPDATE_BOARD'; board: IElement[][] }
	| { type: 'SET_GAME_OVER'; isDefeat: boolean }
	| { type: 'SET_SAME_DIFFICULT'; isSameDifficult: boolean }
	| { type: 'INCREMENT_LIFE' }

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
	inputValue: number | undefined,
	canIncrementScore: Boolean
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
		minutes: 0,
		seconds: 0
	},
	score: 0,
	sameDifficult: false
}