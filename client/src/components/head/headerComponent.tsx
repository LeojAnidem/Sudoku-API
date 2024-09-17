import './styles/headerStyles.css'

export const HeaderComponent = () => {
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
      <div className="header__opts">
        <button>Play</button>
        <button className=''>Explore Api</button>
      </div>
    </header>
  )
}