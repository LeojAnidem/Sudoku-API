import { FooterComponent } from "./components/footer/FooterComponent";
import { HeaderComponent } from "./components/head/headerComponent";
import { MainComponent } from "./components/main/MainComponent";
import { SidebarComponent } from "./components/sidebar/SidebarComponent";

import "./styles/App.css";
import "./styles/commonStyles.css";

function App() {
	return (
		<div className="main_bg">
			<SidebarComponent />
			<div className="content">
				<HeaderComponent />
				<MainComponent />
				<FooterComponent />
			</div>
		</div>
	);
}

export default App;
