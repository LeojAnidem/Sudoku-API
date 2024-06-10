import { FC, useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { Difficult } from "../../../types/gameEnum"
import { IScreenComponent } from "../../../types/gameInterfaces"

export const DifficultSelector: FC<IScreenComponent> = ({onClick}) => {
	const { state, dispatch}  = useContext(GameContext)
	
	const handleClic = (difficult: Difficult) => {
		state.difficult === difficult
			? dispatch({type:"CHANGE_DIFFICULT", difficult, isSameDifficult: true})
			:	dispatch({type:"CHANGE_DIFFICULT", difficult})
	}

	return (
		<div
			className="
				flex flex-col justify-center items-center
				text-center gap-8 relative row-start-1
			"
		>
			{onClick &&
				<button
					className="
						absolute px-2.5 pb-1 -top-10 right-0 rounded-lg
						border-2 text-xl font-bold text-white
						bg-dark-tremor-brand-subtle
						border-dark-tremor-brand-subtle
						hover:bg-dark-tremor-brand
						hover:border-dark-tremor-brand
						hover:text-dark-tremor-background
						row-start-2
					"
					onClick={onClick}
				>
					x
				</button>
			}

			<span>
				Selecciona una nueva dificultad
			</span>

			<div className="flex flex-col gap-3 row-start-3">
				{
					Object.values(Difficult).map((difficult) => {
						return (
							<button
								key={`button-${difficult}`}
								className="px-8 py-1 text-xl font-bold button__blue row-start-4"
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