import { useEffect, useState } from "react"
import { LabelType, wideType } from "../types/sideMenu/sideMenuTypes"
import { useHover } from "./useHover"

export const useSideMenu = () => {
  const wideState: wideType = {
      isAuto: false,
      isManual: false
    }
  
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

  const setTagIsHidden = (isPrimary = false) => {
    const isWide = wideMode.isAuto || wideMode.isManual

    if (!menuBtnIsHovered) {
      if (!isWide) return true
    } 
      else if (!isPrimary && !isWide) 
        return true

    return false
  }

  const setLabelProps = (isMain = false):LabelType  => {
    return {
      isInBubbleMode: isMain ? !wideMode.isAuto : false,
      isHidden: setTagIsHidden(isMain)
    }
  }
  
  return {
    wideMode,
    bgRef,
    bgIsHovered,
    menuBtnRef,
    menuBtnIsHovered,
    setLabelProps,
    handleOnClic
  }
}