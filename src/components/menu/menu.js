import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { useSignOut} from "react-auth-kit";
import {useState} from "react";
import {StyledLink} from "../commons";
import {isAdmin} from "../axios/axios";
import Button from "react-bootstrap/Button";
export default function Menu() {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const [token, setToken] = useState(Cookies.get("_auth"))
    const logout = () => {
        localStorage.clear()
        signOut();
        setToken("")

        navigate("/login");
    };

    const location = useLocation()
    if (location.pathname === '/login' || location.pathname === "/register") return null;

    return (
        <Navbar bg='light' style={{justifyContent: "space-between"}}>
            <Container>
                    <StyledLink to='/books'>Книги</StyledLink>
                    <StyledLink to='/books/search'>Поиск книг</StyledLink>
                    {isAdmin === "true" ?
                        (
                            <section style={{display:"flex"}}>
                                <StyledLink to='/readers'>Читатели</StyledLink>
                                <StyledLink to='/users'>Пользователи</StyledLink>
                            </section>
                        ) : ""}

                    {/*{token == null ? <Link to='/login'>Войти в личный кабинет</Link> : ""}*/}
                    {token ? (<Button kind="secondary" onClick={logout}>
                        Выйти из аккаунта
                    </Button>) : ""}
            </Container>
        </Navbar>
    )
}