import { FC, useState } from "react"
import { ChangeEvent, IinputElemnt } from "../types/gameTypes"

export const InputElement: FC<IinputElemnt> = ({ pos, correctVal }) => {
	const [val, setVal] = useState('')

	const handleOnChange = (e: ChangeEvent) => {
		if (e.target.value !== '') {
			const max = parseInt(e.target.max)
			const value = parseInt(e.target.value)
			
			if (value === correctVal) {console.log('Correct!', pos)}
			
			return (value > max) ? setVal(`${max}`) : setVal(`${value}`)
		}
		
		return setVal(e.target.value)
	} 

	return (
		<input
			className="w-full h-full cursor-pointer bg-transparent flex text-center text-dark-tremor-brand"
			type="number"
			max={9}
			onChange={handleOnChange}
			value={val}
			
		/>
	)
}