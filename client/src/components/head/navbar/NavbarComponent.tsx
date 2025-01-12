import { IconGitHub } from '../../icons/IconGitHub'
import '../styles/NavbarStyles.css'

export const NavbarComponent = () => {
  return (
    <nav className='w-full h-full flex items-center justify-end gap-10'>
      {/* <a className='navbar__link' href='#'>
        Play
      </a>
      <a className='navbar__link' href='#'>
        Explore API
      </a> */}
      <a className='navbar__link' href='https://github.com/LeojAnidem'>
        <div className='navbar__icon'>
          <IconGitHub/>
        </div>
      </a>
    </nav>
  )
}