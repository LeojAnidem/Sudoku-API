import { GameComponent } from "./game/GameComponent"
import { TipComponent } from "./tip/TipComponent"

export const PlayComponent = () => {
  return (
    <section
      className="max-w-min h-full flex flex-col items-center gap-8
    text-white font-normal text-center"
    >
      <TipComponent />
      <GameComponent />
    </section>
  )
}