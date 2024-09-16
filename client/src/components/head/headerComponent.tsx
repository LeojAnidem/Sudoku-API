export const HeaderComponent = () => {
  return (
    <header
      className={`
        h-full w-full flex justify-between
      `}
    >
      <h1
        className={`
          text-white text-5xl font-bold
        `}
      >
        <span
          className="text-tremor-brand"
        >
          Doku
        </span>
        <span>Api</span>
      </h1>
    </header>
  )
}