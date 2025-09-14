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
    activeItem,
    setLabelProps,
    handleOnClic,
    setActiveItem
  } = useSideMenu()

  const updatedChildren = React.Children.map(children, (child: React.ReactNode, i) => {
    if (React.isValidElement(child) && child.type === SideMenuItem) {
      const labelProps:LabelType = setLabelProps()
      const childId = `sideItem-${i}`
      const isActive = childId === activeItem

      return React.cloneElement(child, {
        ...child.props,
        labelProps,
        isActive,
        onClick: (event: React.MouseEvent) => {
          event.preventDefault()
          setActiveItem(childId)
          child.props.onClick?.(event)
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