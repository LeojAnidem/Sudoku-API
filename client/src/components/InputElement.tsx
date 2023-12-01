import { FC, useState } from "react"
import { ChangeEvent, IinputElemnt } from "../types/gameTypes"

export const InputElement: FC<IinputElemnt> = ({ pos, correctVal }) => {
	const [val, setVal] = useState('')
	console.log(correctVal, pos)

	const handleOnChange = (e: ChangeEvent) => {
		const max = parseInt(e.target.max)
		const value = parseInt(e.target.value)

		return (value > max) ? setVal(`${max}`) : setVal(`${value}`)
	} 

	return (
		<input
			className="w-full h-full bg-transparent flex text-center text-dark-tremor-brand"
			type="number"
			max={9}
			onChange={handleOnChange}
			value={val}
		/>
	)
}