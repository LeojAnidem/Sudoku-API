import { FC } from "react"
import { IScreenComponent } from "../../../types/gameInterfaces"

export const RetryOption: FC<IScreenComponent> = ({onClick}) => {
	return (
		<div className="w-fit flex flex-col gap-4">
			<span>Deseas reintentar ?</span>
			<div className="flex justify-around">
				<button
					className="w-2/5 button__green"
					onClick={() => onClick(true)}
				>
					Si
				</button>
				<button
					className="w-2/5 button__red"
					onClick={() => onClick(false)}
				>
					No
				</button>
			</div>
		</div>
	)
}