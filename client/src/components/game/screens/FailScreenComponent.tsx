import { useContext, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { DifficultSelector } from "../individual/DifficultSelector"
import { RetryOption } from "../individual/RetryOption"

export const FailScreenComponent = () => {
	const { dispatch } = useContext(GameContext)
	const [giveUp, setGiveUp] = useState(false)

	const handleClic = (wantRetry : boolean) => {
		wantRetry
			? dispatch({type: "INCREMENT_LIFE"})
			: setGiveUp(true)
	}

	return (
		<div
			className="game_screen"
		>
			{ giveUp
				? <DifficultSelector onClick={() => setGiveUp(false)} />
				: <RetryOption onClick={handleClic} />
			}
		</div>
	)
}