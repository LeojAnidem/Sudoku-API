import { FC } from "react";
import { IBoardElement } from "../types/gameTypes";

export const BoardElement: FC<IBoardElement> = ({ element }) => {
	return (
		<div className="grid_sk">
			{element.map((num, i) => (
				<div className="grid_item_sk" key={`element-${i}`}>
					{num === 0 ? "" : num}
				</div>
			))}
		</div>
	);
};