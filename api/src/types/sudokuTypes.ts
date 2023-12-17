export type Board = number[][];
export type Range = [number, number];

export enum Difficult {
	Easy = 'Easy',
	Medium = 'Medium',
	Hard = 'Hard'
}

export interface DeleteInfo {
	numsTotalToDelete: number;
	rangeDeleteByElement: Range;
}

export interface Sudoku {
	solved: Board,
	unsolved: Board,
	difficult: Difficult
}
