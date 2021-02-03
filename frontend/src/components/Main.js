import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import editProfilePhoto from '../images/edit_profile-pic.svg';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo-container">
          <img className="profile__photo" src={currentUser.avatar} alt="Аватар" />
          <img className="profile__photo-edit-button" src={editProfilePhoto} alt="Редактировать." onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" onClick={props.onEditProfile} type="button" />
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section className="cards">
        {props.cards.map((item) => (<Card card={item} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} key={item._id} link={item.link} name={item.name} likes={item.likes.length} />))}
      </section>
    </main>
  );
}

export default Main;
