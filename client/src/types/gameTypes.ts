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

export enum GameStatus {
	playing = 'Playing',
	gameOver = 'Game Over',
	pause = 'Pause',
	loading = 'Loading'
}

export type GameType = {
	board: IElement[][],
	difficult: Difficult,
	lifes: number,
	errors: errorBoard[],
	time: Time
	score: number,
	status: GameStatus
}

export type GameAction = 
	| { type: 'SELECTING'; position: PositionType; value: number }
	| { type: 'CHANGE_DIFFICULT'; difficult: Difficult, isSameDifficult?: boolean}
	| { type: 'UPDATE_BOARD'; board: IElement[][] }
	| { type: 'SET_STATUS'; status: GameStatus }
	| { type: 'INCREMENT_LIFE' }

export type ContextProviderProps = {
	children?: ReactNode
}

export interface GameContextType {
  state: GameType;
  dispatch: Dispatch<GameAction>;
	timer: CountDownHook
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