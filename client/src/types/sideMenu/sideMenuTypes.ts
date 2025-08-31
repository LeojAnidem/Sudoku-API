export type LabelType = {
  isInBubbleMode?: boolean,
  isHidden?: boolean,
}

export type wideType = {
    isAuto: boolean,
    isManual: boolean
  }

export type ReactComponentType = React.FunctionComponent<any> | React.ComponentClass<any> | string;