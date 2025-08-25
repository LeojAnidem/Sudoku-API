import { Logo } from './LogoComponent'
import { NavbarComponent } from './navbar/NavbarComponent'

import './styles/headerStyles.css'

export const HeaderComponent = () => {

  return (
    <header 
      className="header"
      onContextMenu={(e) => {e.preventDefault()}}
    >
      <Logo />
      <NavbarComponent />
    </header>
  )
}