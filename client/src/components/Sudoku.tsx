import { Grid, Tab, TabGroup, TabList } from "@tremor/react";
import { Difficult } from "../types/gameTypes";
import { Board } from "./Board";

export const Sudoku = () => {
	return (
		<Grid className="gap-3">
			<TabGroup>
				<TabList>
					{Object.values(Difficult).map(difficult => {
						return (
							<Tab>
								{difficult}
							</Tab>
						)
					})}
				</TabList>
			</TabGroup>
			<Board difficult={Difficult.Easy} />
		</Grid>
	);
};
