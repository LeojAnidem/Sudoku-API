import { CountDownComponent } from "./components/CountDownComponent";
import { DifficultTab } from "./components/DifficultTab";
import { LifeComponent } from "./components/LifeComponent";
import { Sudoku } from "./components/Sudoku";
import { useCountdown } from "./hooks/useCountdown";
import "./styles/App.css";

function App() {
	const timer = useCountdown()

	return (
		<div className="main_bg">
			<div className="grid grid-flow-col justify-between">
				<CountDownComponent timer={timer}/>
				<LifeComponent timer={timer}/>
			</div>
			<DifficultTab />
			<Sudoku />
		</div>
	);
}

export default App;
