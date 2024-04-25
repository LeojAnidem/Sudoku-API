import { CountDownComponent } from "./components/CountDownComponent";
import { DifficultTab } from "./components/DifficultTab";
import { LifeComponent } from "./components/LifeComponent";
import { Sudoku } from "./components/Sudoku";
import "./styles/App.css";

function App() {
	return (
		<div className="main_bg">
			<div className="grid grid-flow-col">
				<LifeComponent />
				<CountDownComponent />
			</div>
			<DifficultTab />
			<Sudoku />
		</div>
	);
}

export default App;
