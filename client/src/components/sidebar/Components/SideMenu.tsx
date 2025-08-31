import React, { LegacyRef, Ref } from "react"
import { useSideMenu } from "../../../hooks/useSideMenu"
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
    handleOnClic
  } = useSideMenu()

  const updatedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === SideMenuItem) {
      const labelProps:LabelType = setLabelProps()

      return React.cloneElement(child, {
        ...child.props,
        labelProps
      })
    }
    return child
  })

  return (
    <div
      ref={(bgRef as LegacyRef<HTMLDivElement>)}
      className={`sidebar ${wideMode.isAuto ? 'w-[400px] pl-4' : ''}`}
    >
      <SideMenuItem
        className="pt-5 pb-2"
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