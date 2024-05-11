import ThemeChanger from '../theme-changer/theme-changer'
import './header.css'
import logo from '@assets/logo.png'

function Header() {
  return (
    <header className="header">
      <div className='grid'>
        <div className='col-xs-3'>
          <ThemeChanger />
        </div>
        <div className='col-xs-3 logo'>
          <img src={logo} alt='logo' />
        </div>
      </div>
    </header>
  )
}

export default Header