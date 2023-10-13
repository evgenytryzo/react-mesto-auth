import logo from "../images/mesto-logo.svg"
import { Link } from "react-router-dom"

const Header = (props) => {

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={ logo } alt="Логотип 'Место'"/>
        {props.link && <Link className="header__button" to={props.link}>{props.text}</Link>}
      </div>
      <div className="header__line"></div>
    </header>
  )
}

export default Header
