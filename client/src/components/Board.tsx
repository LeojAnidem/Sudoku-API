import { FC, useEffect, useState } from "react";
import { INIT_DATA_SUDOKU, getSudokuData } from "../services/sudokuApi";

import { IBoard } from "../types/gameTypes";
import { BoardRender } from "./BoardRender";
import { Loading } from "./Loading";

export const Board: FC<IBoard> = ({ difficult }) => { 
	const [gameBoard, setGameBoard] = useState(INIT_DATA_SUDOKU)

	useEffect(() => {
		getSudokuData({difficult, setState: setGameBoard})
	}, [])

	return (
		<>
			{gameBoard.unsolved.length
				? <BoardRender board={gameBoard} />
				: <Loading />
			}
		</>
	);
};