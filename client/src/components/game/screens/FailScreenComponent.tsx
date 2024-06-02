import { useContext, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { Difficult } from "../../../types/gameEnum"

export const FailScreenComponent = () => {
	const { state, dispatch } = useContext(GameContext)
	const [giveUp, setGiveUp] = useState(false)

	const handleClic = (wantRetry : boolean) => {
		if (wantRetry) dispatch({type: "INCREMENT_LIFE"})
		else setGiveUp(true)
	}

	const RetryScreen = () => {
		return (
			<div className="w-fit flex flex-col gap-4">
				<span>Deseas reintentar ?</span>
				<div className="flex justify-around">
					<button
						className="w-2/5 button__green"
						onClick={() => handleClic(true)}
					>
						Si
					</button>
					<button
						className="w-2/5 button__red"
						onClick={() => handleClic(false)}
					>
						No
					</button>
				</div>
			</div>
		)
	}

	const DifficultScreen = () => {
		const handleClic = (difficult: Difficult) => {
      state.difficult === difficult
				? dispatch({type:"CHANGE_DIFFICULT", difficult, isSameDifficult: true})
				:	dispatch({type:"CHANGE_DIFFICULT", difficult})
		}

		return (
			<div
				className="
					flex flex-col justify-center items-center
					text-center gap-8 relative
				"
			>
				<button
					className="
						absolute px-2.5 pb-1 -top-10 right-0 rounded-lg
						border-2 text-xl font-bold text-white
						bg-dark-tremor-brand-subtle
						border-dark-tremor-brand-subtle
						hover:bg-dark-tremor-brand
						hover:border-dark-tremor-brand
						hover:text-dark-tremor-background
					"
					onClick={() => {setGiveUp(false)}}
				>
					x
				</button>

				<span>
					Selecciona una nueva dificultad
				</span>

				<div className="flex flex-col gap-3">
					{
						Object.values(Difficult).map((difficult) => {
							return (
								<button
									key={`button-${difficult}`}
									className="px-8 py-1 text-xl font-bold button__blue"
									onClick={() => handleClic(difficult)}
								>
									{difficult}
								</button>
							)
						})
					}
				</div>
			</div>
		)
	}

	return (
		<div
			className="
				w-full h-full bg-opacity-70 absolute top-0 p-6
				flex justify-center items-center select-none
				text-2xl text-white font-semibold
				bg-dark-tremor-background-muted z-[2]
			"
		>
			{ giveUp
				? <DifficultScreen />
				: <RetryScreen />
			}
		</div>
	)
}