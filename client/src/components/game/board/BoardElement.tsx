import { FC, useContext } from "react";
import { GameContext } from "../../../context/GameProvider";
import { IBoardElement, IInputElement } from "../../../types/gameInterfaces";
import { PositionType } from "../../../types/gameTypes";
import { applyStyle } from "../../../utils/boardFn";
import { ElementComponent } from "./Element";
import { InputElement } from "./InputElement"; 

export const BoardElement: FC<IBoardElement> = ({ boardElt }) => {
	const {dispatch} = useContext(GameContext)
	
	const handleClic = (value: number, position: PositionType) => {	
		dispatch({ type: "SELECTING", position, value })
	}
	
	return (
		<div className="grid_sk">
			{boardElt.map((elt, i) =>{
				const inputStyle = applyStyle(elt.isSelected)
				const commonProps: IInputElement = {
					clickFn: handleClic,
					className: inputStyle + ' standard_btn',
					position: elt.position
				}

				return (
					<div
						key={`boardElt-${i}`}
						className="grid_item_sk"
					>
						{!elt.isUnsolved
							? <ElementComponent 
									value={elt.value}
									{...commonProps}
								/>
							: <InputElement {...commonProps} />	
						}
					</div>
				)
			})}
		</div>
	);
};
