import download from "downloadjs"
import { FC, useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { IScreenComponent } from "../../../types/gameInterfaces"
import { statics } from "../../../types/gameTypes"
import { formatSecondsToString } from "../../../utils/boardFn"
import { StatisticsComponent } from "./StatisticsComponent"

export const ResumeComponent: FC<IScreenComponent> = ({onClick}) => {
  const {state, timer} = useContext(GameContext)

  const statics : statics[] = [
    {
      name: 'Vidas restantes',
      value: state.lifes
    },
    {
      name: 'Puntuacion',
      value: state.score
    },
    {
      name: 'Tiempo de juego',
      value: formatSecondsToString(timer.secondsLeft)
    },
    {
      name: 'Dificultad',
      value: state.difficult
    },
  ]

  const handleDownload = () => {
    if (!state.boardImageSrc) return
    download(state.boardImageSrc, 'sudoku.png')
  }
  
  return (
    <div className="w-fit flex flex-col gap-8 items-center">
      <span className="
      text-tremor-brand-emphasis drop-shadow-[0_5px_5px_rgba(0,0,0,.8)]
      ">
        ¡Felicidades! ¡Lo has resuelto!
      </span>
      <div className="flex items-center gap-6 relative">
        <img
          className="w-32"
          src={state.boardImageSrc}
          onClick={handleDownload}
        />
        <StatisticsComponent statics={statics} />
      </div>
      <button
        className='
          hover:text-dark-tremor-brand-emphasis
        '
        onClick={onClick}
      >
        Empezar nuevo juego
      </button>
    </div>  
  )
}