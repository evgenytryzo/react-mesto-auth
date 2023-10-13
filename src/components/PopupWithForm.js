import React from "react"
import FormSubmitButton from "./FormSubmitButton"
import registerIcon from '../images/registerIcon.svg'

const PopupWithForm = (props) => {

  const handleOverlayClick = (e) => {
    if ( e.target === e.currentTarget ) {
      props.onClose()
    }
  }
  React.useEffect(() => {
    const handleEscKeyClose = (e) => {
      if ( e.key === "Escape" ) {
        props.onClose()
      }
    }

    if ( props.isOpen ) {
      document.addEventListener("keydown", handleEscKeyClose)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKeyClose)
    }
  }, [ props.isOpen ])



  return (
		<div
			onMouseDown={handleOverlayClick}
			className={`popup popup_type_${props.name} ${
				props.isOpen ? 'popup_opened' : ''
			}`}
		>
			<div className={`popup__container popup__container_type_${props.name}`}>
				<button
					type='button'
					className='popup__close'
					onClick={props.onClose}
				/>

				{props.icon && <img src={props.icon} alt='props.title'></img>}

				<h2 className='popup__name'>{props.title}</h2>

				{!props.icon && (
					<form
						className={`popup__form popup__form_${props.name}`}
						name={`${props.name}-form`}
						onSubmit={props.onSubmit}
					>
						{props.children}
						<FormSubmitButton buttonText={props.buttonText} />
					</form>
				)}
			</div>
		</div>
	)
}

export default PopupWithForm
