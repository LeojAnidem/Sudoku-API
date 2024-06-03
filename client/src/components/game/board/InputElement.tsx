import { FC, useContext, useEffect, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameEnum"
import { IInputElement } from "../../../types/gameInterfaces"
import { ChangeEvent, KeyboardEvent } from "../../../types/gameTypes"

export const InputElement: FC<IInputElement> = ({clickFn, className, position}) => {
	const {state} = useContext(GameContext)
	const [curVal, setCurVal] = useState('')

	useEffect(() => setCurVal(''), [state.difficult])

	const handleOnInput = (e: ChangeEvent) => {
		// impide que puedas digitar '- o +' como valor
		if (e.target.value === '') {
			e.target.value = '' 
			return setCurVal('')
		}
	}

	const handleOnChange = (e: ChangeEvent) => {
		const val = parseInt(e.target.value)
		const max = parseInt(e.target.max)
		const min = parseInt(e.target.min)
		
		clickFn(val, position)
		return (val < min || val > max) 
			? setCurVal('')
			: setCurVal(`${val}`)
	}

	const handleOnKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
			e.preventDefault()
	}

	return (
		<input
			className={`
				font-semibold text-lg
				text-dark-tremor-brand 
				${className}
			`}
			value={curVal}
			onChange={handleOnChange}
			onInput={handleOnInput}
			onKeyDown={handleOnKeyDown}
			onFocus={() => clickFn(parseInt(curVal), position)}
			disabled={state.status !== GameStatus.playing}
			min={1}
			max={9}
			type="number"
			onContextMenu={(e) => e.preventDefault()}
		/>		
	)	
}