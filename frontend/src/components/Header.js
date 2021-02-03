import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo_mesto.svg';

function Header(props) {
  if (props.loggedIn) {
    return (
      <div className="header">
        <img className="logo" src={logo} alt="Логотип" />
        <div className="header__text-wrapper">
          <p className="header__user">{props.email}</p>
          <Link to={props.link} onClick={props.onLogout} className="header__logout">
            {' '}
            <p className="header__text">{props.text}</p>
            {' '}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <Link to={props.link} className="header__register"><p className="header__text">{props.text}</p></Link>
    </div>
  );
}

export default Header;
