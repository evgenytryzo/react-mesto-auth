import PopupWithForm from './PopupWithForm'

export const ClosePopup = () => {
	return (
		<PopupWithForm text='Вы уверены?' name='delete'>
			buttonText={'Да'}
		</PopupWithForm>
	)
}

export default ClosePopup
