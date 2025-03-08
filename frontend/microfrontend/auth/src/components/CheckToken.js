import React from 'react'
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

// Проверка токена авторизации
function CheckToken({ onCheckTokenSucceess, onCheckTokenFailed }) {
    const history = useHistory()

    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    onCheckTokenSucceess(res.data.email)
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    onCheckTokenFailed()
                    history.push("/signin");
                });
        } else {
            onCheckTokenFailed()
            history.push("/signin");
        }
    }, [history, onCheckTokenSucceess, onCheckTokenFailed]);

    return <></>
}

export default CheckToken;