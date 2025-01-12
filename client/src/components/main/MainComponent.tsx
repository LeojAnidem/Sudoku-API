import { GameComponent } from "../game/GameComponent"
import './styles/mainStyles.css'

export const MainComponent = () => {
  const TipComponent = () => {
    return (
      <article className="main__game__art">
        <h2 className="main__game__title">
          Sudoku Rules
        </h2>
        <p>Fill the grid with numbers from one to nine. Each row, column, and box must have all digits.</p>
      </article>
    )
  }

  return (
    <main className="main">
      <section className="main__game">
        <TipComponent />
        <GameComponent />
      </section>
    </main>
  )
}