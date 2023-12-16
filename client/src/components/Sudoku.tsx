import { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { BoardElement } from "./BoardElement";
import { Loading } from "./Loading";

export const Sudoku = () => { 
	const { state } = useContext(GameContext)

	return (
		<>
			{state.board.length
				? (
					<div className="grid_sk">
						{
							state.board.map((arr, i) => (
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
