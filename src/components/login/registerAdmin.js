import {ErrorText, StyledInput} from "../commons";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {api, handleError} from "../axios/axios";
import {useLinkClickHandler, useLocation, useNavigate} from "react-router-dom";

export default function RegisterAdminPage() {
    const [errorText, setErrorText] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const registerAdmin = (e) => {
        e.preventDefault()
        console.log(location.pathname)
        const url = location.pathname === "/register-admin" ? "/registerAdmin" : "/register"
        api.post("/registerAdmin",
            {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password
            })
            .then(r => {
                navigate('/users')
            })
            .catch(err => handleError(err, setErrorText))
    }
    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <Form onSubmit={registerAdmin}>

                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type='text'
                    minLength={3}
                    maxLength={30}
                    required={true}
                    placeholder='Введите имя'
                    onChange={e => setFirstName(e.target.value)}
                ></Form.Control>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                    type='text'
                    minLength={3}
                    maxLength={30}
                    required={true}
                    placeholder='Введите фамилию'
                    onChange={e => setLastName(e.target.value)}
                ></Form.Control>

                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type='text'
                    minLength={5}
                    maxLength={30}
                    required={true}
                    placeholder='Введите логин'
                    onChange={e => setUsername(e.target.value)}
                ></Form.Control>

                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type='password'
                    minLength={3}
                    maxLength={30}
                    required={true}
                    placeholder='Введите пароль'
                    onChange={e => setPassword(e.target.value)}
                ></Form.Control>
                <Button type={"submit"}>Зарегистрировать администратора</Button>

            </Form>
        </div>

    )
}