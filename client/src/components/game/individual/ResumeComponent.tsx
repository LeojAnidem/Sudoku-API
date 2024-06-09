import download from "downloadjs"
import { StatisticsComponent } from "./StatisticsComponent"
import { convertHtmlToImageUrl, formatSecondsToString } from "../../../utils/boardFn"
import { FC, useContext, useEffect, useState } from "react"
import { statics } from "../../../types/gameTypes"
import { GameContext } from "../../../context/GameProvider"
import { IScreenComponent } from "../../../types/gameInterfaces"

export const ResumeComponent: FC<IScreenComponent> = ({onClick}) => {
  const {state, timer} = useContext(GameContext)
  const [imageSrc, setImageSrc] = useState<string>('')

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

  // Guardar imagen como variable global
  // hacer esta logica en gameReducer
  // agregar un dispatch para establecer dos images
  // del sudoku solo y completo
  useEffect(() => {
    if (!state.boardRef) return
    convertHtmlToImageUrl(state.boardRef)
      .then((url) => setImageSrc(url))
  }, [state.boardRef])

  const handleDownload = () => {
    if (!state.boardRef?.current) return
    download(imageSrc, 'sudoku.png')
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
          src={imageSrc}
          onClick={handleDownload}
        />
        <StatisticsComponent statics={statics} />
      </div>
      <button
        onClick={onClick}
      >
        Empezar nuevo juego
      </button>
    </div>  
  )
}