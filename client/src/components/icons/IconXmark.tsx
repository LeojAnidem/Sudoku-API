import { FC } from "react"
import { IIcon } from "../../types/gameInterfaces"

export const IconXmark: FC<IIcon> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg fill="none" strokeWidth={2} className={className} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}