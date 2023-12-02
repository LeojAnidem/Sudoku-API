import { FC, useEffect, useState } from "react";
import { INIT_DATA_SUDOKU, getSudokuData } from "../services/sudokuApi";
import '../styles/loader.css';
import { IBoard, IBoardRender } from "../types/gameTypes";
import { createBoardGame } from "../utils/boardFn";
import { BoardElement } from "./BoardElement";

const BoardRender: FC<IBoardRender> = ({board}) => {
	const boardGame = createBoardGame(board)
	return (
		<div className="grid_sk">
			{
				boardGame.map((arr, i) => (
					<BoardElement
						key={`boardElement-${i}`}
						boardElt={arr}
					/>
				))
			}
		</div>
	)
}

const Loading = () => {
	return (
		<div className="loader-bg">
			<span className="loader">
				<span className="loader-inner"></span>
			</span>
		</div>
	)
}

export const Board: FC<IBoard> = ({ difficult }) => { 
	const [gameBoard, setGameBoard] = useState(INIT_DATA_SUDOKU)

	useEffect(() => {
		getSudokuData({difficult, setState: setGameBoard})
	}, [])

	return (
		<div>
			{gameBoard.unsolved.length
				? <BoardRender board={gameBoard} />
				: <Loading />
			}
		</div>
	);
};