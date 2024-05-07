import { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { BoardElement } from "./BoardElement";
import { Loading } from "./Loading";

export const FailScreenComponent = () => {
	return (
		<div
			className="
				w-full h-full bg-opacity-50 absolute top-0
				flex justify-center items-center
				text-2xl text-white
				bg-dark-tremor-background-muted
			"
		>
			<div className="w-fit flex flex-col gap-4">
				<span>Deseas reintentar?</span>
				<div className="flex justify-around">
					<button>
						Si
					</button>
					<button>
						No
					</button>
				</div>
			</div>
		</div>
	)
}

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
						{state.defeat ? <FailScreenComponent /> : <></>}
					</div>
				)
				: <Loading />
			}
		</>
	);
};
