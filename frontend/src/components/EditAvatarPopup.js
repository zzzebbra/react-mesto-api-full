import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
  <PopupWithForm
    name = 'userpic'
    title = 'Обновить аватар'
    isOpen = {props.isOpen}
    submitButton = 'Сохранить'
    onClose = {props.onClose}
    onSubmit = {handleSubmit}>
      <input ref={inputRef}
        type="url"
        name="userpic-url"
        id="userpic-url"
        className="popup__input popup__input_url"
        placeholder="Ссылка на картинку"
        required
      />
    <p className="popup__input-error-message" id="userpic-url-error"></p>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;
