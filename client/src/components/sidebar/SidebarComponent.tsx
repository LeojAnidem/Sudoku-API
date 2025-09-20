import { IconInformation } from '../icons/IconInformation'
import { SideMenu } from './Components/SideMenu'
import { SideMenuItem } from './Components/SideMenuItem'

import './styles/SidebarStyles.css'

export const SidebarComponent = () => {
  return (
    <SideMenu>
      <SideMenuItem
        title="Lets play!"
        href='/'
      >
        Play
      </SideMenuItem>
      <SideMenuItem
        title="Let's check the API"
        icon = {<IconInformation />}
        href='/docs'
      >
        Documentation
      </SideMenuItem>
    </SideMenu>
  )
}