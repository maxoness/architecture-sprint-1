import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  console.log("ProtectedRoute: " + props.isLoggedIn);
  console.log(props);
  return (
    <Route exact>
      {
        () => props.isLoggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
  )
}

export default ProtectedRoute;