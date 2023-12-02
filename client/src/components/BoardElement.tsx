import { FC } from "react";
import { IBoardElement } from "../types/gameTypes";
import { InputElement } from "./InputElement";

export const BoardElement: FC<IBoardElement> = ({ boardElt }) => {
	return (
		<div className="grid_sk">
			{boardElt.map((elt, i) => (
				<div className="grid_item_sk" key={`boardElt-${i}`}>
					{
						elt.isUnsolved
							? <InputElement pos={elt.pos} correctVal={elt.value}/>
							: `${elt.value}`
					}
				</div>
			))}
		</div>
	);
};
