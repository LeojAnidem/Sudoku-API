export type Difficult = "easy" | "normal" | "hard";
export type BoardType = number[][]

export interface IBoardElement {
	element: number[]
}

export interface IBoard {
	difficult: Difficult;
}