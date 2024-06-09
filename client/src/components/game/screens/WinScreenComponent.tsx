import download from 'downloadjs';
import { toPng } from 'html-to-image';
import { FC, RefObject, useContext, useEffect, useState } from "react";
import { GameContext } from "../../../context/GameProvider";
import { formatSecondsToString } from "../../../utils/boardFn";

export type statics = {
  name: string,
  value: number | string
}

export const StatisticsComponent: FC<{statics: statics[]}> = ({statics}) => {
  const sortStatics = structuredClone(statics)
    .sort((a, b) => a.name.length - b.name.length)

  const INITIAL_VAl : {
    names: string[], 
    values: (number | string)[]
  } = { names: [], values: [] }

  const objSortByKey = sortStatics.reduce((acc, cur) => {
    acc.names.push(cur.name)
    acc.values.push(cur.value)
    return acc
  }, INITIAL_VAl)
  
  return (
    <div className="w-fit flex flex-col gap-4 text-lg">
      <span>Estadisticas</span>
      <div className="flex gap-4">
        <div className="flex flex-col items-start gap-2">
          {objSortByKey.names.map((name, i) => {
            return (
              <span key={`staticts-name-${i}`}>
                {name}
              </span>
            )
          })}
        </div>
        <div className="flex flex-col items-start gap-2">
          {objSortByKey.values.map((value, i) => {
            return (
              <span key={`staticts-value-${i}`}>
                {value}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const convertHtmlToImageUrl = async(ref: RefObject<HTMLElement | null>) => {
  if (!ref.current) return ''

  try {
    const dataUrl = await toPng(ref.current)
    return dataUrl ?? ''

  } catch (err) {
    console.error('Error generando la imagen: ', err)
    return ''
  }
}

export const WinScreenComponent = () => {
  const {state, timer} = useContext(GameContext)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    if (!state.boardRef) return
    convertHtmlToImageUrl(state.boardRef)
      .then((url) => setImageSrc(url))
  }, [state.boardRef])

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
    if (!state.boardRef?.current) return
    download(imageSrc, 'sudoku.png')
  }

  return (
    <div className="game_screen">
      <div className="w-fit flex flex-col gap-8 items-center">
        <span className="text-tremor-brand-emphasis">
          ¡Felicidades! ¡Lo has resuelto!
        </span>
        <div className="flex items-center gap-6 relative">
          <StatisticsComponent statics={statics} />
          <img
            className="w-32"
            src={imageSrc}
            onClick={handleDownload}
          />
        </div>
        <button>
          Empezar nuevo juego
        </button>
      </div>  
    </div>
  )
}