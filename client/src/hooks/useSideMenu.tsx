import { useEffect, useRef, useState } from "react"
import { LabelType, wideType } from "../types/sideMenu/sideMenuTypes"


export const useSideMenu = (bgIsHovered: boolean, menuBtnIsHovered: boolean) => {
  const wideState: wideType = {
    isAuto: false,
    isManual: false
  }
  
  const [wideMode, setWideMode] = useState<wideType>(wideState)
  const hoverTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (wideMode.isManual) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      return
    }

    if (bgIsHovered) {
      if (hoverTimeoutRef.current) return
      if (!menuBtnIsHovered) {
        hoverTimeoutRef.current = setTimeout(() => {
          setWideMode(prevMode => ({...prevMode, isAuto: true}))
          hoverTimeoutRef.current = null
        }, 200)
      }
    }
      else  {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
          hoverTimeoutRef.current = null
        }
        setWideMode(prevMode => ({...prevMode, isAuto: false}))
      }

  }, [bgIsHovered, menuBtnIsHovered, wideMode.isManual])

  const handleOnClic = () => {
      setWideMode(prevMode => ({
      isManual: !prevMode.isManual,
      isAuto: !prevMode.isManual,
    }));  
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
      isHidden: setTagIsHidden(isMain),
    }
  }
  
  return {
    wideMode,
    setLabelProps,
    handleOnClic,
  }
}