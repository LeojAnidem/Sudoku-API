import { FooterComponent } from "./components/footer/FooterComponent";
import { GameComponent } from "./components/game/GameComponent";
import { HeaderComponent } from "./components/head/headerComponent";

import "./styles/App.css";
import "./styles/commonStyles.css";

function App() {
	return (
		<div className="main_bg">
			<HeaderComponent />
			<GameComponent />
			<FooterComponent />
		</div>
	);
}

export default App;
