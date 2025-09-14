import { forwardRef } from "react"
import { ISideMenuItem } from "../../../types/sideMenu/sideMenuInterfaces"
import { IconFire } from "../../icons/IconFire"
import { LabelComponent } from "./LabelComponent"

export const SideMenuItem = forwardRef<HTMLAnchorElement, ISideMenuItem>(({children, icon, labelProps, isActive, ...props}, ref) => {
  return (
    <a
      {...props}
      ref={ref}
      className={`
        menuBtn
        ${props.className || ''}
        ${isActive && 'menuBtn_active'}
        `
      }
    >
      {icon ?? <IconFire/>}
      <LabelComponent
        {...labelProps}
      >
        {children}
      </LabelComponent>
    </a>
  )
})