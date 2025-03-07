import React from 'react';
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

import "../blocks/auth-form/auth-form.css";
import "../blocks/popup/popup.css";
import "../blocks/popup/_is-opened/popup_is-opened.css";

function Login({ history, onCloseAllPopupsEvent, setIsLoggedIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  React.useEffect(() => {
    document.addEventListener(onCloseAllPopupsEvent.type, closeAllPopups);
    return () => {
      document.removeEventListener(onCloseAllPopupsEvent.type, closeAllPopups);
    };
  }, []);

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(false);
        setIsLoggedIn(true);
        setEmail(email);
        console.log('onLogin: succ 5')
        history.push("/");
        console.log('onLogin: succ 6')
      })
      .catch((err) => {
        console.error('onLogin: err' + err.message)        
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }

  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
  }

  return (
    <>
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Вход</h3>
            <label className="auth-form__input">
              <input type="text" name="name" id="email"
                className="auth-form__textfield" placeholder="Email"
                onChange={e => setEmail(e.target.value)} required />
            </label>
            <label className="auth-form__input">
              <input type="password" name="password" id="password"
                className="auth-form__textfield" placeholder="Пароль"
                onChange={e => setPassword(e.target.value)} required />
            </label>
          </div>
          <button className="auth-form__button" type="submit">Войти</button>
        </form>
      </div>
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoToolTipOpen}
        status={tooltipStatus}
      />
    </>
  )
}

export default Login;
