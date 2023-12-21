import { FC, useContext, useEffect, useState } from "react"
import { GameContext } from "../context/GameProvider"
import { ChangeEvent, IElement } from "../types/gameTypes"

export const InputElement: FC<IElement> = ({ position, value, isUnsolved, isSelected }) => {
	const {state, dispatch} = useContext(GameContext)
	const [curVal, setCurVal] = useState('')
	const {isInGroup, isInRowOrCol, isOnCenter, isSameValue, isWrong} = isSelected
	
	useEffect(() => setCurVal(''), [state.difficult])
	
	const selectClassName = {
		rowOrCol: isInRowOrCol && !isOnCenter ? 'selected' : '',
		onCenter: isOnCenter ? 'selected__focus' : '',
		sameVal: isSameValue && !isOnCenter && !isInRowOrCol && !isInGroup
			? 'selected__val' : '',
		inGroup: isInGroup && !isOnCenter && !isInRowOrCol
			? 'selected' : '',
		noEffect: !isOnCenter && !isInRowOrCol && !isSameValue && !isInGroup
			? 'bg-transparent' : '',
		wrong: isWrong ? 'selected__wrong' : ''
	}

	const handleClic = (value: Number) => dispatch({ type: "SELECTING", position, value })
	
	const handleOnInput = (e: ChangeEvent) => {
		// La linea a continuacion es necesaria, si la eliminas
		// el input:Number no funcionara correctamente y permitira
		// que puedas escribir cosas como '2----2222++1', lo que
		// claramente es un error no deseado
		
		if (e.target.value === '') {
			e.target.value = '' // impide que puedas digitar '- o +' como valor
			return setCurVal('')
		}
	}

	const handleOnChange = (e: ChangeEvent) => {
		const val = parseInt(e.target.value)
		const max = parseInt(e.target.max)
		const min = parseInt(e.target.min)
		if (val < min || val > max) return setCurVal('')

		dispatch({ type: "SELECTING", position, value: val })
		
		if (val === value) {console.log('Correct!', position)}
		
		return setCurVal(`${val}`)
	}

	return (
		<>
			{!isUnsolved
				? <span
						className={`
							w-full h-full flex items-center justify-center
							${selectClassName.rowOrCol}
							${selectClassName.sameVal}
							${selectClassName.inGroup}
							${selectClassName.onCenter}
							${selectClassName.wrong}
						`}
						onClick={() => handleClic(value)}
					>
						{`${value}`}
					</span>
				: <input
						className={`
							w-full h-full cursor-pointer flex text-center
							text-dark-tremor-brand font-semibold text-lg
							${selectClassName.noEffect}
							${selectClassName.rowOrCol}
							${selectClassName.sameVal}
							${selectClassName.inGroup}
							${selectClassName.onCenter}
							${selectClassName.wrong}
						`}
						type="number"
						min={1}
						max={9}
						onChange={handleOnChange}
						onClick={() => handleClic(parseInt(curVal))}
						onInput={handleOnInput}
						value={curVal}
					/>
			}
		</>
	)
}