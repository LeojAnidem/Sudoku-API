import { useContext } from "react";
import { BoardElement } from "./BoardElement";
import { Loading } from "./Loading";
import { GameContext } from "../../../../../context/GameProvider";

export const Sudoku = () => { 
	const { state } = useContext(GameContext)

	return (
		<>
			{state.board.length
				? (
					<div className="grid_sk relative">
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
