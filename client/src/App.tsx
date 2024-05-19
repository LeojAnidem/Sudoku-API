import { useContext } from "react";
import { CountDownComponent } from "./components/CountDownComponent";
import { DifficultTab } from "./components/DifficultTab";
import { FailScreenComponent } from "./components/FailScreenComponent";
import { LifeComponent } from "./components/LifeComponent";
import { Sudoku } from "./components/Sudoku";
import { GameContext } from "./context/GameProvider";
import "./styles/App.css";
import { ScoreComponent } from "./components/ScoreComponent";

function App() {
	const { state } = useContext(GameContext)

	return (
		<div className="main_bg">
			<div
				className="
					relative flex flex-col items-center
					justify-center gap-4
				"
			>
				<div className="w-full flex justify-between items-center">
					<CountDownComponent />
					<ScoreComponent />
				</div>
				<div
					className="
						flex justify-between items-center gap-2
					"
				>
					<LifeComponent/>
					<DifficultTab />
				</div>
				<Sudoku />
				{state.defeat ? <FailScreenComponent /> : <></>}
			</div>
		</div>
	);
}

export default App;
