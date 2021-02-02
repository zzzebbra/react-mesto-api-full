import React from 'react';

function Register(props) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
  }

  return (
    <div className="register">
      <form className="register__form" name="register_form" onSubmit={handleSubmit} noValidate>
        <h2 className="register__header">Регистрация</h2>
        <input
          ref={emailRef}
          type="email"
          name="register-email"
          id="register-email"
          className="register__input register__input_email"
          placeholder="Email"
          // minLength="2"
          // maxLength="40"
          required
        />
        <p className="popup__input-error-message" id="name-error" />
        <input
          ref={passwordRef}
          type="password"
          name="register-password"
          id="register-password"
          className="register__input register__input_password"
          placeholder="Пароль"
          // minLength="2"
          // maxLength="200"
          required
        />
        <p className="popup__input-error-message" id="description-error" />
        <button type="submit" className="register__submit-button">{props.submitButton}</button>
        <a className="register__form-link" id="register__form-link" href="sign-in"><p>Уже зарегистрированы? Войти</p></a>
      </form>
    </div>
  );
}

export default Register;
