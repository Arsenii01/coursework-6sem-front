import {Link} from "react-router-dom";
import {ErrorText, StyledLink} from "../commons";
import {useEffect, useState} from "react";
import {api, handleError, isAdmin} from "../axios/axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function BooksPage(props) {
    const [books, setBooks] = useState([])
    const [booksCount, setBooksCount] = useState(0)
    const [page, setPage] = useState(0)
    const [isSort, setIsSort] = useState(false)
    const [loadingText, setLoading] = useState("Loading...")
    const [errorText, setErrorText] = useState("")

    const getBooks = () => {
        const paginationUrl = `books_per_page=${booksCount}&page=${page - 1}`
        const url =
            "/books?" + (isSort === true && booksCount >= 1 && page >= 1 ?
                `sort_by_name=true&${paginationUrl}`
                : (isSort === true && (booksCount < 1 || page < 1)) ?
            "sort_by_name=true" : (booksCount >= 1 && page >= 1 ? paginationUrl : ""))
        console.log(booksCount)
        console.log(page)
        console.log(url)
        api.get(
            url
        ).then( (response) => {
            if (response.data.length == 0) setLoading("Книги не найдены")
            setBooks([...response.data])
        }).catch(err => {
            handleError(err, setErrorText)
        })
    }

    useEffect(() => {
        getBooks()
    }, [setBooks]);

    const handleSortChange = (e) => {
        setIsSort(e.target.checked)
    }

    const handleBooksCountChange = (e) => {
        setBooksCount(e.target.value)
    }

    const handlePageChange = (e) => {
        setPage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getBooks()
    }


    // console.log(books)

    return (
        <div>
            <ErrorText>{errorText}</ErrorText>
            <h3>Книги</h3>
            {isAdmin === "true" ? (
                <Link to='/books/add'><Button>Добавить книгу</Button></Link>
            ) : ""}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Количество книг на странице</Form.Label>
                    <Form.Control
                        type="number"
                        style={{width: "auto"}}
                        placeholder={"Количество книг на странице"}
                        min={1}
                        onChange={handleBooksCountChange}
                    >
                    </Form.Control>

                </Form.Group>

                <Form.Group>
                    <Form.Label>Страница</Form.Label>
                    <Form.Control
                        type="number"
                        style={{width:"auto"}}
                        placeholder={"Введите номер страницы"}
                        min={1}
                        onChange={handlePageChange}
                    >
                    </Form.Control>

                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type={"checkbox"}
                        id={'sort'}
                        label={'Сортировка книг по алфавиту'}
                        onChange={handleSortChange}

                    />
                </Form.Group>

                <Button style={{margin:"10px 0"}} type={"submit"}>Применить</Button>
            </Form>
            {books.length !== 0 ?
                (
                    <div>
                        <ListGroup>
                            {books.map(book => (
                                <ListGroup.Item variant="light" key={book.id}>
                                    <StyledLink
                                        to={isAdmin === "true" ? "/books/" + book.id : "#"}> {book.name}, {book.author}, {book.year}</StyledLink>
                                </ListGroup.Item>))}
                        </ListGroup>

                    </div>
                ) : (<p>{loadingText}</p>)
            }
        </div>
    );
}

export {BooksPage}

