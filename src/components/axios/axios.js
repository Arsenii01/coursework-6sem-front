import axios from "axios"
import Cookies, {set} from "js-cookie"

let auth_token = Cookies.get("_auth")

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (Cookies.get('_auth') ? Cookies.get("_auth") : "")
    }
});

export function handleError(err, setFunc) {
    if (err.message.includes('timeout')) {
        setFunc("Сервер не отвечает")
    }
    else if (err.response.status === 401) {
        setFunc("Ваш токен устарел. Обновите его, снова залогинившись под данным пользователем")
    }
    else if (err.response.status === 403) {
        setFunc("Похоже, у вас недостаточно прав. Авторизуйтесь под другим пользователем")
    } else if (err.response.status === 400) {
        setFunc(err.response.data.message)
    } else {
        setFunc("Произошла непредвиденная ошибка")
    }
}

export const isAdmin = localStorage.getItem("isAdmin")