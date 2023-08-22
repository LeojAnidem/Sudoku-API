import { Card, Title } from "@tremor/react";
import { Board } from "./Board";

export const Sudoku = () => {
	return (
		<Card className="!bg-dark-tremor-brand-subtle">
			<Title>Sudoku</Title>
			<Board difficult="hard" />
		</Card>
	);
};
