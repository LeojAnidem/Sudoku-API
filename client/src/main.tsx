import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GameProvider } from "./context/GameProvider.tsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <GameProvider>
      <App />
    </GameProvider>
  </BrowserRouter>
);
