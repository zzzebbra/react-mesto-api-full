import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${isLiked ? 'card__like card__like_active' : 'card__like'}`;

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="card">
      <img onClick={handleClick} src={props.link} className="card__photo" alt={props.name} />
      <button onClick={handleCardDelete} className={cardDeleteButtonClassName} />
      <h2 className="card__text">{props.name}</h2>
      <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
      <p className="card__like-counter">{props.likes}</p>
    </div>
  );
}
export default Card;
