import {handleError} from "../axios/axios";
import {useState} from "react";
import {ErrorText} from "../commons";

export default function ErrorMsg({err}) {
    const [errorText, setErrorText] = useState("")

        if (err.message.includes('timeout')) {
            setErrorText("Произошла ошибка или сервер не отвечает")
        }
        else if (err.response.status === 401) {
            setErrorText("Ваш токен устарел. Обновите его, снова залогинившись под данным пользователем")
        }
        else if (err.response.status === 403) {
            setErrorText("Похоже, у вас недостаточно прав. Авторизуйтесь под другим пользователем")
        } else {
            setErrorText(err)}
    return (
        <ErrorText>{errorText}</ErrorText>
    )
}