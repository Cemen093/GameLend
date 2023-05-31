import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";
import "../styles/account.css"
import pencil from "../assets/pencil.png"
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE, GAME_ROUTE, ORDERS_ROUTE, WISHLIST_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const AccountPage = ({isLoading = false}) => {
    const navigate = useNavigate();
    const {userStore, dataStore} = useContext(Context)

    if (isLoading) {
        return <div>Account page loading</div>
    }

    const handleEditLogin = () => {

    }

    const handleEditEmail = () => {

    }

    const BoughtList = ({ ...props}) => {
        return (
            <div className="bought" {...props}>
                <div className="bought-title" onClick={() => navigate(ORDERS_ROUTE)}>Куплено</div>
                <div className="bought-list">
                    {userStore.boughtGames.count > 0 ?
                        userStore.boughtGames.rows.map(game => <BoughtItem key={"bought " + game.id} game={game}/>)
                    :
                        <div>Пустой bought list еще не реализован</div>
                    }
                </div>
            </div>
        )
    }

    const BoughtItem = ({game, ...props}) => {
        return (
            <div className="bought-item" {...props}>
                <img src={game.imgName} alt="poster"/>
                <div className="bought-item-content">
                    <div className="bought-item-title">{game.title}</div>
                    <div className="bought-item-bought-at">Куплено: 12.03.2023</div>
                </div>
            </div>
        )
    }

    const Basket = ({...props}) => {
        return (
            <div className="basket" {...props}>
                <div className="title" onClick={() => navigate(BASKET_ROUTE)}>Корзина</div>
                <div className="container">
                    {userStore.basketGames.count > 0 ?
                        userStore.basketGames.rows.map(game => <BasketItem key={"basket " + game.id} game={game}/>)
                        :
                        <div>Пустая корзина еще не реализована</div>
                    }
                </div>
            </div>
        )
    }

    const Wishlist = ({...props}) => {
        return (
            <div className="wishlist" {...props}>
                <div className="title" onClick={() => navigate(WISHLIST_ROUTE)}>Список желаемого</div>
                <div className="container">
                    {userStore.wishlistGames.count > 0 ?
                        userStore.wishlistGames.rows.map(game => <BasketItem key={"wishlist " + game.id} game={game}/>)
                        :
                        <div>Пустой wishlist еще не реализован</div>
                    }
                </div>
            </div>
        )
    }

    const BasketItem = ({game, ...props}) => {
        return (
            <div className="basket-item" {...props} onClick={() => navigate(GAME_ROUTE + '/' + game.id)}>
                <img src={process.env.REACT_APP_API_URL + '/' + game.imgName} alt="picture"/>
                <div className="basket-item-title">{game.title}</div>
            </div>
        )
    }

    return (
        <Container className="account-container">
            <div className="column-one">
                <div className="user-container">
                    <img src={userStore.user.imgName} alt="profile"/>
                    <div className="content">
                        <div className="line">
                            <div>{userStore.user.login}</div>
                            <img className="edit-button" src={pencil} alt="edit-btn" onClick={handleEditLogin}></img>
                        </div>
                        <div className="line">
                            <div>{userStore.user.email}</div>
                            <img className="edit-button" src={pencil} alt="edit-btn" onClick={handleEditEmail}></img>
                        </div>
                    </div>
                </div>
                <BoughtList/>
            </div>
            <div className="column-two">
                <Basket/>
                <Wishlist/>
            </div>
        </Container>
    );
};

export default observer(AccountPage);
