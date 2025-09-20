import { forwardRef } from "react"
import { ISideMenuItem } from "../../../types/sideMenu/sideMenuInterfaces"
import { IconFire } from "../../icons/IconFire"
import { LabelComponent } from "./LabelComponent"
import { Link } from "react-router-dom"

export const SideMenuItem = forwardRef<HTMLAnchorElement, ISideMenuItem>(({children, icon, labelProps, isActive, ...props}, ref) => {
  const Item = () => {
    return (
      <Link
        {...props}
        to={`${props.href}`}
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
      </Link>
    )
  }

  const Btn = () => {
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
  }
  
  return (
    <>
      {props.href 
        ? <Item />
        : <Btn />
      }
    </>
  )
})