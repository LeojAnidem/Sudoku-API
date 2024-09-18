import { FooterComponent } from "./components/footer/FooterComponent";
import { HeaderComponent } from "./components/head/headerComponent";
import { MainComponent } from "./components/main/MainComponent";

import "./styles/App.css";
import "./styles/commonStyles.css";

function App() {
	return (
		<div className="main_bg">
			<HeaderComponent />
			<MainComponent/>
			<FooterComponent />
		</div>
	);
}

export default App;
