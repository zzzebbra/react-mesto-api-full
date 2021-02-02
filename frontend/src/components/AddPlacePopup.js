import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState(''); // я использовала value={name || ''} и подобные этой конструкции по совету наставника,
  // чтобы избавиться от Warning'а "A component is changing a controlled input to be uncontrolled", который появляется в консоли при пустом значении инпута.
  // Буду рада узнать о более совершенном способе!
  const [link, setLink] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={props.isOpen}
      submitButton="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="place-name"
        id="place-name"
        className="popup__input popup__input_place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        required
      />
      <p className="popup__input-error-message" id="place-name-error" />
      <input
        type="url"
        name="place-url"
        id="place-url"
        className="popup__input popup__input_url"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={(evt) => setLink(evt.target.value)}
        required
      />
      <p className="popup__input-error-message" id="place-url-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
