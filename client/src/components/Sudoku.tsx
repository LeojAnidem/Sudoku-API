import { Grid } from "@tremor/react";
import { Difficult } from "../types/gameTypes";
import { Board } from "./Board";
import { DifficultTab } from "./DifficultTab";

export const Sudoku = () => {
	return (
		<Grid className="gap-8">
			<DifficultTab />
			<Board difficult={Difficult.Easy} />
		</Grid>
	);
};
