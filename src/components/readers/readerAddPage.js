import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {api, handleError} from "../axios/axios";
import {ErrorText} from "../commons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ReaderAddPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [birthYear, setBirthYear] = useState(1900)
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()
    const addReader = (e) => {
        e.preventDefault()
        api.post(
            "/readers",
            {
                "fullName": name,
                "email": email,
                "birthYear": birthYear
            }
        ).then(r =>
                navigate("/readers")
        ).catch(err => handleError(err, setErrorText))
    }

    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <Form onSubmit={addReader}>
                <Form.Group controlId='reader_name'>
                    <Form.Label>Имя, фамилия читателя</Form.Label>
                    <Form.Control
                        type='text'
                        minLength={2}
                        maxLength={30}
                        required={true}
                        placeholder='Введите имя'
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='reader_email'>
                    <Form.Label>Электронная почта читателя</Form.Label>
                    <Form.Control
                        type='email'
                        required={true}
                        placeholder='Введите адрес эл.почты'
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='reader_year'>
                    <Form.Label>Год рождения читателя</Form.Label>
                    <Form.Control
                        type='number'
                        min='1900'
                        defaultValue='1900'
                        placeholder='Введите год рождения'
                        onChange={e => setBirthYear(e.target.value)}>
                    </Form.Control>
                    <Button type={"submit"}>Добавить читателя</Button>
                </Form.Group>
            </Form>
        </div>
    )
}