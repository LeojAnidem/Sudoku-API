import { Route, Routes } from "react-router-dom"
import { PlayComponent } from "./play/PlayComponent"
import './styles/mainStyles.css'
import { DocsComponent } from "./docs/DocsComponent"
import { NotFoundComponent } from "./NotFound/NotFoundComponent"

export const MainComponent = () => {
  return (
    <main className="main">
      <Routes>
        <Route index element={<PlayComponent />} />
        <Route path="/docs" element={<DocsComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </main>
  )
}