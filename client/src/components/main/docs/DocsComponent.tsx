import { LinkSpace } from "./components/LinkSpace"
import { ParragraphComponent } from "./components/ParragraphComponent"
import "./styles/DocsStyles.css"

export const DocsComponent = () => {
  return (
    <div className="docs">
      <h1>
        API documentation
      </h1>
      <div className="docs__list__bg">
        <ul>
          <li>
            <h2>
              REST
            </h2>
            <LinkSpace>
              https://www.leojanidem.com/
              {/* <div>
                <span>
                  <span>
                    h
                  </span>
                </span>
              </div> */}
            </LinkSpace>
            <ParragraphComponent>
              The base url contains information about all
              available API's resources. All requests are
              **GET** requests and go over **https**. All responses will 
              return data in **json**.
            </ParragraphComponent>
          </li>
        </ul>
      </div>
    </div>
  )
}

