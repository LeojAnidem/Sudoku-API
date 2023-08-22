import { Card, Title } from "@tremor/react";
import { FC, useEffect, useState } from "react";
import axios from "axios";

type Difficult = "easy" | "normal" | "hard";

interface BoardElement {
	element: number[]
}

interface Board {
	difficult: Difficult;
}

interface Game {
	solved: number[][],
	unsolved: number[][],
	difficult: Difficult
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
	const [game, setGame] = useState<Game>({
		solved: [],
		unsolved: [],
		difficult: 'easy'
	})

	const getSudokuData = async () => {
		try {
			const {data} = await axios.get(`http://localhost:3001/api/${difficult}`)
			setGame(data)
		} catch(err) {
			console.error(err)
		}
	}

	useEffect(() => {
		getSudokuData()
	}, [])

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
