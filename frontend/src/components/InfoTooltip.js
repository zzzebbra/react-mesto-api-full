import React from 'react';
import success from '../images/done.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  if (props.operationStatus) {
    return (
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="info-tooltip">
          <button type="button" onClick={props.onClose} className={`popup__close-button ${props.closeButtonClassName}`} />
          <img className="info-tooltip__img" src={success} alt="Вы успешно зарегистрировались!" />
          <p className="info-tooltip__text">Вы успешно зарегистрировались!</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="info-tooltip">
        <button type="button" onClick={props.onClose} className={`popup__close-button ${props.closeButtonClassName}`} />
        <img className="info-tooltip__img" src={error} alt="Что-то пошло не так! Попробуйте ещё раз." />
        <p className="info-tooltip__text">Что-то пошло не так! Попробуйте ещё раз.</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
