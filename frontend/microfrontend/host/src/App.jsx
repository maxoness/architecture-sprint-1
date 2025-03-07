import React, { lazy, Suspense, useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
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

  const Login = lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
  );

  const Register = lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
  );

  return (

    <div className="page__content">

      <Header email={email} onSignOut={onSignOut} />
      <Suspense fallback='fail'>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            onCloseAllPopupsEvent={onCloseAllPopupsEvent}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <Route path="/signup">
            <Register history={history} />
          </Route>
          <Route path="/signin">
            <Login history={history}
              setIsLoggedIn={setIsLoggedIn}
              onCloseAllPopupsEvent={onCloseAllPopupsEvent} />
          </Route>
        </Switch>
      </Suspense>
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