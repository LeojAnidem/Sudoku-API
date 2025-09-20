import { FC } from "react"
import { IElement } from "../../../../../types/gameInterfaces"


export const ElementComponent: FC<IElement> = ({value, clickFn, className, position}) => {
	return (
		<span
			className={className}
			onClick={() => clickFn(value, position)}
			onContextMenu={(e) => e.preventDefault()}
		>
			{`${value}`}
		</span>
	)
}