import { DifficultTab } from "./components/DifficultTab";
import { LifeComponent } from "./components/LifeComponent";
import { Sudoku } from "./components/Sudoku";
import "./styles/App.css";

function App() {
	return (
		<div className="main_bg">
			<LifeComponent />
			<DifficultTab />
			<Sudoku />
		</div>
	);
}

export default App;
