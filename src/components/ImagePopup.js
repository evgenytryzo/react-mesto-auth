import React from 'react'

const ImagePopup = props => {
	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			props.onClose()
		}
	}

	React.useEffect(() => {
		const handleEscKeyClose = e => {
			if (e.key === 'Escape') {
				props.onClose()
			}
		}

		if (props.card) {
			document.addEventListener('keydown', handleEscKeyClose)
		}
		return () => {
			document.removeEventListener('keydown', handleEscKeyClose)
		}
	}, [props.card])

	return (
		<section
			className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}
			onMouseDown={handleOverlayClick}
		>
			<figure className='popup__container popup__container_type_image'>
				<button
					type='button'
					className='popup__close'
					onClick={props.onClose}
				></button>

				<img
					className='popup__image'
					src={`${props.card && props.card.link}`}
					alt={`${props.card && props.card.name}`}
				/>

				<figcaption className='popup__image-name'>{`${
					props.card && props.card.name
				}`}</figcaption>
			</figure>
		</section>
	)
}

export default ImagePopup
