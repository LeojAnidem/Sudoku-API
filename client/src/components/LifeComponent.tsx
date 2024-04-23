import { useContext, useEffect } from "react"
import { GameContext } from "../context/GameProvider"

export const LifeComponent = () => {
  const {state} = useContext(GameContext)
  
  useEffect(() => {
    
  }, [])

  const convertToTimer = (miliseconds: number) :string => {
    let min = Math.floor(miliseconds / 60000)
    let sec = ((miliseconds % 60000) / 1000).toFixed(0)
    
    return (
      sec === '60'
        ? (min + 1) + ":00" 
        : min + ":" + (sec < '10' ? "0" : "") + sec
    );
  }

  return (
    <div>
      <h1
        className="
          text-tremor-brand-emphasis text-tremor-title
          font-semibold
        "
      >
        Vidas: {state.lifes}
      </h1>
      <h2
        className="
          text-tremor-brand-emphasis text-tremor-title
          font-semibold
        "
      >
        Tiempo: {convertToTimer(state.time)}
      </h2>
    </div>
  )
}