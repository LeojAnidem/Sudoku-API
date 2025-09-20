import React, { LegacyRef, Ref, useContext } from "react"
import { useLocation } from "react-router-dom"
import { GameContext } from "../../../context/GameProvider"
import { useSideMenu } from "../../../hooks/useSideMenu"
import { Difficult } from "../../../types/gameEnum"
import { ISideMenu } from "../../../types/sideMenu/sideMenuInterfaces"
import { LabelType } from "../../../types/sideMenu/sideMenuTypes"
import { IconMenu } from "../../icons/IconMenu"
import { SideMenuItem } from "./SideMenuItem"

export const SideMenu: React.FC<ISideMenu> = ({ children }) => {
  const {
    wideMode,
    bgRef,
    menuBtnRef,
    setLabelProps,
    handleOnClic,
  } = useSideMenu()
  
  const location = useLocation()
  const { dispatch } = useContext(GameContext)

  const updatedChildren = React.Children.map(children, (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === SideMenuItem) {
      const labelProps:LabelType = setLabelProps()
      const isActive = location.pathname === child.props.href

      return React.cloneElement(child, {
        ...child.props,
        labelProps,
        isActive,
        onClick: (event: React.MouseEvent) => {
          child.props.onClick?.(event)
          dispatch({type:"CHANGE_DIFFICULT", difficult:Difficult.Easy, isSameDifficult: false})
        }
      })
    }
    return child
  })

  return (
    <div
      ref={(bgRef as LegacyRef<HTMLDivElement>)}
      className={`sidebar ${wideMode.isAuto ? 'w-[400px] sidebar_wide' : ''}`}
    >
      <SideMenuItem
        className="pt-7 pb-6 menuBtn_opt"
        ref={(menuBtnRef as Ref<HTMLAnchorElement>)}
        onClick={handleOnClic}
        icon={<IconMenu/>}
        labelProps={setLabelProps(true)}
      >
        {`${wideMode.isAuto ? 'Contract Menu' : 'Extend Menu' }`}
      </SideMenuItem>

      {updatedChildren}
    </div>
  )
}