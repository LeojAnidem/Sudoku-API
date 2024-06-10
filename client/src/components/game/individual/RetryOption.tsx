import { FC } from "react"
import { IScreenComponent } from "../../../types/gameInterfaces"

export const RetryOption: FC<IScreenComponent> = ({onClick}) => {
	const handleClick = (val: boolean) => {
		if (!onClick) return
		onClick(val)
	}
	
	return (
		<div className="w-fit flex flex-col gap-4">
			<span>Deseas reintentar ?</span>
			<div className="flex justify-around">
				<button
					className="w-2/5 button__green"
					onClick={() => handleClick(true)}
				>
					Si
				</button>
				<button
					className="w-2/5 button__red"
					onClick={() => handleClick(false)}
				>
					No
				</button>
			</div>
		</div>
	)
}