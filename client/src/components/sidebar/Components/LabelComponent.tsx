import { Ilabel } from "../../../types/sideMenu/sideMenuInterfaces"

export const LabelComponent: React.FC<Ilabel> = ({isInBubbleMode = false, isHidden = false, children}) => {  
  const flag1 = isInBubbleMode ? 'tooltip': ''
  const flag2 = isHidden ? 'hidden': 'opacity-100'
  const nwClassName = `tag ${flag1} ${flag2}`
  
  return (
    <p className={nwClassName}>
      {children}
    </p>
  )
}