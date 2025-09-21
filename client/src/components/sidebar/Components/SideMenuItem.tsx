import { forwardRef } from "react"
import { Link } from "react-router-dom"
import { ISideMenuItem } from "../../../types/sideMenu/sideMenuInterfaces"
import { IconFire } from "../../icons/IconFire"
import { LabelComponent } from "./LabelComponent"

export const SideMenuItem = forwardRef<HTMLAnchorElement, ISideMenuItem>(({children, icon, labelProps, isActive, href, ...props}, ref) => {
  const commonProps = {
    ...props,
    ref,
    className: `menuBtn ${props.className || ''} ${isActive && 'menuBtn_active'}`
  };

  const content = (
    <>
      {icon ?? <IconFire/>}
      <LabelComponent {...labelProps}>
        {children}
      </LabelComponent>
    </>
  );

  if (href) {
    return (
      <Link {...commonProps} to={href as string}>
        {content}
      </Link>
    );
  }

  return (
    <a {...commonProps}>
      {content}
    </a>
  );
})