import { FC } from "react"
import { IIcon } from "../../types/gameTypes"

export const IconPause: FC<IIcon> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" strokeWidth={2} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}