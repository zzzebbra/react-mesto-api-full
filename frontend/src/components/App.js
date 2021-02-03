import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setPopupProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setPopupPlaceState] = React.useState(false);
  const [isEditAvatarPopupOpen, setPopupAvatarState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedUser, setLoggedUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [operationStatus, setOperationStatus] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      api.getUserData(localStorage.getItem('token')).then((res) => onAuth(res));
      api.getUserData(localStorage.getItem('token'))
        .then((res) => {
          setCurrentUser(res.data);
        })
        .then(() => api.getCards(localStorage.getItem('token'))
          .then((res) => {
            setCards(res.data);
          }));
    }
    api.getCards(localStorage.getItem('token'))
      .then((res) => {
        setCards(res.data);
      });
  }, [isLoggedIn]);

  function openInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function register({ password, email }) {
    api.signup(password, email)
      .then((res) => { if (res.data) { setOperationStatus(true); openInfoTooltip(); } else { setOperationStatus(false); openInfoTooltip(); } })
      .catch((err) => { setOperationStatus(false); openInfoTooltip(); });
  }

  function onAuth(res) {
    setIsLoggedIn(true);
    setLoggedUser({ email: res.data.email, _id: res.data._id });
    history.push('/');
  }

  function login({ password, email }) {
    api.login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.token);
        api.getUserData(res.token)
          .then((res) => { onAuth(res); });
      })
      .catch((err) => { setOperationStatus(false); openInfoTooltip(); });
  }

  function onLogout() {
    setIsLoggedIn(false);
    setLoggedUser({});
    localStorage.removeItem('token');
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(localStorage.getItem('token'), card._id, isLiked)

      .then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        // Обновляем стейт
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    api.deleteMyCard(localStorage.getItem('token'), card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id !== newCard.data._id);
        setCards(newCards);
      });
  }

  function closeAllPopups() {
    setPopupProfileState(false);
    setPopupPlaceState(false);
    setPopupAvatarState(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setPopupProfileState(true);
  }

  function handleAddPlaceClick() {
    setPopupPlaceState(true);
  }

  function handleEditAvatarClick() {
    setPopupAvatarState(true);
  }

  function handleUpdateUser(props) {
    api.setUserInfo(localStorage.getItem('token'), props.name, props.description)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(props) {
    api.updateAvatar(localStorage.getItem('token'), props.avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(props) {
    api.addNewCard(localStorage.getItem('token'), props.name, props.link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      });
  }

  function handleLoggedIn() {
    setIsLoggedIn(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path="/">
          <Header
            loggedIn={isLoggedIn}
            link="/sign-in"
            email={loggedUser.email}
            onLogout={onLogout}
            text="Выйти"
          />
        </Route>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path="/sign-in">
            <Header
              loggedIn={isLoggedIn}
              link="/sign-up"
              email=""
              text="Регистрация"
            />
            <Login submitButton="Войти" onSubmit={login} handleLogin={handleLoggedIn} />
          </Route>
          <Route path="/sign-up">
            <Header
              loggedIn={isLoggedIn}
              link="/sign-in"
              email=""
              text="Войти"
            />
            <Register submitButton="Зарегистрироваться" onSubmit={register} handleLogin={handleLoggedIn} />
          </Route>
        </Switch>
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          closeButtonClassName="popup__close-button_delete"
          deleteButtonClassName="popup__submit-button_delete"
          submitButton="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          image=""
          text=""
          isOpen={isInfoTooltipPopupOpen}
          operationStatus={operationStatus}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
