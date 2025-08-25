import { LegacyRef, useEffect, useState } from "react"
import { IconMenu } from "../icons/IconMenu"
import { IconPause } from "../icons/IconPause"

import { useHover } from "../../hooks/useHover"
import './styles/SidebarStyles.css'

type wideType = {
    isAuto: boolean,
    isManual: boolean
  }

const wideState: wideType = {
  isAuto: false,
  isManual: false
}


export const SidebarComponent = () => {
	const [wideMode, setWideMode] = useState<wideType>(wideState)
  const [bgRef, bgIsHovered] = useHover()
  const [menuBtnRef, menuBtnIsHovered] = useHover()

  
  useEffect(() => {
    const nwWideMode = {...wideMode}
    if (wideMode.isManual) return

    if (bgIsHovered) {
      if (!menuBtnIsHovered) nwWideMode.isAuto = true
    }
      else  nwWideMode.isAuto = false

    setWideMode({...nwWideMode})

  }, [bgIsHovered, menuBtnIsHovered, wideMode.isManual])

  const handleOnClic = () => {
    const nwWideMode = {...wideMode}

    if (nwWideMode.isAuto) {
      if (!nwWideMode.isManual) {
        nwWideMode.isManual = true

      } else {
        nwWideMode.isAuto = false
        nwWideMode.isManual = false
      } 
    } else if (!nwWideMode.isManual) {
      nwWideMode.isAuto = true,
      nwWideMode.isManual = true
    }

    setWideMode({...nwWideMode})
  }

  return (
		<div 
      ref={(bgRef as LegacyRef<HTMLDivElement>)}
      className={`sidebar ${wideMode.isAuto ? 'w-[400px]' : 'w-[100px]'}`}
    >			
			<button
        ref={(menuBtnRef as LegacyRef<HTMLButtonElement>)}
        className="relative"
        onClick={handleOnClic}
      >
        <IconMenu className="h-[48px] w-[48px]"/>
        <p className="tag">
          {wideMode.isAuto ? 'Contract Menu' : 'Extend Menu' }
        </p>

      </button>
      <a>
        <IconPause className="h-12 w-12"/>
      </a>
		</div>
	)
}