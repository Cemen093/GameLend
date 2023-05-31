import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import { useLocation, useNavigate} from "react-router-dom";
import {
    ACCOUNT_ROUTE,
    BASKET_ROUTE,
    MAIN_ROUTE, ORDERS_ROUTE,
    WISHLIST_ROUTE,
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import unauthorizedUser from '../assets/unauthorizedUser.png'
import '../styles/header.css'
import SearchDropdown from "./SearchDropdown";
import AuthorizationModal from "./modal/AuthorizationModal";

const NavBar = () => {
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
    const handleOrders = () => {
        if (userStore.isAuth) {
            navigate(ORDERS_ROUTE)
        } else {
            notLogin()
        }
    }
    const handleAuthBtn = () => {
        if (userStore.isAuth) {
            userStore.logOut()
        } else {
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
    const notLogin = () => {
        alert('А ты зарегистрировался?')
    }

    const createNav = () => {
        return (
            <Nav className="my-2 my-lg-0">
                <Nav.Link active={location.pathname === MAIN_ROUTE} href='#' onClick={handleMain}>
                    Главное меню
                </Nav.Link>
                <Nav.Link active={location.pathname === BASKET_ROUTE} href='#' onClick={handleBasket}>
                    Корзина
                </Nav.Link>
                <Nav.Link active={location.pathname === WISHLIST_ROUTE} href='#' onClick={handleWishlist}>
                    Список желаемого
                </Nav.Link>
                <Nav.Link active={location.pathname === ORDERS_ROUTE} href='#' onClick={handleOrders}>
                    Заказы
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
                    src={userStore.isAuth ? userStore.user.imgName : unauthorizedUser}
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
                    <Navbar.Brand className="brand cursor-pointer" onClick={handleBrand}>Game Land</Navbar.Brand>
                    <Navbar.Toggle aria-controls="NavbarScroll"/>
                    <Navbar.Collapse id="NavbarScroll">
                        {createNav()}
                        <SearchDropdown/>
                        {createAccountBox()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default observer(NavBar);
