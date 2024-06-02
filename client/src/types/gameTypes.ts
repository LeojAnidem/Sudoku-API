import { ReactNode } from "react"
import { Difficult, GameStatus } from "./gameEnum"

// _______________________________________________
// React

	export type ContextProviderProps = {
		children?: ReactNode
	}

	export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

	export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>

// _______________________________________________
// Base

	export type PositionType = {
		row: number,
		col: number
	}

	export type Time = {
		minutes: number,
		seconds: number
	}

	export type Life = {
		isActive: boolean,
		id: number
	}

// _______________________________________________
// Game Elements

	export type BoardType = number[][]

	export type BoardPositionType = {
		groupIndex: number,
		indexInGroup: number
	}

	export type errorBoard = {
		errorPos: BoardPositionType,
		errorVal: number,
		asociatedErrorPos: BoardPositionType[]
	}

	export type SelectType = {
		isSameValue: Boolean,
		isInRowOrCol: Boolean,
		isOnCenter: Boolean,
		isInGroup: Boolean,
		isWrong: Boolean
	}

	export type ElementType = {
		value: number,
		position: PositionType,
		isUnsolved: Boolean,
		isSelected: SelectType
		inputValue: number | undefined,
		canIncrementScore: Boolean
	}

	export type OptionDifficult = {
		value: Difficult,
		isActive: boolean,
		id: number
	}

// _______________________________________________
// Status Game

	export type GameType = {
		board: ElementType[][],
		difficult: Difficult,
		lifes: number,
		errors: errorBoard[],
		time: Time
		score: number,
		status: GameStatus
		forceRestart?: boolean
	}

	export type GameAction = 
		| { type: 'SELECTING'; position: PositionType; value: number }
		| { type: 'CHANGE_DIFFICULT'; difficult: Difficult, isSameDifficult?: boolean}
		| { type: 'UPDATE_BOARD'; board: ElementType[][] }
		| { type: 'SET_STATUS'; status: GameStatus }
		| { type: 'INCREMENT_LIFE' }

// _______________________________________________
// Hooks Types

	export type CountDownHookType = {
		secondsLeft: number,
		start: (seconds: number) => void
		pause: () => void
		resume: () => void
	}

	export type Timer = {
		secondsLeft: number,
		isPaused: boolean
	}