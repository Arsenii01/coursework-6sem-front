import {useEffect, useState} from "react";
import {api, handleError, isAdmin} from "../axios/axios";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import {ErrorText, StyledLink} from "../commons";
import Button from "react-bootstrap/Button";

export default function ReadersPage() {
    const [readers, setReaders] = useState([])
    const [errorText, setErrorText] = useState("")

    useEffect(() => {
        api.get("/readers")
            .then(r => {
                setReaders([...r.data])
            }).catch(err => handleError(err, setErrorText))
    }, []);

    return (
        <div>
            <ErrorText>{errorText}</ErrorText>

            <h3>Читатели</h3>
            {isAdmin === "true" ? (
                <StyledLink to='/readers/add'><Button>Добавить читателя</Button></StyledLink>

            ): ""}
            {readers.length !== 0 ?
                (<div>
                    <ListGroup>
                        {readers.map(reader => (
                            <ListGroup.Item variant="light" key={reader.id}>
                                <Link to={"/readers/" + reader.id}> {reader.fullName}, {reader.email}, {reader.birthYear}</Link>
                            </ListGroup.Item>))
                        }
                    </ListGroup>
                </div>)

             : (<p>Loading...</p>)
            }

        </div>
    )
}