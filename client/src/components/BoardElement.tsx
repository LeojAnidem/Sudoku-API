import { FC } from "react";
import { IBoardElement } from "../types/gameTypes";
import { InputElement } from "./InputElement";

export const BoardElement: FC<IBoardElement> = ({ element }) => {
	return (
		<div className="grid_sk">
			{element.map((num, i) => (
				<div className="grid_item_sk" key={`element-${i}`}>
					{num === 0 
						? <InputElement
								pos={{row:i, col: 1}} 
								correctVal={num}
							/>
						: num 
					}
				</div>
			))}
		</div>
	);
};
