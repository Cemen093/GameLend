import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchGame, fetchGames} from "../http/gameAPI";
import {Container} from "react-bootstrap";
import StyledDropdown from "../components/StyledDropdown";
import StyledInput from "../components/StyledInput";
import "../styles/ordering.css"
import {createOrder, removeAllGameFromBasket} from "../http/userAPI";

const OrderingPage = () => {
    const {gameId} = useParams();
    const {userStore, dataStore, platformsStore} = useContext(Context);
    const [games, setGames] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetch = async () => {
            if (gameId) {
                await fetchGame(gameId).then(data => ({...data, quantity: 1})).then(data => setGames([data]))
            } else {
                setGames(userStore.basketGames.rows.map(game => ({...game, quantity: 1})));
            }
            setIsLoading(false)
        }

        fetch().catch(e => console.error("error " + e.message))
    }, [])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (games?.length <= 0) {
        return <div>Пустой список пока не реализован</div>
    }

    const increaseQuantity = (id) => {
        setGames(prevGames => {
            return prevGames.map(game => {
                if (game.id === id) {
                    return { ...game, quantity: game.quantity + 1 };
                }
                return game;
            });
        });
    }
    const decreaseQuantity = (id) => {
        setGames(prevGames => {
            return prevGames.map(game => {
                if (game.id === id && game.quantity > 1) {
                    return { ...game, quantity: game.quantity - 1 };
                }
                return game;
            });
        });
    }

    const GameItem = ({game, ...props}) => {
        return (
            <div className="item" {...props}>
                <img src={process.env.REACT_APP_API_URL + '/' + game.imgName} alt="poster"/>
                <div className="item-content">
                    <div className="title-container">
                        <div className="title">{game.title}</div>
                    </div>
                    <div className="quantity-container">
                        <div className="quantity-button" onClick={() => decreaseQuantity(game.id)}>-</div>
                        <div className="quantity-count">{game.quantity}</div>
                        <div className="quantity-button" onClick={() => increaseQuantity(game.id)}>+</div>
                    </div>
                    <div className="price-container">
                        <div className="price">{game.price} ₴</div>
                    </div>
                </div>
            </div>
        )
    }

    const handleBuy = (items) => {
        createOrder(items)
            .then(orders => userStore.setOrders(orders))
            .then(() => {
                if (!gameId) {
                    removeAllGameFromBasket().then(() => userStore.setBasketGames([]))
                }
            })
            .catch(e => {
            console.error(e.message)
        })
        //TODO обновить страницу, сообщение "Заказ прошел успешно"
    }

    return (
        <Container fluid className="page-content">
            <div className="game-list">
                {games.map(game => <GameItem key={game.id} game={game}/>)}
            </div>
            <div className="white-line"/>
            <div className="total-price-container">
                <div className="total-price">
                    Вместе: {games.reduce((acc, game) => acc + (game.price * game.quantity), 0)} ₴
                </div>
            </div>
            <div className="white-line"/>
            <StyledDropdown
                title="Выберите платформу: "
                selectedItem={selectedPlatform}
                setSelectedItem={setSelectedPlatform}
                items={platformsStore.platforms}
                className="ms-2 mt-4"
            />
            <StyledInput
                title="Введите промокод: "
                value={promoCode}
                setValue={setPromoCode}
                className="ms-2 mt-4"
            />
            <div className="white-line"/>
            <div className="d-flex justify-content-end">
                <div className="gray-button mt-4 me-4" onClick={() => handleBuy(games)}>Купить</div>
            </div>
        </Container>
    );
};

export default observer(OrderingPage);
