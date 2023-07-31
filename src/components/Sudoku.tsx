import { Card, Title } from "@tremor/react";
import { FC } from "react";
import { createSudoku } from "../api/sudoku";

type Difficult = "easy" | "normal" | "hard";

interface BoardElement {
	element: number[]
}

interface Board {
	difficult: Difficult;
}

const BoardElement: FC<BoardElement> = ({ element }) => {
	return (
		<div className="grid_sk">
			{element.map((num, i) => (
				<div className="grid_item_sk" key={`element-${i}`}>
					{num === 0 ? "" : num}
				</div>
			))}
		</div>
	);
};

const Board: FC<Board> = ({ difficult }) => { 
	const game = createSudoku(difficult)
	console.log(game);

	return (
		<div className="grid_sk gap-3">
			{game.unsolved.map((row, i) => (
				<BoardElement
					key={`boardElement-${i}`}
					element={row}
				/>
			))}
		</div>
	);
};

export const Sudoku = () => {
	return (
		<Card className="!bg-dark-tremor-brand-subtle">
			<Title>Sudoku</Title>
			<Board difficult="easy" />
		</Card>
	);
};
