import PopupWithForm from './PopupWithForm'
import FormInput from './FormInput'
import { useEffect, useRef } from 'react'

const EditAvatarPopup = props => {
	const avatarRef = useRef()

	useEffect(() => {
		avatarRef.current.value = ''
	}, [props.isOpen])

	const handleSubmit = e => {
		e.preventDefault()
		props.onUpdateUser({
			avatar: avatarRef.current.value,
		})
	}
	return (
		<PopupWithForm
			isOpen={props.isOpen}
			onClose={props.onClose}
			title='Обновить аватар'
			name='avatar'
			buttonText={'Сохранить'}
			onSubmit={handleSubmit}
		>
			<FormInput
				type='url'
				name='avatar'
				placeholder='Ссылка на картинку'
				required='required'
				ref={avatarRef}
				onChange={() => {}}
			/>
		</PopupWithForm>
	)
}

export default EditAvatarPopup
