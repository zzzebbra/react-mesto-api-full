import React from 'react'

function Login(props) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
  }

  return(
    <div className="login">
        <form className="login__form" action="#" name="login_form" onSubmit={handleSubmit} noValidate>
        <h2 className="login__header">Вход</h2>
        <input
          ref={emailRef}
          type="email"
          name="login-email"
          id="login-email"
          className="login__input login__input_email"
          placeholder="Email"
          // minLength="2"
          // maxLength="40"
          required
        />
        <p className="popup__input-error-message" id="name-error"></p>
        <input
          ref={passwordRef}
          type="password"
          name="login-password"
          id="login-password"
          className="login__input login__input_password"
          placeholder="Пароль"
          // minLength="2"
          // maxLength="200"
          required
        />
        <p className="popup__input-error-message" id="description-error"></p>
          <button type="submit" className="login__submit-button">{props.submitButton}</button>
        </form>
    </div>
  )
}

export default Login
