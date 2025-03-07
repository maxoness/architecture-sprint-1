import React from 'react'
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

// Проверка токена авторизации
function CheckToken({ onCheckTokenSucceess, onCheckTokenFailed }) {
    const history = useHistory()

    React.useEffect(() => {
        console.debug('AuthCheck: started')

        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    console.debug('CheckToken: успех')

                    onCheckTokenSucceess(res.data.email)
                    history.push("/");
                })
                .catch((err) => {
                    console.debug('CheckToken: ошибка')

                    localStorage.removeItem("jwt");
                    onCheckTokenFailed()
                    history.push("/signin");
                    console.log(err);
                });
        } else {
            console.debug('CheckToken: токен пустой')

            onCheckTokenFailed()
            history.push("/signin");
        }
    }, [history, onCheckTokenSucceess, onCheckTokenFailed]);

    return <></>
}

export default CheckToken;