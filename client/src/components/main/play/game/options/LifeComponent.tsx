import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../../../context/GameProvider"
import { Life } from "../../../../../types/gameTypes"
import { GameStatus } from "../../../../../types/gameEnum"
import { IconHeart } from "../../../../icons/IconHeart"

export const LifeComponent = () => {
  const { state, dispatch, timer } = useContext(GameContext)

  const setUpInitialState = (lifes: number):Life[] => {
    return new Array(lifes)
      .fill(0)
      .map((_, i) => {
        return {
          isActive: true,
          id: i
        }
    })
  }

  const INITIAL_STATE = setUpInitialState(state.lifes)
  const [life, setLife] = useState(INITIAL_STATE)

  useEffect(() => {
    if (life.length <= 0 && state.lifes > 0 && state.status === GameStatus.loading) {
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

    life.map(el => el.isActive = true)

  }, [state.difficult, state.forceRestart])

  useEffect(() => {
    if (state.status === GameStatus.playing) {
      if (life.length !== state.lifes && life.length > 0) {
        const nLifeArr = [...life]
        nLifeArr[state.lifes].isActive = false
        setLife(() => [...nLifeArr])
      }
  
      if (state.lifes <= 0) {
        dispatch({ type: "SET_STATUS", status: GameStatus.gameOver })
        timer.pause()
      }
    } 
    
    if (state.lifes > 0 && state.status === GameStatus.gameOver) {
      const nLifeArr = [...life]
      nLifeArr[0].isActive = true
      setLife(() => [...nLifeArr])
      
      dispatch({ type: "SET_STATUS", status: GameStatus.playing})
    }

  }, [state.lifes])

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`
        w-min h-min flex flex-col items-center
        ${!life.every(e => !e.isActive)
          ? 'bg-tremor-brand-emphasis'
          : 'bg-red-700'
        } 
        rounded-lg
      `}
    > 
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
                  w-7 h-8
                  ${!life.every(e => !e.isActive) 
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