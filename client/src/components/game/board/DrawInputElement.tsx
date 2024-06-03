import { FC, useState } from "react"
import { IInputElement } from "../../../types/gameInterfaces"
import { ChangeEvent, KeyboardEvent } from "../../../types/gameTypes"

export const DrawInputElement: FC<IInputElement> = ({position, clickFn, className}) => {
  const INITIAL_STATE: number[] = []
  const [arrValues, setArrValues] = useState(INITIAL_STATE)
  
  const handleOnFocus = () => {
    const val = parseInt('')
    clickFn(val, position)
  }

  const handleOnKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
			e.preventDefault()

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const nArrVals = [...arrValues]
      nArrVals.pop()
      setArrValues(() => [...nArrVals])
    }
	}

  const handleOnChange = (e: ChangeEvent) => {
    const val = parseInt(e.target.value)
    const max = parseInt(e.target.max)
    const min = parseInt(e.target.min)

    if (val >= min && val <= max) {
      const idIncludeVal = arrValues.findIndex((e) => e === val)

      if (idIncludeVal < 0) {
        setArrValues((prev) => [
          ...prev, val
        ])
      } else {
        const nArrWithoutRepeat = [...arrValues]
        nArrWithoutRepeat.splice(idIncludeVal, 1)
        setArrValues(() => [...nArrWithoutRepeat])
      }
    }
  }

  return (
    <div className={`w-full h-full relative ${className}`}>
      <div
        className={`
          absolute z-[6] w-full h-full -top-[0.2rem] p-1
          text-[0.5rem] text-white
          grid grid-cols-3 grid-rows-3 gap-1.5
        `}
      >
        {arrValues.map((val, i) => (
          <span key={`DrawInput-${i}`}>
            {val}
          </span>
        ))}
      </div>
      <input
        className={`
          absolute w-full h-full z-[7] text-center
          text-dark-tremor-brand-emphasis
          cursor-pointer bg-transparent
        `}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        value={''}
        type="number"
        min={1}
        max={9}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={handleOnKeyDown}
      />
    </div>
  )
}