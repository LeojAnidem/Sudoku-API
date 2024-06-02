import { FC, useContext, useEffect, useState } from "react"
import { GameContext } from "../../../context/GameProvider"
import { GameStatus } from "../../../types/gameEnum"
import { IInputElement } from "../../../types/gameInterfaces"
import { ChangeEvent } from "../../../types/gameTypes"

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

	return (
		<input
			className={`
				w-full h-full cursor-pointer flex text-center
				text-dark-tremor-brand font-semibold text-lg
				select-none ${className}
			`}
			type="number"
			min={1}
			max={9}
			onChange={handleOnChange}
			onInput={handleOnInput}
			value={curVal}
			onFocus={() => clickFn(parseInt(curVal), position)}
			onContextMenu={(e) => e.preventDefault()}
			disabled={state.status !== GameStatus.playing}
		/>
	)	
}