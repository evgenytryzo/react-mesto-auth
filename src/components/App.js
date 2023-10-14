import Main from './Main.js'
import React from 'react'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ClosePopup from './ClosePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from './CurrentUserContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.js'
import Login from './Login.js'
import Register from './Register.js'
import InfoTooltip from './InfoTooltip.js'

const App = () => {
	const [currentUser, setCurrentUser] = React.useState(null)
	const [selectedCard, setSelectedCard] = React.useState(null)
	const [currentEmail, setCurrentEmail] = React.useState(null)

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false)

	const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)
	const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)
	const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true)
	const handleCardClick = card => setSelectedCard(card)

	const [cards, setCards] = React.useState([])

	const [isInfoTooltip, setIsInfoTooltip] = React.useState(false)
	const [isValidateInfoTooltip, setIsValidateInfoTooltip] = React.useState(true)
	const handleInfoTooltip = () => setIsInfoTooltip(true)
	const [loggedIn, setLoggedIn] = React.useState(false)
	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setIsInfoTooltip(false)
		setSelectedCard(null)
	}

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const [userInfoRes, cardsInfoRes] = await Promise.all([
					api.getUser(),
					api.getCard(),
				])
				setCurrentUser({
					name: userInfoRes.name,
					about: userInfoRes.about,
					avatar: userInfoRes.avatar,
					id: userInfoRes._id,
				})
				setCards(cardsInfoRes)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	const handleCardLike = async card => {
		const isLiked = card.likes.some(i => i._id === currentUser.id)

		try {
			const newCard = await api.changeLikeCard(card._id, !isLiked)
			setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
		} catch (err) {
			console.error(err)
		}
	}

	const handleCardDelete = async card => {
		try {
			await api.deleteCard(card._id)
			setCards(state => state.filter(c => c._id !== card._id))
		} catch (err) {
			console.error(err)
		}
	}

	const handleAddPlaceSubmit = async ({ name, link }) => {
		try {
			const newCard = await api.createCard({ name, link })
			setCards([newCard, ...cards])
			closeAllPopups()
		} catch (err) {
			console.error(err)
		}
	}

	const handleUpdateUser = async ({ name, about }) => {
		try {
			const updatedUser = await api.updateUser({ name, about })
			setCurrentUser({
				name: updatedUser.name,
				about: updatedUser.about,
				avatar: updatedUser.avatar,
				id: updatedUser._id,
			})
			closeAllPopups()
		} catch (err) {
			console.error(err)
		}
	}

	const handleUpdateAvatar = async ({ avatar }) => {
		try {
			const updatedUser = await api.updateUserAvatar({ avatar })
			setCurrentUser({
				name: updatedUser.name,
				about: updatedUser.about,
				avatar: updatedUser.avatar,
				id: updatedUser._id,
			})
			closeAllPopups()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='page'>
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route
						path='/sign-in'
						element={
							<Login
								onClosePopup={closeAllPopups}
								onLoggedIn={setLoggedIn}
								loggedIn={loggedIn}
								setCurrentEmail={setCurrentEmail}
							/>
						}
					/>
					<Route
						path='/sign-up'
						element={
							<Register
								handleInfo={handleInfoTooltip}
								onClosePopup={closeAllPopups}
								handleTextInfoTooltip={setIsValidateInfoTooltip}
							/>
						}
					/>

					<Route
						path='/'
						element={
							<ProtectedRoute
								currentEmail={currentEmail}
								onLoggedIn={setLoggedIn}
								loggedIn={loggedIn}
								component={Main}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								onCardClick={handleCardClick}
								cards={cards}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDelete}
							/>
						}
					/>
					<Route
						path='*'
						element={
							loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
						}
					/>
				</Routes>

				<InfoTooltip
					onClose={closeAllPopups}
					isOpen={isInfoTooltip}
					isValidateInfoTooltip={isValidateInfoTooltip}
				/>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onUpdateCard={handleAddPlaceSubmit}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateAvatar}
				/>

				<ClosePopup />

				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			</CurrentUserContext.Provider>
		</div>
	)
}

export default App
