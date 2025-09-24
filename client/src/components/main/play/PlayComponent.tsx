import { GameComponent } from "./game/GameComponent"
import { TipComponent } from "./tip/TipComponent"

import "./PlayStyles.css"

export const PlayComponent = () => {
  return (
    <section
      className="play"
    >
      <TipComponent />
      <GameComponent />
    </section>
  )
}