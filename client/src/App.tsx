import { DifficultTab } from "./components/DifficultTab";
import { Sudoku } from "./components/Sudoku";
import "./styles/App.css";

function App() {
	return (
		<div className="main_bg">
			<h1 className="text-tremor-brand-emphasis text-tremor-title font-semibold">Vidas: 3</h1>
			<DifficultTab />
			<Sudoku />
		</div>
	);
}

export default App;
