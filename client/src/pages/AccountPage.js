import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";
import "../styles/account.css"
import pencil from "../assets/pencil.png"
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, GAME_ROUTE, ORDERS_ROUTE, WISHLIST_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const AccountPage = () => {
    const navigate = useNavigate();
    const {userStore} = useContext(Context)

    const handleEditLogin = () => {

    }

    const handleEditEmail = () => {

    }

    const BoughtList = ({...props}) => {
        return (
            <div className="bought" {...props}>
                <div className="bought-title" onClick={() => navigate(ORDERS_ROUTE)}>Куплено</div>
                <div className="bought-list">
                    {userStore.loading
                        ?
                        [...Array(5)].map((_, i) => <div key={i} className="bought-item"/>)
                        :
                        userStore.boughtGames.length > 0 ?
                            userStore.boughtGames.map(game =>
                                <div key={game.id} className="bought-item">
                                    <img src={process.env.REACT_APP_API_URL + '/' + game.imgName} alt="poster"/>
                                    <div className="bought-item-content">
                                        <div className="bought-item-title">{game.title}</div>
                                        <div className="bought-item-bought-at">Куплено: 12.03.2023</div>
                                    </div>
                                </div>
                            )
                            :
                            <div>Куплених ігор поки немає</div>
                    }
                </div>
            </div>
        )
    }

    const Basket = ({...props}) => {
        return (
            <div className="basket" {...props}>
                <div className="title" onClick={() => navigate(BASKET_ROUTE)}>Корзина</div>
                <div className="container">
                    {userStore.loading
                        ?
                        [...Array(10)].map((_, i) => <div key={i} className="basket-item"/>)
                        :
                        userStore.basketGames.length > 0 ?
                            userStore.basketGames.map(game =>
                                <div key={game.id} className="basket-item"
                                     onClick={() => navigate(GAME_ROUTE + '/' + game.id)}>
                                    <img src={process.env.REACT_APP_API_URL + '/' + game.imgName} alt="picture"/>
                                    <div className="basket-item-title">{game.title}</div>
                                </div>
                            )
                            :
                            <div>В кошику поки немає ігор</div>
                    }
                </div>
            </div>
        )
    }

    const Wishlist = ({...props}) => {
        return (
            <div className="wishlist" {...props}>
                <div className="title" onClick={() => navigate(WISHLIST_ROUTE)}>Список бажаного</div>
                <div className="container">
                    {userStore.loading
                        ?
                        [...Array(5)].map((_, i) => <div key={i} className="basket-item"/>)
                        :
                        userStore.wishlistGames.length > 0 ?
                            userStore.wishlistGames.map(game =>
                                <div key={game.id} className="basket-item"
                                     onClick={() => navigate(GAME_ROUTE + '/' + game.id)}>
                                    <img src={process.env.REACT_APP_API_URL + '/' + game.imgName} alt="picture"/>
                                    <div className="basket-item-title">{game.title}</div>
                                </div>
                            )
                            :
                            <div>В списку бажаного поки нема ігор</div>
                    }
                </div>
            </div>
        )
    }

    return (
        <Container className="account-container">
            <div className="column-one">
                <div className="user-container">
                    <img src={process.env.REACT_APP_API_URL + '/' + userStore.user.imgName} alt="profile"/>
                    <div className="content">
                        <div className="line">
                            <div>{userStore.user.login}</div>
                            <img className="edit-button" src={pencil} alt="edit-btn" onClick={handleEditLogin}></img>
                        </div>
                        <div className="line">
                            <div>{userStore.user.email}</div>
                            <img className="edit-button" src={pencil} alt="edit-btn" onClick={handleEditEmail}></img>
                        </div>
                        {userStore.isAdmin &&
                        <div className="line">
                            <div className="gray-button" onClick={() => navigate(ADMIN_ROUTE)}>Адмінка</div>
                        </div>
                        }
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
