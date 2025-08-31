import { forwardRef } from "react"
import { IconFire } from "../../icons/IconFire"
import { LabelComponent } from "./LabelComponent"
import { ISideMenuItem } from "../../../types/sideMenu/sideMenuInterfaces"

export const SideMenuItem = forwardRef<HTMLAnchorElement, ISideMenuItem>(({children, icon, labelProps, ...props}, ref) => {
  return (
    <a
      {...props}
      ref={ref}
      className={`menuBtn ${props.className || ''}`}
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