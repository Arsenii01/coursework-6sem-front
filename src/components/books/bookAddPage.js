import {useEffect, useState} from "react";
import {api, handleError} from "../axios/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ErrorText} from "../commons";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function BookAddPage() {
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState(1000)
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };
    const handleYearChange = (e) => {
        if (e.target.value) setYear(e.target.value);
    };

    const addBook = (e) => {
        e.preventDefault()
        api.post("/books",
            {
                "name": name,
                "author": author,
                "year": year
            }
            ).then(r => {
                navigate("/books")
        }
        ).catch(err => {
            handleError(err, setErrorText)
        })
    }
    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <Form onSubmit={addBook}>
                <Form.Group controlId="book_name">
                    <Form.Label>Название книги</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите название книги"
                        required={true}
                        onChange={handleNameChange} ></Form.Control>
                </Form.Group>
                <Form.Group controlId="book_author">
                    <Form.Label>Автор книги</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите автора книги"
                        required={true}
                        onChange={handleAuthorChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="book_year">
                    <Form.Label>Год написания</Form.Label>
                    <Form.Control type="number"
                                  min='1000'
                                  required={true}
                                  defaultValue='1000'
                                  placeholder="Введите год написания книги"
                    onChange={handleYearChange}></Form.Control>
                </Form.Group>
                <Button type={"submit"}>Создать книгу</Button>
            </Form>
        </div>

    )
}