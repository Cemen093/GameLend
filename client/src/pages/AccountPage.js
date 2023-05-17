import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";
import "../styles/account.css"
import pencil from "../assets/pencil.png"

const AccountPage = () => {
    const {userStore, dataStore} = useContext(Context)
    const basketGames = dataStore.games;
    const wishlistGames = dataStore.games;
    const boughtGames = dataStore.games;

    const handleEditLogin = () => {

    }

    const handleEditEmail = () => {

    }

    const BoughtItem = ({game, ...props}) => {
        return (
            <div className="bought-item" {...props}>
                <img src={game.img} alt="poster"/>
                <div className="bought-item-content">
                    <div className="bought-item-title">{game.title}</div>
                    <div className="bought-item-bought-at">Куплено: 12.03.2023</div>
                    {/*//TODO*/}
                </div>
            </div>
        )
    }

    const BasketItem = ({game, ...props}) => {
        return (
            <div className="basket-item" {...props}>
                <img src={game.img} alt="picture"/>
                <div className="basket-item-title">{game.title}</div>
            </div>
        )
    }

    return (
        <Container className="account-container">
            <div className="column-one">
                <div className="user-container">
                    <img src={userStore.user.img} alt="profile"/>
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
                <div className="bought">
                    <div className="bought-title">Куплено</div>
                    <div className="bought-list">
                        {boughtGames.map(game => <BoughtItem key={"bought " + game.id} game={game}/>)}
                    </div>
                </div>
            </div>
            <div className="column-two">
                <div className="basket">
                    <div className="title">Корзина</div>
                    <div className="container">
                        {basketGames.map(game => <BasketItem key={"basket " + game.id} game={game}/>)}
                    </div>
                </div>
                <div className="wishlist">
                    <div className="title">Список желаемого</div>
                    <div className="container">
                        {wishlistGames.map(game => <BasketItem key={"wishlist " + game.id} game={game}/>)}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AccountPage;
