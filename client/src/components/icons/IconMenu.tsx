import { FC } from "react"
import { IIcon } from "../../types/gameInterfaces"

export const IconMenu: FC<IIcon> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg fill="none" strokeWidth={2} className={className} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}