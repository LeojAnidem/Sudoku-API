import './styles/LogoStyles.css'

export const Logo = () => {
  return (
    <h1 className="logo">
      <span className="text-tremor-brand">
        Doku
      </span>
      <span className="z-[1]">
        Api
      </span>
      <div className="logo__icon"/>
    </h1>
  )
}