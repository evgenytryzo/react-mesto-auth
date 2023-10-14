import logo from '../images/mesto-logo.svg'
import { Link, useNavigate } from 'react-router-dom'

const Header = props => {
	const navigate = useNavigate()

	const test = () => {
		if (props.loggedIn) {
			props.onLoggedIn(false)
			localStorage.removeItem('token')
			navigate(props.link)
		}
	}

	return (
		<header className='header'>
			<div className='header__container'>
				<img className='header__logo' src={logo} alt="Логотип 'Место'" />
				<div className='header__info'>
					{props.currentEmail && props.currentEmail.email && (
						<p className='header__email'>{props.currentEmail.email}</p>
					)}
					{props.link && (
						<Link className='header__button' to={props.link} onClick={test}>
							{props.text}
						</Link>
					)}
				</div>
			</div>
			<div className='header__line'></div>
		</header>
	)
}

export default Header
