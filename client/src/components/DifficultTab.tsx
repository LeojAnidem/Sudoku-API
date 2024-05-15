import { Difficult } from "../types/gameTypes"
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../context/GameProvider"

export const DifficultTab = () => {
  const { state, dispatch } = useContext(GameContext)

  type OptionDifficult = {
    value: Difficult,
    isActive: boolean,
    id: number
  }

  const INITIAL_STATE: OptionDifficult[] = []
  const [options, setOptions] = useState(INITIAL_STATE)

  useEffect(() => {
    const nOptions: OptionDifficult[] = Object.values(Difficult).map((difficult, i) => {
      const optionObj = {
        value: difficult,
        id: i,
        isActive: false
      }

      return optionObj
    })

    const idxDifficult = nOptions.findIndex(({ value }) => value === state.difficult)

    if (idxDifficult >= 0)
      nOptions[idxDifficult].isActive = true

    setOptions(() => [...nOptions])

  }, [state.difficult])

  const handlerOnClic = (difficult: Difficult) => {
    dispatch({ type: 'CHANGE_DIFFICULT', difficult })
  }

  return (
    <div className="w-full">
      <ul
        className="
          w-min relative overflow-hidden p-1.5 pr-2
          flex items-center justify-center bg-dark-tremor-background
        "
      >
        {options.map((option) => {
          return (
            <li
              key={`difficultTab-${option.id}`}
              onClick={() => handlerOnClic(option.value)}
              className={`
                h-full w-min px-4 relative cursor-pointer
                text-lg font-bold
                
                ${option.isActive
                  ? 'bg-dark-tremor-brand-subtle text-white py-0.5'
                  : 'bg-dark-tremor-brand text-dark-tremor-background'
                }
              `}
            >
              {
                (option.id + 1) === options.length
                  ? <div
                    className="
                      absolute w-4 h-12 -top-2 -right-5 z-[3]
                      -rotate-12 bg-dark-tremor-background
                      "
                  />
                  : <></>
              }
              <div
                className="
                  absolute w-1.5 h-12 -top-1 -right-1 z-[3]
                  -rotate-12 bg-dark-tremor-background
                "
              />
              {option.value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}