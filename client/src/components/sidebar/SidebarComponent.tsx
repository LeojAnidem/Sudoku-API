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

const LabelComponent = ({txt = '', isInBubbleMode = false, isHidden = false}) => {  
  const flag1 = isInBubbleMode ? 'tooltip': ''
  const flag2 = isHidden ? 'hidden opacity-0': ''
  const nwClassName = `tag ${flag1} ${flag2}`
  
  return (
    <p className={nwClassName}>
      {txt}
    </p>
  )
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

  const setTagIsHidden = (isPrimary = true) => {
    const isWide = wideMode.isAuto || wideMode.isManual

    if (!menuBtnIsHovered) {
      if (!isWide) return true
    } 
      else if (!isPrimary && !isWide) 
        return true

    return false
  }

  return (
		<div 
      ref={(bgRef as LegacyRef<HTMLDivElement>)}
      className={`sidebar ${wideMode.isAuto ? 'w-[400px]' : ''}`}
    >			

    {/*TODO: Volver Componente que contenga un hijo adentro el boton con el icono */}
			<button
        ref={(menuBtnRef as LegacyRef<HTMLButtonElement>)}
        className="menuBtn pt-5"
        onClick={handleOnClic}
      >
        <IconMenu className="h-8 w-8"/>
        <LabelComponent
          txt = {`${wideMode.isAuto ? 'Contract Menu' : 'Extend Menu' }`}
          isInBubbleMode = {!wideMode.isAuto}
          isHidden = {setTagIsHidden()}
        />
      </button>
      <a className="menuBtn">
        <IconPause className="h-8 w-8"/>
        <LabelComponent
          txt="Settings"
          isHidden={setTagIsHidden(false)}
        />
      </a>
		</div>
	)
}