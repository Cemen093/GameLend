import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, BASKET_ROUTE, MAIN_ROUTE, ORDERS_ROUTE, WISHLIST_ROUTE,} from "../../utils/consts";
import SearchDropdown from "../dropdown/searchDropdown/SearchDropdown";
import AuthorizationModal from "../modal/authorization/AuthorizationModal";
import RoundImageButton from "../buttons/RoundImageButton";
import styles from './header.module.css'
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
            <div className={`${styles.navContainer}`}>
                <div className={`${styles.nav} ${location.pathname === MAIN_ROUTE && styles.navLincActive}`}
                     onClick={handleMain}>
                    Головне меню
                </div>
                <div className={`${styles.nav} ${location.pathname === BASKET_ROUTE && styles.navLincActive}`}
                     onClick={handleBasket}>
                    Кошик
                </div>
                <div className={`${styles.nav} ${location.pathname === WISHLIST_ROUTE && styles.navLincActive}`}
                     onClick={handleWishlist}>
                    Список бажаного
                </div>
                <div className={`${styles.nav} ${location.pathname === ORDERS_ROUTE && styles.navLincActive}`}
                     onClick={handleOrders}>
                    Замовлення
                </div>
            </div>
        );
    }

    const AccountBox = observer(() => {
        return (
            <div className={styles.accountBox}>
                <AuthorizationModal show={authorizationModalShow} onHide={() => setAuthorizationModalShow(false)}/>
                <OutlineButton loading={!userStore.init} onClick={handleAuthBtn}>{userStore.isAuth ? "Вихід" : "Вхід"}</OutlineButton>
                <RoundImageButton
                    image={userStore.isAuth ? process.env.REACT_APP_API_URL + '/' + userStore.user.imgName : unauthorizedUser}
                    diameter={40}
                    loading={!userStore.init}
                    className={styles.profileButton}
                    onClick={handleProfileImg}
                />
            </div>
        )
    })

    return (
        <div className={`${styles.header}`}>
            <div className={styles.brand} onClick={handleBrand}>Game Land</div>
            <Navs/>
            <SearchDropdown/>
            <AccountBox/>
        </div>
    );
};

export default Header;
