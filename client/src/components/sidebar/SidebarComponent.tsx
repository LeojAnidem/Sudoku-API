import { IconInformation } from '../icons/IconInformation'
import { SideMenu } from './Components/SideMenu'
import { SideMenuItem } from './Components/SideMenuItem'

import './styles/SidebarStyles.css'

export const SidebarComponent = () => {
  return (
    <SideMenu>
      <SideMenuItem
        title="Let's check the API"
        icon = {<IconInformation />}
      >
        Documentation
      </SideMenuItem>
      <SideMenuItem
        title="Lets play!"
      >
        Play
      </SideMenuItem>
    </SideMenu>
  )
}