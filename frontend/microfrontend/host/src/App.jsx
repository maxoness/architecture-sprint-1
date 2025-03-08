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

  const Login = lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
  );

  const Register = lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
  );

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
          setIsLoggedIn(null);
          setCards(null);
          setCurrentUser(null)
          console.log(err);
        });
    }
  }, [history]);

  // Запрос к API за информацией о пользователе выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

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