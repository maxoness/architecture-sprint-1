import React, { lazy, Suspense, useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./utils/api";
import * as auth from "./utils/auth";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  
  const onCloseAllPopupsEvent = new Event("onCloseAllPopups", {
    composed: true,
  });
  const history = useHistory();
  const [email, setEmail] = useState('')

  const onSignOut = useCallback(
    () => {
      localStorage.removeItem("jwt");
      setIsLoggedIn(null);
      setCards(null);
      setCurrentUser(null);
      console.log("Bye!")
      history.push("/signin");
    },
    []
  )

  const Login = lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
  );

  const Register = lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
  );

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*
  // Запрос к API за информацией о пользователе выполняется единожды, при монтировании.
  React.useEffect(() => {
    console.log("-- Host App.jsx: useEffect2.isLoggedIn: " + isLoggedIn);
    console.log("-- Host App.jsx: useEffect2.currentUser: : " + currentUser + currentUser.name);
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        sleep(1000).then(() => {
          console.log("-- Host App.jsx: useEffect2.isLoggedIn after getUserInfo: " + isLoggedIn);
          console.log("-- Host App.jsx: useEffect2.currentUser after getUserInfo: " + currentUser + currentUser.name);
          console.log(currentUser);
          console.log(userData);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  */

  return (
    <>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Suspense fallback='fail'>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              isLoggedIn={isLoggedIn}
              onCloseAllPopupsEvent={onCloseAllPopupsEvent}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
            <Route path="/signup">
              <Register history={history} />
            </Route>
            <Route path="/signin">
              <Login
                history={history}
                setIsLoggedIn={setIsLoggedIn}
                onCloseAllPopupsEvent={onCloseAllPopupsEvent} />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

const AppWrapper = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(<AppWrapper />, document.getElementById("app"));