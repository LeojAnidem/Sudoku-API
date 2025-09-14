import { LegacyRef } from "react"
import { LabelType } from "./sideMenuTypes"

export interface Ilabel {
  isInBubbleMode?: boolean,
  isHidden?: boolean,
  children?: React.ReactNode
}

export interface ISideMenu {
  children: React.ReactNode
}

export interface ISideMenuItem extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
  ref?: LegacyRef<HTMLAnchorElement>
  icon?: React.ReactNode,
  labelProps?: LabelType,
  isActive?: boolean
}