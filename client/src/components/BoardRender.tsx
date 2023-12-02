import { FC } from "react"
import { IBoardRender } from "../types/gameTypes"
import { createBoardGame } from "../utils/boardFn"
import { BoardElement } from "./BoardElement"

export const BoardRender: FC<IBoardRender> = ({board}) => {
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