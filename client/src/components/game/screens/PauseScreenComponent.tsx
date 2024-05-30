import { useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameTypes"

export const PauseScreenComponent = () => {
  const { dispatch, timer } = useContext(GameContext)
	
	const handleClic = () => {
		timer.resume()
		dispatch({type: 'SET_STATUS', status: GameStatus.playing})
	}
	
	return (
    <div
			className="
				w-full h-full bg-opacity-90 absolute top-0 p-6
				flex justify-center items-center select-none
				text-2xl text-white font-semibold
				bg-dark-tremor-background z-[2]
			"
		>
			<div className="w-fit flex flex-col gap-8">
				<span>¿Volviste? ¿Jugamos?</span>
				<div className="flex justify-around">
					<button
						className="w-2/5 button__blue"
						onClick={handleClic}
					>
						Si
					</button>
				</div>
			</div>
		</div>
  )
}