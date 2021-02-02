import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_${props.name}`}>
        <h2 className="popup__header">{props.title}</h2>
        <form className="popup__form" action="#" name="popup_form" onSubmit={props.onSubmit} noValidate>
          <button type="button" onClick={props.onClose} className={`popup__close-button ${props.closeButtonClassName}`} />
          {props.children}
          <button type="submit" className={`popup__submit-button ${props.deleteButtonClassName}`}>{props.submitButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
