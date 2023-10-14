import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'

const Card = props => {
	const currentUser = useContext(CurrentUserContext)
	const isOwn = props.card.owner._id === currentUser.id
	const isLiked = props.card.likes.some(i => i._id === currentUser.id)
	const cardLikeButtonClassName = `element__like-button ${
		isLiked && 'element__like-button_active'
	}`

	function handleClick() {
		props.onCardClick(props.card)
	}
	function handleLikeClick() {
		props.onCardLike(props.card)
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card)
	}

	return (
		<>
			{isOwn && (
				<button
					type='button'
					onClick={handleDeleteClick}
					className='element__delete'
				/>
			)}
			<img
				onClick={handleClick}
				src={props.card.link}
				alt={props.card.name}
				className='element__photo'
			/>
			<div className='element__container'>
				<h2 className='element__name'>{props.card.name}</h2>
				<div className='element__like-container'>
					<button
						className={cardLikeButtonClassName}
						type='button'
						onClick={handleLikeClick}
					></button>
					<p className='element__like-count'>{props.card.likes.length}</p>
				</div>
			</div>
		</>
	)
}
export default Card
