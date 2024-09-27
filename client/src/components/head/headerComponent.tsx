import { useState } from 'react'
import { IconMenu } from '../icons/IconMenu'
import './styles/headerStyles.css'

export const HeaderComponent = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)

  return (
    <header className="header">
      <h1 className="logo">
        <span className="text-tremor-brand">
          Doku
        </span>
        <span className="z-[1]">
          Api
        </span>
        <div className="logo__icon"/>
      </h1>
      <nav className={`header__navbar ${isMenuActive ? 'left_menu__enable': 'right_menu__disable'}`}>
        <label
          className='header__navbar__chk'
          onContextMenu={(e) => e.preventDefault()}
        >
          <IconMenu />
          <input 
            type="checkbox" 
            name="header navbar checkbox"
            alt="navbar"
            checked={isMenuActive}
            onChange={() => setIsMenuActive(!isMenuActive)}
          />
        </label>
        <button>Play</button>
        <button>Explore Api</button>
      </nav>
    </header>
  )
}