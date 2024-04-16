import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api, handleError} from "../axios/axios";
import {ErrorText} from "../commons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ReaderEditPage({fullName, emailOld, year}) {
    const [name, setName] = useState(fullName)
    const [email, setEmail] = useState(emailOld)
    const [birthYear, setBirthYear] = useState(year)
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        api.get("/readers/" + id)
            .then(response => {
                console.log(response.data)
                const reader = response.data
                setName(reader.fullName)
                setEmail(reader.email)
                setBirthYear(reader.birthYear)
            }).catch(err => {
            handleError(err, setErrorText)
        })
    }, [id]);
    const editReader = (e) => {
        e.preventDefault()
        api.patch(
            `/readers/${id}`,
            {
                "fullName": name,
                "email": email,
                "birthYear": birthYear
            }
        ).then(r =>
            navigate(`/readers/${id}`)
        ).catch(err => handleError(err, setErrorText))
    }

    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <Form onSubmit={editReader}>
                <Form.Group controlId='reader_name'>
                    <Form.Label>Имя, фамилия читателя</Form.Label>
                    <Form.Control
                        type='text'
                        minLength={2}
                        maxLength={30}
                        required={true}
                        placeholder='Введите имя'
                        defaultValue={name}
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='reader_email'>
                    <Form.Label>Электронная почта читателя</Form.Label>
                    <Form.Control
                        type='email'
                        required={true}
                        placeholder='Введите адрес эл.почты'
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='reader_year'>
                    <Form.Label>Год рождения читателя</Form.Label>
                    <Form.Control
                        type='number'
                        min='1900'
                        defaultValue={birthYear}
                        placeholder='Введите год рождения'
                        onChange={e => setBirthYear(e.target.value)}>
                    </Form.Control>
                    <Button type={"submit"}>Изменить читателя</Button>
                </Form.Group>
            </Form>
        </div>
    )
}