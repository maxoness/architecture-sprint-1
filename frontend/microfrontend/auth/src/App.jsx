import React, { lazy, Suspense, useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

import "./index.css";

function App() {

  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const onCloseAllPopupsEvent = new Event("onCloseAllPopups", {
    composed: true,
  });
  const [email, setEmail] = useState('')

  const onSignOut = useCallback(
    () => {
      setIsLoggedIn(null)
    },
    []
  )

  return (
    <div className="page__content">
      <Switch>
        <Route path="/signup">
          <Register history={history} />
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
