import {Container, ErrorText, InnerContainer, InputWrapper, StyledInput} from "../commons";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import {api, handleError} from "../axios/axios";
import {useNavigate} from "react-router-dom";
import {HeadingXXLarge} from "baseui/typography";
import {Button} from "baseui/button";

export default function RegisterPage() {
    const [errorText, setErrorText] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const registerAdmin = (e) => {
        e.preventDefault()
        api.post("/register",
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
        <Container>
            <InnerContainer>
                <ErrorText>{errorText}</ErrorText>
                <Form onSubmit={registerAdmin}>
                    <HeadingXXLarge>Форма регистрации</HeadingXXLarge>
                    <InputWrapper>
                        <StyledInput
                            type='text'
                            minLength={3}
                            maxLength={30}
                            required={true}
                            placeholder='Введите имя'
                            onChange={e => setFirstName(e.target.value)}
                        ></StyledInput>
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInput
                            type='text'
                            minLength={3}
                            maxLength={30}
                            required={true}
                            placeholder='Введите фамилию'
                            onChange={e => setLastName(e.target.value)}
                        ></StyledInput>
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInput
                            type='text'
                            minLength={5}
                            maxLength={30}
                            required={true}
                            placeholder='Введите логин'
                            onChange={e => setUsername(e.target.value)}
                        ></StyledInput>
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInput
                            type='password'
                            minLength={3}
                            maxLength={30}
                            required={true}
                            placeholder='Введите пароль'
                            onChange={e => setPassword(e.target.value)}
                        ></StyledInput>
                    </InputWrapper>
                    <InputWrapper>
                        <Button type={"submit"}>Зарегистрироватьcя</Button>

                    </InputWrapper>

                </Form>
            </InnerContainer>
        </Container>
    )
}