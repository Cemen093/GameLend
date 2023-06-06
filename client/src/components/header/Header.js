import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { useLocation, useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, BASKET_ROUTE, MAIN_ROUTE, ORDERS_ROUTE, WISHLIST_ROUTE,} from "../../utils/consts";
import SearchDropdown from "../searchDropdown/SearchDropdown";
import AuthorizationModal from "../modal/AuthorizationModal";
import RoundImageButton from "../buttons/RoundImageButton";
import '../../styles/header.css'
import unauthorizedUser from '../../assets/unauthorizedUser.png'
import OutlineButton from "../buttons/OutlineButton";

const Header = () => {
    const {userStore} = useContext(Context)
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
        alert('Користувач не загеестрованний.')
    }

    const Navs = () => {
        return (
            <Nav className="my-2 my-lg-0">
                <Nav.Link active={location.pathname === MAIN_ROUTE} href='#' onClick={handleMain}>
                    Головне меню
                </Nav.Link>
                <Nav.Link active={location.pathname === BASKET_ROUTE} href='#' onClick={handleBasket}>
                    Кошик
                </Nav.Link>
                <Nav.Link active={location.pathname === WISHLIST_ROUTE} href='#' onClick={handleWishlist}>
                    Список бажаного
                </Nav.Link>
                <Nav.Link active={location.pathname === ORDERS_ROUTE} href='#' onClick={handleOrders}>
                    Замовлення
                </Nav.Link>
            </Nav>
        );
    }

    const AccountBox = observer(() => {
        return (
            <div className="ms-auto d-flex align-items-center">
                <OutlineButton onClick={handleAuthBtn}>{userStore.isAuth ? "Вихід" : "Вхід"}</OutlineButton>
                <AuthorizationModal show={authorizationModalShow} onHide={() => setAuthorizationModalShow(false)}/>
                <RoundImageButton
                    className="ms-2"
                    image={userStore.isAuth ? process.env.REACT_APP_API_URL + '/' + userStore.user.imgName : unauthorizedUser}
                    onClick={handleProfileImg}
                    diameter={40}
                />
            </div>
        )
    })

    return (
        <div className="header">
            <Navbar>
                <Container fluid>
                    <Navbar.Brand className="brand cursor-pointer" onClick={handleBrand}>Game Land</Navbar.Brand>
                    <Navbar.Toggle aria-controls="NavbarScroll"/>
                    <Navbar.Collapse id="NavbarScroll">
                        <Navs/>
                        <SearchDropdown/>
                        <AccountBox/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default observer(Header);
