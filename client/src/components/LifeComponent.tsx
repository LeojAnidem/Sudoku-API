import { useContext, useEffect, useState } from "react"
import { GameContext } from "../context/GameProvider"
import { Life } from "../types/gameTypes"
import { IconHeart } from "./icons/IconHeart"

export const LifeComponent = () => {
  const INITIAL_STATE:Life[] = []
  const { state, dispatch } = useContext(GameContext)
  const [life, setLife] = useState(INITIAL_STATE)

  useEffect(() => {
    if (life.length <= 0 && state.lifes > 0) {
      const arr: Life[] = new Array(state.lifes)
        .fill(0)
        .map((_, i) => {
          return {
            isActive: true,
            id: i
          }
        })
  
      setLife(() => [...arr])
    } 

    if (state.lifes > life.length && life.length > 0) {
      const diff = state.lifes - life.length

      const arr = new Array(diff)
        .fill(0)
        .map((_, i) => {
          return {
            isActive: true,
            id: life.length + i
          }
        })

      setLife((prev) => [...prev, ...arr])
    }

    life.map(el => el.isActive = true)

  }, [state.difficult, state.sameDifficult])

  useEffect(() => {
    if (!state.defeat) {
      if (life.length !== state.lifes && life.length > 0) {
        const nLifeArr = [...life]
        nLifeArr[state.lifes].isActive = false
        setLife(() => [...nLifeArr])
      }
  
      if (state.lifes <= 0)
        dispatch({ type: "SET_GAME_OVER", isDefeat: true })

    } else if (state.lifes > 0){
      const nLifeArr = [...life]
      nLifeArr[0].isActive = true
      setLife(() => [...nLifeArr])
      
      dispatch({ type: "SET_GAME_OVER", isDefeat: false})
    }

  }, [state.lifes])

  return (
    <div 
      className={`
        w-min h-min flex flex-col items-center
        ${!state.defeat
          ? 'bg-tremor-brand-emphasis'
          : 'bg-red-700'
        } 
        rounded-lg
      `}
    >
      {/* <span
        className="
          pt-1 rounded-lg
          text-dark-tremor-background
          font-extrabold
        "
      >
        Intentos
      </span> */}
      
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
                  ${!state.defeat 
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