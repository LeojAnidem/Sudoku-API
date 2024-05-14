import { useContext } from "react";
import { CountDownComponent } from "./components/CountDownComponent";
import { DifficultTab } from "./components/DifficultTab";
import { LifeComponent } from "./components/LifeComponent";
import { Sudoku } from "./components/Sudoku";
import { useCountdown } from "./hooks/useCountdown";
import "./styles/App.css";
import { GameContext } from "./context/GameProvider";
import { FailScreenComponent } from "./components/FailScreenComponent";

function App() {
	const timer = useCountdown()
	const { state } = useContext(GameContext)

	return (
		<div className="main_bg">
			<div className="grid grid-flow-col justify-between">
				<CountDownComponent timer={timer}/>
				<LifeComponent timer={timer}/>
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
