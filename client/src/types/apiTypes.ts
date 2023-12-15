import { BoardType, Difficult, IElement } from "./gameTypes";

export interface ISudokuData {
	solved: BoardType,
	unsolved: BoardType,
	difficult: Difficult
}

export interface IFetchSudokuData {
  difficult: Difficult,
  setState: React.Dispatch<React.SetStateAction<IElement[][]>>
}