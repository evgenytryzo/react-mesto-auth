import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react"
import Auth from "./Auth"
import { Navigate } from "react-router-dom"
const Login = (props) => {
const [formValue, setFormValue] = useState({
			email: '',
			password: '',
		})
		const endpointRegister = '/signin'

		const handleChange = e => {
					const { name, value } = e.target
					setFormValue({
						...formValue,
						[name]: value,
					})
				}


				useEffect(() => {
					const token = localStorage.getItem("token")
					
					if (token) {checkValidityUser(token).then((res) => {
						if (res) {
							props.onLoggedIn(true)
							Navigate('/', { replace: true })
						}
					})

					}
				}, [])

const checkValidityUser = token => {
	const BASE_URL = 'https://auth.nomoreparties.co'
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(res => res.json())
		.then(data => props.setCurrentEmail({ email: data.data.email }))
		.then(props.onLoggedIn(true))
		.then(localStorage.setItem('token', token))
		.catch(error => {
			console.error(`Ошибка: ${error.message}`)
			console.error(`Status: ${error.status}`)
			console.error(error)
		})
}
	

const handleSubmit = e => {
	e.preventDefault()
	const { password, email } = formValue
	console.log(JSON.stringify({ password, email, endpointRegister }))
	Auth(password, email, endpointRegister)
		.then(data => checkValidityUser(data.token))
		.catch(error => {
			console.error(`Ошибка: ${error.message}`)
			console.error(`Status: ${error.status}`)
			console.error(error)
		})
}

	return (
		<>
			{props.loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}
			<section className='login-container'>
				<Header link='/sign-up' text='Регистрация' />
				<div className='login'>
					<h1 className='login__welcome'>Вход</h1>
					<form className='login__form' onSubmit={handleSubmit}>
						<input
							className='login__input'
							id='email'
							required
							name='email'
							type='text'
							value={formValue.email}
							onChange={handleChange}
							placeholder='email'
						/>
						<input
							placeholder='Пароль'
							className='login__input'
							id='password'
							required
							name='password'
							type='text'
							value={formValue.password}
							onChange={handleChange}
						/>
						<button type='submit' className='login__button'>
							Войти
						</button>
					</form>
				</div>
				<Footer />
			</section>
		</>
	)
}
export default Login