import PopupWithForm from "./PopupWithForm"
import FormSubmitButton from "./FormSubmitButton"

export const ClosePopup = () => {
  return (
    <PopupWithForm text="Вы уверены?" name="delete">
      buttonText={"Да"}
    </PopupWithForm>
  )
}

export default ClosePopup
