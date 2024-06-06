import { FC, useContext, useEffect, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameEnum"
import { IInputElement } from "../../../types/gameInterfaces"
import { ChangeEvent, KeyboardEvent } from "../../../types/gameTypes"
import { fillArrWithBlanks } from "../../../utils/boardFn"

export const InputElement: FC<IInputElement> = ({clickFn, className, position}) => {
	const {state, dispatch} = useContext(GameContext)
	const INITIAL_STATE: number[] = []

	const [curVal, setCurVal] = useState('')
  const [arrValues, setArrValues] = useState(INITIAL_STATE)

	useEffect(() => {
		setCurVal('')
		setArrValues([])
	}, [state.difficult])

	const handleOnInput = (e: ChangeEvent) => {
		// impide que puedas digitar '- o +' como valor
		if (e.target.value === '') {
			e.target.value = '' 
			return setCurVal('')
		}
	}

	const handleOnFocus = () => {
		if (state.status === GameStatus.playing) {
			const parseVal = parseInt(curVal)
			clickFn(parseVal, position)
		}

		if (state.status === GameStatus.draw) {
			const parseVal = parseInt('')
			clickFn(parseVal, position)
		}
	}

	const handleOnChange = (e: ChangeEvent) => {
		const val = parseInt(e.target.value)
		const max = parseInt(e.target.max)
		const min = parseInt(e.target.min)
		
		if (state.status === GameStatus.playing) {
			setArrValues([])
			
			val < min || val > max 
				? setCurVal('')
				: setCurVal(`${val}`)

			clickFn(val, position)
			dispatch({type: 'CHECK_WIN'})
		}

		if (state.status === GameStatus.draw) {
			setCurVal('')

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
	}

	const handleOnKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
			e.preventDefault()

		if (e.key === 'Delete' || e.key === 'Backspace') {
      if (state.status === GameStatus.playing) {
				clickFn(NaN, position)
				setCurVal('')
			}
			
			if (state.status === GameStatus.draw) {
				const nArrVals = [...arrValues]
				nArrVals.pop()
				setArrValues(() => [...nArrVals])
			}
    }
	}

	return (
		<div className={`w-full h-full relative ${className}`}>
			<div
				className={`
					w-full h-ful
					text-dark-tremor-brand font-semibold
					${arrValues.length > 0
						? `
								grid grid-cols-3 grid-rows-3
								text-[0.5rem]
							`
						: 'flex items-center justify-center text-lg'
					}
					
				`}
			>
				{arrValues.length > 0 
					? fillArrWithBlanks(arrValues).map((val, i) => (
							<span key={`DrawInput-${i}`}>
								{val}
							</span>
						))
					: <span>{curVal}</span>
				}
			</div>
			<input
				className={`
					w-full h-full absolute cursor-pointer
					text-dark-tremor-brand text-center
					bg-transparent
				`}
				value={curVal}
				onChange={handleOnChange}
				onInput={handleOnInput}
				onKeyDown={handleOnKeyDown}
				onFocus={handleOnFocus}
				disabled={
					state.status !== GameStatus.playing
					&& state.status !== GameStatus.draw
				}
				min={1}
				max={9}
				type="number"
				onContextMenu={(e) => e.preventDefault()}
			/>		
		</div>
	)	
}