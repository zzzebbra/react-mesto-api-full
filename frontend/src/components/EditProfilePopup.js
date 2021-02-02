import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      submitButton="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input__profile_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        required
      />
      <p className="popup__input-error-message" id="name-error" />
      <input
        type="text"
        name="description"
        id="description"
        className="popup__input  popup__input_description"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
        required
      />
      <p className="popup__input-error-message" id="description-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
