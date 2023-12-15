import { useEffect, useState } from "react";
import { INIT_DATA_SUDOKU, getSudokuData } from "../services/sudokuApi";
import { Difficult } from "../types/gameTypes";
import { BoardElement } from "./BoardElement";
import { Loading } from "./Loading";

export const Sudoku = () => { 
	const [gameBoard, setGameBoard] = useState(INIT_DATA_SUDOKU)
	const difficult = Difficult.Easy

	useEffect(() => {
		getSudokuData({difficult, setState: setGameBoard})
	}, [difficult])

	return (
		<>
			{gameBoard.length
				? (
					<div className="grid_sk">
						{
							gameBoard.map((arr, i) => (
								<BoardElement
									key={`boardElement-${i}`}
									boardElt={arr}
								/>
							))
						}
					</div>
				)
				: <Loading />
			}
		</>
	);
};
