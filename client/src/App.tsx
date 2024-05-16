import { useContext } from "react";
import { CountDownComponent } from "./components/CountDownComponent";
import { DifficultTab } from "./components/DifficultTab";
import { FailScreenComponent } from "./components/FailScreenComponent";
import { LifeComponent } from "./components/LifeComponent";
import { Sudoku } from "./components/Sudoku";
import { GameContext } from "./context/GameProvider";
import "./styles/App.css";

function App() {
	const { state } = useContext(GameContext)

	return (
		<div className="main_bg">
			<div className="grid grid-flow-col justify-between">
				<CountDownComponent />
				<LifeComponent/>
			</div>
			<div
				className="
					relative flex flex-col items-center
					justify-center gap-8
				"
			>
				<DifficultTab />
				<Sudoku />
				{state.defeat ? <FailScreenComponent /> : <></>}
			</div>
		</div>
	);
}

export default App;
