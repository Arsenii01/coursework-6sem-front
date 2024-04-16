import Form from "react-bootstrap/Form";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {api, isAdmin} from "../axios/axios";
import ListGroup from "react-bootstrap/ListGroup";
import {StyledLink} from "../commons";
import {Container, ListGroupItem} from "react-bootstrap";

export default function BookSearchPage() {
    const [title, setTitle] = useState("")
    const [foundBooks, setFoundBooks] = useState([])
    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const searchBook = (e) => {
        e.preventDefault()
        api.get(`/books/search?title=${title}`)
            .then(r => {
                console.log(r)
                setFoundBooks([...r.data])
            })
    }

    return (
        <div>
            <Container style={{padding: "15px 0"}}>
                <Form onSubmit={searchBook}>
                    <Form.Group controlId='book_name'>
                        <Form.Control type='text'
                                      required={true}
                                      minLength={2}
                                      onChange={handleChange}
                                      placeholder="Введите название книги"></Form.Control>
                    </Form.Group>
                    <Button style={{margin: "10px 0"}} type={"submit"}>Найти книгу</Button>
                </Form>
            </Container>

            <Container>
                <ListGroup>
                    { foundBooks.length !== 0 ? foundBooks.map(book =>
                        (<ListGroup.Item>
                            <StyledLink to={isAdmin === "true" ? '/books/' + book.id : ""} key={book.id}>{book.id}, {book.name}, {book.author}, {book.year}</StyledLink>
                        </ListGroup.Item> )
                    ) : <p>Книг не найдено</p>
                    }
                </ListGroup>
            </Container>

        </div>
    )
}