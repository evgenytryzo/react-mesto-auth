import PopupWithForm from "./PopupWithForm"
import FormInput from "./FormInput"
import FormSubmitButton from "./FormSubmitButton"
import { useEffect, useState } from "react"

const AddPlacePopup = (props) => {

  const [ name, setName ] = useState("")
  const [ link, setLink ] = useState("")

  useEffect(() => {
    setName("")
    setLink("")
  }, [ props.isOpen ])

  const handleNameChange = (name) => {
    setName(name)
  }

  const handleLinkChange = (link) => {
    setLink(link)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onUpdateCard({ name, link })
  }

  return (
    <PopupWithForm
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      buttonText={ "Создать" }
      title="Новое место"
      name="add"
      onSubmit={ handleSubmit }
    >
      <FormInput
        placeholder="Название"
        required="required"
        type="text"
        name="card-name"
        minLength="2"
        maxLength="30"
        onChange={ handleNameChange }
        value={ name }
      />
      <FormInput
        placeholder="Ссылка на картинку"
        required="required"
        type="url"
        name="card-url"
        onChange={ handleLinkChange }
        value={ link }
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup
