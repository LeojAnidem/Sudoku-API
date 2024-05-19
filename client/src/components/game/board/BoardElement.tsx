import { FC } from "react";
import { IBoardElement } from "../../../types/gameTypes";
import { InputElement } from "./InputElement";

export const BoardElement: FC<IBoardElement> = ({ boardElt }) => {
	return (
		<div className="grid_sk">
			{boardElt.map((elt, i) => (
				<InputElement key={`boardElt-${i}`} {...elt}  />
			))}
		</div>
	);
};
