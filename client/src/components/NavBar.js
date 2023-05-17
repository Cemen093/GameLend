import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import { useLocation, useNavigate} from "react-router-dom";
import {
    ACCOUNT_ROUTE,
    ADMIN_ROUTE,
    BASKET_ROUTE, GAME_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    SEARCH_ROUTE,
    WISHLIST_ROUTE,
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import unauthorizedUser from '../assets/unauthorizedUser.png'
import header from '../styles/header.css'
import SearchDropdown from "./SearchDropdown";
import AuthorizationModal from "./modal/AuthorizationModal";

const NavBar = observer(() => {
    const {userStore, dataStore} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const [authorizationModalShow, setAuthorizationModalShow] = React.useState(false);
    const handleBrand = () => {
        navigate(MAIN_ROUTE)
    }
    const handleMain = () => {
        navigate(MAIN_ROUTE)
    }
    const handleBasket = () => {
        if (userStore.isAuth) {
            navigate(BASKET_ROUTE)
        } else {
            notLogin()
        }
    }
    const handleWishlist = () => {
        if (userStore.isAuth) {
            navigate(WISHLIST_ROUTE)
        } else {
            notLogin()
        }
    }
    const handleSearch = (query) => {
        navigate(`${SEARCH_ROUTE}?query=${query}`);
    };
    const handleAuthBtn = () => {
        if (userStore.isAuth) {
            userStore.setUser({})
        } else {
            //navigate(LOGIN_ROUTE)
            setAuthorizationModalShow(true);
        }
    }
    const handleProfileImg = () => {
        if (userStore.isAuth) {
            navigate(ACCOUNT_ROUTE)
        } else {
            notLogin()
        }
    }
    const handleDropdownItem = (id) => {
        navigate(GAME_ROUTE + '/' + id)
    }
    const notLogin = () => {
        alert('А ты зарегистрировался?')
    }

    const createNav = () => {
        return (
            <Nav className="my-2 my-lg-0">
                <Nav.Link
                    active={location.pathname === MAIN_ROUTE}
                    href='#'
                    onClick={handleMain}
                >
                    Главное меню
                </Nav.Link>
                <Nav.Link
                    active={location.pathname === BASKET_ROUTE}
                    href='#'
                    onClick={handleBasket}
                >
                    Корзина
                </Nav.Link>
                <Nav.Link
                    active={location.pathname === WISHLIST_ROUTE}
                    href='#'
                    onClick={handleWishlist}
                >
                    Список желаемого
                </Nav.Link>
            </Nav>
        );
    }

    const createAccountBox = () => {
        return (
            <div className="ms-auto d-flex align-items-center">
                <div
                    className="profile-auth-btn"
                    onClick={handleAuthBtn}
                >
                    {userStore.isAuth ? "Выход" : "Вход"}
                </div>
                <AuthorizationModal show={authorizationModalShow} onHide={() => setAuthorizationModalShow(false)}/>
                <img
                    className="profile-img ms-2"
                    src={userStore.isAuth ? userStore.user.img : unauthorizedUser}
                    onClick={handleProfileImg}
                    alt="profile img"
                />

            </div>
        )
    }

    return (
        <div className="header">
            <Navbar>
                <Container fluid>
                    <Navbar.Brand className="fw-bold cursor-pointer" onClick={handleBrand}>Game Land</Navbar.Brand>
                    <Navbar.Toggle aria-controls="NavbarScroll"/>
                    <Navbar.Collapse id="NavbarScroll">
                        {createNav()}
                        <SearchDropdown
                            items={dataStore.games}
                            ItemOnClick={handleDropdownItem}
                            IconOnClick={handleSearch}
                        />
                        {createAccountBox()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;
