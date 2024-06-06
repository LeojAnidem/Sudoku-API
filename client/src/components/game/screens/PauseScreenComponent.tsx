import { useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameEnum"

export const PauseScreenComponent = () => {
  const { dispatch, timer } = useContext(GameContext)
	
	const handleClic = () => {
		timer.resume()
		dispatch({type: 'SET_STATUS', status: GameStatus.playing})
	}
	
	return (
    <div
			className="game_screen"
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