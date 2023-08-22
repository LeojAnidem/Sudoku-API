import { FC, useEffect, useState } from "react";
import { INIT_DATA_SUDOKU, getSudokuData } from "../services/sudokuApi";
import { IBoard } from "../types/gameTypes";
import { BoardElement } from "./BoardElement";

export const Board: FC<IBoard> = ({ difficult }) => { 
	const [gameBoard, setGameBoard] = useState(INIT_DATA_SUDOKU)

	useEffect(() => {
		getSudokuData({difficult, setState: setGameBoard})
	}, [])

	return (
		<div className="grid_sk gap-3">
			{gameBoard.unsolved.map((row, i) => (
				<BoardElement
					key={`boardElement-${i}`}
					element={row}
				/>
			))}
		</div>
	);
};