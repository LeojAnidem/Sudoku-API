export type Board = number[][];
export type Difficult = "easy" | "normal" | "hard";
export type Range = [number, number];

export interface DeleteInfo {
	numsTotalToDelete: number;
	rangeDeleteByElement: Range;
}
