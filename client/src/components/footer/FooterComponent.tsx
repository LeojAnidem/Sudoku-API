import { IconHeart } from '../icons/IconHeart'
import './styles/footerStyles.css'

export const FooterComponent = () => {
  return (
    <footer className="footer">
      <p className='flex items-center gap-1'>
        <span>Made with</span>
        <IconHeart className='text-tremor-brand w-5 h-5' />
        <span>by</span>
      </p>
      <a
        className='footer__link'
        href="https://github.com/LeojAnidem">
        Leoj Anidem
      </a>  
    </footer>
  )
}