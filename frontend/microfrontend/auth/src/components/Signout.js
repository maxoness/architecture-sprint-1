import React, { useCallback, useEffect } from 'react'

function Signout ({history, activate, onSignout}){
  const signout = useCallback(
    () => {
      localStorage.removeItem("jwt");

      if (onSignout) onSignout()
      history.push("/signin");
    },
    [history, onSignout]
  )

  useEffect(
    () => {
      if (!activate) return

      console.log('Singout: signout')

      signout()
    },
    [activate, signout]
  )

  return <></>
}

export default Signout;
