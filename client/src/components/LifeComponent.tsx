import { FC, useContext, useEffect, useState } from "react"
import { GameContext } from "../context/GameProvider"
import { ILifeComponent, Life } from "../types/gameTypes"
import { IconHeart } from "./icons/IconHeart"

export const LifeComponent: FC<ILifeComponent> = ({ timer }) => {
  const INITIAL_STATE:Life[] = []
  const { state, dispatch } = useContext(GameContext)
  const [life, setLife] = useState(INITIAL_STATE)
  const [isDefeat, setIsDefeat] = useState(false)

  useEffect(() => {
    if (life.length <= 0) {
      const arr = new Array(state.lifes).fill(0)
  
      arr.forEach((_, i) => {
        setLife(prev => {
          return [
            ...prev,
            {
              isActive: true,
              id: i
            }
          ]
        })
      })
    } 

    if (state.lifes > life.length && life.length > 0) {
      const diff = state.lifes - life.length

      new Array(diff).fill(0).forEach((_, i) => {
        setLife(prev => {
          return [
            ...prev,
            {
              isActive: true,
              id: prev[life.length - 1].id + i
            }
          ]
        })
      })
    }

    life.map(el => el.isActive = true)
    setIsDefeat(false)

  }, [state.difficult, state.sameDifficult])

  useEffect(() => {
    if (!state.defeat) {
      if (life.length !== state.lifes && life.length > 0) {
        const nLifeArr = [...life]
        nLifeArr[state.lifes].isActive = false
        setLife([...nLifeArr])
      }
  
      if (state.lifes <= 0) {
        timer.pause()
        setIsDefeat(true)
        dispatch({ type: "SET_GAME_OVER", isDefeat: true })
      }

    } else if (state.lifes > 0){
      const nLifeArr = [...life]
      nLifeArr[0].isActive = true
      setLife(() => [...nLifeArr])
      
      setIsDefeat(false)
      dispatch({ type: "SET_GAME_OVER", isDefeat: false})
      timer.resume()
    }

  }, [state.lifes])

  return (
    <div 
      className={`
        w-min h-min flex flex-col items-center
        ${!isDefeat
          ? 'bg-tremor-brand-emphasis'
          : 'bg-red-700'
        } 
        rounded-lg
      `}
    >
      <span
        className="
          pt-1 rounded-lg
          text-dark-tremor-background
          font-extrabold
        "
      >
        Intentos
      </span>
      
      <div
        className="
          flex bg-dark-tremor-background 
          m-1 px-0.5 rounded-lg
        "
      >
        {
          life.map(elt => {
            return (
              <IconHeart
                key={`I-Heart-${elt.id}`}
                className={`
                  w-8 h-9
                  ${!isDefeat 
                    ? `${elt.isActive
                        ? 'fill-tremor-brand-emphasis stroke-none'
                        : 'stroke-tremor-brand-emphasis fill-none'
                      }`
                    : 'stroke-red-700 fill-none'
                  }
                `}
              />
            )
          })
        }
      </div>
    </div>
  )
}