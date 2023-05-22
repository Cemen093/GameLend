import React, {useContext} from 'react';
import {GAME_ROUTE, ORDERING_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import "../styles/gameItem.css"
import basket from "../assets/basket.png";
import wastebasket from "../assets/wastebasket.png"
import {
    addGameToBasket,
    addGameToWishlist, getAllGamesFromBasket, getAllGamesFromWishlist,
    moveGameFromWishlistToBasket,
    removeGameFromBasket,
    removeGameFromWishlist
} from "../http/userAPI";
import {Context} from "../index";

const GameItem = ({game, className, style, isLoading = false, buttons, ...props}) => {
    const navigate = useNavigate()
    const {userStore} = useContext(Context);

    if (isLoading) {
        return <div>Loading</div>
    }

    return (
        <div className={"game-item " + className} style={style} {...props}>
            <img src={process.env.REACT_APP_API_URL + '/' + game.img} alt={game.title} className="image"
                 onClick={() => navigate(GAME_ROUTE + '/' + game.id)}/>
            <div className="textContainer">
                <div className="title">{game.title}</div>
                <div className="platforms">
                    {game.platforms.map((platform, index) => (
                        <div key={index} className="platform">{platform.title}</div>
                    ))}
                </div>
            </div>
            <div className="buttonsContainer">
                <div className="rowButtons">
                    {buttons?.addToBasket &&
                        <img className="basket add-to-basket" src={basket} alt="basket"
                             onClick={() => addGameToBasket(game.id)
                                 .then(() => getAllGamesFromBasket().then(data => {userStore.setBasketGames(data)}))
                                 .catch(e => console.error(e.response.data.message))}/>
                    }
                    {buttons?.moveToBasket &&
                        <img className="basket move-to-basket" src={basket} alt="basket"
                             onClick={() => moveGameFromWishlistToBasket(game.id)
                                 .then(() => getAllGamesFromBasket().then(data => {userStore.setBasketGames(data)}))
                                 .then(() => getAllGamesFromWishlist().then(data => {userStore.setWishlistGames(data)}))
                                 .catch(e => console.error(e.response.data.message))}/>
                    }
                    {buttons?.removeFromBasket &&
                        <img className="wastebasket remove-from-basket" src={wastebasket} alt="wastebasket"
                             onClick={() => removeGameFromBasket(game.id)
                                 .then(() => getAllGamesFromBasket().then(data => {userStore.setBasketGames(data)}))
                                 .catch(e => console.error(e.response.data.message))}/>
                    }
                    {buttons?.removeFromWishlist &&
                        <img className="wastebasket remove-from-wishlist" src={wastebasket} alt="wastebasket"
                             onClick={() => removeGameFromWishlist(game.id)
                                 .then(() => getAllGamesFromWishlist().then(data => {userStore.setWishlistGames(data)}))
                                 .catch(e => console.error(e.response.data.message))}/>
                    }
                    {buttons?.buy &&
                        <div className="buy" onClick={() => addGameToBasket(game.id)
                            .then(() => navigate(ORDERING_ROUTE))
                            .then(() => getAllGamesFromBasket().then(data => {userStore.setBasketGames(data)}))
                            .catch(e => console.error(e.response.data.message))}>{game.price} ₴</div>
                    }
                </div>
                {buttons?.addToWishlist &&
                    <div className="wishlist" onClick={() => addGameToWishlist(game.id)
                        .then(() => getAllGamesFromWishlist().then(data => {userStore.setWishlistGames(data)}))
                        .catch(e => console.error(e.response.data.message))}>В желаемое</div>
                }
            </div>
        </div>
    );
};

export default observer(GameItem);
