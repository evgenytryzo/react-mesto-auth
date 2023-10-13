import PopupWithForm from "./PopupWithForm"
import FormInput from "./FormInput"
import { CurrentUserContext } from "./CurrentUserContext"
import { useContext, useEffect, useState } from "react"

const EditProfilePopup = (props) => {

  const currentUser = useContext(CurrentUserContext)

  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")

  useEffect(() => {
    if ( currentUser ) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }
  }, [ currentUser, props.isOpen ])

  const handleNameChange = (name) => {
    setName(name)
  }

  const handleAboutChange = (description) => {
    setDescription(description)
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    console.log(name, description)
    props.onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      title="Редактировать профиль"
      name="edit"
      buttonText={ "Сохранить" }
      onSubmit={ handleSubmit }
    >
      <FormInput
        placeholder="Имя"
        required="required"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        onChange={ handleNameChange }
        value={ name }
      />
      <FormInput
        placeholder="Занятие"
        required="required"
        type="text"
        name="about"
        minLength="2"
        maxLength="200"
        onChange={ handleAboutChange }
        value={ description }
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup
