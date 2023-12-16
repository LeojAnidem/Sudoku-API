import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GameProvider } from "./context/GameProvider.tsx";
import "./styles/index.css";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <GameProvider>
    <App />
  </GameProvider>
);
