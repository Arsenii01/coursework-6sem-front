import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {api, handleError} from "../axios/axios";
import Cookies, {set} from "js-cookie";
import {ErrorText, StyledLink} from "../commons";
import {Card, Container} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
function BookPage() {
    const [book, setBook] = useState("")
    const [owner, setOwner] = useState("")
    const [readers, setReaders] = useState([])
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()


    const {id} = useParams()
    useEffect(() => {
        api.get("/books/" + id)
            .then(response => {
                setBook(response.data.book)
                setOwner(response.data.owner)
                console.log(response.data.book)
                if (response.data.readers != null) setReaders([...response.data.readers])
        }).catch(err => {
            handleError(err, setErrorText)
        })
    }, [id]);

    const [selectedReader, setSelectedReader] = useState(null)

    const releaseBook = () => {
        api.post(`/books/${book.id}/release`, {}
        ).then(r => {
            window.location.reload()
        })
    }

    const handleChange = (e) => {
        setSelectedReader(e.target.value)
        console.log(selectedReader)
    }
    const setSelectedBook = (e) => {
        e.preventDefault()
        console.log(selectedReader)
        api.post(`/books/${book.id}/set`, {"id": selectedReader}
        ).then(r => {
            window.location.reload()

        })

    }

    const deleteBook = () => {
        api.delete(`/books/${book.id}`,
            )
            .then(r => {
                navigate("/books")
            })
    }

    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <Card body>
                Серийный номер: {book.id}<br/>
                Название книги: {book.name}<br/>
                Автор: {book.author}<br/>
                Год написания: {book.year}
            </Card>
            {owner ?
                (
                    <Card body>
                        <p>Книгу взял: <Link to={`/readers/${owner.id}`}>{owner.name}</Link></p>
                        <p style={{color: book.expired ? "red" : ""} }>Дата взятия: {new Date(book.takenAt).toLocaleString()}</p>
                        <Button onClick={releaseBook}>Освободить книгу</Button>
                    </Card>
                ) :
                (
                    <Card body>
                        <p>Книга в данный момент свободна.</p>
                        <p>Выберите человека:</p>
                        <Form onSubmit={setSelectedBook}>
                            <Form.Select onChange={handleChange}>
                                <option value={0}>Выберите читателя</option>
                                {readers.map(r =>
                                    <option key={r.id} value={r.id}>{r.name}, {r.email}</option>
                                )
                                }
                            </Form.Select>
                            <Button style={{margin: "10px 0"}} type={"submit"}>Назначить книгу</Button>
                        </Form>
                    </Card>
                )
            }
            <div style={{margin: "10px", padding: "0px 0px", display: "flex"}}>
                <StyledLink to={`/books/${book.id}/edit`}>Изменить книгу</StyledLink>
                <Button onClick={deleteBook}>Удалить книгу</Button>
            </div>
        </div>

    )
}

export default BookPage