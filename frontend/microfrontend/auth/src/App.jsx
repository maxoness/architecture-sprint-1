import React, { lazy, Suspense, useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const onCloseAllPopupsEvent = new Event("onCloseAllPopups", {
    composed: true,
  });
  const history = useHistory();
  const [email, setEmail] = useState('')

  const onSignOut = useCallback(
    () => {
      setIsLoggedIn(null)
    },
    []
  )

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />

      <div className="container">
        <div>Name: auth</div>
        <div>Framework: react</div>
        <div>Language: JavaScript</div>
        <div>CSS: Empty CSS</div>
      </div>

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={isLoggedIn}
          onCloseAllPopupsEvent={onCloseAllPopupsEvent}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <Route path="/signup">
          <Register onRegister={history} />
        </Route>
        <Route path="/signin">
          <Suspense fallback={<div>Loading...</div>}>
            <Login history={history}
              setIsLoggedIn={setIsLoggedIn}
              onCloseAllPopupsEvent={onCloseAllPopupsEvent} />
          </Suspense>
        </Route>
      </Switch>

    </div>
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
