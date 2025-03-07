import React from 'react';
import InfoTooltip from "./InfoTooltip";
import "../blocks/auth-form/auth-form.css";
import * as auth from "../utils/auth";

function Register({ history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus("success");
        console.log("register success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.error(err);
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }

  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
  }

  function onSignIn() {
    history.push("/signin");
  }

  return (
    <>
        <div className="auth-form">
          <form className="auth-form__form" onSubmit={handleSubmit}>
            <div className="auth-form__wrapper">
              <h3 className="auth-form__title">Регистрация</h3>
              <label className="auth-form__input">
                <input type="text" name="email" id="email"
                  className="auth-form__textfield" placeholder="Email"
                  onChange={e => setEmail(e.target.value)} required />
              </label>
              <label className="auth-form__input">
                <input type="password" name="password" id="password"
                  className="auth-form__textfield" placeholder="Пароль"
                  onChange={e => setPassword(e.target.value)} required />
              </label>
            </div>
            <div className="auth-form__wrapper">
              <button className="auth-form__button" type="submit">Зарегистрироваться</button>
              <p className="auth-form__text">Уже зарегистрированы? <a className="auth-form__link" href="/">Войти</a></p>
            </div>
          </form>
        </div>
        <InfoTooltip
          onClose={closeAllPopups}
          onCloseAllPopupsEvent={closeAllPopups}
          isOpen={isInfoToolTipOpen}
          status={tooltipStatus}
        />
    </>
  )
}

export default Register;
