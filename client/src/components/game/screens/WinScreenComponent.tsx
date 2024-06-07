import { FC, useContext } from "react"
import { GameContext } from "../../../context/GameProvider"
import { formatSecondsToString } from "../../../utils/boardFn"

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
        <div className="flex flex-col items-start">
          {objSortByKey.names.map((name, i) => {
            return (
              <span key={`staticts-name-${i}`}>
                {name}
              </span>
            )
          })}
        </div>
        <div className="flex flex-col items-start">
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

export const WinScreenComponent = () => {
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

  return (
    <div className="game_screen">
      <div className="w-fit flex flex-col gap-8 items-center text-center">
        <span className="text-tremor-brand-emphasis">
          ¡Felicidades! ¡Lo has resuelto!
        </span>
        <div className="flex items-center gap-6 relative">
          <StatisticsComponent statics={statics} />
          <img className="w-24" src="404" />
        </div>
        <button>
          Empezar nuevo juego
        </button>
      </div>  
    </div>
  )
}