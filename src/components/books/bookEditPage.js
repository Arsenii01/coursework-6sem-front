import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api, handleError} from "../axios/axios";
import Cookies from "js-cookie";
import {ErrorText} from "../commons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function BookEditPage({title, authorName, bookYear}) {
    const [name, setName] = useState(title)
    const [author, setAuthor] = useState(authorName)
    const [year, setYear] = useState(bookYear)
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()

    const {id} = useParams()
    useEffect(() => {
        api.get("/books/" + id)
            .then(response => {
                const book = response.data.book
                setName(book.name)
                setAuthor(book.author)
                setYear(book.year)
            }).catch(err => {
            handleError(err, setErrorText)
        })
    }, [id]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };
    const handleYearChange = (e) => {
        if (e.target.value) setYear(e.target.value);
    };

    const editBook = (e) => {
        e.preventDefault()
        api.patch(`/books/${id}`,
            {
                "name": name,
                "author": author,
                "year": year
            })
            .then(r => {
                navigate(`/books/${id}`)
            }
        ).catch(err => {
            handleError(err, setErrorText)
        })
    }
    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <Form onSubmit={editBook}>
                <Form.Group controlId="book_name">
                    <Form.Label>Название книги</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleNameChange}
                        required={true}
                        defaultValue={name}></Form.Control>
                </Form.Group>
                <Form.Group controlId="book_author">
                    <Form.Label>Автор книги</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleAuthorChange}
                        required={true}
                        defaultValue={author}></Form.Control>
                </Form.Group>
                <Form.Group controlId="book_year">
                    <Form.Label>Год написания</Form.Label>
                    <Form.Control type="number"
                                  min='1000'
                                  defaultValue={year}
                                  required={true}
                                  placeholder="Введите год написания книги"
                                  onChange={handleYearChange}></Form.Control>
                </Form.Group>
                <Button type={"submit"}>Изменить книгу</Button>
            </Form>
        </div>

    )
}
