import { Dispatch } from "react";
import { CountDownHookType, ElementType, GameAction, GameType, PositionType } from "./gameTypes";

export interface IIcon {
  className?: string
}

export interface IGameContext {
  state: GameType;
  dispatch: Dispatch<GameAction>;
	timer: CountDownHookType
}

export interface IElement {
	value: number,
	clickFn: (value: number, position: PositionType) => void,
	className: string,
	position: PositionType
}

export interface IInputElement {
	clickFn: (value: number, position: PositionType) => void,
	className: string,
	position: PositionType
}

export interface IBoardElement {
	boardElt: ElementType[]
}

export interface IScreenComponent {
	onClick?: (param?: any) => void
}