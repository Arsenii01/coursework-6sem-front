import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {api, handleError} from "../axios/axios";
import {Card} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {StyledLink} from "../commons";
import Button from "react-bootstrap/Button";


export function ReaderPage() {
    const [reader, setReader] = useState("")
    const [books, setBooks] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        api.get(`/readers/${id}`)
            .then(r => {
                console.log(r.data)
                setReader(r.data)
                setBooks([...r.data.books])
            }).catch(err => handleError(err, ))
    }, [id, setReader]);

    const deleteReader = () => {
        api.delete(`/readers/${reader.id}`)
            .then(r => {
                navigate("/readers")
            })
    }

    return (
        <div>
            <Card body>
                Имя читателя: {reader.fullName} <br/>
                Эл.почта: {reader.email} <br/>
                Год рождения: {reader.birthYear}
            </Card>
            <h4>Взятые читателем книги:</h4>
            {books.length !== 0 ?
                (
                    <ListGroup>
                        {reader.books.map(book => (
                            <ListGroup.Item variant="light" key={book.id}>
                                <Link to={"/books/" + book.id}
                                      style={{color: book.expired ? "red" : ""}}> {book.name}, {book.author}, {book.year}</Link>
                            </ListGroup.Item>))}
                    </ListGroup>
                ) : <p>Читатель не брал книг</p>
            }
            { localStorage.getItem("isAdmin") === "true" ?
                (
                    <div>
                        <StyledLink to={`/readers/${reader.id}/edit`}>Изменить читателя</StyledLink>
                        <Button onClick={deleteReader}>Удалить читателя</Button>
                    </div>
                ) : ""

            }


        </div>

    )
}