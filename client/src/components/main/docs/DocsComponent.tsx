import "./styles/DocsStyles.css"

export const DocsComponent = () => {
  return (
    <div className="docs">
      <h1 className="docs__title">
        Documentation
      </h1>
      <ul className="docs__list">
        {/* structure for each item */}
        <li className="docs__article">
          <h2 className="docs__article__title">
            Url Api
          </h2>
          <div className="docs__codeSpace">
            <span className="docs__codeSpace__text">
              space for code and url api
            </span>
            <button className="docs__codeSpace__btn">
              icon for copy to clipboard
            </button>
          </div>
          <p className="docs__article__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias in architecto blanditiis vitae perspiciatis animi doloremque velit temporibus ipsa dignissimos quisquam repellat, laudantium minima sint similique ullam non? Aperiam, eligendi.
          </p>
        </li>
        <article className="docs__article">
          <h2 className="docs__article__title">
            Url Api
          </h2>
          <div className="docs__codeSpace">
            <span className="docs__codeSpace__text">
              space for code and url api
            </span>
            <button className="docs__codeSpace__btn">
              icon for copy to clipboard
            </button>
          </div>
          <p className="docs__article__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias in architecto blanditiis vitae perspiciatis animi doloremque velit temporibus ipsa dignissimos quisquam repellat, laudantium minima sint similique ullam non? Aperiam, eligendi.
          </p>
        </article>
      </ul>
    </div>
  )
}