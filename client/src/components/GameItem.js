import React from 'react';
import {GAME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import "../styles/gameItem.css"
import basket from "../assets/basket.png";
import wastebasket from "../assets/wastebasket.png"

const GameItem = observer(({game, className, style, ...props}) => {
    const navigate = useNavigate()

    return (
        <div className={"game-item " + className} style={style} {...props}>
            <img src={game.img} alt={game.title} className="image"
                 onClick={() => navigate(GAME_ROUTE + '/' + game.id)}
            />
            <div className="textContainer">
                <div className="title">{game.title}</div>
                <div className="platforms">
                    {game.platforms.map((platform, index) => (
                        <div key={index} className="platform">{platform}</div>
                    ))}
                </div>
            </div>
            <div className="buttonsContainer">
                <div className="rowButtons">
                    <img className="basket" src={basket} alt="basket"/>
                    <img className="wastebasket" src={wastebasket} alt="wastebasket"/>
                    <div className="buy">{game.price} ₴</div>
                </div>
                <div className="wishlist">В желаемое</div>
            </div>
        </div>
    );
});

export default GameItem;
