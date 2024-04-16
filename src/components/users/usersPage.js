import {useEffect, useState} from "react";
import {api, handleError} from "../axios/axios";
import ListGroup from "react-bootstrap/ListGroup";
import {ErrorText, StyledLink} from "../commons";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [errorText, setErrorText] = useState()
    const [loadingText, setLoadingText] = useState("Loading...")

    useEffect(() => {
        api.get("/users")
            .then(r => {
                console.log(r)
                setUsers([...r.data])
                if (r.data.length === 0) setLoadingText("Пользователей нет")
            }).catch(err => {
                handleError(err, setErrorText)
                setLoadingText("")

        })
    }, []);

    const deleteUser = (userId) => {
        api.delete("/users/" + userId)
            .then(r => {
                window.location.reload()
            })
    }

    return (
        <div>
            <ErrorText>{errorText}</ErrorText>

            <StyledLink to='/register-admin'><Button>Добавить админа</Button></StyledLink>

            {users.length !== 0 ? (
                <div>
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item
                                variant="light"
                                key={user.id}>
                                <Card body>
                                    {user.firstName} {user.lastName} <br/>
                                    Логин: {user.username} <br/>
                                    Роль: {user.role} <br/>
                                    <Button onClick={() => deleteUser(user.id)} key={user.id}>Удалить пользователя</Button>

                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            ) : <p>{loadingText}</p>}
        </div>
    )
}